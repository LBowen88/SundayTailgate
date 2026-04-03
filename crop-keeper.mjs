import { launch } from './node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';
const browser = await launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000/keeper-tracker.html', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 1500));
await page.screenshot({ path: './temporary screenshots/screenshot-101-keeper-hero.png', clip: { x:0, y:0, width:1440, height:560 } });
await page.screenshot({ path: './temporary screenshots/screenshot-102-keeper-table.png', clip: { x:0, y:420, width:1440, height:800 } });
await browser.close();
