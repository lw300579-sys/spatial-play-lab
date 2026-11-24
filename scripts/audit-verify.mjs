import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { chromium, request as playwrightRequest } from "playwright";

const PORT = 3099;
const BASE = `http://127.0.0.1:${PORT}`;
const SHOTS_DIR =
  "/Users/ariswerdlow/.gemini/antigravity/brain/b903620d-56de-4504-8a3e-9f6f1e684584/scratch/verify_shots";

function parseRgb(colorStr) {
  const m = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) throw new Error(`Cannot parse color: ${colorStr}`);
  return [Number(m[1]) / 255, Number(m[2]) / 255, Number(m[3]) / 255];
}

function relLum([r, g, b]) {
  const f = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrastRatio(fg, bg) {
  const l1 = relLum(parseRgb(fg));
  const l2 = relLum(parseRgb(bg));
  return Number(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2));
}

async function waitForServer(url, timeoutMs = 20_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Server did not start at ${url}`);
}

async function launchBrowser() {
  try {
    return await chromium.launch({ headless: true });
  } catch (error) {
    if (!String(error).includes("Executable doesn't exist")) throw error;
    return chromium.launch({ channel: "chrome", headless: true });
  }
}

await mkdir(SHOTS_DIR, { recursive: true });

const server = spawn("npx", ["next", "start", "-p", String(PORT), "-H", "127.0.0.1"], {
  stdio: "ignore",
  detached: false,
});

const consoleErrors = [];
const pageErrors = [];
let browser;

try {
  await waitForServer(BASE);
  browser = await launchBrowser();

  // Check built page chunk sizes
  const chunksDir = path.join(process.cwd(), ".next/static/chunks/app");
  const chunkFiles = await readdir(chunksDir);
  const pageChunk = chunkFiles.find((f) => f.startsWith("page-") && f.endsWith(".js"));
  const pageChunkBytes = pageChunk ? (await stat(path.join(chunksDir, pageChunk))).size : 0;
  console.log(`Home page JS chunk: ${pageChunk} (${pageChunkBytes} bytes uncompressed)`);
  assert.ok(pageChunkBytes > 0 && pageChunkBytes < 20_000, `Expected slimmed page chunk (<20KB), got ${pageChunkBytes}`);

  // 1. HTTP Headers, Static Caching, Manifest, API checks
  const reqCtx = await playwrightRequest.newContext();
  try {
    const homeRes = await reqCtx.get(`${BASE}/`);
    const homeCC = homeRes.headers()["cache-control"] ?? "";
    assert.ok(!homeCC.includes("no-store"), `Homepage should not emit no-store, got: ${homeCC}`);
    assert.equal(homeRes.headers()["x-powered-by"], undefined, "x-powered-by should be removed");

    const manifestRes = await reqCtx.get(`${BASE}/manifest.webmanifest`);
    assert.equal(manifestRes.status(), 200, "manifest.webmanifest should return 200");

    const ogHome = await reqCtx.get(`${BASE}/opengraph-image`);
    assert.equal(ogHome.status(), 200);
    await (await import("node:fs/promises")).writeFile(path.join(SHOTS_DIR, "06_og_home.png"), await ogHome.body());

    const ogBaseball = await reqCtx.get(`${BASE}/work/ar-baseball/opengraph-image`);
    assert.equal(ogBaseball.status(), 200);
    await (await import("node:fs/promises")).writeFile(path.join(SHOTS_DIR, "07_og_baseball.png"), await ogBaseball.body());

    const shotRes = await reqCtx.get(`${BASE}/shots/ar-baseball-stadium-mobile.webp`);
    assert.ok(
      (shotRes.headers()["cache-control"] ?? "").includes("max-age=86400"),
      "shots should include max-age=86400",
    );

    const apiBadOrigin = await reqCtx.post(`${BASE}/api/events`, {
      headers: { origin: "https://evil.example" },
      data: { event: "evidence_open", target: "test", path: "/testing" },
    });
    assert.equal(apiBadOrigin.status(), 403, "Cross-origin POST /api/events should be rejected");

    const apiValid = await reqCtx.post(`${BASE}/api/events`, {
      data: { event: "evidence_open", target: "audit-verify", path: "/testing" },
    });
    assert.equal(apiValid.status(), 204, "Valid POST /api/events should return 204");

    const nfRes = await reqCtx.get(`${BASE}/does-not-exist-audit`);
    assert.equal(nfRes.status(), 404);
    const nfHtml = await nfRes.text();
    assert.ok(nfHtml.includes("noindex"), "404 must contain noindex");
    assert.ok(!nfHtml.includes('content="index, follow"'), "404 must not contain conflicting index, follow");

    console.log("PASS  1. HTTP caching, manifest, API security, and 404 headers");
  } finally {
    await reqCtx.dispose();
  }

  // 2. Mobile Landscape (667x375) Reveal Visibility Test
  {
    const ctx = await browser.newContext({ viewport: { width: 667, height: 375 } });
    const page = await ctx.newPage();
    page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
    page.on("pageerror", (e) => pageErrors.push(e.message));

    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    const totalH = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y <= totalH; y += 300) {
      await page.evaluate((pos) => window.scrollTo(0, pos), y);
      await page.waitForTimeout(150);
    }

    const appsVis = await page.evaluate(() => {
      const apps = document.getElementById("apps");
      const elseSec = document.getElementById("everything-else");
      const cards = [...document.querySelectorAll("#apps article, #everything-else article")];
      return {
        appsOpacity: apps ? getComputedStyle(apps).opacity : null,
        elseOpacity: elseSec ? getComputedStyle(elseSec).opacity : null,
        hiddenCards: cards.filter((c) => Number(getComputedStyle(c).opacity) < 0.99).length,
        cardCount: cards.length,
      };
    });
    assert.equal(appsVis.cardCount, 8);
    assert.equal(appsVis.hiddenCards, 0, `Hidden cards in landscape: ${JSON.stringify(appsVis)}`);

    await page.locator("#apps").scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(SHOTS_DIR, "01_landscape_667x375_apps.png") });
    await ctx.close();
    console.log("PASS  2. Mobile landscape (667x375) all 8 project cards visible");
  }

  // 3. Desktop 1440x900: Hero LCP, Interactive Switchers, QrModal, Dark & Light Contrast, Anchor Nav
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
    const page = await ctx.newPage();
    page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
    page.on("pageerror", (e) => pageErrors.push(e.message));

    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });

    // Assert Hero switcher pills + phone sit cleanly above the fold at 1440x900
    const heroBox = await page.evaluate(() => {
      const btn = [...document.querySelectorAll("#top button")].find((b) =>
        b.textContent?.includes("Baseball"),
      );
      const fig = document.querySelector("#top figure");
      return {
        btn: btn ? btn.getBoundingClientRect().toJSON() : null,
        fig: fig ? fig.getBoundingClientRect().toJSON() : null,
      };
    });
    assert.ok(heroBox.btn && heroBox.btn.bottom <= 900, "Hero switcher pills must be above fold");
    assert.ok(heroBox.fig && heroBox.fig.bottom <= 900, `Hero figure clipped below fold: ${JSON.stringify(heroBox.fig)}`);
    await page.screenshot({ path: path.join(SHOTS_DIR, "00_hero_1440x900_dark.png") });

    // Hero LCP attribute check
    const lcpImg = await page.evaluate(() => {
      const img = document.querySelector("#top img");
      return img
        ? { loading: img.getAttribute("loading"), fetchpriority: img.getAttribute("fetchpriority") }
        : null;
    });
    assert.equal(lcpImg?.fetchpriority, "high", `Hero LCP image must have fetchpriority="high", got ${JSON.stringify(lcpImg)}`);
    assert.notEqual(lcpImg?.loading, "lazy", "Hero LCP image must not be lazy");

    // Interactive HeroShowcase switch
    await page.getByRole("button", { name: "Boxing", exact: true }).click();
    const heroCap = await page.locator("#top figcaption").textContent();
    assert.ok(heroCap?.includes("boxing"), `Hero switcher failed: ${heroCap}`);

    // Interactive Flagship ShotSwitcher
    await page.locator("#apps").scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(SHOTS_DIR, "01_flagships_1440x900_dark.png") });
    await page.getByRole("button", { name: "3D Stadium", exact: true }).click();
    const flagCap = await page.locator("#apps article").nth(1).locator("figcaption").textContent();
    assert.ok(flagCap?.includes("pitcher"), `Flagship switcher failed: ${flagCap}`);

    // QrModal top-layer native <dialog> verification
    const qrBtn = page.locator("#apps button", { hasText: "Phone QR" }).first();
    await qrBtn.click();
    await page.locator("dialog[open]").waitFor({ state: "visible", timeout: 5000 });
    const dialogState = await page.evaluate(() => {
      const dlg = document.querySelector("dialog");
      if (!dlg) return null;
      const r = dlg.getBoundingClientRect();
      const svgTitle = dlg.querySelector("svg title")?.textContent ?? "";
      const copyBtn = [...dlg.querySelectorAll("button")].find((b) =>
        b.textContent?.includes("Copy game URL"),
      );
      const headerEyebrow = dlg.querySelector("div.bg-coral p");
      const headerBox = dlg.querySelector("div.bg-coral");
      return {
        open: dlg.open,
        rect: { x: r.x, y: r.y, w: r.width, h: r.height },
        vh: window.innerHeight,
        vw: window.innerWidth,
        svgTitle,
        copyColors: copyBtn
          ? { fg: getComputedStyle(copyBtn).color, bg: getComputedStyle(copyBtn).backgroundColor }
          : null,
        eyebrowColors:
          headerEyebrow && headerBox
            ? { fg: getComputedStyle(headerEyebrow).color, bg: getComputedStyle(headerBox).backgroundColor }
            : null,
      };
    });
    assert.ok(dialogState?.open, "Native <dialog> must be open");
    assert.ok(
      dialogState.rect.y >= 0 && dialogState.rect.y + dialogState.rect.h <= dialogState.vh,
      `QrModal clipped! rect=${JSON.stringify(dialogState.rect)} vh=${dialogState.vh}`,
    );
    assert.ok(dialogState.svgTitle.length > 5, "QR SVG must have accessible <title>");

    const copyContrast = contrastRatio(dialogState.copyColors.fg, dialogState.copyColors.bg);
    const eyebrowContrast = contrastRatio(dialogState.eyebrowColors.fg, dialogState.eyebrowColors.bg);
    assert.ok(copyContrast >= 4.5, `Dark QrModal Copy button contrast ${copyContrast} < 4.5`);
    assert.ok(eyebrowContrast >= 4.5, `Dark QrModal eyebrow contrast ${eyebrowContrast} < 4.5`);

    await page.screenshot({ path: path.join(SHOTS_DIR, "02_desktop_qrmodal_dark.png") });

    // Close via Escape
    await page.keyboard.press("Escape");
    const closedByEsc = await page.evaluate(() => Boolean(document.querySelector("dialog")?.open));
    assert.equal(closedByEsc, false, "QrModal must close on Escape");

    // Reopen and close via backdrop click
    await qrBtn.click();
    await page.locator("dialog[open]").waitFor({ state: "visible", timeout: 5000 });
    await page.mouse.click(20, 20);
    const closedByBackdrop = await page.evaluate(() => Boolean(document.querySelector("dialog")?.open));
    assert.equal(closedByBackdrop, false, "QrModal must close on backdrop click");

    // Dark-mode Contrast check on Skip link & Contact Resume (PDF)
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.keyboard.press("Tab");
    const skipColors = await page.evaluate(() => {
      const el = document.activeElement;
      return {
        text: el?.textContent,
        fg: el ? getComputedStyle(el).color : "",
        bg: el ? getComputedStyle(el).backgroundColor : "",
      };
    });
    const skipContrast = contrastRatio(skipColors.fg, skipColors.bg);
    assert.ok(skipContrast >= 4.5, `Skip link contrast ${skipContrast} < 4.5 (${JSON.stringify(skipColors)})`);

    const pdfColors = await page.evaluate(() => {
      const el = [...document.querySelectorAll("#contact a")].find((a) =>
        a.textContent?.includes("Resume (PDF)"),
      );
      return el ? { fg: getComputedStyle(el).color, bg: getComputedStyle(el).backgroundColor } : null;
    });
    const pdfContrast = contrastRatio(pdfColors.fg, pdfColors.bg);
    assert.ok(pdfContrast >= 4.5, `Dark Resume (PDF) contrast ${pdfContrast} < 4.5`);

    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(SHOTS_DIR, "03_desktop_contact_dark.png") });

    // Single-hash anchor navigation check (#signup)
    await page.locator('footer a[href="#signup"]').click();
    await page.waitForTimeout(400);
    assert.ok(
      page.url().endsWith("/#signup") && !page.url().includes("#apps#signup"),
      `Unexpected URL after #signup click: ${page.url()}`,
    );

    // Light mode contrast check too
    await page.getByRole("button", { name: "Switch to light mode" }).click();
    const lightPdfColors = await page.evaluate(() => {
      const el = [...document.querySelectorAll("#contact a")].find((a) =>
        a.textContent?.includes("Resume (PDF)"),
      );
      return el ? { fg: getComputedStyle(el).color, bg: getComputedStyle(el).backgroundColor } : null;
    });
    assert.ok(
      contrastRatio(lightPdfColors.fg, lightPdfColors.bg) >= 4.5,
      "Light Resume (PDF) contrast < 4.5",
    );

    await ctx.close();
    console.log(
      `PASS  3. Desktop QrModal, LCP, switchers, hashes & WCAG contrast (skip=${skipContrast}, pdfDark=${pdfContrast}, copyDark=${copyContrast})`,
    );
  }

  // 4. Tablet (768x1024) QrModal centering
  {
    const ctx = await browser.newContext({ viewport: { width: 768, height: 1024 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/#apps`, { waitUntil: "networkidle" });
    await page.locator("#apps button", { hasText: "Phone QR" }).first().click();
    await page.locator("dialog[open]").waitFor({ state: "visible", timeout: 5000 });
    const box = await page.locator("dialog").boundingBox();
    assert.ok(box && box.y >= 0 && box.y + box.height <= 1024, `Tablet QrModal clipped: ${JSON.stringify(box)}`);
    await ctx.close();
    console.log("PASS  4. Tablet (768x1024) QrModal fits inside viewport");
  }

  // 5. Case Studies (1280x800): TOC 0px overlap, sticky scroll, Bio-Tactical Inspector, #limits h2
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, colorScheme: "dark" });
    const page = await ctx.newPage();
    page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
    page.on("pageerror", (e) => pageErrors.push(e.message));

    for (const slug of ["jiku", "ar-baseball", "bio-tactical-edge"]) {
      await page.goto(`${BASE}/work/${slug}`, { waitUntil: "networkidle" });
      const geom = await page.evaluate(() => {
        const nav = document.querySelector('nav[aria-label="On this page"]');
        const main = document.getElementById("case-study");
        const limitsH2 = document.querySelector("#limits h2");
        const toggle = document.querySelector('button[aria-label*="mode"]');
        return {
          nav: nav ? nav.getBoundingClientRect().toJSON() : null,
          main: main ? main.getBoundingClientRect().toJSON() : null,
          hasLimitsH2: Boolean(limitsH2),
          hasThemeToggle: Boolean(toggle),
        };
      });
      assert.ok(geom.nav && geom.main, `Missing nav or main on /work/${slug}`);
      assert.ok(
        geom.nav.right <= geom.main.left,
        `TOC overlaps main on /work/${slug}: navRight=${geom.nav.right} > mainLeft=${geom.main.left}`,
      );
      assert.ok(geom.hasLimitsH2, `#limits missing <h2> on /work/${slug}`);
      assert.ok(geom.hasThemeToggle, `Missing ThemeToggle on /work/${slug}`);

      await page.evaluate(() => window.scrollTo(0, 1200));
      await page.waitForTimeout(200);
      const stickyY = await page.evaluate(() =>
        document.querySelector('nav[aria-label="On this page"]')?.getBoundingClientRect().y ?? -999,
      );
      assert.ok(stickyY >= 60 && stickyY <= 180, `TOC not sticky on /work/${slug}, y=${stickyY}`);
    }

    await page.goto(`${BASE}/work/jiku`, { waitUntil: "networkidle" });
    await page.screenshot({ path: path.join(SHOTS_DIR, "04_desktop_1280_work_jiku_toc.png") });

    // Bio-Tactical Inspector tab test + Ask me about it contrast
    await page.goto(`${BASE}/work/bio-tactical-edge`, { waitUntil: "networkidle" });
    await page.getByRole("tab", { name: /Telemetry/i }).click();
    const readout = await page.locator("section[aria-labelledby='prototype-inspector-heading']").textContent();
    assert.ok(readout?.includes("30k+"), "BioTacticalInspector tab switch failed");
    const askColors = await page.evaluate(() => {
      const a = [...document.querySelectorAll("a")].find((el) =>
        el.textContent?.includes("Ask me about it"),
      );
      return a ? { fg: getComputedStyle(a).color, bg: getComputedStyle(a).backgroundColor } : null;
    });
    assert.ok(contrastRatio(askColors.fg, askColors.bg) >= 4.5, "Ask me about it contrast < 4.5");

    await ctx.close();
    console.log("PASS  5. Case studies (1280x800): 0px TOC overlap, sticky TOC, Inspector, #limits h2");
  }

  // 6. Mobile Portrait (375x667 & 390x844): Touch targets, /testing stacked cards, landmarks, SEO, consistency
  {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 667 } });
    const page = await ctx.newPage();
    page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
    page.on("pageerror", (e) => pageErrors.push(e.message));

    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    const flagBtns = await page.evaluate(() =>
      [...document.querySelectorAll("#apps a, #apps button")].map((el) => ({
        text: el.textContent?.trim(),
        h: el.getBoundingClientRect().height,
      })),
    );
    const smallBtns = flagBtns.filter((b) => b.h > 0 && b.h < 44);
    assert.equal(smallBtns.length, 0, `Flagship buttons < 44px: ${JSON.stringify(smallBtns)}`);

    await page.goto(`${BASE}/testing`, { waitUntil: "networkidle" });
    const testingCheck = await page.evaluate(() => {
      const headerInsideMain = Boolean(document.querySelector("main header"));
      const tdMethod = document.querySelector('.testing-table tbody td[data-label="Method"]');
      const rect = tdMethod?.getBoundingClientRect();
      return {
        headerInsideMain,
        overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        methodRight: rect ? rect.right : 999,
        vw: window.innerWidth,
        hasThemeToggle: Boolean(document.querySelector('button[aria-label*="mode"]')),
      };
    });
    assert.equal(testingCheck.headerInsideMain, false, "<header> must not be inside <main> on /testing");
    assert.equal(testingCheck.overflow, false, "/testing overflows horizontally on 375px");
    assert.ok(
      testingCheck.methodRight <= testingCheck.vw,
      `/testing Method cell clipped offscreen: ${testingCheck.methodRight} > ${testingCheck.vw}`,
    );
    assert.ok(testingCheck.hasThemeToggle, "Missing ThemeToggle on /testing");

    await page.locator("#engineering-checks-heading").scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(SHOTS_DIR, "05_mobile_375_testing_table.png") });

    // Resume consistency + SEO canonical checks across all routes
    await page.goto(`${BASE}/resume`, { waitUntil: "networkidle" });
    const resumeText = await page.locator("main").innerText();
    assert.ok(resumeText.includes("8 boxing tests"), "Resume must state 8 boxing tests");
    assert.ok(!resumeText.includes("20 boxing tests"), "Resume still contains stale 20 boxing tests");

    for (const r of ["/", "/work/jiku", "/testing", "/resume", "/privacy"]) {
      await page.goto(`${BASE}${r}`, { waitUntil: "domcontentloaded" });
      const meta = await page.evaluate(() => ({
        canon: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
        ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute("content"),
        hasToggle: Boolean(document.querySelector('button[aria-label*="mode"]')),
      }));
      assert.ok(meta.canon?.endsWith(r === "/" ? "vercel.app" : r), `Bad canonical on ${r}: ${meta.canon}`);
      assert.ok(meta.ogUrl?.endsWith(r === "/" ? "vercel.app" : r), `Bad og:url on ${r}: ${meta.ogUrl}`);
      assert.ok(meta.hasToggle, `Missing ThemeToggle on ${r}`);
    }

    await ctx.close();
    console.log("PASS  6. Mobile 375px touch targets, stacked /testing table, SEO canonicals, data consistency");
  }

  assert.equal(consoleErrors.length, 0, `Console errors: ${JSON.stringify(consoleErrors)}`);
  assert.equal(pageErrors.length, 0, `Page errors: ${JSON.stringify(pageErrors)}`);
  console.log("\nALL AUDIT VERIFICATION CHECKS PASSED (0 console/page errors).");
} finally {
  if (browser) await browser.close();
  try {
    server.kill("SIGTERM");
  } catch {
    // ignore
  }
}
