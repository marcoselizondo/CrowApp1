import { staticFile } from "remotion";

export const FPS = 30;
const C = (name: string) => staticFile(`reel-12/cut/${name}.mp4`);

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
  /** Treasure number for the counter; null = bonus beat (no counter/stamp). */
  idx: number | null;
  captions: KCaption[];
};

/** Día 2 scenes: plóter HP (hook) → cómoda → mesa → otra persona (bonus). */
export const SCENES: Scene[] = [
  {
    key: "ploter",
    idx: 1,
    clips: [{ src: C("ploter"), durationInFrames: 90 }],
    captions: [
      { from: 6, durationInFrames: 42, words: [w("Un"), w("plóter"), w("HP", "green")] },
      {
        from: 50,
        durationInFrames: 38,
        words: [w("tirado"), w("en"), w("la"), w("calle")],
        emoji: "🤯",
        emojiAt: 8,
      },
    ],
  },
  {
    key: "comoda",
    idx: 2,
    clips: [
      { src: C("comoda_find"), durationInFrames: 54 },
      { src: C("comoda_drawer"), durationInFrames: 84 },
    ],
    captions: [
      { from: 6, durationInFrames: 44, words: [w("Una"), w("cómoda"), w("blanca", "green")] },
      {
        from: 58,
        durationInFrames: 74,
        words: [w("y"), w("los"), w("cajones"), w("funcionan", "biggreen")],
        emoji: "😮",
        emojiAt: 30,
      },
    ],
  },
  {
    key: "mesa",
    idx: 3,
    clips: [{ src: C("mesa"), durationInFrames: 90 }],
    captions: [
      {
        from: 6,
        durationInFrames: 80,
        words: [w("Una"), w("mesa"), w("de"), w("madera"), w("maciza", "green")],
        emoji: "🪵",
        emojiAt: 16,
      },
    ],
  },
  {
    key: "otra",
    idx: null,
    clips: [{ src: C("otra"), durationInFrames: 90 }],
    captions: [
      { from: 6, durationInFrames: 40, words: [w("Y"), w("no"), w("soy"), w("el"), w("único", "bigred")] },
      {
        from: 48,
        durationInFrames: 40,
        words: [w("otro"), w("se"), w("lleva"), w("una"), w("igual")],
        emoji: "👀",
        emojiAt: 10,
      },
    ],
  },
];

/** Hook flashes. */
export const HOOK_CLIPS: string[] = [C("ploter"), C("comoda_drawer"), C("mesa"), C("otra")];
export const HOOK_FLASH = 11;
export const HOOK_DURATION = HOOK_CLIPS.length * HOOK_FLASH;

export const END_DURATION = 84;

export const SCENES_DURATION = SCENES.reduce(
  (a, s) => a + s.clips.reduce((b, c) => b + c.durationInFrames, 0),
  0,
);
export const TOTAL_DURATION = HOOK_DURATION + SCENES_DURATION + END_DURATION;

export const TOTAL_TREASURES = SCENES.filter((s) => s.idx !== null).length;
