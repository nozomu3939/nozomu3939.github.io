# Hero component generation prompts

All assets were generated with the built-in ImageGen tool using `design-references/showa-ticket-rail-responsive-selected.png` as the desktop reference and `design-references/showa-ticket-rail-mobile-selected.png` as the dedicated 390 × 844 mobile reference.

## Shared extraction specification

```text
Use case: background-extraction
Create one front-facing production web component that matches the selected responsive mock.
Use a perfectly flat solid #00ff00 chroma-key background with no shadow, gradient, texture, reflection, floor plane, vignette, or lighting variation.
Keep the component fully separated from the background with crisp edges and generous padding.
Do not use #00ff00 in the component. No cast shadow, contact shadow, watermark, asset sheet, or extra object.
Keep every live text zone blank. Do not bake Japanese, English, numbers, arrows, or labels into the image.
```

## Asset-specific prompts

- `hero-marquee-shell.png`: Wide 3.4:1 curved espresso-black and aged-brass cinema marquee, warm round bulbs, blank illuminated cream panel, three short cyan neon fins on both sides; perfectly frontal and symmetric; tight bulb/tube glow only.
- `hero-cta-first-timer-desktop.png`: Tall 1:3 ivory admission ticket with cut corners, vermilion/brass rules, tactile paper grain, and a friendly late-Showa illustrated snack-bar mama; retain large blank copy zones.
- `hero-cta-nearby-desktop.png`: Matching tall ivory ticket with one muted-vermilion vintage location pin near the upper third and blank copy zones.
- `hero-cta-first-timer-mobile.png`: Horizontal 3.4:1 ivory ticket with scalloped short ends, double vermilion rule, and the mama portrait in a left medallion occupying no more than 22% of width.
- `hero-cta-nearby-mobile-v2.png`: Preserve the first-timer mobile ticket's exact canvas, silhouette, border, paper, padding, and 3.4:1 geometry; replace only the woman medallion with a muted-vermilion location pin.
- `hero-news-ticket-desktop.png`: Blank ultra-wide 11:1 cinema-ticket rail with perforated short ends, restrained paper grain, inset rules, and subtle divider guides.
- `hero-news-ticket-mobile.png`: Blank compact 4.6:1 ticket rail in the same paper family with one faint divider near the left third.
- `hero-marquee-mobile-shell.png`: Compact 3.15:1 mobile marquee with espresso bakelite shell, one row of warm bulbs, blank cream sign panel, and three restrained cyan neon tubes on each side.
- `hero-photo-window-mobile-frame.png`: Portrait mobile photo-window overlay with a fully keyed center opening, slim espresso/brass frame, and restrained cyan details; no photograph is baked in.
- `hero-mobile-header-rail.png`: Blank 7.5:1 espresso-black navigation backplate with subtle grain, fine brass lower rule, and tiny brass corner caps.
- `hero-news-ticket-desktop-wide.png`: Blank ultra-wide cream paper ticket with fine vermilion inset rule, perforated short ends, restrained tactile grain, and no baked text.
- `hero-news-ticket-mobile-wide.png`: Matching blank compact ticket rail, widened for a single mobile row with LIVE, count, and arrow as live HTML.
- `hero-entrance-proscenium.png`: Green-screen front elevation containing only two very slim near-black lacquered wooden pillars and an ultra-thin wooden lintel; wide transparent photo opening, subtle brass hairlines, aged Showa grain, no photo or text. The final revision reduces the beam to roughly 18–20 source pixels so it does not cover the live photograph.
- `hero-wallpaper-ornament.png`: Transparent, low-contrast repeatable dark-brown Showa wallpaper ornament used over the espresso wall field.

The mobile source-of-truth mock preserves a live single photograph, live search controls, live Japanese text, and CSS/JS-driven BPM bars. Only the non-semantic decorative shells are raster assets.

The `*-trimmed.png` siblings are the production outputs after chroma-key removal, edge contraction, alpha validation, and transparent-bounds trimming.
