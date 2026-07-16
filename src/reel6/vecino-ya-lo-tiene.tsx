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

/** Espera a que Poppins esté cargada antes de renderizar. */
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

/** Pastilla de etiqueta (mute-friendly). */
const Pill: React.FC<{ text: string; bg: string; color: string }> = ({
  text,
  bg,
  color,
}) => (
  <div
    style={{
      fontFamily: POPPINS,
      fontWeight: 700,
      fontSize: 34,
      letterSpacing: 0.2,
      color,
      background: bg,
      padding: "12px 26px",
      borderRadius: 999,
      whiteSpace: "nowrap",
    }}
  >
    {text}
  </div>
);

/** Tarjeta de vídeo (pantalla de móvil recortada). */
const ScreenCard: React.FC<{
  src: string;
  trimBefore?: number;
}> = ({ src, trimBefore }) => (
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
    <OffthreadVideo
      src={src}
      muted
      trimBefore={trimBefore}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </div>
);

/* ---------- 0:00–0:02.5 · HOOK ---------- */
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 30, fps, config: { damping: 200, mass: 0.6, stiffness: 120 } });
  const y = interpolate(pop, [0, 1], [40, 0]);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <OffthreadVideo
        src={SRC.amazon}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      {/* legibilidad abajo */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top, rgba(20,18,15,0.85) 0%, rgba(20,18,15,0.0) 42%)",
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "0 90px 180px",
          opacity: pop,
          transform: `translateY(${y}px)`,
        }}
      >
        <div
          style={{
            fontFamily: POPPINS,
            fontWeight: 800,
            fontSize: 82,
            lineHeight: 1.05,
            color: WARM.card,
            textAlign: "center",
            textShadow: "0 6px 30px rgba(0,0,0,0.6)",
          }}
        >
          Ibas a gastar{" "}
          <span style={{ color: WARM.greenBright }}>{PRECIO}</span> en esto.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ---------- 0:02.5–0:08 · SPLIT ---------- */
const Split: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // La derecha "se enciende".
  const light = spring({ frame, fps, config: { damping: 200, mass: 0.7, stiffness: 90 } });
  const flash = interpolate(frame, [0, 4, 16], [0.55, 0.3, 0], {
    extrapolateRight: "clamp",
  });
  const rightScale = interpolate(light, [0, 1], [0.94, 1]);

  const cardTop = 300;
  const cardH = 1420;
  const half = 540;
  const cardW = 470;
  const gap = (half - cardW) / 2;

  return (
    <AbsoluteFill style={{ backgroundColor: WARM.bg }}>
      {/* ping al entrar */}
      <Sequence from={0} durationInFrames={20}>
        <Audio src={SRC.ping} volume={0.85} />
      </Sequence>

      {/* IZQUIERDA — comprar */}
      <div style={{ position: "absolute", left: gap, top: cardTop, width: cardW, height: cardH }}>
        <ScreenCard src={SRC.amazon} trimBefore={T.hookEnd} />
      </div>
      <div style={{ position: "absolute", left: 0, top: 150, width: half, display: "flex", justifyContent: "center" }}>
        <Pill text={`TÚ · ${PRECIO}`} bg={WARM.ink} color={WARM.card} />
      </div>

      {/* DERECHA — Donnit / gratis */}
      <div
        style={{
          position: "absolute",
          left: half + gap,
          top: cardTop,
          width: cardW,
          height: cardH,
          opacity: light,
          transform: `scale(${rightScale})`,
          transformOrigin: "center",
        }}
      >
        <ScreenCard src={SRC.donnit} />
      </div>
      <div style={{ position: "absolute", left: half, top: 150, width: half, display: "flex", justifyContent: "center", opacity: light }}>
        <Pill text="TU VECINO · GRATIS" bg={WARM.green} color={WARM.card} />
      </div>

      {/* divisor */}
      <div style={{ position: "absolute", left: half - 2, top: 250, width: 4, height: 1520, background: WARM.bg, opacity: 0.0 }} />

      {/* flash verde al encender la derecha */}
      <AbsoluteFill style={{ backgroundColor: WARM.greenBright, opacity: flash }} />
    </AbsoluteFill>
  );
};

/* ---------- 0:08–0:10 · CHAT ---------- */
const Chat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 200, mass: 0.7, stiffness: 110 } });
  const scale = interpolate(pop, [0, 1], [0.96, 1]);
  const drift = interpolate(frame, [0, 60], [0, -26]);
  return (
    <AbsoluteFill style={{ backgroundColor: WARM.bg, justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", top: 150, fontFamily: POPPINS, fontWeight: 600, fontSize: 40, color: WARM.inkSoft, opacity: pop }}>
        Ya está de camino.
      </div>
      <div
        style={{
          width: 720,
          borderRadius: 32,
          overflow: "hidden",
          boxShadow: "0 30px 70px rgba(20,18,15,0.3)",
          transform: `scale(${scale}) translateY(${drift}px)`,
          opacity: pop,
        }}
      >
        <Img src={SRC.chat} style={{ width: "100%", display: "block" }} />
      </div>
    </AbsoluteFill>
  );
};

/* ---------- 0:10–0:11.8 · ENTREGA ---------- */
const Entrega: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 200, mass: 0.7, stiffness: 120 } });
  const scale = interpolate(pop, [0, 1], [1.04, 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: WARM.ink, justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          width: 860,
          height: 746,
          borderRadius: 32,
          overflow: "hidden",
          transform: `scale(${scale})`,
          boxShadow: "0 30px 70px rgba(0,0,0,0.45)",
        }}
      >
        <OffthreadVideo src={SRC.entrega} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ position: "absolute", bottom: 300, fontFamily: POPPINS, fontWeight: 700, fontSize: 48, color: WARM.card, opacity: pop }}>
        Cara a cara. En tu barrio.
      </div>
    </AbsoluteFill>
  );
};

/* ---------- 0:11.8–0:14.4 · RESOLUCIÓN ---------- */
const Resolution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 200, mass: 0.7, stiffness: 110 } });
  const y = interpolate(pop, [0, 1], [30, 0]);
  return (
    <AbsoluteFill style={{ backgroundColor: WARM.bg, justifyContent: "center", alignItems: "center", padding: "0 90px" }}>
      <div style={{ opacity: pop, transform: `translateY(${y}px)`, marginBottom: 54 }}>
        <div style={{ background: WARM.card, padding: 26, borderRadius: 52, boxShadow: "0 22px 54px rgba(20,18,15,0.22)" }}>
          <DonnitLogo size={168} />
        </div>
      </div>
      <div
        style={{
          fontFamily: POPPINS,
          fontWeight: 800,
          fontSize: 76,
          lineHeight: 1.08,
          color: WARM.ink,
          textAlign: "center",
          opacity: pop,
          transform: `translateY(${y}px)`,
        }}
      >
        Tu barrio ya tiene
        <br />
        lo que <span style={{ color: WARM.green }}>necesitas</span>.
      </div>
    </AbsoluteFill>
  );
};

/* ---------- 0:14.4–0:17 · FRAME FINAL (CTA) ---------- */
const EndFrame: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 200, mass: 0.8, stiffness: 120 } });
  return (
    <AbsoluteFill style={{ backgroundColor: WARM.ink, justifyContent: "center", alignItems: "center", padding: "0 100px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 50, opacity: pop }}>
        <DonnitLogo size={92} />
        <span style={{ fontFamily: POPPINS, fontWeight: 800, fontSize: 76, color: WARM.card, letterSpacing: -1 }}>
          Donnit
        </span>
      </div>
      <div
        style={{
          fontFamily: POPPINS,
          fontWeight: 600,
          fontSize: 54,
          lineHeight: 1.22,
          color: WARM.card,
          textAlign: "center",
          opacity: pop,
        }}
      >
        Antes de comprarlo,
        <br />
        mira si ya lo tiene <span style={{ color: WARM.greenBright }}>tu vecino</span>.
      </div>
    </AbsoluteFill>
  );
};

export const VecinoYaLoTiene: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: WARM.bg }}>
      <WaitFonts>
        <Sequence from={0} durationInFrames={T.hookEnd} name="hook">
          <Hook />
        </Sequence>
        <Sequence from={T.hookEnd} durationInFrames={T.splitEnd - T.hookEnd} name="split">
          <Split />
        </Sequence>
        <Sequence from={T.splitEnd} durationInFrames={T.chatEnd - T.splitEnd} name="chat">
          <Chat />
        </Sequence>
        <Sequence from={T.chatEnd} durationInFrames={T.entregaEnd - T.chatEnd} name="entrega">
          <Entrega />
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
