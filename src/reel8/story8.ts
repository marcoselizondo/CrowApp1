import { staticFile } from "remotion";

export const FPS = 30;
export const SRC = {
  base: staticFile("reel-08/seg/base.mp4"),
} as const;

/** Cortes del vídeo (frames @30fps), a partir de la detección de escena. */
export const CUT = {
  s1: [0, 54], // mueble abriéndose — tapa el texto viejo con "ESTO LO TIRARON HOY"
  s2: [54, 72], // 3 sillas — ¡GRATIS!
  s3: [72, 95], // mueble viejo — No está roto
  s4: [95, 112], // bolos — no es basura
  s5: [112, 148], // hombre en el tacho — nadie lo vio
  s67: [148, 194], // (sin texto)
  s8: [194, 264], // habla
  s9: [264, 336], // habla
  s10: [336, 413], // habla (caja+silla)
  s11: [413, 472], // habla
  s12: [472, 564], // Barcelona — Usa Donnit / Ya en Barcelona
} as const;

export const VIDEO_END = 564; // 18.8 s
export const TOTAL_DURATION = 564 + 78; // + cierre (2.6 s) = 642 (~21.4 s)
