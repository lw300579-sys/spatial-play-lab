"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { DeviceFrame } from "@/components/ui/device-frame";
import { TrackedLink } from "@/components/ui/tracked-link";
import { flagshipCaseStudies } from "@/data/case-studies";
import { appClips } from "@/data/clips";
import { useDevice } from "@/hooks/use-device";

const QrModal = dynamic(
  () => import("@/components/qr-modal/qr-modal").then((mod) => mod.QrModal),
  { ssr: false },
);

const FLAGSHIP_COPY = {
  jiku: {
    what: "A gym in your browser. Box, do push-ups and pull-ups, and your phone camera keeps count.",
    why: "Camera workout apps tend to treat a dropped arm or a quick breather like you failed. I wanted one that knows the difference.",
    how: "Open the link, prop your phone up, step back so it can see you, and go.",
    caption: "The round screen. It waits until it can actually see you.",
    tryLabel: "Try it ↗",
    shot: "/shots/jiku-fitness-start-desktop.webp",
    mobile: "/shots/jiku-fitness-start-mobile.webp",
    alt: "Jiku Fitness start screen. It asks before it turns the camera on.",
    clipId: "jiku-fitness",
    frame: "phone" as const,
  },
  "ar-baseball": {
    what: "A baseball game you play by swinging at your phone. Three innings, a rival team, no bat.",
    why: "I wanted a Wii-style baseball game you start from a link. A real two-handed swing, no controller.",
    how: "Hold a quick pose so it learns your size, take a practice swing, then wait for the pitch.",
    caption: "Waiting on the pitch. The pitcher won't throw until tracking is ready.",
    tryLabel: "Try it ↗",
    shot: "/shots/ar-baseball-stadium-desktop.webp",
    mobile: "/shots/ar-baseball-stadium-mobile.webp",
    alt: "AR Baseball calibration. A 3D stadium waits until it can see you.",
    clipId: "ar-baseball",
    frame: "phone" as const,
  },
  "bio-tactical-edge": {
    what: "Takes ordinary match video and works out where everyone actually was.",
    why: "Match video is easy to watch and hard to measure. I wanted real court positions out of the footage teams already have.",
    how: "There's no public demo yet. The case study shows what it does and what still needs proving.",
    caption: "Broadcast frame on one side, the rebuilt court on the other.",
    tryLabel: null,
    shot: "/shots/bio-tactical-analysis-desktop.webp",
    mobile: null,
    alt: "Bio-Tactical Edge development screen, with a court replay and measurements.",
    clipId: "bio-tactical-edge",
    frame: "browser" as const,
  },
} as const;

export function FlagshipBands() {
  const { isMobile, ready } = useDevice();
  const [qr, setQr] = useState<{ url: string; title: string } | null>(null);

  return (
    <section id="apps" className="border-b-2 border-charcoal px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Three I&apos;d show you first
          </h2>
          <p className="mt-3 text-base leading-relaxed text-charcoal/80">
            These are the ones I&apos;ve put the most into. Each has a page with the whole story if you want it.
          </p>
        </div>

        <div className="mt-12 space-y-16 lg:space-y-24">
          {flagshipCaseStudies.map((study, index) => {
            const copy = FLAGSHIP_COPY[study.slug];
            const imageLeft = index % 2 === 0;
            return (
              <article
                key={study.slug}
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
                  imageLeft ? "" : "lg:[&>*:first-child]:order-2"
                }`}
              >
                <DeviceFrame
                  variant={copy.frame}
                  src={copy.mobile ?? copy.shot}
                  alt={copy.alt}
                  caption={copy.caption}
                  clip={appClips[copy.clipId]}
                  url={study.liveUrl}
                  sizes={
                    copy.frame === "phone"
                      ? "(max-width: 1024px) 70vw, 360px"
                      : "(max-width: 1024px) 92vw, 560px"
                  }
                  className={copy.frame === "phone" ? "mx-auto max-w-[280px] lg:max-w-[320px]" : ""}
                />

                <div>
                  <h3 className="font-display text-[1.375rem] font-semibold tracking-tight sm:text-3xl">
                    {study.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-charcoal/85">{study.summary}</p>

                  <dl className="mt-6 space-y-4">
                    <div>
                      <dt className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-muted">
                        What it is
                      </dt>
                      <dd className="mt-1 max-w-[68ch] text-base leading-relaxed text-charcoal/85">
                        {copy.what}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-muted">
                        Why I made it
                      </dt>
                      <dd className="mt-1 max-w-[68ch] text-base leading-relaxed text-charcoal/85">
                        {copy.why}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-muted">
                        How you use it
                      </dt>
                      <dd className="mt-1 max-w-[68ch] text-base leading-relaxed text-charcoal/85">
                        {copy.how}
                      </dd>
                    </div>
                  </dl>

                  <details className="group mt-5 border-t border-charcoal/15 pt-4">
                    <summary className="cursor-pointer list-none font-medium text-charcoal [&::-webkit-details-marker]:hidden">
                      <span className="inline-flex items-center gap-2">
                        How it works under the hood
                        <span
                          className="inline-block transition-transform group-open:rotate-90"
                          aria-hidden
                        >
                          ›
                        </span>
                      </span>
                    </summary>
                    <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-charcoal/80">
                      {study.homeHow.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </details>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {study.liveUrl && copy.tryLabel ? (
                      <TrackedLink
                        href={study.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        eventName="live_product_open"
                        eventTarget={study.productId}
                        className="inline-flex border-2 border-charcoal bg-coral px-4 py-2 text-sm font-semibold text-white no-underline"
                      >
                        {copy.tryLabel}
                      </TrackedLink>
                    ) : null}
                    {study.liveUrl && ready && !isMobile ? (
                      <button
                        type="button"
                        onClick={() =>
                          setQr({ url: study.liveUrl!, title: study.title })
                        }
                        className="hidden border-2 border-charcoal bg-paper px-4 py-2 text-sm font-semibold md:inline-flex"
                      >
                        Phone QR
                      </button>
                    ) : null}
                    <Link
                      href={`/work/${study.slug}`}
                      className="inline-flex border-2 border-charcoal bg-paper px-4 py-2 text-sm font-semibold text-charcoal no-underline"
                    >
                      Read the whole thing →
                    </Link>
                  </div>

                  <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-muted">
                    {study.statusRow}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {qr ? (
        <QrModal open onClose={() => setQr(null)} url={qr.url} title={qr.title} />
      ) : null}
    </section>
  );
}
