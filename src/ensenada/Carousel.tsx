import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { COLORS, FONT_FAMILY } from "../donnit/theme";

/**
 * Carrusel solidario "Ayuda a Ensenada" (Instagram feed 1080x1350).
 * Cada frame es una diapositiva: render con `remotion still --frame=N`.
 * Tono: ayuda, no promoción. Sin emojis, sin "descarga Donnit".
 */

const BG = "#101914";
const CREAM = "#f4f7f0";
const MUTED = "rgba(244,247,240,0.72)";
const LINE = "rgba(244,247,240,0.14)";

/** Pon aquí la foto aprobada (calle inundada con cinta) cuando esté en public/ensenada/. */
const COVER_PHOTO: string | null = null;

export const SLIDES = 7;

const Frame: React.FC<{ n: number; children: React.ReactNode }> = ({ n, children }) => (
  <AbsoluteFill style={{ backgroundColor: BG, fontFamily: FONT_FAMILY, color: CREAM }}>
    {children}
    <div style={{ position: "absolute", bottom: 56, right: 72, fontSize: 28, fontWeight: 600, color: "rgba(244,247,240,0.4)" }}>
      {n} / {SLIDES}
    </div>
  </AbsoluteFill>
);

const Kicker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 800, letterSpacing: 3, color: COLORS.green, textTransform: "uppercase" }}>
    <div style={{ width: 44, height: 4, borderRadius: 4, background: COLORS.green }} />
    {children}
  </div>
);

const Title: React.FC<{ children: React.ReactNode; size?: number }> = ({ children, size = 76 }) => (
  <div style={{ fontSize: size, fontWeight: 800, lineHeight: 1.08, letterSpacing: -1.5, marginTop: 28 }}>{children}</div>
);

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 40, fontWeight: 500, lineHeight: 1.4, color: MUTED, marginTop: 36 }}>{children}</div>
);

const ListItem: React.FC<{ title: string; sub?: string }> = ({ title, sub }) => (
  <div style={{ padding: "26px 0", borderTop: `2px solid ${LINE}` }}>
    <div style={{ fontSize: 40, fontWeight: 800 }}>{title}</div>
    {sub ? <div style={{ fontSize: 32, fontWeight: 500, color: MUTED, marginTop: 6 }}>{sub}</div> : null}
  </div>
);

const Note: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ marginTop: 34, padding: "22px 28px", borderRadius: 18, border: `2px solid ${COLORS.green}`, fontSize: 34, fontWeight: 700, color: CREAM }}>
    {children}
  </div>
);

const Pad: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", top: 110, left: 80, right: 80 }}>{children}</div>
);

/* 1 — Portada (foto aprobada a sangre) */
const S1: React.FC = () => (
  <Frame n={1}>
    {COVER_PHOTO ? (
      <Img src={staticFile(COVER_PHOTO)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
    ) : (
      <AbsoluteFill style={{ background: "linear-gradient(160deg, #26332c 0%, #121b16 100%)", alignItems: "center", justifyContent: "center" }}>
        <div style={{ marginTop: -260, padding: "18px 30px", border: "3px dashed rgba(244,247,240,0.35)", borderRadius: 16, fontSize: 28, fontWeight: 700, color: "rgba(244,247,240,0.6)", textAlign: "center" }}>
          FOTO APROBADA<br />calle inundada con cinta de precaución
        </div>
      </AbsoluteFill>
    )}
    <AbsoluteFill style={{ background: "linear-gradient(to bottom, rgba(16,25,20,0) 30%, rgba(16,25,20,0.85) 62%, rgba(16,25,20,1) 100%)" }} />
    <div style={{ position: "absolute", left: 80, right: 80, bottom: 140 }}>
      <Kicker>Ensenada, Baja California</Kicker>
      <Title size={104}>Ensenada<br />necesita ayuda</Title>
      <div style={{ fontSize: 40, fontWeight: 600, color: MUTED, marginTop: 26 }}>
        La tormenta tropical Rachel inundó más de 25 colonias.
      </div>
    </div>
  </Frame>
);

/* 2 — Qué pasó */
const S2: React.FC = () => (
  <Frame n={2}>
    <Pad>
      <Kicker>Qué pasó</Kicker>
      <Title>Entre el 11 y el 13 de octubre, la tormenta Rachel inundó más de 25 colonias de Ensenada.</Title>
      <Body>
        Muchas familias perdieron su casa y lo que había dentro: camas, muebles, cocina, ropa.
        <br /><br />
        Hay dos formas de ayudar. Te las contamos en las siguientes imágenes.
      </Body>
    </Pad>
  </Frame>
);

/* 3 — Centros de acopio */
const S3: React.FC = () => (
  <Frame n={3}>
    <Pad>
      <Kicker>Lo urgente</Kicker>
      <Title size={68}>Lleva la ayuda a los centros de acopio del DIF</Title>
      <div style={{ marginTop: 40 }}>
        <ListItem title="DIF Ensenada" sub="Instalaciones del DIF municipal" />
        <ListItem title="Centro Comunitario DIF Floresta" />
        <ListItem title="Gimnasio de Maneadero" />
        <ListItem title="UBR del DIF estatal" sub="Av. Francisco González Bocanegra, col. Hidalgo" />
      </div>
      <Note>Confirma horarios con el DIF antes de ir.</Note>
    </Pad>
  </Frame>
);

/* 4 — Qué reciben */
const S4: React.FC = () => {
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
    <Frame n={4}>
      <Pad>
        <Kicker>Qué reciben en los centros</Kicker>
        <Title size={68}>Lo que piden los centros de acopio</Title>
        <div style={{ marginTop: 44, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px 28px" }}>
          {items.map((t) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 36, fontWeight: 700 }}>
              <div style={{ width: 14, height: 14, borderRadius: 999, background: COLORS.green, flexShrink: 0 }} />
              {t}
            </div>
          ))}
        </div>
        <Note>Confirma horarios con el DIF antes de ir.</Note>
      </Pad>
    </Frame>
  );
};

/* 5 — Cosas de casa */
const S5: React.FC = () => (
  <Frame n={5}>
    <Pad>
      <Kicker>Volver a tener hogar</Kicker>
      <Title size={68}>Las familias también necesitan cosas de casa</Title>
      <div style={{ marginTop: 40 }}>
        <ListItem title="Colchones, colchonetas y cobijas" />
        <ListItem title="Ollas, platos y cubiertos" />
        <ListItem title="Muebles básicos" />
        <ListItem title="Electrodomésticos pequeños" />
        <ListItem title="Ropa de abrigo" />
      </div>
    </Pad>
  </Frame>
);

/* 6 — Cómo donar cosas de casa en Donnit */
const Step: React.FC<{ n: number; title: string; sub: string }> = ({ n, title, sub }) => (
  <div style={{ display: "flex", gap: 28, padding: "26px 0", borderTop: `2px solid ${LINE}` }}>
    <div style={{ width: 64, height: 64, borderRadius: 999, border: `3px solid ${COLORS.green}`, color: COLORS.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 800, flexShrink: 0 }}>
      {n}
    </div>
    <div>
      <div style={{ fontSize: 40, fontWeight: 800 }}>{title}</div>
      <div style={{ fontSize: 32, fontWeight: 500, color: MUTED, marginTop: 6 }}>{sub}</div>
    </div>
  </div>
);

const S6: React.FC = () => (
  <Frame n={6}>
    <Pad>
      <Kicker>Cosas de casa</Kicker>
      <Title size={68}>Cómo donarlas con Donnit</Title>
      <div style={{ marginTop: 40 }}>
        <Step n={1} title="Abre el aviso «Ayuda a Ensenada»" sub="Lo ven los usuarios de Donnit en México." />
        <Step n={2} title="Toca «Donar a la causa»" sub="Toma una foto del objeto y publícalo." />
        <Step n={3} title="Una familia lo pide y se lo lleva" sub="Las familias afectadas lo piden gratis." />
      </div>
      <Note>Sin dinero de por medio: Donnit no recibe donativos.</Note>
    </Pad>
  </Frame>
);

/* 7 — Comparte */
const S7: React.FC = () => (
  <Frame n={7}>
    <AbsoluteFill style={{ justifyContent: "center", padding: "0 80px" }}>
      <Kicker>Comparte</Kicker>
      <Title size={86}>Envía esta publicación a tus grupos de Ensenada y Baja California.</Title>
      <Body>A veces lo que a ti te sobra, a otra familia le ayuda a volver a casa.</Body>
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 70 }}>
        <Img src={staticFile("DonnitLogo.png")} style={{ width: 64, height: 64, borderRadius: 16 }} />
        <span style={{ fontSize: 34, fontWeight: 700, color: MUTED }}>Donnit · ayuda entre vecinos</span>
      </div>
    </AbsoluteFill>
  </Frame>
);

const ALL = [S1, S2, S3, S4, S5, S6, S7];

export const EnsenadaCarousel: React.FC = () => {
  const frame = useCurrentFrame();
  const Slide = ALL[Math.min(frame, ALL.length - 1)];
  return <Slide />;
};
