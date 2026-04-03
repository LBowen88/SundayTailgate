import { launch } from './node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';
const browser = await launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 1500));

// Hero area
await page.screenshot({ path: './temporary screenshots/screenshot-95-hero.png', clip: { x:0, y:0, width:1440, height:560 } });
// Middle section  
await page.screenshot({ path: './temporary screenshots/screenshot-96-mid.png', clip: { x:0, y:540, width:1440, height:600 } });

await browser.close();
