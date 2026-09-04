import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — Embedded Software Engineer | EV Firmware`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social card — what LinkedIn / X render when the portfolio link is shared. */
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
          padding: 64,
          background:
            "linear-gradient(135deg, #04060a 0%, #0c111b 55%, #071a1c 100%)",
          color: "#e8eef7",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(29,38,52,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(29,38,52,0.7) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -120,
            width: 520,
            height: 520,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(0,229,255,0.28) 0%, rgba(0,229,255,0) 65%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 10,
              border: "1.5px solid rgba(0,229,255,0.5)",
              background: "rgba(0,229,255,0.08)",
              color: "#00e5ff",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {site.initials}
          </div>
          <div
            style={{
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#9aa8bd",
            }}
          >
            Embedded · EV Firmware · Telematics
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }}>
            {site.name}
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 700,
              lineHeight: 1.1,
              background: "linear-gradient(100deg, #7df3ff 0%, #00e5ff 45%, #a3e635 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Embedded Software Engineer · EV Systems Consultant
          </div>
          <div style={{ fontSize: 22, color: "#9aa8bd", marginTop: 8 }}>
            TI MCU · STM32 / ESP32 · BMS / VCU / CAN · AIS-140 · FOTA
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            color: "#5d6b83",
            letterSpacing: 2,
          }}
        >
          <div>{site.location.toUpperCase()}</div>
          <div style={{ display: "flex", gap: 28 }}>
            <div style={{ color: "#00e5ff" }}>2K+ UNITS VALIDATED</div>
            <div style={{ color: "#a3e635" }}>90% FEWER FIELD ISSUES</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
