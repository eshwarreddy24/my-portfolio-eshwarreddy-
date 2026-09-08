import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/siteConfig";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — Operations & Controls portfolio`;

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(42rem 26rem at 85% -10%, rgba(139,92,246,0.35), transparent 60%), radial-gradient(30rem 20rem at 0% 0%, rgba(99,102,241,0.22), transparent 60%), #0e0e12",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#8B5CF6",
            }}
          />
          <div style={{ fontSize: 26, color: "#b9b9c6", letterSpacing: 3 }}>
            OPERATIONS &amp; CONTROLS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 700, color: "#f2f2f7" }}>
            {siteConfig.name}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 30,
              color: "#a78bfa",
              fontWeight: 600,
            }}
          >
            Financial Analysis · Reconciliation · Process Improvement
          </div>
          <div style={{ marginTop: 26, fontSize: 26, color: "#b9b9c6" }}>
            SAP MM-based reconciliation · procurement controls · Advanced
            Excel · statutory payment analysis
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 24, color: "#b9b9c6" }}>{siteConfig.location}</div>
          <div
            style={{
              fontSize: 20,
              color: "#ffffff",
              background: "#8B5CF6",
              padding: "12px 26px",
              borderRadius: 999,
            }}
          >
            {siteConfig.domain.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    size
  );
}