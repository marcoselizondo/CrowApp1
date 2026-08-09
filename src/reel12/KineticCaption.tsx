import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, SUBTITLE_FONT } from "../donnit/theme";
import type { KCaption, Word } from "./story12";

const RED = "#ff3b30";
const BASE = 78;
const STAGGER = 3;
const STROKE = "7px #0a140e";

const isBig = (s?: Word["s"]) =>
  s === "big" || s === "biggreen" || s === "bigred";
const sizeFor = (s?: Word["s"]) => (isBig(s) ? BASE * 1.32 : BASE);
const fillFor = (s?: Word["s"]) => {
  if (s === "green" || s === "biggreen") return COLORS.green;
  if (s === "red" || s === "bigred") return RED;
  return "#fff";
};

const WordSpan: React.FC<{ word: Word; index: number }> = ({ word, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({
    frame: frame - index * STAGGER,
    fps,
    config: { damping: 11, mass: 0.6, stiffness: 130, overshootClamping: false },
  });
  const scale = interpolate(appear, [0, 1], [0.2, 1]);
  const key = word.s && word.s !== "big";
  return (
    <span
      style={{
        display: "inline-block",
        transform: `scale(${scale}) rotate(${key ? -2 : 0}deg)`,
        fontSize: sizeFor(word.s),
        fontWeight: 800,
        lineHeight: 1.02,
        color: fillFor(word.s),
        WebkitTextStroke: STROKE,
        paintOrder: "stroke fill",
        textShadow: "0 6px 0 rgba(10,20,14,0.32), 0 12px 22px rgba(0,0,0,0.4)",
        margin: "0 6px",
      }}
    >
      {word.t}
    </span>
  );
};

const EmojiPop: React.FC<{ emoji: string; at: number }> = ({ emoji, at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({
    frame: frame - at,
    fps,
    config: { damping: 9, mass: 0.5, stiffness: 150, overshootClamping: false },
  });
  const scale = interpolate(pop, [0, 1], [0, 1]);
  const wiggle = Math.sin(frame / 14) * 4;
  return (
    <span
      style={{
        display: "inline-block",
        transform: `scale(${scale}) rotate(${wiggle}deg)`,
        fontSize: BASE * 1.4,
        margin: "0 6px",
        filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.5))",
      }}
    >
      {emoji}
    </span>
  );
};

export const KineticCaption: React.FC<{ caption: KCaption }> = ({ caption }) => {
  const frame = useCurrentFrame();
  const exit = interpolate(
    frame,
    [caption.durationInFrames - 7, caption.durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const emojiAt = caption.emojiAt ?? caption.words.length * STAGGER + 6;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 430,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "14px 2px",
        padding: "0 60px",
        fontFamily: SUBTITLE_FONT,
        textTransform: "uppercase",
        letterSpacing: 1,
        textAlign: "center",
        opacity: exit,
      }}
    >
      {caption.words.map((word, i) => (
        <WordSpan key={i} word={word} index={i} />
      ))}
      {caption.emoji ? <EmojiPop emoji={caption.emoji} at={emojiAt} /> : null}
    </div>
  );
};
