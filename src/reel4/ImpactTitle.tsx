import {
  AbsoluteFill,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, IMPACT_FONT } from "../donnit/theme";

const RED = "#ff2e2e";

/**
 * Big Anton impact title that slams in with a shake — for the epic beats
 * ("EVITEMOS QUE ESTO PASE", "TERMINAN EN LA BASURA").
 */
export const ImpactTitle: React.FC<{
  lines: string[];
  color?: string;
  icon?: string;
  y?: number;
  size?: number;
}> = ({ lines, color = COLORS.white, icon, y = 0, size = 128 }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const slam = spring({
    frame,
    fps,
    config: { damping: 120, mass: 0.6, stiffness: 220 },
  });
  const out = interpolate(
    frame,
    [durationInFrames - 6, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const shakeAmt = interpolate(frame, [0, 10], [16, 0], {
    extrapolateRight: "clamp",
  });
  const dx = (random(`x${Math.floor(frame)}`) - 0.5) * shakeAmt;
  const dy = (random(`y${Math.floor(frame)}`) - 0.5) * shakeAmt;
  const scale = interpolate(slam, [0, 1], [1.4, 1]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: out,
        transform: `translate(${dx}px, ${dy + y}px)`,
      }}
    >
      <div style={{ transform: `scale(${scale})`, textAlign: "center" }}>
        {icon ? (
          <div style={{ fontSize: size * 0.7, marginBottom: 6 }}>{icon}</div>
        ) : null}
        {lines.map((l, i) => (
          <div
            key={i}
            style={{
              fontFamily: IMPACT_FONT,
              fontWeight: 400,
              fontSize: size,
              lineHeight: 0.94,
              letterSpacing: 1,
              color,
              textTransform: "uppercase",
              textShadow: "0 8px 34px rgba(0,0,0,0.7)",
            }}
          >
            {l}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const IMPACT_RED = RED;
