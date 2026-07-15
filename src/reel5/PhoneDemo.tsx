import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../donnit/theme";

/** Phone mockup playing the real Donnit AI recording (photo → publica). */
const Phone: React.FC<{ scale: number; rot: number }> = ({ scale, rot }) => {
  const W = 470;
  const H = 980;
  return (
    <div
      style={{
        width: W,
        height: H,
        borderRadius: 68,
        background: "#0c0c0e",
        padding: 13,
        boxShadow: "0 46px 100px rgba(0,0,0,0.6)",
        transform: `scale(${scale}) rotate(${rot}deg)`,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 57,
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

/** Floating phone that demos the AI, popping in with a subtle green flash. */
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
  const floatY = Math.sin(frame / 18) * 15 * settle;
  const wobble =
    (Math.sin(frame / 26) * 4 - 3) * settle +
    interpolate(pop, [0, 1], [-10, 0]) * (1 - settle);
  const popY = interpolate(pop, [0, 1], [130, 0]);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: COLORS.green, opacity: flash }} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: out,
          transform: `translateY(${-170 + popY + floatY}px)`,
        }}
      >
        <Phone scale={popScale} rot={wobble} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
