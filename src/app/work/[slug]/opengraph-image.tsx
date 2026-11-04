import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { flagshipSlugs } from "@/data/case-studies";
import { shotDataUri } from "@/lib/og-shot";

export const alt = "Ari Swerdlow case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const cards: Record<string, { title: string; line: string; shot: string }> = {
  jiku: {
    title: "Jiku Fitness",
    line: "A browser gym. Your phone camera keeps count.",
    shot: "jiku-fitness-start-desktop.webp",
  },
  "ar-baseball": {
    title: "AR Baseball",
    line: "Three innings. You swing at your phone.",
    shot: "ar-baseball-stadium-desktop.webp",
  },
  "bio-tactical-edge": {
    title: "Bio-Tactical Edge",
    line: "Match video, turned into a court.",
    shot: "bio-tactical-analysis-desktop.webp",
  },
};

export function generateStaticParams() {
  return flagshipSlugs;
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const card = cards[slug];
  if (!card) notFound();
  const shot = await shotDataUri(card.shot);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#102027",
          color: "#fffdf7",
        }}
      >
        <div
          style={{
            width: 480,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "48px 44px",
            gap: 18,
          }}
        >
          <div style={{ display: "flex", fontSize: 18, letterSpacing: 2 }}>ARI SWERDLOW</div>
          <div style={{ display: "flex", fontSize: 56, fontWeight: 700, lineHeight: 1, letterSpacing: -1 }}>
            {card.title}
          </div>
          <div style={{ display: "flex", fontSize: 26, lineHeight: 1.25, color: "#e7e5e4" }}>{card.line}</div>
        </div>
        <img src={shot} alt="" width={720} height={630} style={{ objectFit: "cover" }} />
      </div>
    ),
    { ...size },
  );
}
