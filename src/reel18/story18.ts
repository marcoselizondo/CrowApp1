import { staticFile } from "remotion";

export const FPS = 30;
const C = (name: string) => staticFile(`reel-18/cut/${name}.mp4`);

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
export type Scene = { key: string; clips: Clip[]; idx: number | null; captions: KCaption[] };

/** Día 6: taburete → silla de oficina → nevera (pero espera) → coche de juguete. */
export const SCENES: Scene[] = [
  {
    key: "taburete",
    idx: 1,
    clips: [{ src: C("taburete"), durationInFrames: 90 }],
    captions: [
      { from: 6, durationInFrames: 42, words: [w("Un"), w("taburete"), w("de"), w("BAR", "biggreen")], emoji: "🪑", emojiAt: 8 },
      { from: 50, durationInFrames: 38, words: [w("y"), w("lo"), w("TIRAN", "bigred")], emoji: "🤯", emojiAt: 8 },
    ],
  },
  {
    key: "silla",
    idx: 2,
    clips: [{ src: C("silla"), durationInFrames: 90 }],
    captions: [
      { from: 6, durationInFrames: 42, words: [w("Una"), w("silla"), w("de"), w("OFICINA", "biggreen")], emoji: "💺", emojiAt: 10 },
      { from: 50, durationInFrames: 38, words: [w("necesita"), w("una"), w("limpieza…", "green")], emoji: "🧽", emojiAt: 8 },
    ],
  },
  {
    key: "nevera",
    idx: 3,
    clips: [{ src: C("nevera"), durationInFrames: 90 }],
    captions: [
      { from: 6, durationInFrames: 42, words: [w("Pero"), w("ESPERA…", "bigred")] },
      { from: 50, durationInFrames: 38, words: [w("¿una"), w("NEVERA?", "biggreen")], emoji: "😳", emojiAt: 8 },
    ],
  },
  {
    key: "coche",
    idx: 4,
    clips: [{ src: C("coche"), durationInFrames: 90 }],
    captions: [
      { from: 6, durationInFrames: 80, words: [w("y"), w("hasta"), w("un"), w("COCHE", "biggreen")], emoji: "🚗", emojiAt: 14 },
    ],
  },
];

export const HOOK_CLIPS: string[] = [C("taburete"), C("nevera"), C("coche"), C("silla")];
export const HOOK_FLASH = 11;
export const HOOK_DURATION = HOOK_CLIPS.length * HOOK_FLASH;

export const END_DURATION = 96;

export const SCENES_DURATION = SCENES.reduce(
  (a, s) => a + s.clips.reduce((b, c) => b + c.durationInFrames, 0),
  0,
);
export const TOTAL_DURATION = HOOK_DURATION + SCENES_DURATION + END_DURATION;
export const TOTAL_TREASURES = SCENES.filter((s) => s.idx !== null).length;
