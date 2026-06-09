# Recipe: Tune the Hero Scene

**Goal:** adjust the 3D scene's feel — camera, lights, glow, particles,
scroll choreography. Touches only `config/site.config.ts` → `hero`.

## Knob map

| Effect wanted | Config knob | Notes |
| --- | --- | --- |
| Camera closer/farther | `camera.position` (z) | default `[0, 0.3, 7]` |
| Wider/tighter framing | `camera.fov` | 30–45 sensible |
| More/less glow | `postprocessing.bloom.intensity` | 0.4 subtle – 1.5 heavy |
| What glows | `model.material.emissive` + `emissiveIntensity` | rings/satellites on the showpiece |
| Glow cutoff | `postprocessing.bloom.luminanceThreshold` | lower = more blooms |
| Spin speed | `model.spinSpeed` | rad/s; 0 = off |
| Bobbing | `model.float` | amplitude in world units |
| Scroll rotation amount | `scroll.rotate` | total radians over the hero scroll |
| Scroll zoom-in | `scroll.cameraDolly` | world units toward origin |
| Copy fade on scroll | `scroll.fade` | boolean |
| Particle density/size | `particles.count` / `.size` | count is halved on low-tier devices |
| Reflection mood | `environment.preset` + `.intensity` | 10 procedural rigs |
| Custom reflections | `environment.hdri` | e.g. `/hdri/studio.hdr` in public/ |
| Light colors | `lights.key` / `lights.rim` / `lights.ambient` | rim = colored edge light |
| Vignette | `postprocessing.vignette` | darkness 0.6–0.9 |

## Guardrails

- `particles.count` > ~2000 hurts low-end GPUs; demo uses 500.
- Keep `bloom.luminanceThreshold` ≥ 0.6 — below that the whole page
  glows.
- Don't set `spinSpeed` and `scroll.rotate` both high; the combination
  feels chaotic mid-scroll.
- Changes here never require touching `components/three/*`.

## Validate

```bash
npm run typecheck && npm run lint
```
Dev check: scroll through the hero twice — motion reads smooth, copy
legible against the scene in both theme modes.
