import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000/draft-board.html', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2500));
await page.evaluate(() => { document.getElementById('btn-list')?.click(); });
await new Promise(r => setTimeout(r, 200));

// Check what's in the list view
const info = await page.evaluate(() => {
  const lv = document.getElementById('list-view');
  const ll = document.getElementById('lv-list');
  const gv = document.getElementById('grid-view');
  return {
    lvDisplay: lv ? window.getComputedStyle(lv).display : 'no element',
    gvDisplay: gv ? window.getComputedStyle(gv).display : 'no element',
    lvChildren: ll ? ll.children.length : 0,
    lvScrollHeight: lv ? lv.scrollHeight : 0,
    lvBound: lv ? JSON.stringify(lv.getBoundingClientRect()) : 'n/a'
  };
});
console.log('info:', JSON.stringify(info));

// Full viewport screenshot
await page.screenshot({ path: './temporary screenshots/screenshot-73-list-full.png' });
console.log('Done');
await browser.close();
