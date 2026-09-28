import Image from "next/image";
import type { FlagshipCaseStudy } from "@/data/case-studies";

export function CaseStudyEvidenceGallery({
  caseStudy,
}: {
  caseStudy: FlagshipCaseStudy;
}) {
  const media = caseStudy.media ?? [];

  return (
    <section className="border-b-2 border-charcoal bg-paper-ink/45 px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cobalt">
            Product evidence · three views
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            See the interface, the signal path, and the recovery contract.
          </h2>
        </div>

        {media.length >= 3 ? (
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {media.slice(0, 3).map((item) => (
              <figure key={item.src} className="sticker overflow-hidden bg-charcoal p-2">
                <div className="relative overflow-hidden bg-[#020617]" style={{ aspectRatio: item.aspectRatio }}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <figcaption className="min-h-24 border-t-2 border-charcoal bg-paper p-3 text-sm leading-relaxed text-charcoal/75">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <figure className="sticker overflow-hidden bg-charcoal p-2">
              <div className="relative overflow-hidden bg-[#020617]" style={{ aspectRatio: caseStudy.preview.aspectRatio }}>
                <Image
                  src={caseStudy.preview.src}
                  alt={caseStudy.preview.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <figcaption className="min-h-28 border-t-2 border-charcoal bg-paper p-3 text-sm leading-relaxed text-charcoal/75">
                {caseStudy.preview.caption}
              </figcaption>
            </figure>

            <figure className="sticker flex min-h-[23rem] flex-col bg-charcoal p-5 text-paper">
              <figcaption className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ochre">
                Signal path · inspectable states
              </figcaption>
              <div className="mt-5 flex flex-1 flex-col justify-center gap-2">
                {caseStudy.system.map((step, index) => (
                  <div key={step.step} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-paper/50 font-mono text-[0.65rem]">
                      {step.step}
                    </span>
                    <span className="border-l-2 border-cobalt pl-3 text-sm font-semibold">
                      {step.title}
                    </span>
                    {index < caseStudy.system.length - 1 ? (
                      <span className="ml-auto text-paper/35" aria-hidden>↓</span>
                    ) : null}
                  </div>
                ))}
              </div>
              <p className="mt-5 border-t border-paper/25 pt-4 text-sm leading-relaxed text-paper/65">
                Every transition is represented as product state, so a noisy physical signal does not become an unexplained result.
              </p>
            </figure>

            <figure className="sticker flex min-h-[23rem] flex-col bg-paper p-5">
              <figcaption className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-coral">
                Failure → response → recovery
              </figcaption>
              <div className="mt-5 grid flex-1 content-center gap-3">
                {[
                  ["01", "Signal degrades", "Do not turn uncertainty into success."],
                  ["02", "Session pauses visibly", "Explain what changed without blaming the player."],
                  ["03", "Fresh input re-arms", "Resume from an explicit, safe state."],
                ].map(([step, title, body]) => (
                  <div key={step} className="border-2 border-charcoal bg-surface-raised p-3">
                    <p className="font-mono text-[0.6rem] text-cobalt">{step}</p>
                    <p className="mt-1 font-display text-lg font-semibold">{title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-charcoal/65">{body}</p>
                  </div>
                ))}
              </div>
            </figure>
          </div>
        )}
      </div>
    </section>
  );
}
