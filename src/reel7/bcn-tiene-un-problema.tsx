import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  cancelRender,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  useCurrentFrame,
  useDelayRender,
  useVideoConfig,
} from "remotion";
import { DonnitLogo } from "../donnit/Wordmark";
import { POPPINS, WARM, waitForReel6Fonts } from "../reel6/theme6";
import { B, SRC, TOTAL_DURATION } from "./story7";

const WaitFonts: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ready, setReady] = useState(false);
  const { delayRender, continueRender } = useDelayRender();
  const [handle] = useState(() => delayRender("Poppins reel-07"));
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

/** Vídeo a pantalla completa, punch-in sutil para energía. */
const Fill: React.FC<{ src: string; muted?: boolean; zoom?: boolean }> = ({
  src,
  muted = true,
  zoom = true,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const scale = zoom
    ? interpolate(frame, [0, durationInFrames], [1.0, 1.06], { extrapolateRight: "clamp" })
    : 1;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <OffthreadVideo src={src} muted={muted} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const splitAccent = (text: string, accent?: string) => {
  if (!accent) return [{ s: text, a: false }];
  const i = text.toLowerCase().indexOf(accent.toLowerCase());
  if (i === -1) return [{ s: text, a: false }];
  return [
    { s: text.slice(0, i), a: false },
    { s: text.slice(i, i + accent.length), a: true },
    { s: text.slice(i + accent.length), a: false },
  ].filter((p) => p.s.length > 0);
};

/** Subtítulo kinético (Poppins, marcador verde en la palabra clave). */
const Caption: React.FC<{
  text: string;
  accent?: string;
  bottom?: number;
  size?: number;
}> = ({ text, accent, bottom = 250, size = 64 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200, mass: 0.6, stiffness: 130 } });
  const marker = spring({ frame: frame - 6, fps, config: { damping: 200, mass: 0.6, stiffness: 90 } });
  const y = interpolate(enter, [0, 1], [34, 0]);
  const parts = splitAccent(text, accent);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom,
        display: "flex",
        justifyContent: "center",
        padding: "0 70px",
        opacity: enter,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          fontFamily: POPPINS,
          fontWeight: 800,
          fontSize: size,
          lineHeight: 1.16,
          textAlign: "center",
          color: WARM.card,
          letterSpacing: -0.5,
          textShadow: "0 6px 26px rgba(0,0,0,0.7)",
          maxWidth: 940,
        }}
      >
        {parts.map((p, i) =>
          p.a ? (
            <span key={i} style={{ position: "relative", display: "inline-block", whiteSpace: "pre" }}>
              <span
                style={{
                  position: "absolute",
                  left: -10,
                  right: -10,
                  top: 6,
                  bottom: 4,
                  background: WARM.greenBright,
                  borderRadius: 10,
                  transform: `scaleX(${marker})`,
                  transformOrigin: "left center",
                  zIndex: 0,
                }}
              />
              <span style={{ position: "relative", zIndex: 1, color: WARM.ink }}>{p.s}</span>
            </span>
          ) : (
            <span key={i} style={{ whiteSpace: "pre" }}>
              {p.s}
            </span>
          ),
        )}
      </div>
    </div>
  );
};

/** Etiqueta corta arriba (p. ej. "Todos los días"). */
const TopTag: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 130, mass: 0.6, stiffness: 200 } });
  return (
    <div style={{ position: "absolute", top: 190, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          fontFamily: POPPINS,
          fontWeight: 800,
          fontSize: 58,
          color: WARM.ink,
          background: WARM.greenBright,
          padding: "12px 34px",
          borderRadius: 999,
          transform: `scale(${interpolate(s, [0, 1], [0.5, 1])})`,
          opacity: s,
          boxShadow: "0 12px 34px rgba(0,0,0,0.3)",
        }}
      >
        {text}
      </div>
    </div>
  );
};

/** Revelación del clímax: «SOMOS DE ARGENTINA». */
const ArgentinaReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 120, mass: 0.6, stiffness: 200 } });
  const sub = spring({ frame: frame - 24, fps, config: { damping: 160, mass: 0.6, stiffness: 150 } });
  const flash = interpolate(frame, [0, 2, 10], [0.4, 0.2, 0], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <AbsoluteFill style={{ backgroundColor: WARM.greenBright, opacity: flash }} />
      <div
        style={{
          fontFamily: POPPINS,
          fontWeight: 800,
          fontSize: 96,
          lineHeight: 1.02,
          textAlign: "center",
          color: WARM.card,
          textShadow: "0 8px 30px rgba(0,0,0,0.75)",
          transform: `scale(${interpolate(pop, [0, 1], [0.6, 1])})`,
          opacity: pop,
          padding: "0 60px",
        }}
      >
        «Somos de
        <br />
        <span style={{ color: WARM.greenBright }}>Argentina</span>» 🇦🇷
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 300,
          fontFamily: POPPINS,
          fontWeight: 600,
          fontSize: 46,
          color: WARM.card,
          textAlign: "center",
          opacity: sub,
          transform: `translateY(${interpolate(sub, [0, 1], [20, 0])}px)`,
          textShadow: "0 6px 24px rgba(0,0,0,0.7)",
        }}
      >
        (el fundador de Donnit, también)
      </div>
    </AbsoluteFill>
  );
};

const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 140, mass: 0.7, stiffness: 150 } });
  const y = interpolate(pop, [0, 1], [26, 0]);
  return (
    <AbsoluteFill style={{ backgroundColor: WARM.bg, justifyContent: "center", alignItems: "center", padding: "0 90px" }}>
      <div style={{ transform: `scale(${interpolate(pop, [0, 1], [0.6, 1])}) translateY(${y}px)`, opacity: pop, marginBottom: 50 }}>
        <div style={{ background: WARM.card, padding: 26, borderRadius: 52, boxShadow: "0 22px 54px rgba(20,18,15,0.22)" }}>
          <DonnitLogo size={166} />
        </div>
      </div>
      <div style={{ fontFamily: POPPINS, fontWeight: 800, fontSize: 74, lineHeight: 1.12, color: WARM.ink, textAlign: "center", opacity: pop, transform: `translateY(${y}px)` }}>
        Lo que buscabas,
        <br />
        ya está en <span style={{ color: WARM.green }}>tu barrio</span>.
      </div>
    </AbsoluteFill>
  );
};

/** Momento tras un `from` absoluto, medido dentro del bloque. */
const At: React.FC<{ from: number; dur: number; children: React.ReactNode }> = ({ from, dur, children }) => (
  <Sequence from={from} durationInFrames={dur}>
    {children}
  </Sequence>
);

export const BcnTieneUnProblema: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <WaitFonts>
        {/* 1 · HOOK */}
        <At from={B.hook[0]} dur={B.hook[1] - B.hook[0]}>
          <Fill src={SRC.hook} muted={false} zoom={false} />
          <Caption text="Barcelona tiene un problema." accent="problema" />
        </At>

        {/* 2 · EVIDENCIA (3 objetos) */}
        <At from={B.evSilla[0]} dur={B.evSilla[1] - B.evSilla[0]}>
          <Fill src={SRC.evSilla} />
          <TopTag text="Todos los días" />
        </At>
        <At from={B.evPlantas[0]} dur={B.evPlantas[1] - B.evPlantas[0]}>
          <Fill src={SRC.evPlantas} />
        </At>
        <At from={B.evObjetos[0]} dur={B.evObjetos[1] - B.evObjetos[0]}>
          <Fill src={SRC.evObjetos} />
        </At>

        {/* 3 · SEÑOR */}
        <At from={B.senor[0]} dur={B.senor[1] - B.senor[0]}>
          <Fill src={SRC.senor} />
          <Caption text="Alguien ya la quería." accent="quería" size={70} />
        </At>

        {/* 4 · TURISTAS (clímax) */}
        <At from={B.tEstab[0]} dur={B.tEstab[1] - B.tEstab[0]}>
          <Fill src={SRC.tEstab} />
        </At>
        <At from={B.tPose[0]} dur={B.tPose[1] - B.tPose[0]}>
          <Fill src={SRC.tPose} />
          <Caption text="Turistas parando a hacerse fotos en la silla" size={52} bottom={240} />
        </At>
        <At from={B.tMoment[0]} dur={B.tMoment[1] - B.tMoment[0]}>
          <Fill src={SRC.tMoment} muted={false} />
          {/* subtítulo de contexto hasta la revelación */}
          <Sequence from={0} durationInFrames={74}>
            <Caption text="Y la cámara siguió grabando…" size={50} bottom={240} />
          </Sequence>
          {/* revelación en el momento exacto del audio */}
          <Sequence from={74} durationInFrames={B.tMoment[1] - B.tMoment[0] - 74}>
            <ArgentinaReveal />
          </Sequence>
        </At>

        {/* 5 · REVELACIÓN DONNIT */}
        <At from={B.donnit[0]} dur={B.donnit[1] - B.donnit[0]}>
          <Fill src={SRC.donnit} muted={false} zoom={false} />
          <Caption text="Por eso construimos Donnit." accent="Donnit" bottom={330} size={66} />
          <Sequence from={40}>
            <Caption text="Para dar y recibir lo que ya no usas." accent="ya no usas" bottom={210} size={48} />
          </Sequence>
        </At>

        {/* 6 · CIERRE */}
        <At from={B.end[0]} dur={TOTAL_DURATION - B.end[0]}>
          <EndCard />
        </At>
      </WaitFonts>
    </AbsoluteFill>
  );
};
