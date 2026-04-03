import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 3000));
// Scroll so 9th row is near top of viewport
await page.evaluate(() => window.scrollTo(0, 1716 - 150));
await new Promise(r => setTimeout(r, 300));
const outPath = './temporary screenshots/screenshot-42-toiletbowl.png';
await page.screenshot({ path: outPath, clip: { x: 80, y: 0, width: 900, height: 330 } });
console.log('Saved:', outPath);
await browser.close();
