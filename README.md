# Ari Swerdlow

Portfolio for camera-first products spanning browser fitness, AR games, applied computer vision, and sports intelligence.

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
    work/[slug]/       # Flagship case-study routes
  components/
    hero/              # Hero + device banner + sticker board
    game-card/         # Live title cards
    qr-modal/          # QR scan overlay
    sandbox/           # Prototypes
    bio/               # Contact + current focus
    ui/                # Tactile button / sticker primitives
  data/games.ts        # Portfolio project payload
  data/case-studies.ts # Flagship evidence, ownership, and limitations
  hooks/               # Device detection + clipboard
  lib/motion.ts        # Shared spring configs
```

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run test:release` — browser gate for the portfolio routes and all linked products
- `npm run previews:all` — capture and compose preview assets

The release gate also runs in GitHub Actions on pull requests, `main`, manual dispatch, and a weekly schedule.
