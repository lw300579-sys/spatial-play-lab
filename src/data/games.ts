export type TechSpec =
  | "MediaPipe Pose"
  | "MediaPipe Hand/Pose Landmarks"
  | "MediaPipe 33-Landmark"
  | "Body Tracking"
  | "Pose & Velocity Tracking"
  | "Hand Skeleton"
  | "Face Anchor"
  | "Plane Detection"
  | "Device Motion"
  | "Webcam/CV"
  | "React-Three-Fiber"
  | "Three.js"
  | "Zustand"
  | "TensorFlow.js"
  | "Particle VFX"
  | "Dynamic Hitboxes"
  | "Next.js 16"
  | "ONNX WLASL Model"
  | "Geometric Template Engine"
  | "RF-DETR Keypoint"
  | "TrackNet Temporal CNN"
  | "Homography Solvers"
  | "Ballistic Trajectory Fit"
  | "AWS"
  | "YOLOv8n + EfficientDet"
  | "Kalman Filter Tracking"
  | "Rapier Physics Engine"
  | "Spatial Anchors"
  | "Procedural Generation"
  | "Particle Shaders"
  | string;

export type ProjectPlacement = "matrix" | "case-study" | "sandbox";

export type AccentTone = "coral" | "cobalt" | "lawn" | "ochre";

export interface PortfolioProject {
  id: string;
  title: string;
  /** Short human hook shown on cards */
  narrative: string;
  /** Longer spatial / systems breakdown */
  spatialMechanics: string;
  techSpecs: TechSpec[];
  placement: ProjectPlacement;
  /** Live play URL — null means case-study / no QR launch */
  liveUrl: string | null;
  /** Optional secondary URLs (sandbox multi-link) */
  extraUrls?: { label: string; url: string }[];
  /** Preview media — aspect-ratio locked */
  preview: {
    src: string;
    alt: string;
    aspectRatio: `${number}/${number}`;
    type: "image" | "video" | "gif";
  };
  /** High-res gallery for case studies without live URLs */
  caseStudyGallery?: {
    src: string;
    alt: string;
    aspectRatio: `${number}/${number}`;
  }[];
  accent: AccentTone;
  /** Optional emoji / sticker glyph */
  glyph?: string;
  status?: "live" | "prototype" | "archived";
}

export interface SandboxNote {
  id: string;
  title: string;
  blurb: string;
  techSpecs: TechSpec[];
  liveUrl: string | null;
  extraUrls?: { label: string; url: string }[];
  accent: AccentTone;
}

export const SITE = {
  name: "Spatial Play Lab",
  tagline: "Browser AR that moves with you",
  email: "hello@spatialplay.lab",
  currentFocus: "On-device pose filters + couch multiplayer for Jiku Tennis",
  socials: [
    { label: "GitHub", href: "https://github.com" },
    { label: "X", href: "https://x.com" },
  ],
} as const;

/** Section B — Primary Matrix */
export const matrixGames: PortfolioProject[] = [
  {
    id: "jiku-tennis",
    title: "Jiku Tennis",
    glyph: "🎾",
    narrative:
      "Browser AR tennis—swing your real arm, rally a living rival, and climb the ladder. No controller needed.",
    spatialMechanics:
      "100% on-device pose detection running on a mobile browser. Your real swing drives a virtual racket through a 1-Euro predictor-corrector filter for smoothing. Features \"invisible assist\" to map natural timing (early pulls cross-court, late goes down the line) rather than physical footwork. Includes a Pass & Play couch multiplayer mode and AI rivals with custom tuning.",
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
      src: "/previews/jiku-tennis.svg",
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
    narrative:
      "Real-time 3D target boxing with a proprietary Impact Metric calculating the actual kinetic power of your punches.",
    spatialMechanics:
      "Transforms the camera feed into a physical Action-RPG. Tracks wrist acceleration and hesitation to implement Flow State Dynamic Difficulty Adjustment (DDA). Features asynchronous Ghost-multiplayer (race past personal bests) and procedural, audio-reactive 3D targets.",
    techSpecs: [
      "Pose & Velocity Tracking",
      "TensorFlow.js",
      "Particle VFX",
      "Dynamic Hitboxes",
    ],
    placement: "matrix",
    liveUrl: "https://posture-app-nms-projects-e9ba3578.vercel.app/#academy",
    preview: {
      src: "/previews/jiku-fitness.svg",
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
    narrative:
      "A Duolingo-style American Sign Language trainer driven entirely by browser-based computer vision.",
    spatialMechanics:
      "Real-time geometric analysis of 3D handshapes and motion paths (e.g., reverse axis paths, depth squashing, wrist gaps). Combines a deterministic template engine with a 400-class ONNX WLASL model fallback. Uses a telemetry flywheel backed by Firestore to constantly harvest user failures and refine gesture hitboxes.",
    techSpecs: [
      "MediaPipe Hand/Pose Landmarks",
      "Next.js 16",
      "ONNX WLASL Model",
      "Geometric Template Engine",
    ],
    placement: "matrix",
    liveUrl: "https://asl-web-fawn.vercel.app/lesson?id=basics-1",
    preview: {
      src: "/previews/asl-hero.svg",
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
    narrative:
      "Real-time biomechanics coaching analyzing elbow angles, hip-shoulder separation, and exact swing events right from the court.",
    spatialMechanics:
      "Operates in dual capture modes: a side-angle Decision pose overlay, and an endline Court Cam. Fuses background-subtraction with object detection and audio fusion to calculate exact swing events (via wrist velocity peaks), trajectory-aware court placements, and spatial heatmaps.",
    techSpecs: [
      "MediaPipe 33-Landmark",
      "YOLOv8n + EfficientDet",
      "Webcam/CV",
      "Kalman Filter Tracking",
    ],
    placement: "matrix",
    liveUrl: "https://pickleball-coach-three.vercel.app/",
    preview: {
      src: "/previews/form-pickleball.svg",
      alt: "Form — pickleball biomechanics overlay on court footage",
      aspectRatio: "16/10",
      type: "image",
    },
    accent: "ochre",
    status: "live",
  },
];

/** Section D — Deep-dive case studies (no live play URL) */
export const caseStudies: PortfolioProject[] = [
  {
    id: "project-citadel",
    title: "Project Citadel",
    glyph: "📡",
    narrative:
      "Mission Control for Market Makers. Extracting SI-unit biomechanical and tactical metrics directly from pure broadcast sports video—no wearables required.",
    spatialMechanics:
      "Processes 60fps HD sports broadcasts to emit real physical metrics via a custom L2 Limit Order Book terminal. Uses a TrackNet temporal heatmap CNN to capture motion-blurred tennis balls (e.g., 130mph serves) by fitting a ballistic trajectory. Solves complex camera geometry using confidence-weighted inverse-variance DLT to ground everything to a 3D court model with calibrated uncertainty. Features Expected Possession Value (EPV) mapping and Digital Twin Biometric modeling.",
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
      src: "/previews/citadel.svg",
      alt: "Project Citadel — bio-tactical analytics terminal",
      aspectRatio: "16/10",
      type: "image",
    },
    caseStudyGallery: [
      {
        src: "/previews/citadel.svg",
        alt: "Citadel terminal — L2 order book with biomechanical overlays",
        aspectRatio: "16/10",
      },
      {
        src: "/previews/citadel-ballistics.svg",
        alt: "Citadel — ballistic trajectory fit on a 130mph serve",
        aspectRatio: "16/10",
      },
      {
        src: "/previews/citadel-epv.svg",
        alt: "Citadel — Expected Possession Value court heatmap",
        aspectRatio: "16/10",
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
    blurb:
      "Low-overhead experiments mapping spatial device motion to Rapier—virtual bats colliding with 3D baseballs in the browser.",
    techSpecs: [
      "React-Three-Fiber",
      "Rapier Physics Engine",
      "Spatial Anchors",
    ],
    liveUrl: "https://ar-baseball.vercel.app/",
    accent: "coral",
  },
  {
    id: "ar-slicer",
    title: "AR Slicer Mechanics",
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
  },
];

export const allProjects: PortfolioProject[] = [
  ...matrixGames,
  ...caseStudies,
];

export function getProjectById(id: string): PortfolioProject | undefined {
  return allProjects.find((p) => p.id === id);
}
