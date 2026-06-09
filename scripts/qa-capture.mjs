/**
 * QA helper: loads the running dev/prod server in headless Chrome,
 * captures console errors, measures FPS and saves screenshots.
 *
 * Requires playwright (not a project dependency):
 *   npm i --no-save playwright
 * Usage:
 *   node scripts/qa-capture.mjs [url] [outDir]
 */
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3000";
const outDir = process.argv[3] ?? "qa-output";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const consoleMessages = [];
const pageErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error" || msg.type() === "warning") {
    consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
  }
});
page.on("pageerror", (err) => pageErrors.push(String(err)));

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(5000); // let the scene compile shaders + settle

const fps = await page.evaluate(
  () =>
    new Promise((resolveFps) => {
      let frames = 0;
      const start = performance.now();
      function tick() {
        frames++;
        if (performance.now() - start < 2000) requestAnimationFrame(tick);
        else resolveFps(Math.round(frames / ((performance.now() - start) / 1000)));
      }
      requestAnimationFrame(tick);
    }),
);

await page.screenshot({ path: `${outDir}/hero-top.png` });

// Mid-hero scroll state (model rotated, camera dollied)
await page.evaluate(() => window.scrollTo({ top: window.innerHeight, behavior: "instant" }));
await page.waitForTimeout(1200);
await page.screenshot({ path: `${outDir}/hero-mid.png` });

// Below the hero
await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 2.5, behavior: "instant" }));
await page.waitForTimeout(800);
await page.screenshot({ path: `${outDir}/below-hero.png` });

const result = {
  url,
  fps,
  consoleIssues: consoleMessages,
  pageErrors,
};
console.log(JSON.stringify(result, null, 2));

await browser.close();
process.exit(pageErrors.length > 0 ? 1 : 0);
