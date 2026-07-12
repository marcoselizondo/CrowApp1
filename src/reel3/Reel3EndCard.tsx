import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_FAMILY } from "../donnit/theme";
import { DonnitLogo } from "../donnit/Wordmark";
import { CTA_TEASER } from "./story3voice";

export const Reel3EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({ frame, fps, config: { damping: 200, mass: 0.7, stiffness: 110 } });
  const ctaPop = spring({ frame: frame - 12, fps, config: { damping: 200, mass: 0.8, stiffness: 120 } });

  const y = interpolate(pop, [0, 1], [30, 0]);
  const ctaScale = interpolate(ctaPop, [0, 1], [0.9, 1], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.green} 0%, ${COLORS.greenDark} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT_FAMILY,
        padding: "0 70px",
      }}
    >
      <div style={{ transform: `translateY(${y}px)`, opacity: pop, marginBottom: 44 }}>
        <div
          style={{
            fontWeight: 800,
            fontSize: 74,
            lineHeight: 1.08,
            color: COLORS.ink,
            textAlign: "center",
            letterSpacing: -1.5,
          }}
        >
          {CTA_TEASER}
        </div>
      </div>

      <div
        style={{
          background: COLORS.white,
          padding: 26,
          borderRadius: 52,
          boxShadow: "0 22px 54px rgba(20,38,27,0.28)",
          marginBottom: 34,
          transform: `scale(${ctaScale})`,
          opacity: ctaPop,
        }}
      >
        <DonnitLogo size={150} />
      </div>

      <div
        style={{
          transform: `scale(${ctaScale})`,
          opacity: ctaPop,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 86, color: COLORS.ink, letterSpacing: -2 }}>
          Descarga Donnit
        </div>
        <div style={{ marginTop: 18, fontWeight: 500, fontSize: 38, color: COLORS.ink, opacity: 0.85 }}>
          Gratis en App Store y Google Play
        </div>
      </div>
    </AbsoluteFill>
  );
};
