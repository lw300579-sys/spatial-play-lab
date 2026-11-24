"use client";

import Link from "next/link";
import { useState } from "react";
import { DeviceFrame } from "@/components/ui/device-frame";

const PROTOTYPE_STAGES = [
  {
    id: "homography",
    step: "01",
    label: "Broadcast + Court",
    src: "/shots/bio-tactical-analysis-desktop.webp",
    alt: "Bio-Tactical Edge development screen, with a court replay and measurements.",
    summary:
      "Every broadcast frame is locked to regulation court geometry so screen pixels translate into real court meters even as the camera pans or zooms.",
    readout: "Frame lock · monocular homography + confidence score",
  },
  {
    id: "telemetry",
    step: "02",
    label: "Telemetry",
    src: "/shots/bio-tactical-engineering-desktop.webp",
    alt: "Bio-Tactical Edge engineering view of the court and telemetry.",
    summary:
      "Tracked player paths, contact timestamps, and derived movement metrics share one synchronized timeline with the source footage.",
    readout: "Synced timeline · 30k+ frame target capacity",
  },
  {
    id: "reconstruction",
    step: "03",
    label: "3D Flight",
    src: "/shots/bio-tactical-reconstruction-desktop.webp",
    alt: "Bio-Tactical Edge reconstruction of a ball path on a court.",
    summary:
      "Ball flight and counterfactual recovery targets are projected onto the 3D court so coaches can compare actual positioning against open angles.",
    readout: "Counterfactual view · recovery vs open-angle bisection",
  },
] as const;

export function BioTacticalInspector() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stage = PROTOTYPE_STAGES[activeIndex];

  return (
    <section
      aria-labelledby="prototype-inspector-heading"
      className="mt-10 border-2 border-charcoal bg-surface-raised p-4 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-cobalt">
            Prototype view inspector · captured build screens
          </p>
          <h2 id="prototype-inspector-heading" className="mt-1 font-display text-xl font-semibold">
            Three synced views in the workstation
          </h2>
        </div>
        <Link
          href="/testing#golden-rally-checklist"
          className="font-mono text-[0.68rem] uppercase tracking-wider text-cobalt underline underline-offset-2"
        >
          Public rally status: in progress →
        </Link>
      </div>

      <div
        className="mt-4 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Workstation prototype views"
      >
        {PROTOTYPE_STAGES.map((item, idx) => {
          const selected = idx === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveIndex(idx)}
              className={`min-h-11 rounded-full border-2 border-charcoal px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors ${
                selected
                  ? "bg-cobalt font-semibold text-[var(--cobalt-ink)]"
                  : "bg-paper text-charcoal hover:bg-paper-ink"
              }`}
            >
              {item.step} · {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-5" role="tabpanel">
        <DeviceFrame
          variant="browser"
          src={stage.src}
          alt={stage.alt}
          displayHost={`local workstation · stage ${stage.step}`}
          sizes="(max-width: 768px) 92vw, 720px"
        />
        <div className="mt-4 border-t border-charcoal/15 pt-4">
          <p className="font-mono text-[0.68rem] uppercase tracking-wide text-cobalt">
            {stage.readout}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-charcoal/85">{stage.summary}</p>
        </div>
      </div>
    </section>
  );
}
