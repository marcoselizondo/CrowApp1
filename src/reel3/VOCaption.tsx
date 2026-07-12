import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY } from "../donnit/theme";
import type { VOCaption as VOCaptionType } from "./story3voice";

const splitAccent = (text: string, accent?: string) => {
  if (!accent) return [{ str: text, accent: false }];
  const idx = text.toLowerCase().indexOf(accent.toLowerCase());
  if (idx === -1) return [{ str: text, accent: false }];
  return [
    { str: text.slice(0, idx), accent: false },
    { str: text.slice(idx, idx + accent.length), accent: true },
    { str: text.slice(idx + accent.length), accent: false },
  ].filter((p) => p.str.length > 0);
};

/** Kinetic caption: pops in, green marker wipes behind the keyword. */
export const VOCaption: React.FC<{ caption: VOCaptionType }> = ({ caption }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 200, mass: 0.6, stiffness: 120 },
  });
  const marker = spring({
    frame: frame - 6,
    fps,
    config: { damping: 200, mass: 0.6, stiffness: 90 },
  });
  const exit = interpolate(
    frame,
    [durationInFrames - 7, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const y = interpolate(enter, [0, 1], [40, 0]);
  const opacity = Math.min(enter, exit);
  const parts = splitAccent(caption.text, caption.accent);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 360,
        display: "flex",
        justifyContent: "center",
        padding: "0 70px",
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: 800,
          fontSize: 74,
          lineHeight: 1.14,
          textAlign: "center",
          color: COLORS.white,
          letterSpacing: -1,
          textShadow: "0 6px 28px rgba(0,0,0,0.65)",
          maxWidth: 940,
        }}
      >
        {parts.map((p, i) =>
          p.accent ? (
            <span key={i} style={{ position: "relative", display: "inline-block" }}>
              <span
                style={{
                  position: "absolute",
                  left: -12,
                  right: -12,
                  top: 6,
                  bottom: 4,
                  background: COLORS.green,
                  borderRadius: 12,
                  transform: `scaleX(${marker})`,
                  transformOrigin: "left center",
                  zIndex: 0,
                }}
              />
              <span style={{ position: "relative", zIndex: 1, color: COLORS.ink }}>
                {p.str}
              </span>
            </span>
          ) : (
            <span key={i}>{p.str}</span>
          ),
        )}
      </div>
    </div>
  );
};
