import Link from "next/link";
import { AppMedia } from "@/components/ui/app-media";
import { appClips } from "@/data/clips";

export function Hero() {
  return (
    <section id="top" className="border-b-2 border-charcoal">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:min-h-[85svh] lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cobalt">
            Ari Swerdlow · product engineer
          </p>
          <h1 className="font-display text-[clamp(2.75rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-balance">
            I build software you move.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-charcoal/85 sm:text-xl">
            Swing at a pitch. Box in your living room. Learn a sign. It all runs in the browser off your phone camera.
          </p>
          <p className="max-w-lg text-base leading-relaxed text-charcoal/75">
            No app store. No sensors. Just you, waving at your phone like it owes you money.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#apps"
              className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-charcoal bg-coral px-5 py-2.5 text-sm font-semibold text-white no-underline"
            >
              Try the apps ↓
            </a>
            <Link
              href="/resume"
              className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-charcoal bg-paper px-5 py-2.5 text-sm font-semibold text-charcoal no-underline"
            >
              Résumé
            </Link>
          </div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted">
            Runs in the browser · camera stays on your phone · no app store
          </p>
        </div>

        <div className="relative">
          <svg
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.12]"
            viewBox="0 0 400 480"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M40 420 C120 280, 160 200, 200 40 C240 200, 280 280, 360 420"
              stroke="currentColor"
              strokeWidth="1.5"
              className="hero-field-line"
            />
            <path
              d="M80 400 H320 M120 360 H280 M160 320 H240"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
          <figure className="mx-auto max-w-sm origin-bottom rotate-[-3deg] overflow-hidden rounded-[2.25rem] border-[10px] border-charcoal bg-charcoal shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
            <AppMedia
              clip={appClips["ar-baseball"]}
              desktop="/shots/ar-baseball-stadium-desktop.webp"
              mobile="/shots/ar-baseball-stadium-mobile.webp"
              alt="AR Baseball running in a browser: a 3D stadium waiting for your swing."
              priority
              frame="hero"
            />
            <figcaption className="border-t border-white/10 bg-charcoal px-3 py-2 font-mono text-[0.65rem] text-white/70">
              Waiting on the pitch. The pitcher won&apos;t throw until tracking is ready.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
