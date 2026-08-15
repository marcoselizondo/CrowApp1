import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_FAMILY } from "../donnit/theme";
import { WaitForFonts } from "../donnit/WaitForFonts";
import { DonnitLogo } from "../donnit/Wordmark";

export const FPS17 = 30;
const V = (n: string) => staticFile(`reel-17-ventilador/edit/${n}.mp4`);
const s = (sec: number) => Math.round(sec * FPS17);

export const TALK1 = s(5.6);
export const TALK2 = s(5.7);
export const APP = s(16);
export const CTA = s(3);
export const DURATION17 = TALK1 + TALK2 + APP + CTA;

/** Soft fade-in on a cut (documentary, not flashy). */
const Clip: React.FC<{ src: string; muted?: boolean }> = ({ src, muted }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: o, backgroundColor: "#000" }}>
      <OffthreadVideo src={src} muted={muted} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </AbsoluteFill>
  );
};

const Scrim: React.FC<{ from?: string }> = () => (
  <AbsoluteFill
    style={{
      background:
        "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 24%, rgba(0,0,0,0) 42%)",
    }}
  />
);

/** Clean lower-third text that rises + fades in and out. */
const LowerText: React.FC<{ text: string; accent?: string; from: number; dur: number }> = ({ text, accent, from, dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - from;
  const enter = spring({ frame: local, fps, config: { damping: 200, mass: 0.7, stiffness: 90 } });
  const out = interpolate(local, [dur - 10, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacity = local < 0 ? 0 : Math.min(enter, out);
  const y = interpolate(enter, [0, 1], [24, 0]);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 360,
        display: "flex",
        justifyContent: "center",
        padding: "0 80px",
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div style={{ textAlign: "center", fontFamily: FONT_FAMILY }}>
        <span style={{ fontWeight: 800, fontSize: 62, lineHeight: 1.12, color: "#fff", textShadow: "0 4px 20px rgba(0,0,0,0.7)" }}>
          {text}
        </span>
        {accent ? (
          <div style={{ marginTop: 14, height: 6, width: 120, borderRadius: 6, background: accent, marginLeft: "auto", marginRight: "auto" }} />
        ) : null}
      </div>
    </div>
  );
};

/** Small chip over the app section (leaves room for the voice-over). */
const AppChip: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - 8, fps, config: { damping: 200, stiffness: 90 } });
  return (
    <div
      style={{
        position: "absolute",
        top: 150,
        left: 60,
        transform: `translateY(${interpolate(enter, [0, 1], [-16, 0])}px)`,
        opacity: enter,
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "rgba(20,38,27,0.6)",
        border: `2px solid ${COLORS.green}`,
        padding: "10px 22px 10px 12px",
        borderRadius: 999,
        backdropFilter: "blur(4px)",
      }}
    >
      <DonnitLogo size={44} />
      <span style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 34, color: "#fff" }}>Publicar · 30 seg</span>
    </div>
  );
};

const EndCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 200, mass: 0.7, stiffness: 110 } });
  const line = spring({ frame: frame - 12, fps, config: { damping: 200, stiffness: 80 } });
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.green} 0%, ${COLORS.greenDark} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT_FAMILY,
        textAlign: "center",
        padding: "0 90px",
      }}
    >
      <div style={{ transform: `translateY(${interpolate(pop, [0, 1], [24, 0])}px) scale(${interpolate(pop, [0, 1], [0.94, 1])})`, opacity: pop, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ background: "#fff", padding: 22, borderRadius: 40, boxShadow: "0 18px 44px rgba(20,38,27,0.28)", marginBottom: 30 }}>
          <DonnitLogo size={120} />
        </div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.ink, letterSpacing: -1, lineHeight: 1.1 }}>
          Publica ese ventilador<br />en Donnit
        </div>
        <div style={{ marginTop: 22, height: 7, width: 200, borderRadius: 7, background: COLORS.ink, opacity: 0.85, transform: `scaleX(${line})` }} />
      </div>
    </AbsoluteFill>
  );
};

export const Reel17: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <WaitForFonts>
        {/* 1 — hablando (tu audio) */}
        <Sequence from={0} durationInFrames={TALK1} name="talk1">
          <Clip src={V("talk1")} />
          <Scrim />
          <LowerText text="Lleva un año parado" accent={COLORS.green} from={16} dur={TALK1 - 20} />
        </Sequence>
        {/* 2 — hablando (tu audio) */}
        <Sequence from={TALK1} durationInFrames={TALK2} name="talk2">
          <Clip src={V("talk2")} />
          <Scrim />
          <LowerText text="Publícalo antes de olvidarlo" accent={COLORS.green} from={TALK2 - 90} dur={80} />
        </Sequence>
        {/* 3 — app (mudo, para tu voz en off) */}
        <Sequence from={TALK1 + TALK2} durationInFrames={APP} name="app">
          <Clip src={V("app_fast")} muted />
          <AppChip />
        </Sequence>
        {/* 4 — CTA */}
        <Sequence from={TALK1 + TALK2 + APP} durationInFrames={CTA} name="cta">
          <EndCTA />
        </Sequence>
      </WaitForFonts>
    </AbsoluteFill>
  );
};
