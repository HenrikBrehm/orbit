# Recipe: Change Palette

**Goal:** recolor the whole site (UI **and** 3D scene accents) by
editing theme tokens. Touches only `config/site.config.ts`.

## Steps

1. Open `config/site.config.ts` → `theme.colors`. Each mode has seven
   tokens (see `config/schema.ts` for what each does):
   ```ts
   dark: {
     background: "#061410",                   // page bg (also behind the 3D scene)
     surface: "#0C201A",                      // cards
     text: "#EFFBF6",
     muted: "#8FB5A8",
     accent: "#2BD9A7",                       // buttons, highlights, particles
     accentContrast: "#04120D",               // text ON the accent
     border: "rgba(239, 251, 246, 0.1)",
   },
   ```
2. Always update **both** `dark` and `light` — the toggle exposes both.
3. Recolor the 3D glow to match: `hero.model.material.emissive` (ring
   glow) and optionally `hero.lights.rim.color`. Particles follow
   `accent` automatically (while `hero.particles.color` is null).
4. Optionally pick a matching `hero.environment.preset` mood
   (`night`, `sunset`, `forest`, … — procedural light rigs, see schema).

## Contrast rules (keep the template premium)

- `accent` vs `accentContrast` ≥ 4.5:1 (CTA text), `text` vs
  `background` ≥ 7:1. Check: https://webaim.org/resources/contrastchecker/
- Keep `background` dark enough in dark mode for bloom to read
  (luminance clearly below the glow).

## Scope note

`projects[].palette` values are per-project artwork colors (generated
cover gradients), **not** theme tokens — leave them unless the user
asks for the covers to be recolored too.

## Validate

```bash
npm run typecheck && npm run lint && npm run build
```
Dev check: page recolored in both modes; ring glow matches the accent
family; CTA text readable.
