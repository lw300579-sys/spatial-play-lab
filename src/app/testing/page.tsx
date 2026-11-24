import type { Metadata } from "next";
import { SiteFooter } from "@/components/bio/site-footer";
import { SiteNav } from "@/components/ui/site-nav";
import {
  evidenceDownloads,
  goldenRallyStages,
  humanOutcomeGaps,
  publishedBenchmarks,
} from "@/data/evidence";

export const metadata: Metadata = {
  title: "What's tested and what isn't",
  description:
    "Here's every check I've run, with the date I ran it. Most of it is code and recorded video.",
  alternates: { canonical: "/testing" },
  openGraph: {
    url: "/testing",
    title: "What's tested and what isn't · Ari Swerdlow",
    description:
      "Here's every check I've run, with the date I ran it. Most of it is code and recorded video.",
  },
};

const portfolioAutomatedChecks = [
  {
    scope: "Responsive & landscape",
    check: "375px portrait, 667×375 landscape, 768px tablet, 1280px & 1440px desktop",
    detail: "Verifies zero hidden sections, zero horizontal overflow, and zero TOC collisions.",
  },
  {
    scope: "Dialog & keyboard",
    check: "Native top-layer <dialog>, Escape, backdrop light dismiss, Tab/Shift+Tab",
    detail: "Confirms QR modal stays centered in viewport and returns focus cleanly.",
  },
  {
    scope: "Contrast & landmarks",
    check: "WCAG AA (>= 4.5:1) in light & dark mode, landmarks, heading outline",
    detail: "Verifies buttons, skip links, and responsive table headers across every route.",
  },
] as const;

export default function TestingPage() {
  return (
    <>
      <a
        href="#testing-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:border-2 focus:border-charcoal focus:bg-ochre focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-semibold focus:text-[var(--ochre-ink)]"
      >
        Skip to testing content
      </a>
      <SiteNav currentPath="/testing" />

      <main id="testing-content" className="min-h-screen">
        <section className="border-b-2 border-charcoal px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cobalt">
              Testing
            </p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl font-semibold leading-none tracking-tight sm:text-6xl">
              What&apos;s tested, and what isn&apos;t
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-charcoal/80">
              Here&apos;s every check I&apos;ve run, with the date I ran it. Most of it is code and
              recorded video. The stuff that needs real people trying it on real phones is listed
              separately, because I haven&apos;t done it yet.
            </p>
          </div>
        </section>

        <section className="border-b-2 border-charcoal px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 id="engineering-checks-heading" className="font-display text-3xl font-semibold">
              Engineering checks
            </h2>
            <div
              tabIndex={0}
              role="region"
              aria-labelledby="engineering-checks-heading"
              className="testing-table-wrap mt-7 border-2 border-charcoal bg-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
            >
              <table className="testing-table text-left text-sm">
                <thead className="bg-charcoal text-paper">
                  <tr>
                    {["Product", "Result", "Metric", "Date", "Method"].map((heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="px-4 py-3 font-mono text-xs uppercase tracking-wider"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {publishedBenchmarks.map((item) => (
                    <tr
                      key={`${item.product}-${item.metric}`}
                      className="border-t border-charcoal/20 align-top"
                    >
                      <th scope="row" className="px-4 py-4 font-semibold text-charcoal">
                        {item.product}
                      </th>
                      <td
                        data-label="Result"
                        className="px-4 py-4 font-display text-2xl font-semibold"
                      >
                        {item.result}
                      </td>
                      <td data-label="Metric" className="px-4 py-4">
                        {item.metric}
                      </td>
                      <td data-label="Date" className="px-4 py-4 font-mono text-xs">
                        {item.measuredAt}
                      </td>
                      <td
                        data-label="Method"
                        className="max-w-sm px-4 py-4 text-charcoal/80"
                      >
                        {item.method}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 font-mono text-xs leading-relaxed text-muted">
              These are engineering numbers, not user results.
            </p>
          </div>
        </section>

        <section className="border-b-2 border-charcoal bg-paper-ink/55 px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl font-semibold">Still needs real people</h2>
            <div className="mt-7 grid gap-5 lg:grid-cols-3">
              {humanOutcomeGaps.map((gap) => (
                <article
                  key={gap.product}
                  className="border-2 border-charcoal border-b-8 border-b-coral bg-paper p-6"
                >
                  <p className="font-mono text-xs uppercase tracking-wider text-coral">
                    {gap.status}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold">{gap.product}</h3>
                  <p className="mt-3 font-medium">{gap.metric}</p>
                  <p className="mt-4 text-sm leading-relaxed text-charcoal/75">
                    Next: {gap.nextSample}
                  </p>
                  {gap.nextMove ? (
                    <p className="mt-3 text-sm leading-relaxed text-charcoal/75">{gap.nextMove}</p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b-2 border-charcoal px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl font-semibold">Portfolio automated checks</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-charcoal/80">
              Browser checks run against this portfolio site itself (Playwright Chromium + production build). They verify layout, accessibility, and caching — not human camera play.
            </p>
            <div className="mt-7 grid gap-5 lg:grid-cols-3">
              {portfolioAutomatedChecks.map((item) => (
                <article
                  key={item.scope}
                  className="border-2 border-charcoal bg-surface-raised p-6"
                >
                  <p className="font-mono text-xs uppercase tracking-wider text-cobalt">
                    {item.scope}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold">{item.check}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/75">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="golden-rally-checklist"
          className="scroll-mt-28 border-b-2 border-charcoal px-4 py-14 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="max-w-3xl font-display text-3xl font-semibold">
              What Bio-Tactical needs before I call it done
            </h2>
            <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {goldenRallyStages.map((stage) => (
                <li key={stage.step} className="border-2 border-charcoal bg-paper p-5">
                  <p className="font-mono text-xs text-cobalt">{stage.step}</p>
                  <p className="mt-2 text-sm leading-relaxed">{stage.requirement}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl font-semibold">Testing sheets</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-charcoal/75">
              Blank sheets for the next round of testing. Nothing gets marked passed until it&apos;s
              tested.
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {evidenceDownloads.map((item) => {
                const words = item.label.split(" ");
                const lastWord = words.pop();
                const prefix = words.join(" ");
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    download
                    className="border-2 border-charcoal bg-surface-raised p-5 text-charcoal no-underline transition-colors hover:bg-paper-ink"
                  >
                    <h3 className="font-display text-xl font-semibold">
                      {prefix ? `${prefix} ` : ""}
                      <span className="whitespace-nowrap">{lastWord}&nbsp;↓</span>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
                      {item.description}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
