import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2500));

await page.evaluate(() => { document.querySelectorAll('.standings-row')[0]?.click(); });
await new Promise(r => setTimeout(r, 800));
await page.evaluate(() => { document.querySelector('[data-tab="roster"]')?.click(); });
await new Promise(r => setTimeout(r, 2500));

// Get modal bounds
const modal = await page.evaluate(() => {
  const m = document.querySelector('.modal-box') || document.querySelector('[class*="modal"]');
  if (!m) return null;
  const r = m.getBoundingClientRect();
  return { x: r.x, y: r.y, w: r.width, h: r.height };
});
console.log('modal:', modal);

const outPath = './temporary screenshots/screenshot-49-roster-zoom.png';
if (modal) {
  await page.screenshot({ path: outPath, clip: { x: modal.x, y: modal.y, width: modal.w, height: Math.min(modal.h, 600) } });
} else {
  await page.screenshot({ path: outPath });
}
console.log('Saved:', outPath);
await browser.close();
