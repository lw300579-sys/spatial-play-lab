/**
 * Documentary preview generator
 * Hand-authored CV / camera-HUD frames → PNG.
 * No generative AI imagery.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../public/previews");
const W = 1280;
const H = 800;

fs.mkdirSync(OUT, { recursive: true });

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function roomWash(seed, c1, c2) {
  return `
    <defs>
      <linearGradient id="rw${seed}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="55%" stop-color="${c2}"/>
        <stop offset="100%" stop-color="${c1}"/>
      </linearGradient>
      <filter id="soft${seed}">
        <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="${seed}"/>
        <feColorMatrix values="0 0 0 0 0.92  0 0 0 0 0.90  0 0 0 0 0.86  0 0 0 0.35 0"/>
        <feBlend in="SourceGraphic" mode="multiply"/>
      </filter>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#rw${seed})"/>
    <rect width="${W}" height="${H}" filter="url(#soft${seed})" opacity="0.55"/>
  `;
}

function hudChrome({ title, fps, model, accent }) {
  return `
    <path d="M48 48h56v4H52v52h-4V48zm${W - 104} 0h56v56h-4V52h-52v-4zM48 ${H - 104}h4v52h52v4H48v-56zm${W - 52} 52v4h-56v-4h52v-52h4v52z" fill="${accent}"/>
    <rect x="0" y="0" width="${W}" height="44" fill="#18181B"/>
    <circle cx="28" cy="22" r="6" fill="#E15A46"/>
    <text x="48" y="28" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="16" fill="#FFFDF7" letter-spacing="2">${esc(title)}</text>
    <text x="${W - 24}" y="28" text-anchor="end" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="14" fill="#A1A1AA">${esc(fps)} · ${esc(model)}</text>
    <rect x="0" y="${H - 40}" width="${W}" height="40" fill="#18181B" fill-opacity="0.88"/>
    <text x="24" y="${H - 15}" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="13" fill="#EAB308">REC ●</text>
    <text x="110" y="${H - 15}" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="13" fill="#A1A1AA">cam0 · facing-user · exposure auto</text>
  `;
}

function stickPose(cx, cy, scale, stroke, fillHead, armRaise = 0) {
  const s = scale;
  const hx = cx;
  const hy = cy;
  const shoulder = hy + 28 * s;
  const hip = hy + 95 * s;
  const lWristX = cx - (55 - armRaise * 40) * s;
  const lWristY = shoulder - (10 + armRaise * 50) * s;
  const rWristX = cx + (70 + armRaise * 20) * s;
  const rWristY = shoulder - (25 + armRaise * 35) * s;
  return `
    <g stroke="${stroke}" stroke-width="${3.2 * s}" stroke-linecap="round" fill="none">
      <circle cx="${hx}" cy="${hy}" r="${16 * s}" fill="${fillHead}" stroke="${stroke}"/>
      <line x1="${hx}" y1="${hy + 16 * s}" x2="${hx}" y2="${hip}"/>
      <line x1="${cx - 34 * s}" y1="${shoulder}" x2="${cx + 34 * s}" y2="${shoulder}"/>
      <line x1="${cx - 34 * s}" y1="${shoulder}" x2="${lWristX}" y2="${lWristY}"/>
      <line x1="${cx + 34 * s}" y1="${shoulder}" x2="${rWristX}" y2="${rWristY}"/>
      <line x1="${hx}" y1="${hip}" x2="${cx - 28 * s}" y2="${hip + 85 * s}"/>
      <line x1="${hx}" y1="${hip}" x2="${cx + 26 * s}" y2="${hip + 85 * s}"/>
      <g fill="${stroke}" stroke="none">
        <circle cx="${hx}" cy="${hy}" r="${3.5 * s}"/>
        <circle cx="${cx - 34 * s}" cy="${shoulder}" r="${3 * s}"/>
        <circle cx="${cx + 34 * s}" cy="${shoulder}" r="${3 * s}"/>
        <circle cx="${lWristX}" cy="${lWristY}" r="${3.5 * s}"/>
        <circle cx="${rWristX}" cy="${rWristY}" r="${3.5 * s}"/>
        <circle cx="${hx}" cy="${hip}" r="${3 * s}"/>
      </g>
    </g>
  `;
}

function handLandmarks(ox, oy, scale = 1) {
  const pts = [
    [0, 80], [0, 40], [-8, 0], [-18, -35], [-22, -58],
    [18, 35], [28, -5], [36, -40], [40, -68],
    [38, 42], [52, 5], [62, -28], [68, -55],
    [55, 55], [72, 22], [84, -8], [92, -32],
    [68, 70], [88, 45], [102, 22], [112, 2],
  ].map(([x, y]) => [ox + x * scale, oy + y * scale]);

  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [5, 6], [6, 7], [7, 8],
    [0, 9], [9, 10], [10, 11], [11, 12],
    [0, 13], [13, 14], [14, 15], [15, 16],
    [0, 17], [17, 18], [18, 19], [19, 20],
  ];

  const lines = edges
    .map(([a, b]) => `<line x1="${pts[a][0]}" y1="${pts[a][1]}" x2="${pts[b][0]}" y2="${pts[b][1]}"/>`)
    .join("");
  const dots = pts
    .map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i === 0 ? 5 : 3.2}" fill="${i % 4 === 0 ? "#E15A46" : "#1E3A8A"}"/>`)
    .join("");

  return `<g stroke="#1E3A8A" stroke-width="2.2" fill="none" stroke-linecap="round">${lines}${dots}</g>`;
}

const previews = {
  "jiku-tennis": () => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      ${roomWash(3, "#D8EBD9", "#F4F1E6")}
      <polygon points="220,560 1060,560 1180,720 100,720" fill="#22C55E" fill-opacity="0.45" stroke="#18181B" stroke-width="3"/>
      <line x1="640" y1="560" x2="640" y2="720" stroke="#18181B" stroke-width="2"/>
      <line x1="340" y1="620" x2="940" y2="620" stroke="#18181B" stroke-width="1.5" stroke-dasharray="8 6"/>
      <line x1="640" y1="420" x2="640" y2="560" stroke="#18181B" stroke-width="3"/>
      <line x1="560" y1="420" x2="720" y2="420" stroke="#18181B" stroke-width="2"/>
      ${stickPose(360, 250, 1.35, "#18181B", "#E15A46", 0.85)}
      <ellipse cx="520" cy="210" rx="42" ry="26" transform="rotate(-28 520 210)" fill="#FFFDF7" stroke="#18181B" stroke-width="3"/>
      <path d="M620 280 C700 220, 820 200, 940 240" fill="none" stroke="#EAB308" stroke-width="2" stroke-dasharray="4 6" opacity="0.8"/>
      <circle cx="940" cy="240" r="14" fill="#EAB308" stroke="#18181B" stroke-width="2.5"/>
      <g opacity="0.35">${stickPose(900, 300, 0.9, "#1E3A8A", "#1E3A8A", 0.2)}</g>
      <rect x="72" y="70" width="210" height="56" fill="#FFFDF7" stroke="#18181B" stroke-width="2"/>
      <text x="84" y="94" font-family="ui-monospace,Menlo,monospace" font-size="13" fill="#71717A">POSE LOCK</text>
      <text x="84" y="114" font-family="ui-monospace,Menlo,monospace" font-size="15" fill="#18181B">1€ filter · swing Δt 42ms</text>
      ${hudChrome({ title: "JIKU TENNIS · CAM FEED", fps: "58 FPS", model: "MediaPipe Pose", accent: "#22C55E" })}
    </svg>
  `,
  "jiku-fitness": () => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      ${roomWash(7, "#F3D9D3", "#F7F4EB")}
      <circle cx="820" cy="220" r="58" fill="#E15A46" stroke="#18181B" stroke-width="3" opacity="0.92"/>
      <circle cx="980" cy="360" r="40" fill="#EAB308" stroke="#18181B" stroke-width="3"/>
      <circle cx="740" cy="420" r="32" fill="#1E3A8A" stroke="#18181B" stroke-width="3"/>
      <text x="820" y="226" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="14" fill="#FFFDF7">HIT</text>
      ${stickPose(380, 220, 1.4, "#18181B", "#1E3A8A", 1.05)}
      <g stroke="#18181B" stroke-width="2" opacity="0.7">
        <line x1="780" y1="180" x2="760" y2="150"/>
        <line x1="860" y1="170" x2="890" y2="140"/>
        <line x1="870" y1="250" x2="910" y2="270"/>
      </g>
      <rect x="72" y="70" width="240" height="78" fill="#18181B"/>
      <text x="86" y="98" font-family="ui-monospace,Menlo,monospace" font-size="13" fill="#EAB308">IMPACT METRIC</text>
      <text x="86" y="124" font-family="ui-monospace,Menlo,monospace" font-size="22" fill="#FFFDF7">2.4 kN · FLOW</text>
      ${hudChrome({ title: "JIKU FITNESS · SHADOW BOX", fps: "60 FPS", model: "TF.js Pose", accent: "#E15A46" })}
    </svg>
  `,
  "asl-hero": () => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      ${roomWash(11, "#D9E2F2", "#F7F4EB")}
      <ellipse cx="520" cy="620" rx="220" ry="90" fill="#C4B5A0" opacity="0.35"/>
      ${handLandmarks(480, 280, 2.1)}
      <rect x="860" y="140" width="320" height="200" fill="#FFFDF7" stroke="#18181B" stroke-width="3"/>
      <rect x="860" y="140" width="320" height="44" fill="#EAB308" stroke="#18181B" stroke-width="3"/>
      <text x="880" y="170" font-family="ui-monospace,Menlo,monospace" font-size="16" fill="#18181B">LESSON · BASICS-1</text>
      <text x="880" y="230" font-family="Georgia,serif" font-size="42" fill="#18181B">HELLO</text>
      <text x="880" y="275" font-family="ui-monospace,Menlo,monospace" font-size="14" fill="#71717A">template match 0.91</text>
      <text x="880" y="300" font-family="ui-monospace,Menlo,monospace" font-size="14" fill="#22C55E">ONNX fallback idle</text>
      <rect x="72" y="70" width="260" height="56" fill="#FFFDF7" stroke="#18181B" stroke-width="2"/>
      <text x="84" y="94" font-family="ui-monospace,Menlo,monospace" font-size="13" fill="#71717A">HAND LANDMARKS</text>
      <text x="84" y="114" font-family="ui-monospace,Menlo,monospace" font-size="15" fill="#18181B">21 pts · wrist gap OK</text>
      ${hudChrome({ title: "ASL HERO · GESTURE TRAINER", fps: "55 FPS", model: "Hands + WLASL", accent: "#1E3A8A" })}
    </svg>
  `,
  "form-pickleball": () => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      ${roomWash(5, "#E8E0C4", "#F7F4EB")}
      <rect x="120" y="180" width="640" height="420" fill="#22C55E" fill-opacity="0.28" stroke="#18181B" stroke-width="3"/>
      <line x1="440" y1="180" x2="440" y2="600" stroke="#18181B" stroke-width="2" stroke-dasharray="6 6"/>
      ${stickPose(280, 260, 1.25, "#E15A46", "#FFFDF7", 0.7)}
      <path d="M340 320 Q380 290 420 270" fill="none" stroke="#1E3A8A" stroke-width="2.5"/>
      <text x="430" y="268" font-family="ui-monospace,Menlo,monospace" font-size="14" fill="#1E3A8A">elbow 142°</text>
      <rect x="820" y="160" width="360" height="400" fill="#18181B" stroke="#18181B" stroke-width="3"/>
      <text x="844" y="210" font-family="ui-monospace,Menlo,monospace" font-size="14" fill="#EAB308">DECISION CAM</text>
      <text x="844" y="260" font-family="ui-monospace,Menlo,monospace" font-size="18" fill="#FFFDF7">ELBOW   142°</text>
      <text x="844" y="300" font-family="ui-monospace,Menlo,monospace" font-size="18" fill="#22C55E">HIP-SH   28°</text>
      <text x="844" y="340" font-family="ui-monospace,Menlo,monospace" font-size="18" fill="#E15A46">SWING ▲ DETECT</text>
      <text x="844" y="400" font-family="ui-monospace,Menlo,monospace" font-size="13" fill="#A1A1AA">Kalman lock · YOLOv8n ball</text>
      <text x="844" y="430" font-family="ui-monospace,Menlo,monospace" font-size="13" fill="#A1A1AA">audio fusion peak +12ms</text>
      ${hudChrome({ title: "FORM · PICKLEBALL COACH", fps: "60 FPS", model: "33-Landmark", accent: "#EAB308" })}
    </svg>
  `,
  citadel: () => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="${W}" height="${H}" fill="#0B1220"/>
      <rect x="0" y="0" width="${W}" height="48" fill="#1E3A8A"/>
      <circle cx="28" cy="24" r="7" fill="#E15A46"/>
      <circle cx="52" cy="24" r="7" fill="#EAB308"/>
      <circle cx="76" cy="24" r="7" fill="#22C55E"/>
      <text x="110" y="30" font-family="ui-monospace,Menlo,monospace" font-size="16" fill="#FFFDF7">CITADEL · L2 BIO-TACTICAL TERMINAL</text>
      <text x="${W - 24}" y="30" text-anchor="end" font-family="ui-monospace,Menlo,monospace" font-size="14" fill="#93C5FD">60fps HD · AWS</text>
      <rect x="32" y="80" width="360" height="520" fill="#111827" stroke="#334155" stroke-width="2"/>
      <text x="52" y="120" font-family="ui-monospace,Menlo,monospace" font-size="14" fill="#22C55E">RF-DETR KEYPOINTS</text>
      <text x="52" y="170" font-family="ui-monospace,Menlo,monospace" font-size="15" fill="#CBD5E1">wrist_v     12.4 m/s</text>
      <text x="52" y="210" font-family="ui-monospace,Menlo,monospace" font-size="15" fill="#CBD5E1">com_y        0.92 m</text>
      <text x="52" y="250" font-family="ui-monospace,Menlo,monospace" font-size="15" fill="#CBD5E1">epv_Δ       +0.18</text>
      <text x="52" y="290" font-family="ui-monospace,Menlo,monospace" font-size="15" fill="#CBD5E1">σ_pos      ±0.04 m</text>
      <text x="52" y="360" font-family="ui-monospace,Menlo,monospace" font-size="14" fill="#EAB308">ORDER BOOK · BIO</text>
      <text x="52" y="400" font-family="ui-monospace,Menlo,monospace" font-size="13" fill="#64748B">bid  …  ask  …  last</text>
      <text x="52" y="430" font-family="ui-monospace,Menlo,monospace" font-size="13" fill="#94A3B8">42.10  42.14  42.12</text>
      <text x="52" y="460" font-family="ui-monospace,Menlo,monospace" font-size="13" fill="#94A3B8">41.98  42.05  42.01</text>
      <rect x="420" y="80" width="820" height="520" fill="#0F172A" stroke="#334155" stroke-width="2"/>
      <rect x="520" y="160" width="620" height="360" fill="none" stroke="#EAB308" stroke-width="2"/>
      <line x1="830" y1="160" x2="830" y2="520" stroke="#EAB308" stroke-width="1.5"/>
      <path d="M560 460 C680 280, 900 200, 1080 250" fill="none" stroke="#E15A46" stroke-width="3"/>
      <circle cx="560" cy="460" r="7" fill="#22C55E"/>
      <circle cx="1080" cy="250" r="7" fill="#E15A46"/>
      <text x="560" y="490" font-family="ui-monospace,Menlo,monospace" font-size="12" fill="#94A3B8">t0 contact</text>
      <text x="1000" y="230" font-family="ui-monospace,Menlo,monospace" font-size="12" fill="#94A3B8">v≈58 m/s</text>
      <text x="440" y="640" font-family="ui-monospace,Menlo,monospace" font-size="13" fill="#64748B">TrackNet temporal CNN · DLT homography · digital twin court</text>
    </svg>
  `,
  "citadel-ballistics": () => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="${W}" height="${H}" fill="#0B1220"/>
      <text x="48" y="64" font-family="ui-monospace,Menlo,monospace" font-size="20" fill="#EAB308">BALLISTIC TRAJECTORY FIT</text>
      <text x="48" y="96" font-family="ui-monospace,Menlo,monospace" font-size="14" fill="#64748B">130mph serve · motion blur recovery</text>
      <path d="M80 640 C320 120, 760 80, 1200 280" fill="none" stroke="#E15A46" stroke-width="4"/>
      <g fill="#22C55E">
        <circle cx="180" cy="520" r="5"/><circle cx="320" cy="340" r="5"/>
        <circle cx="480" cy="220" r="5"/><circle cx="680" cy="150" r="5"/>
        <circle cx="900" cy="160" r="5"/><circle cx="1100" cy="240" r="5"/>
      </g>
      <text x="80" y="700" font-family="ui-monospace,Menlo,monospace" font-size="14" fill="#94A3B8">samples from TrackNet heatmap peaks · least-squares ballistic fit</text>
      <rect x="980" y="620" width="240" height="90" fill="#111827" stroke="#334155"/>
      <text x="1000" y="660" font-family="ui-monospace,Menlo,monospace" font-size="14" fill="#EAB308">σ_pos ±0.04m</text>
      <text x="1000" y="690" font-family="ui-monospace,Menlo,monospace" font-size="14" fill="#CBD5E1">R² 0.987</text>
    </svg>
  `,
  "citadel-epv": () => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="${W}" height="${H}" fill="#0B1220"/>
      <text x="48" y="64" font-family="ui-monospace,Menlo,monospace" font-size="20" fill="#22C55E">EXPECTED POSSESSION VALUE</text>
      <rect x="120" y="120" width="1040" height="560" fill="#111827" stroke="#334155" stroke-width="2"/>
      <defs>
        <radialGradient id="h1" cx="32%" cy="42%" r="38%"><stop offset="0%" stop-color="#E15A46" stop-opacity="0.85"/><stop offset="100%" stop-color="#E15A46" stop-opacity="0"/></radialGradient>
        <radialGradient id="h2" cx="68%" cy="58%" r="32%"><stop offset="0%" stop-color="#EAB308" stop-opacity="0.7"/><stop offset="100%" stop-color="#EAB308" stop-opacity="0"/></radialGradient>
      </defs>
      <rect x="120" y="120" width="1040" height="560" fill="url(#h1)"/>
      <rect x="120" y="120" width="1040" height="560" fill="url(#h2)"/>
      <line x1="640" y1="120" x2="640" y2="680" stroke="#FFFDF7" stroke-opacity="0.35"/>
      <text x="140" y="160" font-family="ui-monospace,Menlo,monospace" font-size="14" fill="#CBD5E1">EPV heatmap · digital twin court</text>
    </svg>
  `,
  "ar-baseball": () => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      ${roomWash(9, "#E7D5C8", "#F7F4EB")}
      ${stickPose(420, 240, 1.3, "#18181B", "#E15A46", 0.9)}
      <line x1="560" y1="250" x2="720" y2="200" stroke="#18181B" stroke-width="5"/>
      <circle cx="860" cy="280" r="28" fill="#FFFDF7" stroke="#18181B" stroke-width="3"/>
      <path d="M820 260 Q840 250 860 255" fill="none" stroke="#E15A46" stroke-width="2"/>
      <text x="72" y="100" font-family="ui-monospace,Menlo,monospace" font-size="14" fill="#71717A">RAPIER CONTACT</text>
      <text x="72" y="128" font-family="ui-monospace,Menlo,monospace" font-size="18" fill="#18181B">bat↔ball impulse 18.2</text>
      ${hudChrome({ title: "AR BASEBALL · SANDBOX", fps: "60 FPS", model: "R3F + Rapier", accent: "#E15A46" })}
    </svg>
  `,
  "ar-slicer": () => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      ${roomWash(13, "#EFE2C4", "#F7F4EB")}
      <g fill="#E15A46" stroke="#18181B" stroke-width="2.5">
        <circle cx="520" cy="260" r="36"/><circle cx="700" cy="200" r="28"/><circle cx="860" cy="320" r="42"/>
      </g>
      <path d="M300 480 C480 300, 700 240, 980 180" fill="none" stroke="#1E3A8A" stroke-width="4" stroke-linecap="round"/>
      <g fill="#EAB308" stroke="#18181B" stroke-width="1.5">
        <circle cx="640" cy="250" r="4"/><circle cx="680" cy="230" r="3"/><circle cx="720" cy="270" r="5"/>
        <circle cx="760" cy="210" r="3"/><circle cx="800" cy="290" r="4"/>
      </g>
      <text x="72" y="100" font-family="ui-monospace,Menlo,monospace" font-size="14" fill="#71717A">SLICE VECTOR</text>
      <text x="72" y="128" font-family="ui-monospace,Menlo,monospace" font-size="18" fill="#18181B">ghost replay · particle burst</text>
      ${hudChrome({ title: "AR SLICER · ARCADE", fps: "60 FPS", model: "Three.js", accent: "#EAB308" })}
    </svg>
  `,
};

/**
 * Composite a live product screenshot into the documentary phone/HUD frame.
 * Falls back to illustration-only if capture path is missing.
 */
async function frameCapture(capturePath, outName, meta) {
  const out = path.join(OUT, `${outName}.png`);
  if (!fs.existsSync(capturePath) || fs.statSync(capturePath).size < 1000) {
    return false;
  }

  const framedSvg = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <rect width="${W}" height="${H}" fill="#EFE9DC"/>
      <rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="#18181B"/>
      <rect x="52" y="88" width="${W - 104}" height="${H - 168}" fill="#111111"/>
      ${hudChrome(meta).replace(/y="0"/, 'y="40"').replace(`height="44"`, `y="40" height="48"`)}
    </svg>
  `);

  // Simpler reliable approach: cover-crop capture to 16:10 then add bars via sharp
  const cropped = await sharp(capturePath)
    .rotate()
    .resize(W, H, { fit: "cover", position: "attention" })
    .png()
    .toBuffer();

  // Top/bottom HUD bars as overlays
  const topBar = await sharp({
    create: { width: W, height: 48, channels: 3, background: "#18181B" },
  })
    .png()
    .toBuffer();

  const bottomBar = await sharp({
    create: { width: W, height: 44, channels: 3, background: "#18181B" },
  })
    .png()
    .toBuffer();

  const label = await sharp(
    Buffer.from(`
      <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="48">
        <rect width="${W}" height="48" fill="#18181B"/>
        <circle cx="28" cy="24" r="6" fill="#E15A46"/>
        <text x="48" y="30" font-family="ui-monospace,Menlo,monospace" font-size="16" fill="#FFFDF7">${esc(meta.title)}</text>
        <text x="${W - 24}" y="30" text-anchor="end" font-family="ui-monospace,Menlo,monospace" font-size="14" fill="#A1A1AA">${esc(meta.fps)} · ${esc(meta.model)}</text>
      </svg>
    `),
  )
    .png()
    .toBuffer();

  const foot = await sharp(
    Buffer.from(`
      <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="44">
        <rect width="${W}" height="44" fill="#18181B"/>
        <text x="24" y="28" font-family="ui-monospace,Menlo,monospace" font-size="13" fill="#EAB308">LIVE CAPTURE</text>
        <text x="160" y="28" font-family="ui-monospace,Menlo,monospace" font-size="13" fill="#A1A1AA">product UI · not AI imagery</text>
      </svg>
    `),
  )
    .png()
    .toBuffer();

  await sharp(cropped)
    .composite([
      { input: label, top: 0, left: 0 },
      { input: foot, top: H - 44, left: 0 },
    ])
    .png()
    .toFile(out);

  // silence unused
  void framedSvg;
  void topBar;
  void bottomBar;

  console.log(`framed capture → ${outName}.png`);
  return true;
}

async function noiseOverlay(basePng, outPath) {
  const noiseSvg = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <filter id="n">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.45 0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#n)" opacity="0.22"/>
    </svg>
  `);
  const noise = await sharp(noiseSvg).png().toBuffer();
  await sharp(basePng)
    .composite([{ input: noise, blend: "multiply" }])
    .png({ quality: 92, compressionLevel: 8 })
    .toFile(outPath);
}

async function main() {
  for (const [name, build] of Object.entries(previews)) {
    const svg = Buffer.from(build());
    const raster = await sharp(svg, { density: 144 }).png().toBuffer();
    const out = path.join(OUT, `${name}.png`);
    await noiseOverlay(raster, out);
    const stat = fs.statSync(out);
    console.log(`wrote ${name}.png (${Math.round(stat.size / 1024)}kb)`);
  }

  // Optional live captures dropped into scripts/captures/
  const capturesDir = path.join(__dirname, "captures");
  const captureMap = [
    ["jiku-tennis.png", "jiku-tennis", { title: "JIKU TENNIS · LIVE UI", fps: "UI", model: "artennisgame" }],
    ["jiku-fitness.png", "jiku-fitness", { title: "JIKU FITNESS · LIVE UI", fps: "UI", model: "cyber-athletic" }],
    ["asl-hero.png", "asl-hero", { title: "ASL HERO · LIVE UI", fps: "UI", model: "lesson basics-1" }],
    ["form-pickleball.png", "form-pickleball", { title: "FORM · LIVE UI", fps: "UI", model: "pickleball coach" }],
    ["ar-baseball.png", "ar-baseball", { title: "AR BASEBALL · LIVE", fps: "UI", model: "sandbox" }],
    ["ar-slicer.png", "ar-slicer", { title: "AR SLICER · LIVE", fps: "UI", model: "sandbox" }],
  ];

  if (process.env.USE_LIVE_CAPTURES === "1" && fs.existsSync(capturesDir)) {
    for (const [file, name, meta] of captureMap) {
      await frameCapture(path.join(capturesDir, file), name, meta);
    }
  } else {
    console.log("skipping live capture framing (set USE_LIVE_CAPTURES=1 to enable)");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
