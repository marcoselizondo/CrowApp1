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

/* 2 — Lo urgente: centros de acopio + qué reciben */
const Center: React.FC<{ title: string; sub?: string }> = ({ title, sub }) => (
  <div style={{ padding: "14px 0", borderTop: `2px solid ${LINE}` }}>
    <div style={{ fontSize: 33, fontWeight: 800 }}>{title}</div>
    {sub ? <div style={{ fontSize: 26, fontWeight: 500, color: MUTED, marginTop: 2 }}>{sub}</div> : null}
  </div>
);

const S2: React.FC = () => {
  const items = [
    "Agua",
    "Alimentos no perecederos",
    "Productos de limpieza",
    "Higiene personal",
    "Cobijas",
    "Ropa de abrigo",
    "Alimento para mascotas",
    "Herramientas para quitar lodo",
  ];
  return (
    <Frame n={3}>
      <Photo src="ensenada/calle_cinta.jpg" height={430} fadeFrom={20} position="center 52%" />
      <Bottom bottom={96}>
        <Kicker>También urgente</Kicker>
        <Title size={56}>Lleva ayuda a los centros de acopio del DIF</Title>
        <div style={{ marginTop: 22 }}>
          <Center title="DIF Ensenada" sub="Instalaciones del DIF municipal" />
          <Center title="Centro Comunitario DIF Floresta" />
          <Center title="Gimnasio de Maneadero" />
          <Center title="UBR del DIF estatal" sub="Av. Francisco González Bocanegra, col. Hidalgo" />
        </div>
        <div style={{ marginTop: 16, paddingTop: 18, borderTop: `2px solid ${LINE}`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
          {items.map((t) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 27, fontWeight: 700 }}>
              <div style={{ width: 11, height: 11, borderRadius: 999, background: COLORS.green, flexShrink: 0 }} />
              {t}
            </div>
          ))}
        </div>
        <Note>Confirma horarios con el DIF antes de ir.</Note>
      </Bottom>
    </Frame>
  );
};

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
        A veces lo que a ti te sobra, a otra familia le ayuda a volver a casa.
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
