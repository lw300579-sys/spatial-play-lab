import Link from "next/link";
import { PhoneQrButton } from "@/components/qr-modal/phone-qr-button";
import { Reveal } from "@/components/ui/reveal";
import { ShotSwitcher, type SwitcherShot } from "@/components/ui/shot-switcher";
import { TrackedLink } from "@/components/ui/tracked-link";
import { flagshipCaseStudies, type FlagshipSlug } from "@/data/case-studies";

interface FlagshipView {
  why: string;
  how: string;
  tryLabel: string | null;
  frame: "phone" | "browser";
  displayHost?: string;
  shots: SwitcherShot[];
}

const FLAGSHIP_COPY: Record<FlagshipSlug, FlagshipView> = {
  jiku: {
    why: "Camera workout apps tend to treat a dropped arm or a quick breather like you failed. I wanted one that knows the difference.",
    how: "Open the link, prop your phone up, step back so it can see you, and go.",
    tryLabel: "Try it ↗",
    frame: "phone",
    shots: [
      {
        id: "start",
        label: "Start",
        src: "/shots/jiku-fitness-start-mobile.webp",
        alt: "Jiku Fitness start screen. It asks before it turns the camera on.",
        caption: "The round screen. It waits until it can actually see you.",
      },
      {
        id: "boxing",
        label: "Boxing setup",
        src: "/shots/jiku-fitness-boxing-setup-mobile.webp",
        alt: "Jiku Fitness boxing setup. One punch, one clear response.",
        caption: "Shadow boxing setup with explicit guard and range cues.",
      },
    ],
  },
  "ar-baseball": {
    why: "I wanted a Wii-style baseball game you start from a link. A real two-handed swing, no controller.",
    how: "Hold a quick pose so it learns your size, take a practice swing, then wait for the pitch.",
    tryLabel: "Try it ↗",
    frame: "phone",
    shots: [
      {
        id: "menu",
        label: "Matchup & Modes",
        src: "/shots/ar-baseball-menu-mobile.webp",
        alt: "AR Baseball menu showing four rivals (Sunny, Kenji, Elena, Matt), HR Derby, and Practice cage.",
        caption: "Four-rival ladder, HR Derby, and batting cage before you step into the box.",
      },
      {
        id: "stadium",
        label: "3D Stadium",
        src: "/shots/ar-baseball-stadium-mobile.webp",
        alt: "AR Baseball 3D stadium with pitcher, fielders, crowd, and bat.",
        caption: "The 3D stadium and rival pitcher waiting for you to step into view.",
      },
    ],
  },
  "bio-tactical-edge": {
    why: "Match video is easy to watch and hard to measure. I wanted real court positions out of the footage teams already have.",
    how: "There's no public demo yet. The case study lets you inspect the three prototype views and what still needs proving.",
    tryLabel: null,
    frame: "browser",
    displayHost: "local workspace · demo in progress",
    shots: [
      {
        id: "analysis",
        label: "Broadcast + Court",
        src: "/shots/bio-tactical-analysis-desktop.webp",
        alt: "Bio-Tactical Edge development screen, with a court replay and measurements.",
        caption: "Broadcast frame on one side, the rebuilt court on the other.",
      },
      {
        id: "engineering",
        label: "Telemetry",
        src: "/shots/bio-tactical-engineering-desktop.webp",
        alt: "Bio-Tactical Edge engineering view of the court and telemetry.",
        caption: "Engineering view: court, tracked contact and derived values stay inspectable together.",
      },
      {
        id: "reconstruction",
        label: "3D Flight",
        src: "/shots/bio-tactical-reconstruction-desktop.webp",
        alt: "Bio-Tactical Edge reconstruction of a ball path on a court.",
        caption: "Reconstruction view: contact and flight projected onto court geometry.",
      },
    ],
  },
};

export function FlagshipBands() {
  return (
    <section id="apps" className="scroll-mt-28 border-b-2 border-charcoal px-4 py-16 sm:px-6 sm:py-20">
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
              <Reveal key={study.slug}>
                <article
                  className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
                    imageLeft ? "" : "lg:[&>*:first-child]:order-2"
                  }`}
                >
                  <ShotSwitcher
                    shots={copy.shots}
                    defaultVariant={copy.frame}
                    url={study.liveUrl}
                    displayHost={copy.displayHost}
                    sizes={
                      copy.frame === "phone"
                        ? "(max-width: 1024px) 280px, 320px"
                        : "(max-width: 1024px) 92vw, 560px"
                    }
                    className={
                      copy.frame === "phone" ? "mx-auto w-full max-w-[280px] lg:max-w-[320px]" : ""
                    }
                  />

                  <div>
                    <h3 className="font-display text-[1.375rem] font-semibold tracking-tight sm:text-3xl">
                      {study.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-charcoal/85">{study.summary}</p>

                    <dl className="mt-6 space-y-4">
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
                        <span className="inline-flex min-h-11 items-center gap-2">
                          How it works under the hood
                          <span
                            className="inline-block transition-transform group-open:rotate-90"
                            aria-hidden="true"
                          >
                            ›
                          </span>
                        </span>
                      </summary>
                      <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-charcoal/80">
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
                          className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-charcoal bg-coral px-4 py-2 text-sm font-semibold text-[var(--coral-ink)] no-underline transition-transform hover:-translate-y-0.5"
                        >
                          {copy.tryLabel}
                        </TrackedLink>
                      ) : null}
                      {study.liveUrl ? (
                        <PhoneQrButton url={study.liveUrl} title={study.title} />
                      ) : null}
                      <Link
                        href={`/work/${study.slug}`}
                        className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-charcoal bg-paper px-4 py-2 text-sm font-semibold text-charcoal no-underline transition-colors hover:bg-paper-ink"
                      >
                        Read the whole thing →
                      </Link>
                    </div>

                    <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-muted">
                      {study.statusRow}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
