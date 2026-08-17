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
  accent: AccentTone;
  glyph?: string;
  status?: "live" | "prototype" | "archived";
  year?: string;
}

export const SITE = {
  name: "Ari Swerdlow",
  shortName: "AS",
  tagline: "Browser AR & on-device computer vision",
  email: "aswerd2@gmail.com",
  currentFocus:
    "Shipping couch multiplayer and tighter on-device pose filters for Jiku Tennis, while keeping the mobile frame budget honest.",
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
      alt: "Jiku Tennis — player swinging into a browser AR tennis court",
      aspectRatio: "16/10",
      type: "image",
    },
    accent: "lawn",
    status: "live",
  },
  {
    id: "jiku-fitness",
    title: "Jiku: Cyber-Athletic Engine",
    glyph: "🥊",
    year: "2025",
    group: "camera-play",
    launchMode: "camera",
    narrative:
      "Shadow boxing that turns your camera into a 3D target range. Every punch feeds an Impact Metric built from wrist acceleration so power feels earned, not guessed.",
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
    liveUrl: "https://posture-app-nms-projects-e9ba3578.vercel.app/#academy",
    preview: {
      src: "/previews/jiku-fitness.png",
      alt: "Jiku Fitness — shadow boxing targets in a live camera feed",
      aspectRatio: "16/10",
      type: "image",
    },
    accent: "coral",
    status: "live",
  },
  {
    id: "form-pickleball",
    title: "Form — Pickleball Coach",
    glyph: "🥒",
    year: "2025",
    group: "camera-play",
    launchMode: "camera",
    narrative:
      "Biomechanics coaching for pickleball that reads elbow angles, hip-shoulder separation, and swing events from court video. Built for side-angle form work and endline court placement, not a generic pose demo.",
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
      alt: "Form — pickleball biomechanics overlay on court footage",
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
      "Swing a virtual bat in the browser and feel contact through Rapier physics. Built to test spatial device motion, collision timing, and hit feedback before those ideas graduate into a fuller title.",
    spatialMechanics:
      "Device motion and spatial anchors feed a React-Three-Fiber scene where bat and ball live under Rapier. The goal is readable contact: when you commit to a swing, the ball should leave with momentum that matches what your hands just did, without a heavy install path.",
    challenges: [
      "Mapping noisy device motion into a stable bat pose",
      "Rapier collisions that feel snappy instead of spongy",
      "Keeping physics + WebGL inside a phone-friendly budget",
      "Spatial anchors that survive small room drift",
    ],
    requirements: "Camera or device motion · Chrome / Safari",
    techSpecs: [
      "React-Three-Fiber",
      "Rapier Physics",
      "Spatial Anchors",
    ],
    placement: "matrix",
    liveUrl: "https://ar-baseball.vercel.app/",
    preview: {
      src: "/previews/ar-baseball.png",
      alt: "AR Baseball — virtual bat and ball in a browser scene",
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
      "A fast 3D arcade of dodging and slicing in your camera space. Dynamic controllers, ghost runs, floating feedback, and particle breakups built to stress-test hit feel under motion.",
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
      alt: "AR Slicer — slice mode select screen in a phone frame",
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
      alt: "ASL Hero — hand landmark overlay teaching sign language",
      aspectRatio: "16/10",
      type: "image",
    },
    accent: "cobalt",
    status: "live",
  },
  {
    id: "arcade-runner",
    title: "Arcade Runner",
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
      alt: "Arcade Runner — endless obstacle course title screen",
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
      "Mission Control for broadcast sports: turn ordinary single-camera match footage into calibrated 3D skeletal telemetry, real-time counterfactual ghost positioning, and generative next-shot physics without wearable sensors or on-court tracking hardware. Built for institutional analysts, coaching staffs, and broadcast producers who demand physical SI units and defensible possession value.",
    spatialMechanics:
      "The platform solves monocular camera geometry frame-by-frame with confidence-weighted DLT and CRLB-bounded uncertainty, mapping 2D pixel coordinates to frozen ±10cm physical court meters across broadcast cuts and zooms. From this calibrated foundation, the system operates across four integrated intelligence engines: (1) 360° Matrix Orbit & Holographic Ghost Avatar — solves athletic inverse kinematics at 60 FPS to compute mathematically optimal angle-of-bisection recovery positions, reaction lag (Δt in ms), and alley exposure %; (2) Physics-Conditioned Next-Shot Diffusion — generates 3D counterfactual ball trajectories, landing dispersion ellipses, and Expected Return of Win Probability (ΔERWP) shifts across tactical clusters; (3) Longitudinal Biometric Load Profiling — monitors Functional Capacity Ratio (FCR), jerk, angular velocity (ω), and metabolic power to expose mechanical fatigue degradation across multi-set tournament play; and (4) Real-Time Voice Coach & Natural Language Search — streams live telemetry over WebSockets with synthetic voice alerts for critical alley exposure and instant semantic search across millions of frames.",
    challenges: [
      "Monocular 3D court calibration surviving dynamic broadcast cuts, zooms, and camera motion",
      "Zero-allocation 60 FPS Three.js skeletal kinematics with matrix transform updates",
      "Sub-millisecond vectorized coordinate projection across 30,000+ telemetry frames",
      "Real-time generative next-shot diffusion conditioned on striker biomechanics",
      "Automated natural language tactical querying and PDF scouting dossier generation",
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
    placement: "case-study",
    liveUrl: null,
    preview: {
      src: "/previews/citadel.jpg",
      alt: "Bio-Tactical Edge — spatial analytics workstation and 3D digital twin",
      aspectRatio: "1024/630",
      type: "image",
    },
    caseStudyGallery: [
      {
        src: "/previews/citadel.jpg",
        alt: "Bio-Tactical Edge workstation — 3D digital twin, biometric radar, and decision intelligence",
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
