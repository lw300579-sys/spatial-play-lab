import type { AccentTone } from "./games";

export type FlagshipSlug = "jiku" | "ar-baseball" | "bio-tactical-edge";

export interface FlagshipCaseStudy {
  slug: FlagshipSlug;
  productId: string;
  title: string;
  label: string;
  thesis: string;
  summary: string;
  outcome: string;
  role: string;
  team: string;
  timeframe: string;
  maturity: string;
  privacy: string;
  accent: AccentTone;
  preview: {
    src: string;
    alt: string;
    aspectRatio: `${number}/${number}`;
  };
  liveUrl: string | null;
  technologies: string[];
  proof: {
    value: string;
    label: string;
    detail: string;
  }[];
  problem: string;
  built: string;
  system: {
    step: string;
    title: string;
    body: string;
  }[];
  decisions: {
    title: string;
    body: string;
  }[];
  limitations: string[];
  nextMove: string;
}

export const flagshipCaseStudies: FlagshipCaseStudy[] = [
  {
    slug: "jiku",
    productId: "jiku-fitness",
    title: "Jiku Fitness",
    label: "Embodied training",
    thesis: "A browser gym where movement becomes the controller.",
    summary:
      "Jiku turns a phone camera into a responsive training surface for shadow boxing, push-ups, and pull-ups. The product work is not just recognizing motion—it is building a session that recovers when tracking gets messy and still gives the athlete a clear beginning, middle, and end.",
    outcome:
      "A complete camera-first training loop with explicit rounds, planned rest, results, tracking-loss recovery, and rep-quality state machines.",
    role:
      "Product design, interaction engineering, pose integration, game systems, and release validation",
    team: "Independent product build",
    timeframe: "2025–2026",
    maturity: "Live product prototype",
    privacy: "Camera inference runs on-device; raw camera frames are not required for the core loop.",
    accent: "coral",
    preview: {
      src: "/previews/jiku-fitness.png",
      alt: "Jiku Fitness training dashboard shown in a phone frame",
      aspectRatio: "16/10",
    },
    liveUrl: "https://posture-app-nms-projects-e9ba3578.vercel.app/#dojo",
    technologies: [
      "MediaPipe pose",
      "TensorFlow.js",
      "Three.js",
      "Finite-state gameplay",
      "Synthetic camera replay",
    ],
    proof: [
      {
        value: "84%",
        label: "target occupancy",
        detail:
          "Observed across 347 samples from a 45-second recorded boxing replay.",
      },
      {
        value: "0.88s",
        label: "longest empty interval",
        detail:
          "The liveness watchdog repaired six potential phrase-queue stalls in the same replay.",
      },
      {
        value: "8",
        label: "boxing tests",
        detail:
          "Deterministic coverage for spawn recovery and the round-state sequence.",
      },
    ],
    problem:
      "Camera fitness fails quickly when the product treats pose detection as the whole experience. Real sessions include low-confidence joints, temporary tracking loss, intentional rest, delayed targets, and users who cannot tell whether the game is still running. Those failure states feel like judgment from the product, even when the real problem is a noisy camera pipeline.",
    built:
      "I rebuilt the training flow around explicit states for play, rest, completion, results, and recovery. Boxing target phrases now have a liveness watchdog rather than relying on one fragile timer chain. Push-up and pull-up detection use timed, full-body phases with confidence gates instead of counting a rep from elbow angle alone.",
    system: [
      {
        step: "01",
        title: "Establish a trustworthy body signal",
        body:
          "Pose confidence, landmark freshness, and tracking loss are treated as product state. The athlete receives a recoverable pause instead of an unexplained miss.",
      },
      {
        step: "02",
        title: "Separate rhythm from recovery",
        body:
          "Intentional spaces between combinations remain part of the workout rhythm. A separate watchdog intervenes only when the phrase queue has actually stalled.",
      },
      {
        step: "03",
        title: "Make every round legible",
        body:
          "Round, rest, completion, and results are explicit transitions. Finishing the final round cannot leave the athlete in a visually frozen arena.",
      },
      {
        step: "04",
        title: "Count movement quality, not an angle",
        body:
          "Rep state machines use body alignment, confidence, phase timing, range, and tracking recovery to distinguish complete, partial, and unverified movement.",
      },
    ],
    decisions: [
      {
        title: "Recovery is part of game feel",
        body:
          "A watchdog should repair a genuine stall without deleting the quiet beats that make combinations readable.",
      },
      {
        title: "Time beats frame counts",
        body:
          "Phase dwell is measured in milliseconds so a rep means the same thing on a slow phone and a fast one.",
      },
      {
        title: "Uncertain input stays uncertain",
        body:
          "Low-confidence landmarks pause or downgrade the judgment instead of being promoted into a successful rep.",
      },
    ],
    limitations: [
      "The current validation is engineering evidence, not a measured retention or training-outcome study.",
      "Handedness, reach calibration, and long-session device endurance still need broader real-device coverage.",
      "Progression remains more score- and volume-led than quality-led.",
      "Session history and trend views are not yet a complete training program.",
    ],
    nextMove:
      "Make movement quality the progression currency: one clear post-session insight, one targeted mission, and a re-test that proves whether control, range, or consistency improved.",
  },
  {
    slug: "ar-baseball",
    productId: "ar-baseball",
    title: "AR Baseball",
    label: "Camera-first game",
    thesis: "A Wii-like baseball game that starts from a URL.",
    summary:
      "AR Baseball reads a real two-handed swing from an ordinary phone camera, then carries that action through contact, fielding, runners, rival scoring, and a complete three-inning game. The hard part is making generous contact feel earned rather than automatic.",
    outcome:
      "A deterministic three-inning baseball loop in which pitches wait for the camera, pose, calibration, and swing system to be ready.",
    role:
      "Game design, pose-driven interaction, swing detection, physics integration, simulation, and release validation",
    team: "Independent product build",
    timeframe: "2025–2026",
    maturity: "Live product prototype",
    privacy: "Pose inference runs in the browser; the core batting loop does not require uploading camera frames.",
    accent: "ochre",
    preview: {
      src: "/previews/ar-baseball.png",
      alt: "AR Baseball showing a virtual bat and stadium over a camera view",
      aspectRatio: "16/10",
    },
    liveUrl: "https://ar-baseball.vercel.app/",
    technologies: [
      "MediaPipe pose",
      "React Three Fiber",
      "Rapier physics",
      "Seeded simulation",
      "Recorded-camera replay",
    ],
    proof: [
      {
        value: "250k",
        label: "seeded simulations",
        detail:
          "Deterministic gameplay runs used to test outcome distribution and game-state completion.",
      },
      {
        value: "3",
        label: "complete innings",
        detail:
          "At-bats feed visible fielding, runners, rival scoring, and an ending—not an isolated batting toy.",
      },
      {
        value: "1",
        label: "recorded-camera gate",
        detail:
          "A production replay verifies that a real swing can survive the deployed camera path.",
      },
    ],
    problem:
      "A pose-driven bat can look convincing while responding to the wrong signal. The first implementation smoothed motion so aggressively that real swings nearly disappeared, and render-frame duplication made the detector reason about stale input. A stationary or jittering bat could be easier to recognize than the committed motion the player intended.",
    built:
      "I moved detection onto fresh camera inference frames, corrected the timestamp units, combined three wrist and grip trackers for occlusion resilience, and required both body calibration and a practice swing before competitive pitches begin. Contact now considers body-normalized velocity and a coherent path instead of a single noisy threshold.",
    system: [
      {
        step: "01",
        title: "Calibrate the person, not the room",
        body:
          "A T-pose and practice swing establish body scale, reach, readiness, and a credible motion range before a live pitch is released.",
      },
      {
        step: "02",
        title: "Track a resilient two-hand signal",
        body:
          "Multiple wrist and grip estimates reduce the chance that one occluded joint freezes the bat or turns noise into intent.",
      },
      {
        step: "03",
        title: "Recognize a path, not a spike",
        body:
          "Fresh inference timestamps, normalized velocity, direction, and coherent travel establish that the player committed to a swing.",
      },
      {
        step: "04",
        title: "Carry contact through a whole game",
        body:
          "Seeded rules turn timing and placement into fielding, runners, runs, rival pressure, and a deterministic ending.",
      },
    ],
    decisions: [
      {
        title: "Pitches wait for readiness",
        body:
          "The pitcher does not begin simply because the page loaded. Camera, pose, calibration, and the swing system must all be ready.",
      },
      {
        title: "Forgiveness is bounded",
        body:
          "Contact assists timing without allowing a stationary bat or incoherent camera jitter to produce a hit.",
      },
      {
        title: "Simulation protects the loop",
        body:
          "Seeded outcomes make rare state-machine failures reproducible and expose distributions that a few manual at-bats would miss.",
      },
    ],
    limitations: [
      "The current bat presentation is driven by a reliable detected grip path, not a literal reconstruction of every part of a physical bat.",
      "Left/right-handed calibration, torso rotation, personal strike-zone scaling, and pitch identity need deeper tuning.",
      "The product has engineering validation, but not yet broad usability data across bodies, rooms, clothes, and camera distances.",
      "Fielding and replay cameras can make cause-and-effect clearer after very large contact.",
    ],
    nextMove:
      "Replace the triggered swing presentation with a body-relative live grip path that directly controls bat position and orientation through the contact corridor, then validate it across handedness and room setups.",
  },
  {
    slug: "bio-tactical-edge",
    productId: "project-citadel",
    title: "Bio-Tactical Edge",
    label: "Sports intelligence",
    thesis: "Sports intelligence from ordinary match video.",
    summary:
      "Bio-Tactical Edge converts a moving broadcast view into a synchronized court model, player paths, a 3D replay, and searchable tactical evidence. It is designed for the footage teams already have—without wearables or a special capture rig.",
    outcome:
      "A tested analysis workspace and pipeline that links source video, calibrated court coordinates, movement telemetry, counterfactual recovery, and report-ready evidence.",
    role:
      "Product architecture, analysis UX, computer-vision pipeline design, 3D replay, data systems, and evaluation",
    team: "Independent research and product prototype",
    timeframe: "2025–2026",
    maturity: "Validated R&D prototype; public demo not yet released",
    privacy: "Data handling depends on deployment; production retention and deletion policy still needs to be published.",
    accent: "cobalt",
    preview: {
      src: "/previews/citadel.jpg",
      alt: "Bio-Tactical Edge workspace with match video, movement metrics, and a 3D court replay",
      aspectRatio: "1024/630",
    },
    liveUrl: null,
    technologies: [
      "Monocular homography",
      "Three.js digital twin",
      "FastAPI",
      "TimescaleDB",
      "Physics-conditioned prediction",
    ],
    proof: [
      {
        value: "77",
        label: "automated tests",
        detail:
          "The underlying analytics project passes its current test suite, lint, and production build.",
      },
      {
        value: "30k+",
        label: "timeline frames",
        detail:
          "The workspace is designed to keep long telemetry sequences responsive for scrubbing and comparison.",
      },
      {
        value: "1",
        label: "shared timeline",
        detail:
          "Video, court coordinates, metrics, 3D replay, and evidence references stay aligned around the same moment.",
      },
    ],
    problem:
      "Broadcast footage is easy to watch and difficult to measure. The camera pans, zooms, cuts, and compresses depth; players overlap; the same pixel distance means something different across the image. A useful coaching system must reconstruct a stable court before it makes tactical claims.",
    built:
      "I designed a pipeline that continually maps court lines back to known geometry, projects player and ball tracks into court coordinates, and keeps the result synchronized with the original footage and a 3D replay. The product layer turns that timeline into movement analysis, counterfactual recovery, plain-language search, and report-ready evidence.",
    system: [
      {
        step: "01",
        title: "Find the court and its confidence",
        body:
          "Visible lines anchor a homography to regulation geometry while an uncertainty estimate communicates when calibration is trustworthy.",
      },
      {
        step: "02",
        title: "Fuse noisy tracks in court space",
        body:
          "Player, ball, and body detections are projected into real positions, filtered for impossible motion, and preserved on a shared timeline.",
      },
      {
        step: "03",
        title: "Replay the decision",
        body:
          "A 3D court compares the actual recovery path with stronger spatial options and a distribution of plausible next shots.",
      },
      {
        step: "04",
        title: "Return to the evidence",
        body:
          "Search and reports link every conclusion back to the source frames and surrounding point rather than producing an untraceable score.",
      },
    ],
    decisions: [
      {
        title: "Uncertainty belongs in the interface",
        body:
          "Calibration and prediction are distributions with failure cases, not a reason to present one mathematically precise answer as truth.",
      },
      {
        title: "The video stays primary evidence",
        body:
          "Derived metrics and 3D reconstruction remain synchronized to the frames a coach can inspect.",
      },
      {
        title: "Search ends at a clip",
        body:
          "Natural-language analysis is useful only when the result returns to a specific rally and moment that can be reviewed.",
      },
    ],
    limitations: [
      "There is not yet a public golden-rally demo with input video, reconstructed court, query, and downloadable report.",
      "Accuracy claims need a published benchmark methodology, ground-truth definition, sample size, and error bars.",
      "Failure cases across camera cuts, line occlusion, uniforms, lighting, and player overlap need a visible evaluation set.",
      "Production privacy, retention, deletion, and model-transmission policies are not yet documented.",
    ],
    nextMove:
      "Publish one twenty-second golden rally that can be scrubbed from broadcast frame to 3D reconstruction, compare one recovery decision, answer one grounded question, and export a one-page evidence report.",
  },
];

export const flagshipSlugs = flagshipCaseStudies.map(({ slug }) => ({ slug }));

export function getFlagshipCaseStudy(
  slug: string,
): FlagshipCaseStudy | undefined {
  return flagshipCaseStudies.find((caseStudy) => caseStudy.slug === slug);
}
