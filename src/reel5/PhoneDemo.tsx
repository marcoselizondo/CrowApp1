import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_FAMILY } from "../donnit/theme";

const Phone: React.FC<{ scale: number; rot: number }> = ({ scale, rot }) => {
  const W = 520;
  const H = 1090;
  return (
    <div
      style={{
        width: W,
        height: H,
        borderRadius: 74,
        background: "#0c0c0e",
        padding: 14,
        boxShadow: "0 46px 100px rgba(0,0,0,0.62)",
        transform: `scale(${scale}) rotate(${rot}deg)`,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 62,
          overflow: "hidden",
          background: "#000",
        }}
      >
        <OffthreadVideo
          src={staticFile("reel-05/seg/app_ai.mp4")}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

// Twinkling sparkles around the phone (AI "magic").
const SPARKS = [
  { x: -320, y: -360, s: 70, p: 0 },
  { x: 300, y: -300, s: 90, p: 5 },
  { x: -360, y: 40, s: 58, p: 10 },
  { x: 350, y: 120, s: 76, p: 3 },
  { x: -300, y: 380, s: 64, p: 8 },
  { x: 320, y: 420, s: 82, p: 13 },
  { x: -120, y: -440, s: 54, p: 6 },
  { x: 150, y: 470, s: 60, p: 11 },
];

const Sparkles: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {SPARKS.map((sp, i) => {
        const tw = Math.abs(Math.sin((frame + sp.p * 6) / 9));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              transform: `translate(${sp.x}px, ${sp.y}px) scale(${0.5 + tw * 0.7})`,
              fontSize: sp.s,
              opacity: 0.25 + tw * 0.75,
              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.45))",
            }}
          >
            ✨
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/** Floating phone that demos the AI, with green flash, sparkles and a badge. */
export const PhoneDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const flash = interpolate(frame, [0, 2, 12], [0.6, 0.35, 0], {
    extrapolateRight: "clamp",
  });
  const pop = spring({
    frame: frame - 2,
    fps,
    config: { damping: 140, mass: 0.7, stiffness: 190 },
  });
  const out = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const popScale = interpolate(pop, [0, 1], [0.25, 1]);
  const settle = interpolate(frame, [6, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const floatY = Math.sin(frame / 18) * 14 * settle;
  const wobble =
    (Math.sin(frame / 26) * 3.5 - 2.5) * settle +
    interpolate(pop, [0, 1], [-9, 0]) * (1 - settle);
  const popY = interpolate(pop, [0, 1], [130, 0]);
  const badgePop = spring({ frame: frame - 12, fps, config: { damping: 160, stiffness: 180 } });

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: COLORS.green, opacity: flash }} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: out,
          transform: `translateY(${-120 + popY + floatY}px)`,
        }}
      >
        <Sparkles />
        <Phone scale={popScale} rot={wobble} />
        {/* Donnit AI badge */}
        <div
          style={{
            position: "absolute",
            top: 70,
            transform: `scale(${interpolate(badgePop, [0, 1], [0, 1])})`,
            fontFamily: FONT_FAMILY,
            fontWeight: 800,
            fontSize: 42,
            color: COLORS.ink,
            background: COLORS.green,
            padding: "12px 30px",
            borderRadius: 999,
            boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
          }}
        >
          ✨ Donnit AI
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
