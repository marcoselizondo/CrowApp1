import { staticFile } from "remotion";

export const FPS = 30;
const C = (name: string) => staticFile(`reel-11/cut/${name}.mp4`);

export type Clip = { src: string; durationInFrames: number };
export type Scene = {
  key: string;
  clips: Clip[];
  idx: number; // treasure number (1..4)
  emoji: string;
  label: string; // item name shown in sticker
  price: string; // stamp text
};

/** Ordered scenes: maleta (hero) → marco → aspiradora → inodoro (gag). */
export const SCENES: Scene[] = [
  {
    key: "maleta",
    idx: 1,
    emoji: "🧳",
    label: "Maleta de viaje",
    price: "GRATIS",
    clips: [
      { src: C("maleta_reveal"), durationInFrames: 54 },
      { src: C("maleta_take"), durationInFrames: 120 },
    ],
  },
  {
    key: "marco",
    idx: 2,
    emoji: "🖼️",
    label: "Pizarra de madera",
    price: "GRATIS",
    clips: [{ src: C("marco"), durationInFrames: 84 }],
  },
  {
    key: "aspiradora",
    idx: 3,
    emoji: "🧹",
    label: "Aspiradora sin cable",
    price: "GRATIS",
    clips: [{ src: C("aspiradora"), durationInFrames: 84 }],
  },
  {
    key: "inodoro",
    idx: 4,
    emoji: "🚽",
    label: "¿Hasta un baño?!",
    price: "GRATIS",
    clips: [{ src: C("inodoro"), durationInFrames: 99 }],
  },
];

/** Hook: rapid-fire flashes of each find. */
export const HOOK_CLIPS: string[] = [
  C("maleta_take"),
  C("inodoro"),
  C("aspiradora"),
  C("marco"),
];
export const HOOK_FLASH = 11; // frames per flash
export const HOOK_DURATION = HOOK_CLIPS.length * HOOK_FLASH;

export const END_DURATION = 78;

export const SCENES_DURATION = SCENES.reduce(
  (a, s) => a + s.clips.reduce((b, c) => b + c.durationInFrames, 0),
  0,
);
export const TOTAL_DURATION = HOOK_DURATION + SCENES_DURATION + END_DURATION;

export const TOTAL_TREASURES = SCENES.length;
