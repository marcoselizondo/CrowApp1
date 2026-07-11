import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  Sequence,
  useCurrentFrame,
} from "remotion";
import { SEGMENTS } from "./story";

const ClipVideo: React.FC<{ src: string; durationInFrames: number }> = ({
  src,
  durationInFrames,
}) => {
  return (
    <OffthreadVideo
      src={src}
      endAt={durationInFrames}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
};

/** Applies a gentle Ken Burns zoom across the clip's local timeline. */
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

export const ClipsTrack: React.FC = () => {
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
              <ClipVideo src={seg.src} durationInFrames={seg.durationInFrames} />
            </ZoomWrapper>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
