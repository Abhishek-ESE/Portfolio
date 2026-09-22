import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const dynamic = "force-static";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#20342c",
          borderRadius: 8,
          color: "#c2ef65",
          fontSize: 29,
          fontWeight: 700,
          letterSpacing: -2,
          fontFamily: "sans-serif",
          borderBottom: "4px solid #c2ef65",
        }}
      >
        {site.initials}
      </div>
    ),
    { ...size },
  );
}
