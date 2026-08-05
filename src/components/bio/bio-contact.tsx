"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SITE } from "@/data/games";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { fadeUp, reduced, springSnappy, staggerContainer } from "@/lib/motion";
import { TactileButton, TactileLink } from "@/components/ui/tactile-button";

export function BioContact() {
  const reduce = useReducedMotion();
  const { copied, copy } = useCopyToClipboard();

  return (
    <section id="contact" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={{ once: true, margin: "-60px" }}
          className="sticker sticker-cobalt grid gap-8 bg-surface-raised p-6 sm:grid-cols-[1.2fr_0.8fr] sm:p-10"
        >
          <div>
            <motion.p
              variants={reduce ? undefined : fadeUp}
              className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cobalt"
            >
              Human bio
            </motion.p>
            <motion.h2
              variants={reduce ? undefined : fadeUp}
              className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Code meeting muscle memory.
            </motion.h2>
            <motion.p
              variants={reduce ? undefined : fadeUp}
              className="mt-4 max-w-lg text-base leading-relaxed text-charcoal/85"
            >
              I build interactive systems where human movement is the input
              device—browser AR tennis, on-device boxing engines, ASL trainers,
              and broadcast sports analytics. The craft lives at the intersection
              of computer vision, game feel, and accessible web tech.
            </motion.p>

            <motion.div
              variants={reduce ? undefined : fadeUp}
              className="mt-6 inline-flex items-center gap-2 border-2 border-charcoal bg-paper-ink px-3 py-2"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lawn opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lawn border border-charcoal" />
              </span>
              <div>
                <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">
                  Current focus
                </p>
                <p className="text-sm font-medium text-charcoal">
                  {SITE.currentFocus}
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={reduce ? undefined : fadeUp}
            className="flex flex-col justify-center gap-3"
          >
            <TactileButton
              accent="coral"
              fullWidth
              onClick={() => copy(SITE.email)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="ok"
                    initial={reduce ? false : { scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={reduce ? reduced : springSnappy}
                  >
                    ✓ Email copied
                  </motion.span>
                ) : (
                  <motion.span key="mail">{SITE.email}</motion.span>
                )}
              </AnimatePresence>
            </TactileButton>

            {SITE.socials.map((s) => (
              <TactileLink
                key={s.label}
                href={s.href}
                variant="secondary"
                fullWidth
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label}
              </TactileLink>
            ))}
          </motion.div>
        </motion.div>

        <p className="mt-10 text-center font-mono text-[0.65rem] text-muted">
          Built with Next.js · Framer Motion · tactile paper · {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}
