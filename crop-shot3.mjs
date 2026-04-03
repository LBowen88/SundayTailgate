import { launch } from './node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const browser = await launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000/draft-board.html', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 2500));

// Click 3 different team chips
await page.evaluate(() => {
  const chips = document.querySelectorAll('.lc-team');
  if (chips[0]) chips[0].click();
  if (chips[2]) chips[2].click();
  if (chips[5]) chips[5].click();
});
await new Promise(r => setTimeout(r, 500));

await page.screenshot({ 
  path: './temporary screenshots/screenshot-82-multiselect.png',
  clip: { x: 0, y: 340, width: 1440, height: 700 }
});

// Also grab controls bar (no direction text)
await page.screenshot({ 
  path: './temporary screenshots/screenshot-83-controls.png',
  clip: { x: 0, y: 230, width: 1440, height: 140 }
});

await browser.close();
console.log('Done');
