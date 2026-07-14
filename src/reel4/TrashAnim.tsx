import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, IMPACT_FONT } from "../donnit/theme";

const OBJECTS = ["🪑", "🛋️", "🪞", "🧸", "📺", "🧥", "👟", "💡", "📚", "🎒"];

const BIN_Y = 1360;

const FallingObject: React.FC<{ emoji: string; x: number; delay: number }> = ({
  emoji,
  x,
  delay,
}) => {
  const frame = useCurrentFrame();
  const t = frame - delay;
  if (t < 0) return null;
  const fall = interpolate(t, [0, 26], [-260, BIN_Y], {
    extrapolateRight: "clamp",
  });
  const rot = interpolate(t, [0, 26], [0, 220]);
  const near = interpolate(t, [20, 30], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(t, [0, 3, 22, 30], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 0,
        fontSize: 120,
        transform: `translateY(${fall}px) rotate(${rot}deg) scale(${0.6 + near * 0.4})`,
        opacity,
      }}
    >
      {emoji}
    </div>
  );
};

/** "Miles de objetos" beat: a counter rockets up while objects drop into a bin. */
export const TrashAnim: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200, stiffness: 120 } });
  const out = interpolate(
    frame,
    [durationInFrames - 6, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const count = Math.round(
    interpolate(frame, [0, durationInFrames - 10], [0, 14200], {
      extrapolateRight: "clamp",
    }),
  );
  const counter = count.toLocaleString("es-ES");
  const binPop = spring({
    frame: frame - 2,
    fps,
    config: { damping: 180, stiffness: 160 },
  });

  return (
    <AbsoluteFill style={{ opacity: Math.min(enter, out) }}>
      <div
        style={{
          position: "absolute",
          top: 250,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: IMPACT_FONT,
          color: "#ff2e2e",
          textShadow: "0 8px 30px rgba(0,0,0,0.7)",
        }}
      >
        <div style={{ fontSize: 150, lineHeight: 1, letterSpacing: 1 }}>
          +{counter}
        </div>
        <div
          style={{
            fontSize: 54,
            color: COLORS.white,
            letterSpacing: 4,
            marginTop: 4,
          }}
        >
          OBJETOS A LA BASURA
        </div>
      </div>

      {OBJECTS.map((o, i) => (
        <FallingObject
          key={i}
          emoji={o}
          x={120 + (i % 5) * 180 + (i % 2 === 0 ? 20 : -20)}
          delay={6 + i * 5}
        />
      ))}

      <div
        style={{
          position: "absolute",
          top: BIN_Y - 40,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 190,
          transform: `scale(${interpolate(binPop, [0, 1], [0.7, 1])})`,
        }}
      >
        🗑️
      </div>
    </AbsoluteFill>
  );
};
