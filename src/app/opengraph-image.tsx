import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const dynamic = "force-static";

export const alt = `${site.name} — Firmware for an electric future. Embedded Software Engineer.`;
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
          padding: "54px 64px",
          background: "#20342c",
          color: "#f4f5ef",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <svg
          width="470"
          height="630"
          viewBox="0 0 470 630"
          style={{ position: "absolute", top: 0, right: 0 }}
        >
          <path
            d="M470 90H342L264 168V237 M470 127H370L298 199V237 M470 472H358L283 397V354 M470 512H328L251 435V354 M360 0V98L227 231 M435 0V154L326 263 M398 630V492L309 403V354 M337 630V528L217 408V354"
            fill="none"
            stroke="#627b50"
            strokeWidth="1.5"
          />
          <rect x="205" y="237" width="122" height="117" rx="7" fill="#293f32" stroke="#c2ef65" strokeWidth="1.5" />
          <rect x="225" y="257" width="82" height="77" rx="2" fill="none" stroke="#627b50" strokeWidth="1" />
          <path d="M274 270L249 300H267L258 321L285 291H267L274 270Z" fill="#c2ef65" />
          <circle cx="342" cy="90" r="4" fill="#c2ef65" />
          <circle cx="358" cy="472" r="4" fill="#c2ef65" />
          <circle cx="398" cy="566" r="4" fill="#c2ef65" />
          <circle cx="360" cy="54" r="4" fill="#c2ef65" />
        </svg>

        <div style={{ display: "flex", alignItems: "center", gap: 21 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 45,
              height: 45,
              borderRadius: 5,
              background: "#c2ef65",
              color: "#20342c",
              fontSize: 21,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            {site.initials}
          </div>
          <div style={{ fontSize: 15, letterSpacing: 3, color: "#d7dfd3" }}>
            EV / EMBEDDED / CONNECTIVITY
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 10 }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -4, lineHeight: 1.1 }}>
            Firmware for
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -4, lineHeight: 1.1, color: "#c2ef65" }}>
            an electric future.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            paddingTop: 25,
            borderTop: "1px solid #506052",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>{site.name}</div>
          <div style={{ fontSize: 18, color: "#bcc9b9" }}>Embedded Software Engineer</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
