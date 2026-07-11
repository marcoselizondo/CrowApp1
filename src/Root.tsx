import "./index.css";
import { Composition } from "remotion";
import { DonnitReel } from "./donnit/DonnitReel";
import { donnitReelSchema } from "./donnit/schema";
import { TOTAL_DURATION } from "./donnit/story";
import { FPS, HEIGHT, WIDTH } from "./donnit/theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DonnitReel"
        component={DonnitReel}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        schema={donnitReelSchema}
        defaultProps={{
          musicSrc: "",
          musicVolume: 0.85,
        }}
      />
    </>
  );
};
