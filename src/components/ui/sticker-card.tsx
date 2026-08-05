"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { reduced, spring } from "@/lib/motion";
import type { AccentTone } from "@/data/games";

const shadowClass: Record<AccentTone | "default", string> = {
  default: "",
  coral: "sticker-coral",
  cobalt: "sticker-cobalt",
  lawn: "sticker-lawn",
  ochre: "sticker-ochre",
};

interface StickerCardProps {
  children: ReactNode;
  className?: string;
  accent?: AccentTone | "default";
  tilt?: number;
  hoverTilt?: boolean;
}

export function StickerCard({
  children,
  className = "",
  accent = "default",
  tilt = 0,
  hoverTilt = true,
}: StickerCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`sticker overflow-hidden ${shadowClass[accent]} ${className}`}
      style={{ rotate: tilt }}
      whileHover={
        reduce || !hoverTilt
          ? undefined
          : {
              rotate: tilt === 0 ? 0.8 : tilt * 1.4,
              y: -3,
              transition: spring,
            }
      }
      transition={reduce ? reduced : spring}
    >
      {children}
    </motion.div>
  );
}
