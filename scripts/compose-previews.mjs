/**
 * Compose premium product preview cards from live captures.
 * Real UI inside a tactile phone stage — not stick figures, not AI art.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CAPTURES = path.join(__dirname, "captures");
const OUT = path.join(__dirname, "captures/framed");
const W = 1600;
const H = 1000;

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(CAPTURES, { recursive: true });

const ACCENTS = {
  lawn: "#22C55E",
  coral: "#E15A46",
  cobalt: "#1E3A8A",
  ochre: "#EAB308",
};

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

/** Paper stage with soft wash + accent wash */
function stageSvg(accent) {
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FFFDF7"/>
          <stop offset="50%" stop-color="#F7F4EB"/>
          <stop offset="100%" stop-color="#EFE9DC"/>
        </linearGradient>
        <radialGradient id="a" cx="85%" cy="15%" r="45%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
        </radialGradient>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.4 0"/>
        </filter>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#g)"/>
      <rect width="${W}" height="${H}" fill="url(#a)"/>
      <rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.08"/>
      <!-- subtle grid -->
      <g stroke="#18181B" stroke-opacity="0.04" stroke-width="1">
        ${Array.from({ length: 16 }, (_, i) => `<line x1="${100 + i * 90}" y1="0" x2="${100 + i * 90}" y2="${H}"/>`).join("")}
        ${Array.from({ length: 10 }, (_, i) => `<line x1="0" y1="${100 + i * 90}" x2="${W}" y2="${100 + i * 90}"/>`).join("")}
      </g>
    </svg>
  `);
}

function phoneChromeSvg({ title, subtitle, accent, phoneW, phoneH }) {
  const px = Math.round((W - phoneW) / 2);
  const py = Math.round((H - phoneH) / 2) - 10;
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <!-- hard offset shadow -->
      <rect x="${px + 10}" y="${py + 10}" width="${phoneW}" height="${phoneH}" rx="48" fill="#18181B"/>
      <!-- body -->
      <rect x="${px}" y="${py}" width="${phoneW}" height="${phoneH}" rx="48" fill="#18181B" stroke="${accent}" stroke-width="3"/>
      <!-- inner bezel -->
      <rect x="${px + 10}" y="${py + 10}" width="${phoneW - 20}" height="${phoneH - 20}" rx="40" fill="#0A0A0A"/>
      <!-- screen hole is transparent — screenshot composited separately -->
      <!-- dynamic island -->
      <rect x="${px + phoneW / 2 - 56}" y="${py + 22}" width="112" height="28" rx="14" fill="#000"/>
      <!-- home indicator -->
      <rect x="${px + phoneW / 2 - 50}" y="${py + phoneH - 28}" width="100" height="5" rx="2.5" fill="#FFF" fill-opacity="0.35"/>
      <!-- caption plate -->
      <g>
        <rect x="48" y="${H - 92}" width="520" height="56" fill="#FFFDF7" stroke="#18181B" stroke-width="2.5"/>
        <rect x="48" y="${H - 92}" width="10" height="56" fill="${accent}"/>
        <text x="72" y="${H - 58}" font-family="ui-monospace,Menlo,monospace" font-size="15" fill="#18181B" font-weight="700">${esc(title)}</text>
        <text x="72" y="${H - 36}" font-family="ui-monospace,Menlo,monospace" font-size="12" fill="#71717A">${esc(subtitle)}</text>
      </g>
      <!-- live badge -->
      <rect x="${W - 168}" y="40" width="120" height="36" fill="${accent}" stroke="#18181B" stroke-width="2.5"/>
      <text x="${W - 108}" y="64" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="14" fill="${accent === "#EAB308" || accent === "#22C55E" ? "#18181B" : "#FFF"}" font-weight="700">LIVE UI</text>
    </svg>
  `);
}

async function composePhone({
  captureName,
  outName,
  title,
  subtitle,
  accentKey,
}) {
  const capturePath = path.join(CAPTURES, `${captureName}.png`);
  if (!fs.existsSync(capturePath) || fs.statSync(capturePath).size < 2000) {
    console.log(`skip ${outName}: missing capture`);
    return false;
  }

  const accent = ACCENTS[accentKey];
  // Phone geometry for 16:10 stage
  const phoneW = 420;
  const phoneH = 860;
  const px = Math.round((W - phoneW) / 2);
  const py = Math.round((H - phoneH) / 2) - 10;
  const inset = 14;
  const screenX = px + inset;
  const screenY = py + 52;
  const screenW = phoneW - inset * 2;
  const screenH = phoneH - 52 - 36;

  const screen = await sharp(capturePath)
    .resize(screenW * 2, screenH * 2, { fit: "cover", position: "top" })
    .png()
    .toBuffer();

  // Round the screenshot slightly to match bezel
  const rounded = await sharp(screen)
    .resize(screenW, screenH)
    .composite([
      {
        input: Buffer.from(`
          <svg xmlns="http://www.w3.org/2000/svg" width="${screenW}" height="${screenH}">
            <rect width="${screenW}" height="${screenH}" rx="28" fill="#fff"/>
          </svg>
        `),
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();

  const stage = await sharp(stageSvg(accent)).png().toBuffer();
  const chrome = await sharp(
    phoneChromeSvg({
      title,
      subtitle,
      accent,
      phoneW,
      phoneH,
    }),
  )
    .png()
    .toBuffer();

  await sharp(stage)
    .composite([
      { input: chrome, top: 0, left: 0 },
      { input: rounded, top: screenY, left: screenX },
    ])
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(path.join(OUT, `${outName}.png`));

  console.log(`composed ${outName}.png`);
  return true;
}

const jobs = [
  {
    captureName: "jiku-tennis",
    outName: "jiku-tennis",
    title: "JIKU TENNIS",
    subtitle: "artennisgame.vercel.app · browser AR",
    accentKey: "lawn",
  },
  {
    captureName: "jiku-fitness",
    outName: "jiku-fitness",
    title: "JIKU · CYBER-ATHLETIC",
    subtitle: "shadow boxing engine · on-device pose",
    accentKey: "coral",
  },
  {
    captureName: "asl-hero",
    outName: "asl-hero",
    title: "ASL HERO",
    subtitle: "lesson basics-1 · hand landmarks",
    accentKey: "cobalt",
  },
  {
    captureName: "form-pickleball",
    outName: "form-pickleball",
    title: "FORM · PICKLEBALL COACH",
    subtitle: "court cam · biomechanics session",
    accentKey: "ochre",
  },
  {
    captureName: "ar-baseball",
    outName: "ar-baseball",
    title: "AR BASEBALL",
    subtitle: "Rapier physics · browser AR",
    accentKey: "coral",
  },
  {
    captureName: "ar-slicer",
    outName: "ar-slicer",
    title: "AR SLICER",
    subtitle: "camera arcade · Three.js",
    accentKey: "ochre",
  },
  {
    captureName: "arcade-runner",
    outName: "arcade-runner",
    title: "ARCADE RUNNER",
    subtitle: "browser arcade · one-tap endless run",
    accentKey: "cobalt",
  },
];

async function main() {
  let ok = 0;
  for (const job of jobs) {
    if (await composePhone(job)) ok += 1;
  }
  console.log("Skipped generated Bio-Tactical art. That product has no public capture.");
  console.log(`done — ${ok}/${jobs.length} phone frames`);
  if (ok === 0) {
    console.error("No live captures found. Run: node scripts/capture-live.mjs");
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
