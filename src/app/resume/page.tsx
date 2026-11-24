import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/bio/site-footer";
import { SiteNav } from "@/components/ui/site-nav";
import { flagshipCaseStudies } from "@/data/case-studies";
import { SITE } from "@/data/games";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Product engineer. Computer vision, browser games, things that have to work on a normal phone.",
  alternates: { canonical: "/resume" },
  openGraph: {
    url: "/resume",
    title: "Résumé · Ari Swerdlow",
    description:
      "Product engineer. Computer vision, browser games, things that have to work on a normal phone.",
  },
};

const strengths = [
  "Computer vision products",
  "Browser AR and camera pipelines",
  "Game state systems",
  "Simulation and replay testing",
  "Performance on mid-range phones",
  "Accessibility and error recovery",
  "Release testing",
];

const offers = [
  ["Prototype the hard input", "Get gestures, pose or video working as a real control."],
  ["Make it reliable", "Plan for bad lighting, lost tracking and privacy from day one."],
  ["Ship with proof", "Tests, replays and numbers that say what they don't cover."],
];

export default function ResumePage() {
  return (
    <>
      <a
        href="#resume-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:border-2 focus:border-charcoal focus:bg-ochre focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-semibold focus:text-[var(--ochre-ink)]"
      >
        Skip to résumé
      </a>
      <SiteNav currentPath="/resume" />

      <main id="resume-content" className="min-h-screen px-4 py-12 sm:px-6 sm:py-16">
        <article className="mx-auto max-w-3xl">
          <Link
            data-print-hide
            href="/"
            className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-wider text-cobalt"
          >
            ← Back to portfolio
          </Link>
          <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-cobalt">
            {SITE.name}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Product engineer · computer vision and browser games
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-charcoal/85">
            I build apps where a phone camera is the controller. I care about the parts that go
            wrong: bad lighting, lost tracking, slow phones.
          </p>
          <p className="mt-4 text-base leading-relaxed text-charcoal/80">
            Independent product engineer. I take messy camera input and turn it into something a
            normal person can use without reading instructions.
          </p>

          <h2 className="mt-10 font-display text-2xl font-semibold">Strengths</h2>
          <ul className="mt-3 space-y-1 text-base text-charcoal/85">
            {strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="mt-10 font-display text-2xl font-semibold">Selected work</h2>
          <div className="mt-4 space-y-5 text-base leading-relaxed text-charcoal/85">
            {flagshipCaseStudies.map((study) => (
              <p key={study.slug}>
                <strong className="font-semibold text-charcoal">{study.title}.</strong>{" "}
                {study.summary} {study.resumeProof}
              </p>
            ))}
          </div>

          <h2 className="mt-10 font-display text-2xl font-semibold">What I can do for your team</h2>
          <ul className="mt-4 space-y-3 text-base leading-relaxed text-charcoal/85">
            {offers.map(([title, body]) => (
              <li key={title}>
                <strong className="font-semibold text-charcoal">{title}.</strong> {body}
              </li>
            ))}
          </ul>

          <p className="mt-10 border-l-4 border-cobalt bg-paper-ink p-4 text-sm leading-relaxed text-charcoal/80">
            These are engineering numbers, not user results. More at{" "}
            <Link href="/testing" className="text-cobalt underline">
              /testing
            </Link>
            .{" "}
            <a
              data-print-hide
              href="/ari-swerdlow-resume.pdf"
              download
              className="text-cobalt underline"
            >
              Download the one-page PDF
            </a>
            .
          </p>
          <p className="mt-6 text-sm text-charcoal/80">
            <a className="text-cobalt underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
            {" · "}
            <a
              className="text-cobalt underline"
              href={SITE.socials[0].href}
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
            {" · "}
            <a
              className="text-cobalt underline"
              href={SITE.socials[1].href}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
