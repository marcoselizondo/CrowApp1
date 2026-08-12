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
import {
  IconBox,
  IconCamera,
  IconChair,
  IconCoffee,
  IconLamp,
  IconPerson,
  IconProjector,
  IconTent,
  IconToken,
  IconUnlock,
} from "./icons";

export const FPS15 = 50;
export const DURATION15 = 2396;
const VIDEO = staticFile("reel-15/raw/donnit_anuncio_30mb.mp4");
const s = (sec: number) => Math.round(sec * FPS15);

const useEnvelope = (inF = 10, outF = 12) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const i = interpolate(frame, [0, inF], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const o = interpolate(frame, [durationInFrames - outF, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return Math.min(i, o);
};

const Dim: React.FC<{ max?: number }> = ({ max = 0.42 }) => {
  const o = useEnvelope(12, 12) * max;
  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(120% 90% at 50% 42%, rgba(6,14,9,0.30) 0%, rgba(6,14,9,0.80) 100%)",
        opacity: o,
      }}
    />
  );
};

const Label: React.FC<{ children: React.ReactNode; size?: number; color?: string }> = ({ children, size = 27, color = COLORS.white }) => (
  <span style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: size, letterSpacing: 1, color, textTransform: "uppercase", whiteSpace: "nowrap", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>
    {children}
  </span>
);

const CO2: React.FC<{ size?: number }> = ({ size = 27 }) => (
  <span style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: size, letterSpacing: 1, color: COLORS.white, textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>
    CO<span style={{ fontSize: size * 0.8 }}>2</span> CREDITS
  </span>
);

/* ---- shared flow chip ---- */
const Chip: React.FC<{ children: React.ReactNode; accent?: string; glow?: boolean; sc: number }> = ({ children, accent = "rgba(255,255,255,0.24)", glow, sc }) => (
  <div
    style={{
      width: 116,
      height: 116,
      borderRadius: 32,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(255,255,255,0.05)",
      border: `2px solid ${accent}`,
      backdropFilter: "blur(2px)",
      transform: `scale(${sc})`,
      boxShadow: glow ? `0 0 40px ${accent}` : "0 8px 26px rgba(0,0,0,0.35)",
    }}
  >
    {children}
  </div>
);

type FlowItem = { icon: React.ReactNode; label: React.ReactNode; accent?: string; glow?: boolean };
const Flow: React.FC<{ items: FlowItem[]; delay?: number; y?: number }> = ({ items, delay = 30, y = 60 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, transform: `translateY(${y}px)` }}>
        {items.map((it, i) => {
          const ap = spring({ frame: frame - i * delay, fps, config: { damping: 200, mass: 0.7, stiffness: 90 } });
          const arrowAp = interpolate(frame, [i * delay + delay - 6, i * delay + delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, opacity: ap }}>
                <Chip accent={it.accent} glow={it.glow} sc={interpolate(ap, [0, 1], [0.6, 1])}>{it.icon}</Chip>
                <div>{it.label}</div>
              </div>
              {i < items.length - 1 ? (
                <div style={{ marginTop: 46, opacity: arrowAp, color: "rgba(255,255,255,0.6)", fontSize: 40, fontWeight: 700 }}>›</div>
              ) : null}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* 1 — Donnit se acabó */
const LogoCut: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const env = useEnvelope(10, 12);
  const enter = spring({ frame, fps, config: { damping: 200, mass: 0.8, stiffness: 90 } });
  const line = spring({ frame: frame - 14, fps, config: { damping: 200, mass: 0.7, stiffness: 70 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `translateY(-150px) scale(${interpolate(enter, [0, 1], [0.9, 1])})`, opacity: env, display: "flex", alignItems: "center", gap: 26, position: "relative", padding: "6px 10px" }}>
        <Img src={staticFile("DonnitLogo.png")} style={{ width: 148, height: 148, borderRadius: 34 }} />
        <span style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 106, letterSpacing: -2, color: COLORS.white }}>Donnit</span>
        <div style={{ position: "absolute", left: -18, right: -18, top: "52%", height: 8, borderRadius: 8, background: COLORS.white, transform: `scaleX(${line})`, transformOrigin: "left center", boxShadow: "0 2px 16px rgba(0,0,0,0.4)" }} />
      </div>
    </AbsoluteFill>
  );
};

/* 2 — objeto → foto → donnit → vecino */
const ShareFlow: React.FC = () => (
  <Flow
    y={70}
    items={[
      { icon: <IconBox size={64} color={COLORS.white} />, label: <Label>Objeto</Label> },
      { icon: <IconCamera size={64} color={COLORS.white} />, label: <Label>Foto</Label> },
      { icon: <Img src={staticFile("DonnitLogo.png")} style={{ width: 70, height: 70, borderRadius: 16 }} />, label: <Label color={COLORS.green}>Donnit</Label>, accent: COLORS.green },
      { icon: <IconPerson size={64} color={COLORS.white} />, label: <Label>Vecino</Label> },
    ]}
  />
);

/* 3 — signo de interrogación */
const QuestionMark: React.FC = () => {
  const frame = useCurrentFrame();
  const env = interpolate(frame, [0, 22, 74, 96], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(frame, [0, 30], [16, 0], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `translateY(${-60 + y}px)`, opacity: env, width: 200, height: 200, borderRadius: 999, border: "3px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 150, color: COLORS.white, textShadow: "0 4px 24px rgba(0,0,0,0.6)" }}>?</span>
      </div>
    </AbsoluteFill>
  );
};

/* 4 — objeto → compartir → CO₂ credits (recompensa) */
const GiveGet: React.FC = () => (
  <Flow
    y={60}
    delay={34}
    items={[
      { icon: <IconBox size={64} color={COLORS.white} />, label: <Label>Objeto</Label> },
      { icon: <IconPerson size={62} color={COLORS.white} />, label: <Label>Compartir</Label> },
      { icon: <IconToken size={70} color={COLORS.turquoise} />, label: <CO2 />, accent: COLORS.turquoise, glow: true },
    ]}
  />
);

/* 5 — dinero ✕ → acceso ✓ */
const MoneyToAccess: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const env = useEnvelope(10, 12);
  const swap = interpolate(frame, [durationInFrames * 0.42, durationInFrames * 0.55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cross = spring({ frame: frame - 16, fps, config: { damping: 200, stiffness: 80 } });
  const unlock = spring({ frame: frame - Math.round(durationInFrames * 0.55), fps, config: { damping: 200, stiffness: 90 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: env }}>
      <div style={{ transform: "translateY(-140px)", position: "relative", width: 320, height: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* dinero */}
        <div style={{ position: "absolute", opacity: 1 - swap, transform: `scale(${interpolate(swap, [0, 1], [1, 0.8])})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div style={{ position: "relative" }}>
            <span style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 150, color: "rgba(255,255,255,0.85)" }}>€</span>
            <div style={{ position: "absolute", left: -6, right: -6, top: "50%", height: 8, borderRadius: 8, background: "#ff6b6b", transform: `rotate(-20deg) scaleX(${cross})`, transformOrigin: "center" }} />
          </div>
          <Label size={30} color="rgba(255,255,255,0.7)">Dinero</Label>
        </div>
        {/* acceso */}
        <div style={{ position: "absolute", opacity: swap, transform: `scale(${interpolate(unlock, [0, 1], [0.7, 1])})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <IconUnlock size={160} color={COLORS.turquoise} sw={5} />
          <Label size={40} color={COLORS.turquoise}>Acceso</Label>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* 6 — billetera de CO₂ credits acumulando */
const CreditsWallet: React.FC = () => {
  const frame = useCurrentFrame();
  const env = useEnvelope(10, 12);
  const filled = Math.min(5, Math.floor(interpolate(frame, [14, 90], [0, 5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: env }}>
      <div style={{ transform: "translateY(-150px)", width: 470, borderRadius: 30, padding: "30px 32px", background: "rgba(255,255,255,0.06)", border: `2px solid ${COLORS.turquoise}`, backdropFilter: "blur(3px)", boxShadow: "0 16px 44px rgba(0,0,0,0.4)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <IconToken size={44} color={COLORS.turquoise} />
          <CO2 size={30} />
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{ flex: 1, height: 22, borderRadius: 8, background: i < filled ? COLORS.turquoise : "rgba(255,255,255,0.12)", transition: "none" }} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* 7 — créditos → Donnit Moments + objetos */
const CreditsToMoments: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const env = useEnvelope(10, 12);
  const objs = [IconCoffee, IconTent, IconProjector, IconLamp];
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: env }}>
      <div style={{ transform: "translateY(-40px)", display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <IconToken size={54} color={COLORS.turquoise} />
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 40 }}>›</span>
          <span style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 46, color: COLORS.white }}>Donnit <span style={{ color: COLORS.turquoise }}>Moments</span></span>
        </div>
        <div style={{ display: "flex", gap: 22 }}>
          {objs.map((Ic, i) => {
            const ap = spring({ frame: frame - 24 - i * 12, fps, config: { damping: 200, stiffness: 110 } });
            return (
              <div key={i} style={{ transform: `scale(${ap})`, opacity: ap }}>
                <Chip accent="rgba(82,183,136,0.5)" sc={1}><Ic size={58} color={COLORS.white} /></Chip>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* 8 — reveal Donnit Moments */
const MomentsReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const env = useEnvelope(12, 12);
  const a = spring({ frame, fps, config: { damping: 200, mass: 0.8, stiffness: 80 } });
  const b = spring({ frame: frame - 18, fps, config: { damping: 200, mass: 0.8, stiffness: 80 } });
  const under = spring({ frame: frame - 30, fps, config: { damping: 200, stiffness: 70 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: env }}>
      <div style={{ transform: "translateY(-60px)", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Img src={staticFile("DonnitLogo.png")} style={{ width: 96, height: 96, borderRadius: 22, marginBottom: 18, opacity: a, transform: `scale(${a})` }} />
        <span style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 96, letterSpacing: -2, color: COLORS.white, opacity: a, transform: `translateY(${interpolate(a, [0, 1], [16, 0])}px)` }}>Donnit</span>
        <span style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 96, letterSpacing: 2, color: COLORS.turquoise, opacity: b, transform: `translateY(${interpolate(b, [0, 1], [16, 0])}px)` }}>Moments</span>
        <div style={{ marginTop: 20, height: 6, width: 260, borderRadius: 6, background: COLORS.turquoise, transform: `scaleX(${under})`, transformOrigin: "center" }} />
      </div>
    </AbsoluteFill>
  );
};

/* 9/10 — el círculo hero */
const NODES = [
  { label: "DAR", f: 0, color: COLORS.green, co2: false },
  { label: "CO2", f: 0.25, color: COLORS.turquoise, co2: true },
  { label: "MOMENTS", f: 0.5, color: COLORS.turquoise, co2: false },
  { label: "ACCEDER", f: 0.75, color: COLORS.green, co2: false },
];
const BOX = 600, CX = 300, CY = 300, R = 232, CIRC = 2 * Math.PI * R;
const nodePos = (f: number) => {
  const a = -Math.PI / 2 + f * Math.PI * 2;
  return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) };
};
const ValueCircle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200, mass: 0.8, stiffness: 80 } });
  const env = useEnvelope(12, 16);
  const draw = interpolate(frame, [16, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const travel = interpolate(frame, [150, durationInFrames - 20], [0, 1.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p = draw < 1 ? draw : travel % 1;
  const dot = nodePos(p);
  const sc = 620 / BOX;
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "relative", width: 620, height: 620, transform: `translateY(-40px) scale(${interpolate(enter, [0, 1], [0.86, 1])})`, opacity: env }}>
        <svg width={620} height={620} viewBox={`0 0 ${BOX} ${BOX}`}>
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth={4} />
          <circle cx={CX} cy={CY} r={R} fill="none" stroke={COLORS.turquoise} strokeWidth={6} strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - draw)} transform={`rotate(-90 ${CX} ${CY})`} />
          <circle cx={dot.x} cy={dot.y} r={11} fill={COLORS.white} />
          <circle cx={dot.x} cy={dot.y} r={20} fill="none" stroke={COLORS.turquoise} strokeWidth={3} opacity={0.6} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <Img src={staticFile("DonnitLogo.png")} style={{ width: 76, height: 76, borderRadius: 18, marginBottom: 8 }} />
          <span style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 40, color: COLORS.white, letterSpacing: -1 }}>Donnit</span>
        </div>
        {NODES.map((n, i) => {
          const pos = nodePos(n.f);
          const active = interpolate(draw < 1 ? draw : 1, [n.f - 0.02, n.f + 0.04], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ position: "absolute", left: pos.x * sc, top: pos.y * sc, transform: "translate(-50%, -50%)" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, transform: `scale(${interpolate(active, [0, 1], [0.7, 1])})`, opacity: interpolate(active, [0, 1], [0.35, 1]) }}>
                <div style={{ width: 22, height: 22, borderRadius: 999, background: n.color, boxShadow: `0 0 ${interpolate(active, [0, 1], [0, 22])}px ${n.color}` }} />
                {n.co2 ? <CO2 size={30} /> : <Label size={30}>{n.label}</Label>}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* 11–13 — del círculo al barrio: red de personas + objetos */
const NET = [
  { x: 300, y: 640, icon: null },
  { x: 540, y: 560, icon: IconChair },
  { x: 780, y: 660, icon: null },
  { x: 420, y: 820, icon: IconCoffee },
  { x: 680, y: 860, icon: null },
  { x: 250, y: 980, icon: IconLamp },
  { x: 560, y: 1040, icon: null },
  { x: 820, y: 980, icon: IconProjector },
  { x: 380, y: 1180, icon: null },
  { x: 660, y: 1220, icon: IconTent },
];
const EDGES: [number, number][] = [[0, 1], [1, 2], [0, 3], [1, 4], [3, 4], [3, 5], [4, 7], [5, 6], [6, 7], [5, 8], [6, 9], [8, 9], [4, 6]];
const BarrioViz: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const env = useEnvelope(14, 16);
  return (
    <AbsoluteFill style={{ opacity: env }}>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        {EDGES.map(([a, b], i) => {
          const p = interpolate(frame, [30 + i * 6, 60 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const A = NET[a], B = NET[b];
          const x2 = A.x + (B.x - A.x) * p, y2 = A.y + (B.y - A.y) * p;
          return <line key={i} x1={A.x} y1={A.y} x2={x2} y2={y2} stroke="rgba(143,214,120,0.5)" strokeWidth={2.5} />;
        })}
      </svg>
      {NET.map((n, i) => {
        const ap = spring({ frame: frame - i * 7, fps, config: { damping: 200, stiffness: 120 } });
        const Ic = n.icon;
        return (
          <div key={i} style={{ position: "absolute", left: n.x, top: n.y, transform: `translate(-50%,-50%) scale(${ap})`, opacity: ap }}>
            {Ic ? (
              <div style={{ width: 92, height: 92, borderRadius: 24, background: "rgba(255,255,255,0.06)", border: "2px solid rgba(82,183,136,0.55)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(2px)" }}>
                <Ic size={52} color={COLORS.white} />
              </div>
            ) : (
              <div style={{ width: 20, height: 20, borderRadius: 999, background: COLORS.green, boxShadow: `0 0 16px ${COLORS.green}` }} />
            )}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const Reel15: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <OffthreadVideo src={VIDEO} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

      <Sequence from={s(4.0)} durationInFrames={s(1.6)} name="1-logo-cut"><Dim max={0.3} /><LogoCut /></Sequence>
      <Sequence from={s(8.0)} durationInFrames={s(5.0)} name="2-share"><Dim max={0.34} /><ShareFlow /></Sequence>
      <Sequence from={s(13.6)} durationInFrames={s(2.2)} name="3-question"><Dim max={0.28} /><QuestionMark /></Sequence>
      <Sequence from={s(20.4)} durationInFrames={s(3.4)} name="4-giveget"><Dim max={0.38} /><GiveGet /></Sequence>
      <Sequence from={s(24.0)} durationInFrames={s(3.0)} name="5-access"><Dim max={0.4} /><MoneyToAccess /></Sequence>
      <Sequence from={s(27.8)} durationInFrames={s(2.6)} name="6-wallet"><Dim max={0.4} /><CreditsWallet /></Sequence>
      <Sequence from={s(30.5)} durationInFrames={s(2.3)} name="7-tomoments"><Dim max={0.4} /><CreditsToMoments /></Sequence>
      <Sequence from={s(32.9)} durationInFrames={s(2.3)} name="8-reveal"><Dim max={0.46} /><MomentsReveal /></Sequence>
      <Sequence from={s(35.3)} durationInFrames={s(6.2)} name="9-circle"><Dim /><ValueCircle /></Sequence>
      <Sequence from={s(41.6)} durationInFrames={s(6.3)} name="11-barrio"><Dim max={0.4} /><BarrioViz /></Sequence>
    </AbsoluteFill>
  );
};
