# ORBIT — Build Progress

Spec: `Components/prompt.nd` (contract) · `Components/plan.md` (phases)

## Phase 0 — Setup & Tooling

- [x] git init (main), local identity
- [x] Next.js 15 App Router + TypeScript strict scaffold (hand-rolled in non-empty root)
- [x] Tailwind CSS 4 (PostCSS plugin), ESLint 9 flat config (next/core-web-vitals), Prettier
- [x] Dependencies: three / @react-three/fiber / drei / postprocessing / gsap / @gsap/react / framer-motion / zod / resend
- [x] `config/schema.ts` — full Zod schema for the site config
- [x] `config/site.config.ts` — demo content (fictional 3D designer "Nova Marlowe")
- [x] typecheck / lint / build green (TypeScript pinned to 5.9 — TS 6 breaks Next 15.5 CSS type resolution)
- [x] Dev server smoke-tested (HTTP 200, config-driven content renders)
- [x] Commit

## Phase 1 — 3D Hero Scene

- [x] Canvas + scene + config-driven lights
- [x] Procedural environment lighting (Lightformer rigs per preset — no HDR downloads, offline-safe; optional `hdri` file override)
- [x] Animated default model: procedural ORBIT showpiece (chrome knot + glowing rings/satellites) + GLB path via useGLTF (auto-plays embedded animations, optional material override)
- [x] Demo GLB generated license-free by `npm run generate:model` (hand-assembled GLB container)
- [x] Scroll choreography: sticky 200vh hero, GSAP ScrollTrigger scrubs progress → camera dolly + model rotation; copy fade tween
- [x] Postprocessing: Bloom (mipmap) + Vignette, MSAA 4
- [x] Particle shell (deterministic, seeded)
- [x] QA: 103 fps headless Chrome desktop, 0 console errors, 0 page errors (`scripts/qa-capture.mjs`)
- [x] Fixes: spec folder `Components/` → root `PROMPT.md`/`PLAN.md` (Windows case-collision with `components/`); three pinned 0.182 (0.183+ deprecates THREE.Clock used by R3F internals); app/icon.svg favicon

## Phase 2 — Config System

- [ ] Theme tokens → CSS variables → Tailwind
- [ ] Hero reads everything from config; model swap via path
- [ ] Fonts from config (next/font registry)

## Phase 3 — Sections

- [ ] About / Work grid / Services / Contact from config
- [ ] Resend route handler (env-gated) + mailto/log fallback
- [ ] Section reveal animations

## Phase 4 — Theming & Responsive

- [ ] Dark/light mode toggle
- [ ] Full responsive pass
- [ ] Mobile/low-power fallback (light scene / poster)

## Phase 5 — Performance

- [ ] Lazy/Suspense, code-splitting of three
- [ ] Draco pipeline + docs
- [ ] Lighthouse pass, stable 60 fps

## Phase 6 — Claude Code Customization Skill

- [ ] skill/SKILL.md + CLAUDE.md golden rules
- [ ] 6–8 tested recipes
- [ ] Model swap helper

## Phase 7 — Content, Docs, License

- [ ] README + Quickstart + screenshots
- [ ] SETUP.md (env/keys)
- [ ] LICENSE (standard + extended note)

## Phase 8 — Deploy & Sales Assets

- [ ] Vercel deploy (or documented steps if login required)
- [ ] Screenshots / capture
- [ ] ThemeForest submission assets
