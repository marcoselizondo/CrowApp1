import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLORS, FONT_FAMILY } from "../donnit/theme";

/**
 * Portada del Reel "Ayuda a Ensenada" (1080x1920).
 * El texto queda dentro de la franja central 3:4 (y 240–1680) que Instagram muestra en el perfil.
 * Tono: ayuda, no promoción. Sin emojis.
 */

const BG = "#101914";
const CREAM = "#f4f7f0";

export const EnsenadaReelCover: React.FC<{ photo: string; position?: string; credit?: string }> = ({
  photo,
  position = "center",
  credit,
}) => (
  <AbsoluteFill style={{ backgroundColor: BG, fontFamily: FONT_FAMILY, color: CREAM }}>
    <Img
      src={staticFile(photo)}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: position }}
    />
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(to bottom, rgba(16,25,20,0.35) 0%, rgba(16,25,20,0) 18%, rgba(16,25,20,0) 36%, rgba(16,25,20,0.82) 50%, rgba(16,25,20,0.97) 64%, rgba(16,25,20,1) 76%)",
      }}
    />
    {credit ? (
      <div style={{ position: "absolute", top: 270, right: 60, fontSize: 24, fontWeight: 600, color: "rgba(244,247,240,0.75)", textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}>
        Foto: {credit}
      </div>
    ) : null}
    <div style={{ position: "absolute", left: 80, right: 80, top: 930 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 800, letterSpacing: 4, color: COLORS.green, textTransform: "uppercase" }}>
        <div style={{ width: 52, height: 5, borderRadius: 4, background: COLORS.green }} />
        Ensenada, Baja California
      </div>
      <div style={{ fontSize: 132, fontWeight: 800, lineHeight: 1.0, letterSpacing: -3, marginTop: 30 }}>
        Ensenada<br />necesita<br />ayuda
      </div>
      <div style={{ fontSize: 46, fontWeight: 700, lineHeight: 1.25, marginTop: 36, color: "rgba(244,247,240,0.85)" }}>
        Sube tus muebles a <span style={{ color: COLORS.green }}>Donnit</span> y llega a quien lo perdió en la tormenta.
      </div>
    </div>
  </AbsoluteFill>
);
