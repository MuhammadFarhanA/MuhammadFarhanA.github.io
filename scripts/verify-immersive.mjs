import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:5173/';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
const consoleErrors = [];
page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
page.on('pageerror', (error) => consoleErrors.push(error.message));
await page.goto(baseURL, { waitUntil: 'networkidle' });
await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await page.waitForSelector('canvas');
const canvas = await page.locator('canvas').count();
const checkpoints = [];
for (const percent of [0, 25, 50, 75, 100]) {
  await page.evaluate((value) => { const journey = document.querySelector('[data-immersive-journey]'); window.scrollTo(0, journey.offsetTop + (journey.offsetHeight - window.innerHeight) * value / 100); }, percent);
  await page.waitForTimeout(700);
  const snapshot = await page.evaluate(() => ({
    progress: document.querySelector('[data-immersive-journey]')?.style.getPropertyValue('--journey-progress'),
    activeScene: document.querySelector('[data-immersive-journey]')?.dataset.activeScene,
    debug: document.querySelector('.debug-panel')?.innerText,
    transforms: window.__heroTransforms,
  }));
  await page.screenshot({ path: `verification-immersive-${percent}.png`, fullPage: false });
  checkpoints.push({ percent, ...snapshot });
}
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
await page.waitForTimeout(200);
const start = await page.locator('.debug-panel').innerText();
await page.evaluate(() => { const journey = document.querySelector('[data-immersive-journey]'); window.scrollTo({ top: journey.offsetTop + journey.offsetHeight - window.innerHeight + 2, behavior: 'instant' }); });
await page.waitForTimeout(700);
const end = await page.locator('.debug-panel').innerText();
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
await page.waitForTimeout(700);
const backward = await page.locator('.debug-panel').innerText();
await page.getByRole('button', { name: /Standard mode/i }).click();
const standardCanvasCount = await page.locator('canvas').count();
const reducedContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const reducedPage = await reducedContext.newPage();
await reducedPage.goto(baseURL, { waitUntil: 'networkidle' });
const reducedCanvasCount = await reducedPage.locator('canvas').count();
const report = { canvas, standardCanvasCount, reducedCanvasCount, forwardStart: start, forwardEnd: end, backwardReturn: backward, checkpoints, consoleErrors };
await fs.writeFile('verification-immersive.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();
await reducedContext.close();
if (consoleErrors.length || canvas !== 1 || standardCanvasCount !== 0 || reducedCanvasCount !== 0) process.exitCode = 1;
