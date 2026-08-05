"use client";

import { motion, useReducedMotion } from "framer-motion";

const ITEMS = [
  "MediaPipe Pose",
  "On-device inference",
  "60fps mobile target",
  "WebXR handoff",
  "Hand landmarks",
  "1-Euro filters",
  "Rapier physics",
  "No app store",
  "Camera-first play",
  "Ghost multiplayer",
  "Homography solvers",
  "Browser AR",
];

export function TechTicker() {
  const reduce = useReducedMotion();
  const loop = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden border-b-2 border-charcoal bg-charcoal py-2.5 text-paper">
      <motion.div
        className="flex w-max gap-8 whitespace-nowrap font-mono text-[0.7rem] uppercase tracking-[0.18em]"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={
          reduce
            ? undefined
            : { duration: 36, ease: "linear", repeat: Infinity }
        }
      >
        {loop.map((item, i) => (
          <span key={`${item}-${i}`} className="inline-flex items-center gap-8">
            <span>{item}</span>
            <span className="text-ochre" aria-hidden>
              ◆
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
