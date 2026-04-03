import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000/draft-board.html', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2500));

// Switch to list view (no filter)
await page.evaluate(() => { document.getElementById('btn-list')?.click(); });
await new Promise(r => setTimeout(r, 200));
await page.screenshot({ path: './temporary screenshots/screenshot-72-db-list-clean.png', clip: { x: 20, y: 220, width: 900, height: 660 } });
console.log('Done');
await browser.close();
