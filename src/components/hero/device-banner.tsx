"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useDevice } from "@/hooks/use-device";
import { reduced, spring } from "@/lib/motion";

export function DeviceBanner() {
  const { isMobile, isDesktop, ready } = useDevice();
  const reduce = useReducedMotion();

  if (!ready) {
    return (
      <div className="border-b-2 border-charcoal bg-paper-ink px-4 py-2.5">
        <p className="font-mono text-[0.7rem] text-muted">Detecting device…</p>
      </div>
    );
  }

  const label = isMobile
    ? "Ready for direct browser camera play"
    : "QR scanner mode activated — scan from desktop to play on phone";

  const chip = isMobile ? "MOBILE" : isDesktop ? "DESKTOP" : "DEVICE";
  const chipColor = isMobile ? "bg-lawn" : "bg-ochre";

  return (
    <motion.div
      className="sticky top-0 z-50 border-b-2 border-charcoal bg-paper-ink/95 px-4 py-2.5 backdrop-blur-sm"
      initial={reduce ? false : { y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={reduce ? reduced : spring}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <span
          className={`inline-flex shrink-0 items-center border-1.5 border-charcoal px-2 py-0.5 font-mono text-[0.65rem] font-bold tracking-wider ${chipColor} border`}
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
