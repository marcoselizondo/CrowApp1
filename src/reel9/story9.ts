import { staticFile } from "remotion";

export const FPS = 30;
const s = (name: string) => staticFile(`reel-09-final-arg-esp/seg/${name}.mp4`);

export type Shot = {
  src: string;
  durationInFrames: number;
  /** Mute ambient from this local frame (for the 1s stand-off silence). */
  muteFrom?: number;
};

/** Ordered narrative shots for the first cut (~21s). */
export const SHOTS: { key: string; shot: Shot }[] = [
  { key: "hook", shot: { src: s("hook_couch"), durationInFrames: 66 } },
  { key: "reads", shot: { src: s("esp_reads"), durationInFrames: 48 } },
  { key: "approach", shot: { src: s("approach"), durationInFrames: 54 } },
  { key: "standoff", shot: { src: s("standoff"), durationInFrames: 60, muteFrom: 30 } },
  { key: "handover", shot: { src: s("handover"), durationInFrames: 45 } },
  { key: "talk", shot: { src: s("giro_talk"), durationInFrames: 45 } },
  { key: "handshake", shot: { src: s("handshake"), durationInFrames: 33 } },
  { key: "hug", shot: { src: s("hug"), durationInFrames: 54 } },
  { key: "walks", shot: { src: s("luca_walks"), durationInFrames: 54 } },
  { key: "cable", shot: { src: s("esp_cable"), durationInFrames: 39 } },
  { key: "back", shot: { src: s("esp_back"), durationInFrames: 54 } },
];

export const APP_SEARCH = staticFile("reel-09-final-arg-esp/seg/app_search.mp4");

export const CTA_DURATION = 78;

export const SHOTS_DURATION = SHOTS.reduce(
  (a, x) => a + x.shot.durationInFrames,
  0,
);
export const TOTAL_DURATION = SHOTS_DURATION + CTA_DURATION;

/** Absolute start frame of each shot, keyed. */
export const starts: Record<string, number> = (() => {
  const out: Record<string, number> = {};
  let f = 0;
  for (const { key, shot } of SHOTS) {
    out[key] = f;
    f += shot.durationInFrames;
  }
  return out;
})();
