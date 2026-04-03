import { launch } from './node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const browser = await launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000/draft-board.html', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 2500));

await page.screenshot({ 
  path: './temporary screenshots/screenshot-78-top.png',
  clip: { x: 0, y: 60, width: 1440, height: 380 }
});
await page.screenshot({ 
  path: './temporary screenshots/screenshot-79-grid.png',
  clip: { x: 0, y: 400, width: 1440, height: 600 }
});

await browser.close();
console.log('Done');
