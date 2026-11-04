import { ImageResponse } from "next/og";
import { shotDataUri } from "@/lib/og-shot";

export const alt = "AR Baseball running in a browser: a 3D stadium waiting for your swing.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const shot = await shotDataUri("ar-baseball-stadium-desktop.webp");

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
            width: 500,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 48px",
          }}
        >
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, fontWeight: 700 }}>
            ARI SWERDLOW
          </div>
          <div style={{ display: "flex", fontSize: 52, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1 }}>
            Browser apps you control by moving.
          </div>
          <div style={{ display: "flex", fontSize: 18, color: "#d6d3d1" }}>ari-swerdlow.vercel.app</div>
        </div>
        <img src={shot} alt="" width={700} height={630} style={{ objectFit: "cover" }} />
      </div>
    ),
    { ...size },
  );
}
