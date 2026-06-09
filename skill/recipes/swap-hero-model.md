# Recipe: Swap the Hero Model

**Goal:** replace the procedural showpiece (or current GLB) with a
user-provided .glb. Touches `public/models/` + `config/site.config.ts`.

## Steps

1. Copy the model into the project (helper does copy + optional Draco
   compression + prints the config snippet):
   ```bash
   npm run swap:model -- path/to/their-model.glb
   # or manually: copy to public/models/their-model.glb
   ```
   Models ≥ ~1 MB should be Draco-compressed:
   ```bash
   npm run optimize:model -- public/models/their-model.glb public/models/their-model-draco.glb
   ```
   (Draco decodes from the bundled `/public/draco` — no CDN.)

2. In `config/site.config.ts` → `hero.model`:
   ```ts
   model: {
     path: "/models/their-model-draco.glb",
     scale: 1.4,                  // start ~1.4 and adjust to taste
     position: [0, -0.2, 0],
     rotation: [0, 0.6, 0],
     spinSpeed: 0.12,
     float: { enabled: true, amplitude: 0.18, speed: 0.6 },
     material: {
       override: false,           // false = keep the GLB's own materials
       // If override: true (rebrand any model to the theme look):
       color: "#16161f",
       metalness: 0.9,
       roughness: 0.2,
       emissive: "#2BD9A7",       // ← use YOUR theme accent here (theme.colors.*.accent)
       emissiveIntensity: 0.3,    // ≤ 0.4 for full models! 2.4 is showpiece-only
     },
   },
   ```

3. Framing: the camera looks at the origin from
   `hero.camera.position` (default `[0, 0.3, 7]`, fov 38). A model that
   appears too big → reduce `scale` or raise camera z. Off-center →
   adjust `position`.

4. GLB animations: if the file contains animation clips, the first one
   auto-plays. No config needed.

5. Revert to the built-in showpiece anytime with `path: null`.

## Validate

```bash
npm run typecheck && npm run lint && npm run build
```
Dev check (critical): model visible and framed, idle spin + float
working, scroll still rotates/dollies, **zero console errors** (a wrong
path 404s in the console and suspends the model).

## Notes

- Keep source files out of `public/` except the final .glb.
- `useGLTF` caches by URL — hard-reload the browser after replacing a
  file under the same name.
