import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 3000));

const rows = await page.evaluate(() => {
  return [...document.querySelectorAll('.standings-row')].map((r, i) => ({
    rank: i + 1,
    text: r.innerText.replace(/\s+/g, ' ').trim().slice(0, 80)
  }));
});
console.log(JSON.stringify(rows, null, 2));
await browser.close();
