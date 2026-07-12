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
import {
  BEAT,
  MONTAGE,
  MONTAGE_DURATION,
  CTA_DURATION,
  shotStarts,
  type Shot,
} from "./story3";

/** One montage shot with a punch-in/out zoom for energy. */
const ShotClip: React.FC<{ shot: Shot; durationInFrames: number }> = ({
  shot,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const from = shot.zoom === "out" ? 1.09 : 1.0;
  const to = shot.zoom === "out" ? 1.0 : 1.09;
  const scale = interpolate(frame, [0, durationInFrames], [from, to], {
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

/** Quick white flash for accent beats. */
const Flash: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 1, 5], [0.75, 0.5, 0], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: "white", opacity }} />
  );
};

export const Reel3: React.FC = () => {
  const starts = shotStarts(MONTAGE);
  // Accent flashes on the hero reveals and the landmark punch.
  const flashAt = [starts[5], starts[17], starts[18]].filter(
    (v) => v !== undefined,
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      <WaitForFonts>
        {/* Fast-cut montage */}
        {MONTAGE.map((shot, i) => {
          const dur = shot.beats * BEAT;
          return (
            <Sequence
              key={i}
              from={starts[i]}
              durationInFrames={dur}
              name={`shot-${i}`}
            >
              <ShotClip shot={shot} durationInFrames={dur} />
            </Sequence>
          );
        })}

        {/* Accent flashes */}
        {flashAt.map((f, i) => (
          <Sequence key={`flash-${i}`} from={f} durationInFrames={6}>
            <Flash />
          </Sequence>
        ))}

        {/* CTA */}
        <Sequence from={MONTAGE_DURATION} durationInFrames={CTA_DURATION} name="cta">
          <EndCard />
        </Sequence>
      </WaitForFonts>
    </AbsoluteFill>
  );
};
