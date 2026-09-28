# Ari Swerdlow

Portfolio for product engineering across browser fitness, AR games, applied computer vision, and sports intelligence.

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
    evidence/          # Public evidence ledger and fieldwork downloads
    privacy/           # Plain-language data boundaries
  components/
    hero/              # Hero + device banner + sticker board
    game-card/         # Live title cards
    qr-modal/          # QR scan overlay
    sandbox/           # Prototypes
    bio/               # Contact + current focus
    ui/                # Tactile button / sticker primitives
  data/games.ts        # Portfolio project payload
  data/case-studies.ts # Flagship evidence, ownership, and limitations
  data/evidence.ts     # Dated benchmarks and open human-outcome gaps
  hooks/               # Device detection + clipboard
  lib/motion.ts        # Shared spring configs
```

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run test:release` — browser gate for the portfolio routes and all linked products
- `npm run previews:all` — capture and compose preview assets
- `python3 -m pip install -r requirements-resume.txt` — install the pinned résumé generator dependency
- `python3 scripts/generate-resume.py` — regenerate the résumé in `output/pdf/` and `public/`

The release gate also runs in GitHub Actions on pull requests, `main`, manual dispatch, and a weekly schedule. It uploads a structured JSON report covering:

- Core portfolio routes at a phone viewport
- JSON-LD, Open Graph art, sitemap dates, CSP, and permissions policy
- Case-study evidence tables and privacy copy
- Résumé and evidence-template downloads
- Event-endpoint allowlisting and the custom 404
- Production-shell health for all seven linked products

The linked-product portion remains intentionally labeled **production shell**. Product-native recorded-camera and deterministic tests are separate evidence; this repository does not relabel a page-load check as a completed camera journey.

## Evidence and conversion

- `/evidence` publishes dated methods beside engineering quantities and keeps missing human outcomes visible.
- Blank CSV templates standardize five-person usability sessions and device/browser testing.
- The Bio-Tactical golden-rally checklist defines the source-to-export acceptance artifact without fabricating a result.
- `/ari-swerdlow-resume.pdf` is a one-page hiring-manager artifact generated from repository-backed claims.
- CTA events use a first-party allowlisted endpoint with no added cookies, persistent identifier, camera data, form contents, user-agent field, or third-party pixel.
- Camera-processing and policy boundaries appear beside product launch actions.

## Honest boundary

Code can prepare the evidence system, but it cannot manufacture real users, device sessions, quotes, retention, a publishable source rally, or permission to share footage. Those remain fieldwork inputs. The site marks them as **not yet measured** or **not yet published** until real observations are added.
