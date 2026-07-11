import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  Sequence,
  useCurrentFrame,
} from "remotion";
import { EndCard } from "../donnit/EndCard";
import { COLORS } from "../donnit/theme";
import { WaitForFonts } from "../donnit/WaitForFonts";
import { Wordmark } from "../donnit/Wordmark";
import { HookText } from "./HookText";
import { LowerThird } from "./LowerThird";
import {
  BASE,
  BROLL,
  CTA_DURATION,
  STORY_DURATION,
} from "./story2";

/** Base layer: Marcos talking, audio fades out at the very end. */
const BaseVideo: React.FC = () => (
  <OffthreadVideo
    src={BASE.src}
    volume={(f) =>
      interpolate(f, [BASE.durationInFrames - 18, BASE.durationInFrames], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    }
    style={{ width: "100%", height: "100%", objectFit: "cover" }}
  />
);

/** A b-roll overlay that fades in/out (soft cut) with a gentle push-in. */
const BrollClip: React.FC<{ src: string; durationInFrames: number }> = ({
  src,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 5, durationInFrames - 5, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const scale = interpolate(frame, [0, durationInFrames], [1.08, 1.0], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity }}>
      <AbsoluteFill style={{ transform: `scale(${scale})`, backgroundColor: "black" }}>
        <OffthreadVideo
          src={src}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Small logo chip that fades in at the very start and out. */
const LogoIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10, 70, 84], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{ alignItems: "center", justifyContent: "flex-start", opacity }}
    >
      <div
        style={{
          marginTop: 96,
          background: "rgba(20,38,27,0.4)",
          padding: "14px 30px",
          borderRadius: 999,
          backdropFilter: "blur(4px)",
        }}
      >
        <Wordmark size={46} />
      </div>
    </AbsoluteFill>
  );
};

export const Reel2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      <WaitForFonts>
        <Sequence durationInFrames={STORY_DURATION} name="story">
          <BaseVideo />

          {BROLL.map((b, i) => (
            <Sequence
              key={i}
              from={b.from}
              durationInFrames={b.durationInFrames}
              name={`broll-${i}`}
            >
              <BrollClip src={b.src} durationInFrames={b.durationInFrames} />
            </Sequence>
          ))}

          {/* Hook headline over the opening b-roll */}
          <Sequence durationInFrames={BROLL[0].durationInFrames} name="hook">
            <HookText />
          </Sequence>

          {/* Logo chip intro */}
          <LogoIntro />

          {/* Founder lower-third while Marcos is first on camera */}
          <Sequence from={100} durationInFrames={150} name="lower-third">
            <LowerThird />
          </Sequence>
        </Sequence>

        {/* CTA end card */}
        <Sequence from={STORY_DURATION} durationInFrames={CTA_DURATION} name="cta">
          <EndCard />
        </Sequence>
      </WaitForFonts>
    </AbsoluteFill>
  );
};
