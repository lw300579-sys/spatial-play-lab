"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, reduced, spring, staggerContainer } from "@/lib/motion";
import { SITE } from "@/data/games";
import { StickerBoard } from "./sticker-board";
import { AmbientCanvas } from "./ambient-canvas";
import { TactileLink } from "@/components/ui/tactile-button";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b-2 border-charcoal"
    >
      <AmbientCanvas />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14">
        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "visible"}
          className="flex flex-col gap-6"
        >
          <motion.div
            variants={reduce ? undefined : fadeUp}
            className="inline-flex w-fit items-center gap-2 border-2 border-charcoal bg-paper px-3 py-1.5 sticker-sm"
          >
            <span className="h-2 w-2 rounded-full bg-lawn" aria-hidden />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-charcoal">
              {SITE.tagline}
            </span>
          </motion.div>

          <motion.h1
            variants={reduce ? undefined : fadeUp}
            className="font-display text-[clamp(2.5rem,6.5vw,4.5rem)] font-semibold leading-[1.02] tracking-tight text-balance text-charcoal"
          >
            Spatial play you can{" "}
            <span className="relative inline-block">
              <span className="relative z-10 italic">feel</span>
              <motion.span
                className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-ochre/85 sm:bottom-1.5 sm:h-4"
                aria-hidden
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={reduce ? reduced : { ...spring, delay: 0.35 }}
                style={{ originX: 0 }}
              />
            </span>{" "}
            in the browser.
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

          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="font-mono text-[0.65rem] uppercase tracking-widest text-muted"
          >
            Drag the tokens → throw · stack · play
          </motion.p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94, rotate: 1.5 }}
          animate={{ opacity: 1, scale: 1, rotate: -0.5 }}
          transition={reduce ? reduced : spring}
          className="sticker sticker-coral relative bg-surface-raised p-2"
        >
          <div className="absolute -right-3 -top-3 z-20 rotate-6 border-2 border-charcoal bg-ochre px-2 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-wide sticker-sm">
            Interactive
          </div>
          <StickerBoard />
        </motion.div>
      </div>
    </section>
  );
}
