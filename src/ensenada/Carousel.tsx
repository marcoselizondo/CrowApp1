import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { COLORS, FONT_FAMILY } from "../donnit/theme";

/**
 * Carrusel solidario "Ayuda a Ensenada" (Instagram feed 1080x1350), 4 imágenes.
 * Cada frame es una diapositiva: render con `remotion still --frame=N`.
 * Tono: ayuda, no promoción. Sin emojis, sin "descarga Donnit".
 * Fotos en public/ensenada/ ya con caras, matrículas y número de casa difuminados.
 */

const BG = "#101914";
const CREAM = "#f4f7f0";
const MUTED = "rgba(244,247,240,0.74)";
const LINE = "rgba(244,247,240,0.14)";

export const SLIDES = 4;

const Frame: React.FC<{ n: number; children: React.ReactNode }> = ({ n, children }) => (
  <AbsoluteFill style={{ backgroundColor: BG, fontFamily: FONT_FAMILY, color: CREAM }}>
    {children}
    <div style={{ position: "absolute", bottom: 48, right: 64, fontSize: 26, fontWeight: 600, color: "rgba(244,247,240,0.45)" }}>
      {n} / {SLIDES}
    </div>
  </AbsoluteFill>
);

/** Foto a sangre que se funde con el fondo hacia abajo. */
const Photo: React.FC<{ src: string; height?: number | string; fadeFrom?: number; position?: string; dim?: number }> = ({
  src,
  height = "100%",
  fadeFrom = 30,
  position = "center",
  dim = 0,
}) => (
  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height, overflow: "hidden" }}>
    <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: position }} />
    <AbsoluteFill
      style={{
        background: `linear-gradient(to bottom, rgba(16,25,20,${dim}) 0%, rgba(16,25,20,${Math.max(dim, 0.05)}) ${fadeFrom}%, rgba(16,25,20,1) 100%)`,
      }}
    />
  </div>
);

const Kicker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, fontWeight: 800, letterSpacing: 3, color: COLORS.green, textTransform: "uppercase" }}>
    <div style={{ width: 44, height: 4, borderRadius: 4, background: COLORS.green }} />
    {children}
  </div>
);

const Title: React.FC<{ children: React.ReactNode; size?: number }> = ({ children, size = 64 }) => (
  <div style={{ fontSize: size, fontWeight: 800, lineHeight: 1.06, letterSpacing: -1.5, marginTop: 20 }}>{children}</div>
);

const Note: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ marginTop: 26, padding: "18px 26px", borderRadius: 16, border: `2px solid ${COLORS.green}`, fontSize: 30, fontWeight: 700, color: CREAM }}>
    {children}
  </div>
);

const Bottom: React.FC<{ children: React.ReactNode; bottom?: number }> = ({ children, bottom = 110 }) => (
  <div style={{ position: "absolute", left: 72, right: 72, bottom }}>{children}</div>
);

/* 1 — Portada + qué pasó */
const S1: React.FC = () => (
  <Frame n={1}>
    <Photo src="ensenada/calle_inundada.jpg" fadeFrom={38} position="center 40%" />
    <AbsoluteFill style={{ background: "linear-gradient(to bottom, rgba(16,25,20,0) 40%, rgba(16,25,20,0.7) 55%, rgba(16,25,20,0.92) 68%)" }} />
    <Bottom bottom={120}>
      <Kicker>Ensenada, Baja California</Kicker>
      <Title size={92}>Sube tus muebles a <span style={{ color: COLORS.green }}>Donnit</span> y ayuda a Ensenada</Title>
      <div style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.38, color: MUTED, marginTop: 24 }}>
        La tormenta tropical Rachel inundó más de 25 colonias. Muchas familias perdieron sus muebles y lo que tenían en casa.
      </div>
      <div style={{ fontSize: 32, fontWeight: 800, color: COLORS.green, marginTop: 22 }}>Te contamos cómo →</div>
    </Bottom>
  </Frame>
);

/* 3 — Donnit como herramienta: centros de acopio y donantes */
/** Tarjeta de "quién" en la diapositiva de herramienta. */
const UseCard: React.FC<{ who: string; text: string; children?: React.ReactNode }> = ({ who, text, children }) => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "28px 26px 28px", borderRadius: 22, background: "rgba(244,247,240,0.06)", border: `2px solid ${LINE}` }}>
    <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: 2, color: COLORS.green, textTransform: "uppercase" }}>{who}</div>
    <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.28, marginTop: 12, flex: 1 }}>{text}</div>
    {children}
  </div>
);

/** Pastilla tipo botón/buscador de la app (sin emojis: iconos en SVG). */
const Pill: React.FC<{ icon: "plus" | "search"; label: string; caret?: boolean }> = ({ icon, label, caret }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 22, padding: "14px 20px", borderRadius: 999, background: icon === "plus" ? COLORS.green : CREAM, color: BG, fontSize: 27, fontWeight: 800 }}>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={BG} strokeWidth="2.8" strokeLinecap="round">
      {icon === "plus" ? (
        <>
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </>
      ) : (
        <>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <line x1="15.5" y1="15.5" x2="21" y2="21" />
        </>
      )}
    </svg>
    {label}
    {caret ? <div style={{ width: 3, height: 28, background: COLORS.green, marginLeft: -6 }} /> : null}
  </div>
);

const Arrow: React.FC = () => (
  <div style={{ display: "flex", alignItems: "center", width: 36, flexShrink: 0 }}>
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={COLORS.green} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="12" x2="19" y2="12" />
      <polyline points="13,6 19,12 13,18" />
    </svg>
  </div>
);

const S2: React.FC = () => (
  <Frame n={3}>
    <Photo src="ensenada/calle_cinta.jpg" height={590} fadeFrom={30} position="center 52%" />
    <Bottom bottom={110}>
      <Kicker>Una herramienta para todos</Kicker>
      <Title size={60}>Que la ayuda llegue más fácil a quien la necesita</Title>
      <div style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.4, color: MUTED, marginTop: 14 }}>
        Donnit es gratis y visual: con una foto se ve qué hay y quién lo necesita.
      </div>
      <div style={{ display: "flex", alignItems: "stretch", gap: 14, marginTop: 30 }}>
        <UseCard who="Quien dona" text="Cualquier persona puede subir lo que ya no usa, desde la app o la web.">
          <Pill icon="plus" label="Donar" />
        </UseCard>
        <Arrow />
        <UseCard who="Quien recibe" text="Las familias damnificadas buscan lo que necesitan y lo piden gratis.">
          <Pill icon="search" label="colchón" caret />
        </UseCard>
      </div>
    </Bottom>
  </Frame>
);

/* 3 — Cosas de casa con Donnit */
const Step: React.FC<{ n: number; title: string; sub: string }> = ({ n, title, sub }) => (
  <div style={{ display: "flex", gap: 24, padding: "18px 0", borderTop: `2px solid ${LINE}` }}>
    <div style={{ width: 54, height: 54, borderRadius: 999, border: `3px solid ${COLORS.green}`, color: COLORS.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 800, flexShrink: 0 }}>
      {n}
    </div>
    <div>
      <div style={{ fontSize: 34, fontWeight: 800 }}>{title}</div>
      <div style={{ fontSize: 27, fontWeight: 500, color: MUTED, marginTop: 4 }}>{sub}</div>
    </div>
  </div>
);

const S3: React.FC = () => (
  <Frame n={2}>
    <Photo src="ensenada/arbol_coche.jpg" height={500} fadeFrom={22} position="center 58%" />
    <Bottom bottom={96}>
      <Kicker>Volver a tener hogar</Kicker>
      <Title size={56}>Las familias también necesitan cosas de casa</Title>
      <div style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.4, color: MUTED, marginTop: 16 }}>
        Colchones, cobijas, ollas, platos, muebles básicos, electrodomésticos pequeños, ropa de abrigo.
      </div>
      <div style={{ marginTop: 22 }}>
        <Step n={1} title="Abre el aviso «Ayuda a Ensenada» en Donnit" sub="Lo ven los usuarios de Donnit en México." />
        <Step n={2} title="Toca «Donar a la causa»" sub="Toma una foto del objeto y publícalo." />
        <Step n={3} title="Una familia lo pide y se lo lleva" sub="Las familias afectadas lo piden gratis." />
      </div>
      <Note>Sin dinero de por medio: Donnit no recibe donativos.</Note>
    </Bottom>
  </Frame>
);

/* 4 — Comparte */
const S4: React.FC = () => (
  <Frame n={4}>
    <Photo src="ensenada/calle_lodo.jpg" fadeFrom={10} position="center 45%" dim={0.35} />
    <Bottom bottom={130}>
      <Kicker>Comparte</Kicker>
      <Title size={80}>Envía esta publicación a tus grupos de Ensenada y Baja California.</Title>
      <div style={{ fontSize: 38, fontWeight: 500, lineHeight: 1.4, color: MUTED, marginTop: 26 }}>
        Cada cosa que compartes puede ayudar a una familia a volver a casa.
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 50 }}>
        <Img src={staticFile("DonnitLogo.png")} style={{ width: 60, height: 60, borderRadius: 15 }} />
        <span style={{ fontSize: 32, fontWeight: 700, color: MUTED }}>Donnit · ayuda entre vecinos</span>
      </div>
    </Bottom>
  </Frame>
);

const ALL = [S1, S3, S2, S4];

export const EnsenadaCarousel: React.FC = () => {
  const frame = useCurrentFrame();
  const Slide = ALL[Math.min(frame, ALL.length - 1)];
  return <Slide />;
};
