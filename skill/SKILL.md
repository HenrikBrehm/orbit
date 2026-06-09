---
name: orbit-customize
description: >
  Customize the ORBIT 3D portfolio template safely. Rebrand, recolor,
  swap the hero 3D model, rewrite copy, add projects/sections, tune the
  scene — all through config/site.config.ts, without breaking the WebGL
  render loop. Use whenever the user asks to change how their ORBIT
  site looks, reads or behaves.
---

# ORBIT Customization Skill

You are customizing **ORBIT**, a config-driven 3D portfolio template.
Read `CLAUDE.md` at the project root first — it contains the golden
rules. The short version:

1. **`config/site.config.ts` is the single source of truth.** Nearly
   every customization is an edit there. The Zod schema
   (`config/schema.ts`) documents every field with comments and
   validates at startup.
2. **Don't break the scene.** Keep the `progress`-ref pattern, the
   `dynamic({ ssr: false })` canvas import and `pointer-events-none` on
   the canvas wrapper. No React state inside `useFrame`.
3. **Always validate**: `npm run typecheck && npm run lint` after each
   edit; `npm run build` before declaring done (stop the dev server
   first — they share `.next/`). The dev server must render the hero
   with zero console errors.

## How to work

1. Identify which recipe(s) in `skill/recipes/` match the request:

   | Request sounds like | Recipe |
   | --- | --- |
   | "make it my brand / rename / new logo" | `rebrand.md` |
   | "different colors / dark teal look / brand color X" | `change-palette.md` |
   | "use my 3D model / swap the orb" | `swap-hero-model.md` |
   | "add my project / portfolio piece" | `add-project.md` |
   | "rewrite the texts / more playful / more corporate" | `change-copy-tone.md` |
   | "add a section / reorder / remove services" | `add-section.md` |
   | "more glow / slower spin / different camera" | `tune-hero-scene.md` |
   | "different font / start in light mode" | `switch-fonts-and-mode.md` |

2. Follow the recipe steps exactly; they are tested. Combine recipes
   freely for bigger briefs (a full redesign is usually rebrand +
   palette + copy-tone + fonts).
3. Make all edits, then run the validation gate once at the end.

## Things you must never do

- Edit `components/three/*` to change colors, speeds or intensities —
  those are config values.
- Remove the poster/low-power fallback path in
  `components/sections/Hero.tsx`.
- Introduce `any` types or disable ESLint rules to make gates pass.
- Run `npm run build` while `npm run dev` is running.
- Upgrade `three` beyond 0.182.x without being asked explicitly.
