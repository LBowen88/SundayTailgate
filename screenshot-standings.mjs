import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1200 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 3000));

// scroll down to the standings area
await page.evaluate(() => window.scrollTo(0, 1600));
await new Promise(r => setTimeout(r, 500));

const outPath = './temporary screenshots/screenshot-38-standings-scroll.png';
await page.screenshot({ path: outPath });
console.log('Saved:', outPath);
await browser.close();
