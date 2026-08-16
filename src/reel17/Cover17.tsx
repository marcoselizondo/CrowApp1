import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLORS, FONT_FAMILY } from "../donnit/theme";

/** Viral cover for the fan (ventilador) reel. */
export const Cover17: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a140e" }}>
      <Img src={staticFile("reel-17-ventilador/cover_bg.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(6,14,9,0.5) 0%, rgba(6,14,9,0.05) 26%, rgba(6,14,9,0.3) 52%, rgba(6,14,9,0.92) 100%)",
        }}
      />

      {/* Donnit logo chip */}
      <div style={{ position: "absolute", top: 62, left: 56, display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.10)", border: "2px solid rgba(255,255,255,0.28)", padding: "10px 22px 10px 12px", borderRadius: 999, backdropFilter: "blur(4px)" }}>
        <Img src={staticFile("DonnitLogo.png")} style={{ width: 56, height: 56, borderRadius: 15 }} />
        <span style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 40, color: "#fff" }}>Donnit</span>
      </div>

      {/* Hook */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", padding: "0 70px 280px" }}>
        <div style={{ textAlign: "center", fontFamily: FONT_FAMILY }}>
          <div style={{ fontWeight: 800, fontSize: 82, lineHeight: 1.05, color: "#fff", letterSpacing: -1, textShadow: "0 6px 30px rgba(0,0,0,0.75)" }}>
            Alguien pasa<br />calor ahora mismo
          </div>
          <div style={{ marginTop: 30, display: "flex", justifyContent: "center" }}>
            <div style={{ background: COLORS.green, color: COLORS.ink, fontWeight: 800, fontSize: 52, padding: "16px 40px", borderRadius: 999, boxShadow: "0 14px 34px rgba(0,0,0,0.4)", letterSpacing: -0.5 }}>
              …y el tuyo lleva 1 año parado
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
