import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, "output", "pdf", "ari-swerdlow-resume.pdf");
const PUBLIC_COPY = path.join(ROOT, "public", "ari-swerdlow-resume.pdf");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Ari Swerdlow · Product engineer</title>
<style>
  @page { size: letter; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 8.5in;
    height: 11in;
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
    background: #FFFDF7;
    color: #18181B;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  a { color: inherit; text-decoration: none; }
  .header {
    background: #18181B;
    color: #FFFFFF;
    padding: 24px 36px 16px;
  }
  .header-top {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .badge {
    width: 38px;
    height: 38px;
    background: #E15A46;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 15px;
    flex-shrink: 0;
  }
  .name {
    font-size: 29px;
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.05;
  }
  .subtitle {
    margin-top: 3px;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #F0C43A;
    text-transform: uppercase;
  }
  .tagline {
    margin-top: 8px;
    margin-left: 52px;
    font-size: 8.4pt;
    color: #D4D4D8;
  }
  .contacts {
    margin-top: 12px;
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 7.8pt;
    color: #FFFFFF;
  }
  .dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #E15A46;
    display: inline-block;
  }
  .main {
    flex: 1;
    display: grid;
    grid-template-columns: 154px 1fr;
    gap: 24px;
    padding: 22px 36px 12px;
  }
  .label {
    font-size: 7.4pt;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #1E3A8A;
    margin-bottom: 6px;
  }
  .label-coral { color: #C2412D; }
  .copy {
    font-size: 8.1pt;
    line-height: 1.38;
    color: #18181B;
  }
  .muted { color: #52525B; }
  .rule-coral { height: 2px; background: #E15A46; margin: 12px 0; }
  .rule-cobalt { height: 2px; background: #1E3A8A; margin: 10px 0 12px; }
  .strengths { list-style: none; display: grid; gap: 6px; margin-bottom: 13px; }
  .strengths li {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 7.9pt;
  }
  .sq { width: 4px; height: 4px; background: #1E3A8A; flex-shrink: 0; }
  .principles { display: grid; gap: 8px; margin-bottom: 13px; }
  .principle-title { font-size: 7.9pt; font-weight: 700; }
  .principle-body { font-size: 7.3pt; line-height: 1.32; color: #52525B; margin-top: 2px; }
  .focus-box {
    background: #EFE9DC;
    border: 1px solid #18181B;
    padding: 10px;
  }
  .focus-box .copy { font-size: 7.6pt; line-height: 1.35; }
  .projects { display: grid; gap: 11px; }
  .project {
    border-left: 4px solid #C2412D;
    padding-left: 10px;
  }
  .project-ochre { border-left-color: #EAB308; }
  .project-cobalt { border-left-color: #1E3A8A; }
  .project-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
  }
  .project-title { font-size: 11pt; font-weight: 800; }
  .project-role { font-size: 6.8pt; text-transform: uppercase; letter-spacing: 0.05em; color: #52525B; }
  .project-body { font-size: 8.1pt; line-height: 1.32; margin-top: 3px; }
  .project-proof {
    margin-top: 3px;
    font-size: 6.9pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: #C2412D;
  }
  .project-ochre .project-proof { color: #9A6700; }
  .project-cobalt .project-proof { color: #1E3A8A; }
  .additional { display: grid; gap: 5px; margin-bottom: 11px; }
  .add-row {
    display: grid;
    grid-template-columns: 90px 1fr auto;
    align-items: baseline;
    gap: 8px;
    font-size: 7.4pt;
  }
  .add-name { font-weight: 700; }
  .add-desc { color: #52525B; }
  .add-proof { font-size: 6.8pt; font-weight: 700; color: #1E3A8A; text-transform: uppercase; }
  .metrics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
    margin-bottom: 12px;
  }
  .metric-box {
    background: #EFE9DC;
    border: 1px solid #18181B;
    padding: 6px 8px;
  }
  .metric-val { font-size: 14.5pt; font-weight: 800; line-height: 1.1; }
  .metric-cap { font-size: 6.3pt; color: #52525B; text-transform: uppercase; margin-top: 2px; }
  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
    margin-bottom: 12px;
  }
  .card {
    background: #FFFFFF;
    border: 1px solid #18181B;
    padding: 10px 8px;
  }
  .card-coral { border-top: 5px solid #E15A46; }
  .card-ochre { border-top: 5px solid #EAB308; }
  .card-cobalt { border-top: 5px solid #1E3A8A; }
  .card-title { font-size: 8.2pt; font-weight: 800; margin-bottom: 4px; }
  .card-body { font-size: 6.9pt; line-height: 1.32; color: #52525B; }
  .banner {
    background: #18181B;
    color: #FFFFFF;
    padding: 10px 12px;
  }
  .banner-kicker { font-size: 7pt; font-weight: 800; color: #F0C43A; letter-spacing: 0.06em; }
  .banner-text { font-size: 10pt; font-weight: 700; margin-top: 3px; }
  .footer {
    margin: 0 36px 18px;
    padding-top: 8px;
    border-top: 1px solid #18181B;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 6.7pt;
  }
  .footer-left { color: #52525B; }
  .footer-left a { color: #1E3A8A; text-decoration: underline; }
  .footer-right { font-weight: 800; color: #C2412D; letter-spacing: 0.04em; }
</style>
</head>
<body>
  <header class="header">
    <div class="header-top">
      <div class="badge">AS</div>
      <div>
        <div class="name">ARI SWERDLOW</div>
        <div class="subtitle">Product engineer &nbsp;/&nbsp; Computer vision and browser games</div>
      </div>
    </div>
    <p class="tagline">I build apps where a phone camera is the controller. Bad lighting, lost tracking, slow phones.</p>
    <div class="contacts">
      <a href="mailto:aswerd2@gmail.com">aswerd2@gmail.com</a>
      <span class="dot"></span>
      <a href="https://ari-swerdlow.vercel.app">ari-swerdlow.vercel.app</a>
      <span class="dot"></span>
      <a href="https://github.com/lw300579-sys">github.com/lw300579-sys</a>
    </div>
  </header>

  <main class="main">
    <aside>
      <div class="label">Profile</div>
      <p class="copy">Independent product engineer. I take messy camera input and turn it into something a normal person can use without reading instructions.</p>
      <div class="rule-coral"></div>

      <div class="label">Core strengths</div>
      <ul class="strengths">
        <li><span class="sq"></span>Computer vision product UX</li>
        <li><span class="sq"></span>Browser AR and camera pipelines</li>
        <li><span class="sq"></span>Finite-state game systems</li>
        <li><span class="sq"></span>Simulation and recorded replay</li>
        <li><span class="sq"></span>On-device performance budgets</li>
        <li><span class="sq"></span>Accessibility and recovery design</li>
        <li><span class="sq"></span>Release gates and observability</li>
      </ul>

      <div class="label">Technology</div>
      <p class="copy" style="font-size: 7.7pt; margin-bottom: 12px;">TypeScript, React, Next.js, Three.js, React Three Fiber, MediaPipe, TensorFlow.js, WebGL, Python, FastAPI, Playwright, deterministic simulation</p>

      <div class="label">Working principles</div>
      <div class="principles">
        <div>
          <div class="principle-title">Uncertainty stays visible</div>
          <div class="principle-body">Low-confidence input pauses or downgrades a judgment.</div>
        </div>
        <div>
          <div class="principle-title">Recovery is product state</div>
          <div class="principle-body">Permission, tracking loss, and interruption get explicit paths.</div>
        </div>
        <div>
          <div class="principle-title">Evidence has boundaries</div>
          <div class="principle-body">Engineering checks are never relabeled as user outcomes.</div>
        </div>
      </div>

      <div class="focus-box">
        <div class="label label-coral">Current focus</div>
        <p class="copy">Available for product engineering and applied computer vision work where software must understand the physical world.</p>
      </div>
    </aside>

    <section>
      <div class="label label-coral">Selected product work &nbsp;/&nbsp; 2025–2026</div>
      <div class="projects">
        <div class="project">
          <div class="project-head">
            <span class="project-title">Jiku Fitness</span>
            <span class="project-role">Product + engineering</span>
          </div>
          <p class="project-body">Built a browser workout for boxing, push-ups and pull-ups that handles lost tracking and rest without freezing.</p>
          <p class="project-proof">8 boxing tests &nbsp;/&nbsp; real-phone testing pending</p>
        </div>

        <div class="project project-ochre">
          <div class="project-head">
            <span class="project-title">AR Baseball</span>
            <span class="project-role">Game + pose systems</span>
          </div>
          <p class="project-body">Built a three-inning baseball game controlled by your swing, with fielding, runners and a rival team.</p>
          <p class="project-proof">250k seeded games &nbsp;/&nbsp; 21 source tests</p>
        </div>

        <div class="project project-cobalt">
          <div class="project-head">
            <span class="project-title">Bio-Tactical Edge</span>
            <span class="project-role">Research + product architecture</span>
          </div>
          <p class="project-body">Designed a tool that turns match video into court positions, player paths, a 3D replay and searchable clips.</p>
          <p class="project-proof">77 automated tests</p>
        </div>
      </div>

      <div class="rule-cobalt"></div>
      <div class="label">Additional systems shipped</div>
      <div class="additional">
        <div class="add-row"><span class="add-name">Jiku Tennis</span><span class="add-desc">body-tracked rallies and five-rival progression</span><span class="add-proof">33 tests</span></div>
        <div class="add-row"><span class="add-name">Form: Pickleball</span><span class="add-desc">pose, ball, and audio coaching workflows</span><span class="add-proof">695 tests</span></div>
        <div class="add-row"><span class="add-name">ASL Hero</span><span class="add-desc">self-hosted hand tracking and learned fallback</span><span class="add-proof">Decision-path tests</span></div>
        <div class="add-row"><span class="add-name">AR Slicer</span><span class="add-desc">independent camera layer and thermal-aware quality</span><span class="add-proof">Recovery gate</span></div>
        <div class="add-row"><span class="add-name">Orbitap</span><span class="add-desc">seeded courses and shareable ghost runs</span><span class="add-proof">PWA build</span></div>
      </div>

      <div class="label label-coral">Engineering validation snapshot</div>
      <div class="metrics">
        <div class="metric-box"><div class="metric-val">250k</div><div class="metric-cap">Baseball simulations</div></div>
        <div class="metric-box"><div class="metric-val">695</div><div class="metric-cap">Coach tests</div></div>
        <div class="metric-box"><div class="metric-val">6</div><div class="metric-cap">Camera products</div></div>
      </div>

      <div class="label">What I can do for your team</div>
      <div class="cards">
        <div class="card card-coral">
          <div class="card-title">Prototype the hard input</div>
          <div class="card-body">Get gestures, pose or video working as a real control.</div>
        </div>
        <div class="card card-ochre">
          <div class="card-title">Make it trustworthy</div>
          <div class="card-body">Plan for bad lighting, lost tracking and privacy from day one.</div>
        </div>
        <div class="card card-cobalt">
          <div class="card-title">Ship with evidence</div>
          <div class="card-body">Tests, replays and numbers that say what they don't cover.</div>
        </div>
      </div>

      <div class="banner">
        <div class="banner-kicker">AVAILABLE NOW</div>
        <div class="banner-text">Product engineering &nbsp;/&nbsp; Applied CV &nbsp;/&nbsp; Interaction systems</div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="footer-left">
      These are engineering numbers, not user results. More at <a href="https://ari-swerdlow.vercel.app/testing">ari-swerdlow.vercel.app/testing</a>
    </div>
    <div class="footer-right">AVAILABLE FOR PRODUCT ENGINEERING + APPLIED CV</div>
  </footer>
</body>
</html>`;

async function launchBrowser() {
  try {
    return await chromium.launch({ headless: true });
  } catch (error) {
    if (!String(error).includes("Executable doesn't exist")) throw error;
    return chromium.launch({ channel: "chrome", headless: true });
  }
}

await mkdir(path.dirname(OUTPUT), { recursive: true });
const browser = await launchBrowser();
try {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "load" });
  await page.pdf({
    path: OUTPUT,
    format: "Letter",
    printBackground: true,
    margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
  });
  await copyFile(OUTPUT, PUBLIC_COPY);
  console.log(`Generated ${PUBLIC_COPY}`);
} finally {
  await browser.close();
}
