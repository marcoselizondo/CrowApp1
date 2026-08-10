import { staticFile } from "remotion";

export const FPS = 30;
const C = (name: string) => staticFile(`reel-13/cut/${name}.mp4`);

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

/** Día 3 scenes: lavadora → maleta (van 3) → cocinita → jackpot (finale). */
export const SCENES: Scene[] = [
  {
    key: "lavadora",
    idx: 1,
    clips: [{ src: C("lavadora"), durationInFrames: 90 }],
    captions: [
      { from: 6, durationInFrames: 42, words: [w("Una"), w("lavadora"), w("entera", "green")], emoji: "🤯", emojiAt: 8 },
      { from: 48, durationInFrames: 40, words: [w("y"), w("el"), w("tambor"), w("perfecto", "green")] },
    ],
  },
  {
    key: "maleta",
    idx: 2,
    clips: [{ src: C("maleta"), durationInFrames: 75 }],
    captions: [
      { from: 6, durationInFrames: 32, words: [w("Otra"), w("maleta"), w("más…")] },
      { from: 40, durationInFrames: 30, words: [w("ya"), w("van"), w("3", "bigred")], emoji: "🧳", emojiAt: 6 },
    ],
  },
  {
    key: "cocinita",
    idx: 3,
    clips: [{ src: C("cocinita"), durationInFrames: 90 }],
    captions: [
      { from: 6, durationInFrames: 80, words: [w("Una"), w("cocinita"), w("de"), w("juguete", "green")], emoji: "🎀", emojiAt: 16 },
    ],
  },
  {
    key: "jackpot",
    idx: 4,
    clips: [{ src: C("jackpot"), durationInFrames: 192 }],
    captions: [
      { from: 6, durationInFrames: 40, words: [w("En"), w("UNA", "bigred"), w("esquina…")] },
      { from: 50, durationInFrames: 44, words: [w("una"), w("estantería,"), w("un"), w("mueble…")] },
      { from: 104, durationInFrames: 40, words: [w("todo"), w("GRATIS", "green")], emoji: "💥", emojiAt: 6 },
      { from: 150, durationInFrames: 42, words: [w("¡y"), w("hasta"), w("un"), w("CUADRO!", "biggreen")], emoji: "🖼️", emojiAt: 8 },
    ],
  },
];

export const HOOK_CLIPS: string[] = [C("lavadora"), C("jackpot"), C("cocinita"), C("maleta")];
export const HOOK_FLASH = 11;
export const HOOK_DURATION = HOOK_CLIPS.length * HOOK_FLASH;

export const END_DURATION = 84;

export const SCENES_DURATION = SCENES.reduce(
  (a, s) => a + s.clips.reduce((b, c) => b + c.durationInFrames, 0),
  0,
);
export const TOTAL_DURATION = HOOK_DURATION + SCENES_DURATION + END_DURATION;
export const TOTAL_TREASURES = SCENES.filter((s) => s.idx !== null).length;
