# Recipe: Add a Project

**Goal:** add an entry to the Work grid. Touches only
`config/site.config.ts` (plus an optional cover image in `public/`).

## Steps

1. Open `config/site.config.ts` → `projects[]`. Add (order = display
   order):
   ```ts
   {
     slug: "helio-lamp",                  // unique, kebab-case
     title: "HELIO — Kinetic Lamp",
     category: "Product Film",
     year: "2026",
     description: "Launch film and configurator for a magnetically suspended lamp.",
     image: null,                          // or "/projects/helio.jpg" (16:10+, ~1600px wide)
     palette: ["#FFB23E", "#2E1C04"],      // generated-cover gradient when image is null
     tags: ["3D", "WebGL"],
     link: null,                           // external case-study URL or null
     wide: false,                          // true → spans 2 columns on desktop
   },
   ```
2. With a real cover: drop the file under `public/projects/` and set
   `image` to its path — the generated gradient cover disappears
   automatically.
3. Grid balance: cards flow in a 2-column grid; `wide: true` cards span
   both. For a tidy bottom edge keep `(number of normal cards) +
   2 × (number of wide cards)` even.

## Validate

```bash
npm run typecheck && npm run lint
```
Dev check: card renders with hover lift, cover (image or gradient),
tags and meta; reveal animation plays when scrolled into view.
