import { mkdir, writeFile } from "node:fs/promises";
import { chromium, request as playwrightRequest } from "playwright";

const portfolioBase = process.env.PORTFOLIO_URL || "http://127.0.0.1:3000";

const portfolioRoutes = [
  { name: "Portfolio", path: "/", expected: "Ari Swerdlow", kind: "home" },
  { name: "Evidence ledger", path: "/evidence", expected: "Proof, gaps", kind: "evidence" },
  { name: "Privacy", path: "/privacy", expected: "Privacy, in plain language", kind: "privacy" },
  { name: "Jiku case study", path: "/work/jiku", expected: "Jiku Fitness", kind: "case-study" },
  { name: "AR Baseball case study", path: "/work/ar-baseball", expected: "AR Baseball", kind: "case-study" },
  { name: "Bio-Tactical case study", path: "/work/bio-tactical-edge", expected: "Bio-Tactical Edge", kind: "case-study" },
];

const liveProducts = [
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
    return chromium.launch({ channel: "chrome", headless: true });
  }
}

function collectErrors(page) {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  return errors;
}

function blockingErrors(errors) {
  return errors.filter(
    (message) =>
      !/favicon|Failed to load resource.*404|ResizeObserver|Blocked call to navigator\.vibrate|Camera access failed:\s*(?:NotAllowedError|NotFoundError)|WebSocket connection.*\/_next\/hmr.*failed/i.test(message),
  );
}

async function checkPortfolioRoute(browser, route) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const errors = collectErrors(page);
  const url = new URL(route.path, portfolioBase).href;

  try {
    const response = await page.goto(url, { waitUntil: "networkidle", timeout: 20_000 });
    const inspection = await page.evaluate(({ expected, kind }) => {
      const text = `${document.title} ${document.body?.innerText ?? ""}`;
      const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')]
        .map((node) => node.textContent)
        .filter(Boolean);
      const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute("content") ?? "";
      return {
        title: document.title,
        textMatches: text.toLowerCase().includes(expected.toLowerCase()),
        hasInteraction: Boolean(document.querySelector("button, a[href], input, canvas")),
        builtAsset: [...document.scripts].some((script) => /\/_next\//.test(script.src)),
        hasJsonLd: jsonLd.length > 0,
        hasOgImage: kind === "privacy" || kind === "evidence" || Boolean(ogImage),
        hasEvidenceTable: kind !== "case-study" || document.querySelectorAll("table tbody tr").length >= 3,
        hasPrivacyCopy: kind !== "case-study" || text.toLowerCase().includes("camera data"),
        noHorizontalOverflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
      };
    }, route);

    const csp = response?.headers()["content-security-policy"] ?? "";
    const permissions = response?.headers()["permissions-policy"] ?? "";
    const fatalErrors = blockingErrors(errors);
    const passed = Boolean(
      response?.ok() &&
        Object.values(inspection).every(Boolean) &&
        csp.includes("default-src 'self'") &&
        csp.includes("frame-ancestors 'none'") &&
        permissions.includes("camera=()") &&
        fatalErrors.length === 0,
    );

    return {
      name: route.name,
      category: "portfolio-route",
      url,
      status: response?.status() ?? 0,
      passed,
      ...inspection,
      csp: Boolean(csp),
      errors: fatalErrors.slice(0, 3),
    };
  } catch (error) {
    return { name: route.name, category: "portfolio-route", url, passed: false, errors: [String(error)] };
  } finally {
    await context.close();
  }
}

async function checkLiveProduct(browser, project) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, permissions: [] });
  const page = await context.newPage();
  const errors = collectErrors(page);

  try {
    const response = await page.goto(project.url, { waitUntil: "domcontentloaded", timeout: 20_000 });
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

    const fatalErrors = blockingErrors(errors);
    const passed = Boolean(
      response?.ok() &&
        inspection.textMatches &&
        inspection.hasInteraction &&
        inspection.builtAsset &&
        !inspection.rawSource &&
        fatalErrors.length === 0,
    );
    return {
      name: project.name,
      category: "production-shell",
      url: page.url(),
      status: response?.status() ?? 0,
      passed,
      ...inspection,
      errors: fatalErrors.slice(0, 3),
    };
  } catch (error) {
    return { name: project.name, category: "production-shell", url: project.url, passed: false, errors: [String(error)] };
  } finally {
    await context.close();
  }
}

async function checkPortfolioAssets() {
  const request = await playwrightRequest.newContext();
  const checks = [];
  try {
    const assets = [
      { name: "Resume PDF", path: "/ari-swerdlow-resume.pdf", type: "application/pdf" },
      { name: "Case-study share image", path: "/work/jiku/opengraph-image", type: "image/png" },
      { name: "Usability template", path: "/evidence/usability-session-template.csv", type: "text/csv" },
    ];
    for (const asset of assets) {
      const response = await request.get(new URL(asset.path, portfolioBase).href);
      const contentType = response.headers()["content-type"] ?? "";
      checks.push({
        name: asset.name,
        category: "portfolio-asset",
        url: new URL(asset.path, portfolioBase).href,
        status: response.status(),
        contentType,
        passed: response.ok() && contentType.includes(asset.type),
      });
    }

    const validEvent = await request.post(new URL("/api/events", portfolioBase).href, {
      data: { event: "evidence_open", target: "release-gate", path: "/evidence" },
    });
    const invalidEvent = await request.post(new URL("/api/events", portfolioBase).href, {
      data: { event: "arbitrary_event", target: "release-gate", path: "/" },
    });
    checks.push({
      name: "Privacy-safe event allowlist",
      category: "portfolio-api",
      url: new URL("/api/events", portfolioBase).href,
      passed: validEvent.status() === 204 && invalidEvent.status() === 400,
      validStatus: validEvent.status(),
      invalidStatus: invalidEvent.status(),
    });

    const notFound = await request.get(new URL("/this-route-must-not-exist", portfolioBase).href);
    checks.push({
      name: "Custom 404",
      category: "portfolio-route",
      url: new URL("/this-route-must-not-exist", portfolioBase).href,
      status: notFound.status(),
      passed: notFound.status() === 404 && (await notFound.text()).includes("This route left the frame"),
    });

    const sitemap = await request.get(new URL("/sitemap.xml", portfolioBase).href);
    const sitemapText = await sitemap.text();
    checks.push({
      name: "Dated sitemap",
      category: "metadata",
      url: new URL("/sitemap.xml", portfolioBase).href,
      status: sitemap.status(),
      passed:
        sitemap.ok() &&
        sitemapText.includes("2026-09-26") &&
        sitemapText.includes("/evidence") &&
        sitemapText.includes("/privacy"),
    });
  } finally {
    await request.dispose();
  }
  return checks;
}

const browser = await launchBrowser();
const results = [];

try {
  for (const route of portfolioRoutes) {
    const result = await checkPortfolioRoute(browser, route);
    results.push(result);
    console.log(`${result.passed ? "PASS" : "FAIL"}  ${result.name}`);
  }

  const assetResults = await checkPortfolioAssets();
  for (const result of assetResults) {
    results.push(result);
    console.log(`${result.passed ? "PASS" : "FAIL"}  ${result.name}`);
  }

  for (const project of liveProducts) {
    const result = await checkLiveProduct(browser, project);
    results.push(result);
    console.log(`${result.passed ? "PASS" : "FAIL"}  ${result.name}`);
  }
} finally {
  await browser.close();
}

const report = {
  generatedAt: new Date().toISOString(),
  scope: {
    portfolio: "Routes, metadata, security, assets, API validation, mobile layout, and console health",
    linkedProducts: "Production shell only; product-native recorded-camera and deterministic gates remain separate evidence",
  },
  passed: results.filter((result) => result.passed).length,
  total: results.length,
  results,
};

await mkdir(".artifacts", { recursive: true });
await writeFile(".artifacts/release-gate.json", `${JSON.stringify(report, null, 2)}\n`);

const failed = results.filter((result) => !result.passed);
if (failed.length) {
  console.error(JSON.stringify(failed, null, 2));
  process.exitCode = 1;
} else {
  console.log(`\n${report.total}/${report.total} release checks passed.`);
}
