import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  Sequence,
  useVideoConfig,
} from "remotion";
import { EndCard } from "../donnit/EndCard";
import { COLORS } from "../donnit/theme";
import { WaitForFonts } from "../donnit/WaitForFonts";
import { KineticCaption, type KCaption } from "./KineticCaption";
import { PhoneDemo } from "./PhoneDemo";
import {
  AI,
  AI_CAPS,
  CTA_DURATION,
  INTRO,
  INTRO_CAPS,
  INTRO_DURATION,
  PHONE_DURATION,
  PHONE_FROM,
} from "./story5";

const SectionBase: React.FC<{ src: string; fadeOutFrames?: number }> = ({
  src,
  fadeOutFrames = 3,
}) => {
  const { durationInFrames } = useVideoConfig();
  return (
    <OffthreadVideo
      src={src}
      volume={(f) =>
        interpolate(
          f,
          [0, 2, durationInFrames - fadeOutFrames, durationInFrames],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        )
      }
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
};

const Scrim: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0) 52%)",
    }}
  />
);

const Cap: React.FC<{ cap: KCaption }> = ({ cap }) => (
  <Sequence from={cap.from} durationInFrames={cap.durationInFrames}>
    <KineticCaption caption={cap} />
  </Sequence>
);

export const Reel5: React.FC = () => {
  let offset = 0;
  const introSequences = INTRO.map((clip) => {
    const from = offset;
    offset += clip.dur;
    return (
      <Sequence key={clip.key} from={from} durationInFrames={clip.dur} name={clip.key}>
        <SectionBase src={clip.src} />
        <Scrim />
        <Cap cap={INTRO_CAPS[clip.key]} />
      </Sequence>
    );
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      <WaitForFonts>
        {/* ===== Founders intro ===== */}
        {introSequences}

        {/* ===== AI feature + phone demo ===== */}
        <Sequence from={INTRO_DURATION} durationInFrames={AI.dur} name="ai">
          <SectionBase src={AI.src} fadeOutFrames={12} />
          <Scrim />
          {AI_CAPS.map((c, i) => (
            <Cap key={i} cap={c} />
          ))}
          <Sequence from={PHONE_FROM} durationInFrames={PHONE_DURATION}>
            <PhoneDemo />
          </Sequence>
        </Sequence>

        {/* ===== CTA ===== */}
        <Sequence
          from={INTRO_DURATION + AI.dur}
          durationInFrames={CTA_DURATION}
          name="cta"
        >
          <EndCard />
        </Sequence>
      </WaitForFonts>
    </AbsoluteFill>
  );
};
