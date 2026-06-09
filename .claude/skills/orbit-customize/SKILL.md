---
name: orbit-customize
description: >
  Customize the ORBIT 3D portfolio template safely. Rebrand, recolor,
  swap the hero 3D model, rewrite copy, add projects/sections, tune the
  scene — all through config/site.config.ts, without breaking the WebGL
  render loop. Use whenever the user asks to change how their ORBIT
  site looks, reads or behaves.
---

This project ships its customization skill at `skill/SKILL.md` with
step-by-step, tested recipes in `skill/recipes/`.

1. Read `CLAUDE.md` (golden rules — config is the single source of
   truth; never break the render loop).
2. Read `skill/SKILL.md` and pick the matching recipe(s) from
   `skill/recipes/`.
3. Follow the recipe steps, then validate:
   `npm run typecheck && npm run lint` (and `npm run build` before
   declaring done — stop the dev server first).
