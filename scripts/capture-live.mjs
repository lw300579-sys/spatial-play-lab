/**
 * Capture real product UIs from live deployments.
 *
 * Chromium fake-media flags skip the permission prompt. The fake camera
 * has no body, so pose does not lock and these shots do not invent a
 * tracking overlay. WebP files land in public/shots.
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const shots = path.join(__dirname, "../public/shots");
fs.mkdirSync(shots, { recursive: true });

const targets = [
  { id: "ar-baseball-menu", url: "https://ar-baseball.vercel.app/", steps: [] },
  { id: "ar-baseball-stadium", url: "https://ar-baseball.vercel.app/", steps: ["Step up to bat", "I.m ready"] },
  { id: "jiku-tennis-menu", url: "https://artennisgame.vercel.app/", steps: [] },
  { id: "jiku-fitness-start", url: "https://posture-app-nms-projects-e9ba3578.vercel.app/#dojo", steps: [] },
  {
    id: "jiku-fitness-boxing-setup",
    url: "https://posture-app-nms-projects-e9ba3578.vercel.app/",
    steps: ["Set up my camera", "START BOXING"],
  },
  { id: "pickleball-coach-intro", url: "https://pickleball-coach-three.vercel.app/", steps: [] },
  { id: "ar-slicer-menu", url: "https://ar-fruit-slicer-orpin.vercel.app/", steps: [] },
  { id: "orbitap-start", url: "https://arcadegame-kappa.vercel.app/", steps: [] },
  { id: "asl-hero-lesson", url: "https://asl-web-fawn.vercel.app/lesson?id=basics-1", steps: [] },
];

const viewports = [
  { suffix: "desktop", width: 1280, height: 800, scale: 1 },
  { suffix: "mobile", width: 390, height: 844, scale: 1.5, mobile: true },
];

async function clickLabel(page, label) {
  const pattern = new RegExp(label, "i");
  const target = page.getByRole("button", { name: pattern }).or(page.getByText(pattern)).first();
  if (!(await target.isVisible().catch(() => false))) return false;
  await target.click({ timeout: 2500 }).catch(() => {});
  await page.waitForTimeout(1600);
  return true;
}

const browser = await chromium.launch({
  headless: true,
  channel: "chrome",
  args: [
    "--use-fake-ui-for-media-stream",
    "--use-fake-device-for-media-stream",
    "--autoplay-policy=no-user-gesture-required",
  ],
});

for (const target of targets) {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: viewport.scale,
      permissions: ["camera", "microphone"],
      hasTouch: Boolean(viewport.mobile),
      isMobile: Boolean(viewport.mobile),
    });
    const page = await context.newPage();
    const name = `${target.id}-${viewport.suffix}`;
    try {
      await page.goto(target.url, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForTimeout(1600);
      for (const step of target.steps) {
        const clicked = await clickLabel(page, step);
        if (!clicked) console.log(`${name} missed "${step}"`);
      }
      if (target.steps.length) await page.waitForTimeout(1200);
      const png = path.join(shots, `${name}.png`);
      await page.screenshot({ path: png, type: "png" });
      const webp = path.join(shots, `${name}.webp`);
      await sharp(png).webp({ quality: 72, effort: 5 }).toFile(webp);
      fs.rmSync(png, { force: true });
      console.log(`ok ${name} ${Math.round(fs.statSync(webp).size / 1024)}kb`);
    } catch (error) {
      console.log(`fail ${name}: ${error.message}`);
    } finally {
      await context.close();
    }
  }
}

await browser.close();
console.log("Bio-Tactical Edge has no public URL. Its shots are re-encoded from existing dev screenshots.");
