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
import { Reel3Voice } from "./reel3/Reel3Voice";
import { TOTAL_DURATION as REEL3_VOICE_DURATION } from "./reel3/story3voice";
import { Reel4 } from "./reel4/Reel4";
import { TOTAL_DURATION as REEL4_DURATION } from "./reel4/story4";
import { Reel5 } from "./reel5/Reel5";
import { TOTAL_DURATION as REEL5_DURATION } from "./reel5/story5";

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
        defaultProps={{ showSubs: false }}
      />
      <Composition
        id="DonnitReel2Subs"
        component={Reel2}
        durationInFrames={REEL2_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{ showSubs: true }}
      />
      <Composition
        id="DonnitReel3"
        component={Reel3}
        durationInFrames={REEL3_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="DonnitReel3Voice"
        component={Reel3Voice}
        durationInFrames={REEL3_VOICE_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="DonnitReel4"
        component={Reel4}
        durationInFrames={REEL4_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="DonnitReel5"
        component={Reel5}
        durationInFrames={REEL5_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
