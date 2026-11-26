import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:5176/spatial-prototype';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  recordVideo: { dir: 'spatial-video', size: { width: 1440, height: 900 } },
});
const page = await context.newPage();
const errors = [];
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text());
});
page.on('pageerror', (error) => errors.push(error.message));
await page.goto(baseURL, { waitUntil: 'networkidle' });
await page.waitForSelector('canvas');
const applyWheel = async (delta) => {
  const direction = Math.sign(delta);
  let remaining = Math.abs(delta);
  while (remaining > 0) {
    const step = Math.min(160, remaining);
    await page.mouse.wheel(0, direction * step);
    remaining -= step;
    await page.waitForTimeout(80);
  }
};
const checkpoints = [];
const bodyMetrics = await page.evaluate(() => ({
  scrollY,
  scrollHeight: document.documentElement.scrollHeight,
  innerHeight,
}));
for (const [name, delta] of [
  ['entrance', 0],
  ['white-fractal', 700],
  ['liquid-metal', 500],
]) {
  if (delta) await applyWheel(delta);
  await page.waitForTimeout(900);
  const debug = await page.locator('.spatial-debug').innerText();
  const path = `verification-spatial-${name}.png`;
  await page.screenshot({ path });
  checkpoints.push({ name, debug });
}
await applyWheel(700);
await page.waitForTimeout(1200);
const forward = await page.locator('.spatial-debug').innerText();
await applyWheel(-1400);
await page.waitForTimeout(4000);
const backward = await page.locator('.spatial-debug').innerText();
const afterBackward = await page.evaluate(() => ({
  scrollY,
  scrollHeight: document.documentElement.scrollHeight,
}));
const video = await page.video().path();
await context.close();
await fs.copyFile(video, 'verification-spatial-journey.webm');
const report = { bodyMetrics, checkpoints, forward, backward, afterBackward, errors };
await fs.writeFile('verification-spatial.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();
if (
  errors.length ||
  bodyMetrics.scrollY !== 0 ||
  bodyMetrics.scrollHeight !== bodyMetrics.innerHeight ||
  !checkpoints[1].debug.includes('dimension: fractal') ||
  !checkpoints[2].debug.includes('dimension: liquid-metal') ||
  !/travel: 0\.0/.test(backward) ||
  !forward.includes('dimension: liquid-metal')
)
  process.exitCode = 1;
