import { staticFile } from "remotion";

export const FPS = 30;
const C = (name: string) => staticFile(`reel-16/cut/${name}.mp4`);

export type Word = {
  t: string;
  s?: "big" | "green" | "red" | "biggreen" | "bigred";
};
export type KCaption = {
  from: number;
  durationInFrames: number;
  words: Word[];
  emoji?: string;
  emojiAt?: number;
};
const w = (t: string, s?: Word["s"]): Word => ({ t, s });

export type Clip = { src: string; durationInFrames: number };
export type Scene = {
  key: string;
  clips: Clip[];
  idx: number | null;
  captions: KCaption[];
};

/** Día 5 (viral, POV nocturno): maderas → mimbre → somier → mesita (finale). */
export const SCENES: Scene[] = [
  {
    key: "maderas",
    idx: 1,
    clips: [{ src: C("maderas"), durationInFrames: 90 }],
    captions: [
      { from: 6, durationInFrames: 42, words: [w("Madera"), w("por"), w("todos"), w("lados", "biggreen")], emoji: "🪵", emojiAt: 8 },
      { from: 50, durationInFrames: 38, words: [w("y"), w("las"), w("TIRAN", "bigred")], emoji: "🤯", emojiAt: 8 },
    ],
  },
  {
    key: "mimbre",
    idx: 2,
    clips: [{ src: C("mimbre"), durationInFrames: 90 }],
    captions: [
      { from: 6, durationInFrames: 80, words: [w("Hasta"), w("un"), w("mueble"), w("de"), w("mimbre", "biggreen")], emoji: "✨", emojiAt: 16 },
    ],
  },
  {
    key: "somier",
    idx: 3,
    clips: [{ src: C("somier"), durationInFrames: 90 }],
    captions: [
      { from: 6, durationInFrames: 42, words: [w("¿Una"), w("cama"), w("ENTERA?", "bigred")], emoji: "😳", emojiAt: 8 },
      { from: 50, durationInFrames: 38, words: [w("el"), w("somier"), w("perfecto", "green")] },
    ],
  },
  {
    key: "mesita",
    idx: 4,
    clips: [{ src: C("mesita"), durationInFrames: 96 }],
    captions: [
      { from: 6, durationInFrames: 40, words: [w("Pero"), w("ESPERA…", "bigred")] },
      { from: 48, durationInFrames: 44, words: [w("una"), w("mesita"), w("con"), w("CAJONES", "biggreen")], emoji: "🤯", emojiAt: 10 },
    ],
  },
];

export const HOOK_CLIPS: string[] = [C("maderas"), C("mesita"), C("somier"), C("mimbre")];
export const HOOK_FLASH = 11;
export const HOOK_DURATION = HOOK_CLIPS.length * HOOK_FLASH;

export const END_DURATION = 90;

export const SCENES_DURATION = SCENES.reduce(
  (a, sc) => a + sc.clips.reduce((b, c) => b + c.durationInFrames, 0),
  0,
);
export const TOTAL_DURATION = HOOK_DURATION + SCENES_DURATION + END_DURATION;
export const TOTAL_TREASURES = SCENES.filter((sc) => sc.idx !== null).length;
