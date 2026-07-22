import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, SUBTITLE_FONT } from "../donnit/theme";
import type { KCaption, Word } from "./story10";

const RED = "#ff3b30";
const BASE = 66;
const STAGGER = 3; // frames between each word appearing

const isBig = (s?: Word["s"]) =>
  s === "big" || s === "biggreen" || s === "bigred";
const sizeFor = (s?: Word["s"]) => (isBig(s) ? BASE * 1.42 : BASE);

/** One word with its own pop-in and emphasis style. */
const WordSpan: React.FC<{ word: Word; index: number }> = ({ word, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({
    frame: frame - index * STAGGER,
    fps,
    config: { damping: 200, mass: 0.5, stiffness: 140 },
  });
  const scale = interpolate(appear, [0, 1], [0.5, 1]);
  const y = interpolate(appear, [0, 1], [26, 0]);
  const green = word.s === "green" || word.s === "biggreen";
  const red = word.s === "red" || word.s === "bigred";
  // Positive words get a green marker, negative ones the same marker in red.
  const marker = green ? COLORS.green : red ? RED : undefined;

  return (
    <span
      style={{
        display: "inline-block",
        transform: `translateY(${y}px) scale(${scale})`,
        opacity: appear,
        fontSize: sizeFor(word.s),
        fontWeight: 800,
        lineHeight: 1.05,
        color: marker ? (red ? COLORS.white : COLORS.ink) : COLORS.white,
        background: marker,
        borderRadius: marker ? 14 : undefined,
        padding: marker ? "0 16px" : undefined,
        margin: "0 2px",
        textShadow: marker ? "none" : "0 6px 26px rgba(0,0,0,0.6)",
      }}
    >
      {word.t}
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
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 470,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px 4px",
        padding: "0 70px",
        fontFamily: SUBTITLE_FONT,
        textAlign: "center",
        opacity: exit,
      }}
    >
      {caption.words.map((word, i) => (
        <WordSpan key={i} word={word} index={i} />
      ))}
    </div>
  );
};
