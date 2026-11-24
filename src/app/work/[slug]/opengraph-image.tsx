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
          background: "#121211",
          color: "#EDEAE4",
          borderTop: "10px solid #E2624C",
        }}
      >
        <div
          style={{
            width: 490,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "52px 44px",
          }}
        >
          <div style={{ display: "flex", fontSize: 18, letterSpacing: 2.5, color: "#8EA2FF" }}>
            ARI SWERDLOW · CASE STUDY
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                display: "flex",
                fontSize: 54,
                fontWeight: 700,
                lineHeight: 1.02,
                letterSpacing: -1.5,
              }}
            >
              {card.title}
            </div>
            <div style={{ display: "flex", fontSize: 25, lineHeight: 1.3, color: "#D6D3CD" }}>
              {card.line}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 17, color: "#A8A49C" }}>
            ari-swerdlow.vercel.app
          </div>
        </div>
        <div
          style={{
            width: 710,
            height: "100%",
            display: "flex",
            alignItems: "center",
            padding: "28px 28px 28px 0",
          }}
        >
          <div
            style={{
              width: 682,
              height: 426,
              display: "flex",
              overflow: "hidden",
              borderRadius: 14,
              border: "2px solid #2C2B28",
              background: "#000000",
            }}
          >
            <img
              src={shot}
              alt=""
              width={682}
              height={426}
              style={{ objectFit: "cover", objectPosition: "center center" }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
