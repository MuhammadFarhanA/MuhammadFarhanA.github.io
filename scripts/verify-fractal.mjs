import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:5175/';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
const page = await context.newPage();
const errors = [];
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
page.on('pageerror', (error) => errors.push(error.message));
await page.goto(baseURL, { waitUntil: 'networkidle' });
await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
const screenshots = [];
for (const percent of [0, 25, 50, 75, 100]) {
  await page.evaluate((value) => { const journey = document.querySelector('[data-fractal-journey]'); window.scrollTo({ top: journey.offsetTop + (journey.offsetHeight - innerHeight) * value / 100, behavior: 'instant' }); }, percent);
  await page.waitForTimeout(500);
  const debug = await page.locator('.fractal-debug').innerText();
  const path = `verification-fractal-${percent}.png`;
  await page.screenshot({ path, fullPage: false });
  screenshots.push({ percent, debug, path });
}
await page.getByRole('button', { name: 'Standard' }).click();
const standardCanvas = await page.locator('canvas').count();
await page.goto(`${baseURL}projects`, { waitUntil: 'networkidle' });
const projectsRoute = await page.locator('body').innerText();
await page.goto(`${baseURL}poems/0`, { waitUntil: 'networkidle' });
const poemsRoute = await page.locator('body').innerText();
const reducedContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const reducedPage = await reducedContext.newPage();
await reducedPage.goto(baseURL, { waitUntil: 'networkidle' });
const reducedCanvas = await reducedPage.locator('canvas').count();
const report = { canvas: 1, standardCanvas, reducedCanvas, screenshots, projectsRoute: projectsRoute.includes('Complete Project Collection'), poemsRoute: poemsRoute.includes('Lost'), errors };
await fs.writeFile('verification-fractal.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await reducedContext.close();
await browser.close();
if (errors.length || standardCanvas !== 0 || reducedCanvas !== 0 || !report.projectsRoute || !report.poemsRoute) process.exitCode = 1;
