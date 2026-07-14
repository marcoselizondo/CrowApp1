/**
 * Kinetic subtitles for the "with subs" variant of Video 2.
 * Times are LOCAL frames within each section (intro / explanation), matched to
 * Marcos's voice via silence detection. Word `s` (style) drives the effect:
 *   big = larger, green = green marker highlight, red = red, biggreen = both.
 */
export type Word = { t: string; s?: "big" | "green" | "red" | "biggreen" };
export type KCaption = { from: number; durationInFrames: number; words: Word[] };

const w = (t: string, s?: Word["s"]): Word => ({ t, s });

/** Intro section (base_intro, 10s): "Barcelona tiene un problema". */
export const INTRO_CAPTIONS: KCaption[] = [
  {
    from: 195,
    durationInFrames: 100,
    words: [w("Barcelona", "big"), w("tiene"), w("un"), w("problema", "red")],
  },
];

/** Explanation section (base_explain, 9.5s). */
export const EXPLAIN_CAPTIONS: KCaption[] = [
  {
    from: 0,
    durationInFrames: 72,
    words: [
      w("Miles"),
      w("de"),
      w("objetos"),
      w("terminan"),
      w("en"),
      w("la"),
      w("basura", "red"),
    ],
  },
  {
    from: 76,
    durationInFrames: 34,
    words: [w("como"), w("esta"), w("silla", "big")],
  },
  {
    from: 117,
    durationInFrames: 45,
    words: [w("Por"), w("eso"), w("construimos"), w("Donnit", "biggreen")],
  },
  {
    from: 162,
    durationInFrames: 34,
    words: [w("para"), w("dar"), w("y"), w("recibir", "green")],
  },
  {
    from: 198,
    durationInFrames: 64,
    words: [
      w("aquellas"),
      w("cosas"),
      w("que"),
      w("ya"),
      w("no"),
      w("usas", "green"),
    ],
  },
];
