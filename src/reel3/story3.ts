import { staticFile } from "remotion";

export const FPS = 30;
/** 128 BPM → one beat = 60/128 s ≈ 0.469 s ≈ 14 frames. */
export const BEAT = 14;

const clip = (n: number) => staticFile(`reel-03/seg/c${String(n).padStart(2, "0")}.mp4`);

export type Shot = { src: string; beats: number; zoom?: "in" | "out" };

/**
 * Fast-cut marketing montage, timed to a 128 BPM track (e.g. Fred again..
 * "Delilah"). Add the song from the start and the cuts land on the beat.
 * The hero shot (c14, the "ESTA COMUNIDAD HA SIDO SELECCIONADA" tag) is held
 * longer and shown twice.
 */
export const MONTAGE: Shot[] = [
  { src: clip(11), beats: 2, zoom: "in" }, // Casa Batlló — establishing
  { src: clip(13), beats: 2, zoom: "out" }, // calle al atardecer
  { src: clip(6), beats: 1, zoom: "in" }, // persona en el portal
  { src: clip(10), beats: 2, zoom: "in" }, // puerta modernista (Casa Batlló)
  { src: clip(4), beats: 1, zoom: "out" }, // etiqueta en mano
  { src: clip(14), beats: 3, zoom: "in" }, // HERO: la etiqueta
  { src: clip(1), beats: 1, zoom: "in" },
  { src: clip(5), beats: 1, zoom: "out" },
  { src: clip(2), beats: 1, zoom: "in" },
  { src: clip(17), beats: 1, zoom: "out" },
  { src: clip(16), beats: 1, zoom: "in" },
  { src: clip(7), beats: 1, zoom: "out" },
  { src: clip(8), beats: 1, zoom: "in" },
  { src: clip(3), beats: 1, zoom: "out" },
  { src: clip(9), beats: 1, zoom: "in" },
  { src: clip(5), beats: 1, zoom: "in" },
  { src: clip(17), beats: 1, zoom: "out" },
  { src: clip(11), beats: 1, zoom: "in" }, // landmark punch
  { src: clip(14), beats: 2, zoom: "in" }, // HERO reinforce
  { src: clip(15), beats: 1, zoom: "out" }, // etiqueta colgando
  { src: clip(16), beats: 2, zoom: "in" }, // etiqueta ya colocada
];

export const montageFrames = (m: Shot[]) =>
  m.reduce((acc, s) => acc + s.beats * BEAT, 0);

/** Absolute frame where each shot starts (for flash accents). */
export const shotStarts = (m: Shot[]) => {
  const starts: number[] = [];
  let f = 0;
  for (const s of m) {
    starts.push(f);
    f += s.beats * BEAT;
  }
  return starts;
};

export const MONTAGE_DURATION = montageFrames(MONTAGE);
export const CTA_DURATION = 4 * 30;
export const TOTAL_DURATION = MONTAGE_DURATION + CTA_DURATION;
