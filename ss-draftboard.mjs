import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 2000 });
await page.goto('http://localhost:3000/draft-board.html', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2500));
// Header + legend
await page.screenshot({ path: './temporary screenshots/screenshot-65-db-header.png', clip: { x: 0, y: 0, width: 1440, height: 420 } });
// Grid
await page.screenshot({ path: './temporary screenshots/screenshot-66-db-grid.png', clip: { x: 20, y: 400, width: 1400, height: 900 } });
console.log('Done');
await browser.close();
