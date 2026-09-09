import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} - AI Warranty Vault`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0c0720 0%, #1a1033 55%, #2c1a5c 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -100,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,0.45) 0%, rgba(167,139,250,0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 60,
              height: 60,
              borderRadius: 16,
              background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
            }}
          />
          <span style={{ fontSize: 44, fontWeight: 700, color: "#f1edfb" }}>{SITE_NAME}</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 700,
            color: "#f1edfb",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: 980,
          }}
        >
          Buy. Store. Relax.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 30,
            color: "#a89cc8",
            textAlign: "center",
            maxWidth: 860,
          }}
        >
          Snap a bill. AI reads it, stores it, and reminds you before your warranty expires.
        </div>
      </div>
    ),
    { ...size }
  );
}
