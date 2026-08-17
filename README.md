# Ari Swerdlow

Portfolio for browser AR games, on-device computer vision, and physical computing web apps.

Live: [ari-swerdlow.vercel.app](https://ari-swerdlow.vercel.app)

## Stack

- **Next.js** (App Router, TypeScript)
- **Tailwind CSS v4** — tactile paper theme, hard-edged sticker shadows
- **Framer Motion** — spring physics
- **qrcode.react** — desktop → mobile handoff

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
    hero/              # Hero + device banner + sticker board
    game-card/         # Live title cards
    qr-modal/          # QR scan overlay
    sandbox/           # Prototypes
    bio/               # Contact + current focus
    ui/                # Tactile button / sticker primitives
  data/games.ts        # Portfolio payload
  hooks/               # Device detection + clipboard
  lib/motion.ts        # Shared spring configs
```

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run capture` / compose scripts — preview pipeline under `scripts/`
