"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, reduced, spring, staggerContainer } from "@/lib/motion";

const STEPS = [
  {
    n: "01",
    title: "Scan or tap",
    body: "On desktop, each live title opens a QR handoff so your phone becomes the play surface. On mobile, Launch goes straight into the browser session. No App Store, no install tax, no waiting for a binary to download before the first swing.",
    accent: "bg-coral",
  },
  {
    n: "02",
    title: "Allow the camera",
    body: "Pose and hand models run locally on the phone. The camera feed is input for landmarks and velocity, not a livestream to a server by default. Gameplay state may sync when a mode needs it; the pixels that identify your room stay on-device.",
    accent: "bg-ochre",
  },
  {
    n: "03",
    title: "Move to play",
    body: "Swings, punches, and signs become the controller. Filters, hitboxes, and invisible assists turn noisy MediaPipe landmarks into readable game feel: early contact tends cross-court, late contact goes down the line, hesitation changes difficulty instead of pretending the model is perfect.",
    accent: "bg-lawn",
  },
] as const;

export function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section
      id="how"
      className="border-b-2 border-charcoal px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={{ once: true, margin: "-60px" }}
          className="mb-8 max-w-2xl"
        >
          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted"
          >
            Play loop
          </motion.p>
          <motion.h2
            variants={reduce ? undefined : fadeUp}
            className="mt-2 font-display text-3xl font-semibold tracking-tight"
          >
            From a link to living input.
          </motion.h2>
          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="mt-3 text-base leading-relaxed text-charcoal/80"
          >
            The portfolio is built around the same loop as the products: get
            someone into a camera session fast, keep inference on their silicon,
            and spend the engineering budget on how movement feels once the
            landmarks arrive.
          </motion.p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.article
              key={step.n}
              className="sticker sticker-sm relative bg-surface-raised p-5"
              style={{ rotate: i === 1 ? 0.8 : i === 2 ? -0.6 : -0.3 }}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reduce ? reduced : { ...spring, delay: i * 0.06 }}
            >
              <span
                className={`mb-4 inline-flex border-2 border-charcoal px-2 py-0.5 font-mono text-[0.65rem] font-bold ${step.accent}`}
              >
                {step.n}
              </span>
              <h3 className="font-display text-xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/80">
                {step.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
