import { staticFile } from "remotion";

export const FPS = 30;
const s = (name: string) => staticFile(`reel-09-final-arg-esp/seg/${name}.mp4`);

export type Shot = {
  src: string;
  durationInFrames: number;
  /** Mute ambient within [muteFrom, muteTo) local frames (silence beat). */
  muteFrom?: number;
  muteTo?: number;
};

/** Ordered narrative shots. */
export const SHOTS: { key: string; shot: Shot }[] = [
  { key: "hook", shot: { src: s("hook_couch"), durationInFrames: 102 } },
  { key: "reads", shot: { src: s("esp_reads"), durationInFrames: 81 } },
  // Organic single-take encounter (t9 1.5-21): approach -> stand-off -> handover -> hug
  { key: "encounter", shot: { src: s("encounter"), durationInFrames: 585, muteFrom: 250, muteTo: 280 } },
  // Luca's exit (kept from the previous cut)
  { key: "walks", shot: { src: s("luca_walks"), durationInFrames: 54 } },
  // Bruno enters his building — the real "Vamos Argentina" sign is on his back
  { key: "bruno", shot: { src: s("bruno_enters"), durationInFrames: 165 } },
];

export const APP_SEARCH = staticFile("reel-09-final-arg-esp/seg/app_search.mp4");

/** Special sports-hype closing card. */
export const ENDING_DURATION = 120;

export const SHOTS_DURATION = SHOTS.reduce(
  (a, x) => a + x.shot.durationInFrames,
  0,
);
export const TOTAL_DURATION = SHOTS_DURATION + ENDING_DURATION;

export const starts: Record<string, number> = (() => {
  const out: Record<string, number> = {};
  let f = 0;
  for (const { key, shot } of SHOTS) {
    out[key] = f;
    f += shot.durationInFrames;
  }
  return out;
})();
