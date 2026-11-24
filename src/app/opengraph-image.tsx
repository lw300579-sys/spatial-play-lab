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
          background: "#121211",
          color: "#EDEAE4",
          borderTop: "10px solid #E2624C",
        }}
      >
        <div
          style={{
            width: 510,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "52px 48px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 6,
                background: "#E2624C",
                color: "#121211",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              AS
            </div>
            <div style={{ display: "flex", fontSize: 18, letterSpacing: 2.5, fontWeight: 700 }}>
              ARI SWERDLOW
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 52,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: -1.5,
            }}
          >
            Browser apps you control by moving.
          </div>
          <div style={{ display: "flex", fontSize: 18, color: "#A8A49C" }}>
            ari-swerdlow.vercel.app
          </div>
        </div>
        <div
          style={{
            width: 690,
            height: "100%",
            display: "flex",
            alignItems: "center",
            padding: "28px 28px 28px 0",
          }}
        >
          <div
            style={{
              width: 662,
              height: 414,
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
              width={662}
              height={414}
              style={{ objectFit: "cover", objectPosition: "center center" }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
