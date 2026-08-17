"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { PortfolioProject } from "@/data/games";
import { useDevice } from "@/hooks/use-device";
import { reduced, spring } from "@/lib/motion";
import { StickerCard } from "@/components/ui/sticker-card";
import { MediaFrame } from "@/components/ui/media-frame";
import { TactileButton, TactileLink } from "@/components/ui/tactile-button";
import { QrModal } from "@/components/qr-modal/qr-modal";

const tilts = [-1.2, 0.8, -0.6, 1.1, -0.9];

interface GameCardProps {
  project: PortfolioProject;
  index: number;
}

export function GameCard({ project, index }: GameCardProps) {
  const { isMobile, ready } = useDevice();
  const reduce = useReducedMotion();
  const [qrOpen, setQrOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const hasLive = Boolean(project.liveUrl);
  const isCaseStudy = project.placement === "case-study" || !hasLive;
  const isLinkLaunch = project.launchMode === "link";
  const n = String(index + 1).padStart(2, "0");

  return (
    <>
      <StickerCard
        accent={project.accent}
        tilt={tilts[index % tilts.length]}
        className="flex h-full flex-col bg-surface-raised"
      >
        <MediaFrame
          src={project.preview.src}
          alt={project.preview.alt}
          aspectRatio={project.preview.aspectRatio}
          accent={project.accent}
          priority={index < 2}
          label={
            <>
              <span className="spec-badge bg-paper/95">{n}</span>
              {project.status === "live" ? (
                <span className="spec-badge bg-lawn">LIVE</span>
              ) : (
                <span className="spec-badge bg-paper">CASE STUDY</span>
              )}
            </>
          }
        />

        <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
          <div>
            <div className="mb-1 flex flex-wrap items-baseline gap-2">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-charcoal">
                {project.glyph ? (
                  <span className="mr-2" aria-hidden>
                    {project.glyph}
                  </span>
                ) : null}
                {project.title}
              </h3>
              {project.year ? (
                <span className="font-mono text-[0.65rem] text-muted">
                  {project.year}
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/80 sm:text-[0.95rem]">
              {project.narrative}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.techSpecs.map((spec) => (
              <span key={spec} className="spec-badge">
                {spec}
              </span>
            ))}
          </div>

          <p className="font-mono text-[0.65rem] leading-relaxed text-muted">
            {project.requirements}
          </p>

          <div className="mt-auto flex flex-col gap-2 pt-1 sm:flex-row sm:flex-wrap">
            {isCaseStudy ? (
              <TactileButton
                accent="cobalt"
                onClick={() => setGalleryOpen(true)}
                className="flex-1"
              >
                View Case Study
              </TactileButton>
            ) : isLinkLaunch && project.liveUrl ? (
              <TactileLink
                href={project.liveUrl}
                accent={project.accent}
                className="flex-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open game
              </TactileLink>
            ) : ready && isMobile && project.liveUrl ? (
              <TactileLink
                href={project.liveUrl}
                accent={project.accent}
                className="flex-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tap to Launch Game
              </TactileLink>
            ) : (
              <TactileButton
                accent={project.accent}
                onClick={() => setQrOpen(true)}
                className="flex-1"
              >
                Scan QR to Play
              </TactileButton>
            )}

            <TactileButton
              variant="secondary"
              onClick={() => setDrawerOpen((v) => !v)}
              className="flex-1"
              aria-expanded={drawerOpen}
            >
              {drawerOpen ? "Hide breakdown" : "Open breakdown"}
            </TactileButton>
          </div>

          <AnimatePresence initial={false}>
            {drawerOpen ? (
              <motion.div
                key="drawer"
                initial={reduce ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={reduce ? undefined : { height: 0, opacity: 0 }}
                transition={reduce ? reduced : spring}
                className="overflow-hidden"
              >
                <div className="space-y-4 border-t-2 border-charcoal/15 pt-4">
                  <div>
                    <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-widest text-cobalt">
                      How it works
                    </p>
                    <p className="text-sm leading-relaxed text-charcoal/85">
                      {project.spatialMechanics}
                    </p>
                  </div>
                  <div>
                    <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-widest text-coral">
                      Technical challenges
                    </p>
                    <ul className="space-y-1.5">
                      {project.challenges.map((c) => (
                        <li
                          key={c}
                          className="flex gap-2 text-sm leading-snug text-charcoal/85"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-charcoal" aria-hidden />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="font-mono text-[0.65rem] leading-relaxed text-muted">
                    {project.launchMode === "camera"
                      ? "Target: 60fps on mobile · on-device inference · lighting-adaptive camera pipeline"
                      : "Target: readable timing · short sessions · no camera required"}
                  </p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </StickerCard>

      {project.liveUrl && project.launchMode === "camera" ? (
        <QrModal
          open={qrOpen}
          onClose={() => setQrOpen(false)}
          url={project.liveUrl}
          title={project.title}
        />
      ) : null}

      <CaseStudyGallery
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        project={project}
      />
    </>
  );
}

function CaseStudyGallery({
  open,
  onClose,
  project,
}: {
  open: boolean;
  onClose: () => void;
  project: PortfolioProject;
}) {
  const reduce = useReducedMotion();
  const gallery = project.caseStudyGallery ?? [project.preview];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close case study"
            className="absolute inset-0 bg-charcoal/55 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal
            aria-labelledby={`case-${project.id}`}
            className="sticker sticker-lg relative z-10 max-h-[90dvh] w-full max-w-3xl overflow-y-auto bg-paper p-6 sm:p-8"
            initial={reduce ? false : { y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { y: 24, opacity: 0 }}
            transition={reduce ? reduced : spring}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">
                  Deep dive · {project.year}
                </p>
                <h2
                  id={`case-${project.id}`}
                  className="font-display text-2xl font-semibold sm:text-3xl"
                >
                  {project.glyph} {project.title}
                </h2>
              </div>
              <TactileButton
                variant="secondary"
                className="!px-3 !py-1.5"
                onClick={onClose}
              >
                ✕
              </TactileButton>
            </div>

            <p className="mb-4 text-sm leading-relaxed text-charcoal/85 sm:text-base">
              {project.spatialMechanics}
            </p>

            <div className="mb-6">
              <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-widest text-coral">
                Technical challenges
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {project.challenges.map((c) => (
                  <li
                    key={c}
                    className="border border-charcoal/20 bg-paper-ink p-3 text-sm leading-snug"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-3 flex flex-wrap gap-1.5">
              {project.techSpecs.map((s) => (
                <span key={s} className="spec-badge">
                  {s}
                </span>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {gallery.map((img) => (
                <figure key={img.src + img.alt} className="space-y-2">
                  <div
                    className="relative w-full overflow-hidden border-2 border-charcoal bg-paper-ink"
                    style={{ aspectRatio: img.aspectRatio }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                  {"caption" in img && img.caption ? (
                    <figcaption className="font-mono text-[0.65rem] text-muted">
                      {img.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
