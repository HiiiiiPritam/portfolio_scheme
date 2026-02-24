const fs = require('fs');
const path = require('path');
const https = require('https');

const assetsDir = path.join(__dirname, 'src', 'assets');
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

const images = [
    'https://gscc.jharkhand.gov.in/assets/images/logo.png',
    'https://gscc.jharkhand.gov.in/assets/images/benner.png',
    'https://gscc.jharkhand.gov.in/assets/images/benner2.jpg',
    'https://gscc.jharkhand.gov.in/assets/images/benner3.png',
    'https://gscc.jharkhand.gov.in/assets/images/card-1.png',
    'https://gscc.jharkhand.gov.in/assets/images/ekicon1.png',
    'https://gscc.jharkhand.gov.in/assets/images/card-3.png',
    'https://gscc.jharkhand.gov.in/assets/images/swimg.png',
    'https://gscc.jharkhand.gov.in/assets/images/about-img.jpg',
    'https://gscc.jharkhand.gov.in/assets/images/favicon.png'
];

async function download(url) {
    const filename = path.basename(url);
    const dest = path.join(assetsDir, filename);
    
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`Downloaded: ${filename}`);
                    resolve();
                });
            } else {
                console.error(`Failed to download ${filename}: ${response.statusCode}`);
                file.close();
                fs.unlinkSync(dest);
                resolve(); // resolve to continue with others
            }
        }).on('error', (err) => {
            console.error(`Error downloading ${filename}: ${err.message}`);
            resolve();
        });
    });
}

async function run() {
    console.log('Starting asset download...');
    for (const url of images) {
        await download(url);
    }
    console.log('Done.');
}

run();
