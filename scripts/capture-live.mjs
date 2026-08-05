/**
 * Capture real product UIs from live deployments.
 */
import { chromium, devices } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "captures");
fs.mkdirSync(out, { recursive: true });

const targets = [
  {
    id: "jiku-tennis",
    url: "https://artennisgame.vercel.app/",
    wait: 4000,
  },
  {
    id: "jiku-fitness",
    url: "https://posture-app-nms-projects-e9ba3578.vercel.app/#academy",
    wait: 4500,
  },
  {
    id: "asl-hero",
    url: "https://asl-web-fawn.vercel.app/",
    wait: 4000,
  },
  {
    id: "form-pickleball",
    url: "https://pickleball-coach-three.vercel.app/",
    wait: 4000,
  },
  {
    id: "ar-baseball",
    url: "https://ar-baseball.vercel.app/",
    wait: 4500,
  },
  {
    id: "ar-slicer",
    url: "https://ar-fruit-slicer-orpin.vercel.app/",
    wait: 4500,
  },
];

const browser = await chromium.launch({ headless: true });
const iphone = devices["iPhone 13 Pro"];

for (const t of targets) {
  const context = await browser.newContext({
    ...iphone,
    deviceScaleFactor: 3,
  });
  const page = await context.newPage();
  try {
    await page.goto(t.url, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(t.wait);
    // Dismiss common permission / cookie noise if present
    await page.keyboard.press("Escape").catch(() => {});
    const dest = path.join(out, `${t.id}.png`);
    await page.screenshot({ path: dest, type: "png", fullPage: false });
    const kb = Math.round(fs.statSync(dest).size / 1024);
    console.log(`ok ${t.id} ${kb}kb`);
  } catch (e) {
    console.log(`fail ${t.id}: ${e.message}`);
  } finally {
    await context.close();
  }
}

await browser.close();
