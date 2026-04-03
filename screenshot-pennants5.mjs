import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));
// scroll so pennants are at top of viewport
await page.evaluate(() => window.scrollTo(0, 507));
await new Promise(r => setTimeout(r, 300));
const scrolled = await page.evaluate(() => window.scrollY);
console.log('scrollY:', scrolled);
await page.screenshot({ path: './temporary screenshots/screenshot-60-pennants-viewport.png' });
console.log('Done');
await browser.close();
