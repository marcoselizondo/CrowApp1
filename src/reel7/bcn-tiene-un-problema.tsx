import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
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
import { ARG_REVEAL_LOCAL, B, SRC, TOTAL_DURATION } from "./story7";

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

/** Transición con onda: flash tipo foto + zoom-punch + shake + slide. */
const Snap: React.FC<{ children: React.ReactNode; dir?: number }> = ({ children, dir = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 130, mass: 0.5, stiffness: 230 } });
  const scale = interpolate(s, [0, 1], [1.22, 1.04]);
  const slide = interpolate(s, [0, 1], [dir * 90, 0]);
  const shake = frame < 9 ? Math.sin(frame * 2.6) * (9 - frame) * 1.7 : 0;
  const flash = interpolate(frame, [0, 3, 8], [0.85, 0.42, 0], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#000" }}>
      <AbsoluteFill style={{ transform: `translateX(${slide + shake}px) scale(${scale})` }}>
        {children}
      </AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: "#fff", opacity: flash }} />
    </AbsoluteFill>
  );
};

/** Etiqueta que se estampa (rotada, slam). */
const Stamp: React.FC<{ text: string; rot?: number; bottom?: number }> = ({ text, rot = -5, bottom = 360 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 2, fps, config: { damping: 110, mass: 0.5, stiffness: 280 } });
  const scale = interpolate(s, [0, 1], [1.7, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", bottom, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: interpolate(s, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }) }}>
      <div
        style={{
          fontFamily: POPPINS,
          fontWeight: 800,
          fontSize: 62,
          color: WARM.card,
          background: WARM.pay,
          padding: "10px 32px",
          borderRadius: 12,
          transform: `rotate(${rot}deg) scale(${scale})`,
          boxShadow: "0 14px 34px rgba(0,0,0,0.4)",
          letterSpacing: 1,
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
        {/* Lecho musical (royalty-free) con ducking bajo la voz y el clímax */}
        <Audio
          src={SRC.music}
          volume={(f) =>
            interpolate(
              f,
              [0, 52, 60, 315, 324, 462, 470, 592, 600, TOTAL_DURATION],
              [0.15, 0.15, 0.42, 0.42, 0.16, 0.16, 0.15, 0.15, 0.38, 0.38],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            )
          }
        />

        {/* 1 · HOOK */}
        <At from={B.hook[0]} dur={B.hook[1] - B.hook[0]}>
          <Fill src={SRC.hook} muted={false} zoom={false} />
          <Caption text="Barcelona tiene un problema." accent="problema" />
        </At>

        {/* 2 · EVIDENCIA (3 objetos, con onda) */}
        <At from={B.evSilla[0]} dur={B.evSilla[1] - B.evSilla[0]}>
          <Snap dir={1}>
            <Fill src={SRC.evSilla} zoom={false} />
          </Snap>
          <TopTag text="Todos los días" />
          <Stamp text="SILLAS" rot={-5} />
        </At>
        <At from={B.evPlantas[0]} dur={B.evPlantas[1] - B.evPlantas[0]}>
          <Snap dir={-1}>
            <Fill src={SRC.evPlantas} zoom={false} />
          </Snap>
          <Stamp text="PLANTAS" rot={4} />
        </At>
        <At from={B.evObjetos[0]} dur={B.evObjetos[1] - B.evObjetos[0]}>
          <Snap dir={1}>
            <Fill src={SRC.evObjetos} zoom={false} />
          </Snap>
          <Stamp text="NEVERAS" rot={-4} />
        </At>

        {/* 3 · SEÑOR */}
        <At from={B.senor[0]} dur={B.senor[1] - B.senor[0]}>
          <Snap dir={-1}>
            <Fill src={SRC.senor} zoom={false} />
          </Snap>
          <Caption text="Alguien ya la quería." accent="quería" size={70} />
        </At>

        {/* 4 · TURISTAS (clímax) */}
        <At from={B.tEstab[0]} dur={B.tEstab[1] - B.tEstab[0]}>
          <Fill src={SRC.tEstab} />
        </At>
        <At from={B.tPose[0]} dur={B.tPose[1] - B.tPose[0]}>
          <Fill src={SRC.tPose} />
        </At>
        <At from={B.tSit[0]} dur={B.tSit[1] - B.tSit[0]}>
          <Fill src={SRC.tSit} />
        </At>
        {/* subtítulo de contexto sobre las poses (abarca pose + sentados) */}
        <Sequence from={B.tPose[0]} durationInFrames={B.tSit[1] - B.tPose[0]}>
          <Caption text="La gente empezó a pararse a hacerse fotos" size={50} bottom={240} />
        </Sequence>
        <At from={B.tMoment[0]} dur={B.tMoment[1] - B.tMoment[0]}>
          <Fill src={SRC.tMoment} muted={false} zoom={false} />
          {/* subtítulo de contexto hasta la revelación */}
          <Sequence from={0} durationInFrames={ARG_REVEAL_LOCAL}>
            <Caption text="Y la cámara siguió grabando…" size={50} bottom={240} />
          </Sequence>
          {/* revelación en el momento exacto del audio ("we are from Argentina") */}
          <Sequence from={ARG_REVEAL_LOCAL} durationInFrames={B.tMoment[1] - B.tMoment[0] - ARG_REVEAL_LOCAL}>
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
