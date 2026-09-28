import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How the portfolio itself handles interaction events and how linked camera products are described.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 sm:py-20">
      <article className="mx-auto max-w-3xl">
        <Link href="/" className="font-mono text-xs uppercase tracking-wider text-cobalt">
          ← Back to portfolio
        </Link>
        <h1 className="mt-8 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
          Privacy, in plain language.
        </h1>
        <div className="mt-8 space-y-8 text-base leading-relaxed text-charcoal/80">
          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal">This portfolio</h2>
            <p className="mt-2">
              The portfolio does not request camera or microphone access. It records a small
              allow-listed set of interaction events—such as opening a case study, a live product,
              the résumé, or contact—through a first-party endpoint. The event body contains the
              action name, a product label, the current path, and a timestamp. It does not add
              cookies, local-storage identifiers, advertising pixels, camera data, form contents,
              or user-agent fields.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal">Linked products</h2>
            <p className="mt-2">
              Camera permissions belong to the separately deployed products you choose to open.
              Each launch surface states the known processing boundary next to the action. Where a
              production retention, deletion, or model-transmission policy has not been established,
              the portfolio says so rather than implying a stronger guarantee.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal">Contact</h2>
            <p className="mt-2">
              Contact actions open your email client or copy the published email address. The site
              does not collect a message form or store message contents.
            </p>
          </section>
          <p className="border-l-4 border-cobalt bg-paper-ink p-4 font-mono text-xs text-charcoal/75">
            Last updated: 2026-09-26
          </p>
        </div>
      </article>
    </main>
  );
}
