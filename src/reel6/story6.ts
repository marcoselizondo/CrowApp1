import { staticFile } from "remotion";

export const FPS = 30;
const seg = (f: string) => staticFile(`reel-06-vecino-ya-lo-tiene/seg/${f}`);

export const SRC = {
  amazon: seg("amazon.mp4"),
  donnit: seg("donnit.mp4"),
  chat: seg("chat.png"),
  entrega: seg("entrega.mp4"),
  ping: seg("ping.mp3"),
  music: seg("music.mp3"),
} as const;

// Precio real que aparece en el clip de Amazon.
export const PRECIO = "66€";

// Tiempos (frames @30fps).
export const T = {
  hookEnd: 75, // 0:00–0:02.5  hook (Amazon 66€)
  splitEnd: 240, // 0:02.5–0:08 split-screen (ping al entrar)
  chatEnd: 300, // 0:08–0:10   chat de coordinación
  entregaEnd: 354, // 0:10–0:11.8 entrega (sonrisa, sin objeto)
  resolutionEnd: 432, // 0:11.8–0:14.4 logo + claim
  end: 510, // 0:14.4–0:17 frame final (CTA)
} as const;

export const TOTAL_DURATION = T.end;
export const SPLIT_START = T.hookEnd;
