import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { EndCard } from "../donnit/EndCard";
import { COLORS } from "../donnit/theme";
import { WaitForFonts } from "../donnit/WaitForFonts";
import { Wordmark } from "../donnit/Wordmark";
import { ColdOpen } from "./ColdOpen";
import { HookText } from "./HookText";
import { KineticCaption } from "./KineticCaption";
import { LowerThird } from "./LowerThird";
import { EXPLAIN_CAPTIONS, INTRO_CAPTIONS, type KCaption } from "./subtitles";
import {
  COLD_OPEN_DURATION,
  CTA_DURATION,
  EXPLAIN,
  EXPLAIN_BROLL,
  EXPLAIN_DURATION,
  HOOK_OVERLAY,
  INTRO,
  INTRO_DURATION,
  type Broll,
} from "./story2";

/** Bottom scrim so kinetic captions stay legible over any footage. */
const CaptionScrim: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.22) 28%, rgba(0,0,0,0) 48%)",
    }}
  />
);

/** Renders a set of kinetic captions (each in its own local Sequence). */
const Captions: React.FC<{ captions: KCaption[] }> = ({ captions }) => (
  <>
    <CaptionScrim />
    {captions.map((c, i) => (
      <Sequence key={i} from={c.from} durationInFrames={c.durationInFrames}>
        <KineticCaption caption={c} />
      </Sequence>
    ))}
  </>
);

/** Plays a base clip (video+audio) with short audio fades to smooth seams. */
const SectionBase: React.FC<{
  src: string;
  fadeOutFrames?: number;
}> = ({ src, fadeOutFrames = 4 }) => {
  const { durationInFrames } = useVideoConfig();
  return (
    <OffthreadVideo
      src={src}
      volume={(f) =>
        interpolate(
          f,
          [0, 3, durationInFrames - fadeOutFrames, durationInFrames],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        )
      }
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
};

/** A muted b-roll overlay that fades in/out with a gentle push-in. */
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
      <AbsoluteFill
        style={{ transform: `scale(${scale})`, backgroundColor: "black" }}
      >
        <OffthreadVideo
          src={src}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const BrollOverlay: React.FC<{ b: Broll }> = ({ b }) => (
  <Sequence from={b.from} durationInFrames={b.durationInFrames}>
    <BrollClip src={b.src} durationInFrames={b.durationInFrames} />
  </Sequence>
);

/** Small logo chip that fades in at the very start and out. */
const LogoIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10, 60, 74], [0, 1, 1, 0], {
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

export const Reel2: React.FC<{ showSubs?: boolean }> = ({ showSubs = false }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      <WaitForFonts>
        {/* COLD OPEN — B&W "Barcelona tiene un problema" en rojo */}
        <Sequence durationInFrames={COLD_OPEN_DURATION} name="cold-open">
          <ColdOpen />
        </Sequence>

        {/* SECTION 1 — intro: Marcos coloca la silla + "Barcelona tiene un problema" */}
        <Sequence
          from={COLD_OPEN_DURATION}
          durationInFrames={INTRO_DURATION}
          name="intro"
        >
          <SectionBase src={INTRO.src} />
          <BrollOverlay b={HOOK_OVERLAY} />
          <Sequence durationInFrames={HOOK_OVERLAY.durationInFrames} name="hook">
            <HookText />
          </Sequence>
          <LogoIntro />
          {showSubs ? <Captions captions={INTRO_CAPTIONS} /> : null}
        </Sequence>

        {/* SECTION 2 — explicación */}
        <Sequence
          from={COLD_OPEN_DURATION + INTRO_DURATION}
          durationInFrames={EXPLAIN_DURATION}
          name="explain"
        >
          <SectionBase src={EXPLAIN.src} fadeOutFrames={16} />
          {EXPLAIN_BROLL.map((b, i) => (
            <BrollOverlay key={i} b={b} />
          ))}
          <Sequence from={6} durationInFrames={150} name="lower-third">
            <LowerThird />
          </Sequence>
          {showSubs ? <Captions captions={EXPLAIN_CAPTIONS} /> : null}
        </Sequence>

        {/* CTA */}
        <Sequence
          from={COLD_OPEN_DURATION + INTRO_DURATION + EXPLAIN_DURATION}
          durationInFrames={CTA_DURATION}
          name="cta"
        >
          <EndCard />
        </Sequence>
      </WaitForFonts>
    </AbsoluteFill>
  );
};
