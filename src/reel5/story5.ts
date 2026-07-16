import { staticFile } from "remotion";
import type { KCaption } from "./KineticCaption";

export const FPS = 30;

/** Talking segments (video+audio), in order. */
export const INTRO = [
  { key: "marcos", src: staticFile("reel-05/seg/s_marcos.mp4"), dur: 48 },
  { key: "luca", src: staticFile("reel-05/seg/s_luca.mp4"), dur: 54 },
  { key: "founders", src: staticFile("reel-05/seg/s_founders.mp4"), dur: 54 },
  { key: "esto", src: staticFile("reel-05/seg/s_esto.mp4"), dur: 42 },
];

export const AI = { src: staticFile("reel-05/seg/s_ai.mp4"), dur: 267 };

export const CTA_DURATION = 90;

export const INTRO_DURATION = INTRO.reduce((a, s) => a + s.dur, 0);
export const TOTAL_DURATION = INTRO_DURATION + AI.dur + CTA_DURATION;

/** One caption per intro clip (local frames within each clip). */
export const INTRO_CAPS: Record<string, KCaption> = {
  marcos: {
    from: 4,
    durationInFrames: 42,
    words: [{ t: "Hola," }, { t: "soy" }, { t: "Marcos", s: "green" }],
  },
  luca: {
    from: 4,
    durationInFrames: 48,
    words: [{ t: "Y" }, { t: "yo" }, { t: "soy" }, { t: "Luca", s: "green" }],
  },
  founders: {
    from: 4,
    durationInFrames: 48,
    words: [
      { t: "Y" },
      { t: "somos" },
      { t: "los" },
      { t: "founders" },
      { t: "de" },
      { t: "Donnit", s: "green" },
    ],
  },
  esto: {
    from: 2,
    durationInFrames: 38,
    words: [{ t: "Esto" }, { t: "es" }, { t: "Donnit", s: "biggreen" }],
  },
};

/** AI-section captions (local frames within s_ai). */
export const AI_CAPS: KCaption[] = [
  {
    from: 3,
    durationInFrames: 26,
    words: [{ t: "Con" }, { t: "Donnit", s: "green" }],
  },
  {
    from: 30,
    durationInFrames: 40,
    words: [{ t: "sacas" }, { t: "una" }, { t: "foto", s: "big" }],
  },
  {
    from: 87,
    durationInFrames: 36,
    words: [
      { t: "nuestra" },
      { t: "IA", s: "biggreen" },
      { t: "lo" },
      { t: "analiza" },
    ],
  },
  {
    from: 130,
    durationInFrames: 52,
    words: [
      { t: "y" },
      { t: "completa" },
      { t: "la" },
      { t: "publicación", s: "green" },
    ],
  },
  {
    from: 200,
    durationInFrames: 58,
    words: [{ t: "por" }, { t: "vos", s: "green" }],
  },
];

/** Phone demo overlay window within the AI section. */
export const PHONE_FROM = 30;
export const PHONE_DURATION = AI.dur - 30;
