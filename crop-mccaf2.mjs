import { launch } from './node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const browser = await launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

// Try roster IDs to find McCaffreaks
for (const rid of [1,3,4,6,7,8,9,10]) {
  await page.goto(`http://localhost:3000/team.html?roster_id=${rid}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2200));
  const name = await page.$eval('#hero-name', el => el.textContent).catch(()=>'');
  console.log(`rid=${rid}: ${name}`);
  if (name.toLowerCase().includes('mccaf') || name.toLowerCase().includes('nature')) {
    console.log('Found at rid=' + rid);
    await page.screenshot({ path: './temporary screenshots/screenshot-91-mccaf.png', clip: { x:0, y:0, width:1440, height:530 } });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: './temporary screenshots/screenshot-92-mccaf-chart.png', clip: { x:0, y:470, width:1440, height:560 } });
    break;
  }
}

await browser.close();
