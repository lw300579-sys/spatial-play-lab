"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, reduced, spring, staggerContainer } from "@/lib/motion";
import { SITE } from "@/data/games";
import { StickerBoard } from "./sticker-board";
import { TactileLink } from "@/components/ui/tactile-button";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b-2 border-charcoal">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "visible"}
          className="flex flex-col gap-6"
        >
          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cobalt"
          >
            {SITE.name}
          </motion.p>

          <motion.h1
            variants={reduce ? undefined : fadeUp}
            className="font-display text-[clamp(2.4rem,6vw,4.25rem)] font-semibold leading-[1.05] tracking-tight text-balance text-charcoal"
          >
            Spatial play you can{" "}
            <span className="relative inline-block">
              <span className="relative z-10">feel</span>
              <span
                className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-ochre/80 sm:h-4"
                aria-hidden
              />
            </span>
            {" "}in the browser.
          </motion.h1>

          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="max-w-lg text-base leading-relaxed text-charcoal/80 sm:text-lg"
          >
            Mobile AR games, computer vision experiments, and physical computing
            apps—driven by real arms, hands, and bodies. No app store. Just a
            camera and curiosity.
          </motion.p>

          <motion.div
            variants={reduce ? undefined : fadeUp}
            className="flex flex-wrap gap-3"
          >
            <TactileLink href="#games" accent="coral">
              Explore games
            </TactileLink>
            <TactileLink href="#sandbox" variant="secondary">
              Peek the sandbox
            </TactileLink>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94, rotate: 1.5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={reduce ? reduced : spring}
          className="sticker sticker-coral bg-surface-raised p-2"
        >
          <StickerBoard />
        </motion.div>
      </div>
    </section>
  );
}
