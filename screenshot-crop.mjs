import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 3000));

// scroll to standings
await page.evaluate(() => {
  const el = document.querySelector('.standings-section') || document.querySelector('[class*="standings"]');
  if (el) el.scrollIntoView();
});
await new Promise(r => setTimeout(r, 500));

const clip = await page.evaluate(() => {
  const el = document.querySelector('.standings-section') || document.querySelector('.final-standings') || 
    [...document.querySelectorAll('section, div')].find(e => e.textContent.includes('Final Standings'));
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: r.x, y: r.y, width: r.width, height: r.height };
});

console.log('clip:', JSON.stringify(clip));

const dir = './temporary screenshots';
const files = fs.readdirSync(dir).filter(f => f.match(/^screenshot-\d+/));
const nums = files.map(f => parseInt(f.match(/\d+/)[0])).filter(n => !isNaN(n));
const next = nums.length ? Math.max(...nums) + 1 : 1;
const outPath = path.join(dir, `screenshot-${next}-standings-zoom.png`);

if (clip && clip.height > 0) {
  await page.screenshot({ path: outPath, clip: { x: Math.max(0, clip.x), y: Math.max(0, clip.y), width: Math.min(clip.width, 1440), height: Math.min(clip.height, 900) } });
} else {
  await page.screenshot({ path: outPath, fullPage: true });
}
console.log('Saved:', outPath);
await browser.close();
