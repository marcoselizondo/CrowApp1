import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLORS, SUBTITLE_FONT } from "../donnit/theme";
import { DonnitLogo } from "../donnit/Wordmark";

const RED = "#ff3b30";
const STROKE = "9px #0a140e";

/** Viral cover / thumbnail for the "vecina del mueble" reel (1080x1920 still). */
export const Cover: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a140e" }}>
      {/* Background photo: neighbor smiling, carrying the rescued furniture */}
      <Img
        src={staticFile("reel-01-mueble/seg/cover_bg.jpg")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Top + bottom scrims for legibility */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 46%, rgba(0,0,0,0.72) 78%, rgba(0,0,0,0.9) 100%)",
        }}
      />

      {/* Donnit logo chip (top-left) */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 60,
          display: "flex",
          alignItems: "center",
          gap: 18,
          background: "rgba(20,38,27,0.55)",
          border: `3px solid ${COLORS.green}`,
          padding: "12px 28px 12px 12px",
          borderRadius: 999,
          backdropFilter: "blur(4px)",
        }}
      >
        <DonnitLogo size={64} />
        <span
          style={{
            fontFamily: SUBTITLE_FONT,
            fontWeight: 800,
            fontSize: 44,
            color: COLORS.white,
          }}
        >
          Donnit
        </span>
      </div>

      {/* Curiosity kicker (top) */}
      <div
        style={{
          position: "absolute",
          top: 250,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: SUBTITLE_FONT,
          fontWeight: 800,
          fontSize: 60,
          textTransform: "uppercase",
          letterSpacing: 1,
          color: COLORS.white,
          WebkitTextStroke: "6px #0a140e",
          paintOrder: "stroke fill",
          textShadow: "0 6px 0 rgba(10,20,14,0.3)",
        }}
      >
        Esto iba a la
      </div>

      {/* Big headline */}
      <div
        style={{
          position: "absolute",
          top: 320,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 18,
          fontFamily: SUBTITLE_FONT,
          fontWeight: 800,
          fontSize: 190,
          lineHeight: 0.95,
          textTransform: "uppercase",
          letterSpacing: 1,
          color: RED,
          WebkitTextStroke: STROKE,
          paintOrder: "stroke fill",
          transform: "rotate(-3deg)",
          textShadow: "0 10px 0 rgba(10,20,14,0.35), 0 18px 34px rgba(0,0,0,0.5)",
        }}
      >
        <span>Basura</span>
        <span
          style={{
            fontSize: 150,
            WebkitTextStroke: "0",
            filter: "drop-shadow(0 10px 16px rgba(0,0,0,0.55))",
          }}
        >
          🗑️
        </span>
      </div>

      {/* Green payoff pill (bottom) */}
      <div
        style={{
          position: "absolute",
          bottom: 210,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: COLORS.green,
            color: COLORS.ink,
            fontFamily: SUBTITLE_FONT,
            fontWeight: 800,
            fontSize: 64,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            padding: "20px 44px",
            borderRadius: 999,
            transform: "rotate(-1.5deg)",
            boxShadow: "0 14px 34px rgba(0,0,0,0.45)",
          }}
        >
          Su barrio la rescató ♻️
        </div>
      </div>
    </AbsoluteFill>
  );
};
