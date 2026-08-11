import { staticFile } from "remotion";

export const FPS = 30;
const C = (name: string) => staticFile(`reel-14/cut/${name}.mp4`);

export type Word = { t: string; s?: "green" | "big" | "biggreen" };
export type KCaption = {
  from: number;
  durationInFrames: number;
  words: Word[];
  emoji?: string;
};
const w = (t: string, s?: Word["s"]): Word => ({ t, s });

export type Clip = { src: string; durationInFrames: number };
export type Scene = {
  key: string;
  clips: Clip[];
  captions: KCaption[];
};

/**
 * Día 4 — estilo POV natural (Ken Burns, cortes limpios, subtítulos limpios,
 * "GRATIS" discreto). Orden: sillas → muebles → lámpara → jackpot (fila).
 */
export const SCENES: Scene[] = [
  {
    key: "sillas",
    clips: [{ src: C("sillas"), durationInFrames: 96 }],
    captions: [
      // (el título "Día 4" va sobre esta escena; el subtítulo entra después)
      { from: 60, durationInFrames: 34, words: [w("Sillas"), w("de"), w("diseño", "green")], emoji: "💺" },
    ],
  },
  {
    key: "muebles",
    clips: [{ src: C("muebles"), durationInFrames: 90 }],
    captions: [
      { from: 6, durationInFrames: 80, words: [w("Muebles"), w("blancos,"), w("como"), w("nuevos", "green")] },
    ],
  },
  {
    key: "lampara",
    clips: [{ src: C("lampara"), durationInFrames: 90 }],
    captions: [
      { from: 6, durationInFrames: 80, words: [w("Una"), w("lámpara"), w("preciosa", "green")], emoji: "💡" },
    ],
  },
  {
    key: "jackpot",
    clips: [
      { src: C("jackpot_row"), durationInFrames: 105 },
      { src: C("jackpot_detail"), durationInFrames: 90 },
    ],
    captions: [
      { from: 6, durationInFrames: 44, words: [w("Y"), w("mira"), w("esta"), w("esquina…")] },
      { from: 54, durationInFrames: 46, words: [w("cómodas,"), w("cajones,"), w("todo"), w("gratis", "green")] },
      { from: 112, durationInFrames: 78, words: [w("hasta"), w("una"), w("mesita"), w("de"), w("madera", "green")], emoji: "🪵" },
    ],
  },
];

/** Hook title shown over the first scene. */
export const TITLE_LINE1 = "Día 4";
export const TITLE_LINE2 = "buscando cosas en Barcelona";

export const END_DURATION = 90;

export const SCENES_DURATION = SCENES.reduce(
  (a, s) => a + s.clips.reduce((b, c) => b + c.durationInFrames, 0),
  0,
);
export const TOTAL_DURATION = SCENES_DURATION + END_DURATION;
