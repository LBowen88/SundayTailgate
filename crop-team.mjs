import { launch } from './node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const browser = await launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

// Test with team roster_id=5 (champion Paintin' Manning)
await page.goto('http://localhost:3000/team.html?roster_id=5', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 3000));

await page.screenshot({ path: './temporary screenshots/screenshot-87-team-hero.png', clip: { x:0, y:0, width:1440, height:560 } });
await page.screenshot({ path: './temporary screenshots/screenshot-88-team-content.png', clip: { x:0, y:460, width:1440, height:700 } });

await browser.close();
console.log('Done');
