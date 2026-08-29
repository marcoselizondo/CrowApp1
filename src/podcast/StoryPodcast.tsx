import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLORS, FONT_FAMILY } from "../donnit/theme";

const RED = "#e11d2a";
const INK = "#0c1510";

/** Instagram Story (1080x1920) promoting the Donnit x Luis Di Pietro podcast. */
export const StoryPodcast: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(130% 100% at 50% 16%, #1c3325 0%, ${INK} 58%, #06100b 100%)`,
        fontFamily: FONT_FAMILY,
        color: "#fff",
      }}
    >
      <AbsoluteFill style={{ background: "radial-gradient(60% 26% at 50% 7%, rgba(143,214,120,0.20) 0%, rgba(0,0,0,0) 70%)" }} />

      {/* top row */}
      <div style={{ position: "absolute", top: 92, left: 70, right: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: COLORS.green, color: INK, fontWeight: 800, fontSize: 38, padding: "12px 28px", borderRadius: 999 }}>
          <span style={{ width: 15, height: 15, borderRadius: 999, background: RED, boxShadow: "0 0 0 5px rgba(225,29,42,0.25)" }} />
          NUEVO EPISODIO
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Img src={staticFile("DonnitLogo.png")} style={{ width: 60, height: 60, borderRadius: 15 }} />
          <span style={{ fontWeight: 800, fontSize: 38 }}>Donnit</span>
        </div>
      </div>

      {/* content column */}
      <div style={{ position: "absolute", top: 250, left: 70, right: 70, bottom: 300, display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: 40 }}>
        {/* recreated thumbnail headline */}
        <div>
          <div style={{ fontWeight: 700, fontSize: 58, letterSpacing: -0.5 }}>Así nació la app</div>
          <div style={{ display: "inline-block", background: RED, color: "#fff", fontWeight: 800, fontSize: 64, padding: "6px 20px", borderRadius: 8, marginTop: 12, transform: "rotate(-1deg)" }}>
            que evita que tiremos
          </div>
          <div style={{ marginTop: 16, fontWeight: 800, fontSize: 118, lineHeight: 0.98, letterSpacing: -3, textShadow: "0 8px 28px rgba(0,0,0,0.55)" }}>
            MUEBLES<br />A LA BASURA
          </div>
        </div>

        {/* play + duration */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ width: 100, height: 100, borderRadius: 999, background: COLORS.green, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 14px 34px rgba(0,0,0,0.45)" }}>
            <div style={{ width: 0, height: 0, borderTop: "24px solid transparent", borderBottom: "24px solid transparent", borderLeft: `40px solid ${INK}`, marginLeft: 9 }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: 800, fontSize: 44 }}>Episodio completo</span>
            <span style={{ fontWeight: 600, fontSize: 34, color: "rgba(255,255,255,0.72)" }}>1:12:27 · en YouTube</span>
          </div>
        </div>

        {/* episode title */}
        <div>
          <div style={{ fontWeight: 800, fontSize: 52, lineHeight: 1.14 }}>
            De un mueble en la calle a<br />una app para todo un barrio
          </div>
          <div style={{ marginTop: 12, fontWeight: 800, fontSize: 38, color: COLORS.green }}>Ep 01</div>
        </div>

        {/* hosts */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
          <div style={{ background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.2)", borderRadius: 999, padding: "12px 26px", fontWeight: 800, fontSize: 38 }}>Marcos Elizondo</div>
          <span style={{ color: COLORS.green, fontWeight: 800, fontSize: 42 }}>×</span>
          <div style={{ background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.2)", borderRadius: 999, padding: "12px 26px", fontWeight: 800, fontSize: 38 }}>Luis Di Pietro</div>
        </div>
      </div>

      {/* CTA bottom */}
      <div style={{ position: "absolute", bottom: 120, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ fontSize: 52, opacity: 0.9 }}>⬆︎</div>
        <div style={{ background: "#fff", color: INK, fontWeight: 800, fontSize: 44, padding: "18px 44px", borderRadius: 999, boxShadow: "0 14px 34px rgba(0,0,0,0.4)" }}>
          Míralo completo · link arriba
        </div>
      </div>
    </AbsoluteFill>
  );
};
