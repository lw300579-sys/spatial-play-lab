"use client";

import { useState } from "react";
import { DeviceFrame } from "@/components/ui/device-frame";

export interface SwitcherShot {
  id: string;
  label: string;
  src: string;
  alt: string;
  caption: string;
  variant?: "phone" | "browser";
}

export function ShotSwitcher({
  shots,
  defaultVariant,
  url,
  displayHost,
  sizes,
  className = "",
}: {
  shots: SwitcherShot[];
  defaultVariant: "phone" | "browser";
  url?: string | null;
  displayHost?: string;
  sizes: string;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const active = shots[index] ?? shots[0];

  return (
    <div className={className}>
      <DeviceFrame
        variant={active.variant ?? defaultVariant}
        src={active.src}
        alt={active.alt}
        caption={active.caption}
        url={url}
        displayHost={displayHost}
        sizes={sizes}
      />
      {shots.length > 1 ? (
        <div
          className="mt-3 flex flex-wrap justify-center gap-1.5 lg:justify-start"
          role="group"
          aria-label="Preview screens"
        >
          {shots.map((shot, i) => {
            const activeTab = i === index;
            return (
              <button
                key={shot.id}
                type="button"
                aria-pressed={activeTab}
                onClick={() => setIndex(i)}
                className={`min-h-11 rounded-full border px-3.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-wide transition-colors ${
                  activeTab
                    ? "border-charcoal bg-charcoal text-paper font-semibold"
                    : "border-charcoal/30 bg-paper text-charcoal/80 hover:border-charcoal hover:text-charcoal"
                }`}
              >
                {shot.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
