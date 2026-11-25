"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DeviceFrame } from "@/components/ui/device-frame";
import {
  BIO_TACTICAL_COURT_DIMS,
  BIO_TACTICAL_RALLY_FRAMES,
} from "@/data/bio-tactical-rally";

const PROTOTYPE_STAGES = [
  {
    id: "homography",
    step: "01",
    label: "Broadcast + Court",
    src: "/shots/bio-tactical-analysis-desktop.webp",
    alt: "Bio-Tactical Edge tracking studio showing broadcast court detection, player boxes, and live ground positions.",
    summary:
      "Every broadcast frame is locked to regulation court geometry so screen pixels translate into real court meters even as the camera pans or zooms.",
    readout: "Frame lock · monocular homography + confidence score",
  },
  {
    id: "telemetry",
    step: "02",
    label: "Telemetry",
    src: "/shots/bio-tactical-engineering-desktop.webp",
    alt: "Bio-Tactical Edge Team OS film room with synchronized rally timeline, shot scrub, and court coverage.",
    summary:
      "Tracked player paths, contact timestamps, and derived movement metrics share one synchronized timeline with the source footage.",
    readout: "Synced timeline · 30k+ frame target capacity",
  },
  {
    id: "reconstruction",
    step: "03",
    label: "3D Twin",
    src: "/shots/bio-tactical-reconstruction-desktop.webp",
    alt: "Bio-Tactical Edge 3D Digital Twin projecting player skeletons, ball flight, and recovery space on the court.",
    summary:
      "Ball flight and counterfactual recovery targets are projected onto the 3D court so coaches can compare actual positioning against open angles.",
    readout: "Counterfactual view · recovery vs open-angle bisection",
  },
] as const;

export function BioTacticalInspector() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [frameIndex, setFrameIndex] = useState(14);
  const [playing, setPlaying] = useState(false);

  const isInteractive = activeIndex === PROTOTYPE_STAGES.length;
  const stage = !isInteractive ? PROTOTYPE_STAGES[activeIndex] : null;
  const frame =
    BIO_TACTICAL_RALLY_FRAMES[frameIndex] ?? BIO_TACTICAL_RALLY_FRAMES[0];

  useEffect(() => {
    if (!isInteractive || !playing) return;
    const id = window.setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % BIO_TACTICAL_RALLY_FRAMES.length);
    }, 150);
    return () => window.clearInterval(id);
  }, [isInteractive, playing]);

  const trails = useMemo(() => {
    const slice = BIO_TACTICAL_RALLY_FRAMES.slice(0, frameIndex + 1);
    const nearPoints = slice
      .map((f) => `${f.near[0]},${f.near[1]}`)
      .join(" ");
    const farPoints = slice.map((f) => `${f.far[0]},${f.far[1]}`).join(" ");
    const ballPoints = slice
      .filter((f) => f.ball !== null)
      .slice(-8)
      .map((f) => `${f.ball![0]},${f.ball![1]}`)
      .join(" ");
    return { nearPoints, farPoints, ballPoints };
  }, [frameIndex]);

  const recoveryDeltaM = useMemo(() => {
    const dx = frame.near[0] - frame.recoveryTarget[0];
    const dy = frame.near[1] - frame.recoveryTarget[1];
    return Math.hypot(dx, dy).toFixed(2);
  }, [frame]);

  return (
    <section
      aria-labelledby="prototype-inspector-heading"
      className="mt-10 border-2 border-charcoal bg-surface-raised p-4 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-cobalt">
            Prototype view inspector · captured build screens &amp; rally replay
          </p>
          <h2 id="prototype-inspector-heading" className="mt-1 font-display text-xl font-semibold">
            Three synced views + interactive rally scrubber
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
              onClick={() => {
                setPlaying(false);
                setActiveIndex(idx);
              }}
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
        <button
          type="button"
          role="tab"
          aria-selected={isInteractive}
          onClick={() => setActiveIndex(PROTOTYPE_STAGES.length)}
          className={`min-h-11 rounded-full border-2 border-charcoal px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors ${
            isInteractive
              ? "bg-cobalt font-semibold text-[var(--cobalt-ink)]"
              : "bg-paper text-charcoal hover:bg-paper-ink"
          }`}
        >
          04 · Interactive Rally
        </button>
      </div>

      <div className="mt-5" role="tabpanel">
        {stage ? (
          <>
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
          </>
        ) : (
          <div className="border-2 border-charcoal bg-[#0a131c] p-4 text-[#e7eef5] sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#7dd9d0]">
                  Real 60fps homography sample · {BIO_TACTICAL_RALLY_FRAMES.length} checkpoints
                </p>
                <p className="mt-0.5 text-xs text-white/70">
                  Court coordinates projected from monocular DLT homography (10.97m × 23.77m)
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="rounded border border-white/15 bg-white/5 px-2.5 py-1">
                  t = {frame.t.toFixed(2)}s · f{frame.frame}
                </span>
                <span className="rounded border border-[#7dd9d0]/40 bg-[#7dd9d0]/10 px-2.5 py-1 text-[#7dd9d0]">
                  line support {Math.round(frame.lineSupport * 100)}%
                </span>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
              <div className="flex items-center justify-center rounded border border-white/10 bg-[#0d1c28] p-3">
                <svg
                  viewBox={`-2.5 -5.5 ${BIO_TACTICAL_COURT_DIMS.widthM + 5} ${BIO_TACTICAL_COURT_DIMS.lengthM + 11}`}
                  className="h-64 w-full max-w-[320px]"
                  role="img"
                  aria-label="Interactive tennis court homography reconstruction"
                >
                  <rect
                    x={0}
                    y={0}
                    width={BIO_TACTICAL_COURT_DIMS.widthM}
                    height={BIO_TACTICAL_COURT_DIMS.lengthM}
                    fill="#143b52"
                    stroke="#d8e6f0"
                    strokeWidth={0.14}
                  />
                  <path
                    d="M1.37 0V23.77M9.6 0V23.77M1.37 5.485H9.6M1.37 18.285H9.6M5.485 5.485V18.285"
                    fill="none"
                    stroke="#d8e6f0"
                    strokeWidth={0.1}
                  />
                  <line
                    x1={-0.6}
                    y1={11.885}
                    x2={11.57}
                    y2={11.885}
                    stroke="#ffffff"
                    strokeWidth={0.18}
                    strokeDasharray="0.35 0.2"
                  />

                  {trails.farPoints && (
                    <polyline
                      points={trails.farPoints}
                      fill="none"
                      stroke="#ffcf78"
                      strokeOpacity={0.55}
                      strokeWidth={0.16}
                    />
                  )}
                  {trails.nearPoints && (
                    <polyline
                      points={trails.nearPoints}
                      fill="none"
                      stroke="#7dd9d0"
                      strokeOpacity={0.6}
                      strokeWidth={0.18}
                    />
                  )}
                  {trails.ballPoints && (
                    <polyline
                      points={trails.ballPoints}
                      fill="none"
                      stroke="#e5ff4d"
                      strokeOpacity={0.75}
                      strokeWidth={0.15}
                    />
                  )}

                  {/* Counterfactual recovery vector */}
                  <line
                    x1={frame.near[0]}
                    y1={frame.near[1]}
                    x2={frame.recoveryTarget[0]}
                    y2={frame.recoveryTarget[1]}
                    stroke="#38bdf8"
                    strokeWidth={0.14}
                    strokeDasharray="0.3 0.25"
                  />
                  <circle
                    cx={frame.recoveryTarget[0]}
                    cy={frame.recoveryTarget[1]}
                    r={0.48}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth={0.14}
                  />

                  {/* Far & Near players */}
                  <circle cx={frame.far[0]} cy={frame.far[1]} r={0.44} fill="#ffcf78" />
                  <circle cx={frame.near[0]} cy={frame.near[1]} r={0.5} fill="#7dd9d0" />

                  {/* Ball */}
                  {frame.ball && (
                    <circle
                      cx={frame.ball[0]}
                      cy={frame.ball[1]}
                      r={0.34}
                      fill="#e5ff4d"
                      stroke="#0a131c"
                      strokeWidth={0.08}
                    />
                  )}
                </svg>
              </div>

              <div className="flex flex-col justify-between gap-3 font-mono text-xs">
                <div className="space-y-2.5">
                  <div className="rounded border border-white/10 bg-white/5 p-3">
                    <p className="text-[0.65rem] uppercase text-white/60">Near player pos</p>
                    <p className="mt-1 text-sm font-semibold text-[#7dd9d0]">
                      ({frame.near[0].toFixed(2)}m, {frame.near[1].toFixed(2)}m)
                    </p>
                  </div>
                  <div className="rounded border border-white/10 bg-white/5 p-3">
                    <p className="text-[0.65rem] uppercase text-white/60">Recovery delta</p>
                    <p className="mt-1 text-sm font-semibold text-[#38bdf8]">
                      {recoveryDeltaM}m to bisection
                    </p>
                  </div>
                  <div className="rounded border border-white/10 bg-white/5 p-3">
                    <p className="text-[0.65rem] uppercase text-white/60">Reprojection RMSE</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {frame.rmsePx.toFixed(1)} px clipped
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setPlaying((p) => !p)}
                    className="min-h-10 flex-1 rounded border border-[#7dd9d0] bg-[#7dd9d0]/15 px-3 py-1.5 font-semibold text-[#7dd9d0] hover:bg-[#7dd9d0]/25"
                  >
                    {playing ? "Pause" : "Play rally"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPlaying(false);
                      setFrameIndex(0);
                    }}
                    className="min-h-10 rounded border border-white/20 bg-white/5 px-3 py-1.5 text-white/80 hover:bg-white/10"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <label htmlFor="rally-scrubber" className="font-mono text-[0.68rem] uppercase text-white/70">
                Scrub
              </label>
              <input
                id="rally-scrubber"
                type="range"
                min={0}
                max={BIO_TACTICAL_RALLY_FRAMES.length - 1}
                value={frameIndex}
                onChange={(e) => {
                  setPlaying(false);
                  setFrameIndex(Number(e.target.value));
                }}
                className="w-full accent-[#7dd9d0]"
              />
            </div>

            <div className="mt-4 border-t border-white/10 pt-3">
              <p className="text-xs leading-relaxed text-white/75">
                Interactive projection from a recorded 60fps clip: teal = near player path, amber = far
                player path, yellow = projected ball track, dashed cyan = angle-of-bisection recovery
                target.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
