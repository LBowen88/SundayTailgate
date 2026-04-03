import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1200 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 3000));

// Find the standings list bottom
const pos = await page.evaluate(() => {
  const items = [...document.querySelectorAll('.standing-item, [class*="standing"]')];
  console.log('standing items:', items.length);
  const last = items[items.length-1];
  if (!last) return null;
  const r = last.getBoundingClientRect();
  return { scrollY: window.scrollY, itemY: r.y + window.scrollY, itemH: r.height };
});
console.log('pos:', pos);

if (pos) {
  await page.evaluate((y) => window.scrollTo(0, y - 300), pos.itemY);
  await new Promise(r => setTimeout(r, 400));
}

const outPath = './temporary screenshots/screenshot-40-tb-detail.png';
await page.screenshot({ path: outPath, clip: { x: 80, y: 0, width: 800, height: 500 } });
console.log('Saved:', outPath);
await browser.close();
