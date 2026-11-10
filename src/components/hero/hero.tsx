import Link from "next/link";
import { DeviceFrame } from "@/components/ui/device-frame";
import { appClips } from "@/data/clips";
import { shotBlur } from "@/data/shot-blur";

export function Hero() {
  return (
    <section id="top" className="border-b-2 border-charcoal">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-16 xl:py-20">
        <div className="flex flex-col gap-4 sm:gap-5">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cobalt">
            Ari Swerdlow · product engineer
          </p>
          <h1 className="font-display text-[clamp(2.5rem,5.6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-balance">
            I build software you move.
          </h1>
          <p className="max-w-xl text-[1.05rem] leading-relaxed text-charcoal/85 sm:text-xl">
            Swing at a pitch. Box in your living room. Learn a sign. It all runs in the browser off your phone camera.
          </p>
          <p className="max-w-lg text-base leading-relaxed text-charcoal/75">
            No app store. No sensors. Just you, waving at your phone like it owes you money.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#apps"
              className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-charcoal bg-coral px-5 py-2.5 text-sm font-semibold no-underline"
            >
              Try the apps <span className="btn-arrow">↓</span>
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

        {/* Hidden below sm so the 390px viewport keeps H1 + CTAs above the fold. */}
        <div className="relative mx-auto hidden w-full max-w-[240px] sm:block lg:max-w-[280px] xl:max-w-[300px]">
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
              pathLength={1}
            />
            <path
              d="M80 400 H320 M120 360 H280 M160 320 H240"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
          <div className="hero-phone origin-bottom">
            <DeviceFrame
              variant="phone"
              src="/shots/ar-baseball-stadium-mobile.webp"
              alt="AR Baseball running in a browser: a 3D stadium waiting for your swing."
              caption="Waiting on the pitch. The pitcher won't throw until tracking is ready."
              clip={appClips["ar-baseball"]}
              url="https://ar-baseball.vercel.app/"
              priority
              blurDataURL={shotBlur["ar-baseball-stadium-mobile.webp"]}
              sizes="(max-width: 639px) 0px, (max-width: 1024px) 240px, 300px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
