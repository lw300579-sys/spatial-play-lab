import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What this site stores, what the apps do with the camera, and what happens if you sign up for notes.",
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
              This site does not use the camera. It records a few clicks, such as opening a project,
              the résumé, or email, through its own endpoint. The record is the action name, a label,
              the path, and a time. No cookies, no ad pixels, no camera frames.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal">Linked products</h2>
            <p className="mt-2">
              The camera belongs to the app you open. Each one says, next to the button, whether the
              video stays on your phone or a check runs on a server.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal">Email signup</h2>
            <p className="mt-2">
              If the signup form is on, your email is sent to the newsletter provider configured for
              this site. This site does not keep a copy. If the form is off, the link opens your email app.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal">Contact</h2>
            <p className="mt-2">
              Email links open your mail app or copy the address. This site does not store the message.
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
