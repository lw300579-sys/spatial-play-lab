import type { AccentTone } from "./games";

export type FlagshipSlug = "jiku" | "ar-baseball" | "bio-tactical-edge";

export interface CaseStudyStrip {
  role: string;
  builtWith: string;
  when: string;
  status: string;
  /** Camera or data privacy line shown in the meta strip. */
  privacy: string;
  privacyLabel: "Camera" | "Data";
}

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
  availability: string;
  lastVerified: string;
  verificationScope: string;
  updatedAt: string;
  accent: AccentTone;
  preview: {
    src: string;
    alt: string;
    aspectRatio: `${number}/${number}`;
    caption: string;
  };
  media?: {
    src: string;
    alt: string;
    aspectRatio: `${number}/${number}`;
    caption: string;
  }[];
  liveUrl: string | null;
  technologies: string[];
  strip: CaseStudyStrip;
  hardPart: string;
  proof: {
    value: string;
    label: string;
    detail: string;
    measuredAt: string;
    method: string;
  }[];
  problem: string;
  built: string;
  system: string[];
  decisions: {
    title: string;
    body: string;
  }[];
  limitations: string[];
  nextMove: string;
  /** Short how-it-works list for the home flagship band. */
  homeHow: string[];
  statusRow: string;
}

export const flagshipCaseStudies: FlagshipCaseStudy[] = [
  {
    slug: "jiku",
    productId: "jiku-fitness",
    title: "Jiku Fitness",
    label: "Embodied training",
    thesis: "A browser gym where movement becomes the controller.",
    summary:
      "A gym in your browser. Box, do push-ups and pull-ups. Your phone camera keeps count.",
    outcome:
      "A complete camera-first training loop with explicit rounds, planned rest, results, tracking-loss recovery, and rep-quality state machines.",
    role: "everything. Design, game logic, pose tracking, testing.",
    team: "Solo build",
    timeframe: "2025–2026",
    maturity: "live prototype",
    privacy: "Camera inference runs on-device; raw camera frames are not required for the core loop.",
    availability: "Live demo · camera required · best on phone",
    lastVerified: "2026-09-26",
    verificationScope: "Recorded replay, deterministic state tests, and production shell",
    updatedAt: "2026-09-26",
    accent: "coral",
    preview: {
      src: "/shots/jiku-fitness-start-desktop.webp",
      alt: "Jiku Fitness start screen. It asks before it turns the camera on.",
      aspectRatio: "16/10",
      caption: "The round screen. It waits until it can actually see you.",
    },
    liveUrl: "https://posture-app-nms-projects-e9ba3578.vercel.app/",
    technologies: ["MediaPipe pose", "TensorFlow.js", "Three.js"],
    strip: {
      role: "everything. Design, game logic, pose tracking, testing.",
      builtWith: "MediaPipe pose, TensorFlow.js, Three.js",
      when: "2025–2026",
      status: "live prototype",
      privacy: "runs on your phone. No video gets uploaded.",
      privacyLabel: "Camera",
    },
    hardPart:
      "Spotting a body in a camera feed is pretty much solved. What happens around it isn't. Your arm leaves the frame, the light changes, you stop to catch your breath. A lot of camera fitness apps read all of that as you messing up. I wanted Jiku to know the difference.",
    proof: [
      {
        value: "84%",
        label: "target on screen",
        detail:
          "How often a target was on screen during a recorded 45-second boxing session (347 samples).",
        measuredAt: "2026-09-26",
        method: "Recorded 45-second camera replay · 347 samples",
      },
      {
        value: "0.88s",
        label: "longest empty gap",
        detail:
          "Longest gap with nothing on screen in that session. The watchdog fixed six stalls along the way.",
        measuredAt: "2026-09-26",
        method: "Recorded replay with watchdog instrumentation",
      },
      {
        value: "8",
        label: "boxing tests",
        detail: "Automated boxing tests for round flow and recovery.",
        measuredAt: "2026-09-26",
        method: "Automated deterministic test suite",
      },
    ],
    problem:
      "Spotting a body in a camera feed is pretty much solved. What happens around it isn't. Your arm leaves the frame, the light changes, you stop to catch your breath. A lot of camera fitness apps read all of that as you messing up. I wanted Jiku to know the difference.",
    built:
      "I rebuilt the training flow around explicit states for play, rest, completion, results, and recovery.",
    system: [
      "The camera finds your body on the phone, and the app keeps checking how sure it is about each joint.",
      "Every round has a start, a rest and a finish. If tracking drops out, the round pauses and tells you why.",
      "For boxing, combos come at a set rhythm. A separate watchdog only steps in if they actually stall.",
      "A push-up or pull-up counts when your whole body goes through the full range for long enough. Bending your elbows isn't enough.",
    ],
    decisions: [
      {
        title: "Time, not frames.",
        body: "Each phase of a rep is timed in milliseconds, so a rep means the same thing on a cheap phone and a new one.",
      },
      {
        title: "If it's not sure, it doesn't count.",
        body: "A shaky read pauses or downgrades the rep. You never get a free one.",
      },
      {
        title: "Rest is part of the workout.",
        body: "The gaps between combos are on purpose. The watchdog leaves those alone.",
      },
    ],
    limitations: [
      "These are engineering checks. I haven't measured whether people stick with it or get fitter.",
      "It needs more testing on real phones: lefties, different reach, long sessions.",
      "Progress tracks how much you did more than how well you did it.",
      "There's a session history, but it isn't a full training program yet.",
    ],
    nextMove:
      "After each workout, show one thing you did better or worse than last time.",
    homeHow: [
      "The camera finds your body on the phone, and the app keeps checking how sure it is about each joint.",
      "If tracking drops out, the round pauses and tells you why.",
      "A push-up or pull-up counts when your whole body goes through the full range for long enough.",
    ],
    statusRow: "Live prototype · 8 tests",
  },
  {
    slug: "ar-baseball",
    productId: "ar-baseball",
    title: "AR Baseball",
    label: "Camera-first game",
    thesis: "A Wii-like baseball game that starts from a URL.",
    summary:
      "A baseball game you play by swinging at your phone. Three innings, a rival team, no bat.",
    outcome:
      "A deterministic three-inning baseball loop in which pitches wait for the camera, pose, calibration, and swing system to be ready.",
    role: "everything. Game design, swing detection, physics, testing.",
    team: "Solo build",
    timeframe: "2025–2026",
    maturity: "live prototype",
    privacy: "Pose inference runs in the browser; the core batting loop does not require uploading camera frames.",
    availability: "Live demo · camera required · best on phone",
    lastVerified: "2026-09-26",
    verificationScope: "Recorded camera path, seeded simulation, and production shell",
    updatedAt: "2026-09-26",
    accent: "ochre",
    preview: {
      src: "/shots/ar-baseball-stadium-desktop.webp",
      alt: "AR Baseball calibration. A 3D stadium waits until it can see you.",
      aspectRatio: "16/10",
      caption: "Waiting on the pitch. The pitcher won't throw until tracking is ready.",
    },
    liveUrl: "https://ar-baseball.vercel.app/",
    technologies: ["MediaPipe pose", "React Three Fiber", "Rapier physics"],
    strip: {
      role: "everything. Game design, swing detection, physics, testing.",
      builtWith: "MediaPipe pose, React Three Fiber, Rapier physics",
      when: "2025–2026",
      status: "live prototype",
      privacy: "tracking runs in your browser. No video gets uploaded.",
      privacyLabel: "Camera",
    },
    hardPart:
      "A pose-tracked bat can look great and still be reacting to the wrong thing. My first version smoothed the motion so much that real swings nearly disappeared, and it was reading old frames. Standing still was easier to detect than actually swinging. That's backwards.",
    proof: [
      {
        value: "250k",
        label: "seeded games",
        detail: "Seeded simulated games run all the way to a final score.",
        measuredAt: "2026-09-26",
        method: "Seeded simulation harness with bounded game completion",
      },
      {
        value: "21",
        label: "source tests",
        detail: "Current source tests covering swing detection and game flow.",
        measuredAt: "2026-09-26",
        method: "Automated source test suite",
      },
      {
        value: "1",
        label: "recorded-camera check",
        detail: "A real swing, replayed through the production build.",
        measuredAt: "2026-09-26",
        method: "Prerecorded camera input through the production build",
      },
    ],
    problem:
      "A pose-tracked bat can look great and still be reacting to the wrong thing. My first version smoothed the motion so much that real swings nearly disappeared, and it was reading old frames. Standing still was easier to detect than actually swinging. That's backwards.",
    built:
      "I moved detection onto fresh camera inference frames and required both body calibration and a practice swing before competitive pitches begin.",
    system: [
      "You hold a quick pose and take a practice swing. That tells the game how big you are, how far you reach and which side you bat from.",
      "Three separate wrist and grip trackers follow your hands, so one hidden wrist doesn't freeze the bat.",
      "It looks for a real swing: fresh frames, speed scaled to your body, and a path that actually goes somewhere. One twitchy frame doesn't count.",
      "Contact turns into baseball: fielders, runners, runs, a rival team and a final score.",
    ],
    decisions: [
      {
        title: "The pitcher waits for you.",
        body: "No pitch until the camera, your pose, calibration and swing detection are all ready.",
      },
      {
        title: "Forgiving, up to a point.",
        body: "Timing gets some help. A bat that's standing still or shaking from camera noise never gets a hit.",
      },
      {
        title: "Simulate everything.",
        body: "Seeded games make rare bugs repeatable and catch the weird stuff a few test swings would miss.",
      },
    ],
    limitations: [
      "The bat follows your detected grip. It doesn't rebuild every inch of a real bat.",
      "Lefty/righty calibration, torso rotation, your own strike zone and different pitch types all need more tuning.",
      "It's been tested in code, not yet with lots of different people, rooms, clothes and camera distances.",
      "After a really big hit, the fielding and replay cameras could make it clearer what just happened.",
    ],
    nextMove:
      "Let your actual grip drive the bat's position and angle all the way through the swing, then test it with lefties, righties and different rooms.",
    homeHow: [
      "You hold a quick pose and take a practice swing so it learns your size.",
      "It looks for a real swing: fresh frames, speed scaled to your body, and a path that goes somewhere.",
      "Contact turns into baseball: fielders, runners, runs and a final score.",
    ],
    statusRow: "Live prototype · 21 tests",
  },
  {
    slug: "bio-tactical-edge",
    productId: "project-citadel",
    title: "Bio-Tactical Edge",
    label: "Sports intelligence",
    thesis: "Sports intelligence from ordinary match video.",
    summary:
      "Takes ordinary match video and works out where everyone actually was.",
    outcome:
      "A tested analysis workspace and pipeline that links source video, calibrated court coordinates, movement telemetry, counterfactual recovery, and report-ready evidence.",
    role: "everything. Architecture, the vision pipeline, 3D replay, data, evaluation.",
    team: "Solo build",
    timeframe: "2025–2026",
    maturity: "research prototype. No public demo yet.",
    privacy:
      "There's no published retention policy yet, so I'm not pretending there is one.",
    availability: "R&D case study · public golden rally in progress",
    lastVerified: "2026-09-26",
    verificationScope: "Local tests and implementation review; no public end-to-end rally yet",
    updatedAt: "2026-09-26",
    accent: "cobalt",
    preview: {
      src: "/shots/bio-tactical-analysis-desktop.webp",
      alt: "Bio-Tactical Edge development screen, with a court replay and measurements.",
      aspectRatio: "16/10",
      caption: "Broadcast frame on one side, the rebuilt court on the other.",
    },
    media: [
      {
        src: "/shots/bio-tactical-analysis-desktop.webp",
        alt: "Bio-Tactical Edge development screen, with a court replay and measurements.",
        aspectRatio: "16/10",
        caption: "Broadcast frame on one side, the rebuilt court on the other.",
      },
      {
        src: "/shots/bio-tactical-engineering-desktop.webp",
        alt: "Bio-Tactical Edge engineering view of the court and telemetry.",
        aspectRatio: "16/10",
        caption: "Engineering view: court, tracked contact and derived values stay inspectable together.",
      },
      {
        src: "/shots/bio-tactical-reconstruction-desktop.webp",
        alt: "Bio-Tactical Edge reconstruction of a ball path on a court.",
        aspectRatio: "16/10",
        caption: "Reconstruction view: contact and flight projected onto court geometry.",
      },
    ],
    liveUrl: null,
    technologies: ["monocular homography", "Three.js", "FastAPI", "TimescaleDB"],
    strip: {
      role: "everything. Architecture, the vision pipeline, 3D replay, data, evaluation.",
      builtWith: "monocular homography, Three.js, FastAPI, TimescaleDB",
      when: "2025–2026",
      status: "research prototype. No public demo yet.",
      privacy:
        "there's no published retention policy yet, so I'm not pretending there is one.",
      privacyLabel: "Data",
    },
    hardPart:
      "Match video is easy to watch and hard to measure. The camera pans, zooms and cuts. Players overlap. Ten pixels near the net isn't the same distance as ten pixels at the baseline. You have to rebuild a steady court before you can say anything about tactics.",
    proof: [
      {
        value: "77",
        label: "automated tests",
        detail: "Automated tests passing, plus lint and a production build.",
        measuredAt: "2026-09-26",
        method: "Automated analytics test suite, lint, and production build",
      },
      {
        value: "30k+",
        label: "timeline frames",
        detail:
          "Built to keep 30,000+ frame timelines smooth to scrub. That's a design target, not a measured user result.",
        measuredAt: "2026-09-26",
        method: "Implementation capacity target; not a human-outcome metric",
      },
    ],
    problem:
      "Match video is easy to watch and hard to measure. The camera pans, zooms and cuts. Players overlap. Ten pixels near the net isn't the same distance as ten pixels at the baseline. You have to rebuild a steady court before you can say anything about tactics.",
    built:
      "I designed a pipeline that continually maps court lines back to known geometry, projects player and ball tracks into court coordinates, and keeps the result synchronized with the original footage and a 3D replay.",
    system: [
      "Every frame, it finds the court lines, matches them to a regulation court, and keeps track of how confident that match is.",
      "Players and the ball get projected onto that court. Moves that are physically impossible get filtered out.",
      "Video, court positions, stats and a 3D replay all share one timeline, so they stay in sync.",
      "The replay can show where a player recovered to next to stronger spots they could have picked.",
      "Search and reports link every answer back to the frames it came from.",
    ],
    decisions: [
      {
        title: "Show the uncertainty.",
        body: "If calibration is shaky, the screen says so instead of faking precision.",
      },
      {
        title: "The video is the proof.",
        body: "Every number stays tied to frames a coach can go look at.",
      },
      {
        title: "Search ends at a clip.",
        body: "Asking a question only helps if the answer drops you on the exact rally.",
      },
    ],
    limitations: [
      "No public demo yet: one rally, input video to 3D court to a report.",
      "No accuracy numbers until there's a proper benchmark with ground truth and error bars.",
      "Camera cuts, hidden lines, matching uniforms, bad light and overlapping players need a visible test set.",
      "Privacy and data retention for a real deployment aren't written up yet.",
    ],
    nextMove:
      "Publish one 20-second rally you can scrub from the broadcast frame to the 3D court, with one question answered and a one-page report.",
    homeHow: [
      "Every frame, it finds the court lines and matches them to a regulation court.",
      "Players and the ball get projected onto that court.",
      "Video, court positions, stats and a 3D replay share one timeline.",
    ],
    statusRow: "Research prototype · 77 tests",
  },
];

export const flagshipSlugs = flagshipCaseStudies.map(({ slug }) => ({ slug }));

export function getFlagshipCaseStudy(
  slug: string,
): FlagshipCaseStudy | undefined {
  return flagshipCaseStudies.find((caseStudy) => caseStudy.slug === slug);
}
