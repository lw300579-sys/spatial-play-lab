"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { caseStudies } from "@/data/games";
import { fadeUp, reduced, spring, staggerContainer } from "@/lib/motion";
import { TactileButton, TactileLink } from "@/components/ui/tactile-button";

export function FeaturedCaseStudy() {
  const reduce = useReducedMotion();
  const project = caseStudies[0];
  const [open, setOpen] = useState(false);

  if (!project) return null;

  return (
    <section
      id="citadel"
      className="border-b-2 border-charcoal px-4 py-16 sm:px-6 sm:py-24"
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
            Deep dive · case study
          </motion.p>
          <motion.h2
            variants={reduce ? undefined : fadeUp}
            className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {project.title}
          </motion.h2>
          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="mt-3 max-w-2xl text-base leading-relaxed text-charcoal/80"
          >
            {project.narrative}
          </motion.p>
        </motion.div>

        <motion.div
          className="sticker sticker-cobalt overflow-hidden bg-charcoal"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reduce ? reduced : spring}
        >
          <div
            className="relative w-full bg-[#020617]"
            style={{ aspectRatio: project.preview.aspectRatio }}
          >
            {/* unoptimized: skip Next.js recompress/AVIF — dashboard text stays crisp */}
            <Image
              src={project.preview.src}
              alt={project.preview.alt}
              fill
              unoptimized
              priority
              className="object-contain object-center"
              sizes="100vw"
            />
          </div>

          <div className="border-t-2 border-charcoal bg-paper p-6 sm:p-8">
            <div className="max-w-4xl">
              <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-widest text-cobalt">
                The problem I wanted to solve
              </p>
              <p className="whitespace-pre-line text-sm leading-relaxed text-charcoal/85 sm:text-base">
                {project.spatialMechanics}
              </p>
            </div>

            <div className="mt-8">
              <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-widest text-cobalt">
                How it works, step by step
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                {project.caseStudySections?.map((section) => (
                  <article
                    key={section.step}
                    className="border border-charcoal/20 bg-paper-ink p-4"
                  >
                    <span className="font-mono text-[0.65rem] font-bold text-cobalt">
                      {section.step}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-semibold tracking-tight">
                      {section.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/80">
                      {section.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <div>
                <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-widest text-coral">
                  Questions it can answer
                </p>
                <ul className="space-y-2">
                  {project.caseStudyQuestions?.map((question) => (
                    <li
                      key={question}
                      className="flex gap-3 border border-charcoal/20 bg-paper-ink px-3 py-2.5 text-sm leading-snug"
                    >
                      <span aria-hidden className="font-mono font-bold text-coral">→</span>
                      <span>{question}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-widest text-cobalt">
                  What the technical pieces actually do
                </p>
                <dl className="space-y-2">
                  {project.techDetails?.map((item) => (
                    <div
                      key={item.label}
                      className="border border-charcoal/20 bg-paper-ink px-3 py-2.5"
                    >
                      <dt className="font-display text-sm font-semibold">{item.label}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-charcoal/75">
                        {item.explanation}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="mt-8 border-t border-charcoal/20 pt-7">
              <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-widest text-coral">
                The hard engineering problems
              </p>
              <ul className="grid gap-2 md:grid-cols-2">
                {project.challenges.map((challenge) => (
                  <li
                    key={challenge}
                    className="border border-charcoal/20 bg-paper-ink px-3 py-2.5 text-sm leading-relaxed"
                  >
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <TactileButton accent="cobalt" onClick={() => setOpen(true)}>
                Explore the analysis workspace
              </TactileButton>
              <a
                href={project.preview.src}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.7rem] text-cobalt underline-offset-2 hover:underline"
              >
                Open full-resolution capture ↗
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center">
          <button
            type="button"
            className="absolute inset-0 bg-charcoal/60"
            aria-label="Close gallery"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal
            className="sticker sticker-lg relative z-10 max-h-[90dvh] w-full max-w-4xl overflow-y-auto bg-paper p-6"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <h3 className="font-display text-xl font-semibold">
                {project.title} · gallery
              </h3>
              <div className="flex gap-2">
                <TactileLink
                  href={project.preview.src}
                  variant="secondary"
                  className="!px-3 !py-1.5 text-xs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open full resolution
                </TactileLink>
                <TactileButton
                  variant="secondary"
                  className="!px-3 !py-1.5"
                  onClick={() => setOpen(false)}
                >
                  ✕
                </TactileButton>
              </div>
            </div>
            <div className="grid gap-4">
              {(project.caseStudyGallery ?? [project.preview]).map((img) => (
                <figure key={img.src + img.alt}>
                  <div
                    className="relative w-full overflow-hidden border-2 border-charcoal bg-[#020617]"
                    style={{ aspectRatio: img.aspectRatio }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      unoptimized
                      className="object-contain"
                      sizes="100vw"
                    />
                  </div>
                  {"caption" in img && img.caption ? (
                    <figcaption className="mt-2 font-mono text-[0.65rem] text-muted">
                      {img.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
