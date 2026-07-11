import { z } from "zod";

export const donnitReelSchema = z.object({
  /** Optional background music. Drop an mp3 in public/ and set e.g. "music.mp3". */
  musicSrc: z.string().default(""),
  /** Music volume 0–1. */
  musicVolume: z.number().min(0).max(1).default(0.85),
});

export type DonnitReelProps = z.infer<typeof donnitReelSchema>;
