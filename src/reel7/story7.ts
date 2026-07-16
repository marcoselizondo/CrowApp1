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
  tSit: seg("t_sit.mp4"),
  tMoment: seg("t_moment.mp4"),
  donnit: seg("donnit.mp4"),
  music: seg("music.mp3"),
} as const;

/** Límites de bloque (frames absolutos @30fps). */
export const B = {
  hook: [0, 54],
  evSilla: [54, 81],
  evPlantas: [81, 108],
  evObjetos: [108, 135],
  senor: [135, 187],
  tEstab: [187, 211],
  tPose: [211, 256],
  tSit: [256, 322], // chicos sentándose a hacerse fotos
  tMoment: [322, 467], // clímax — "we are from Argentina" en fr ~48 dentro del bloque
  donnit: [467, 596],
  end: [596, 674],
} as const;

/** Frame (local al bloque tMoment) donde arranca "we are from Argentina". */
export const ARG_REVEAL_LOCAL = 48;

export const TOTAL_DURATION = 674; // ~22.5 s
