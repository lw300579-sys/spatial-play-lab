export type CatalogGroup = "movement" | "language" | "none";

export interface CatalogItem {
  id: string;
  title: string;
  sentence: string;
  privacy: string;
  desktop: string;
  mobile: string | null;
  alt: string;
  liveUrl: string | null;
  tryLabel: string | null;
  caseStudyHref: string | null;
  group: CatalogGroup;
  camera: boolean;
}

export const catalogFilters = [
  { id: "all", label: "All" },
  { id: "movement", label: "Movement" },
  { id: "language", label: "Language" },
  { id: "none", label: "No camera" },
] as const;

export type CatalogFilter = (typeof catalogFilters)[number]["id"];

/** One home list. Copy is from the approved pass. */
export const catalog: CatalogItem[] = [
  {
    id: "jiku-fitness",
    title: "Jiku Fitness",
    sentence: "Shadow boxing, push-ups and pull-ups. Your camera counts the reps so you don't have to lie about them.",
    privacy: "Camera stays on your device.",
    desktop: "/shots/jiku-fitness-start-desktop.webp",
    mobile: "/shots/jiku-fitness-start-mobile.webp",
    alt: "Jiku Fitness start screen. It says make room and find your rhythm, and the camera is still off.",
    liveUrl: "https://posture-app-nms-projects-e9ba3578.vercel.app/",
    tryLabel: "Start training",
    caseStudyHref: "/work/jiku",
    group: "movement",
    camera: true,
  },
  {
    id: "ar-baseball",
    title: "AR Baseball",
    sentence: "Three innings against a rival team. You swing, the game figures out the rest.",
    privacy: "Camera stays on your device.",
    desktop: "/shots/ar-baseball-stadium-desktop.webp",
    mobile: "/shots/ar-baseball-stadium-mobile.webp",
    alt: "AR Baseball in a browser: a 3D stadium waiting for a swing.",
    liveUrl: "https://ar-baseball.vercel.app/",
    tryLabel: "Step up to bat",
    caseStudyHref: "/work/ar-baseball",
    group: "movement",
    camera: true,
  },
  {
    id: "bio-tactical-edge",
    title: "Bio-Tactical Edge",
    sentence: "Takes regular match video and rebuilds the court, the player paths and a 3D replay.",
    privacy: "Public demo coming.",
    desktop: "/shots/bio-tactical-analysis-desktop.webp",
    mobile: null,
    alt: "Bio-Tactical Edge development screen, with a court replay and match measurements.",
    liveUrl: null,
    tryLabel: null,
    caseStudyHref: "/work/bio-tactical-edge",
    group: "movement",
    camera: false,
  },
  {
    id: "jiku-tennis",
    title: "Jiku Tennis",
    sentence: "Swing your arm to rally an AI rival. Five rivals to beat, or pass the phone to a friend.",
    privacy: "Camera stays on your device.",
    desktop: "/shots/jiku-tennis-menu-desktop.webp",
    mobile: "/shots/jiku-tennis-menu-mobile.webp",
    alt: "Jiku Tennis menu. Your arm, your next rival, and a ladder of opponents.",
    liveUrl: "https://artennisgame.vercel.app/",
    tryLabel: "Play tennis",
    caseStudyHref: null,
    group: "movement",
    camera: true,
  },
  {
    id: "form-pickleball",
    title: "Form: Pickleball Coach",
    sentence: "Film yourself playing. It tells you the one thing to fix first.",
    privacy: "Camera stays on your device.",
    desktop: "/shots/pickleball-coach-intro-desktop.webp",
    mobile: "/shots/pickleball-coach-intro-mobile.webp",
    alt: "Form intro. One session, one thing to work on, with a sample debrief.",
    liveUrl: "https://pickleball-coach-three.vercel.app/",
    tryLabel: "Review your game",
    caseStudyHref: null,
    group: "movement",
    camera: true,
  },
  {
    id: "ar-slicer",
    title: "AR Slicer",
    sentence: "Your hands are the blades. Slice fruit, skip the bombs.",
    privacy: "Camera stays on your device.",
    desktop: "/shots/ar-slicer-menu-desktop.webp",
    mobile: "/shots/ar-slicer-menu-mobile.webp",
    alt: "AR Slicer mode picker: Classic, Zen, and Rush.",
    liveUrl: "https://ar-fruit-slicer-orpin.vercel.app/",
    tryLabel: "Play Slicer",
    caseStudyHref: null,
    group: "movement",
    camera: true,
  },
  {
    id: "asl-hero",
    title: "ASL Hero",
    sentence: "Short sign language lessons. It watches your hands and tells you if you got it.",
    privacy: "Some checks run on a server.",
    desktop: "/shots/asl-hero-lesson-desktop.webp",
    mobile: "/shots/asl-hero-lesson-mobile.webp",
    alt: "ASL Hero lesson for the sign hello, with a record button.",
    liveUrl: "https://asl-web-fawn.vercel.app/lesson?id=basics-1",
    tryLabel: "Practice a sign",
    caseStudyHref: null,
    group: "language",
    camera: true,
  },
  {
    id: "arcade-runner",
    title: "Orbitap",
    sentence: "One button. Tap to swing through the gaps. Everyone gets the same course each day.",
    privacy: "No camera.",
    desktop: "/shots/orbitap-start-desktop.webp",
    mobile: "/shots/orbitap-start-mobile.webp",
    alt: "Orbitap title screen, with a play button and the daily course.",
    liveUrl: "https://arcadegame-kappa.vercel.app/",
    tryLabel: "Play Orbitap",
    caseStudyHref: null,
    group: "none",
    camera: false,
  },
];
