import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_FAMILY } from "../donnit/theme";
import { DonnitLogo } from "../donnit/Wordmark";

/** A phone mockup showing the Donnit app, popping in with a green flash. */
const Phone: React.FC<{ scale: number; rot: number }> = ({ scale, rot }) => {
  const W = 520;
  const H = 1080;
  return (
    <div
      style={{
        width: W,
        height: H,
        borderRadius: 74,
        background: "#0c0c0e",
        padding: 16,
        boxShadow: "0 40px 90px rgba(0,0,0,0.55)",
        transform: `scale(${scale}) rotate(${rot}deg)`,
      }}
    >
      {/* screen */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 60,
          overflow: "hidden",
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: FONT_FAMILY,
        }}
      >
        {/* dynamic island */}
        <div
          style={{
            position: "absolute",
            top: 26,
            width: 128,
            height: 34,
            borderRadius: 20,
            background: "#0c0c0e",
          }}
        />
        <DonnitLogo size={230} />
        <div
          style={{
            marginTop: 34,
            fontWeight: 800,
            fontSize: 78,
            letterSpacing: -2,
            color: COLORS.ink,
          }}
        >
          Donnit
        </div>
        <div
          style={{
            marginTop: 40,
            fontWeight: 700,
            fontSize: 34,
            color: COLORS.white,
            background: COLORS.green,
            padding: "16px 42px",
            borderRadius: 999,
          }}
        >
          Compartir
        </div>
      </div>
    </div>
  );
};

/** Green flash + phone mockup that punches in on the "Donnit" turn. */
export const DonnitReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const flash = interpolate(frame, [0, 2, 12], [0.85, 0.55, 0], {
    extrapolateRight: "clamp",
  });
  const pop = spring({
    frame: frame - 2,
    fps,
    config: { damping: 140, mass: 0.7, stiffness: 190 },
  });
  const out = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const scale = interpolate(pop, [0, 1], [0.25, 1]);
  const rot = interpolate(pop, [0, 1], [-10, -3]);
  const y = interpolate(pop, [0, 1], [120, 0]);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: COLORS.green, opacity: flash }} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: out,
          transform: `translateY(${y}px)`,
        }}
      >
        <Phone scale={scale} rot={rot} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
