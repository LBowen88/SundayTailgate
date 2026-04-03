import { launch } from './node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const browser = await launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000/draft-board.html', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 2500));

// Click on a team chip to test focus panel
await page.evaluate(() => {
  const chips = document.querySelectorAll('.lc-team');
  if (chips[0]) chips[0].click();
});
await new Promise(r => setTimeout(r, 500));

await page.screenshot({ 
  path: './temporary screenshots/screenshot-80-focus.png',
  clip: { x: 0, y: 360, width: 1440, height: 700 }
});

// Switch to list view
await page.evaluate(() => {
  const listBtn = document.querySelector('[onclick*="list"]');
  if (listBtn) listBtn.click();
});
await new Promise(r => setTimeout(r, 500));

await page.screenshot({ 
  path: './temporary screenshots/screenshot-81-list.png',
  clip: { x: 0, y: 350, width: 1440, height: 800 }
});

await browser.close();
console.log('Done');
