"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, reduced, spring, staggerContainer } from "@/lib/motion";

const PRINCIPLES = [
  {
    title: "On-device first",
    body: "Pose, hands, and velocity stay on the silicon in your pocket. Privacy isn’t a marketing line—it’s the architecture.",
    tag: "Privacy · latency",
  },
  {
    title: "Frame budget is sacred",
    body: "Every filter, particle, and assist has to earn its milliseconds. Target: playable 60fps on mid-range mobile chips.",
    tag: "60fps · mobile SoC",
  },
  {
    title: "Invisible assist > fake footwork",
    body: "Map natural timing and intent—early pull, late drive—instead of demanding perfect physical positioning in a bedroom.",
    tag: "Game feel",
  },
  {
    title: "No install tax",
    body: "If it needs an app store, it’s already lost half the session. Browser camera + WebGL is the distribution strategy.",
    tag: "WebXR handoff",
  },
] as const;

export function Principles() {
  const reduce = useReducedMotion();

  return (
    <section
      id="craft"
      className="border-b-2 border-charcoal bg-paper-ink/40 px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={{ once: true, margin: "-60px" }}
          className="mb-8"
        >
          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cobalt"
          >
            Craft principles
          </motion.p>
          <motion.h2
            variants={reduce ? undefined : fadeUp}
            className="mt-2 max-w-xl font-display text-3xl font-semibold tracking-tight"
          >
            How these systems get built.
          </motion.h2>
        </motion.div>

        <div className="grid gap-px border-2 border-charcoal bg-charcoal sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <motion.article
              key={p.title}
              className="bg-paper p-6 sm:p-7"
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={reduce ? reduced : { ...spring, delay: i * 0.05 }}
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">
                {p.tag}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/80">
                {p.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
