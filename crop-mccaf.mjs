import { launch } from './node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const browser = await launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

// Find McCaffreaks roster_id — try a few IDs
for (const rid of [1,2,3,4,6,7,8,9,10]) {
  await page.goto(`http://localhost:3000/team.html?roster_id=${rid}`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1800));
  const name = await page.$eval('#hero-name', el => el.textContent).catch(()=>'');
  if (name.toLowerCase().includes('mccaf') || name.toLowerCase().includes('nature')) {
    console.log('Found McCaffreaks at roster_id=' + rid);
    await page.screenshot({ path: './temporary screenshots/screenshot-91-mccaf-hero.png', clip: { x:0, y:0, width:1440, height:520 } });
    
    // Wait for weekly data then screenshot chart
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: './temporary screenshots/screenshot-92-mccaf-chart.png', clip: { x:0, y:450, width:1440, height:600 } });
    break;
  }
}

await browser.close();
console.log('Done');
