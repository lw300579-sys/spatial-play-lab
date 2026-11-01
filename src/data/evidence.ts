import { flagshipCaseStudies } from "./case-studies";

export const evidenceUpdatedAt = "2026-09-26";

export const publishedBenchmarks = flagshipCaseStudies.flatMap((caseStudy) =>
  caseStudy.proof.map((proof) => ({
    product: caseStudy.title,
    metric: proof.label,
    result: proof.value,
    measuredAt: proof.measuredAt,
    method: proof.method,
    kind: "Engineering validation" as const,
  })),
);

export const humanOutcomeGaps = [
  {
    product: "Jiku Fitness",
    metric: "Can someone finish a session without help?",
    status: "Not yet measured",
    nextSample: "5 sessions on real phones",
    nextMove: "After each workout, show one thing you did better or worse than last time.",
  },
  {
    product: "AR Baseball",
    metric: "Does the swing feel right on a real phone?",
    status: "Not yet measured",
    nextSample: "Test runs BB01–BB04 with lefties and righties",
    nextMove: "",
  },
  {
    product: "Bio-Tactical Edge",
    metric: "How accurate is it, and how fast can you find the moment you want?",
    status: "Not yet published",
    nextSample: "One public rally with notes",
    nextMove: "",
  },
] as const;

export const goldenRallyStages = [
  {
    step: "01",
    title: "Source",
    requirement: "One unedited 20-second rally, with permission to publish.",
    status: "Required",
  },
  {
    step: "02",
    title: "Calibration",
    requirement: "Court lines found, with a confidence score.",
    status: "Prototype capability",
  },
  {
    step: "03",
    title: "Reconstruction",
    requirement: "Video, court and 3D replay scrub together.",
    status: "Prototype capability",
  },
  {
    step: "04",
    title: "Question",
    requirement: "One question, written down before looking.",
    status: "Required",
  },
  {
    step: "05",
    title: "Answer",
    requirement: "An answer that links back to the frames.",
    status: "Required",
  },
  {
    step: "06",
    title: "Export",
    requirement: "A one-page report.",
    status: "Required",
  },
] as const;

export const evidenceDownloads = [
  {
    label: "Usability observation sheet",
    href: "/evidence/usability-session-template.csv",
    description: "Blank sheet for a session with a real person.",
  },
  {
    label: "Device and browser matrix",
    href: "/evidence/device-matrix-template.csv",
    description: "Blank sheet for phones and browsers.",
  },
  {
    label: "Golden-rally acceptance checklist",
    href: "/evidence/golden-rally-checklist.md",
    description: "Checklist before calling Bio-Tactical done.",
  },
] as const;
