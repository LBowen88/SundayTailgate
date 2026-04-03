import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 3000));
await page.evaluate(() => window.scrollTo(0, 1533));
await new Promise(r => setTimeout(r, 400));
const outPath = './temporary screenshots/screenshot-44-tb-names.png';
// Clip the standings area (top of viewport after scroll)
await page.screenshot({ path: outPath, clip: { x: 80, y: 70, width: 700, height: 200 } });
console.log('Saved:', outPath);
await browser.close();
