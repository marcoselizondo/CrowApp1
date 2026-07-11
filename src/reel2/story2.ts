import { staticFile } from "remotion";

export const FPS = 30;
const sec = (s: number) => Math.round(s * FPS);

/** Section 1: Marcos places the chair + "Barcelona tiene un problema" (main 7–15s). */
export const INTRO = {
  src: staticFile("reel-02/seg/base_intro.mp4"),
  durationInFrames: sec(8),
};

/** Section 2: the explanation (main 55–64s). */
export const EXPLAIN = {
  src: staticFile("reel-02/seg/base_explain.mp4"),
  durationInFrames: sec(9),
};

export type Broll = { src: string; from: number; durationInFrames: number };

/** Opening visual hook (people sitting on the chair) laid over the intro. */
export const HOOK_OVERLAY: Broll = {
  src: staticFile("reel-02/seg/broll_hook.mp4"),
  from: 0,
  durationInFrames: sec(2.5),
};

/** B-roll laid over the explanation (local frames within that section). */
export const EXPLAIN_BROLL: Broll[] = [
  { src: staticFile("reel-02/seg/broll_bcn.mp4"), from: 0, durationInFrames: sec(2.2) }, // masks the cut into the explanation
  { src: staticFile("reel-02/seg/broll_people.mp4"), from: sec(5.6), durationInFrames: sec(2.8) }, // payoff: gente en la silla
];

export const INTRO_DURATION = INTRO.durationInFrames;
export const EXPLAIN_DURATION = EXPLAIN.durationInFrames;
export const CTA_DURATION = sec(4);
export const TOTAL_DURATION = INTRO_DURATION + EXPLAIN_DURATION + CTA_DURATION;

/** Editorial hook headline over the opening (not a speech caption). */
export const HOOK_LINE_1 = "¿Por qué todos quieren";
export const HOOK_LINE_2 = "foto con esta silla?";
