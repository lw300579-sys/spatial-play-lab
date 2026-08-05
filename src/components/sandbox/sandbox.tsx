"use client";

import { motion, useReducedMotion } from "framer-motion";
import { sandboxProjects, type AccentTone } from "@/data/games";
import { fadeUp, reduced, spring, staggerContainer } from "@/lib/motion";
import { TactileLink } from "@/components/ui/tactile-button";

const accentBorder: Record<AccentTone, string> = {
  coral: "border-l-coral",
  cobalt: "border-l-cobalt",
  lawn: "border-l-lawn",
  ochre: "border-l-ochre",
};

export function Sandbox() {
  const reduce = useReducedMotion();

  return (
    <section id="sandbox" className="border-b-2 border-charcoal px-4 py-16 sm:px-6 sm:py-20">
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
            className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ochre"
          >
            The Sandbox · in the lab
          </motion.p>
          <motion.h2
            variants={reduce ? undefined : fadeUp}
            className="mt-2 font-display text-3xl font-semibold tracking-tight"
          >
            Raw experiments & prototypes.
          </motion.h2>
          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="mt-2 max-w-xl text-sm leading-relaxed text-charcoal/80"
          >
            Unreleased mini-prototypes, webcam tests, shader experiments, and
            physics notes—craftsman energy, not polished product.
          </motion.p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sandboxProjects.map((item, i) => (
            <motion.article
              key={item.id}
              className={`sticker sticker-sm flex flex-col overflow-hidden border-l-4 bg-surface-raised p-0 ${accentBorder[item.accent]}`}
              style={{ rotate: i % 2 === 0 ? -0.5 : 0.7 }}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reduce ? reduced : { ...spring, delay: i * 0.06 }}
              whileHover={reduce ? undefined : { y: -3, rotate: 0 }}
            >
              {item.preview ? (
                <div className="relative aspect-[16/10] w-full border-b-2 border-charcoal bg-paper-ink">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.preview}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-xl font-semibold tracking-tight">
                {item.glyph ? (
                  <span className="mr-1.5" aria-hidden>
                    {item.glyph}
                  </span>
                ) : null}
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/80">
                {item.blurb}
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {item.techSpecs.map((s) => (
                  <span key={s} className="spec-badge">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.liveUrl ? (
                  <TactileLink
                    href={item.liveUrl}
                    accent={item.accent}
                    className="!px-3 !py-1.5 text-xs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open prototype
                  </TactileLink>
                ) : (
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
                    Internal note
                  </span>
                )}
                {item.extraUrls?.map((u) => (
                  <TactileLink
                    key={u.url}
                    href={u.url}
                    variant="secondary"
                    className="!px-3 !py-1.5 text-xs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {u.label}
                  </TactileLink>
                ))}
              </div>
              </div>
            </motion.article>
          ))}

          <motion.article
            className="sticker sticker-sm flex flex-col justify-between border-dashed bg-paper-ink p-5"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reduce ? reduced : spring}
          >
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">
                Lab note
              </p>
              <p className="mt-2 font-display text-lg font-medium leading-snug">
                Frame budget is sacred. Every particle, every filter—earn its
                milliseconds.
              </p>
            </div>
            <p className="mt-4 font-mono text-[0.65rem] text-muted">
              — ongoing research log
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
