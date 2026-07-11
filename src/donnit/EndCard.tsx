import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_FAMILY } from "./theme";
import { DonnitLogo } from "./Wordmark";

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame,
    fps,
    config: { damping: 200, mass: 0.7, stiffness: 110 },
  });
  const ctaPop = spring({
    frame: frame - 8,
    fps,
    config: { damping: 200, mass: 0.8, stiffness: 120 },
  });

  const logoY = interpolate(pop, [0, 1], [30, 0]);
  const ctaScale = interpolate(ctaPop, [0, 1], [0.9, 1], {
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.green} 0%, ${COLORS.greenDark} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* App icon on a white tile so it pops on the green background */}
      <div
        style={{
          transform: `translateY(${logoY}px)`,
          opacity: pop,
          marginBottom: 54,
          background: COLORS.white,
          padding: 30,
          borderRadius: 60,
          boxShadow: "0 24px 60px rgba(20,38,27,0.28)",
        }}
      >
        <DonnitLogo size={200} />
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
        <div
          style={{
            fontWeight: 800,
            fontSize: 92,
            color: COLORS.ink,
            letterSpacing: -2,
            textAlign: "center",
          }}
        >
          Descarga Donnit
        </div>
        <div
          style={{
            marginTop: 22,
            fontWeight: 500,
            fontSize: 40,
            color: COLORS.ink,
            opacity: 0.85,
          }}
        >
          Gratis en App Store y Google Play
        </div>

        <div
          style={{
            marginTop: 64,
            fontWeight: 700,
            fontSize: 36,
            color: COLORS.white,
            background: "rgba(20,38,27,0.18)",
            padding: "16px 34px",
            borderRadius: 999,
          }}
        >
          ♻️ Dona lo que no usas
        </div>
      </div>
    </AbsoluteFill>
  );
};
