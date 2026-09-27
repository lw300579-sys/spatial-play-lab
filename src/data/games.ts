export type TechSpec = string;

export type ProjectPlacement = "matrix" | "case-study";

export type AccentTone = "coral" | "cobalt" | "lawn" | "ochre";

/** Launch UX: camera titles prefer QR on desktop; link titles open in-tab. */
export type LaunchMode = "camera" | "link";

export type ProjectGroupId = "camera-play" | "hands-learn" | "browser-arcade";

export interface ProjectGroup {
  id: ProjectGroupId;
  label: string;
  description: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  narrative: string;
  spatialMechanics: string;
  challenges: string[];
  requirements: string;
  techSpecs: TechSpec[];
  placement: ProjectPlacement;
  group: ProjectGroupId;
  launchMode: LaunchMode;
  liveUrl: string | null;
  extraUrls?: { label: string; url: string }[];
  preview: {
    src: string;
    alt: string;
    aspectRatio: `${number}/${number}`;
    type: "image" | "video" | "gif";
  };
  caseStudyGallery?: {
    src: string;
    alt: string;
    aspectRatio: `${number}/${number}`;
    caption?: string;
  }[];
  caseStudySections?: {
    step: string;
    title: string;
    body: string;
  }[];
  caseStudyQuestions?: string[];
  techDetails?: {
    label: string;
    explanation: string;
  }[];
  accent: AccentTone;
  glyph?: string;
  status?: "live" | "prototype" | "archived";
  year?: string;
}

export interface ProjectProof {
  built: string;
  changed: string;
  impact: string;
  validation: string[];
}

export const SITE = {
  name: "Ari Swerdlow",
  shortName: "AS",
  tagline: "Camera-first products powered by movement",
  email: "aswerd2@gmail.com",
  currentFocus:
    "Available for product engineering and applied computer vision work where software has to understand the physical world.",
  socials: [
    { label: "X", href: "https://x.com/2Swerdy" },
    {
      label: "GitHub",
      href: "https://github.com/lw300579-sys",
    },
  ],
} as const;

export const projectGroups: ProjectGroup[] = [
  {
    id: "camera-play",
    label: "Camera sports & play",
    description:
      "Browser AR and court-side coaching where your body drives the session.",
  },
  {
    id: "hands-learn",
    label: "Hands & language",
    description:
      "Computer vision that checks handshape and motion for learning, not sport.",
  },
  {
    id: "browser-arcade",
    label: "Browser arcade",
    description:
      "Desktop-friendly games that do not need a camera. Still built for feel and timing.",
  },
];

/** Concrete product proof shown before implementation detail. */
export const projectProofById: Record<string, ProjectProof> = {
  "jiku-tennis": {
    built:
      "Body-tracked browser tennis with a five-rival ladder, pass-and-play, shot placement, and a full scoring loop.",
    changed:
      "Rival contact now uses swept-path detection, while placement, pressure, and reachable distance decide whether a return is earned.",
    impact:
      "Comfortable balls come back consistently; wide or pressured shots create misses the player can actually read.",
    validation: ["33 gameplay tests", "5-rival progression", "Adaptive quality ladder"],
  },
  "jiku-fitness": {
    built:
      "A camera fitness system spanning timed shadow-boxing rounds, push-ups, pull-ups, form feedback, and persistent progression.",
    changed:
      "Round completion, rest, results, timed rep phases, full-body confidence gates, and tracking-loss recovery were rebuilt as explicit states.",
    impact:
      "A lost landmark or a finished round no longer leaves the athlete guessing whether the session is still running.",
    validation: ["8 boxing tests", "Timed rep phases", "Tracking-loss recovery"],
  },
  "form-pickleball": {
    built:
      "Side-view biomechanics coaching and endline court analysis with shot events, debriefs, player DNA, and drill recommendations.",
    changed:
      "Capture modes, shot types, metrics, debrief coverage, and the new wall-target workflow now share complete typed mappings.",
    impact:
      "Every supported workflow reaches a useful explanation instead of dropping data between capture and coaching.",
    validation: ["695 tests passed", "Typecheck clean", "Mode-aware analysis"],
  },
  "ar-baseball": {
    built:
      "A camera-only three-inning baseball game with pitching, active-swing contact, runners, fielding outcomes, and a rival score.",
    changed:
      "Stationary bats can no longer hit. Fresh pose data, coherent swing paths, sharper innings, and deterministic outcome rules now govern play.",
    impact:
      "Contact feels forgiving without feeling automatic, and every at-bat contributes to a legible game rather than a disconnected physics demo.",
    validation: ["250k seeded simulations", "3-inning game loop", "0 production vulnerabilities"],
  },
  "ar-slicer": {
    built:
      "A hand-tracked slicing game with combos, bombs, particle feedback, daily challenges, and on-device vision.",
    changed:
      "The camera is isolated from WebGL, startup and stream interruptions recover cleanly, and quality now steps down under sustained load.",
    impact:
      "A renderer or model problem can no longer silently replace the player with a black screen.",
    validation: ["Independent camera layer", "Stream recovery", "Thermal-aware quality"],
  },
  "asl-hero": {
    built:
      "A paced ASL lesson loop that evaluates handshape and motion with geometric rules plus a learned-model fallback.",
    changed:
      "MediaPipe and ONNX assets are self-hosted, and the lesson, server-inference, and final decision paths are exercised together.",
    impact:
      "Core lessons no longer depend on a third-party runtime CDN, making repeat sessions faster and more dependable.",
    validation: ["Self-hosted vision runtime", "400-class fallback", "Decision-path tests"],
  },
  "arcade-runner": {
    built:
      "A one-input arcade runner with procedural courses, unlockable skins, replay data, and shareable ghost challenges.",
    changed:
      "Course generation is seeded and pure, render-time randomness is gone, and death, restart, and frame-loop state are guarded.",
    impact:
      "The same seed now means the same course, so scores and ghost races can be compared fairly.",
    validation: ["Seeded generation", "Shareable ghost runs", "Lint + PWA build"],
  },
};

/** Live playable titles, grouped for scanning */
export const matrixGames: PortfolioProject[] = [
  {
    id: "jiku-tennis",
    title: "Jiku Tennis",
    glyph: "🎾",
    year: "2025",
    group: "camera-play",
    launchMode: "camera",
    narrative:
      "Browser AR tennis you play with your real arm. Rally an AI rival, climb the ladder, or pass the phone for couch multiplayer. No controller, no app install.",
    spatialMechanics:
      "Everything runs on-device in a mobile browser. MediaPipe pose drives a virtual racket, smoothed with a 1-Euro predictor-corrector so noisy joints do not kill the feel of contact. An \"invisible assist\" layer maps timing (early pulls tend cross-court, late contact goes down the line) instead of forcing perfect footwork in a bedroom. Pass & Play shares one camera session between two people. AI rivals are tunable so the climb stays readable on mid-range phones targeting a playable 60fps budget.",
    challenges: [
      "Smoothing noisy MediaPipe joints without killing responsiveness",
      "Mapping swing timing → shot direction without requiring footwork",
      "Keeping a playable 60fps budget on mid-range mobile SoCs",
      "Pass & Play state sync across a single shared camera session",
    ],
    requirements: "Camera · Portrait phone · Safari / Chrome",
    techSpecs: [
      "MediaPipe Pose",
      "Body Tracking",
      "React-Three-Fiber",
      "Zustand",
      "Device Motion",
    ],
    placement: "matrix",
    liveUrl: "https://artennisgame.vercel.app/",
    preview: {
      src: "/previews/jiku-tennis.png",
      alt: "Jiku Tennis, with a player swinging into a browser tennis court",
      aspectRatio: "16/10",
      type: "image",
    },
    accent: "lawn",
    status: "live",
  },
  {
    id: "jiku-fitness",
    title: "Jiku Fitness",
    glyph: "🥊",
    year: "2025",
    group: "camera-play",
    launchMode: "camera",
    narrative:
      "Shadow boxing that turns your camera into a 3D target range. Targets arrive in quick combinations, while speed, accuracy, and clean form build your score.",
    spatialMechanics:
      "Pose and velocity tracking drive procedural, audio-reactive targets in the room with you. Hesitation and acceleration feed a flow-state difficulty layer that should feel responsive without flipping into unfair spikes. Ghost multiplayer lets you race a past personal best in the same space. Particle VFX are budgeted hard so mid-range phones still keep a readable hit feel.",
    challenges: [
      "Deriving kinetic Impact Metric from 2D wrist acceleration",
      "Flow-state DDA that reacts to hesitation without feeling unfair",
      "Particle VFX that survive the mobile frame budget",
      "Ghost replays that stay temporally aligned with live pose",
    ],
    requirements: "Camera · Standing space · Chrome / Safari",
    techSpecs: [
      "Pose & Velocity Tracking",
      "TensorFlow.js",
      "Particle VFX",
      "Dynamic Hitboxes",
    ],
    placement: "matrix",
    liveUrl: "https://posture-app-nms-projects-e9ba3578.vercel.app/#dojo",
    preview: {
      src: "/previews/jiku-fitness.png",
      alt: "Jiku Fitness training dashboard shown in a phone frame",
      aspectRatio: "16/10",
      type: "image",
    },
    accent: "coral",
    status: "live",
  },
  {
    id: "form-pickleball",
    title: "Form: Pickleball Coach",
    glyph: "🥒",
    year: "2025",
    group: "camera-play",
    launchMode: "camera",
    narrative:
      "A pickleball coach that reads your swing from court video and turns it into clear, useful feedback. Use a side view to work on form or an endline view to study placement.",
    spatialMechanics:
      "Two capture modes share the same pipeline: Decision mode for side-angle pose coaching, and Court Cam from the endline. Background subtraction, object detection, and audio fusion pin swing events to wrist velocity peaks, then place trajectories on a court model for heatmaps that map to real space instead of abstract joint charts.",
    challenges: [
      "Fusing pose + YOLO + audio for exact swing event timing",
      "Dual-mode capture (Decision vs Court Cam) without UX thrash",
      "Kalman tracking through occlusion and motion blur",
      "Court heatmaps grounded to real spatial placements",
    ],
    requirements: "Webcam or phone · Side or endline angle",
    techSpecs: [
      "MediaPipe 33-Landmark",
      "YOLOv8n + EfficientDet",
      "Webcam/CV",
      "Kalman Filter Tracking",
    ],
    placement: "matrix",
    liveUrl: "https://pickleball-coach-three.vercel.app/",
    preview: {
      src: "/previews/form-pickleball.png",
      alt: "Form pickleball coaching over court footage",
      aspectRatio: "16/10",
      type: "image",
    },
    accent: "ochre",
    status: "live",
  },
  {
    id: "ar-baseball",
    title: "AR Baseball",
    glyph: "⚾",
    year: "2025",
    group: "camera-play",
    launchMode: "camera",
    narrative:
      "A camera-controlled three-inning baseball game built around real swings. Read the pitcher, drive the ball into gaps, chase hit streaks, and hold off a rival club as every inning gets sharper.",
    spatialMechanics:
      "Step into view and swing your hands like a bat. The game reads the motion, keeps contact forgiving, and rewards timing and placement with fielding plays, extra-base hits, and home runs.",
    challenges: [
      "Reading an intentional swing without reacting to camera jitter",
      "Keeping contact generous while rewarding better timing",
      "Making fielding outcomes feel earned and easy to read",
      "Running pose tracking, physics, and the stadium smoothly on a phone",
    ],
    requirements: "Camera · Upper body in view · Chrome / Safari",
    techSpecs: [
      "React-Three-Fiber",
      "Rapier Physics",
      "Spatial Anchors",
    ],
    placement: "matrix",
    liveUrl: "https://ar-baseball.vercel.app/",
    preview: {
      src: "/previews/ar-baseball.png",
      alt: "AR Baseball with a virtual bat and ball in a browser stadium",
      aspectRatio: "16/10",
      type: "image",
    },
    accent: "coral",
    status: "live",
  },
  {
    id: "ar-slicer",
    title: "AR Slicer",
    glyph: "🗡️",
    year: "2025",
    group: "camera-play",
    launchMode: "camera",
    narrative:
      "A fast camera game where your hands become blades. Slice fruit, dodge bombs, build combos, and chase your best run as the pace climbs.",
    spatialMechanics:
      "Three.js and React-Three-Fiber drive procedural targets and particle destruction while the player moves through the scene. Ghost replays and floating score feedback keep the loop readable when the camera and hands are both busy.",
    challenges: [
      "Hit detection that stays fair while the player is moving",
      "Particle breakups that do not tank the frame",
      "Ghost replays aligned to live motion",
      "Readable feedback in a busy AR overlay",
    ],
    requirements: "Camera · Standing space · Chrome / Safari",
    techSpecs: [
      "Three.js",
      "React-Three-Fiber",
      "Procedural Generation",
      "Particle Shaders",
    ],
    placement: "matrix",
    liveUrl: "https://ar-fruit-slicer-orpin.vercel.app/",
    preview: {
      src: "/previews/ar-slicer.png",
      alt: "AR Slicer mode select screen in a phone frame",
      aspectRatio: "16/10",
      type: "image",
    },
    accent: "ochre",
    status: "live",
  },
  {
    id: "asl-hero",
    title: "ASL Hero",
    glyph: "🤟",
    year: "2025",
    group: "hands-learn",
    launchMode: "camera",
    narrative:
      "An American Sign Language trainer that watches your hands in the browser. Lessons feel closer to Duolingo pacing, but the checker is computer vision: handshape, path, and motion have to land before you move on.",
    spatialMechanics:
      "A geometric template engine scores 3D handshapes and motion paths first, including awkward cases like reverse-axis paths, depth squashing, and wrist gaps. When templates are uncertain, a 400-class ONNX WLASL model acts as fallback. Failed attempts flow into Firestore telemetry so hitboxes get tighter over time instead of staying frozen to the first draft.",
    challenges: [
      "Geometric templates vs. ML fallback without false rejects",
      "Depth squashing & wrist-gap edge cases in real rooms",
      "ONNX inference latency inside a lesson UI frame budget",
      "Telemetry flywheel that improves hitboxes from failures",
    ],
    requirements: "Camera · Good lighting · Front-facing hands",
    techSpecs: [
      "MediaPipe Hand/Pose Landmarks",
      "Next.js 16",
      "ONNX WLASL Model",
      "Geometric Template Engine",
    ],
    placement: "matrix",
    liveUrl: "https://asl-web-fawn.vercel.app/lesson?id=basics-1",
    preview: {
      src: "/previews/asl-hero.png",
      alt: "ASL Hero hand tracking during a sign language lesson",
      aspectRatio: "16/10",
      type: "image",
    },
    accent: "cobalt",
    status: "live",
  },
  {
    id: "arcade-runner",
    title: "Orbitap",
    glyph: "🏃",
    year: "2025",
    group: "browser-arcade",
    launchMode: "link",
    narrative:
      "A one-tap endless run through a shifting obstacle course. Crest gaps, weave past hazards, and chase how far your timing can carry you before the lane closes in. Built as a browser arcade snack: short sessions, readable risk, one-more-run energy.",
    spatialMechanics:
      "Not camera AR. Input is a simple tap or click mapped to a jump/crest action while the course scrolls under you. Procedural spacing and rising speed do the difficulty work, so the craft problem is readability and fairness rather than pose tracking.",
    challenges: [
      "Obstacle spacing that stays fair as speed climbs",
      "One-input control that still feels expressive",
      "Readable risk at a glance on a small screen",
      "Session length that invites \"one more run\" without grinding",
    ],
    requirements: "Desktop or phone browser · No camera",
    techSpecs: ["Canvas / Web game loop", "Procedural course", "Touch + click"],
    placement: "matrix",
    liveUrl: "https://arcadegame-kappa.vercel.app/",
    preview: {
      src: "/previews/arcade-runner.png",
      alt: "Orbitap neon obstacle course title screen",
      aspectRatio: "16/10",
      type: "image",
    },
    accent: "cobalt",
    status: "live",
  },
];

/** Deep-dive case studies */
export const caseStudies: PortfolioProject[] = [
  {
    id: "project-citadel",
    title: "Bio-Tactical Edge: Team OS & Broadcast AI",
    glyph: "📡",
    year: "2025 – 2026",
    group: "camera-play",
    launchMode: "link",
    narrative:
      "I built a sports analysis system that turns ordinary match footage into a measured, searchable 3D record of what happened on the court. It is designed to give coaches useful spatial and tactical answers without asking an athlete to wear a sensor or a team to install a special camera rig.",
    spatialMechanics:
      "Broadcast video is easy to watch and surprisingly hard to measure. The camera moves, the zoom changes, players overlap, and a few pixels near the far baseline represent a very different real distance than the same pixels near the camera. I wanted to turn that moving picture into a stable model of the point: where every athlete was, how far they moved, which space was open, and what options were available next.\n\nThe system rebuilds the court beneath the video, projects tracked movement into real court coordinates, and keeps the video, data, and 3D replay synchronized on one timeline. Instead of only reporting that a player hit a forehand, it can show the movement that created the forehand, the recovery that followed it, and the next decision that recovery made possible—or took away.",
    caseStudySections: [
      {
        step: "01",
        title: "Start with footage teams already have",
        body:
          "The input can be a normal HD or 4K broadcast feed. The pipeline finds the court, players, ball, and body landmarks frame by frame. There is no wearable setup and no requirement to film the match again from a fixed research camera.",
      },
      {
        step: "02",
        title: "Hold the court still while the camera moves",
        body:
          "Court lines become the measuring frame. When the broadcast camera pans, tilts, or zooms, the system continually re-locks the image to known court geometry. That converts screen pixels into real positions and distances instead of treating the television frame as a flat map.",
      },
      {
        step: "03",
        title: "Turn movement into usable measurements",
        body:
          "Once the geometry is stable, each player path can be measured in court space. The timeline surfaces distance covered, acceleration, recovery time, spacing, workload, and repeated movement patterns. A coach can move from a broad match view down to the exact frames behind one difficult recovery.",
      },
      {
        step: "04",
        title: "Replay the decision, not just the shot",
        body:
          "A synchronized Three.js court recreates the point in 3D. It shows the position a player actually chose, a stronger recovery position based on the available angles, and a range of likely next shots. The prediction is presented as a set of possibilities—not a fake claim that sport has one certain answer.",
      },
      {
        step: "05",
        title: "Find the pattern and share the evidence",
        body:
          "An analyst can search in ordinary language for moments such as long defensive recoveries, late contact after extended rallies, or repeated attacks into one zone. The result links back to the relevant clips and can be turned into a scouting view or a one-click PDF dossier for a coach or athlete.",
      },
    ],
    caseStudyQuestions: [
      "How far did each player really travel during the point?",
      "Did the player recover to the best space, or leave the next court open?",
      "Which shot options were available from that body position?",
      "Where does movement quality start to drop during long rallies?",
      "Which patterns repeat under pressure, not just across the whole match?",
      "Can I jump directly to every clip that supports the conclusion?",
    ],
    challenges: [
      "Keeping one trustworthy court coordinate system through broadcast pans, zooms, cuts, and partial line occlusion.",
      "Combining noisy player, ball, and body detections without letting one bad frame create impossible speed or distance.",
      "Projecting more than 30,000 telemetry frames quickly enough for scrubbing and comparison to feel immediate.",
      "Rendering smooth 60 FPS skeletal and court replays without creating garbage or stalling the browser.",
      "Predicting several realistic next-shot paths while communicating uncertainty instead of presenting one guess as fact.",
      "Turning dense spatial data into plain-English search results and scouting reports a coach can use immediately.",
    ],
    requirements: "Broadcast HD/4K Feed · GPU Accelerated Inference · Real-Time WebSockets",
    techSpecs: [
      "Monocular Homography (CRLB)",
      "Three.js 3D Digital Twin",
      "Next-Shot Diffusion Model",
      "Angle-of-Bisection Kinematics",
      "FastAPI + TimescaleDB",
      "WebSockets / Live Telemetry",
    ],
    techDetails: [
      {
        label: "Monocular homography + CRLB",
        explanation:
          "Maps a single moving camera view onto known court dimensions, while tracking how trustworthy that calibration is.",
      },
      {
        label: "Three.js 3D digital twin",
        explanation:
          "Replays the point on a clean virtual court so spacing, recovery paths, and player relationships are easier to see.",
      },
      {
        label: "Next-shot diffusion model",
        explanation:
          "Produces a distribution of plausible next shots from court position and striker movement instead of forcing one brittle prediction.",
      },
      {
        label: "Angle-of-bisection kinematics",
        explanation:
          "Estimates the recovery position that best balances the opponent's available shot angles, then compares it with the path the player took.",
      },
      {
        label: "FastAPI + TimescaleDB",
        explanation:
          "Runs the analysis services and stores time-indexed tracking data so long matches remain fast to query and scrub.",
      },
      {
        label: "WebSockets + live telemetry",
        explanation:
          "Streams new measurements and replay state into the workspace without forcing the analyst to refresh or wait for a full export.",
      },
    ],
    placement: "case-study",
    liveUrl: null,
    preview: {
      src: "/previews/citadel.jpg",
      alt: "Bio-Tactical Edge sports analysis workspace and 3D replay",
      aspectRatio: "1024/630",
      type: "image",
    },
    caseStudyGallery: [
      {
        src: "/previews/citadel.jpg",
        alt: "Bio-Tactical Edge workstation with 3D replay and movement analysis",
        aspectRatio: "1024/630",
        caption: "Bio-Tactical Workstation · Monocular 3D Digital Twin & Decision Intelligence",
      },
    ],
    accent: "cobalt",
    status: "live",
  },
];

export const allProjects: PortfolioProject[] = [
  ...matrixGames,
  ...caseStudies,
];

export function getProjectById(id: string): PortfolioProject | undefined {
  return allProjects.find((p) => p.id === id);
}

export function getProjectsByGroup(groupId: ProjectGroupId): PortfolioProject[] {
  return matrixGames.filter((p) => p.group === groupId);
}
