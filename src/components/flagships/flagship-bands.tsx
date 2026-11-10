import Link from "next/link";
import { DeviceFrame } from "@/components/ui/device-frame";
import { TrackedLink } from "@/components/ui/tracked-link";
import { FlagshipQrButton } from "@/components/flagships/flagship-qr-button";
import { flagshipCaseStudies } from "@/data/case-studies";
import { appClips } from "@/data/clips";

const FLAGSHIP_COPY = {
  jiku: {
    // Distinct from the one-line pitch / study.summary above.
    what: "Rounds that pause when tracking drops, and reps that only count when you finish the full range.",
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
    // Distinct from the one-line pitch / study.summary above.
    what: "You calibrate once, take a practice swing, then play three innings against a rival ladder.",
    why: "I wanted a Wii-style baseball game you start from a link. A real two-handed swing, no controller.",
    how: "Hold a quick pose so it learns your size, take a practice swing, then wait for the pitch.",
    // Menu shot — hero already uses the stadium / waiting-on-the-pitch frame.
    caption: "The menu, with the rival ladder.",
    tryLabel: "Try it ↗",
    shot: "/shots/ar-baseball-menu-desktop.webp",
    mobile: "/shots/ar-baseball-menu-mobile.webp",
    alt: "AR Baseball menu, with the rival ladder.",
    clipId: "ar-baseball",
    frame: "phone" as const,
  },
  "bio-tactical-edge": {
    // Distinct from the one-line pitch / study.summary above.
    what: "Court lines mapped to a regulation court, then players and the ball projected onto it for a scrubbable 3D replay.",
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
  return (
    <section id="apps" className="border-b-2 border-charcoal px-4 py-14 sm:px-6 sm:py-20">
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
                      <span className="inline-flex min-h-11 items-center gap-2">
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
                        className="inline-flex min-h-11 items-center rounded-full border-2 border-charcoal bg-coral px-4 py-2 text-sm font-semibold text-white no-underline"
                      >
                        {copy.tryLabel}
                      </TrackedLink>
                    ) : null}
                    {study.liveUrl ? (
                      <FlagshipQrButton url={study.liveUrl} title={study.title} />
                    ) : null}
                    <Link
                      href={`/work/${study.slug}`}
                      className="inline-flex min-h-11 items-center rounded-full border-2 border-charcoal bg-paper px-4 py-2 text-sm font-semibold text-charcoal no-underline"
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
    </section>
  );
}
