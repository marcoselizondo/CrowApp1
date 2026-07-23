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
import { KineticCaption } from "./KineticCaption";
import {
  CAPTIONS,
  END_CARD_DURATION,
  SEGMENTS,
  VIDEO_DURATION,
} from "./story1voice";

/** Dark gradient at the bottom so captions stay legible over any footage. */
const CaptionScrim: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.24) 28%, rgba(0,0,0,0) 48%)",
    }}
  />
);

/** Gentle Ken Burns zoom across a clip's local timeline. */
const ZoomWrapper: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
}> = ({ durationInFrames, children }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, durationInFrames], [1.0, 1.06], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ transform: `scale(${scale})` }}>
      {children}
    </AbsoluteFill>
  );
};

/** Muted footage track (voice-over goes on top later). */
const ClipsTrack: React.FC = () => {
  let offset = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {SEGMENTS.map((seg, i) => {
        const from = offset;
        offset += seg.durationInFrames;
        return (
          <Sequence
            key={i}
            from={from}
            durationInFrames={seg.durationInFrames}
            name={`clip-${i}`}
          >
            <ZoomWrapper durationInFrames={seg.durationInFrames}>
              <OffthreadVideo
                src={seg.src}
                muted
                endAt={seg.durationInFrames}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </ZoomWrapper>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

/** Small wordmark that fades in at the very start, then out. */
const IntroWordmark: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10, 38, 48], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{ alignItems: "center", justifyContent: "flex-start", opacity }}
    >
      <div
        style={{
          marginTop: 90,
          background: "rgba(20,38,27,0.35)",
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

/** Video 1, voice-over edition: muted footage + kinetic subtitle script. */
export const Reel1Voice: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      <WaitForFonts>
        <Sequence durationInFrames={VIDEO_DURATION} name="story">
          <ClipsTrack />
          <CaptionScrim />
          <IntroWordmark />
          {CAPTIONS.map((caption, i) => (
            <Sequence
              key={i}
              from={caption.from}
              durationInFrames={caption.durationInFrames}
              name={`caption-${i}`}
            >
              <KineticCaption caption={caption} />
            </Sequence>
          ))}
        </Sequence>

        <Sequence
          from={VIDEO_DURATION}
          durationInFrames={END_CARD_DURATION}
          name="cta"
        >
          <EndCard />
        </Sequence>
      </WaitForFonts>
    </AbsoluteFill>
  );
};
