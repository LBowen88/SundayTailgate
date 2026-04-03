import { launch } from './node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';
const browser = await launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000/team.html?roster_id=7', { waitUntil: 'domcontentloaded', timeout: 60000 });
await new Promise(r => setTimeout(r, 2200));
await page.screenshot({ path: './temporary screenshots/screenshot-93-mccaf-fixed.png', clip: { x:0, y:0, width:1440, height:530 } });
await browser.close();
