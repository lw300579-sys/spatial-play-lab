import { PhoneQrButton } from "@/components/qr-modal/phone-qr-button";
import { DeviceFrame } from "@/components/ui/device-frame";
import { Reveal } from "@/components/ui/reveal";
import { TrackedLink } from "@/components/ui/tracked-link";
import { catalog } from "@/data/catalog";
import { appClips } from "@/data/clips";

const FLAGSHIP_IDS = new Set(["jiku-fitness", "ar-baseball", "bio-tactical-edge"]);
const everythingElse = catalog.filter((item) => !FLAGSHIP_IDS.has(item.id));

export function ProductIndex() {
  return (
    <section
      id="everything-else"
      className="scroll-mt-28 border-b-2 border-charcoal px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Everything else
          </h2>
          <p className="mt-3 text-base leading-relaxed text-charcoal/80">
            Smaller stuff. Some are games, one teaches you a sign, one just wants you to tap.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {everythingElse.map((item) => {
            const isSoloFeatured = item.id === "arcade-runner" && everythingElse.length % 2 === 1;
            return (
              <Reveal key={item.id} className={isSoloFeatured ? "md:col-span-2" : ""}>
                <article
                  className={
                    isSoloFeatured
                      ? "grid h-full gap-6 border-t border-charcoal/15 pt-6 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-10"
                      : "flex h-full flex-col"
                  }
                >
                  <DeviceFrame
                    variant="browser"
                    src={item.desktop}
                    alt={item.alt}
                    clip={appClips[item.id]}
                    url={item.liveUrl}
                    sizes={
                      isSoloFeatured
                        ? "(max-width: 768px) 92vw, 580px"
                        : "(max-width: 768px) 92vw, (max-width: 1200px) 46vw, 564px"
                    }
                  />
                  <div className="mt-4 flex flex-1 flex-col gap-3 md:mt-0">
                    <div>
                      <h3 className="font-display text-2xl font-semibold tracking-tight">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-charcoal/80">
                        {item.sentence}
                      </p>
                    </div>
                    <p className="font-mono text-[0.68rem] leading-relaxed text-muted">
                      {item.privacy}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-1">
                      {item.liveUrl && item.tryLabel ? (
                        <TrackedLink
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          eventName="live_product_open"
                          eventTarget={item.id}
                          className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-charcoal bg-coral px-4 py-2 text-sm font-semibold text-[var(--coral-ink)] no-underline transition-transform hover:-translate-y-0.5"
                        >
                          {item.tryLabel} ↗
                        </TrackedLink>
                      ) : null}
                      {item.liveUrl && item.camera ? (
                        <PhoneQrButton url={item.liveUrl} title={item.title} />
                      ) : null}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
