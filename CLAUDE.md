# Donnit — Fábrica de Reels (Remotion) · Guía para el agente

Este repo es una **fábrica de videos verticales (Reels/TikTok/Shorts) para Donnit**,
hecha con **Remotion**. Cada video se arma con clips crudos que sube el equipo,
se recortan/normalizan con ffmpeg, y se componen en Remotion (subtítulos, marca,
CTA). Esta guía explica TODO para poder seguir editando en la misma línea.

> Trabajás en un entorno remoto (Claude Code on the web). No puedes "ver" video:
> para entender un clip, extrae fotogramas a imagen y míralos (ver §6).

---

## 1. Qué es Donnit (contexto de marca)

App de **economía circular hiperlocal por barrios** (Barcelona). Conecta vecinos
para dar segunda vida a objetos. **Ya viva** en iOS/Android con la función de
**DONAR** objetos gratis. Próximamente: **ALQUILAR** ("Moments").
Mensaje: *"Dona lo que no usas, alquila lo que necesitas."* Tono **vecino a
vecino**, nada corporativo. Audiencia joven urbana de Barcelona (20–40).

### Reglas visuales de marca (OBLIGATORIAS)
- **Colores:** 🟢 `#8fd678` = **donación / impacto / gratis**. 🟩 `#52B788` =
  **alquiler / pago**. **Nunca los mezcles sin criterio**: video de donar → verde;
  de alquilar → turquesa. (Están en `src/donnit/theme.ts` como `COLORS`.)
- **Tipografía:** DM Sans (redondeada), vía `@remotion/google-fonts/DMSans`.
- **Formato:** vertical **9:16 = 1080×1920**, **30 fps**, **20–30 s** máx.
- **Hook en los primeros 2 s** o pierdes al viewer. Cortes ágiles.
- **Subtítulos grandes y legibles** (la mayoría ve sin sonido), estilo kinético
  con **marcador verde** que se "pinta" bajo la palabra clave (no los típicos).
- **Logo:** `public/DonnitLogo.png` (icono verde con la "d"). Va en intro y/o
  cierre, **sin tapar la acción**.
- **CTA de cierre:** "Descarga Donnit" (App Store y Google Play). Si el video
  habla de alquiler, aclarar "el renting llega pronto" (teaser); el CTA de
  descargar es siempre a la app actual.
- **NO HACER:** prometer funciones inexistentes como activas; mezclar verde y
  turquesa sin criterio; tono publicitario agresivo; intros lentas.

---

## 2. Repo, rama y reglas de git

- Repo: `marcoselizondo/CrowApp1`. Rama de trabajo: **`claude/create-video-setup-oshrgt`**.
- **Commitea y pushea** cada avance a esa rama (`git push -u origin <rama>`).
- **NO** crear PR salvo que el usuario lo pida.
- Assets/videos pesados van commiteados en `public/` (no hay LFS). GitHub rechaza
  archivos >100 MB por la web; si el equipo sube algo grande, lo hace por
  "Releases" o comprimido.
- El usuario **sube los clips por GitHub** (a veces a `main` o a la raíz de
  `public/`). Si no aparecen en la rama, revisá `origin/main` y traélos:
  `git show origin/main:"public/<archivo>" > public/reel-XX/raw/<archivo>`.

---

## 3. Entorno: gotchas CRÍTICOS

### Render de Remotion (¡importante!)
Remotion NO puede descargar su Chrome (host bloqueado). Usá el Chromium local
**headless_shell** y el flag de certificado del proxy:

```bash
CHROME=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
npx remotion render <CompositionId> out/<archivo>.mp4 \
  --browser-executable="$CHROME" --ignore-certificate-errors --log=error
```
- Usá `headless_shell`, NO el `chrome` completo (el completo rompe con "old
  headless removed").
- `--ignore-certificate-errors` es necesario para que cargue la fuente DM Sans
  desde `fonts.gstatic.com` a través del proxy (si no, `WaitForFonts` falla).
- `out/` está en `.gitignore`: los MP4 renderizados NO se commitean; se entregan
  al usuario con la herramienta de enviar archivos.

### Red bloqueada (política del entorno)
- **No se puede transcribir audio automáticamente**: Whisper/Vosk/HF/CDN OpenAI
  están **bloqueados** (solo pypi/npm pasan). Para subtítulos de voz, **pedí al
  usuario el texto** de lo que se dice (y sincronizá con detección de silencios,
  §7). No intentes bajar modelos.
- Google Drive y hosts de archivos suelen estar bloqueados → el usuario sube por
  GitHub.

### Herramientas
- **ffmpeg/ffprobe** instalados (para recortar, normalizar, extraer frames, medir
  audio). Si faltara: `apt-get install -y --no-install-recommends ffmpeg`.
- `npm install` ya deja Remotion listo. Node 22.

---

## 4. Pipeline de un video (paso a paso)

1. **Clips** → el usuario los sube. Organizalos en `public/reel-XX/raw/`.
2. **Inspección** → extrae fotogramas y míralos (§6). Anota qué hay en cada clip,
   duración, orientación, si hay voz.
3. **Recorte + normalización con ffmpeg** → cada plano a **1080×1920** en
   `public/reel-XX/seg/` (§5). Corrige orientación (los clips de WhatsApp suelen
   traer rotación inconsistente).
4. **Composición Remotion** → nueva carpeta `src/reelX/`: define los segmentos y
   tiempos (`storyX.ts`), y el componente (`ReelX.tsx`) que apila
   video + subtítulos + marca + CTA. Registrá la `<Composition>` en `src/Root.tsx`.
5. **Typecheck**: `npx tsc --noEmit`.
6. **Render** (§3) → verifica extrayendo fotogramas del MP4 final.
7. **Commit + push**, y **entregá el MP4** al usuario.

### Convenciones de carpetas
```
public/
├── DonnitLogo.png            # logo compartido
├── reel-01-mueble/{raw,seg}/ # Video 1 (donación mueble)
├── reel-02/{raw,seg}/        # Video 2 (Marcos fundador)
└── reel-03/{raw,seg}/        # Video 3 (etiquetas SELECCIONADA)
```
**No toques otras carpetas reel-XX** (rompés videos ya hechos). Cada video es
autocontenido; su código apunta a `staticFile("reel-XX/seg/...")`.

---

## 5. Recetas ffmpeg (recortar y normalizar a 1080×1920)

**Rellenar vertical (cover) manteniendo audio o mudo:**
```bash
COVER="scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30"
# con audio (clip de voz):
ffmpeg -y -ss <inicio> -i "IN.mp4" -t <dur> -vf "$COVER" \
  -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p -c:a aac -b:a 160k OUT.mp4
# mudo (b-roll):  añade  -an   y quita las flags de audio
```

**Orientación (clips WhatsApp):** a veces vienen 1024×576 con rotación rara.
Deja que ffmpeg **autorote** (sin `-noautorotate`) y comprueba las dimensiones de
un frame extraído. Si sale apaisado, añade `transpose=1` ANTES del `scale`. Añade
`-metadata:s:v:0 rotate=0` para no arrastrar metadata de rotación al archivo final.

**B-roll horizontal → vertical con fondo desenfocado (queda pro):**
```bash
ffmpeg -y -ss <t> -i IN.mp4 -t <dur> -filter_complex \
 "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=40:1,eq=brightness=-0.12[bg];\
  [0:v]scale=1080:-2[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,fps=30" \
 -an -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p OUT.mp4
```

**Igualar niveles de audio** entre tramos: mide con
`ffmpeg -i IN -af volumedetect -f null -` y ajustá con `-af "volume=NdB"`.

---

## 6. Cómo "ver" el video (no se puede reproducir)

Extraé fotogramas a imagen y **léelos** (la tool Read muestra imágenes):
```bash
# hoja de contacto 3x3 de un clip (muestra ~9 momentos):
rate=$(python3 -c "print(9.0/<duracion>)")
ffmpeg -y -i IN.mp4 -vf "fps=${rate},scale=-1:240,tile=3x3:margin=6:padding=4" -frames:v 1 sheet.jpg
# un frame en el segundo T:
ffmpeg -y -ss T -i IN.mp4 -frames:v 1 -vf scale=-1:420 frame.jpg
```
Verifica SIEMPRE el MP4 final extrayendo frames clave (hook, subtítulos, CTA).
Usá el scratchpad para las imágenes temporales, no el repo.

---

## 7. Subtítulos / voz

- **No hay transcripción automática** (red bloqueada). Pedí el texto al usuario.
- **Sincronización sin modelo:** detectá pausas con
  `ffmpeg -i IN -af "silencedetect=noise=-38dB:d=0.4" -f null -` y mapeá las frases
  a los tramos hablados. Para elegir dónde empieza/termina una frase, medí el
  volumen por ventanas (`-af volumedetect` sobre `-ss T -t 0.5`).
- **Estilo de subtítulo** (kinético, no el típico): palabra clave con **marcador
  verde** que se "pinta" (scaleX 0→1), texto grande DM Sans 800, pop con `spring`.
  Ver `src/reel3/VOCaption.tsx`, `src/reel2/HookText.tsx`, `src/donnit/Caption.tsx`.

---

## 8. Música

- El usuario suele **añadir la música por fuera** (dice qué canción). Entregá el
  video **sin música** salvo que pida meterla.
- Para montajes marketineros, **cortá al BPM**: `beat = round(30*60/BPM)` frames.
  Ej. 128 BPM ≈ 14 frames/beat. Deja las tomas en múltiplos del beat y avisá al
  usuario que ponga la canción desde el inicio.
- Si pide meter la música dentro: `<Audio src={staticFile("...mp3")} volume={...}/>`
  y bajá el volumen (ducking) bajo la voz.

---

## 9. Estructura del código (Remotion)

- `src/Root.tsx` — registra todas las `<Composition>` (1080×1920, 30 fps).
- `src/donnit/` — **compartido**: `theme.ts` (COLORS, fuente, WIDTH/HEIGHT/FPS),
  `Wordmark.tsx` (`DonnitLogo` = el PNG redondeado + wordmark), `EndCard.tsx`
  (CTA verde), `WaitForFonts.tsx` (espera DM Sans antes de renderizar),
  `Caption.tsx`.
- `src/reel2/` — Video 2 (fundador): `ColdOpen` (B&N + rojo), `HookText`,
  `LowerThird` (tag de fundador), `Reel2.tsx`, `story2.ts`. Técnica clave:
  **clip de voz como base continua** (video+audio) con **b-roll mudo encima** en
  Sequences → la voz nunca se corta y se mantiene lip-sync.
- `src/reel3/` — Video 3 (montaje etiquetas): `Reel3.tsx` (solo música, cortes a
  128 BPM), `Reel3Voice.tsx` (misma pieza con holds + frases en pantalla),
  `VOCaption.tsx`, `Reel3EndCard.tsx`, `story3.ts` / `story3voice.ts`.

**Compositions actuales:** `DonnitReel` (v1 mueble), `DonnitReel2` (fundador),
`DonnitReel3` (montaje música), `DonnitReel3Voice` (montaje con voz/frases).

### Patrón para un video nuevo
1. `public/reel-XX/raw/` (clips) → `public/reel-XX/seg/` (recortes 1080×1920).
2. `src/reelX/storyX.ts` — lista de segmentos {src, durationInFrames} + tiempos.
3. `src/reelX/ReelX.tsx` — `<AbsoluteFill>` con `<WaitForFonts>`, `<Sequence>` por
   plano (usa `OffthreadVideo`, `objectFit:"cover"`), subtítulos, y `<EndCard/>`.
4. Registrá `<Composition id="DonnitReelX" .../>` en `Root.tsx` (dur = suma de
   frames, fps 30, 1080×1920).
5. `npx tsc --noEmit` → render (§3) → verificar frames → commit/push → entregar.

---

## 10. Checklist antes de entregar
- [ ] 9:16 1080×1920, 30 fps, ≤ ~30 s.
- [ ] Hook en los primeros 2 s.
- [ ] Verde/turquesa usados con criterio (este proyecto es casi todo **donación → verde**).
- [ ] Logo Donnit presente (intro/cierre) sin tapar la acción.
- [ ] CTA "Descarga Donnit".
- [ ] Orientación correcta (nada apaisado ni de lado).
- [ ] Verificado extrayendo fotogramas del MP4 final.
- [ ] Commit + push a la rama. MP4 entregado al usuario.
