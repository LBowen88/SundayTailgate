import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));

// Hero area
await page.screenshot({ path: './temporary screenshots/screenshot-54-hero-close.png', clip: { x: 300, y: 30, width: 840, height: 420 } });
// Pennants area  
await page.screenshot({ path: './temporary screenshots/screenshot-55-pennants-close.png', clip: { x: 140, y: 400, width: 1160, height: 320 } });
console.log('Saved both');
await browser.close();
