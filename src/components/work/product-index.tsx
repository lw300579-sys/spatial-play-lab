"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { DeviceFrame } from "@/components/ui/device-frame";
import { catalog, type CatalogItem } from "@/data/catalog";
import { appClips } from "@/data/clips";
import { useDevice } from "@/hooks/use-device";
import { TrackedLink } from "@/components/ui/tracked-link";

const QrModal = dynamic(
  () => import("@/components/qr-modal/qr-modal").then((mod) => mod.QrModal),
  { ssr: false },
);

const FLAGSHIP_IDS = new Set(["jiku-fitness", "ar-baseball", "bio-tactical-edge"]);
const everythingElse = catalog.filter((item) => !FLAGSHIP_IDS.has(item.id));

export function ProductIndex() {
  const { isMobile, ready } = useDevice();
  const [qr, setQr] = useState<CatalogItem | null>(null);

  return (
    <section id="everything-else" className="border-b-2 border-charcoal px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Everything else
          </h2>
          <p className="mt-3 text-base leading-relaxed text-charcoal/80">
            Smaller stuff. Some are games, one teaches you a sign, one just wants you to tap.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {everythingElse.map((item) => (
            <article key={item.id} className="flex flex-col">
              <DeviceFrame
                variant="browser"
                src={item.desktop}
                alt={item.alt}
                clip={appClips[item.id]}
                url={item.liveUrl}
                sizes="(max-width: 768px) 92vw, 45vw"
              />
              <div className="mt-4 flex flex-1 flex-col gap-3">
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
                      className="inline-flex min-h-11 items-center rounded-full border-2 border-charcoal bg-coral px-4 py-2 text-sm font-semibold text-white no-underline"
                    >
                      {item.tryLabel} ↗
                    </TrackedLink>
                  ) : null}
                  {item.liveUrl && item.camera && ready && !isMobile ? (
                    <button
                      type="button"
                      onClick={() => setQr(item)}
                      className="hidden min-h-11 rounded-full border-2 border-charcoal bg-paper px-4 py-2 text-sm font-semibold md:inline-flex md:items-center"
                    >
                      Phone QR
                    </button>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {qr?.liveUrl ? (
        <QrModal open onClose={() => setQr(null)} url={qr.liveUrl} title={qr.title} />
      ) : null}
    </section>
  );
}
