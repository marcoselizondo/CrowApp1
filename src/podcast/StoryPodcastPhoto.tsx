import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLORS, FONT_FAMILY } from "../donnit/theme";

const INK = "#0c1510";
const RED = "#e11d2a";
const COVER = staticFile("podcast/thumb_crop.png");

/** Spotify-style podcast story: blurred cover fills the bg, sharp thumbnail card on top. */
export const StoryPodcastPhoto: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: INK, fontFamily: FONT_FAMILY, color: "#fff" }}>
      {/* blurred background from the same image */}
      <AbsoluteFill style={{ transform: "scale(1.3)", filter: "blur(50px) brightness(0.5) saturate(1.1)" }}>
        <Img src={COVER} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(to bottom, rgba(6,16,11,0.5) 0%, rgba(6,16,11,0.2) 34%, rgba(6,16,11,0.55) 62%, rgba(6,16,11,0.97) 100%)" }} />

      {/* top row */}
      <div style={{ position: "absolute", top: 92, left: 70, right: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: COLORS.green, color: INK, fontWeight: 800, fontSize: 38, padding: "12px 28px", borderRadius: 999 }}>
          <span style={{ width: 15, height: 15, borderRadius: 999, background: RED, boxShadow: "0 0 0 5px rgba(225,29,42,0.25)" }} />
          NUEVO EPISODIO
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Img src={staticFile("DonnitLogo.png")} style={{ width: 60, height: 60, borderRadius: 15 }} />
          <span style={{ fontWeight: 800, fontSize: 38, textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>Donnit</span>
        </div>
      </div>

      {/* sharp thumbnail card */}
      <div style={{ position: "absolute", top: 320, left: 70, right: 70 }}>
        <Img src={COVER} style={{ width: "100%", borderRadius: 30, boxShadow: "0 30px 70px rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.12)" }} />
      </div>

      {/* bottom content */}
      <div style={{ position: "absolute", left: 70, right: 70, bottom: 150, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontWeight: 800, fontSize: 34, color: COLORS.green, letterSpacing: 1.5 }}>PODCAST · EP 01</div>
        <div style={{ fontWeight: 800, fontSize: 62, lineHeight: 1.1, letterSpacing: -1, textShadow: "0 6px 26px rgba(0,0,0,0.7)" }}>
          De un mueble en la calle<br />a una app para tu barrio
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 6 }}>
          <div style={{ width: 92, height: 92, borderRadius: 999, background: COLORS.green, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 14px 34px rgba(0,0,0,0.5)" }}>
            <div style={{ width: 0, height: 0, borderTop: "22px solid transparent", borderBottom: "22px solid transparent", borderLeft: `36px solid ${INK}`, marginLeft: 9 }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: 800, fontSize: 40 }}>Marcos Elizondo × Luis Di Pietro</span>
            <span style={{ fontWeight: 600, fontSize: 34, color: "rgba(255,255,255,0.8)" }}>1:12:27 · en YouTube</span>
          </div>
        </div>
        <div style={{ marginTop: 10, alignSelf: "flex-start", background: "#fff", color: INK, fontWeight: 800, fontSize: 44, padding: "18px 42px", borderRadius: 999, boxShadow: "0 14px 34px rgba(0,0,0,0.45)" }}>
          Míralo completo · link ⬆︎
        </div>
      </div>
    </AbsoluteFill>
  );
};
