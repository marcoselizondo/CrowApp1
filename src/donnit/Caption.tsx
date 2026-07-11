import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY } from "./theme";
import type { Caption as CaptionType } from "./story";

/** Splits `text` around `accent`, returning parts so the accent can be styled. */
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

export const Caption: React.FC<{ caption: CaptionType }> = ({ caption }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Pop-in on enter
  const enter = spring({
    frame,
    fps,
    config: { damping: 200, mass: 0.6, stiffness: 120 },
  });
  // Fade out at the end of the caption's window
  const exit = interpolate(
    frame,
    [caption.durationInFrames - 8, caption.durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const translateY = interpolate(enter, [0, 1], [40, 0]);
  const opacity = Math.min(enter, exit);

  const parts = splitAccent(caption.text, caption.accent);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 470,
        display: "flex",
        justifyContent: "center",
        padding: "0 70px",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: 800,
          fontSize: 78,
          lineHeight: 1.12,
          textAlign: "center",
          color: COLORS.white,
          letterSpacing: -1,
          textShadow: "0 6px 26px rgba(0,0,0,0.55)",
          maxWidth: 940,
        }}
      >
        {parts.map((p, i) => (
          <span
            key={i}
            style={
              p.accent
                ? {
                    color: COLORS.ink,
                    background: COLORS.green,
                    borderRadius: 14,
                    padding: "0 14px",
                    boxDecorationBreak: "clone",
                    WebkitBoxDecorationBreak: "clone",
                  }
                : undefined
            }
          >
            {p.str}
          </span>
        ))}
      </div>
    </div>
  );
};
