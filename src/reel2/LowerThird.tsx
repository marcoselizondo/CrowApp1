import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY } from "../donnit/theme";
import { DonnitLogo } from "../donnit/Wordmark";

/** Founder name tag that slides in from the left. */
export const LowerThird: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 200, mass: 0.7, stiffness: 130 },
  });
  const exit = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const x = interpolate(enter, [0, 1], [-460, 0]);
  const opacity = Math.min(enter, exit);

  return (
    <div
      style={{
        position: "absolute",
        left: 46,
        bottom: 300,
        transform: `translateX(${x}px)`,
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 18,
        background: "rgba(20,38,27,0.55)",
        backdropFilter: "blur(6px)",
        padding: "16px 26px 16px 16px",
        borderRadius: 999,
        border: `2px solid ${COLORS.green}`,
      }}
    >
      <DonnitLogo size={62} />
      <div
        style={{
          fontFamily: FONT_FAMILY,
          display: "flex",
          flexDirection: "column",
          lineHeight: 1.05,
        }}
      >
        <span style={{ color: COLORS.white, fontWeight: 800, fontSize: 40 }}>
          Marcos
        </span>
        <span style={{ color: COLORS.green, fontWeight: 600, fontSize: 26 }}>
          Fundador de Donnit
        </span>
      </div>
    </div>
  );
};
