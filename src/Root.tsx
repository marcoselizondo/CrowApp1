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
import { VecinoYaLoTiene } from "./reel6/vecino-ya-lo-tiene";
import { TOTAL_DURATION as REEL6_DURATION } from "./reel6/story6";
import { BcnTieneUnProblema } from "./reel7/bcn-tiene-un-problema";
import { TOTAL_DURATION as REEL7_DURATION } from "./reel7/story7";
import { EstoLoTiraronHoy } from "./reel8/esto-lo-tiraron-hoy";
import { TOTAL_DURATION as REEL8_DURATION } from "./reel8/story8";
import { Reel9 } from "./reel9/Reel9";
import { TOTAL_DURATION as REEL9_DURATION } from "./reel9/story9";
import { Reel10 } from "./reel10/Reel10";
import { TOTAL_DURATION as REEL10_DURATION } from "./reel10/story10";

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
      <Composition
        id="DonnitReel6"
        component={VecinoYaLoTiene}
        durationInFrames={REEL6_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="DonnitReel7"
        component={BcnTieneUnProblema}
        durationInFrames={REEL7_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="DonnitReel8"
        component={EstoLoTiraronHoy}
        durationInFrames={REEL8_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="DonnitReel9"
        component={Reel9}
        durationInFrames={REEL9_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="DonnitReel10"
        component={Reel10}
        durationInFrames={REEL10_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
