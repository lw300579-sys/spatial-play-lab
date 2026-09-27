import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  flagshipCaseStudies,
  flagshipSlugs,
  getFlagshipCaseStudy,
} from "@/data/case-studies";
import { SITE } from "@/data/games";

const siteUrl = "https://ari-swerdlow.vercel.app";

const accentStyles = {
  coral: {
    text: "text-coral",
    bg: "bg-coral text-white",
    border: "border-coral",
    shadow: "sticker-coral",
  },
  cobalt: {
    text: "text-cobalt",
    bg: "bg-cobalt text-white",
    border: "border-cobalt",
    shadow: "sticker-cobalt",
  },
  lawn: {
    text: "text-lawn",
    bg: "bg-lawn text-charcoal",
    border: "border-lawn",
    shadow: "sticker-lawn",
  },
  ochre: {
    text: "text-[#9a6900]",
    bg: "bg-ochre text-charcoal",
    border: "border-ochre",
    shadow: "sticker-ochre",
  },
} as const;

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
  const caseStudy = getFlagshipCaseStudy(slug);

  if (!caseStudy) return {};

  const title = `${caseStudy.title} case study`;
  const url = `${siteUrl}/work/${caseStudy.slug}`;

  return {
    title,
    description: caseStudy.summary,
    alternates: { canonical: url },
    openGraph: {
      title: `${caseStudy.title} · ${caseStudy.thesis}`,
      description: caseStudy.summary,
      type: "article",
      url,
      images: [],
    },
    twitter: {
      card: "summary",
      title: `${caseStudy.title} · ${caseStudy.thesis}`,
      description: caseStudy.summary,
      images: [],
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getFlagshipCaseStudy(slug);

  if (!caseStudy) notFound();

  const style = accentStyles[caseStudy.accent];
  const related = flagshipCaseStudies.filter((item) => item.slug !== caseStudy.slug);

  return (
    <>
      <a
        href="#case-study"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:border-2 focus:border-charcoal focus:bg-ochre focus:px-4 focus:py-2 focus:font-mono focus:text-sm"
      >
        Skip to case study
      </a>

      <header className="sticky top-0 z-50 border-b-2 border-charcoal bg-paper/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="group flex items-center gap-2.5 no-underline"
            aria-label={`${SITE.name}, back to portfolio`}
          >
            <span
              className="flex h-8 w-8 items-center justify-center border-2 border-charcoal bg-coral text-sm font-bold text-white sticker-sm transition-transform group-hover:-rotate-6"
              aria-hidden
            >
              {SITE.shortName}
            </span>
            <span className="hidden font-display text-lg font-semibold tracking-tight text-charcoal sm:inline">
              {SITE.name}
            </span>
          </Link>
          <nav className="flex items-center gap-3" aria-label="Case study">
            <Link
              href="/#flagships"
              className="font-mono text-[0.68rem] uppercase tracking-wider text-charcoal/75 no-underline hover:text-charcoal hover:underline"
            >
              All flagships
            </Link>
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent(`About ${caseStudy.title}`)}`}
              className={`border-2 border-charcoal px-3 py-1.5 text-sm font-semibold no-underline sticker-sm ${style.bg}`}
            >
              Contact Ari
            </a>
          </nav>
        </div>
      </header>

      <main id="case-study">
        <section className="border-b-2 border-charcoal px-4 py-12 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className={`font-mono text-[0.7rem] uppercase tracking-[0.2em] ${style.text}`}>
                {caseStudy.label} · flagship case study
              </p>
              <h1 className="mt-3 max-w-3xl font-display text-[clamp(3rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-tight">
                {caseStudy.title}
              </h1>
              <p className="mt-5 max-w-2xl font-display text-2xl font-medium leading-snug text-charcoal/90 sm:text-3xl">
                {caseStudy.thesis}
              </p>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal/80 sm:text-lg">
                {caseStudy.summary}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {caseStudy.liveUrl ? (
                  <a
                    href={caseStudy.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center border-2 border-charcoal px-5 py-2.5 text-sm font-semibold no-underline sticker-sm transition-transform hover:-translate-y-0.5 ${style.bg}`}
                  >
                    Open live product ↗
                  </a>
                ) : (
                  <span className="inline-flex items-center border-2 border-charcoal bg-paper-ink px-4 py-2.5 font-mono text-xs uppercase tracking-wide">
                    Public demo in progress
                  </span>
                )}
                <Link
                  href="/#flagships"
                  className="inline-flex items-center justify-center border-2 border-charcoal bg-surface-raised px-5 py-2.5 text-sm font-semibold no-underline sticker-sm transition-transform hover:-translate-y-0.5"
                >
                  Back to selected work
                </Link>
              </div>
            </div>

            <figure className={`sticker ${style.shadow} overflow-hidden bg-charcoal p-2`}>
              <div
                className="relative w-full overflow-hidden bg-[#020617]"
                style={{ aspectRatio: caseStudy.preview.aspectRatio }}
              >
                <Image
                  src={caseStudy.preview.src}
                  alt={caseStudy.preview.alt}
                  fill
                  priority
                  className={caseStudy.slug === "bio-tactical-edge" ? "object-contain" : "object-cover"}
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
              </div>
              <figcaption className="border-t-2 border-charcoal bg-paper px-3 py-2 font-mono text-[0.65rem] leading-relaxed text-muted">
                Product capture · current prototype
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="border-b-2 border-charcoal bg-paper-ink/55 px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-6xl">
            <dl className="grid border-2 border-charcoal bg-paper sm:grid-cols-2 lg:grid-cols-5">
              {[
                ["Role", caseStudy.role],
                ["Team", caseStudy.team],
                ["Timeline", caseStudy.timeframe],
                ["Maturity", caseStudy.maturity],
                ["Camera data", caseStudy.privacy],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="border-b border-charcoal/25 p-4 last:border-b-0 sm:border-r lg:border-b-0 lg:last:border-r-0"
                >
                  <dt className={`font-mono text-[0.65rem] uppercase tracking-wider ${style.text}`}>
                    {label}
                  </dt>
                  <dd className="mt-2 text-sm font-medium leading-relaxed text-charcoal/85">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-b-2 border-charcoal px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className={`font-mono text-[0.7rem] uppercase tracking-[0.2em] ${style.text}`}>
                The product
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                The problem was never just detection.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-charcoal/80">
                {caseStudy.problem}
              </p>
            </div>
            <div className={`sticker ${style.shadow} bg-surface-raised p-6 sm:p-8`}>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                What I built
              </p>
              <p className="mt-3 font-display text-2xl font-medium leading-snug">
                {caseStudy.outcome}
              </p>
              <p className="mt-4 text-base leading-relaxed text-charcoal/80">
                {caseStudy.built}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {caseStudy.technologies.map((technology) => (
                  <span key={technology} className="spec-badge">
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b-2 border-charcoal bg-charcoal px-4 py-16 text-paper sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ochre">
              System walkthrough
            </p>
            <h2 className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              From physical signal to a result the person can trust.
            </h2>

            <div className="mt-10 grid gap-px border-2 border-paper/70 bg-paper/30 md:grid-cols-2">
              {caseStudy.system.map((step) => (
                <article key={step.step} className="bg-charcoal p-6 sm:p-7">
                  <span className={`inline-flex border-2 border-charcoal px-2 py-1 font-mono text-[0.65rem] font-bold ${style.bg}`}>
                    {step.step}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-paper/75">
                    {step.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b-2 border-charcoal px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <p className={`font-mono text-[0.7rem] uppercase tracking-[0.2em] ${style.text}`}>
                  Evidence, with boundaries
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  What has actually been verified.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-relaxed text-charcoal/75">
                These are engineering checks from the current implementation.
                They are not user-success, retention, recognition-accuracy, or
                commercial-impact claims.
              </p>
            </div>

            <dl className="mt-8 grid gap-5 md:grid-cols-3">
              {caseStudy.proof.map((item) => (
                <div
                  key={item.label}
                  className={`sticker border-b-8 bg-surface-raised p-6 ${style.border}`}
                >
                  <dt className="font-display text-4xl font-semibold tracking-tight">
                    {item.value}
                  </dt>
                  <dd className={`mt-1 font-mono text-xs uppercase tracking-wider ${style.text}`}>
                    {item.label}
                  </dd>
                  <p className="mt-4 text-sm leading-relaxed text-charcoal/75">
                    {item.detail}
                  </p>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-b-2 border-charcoal bg-paper-ink/55 px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className={`font-mono text-[0.7rem] uppercase tracking-[0.2em] ${style.text}`}>
                Product decisions
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
                The choices behind the system.
              </h2>
              <div className="mt-7 space-y-3">
                {caseStudy.decisions.map((decision) => (
                  <article
                    key={decision.title}
                    className="border-2 border-charcoal bg-paper p-5"
                  >
                    <h3 className="font-display text-xl font-semibold">
                      {decision.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
                      {decision.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-coral">
                Honest limitations
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
                What the current prototype does not prove.
              </h2>
              <ul className="mt-7 space-y-3">
                {caseStudy.limitations.map((limitation) => (
                  <li
                    key={limitation}
                    className="flex gap-3 border-l-4 border-coral bg-paper px-4 py-3 text-base leading-relaxed text-charcoal/80"
                  >
                    <span aria-hidden className="font-mono font-bold text-coral">
                      —
                    </span>
                    <span>{limitation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-b-2 border-charcoal px-4 py-16 sm:px-6 sm:py-24">
          <div className={`mx-auto max-w-6xl border-2 border-charcoal p-7 sticker-lg sm:p-10 ${style.bg}`}>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] opacity-75">
              Best next move
            </p>
            <p className="mt-3 max-w-4xl font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {caseStudy.nextMove}
            </p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
                  Continue exploring
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
                  Two more ways movement becomes software.
                </h2>
              </div>
              <Link
                href="/#contact"
                className="font-mono text-xs uppercase tracking-wider text-cobalt underline-offset-4 hover:underline"
              >
                Contact Ari →
              </Link>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/work/${item.slug}`}
                  className="group grid grid-cols-[7rem_1fr] overflow-hidden border-2 border-charcoal bg-surface-raised text-charcoal no-underline sticker-sm sm:grid-cols-[10rem_1fr]"
                >
                  <div className="relative min-h-32 bg-charcoal">
                    <Image
                      src={item.preview.src}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="160px"
                    />
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="font-mono text-[0.62rem] uppercase tracking-wider text-muted">
                      {item.label}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-semibold sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                      {item.thesis}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-charcoal bg-charcoal px-4 py-8 text-paper sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <p className="font-display text-lg font-semibold">{SITE.name}</p>
          <p className="font-mono text-[0.65rem] text-paper/65">
            Camera-first product engineering · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  );
}
