import { staticFile } from "remotion";

export const FPS = 30;
const C = (name: string) => staticFile(`reel-14/cut/${name}.mp4`);

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

/** Día 4 (viral): sillas → muebles → lámpara → jackpot (fila de muebles). */
export const SCENES: Scene[] = [
  {
    key: "sillas",
    idx: 1,
    clips: [{ src: C("sillas"), durationInFrames: 90 }],
    captions: [
      { from: 6, durationInFrames: 42, words: [w("Sillas"), w("de"), w("diseño", "biggreen")], emoji: "💺", emojiAt: 8 },
      { from: 50, durationInFrames: 38, words: [w("en"), w("la"), w("calle", "bigred")] },
    ],
  },
  {
    key: "muebles",
    idx: 2,
    clips: [{ src: C("muebles"), durationInFrames: 90 }],
    captions: [
      { from: 6, durationInFrames: 80, words: [w("Muebles"), w("blancos,"), w("como"), w("nuevos", "biggreen")] },
    ],
  },
  {
    key: "lampara",
    idx: 3,
    clips: [{ src: C("lampara"), durationInFrames: 90 }],
    captions: [
      { from: 6, durationInFrames: 80, words: [w("Una"), w("lámpara"), w("preciosa", "green")], emoji: "💡", emojiAt: 16 },
    ],
  },
  {
    key: "jackpot",
    idx: 4,
    clips: [
      { src: C("jackpot_row"), durationInFrames: 105 },
      { src: C("jackpot_detail"), durationInFrames: 90 },
    ],
    captions: [
      { from: 6, durationInFrames: 42, words: [w("En"), w("UNA", "bigred"), w("esquina…")] },
      { from: 54, durationInFrames: 46, words: [w("cómodas,"), w("cajones…"), w("GRATIS", "green")] },
      { from: 112, durationInFrames: 78, words: [w("hasta"), w("una"), w("mesita", "biggreen")], emoji: "🪵", emojiAt: 10 },
    ],
  },
];

export const HOOK_CLIPS: string[] = [C("sillas"), C("jackpot_detail"), C("lampara"), C("muebles")];
export const HOOK_FLASH = 11;
export const HOOK_DURATION = HOOK_CLIPS.length * HOOK_FLASH;

export const END_DURATION = 90;

export const SCENES_DURATION = SCENES.reduce(
  (a, s) => a + s.clips.reduce((b, c) => b + c.durationInFrames, 0),
  0,
);
export const TOTAL_DURATION = HOOK_DURATION + SCENES_DURATION + END_DURATION;
export const TOTAL_TREASURES = SCENES.filter((s) => s.idx !== null).length;
