# Ari Swerdlow Portfolio and Product Audit

Audit date: 2026-09-26
Scope: the portfolio and all seven linked live titles, plus the Bio-Tactical case study.
Methods: live desktop and narrow-viewport smoke tests, camera-path tests where available, accessibility-tree inspection, HTTP/header inspection, deployed-source inspection, local repository review, lint/typecheck/build/test runs, and bundle-size sampling.

## Remediation status

The implementation pass is complete. Every changed product was built on Vercel as a preview, verified through the public deployment path, promoted, and matched to its production alias on September 26, 2026.

| Product | Completed repair | Local validation |
|---|---|---|
| Portfolio | Clearer writing, compact mobile navigation, accessible QR dialog and decorative stickers, resilient clipboard feedback, paused offscreen animation, corrected anchor spacing, and consistent product naming | ESLint passed; Next.js 16 production build passed with webpack |
| Jiku Fitness | Reliable boxing rest/results transitions, visible round state, full-body timed push-up and pull-up validation, corrected confidence handling, and a Vite/Vercel production-output configuration | 8 boxing tests passed; production build passed |
| Slice AR | Camera isolated as a visible video layer, separate camera/model readiness, a 12-second startup watchdog, real camera reacquisition on retry, interruption recovery, and clearer failure states | ESLint passed; TypeScript and Vite production build passed; live camera and fruit compositing visually checked |
| AR Baseball | Camera-only batting, fresh-pose and active-swing contact gates, coherent swing detection, fielding outs, three-inning difficulty progression, rival scoring, hit streaks, full-screen camera compositing, final score, replay reset, browser headers, and a secure Next.js dependency line | 250,000 seeded simulation iterations passed; production build passed; production dependency audit found zero vulnerabilities |
| AR Tennis | Swept contact-plane detection, fewer unexplained first-rival misses, placement-driven errors, monotonic rival progression, and reproducible seeded scoring stress tests with a hard workload bound | 33 tests passed; production build passed |
| Form: Pickleball Coach | Completed wall-target and expanded shot-type mappings, metrics, debrief copy, player DNA, and leak-drill coverage | Typecheck passed; 695 tests passed with 6 skipped; production build passed |
| ASL Hero | Self-hosted MediaPipe and ONNX runtimes, generated-output lint exclusions, and blocking lint fixes | 205 application cases, 38 server checks, and model decision tests passed; production build passed; lint exits successfully with legacy warnings |
| Orbitap | Seeded replayable course generation, effect-safe initialization, stable frame-loop allocations, guarded death handling, typed browser globals, and consistent naming/metadata | ESLint passed; PWA production build passed |
| Sports Analytics | No code changes were needed in the already active local worktree | ESLint passed; 77 tests passed; production build passed |

## Executive assessment

The portfolio has a strong visual identity and unusually ambitious browser-computer-vision work. At the start of the audit, its biggest weakness was release reliability: several experiences looked polished in their first screen but were not protected by functional deployment checks. A `200 OK` response was possible while a product was unusable.

The audit found three immediate blockers in the previous production versions. All three have now been repaired and deployed:

1. **Jiku Fitness is broken for a fresh visitor.** The deployment serves `/src/main.tsx` and other raw TypeScript/TSX files with bare package imports. A fresh browser remains on `INITIALIZING NEURAL CORE` because this is source output rather than a Vite production build.
2. **Slice AR becomes unstable after gameplay begins.** The camera feed worked during calibration in this audit, but the active game saturated or hung the test browser. This is consistent with the reported black-screen behavior on devices that cannot sustain the combined hand tracking, segmentation, canvas, and 3D loops.
3. **The portfolio calls every project “live” without verifying that the core journey works.** HTTP health checks would miss the Jiku deployment failure, the Slice active-loop failure, and the boxing end-state issue.

## Priority order

| Priority | Finding | User impact | Required result |
|---|---|---|---|
| P0 | Jiku deploys raw TSX and never boots for a fresh visitor | Entire application unavailable | Build with Vite, deploy `dist`, and fail CI if HTML references `/src/*` |
| P0 | Slice AR active gameplay can hang or appear black | Core game becomes unusable | Keep camera visible independently, add a frame watchdog, and adapt/disable expensive effects |
| P1 | Boxing can reach a state with no targets and no dependable conclusion UI | Session appears frozen | Make round/game-over state reactive and test the complete 3-round timeline |
| P1 | Push-up and pull-up counters validate mainly elbow angles | False reps, missed reps, unsafe form rewarded | Use calibrated full-body state machines with confidence, form, and range-of-motion gates |
| P1 | Jiku Tennis fuzz test can fail to terminate | Possible scoring-state runaway | Bound/repair the state machine and make the property test deterministic |
| P1 | Form Pickleball does not typecheck and two tuning tests time out | Current branch is not releaseable | Complete the new shot/capture-mode mappings and stabilize tuning tests |
| P1 | No functional smoke test guards the portfolio's live links | Regressions remain public | Test boot, camera fallback, first interaction, sustained play, and completion on every deploy |
| P2 | Missing baseline security headers across deployments | Weaker browser isolation and policy control | Add CSP, nosniff, referrer policy, frame policy, and an explicit camera policy |
| P2 | Portfolio QR dialog and draggable stickers have accessibility gaps | Keyboard and assistive-tech friction | Add dialog focus management and correct semantics/keyboard operation |
| P2 | Arcade Runner has nondeterministic render-time game generation | Unstable resets/replays and React compiler errors | Move generation outside render and use a seeded pure generator |

## Jiku Fitness

Live URL: <https://posture-app-nms-projects-e9ba3578.vercel.app/#academy>

### Deployment blocker

The live HTML references `/src/main.tsx`. That module, `/src/App.tsx`, and the lazy-loaded game modules are served as raw source. A normal browser cannot resolve the bare imports the same way Vite's development server does. During a fresh-session test the page remained at `JIKU / INITIALIZING NEURAL CORE`.

Required release controls:

- Run the production build and deploy only its output directory.
- Assert that deployed HTML contains hashed `/assets/*` references and no `/src/` script references.
- Add a browser smoke test that waits for a stable home-screen control, enters the dojo, and fails on an endless loader.
- Put a timeout and actionable retry/error message on boot. An infinite branded loader hides deployment errors.
- Purge or version old service-worker caches after the corrected deployment so returning users do not run a different game implementation from fresh users.

### Boxing: why targets stop

The deployed source defines three 60-second rounds separated by two 10-second rests. After the third round it deliberately sets `gameOver`, which makes `isPlaying` false and stops target spawning. A newer internal `ImpactScreen` is scheduled 600 ms later, but the surrounding summary overlay still derives visibility from mutable `window.boxingGameState` without a React state transition. In the older local implementation, the UI synchronization condition also omits `gameOver`, so the session can stop with no visible conclusion. This matches the reported “targets stop spawning” symptom after roughly 3 minutes 20 seconds.

The deployed source contains a retry intended to prevent a capped group of live targets from starving future spawns. Because the deployment is raw source, that newer work is not reliably reaching users.

Recommended repair:

- Store `round`, `isResting`, and `gameOver` in one reducer/state machine. Do not use a mutable window global as the render signal.
- Model explicit states: `countdown -> playing -> resting -> playing -> complete -> restarting`.
- Clear or freeze targets when leaving `playing`; render a visible rest countdown and a guaranteed completion screen.
- Make completion idempotent. Persist the session, award XP, save a ghost, stop recording, and open results exactly once.
- Replace the separate 600 ms timeout with a state transition whose fallback can render even if Three/Drei fails.
- Add an always-visible `End session` action and a watchdog: if no target has spawned for more than two expected intervals during `playing`, clear invalid targets and schedule the next beat.
- Run a synthetic-clock test through the full 200-second session, plus pause/resume, lost tracking, background/foreground, and replay.

Acceptance criteria:

- A target appears within the defined interval throughout each playing round.
- Rest periods visibly count down and never masquerade as a frozen game.
- The results screen appears within one second of the final round on both fast and throttled devices.
- `Play again` resets every timer, target, combo, audio node, recorder, and progression snapshot.
- Leaving and re-entering the camera view cannot unmount the engine or reset the spawn clock.

### Push-up counter

The deployed detector arms after three frames with both elbow angles above 145 degrees, accepts the bottom after two frames below 110 degrees, and counts after two frames back above 145 degrees. It only uses shoulders, elbows, and wrists. That means it can count standing arm bends, knee movement, partial-body views, a sagging plank, or a pike as valid push-ups.

There is also a confidence bug in both counters: `(kp.score || kp.visibility || 1)` turns an explicit confidence of `0` into another value or ultimately `1`. A fully unreliable keypoint can therefore look perfectly reliable. Use `kp.score ?? kp.visibility ?? 0` and require each critical landmark, rather than averaging away one missing joint.

Upgrade the detector to:

- Require a side or three-quarter camera setup with shoulder, hip, knee, ankle, elbow, and wrist landmarks visible.
- Calibrate the user's top and comfortable bottom range before the first set.
- Arm only from a stable plank: shoulder-hip-ankle alignment, hands under an acceptable shoulder range, elbows extended, and low vertical drift.
- Enter `descending`, confirm `bottom` using calibrated elbow depth and chest/shoulder displacement, then count only after a controlled return to `top`.
- Reject or mark low-quality reps for hip sag, piking, asymmetric arms, shortened range, tracking loss, or implausible speed.
- Express dwell in milliseconds, not frame counts. Two frames mean very different things at 8 fps and 30 fps.
- Reset or safely re-arm after tracking loss; the current phase persists, so reacquisition can complete a stale rep.
- Surface `valid`, `partial`, and `unverified` reps separately. Never silently turn uncertain pose data into a success.

### Pull-up counter

The pull-up detector adds an overhead-wrist gate, but it still infers a pull-up almost entirely from elbow angles. The feedback says `CHIN OVER BAR` even though no chin-to-bar condition is measured. Arm curls with raised hands can satisfy the current state machine.

Upgrade it to:

- Calibrate a stable dead hang and a personal top position.
- Estimate a bar/grip line from stable wrist positions and require the wrists to remain anchored around it.
- Measure torso and face ascent relative to that grip line. A top rep should require the chin/nose relationship to cross the calibrated line, not just elbows below 120 degrees.
- Require full extension and shoulder descent before re-arming the next rep.
- Detect large hip/knee swing and report assisted/kipping movement separately rather than pretending it is strict.
- Use bilateral symmetry, minimum travel, velocity, dwell, and confidence gates.
- Count at a clearly communicated moment and preserve the completed rep if the camera briefly loses the athlete afterward.

### Gamification

The tower, health, combo, core charge, milestones, audio, haptics, and persistent eras form a good base. The current engine still ties tower decay to time while the athlete remains visible. That can punish legitimate rest and reward rushed, low-quality reps. Tracking loss pauses decay, which unintentionally makes leaving the frame a better rest strategy than resting safely in frame.

Make the loop compelling and sustainable:

- Score **quality-adjusted reps**, with visible credit for depth, alignment, symmetry, and control.
- Use short set missions such as `8 clean reps`, `3 perfect descents`, or `hold alignment for the last 2 reps`.
- Preserve earned construction permanently; put temporary pressure on an enemy wave, energy meter, or round objective instead of destroying lasting progress during rest.
- Add explicit rest phases based on the set plan. Reward returning within a generous window without encouraging endless reps.
- Show a near-term goal at all times: next floor, next era, personal-best pace, or one technique correction.
- Add a personal ghost that represents timing and form quality rather than a raw volume race.
- Use streak flexibility and recovery days. In a fitness product, retention mechanics should not pressure injured or fatigued users into unsafe volume.
- End every set with one concrete win, one form insight, and one next objective.

## Slice AR

Live URL: <https://ar-fruit-slicer-orpin.vercel.app/>

The camera stream itself worked during calibration in this audit: the video reported 1280x720 and the room/person were visible after starting Classic mode. Once active gameplay began, the browser inspection repeatedly became unresponsive. The entry bundle is approximately 1.30 MB raw and 364 KB compressed before runtime model costs.

The active loop combines video capture, MediaPipe hand work, person segmentation every other submitted frame, React Three Fiber, fruit physics, particles, and canvas composition. On a constrained device this can miss the entire frame budget and look like a black or frozen camera even when permission and the stream are valid.

Recommended repair:

- Keep the camera as an independent HTML `<video>` layer that cannot be blacked out by WebGL, shaders, or segmentation failure.
- Default person segmentation off on phones until a short performance probe proves sufficient headroom. Degrade in order: segmentation, particles/postprocessing, render resolution, inference cadence.
- Use one scheduler with backpressure. Never start a second inference while the previous one is running.
- Add a camera watchdog that detects `muted`, `ended`, no advancing `currentTime`, repeated black/near-black sampled frames, and long inference stalls.
- On failure, keep the last useful UI, show a direct reason, and offer `Retry camera`, `Switch camera`, and `Play without occlusion`.
- Handle facing-mode fallback: request `environment`, then retry with a looser constraint, then expose a camera selector.
- Pause inference and rendering on `visibilitychange`; fully dispose tracks, animation frames, textures, workers, and audio on exit.
- Move model loading off the critical camera path and show separate camera/model readiness states.
- Replace deprecated `THREE.Clock` usage.

Acceptance tests should cover iOS Safari and Android Chrome, permission denied then granted, camera interruption, phone rotation, background/foreground, low-power mode, 10 minutes of sustained play, and a device with slow WebGL/inference. A screenshot of the menu is insufficient; the test must prove visible camera pixels and spawning/slicing fruit.

## Jiku Tennis

Live URL: <https://artennisgame.vercel.app/>

The menu and camera calibration loaded, but an active-camera screenshot also caused the browser test to become unresponsive. The local test suite passed 28 tests and timed out on the randomized scoring-state test. Lint reported 88 problems, including ref access during render, stale effect dependencies, functions used before declaration, components constructed during render, and many mutable R3F patterns.

Recommended work:

- Investigate the non-terminating fuzz path before adding more gameplay. Put a strict step bound on every point/game/set transition and log the seed on failure.
- Move camera/model processing into a backpressured worker or controlled scheduler and add the same visibility/disposal lifecycle described for Slice.
- Isolate imperative R3F mutations behind small components/hooks so React state and render purity remain understandable.
- Fix material hook dependency and listener-lifecycle warnings; document deliberate R3F exceptions rather than disabling rules broadly.
- Add sustained-play telemetry for inference time, render fps, dropped frames, memory, context loss, and time since last playable event.
- Test match completion, deuce/tiebreak, replay/restart, lost tracking, and 10-minute thermal degradation.

## Form Pickleball

Live URL: <https://pickleball-coach-three.vercel.app/>

The live shell loaded and reached the recording experience. The current local branch does not typecheck: the new `wall_target` mode and new shot types/metrics are missing from several exhaustive mappings and event types. The test suite passed 693 tests, skipped 6 files, and timed out in two ball-tuning tests. Its initial application JavaScript is also the largest sampled first-load payload among the Vite titles, before pose/model assets.

Recommended work:

- Make capture modes and shot types discriminated unions with exhaustive `never` checks so adding `wall_target`, `serve`, `slice`, `volley`, `smash`, or `dropShot` breaks in one obvious place.
- Add the missing `wallTargetHit`, `ballSpeedMph`, and `wallTargetScore` event fields with a versioned persisted schema.
- Replace timing-sensitive tuning tests with fixed traces and deterministic simulated time.
- Lazy-load ONNX/pose analysis and mode-specific coaching UI after the user chooses a workflow.
- Show download/model progress separately from camera readiness, and support a clean retry without page reload.
- Validate calibration, shot capture, wrong-side camera placement, no-ball false positives, session completion, and export/share.

## AR Baseball

Live URL: <https://ar-baseball.vercel.app/>

The menu loaded cleanly and the focused local unit suite passed 17 tests. The local package still identifies itself as `artennisgame`, which can leak into analytics, caches, build metadata, and debugging. The live deployment sends `no-store, no-cache` for a mostly static game despite local PWA/service-worker assets.

Recommended work:

- Correct package, manifest, analytics, and error-reporting identifiers to the baseball product.
- Cache hashed static assets as immutable; revalidate the HTML shell instead of disabling all caching.
- Add an install/offline test if the PWA path is intentional, or remove stale service-worker assets if it is not.
- Smoke-test each mode (`Play Ball`, derby, practice, webcam), input switching, pause/resume, and completion.
- Make camera requirements and non-camera alternatives explicit before requesting permission.

## ASL Hero

Live URL: <https://asl-web-fawn.vercel.app/lesson?id=basics-1>

This had the strongest live boot path: the lesson loaded, showed `HELLO`, and exposed the record action. Its lint script currently traverses generated `.vercel/output` content, producing thousands of irrelevant findings. Source-level findings still include random/time-dependent values in render paths, synchronous state changes in effects, stale callback dependencies, broad `any` use, and ignored type errors.

The lesson downloads MediaPipe runtime assets from jsDelivr. That external dependency makes the core lesson fail on restrictive networks or when the CDN changes.

Recommended work:

- Exclude `.vercel`, `.next`, generated data, and build output from lint; then bring the remaining source errors to zero.
- Self-host version-pinned MediaPipe WASM/model assets with immutable caching and integrity/version checks.
- Fix stale `useCallback` dependencies around practice/SRS updates; those can silently record the wrong lesson state.
- Make randomized lesson options deterministic per attempt and never call `Date.now`, `performance.now`, or `Math.random` during render.
- Add tests for camera permission, model-download failure, recording, feedback, next sign, SRS persistence, and offline/repeat load.

## Arcade Runner / ORBITAP

Live URL: <https://arcadegame-kappa.vercel.app/>

The portfolio names the game `Arcade Runner`, the live UI calls it `ORBITAP`, and the document title is `arcade-game-`. This weakens product recall and link previews. The compressed entry JavaScript is about 368 KB for a one-input arcade game.

The local source generates procedural obstacles with `Math.random` inside render-time memoization and mutates module-level arrays. React Strict Mode, remounts, restarts, and ghost replays can therefore produce inconsistent worlds. Lint reports 26 problems and there is no automated test script.

Recommended work:

- Choose one product name and apply it to the portfolio, title, manifest, icons, Open Graph metadata, analytics, and in-game brand.
- Build courses with a seeded, pure generator outside render. Save the seed with ghost/replay data.
- Add unit tests for generation invariants, collision boundaries, scoring, restart, revive timing, and ghost determinism.
- Fix stale pointer-listener dependencies and clean up every listener/frame/timer on unmount.
- Lazy-load skins, cosmetics, and postprocessing; keep the first playable path minimal.
- Add reduced-motion and mute controls without hiding core feedback.

## Bio-Tactical case study

The case study communicates the product vision well but has no live demo. Numerical claims such as accuracy, frame rate, and biometric precision need evidence close to the claim.

Add:

- a dated benchmark table with device/browser, sample size, test procedure, median/p95 latency, and failure rate;
- a short real capture showing input, overlay, result, and a failure/recovery case;
- clear definitions for every accuracy metric and what ground truth was used;
- privacy/data-lifecycle details for photos, landmarks, derived measurements, storage, deletion, and model/API transmission;
- limitations across clothing, lighting, body types, camera angles, mobility aids, and occlusion;
- a runnable demo or an explicit archived/prototype status.

## Portfolio website

Live URL: <https://ari-swerdlow.vercel.app/#games>

### What is strong

- Distinct visual system and consistent product storytelling.
- Clear division between games, software, case study, and working principles.
- The local Next.js project passes lint and completes a production build with the documented webpack fallback.
- The narrow viewport had no horizontal overflow.

### Improvements

1. **Truthful availability.** Replace the blanket `live` framing with states such as `Live`, `Prototype`, `Best on mobile`, `Temporarily unavailable`, and `Case study`. Drive `Live` from a functional smoke check, not HTTP status.
2. **Desktop fallback.** Camera projects currently offer QR/copy/share but no direct `Open anyway`. Add it for debugging, tablets, laptops, and users who already have a camera-capable desktop browser.
3. **Faster scanning.** The page is very long on narrow screens. Put the strongest outcome, role, stack, and proof into a compact first card; allow filtering by camera AR, sports, accessibility, and software; collapse extended implementation narratives behind an intentional detail view.
4. **Mobile navigation.** At the tested narrow width, the name and `BIO-TACTICAL OS` wrap and crowd the sticky header. Use a compact label or menu below the breakpoint.
5. **QR dialog accessibility.** Opening the dialog leaves keyboard focus on the underlying trigger. Add initial focus, a focus trap, `aria-modal`, background inertness, Escape, and focus restoration.
6. **Sticker accessibility.** Draggable `<div>` elements have labels but are not keyboard-operable. Either make them decorative and hidden from assistive technology or implement buttons/handles with keyboard movement and instructions.
7. **Copy failure handling.** Clipboard operations need a fallback and visible error state.
8. **Animation lifecycle.** Pause the ambient canvas when offscreen or when the document is hidden; respect reduced motion. A perpetual animation loop should not consume battery while users read lower sections.
9. **Evidence.** Place benchmark methods beside claims such as `60fps`, `±10 cm`, or accuracy percentages. A recruiter should be able to distinguish measured production results from goals or prototypes.
10. **Media weight.** Preview images are roughly 436–548 KB each. Keep Next Image optimization, provide correct `sizes`, and preload only the true above-the-fold asset.

### Security and privacy headers

All sampled deployments used HTTPS/HSTS, but none exposed a complete baseline set of CSP, `X-Content-Type-Options`, `Referrer-Policy`, frame restrictions, and `Permissions-Policy` headers. Add a shared policy appropriate to each app. Camera apps should explicitly allow camera access to `self`; third-party model/CDN origins should be listed narrowly, then removed as assets become self-hosted.

Because these products process camera frames and body/hand landmarks, each one should visibly state whether pixels or derived landmarks leave the device, what is stored, and how to delete it. Keep this statement next to the camera action, not only in a distant privacy page.

## Release system that prevents recurrence

Create one shared deployment gate for every title:

1. Install with a locked dependency file.
2. Run typecheck, lint, unit/property tests, and production build.
3. Inspect build output: no source entrypoints, no unexpected remote runtime dependencies, and bounded bundle budgets.
4. Deploy to a preview URL.
5. Run Playwright on a real built deployment with synthetic media:
   - boot finishes;
   - camera denied shows recovery UI;
   - camera allowed produces advancing video frames;
   - the first gameplay object appears;
   - the core action scores/counts;
   - five minutes of accelerated/simulated game time reaches a visible completion state;
   - restart works;
   - no uncaught exceptions, WebGL context losses, runaway timers, or unbounded heap growth.
6. Test one narrow phone, one midrange Android profile, one iPhone/Safari profile, and desktop Chromium.
7. Promote only after the functional checks pass. Feed the result into the portfolio availability badge.

Track a small common telemetry schema without camera pixels: app version, device/browser class, camera/model readiness durations, inference p50/p95, render fps, dropped frames, last successful spawn/action time, tracking-loss duration, session state, clean completion, and error code. This will turn “black screen” and “stopped spawning” from anecdotal reports into diagnosable failures.

## Initial verification before repairs

| Product | Verification result |
|---|---|
| Portfolio | Lint passed; production Next build passed with webpack; live desktop/narrow smoke passed |
| Jiku Fitness | Fresh live boot failed; deployed raw source inspected; boxing and counter state machines traced |
| Slice AR | Menu/calibration camera worked; active play became unresponsive; deployed bundle inspected |
| Jiku Tennis | Live menu/calibration worked; 28 tests passed, 1 randomized test timed out; lint 88 findings |
| Form Pickleball | Live shell worked; 693 tests passed, 2 timed out, 6 files skipped; typecheck failed on current feature mappings |
| AR Baseball | Live menu worked; focused 17-test suite passed |
| ASL Hero | Lesson and record UI loaded; lint configuration/source findings reviewed |
| Arcade Runner | Live menu worked; lint 26 findings; no automated test script |

The accompanying implementation pass addresses the actionable local code findings above. Publishing is intentionally separate so each deployment can be reviewed against its preview before it replaces a live version.
