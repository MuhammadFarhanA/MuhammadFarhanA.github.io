import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, recordVideo: { dir: 'verification-video', size: { width: 1440, height: 900 } } });
const page = await context.newPage();
await page.goto(process.env.BASE_URL || 'http://127.0.0.1:5175/', { waitUntil: 'networkidle' });
await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
const journey = page.locator('[data-fractal-journey]');
for (const percent of [0, 18, 35, 50, 65, 82, 100, 82, 50, 18, 0]) { await page.evaluate((value) => { const element = document.querySelector('[data-fractal-journey]'); window.scrollTo({ top: element.offsetTop + (element.offsetHeight - innerHeight) * value / 100, behavior: 'instant' }); }, percent); await page.waitForTimeout(420); }
await journey.count();
const video = await page.video().path();
await context.close();
await fs.copyFile(video, 'verification-fractal-transition.webm');
console.log('Saved verification-fractal-transition.webm');
await browser.close();
