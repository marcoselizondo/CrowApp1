import { fontFamily, loadFont } from "@remotion/google-fonts/Poppins";

// Poppins — pedido explícito para este reel (el resto del repo usa DM Sans).
const poppins = loadFont("normal", { weights: ["500", "600", "700", "800"] });

export const POPPINS = fontFamily;
export const waitForReel6Fonts = () => poppins.waitUntilDone();

/** Paleta cálida y neutra (low-production, callejero, no corporativo). */
export const WARM = {
  bg: "#efe6d8", // crema cálido
  card: "#ffffff",
  ink: "#2a2521", // marrón muy oscuro (no negro puro)
  inkSoft: "#7a7064",
  pay: "#b23b2e", // terracota apagado = dinero/gasto
  green: "#5aa845", // Donnit / gratis
  greenBright: "#8fd678",
} as const;
