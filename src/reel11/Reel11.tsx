import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, SUBTITLE_FONT } from "../donnit/theme";
import { WaitForFonts } from "../donnit/WaitForFonts";
import { DonnitLogo } from "../donnit/Wordmark";
import {
  END_DURATION,
  HOOK_CLIPS,
  HOOK_DURATION,
  HOOK_FLASH,
  SCENES,
  type Scene,
  TOTAL_TREASURES,
} from "./story11";

const STROKE = "8px #0a140e";

/** Video with a punch-in reveal + decaying camera shake (the "movido" feel). */
const DynClip: React.FC<{ src: string; shake?: number }> = ({
  src,
  shake = 16,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 120, overshootClamping: false },
  });
  const scale = interpolate(pop, [0, 1], [1.22, 1.04]);
  const blur = interpolate(frame, [0, 6], [9, 0], { extrapolateRight: "clamp" });
  const amp = interpolate(frame, [0, 16], [shake, 0], {
    extrapolateRight: "clamp",
  });
  const x = Math.sin(frame * 3.1) * amp;
  const y = Math.cos(frame * 3.7) * amp * 0.7;
  const rot = Math.sin(frame * 2.4) * amp * 0.12;
  return (
    <AbsoluteFill
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})`,
        filter: `blur(${blur}px) saturate(1.12) contrast(1.04)`,
      }}
    >
      <OffthreadVideo
        src={src}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </AbsoluteFill>
  );
};

/** Quick white flash at a cut. */
const Flash: React.FC = () => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 3, 7], [0.85, 0.3, 0], {
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ backgroundColor: "#fff", opacity: o }} />;
};

const Scrim: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 24%, rgba(0,0,0,0) 42%), linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 20%)",
    }}
  />
);

/** "GRATIS €0" rubber stamp that slams in. */
const PriceStamp: React.FC<{ text: string; at: number }> = ({ text, at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - at,
    fps,
    config: { damping: 10, mass: 0.7, stiffness: 130, overshootClamping: false },
  });
  const scale = interpolate(s, [0, 1], [2.6, 1]);
  const op = interpolate(frame - at, [0, 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        top: 250,
        right: 60,
        transform: `rotate(-13deg) scale(${scale})`,
        opacity: op,
        background: COLORS.green,
        color: "#0a140e",
        fontFamily: SUBTITLE_FONT,
        fontWeight: 800,
        fontSize: 74,
        letterSpacing: 1,
        padding: "10px 34px",
        borderRadius: 18,
        border: "7px solid #0a140e",
        boxShadow: "0 16px 34px rgba(0,0,0,0.4)",
      }}
    >
      {text}
      <div style={{ fontSize: 40, textAlign: "center", marginTop: -6 }}>€0</div>
    </div>
  );
};

/** Item name label that slides up from the bottom. */
const ItemLabel: React.FC<{ emoji: string; label: string }> = ({
  emoji,
  label,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - 6,
    fps,
    config: { damping: 16, mass: 0.7, stiffness: 120 },
  });
  const y = interpolate(s, [0, 1], [140, 0]);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 360,
        display: "flex",
        justifyContent: "center",
        transform: `translateY(${y}px)`,
        opacity: s,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          background: "rgba(10,20,14,0.66)",
          border: `3px solid ${COLORS.green}`,
          backdropFilter: "blur(4px)",
          padding: "16px 34px",
          borderRadius: 999,
          fontFamily: SUBTITLE_FONT,
        }}
      >
        <span style={{ fontSize: 58 }}>{emoji}</span>
        <span
          style={{
            fontSize: 58,
            fontWeight: 800,
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

/** Treasure counter chip, top-left. */
const Counter: React.FC<{ idx: number }> = ({ idx }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 3, fps, config: { damping: 12, stiffness: 140 } });
  return (
    <div
      style={{
        position: "absolute",
        top: 70,
        left: 60,
        transform: `scale(${interpolate(s, [0, 1], [0, 1])})`,
        background: "#fff",
        color: COLORS.green,
        fontFamily: SUBTITLE_FONT,
        fontWeight: 800,
        fontSize: 48,
        padding: "10px 30px",
        borderRadius: 999,
        boxShadow: "0 10px 24px rgba(0,0,0,0.3)",
      }}
    >
      Tesoro {idx}/{TOTAL_TREASURES}
    </div>
  );
};

/** One scene = its clip(s) stacked in local sequences + stickers over the whole scene. */
const SceneBlock: React.FC<{ scene: Scene; sceneDuration: number }> = ({
  scene,
  sceneDuration,
}) => {
  let offset = 0;
  return (
    <AbsoluteFill>
      {scene.clips.map((c, i) => {
        const from = offset;
        offset += c.durationInFrames;
        return (
          <Sequence key={i} from={from} durationInFrames={c.durationInFrames}>
            <DynClip src={c.src} />
            <Flash />
          </Sequence>
        );
      })}
      <Scrim />
      {/* stickers span the whole scene */}
      <Sequence durationInFrames={sceneDuration}>
        <Counter idx={scene.idx} />
        <PriceStamp text={scene.price} at={10} />
        <ItemLabel emoji={scene.emoji} label={scene.label} />
      </Sequence>
    </AbsoluteFill>
  );
};

/** Rapid-fire hook with a slamming title. */
const Hook: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {HOOK_CLIPS.map((src, i) => (
        <Sequence key={i} from={i * HOOK_FLASH} durationInFrames={HOOK_FLASH}>
          <DynClip src={src} shake={26} />
          <Flash />
        </Sequence>
      ))}
      <Scrim />
      <HookTitle />
    </AbsoluteFill>
  );
};

const HookTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 12, mass: 0.6, stiffness: 130 } });
  const scale = interpolate(s, [0, 1], [0.4, 1]);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 70px" }}>
      <div
        style={{
          transform: `scale(${scale}) rotate(-3deg)`,
          textAlign: "center",
          fontFamily: SUBTITLE_FONT,
          fontWeight: 800,
          textTransform: "uppercase",
          color: "#fff",
          WebkitTextStroke: STROKE,
          paintOrder: "stroke fill",
          lineHeight: 1.0,
          textShadow: "0 10px 0 rgba(10,20,14,0.35)",
        }}
      >
        <div style={{ fontSize: 168, color: COLORS.green }}>Día 1</div>
        <div style={{ fontSize: 74 }}>buscando cosas</div>
        <div style={{ fontSize: 74 }}>en Barcelona 👀</div>
      </div>
    </AbsoluteFill>
  );
};

/** Closing brand card. */
const EndCardR11: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 200, mass: 0.7, stiffness: 110 } });
  const cta = spring({ frame: frame - 10, fps, config: { damping: 200, stiffness: 120 } });
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.green} 0%, ${COLORS.greenDark} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: SUBTITLE_FONT,
        textAlign: "center",
        padding: "0 90px",
      }}
    >
      <div style={{ transform: `translateY(${interpolate(pop, [0, 1], [30, 0])}px)`, opacity: pop, marginBottom: 40 }}>
        <div
          style={{
            fontSize: 62,
            fontWeight: 800,
            color: COLORS.ink,
            lineHeight: 1.12,
          }}
        >
          Súbelo a Donnit<br />y no acaba en la calle ♻️
        </div>
      </div>
      <div style={{ opacity: cta, transform: `scale(${interpolate(cta, [0, 1], [0.9, 1])})`, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ background: "#fff", padding: 26, borderRadius: 48, boxShadow: "0 20px 50px rgba(20,38,27,0.28)", marginBottom: 34 }}>
          <DonnitLogo size={150} />
        </div>
        <div style={{ fontSize: 82, fontWeight: 800, color: COLORS.ink, letterSpacing: -1 }}>
          Descarga Donnit
        </div>
        <div style={{ fontSize: 36, fontWeight: 500, color: COLORS.ink, opacity: 0.85, marginTop: 14 }}>
          Dale una segunda vida a lo que sobra
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Reel11: React.FC = () => {
  let offset = HOOK_DURATION;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <WaitForFonts>
        {/* HOOK */}
        <Sequence durationInFrames={HOOK_DURATION} name="hook">
          <Hook />
        </Sequence>

        {/* SCENES */}
        {SCENES.map((scene) => {
          const dur = scene.clips.reduce((a, c) => a + c.durationInFrames, 0);
          const from = offset;
          offset += dur;
          return (
            <Sequence key={scene.key} from={from} durationInFrames={dur} name={scene.key}>
              <SceneBlock scene={scene} sceneDuration={dur} />
            </Sequence>
          );
        })}

        {/* END */}
        <Sequence from={offset} durationInFrames={END_DURATION} name="end">
          <EndCardR11 />
        </Sequence>
      </WaitForFonts>
    </AbsoluteFill>
  );
};
