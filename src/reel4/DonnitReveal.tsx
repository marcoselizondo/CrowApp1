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

/** A phone mockup showing a real recording of the Donnit app. */
const Phone: React.FC<{ scale: number; rot: number }> = ({ scale, rot }) => {
  const W = 520;
  const H = 1080;
  return (
    <div
      style={{
        width: W,
        height: H,
        borderRadius: 74,
        background: "#0c0c0e",
        padding: 14,
        boxShadow: "0 40px 90px rgba(0,0,0,0.55)",
        transform: `scale(${scale}) rotate(${rot}deg)`,
      }}
    >
      {/* screen — real app screen recording */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 62,
          overflow: "hidden",
          background: "#000",
          position: "relative",
        }}
      >
        <OffthreadVideo
          src={staticFile("reel-04/seg/app_screen.mp4")}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

/** Green flash + phone mockup that punches in on the "Donnit" turn. */
export const DonnitReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const flash = interpolate(frame, [0, 2, 12], [0.85, 0.55, 0], {
    extrapolateRight: "clamp",
  });
  const pop = spring({
    frame: frame - 2,
    fps,
    config: { damping: 140, mass: 0.7, stiffness: 190 },
  });
  const out = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const scale = interpolate(pop, [0, 1], [0.25, 1]);
  const rot = interpolate(pop, [0, 1], [-10, -3]);
  const y = interpolate(pop, [0, 1], [120, 0]);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: COLORS.green, opacity: flash }} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: out,
          transform: `translateY(${y}px)`,
        }}
      >
        <Phone scale={scale} rot={rot} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
