import { staticFile } from "remotion";
import { FPS } from "./theme";

const sec = (s: number) => Math.round(s * FPS);

/**
 * The ordered video segments that make up the reel.
 * Each file was pre-normalized to 1080x1920 (see public/seg/).
 */
export type Segment = {
  src: string;
  durationInFrames: number;
};

const REEL = "reel-01-mueble/seg";

export const SEGMENTS: Segment[] = [
  { src: staticFile(`${REEL}/segA.mp4`), durationInFrames: sec(2.6) }, // hook: mueble por el pasillo
  { src: staticFile(`${REEL}/segB.mp4`), durationInFrames: sec(3.0) }, // vecino sonriendo, cargando
  { src: staticFile(`${REEL}/segC.mp4`), durationInFrames: sec(3.0) }, // subiendo, otro vecino
  { src: staticFile(`${REEL}/segD.mp4`), durationInFrames: sec(3.2) }, // plano héroe del mueble
  { src: staticFile(`${REEL}/segE.mp4`), durationInFrames: sec(3.0) }, // entrando al piso, la vecina
  { src: staticFile(`${REEL}/segF.mp4`), durationInFrames: sec(3.0) }, // colocándolo
  { src: staticFile(`${REEL}/segG.mp4`), durationInFrames: sec(3.5) }, // vecina + vecino sonriendo
];

export const VIDEO_DURATION = SEGMENTS.reduce(
  (acc, s) => acc + s.durationInFrames,
  0,
);

export const END_CARD_DURATION = sec(3.5);

export const TOTAL_DURATION = VIDEO_DURATION + END_CARD_DURATION;

/**
 * On-screen captions. `accent` (if present in `text`) is highlighted green.
 * Times are absolute frames from the start of the reel.
 */
export type Caption = {
  from: number;
  durationInFrames: number;
  text: string;
  accent?: string;
};

let cursor = 0;
const at = (durationInSec: number, text: string, accent?: string): Caption => {
  const from = cursor;
  const durationInFrames = sec(durationInSec);
  cursor += durationInFrames;
  return { from, durationInFrames, text, accent };
};

export const CAPTIONS: Caption[] = [
  at(2.6, "Esto iba a la basura", "a la basura"),
  at(3.0, "Una vecina lo encontró en la calle", "encontró"),
  at(3.0, "Y sus vecinos se lo subieron a casa", "vecinos"),
  at(3.2, "Lo que tú ya no usas…", "ya no usas"),
  at(3.0, "…a otro le cambia el día", "cambia el día"),
  at(3.0, "Economía circular, de barrio", "circular"),
  at(3.5, "Dona lo que no usas", "Dona"),
];
