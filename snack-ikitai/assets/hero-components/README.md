# Homepage hero component pack

Desktop source of truth: `../../../design-references/showa-entrance-source-v2.png` (1448 × 1204 composition). The earlier responsive board remains in `showa-ticket-rail-responsive-selected.png` for breakpoint intent.

Mobile source of truth: `../../../design-references/showa-ticket-rail-mobile-selected.png` (390 × 844 composition). Mobile is separately art-directed rather than scaled from desktop.

Use the `*-trimmed.png` files in production. The untrimmed siblings are retained as lossless alpha-source renders for later edge or crop adjustments. All readable UI copy stays in HTML so wording, accessibility, hover/focus states, and responsive wrapping remain exact.

## Production assets

| Asset | Pixel size | Intended slot |
| --- | ---: | --- |
| `hero-marquee-shell-trimmed.png` | 1848 × 512 | Desktop marquee shell; overlay the three live title lines in the blank cream panel. |
| `hero-cta-first-timer-desktop-trimmed.png` | 538 × 1990 | Desktop left vertical CTA; overlay 「一見さん、いらっしゃい。」, 「一見さん歓迎のお店を見る」, and arrow. |
| `hero-cta-nearby-desktop-trimmed.png` | 598 × 1936 | Desktop right vertical CTA; overlay 「現在地から探す」, 「近くの店を見つける」, and arrow. |
| `hero-cta-first-timer-mobile-trimmed.png` | 1739 × 506 | Mobile first-timer ticket CTA. |
| `hero-cta-nearby-mobile-v2-trimmed.png` | 1739 × 514 | Mobile nearby ticket CTA; v2 matches the first-timer ticket geometry. |
| `hero-news-ticket-desktop-trimmed.png` | 1271 × 186 | Desktop news rail; overlay date, LIVE status, update copy, and arrow. |
| `hero-news-ticket-mobile-trimmed.png` | 1678 × 396 | Mobile news rail; overlay LIVE, 「新着32軒」, and arrow. |
| `hero-marquee-mobile-shell-trimmed.png` | 1781 × 554 | Dedicated compact mobile marquee shell; overlay the same three live title lines. |
| `hero-photo-window-mobile-frame-trimmed.png` | 1068 × 1270 | Optional mobile photo-window overlay. Keep the photograph live beneath its transparent center. |
| `hero-mobile-header-rail-trimmed.png` | 1802 × 242 | Mobile top navigation backplate; overlay the live wordmark and menu control. |
| `hero-news-ticket-desktop-wide-trimmed.png` | 1686 × 123 | Full-width desktop news ticket used at the bottom edge of the cover. |
| `hero-news-ticket-mobile-wide-trimmed.png` | 1623 × 227 | Compact full-width mobile news ticket. |
| `hero-entrance-pillar-desktop-trimmed.png` | 157 × 1258 | Desktop-only isolated black-lacquer pillar. Render twice at its intrinsic aspect ratio; never stretch it horizontally. |
| `hero-entrance-proscenium-trimmed.png` | 1634 × 904 | Legacy combined frame retained for reference only. It is no longer rendered because its lintel distorted on wide screens. |
| `hero-wallpaper-ornament.png` | 1536 × 1024 | Transparent repeating Showa wallpaper ornament layer behind the entrance. |

## Alpha QA

- Format: RGBA PNG.
- All four canvas corners are fully transparent (`alpha = 0`).
- Visible chroma-key green fringe is `0%` on paper assets and `0.00767%` on the marquee (limited to antialiased cyan/bulb edges).
- Assets are trimmed with 4 px transparent safety padding; the marquee uses 8 px to retain its tight light edges.
- New mobile asset corner alpha values are all `0`; visible green fringe is `0%` for the header, `0.00386%` for the frame, and `0.01263%` for the marquee (the intentional cyan edge light dominates the detector).
- Re-run `scripts/validate_hero_components.py public/assets/hero-components` after any chroma-key regeneration.

## Layout rules

- Keep the hero photograph as the existing single `night-playground-hero.webp`; never rasterize it into these components or restore a four-photo collage.
- On mobile, render the photograph as a live `<img>`/background layer with `object-fit: cover` and a breakpoint-specific focal position. The frame is a separate overlay; never bake the people into it.
- Treat 390 × 844 as the primary mobile composition. Validate at 360, 375, 390, 412, and 430 CSS-pixel widths, using fluid spacing and safe-area insets.
- Desktop posters disappear below the desktop breakpoint. Mobile horizontal CTA tickets replace them in normal document flow.
- Preserve intrinsic aspect ratios. The desktop marquee now uses its native 1848:512 ratio, and each pillar is positioned independently; never stretch wood grain, bulbs, borders, portraits, pins, or pillar edges.
- Use the blank paper and lightbox areas only as text-safe zones; do not crop through borders, perforations, bulbs, cyan fins, portrait, or location pin.
