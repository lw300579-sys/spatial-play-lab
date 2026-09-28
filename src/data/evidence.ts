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
    metric: "Session completion without manual recovery",
    status: "Not yet measured",
    nextSample: "5 structured sessions on real phones",
  },
  {
    product: "AR Baseball",
    metric: "First-attempt swing recognition",
    status: "Not yet measured",
    nextSample: "5 structured sessions across handedness and room setup",
  },
  {
    product: "Bio-Tactical Edge",
    metric: "Reconstruction error and evidence-finding time",
    status: "Not yet published",
    nextSample: "1 source-linked golden rally with ground-truth notes",
  },
] as const;

export const goldenRallyStages = [
  {
    step: "01",
    title: "Source",
    requirement: "One unedited 20-second rally clip with provenance and permission to publish.",
    status: "Required",
  },
  {
    step: "02",
    title: "Calibration",
    requirement: "Court anchors, confidence, player tracks, and visible failure flags on the shared timeline.",
    status: "Prototype capability",
  },
  {
    step: "03",
    title: "Reconstruction",
    requirement: "Synchronized source frames, court coordinates, and a 3D replay that can be scrubbed together.",
    status: "Prototype capability",
  },
  {
    step: "04",
    title: "Question",
    requirement: "One narrow tactical question declared before inspecting the final result.",
    status: "Required",
  },
  {
    step: "05",
    title: "Answer",
    requirement: "A bounded conclusion with uncertainty and direct links back to the supporting frames.",
    status: "Required",
  },
  {
    step: "06",
    title: "Export",
    requirement: "A one-page report containing the claim, evidence frames, method, limitations, and date.",
    status: "Required",
  },
] as const;

export const evidenceDownloads = [
  {
    label: "Usability observation sheet",
    href: "/evidence/usability-session-template.csv",
    description: "First-attempt success, timing, recovery, and qualitative notes for each participant.",
  },
  {
    label: "Device and browser matrix",
    href: "/evidence/device-matrix-template.csv",
    description: "Camera readiness, sustained operation, interruption recovery, and thermal observations.",
  },
  {
    label: "Golden-rally acceptance checklist",
    href: "/evidence/golden-rally-checklist.md",
    description: "The minimum evidence package required before Bio-Tactical is presented as validated publicly.",
  },
] as const;
