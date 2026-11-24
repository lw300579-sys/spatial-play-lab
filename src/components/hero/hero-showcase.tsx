"use client";

import { useState } from "react";
import { DeviceFrame } from "@/components/ui/device-frame";
import { appClips } from "@/data/clips";

const HERO_VIEWS = [
  {
    id: "ar-baseball",
    label: "Baseball",
    src: "/shots/ar-baseball-stadium-mobile.webp",
    alt: "AR Baseball running in a browser: a 3D stadium with pitcher, fielders, and bat.",
    caption: "The 3D stadium and rival pitcher waiting for you to step into view.",
    url: "https://ar-baseball.vercel.app/",
  },
  {
    id: "jiku-fitness",
    label: "Boxing",
    src: "/shots/jiku-fitness-boxing-setup-mobile.webp",
    alt: "Jiku Fitness boxing setup. One punch, one clear response.",
    caption: "Jiku Fitness boxing setup. Targets wait for confident pose tracking.",
    url: "https://posture-app-nms-projects-e9ba3578.vercel.app/",
  },
  {
    id: "jiku-tennis",
    label: "Tennis",
    src: "/shots/jiku-tennis-menu-mobile.webp",
    alt: "Jiku Tennis menu. Your arm, your next rival, and a ladder of opponents.",
    caption: "Jiku Tennis. Swing your arm to rally through a five-rival ladder.",
    url: "https://artennisgame.vercel.app/",
  },
] as const;

export function HeroShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = HERO_VIEWS[activeIndex];

  return (
    <div className="relative mx-auto hidden w-full max-w-[250px] sm:block lg:max-w-[275px]">
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

      <div
        className="mb-4 flex justify-center gap-1.5"
        role="group"
        aria-label="Preview different camera apps"
      >
        {HERO_VIEWS.map((view, idx) => {
          const selected = idx === activeIndex;
          return (
            <button
              key={view.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setActiveIndex(idx)}
              className={`min-h-11 rounded-full border px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wide transition-colors ${
                selected
                  ? "border-charcoal bg-charcoal text-paper font-semibold"
                  : "border-charcoal/30 bg-paper text-charcoal/80 hover:border-charcoal hover:text-charcoal"
              }`}
            >
              {view.label}
            </button>
          );
        })}
      </div>

      <DeviceFrame
        variant="phone"
        src={current.src}
        alt={current.alt}
        caption={current.caption}
        clip={appClips[current.id]}
        url={current.url}
        lcp={activeIndex === 0}
        frameClassName="hero-phone origin-bottom"
        sizes="(max-width: 639px) 0px, (max-width: 1024px) 250px, 275px"
      />
    </div>
  );
}
