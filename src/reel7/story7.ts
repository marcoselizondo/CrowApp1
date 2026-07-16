import { staticFile } from "remotion";

export const FPS = 30;
const seg = (f: string) => staticFile(`reel-07/seg/${f}`);

export const SRC = {
  hook: seg("hook.mp4"),
  evSilla: seg("ev_silla.mp4"),
  evPlantas: seg("ev_plantas.mp4"),
  evObjetos: seg("ev_objetos.mp4"),
  senor: seg("senor.mp4"),
  tEstab: seg("t_estab.mp4"),
  tPose: seg("t_pose.mp4"),
  tMoment: seg("t_moment.mp4"),
  donnit: seg("donnit.mp4"),
} as const;

/** Límites de bloque (frames absolutos @30fps). */
export const B = {
  hook: [0, 54],
  evSilla: [54, 81],
  evPlantas: [81, 108],
  evObjetos: [108, 135],
  senor: [135, 187],
  tEstab: [187, 217],
  tPose: [217, 271],
  tMoment: [271, 416], // clímax — "we are from Argentina" en fr ~48 dentro del bloque
  donnit: [416, 545],
  end: [545, 623],
} as const;

/** Frame (local al bloque tMoment) donde arranca "we are from Argentina". */
export const ARG_REVEAL_LOCAL = 48;

export const TOTAL_DURATION = 623; // ~20.8 s
