import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Browser-tab icon — the same "AA" monogram as the nav logo. */
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
          background: "#04060a",
          border: "3px solid #00e5ff",
          borderRadius: 12,
          color: "#00e5ff",
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: -1,
          fontFamily: "sans-serif",
        }}
      >
        {site.initials}
      </div>
    ),
    { ...size },
  );
}
