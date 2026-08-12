import {
  AbsoluteFill,
  interpolate,
  Img,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_FAMILY } from "../donnit/theme";

export const FPS15 = 50;
export const DURATION15 = 2396; // 47.92s * 50fps

const VIDEO = staticFile("reel-15/raw/donnit_anuncio_30mb.mp4");
const s = (sec: number) => Math.round(sec * FPS15);

/** Soft focus dim behind a hero graphic (founder stays visible, just recedes). */
const Dim: React.FC<{ max?: number }> = ({ max = 0.42 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const o = interpolate(
    frame,
    [0, 12, durationInFrames - 12, durationInFrames],
    [0, max, max, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(120% 90% at 50% 42%, rgba(6,14,9,0.35) 0%, rgba(6,14,9,0.78) 100%)",
        opacity: o,
      }}
    />
  );
};

/* ------------------------------------------------------------------ */
/* 1. "Donnit se acabó" — logo + a line crossing it, then it fades.    */
/* ------------------------------------------------------------------ */
const LogoCut: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200, mass: 0.8, stiffness: 90 } });
  const line = spring({ frame: frame - 14, fps, config: { damping: 200, mass: 0.7, stiffness: 70 } });
  const out = interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const appear = Math.min(enter, out);
  const scale = interpolate(enter, [0, 1], [0.9, 1]);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          transform: `translateY(-140px) scale(${scale})`,
          opacity: appear,
          display: "flex",
          alignItems: "center",
          gap: 26,
          position: "relative",
          padding: "6px 10px",
        }}
      >
        <Img
          src={staticFile("DonnitLogo.png")}
          style={{ width: 150, height: 150, borderRadius: 36 }}
        />
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontWeight: 800,
            fontSize: 108,
            letterSpacing: -2,
            color: COLORS.white,
          }}
        >
          Donnit
        </span>
        {/* strike-through line */}
        <div
          style={{
            position: "absolute",
            left: -18,
            right: -18,
            top: "52%",
            height: 8,
            borderRadius: 8,
            background: COLORS.white,
            transform: `scaleX(${line})`,
            transformOrigin: "left center",
            boxShadow: "0 2px 16px rgba(0,0,0,0.4)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Hero circle: DAR → CO₂ CREDITS → MOMENTS → ACCEDER → DAR            */
/* ------------------------------------------------------------------ */
const NODES = [
  { label: "DAR", f: 0, color: COLORS.green },
  { label: "CO₂ CREDITS", f: 0.25, color: COLORS.turquoise },
  { label: "MOMENTS", f: 0.5, color: COLORS.turquoise },
  { label: "ACCEDER", f: 0.75, color: COLORS.green },
];
const BOX = 600;
const CX = 300;
const CY = 300;
const R = 232;
const CIRC = 2 * Math.PI * R;

const nodePos = (f: number) => {
  const a = -Math.PI / 2 + f * Math.PI * 2;
  return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) };
};

const ValueCircle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200, mass: 0.8, stiffness: 80 } });
  const out = interpolate(frame, [durationInFrames - 16, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const appear = Math.min(enter, out);

  // draw the ring once, then a dot keeps travelling
  const draw = interpolate(frame, [16, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const travel = interpolate(frame, [150, durationInFrames - 20], [0, 1.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const p = draw < 1 ? draw : (travel % 1);
  const dot = nodePos(p);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          position: "relative",
          width: 620,
          height: 620,
          transform: `translateY(-40px) scale(${interpolate(enter, [0, 1], [0.86, 1])})`,
          opacity: appear,
        }}
      >
        <svg width={620} height={620} viewBox={`0 0 ${BOX} ${BOX}`}>
          {/* faint full ring */}
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth={4} />
          {/* drawn progress ring */}
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke={COLORS.turquoise}
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - draw)}
            transform={`rotate(-90 ${CX} ${CY})`}
          />
          {/* travelling dot */}
          <circle cx={dot.x} cy={dot.y} r={11} fill={COLORS.white} />
          <circle cx={dot.x} cy={dot.y} r={20} fill="none" stroke={COLORS.turquoise} strokeWidth={3} opacity={0.6} />
        </svg>

        {/* center wordmark */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Img src={staticFile("DonnitLogo.png")} style={{ width: 76, height: 76, borderRadius: 18, marginBottom: 8 }} />
          <span style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 40, color: COLORS.white, letterSpacing: -1 }}>
            Donnit
          </span>
        </div>

        {/* nodes */}
        {NODES.map((n, i) => {
          const pos = nodePos(n.f);
          const active = interpolate(
            draw < 1 ? draw : 1,
            [n.f - 0.02, n.f + 0.04],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          const sc = 620 / BOX;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: pos.x * sc,
                top: pos.y * sc,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  transform: `scale(${interpolate(active, [0, 1], [0.7, 1])})`,
                  opacity: interpolate(active, [0, 1], [0.35, 1]),
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    background: n.color,
                    boxShadow: `0 0 ${interpolate(active, [0, 1], [0, 22])}px ${n.color}`,
                  }}
                />
                <span
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontWeight: 800,
                    fontSize: 30,
                    color: COLORS.white,
                    whiteSpace: "nowrap",
                    textShadow: "0 2px 12px rgba(0,0,0,0.6)",
                  }}
                >
                  {n.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
export const Reel15: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <OffthreadVideo src={VIDEO} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

      {/* 1 — Donnit se acabó (~4.0–5.4s) */}
      <Sequence from={s(4.0)} durationInFrames={s(1.5)} name="logo-cut">
        <Dim max={0.3} />
        <LogoCut />
      </Sequence>

      {/* 9/10 — el círculo (~35.2–41.5s) */}
      <Sequence from={s(35.2)} durationInFrames={s(6.3)} name="value-circle">
        <Dim />
        <ValueCircle />
      </Sequence>
    </AbsoluteFill>
  );
};
