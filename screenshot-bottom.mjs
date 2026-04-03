import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1200 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 3000));
await page.evaluate(() => window.scrollTo(0, 1480));
await new Promise(r => setTimeout(r, 400));

const outPath = './temporary screenshots/screenshot-39-tb-zoom.png';
await page.screenshot({ path: outPath, clip: { x: 100, y: 0, width: 700, height: 200 } });
console.log('Saved:', outPath);
await browser.close();
