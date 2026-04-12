/**
 * Dual-layer Token Bucket Rate Limiter
 *
 * Layer 1 — Global:      Protects backend infrastructure (Cohere/Pinecone APIs)
 *                        from total overload or DDoS. One bucket for the whole server.
 *
 * Layer 2 — Per Session: Prevents a single user from spamming. One bucket per
 *                        session ID.
 *
 * Algorithm: Token Bucket
 *   - Each bucket starts full with `capacity` tokens.
 *   - Every request consumes 1 token.
 *   - Tokens refill continuously at `refillRate` tokens/second.
 *   - If the bucket is empty, the request is rejected with 429.
 *   - Allows short bursts (up to `capacity`) while enforcing a sustained rate.
 *
 * Redis: Uses a Lua script for atomic read-modify-write. This ensures two
 *        simultaneous requests from the same session see a consistent token count
 *        and cannot both "pass" when only 1 token remains (race condition prevention).
 *
 * Fallback: In-memory Map used in local dev when Redis is unavailable.
 */

// Atomic Token Bucket script for Redis.
// KEYS[1]  = the bucket key (global or session)
// ARGV[1]  = capacity   (max tokens)
// ARGV[2]  = refillRate (tokens per second)
// ARGV[3]  = now        (current time as Unix float seconds)
// Returns: remaining tokens after this request, OR -1 if rejected.
const TOKEN_BUCKET_LUA = `
local key        = KEYS[1]
local capacity   = tonumber(ARGV[1])
local refillRate = tonumber(ARGV[2])
local now        = tonumber(ARGV[3])

local data       = redis.call('HMGET', key, 'tokens', 'lastRefill')
local tokens     = tonumber(data[1])
local lastRefill = tonumber(data[2])

if not tokens then
  -- First request ever: initialize bucket, already consume 1 token
  local initial = capacity - 1
  redis.call('HMSET', key, 'tokens', initial, 'lastRefill', now)
  redis.call('EXPIRE', key, math.ceil(capacity / refillRate) + 120)
  return initial
end

-- Refill based on elapsed time
local elapsed  = math.max(0, now - lastRefill)
local refilled = math.min(capacity, tokens + elapsed * refillRate)
local remaining = refilled - 1

if remaining < 0 then
  -- Save refilled state but don't consume (bucket empty)
  redis.call('HMSET', key, 'tokens', refilled, 'lastRefill', now)
  redis.call('EXPIRE', key, math.ceil(capacity / refillRate) + 120)
  return -1
end

redis.call('HMSET', key, 'tokens', remaining, 'lastRefill', now)
redis.call('EXPIRE', key, math.ceil(capacity / refillRate) + 120)
return math.floor(remaining)
`;


/**
 * In-memory token bucket for local dev fallback.
 * NOT safe for multi-process / multi-server deployments.
 */
function inMemoryBucket(store, key, capacity, refillRate) {
    const now = Date.now() / 1000;
    let b = store.get(key);

    if (!b) {
        store.set(key, { tokens: capacity - 1, lastRefill: now });
        return capacity - 1;
    }

    const elapsed   = Math.max(0, now - b.lastRefill);
    const refilled  = Math.min(capacity, b.tokens + elapsed * refillRate);
    const remaining = refilled - 1;

    b.lastRefill = now;

    if (remaining < 0) {
        b.tokens = refilled; // save refilled state, don't deduct
        return -1;
    }

    b.tokens = remaining;
    return Math.floor(remaining);
}


/**
 * Factory that returns an Express middleware implementing the dual-layer
 * Token Bucket rate limiter.
 *
 * Production defaults:
 *   Global  — 300 capacity, 5 tokens/sec = sustains 300 req/min,
 *             allows a burst of up to 300 before throttling.
 *   Session — 15 capacity, 0.25 tokens/sec = sustains 15 msg/min,
 *             allows a natural burst of a few messages then slows down.
 */
export function createRateLimiter({
    redis            = null,
    globalCapacity   = 300,   // Max burst across all users
    globalRefillRate = 5,     // Sustained: 5 tokens/sec = 300/min
    sessionCapacity  = 15,    // Max burst per user (e.g. pasting 15 questions quickly)
    sessionRefillRate = 0.25, // Sustained: 1 token per 4 seconds = 15/min
    prefix           = 'rl:chat:v1:',
} = {}) {
    const memory = new Map();

    return async function rateLimiter(req, res, next) {
        // Resolve session ID from body (parsed by express.json before this runs)
        // or from the X-Session-Id header as a fallback.
        const sessionId =
            (typeof req.body?.sessionId === 'string' && req.body.sessionId.trim()) ||
            (typeof req.headers['x-session-id'] === 'string' && req.headers['x-session-id'].trim()) ||
            'anon';

        const globalKey  = `${prefix}GLOBAL`;
        const sessionKey = `${prefix}SESSION:${sessionId}`;
        const nowSec     = Date.now() / 1000; // Unix float seconds

        // ── Redis path (production) ─────────────────────────────────────────
        if (redis) {
            try {
                // 1. Check global bucket first
                const globalRemaining = await redis.eval(
                    TOKEN_BUCKET_LUA, 1, globalKey,
                    String(globalCapacity), String(globalRefillRate), String(nowSec)
                );

                if (Number(globalRemaining) < 0) {
                    return res.status(429).json({
                        success: false,
                        error: 'Server is busy right now. Please try again shortly.',
                        limitType: 'global',
                        retryAfterSeconds: Math.ceil(1 / globalRefillRate),
                    });
                }

                // 2. Check per-session bucket
                const sessionRemaining = await redis.eval(
                    TOKEN_BUCKET_LUA, 1, sessionKey,
                    String(sessionCapacity), String(sessionRefillRate), String(nowSec)
                );

                if (Number(sessionRemaining) < 0) {
                    return res.status(429).json({
                        success: false,
                        error: 'You are sending messages too quickly. Please wait a moment before asking again.',
                        limitType: 'session',
                        retryAfterSeconds: Math.ceil(1 / sessionRefillRate), // ~4 seconds
                    });
                }

                return next();
            } catch (err) {
                console.warn('[rateLimiter] Redis eval failed, falling back to in-memory:', err?.message || err);
                // fall through to in-memory
            }
        }

        // ── In-memory fallback (local dev) ──────────────────────────────────
        const globalRem = inMemoryBucket(memory, globalKey, globalCapacity, globalRefillRate);
        if (globalRem < 0) {
            return res.status(429).json({
                success: false,
                error: 'Server is busy right now. Please try again shortly.',
                limitType: 'global',
            });
        }

        const sessionRem = inMemoryBucket(memory, sessionKey, sessionCapacity, sessionRefillRate);
        if (sessionRem < 0) {
            return res.status(429).json({
                success: false,
                error: 'You are sending messages too quickly. Please wait a moment before asking again.',
                limitType: 'session',
                retryAfterSeconds: Math.ceil(1 / sessionRefillRate),
            });
        }

        return next();
    };
}
