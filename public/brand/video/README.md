# Video

Empty on purpose.

The Heartbreaker Ink asset drop contains **no video files** — the client folder
holds only JPG, PNG and SVG. Every "motion" moment in the brand mockups is a
still with a motion-blur treatment baked in, not footage.

Drop hero and section video here when the studio supplies it.

| File | Purpose | Target |
|---|---|---|
| `hero.mp4` / `hero.webm` | Homepage hero loop | H.264 + VP9, no audio track, under 3 MB |
| `hero-poster.jpg` | First frame, shown while the video loads | 1920x1080, quality 80 |

Encode muted, looping and `playsinline`. Always ship a poster, and always fall
back to the poster under `prefers-reduced-motion`.
