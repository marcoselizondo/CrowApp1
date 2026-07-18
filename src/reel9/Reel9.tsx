import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_FAMILY, IMPACT_FONT } from "../donnit/theme";
import { DonnitLogo } from "../donnit/Wordmark";
import { WaitForFonts } from "../donnit/WaitForFonts";
import {
  APP_SEARCH,
  CTA_DURATION,
  SHOTS,
  SHOTS_DURATION,
  starts,
  type Shot,
} from "./story9";

/** A narrative shot; ambient audio can be muted from `muteFrom` (silence beat). */
const Clip: React.FC<{ shot: Shot }> = ({ shot }) => (
  <AbsoluteFill style={{ backgroundColor: "black" }}>
    <OffthreadVideo
      src={shot.src}
      volume={(f) => (shot.muteFrom !== undefined && f >= shot.muteFrom ? 0 : 1)}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </AbsoluteFill>
);

/** Floating phone mockup showing the Donnit search (app_search). */
const PhoneMockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 140, mass: 0.7, stiffness: 190 } });
  const out = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(pop, [0, 1], [0.4, 1]);
  const float = Math.sin(frame / 18) * 12;
  const rot = interpolate(pop, [0, 1], [-8, -3]) + Math.sin(frame / 26) * 1.5;
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "flex-end",
        opacity: out,
        transform: `translate(-70px, ${-120 + float}px)`,
      }}
    >
      <div
        style={{
          width: 360,
          height: 760,
          borderRadius: 52,
          background: "#0c0c0e",
          padding: 10,
          boxShadow: "0 40px 80px rgba(0,0,0,0.55)",
          transform: `scale(${scale}) rotate(${rot}deg)`,
        }}
      >
        <div style={{ width: "100%", height: "100%", borderRadius: 44, overflow: "hidden", background: "#000" }}>
          <OffthreadVideo src={APP_SEARCH} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Anton impact text card. */
const Impact: React.FC<{ lines: string[]; color?: string; size?: number; top?: number }> = ({
  lines,
  color = COLORS.white,
  size = 96,
  top,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const inn = spring({ frame, fps, config: { damping: 130, stiffness: 200 } });
  const out = interpolate(frame, [durationInFrames - 6, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(inn, [0, 1], [40, 0]);
  return (
    <AbsoluteFill style={{ justifyContent: top !== undefined ? "flex-start" : "center", alignItems: "center", opacity: Math.min(inn, out) }}>
      <div style={{ marginTop: top, transform: `translateY(${y}px)`, textAlign: "center", padding: "0 60px" }}>
        {lines.map((l, i) => (
          <div key={i} style={{ fontFamily: IMPACT_FONT, fontSize: size, lineHeight: 1.0, color, textTransform: "uppercase", letterSpacing: 1, textShadow: "0 6px 26px rgba(0,0,0,0.7)" }}>
            {l}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

/** WhatsApp-style chat bubble. */
const ChatBubble: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 160, stiffness: 200 } });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "flex-end", padding: "260px 60px" }}>
      <div style={{ transform: `scale(${pop})`, transformOrigin: "top right", background: "#25D366", color: "#0b1f12", fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 46, padding: "22px 34px", borderRadius: 28, borderTopRightRadius: 6, maxWidth: 720, boxShadow: "0 14px 34px rgba(0,0,0,0.4)" }}>
        {text}
      </div>
    </AbsoluteFill>
  );
};

/** "VAMOS ARGENTINA" paper sign gag. */
const Sign: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 120, stiffness: 220 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `scale(${pop}) rotate(-6deg)`, background: "#fff", color: "#0b1f12", fontFamily: IMPACT_FONT, fontSize: 74, padding: "26px 44px", borderRadius: 10, boxShadow: "0 16px 40px rgba(0,0,0,0.5)", border: "3px solid #74acdf", textAlign: "center", lineHeight: 1.0 }}>
        VAMOS<br />ARGENTINA 🇦🇷
      </div>
    </AbsoluteFill>
  );
};

const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 160, mass: 0.7, stiffness: 130 } });
  const p2 = spring({ frame: frame - 12, fps, config: { damping: 160, stiffness: 140 } });
  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, ${COLORS.green} 0%, ${COLORS.greenDark} 100%)`, justifyContent: "center", alignItems: "center", fontFamily: FONT_FAMILY }}>
      <div style={{ transform: `scale(${interpolate(pop, [0, 1], [0.7, 1])})`, opacity: pop, background: "#fff", padding: 26, borderRadius: 52, boxShadow: "0 22px 54px rgba(20,38,27,0.3)", marginBottom: 44 }}>
        <DonnitLogo size={180} />
      </div>
      <div style={{ transform: `scale(${interpolate(p2, [0, 1], [0.9, 1])})`, opacity: p2, fontWeight: 800, fontSize: 78, color: COLORS.ink, textAlign: "center", letterSpacing: -2, lineHeight: 1.05, padding: "0 60px" }}>
        Con Donnit,<br />todos ganamos.
      </div>
    </AbsoluteFill>
  );
};

// Flag colors
const CELESTE = "#74ACDF";
const SUN = "#F6C400";
const ESP_RED = "#C60B1E";
const ESP_YEL = "#FFC400";

/** Hook title with Spain-flag "Domingo." and Argentina-colored "Final del mundo." */
const HookTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const inn = spring({ frame, fps, config: { damping: 130, stiffness: 200 } });
  const out = interpolate(frame, [durationInFrames - 6, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(inn, [0, 1], [40, 0]);
  const base: React.CSSProperties = {
    fontFamily: IMPACT_FONT,
    fontSize: 104,
    lineHeight: 1.0,
    textTransform: "uppercase",
    letterSpacing: 1,
  };
  const shadow = "0 6px 26px rgba(0,0,0,0.75)";
  const cel = (t: string) => (
    <span style={{ color: CELESTE, textShadow: shadow }}>{t}</span>
  );
  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", opacity: Math.min(inn, out) }}>
      <div style={{ marginTop: 200, transform: `translateY(${y}px)`, textAlign: "center", padding: "0 50px" }}>
        {/* Domingo. — Spain flag bands */}
        <div style={base}>
          <span
            style={{
              background: `linear-gradient(180deg, ${ESP_RED} 0 28%, ${ESP_YEL} 28% 72%, ${ESP_RED} 72% 100%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: "drop-shadow(0 5px 14px rgba(0,0,0,0.6))",
            }}
          >
            Domingo.
          </span>
        </div>
        {/* Final del mundo. — Argentina */}
        <div style={base}>
          {cel("Final ")}
          {cel("d")}
          <span style={{ color: SUN, textShadow: shadow }}>e</span>
          {cel("l ")}
          {cel("mundo.")}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** iOS-style push notification banner with the Donnit logo. */
const PushNotif: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const inn = spring({ frame, fps, config: { damping: 150, mass: 0.8, stiffness: 170 } });
  const out = interpolate(frame, [durationInFrames - 10, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(inn, [0, 1], [-260, 0]) - out * 260;
  const opacity = interpolate(inn, [0, 1], [0, 1]) * (1 - out);
  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center" }}>
      <div
        style={{
          marginTop: 70,
          transform: `translateY(${y}px)`,
          opacity,
          width: 900,
          display: "flex",
          alignItems: "center",
          gap: 22,
          background: "rgba(245,245,245,0.92)",
          backdropFilter: "blur(14px)",
          borderRadius: 40,
          padding: "24px 30px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
          fontFamily: FONT_FAMILY,
        }}
      >
        <div style={{ borderRadius: 18, overflow: "hidden", flexShrink: 0 }}>
          <DonnitLogo size={82} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#5b5b5b", fontSize: 30, fontWeight: 600 }}>
            <span style={{ textTransform: "uppercase", letterSpacing: 1 }}>Donnit</span>
            <span>ahora</span>
          </div>
          <div style={{ color: "#0b0b0b", fontSize: 40, fontWeight: 700, lineHeight: 1.15, marginTop: 4 }}>
            A Luca le interesa tu proyector 🎥
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Reel9: React.FC = () => {
  let offset = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      <WaitForFonts>
        {SHOTS.map(({ key, shot }) => {
          const from = offset;
          offset += shot.durationInFrames;
          return (
            <Sequence key={key} from={from} durationInFrames={shot.durationInFrames} name={key}>
              <Clip shot={shot} />
            </Sequence>
          );
        })}

        {/* Hook text + phone mockup */}
        <Sequence from={starts.hook} durationInFrames={62} name="hook-text">
          <HookTitle />
        </Sequence>
        <Sequence from={starts.hook + 8} durationInFrames={94} name="mockup">
          <PhoneMockup />
        </Sequence>

        {/* Push notification, then WhatsApp reply (Bruno) */}
        <Sequence from={starts.reads} durationInFrames={48} name="push">
          <PushNotif />
        </Sequence>
        <Sequence from={starts.reads + 50} durationInFrames={31} name="chat">
          <ChatBubble text="«A las 18:00 me va bien» ✅" />
        </Sequence>

        {/* Luca's line at the handshake */}
        <Sequence from={starts.handshake} durationInFrames={70} name="line">
          <Impact lines={["«Que gane", "el mejor…»"]} size={92} top={230} />
        </Sequence>

        {/* Sign gag */}
        <Sequence from={starts.back + 6} durationInFrames={48} name="sign">
          <Sign />
        </Sequence>

        {/* CTA */}
        <Sequence from={SHOTS_DURATION} durationInFrames={CTA_DURATION} name="cta">
          <CTA />
        </Sequence>
      </WaitForFonts>
    </AbsoluteFill>
  );
};
