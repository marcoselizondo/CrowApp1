import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_FAMILY, SUBTITLE_FONT } from "../donnit/theme";
import { WaitForFonts } from "../donnit/WaitForFonts";
import { DonnitLogo } from "../donnit/Wordmark";
import { KineticCaption } from "./KineticCaption";
import {
  END_DURATION,
  SCENES,
  type Scene,
  TITLE_LINE1,
  TITLE_LINE2,
} from "./story14";

/** Slow Ken Burns zoom + soft fade-in on the cut (natural, no shake/flash). */
const KenBurns: React.FC<{ src: string; durationInFrames: number }> = ({
  src,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, durationInFrames], [1.0, 1.08], {
    extrapolateRight: "clamp",
  });
  const fade = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: fade }}>
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <OffthreadVideo
          src={src}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Scrim: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.14) 26%, rgba(0,0,0,0) 44%)",
    }}
  />
);

/** Discreet "GRATIS" tag that fades in gently, top-right. */
const GratisTag: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 8, fps, config: { damping: 20, stiffness: 110 } });
  return (
    <div
      style={{
        position: "absolute",
        top: 76,
        right: 60,
        transform: `translateY(${interpolate(s, [0, 1], [-14, 0])}px)`,
        opacity: s,
        background: COLORS.green,
        color: COLORS.ink,
        fontFamily: SUBTITLE_FONT,
        fontWeight: 800,
        fontSize: 40,
        letterSpacing: 1,
        padding: "8px 24px",
        borderRadius: 999,
        boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
      }}
    >
      GRATIS
    </div>
  );
};

/** Calm intro title over the first scene. */
const TitleIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [4, 16, 46, 58], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [4, 16], [16, 0], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", opacity, padding: "0 90px" }}
    >
      <div style={{ transform: `translateY(${y}px)`, textAlign: "center", fontFamily: FONT_FAMILY }}>
        <div style={{ fontSize: 128, fontWeight: 800, color: "#fff", letterSpacing: -2, textShadow: "0 6px 26px rgba(0,0,0,0.6)" }}>
          {TITLE_LINE1}
        </div>
        <div style={{ fontSize: 52, fontWeight: 700, color: "#fff", marginTop: 8, textShadow: "0 4px 18px rgba(0,0,0,0.6)" }}>
          {TITLE_LINE2}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneBlock: React.FC<{ scene: Scene; sceneDuration: number; withTitle?: boolean }> = ({
  scene,
  sceneDuration,
  withTitle,
}) => {
  let offset = 0;
  return (
    <AbsoluteFill>
      {scene.clips.map((c, i) => {
        const from = offset;
        offset += c.durationInFrames;
        return (
          <Sequence key={i} from={from} durationInFrames={c.durationInFrames}>
            <KenBurns src={c.src} durationInFrames={c.durationInFrames} />
          </Sequence>
        );
      })}
      <Scrim />
      <Sequence durationInFrames={sceneDuration}>
        <GratisTag />
        {withTitle ? <TitleIntro /> : null}
        {scene.captions.map((cap, i) => (
          <Sequence key={i} from={cap.from} durationInFrames={cap.durationInFrames}>
            <KineticCaption caption={cap} />
          </Sequence>
        ))}
      </Sequence>
    </AbsoluteFill>
  );
};

/** Closing brand card with a download CTA. */
const EndCardR14: React.FC = () => {
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
        fontFamily: FONT_FAMILY,
        textAlign: "center",
        padding: "0 90px",
      }}
    >
      <div style={{ transform: `translateY(${interpolate(pop, [0, 1], [26, 0])}px)`, opacity: pop, marginBottom: 36 }}>
        <div style={{ fontSize: 58, fontWeight: 800, color: COLORS.ink, lineHeight: 1.14 }}>
          Todo esto acabó en la calle.<br />No tiene por qué. ♻️
        </div>
      </div>
      <div style={{ opacity: cta, transform: `scale(${interpolate(cta, [0, 1], [0.92, 1])})`, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ background: "#fff", padding: 24, borderRadius: 46, boxShadow: "0 20px 50px rgba(20,38,27,0.28)", marginBottom: 30 }}>
          <DonnitLogo size={140} />
        </div>
        <div style={{ fontSize: 78, fontWeight: 800, color: COLORS.ink, letterSpacing: -1 }}>Descarga Donnit</div>
        <div style={{ fontSize: 40, fontWeight: 700, color: COLORS.ink, opacity: 0.9, marginTop: 14 }}>
          Ve lo que regalan en tu barrio 👆 link en la bio
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Reel14: React.FC = () => {
  let offset = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <WaitForFonts>
        {SCENES.map((scene, idx) => {
          const dur = scene.clips.reduce((a, c) => a + c.durationInFrames, 0);
          const from = offset;
          offset += dur;
          return (
            <Sequence key={scene.key} from={from} durationInFrames={dur} name={scene.key}>
              <SceneBlock scene={scene} sceneDuration={dur} withTitle={idx === 0} />
            </Sequence>
          );
        })}
        <Sequence from={offset} durationInFrames={END_DURATION} name="end">
          <EndCardR14 />
        </Sequence>
      </WaitForFonts>
    </AbsoluteFill>
  );
};
