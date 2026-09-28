import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import {
  flagshipSlugs,
  getFlagshipCaseStudy,
} from "@/data/case-studies";

export const alt = "Ari Swerdlow flagship product case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return flagshipSlugs;
}

const accents = {
  coral: "#e15a46",
  cobalt: "#1e3a8a",
  lawn: "#22c55e",
  ochre: "#eab308",
} as const;

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getFlagshipCaseStudy(slug);
  if (!caseStudy) notFound();

  const accent = accents[caseStudy.accent];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#fffdf7",
        color: "#18181b",
        padding: "62px 70px",
        border: "18px solid #18181b",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              height: 60,
              color: "white",
              background: accent,
              border: "4px solid #18181b",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            AS
          </div>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 700 }}>Ari Swerdlow</div>
        </div>
        <div
          style={{
            display: "flex",
            padding: "10px 16px",
            border: "3px solid #18181b",
            background: accent,
            color: caseStudy.accent === "ochre" || caseStudy.accent === "lawn" ? "#18181b" : "white",
            fontSize: 18,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          Flagship case study
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
        <div style={{ display: "flex", color: accent, fontSize: 22, fontWeight: 800, textTransform: "uppercase", letterSpacing: 3 }}>
          {caseStudy.label}
        </div>
        <div style={{ display: "flex", marginTop: 14, fontSize: 78, lineHeight: 0.95, fontWeight: 800, letterSpacing: -3 }}>
          {caseStudy.title}
        </div>
        <div style={{ display: "flex", marginTop: 22, fontSize: 34, lineHeight: 1.2, fontWeight: 600 }}>
          {caseStudy.thesis}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "#52525b" }}>
        <div style={{ display: "flex" }}>{caseStudy.availability}</div>
        <div style={{ display: "flex" }}>ari-swerdlow.vercel.app</div>
      </div>
    </div>,
    size,
  );
}
