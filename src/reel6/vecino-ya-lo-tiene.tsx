import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  cancelRender,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  useCurrentFrame,
  useDelayRender,
  useVideoConfig,
} from "remotion";
import { DonnitLogo } from "../donnit/Wordmark";
import { POPPINS, WARM, waitForReel6Fonts } from "./theme6";
import { PRECIO, SRC, T, TOTAL_DURATION } from "./story6";

/* ================= utilidades kinéticas ================= */

const WaitFonts: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ready, setReady] = useState(false);
  const { delayRender, continueRender } = useDelayRender();
  const [handle] = useState(() => delayRender("Poppins reel-06"));
  useEffect(() => {
    if (ready) return;
    waitForReel6Fonts()
      .then(() => setReady(true))
      .catch((e) => cancelRender(e));
  }, [ready]);
  useEffect(() => {
    if (ready) continueRender(handle);
  }, [continueRender, ready, handle]);
  if (!ready) return null;
  return <>{children}</>;
};

/** Entrada con punch (scale overshoot) + flash crema en el corte. */
const Punch: React.FC<{ children: React.ReactNode; flash?: boolean }> = ({
  children,
  flash = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 160, mass: 0.6, stiffness: 200 } });
  const scale = interpolate(s, [0, 1], [1.06, 1]);
  const fl = flash ? interpolate(frame, [0, 2, 7], [0.35, 0.18, 0], { extrapolateRight: "clamp" }) : 0;
  return (
    <AbsoluteFill style={{ transform: `scale(${scale})` }}>
      {children}
      {flash && <AbsoluteFill style={{ backgroundColor: WARM.card, opacity: fl }} />}
    </AbsoluteFill>
  );
};

/** Palabra que entra con pop + subida. */
const Word: React.FC<{ children: React.ReactNode; delay: number; style?: React.CSSProperties }> = ({
  children,
  delay,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200, mass: 0.5, stiffness: 150 } });
  return (
    <span
      style={{
        display: "inline-block",
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [26, 0])}px)`,
        ...style,
      }}
    >
      {children}
    </span>
  );
};

const Pill: React.FC<{ text: string; bg: string; color: string; delay?: number }> = ({
  text,
  bg,
  color,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 130, mass: 0.6, stiffness: 200 } });
  return (
    <div
      style={{
        fontFamily: POPPINS,
        fontWeight: 700,
        fontSize: 34,
        color,
        background: bg,
        padding: "12px 26px",
        borderRadius: 999,
        whiteSpace: "nowrap",
        opacity: s,
        transform: `scale(${interpolate(s, [0, 1], [0.6, 1])})`,
      }}
    >
      {text}
    </div>
  );
};

const ScreenCard: React.FC<{ src: string; trimBefore?: number }> = ({ src, trimBefore }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      borderRadius: 34,
      overflow: "hidden",
      background: "#000",
      boxShadow: "0 26px 60px rgba(20,18,15,0.28)",
    }}
  >
    <OffthreadVideo src={src} muted trimBefore={trimBefore} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  </div>
);

/* ================= 0:00–0:02.5 · HOOK ================= */
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const line = spring({ frame: frame - 26, fps, config: { damping: 200, mass: 0.6, stiffness: 130 } });
  // cuenta 9€ -> 66€
  const val = Math.round(interpolate(frame, [30, 50], [9, 66], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const pricePop = spring({ frame: frame - 30, fps, config: { damping: 120, mass: 0.5, stiffness: 220 } });
  const marker = spring({ frame: frame - 50, fps, config: { damping: 200, mass: 0.6, stiffness: 90 } });
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <OffthreadVideo src={SRC.amazon} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <AbsoluteFill style={{ background: "linear-gradient(to top, rgba(20,18,15,0.88) 0%, rgba(20,18,15,0) 44%)" }} />
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", padding: "0 90px 175px", opacity: line }}>
        <div style={{ fontFamily: POPPINS, fontWeight: 800, fontSize: 80, lineHeight: 1.06, color: WARM.card, textAlign: "center", textShadow: "0 6px 30px rgba(0,0,0,0.6)" }}>
          <Word delay={26}>Ibas a gastar </Word>
          <span style={{ position: "relative", display: "inline-block", transform: `scale(${interpolate(pricePop, [0, 1], [0.4, 1])})` }}>
            <span
              style={{
                position: "absolute",
                left: -14,
                right: -14,
                top: 8,
                bottom: 6,
                background: WARM.greenBright,
                borderRadius: 12,
                transform: `scaleX(${marker})`,
                transformOrigin: "left center",
                zIndex: 0,
              }}
            />
            <span style={{ position: "relative", zIndex: 1, color: marker > 0.5 ? WARM.ink : WARM.greenBright, fontWeight: 800 }}>
              {val}€
            </span>
          </span>
          <Word delay={30}> en esto.</Word>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ================= 0:02.5–0:08 · SPLIT ================= */
const Split: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const light = spring({ frame, fps, config: { damping: 120, mass: 0.7, stiffness: 130 } });
  const flash = interpolate(frame, [0, 4, 16], [0.6, 0.32, 0], { extrapolateRight: "clamp" });
  const rightScale = interpolate(light, [0, 1], [0.9, 1]);
  // pulso sutil en los downbeats (90bpm -> 20f)
  const beatPulse = 1 + 0.012 * Math.max(0, Math.sin((frame / 20) * Math.PI * 2));

  const cardTop = 300, cardH = 1420, half = 540, cardW = 470, gap = (half - cardW) / 2;

  return (
    <AbsoluteFill style={{ backgroundColor: WARM.bg }}>
      <Sequence from={0} durationInFrames={20}>
        <Audio src={SRC.ping} volume={0.9} />
      </Sequence>

      {/* IZQUIERDA */}
      <div style={{ position: "absolute", left: gap, top: cardTop, width: cardW, height: cardH, transform: `scale(${beatPulse})` }}>
        <ScreenCard src={SRC.amazon} trimBefore={T.hookEnd} />
      </div>
      <div style={{ position: "absolute", left: 0, top: 150, width: half, display: "flex", justifyContent: "center" }}>
        <Pill text={`TÚ · ${PRECIO}`} bg={WARM.ink} color={WARM.card} delay={2} />
      </div>

      {/* DERECHA (se enciende) */}
      <div style={{ position: "absolute", left: half + gap, top: cardTop, width: cardW, height: cardH, opacity: light, transform: `scale(${rightScale * beatPulse})`, transformOrigin: "center" }}>
        <ScreenCard src={SRC.donnit} />
      </div>
      <div style={{ position: "absolute", left: half, top: 150, width: half, display: "flex", justifyContent: "center" }}>
        <Pill text="TU VECINO · GRATIS" bg={WARM.green} color={WARM.card} delay={6} />
      </div>

      <AbsoluteFill style={{ backgroundColor: WARM.greenBright, opacity: flash }} />
    </AbsoluteFill>
  );
};

/* ================= 0:08–0:10 · CHAT ================= */
const Chat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 160, mass: 0.7, stiffness: 130 } });
  const scale = interpolate(pop, [0, 1], [0.94, 1]);
  const drift = interpolate(frame, [0, 60], [4, -26]);
  const badge = spring({ frame: frame - 22, fps, config: { damping: 120, mass: 0.6, stiffness: 200 } });
  return (
    <Punch>
      <AbsoluteFill style={{ backgroundColor: WARM.bg, justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "absolute", top: 150, fontFamily: POPPINS, fontWeight: 700, fontSize: 42, color: WARM.ink, opacity: pop }}>
          Ya está de camino.
        </div>
        <div style={{ position: "relative", width: 720, borderRadius: 32, overflow: "hidden", boxShadow: "0 30px 70px rgba(20,18,15,0.3)", transform: `scale(${scale}) translateY(${drift}px)`, opacity: pop }}>
          <Img src={SRC.chat} style={{ width: "100%", display: "block" }} />
        </div>
        {/* badge kinético de confirmación */}
        <div style={{ position: "absolute", bottom: 250, transform: `scale(${interpolate(badge, [0, 1], [0.4, 1])})`, opacity: badge, fontFamily: POPPINS, fontWeight: 800, fontSize: 40, color: WARM.card, background: WARM.green, padding: "14px 32px", borderRadius: 999 }}>
          ✓ Entrega en marcha
        </div>
      </AbsoluteFill>
    </Punch>
  );
};

/* ================= 0:10–0:11.8 · CONTRASTE (por qué Donnit gana) ================= */
const Contrast: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const strike = spring({ frame: frame - 6, fps, config: { damping: 200, mass: 0.6, stiffness: 120 } });
  return (
    <Punch flash={false}>
      <AbsoluteFill
        style={{
          backgroundColor: WARM.ink,
          justifyContent: "center",
          alignItems: "center",
          fontFamily: POPPINS,
          fontWeight: 800,
          color: WARM.card,
          textAlign: "center",
          lineHeight: 1.16,
          fontSize: 88,
        }}
      >
        <div>
          <Word delay={0}>Sin pagar </Word>
          <span style={{ position: "relative", display: "inline-block", color: WARM.pay, fontSize: 66 }}>
            <Word delay={2}>66€</Word>
            <span
              style={{
                position: "absolute",
                left: -4,
                right: -4,
                top: "52%",
                height: 7,
                borderRadius: 4,
                background: WARM.pay,
                transform: `scaleX(${strike})`,
                transformOrigin: "left center",
              }}
            />
          </span>
          <Word delay={0}>.</Word>
        </div>
        <div>
          <Word delay={13}>Sin esperar envíos.</Word>
        </div>
        <div>
          <Word delay={26}>Ya está en </Word>
          <Word delay={30} style={{ color: WARM.greenBright }}>tu calle.</Word>
        </div>
      </AbsoluteFill>
    </Punch>
  );
};

/* ================= 0:11.8–0:14.4 · RESOLUCIÓN ================= */
const Resolution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoS = spring({ frame, fps, config: { damping: 130, mass: 0.7, stiffness: 160 } });
  return (
    <Punch>
      <AbsoluteFill style={{ backgroundColor: WARM.bg, justifyContent: "center", alignItems: "center", padding: "0 90px" }}>
        <div style={{ transform: `scale(${interpolate(logoS, [0, 1], [0.5, 1])}) translateY(${interpolate(logoS, [0, 1], [20, 0])}px)`, opacity: logoS, marginBottom: 54 }}>
          <div style={{ background: WARM.card, padding: 26, borderRadius: 52, boxShadow: "0 22px 54px rgba(20,18,15,0.22)" }}>
            <DonnitLogo size={168} />
          </div>
        </div>
        <div style={{ fontFamily: POPPINS, fontWeight: 800, fontSize: 76, lineHeight: 1.1, color: WARM.ink, textAlign: "center" }}>
          <div><Word delay={6}>Tu barrio ya tiene</Word></div>
          <div>
            <Word delay={12}>lo que </Word>
            <Word delay={17} style={{ color: WARM.green }}>necesitas.</Word>
          </div>
        </div>
      </AbsoluteFill>
    </Punch>
  );
};

/* ================= 0:14.4–0:17 · FRAME FINAL (CTA) ================= */
const EndFrame: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 150, mass: 0.8, stiffness: 140 } });
  return (
    <Punch>
      <AbsoluteFill style={{ backgroundColor: WARM.ink, justifyContent: "center", alignItems: "center", padding: "0 100px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 50, opacity: pop, transform: `scale(${interpolate(pop, [0, 1], [0.7, 1])})` }}>
          <DonnitLogo size={92} />
          <span style={{ fontFamily: POPPINS, fontWeight: 800, fontSize: 76, color: WARM.card, letterSpacing: -1 }}>Donnit</span>
        </div>
        <div style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 54, lineHeight: 1.24, color: WARM.card, textAlign: "center" }}>
          <div><Word delay={8}>Antes de comprarlo,</Word></div>
          <div>
            <Word delay={14}>mira si ya lo tiene </Word>
            <Word delay={20} style={{ color: WARM.greenBright }}>tu vecino.</Word>
          </div>
        </div>
      </AbsoluteFill>
    </Punch>
  );
};

export const VecinoYaLoTiene: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: WARM.bg }}>
      <WaitFonts>
        {/* música de fondo (lecho royalty-free, sincronizado a los cortes) */}
        <Audio src={SRC.music} volume={0.5} />

        <Sequence from={0} durationInFrames={T.hookEnd} name="hook">
          <Hook />
        </Sequence>
        <Sequence from={T.hookEnd} durationInFrames={T.splitEnd - T.hookEnd} name="split">
          <Split />
        </Sequence>
        <Sequence from={T.splitEnd} durationInFrames={T.chatEnd - T.splitEnd} name="chat">
          <Chat />
        </Sequence>
        <Sequence from={T.chatEnd} durationInFrames={T.entregaEnd - T.chatEnd} name="contrast">
          <Contrast />
        </Sequence>
        <Sequence from={T.entregaEnd} durationInFrames={T.resolutionEnd - T.entregaEnd} name="resolution">
          <Resolution />
        </Sequence>
        <Sequence from={T.resolutionEnd} durationInFrames={TOTAL_DURATION - T.resolutionEnd} name="end">
          <EndFrame />
        </Sequence>
      </WaitFonts>
    </AbsoluteFill>
  );
};
