"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { forwardRef } from "react";
import { reduced, spring } from "@/lib/motion";

type ButtonVariant = "primary" | "secondary" | "ghost" | "accent";
type Accent = "coral" | "cobalt" | "lawn" | "ochre" | "charcoal";

const accentBg: Record<Accent, string> = {
  coral: "bg-coral text-white",
  cobalt: "bg-cobalt text-white",
  lawn: "bg-lawn text-charcoal",
  ochre: "bg-ochre text-charcoal",
  charcoal: "bg-charcoal text-paper",
};

interface TactileButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  accent?: Accent;
  fullWidth?: boolean;
}

export const TactileButton = forwardRef<HTMLButtonElement, TactileButtonProps>(function TactileButton({
  children,
  className = "",
  variant = "primary",
  accent = "charcoal",
  fullWidth,
  disabled,
  ...props
}: TactileButtonProps, ref) {
  const reduce = useReducedMotion();

  const base =
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 font-sans text-sm font-semibold tracking-tight border-2 border-charcoal sticker-sm select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<ButtonVariant, string> = {
    primary: accentBg[accent],
    secondary: "bg-surface-raised text-charcoal",
    ghost: "bg-transparent border-transparent shadow-none",
    accent: accentBg[accent],
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      disabled={disabled}
      className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      whileHover={
        reduce || disabled ? undefined : { y: -3, transition: spring }
      }
      whileTap={
        reduce || disabled ? undefined : { scale: 0.96, transition: spring }
      }
      transition={reduce ? reduced : spring}
      {...props}
    >
      {children}
    </motion.button>
  );
});

interface TactileLinkProps extends HTMLMotionProps<"a"> {
  variant?: ButtonVariant;
  accent?: Accent;
  fullWidth?: boolean;
}

export function TactileLink({
  children,
  className = "",
  variant = "primary",
  accent = "charcoal",
  fullWidth,
  ...props
}: TactileLinkProps) {
  const reduce = useReducedMotion();

  const base =
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 font-sans text-sm font-semibold tracking-tight border-2 border-charcoal sticker-sm select-none cursor-pointer no-underline";

  const variants: Record<ButtonVariant, string> = {
    primary: accentBg[accent],
    secondary: "bg-surface-raised text-charcoal",
    ghost: "bg-transparent border-transparent shadow-none",
    accent: accentBg[accent],
  };

  return (
    <motion.a
      className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      whileHover={reduce ? undefined : { y: -3, transition: spring }}
      whileTap={reduce ? undefined : { scale: 0.96, transition: spring }}
      transition={reduce ? reduced : spring}
      {...props}
    >
      {children}
    </motion.a>
  );
}
