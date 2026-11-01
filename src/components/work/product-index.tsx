"use client";

import { useState } from "react";
import { AppMedia } from "@/components/ui/app-media";
import { catalog, catalogFilters, type CatalogFilter, type CatalogItem } from "@/data/catalog";
import { appClips } from "@/data/clips";
import { useDevice } from "@/hooks/use-device";
import { QrModal } from "@/components/qr-modal/qr-modal";
import { TrackedLink } from "@/components/ui/tracked-link";

function Shot({ item }: { item: CatalogItem }) {
  return (
    <div className="overflow-hidden rounded-lg border-2 border-charcoal bg-charcoal">
      <AppMedia
        clip={appClips[item.id]}
        desktop={item.desktop}
        mobile={item.mobile}
        alt={item.alt}
      />
    </div>
  );
}

export function ProductIndex() {
  const { isMobile, ready } = useDevice();
  const [filter, setFilter] = useState<CatalogFilter>("all");
  const [qr, setQr] = useState<CatalogItem | null>(null);
  const visible = catalog.filter((item) => filter === "all" || item.group === filter);

  return (
    <section id="apps" className="border-b-2 border-charcoal px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">The apps</h2>
          <p className="mt-3 text-base leading-relaxed text-charcoal/80">
            Eight things I built. Most use your camera. One just wants you to tap.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter products">
          {catalogFilters.map((item) => {
            const count = item.id === "all" ? catalog.length : catalog.filter((project) => project.group === item.id).length;
            const pressed = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={pressed}
                onClick={() => setFilter(item.id)}
                className={`border-2 border-charcoal px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-wide ${
                  pressed ? "bg-charcoal text-paper" : "bg-paper text-charcoal"
                }`}
              >
                {item.label} <span className="opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 font-mono text-[0.7rem] text-muted" role="status">
          Showing {visible.length} of {catalog.length}
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {visible.map((item) => (
            <article key={item.id} className="flex flex-col border-2 border-charcoal bg-surface-raised">
              <Shot item={item} />
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-charcoal/80">{item.sentence}</p>
                </div>
                <p className="font-mono text-[0.68rem] leading-relaxed text-muted">{item.privacy}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-1">
                  {item.liveUrl && item.tryLabel ? (
                    <TrackedLink
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      eventName="live_product_open"
                      eventTarget={item.id}
                      className="inline-flex border-2 border-charcoal bg-coral px-4 py-2 text-sm font-semibold text-white no-underline"
                    >
                      {item.tryLabel} ↗
                    </TrackedLink>
                  ) : null}
                  {item.liveUrl && item.camera && ready && !isMobile ? (
                    <button
                      type="button"
                      onClick={() => setQr(item)}
                      className="border-2 border-charcoal bg-paper px-4 py-2 text-sm font-semibold"
                    >
                      Phone QR
                    </button>
                  ) : null}
                  {item.caseStudyHref ? (
                    <TrackedLink
                      href={item.caseStudyHref}
                      eventName="case_study_open"
                      eventTarget={item.id}
                      className="inline-flex border-2 border-charcoal bg-paper px-4 py-2 text-sm font-semibold text-charcoal no-underline"
                    >
                      Case study
                    </TrackedLink>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 hidden font-mono text-[0.7rem] text-muted md:block">
          Most of these use your camera. They work best on a phone. Scan the QR.
        </p>
      </div>

      {qr?.liveUrl ? (
        <QrModal open onClose={() => setQr(null)} url={qr.liveUrl} title={qr.title} />
      ) : null}
    </section>
  );
}
