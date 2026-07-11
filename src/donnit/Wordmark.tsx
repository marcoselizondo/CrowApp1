import { COLORS, FONT_FAMILY } from "./theme";

/** Donnit typographic wordmark (placeholder until a logo asset is provided). */
export const Wordmark: React.FC<{
  size?: number;
  onLight?: boolean;
}> = ({ size = 44, onLight = false }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: size * 0.28,
        fontFamily: FONT_FAMILY,
        fontWeight: 800,
        fontSize: size,
        letterSpacing: -1,
        color: onLight ? COLORS.ink : COLORS.white,
      }}
    >
      <div
        style={{
          width: size * 0.62,
          height: size * 0.62,
          borderRadius: "50%",
          background: COLORS.green,
          boxShadow: onLight ? "none" : "0 3px 14px rgba(0,0,0,0.35)",
        }}
      />
      <span>
        Donnit
        <span style={{ color: COLORS.green }}>.</span>
      </span>
    </div>
  );
};
