import { staticFile } from "remotion";

export const FPS = 30;
const sec = (s: number) => Math.round(s * FPS);
const REEL = "reel-01-mueble/seg";

/**
 * Video 1 (la vecina del mueble) — versión VOZ EN OFF.
 * Mismo metraje que DonnitReel, pero MUDO y con subtítulos kinéticos que sirven
 * de guion: el usuario graba la voz leyendo estas frases y encaja.
 */
export type Segment = { src: string; durationInFrames: number };

export const SEGMENTS: Segment[] = [
  { src: staticFile(`${REEL}/segA.mp4`), durationInFrames: sec(2.6) }, // hook: mueble por el pasillo
  { src: staticFile(`${REEL}/segB.mp4`), durationInFrames: sec(3.0) }, // la vecina
  { src: staticFile(`${REEL}/segC.mp4`), durationInFrames: sec(3.0) }, // subiéndolo entre vecinos
  { src: staticFile(`${REEL}/segD.mp4`), durationInFrames: sec(3.2) }, // plano héroe del mueble
  { src: staticFile(`${REEL}/segE.mp4`), durationInFrames: sec(3.0) }, // entrando al piso
  { src: staticFile(`${REEL}/segF.mp4`), durationInFrames: sec(3.0) }, // colocándolo
  { src: staticFile(`${REEL}/segG.mp4`), durationInFrames: sec(3.5) }, // vecina + vecino sonriendo
];

export const VIDEO_DURATION = SEGMENTS.reduce(
  (a, s) => a + s.durationInFrames,
  0,
);
export const END_CARD_DURATION = sec(3.5);
export const TOTAL_DURATION = VIDEO_DURATION + END_CARD_DURATION;

export type Word = {
  t: string;
  s?: "big" | "green" | "red" | "biggreen" | "bigred";
};
export type KCaption = { from: number; durationInFrames: number; words: Word[] };
const w = (t: string, s?: Word["s"]): Word => ({ t, s });

/**
 * Guion de voz en off (frames absolutos). Una frase por plano, con aire para
 * narrar. Arco viral: hook → "wow" (desconocidos, sin dinero) → remate emotivo.
 */
export const CAPTIONS: KCaption[] = [
  // segA (0-78) — HOOK
  {
    from: 4,
    durationInFrames: 74,
    words: [w("Esto"), w("iba"), w("directo"), w("a"), w("la"), w("basura", "bigred")],
  },
  // segB (78-168)
  {
    from: 82,
    durationInFrames: 82,
    words: [w("Hasta"), w("que"), w("una"), w("vecina", "green"), w("lo"), w("vio")],
  },
  // segC (168-258) — el "wow"
  {
    from: 172,
    durationInFrames: 82,
    words: [
      w("Y"),
      w("tres"),
      w("desconocidos", "biggreen"),
      w("se"),
      w("lo"),
      w("subieron"),
    ],
  },
  // segD (258-354) — plano héroe
  {
    from: 262,
    durationInFrames: 88,
    words: [w("Nadie"), w("cobró"), w("un"), w("euro", "bigred")],
  },
  // segE (354-444)
  {
    from: 358,
    durationInFrames: 82,
    words: [w("Solo"), w("un"), w("barrio", "biggreen"), w("ayudándose")],
  },
  // segF (444-534)
  {
    from: 448,
    durationInFrames: 82,
    words: [w("Lo"), w("que"), w("tú"), w("ya"), w("no"), w("usas", "green")],
  },
  // segG (534-639) — remate emotivo
  {
    from: 538,
    durationInFrames: 97,
    words: [
      w("a"),
      w("otro"),
      w("le"),
      w("cambia"),
      w("la"),
      w("casa", "biggreen"),
    ],
  },
];
