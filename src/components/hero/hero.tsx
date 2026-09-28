"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, reduced, spring, staggerContainer } from "@/lib/motion";
import { SITE } from "@/data/games";
import { StickerBoard } from "./sticker-board";
import { AmbientCanvas } from "./ambient-canvas";
import { TactileLink } from "@/components/ui/tactile-button";
import { TrackedLink } from "@/components/ui/tracked-link";

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
          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cobalt"
          >
            Product Engineer · Applied Computer Vision
          </motion.p>

          <motion.h1
            variants={reduce ? undefined : fadeUp}
            className="font-display text-[clamp(2.75rem,7vw,5rem)] font-semibold leading-[1.02] tracking-tight text-balance text-charcoal"
          >
            {SITE.name}
          </motion.h1>

          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="max-w-xl font-display text-xl font-medium leading-snug text-charcoal/90 sm:text-2xl"
          >
            I build software that can{" "}
            <span className="relative inline-block">
              <span className="relative z-10 italic">understand movement</span>
              <motion.span
                className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-ochre/85 sm:bottom-1.5 sm:h-4"
                aria-hidden
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={reduce ? reduced : { ...spring, delay: 0.35 }}
                style={{ originX: 0 }}
              />
            </span>
            —then answer with game feel, coaching, or evidence.
          </motion.p>

          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="max-w-lg text-base leading-relaxed text-charcoal/80 sm:text-lg"
          >
            My work sits where computer vision, game systems, and product design
            meet. The strongest examples are a browser fitness product, a
            camera-controlled baseball game, and a sports-intelligence platform
            built from ordinary match video.
          </motion.p>

          <motion.div
            variants={reduce ? undefined : fadeUp}
            className="flex flex-wrap gap-3"
          >
            <TactileLink href="#flagships" accent="coral">
              See selected work
            </TactileLink>
            <TactileLink href="#contact" variant="secondary">
              Work with me
            </TactileLink>
            <TrackedLink
              href="/ari-swerdlow-resume.pdf"
              download
              eventName="resume_download"
              eventTarget="hero"
              className="tactile-press tactile-lift inline-flex items-center justify-center border-2 border-charcoal bg-surface-raised px-4 py-2.5 text-sm font-semibold text-charcoal no-underline sticker-sm"
            >
              Download résumé ↓
            </TrackedLink>
          </motion.div>

          <motion.dl
            variants={reduce ? undefined : fadeUp}
            className="grid max-w-xl grid-cols-2 border-2 border-charcoal bg-paper/85 sm:grid-cols-4"
          >
            {[
              ["3", "flagship systems"],
              ["250k", "baseball sims"],
              ["695", "coach tests"],
              ["5", "camera products"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="border-b border-r border-charcoal/20 px-3 py-2 last:border-r-0 sm:border-b-0"
              >
                <dt className="font-mono text-[0.65rem] uppercase tracking-wide text-muted">
                  {label}
                </dt>
                <dd className="font-display text-xl font-semibold text-charcoal">{value}</dd>
              </div>
            ))}
          </motion.dl>

          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="max-w-xl font-mono text-[0.62rem] leading-relaxed text-muted"
          >
            Engineering validation as of 2026-09-26. Simulation and test counts
            measure system rigor—not user outcomes. <a href="/evidence" className="text-cobalt underline">See methods and open gaps.</a>
          </motion.p>

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
            Drag me
          </div>
          <StickerBoard />
        </motion.div>
      </div>
    </section>
  );
}
