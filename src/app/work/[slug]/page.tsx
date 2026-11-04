import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { DeviceFrame } from "@/components/ui/device-frame";
import { TrackedLink } from "@/components/ui/tracked-link";
import { appClips } from "@/data/clips";
import { SITE } from "@/data/games";
import {
  flagshipCaseStudies,
  flagshipSlugs,
  getFlagshipCaseStudy,
  type FlagshipSlug,
} from "@/data/case-studies";

const frameVariant: Record<string, "phone" | "browser"> = {
  jiku: "phone",
  "ar-baseball": "phone",
  "bio-tactical-edge": "browser",
};

const siteUrl = "https://ari-swerdlow.vercel.app";

interface WorkCopy {
  kicker: string;
  title: string;
  description: string;
  sub: string;
  shots: { src: string; alt: string; caption: string }[];
  /** Prefer a phone-aspect source for phone frames. */
  heroSrc?: string;
  liveUrl: string | null;
  tryLabel: string | null;
  tryNote: string | null;
  mailLabel: string | null;
  clipId: string;
  next: FlagshipSlug[];
}

const workCopy: Record<string, WorkCopy> = {
  jiku: {
    kicker: "Case study · fitness",
    title: "Jiku Fitness",
    description:
      "A browser gym. Box, do push-ups and pull-ups, and your phone camera keeps count.",
    sub: "A gym in your browser. Box, do push-ups and pull-ups. Your phone camera keeps count.",
    shots: [
      {
        src: "/shots/jiku-fitness-start-desktop.webp",
        alt: "Jiku Fitness start screen. It asks before it turns the camera on.",
        caption: "The start screen. It asks before it turns the camera on.",
      },
      {
        src: "/shots/jiku-fitness-boxing-setup-desktop.webp",
        alt: "Jiku Fitness boxing setup. One punch, one clear response.",
        caption: "Boxing setup. One punch, one clear response.",
      },
    ],
    heroSrc: "/shots/jiku-fitness-start-mobile.webp",
    liveUrl: "https://posture-app-nms-projects-e9ba3578.vercel.app/",
    tryLabel: "Try Jiku Fitness",
    tryNote: "Best on a phone. Needs your camera.",
    mailLabel: null,
    clipId: "jiku-fitness",
    next: ["ar-baseball", "bio-tactical-edge"],
  },
  "ar-baseball": {
    kicker: "Case study · game",
    title: "AR Baseball",
    description:
      "A baseball game you play by swinging at your phone. Three innings, no bat required.",
    sub: "A baseball game you play by swinging at your phone. Three innings, a rival team, no bat.",
    shots: [
      {
        src: "/shots/ar-baseball-stadium-desktop.webp",
        alt: "AR Baseball calibration. A 3D stadium waits until it can see you.",
        caption: "Calibration. It waits until it can see you before it pitches.",
      },
      {
        src: "/shots/ar-baseball-menu-desktop.webp",
        alt: "AR Baseball menu, with the rival ladder.",
        caption: "The menu, with the rival ladder.",
      },
    ],
    heroSrc: "/shots/ar-baseball-stadium-mobile.webp",
    liveUrl: "https://ar-baseball.vercel.app/",
    tryLabel: "Step up to bat",
    tryNote: "Best on a phone. Needs your camera.",
    mailLabel: null,
    clipId: "ar-baseball",
    next: ["jiku", "bio-tactical-edge"],
  },
  "bio-tactical-edge": {
    kicker: "Case study · sports analysis",
    title: "Bio-Tactical Edge",
    description:
      "Turns ordinary match video into court positions, player paths and a 3D replay.",
    sub: "Takes ordinary match video and works out where everyone actually was.",
    shots: [
      {
        src: "/shots/bio-tactical-analysis-desktop.webp",
        alt: "Bio-Tactical Edge development screen, with a court replay and measurements.",
        caption: "Broadcast frame on one side, the rebuilt court on the other.",
      },
      {
        src: "/shots/bio-tactical-engineering-desktop.webp",
        alt: "Bio-Tactical Edge engineering view of the court and telemetry.",
        caption: "Engineering view of the court and telemetry.",
      },
      {
        src: "/shots/bio-tactical-reconstruction-desktop.webp",
        alt: "Bio-Tactical Edge reconstruction of a ball path on a court.",
        caption: "Ball path reconstructed on a court.",
      },
    ],
    liveUrl: null,
    tryLabel: null,
    tryNote: null,
    mailLabel: "Ask me about it",
    clipId: "bio-tactical-edge",
    next: ["jiku", "ar-baseball"],
  },
};

const toc = [
  { id: "hard-part", label: "The hard part" },
  { id: "how-it-works", label: "How it works" },
  { id: "calls", label: "Calls I made" },
  { id: "checked", label: "What I've checked" },
  { id: "limits", label: "What it doesn't do yet" },
  { id: "next", label: "Next" },
] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return flagshipSlugs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = workCopy[slug];
  if (!page) return {};
  const url = `${siteUrl}/work/${slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = workCopy[slug];
  const caseStudy = getFlagshipCaseStudy(slug);
  if (!page || !caseStudy) notFound();

  const pageUrl = `${siteUrl}/work/${slug}`;
  const more = page.next
    .map((nextSlug) => {
      const study = flagshipCaseStudies.find((item) => item.slug === nextSlug);
      const copy = workCopy[nextSlug];
      if (!study || !copy) return null;
      return {
        href: `/work/${nextSlug}`,
        title: study.title,
        sub: copy.sub,
        shot: copy.shots[0],
      };
    })
    .filter(Boolean);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: page.title,
        headline: page.sub,
        description: page.description,
        url: pageUrl,
        dateModified: caseStudy.updatedAt,
        author: { "@type": "Person", name: SITE.name, url: siteUrl },
        image: `${siteUrl}${page.shots[0].src}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <a
        href="#case-study"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:border-2 focus:border-charcoal focus:bg-ochre focus:px-4 focus:py-2 focus:font-mono focus:text-sm"
      >
        Skip to case study
      </a>
      <header className="border-b-2 border-charcoal">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center font-display text-lg font-semibold no-underline"
          >
            {SITE.name}
          </Link>
          <nav
            className="flex gap-2 font-mono text-[0.68rem] uppercase tracking-wide"
            aria-label="Case study"
          >
            <Link
              href="/#apps"
              className="inline-flex min-h-11 items-center px-2 text-charcoal/70 no-underline"
            >
              Apps
            </Link>
            <Link
              href="/testing"
              className="inline-flex min-h-11 items-center px-2 text-charcoal/70 no-underline"
            >
              Testing
            </Link>
          </nav>
        </div>
      </header>

      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <nav
          className="pointer-events-none absolute top-16 -left-2 hidden w-40 xl:block"
          aria-label="On this page"
        >
          <ul className="pointer-events-auto sticky top-28 space-y-2 border-l border-charcoal/15 pl-3">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="font-mono text-[0.65rem] uppercase tracking-wide text-muted no-underline hover:text-charcoal"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <main id="case-study" className="mx-auto max-w-3xl">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-cobalt">
            {page.kicker}
          </p>
          <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
            {page.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-charcoal/85">{page.sub}</p>
          <p className="mt-3 font-mono text-[0.7rem] text-muted">
            Last updated {caseStudy.updatedAt}
          </p>

          <div className="mt-8 max-w-5xl">
            <DeviceFrame
              variant={frameVariant[slug] ?? "browser"}
              src={page.heroSrc ?? page.shots[0].src}
              alt={page.shots[0].alt}
              caption={page.shots[0].caption}
              clip={appClips[page.clipId]}
              url={page.liveUrl}
              priority
              sizes={
                frameVariant[slug] === "phone"
                  ? "(max-width: 768px) 280px, 320px"
                  : "(max-width: 768px) 92vw, 720px"
              }
              className={
                frameVariant[slug] === "phone"
                  ? "mx-auto max-w-[280px] sm:max-w-[320px]"
                  : ""
              }
            />
          </div>

          <dl className="mt-10 grid gap-4 border-y border-charcoal/15 py-5 font-mono text-[0.72rem] uppercase tracking-wide text-muted sm:grid-cols-2">
            <div>
              <dt className="text-charcoal/45">My role</dt>
              <dd className="mt-1 normal-case tracking-normal text-charcoal/85">
                {caseStudy.strip.role}
              </dd>
            </div>
            <div>
              <dt className="text-charcoal/45">Built with</dt>
              <dd className="mt-1 normal-case tracking-normal text-charcoal/85">
                {caseStudy.strip.builtWith}
              </dd>
            </div>
            <div>
              <dt className="text-charcoal/45">When</dt>
              <dd className="mt-1 normal-case tracking-normal text-charcoal/85">
                {caseStudy.strip.when}
              </dd>
            </div>
            <div>
              <dt className="text-charcoal/45">Status</dt>
              <dd className="mt-1 normal-case tracking-normal text-charcoal/85">
                {caseStudy.strip.status}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-charcoal/45">{caseStudy.strip.privacyLabel}</dt>
              <dd className="mt-1 normal-case tracking-normal text-charcoal/85">
                {caseStudy.strip.privacy}
              </dd>
            </div>
          </dl>

          <section id="hard-part" className="mt-14 scroll-mt-28">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">The hard part</h2>
            <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-charcoal/85 sm:text-lg">
              {caseStudy.hardPart}
            </p>
          </section>

          <section id="how-it-works" className="mt-14 scroll-mt-28">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">How it works</h2>
            <ol className="mt-4 max-w-[68ch] list-decimal space-y-3 pl-5 text-base leading-relaxed text-charcoal/85">
              {caseStudy.system.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          {page.shots.length > 1 ? (
            <div className="mt-10 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:max-w-3xl sm:grid-cols-2 sm:overflow-visible sm:px-0">
              {page.shots.slice(1).map((shot) => (
                <div key={shot.src} className="w-[85%] max-w-md shrink-0 snap-center sm:w-auto">
                  <DeviceFrame
                    variant="browser"
                    src={shot.src}
                    alt={shot.alt}
                    caption={shot.caption}
                    url={page.liveUrl}
                    sizes="(max-width: 640px) 340px, 360px"
                  />
                </div>
              ))}
            </div>
          ) : null}

          <section id="calls" className="mt-14 scroll-mt-28">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Calls I made</h2>
            <ul className="mt-4 max-w-[68ch] space-y-4">
              {caseStudy.decisions.map((decision) => (
                <li key={decision.title}>
                  <p className="text-base leading-relaxed text-charcoal/85">
                    <strong className="font-semibold text-charcoal">{decision.title}</strong>{" "}
                    {decision.body}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section id="checked" className="mt-14 scroll-mt-28">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              What I&apos;ve checked
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {caseStudy.proof.map((item) => (
                <article
                  key={item.label}
                  className="border border-charcoal/15 bg-surface-raised p-4"
                >
                  <p className="font-display text-[2.5rem] font-semibold leading-none tracking-tight">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm font-medium text-charcoal/85">{item.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{item.detail}</p>
                  <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-wide text-muted">
                    {item.measuredAt}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-5">
              <Link
                href="/testing"
                className="text-cobalt underline underline-offset-2"
              >
                All of it, with dates, on the testing page →
              </Link>
            </p>
          </section>

          <section id="limits" className="mt-14 scroll-mt-28">
            <details className="group" open>
              <summary className="cursor-pointer list-none font-display text-2xl font-semibold sm:text-3xl [&::-webkit-details-marker]:hidden">
                <span className="inline-flex items-center gap-3">
                  What it doesn&apos;t do yet
                  <span
                    className="inline-block font-mono text-base transition-transform group-open:rotate-90"
                    aria-hidden
                  >
                    ›
                  </span>
                </span>
              </summary>
              <ul className="mt-4 max-w-[68ch] space-y-2 text-base leading-relaxed text-charcoal/70">
                {caseStudy.limitations.map((item) => (
                  <li key={item} className="pl-4 relative before:absolute before:left-0 before:content-['–']">
                    {item}
                  </li>
                ))}
              </ul>
            </details>
          </section>

          <section id="next" className="mt-14 scroll-mt-28">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Next</h2>
            <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-charcoal/85">
              {caseStudy.nextMove}
            </p>
          </section>

          <div className="mt-10 flex flex-col items-start gap-2">
            {page.liveUrl && page.tryLabel ? (
              <>
                <TrackedLink
                  href={page.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="live_product_open"
                  eventTarget={caseStudy.productId}
                  className="inline-flex border-2 border-charcoal bg-coral px-5 py-2.5 text-sm font-semibold text-white no-underline"
                >
                  {page.tryLabel} ↗
                </TrackedLink>
                {page.tryNote ? (
                  <p className="font-mono text-[0.7rem] text-muted">{page.tryNote}</p>
                ) : null}
              </>
            ) : null}
            {page.mailLabel ? (
              <TrackedLink
                href={`mailto:${SITE.email}?subject=${encodeURIComponent(page.title)}`}
                eventName="contact_intent"
                eventTarget={slug}
                className="inline-flex border-2 border-charcoal bg-cobalt px-5 py-2.5 text-sm font-semibold text-white no-underline"
              >
                {page.mailLabel} →
              </TrackedLink>
            ) : null}
          </div>

          <section className="mt-16 border-t border-charcoal/15 pt-10">
            <h2 className="font-display text-2xl font-semibold">More</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {more.map((item) =>
                item ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group overflow-hidden border border-charcoal/15 bg-surface-raised no-underline transition-transform hover:-translate-y-0.5"
                  >
                    <div className="overflow-hidden bg-charcoal">
                      <Image
                        src={item.shot.src}
                        alt={item.shot.alt}
                        width={640}
                        height={400}
                        sizes="(max-width: 640px) 100vw, 280px"
                        className="aspect-[16/10] w-full object-cover object-top transition-transform duration-150 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-display text-xl font-semibold text-charcoal">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal/70">
                        {item.sub}
                      </p>
                    </div>
                  </Link>
                ) : null,
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
