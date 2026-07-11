import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Caption } from "./Caption";
import { CAPTIONS, END_CARD_DURATION, VIDEO_DURATION } from "./story";
import { ClipsTrack } from "./ClipsTrack";
import { EndCard } from "./EndCard";
import type { DonnitReelProps } from "./schema";
import { COLORS } from "./theme";
import { WaitForFonts } from "./WaitForFonts";
import { Wordmark } from "./Wordmark";

/** Dark gradient at the bottom so captions stay legible over any footage. */
const CaptionScrim: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 26%, rgba(0,0,0,0) 46%)",
    }}
  />
);

/** Small wordmark that fades in at the very start, then out. */
const IntroWordmark: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 10, 38, 48],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
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

export const DonnitReel: React.FC<DonnitReelProps> = ({
  musicSrc,
  musicVolume,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      <WaitForFonts>
        {/* --- Footage + captions --- */}
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
              <Caption caption={caption} />
            </Sequence>
          ))}
        </Sequence>

        {/* --- CTA end card --- */}
        <Sequence
          from={VIDEO_DURATION}
          durationInFrames={END_CARD_DURATION}
          name="cta"
        >
          <EndCard />
        </Sequence>

        {/* --- Optional background music --- */}
        {musicSrc ? (
          <Audio src={staticFile(musicSrc)} volume={musicVolume} />
        ) : null}
      </WaitForFonts>
    </AbsoluteFill>
  );
};
