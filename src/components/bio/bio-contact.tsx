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
          className="sticker sticker-cobalt grid gap-8 bg-surface-raised p-6 sm:grid-cols-[1.25fr_0.75fr] sm:p-10"
        >
          <div>
            <motion.p
              variants={reduce ? undefined : fadeUp}
              className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cobalt"
            >
              About
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
              Hi, I&apos;m Ari Swerdlow. I build interactive systems where
              movement is the input device: browser AR tennis, on-device boxing
              engines, ASL trainers checked by hand landmarks, pickleball
              coaching from court video, and broadcast sports analytics that
              never asks an athlete to wear a sensor.
            </motion.p>
            <motion.p
              variants={reduce ? undefined : fadeUp}
              className="mt-3 max-w-lg text-base leading-relaxed text-charcoal/85"
            >
              The craft sits between computer vision, game feel, and accessible
              web tech. I care about mid-range phones, honest frame budgets, and
              sessions that start from a URL. I&apos;m available for product
              engineering and applied computer vision work—especially when the
              input is physical, noisy, and difficult to make trustworthy.
            </motion.p>

            <motion.div
              variants={reduce ? undefined : fadeUp}
              className="mt-6"
            >
              <div className="inline-flex items-center gap-2 border-2 border-charcoal bg-paper-ink px-3 py-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lawn opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-charcoal bg-lawn" />
                </span>
                <div>
                  <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">
                    Current focus
                  </p>
                  <p className="text-sm font-medium text-charcoal">
                    {SITE.currentFocus}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={reduce ? undefined : fadeUp}
            className="flex flex-col justify-center gap-3"
          >
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">
              Direct contact
            </p>
            <TactileButton
              accent="coral"
              fullWidth
              onClick={() => copy(SITE.email)}
              aria-label={`Copy email ${SITE.email}`}
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
                {s.label === "X" ? "X / Twitter" : s.label}
              </TactileLink>
            ))}
          </motion.div>
        </motion.div>

        <footer className="mt-12 flex flex-col items-center gap-3 border-t-2 border-charcoal/10 pt-8 text-center">
          <p className="font-display text-lg font-semibold tracking-tight">
            {SITE.name}
          </p>
          <p className="font-mono text-[0.65rem] text-muted">
            {SITE.tagline} · {new Date().getFullYear()}
          </p>
          <a
            href="#top"
            className="font-mono text-[0.7rem] uppercase tracking-wider text-cobalt no-underline hover:underline"
          >
            ↑ Back to top
          </a>
        </footer>
      </div>
    </section>
  );
}
