import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  Sequence,
  useCurrentFrame,
} from "remotion";
import { COLORS } from "../donnit/theme";
import { WaitForFonts } from "../donnit/WaitForFonts";
import { Reel3EndCard } from "./Reel3EndCard";
import { VOCaption } from "./VOCaption";
import {
  CAPTIONS,
  CTA_DURATION,
  CTA_FROM,
  MONTAGE,
  shotStarts,
  type Shot,
} from "./story3voice";

const ShotClip: React.FC<{ shot: Shot }> = ({ shot }) => {
  const frame = useCurrentFrame();
  const from = shot.zoom === "out" ? 1.09 : 1.0;
  const to = shot.zoom === "out" ? 1.0 : 1.09;
  const scale = interpolate(frame, [0, shot.durationInFrames], [from, to], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: "black", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <OffthreadVideo
          src={shot.src}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Flash: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 1, 5], [0.7, 0.45, 0], {
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ backgroundColor: "white", opacity }} />;
};

/** Subtle dark scrim at the bottom so captions stay legible over any footage. */
const CaptionScrim: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0) 52%)",
    }}
  />
);

export const Reel3Voice: React.FC = () => {
  const starts = shotStarts(MONTAGE);
  const flashAt = [starts[5]]; // hero reveal

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      <WaitForFonts>
        {/* Montage */}
        {MONTAGE.map((shot, i) => (
          <Sequence
            key={i}
            from={starts[i]}
            durationInFrames={shot.durationInFrames}
            name={`shot-${i}`}
          >
            <ShotClip shot={shot} />
          </Sequence>
        ))}

        {flashAt.map((f, i) => (
          <Sequence key={`flash-${i}`} from={f} durationInFrames={6}>
            <Flash />
          </Sequence>
        ))}

        {/* Scrim + captions over the montage */}
        <Sequence durationInFrames={CTA_FROM} name="captions">
          <CaptionScrim />
          {CAPTIONS.map((c, i) => (
            <Sequence key={i} from={c.from} durationInFrames={c.durationInFrames}>
              <VOCaption caption={c} />
            </Sequence>
          ))}
        </Sequence>

        {/* CTA */}
        <Sequence from={CTA_FROM} durationInFrames={CTA_DURATION} name="cta">
          <Reel3EndCard />
        </Sequence>
      </WaitForFonts>
    </AbsoluteFill>
  );
};
