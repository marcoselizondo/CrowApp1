import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../donnit/theme";
import { DonnitLogo } from "../donnit/Wordmark";

/** Green flash + logo stamp that punches in on the "Donnit" turn. */
export const DonnitReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const flash = interpolate(frame, [0, 2, 12], [0.85, 0.55, 0], {
    extrapolateRight: "clamp",
  });
  const pop = spring({
    frame: frame - 2,
    fps,
    config: { damping: 140, mass: 0.6, stiffness: 200 },
  });
  const out = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const scale = interpolate(pop, [0, 1], [0.3, 1]);
  const rot = interpolate(pop, [0, 1], [-12, 0]);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: COLORS.green, opacity: flash }} />
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", opacity: out }}
      >
        <div
          style={{
            transform: `scale(${scale}) rotate(${rot}deg)`,
            background: COLORS.white,
            padding: 30,
            borderRadius: 56,
            boxShadow: "0 24px 60px rgba(20,38,27,0.35)",
          }}
        >
          <DonnitLogo size={230} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
