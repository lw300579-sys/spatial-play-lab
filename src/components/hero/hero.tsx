import { AppMedia } from "@/components/ui/app-media";
import { TrackedLink } from "@/components/ui/tracked-link";
import { appClips } from "@/data/clips";

export function Hero() {
  return (
    <section id="top" className="border-b-2 border-charcoal">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cobalt">
            Ari Swerdlow · product engineer
          </p>
          <h1 className="font-display text-[clamp(2.75rem,7vw,5rem)] font-semibold leading-[0.98] tracking-tight text-balance">
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
              className="inline-flex items-center justify-center border-2 border-charcoal bg-coral px-4 py-2.5 text-sm font-semibold text-white no-underline"
            >
              Try the apps ↓
            </a>
            <TrackedLink
              href="/ari-swerdlow-resume.pdf"
              download
              eventName="resume_download"
              eventTarget="hero"
              className="inline-flex items-center justify-center border-2 border-charcoal bg-ochre px-4 py-2.5 text-sm font-semibold text-charcoal no-underline"
            >
              Résumé ↓
            </TrackedLink>
          </div>
        </div>

        <figure className="overflow-hidden rounded-lg border-2 border-charcoal bg-charcoal">
          <AppMedia
            clip={appClips["ar-baseball"]}
            desktop="/shots/ar-baseball-stadium-desktop.webp"
            mobile="/shots/ar-baseball-stadium-mobile.webp"
            alt="AR Baseball running in a browser: a 3D stadium waiting for your swing."
            priority
            frame="hero"
          />
          <figcaption className="border-t-2 border-charcoal bg-paper px-3 py-2 font-mono text-[0.65rem] text-muted">
            AR Baseball, waiting for your swing.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
