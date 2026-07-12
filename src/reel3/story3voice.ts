import { staticFile } from "remotion";

export const FPS = 30;
const clip = (n: number) =>
  staticFile(`reel-03/seg/c${String(n).padStart(2, "0")}.mp4`);

export type Shot = { src: string; durationInFrames: number; zoom?: "in" | "out" };

/**
 * "Room for voice-over" version of the montage. Holds are longer at the hook
 * and hero so the recorded lines fit; the middle stays fast. Cuts still sit on
 * a ~128 BPM feel (multiples of ~14f) where they can.
 */
export const MONTAGE: Shot[] = [
  // HOOK
  { src: clip(11), durationInFrames: 48, zoom: "in" },
  { src: clip(13), durationInFrames: 48, zoom: "out" },
  // BUILD
  { src: clip(6), durationInFrames: 34, zoom: "in" },
  { src: clip(4), durationInFrames: 34, zoom: "out" },
  { src: clip(1), durationInFrames: 34, zoom: "in" },
  // HERO (hold)
  { src: clip(14), durationInFrames: 90, zoom: "in" },
  // GIRO (fast)
  { src: clip(5), durationInFrames: 14, zoom: "out" },
  { src: clip(2), durationInFrames: 14, zoom: "in" },
  { src: clip(17), durationInFrames: 14, zoom: "out" },
  { src: clip(16), durationInFrames: 14, zoom: "in" },
  { src: clip(7), durationInFrames: 14, zoom: "out" },
  { src: clip(8), durationInFrames: 14, zoom: "in" },
  { src: clip(10), durationInFrames: 14, zoom: "out" },
  { src: clip(3), durationInFrames: 14, zoom: "in" },
  { src: clip(9), durationInFrames: 14, zoom: "out" },
  { src: clip(15), durationInFrames: 14, zoom: "in" },
  { src: clip(11), durationInFrames: 14, zoom: "in" },
  { src: clip(16), durationInFrames: 14, zoom: "in" },
];

export const shotStarts = (m: Shot[]) => {
  const starts: number[] = [];
  let f = 0;
  for (const s of m) {
    starts.push(f);
    f += s.durationInFrames;
  }
  return starts;
};

export const MONTAGE_DURATION = MONTAGE.reduce(
  (a, s) => a + s.durationInFrames,
  0,
);

/** On-screen phrases (also the VO script to record). */
export type VOCaption = {
  from: number;
  durationInFrames: number;
  text: string;
  accent?: string;
};

export const CAPTIONS: VOCaption[] = [
  { from: 6, durationInFrames: 84, text: "En Barcelona está pasando algo raro…", accent: "algo raro" },
  { from: 96, durationInFrames: 96, text: "Alguien deja etiquetas verdes en los portales", accent: "etiquetas verdes" },
  { from: 198, durationInFrames: 90, text: "«Esta comunidad ha sido seleccionada»", accent: "seleccionada" },
  { from: 300, durationInFrames: 66, text: "No es lujo. Es lo contrario:", accent: "lo contrario" },
  { from: 372, durationInFrames: 84, text: "segunda vida a lo que ya no usas", accent: "segunda vida" },
];

export const CTA_FROM = MONTAGE_DURATION;
export const CTA_DURATION = 5 * FPS;
export const TOTAL_DURATION = MONTAGE_DURATION + CTA_DURATION;

export const CTA_TEASER = "Tu barrio podría ser el próximo";
