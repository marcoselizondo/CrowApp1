import { fontFamily, loadFont } from "@remotion/google-fonts/DMSans";
import {
  fontFamily as balooFamily,
  loadFont as loadBaloo,
} from "@remotion/google-fonts/Baloo2";
import {
  fontFamily as antonFamily,
  loadFont as loadAnton,
} from "@remotion/google-fonts/Anton";

/**
 * Donnit brand tokens.
 *
 * Brand rule: GREEN is donation / impact / free. TURQUOISE is renting / paying.
 * Never mix them without a reason. This reel is a DONATION story, so it uses
 * the green accent throughout.
 */
export const COLORS = {
  // Donation / impact / free
  green: "#8fd678",
  greenDark: "#5aa845",
  // Renting / paying (kept here for reuse, not used in this donation reel)
  turquoise: "#52B788",
  // Neutrals
  ink: "#14261b",
  white: "#ffffff",
  cream: "#f4f7f0",
} as const;

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

const font = loadFont("normal", {
  weights: ["400", "500", "700", "800"],
});
// Chunky, rounded subtitle font (distinct from the typical viral reel look).
const baloo = loadBaloo("normal", { weights: ["700", "800"] });
// Heavy, condensed impact font for the cold open.
const anton = loadAnton("normal", { weights: ["400"] });

export const FONT_FAMILY = fontFamily; // brand default (DM Sans)
export const SUBTITLE_FONT = balooFamily; // Baloo 2 — kinetic subtitles
export const IMPACT_FONT = antonFamily; // Anton — cold-open title

export const waitForDonnitFonts = () =>
  Promise.all([
    font.waitUntilDone(),
    baloo.waitUntilDone(),
    anton.waitUntilDone(),
  ]);
