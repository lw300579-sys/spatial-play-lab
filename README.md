# Spatial Play Lab

Production portfolio for browser-based mobile AR games, computer vision experiments, and physical computing web apps.

## Stack

- **Next.js** (App Router, TypeScript strict)
- **Tailwind CSS v4** — tactile paper theme, hard-edged sticker shadows
- **Framer Motion** — spring physics (`stiffness: 300`, `damping: 15`)
- **qrcode.react** — desktop → mobile WebXR handoff

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
src/
  app/                 # App Router layout + page
  components/
    hero/              # Human hero + device banner + sticker board
    game-card/         # Primary matrix cards + case study gallery
    qr-modal/          # Instant QR scan overlay
    sandbox/           # Lab prototypes micro-grid
    bio/               # Contact + current focus
    ui/                # Tactile button / sticker primitives
  data/games.ts        # Strongly typed portfolio payload
  hooks/               # Device detection + clipboard
  lib/motion.ts        # Shared spring configs
```

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
