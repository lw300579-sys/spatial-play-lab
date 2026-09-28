import type { Metadata } from "next";
import Link from "next/link";
import {
  evidenceDownloads,
  evidenceUpdatedAt,
  goldenRallyStages,
  humanOutcomeGaps,
  publishedBenchmarks,
} from "@/data/evidence";

export const metadata: Metadata = {
  title: "Evidence ledger",
  description:
    "Dated engineering benchmarks, unmeasured human outcomes, device-test templates, and the Bio-Tactical golden-rally acceptance bar.",
  alternates: { canonical: "/evidence" },
};

export default function EvidencePage() {
  return (
    <main className="min-h-screen">
      <header className="border-b-2 border-charcoal px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link href="/" className="font-display text-xl font-semibold no-underline">
            Ari Swerdlow
          </Link>
          <Link href="/#contact" className="font-mono text-xs uppercase tracking-wider">
            Contact →
          </Link>
        </div>
      </header>

      <section className="border-b-2 border-charcoal px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cobalt">
            Public evidence ledger · updated {evidenceUpdatedAt}
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-5xl font-semibold leading-none tracking-tight sm:text-7xl">
            Proof, gaps, and the next honest test.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-charcoal/80">
            Engineering checks show that a system can run. Human evidence shows
            that people can understand, complete, and benefit from it. This ledger
            keeps those categories separate and leaves unmeasured outcomes visible.
          </p>
        </div>
      </section>

      <section className="border-b-2 border-charcoal px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Dated engineering benchmarks
          </h2>
          <div className="mt-7 overflow-x-auto border-2 border-charcoal bg-paper">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="bg-charcoal text-paper">
                <tr>
                  {['Product', 'Result', 'Metric', 'Date', 'Method'].map((heading) => (
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
            Category: engineering validation. None of these rows is presented as retention,
            usability, coaching impact, or commercial outcome evidence.
          </p>
        </div>
      </section>

      <section className="border-b-2 border-charcoal bg-paper-ink/55 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Human outcomes still to earn
          </h2>
          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {humanOutcomeGaps.map((gap) => (
              <article key={gap.product} className="sticker border-b-8 border-coral bg-paper p-6">
                <p className="font-mono text-xs uppercase tracking-wider text-coral">{gap.status}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold">{gap.product}</h3>
                <p className="mt-3 font-medium">{gap.metric}</p>
                <p className="mt-4 text-sm leading-relaxed text-charcoal/70">
                  Next sample: {gap.nextSample}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-charcoal bg-charcoal px-4 py-14 text-paper sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ochre">
            Bio-Tactical acceptance bar
          </p>
          <h2 className="mt-2 max-w-3xl font-display text-3xl font-semibold sm:text-4xl">
            The golden rally is specified, not simulated.
          </h2>
          <div className="mt-8 grid gap-px border-2 border-paper/60 bg-paper/30 md:grid-cols-2 lg:grid-cols-3">
            {goldenRallyStages.map((stage) => (
              <article key={stage.step} className="bg-charcoal p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-ochre">{stage.step}</span>
                  <span className="border border-paper/35 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-wide text-paper/70">
                    {stage.status}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold">{stage.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/70">{stage.requirement}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Run the fieldwork</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-charcoal/75">
            These blank, reusable templates make the next evidence sprint consistent.
            Example rows are clearly marked for removal and contain no invented results.
          </p>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {evidenceDownloads.map((item) => (
              <a
                key={item.href}
                href={item.href}
                download
                className="sticker sticker-cobalt bg-surface-raised p-5 text-charcoal no-underline transition-transform hover:-translate-y-1"
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
