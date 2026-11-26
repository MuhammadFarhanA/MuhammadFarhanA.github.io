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
const checkpoints = [];

page.on('console', (message) => {
  if (message.type() === 'error') {
    errors.push(message.text());
  }
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

const capture = async (name) => {
  await page.waitForTimeout(1400);
  const debug = await page.locator('.spatial-debug').innerText();
  await page.screenshot({ path: `verification-spatial-${name}.png` });
  checkpoints.push({ name, debug });
  return debug;
};

const bodyMetrics = await page.evaluate(() => ({
  scrollY,
  scrollHeight: document.documentElement.scrollHeight,
  innerHeight,
}));

await capture('initial-mirror-chamber');
await applyWheel(180);
await capture('mirror-chamber-midpoint');
await applyWheel(260);
await capture('first-portal-approach');
await applyWheel(100);
await capture('first-portal-boundary-crossing');
await applyWheel(250);
await capture('fractal-arrival');
await applyWheel(350);
await capture('second-portal-boundary-crossing');
await applyWheel(250);
await capture('liquid-metal-arrival');
await applyWheel(-800);
await capture('reverse-liquid-approach');
await applyWheel(-700);
const reverseEntrance = await capture('reverse-entrance');

const finalState = await page.locator('.spatial-debug').innerText();
const afterBackward = await page.evaluate(() => ({
  scrollY,
  scrollHeight: document.documentElement.scrollHeight,
}));
const video = await page.video().path();
await context.close();
await fs.copyFile(video, 'verification-spatial-journey.webm');

const report = {
  bodyMetrics,
  checkpoints,
  finalState,
  reverseEntrance,
  afterBackward,
  errors,
};
await fs.writeFile('verification-spatial.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();

const hasDimension = (name) => checkpoints.some(({ debug }) => debug.includes(name));
const crossedToFractal = hasDimension('dimension: fractal-architecture');
const crossedToLiquid = hasDimension('dimension: liquid-metal');
const returnedToEntrance = /travel: 0\.0/.test(reverseEntrance);

if (
  errors.length ||
  bodyMetrics.scrollY !== 0 ||
  bodyMetrics.scrollHeight !== bodyMetrics.innerHeight ||
  !crossedToFractal ||
  !crossedToLiquid ||
  !returnedToEntrance
) {
  process.exitCode = 1;
}
