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
            "radial-gradient(42rem 26rem at 85% -10%, rgba(6,95,70,0.12), transparent 60%), #fff6ed",
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
              background: "#065f46",
            }}
          />
          <div style={{ fontSize: 26, color: "rgba(16,22,47,0.75)", letterSpacing: 3 }}>
            OPERATIONS &amp; CONTROLS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 700, color: "#10162f" }}>
            {siteConfig.name}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 30,
              color: "#065f46",
              fontWeight: 600,
            }}
          >
            Financial Analysis · Reconciliation · Process Improvement
          </div>
          <div style={{ marginTop: 26, fontSize: 26, color: "rgba(16,22,47,0.75)" }}>
            SAP MM-based reconciliation · procurement controls · Advanced
            Excel · statutory payment analysis
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 24, color: "rgba(16,22,47,0.75)" }}>{siteConfig.location}</div>
          <div
            style={{
              fontSize: 20,
              color: "#ffffff",
              background: "#065f46",
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
