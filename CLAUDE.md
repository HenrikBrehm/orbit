# ORBIT — Project Context for AI Agents

ORBIT is a config-driven 3D portfolio template: Next.js 15 (App Router),
TypeScript strict, Tailwind CSS 4, React Three Fiber + drei +
postprocessing, GSAP ScrollTrigger (hero scroll), framer-motion (UI).

## The One Rule That Matters

**`config/site.config.ts` is the single source of truth.** Branding,
colors, fonts, copy, projects, services, socials, contact, SEO and the
entire 3D hero scene read from it. Almost every customization is a
config edit. If you are about to edit a component to change content or
styling values, stop — the config almost certainly covers it.

## Golden Rules (do not break these)

1. **Config first.** Customizations happen in `config/site.config.ts`.
   The Zod schema in `config/schema.ts` validates it at startup — a bad
   value fails fast with a readable error. Only touch `schema.ts` when
   adding genuinely new structure, and then update the consuming
   component in the same change.
2. **Never break the render loop.**
   - The hero scroll uses a mutable `progress` ref shared between GSAP
     ScrollTrigger and `useFrame` (see `components/sections/Hero.tsx`).
     Never replace it with React state — that's a re-render per frame.
   - No `setState` inside `useFrame`.
   - Keep `HeroCanvas` loaded via `next/dynamic` with `ssr: false`.
   - Keep the canvas wrapper `pointer-events-none` (scroll trapping on
     mobile otherwise).
3. **Scene structure stays.** `HeroScene` → lights / `EnvironmentRig` /
   `HeroModel` / `Particles` / `Effects`. You may tune values (via
   config); adding scene objects goes inside `HeroModel` or as a new
   sibling component following the same patterns.
4. **three is pinned to 0.182.x** (0.183+ deprecation-warns on
   THREE.Clock which R3F uses). Don't bump it casually.
5. **Validate after every change:**
   `npm run typecheck && npm run lint && npm run build` must pass and
   `npm run dev` must render the scene without console errors.
   Never run `build` while the dev server is running (shared `.next/`).
6. **Models:** GLBs live in `public/models/`. Swap via
   `hero.model.path`. Draco-compressed GLBs decode locally from
   `/public/draco`. Compress with `npm run optimize:model -- in.glb out.glb`.
   With `material.override: true` and a full GLB, keep
   `emissiveIntensity ≤ 0.4` — the 2.4 demo value is routed to the
   procedural showpiece's glow accents only and will blow out a full
   model.
7. **Fonts** come from the bundled registry (`lib/fonts.ts`):
   `inter`, `space-grotesk`, `sora`, `manrope`, `syne`. Adding another
   family means a new literal `next/font` call in that registry — never
   a `<link>` tag.
8. **Encoding:** files are UTF-8 (no BOM). Preserve em-dashes and the
   `®` in demo copy, or replace them intentionally — never via a
   mis-encoded write.

## Customization Skill

`skill/SKILL.md` describes the customization skill; step-by-step
recipes live in `skill/recipes/`:

| Recipe | Use for |
| --- | --- |
| `rebrand.md` | Name, tagline, logo, SEO identity |
| `change-palette.md` | Colors for both modes (incl. contrast rules) |
| `swap-hero-model.md` | Replacing the 3D centerpiece with a GLB |
| `add-project.md` | New work-grid entries |
| `change-copy-tone.md` | Rewriting all copy in a different voice |
| `add-section.md` | Adding/reordering/removing sections |
| `tune-hero-scene.md` | Camera, lights, bloom, particles, scroll feel |
| `switch-fonts-and-mode.md` | Fonts, default mode, mode toggle |

## Layout of Things

```
app/                  # App Router: layout (theme/font injection), page (section renderer), api/contact
components/three/     # R3F scene (HeroCanvas → HeroScene → model/particles/effects/env)
components/sections/  # Hero (scroll choreography) + About/Work/Services/Contact + poster fallback
components/ui/        # Nav, Footer, cards, form, reveals, theme toggle
config/               # schema.ts (Zod) + site.config.ts (THE config)
lib/                  # theme css generator, font registry, gsap, icons, device tiers
public/models/        # GLB assets · public/draco/ — local Draco decoder
scripts/              # demo GLB generator, model swap helper, QA capture
skill/                # customization skill + recipes
```

## Verification Quickstart

```bash
npm run typecheck && npm run lint   # fast gates
npm run build                       # full gate (stop dev server first)
npm run dev                         # visual check: hero renders, scroll works,
                                    # no console errors, theme toggle flips colors
```
