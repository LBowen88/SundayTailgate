import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000/draft-board.html', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2500));
// Switch to list
await page.evaluate(() => { document.getElementById('btn-list')?.click(); });
await new Promise(r => setTimeout(r, 300));
// Full viewport
await page.screenshot({ path: './temporary screenshots/screenshot-74-list-fixed.png' });
// Zoom into list content
await page.screenshot({ path: './temporary screenshots/screenshot-75-list-zoom.png', clip: { x: 20, y: 220, width: 800, height: 660 } });
console.log('Done');
await browser.close();
