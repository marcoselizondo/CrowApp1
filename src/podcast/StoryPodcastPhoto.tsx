import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLORS, FONT_FAMILY } from "../donnit/theme";

const INK = "#0c1510";
const RED = "#e11d2a";

/** Spotify-style podcast story: full-bleed cover photo blended behind the text. */
export const StoryPodcastPhoto: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: INK, fontFamily: FONT_FAMILY, color: "#fff" }}>
      {/* cover photo (upload to public/podcast/cover.jpg) */}
      <Img src={staticFile("podcast/cover.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

      {/* blend gradients: darken top (for chips) and bottom (for text) */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(6,16,11,0.6) 0%, rgba(6,16,11,0.05) 20%, rgba(6,16,11,0) 40%, rgba(6,16,11,0.75) 68%, rgba(6,16,11,0.97) 100%)",
        }}
      />

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

      {/* bottom content */}
      <div style={{ position: "absolute", left: 70, right: 70, bottom: 150, display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ fontWeight: 800, fontSize: 36, color: COLORS.green, letterSpacing: 1 }}>PODCAST · EP 01</div>
        <div style={{ fontWeight: 800, fontSize: 74, lineHeight: 1.08, letterSpacing: -1, textShadow: "0 6px 26px rgba(0,0,0,0.7)" }}>
          De un mueble en la calle<br />a una app para tu barrio
        </div>

        {/* play + hosts */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ width: 96, height: 96, borderRadius: 999, background: COLORS.green, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 14px 34px rgba(0,0,0,0.5)" }}>
            <div style={{ width: 0, height: 0, borderTop: "23px solid transparent", borderBottom: "23px solid transparent", borderLeft: `38px solid ${INK}`, marginLeft: 9 }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: 800, fontSize: 42 }}>Marcos Elizondo × Luis Di Pietro</span>
            <span style={{ fontWeight: 600, fontSize: 34, color: "rgba(255,255,255,0.78)" }}>1:12:27 · en YouTube</span>
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 8, alignSelf: "flex-start", background: "#fff", color: INK, fontWeight: 800, fontSize: 44, padding: "18px 42px", borderRadius: 999, boxShadow: "0 14px 34px rgba(0,0,0,0.45)" }}>
          Míralo completo · link ⬆︎
        </div>
      </div>
    </AbsoluteFill>
  );
};
