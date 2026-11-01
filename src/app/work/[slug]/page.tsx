import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { AppMedia } from "@/components/ui/app-media";
import { TrackedLink } from "@/components/ui/tracked-link";
import { appClips } from "@/data/clips";
import { SITE } from "@/data/games";
import { flagshipSlugs, getFlagshipCaseStudy } from "@/data/case-studies";

const siteUrl = "https://ari-swerdlow.vercel.app";

interface WorkCopy {
  kicker: string;
  title: string;
  description: string;
  sub: string;
  shots: { src: string; alt: string }[];
  caption: string;
  how: [string, string, string];
  status: string;
  liveUrl: string | null;
  tryLabel: string | null;
  tryNote: string | null;
  mailLabel: string | null;
  clipId: string;
  next: { href: string; label: string }[];
}

const workCopy: Record<string, WorkCopy> = {
  jiku: {
    kicker: "Case study · fitness",
    title: "Jiku Fitness",
    description: "A browser gym. Box, do push-ups and pull-ups, and your phone camera keeps count.",
    sub: "A gym in your browser. Box, do push-ups and pull-ups. Your phone camera keeps count.",
    shots: [
      {
        src: "/shots/jiku-fitness-start-desktop.webp",
        alt: "Jiku Fitness start screen. It asks before it turns the camera on.",
      },
      {
        src: "/shots/jiku-fitness-boxing-setup-desktop.webp",
        alt: "Jiku Fitness boxing setup. One punch, one clear response.",
      },
    ],
    caption: "The start screen. It asks before it turns the camera on.",
    how: [
      "Your phone camera tracks your body, and it all runs on the phone.",
      "Each round has a clear start, rest and finish, so you always know if it's still running.",
      "A rep only counts if your whole body went through it, not just your elbow.",
    ],
    status: "Live prototype. Tested in code; still needs more real-phone sessions.",
    liveUrl: "https://posture-app-nms-projects-e9ba3578.vercel.app/",
    tryLabel: "Try Jiku Fitness",
    tryNote: "Best on a phone. Needs your camera.",
    mailLabel: null,
    clipId: "jiku-fitness",
    next: [
      { href: "/work/ar-baseball", label: "AR Baseball" },
      { href: "/work/bio-tactical-edge", label: "Bio-Tactical Edge" },
    ],
  },
  "ar-baseball": {
    kicker: "Case study · game",
    title: "AR Baseball",
    description: "A baseball game you play by swinging at your phone. Three innings, no bat required.",
    sub: "A baseball game you play by swinging at your phone. Three innings, a rival team, no bat.",
    shots: [
      {
        src: "/shots/ar-baseball-stadium-desktop.webp",
        alt: "AR Baseball calibration. A 3D stadium waits until it can see you.",
      },
      {
        src: "/shots/ar-baseball-menu-desktop.webp",
        alt: "AR Baseball menu, with the rival ladder.",
      },
    ],
    caption: "Calibration. It waits until it can see you before it pitches.",
    how: [
      "A quick pose at the start tells the game how big you are and which hand you bat with.",
      "It looks for a real swing, so standing still with your hands up doesn't get you a hit.",
      "Contact turns into actual baseball: fielders, runners, runs and a final score.",
    ],
    status: "Live prototype. 250,000 simulated games run clean; real-phone testing is next.",
    liveUrl: "https://ar-baseball.vercel.app/",
    tryLabel: "Step up to bat",
    tryNote: "Best on a phone. Needs your camera.",
    mailLabel: null,
    clipId: "ar-baseball",
    next: [
      { href: "/work/jiku", label: "Jiku Fitness" },
      { href: "/work/bio-tactical-edge", label: "Bio-Tactical Edge" },
    ],
  },
  "bio-tactical-edge": {
    kicker: "Case study · sports analysis",
    title: "Bio-Tactical Edge",
    description: "Turns ordinary match video into court positions, player paths and a 3D replay.",
    sub: "Takes ordinary match video and works out where everyone actually was.",
    shots: [
      {
        src: "/shots/bio-tactical-analysis-desktop.webp",
        alt: "Bio-Tactical Edge development screen, with a court replay and measurements.",
      },
      {
        src: "/shots/bio-tactical-engineering-desktop.webp",
        alt: "Bio-Tactical Edge engineering view of the court and telemetry.",
      },
      {
        src: "/shots/bio-tactical-reconstruction-desktop.webp",
        alt: "Bio-Tactical Edge reconstruction of a ball path on a court.",
      },
    ],
    caption: "Development screens. There's no public demo yet.",
    how: [
      "It finds the court lines in each frame and maps the picture onto a real court.",
      "Players and the ball become positions on that court, lined up with the video.",
      "You can scrub a 3D replay and every number links back to the frame it came from.",
    ],
    status: "Research prototype. The next step is one public 20-second rally you can scrub end to end.",
    liveUrl: null,
    tryLabel: null,
    tryNote: null,
    mailLabel: "Ask me about it",
    clipId: "bio-tactical-edge",
    next: [
      { href: "/work/jiku", label: "Jiku Fitness" },
      { href: "/work/ar-baseball", label: "AR Baseball" },
    ],
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return flagshipSlugs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = workCopy[slug];
  if (!page) return {};
  const url = `${siteUrl}/work/${slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = workCopy[slug];
  const caseStudy = getFlagshipCaseStudy(slug);
  if (!page || !caseStudy) notFound();

  const pageUrl = `${siteUrl}/work/${slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: page.title,
        headline: page.sub,
        description: page.description,
        url: pageUrl,
        dateModified: caseStudy.updatedAt,
        author: { "@type": "Person", name: SITE.name, url: siteUrl },
        image: `${siteUrl}${page.shots[0].src}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <header className="border-b-2 border-charcoal">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="font-display text-lg font-semibold no-underline">
            {SITE.name}
          </Link>
          <nav className="flex gap-4 font-mono text-[0.68rem] uppercase tracking-wide" aria-label="Case study">
            <Link href="/#apps" className="text-charcoal/70 no-underline">
              Work
            </Link>
            <Link href="/evidence" className="text-charcoal/70 no-underline">
              Notes
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-cobalt">{page.kicker}</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-6xl">{page.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-charcoal/85">{page.sub}</p>

        <figure className="mt-8">
          <div className="overflow-hidden rounded-lg border-2 border-charcoal bg-charcoal">
            <AppMedia
              clip={appClips[page.clipId]}
              desktop={page.shots[0].src}
              alt={page.shots[0].alt}
              priority
            />
          </div>
          {page.shots.length > 1 ? (
            <div className={`mt-3 grid gap-3 ${page.shots.length > 2 ? "md:grid-cols-2" : "sm:grid-cols-2"}`}>
              {page.shots.slice(1).map((shot) => (
                <div key={shot.src} className="overflow-hidden rounded-lg border-2 border-charcoal bg-charcoal">
                  <img src={shot.src} alt={shot.alt} width={1280} height={800} className="aspect-[16/10] w-full object-cover object-top" />
                </div>
              ))}
            </div>
          ) : null}
          <figcaption className="mt-2 font-mono text-[0.7rem] leading-relaxed text-muted">{page.caption}</figcaption>
        </figure>

        <h2 className="mt-10 font-display text-2xl font-semibold">How it works</h2>
        <ol className="mt-4 space-y-3 text-base leading-relaxed text-charcoal/85">
          {page.how.map((sentence) => (
            <li key={sentence}>{sentence}</li>
          ))}
        </ol>

        <p className="mt-8 text-sm leading-relaxed text-charcoal/75">
          {page.status}{" "}
          <Link href="/evidence" className="text-cobalt underline underline-offset-2">
            Details in Notes →
          </Link>
        </p>

        <div className="mt-6 flex flex-col items-start gap-2">
          {page.liveUrl && page.tryLabel ? (
            <>
              <TrackedLink
                href={page.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                eventName="live_product_open"
                eventTarget={caseStudy.productId}
                className="inline-flex border-2 border-charcoal bg-coral px-5 py-2.5 text-sm font-semibold text-white no-underline"
              >
                {page.tryLabel} ↗
              </TrackedLink>
              {page.tryNote ? <p className="font-mono text-[0.7rem] text-muted">{page.tryNote}</p> : null}
            </>
          ) : null}
          {page.mailLabel ? (
            <TrackedLink
              href={`mailto:${SITE.email}?subject=${encodeURIComponent(page.title)}`}
              eventName="contact_intent"
              eventTarget={slug}
              className="inline-flex border-2 border-charcoal bg-cobalt px-5 py-2.5 text-sm font-semibold text-white no-underline"
            >
              {page.mailLabel} →
            </TrackedLink>
          ) : null}
        </div>

        <p className="mt-12 font-mono text-[0.75rem] text-muted">
          More:{" "}
          {page.next.map((item, index) => (
            <span key={item.href}>
              {index > 0 ? " · " : null}
              <Link href={item.href} className="text-cobalt underline underline-offset-2">
                {item.label}
              </Link>
            </span>
          ))}
        </p>
      </main>
    </>
  );
}
