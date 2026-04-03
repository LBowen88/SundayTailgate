import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 3000));
await page.evaluate(() => window.scrollTo(0, 1533));
await new Promise(r => setTimeout(r, 500));
// The standings in screenshot-43 were visible at top-left, approx y=0-130 in viewport
const outPath = './temporary screenshots/screenshot-45-tb-rows.png';
await page.screenshot({ path: outPath, clip: { x: 110, y: 0, width: 650, height: 130 } });
console.log('Saved:', outPath);
await browser.close();
