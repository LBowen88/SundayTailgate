import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000/draft-board.html', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2500));

// Click a team filter chip (e.g. Dawg Pound)
await page.evaluate(() => {
  const chips = [...document.querySelectorAll('.fc-team')];
  const dp = chips.find(c => c.textContent.includes('Dawg'));
  if (dp) dp.click();
});
await new Promise(r => setTimeout(r, 300));
await page.screenshot({ path: './temporary screenshots/screenshot-70-db-filtered.png', clip: { x: 20, y: 240, width: 1400, height: 620 } });

// Switch to list view
await page.evaluate(() => { document.getElementById('btn-list')?.click(); });
await new Promise(r => setTimeout(r, 200));
await page.screenshot({ path: './temporary screenshots/screenshot-71-db-list.png', clip: { x: 20, y: 200, width: 900, height: 680 } });

console.log('Done');
await browser.close();
