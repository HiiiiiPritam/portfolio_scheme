import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';

const getOrCreateSessionId = () => {
  const KEY = 'gscc_session_id';
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
};

const WELCOME_MSG = { role: 'bot', content: 'Namaste! Welcome to Guruji Student Credit Card (GSCC) Support. How can I assist you today?' };

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const sessionId = useRef(getOrCreateSessionId());

  // On mount: fetch existing history from the server so new tabs see previous conversation
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
        const res = await fetch(`${apiBaseUrl}/api/chat-history/${sessionId.current}`, {
          credentials: 'include',
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.messages) && data.messages.length > 0) {
          // History is stored newest-first in Redis, getHistory() reverses it to chronological.
          // Prepend the welcome message so it always appears first.
          setMessages([WELCOME_MSG, ...data.messages]);
        }
      } catch {
        // Network error or server down — silently stay with the welcome message
      }
    };
    fetchHistory();
  }, []); // empty deps → runs once on mount only



  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${apiBaseUrl}/api/chat-stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          question: input,
          sessionId: sessionId.current,
          language: 'english'
        })
      });

      if (!response.ok) throw new Error('Service unavailable');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botContent = '';

      setMessages(prev => [...prev, { role: 'bot', content: '' }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.text) {
                botContent += data.text;
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = { role: 'bot', content: botContent };
                  return newMessages;
                });
              }
            } catch (err) {}
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'bot', content: 'Connecting... Please try again shortly.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-widget-wrapper">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bot size={20} />
              <span style={{ fontWeight: '600' }}>GSCC Assistant</span>
            </div>
            <X size={20} style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
          </div>
          <div className="chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`msg msg-${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-footer">
            <input
              type="text"
              className="chat-input"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <div className="chat-send" onClick={handleSend}>
              <Send size={18} />
            </div>
          </div>
        </div>
      )}
      <div className="chat-trigger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </div>
    </div>
  );
};

export default ChatWidget;
