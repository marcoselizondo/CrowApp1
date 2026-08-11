import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, SUBTITLE_FONT } from "../donnit/theme";
import type { KCaption, Word } from "./story14";

const BASE = 62;

const fillFor = (s?: Word["s"]) =>
  s === "green" || s === "biggreen" ? COLORS.green : "#fff";
const sizeFor = (s?: Word["s"]) =>
  s === "big" || s === "biggreen" ? BASE * 1.2 : BASE;

/** Clean, natural subtitle: whole line rises + fades in softly on a subtle pill. */
export const KineticCaption: React.FC<{ caption: KCaption }> = ({ caption }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame,
    fps,
    config: { damping: 22, mass: 0.6, stiffness: 110 },
  });
  const y = interpolate(enter, [0, 1], [26, 0]);
  const exit = interpolate(
    frame,
    [caption.durationInFrames - 8, caption.durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const opacity = Math.min(enter, exit);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 360,
        display: "flex",
        justifyContent: "center",
        padding: "0 80px",
        transform: `translateY(${y}px)`,
        opacity,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "6px 14px",
          background: "rgba(10,20,14,0.42)",
          backdropFilter: "blur(3px)",
          padding: "14px 30px",
          borderRadius: 26,
          fontFamily: SUBTITLE_FONT,
          textAlign: "center",
        }}
      >
        {caption.words.map((word, i) => (
          <span
            key={i}
            style={{
              fontSize: sizeFor(word.s),
              fontWeight: 800,
              lineHeight: 1.1,
              color: fillFor(word.s),
              textShadow: "0 3px 12px rgba(0,0,0,0.5)",
            }}
          >
            {word.t}
          </span>
        ))}
        {caption.emoji ? (
          <span style={{ fontSize: BASE * 1.1 }}>{caption.emoji}</span>
        ) : null}
      </div>
    </div>
  );
};
