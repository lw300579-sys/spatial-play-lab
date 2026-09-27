import Image from "next/image";
import Link from "next/link";
import { flagshipCaseStudies } from "@/data/case-studies";
import { SITE } from "@/data/games";

const accentStyles = {
  coral: {
    border: "border-coral",
    label: "bg-coral text-white",
    link: "bg-coral text-white",
  },
  cobalt: {
    border: "border-cobalt",
    label: "bg-cobalt text-white",
    link: "bg-cobalt text-white",
  },
  lawn: {
    border: "border-lawn",
    label: "bg-lawn text-charcoal",
    link: "bg-lawn text-charcoal",
  },
  ochre: {
    border: "border-ochre",
    label: "bg-ochre text-charcoal",
    link: "bg-ochre text-charcoal",
  },
} as const;

export function FlagshipShowcase() {
  return (
    <section
      id="flagships"
      className="border-b-2 border-charcoal px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-coral">
              Selected work · three flagships
            </p>
            <h2 className="mt-2 max-w-xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Movement in. Meaningful response out.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-charcoal/80 sm:text-lg lg:justify-self-end">
            These projects show the same capability at three scales: a training
            product someone can return to, a game anyone understands in one
            swing, and a professional system that turns video into evidence.
            Each case study separates what is working now from what still needs
            to be proved.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {flagshipCaseStudies.map((caseStudy, index) => {
            const style = accentStyles[caseStudy.accent];
            const layout =
              index === 0
                ? "lg:col-span-7"
                : index === 1
                  ? "lg:col-span-5"
                  : "lg:col-span-12 lg:grid lg:grid-cols-[1.08fr_0.92fr]";

            return (
              <article
                key={caseStudy.slug}
                className={`sticker overflow-hidden border-b-8 bg-surface-raised ${style.border} ${layout}`}
              >
                <div
                  className={`relative overflow-hidden bg-charcoal ${index === 2 ? "min-h-72" : ""}`}
                  style={{ aspectRatio: index === 2 ? undefined : caseStudy.preview.aspectRatio }}
                >
                  <Image
                    src={caseStudy.preview.src}
                    alt={caseStudy.preview.alt}
                    fill
                    priority={index < 2}
                    className={caseStudy.slug === "bio-tactical-edge" ? "object-contain" : "object-cover"}
                    sizes={
                      index === 2
                        ? "(max-width: 1024px) 100vw, 52vw"
                        : "(max-width: 1024px) 100vw, 58vw"
                    }
                  />
                  <span
                    className={`absolute left-3 top-3 border-2 border-charcoal px-2 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-wider sticker-sm ${style.label}`}
                  >
                    Flagship {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-col p-6 sm:p-7">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                    {caseStudy.label} · {caseStudy.maturity}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight">
                    {caseStudy.title}
                  </h3>
                  <p className="mt-2 font-display text-xl font-medium leading-snug text-charcoal/90">
                    {caseStudy.thesis}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-charcoal/78">
                    {caseStudy.summary}
                  </p>

                  <dl className="mt-6 grid grid-cols-3 border-2 border-charcoal bg-paper-ink">
                    {caseStudy.proof.map((item) => (
                      <div
                        key={item.label}
                        className="border-r border-charcoal/25 px-2 py-3 text-center last:border-r-0"
                      >
                        <dt className="font-display text-xl font-semibold sm:text-2xl">
                          {item.value}
                        </dt>
                        <dd className="mt-1 font-mono text-[0.6rem] uppercase leading-tight tracking-wide text-muted sm:text-[0.65rem]">
                          {item.label}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={`/work/${caseStudy.slug}`}
                      className={`inline-flex items-center justify-center border-2 border-charcoal px-5 py-2.5 text-sm font-semibold no-underline sticker-sm transition-transform hover:-translate-y-0.5 ${style.link}`}
                    >
                      Read the case study
                    </Link>
                    {caseStudy.liveUrl ? (
                      <a
                        href={caseStudy.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center border-2 border-charcoal bg-surface-raised px-5 py-2.5 text-sm font-semibold no-underline sticker-sm transition-transform hover:-translate-y-0.5"
                      >
                        Open live product ↗
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-5 border-2 border-charcoal bg-charcoal p-6 text-paper sticker-lg sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ochre">
              Available for the next hard problem
            </p>
            <p className="mt-2 max-w-2xl font-display text-2xl font-semibold leading-snug sm:text-3xl">
              Product engineering, applied computer vision, and interaction work
              where software has to understand the physical world.
            </p>
          </div>
          <a
            href={`mailto:${SITE.email}?subject=Let%27s%20build%20something%20camera-first`}
            className="inline-flex items-center justify-center border-2 border-paper bg-ochre px-5 py-3 text-sm font-bold text-charcoal no-underline shadow-[4px_4px_0_var(--paper)] transition-transform hover:-translate-y-0.5"
          >
            Start a conversation
          </a>
        </div>
      </div>
    </section>
  );
}
