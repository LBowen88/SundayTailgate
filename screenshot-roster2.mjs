import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2500));

await page.evaluate(() => { document.querySelectorAll('.standings-row')[0]?.click(); });
await new Promise(r => setTimeout(r, 800));

// Log tab texts
const tabs = await page.evaluate(() => 
  [...document.querySelectorAll('.tab-btn')].map(t => t.textContent.trim())
);
console.log('tabs:', tabs);

// Click final roster tab (last one)
await page.evaluate(() => {
  const tabs = [...document.querySelectorAll('.tab-btn')];
  tabs[tabs.length - 1]?.click();
});
await new Promise(r => setTimeout(r, 2500));

const outPath = './temporary screenshots/screenshot-47-roster-legend.png';
await page.screenshot({ path: outPath });
console.log('Saved:', outPath);
await browser.close();
