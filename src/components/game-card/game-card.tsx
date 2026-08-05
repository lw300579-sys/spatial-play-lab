"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { PortfolioProject } from "@/data/games";
import { useDevice } from "@/hooks/use-device";
import { reduced, spring } from "@/lib/motion";
import { StickerCard } from "@/components/ui/sticker-card";
import { TactileButton, TactileLink } from "@/components/ui/tactile-button";
import { QrModal } from "@/components/qr-modal/qr-modal";

const tilts = [-1.2, 0.8, -0.6, 1.1];

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

  return (
    <>
      <StickerCard
        accent={project.accent}
        tilt={tilts[index % tilts.length]}
        className="flex h-full flex-col bg-surface-raised"
      >
        <div
          className="relative w-full overflow-hidden border-b-2 border-charcoal bg-paper-ink"
          style={{ aspectRatio: project.preview.aspectRatio }}
        >
          <Image
            src={project.preview.src}
            alt={project.preview.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index < 2}
          />
          <div className="absolute left-3 top-3 flex gap-1.5">
            {project.status === "live" ? (
              <span className="spec-badge bg-lawn">LIVE</span>
            ) : (
              <span className="spec-badge bg-paper">CASE STUDY</span>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-charcoal">
              {project.glyph ? (
                <span className="mr-2" aria-hidden>
                  {project.glyph}
                </span>
              ) : null}
              {project.title}
            </h3>
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

          <div className="mt-auto flex flex-col gap-2 pt-2 sm:flex-row sm:flex-wrap">
            {isCaseStudy ? (
              <TactileButton
                accent="cobalt"
                onClick={() => setGalleryOpen(true)}
                className="flex-1"
              >
                View Case Study
              </TactileButton>
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
              {drawerOpen ? "Hide Breakdown" : "Spatial Breakdown"}
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
                <div className="border-t-2 border-charcoal/15 pt-4">
                  <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-widest text-cobalt">
                    Spatial mechanics
                  </p>
                  <p className="text-sm leading-relaxed text-charcoal/85">
                    {project.spatialMechanics}
                  </p>
                  <p className="mt-3 font-mono text-[0.65rem] leading-relaxed text-muted">
                    Target: 60fps on mobile · on-device inference · lighting-adaptive
                    camera pipeline
                  </p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </StickerCard>

      {project.liveUrl ? (
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
            className="absolute inset-0 bg-charcoal/50"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal
            aria-labelledby={`case-${project.id}`}
            className="sticker sticker-lg relative z-10 max-h-[90dvh] w-full max-w-3xl overflow-y-auto bg-paper p-6"
            initial={reduce ? false : { y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { y: 24, opacity: 0 }}
            transition={reduce ? reduced : spring}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">
                  Deep dive
                </p>
                <h2
                  id={`case-${project.id}`}
                  className="font-display text-2xl font-semibold"
                >
                  {project.title}
                </h2>
              </div>
              <TactileButton variant="secondary" className="!px-3 !py-1.5" onClick={onClose}>
                ✕
              </TactileButton>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-charcoal/85">
              {project.spatialMechanics}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {gallery.map((img) => (
                <div
                  key={img.src + img.alt}
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
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
