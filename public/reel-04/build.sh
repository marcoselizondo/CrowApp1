#!/usr/bin/env bash
# Reconstruye reel-04 desde public/reel-04/raw/. Requiere ffmpeg.
# (El endcard.mp4 se genera desde endcard.png; endcard.png se hizo con Pillow
#  + DM Sans, ver EDIT.md.)
set -e
cd "$(dirname "$0")/../.."
RAW=public/reel-04/raw; SEG=public/reel-04/seg; mkdir -p work "$SEG"
# renombrar clips de WhatsApp a c01..c14 por orden del sufijo numérico
i=1; ls "$RAW"/WhatsApp*.mp4 | sort -t'(' -k2 -n | while read -r f; do
  printf -v n "%02d" $i; cp "$f" "work/c${n}.mp4"; i=$((i+1)); done
COVER="scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30"
seg(){ ffmpeg -y -ss "$3" -to "$4" -i "work/c${2}.mp4" -vf "$COVER" -an \
  -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p -metadata:s:v:0 rotate=0 \
  "$SEG/s${1}.mp4" -loglevel error; }
seg 01 10 4.9 7.1;  seg 02 07 6.4 8.0;  seg 03 10 7.3 9.2;  seg 04 09 11.8 13.8
seg 05 12 4.9 6.6;  seg 06 11 6.9 8.6;  seg 07 13 1.6 3.1;  seg 08 08 1.2 2.5
seg 09 05 3.9 5.5;  seg 10 06 14.6 17.8; seg 11 06 23.8 26.8
ffmpeg -y -loop 1 -t 3.0 -i public/reel-04/endcard.png -r 30 \
  -vf "fps=30,format=yuv420p,fade=t=in:st=0:d=0.35" \
  -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p "$SEG/endcard.mp4" -loglevel error
: > work/concat.txt
for s in 01 02 03 04 05 06 07 08 09 10 11; do echo "file '$(pwd)/$SEG/s${s}.mp4'" >> work/concat.txt; done
echo "file '$(pwd)/$SEG/endcard.mp4'" >> work/concat.txt
mkdir -p out
ffmpeg -y -f concat -safe 0 -i work/concat.txt -c:v libx264 -preset medium -crf 19 \
  -pix_fmt yuv420p -movflags +faststart out/DonnitReel4.mp4 -loglevel error
echo "OK -> out/DonnitReel4.mp4"
