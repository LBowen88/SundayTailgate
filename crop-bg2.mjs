import { launch } from './node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';
const browser = await launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

// Index hero
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 1200));
await page.screenshot({ path: './temporary screenshots/screenshot-97-index-bg.png', clip: { x:0, y:0, width:1440, height:560 } });

// Draft board
await page.goto('http://localhost:3000/draft-board.html', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 2200));
await page.screenshot({ path: './temporary screenshots/screenshot-98-draftboard-bg.png', clip: { x:0, y:0, width:1440, height:560 } });

await browser.close();
