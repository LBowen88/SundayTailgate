import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2500));

// Open first team modal
await page.evaluate(() => {
  const rows = document.querySelectorAll('.standings-row');
  if (rows[0]) rows[0].click();
});
await new Promise(r => setTimeout(r, 800));

// Click roster tab
await page.evaluate(() => {
  const tabs = [...document.querySelectorAll('.tab-btn')];
  const rosterTab = tabs.find(t => t.textContent.includes('Roster') || t.textContent.includes('roster'));
  if (rosterTab) rosterTab.click();
});
await new Promise(r => setTimeout(r, 2000));

const outPath = './temporary screenshots/screenshot-46-roster-legend.png';
await page.screenshot({ path: outPath });
console.log('Saved:', outPath);
await browser.close();
