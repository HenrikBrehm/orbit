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

- [x] Theme tokens → CSS variables → Tailwind: both modes generated server-side from config (`lib/theme.ts`), injected as `<style>` with `data-theme` on `<html>` — no FOUC, no theme provider re-renders
- [x] Font registry (`lib/fonts.ts`): 5 bundled next/font families, picked by config id; heading/body wired via CSS variables
- [x] Full SEO metadata from config (OG, Twitter, themeColor, title template)
- [x] Acceptance proven: light mode + lime accent + new headline + GLB model (`/models/demo-orb.glb`) swapped in via config only — screenshot-verified, then restored (`qa-output/variant`)

## Phase 3 — Sections

- [x] Section renderer in page.tsx — order/content fully from `sections[]`
- [x] Nav from config (links = sections, logo = brand) + mobile overlay menu + dark/light toggle (localStorage, pre-paint restore script)
- [x] About: paragraphs, skills, stats, portrait slot (abstract orbit panel until an image is configured)
- [x] Work grid: hover/reveal cards, wide-card spans, generated palette covers when `image` is null (zero stock photos)
- [x] Services: bundled icon set (10 ids), staggered reveals
- [x] Contact: blurb + email + availability + form; API route env-gated Resend with mailto/console fallback — verified: ok+mailto without key, 400 on invalid payload
- [x] Footer: brand, socials (10 platform icons), copyright
- [x] Section reveal animations (framer-motion whileInView, respects prefers-reduced-motion; GSAP stays dedicated to hero scroll)
- [x] Gates green; all sections screenshot-verified; 0 page errors

## Phase 4 — Theming & Responsive

- [x] Dark/light toggle verified end-to-end: data-theme flips, localStorage persists, survives reload (pre-paint restore script)
- [x] 3D scene follows the live theme (particles read accent via MutationObserver hook)
- [x] Device tiers (`lib/device.ts`): fallback = prefers-reduced-motion / no WebGL2 / ≤2GB → static poster (config image or CSS orbit motif); low = mobile/weak CPU → capped DPR, half particles, no MSAA; drei PerformanceMonitor lowers DPR on sustained drops
- [x] Responsive: model auto-scales on narrow viewports; mobile nav overlay; verified at 390/768/1440
- [x] Hydration mismatch fixed: MotionConfig reducedMotion="user" instead of SSR-divergent useReducedMotion branches
- [x] QA matrix green (mobile/tablet/toggle/reduced-motion), 0 console errors, build green

## Phase 5 — Performance

- [x] three fully code-split (dynamic ssr:false) — First Load JS 103 kB without WebGL
- [x] WebGL boots after `load` + idle: copy paints instantly, scene fades in (TBT 3,800 → 2,830 ms mobile)
- [x] Draco: local decoder in /public/draco (no CDN), `useGLTF(path, "/draco/")`; demo model compressed 223 → 32 KB and load-verified in browser; `npm run optimize:model` for buyers
- [x] Geometry LOD by device tier (low → half knot segments) + Phase-4 DPR/particle/MSAA trims
- [x] Lighthouse (desktop preset, prod build): Performance 77 / A11y 100 / Best Practices 100 / SEO 100, CLS 0 — mobile preset 66 (4× CPU throttle vs. WebGL shader compile; real low-end devices get the low tier/poster instead)
- [x] CTA contrast fixed to WCAG AA via config accent (#6C50F7, 5.07:1)
- [x] 103-108 fps measured headless desktop

## Phase 6 — Claude Code Customization Skill

- [x] CLAUDE.md (golden rules: config is truth, never break the render loop, gates) + skill/SKILL.md with request→recipe routing; mirrored in .claude/skills/orbit-customize for auto-discovery
- [x] 8 recipes: rebrand, change-palette, swap-hero-model, add-project, change-copy-tone, add-section, tune-hero-scene, switch-fonts-and-mode
- [x] Model swap helper: `npm run swap:model` (copy + auto-Draco + config snippet), tested
- [x] **All 8 recipes validated by fresh agents in isolated worktrees** (workflow, one agent per recipe, only CLAUDE.md+SKILL.md+recipe as instructions): 8/8 briefs applied, 24/24 gates green (typecheck/lint/build each), zero scene breakage, all changes confined to config/site.config.ts
- [x] Agent findings folded back into the recipes (full gate in every Validate block, preset name list, proper-noun rule for copy rewrites, grid-balance guidance, unique example palette)

## Phase 7 — Content, Docs, License

- [x] Demo content: fictional 3D/motion designer persona (Nova Marlowe), 6 projects with generated covers, 4 services, stats/skills — zero stock assets, zero licensing risk
- [x] README: pitch, features, quickstart (<5 min), config overview, AI-skill section, scripts table, deploy, screenshots (docs/screenshots)
- [x] SETUP.md: Resend key setup + fallback behavior, custom HDRI, Vercel deploy steps, troubleshooting table
- [x] LICENSE: commercial standard/extended terms + third-party note
- [x] Buyer-flow verified end-to-end: fresh `git clone` → `npm ci` → typecheck → build, all green (one transient Windows build-worker abort on first try, clean on rerun)

## Phase 8 — Deploy & Sales Assets

- [x] Vercel deploy: requires human account login (CLI hangs on interactive auth) → fully documented in SETUP.md (`npx vercel login` once, then `npx vercel --prod`); production bundle built, served and QA'd locally as the live-demo stand-in
- [x] Sales screenshots 1920×1080 (hero dark/scrolled/light, all sections, live-customization variant) in sales-assets/screenshots
- [x] 30s scroll capture of the hero choreography (scroll-capture.webm; GIF/MP4 conversion needs full ffmpeg — noted in the kit)
- [x] ThemeForest submission kit: item name, description copy, feature list, tags, category, pricing strategy (sales-assets/themeforest.md)

---

## Definition of Done — final check (2026-06-10)

- ✅ `npm run dev` zeigt eine optisch erstklassige 3D-Portfolio-Seite (103+ fps desktop, 0 Konsolenfehler)
- ✅ Branding/Farben/Texte/Projekte/Hero-Modell allein über `site.config.ts` änderbar (zweifach live bewiesen: acid-test Variante + Draco-GLB-Swap, Screenshots in docs/)
- ✅ Claude-Code-Skill + 8 getestete Rezepte (8/8 Agent-Läufe, 24/24 Gates grün, Szene nie gebrochen)
- ✅ 60 fps Desktop, sauberer Mobile-/Low-Power-Fallback (Tier-System + Poster, QA-Matrix grün)
- ✅ typecheck/lint/build grün; frischer Clone → `npm ci` → build verifiziert
- ✅ Vercel-deploybar (Konfiguration komplett; Login-Schritt dokumentiert — einziger menschlicher Rest-Schritt)
