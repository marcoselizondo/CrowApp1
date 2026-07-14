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
import { DonnitReveal } from "./DonnitReveal";
import { ImpactTitle, IMPACT_RED } from "./ImpactTitle";
import { KineticCaption, type KCaption } from "./KineticCaption";
import { CAPS_A, CAPS_B, CAPS_C, CTA_DURATION, SEG } from "./story4";
import { TrashAnim } from "./TrashAnim";

/** Base clip (video+audio) with audio fades and an optional gritty grade. */
const SectionBase: React.FC<{
  src: string;
  fadeOutFrames?: number;
  cool?: boolean;
}> = ({ src, fadeOutFrames = 5, cool = false }) => {
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        filter: cool ? "saturate(0.82) contrast(1.08) brightness(0.98)" : undefined,
      }}
    >
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
    </AbsoluteFill>
  );
};

const BrollClip: React.FC<{ src: string }> = ({ src }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opacity = interpolate(
    frame,
    [0, 4, durationInFrames - 4, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const scale = interpolate(frame, [0, durationInFrames], [1.06, 1.0], {
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

const Scrim: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0) 52%)",
    }}
  />
);

const Caps: React.FC<{ caps: KCaption[] }> = ({ caps }) => (
  <>
    {caps.map((c, i) => (
      <Sequence key={i} from={c.from} durationInFrames={c.durationInFrames}>
        <KineticCaption caption={c} />
      </Sequence>
    ))}
  </>
);

export const Reel4: React.FC = () => {
  const secBFrom = SEG.baseA.dur;
  const secCFrom = SEG.baseA.dur + SEG.baseB.dur;
  const ctaFrom = secCFrom + SEG.baseC.dur;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      <WaitForFonts>
        {/* ===== SECTION A — el problema ===== */}
        <Sequence durationInFrames={SEG.baseA.dur} name="secA">
          <SectionBase src={SEG.baseA.src} cool />
          <Sequence from={0} durationInFrames={50}>
            <BrollClip src={SEG.brollRescue} />
          </Sequence>
          <Sequence from={115} durationInFrames={74}>
            <BrollClip src={SEG.brollTruck} />
          </Sequence>
          <Scrim />
          <Caps caps={CAPS_A} />
          <Sequence from={4} durationInFrames={46}>
            <ImpactTitle
              lines={["EVITEMOS", "QUE ESTO PASE"]}
              icon="⚠️"
              size={120}
            />
          </Sequence>
          <Sequence from={115} durationInFrames={74}>
            <TrashAnim />
          </Sequence>
          <Sequence from={188} durationInFrames={31}>
            <ImpactTitle
              lines={["TERMINAN EN", "LA BASURA"]}
              color={IMPACT_RED}
              size={124}
            />
          </Sequence>
        </Sequence>

        {/* ===== SECTION B — la solución (Donnit) ===== */}
        <Sequence from={secBFrom} durationInFrames={SEG.baseB.dur} name="secB">
          <SectionBase src={SEG.baseB.src} />
          <Scrim />
          <Caps caps={CAPS_B} />
          <Sequence from={0} durationInFrames={58}>
            <DonnitReveal />
          </Sequence>
        </Sequence>

        {/* ===== SECTION C — CTA voz ===== */}
        <Sequence from={secCFrom} durationInFrames={SEG.baseC.dur} name="secC">
          <SectionBase src={SEG.baseC.src} fadeOutFrames={14} />
          <Scrim />
          <Caps caps={CAPS_C} />
        </Sequence>

        {/* ===== CTA end card ===== */}
        <Sequence from={ctaFrom} durationInFrames={CTA_DURATION} name="cta">
          <EndCard />
        </Sequence>
      </WaitForFonts>
    </AbsoluteFill>
  );
};
