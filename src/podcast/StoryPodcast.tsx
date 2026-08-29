import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLORS, FONT_FAMILY } from "../donnit/theme";

const RED = "#e11d2a";
const INK = "#0c1510";

/** Instagram Story (1080x1920) promoting the Donnit x Luis Di Pietro podcast. */
export const StoryPodcast: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(130% 100% at 50% 18%, #1c3325 0%, ${INK} 60%, #06100b 100%)`,
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* subtle green glow top */}
      <AbsoluteFill
        style={{ background: "radial-gradient(60% 30% at 50% 8%, rgba(143,214,120,0.22) 0%, rgba(0,0,0,0) 70%)" }}
      />

      {/* top row: NUEVO EPISODIO + Donnit */}
      <div style={{ position: "absolute", top: 96, left: 70, right: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: COLORS.green, color: INK, fontWeight: 800, fontSize: 40, padding: "12px 30px", borderRadius: 999 }}>
          <span style={{ width: 16, height: 16, borderRadius: 999, background: RED, boxShadow: `0 0 0 6px rgba(225,29,42,0.25)` }} />
          NUEVO EPISODIO
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Img src={staticFile("DonnitLogo.png")} style={{ width: 62, height: 62, borderRadius: 16 }} />
          <span style={{ fontWeight: 800, fontSize: 40, color: "#fff" }}>Donnit</span>
        </div>
      </div>

      {/* recreated thumbnail headline */}
      <div style={{ position: "absolute", top: 300, left: 70, right: 70 }}>
        <div style={{ fontWeight: 700, fontSize: 60, color: "#fff", letterSpacing: -0.5 }}>Así nació la app</div>
        <div style={{ display: "inline-block", background: RED, color: "#fff", fontWeight: 800, fontSize: 72, padding: "6px 20px", borderRadius: 8, marginTop: 14, transform: "rotate(-1deg)" }}>
          que evita que tiremos
        </div>
        <div style={{ marginTop: 18, fontWeight: 800, fontSize: 156, lineHeight: 0.98, color: "#fff", letterSpacing: -3, textShadow: "0 8px 30px rgba(0,0,0,0.6)" }}>
          MUEBLES<br />A LA BASURA
        </div>
      </div>

      {/* play + duration */}
      <div style={{ position: "absolute", top: 900, left: 70, right: 70, display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ width: 108, height: 108, borderRadius: 999, background: COLORS.green, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 14px 34px rgba(0,0,0,0.45)" }}>
          <div style={{ width: 0, height: 0, borderTop: "26px solid transparent", borderBottom: "26px solid transparent", borderLeft: `42px solid ${INK}`, marginLeft: 10 }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontWeight: 800, fontSize: 46, color: "#fff" }}>Episodio completo</span>
          <span style={{ fontWeight: 600, fontSize: 36, color: "rgba(255,255,255,0.7)" }}>1:12:27 · en YouTube</span>
        </div>
      </div>

      {/* episode title */}
      <div style={{ position: "absolute", top: 1120, left: 70, right: 70 }}>
        <div style={{ fontWeight: 800, fontSize: 56, color: "#fff", lineHeight: 1.12 }}>
          De un mueble en la calle a<br />una app para todo un barrio
        </div>
        <div style={{ marginTop: 16, fontWeight: 800, fontSize: 40, color: COLORS.green }}>Ep 01</div>
      </div>

      {/* hosts */}
      <div style={{ position: "absolute", top: 1420, left: 70, right: 70, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <div style={{ background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.2)", borderRadius: 999, padding: "14px 28px", fontWeight: 800, fontSize: 40, color: "#fff" }}>
          Marcos Elizondo
        </div>
        <span style={{ color: COLORS.green, fontWeight: 800, fontSize: 44 }}>×</span>
        <div style={{ background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.2)", borderRadius: 999, padding: "14px 28px", fontWeight: 800, fontSize: 40, color: "#fff" }}>
          Luis Di Pietro
        </div>
      </div>

      {/* CTA bottom */}
      <div style={{ position: "absolute", bottom: 120, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <div style={{ fontSize: 54, color: "#fff", opacity: 0.9 }}>⬆︎</div>
        <div style={{ background: "#fff", color: INK, fontWeight: 800, fontSize: 46, padding: "18px 44px", borderRadius: 999, boxShadow: "0 14px 34px rgba(0,0,0,0.4)" }}>
          Míralo completo · link arriba
        </div>
      </div>
    </AbsoluteFill>
  );
};
