import { staticFile } from "remotion";

export const FPS = 30;
const sec = (s: number) => Math.round(s * FPS);

/** Marcos talking — the continuous audio + video spine. */
export const BASE = {
  src: staticFile("reel-02/seg/base_marcos.mp4"),
  durationInFrames: sec(23.3),
};

/** B-roll overlays (muted) layered on top of the base at these windows. */
export type Broll = {
  src: string;
  from: number;
  durationInFrames: number;
};

export const BROLL: Broll[] = [
  { src: staticFile("reel-02/seg/broll_hook.mp4"), from: 0, durationInFrames: sec(3.2) }, // hook: gente en la silla
  { src: staticFile("reel-02/seg/broll_bcn.mp4"), from: sec(7.5), durationInFrames: sec(3.4) }, // silla por Barcelona
  { src: staticFile("reel-02/seg/broll_chair.mp4"), from: sec(14.6), durationInFrames: sec(3.2) }, // silla sola en el muelle
  { src: staticFile("reel-02/seg/broll_people.mp4"), from: sec(19.6), durationInFrames: sec(3.0) }, // más gente
];

export const STORY_DURATION = BASE.durationInFrames;
export const CTA_DURATION = sec(4);
export const TOTAL_DURATION = STORY_DURATION + CTA_DURATION;

/** Optional hook headline shown over the opening b-roll (editorial, not a speech caption). */
export const HOOK_LINE_1 = "¿Por qué todos quieren";
export const HOOK_LINE_2 = "foto con esta silla?";
