import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));

// Find pennants section
const pennY = await page.evaluate(() => {
  const el = document.getElementById('hall-of-fame');
  return el ? el.getBoundingClientRect().top + window.scrollY : null;
});
console.log('pennants Y:', pennY);
await page.evaluate((y) => window.scrollTo(0, y - 80), pennY);
await new Promise(r => setTimeout(r, 300));
await page.screenshot({ path: './temporary screenshots/screenshot-57-pennants-full.png' });
console.log('Done');
await browser.close();
