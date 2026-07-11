import { fontFamily, loadFont } from "@remotion/google-fonts/DMSans";

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

export const FONT_FAMILY = fontFamily;

export const waitForDonnitFonts = () => font.waitUntilDone();
