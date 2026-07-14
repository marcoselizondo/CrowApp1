# reel-04 — "Rescata la silla" (Reel IG, con voz)

Vídeo terminado: **21s, 1080×1920 30fps, con la VOZ del protagonista** (sin
música). Concepto Donnit: dar **segunda vida** a algo camino de la basura, como
la silla rescatada del camión.

- Guion y tiempos de corte: ver `TRANSCRIPT.md`.
- Pipeline reproducible: `build_voz.sh` (desde `raw/` → `out/DonnitReel4_final.mp4`).
- Estructura: hook (rescate) + camión de basura → cara hablando (Donnit) →
  cómo funciona → CTA hablado + tarjeta de marca. Voz limpia (highpass+denoise+
  loudnorm) y sincronizada; B-roll superpuesto sobre la voz en las ventanas de
  apoyo (lip-sync intacto).
- La toma de voz se ensambla de varias tomas (todas forman la idea) quitando
  pausas largas sin cortar palabras.

El MP4 final se entrega al usuario (no se commitea; `/out` en .gitignore).
