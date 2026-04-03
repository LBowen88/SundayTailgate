import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 3000));

const info = await page.evaluate(() => {
  const rows = [...document.querySelectorAll('.standings-row')];
  return rows.map((r, i) => {
    const rect = r.getBoundingClientRect();
    return { i, text: r.textContent.trim().slice(0,40), top: rect.top + window.scrollY };
  });
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
