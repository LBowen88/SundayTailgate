import { launch } from './node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const browser = await launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

// Test Season Metrics tab on Paintin' Manning
await page.goto('http://localhost:3000/team.html?roster_id=5', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 3500));
await page.click('[data-tab="metrics"]');
await new Promise(r => setTimeout(r, 300));
await page.screenshot({ path: './temporary screenshots/screenshot-89-metrics.png', clip: { x:0, y:120, width:1440, height:780 } });

// Test with a vibrant color team (dancooper10 = #39ff14 neon green — roster_id we need to find)
// Let's try another roster_id — check Dawg Pound (red) or GunzNRosen (pink)
await page.goto('http://localhost:3000/team.html?roster_id=2', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 2500));
await page.screenshot({ path: './temporary screenshots/screenshot-90-team2-hero.png', clip: { x:0, y:0, width:1440, height:440 } });

await browser.close();
console.log('Done');
