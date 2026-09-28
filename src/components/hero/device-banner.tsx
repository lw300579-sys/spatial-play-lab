"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useDevice } from "@/hooks/use-device";
import { reduced, spring } from "@/lib/motion";

export function DeviceBanner() {
  const { isMobile } = useDevice();
  const reduce = useReducedMotion();

  const label = isMobile
    ? "Mobile mode: launch a live title; camera permission stays in that product"
    : "Desktop mode: open a live demo here or use a phone QR for camera titles";

  const chip = isMobile ? "MOBILE" : "DESKTOP";
  const chipColor = isMobile ? "bg-lawn" : "bg-ochre";

  return (
    <motion.div
      className="border-b-2 border-charcoal bg-paper-ink px-4 py-2.5"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reduce ? reduced : spring}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <span
          className={`inline-flex shrink-0 items-center border border-charcoal px-2 py-0.5 font-mono text-[0.65rem] font-bold tracking-wider ${chipColor}`}
        >
          {chip}
        </span>
        <p className="font-mono text-[0.7rem] leading-snug text-charcoal sm:text-xs">
          {label}
        </p>
      </div>
    </motion.div>
  );
}
