import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLORS, FONT_FAMILY } from "../donnit/theme";

/** Viral cover for the Donnit Moments announcement: "Cerramos Donnit". */
export const Cover15: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a140e" }}>
      <Img
        src={staticFile("reel-15/cover_bg.jpg")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      {/* darken for premium contrast */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(6,14,9,0.55) 0%, rgba(6,14,9,0.15) 30%, rgba(6,14,9,0.35) 55%, rgba(6,14,9,0.92) 100%)",
        }}
      />

      {/* Donnit logo chip */}
      <div
        style={{
          position: "absolute",
          top: 66,
          left: 58,
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: "rgba(255,255,255,0.10)",
          border: "2px solid rgba(255,255,255,0.28)",
          padding: "10px 24px 10px 12px",
          borderRadius: 999,
          backdropFilter: "blur(4px)",
        }}
      >
        <Img src={staticFile("DonnitLogo.png")} style={{ width: 60, height: 60, borderRadius: 16 }} />
        <span style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 42, color: "#fff" }}>Donnit</span>
      </div>

      {/* Hook */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", padding: "0 70px 300px" }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontWeight: 800,
              fontSize: 92,
              letterSpacing: 1,
              color: "#fff",
              textTransform: "uppercase",
              textShadow: "0 6px 30px rgba(0,0,0,0.7)",
            }}
          >
            Cerramos
          </div>
          {/* DONNIT with a strike line, echoing the "se acabó" beat */}
          <div style={{ position: "relative", display: "inline-block", marginTop: 6 }}>
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontWeight: 800,
                fontSize: 186,
                letterSpacing: -2,
                color: "#fff",
                textTransform: "uppercase",
                lineHeight: 1,
                textShadow: "0 8px 34px rgba(0,0,0,0.75)",
              }}
            >
              Donnit
            </span>
            <div
              style={{
                position: "absolute",
                left: -14,
                right: -14,
                top: "52%",
                height: 12,
                borderRadius: 12,
                background: COLORS.green,
                boxShadow: "0 2px 18px rgba(0,0,0,0.5)",
              }}
            />
          </div>

          {/* curiosity subline */}
          <div style={{ marginTop: 40, display: "flex", justifyContent: "center" }}>
            <div
              style={{
                background: COLORS.green,
                color: COLORS.ink,
                fontFamily: FONT_FAMILY,
                fontWeight: 800,
                fontSize: 46,
                padding: "16px 38px",
                borderRadius: 999,
                boxShadow: "0 14px 34px rgba(0,0,0,0.4)",
              }}
            >
              …y empieza algo más grande
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
