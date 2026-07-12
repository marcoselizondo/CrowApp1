import "./index.css";
import { Composition } from "remotion";
import { DonnitReel } from "./donnit/DonnitReel";
import { donnitReelSchema } from "./donnit/schema";
import { TOTAL_DURATION } from "./donnit/story";
import { FPS, HEIGHT, WIDTH } from "./donnit/theme";
import { Reel2 } from "./reel2/Reel2";
import { TOTAL_DURATION as REEL2_DURATION } from "./reel2/story2";
import { Reel3 } from "./reel3/Reel3";
import { TOTAL_DURATION as REEL3_DURATION } from "./reel3/story3";

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
      <Composition
        id="DonnitReel2"
        component={Reel2}
        durationInFrames={REEL2_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="DonnitReel3"
        component={Reel3}
        durationInFrames={REEL3_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
