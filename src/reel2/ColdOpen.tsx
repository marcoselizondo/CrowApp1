import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { IMPACT_FONT } from "../donnit/theme";

const RED = "#ff2e2e";

/** Black & white cold open with the problem stated in red. */
export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({
    frame: frame - 4,
    fps,
    config: { damping: 200, mass: 0.7, stiffness: 130 },
  });
  const underline = spring({
    frame: frame - 14,
    fps,
    config: { damping: 200, mass: 0.6, stiffness: 90 },
  });
  // fade the whole card out at the end so it cuts cleanly into the color hook
  const out = interpolate(
    frame,
    [durationInFrames - 6, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const scale = interpolate(enter, [0, 1], [0.9, 1]);
  const y = interpolate(enter, [0, 1], [30, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "black", opacity: out }}>
      {/* B&W footage */}
      <AbsoluteFill style={{ filter: "grayscale(1) contrast(1.1) brightness(0.72)" }}>
        <OffthreadVideo
          src={staticFile("reel-02/seg/broll_bcn.mp4")}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      {/* Vignette for drama */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(120% 80% at 50% 45%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      {/* Red headline */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            transform: `translateY(${y}px) scale(${scale})`,
            opacity: enter,
            textAlign: "center",
            padding: "0 70px",
          }}
        >
          <div
            style={{
              fontFamily: IMPACT_FONT,
              fontWeight: 400,
              fontSize: 132,
              lineHeight: 0.94,
              letterSpacing: 1,
              color: RED,
              textTransform: "uppercase",
              textShadow: "0 8px 34px rgba(0,0,0,0.65)",
            }}
          >
            Barcelona
            <br />
            tiene un
            <br />
            problema
          </div>
          {/* red underline that draws in */}
          <div
            style={{
              marginTop: 26,
              height: 12,
              width: 320,
              maxWidth: "70%",
              marginLeft: "auto",
              marginRight: "auto",
              background: RED,
              borderRadius: 999,
              transform: `scaleX(${underline})`,
              transformOrigin: "center",
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
