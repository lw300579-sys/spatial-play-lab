"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import type { AccentTone } from "@/data/games";

const scanColor: Record<AccentTone, string> = {
  coral: "via-coral/40",
  cobalt: "via-cobalt/40",
  lawn: "via-lawn/50",
  ochre: "via-ochre/50",
};

interface MediaFrameProps {
  src: string;
  alt: string;
  aspectRatio: string;
  accent: AccentTone;
  priority?: boolean;
  label?: ReactNode;
}

export function MediaFrame({
  src,
  alt,
  aspectRatio,
  accent,
  priority,
  label,
}: MediaFrameProps) {
  const reduce = useReducedMotion();

  return (
    <div
      className="group relative w-full overflow-hidden border-b-2 border-charcoal bg-paper-ink"
      style={{ aspectRatio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
      />

      {!reduce ? (
        <motion.div
          className={`pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent ${scanColor[accent]} to-transparent opacity-0 group-hover:opacity-100`}
          initial={false}
          animate={{ top: ["-20%", "120%"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
          aria-hidden
        />
      ) : null}

      <span
        className="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-charcoal mix-blend-difference"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute right-2 top-2 h-4 w-4 border-r-2 border-t-2 border-charcoal mix-blend-difference"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-charcoal mix-blend-difference"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-charcoal mix-blend-difference"
        aria-hidden
      />

      {label ? (
        <div className="absolute left-3 top-3 z-10 flex gap-1.5">{label}</div>
      ) : null}
    </div>
  );
}
