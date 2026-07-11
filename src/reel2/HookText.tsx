import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY } from "../donnit/theme";
import { HOOK_LINE_1, HOOK_LINE_2 } from "./story2";

/**
 * Editorial hook headline over the opening b-roll. Kinetic "startup" style:
 * springs in, and a green marker wipes left-to-right behind the keyword.
 * (Not a speech subtitle — easy to remove if you'll add your own text.)
 */
export const HookText: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 200, mass: 0.8, stiffness: 110 },
  });
  const marker = spring({
    frame: frame - 10,
    fps,
    config: { damping: 200, mass: 0.6, stiffness: 90 },
  });
  const exit = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const y = interpolate(enter, [0, 1], [50, 0]);
  const scale = interpolate(enter, [0, 1], [0.86, 1]);
  const opacity = Math.min(enter, exit);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 250,
        display: "flex",
        justifyContent: "center",
        opacity,
        transform: `translateY(${y}px) scale(${scale}) rotate(-2.5deg)`,
      }}
    >
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: 800,
          fontSize: 88,
          lineHeight: 1.05,
          color: COLORS.white,
          textAlign: "center",
          letterSpacing: -2,
          textShadow: "0 6px 30px rgba(0,0,0,0.6)",
          maxWidth: 900,
          padding: "0 60px",
        }}
      >
        <div>{HOOK_LINE_1}</div>
        <div style={{ position: "relative", display: "inline-block" }}>
          {/* green marker wipe behind the keyword */}
          <span
            style={{
              position: "absolute",
              left: -14,
              right: -14,
              top: 8,
              bottom: 6,
              background: COLORS.green,
              borderRadius: 12,
              transform: `scaleX(${marker})`,
              transformOrigin: "left center",
              zIndex: 0,
            }}
          />
          <span style={{ position: "relative", zIndex: 1, color: COLORS.ink }}>
            {HOOK_LINE_2}
          </span>
        </div>
      </div>
    </div>
  );
};
