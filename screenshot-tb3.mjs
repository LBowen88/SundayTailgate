import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 3000));

// Find standings section
const standingsY = await page.evaluate(() => {
  const items = [...document.querySelectorAll('.standing-item')];
  console.log('count:', items.length);
  if (items.length >= 9) {
    const r9 = items[8].getBoundingClientRect();
    return r9.top + window.scrollY;
  }
  return null;
});
console.log('9th item Y:', standingsY);

if (standingsY) {
  await page.evaluate((y) => window.scrollTo(0, y - 100), standingsY);
  await new Promise(r => setTimeout(r, 400));
  const outPath = './temporary screenshots/screenshot-42-9th10th.png';
  await page.screenshot({ path: outPath });
  console.log('Saved:', outPath);
}
await browser.close();
