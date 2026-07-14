import { staticFile } from "remotion";
import type { KCaption } from "./KineticCaption";

export const FPS = 30;

export const SEG = {
  baseA: { src: staticFile("reel-04/seg/base_a.mp4"), dur: 219 }, // (4) "Evitemos... miles de objetos... basura"
  baseB: { src: staticFile("reel-04/seg/base_b.mp4"), dur: 174 }, // (5) "Hemos creado Donnit..."
  baseC: { src: staticFile("reel-04/seg/base_c.mp4"), dur: 87 }, // (7) "Descárgala..."
  brollRescue: staticFile("reel-04/seg/broll_rescue.mp4"),
  brollTruck: staticFile("reel-04/seg/broll_truck.mp4"),
  brollTruck1: staticFile("reel-04/seg/broll_truck1.mp4"),
};

export const CTA_DURATION = 90;
export const TOTAL_DURATION =
  SEG.baseA.dur + SEG.baseB.dur + SEG.baseC.dur + CTA_DURATION;

// --- Section A captions (local frames within baseA) ---
export const CAPS_A: KCaption[] = [
  {
    from: 48,
    durationInFrames: 36,
    words: [
      { t: "Así" },
      { t: "como" },
      { t: "con" },
      { t: "esta" },
      { t: "silla", s: "big" },
    ],
  },
  {
    from: 84,
    durationInFrames: 30,
    words: [
      { t: "pasa" },
      { t: "con" },
      { t: "miles", s: "red" },
      { t: "de" },
      { t: "objetos", s: "red" },
    ],
  },
];

// --- Section B captions (local frames within baseB) ---
export const CAPS_B: KCaption[] = [
  {
    from: 50,
    durationInFrames: 40,
    words: [
      { t: "para" },
      { t: "compartir", s: "green" },
      { t: "los" },
      { t: "objetos" },
    ],
  },
  {
    from: 92,
    durationInFrames: 30,
    words: [{ t: "que" }, { t: "ya" }, { t: "no" }, { t: "usas", s: "green" }],
  },
  {
    from: 124,
    durationInFrames: 44,
    words: [
      { t: "con" },
      { t: "todos" },
      { t: "tus" },
      { t: "vecinos", s: "green" },
    ],
  },
];

// --- Section C captions (local frames within baseC) ---
export const CAPS_C: KCaption[] = [
  {
    from: 8,
    durationInFrames: 30,
    words: [{ t: "Descárgala", s: "biggreen" }],
  },
  {
    from: 40,
    durationInFrames: 42,
    words: [
      { t: "y" },
      { t: "limpiemos" },
      { t: "la" },
      { t: "ciudad", s: "green" },
      { t: "juntos" },
    ],
  },
];
