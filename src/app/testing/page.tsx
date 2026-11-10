import type { Metadata } from "next";
import Link from "next/link";
import {
  evidenceDownloads,
  goldenRallyStages,
  humanOutcomeGaps,
  publishedBenchmarks,
} from "@/data/evidence";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export const metadata: Metadata = {
  title: "What's tested and what isn't",
  description:
    "Here's every check I've run, with the date I ran it. Most of it is code and recorded video.",
  alternates: { canonical: "/testing" },
};

export default function TestingPage() {
  return (
    <main className="min-h-screen">
      <a
        href="#testing-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:border-2 focus:border-charcoal focus:bg-ochre focus:px-4 focus:py-2 focus:font-mono focus:text-sm"
      >
        Skip to testing content
      </a>
      <header className="border-b-2 border-charcoal px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link href="/" className="inline-flex min-h-11 items-center font-display text-xl font-semibold no-underline">
            Ari Swerdlow
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/#contact"
              className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-wider no-underline"
            >
              Contact →
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section id="testing-content" className="border-b-2 border-charcoal px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cobalt">Testing</p>
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
          <h2 className="font-display text-3xl font-semibold">Engineering checks</h2>
          <div className="mt-7 overflow-x-auto border-2 border-charcoal bg-paper">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead className="bg-charcoal text-paper">
                <tr>
                  {["Product", "Result", "Metric", "Date", "Method"].map((heading) => (
                    <th key={heading} className="px-4 py-3 font-mono text-xs uppercase tracking-wider">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {publishedBenchmarks.map((item) => (
                  <tr key={`${item.product}-${item.metric}`} className="border-t border-charcoal/20 align-top">
                    <th className="px-4 py-4 font-semibold">{item.product}</th>
                    <td className="px-4 py-4 font-display text-2xl font-semibold">{item.result}</td>
                    <td className="px-4 py-4">{item.metric}</td>
                    <td className="px-4 py-4 font-mono text-xs">{item.measuredAt}</td>
                    <td className="max-w-sm px-4 py-4 text-charcoal/75">{item.method}</td>
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
              <article key={gap.product} className="border-2 border-charcoal border-b-8 border-b-coral bg-paper p-6">
                <p className="font-mono text-xs uppercase tracking-wider text-coral">{gap.status}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold">{gap.product}</h3>
                <p className="mt-3 font-medium">{gap.metric}</p>
                <p className="mt-4 text-sm leading-relaxed text-charcoal/70">Next: {gap.nextSample}</p>
                {gap.nextMove ? (
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{gap.nextMove}</p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-charcoal px-4 py-14 sm:px-6 sm:py-20">
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
            Blank sheets for the next round of testing. Nothing gets marked passed until it&apos;s tested.
          </p>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {evidenceDownloads.map((item) => (
              <a
                key={item.href}
                href={item.href}
                download
                className="border-2 border-charcoal bg-surface-raised p-5 text-charcoal no-underline"
              >
                <h3 className="font-display text-xl font-semibold">{item.label} ↓</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{item.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
