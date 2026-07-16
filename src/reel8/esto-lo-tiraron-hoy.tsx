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
import { CUT, SRC, TOTAL_DURATION, VIDEO_END } from "./story8";

const WaitFonts: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ready, setReady] = useState(false);
  const { delayRender, continueRender } = useDelayRender();
  const [handle] = useState(() => delayRender("Poppins reel-08"));
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

/** Subtítulo discreto (Poppins, marcador verde en la palabra clave). */
const Cap: React.FC<{
  text: string;
  accent?: string;
  bottom?: number;
  size?: number;
}> = ({ text, accent, bottom = 230, size = 60 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200, mass: 0.5, stiffness: 150 } });
  const marker = spring({ frame: frame - 5, fps, config: { damping: 200, mass: 0.6, stiffness: 90 } });
  const y = interpolate(enter, [0, 1], [26, 0]);
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
        padding: "0 80px",
        opacity: enter,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          fontFamily: POPPINS,
          fontWeight: 700,
          fontSize: size,
          lineHeight: 1.18,
          textAlign: "center",
          color: WARM.card,
          textShadow: "0 4px 20px rgba(0,0,0,0.75)",
          maxWidth: 940,
        }}
      >
        {parts.map((p, i) =>
          p.a ? (
            <span key={i} style={{ position: "relative", display: "inline-block", whiteSpace: "pre" }}>
              <span
                style={{
                  position: "absolute",
                  left: -8,
                  right: -8,
                  top: 6,
                  bottom: 4,
                  background: WARM.greenBright,
                  borderRadius: 8,
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

/** Banner que TAPA el texto quemado del primer plano ("ESTO TIRARON HOY"). */
const CoverBanner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200, mass: 0.5, stiffness: 150 } });
  return (
    <div
      style={{
        position: "absolute",
        left: 30,
        right: 30,
        top: 800,
        display: "flex",
        justifyContent: "center",
        opacity: Math.max(0.001, s),
      }}
    >
      <div
        style={{
          width: "100%",
          background: "rgba(20,18,15,0.94)",
          borderRadius: 20,
          padding: "26px 20px",
          textAlign: "center",
          fontFamily: POPPINS,
          fontWeight: 800,
          fontSize: 72,
          color: WARM.card,
          letterSpacing: -0.5,
          transform: `scale(${interpolate(s, [0, 1], [0.96, 1])})`,
        }}
      >
        ESTO LO TIRARON{" "}
        <span style={{ color: WARM.greenBright }}>HOY</span>
      </div>
    </div>
  );
};

/** Cartel grande central (¡GRATIS!). */
const BigStamp: React.FC<{ text: string; color?: string }> = ({ text, color = WARM.greenBright }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 120, mass: 0.5, stiffness: 240 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          fontFamily: POPPINS,
          fontWeight: 800,
          fontSize: 160,
          color,
          textShadow: "0 8px 30px rgba(0,0,0,0.6)",
          transform: `scale(${interpolate(pop, [0, 1], [0.4, 1])}) rotate(-6deg)`,
          letterSpacing: -2,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

/** Título del plano final: Usa Donnit / Ya en Barcelona. */
const FinalTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = spring({ frame, fps, config: { damping: 200, mass: 0.6, stiffness: 150 } });
  const b = spring({ frame: frame - 14, fps, config: { damping: 200, mass: 0.6, stiffness: 150 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          fontFamily: POPPINS,
          fontWeight: 800,
          fontSize: 120,
          color: WARM.card,
          textShadow: "0 6px 26px rgba(0,0,0,0.7)",
          opacity: a,
          transform: `translateY(${interpolate(a, [0, 1], [24, 0])}px)`,
        }}
      >
        Usa Donnit
      </div>
      <div
        style={{
          marginTop: 18,
          fontFamily: POPPINS,
          fontWeight: 700,
          fontSize: 56,
          color: WARM.greenBright,
          textShadow: "0 6px 26px rgba(0,0,0,0.7)",
          opacity: b,
          transform: `translateY(${interpolate(b, [0, 1], [20, 0])}px)`,
        }}
      >
        Ya en Barcelona
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
      <div style={{ transform: `scale(${interpolate(pop, [0, 1], [0.6, 1])}) translateY(${y}px)`, opacity: pop, marginBottom: 46 }}>
        <div style={{ background: WARM.card, padding: 26, borderRadius: 52, boxShadow: "0 22px 54px rgba(20,18,15,0.22)" }}>
          <DonnitLogo size={168} />
        </div>
      </div>
      <div style={{ fontFamily: POPPINS, fontWeight: 800, fontSize: 84, color: WARM.ink, letterSpacing: -1, opacity: pop, transform: `translateY(${y}px)` }}>
        Descarga Donnit
      </div>
      <div style={{ marginTop: 18, fontFamily: POPPINS, fontWeight: 500, fontSize: 40, color: WARM.ink, opacity: 0.85 }}>
        Gratis · Barcelona
      </div>
    </AbsoluteFill>
  );
};

/** Sub-secuencia de subtítulo sincronizada a un plano. */
const Seg: React.FC<{ range: readonly [number, number] | number[]; children: React.ReactNode }> = ({ range, children }) => (
  <Sequence from={range[0]} durationInFrames={range[1] - range[0]}>
    {children}
  </Sequence>
);

export const EstoLoTiraronHoy: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <WaitFonts>
        {/* Vídeo base (audio original, voz normalizada) */}
        <Sequence from={0} durationInFrames={VIDEO_END}>
          <OffthreadVideo src={SRC.base} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Sequence>

        {/* Subtítulos / carteles por plano */}
        <Seg range={CUT.s1}>
          <CoverBanner />
        </Seg>
        <Seg range={CUT.s2}>
          <BigStamp text="¡GRATIS!" />
        </Seg>
        <Seg range={CUT.s3}>
          <Cap text="No está roto." accent="roto" />
        </Seg>
        <Seg range={CUT.s4}>
          <Cap text="No es basura." accent="basura" />
        </Seg>
        <Seg range={CUT.s5}>
          <Cap text="Nadie lo vio." accent="Nadie" />
        </Seg>
        {/* s6-s7 sin texto */}
        <Seg range={CUT.s8}>
          <Cap text="Para que esto no pase, creamos Donnit." accent="Donnit" size={52} bottom={250} />
        </Seg>
        <Seg range={CUT.s9}>
          <Cap text="Para que nunca más saques tu mueble a la calle." size={50} bottom={250} />
        </Seg>
        <Seg range={CUT.s10}>
          <Cap text="¿Por qué? No hace falta." accent="No hace falta" size={54} bottom={250} />
        </Seg>
        <Seg range={CUT.s11}>
          <Cap text="Porque a alguien más le sirve." accent="le sirve" size={52} bottom={250} />
        </Seg>
        <Seg range={CUT.s12}>
          <FinalTitle />
        </Seg>

        {/* Cierre de marca */}
        <Sequence from={VIDEO_END} durationInFrames={TOTAL_DURATION - VIDEO_END}>
          <EndCard />
        </Sequence>
      </WaitFonts>
    </AbsoluteFill>
  );
};
