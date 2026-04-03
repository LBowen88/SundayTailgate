import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 2000 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));
await page.screenshot({ path: './temporary screenshots/screenshot-63-rings-full.png', clip: { x: 160, y: 590, width: 1120, height: 420 } });
console.log('Done');
await browser.close();
