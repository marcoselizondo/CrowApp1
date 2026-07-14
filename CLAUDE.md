# Donnit Reels — guía de producción (rama de trabajo)

Fábrica de Reels verticales para **Donnit**. El contexto de marca COMPLETO está
en la rama `claude/create-video-setup-oshrgt` (`CLAUDE.md`). Resumen imprescindible:
economía circular por barrios (Barcelona), **donar gratis**, tono **vecino a
vecino**, verde `#8fd678`, DM Sans, **9:16 1080×1920 30fps**, CTA **"Descarga
Donnit"**, logo en `public/reel-XX/DonnitLogo.png`. Cada vídeo autocontenido en
`public/reel-XX/` (`raw/` crudos, `seg/` recortes). No tocar carpetas de otros reels.

## Flujo PROBADO — vídeo con la VOZ del protagonista (reel-04)
1. Clips del usuario → `public/reel-XX/raw/`. Renombrar internamente `c01..cNN`
   por el sufijo de WhatsApp.
2. **Transcribir la voz en LOCAL** (¡sí se puede!): HuggingFace llega por el
   proxy → `pip install faster-whisper`, extraer wav 16k (`highpass=100,afftdn`)
   y transcribir en español con `word_timestamps=True`. **No hace falta pedirle
   el texto al usuario.** Guardar índice con tiempos (ver `reel-04/INDICE_AUDIO.md`).
3. Armar el **guion en el orden del mensaje**; elegir la MEJOR toma de cada frase
   (evitar retomas/falsos arranques); **quitar pausas largas sin cortar palabras**.
4. Limpiar audio: `highpass=f=120,afftdn=nf=-25,loudnorm=I=-16:TP=-1.5:LRA=11`.
5. **Eje de voz continuo + B-roll ACORDE a cada frase** superpuesto con `overlay`
   sobre el eje (así el lip-sync nunca se rompe). La imagen debe ilustrar lo que
   se dice en ese segundo (basura en "basura", la silla en "disponible", etc.).
6. Tarjeta final: `reel-04/endcard.png` (verde + logo + "Descarga Donnit").
7. **Verificar**: re-transcribir el audio del MP4 final (coherencia) + extraer
   frames (imagen acorde). Entregar el MP4 (`out/` está en `.gitignore`).
8. Sin música salvo que la pida (suele añadirla en CapCut). La voz manda.

## Retención — checklist (guía "6 Retention Curves")
Aplicar SIEMPRE antes de entregar:
- **Hook 1–3 s**: abrir con lo más fuerte (acción/resultado/gancho concreto),
  nunca intro lenta. (curvas 1 y 2)
- **Sin bajones de ritmo**: cortar frases repetidas, confusas o transiciones
  lentas en el punto exacto donde cae la curva. (curva 3)
- **Densidad de valor**: cada segundo aporta; cero relleno; ejemplos concretos.
  (curva 4)
- **CTA ligado a la promesa** del inicio, que no suene a "corte publicitario".
  (curva 5)
- Objetivo: **curva sana** = caída inicial normal + descenso suave. (curva 6)

## Entorno
- `ffmpeg`/`ffprobe` (si faltan: `apt-get update && apt-get install -y ffmpeg`).
- `faster-whisper` (pip) para transcribir; HF por el proxy.
- No se puede reproducir vídeo → "ver" = extraer fotogramas y leerlos.
- Rama de trabajo: `claude/donnit-vertical-reels-a6vkqs`. Commit+push cada avance.
