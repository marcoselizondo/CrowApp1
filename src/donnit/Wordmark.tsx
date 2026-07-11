import { Img, staticFile } from "remotion";
import { COLORS, FONT_FAMILY } from "./theme";

/** Donnit app icon (uploaded PNG), rounded to a squircle. */
export const DonnitLogo: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <Img
    src={staticFile("DonnitLogo.png")}
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.235,
      display: "block",
    }}
  />
);

/** Donnit logo + "Donnit" wordmark, side by side. */
export const Wordmark: React.FC<{
  size?: number;
  onLight?: boolean;
}> = ({ size = 44, onLight = false }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: size * 0.34,
        fontFamily: FONT_FAMILY,
        fontWeight: 800,
        fontSize: size,
        letterSpacing: -1,
        color: onLight ? COLORS.ink : COLORS.white,
      }}
    >
      <DonnitLogo size={size * 1.18} />
      <span>Donnit</span>
    </div>
  );
};
