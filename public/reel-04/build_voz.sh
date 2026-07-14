#!/usr/bin/env bash
# reel-04 con VOZ del protagonista + B-roll del rescate. Requiere ffmpeg.
# Reconstruye desde public/reel-04/raw/ (clips renombrados c01..c14 por sufijo).
set -e; cd "$(dirname "$0")/../.."
RAW=public/reel-04/raw; mkdir -p work/line work/vt out
i=1; ls "$RAW"/WhatsApp*.mp4 | sort -t'(' -k2 -n | while read -r f; do
  printf -v n "%02d" $i; cp "$f" "work/c${n}.mp4"; i=$((i+1)); done
COVER="scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,setsar=1"
pc(){ ffmpeg -y -ss "$3" -to "$4" -i "work/c${2}.mp4" -vf "$COVER" -r 30 -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p -metadata:s:v:0 rotate=0 -c:a aac -b:a 192k -ar 48000 -ac 2 "work/line/$1.mp4" -loglevel error; }
pc l1a 12 1.15 5.05; pc l1b 12 7.28 8.50      # frase 1 (sin pausa)
pc l2a 11 3.82 4.88; pc l2b 11 6.78 10.92     # frase 2 (sin pausa)
pc l3 05 3.66 8.88                            # frase 3
pc l4 14 1.75 4.48                            # frase 4 (CTA)
( cd work/line; for f in l1a l1b l2a l2b l3 l4; do echo "file '$(pwd)/$f.mp4'"; done > s.txt
  ffmpeg -y -f concat -safe 0 -i s.txt -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p -c:a aac -b:a 192k spine_raw.mp4 -loglevel error
  ffmpeg -y -i spine_raw.mp4 -c:v copy -af "highpass=f=120,afftdn=nf=-25,loudnorm=I=-16:TP=-1.5:LRA=11" -c:a aac -b:a 192k spine.mp4 -loglevel error )
br(){ ffmpeg -y -ss "$3" -to "$4" -i "work/c${2}.mp4" -vf "$COVER" -an -r 30 -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p -metadata:s:v:0 rotate=0 "work/vt/$1.mp4" -loglevel error; }
br B1 10 4.9 7.1; br B2 07 6.2 7.9; br B3 09 11.8 13.28; br B4 06 24.0 25.63
ffmpeg -y -i work/line/spine.mp4 -i work/vt/B1.mp4 -i work/vt/B2.mp4 -i work/vt/B3.mp4 -i work/vt/B4.mp4 -filter_complex "\
[1:v]setpts=PTS-STARTPTS+0/TB[b1];[2:v]setpts=PTS-STARTPTS+2.2/TB[b2];[3:v]setpts=PTS-STARTPTS+5.12/TB[b3];[4:v]setpts=PTS-STARTPTS+16.90/TB[b4];\
[0:v][b1]overlay=enable='between(t,0,2.2)'[o1];[o1][b2]overlay=enable='between(t,2.2,3.9)'[o2];[o2][b3]overlay=enable='between(t,5.12,6.6)'[o3];[o3][b4]overlay=enable='gte(t,16.9)'[v]" \
-map "[v]" -map "0:a" -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p -c:a aac -b:a 192k work/part1.mp4 -loglevel error
ffmpeg -y -loop 1 -t 2.8 -i public/reel-04/endcard.png -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 -vf "fps=30,format=yuv420p,setsar=1,scale=1080:1920,fade=t=in:st=0:d=0.3" -t 2.8 -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest work/endcard_clip.mp4 -loglevel error
ffmpeg -y -i work/part1.mp4 -i work/endcard_clip.mp4 -filter_complex "[0:v]scale=1080:1920,setsar=1,fps=30[v0];[0:a]aresample=48000,aformat=channel_layouts=stereo[a0];[1:v]scale=1080:1920,setsar=1,fps=30[v1];[1:a]aresample=48000,aformat=channel_layouts=stereo[a1];[v0][a0][v1][a1]concat=n=2:v=1:a=1[v][a]" -map "[v]" -map "[a]" -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart out/DonnitReel4_final.mp4 -loglevel error
echo "OK -> out/DonnitReel4_final.mp4"
