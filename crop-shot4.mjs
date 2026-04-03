import { launch } from './node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const browser = await launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000/draft-board.html', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 2500));

// Screenshot nav area
await page.screenshot({ 
  path: './temporary screenshots/screenshot-84-nav.png',
  clip: { x: 0, y: 0, width: 1440, height: 80 }
});

// Open Teams dropdown
await page.evaluate(() => {
  document.querySelector('.nav-dropdown-toggle').click();
});
await new Promise(r => setTimeout(r, 400));

await page.screenshot({ 
  path: './temporary screenshots/screenshot-85-teams-dropdown.png',
  clip: { x: 0, y: 0, width: 1440, height: 420 }
});

// Click first team in dropdown
await page.evaluate(() => {
  const link = document.querySelector('#nav-teams-dropdown a');
  if (link) link.click();
});
await new Promise(r => setTimeout(r, 600));

await page.screenshot({ 
  path: './temporary screenshots/screenshot-86-modal.png',
  clip: { x: 200, y: 50, width: 1040, height: 800 }
});

await browser.close();
console.log('Done');
