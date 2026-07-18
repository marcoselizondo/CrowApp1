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
  ENDING_DURATION,
  SHOTS,
  SHOTS_DURATION,
  starts,
  type Shot,
} from "./story9";

// Flag colors
const CELESTE = "#74ACDF";
const SUN = "#F6C400";
const ESP_RED = "#C60B1E";
const ESP_YEL = "#FFC400";

/** A narrative shot; ambient can be muted within [muteFrom, muteTo). */
const Clip: React.FC<{ shot: Shot }> = ({ shot }) => (
  <AbsoluteFill style={{ backgroundColor: "black" }}>
    <OffthreadVideo
      src={shot.src}
      volume={(f) =>
        shot.muteFrom !== undefined &&
        f >= shot.muteFrom &&
        (shot.muteTo === undefined || f < shot.muteTo)
          ? 0
          : 1
      }
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </AbsoluteFill>
);

/** Floating phone mockup with a "Lo quiero" button that gets pressed. */
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

  // Tap on "Lo quiero" right before the app cuts to WhatsApp (~frame 50).
  const tapT = frame - 42;
  const press = tapT >= 0 ? interpolate(tapT, [0, 4, 8], [1, 0.9, 1], { extrapolateRight: "clamp" }) : 1;
  const ripple = tapT >= 0 ? interpolate(tapT, [0, 12], [0.2, 3], { extrapolateRight: "clamp" }) : 0;
  const rippleOp = tapT >= 0 ? interpolate(tapT, [0, 12], [0.5, 0], { extrapolateRight: "clamp" }) : 0;
  const btnOp = interpolate(frame, [4, 10, 48, 54], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "flex-end", opacity: out, transform: `translate(-70px, ${-120 + float}px)` }}
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
        <div style={{ width: "100%", height: "100%", borderRadius: 44, overflow: "hidden", background: "#000", position: "relative" }}>
          <OffthreadVideo src={APP_SEARCH} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          {/* "Lo quiero" button that presses */}
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 34, display: "flex", justifyContent: "center", opacity: btnOp }}>
            <div style={{ position: "relative", transform: `scale(${press})` }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 999, background: COLORS.green, transform: `scale(${1 + ripple})`, opacity: rippleOp }} />
              <div style={{ position: "relative", background: COLORS.green, color: "#0b1f12", fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 26, padding: "14px 40px", borderRadius: 999, boxShadow: "0 8px 20px rgba(0,0,0,0.35)" }}>
                Lo quiero ❤️
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Hook title: Spain-flag "Domingo." + Argentina-flag "Final del mundo." */
const flagText = (grad: string): React.CSSProperties => ({
  background: grad,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextStroke: "2px rgba(0,0,0,0.35)",
  filter: "drop-shadow(0 5px 14px rgba(0,0,0,0.55))",
});

const HookTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const inn = spring({ frame, fps, config: { damping: 130, stiffness: 200 } });
  const out = interpolate(frame, [durationInFrames - 6, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(inn, [0, 1], [40, 0]);
  const base: React.CSSProperties = { fontFamily: IMPACT_FONT, fontSize: 104, lineHeight: 1.0, textTransform: "uppercase", letterSpacing: 1 };
  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", opacity: Math.min(inn, out) }}>
      <div style={{ marginTop: 200, transform: `translateY(${y}px)`, textAlign: "center", padding: "0 46px" }}>
        <div style={base}>
          <span style={flagText(`linear-gradient(180deg, ${ESP_RED} 0 28%, ${ESP_YEL} 28% 72%, ${ESP_RED} 72% 100%)`)}>Domingo.</span>
        </div>
        <div style={base}>
          <span style={flagText(`linear-gradient(180deg, ${CELESTE} 0 30%, #ffffff 30% 70%, ${CELESTE} 70% 100%)`)}>Final del mundo.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Anton impact text card. */
const Impact: React.FC<{ lines: string[]; color?: string; size?: number; top?: number }> = ({ lines, color = COLORS.white, size = 96, top }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const inn = spring({ frame, fps, config: { damping: 130, stiffness: 200 } });
  const out = interpolate(frame, [durationInFrames - 6, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(inn, [0, 1], [40, 0]);
  return (
    <AbsoluteFill style={{ justifyContent: top !== undefined ? "flex-start" : "center", alignItems: "center", opacity: Math.min(inn, out) }}>
      <div style={{ marginTop: top, transform: `translateY(${y}px)`, textAlign: "center", padding: "0 60px" }}>
        {lines.map((l, i) => (
          <div key={i} style={{ fontFamily: IMPACT_FONT, fontSize: size, lineHeight: 1.0, color, textTransform: "uppercase", letterSpacing: 1, textShadow: "0 6px 26px rgba(0,0,0,0.75)" }}>
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

/** iOS-style Donnit push notification. */
const PushNotif: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const inn = spring({ frame, fps, config: { damping: 150, mass: 0.8, stiffness: 170 } });
  const out = interpolate(frame, [durationInFrames - 10, durationInFrames], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(inn, [0, 1], [-260, 0]) - out * 260;
  const opacity = interpolate(inn, [0, 1], [0, 1]) * (1 - out);
  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center" }}>
      <div style={{ marginTop: 70, transform: `translateY(${y}px)`, opacity, width: 900, display: "flex", alignItems: "center", gap: 22, background: "rgba(245,245,245,0.92)", backdropFilter: "blur(14px)", borderRadius: 40, padding: "24px 30px", boxShadow: "0 20px 50px rgba(0,0,0,0.35)", fontFamily: FONT_FAMILY }}>
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

/** Special closing: match hype card (flags + trophy + date/time + logo). */
const SpecialEnding: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const arg = spring({ frame: frame - 4, fps, config: { damping: 120, stiffness: 180 } });
  const esp = spring({ frame: frame - 8, fps, config: { damping: 120, stiffness: 180 } });
  const cup = spring({ frame: frame - 14, fps, config: { damping: 90, stiffness: 200 } });
  const date = spring({ frame: frame - 22, fps, config: { damping: 150, stiffness: 160 } });
  const cupPulse = 1 + Math.sin(frame / 6) * 0.04;
  const logo = spring({ frame, fps, config: { damping: 160, stiffness: 160 } });

  return (
    <AbsoluteFill style={{ background: "radial-gradient(120% 90% at 50% 30%, #123322 0%, #060d08 70%)", justifyContent: "center", alignItems: "center", fontFamily: IMPACT_FONT }}>
      {/* Donnit logo top */}
      <div style={{ position: "absolute", top: 90, transform: `scale(${logo})`, display: "flex", alignItems: "center", gap: 16 }}>
        <DonnitLogo size={64} />
        <span style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 46, color: "#fff" }}>Donnit</span>
      </div>

      {/* Flags clashing over the cup */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 10 }}>
        <div style={{ fontSize: 150, transform: `translateX(${interpolate(arg, [0, 1], [-260, 0])}px)`, opacity: arg }}>🇦🇷</div>
        <div style={{ fontSize: 200, transform: `scale(${cup * cupPulse})`, filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.6))" }}>🏆</div>
        <div style={{ fontSize: 150, transform: `translateX(${interpolate(esp, [0, 1], [260, 0])}px)`, opacity: esp }}>🇪🇸</div>
      </div>

      {/* ARGENTINA vs ESPAÑA */}
      <div style={{ fontSize: 84, letterSpacing: 1, textTransform: "uppercase", textAlign: "center", transform: `scale(${cup})`, opacity: cup }}>
        <span style={{ color: CELESTE }}>Argentina</span>
        <span style={{ color: "#fff", margin: "0 14px" }}>vs</span>
        <span style={{ background: `linear-gradient(180deg, ${ESP_RED} 0 28%, ${ESP_YEL} 28% 72%, ${ESP_RED} 72% 100%)`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>España</span>
      </div>
      <div style={{ fontSize: 40, color: "#9fe6b0", letterSpacing: 6, marginTop: 6, opacity: cup }}>FINAL DEL MUNDIAL</div>

      {/* Date + time */}
      <div style={{ marginTop: 44, transform: `translateY(${interpolate(date, [0, 1], [40, 0])}px)`, opacity: date, textAlign: "center" }}>
        <div style={{ fontSize: 128, color: "#fff", lineHeight: 0.95 }}>19 DE JULIO</div>
        <div style={{ fontSize: 90, color: SUN }}>21:00</div>
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

        {/* Hook: flag title + phone mockup */}
        <Sequence from={starts.hook} durationInFrames={62} name="hook-text">
          <HookTitle />
        </Sequence>
        <Sequence from={starts.hook + 8} durationInFrames={94} name="mockup">
          <PhoneMockup />
        </Sequence>

        {/* Push notification then WhatsApp reply */}
        <Sequence from={starts.reads} durationInFrames={48} name="push">
          <PushNotif />
        </Sequence>
        <Sequence from={starts.reads + 50} durationInFrames={31} name="chat">
          <ChatBubble text="«A las 18:00 me va bien» ✅" />
        </Sequence>

        {/* Luca's line during the hug (within the organic encounter) */}
        <Sequence from={starts.encounter + 470} durationInFrames={90} name="line">
          <Impact lines={["«Que gane", "el mejor…»"]} size={92} top={230} />
        </Sequence>

        {/* Special closing */}
        <Sequence from={SHOTS_DURATION} durationInFrames={ENDING_DURATION} name="ending">
          <SpecialEnding />
        </Sequence>
      </WaitForFonts>
    </AbsoluteFill>
  );
};
