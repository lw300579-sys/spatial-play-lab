import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lost you",
  description: "This page moved or never existed. The camera does that to me too.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center px-4 py-16 sm:px-6">
      <div className="mx-auto w-full max-w-xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cobalt">404 · tracking lost</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-7xl">Lost you.</h1>
        <p className="mt-5 text-lg leading-relaxed text-charcoal/75">
          This page moved or never existed. The camera does that to me too.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/#apps"
            className="inline-flex min-h-11 items-center rounded-full border-2 border-charcoal bg-coral px-5 py-3 font-semibold text-white no-underline"
          >
            Back to the apps
          </Link>
          <Link
            href="/resume"
            className="inline-flex min-h-11 items-center rounded-full border-2 border-charcoal bg-paper px-5 py-3 font-semibold no-underline"
          >
            Résumé
          </Link>
        </div>
      </div>
    </main>
  );
}
