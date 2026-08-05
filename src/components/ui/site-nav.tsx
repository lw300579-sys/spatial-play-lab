"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SITE } from "@/data/games";
import { spring } from "@/lib/motion";

const LINKS = [
  { href: "#games", label: "Games" },
  { href: "#sandbox", label: "Sandbox" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteNav() {
  const reduce = useReducedMotion();

  return (
    <motion.header
      className="sticky top-0 z-50 border-b-2 border-charcoal bg-paper/90 backdrop-blur-md"
      initial={reduce ? false : { y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={spring}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a
          href="#top"
          className="group flex items-center gap-2.5 no-underline"
          aria-label={`${SITE.name} — back to top`}
        >
          <span
            className="flex h-8 w-8 items-center justify-center border-2 border-charcoal bg-coral text-sm font-bold text-white sticker-sm transition-transform group-hover:-rotate-6"
            aria-hidden
          >
            SP
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-charcoal">
            {SITE.name}
          </span>
        </a>

        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-2.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-charcoal/70 no-underline transition-colors hover:bg-paper-ink hover:text-charcoal sm:px-3 sm:text-xs"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
