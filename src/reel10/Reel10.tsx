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
import { KineticCaption } from "./KineticCaption";
import { LowerThird } from "./LowerThird";
import {
  CLOSING,
  CLOSING_CAPTIONS,
  COLD_OPEN_DURATION,
  CTA_DURATION,
  type KCaption,
  MAIN,
  MAIN_CAPTIONS,
} from "./story10";

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
const SectionBase: React.FC<{ src: string; fadeOutFrames?: number }> = ({
  src,
  fadeOutFrames = 5,
}) => {
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

/** Small logo chip that fades in at the very start and out. */
const LogoIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10, 56, 70], [0, 1, 1, 0], {
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

export const Reel10: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      <WaitForFonts>
        {/* COLD OPEN — B&N "Barcelona tiene un problema" en rojo */}
        <Sequence durationInFrames={COLD_OPEN_DURATION} name="cold-open">
          <ColdOpen />
        </Sequence>

        {/* SECCIÓN 1 — Luca sentado → agarra la silla → se va */}
        <Sequence
          from={COLD_OPEN_DURATION}
          durationInFrames={MAIN.durationInFrames}
          name="main"
        >
          <SectionBase src={MAIN.src} />
          <LogoIntro />
          <Sequence from={30} durationInFrames={130} name="lower-third">
            <LowerThird />
          </Sequence>
          <Captions captions={MAIN_CAPTIONS} />
        </Sequence>

        {/* SECCIÓN 2 — primer plano: explica la app */}
        <Sequence
          from={COLD_OPEN_DURATION + MAIN.durationInFrames}
          durationInFrames={CLOSING.durationInFrames}
          name="closing"
        >
          <SectionBase src={CLOSING.src} fadeOutFrames={12} />
          <Captions captions={CLOSING_CAPTIONS} />
        </Sequence>

        {/* CTA */}
        <Sequence
          from={COLD_OPEN_DURATION + MAIN.durationInFrames + CLOSING.durationInFrames}
          durationInFrames={CTA_DURATION}
          name="cta"
        >
          <EndCard />
        </Sequence>
      </WaitForFonts>
    </AbsoluteFill>
  );
};
