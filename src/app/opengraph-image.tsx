import { ImageResponse } from "next/og";

export const alt = "Spatial Play Lab — Browser AR & Computer Vision";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFDF7",
          padding: 64,
          border: "12px solid #18181B",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            fontFamily: "monospace",
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#1E3A8A",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              background: "#E15A46",
              border: "3px solid #18181B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            SP
          </div>
          Spatial Play Lab
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              color: "#18181B",
              maxWidth: 900,
            }}
          >
            Spatial play you can feel in the browser.
          </div>
          <div style={{ fontSize: 28, color: "#52525B", maxWidth: 720 }}>
            Browser AR tennis · shadow boxing · ASL · biomechanics
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            fontFamily: "monospace",
            fontSize: 18,
          }}
        >
          {["MediaPipe", "WebXR", "60fps", "No app store"].map((t) => (
            <div
              key={t}
              style={{
                border: "2px solid #18181B",
                padding: "8px 14px",
                background: "#EFE9DC",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
