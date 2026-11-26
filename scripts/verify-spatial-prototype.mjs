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
  await page.waitForTimeout(2500);
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

await capture('milestone-1-mirror-arrival');
await applyWheel(180);
await capture('milestone-2-mirror-introduction');
await applyWheel(180);
await capture('milestone-3-mirror-content');
await applyWheel(180);
await capture('milestone-4-fractal-arrival-portal-crossing');
await applyWheel(180);
await capture('milestone-5-fractal-introduction');
await applyWheel(180);
await capture('milestone-6-fractal-content');

await applyWheel(-180);
await capture('reverse-milestone-5');
await applyWheel(-180);
await applyWheel(-180);
await applyWheel(-180);
await applyWheel(-180);
const reverseEntrance = await capture('reverse-milestone-1');

await page.getByRole('button', { name: 'Fractal architecture' }).click();
const directNavigation = await capture('direct-fractal-navigation');
await page.getByRole('button', { name: 'Mirror chamber' }).click();
await capture('direct-mirror-navigation');

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
  directNavigation,
  finalState,
  reverseEntrance,
  afterBackward,
  errors,
};
await fs.writeFile('verification-spatial.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();

const hasMilestone = (index) =>
  checkpoints.some(({ debug }) => debug.includes(`milestone: ${index}`));
const reachedAllMilestones = [1, 2, 3, 4, 5, 6].every(hasMilestone);
const milestonesSettled = checkpoints
  .slice(0, 6)
  .every(({ debug }) => debug.includes('settled: yes'));
const returnedToEntrance = /milestone: 1/.test(reverseEntrance);
const directNavigationWorked = /milestone: 4/.test(directNavigation);

if (
  errors.length ||
  bodyMetrics.scrollY !== 0 ||
  bodyMetrics.scrollHeight !== bodyMetrics.innerHeight ||
  !reachedAllMilestones ||
  !milestonesSettled ||
  !returnedToEntrance ||
  !directNavigationWorked
) {
  process.exitCode = 1;
}
