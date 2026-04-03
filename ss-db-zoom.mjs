import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 2000 });
await page.goto('http://localhost:3000/draft-board.html', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2500));

// Controls + filters
await page.screenshot({ path: './temporary screenshots/screenshot-68-db-controls.png', clip: { x: 0, y: 60, width: 1440, height: 220 } });
// Grid top (header + first 8 rounds)
await page.screenshot({ path: './temporary screenshots/screenshot-69-db-grid-top.png', clip: { x: 20, y: 295, width: 1400, height: 620 } });
console.log('Done');
await browser.close();
