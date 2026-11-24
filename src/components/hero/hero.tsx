import { HeroShowcase } from "@/components/hero/hero-showcase";

export function Hero() {
  return (
    <section id="top" className="border-b-2 border-charcoal">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:gap-10 sm:px-6 sm:py-20 lg:min-h-[85svh] lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="flex flex-col gap-5 sm:gap-6">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cobalt">
            Ari Swerdlow · product engineer
          </p>
          <h1 className="font-display text-[clamp(2.75rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-balance">
            I build software you move.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-charcoal/85 sm:text-xl">
            Swing at a pitch. Box in your living room. Learn Sign Language. It all runs in the browser off your phone camera.
          </p>
          <p className="max-w-lg text-base leading-relaxed text-charcoal/75">
            No app store. No sensors. Just you, waving at your phone like it owes you money.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#apps"
              className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-charcoal bg-coral px-5 py-2.5 text-sm font-semibold text-[var(--coral-ink)] no-underline transition-transform hover:-translate-y-0.5"
            >
              Try the apps <span className="btn-arrow">↓</span>
            </a>
          </div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted">
            Runs in the browser · camera stays on your phone · no app store
          </p>
        </div>

        {/* Hidden below sm so the 390px viewport keeps CTAs above the fold and skips the shot. */}
        <HeroShowcase />
      </div>
    </section>
  );
}
