import { staticFile } from "remotion";

export const FPS = 30;
const sec = (s: number) => Math.round(s * FPS);
const S = (name: string) => staticFile(`reel-10/seg/${name}.mp4`);

/**
 * Video 10 — Luca (fundador) en el muelle de Barcelona.
 * Misma estructura que el de Marcos: cold open B&N + rojo, voz continua de Luca
 * como base, subtítulos kinéticos, tag de fundador y CTA.
 *
 * Tiempos sincronizados con la voz por detección de silencios/volumen (§7 CLAUDE.md).
 */

/** Cold open B&N: "Barcelona tiene un problema" en rojo. */
export const COLD_OPEN_DURATION = sec(2.4);

/** Sección 1 — plano abierto: se sienta, agarra la silla y se va. */
export const MAIN = {
  src: S("main"),
  durationInFrames: sec(10.5),
};

/** Sección 2 — primer plano: explica la app. */
export const CLOSING = {
  src: S("closing"),
  durationInFrames: sec(6),
};

export const CTA_DURATION = sec(2.7);

export const TOTAL_DURATION =
  COLD_OPEN_DURATION + MAIN.durationInFrames + CLOSING.durationInFrames + CTA_DURATION;

export type Word = {
  t: string;
  s?: "big" | "green" | "red" | "biggreen" | "bigred";
};
export type KCaption = { from: number; durationInFrames: number; words: Word[] };
const w = (t: string, s?: Word["s"]): Word => ({ t, s });

/**
 * MAIN captions (local frames within seg/main.mp4, base recortada en el 10s).
 * Voz: "No hagas como el dueño de esta silla" (sentado) →
 *      "No lo tires" (agarra la silla) → "Donnit" (se va con ella).
 */
export const MAIN_CAPTIONS: KCaption[] = [
  {
    from: 26,
    durationInFrames: 62,
    words: [w("No"), w("hagas"), w("como"), w("el"), w("dueño")],
  },
  {
    from: 90,
    durationInFrames: 76,
    words: [w("de"), w("esta"), w("silla", "big")],
  },
  {
    from: 168,
    durationInFrames: 58,
    words: [w("No"), w("lo"), w("tires", "bigred")],
  },
  {
    from: 246,
    durationInFrames: 64,
    words: [w("Donnit", "biggreen")],
  },
];

/**
 * CLOSING captions (local frames within seg/closing.mp4, base recortada en el 2.5s).
 * Voz: "Con Donnit simplemente le sacas una foto y aparecerá disponible
 *       para todos los vecinos de tu barrio".
 */
export const CLOSING_CAPTIONS: KCaption[] = [
  {
    from: 2,
    durationInFrames: 42,
    words: [w("Con"), w("Donnit", "green")],
  },
  {
    from: 44,
    durationInFrames: 52,
    words: [w("le"), w("sacas"), w("una"), w("foto", "biggreen")],
  },
  {
    from: 98,
    durationInFrames: 34,
    words: [w("y"), w("aparece"), w("disponible")],
  },
  {
    from: 134,
    durationInFrames: 44,
    words: [w("para"), w("los"), w("vecinos"), w("de"), w("tu"), w("barrio", "green")],
  },
];
