export type TechSpec = string;

export type ProjectPlacement = "matrix" | "case-study" | "sandbox";

export type AccentTone = "coral" | "cobalt" | "lawn" | "ochre";

export interface PortfolioProject {
  id: string;
  title: string;
  narrative: string;
  spatialMechanics: string;
  /** Engineering challenges called out in deep-dive */
  challenges: string[];
  /** Monospace requirement line */
  requirements: string;
  techSpecs: TechSpec[];
  placement: ProjectPlacement;
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

export interface SandboxNote {
  id: string;
  title: string;
  blurb: string;
  techSpecs: TechSpec[];
  liveUrl: string | null;
  extraUrls?: { label: string; url: string }[];
  accent: AccentTone;
  glyph?: string;
  preview?: string;
}

export const SITE = {
  name: "Spatial Play Lab",
  tagline: "Browser AR that moves with you",
  email: "hello@spatialplay.lab",
  currentFocus: "On-device pose filters + couch multiplayer for Jiku Tennis",
  location: "Building in the open · camera-first",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/lw300579-sys/spatial-play-lab",
    },
    { label: "Live site", href: "https://spatial-play-lab.vercel.app" },
  ],
} as const;

/** Section B — Primary Matrix */
export const matrixGames: PortfolioProject[] = [
  {
    id: "jiku-tennis",
    title: "Jiku Tennis",
    glyph: "🎾",
    year: "2025",
    narrative:
      "Browser AR tennis—swing your real arm, rally a living rival, and climb the ladder. No controller needed.",
    spatialMechanics:
      "100% on-device pose detection running on a mobile browser. Your real swing drives a virtual racket through a 1-Euro predictor-corrector filter for smoothing. Features \"invisible assist\" to map natural timing (early pulls cross-court, late goes down the line) rather than physical footwork. Includes a Pass & Play couch multiplayer mode and AI rivals with custom tuning.",
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
    narrative:
      "Real-time 3D target boxing with a proprietary Impact Metric calculating the actual kinetic power of your punches.",
    spatialMechanics:
      "Transforms the camera feed into a physical Action-RPG. Tracks wrist acceleration and hesitation to implement Flow State Dynamic Difficulty Adjustment (DDA). Features asynchronous Ghost-multiplayer (race past personal bests) and procedural, audio-reactive 3D targets.",
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
    id: "asl-hero",
    title: "ASL Hero",
    glyph: "🤟",
    year: "2025",
    narrative:
      "A Duolingo-style American Sign Language trainer driven entirely by browser-based computer vision.",
    spatialMechanics:
      "Real-time geometric analysis of 3D handshapes and motion paths (e.g., reverse axis paths, depth squashing, wrist gaps). Combines a deterministic template engine with a 400-class ONNX WLASL model fallback. Uses a telemetry flywheel backed by Firestore to constantly harvest user failures and refine gesture hitboxes.",
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
    id: "form-pickleball",
    title: "Form — Pickleball Coach",
    glyph: "🥒",
    year: "2025",
    narrative:
      "Real-time biomechanics coaching analyzing elbow angles, hip-shoulder separation, and exact swing events right from the court.",
    spatialMechanics:
      "Operates in dual capture modes: a side-angle Decision pose overlay, and an endline Court Cam. Fuses background-subtraction with object detection and audio fusion to calculate exact swing events (via wrist velocity peaks), trajectory-aware court placements, and spatial heatmaps.",
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
];

/** Section D — Deep-dive case studies */
export const caseStudies: PortfolioProject[] = [
  {
    id: "project-citadel",
    title: "Project Citadel",
    glyph: "📡",
    year: "2024",
    narrative:
      "Mission Control for Market Makers. Extracting SI-unit biomechanical and tactical metrics directly from pure broadcast sports video—no wearables required.",
    spatialMechanics:
      "Processes 60fps HD sports broadcasts to emit real physical metrics via a custom L2 Limit Order Book terminal. Uses a TrackNet temporal heatmap CNN to capture motion-blurred tennis balls (e.g., 130mph serves) by fitting a ballistic trajectory. Solves complex camera geometry using confidence-weighted inverse-variance DLT to ground everything to a 3D court model with calibrated uncertainty. Features Expected Possession Value (EPV) mapping and Digital Twin Biometric modeling.",
    challenges: [
      "TrackNet heatmaps for 130mph motion-blurred tennis balls",
      "Confidence-weighted inverse-variance DLT for camera geometry",
      "Calibrated uncertainty on a 3D court digital twin",
      "Streaming SI-unit metrics into an L2-style analytics terminal",
    ],
    requirements: "Broadcast HD feed · Offline / AWS pipeline",
    techSpecs: [
      "RF-DETR Keypoint",
      "TrackNet Temporal CNN",
      "Homography Solvers",
      "Ballistic Trajectory Fit",
      "AWS",
    ],
    placement: "case-study",
    liveUrl: null,
    preview: {
      src: "/previews/citadel.png",
      alt: "Project Citadel — bio-tactical analytics terminal",
      aspectRatio: "16/10",
      type: "image",
    },
    caseStudyGallery: [
      {
        src: "/previews/citadel.png",
        alt: "Citadel mission control terminal — full dashboard",
        aspectRatio: "16/10",
        caption: "Mission Control · full terminal",
      },
      {
        src: "/previews/citadel-ballistics.png",
        alt: "Citadel digital twin biometrics and tilt indices",
        aspectRatio: "16/10",
        caption: "Digital twin · POMDP tilt / breakdown risk",
      },
      {
        src: "/previews/citadel-epv.png",
        alt: "Citadel live Expected Possession Value chart",
        aspectRatio: "16/10",
        caption: "Live EPV · spatiotemporal edge",
      },
    ],
    accent: "cobalt",
    status: "archived",
  },
];

/** Section E — Sandbox prototypes */
export const sandboxProjects: SandboxNote[] = [
  {
    id: "ar-baseball",
    title: "AR Baseball",
    glyph: "⚾",
    blurb:
      "Low-overhead experiments mapping spatial device motion to Rapier—virtual bats colliding with 3D baseballs in the browser.",
    techSpecs: [
      "React-Three-Fiber",
      "Rapier Physics Engine",
      "Spatial Anchors",
    ],
    liveUrl: "https://ar-baseball.vercel.app/",
    accent: "coral",
    preview: "/previews/ar-baseball.png",
  },
  {
    id: "ar-slicer",
    title: "AR Slicer Mechanics",
    glyph: "🗡️",
    blurb:
      "Fast-paced 3D arcade dodging and slicing—dynamic controllers, ghost replays, floating feedback, particle destruction.",
    techSpecs: [
      "Three.js",
      "React-Three-Fiber",
      "Procedural Generation",
      "Particle Shaders",
    ],
    liveUrl: "https://ar-fruit-slicer-orpin.vercel.app/",
    extraUrls: [
      {
        label: "Arcade Runner",
        url: "https://arcadegame-kappa.vercel.app/",
      },
    ],
    accent: "ochre",
    preview: "/previews/ar-slicer.png",
  },
  {
    id: "webcam-latency",
    title: "Webcam Latency Probe",
    glyph: "⏱️",
    blurb:
      "Micro-bench for getUserMedia → canvas paint latency across Safari/Chrome, used to budget pose pipelines before shipping.",
    techSpecs: ["getUserMedia", "rAF timing", "Canvas 2D"],
    liveUrl: null,
    accent: "lawn",
  },
  {
    id: "shader-grain",
    title: "Paper Grain Shader",
    glyph: "🌫️",
    blurb:
      "Fragment experiments for organic paper noise that stays cheap—same spirit as the site grain, pushed into WebGL.",
    techSpecs: ["GLSL", "Three.js", "Post FX"],
    liveUrl: null,
    accent: "cobalt",
  },
];

export const allProjects: PortfolioProject[] = [
  ...matrixGames,
  ...caseStudies,
];

export function getProjectById(id: string): PortfolioProject | undefined {
  return allProjects.find((p) => p.id === id);
}
