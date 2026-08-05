import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "captures");
fs.mkdirSync(out, { recursive: true });

const targets = [
  ["jiku-fitness", "https://posture-app-nms-projects-e9ba3578.vercel.app/#academy"],
  ["asl-hero", "https://asl-web-fawn.vercel.app/lesson?id=basics-1"],
  ["ar-baseball", "https://ar-baseball.vercel.app/"],
  ["ar-slicer", "https://ar-fruit-slicer-orpin.vercel.app/"],
  ["jiku-tennis", "https://artennisgame.vercel.app/"],
  ["form-pickleball", "https://pickleball-coach-three.vercel.app/"],
];

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});

for (const [name, url] of targets) {
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(3000);
    const dest = path.join(out, `${name}.png`);
    await page.screenshot({ path: dest, type: "png" });
    console.log(`ok ${name} ${Math.round(fs.statSync(dest).size / 1024)}kb`);
  } catch (e) {
    console.log(`fail ${name}: ${e.message}`);
  } finally {
    await page.close();
  }
}
await browser.close();
