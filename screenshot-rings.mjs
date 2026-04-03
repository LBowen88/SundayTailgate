import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));
await page.evaluate(() => window.scrollTo(0, 498));
await new Promise(r => setTimeout(r, 300));
// pennants strip: from viewport y ≈ 90 to 370
await page.screenshot({ path: './temporary screenshots/screenshot-61-rings-close.png', clip: { x: 160, y: 90, width: 1120, height: 290 } });
console.log('Done');
await browser.close();
