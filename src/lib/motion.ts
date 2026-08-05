import type { Transition, Variants } from "framer-motion";

/** Organic, bouncy physical feedback — shared spring across the site */
export const spring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 15,
};

export const springSoft: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 22,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 18,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: spring },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: springSoft },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: spring },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

/** Instant/no-op transitions when prefers-reduced-motion is on */
export const reduced: Transition = {
  duration: 0,
};
