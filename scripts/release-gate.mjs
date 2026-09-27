import { chromium } from "playwright";

const portfolioBase = process.env.PORTFOLIO_URL || "http://127.0.0.1:3000";

const projects = [
  { name: "Portfolio", url: portfolioBase, expected: "Ari Swerdlow" },
  { name: "Jiku case study", url: new URL("/work/jiku", portfolioBase).href, expected: "Jiku Fitness" },
  { name: "AR Baseball case study", url: new URL("/work/ar-baseball", portfolioBase).href, expected: "AR Baseball" },
  { name: "Bio-Tactical case study", url: new URL("/work/bio-tactical-edge", portfolioBase).href, expected: "Bio-Tactical Edge" },
  { name: "Jiku Fitness", url: "https://posture-app-nms-projects-e9ba3578.vercel.app/#dojo", expected: "JIKU" },
  { name: "Slice AR", url: "https://ar-fruit-slicer-orpin.vercel.app/", expected: "SLICE" },
  { name: "AR Baseball", url: "https://ar-baseball.vercel.app/", expected: "BASEBALL" },
  { name: "AR Tennis", url: "https://artennisgame.vercel.app/", expected: "TENNIS" },
  { name: "Pickleball Coach", url: "https://pickleball-coach-three.vercel.app/", expected: "PICKLEBALL" },
  { name: "ASL Hero", url: "https://asl-web-fawn.vercel.app/lesson?id=basics-1", expected: "ASL" },
  { name: "Orbitap", url: "https://arcadegame-kappa.vercel.app/", expected: "ORBITAP" },
];

async function launchBrowser() {
  try {
    return await chromium.launch({ headless: true });
  } catch (error) {
    if (!String(error).includes("Executable doesn't exist")) throw error;
    // Developer machines commonly have Chrome but not Playwright's optional
    // browser download. Use that installation so the gate stays one-command.
    return chromium.launch({ channel: "chrome", headless: true });
  }
}

const browser = await launchBrowser();
const results = [];

try {
  for (const project of projects) {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      permissions: [],
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    let result;
    try {
      const response = await page.goto(project.url, {
        waitUntil: "domcontentloaded",
        timeout: 20_000,
      });
      await page.waitForTimeout(3_000);

      const inspection = await page.evaluate((expected) => {
        const scripts = [...document.scripts].map((script) => script.src).filter(Boolean);
        const text = document.body?.innerText ?? "";
        return {
          title: document.title,
          textMatches: `${document.title} ${text}`.toLowerCase().includes(expected.toLowerCase()),
          hasInteraction: Boolean(document.querySelector("button, a[href], input, canvas")),
          rawSource: scripts.some((src) => /\/src\/(?:main|App)\.(?:t|j)sx?(?:\?|$)/i.test(src)),
          builtAsset: scripts.some((src) => /\/(?:_next|assets)\//.test(src)),
        };
      }, project.expected);

      // Camera-first products must still render on machines without camera hardware
      // (including hosted CI); permission/device absence is an expected fallback path.
      const blockingErrors = errors.filter(
        (message) =>
          !/favicon|Failed to load resource.*404|ResizeObserver|Blocked call to navigator\.vibrate|Camera access failed:\s*(?:NotAllowedError|NotFoundError)|WebSocket connection.*\/_next\/hmr.*failed/i.test(message),
      );
      const passed = Boolean(
        response?.ok() &&
          inspection.textMatches &&
          inspection.hasInteraction &&
          inspection.builtAsset &&
          !inspection.rawSource &&
          blockingErrors.length === 0,
      );
      result = {
        name: project.name,
        url: page.url(),
        passed,
        status: response?.status() ?? 0,
        ...inspection,
        errors: blockingErrors.slice(0, 3),
      };
    } catch (error) {
      result = {
        name: project.name,
        url: project.url,
        passed: false,
        errors: [error instanceof Error ? error.message : String(error)],
      };
    }

    results.push(result);
    console.log(`${result.passed ? "PASS" : "FAIL"}  ${project.name}`);
    await context.close();
  }
} finally {
  await browser.close();
}

const failed = results.filter((result) => !result.passed);
if (failed.length) {
  console.error(JSON.stringify(failed, null, 2));
  process.exitCode = 1;
} else {
  console.log(`\n${results.length}/${results.length} release checks passed.`);
}
