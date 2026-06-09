# ORBIT — Marketplace Submission Kit

## Item name

**ORBIT — Interactive 3D Portfolio Template (Next.js + React Three Fiber + AI Customization Skill)**

## One-liner

A config-driven 3D portfolio with an award-grade WebGL hero — rebrand,
recolor and swap the 3D model from one typed file, or let an AI agent
do it for you with the bundled customization skill.

## Item description (HTML-ready copy)

**Your portfolio, in another dimension.**

ORBIT is a premium one-page portfolio for designers, 3D artists and
creative developers. A scroll-choreographed WebGL hero (camera dolly,
model rotation, bloom) flows into elegantly animated About, Work,
Services and Contact sections — dark & light mode included.

**Everything from ONE file.** `site.config.ts` drives branding, colors,
fonts, copy, projects, services, socials, SEO and the entire 3D scene.
Typed and validated: a typo fails fast with a readable message instead
of a broken site.

**Swap the 3D centerpiece in seconds.** Point `hero.model.path` at any
.glb — Draco decoding ships locally, embedded animations auto-play, and
an optional material override restyles any model to your brand. No
model? The built-in procedural showpiece (chrome knot + glowing orbit
rings) looks stunning out of the box.

**The first template built for AI customization.** ORBIT ships with a
Claude Code skill and 8 tested recipes. Tell your AI agent "rebrand
this to my studio, dark teal, swap in my robot.glb, make the copy more
corporate" — and it knows exactly which file to touch and how to
validate the result without breaking the scene.

**Performance you can sell to clients.** Device-tier system (full
scene → lighter scene → static poster), 60+ fps on desktop, Lighthouse
100 accessibility / 100 SEO / 100 best practices, zero layout shift.

### Feature list

- Next.js 15 (App Router) + TypeScript strict + Tailwind CSS 4
- React Three Fiber 9 + drei + postprocessing (bloom, vignette)
- GSAP ScrollTrigger hero choreography, framer-motion UI reveals
- Single typed config (Zod-validated) for design, content & 3D
- GLB hero model swap with local Draco support + helper scripts
- 10 procedural environment light rigs (zero runtime downloads) + custom HDRI slot
- Dark/light mode with pre-paint restore (no flash)
- Mobile/low-power fallback: lighter scene or static poster — never jank
- Contact form: Resend integration, graceful mailto fallback without a key
- Claude Code customization skill + 8 step-by-step recipes + CLAUDE.md
- 5 bundled self-hosted fonts, 10 service icons, 10 social icons
- Quickstart < 5 minutes; deploys to Vercel untouched

### What's included

- Full source code (TypeScript)
- `skill/` — AI customization skill + recipes
- Demo content (fictional persona) + license-free demo 3D models
- README, SETUP (env/keys/deploy), CLAUDE.md
- Helper scripts: model swap, Draco optimize, demo model generator

### Requirements

Node 18.18+, npm. For email delivery: free Resend account (optional).

## Tags

portfolio, 3d, webgl, threejs, react-three-fiber, nextjs, react,
tailwind, gsap, creative, designer portfolio, ai, claude, template,
dark mode

## Category

Site Templates → Creative → Portfolio

## Pricing strategy (per PROMPT)

- ThemeForest: $39 (Standard)
- Direct (Lemon Squeezy, Merchant of Record handles EU VAT): $59–79
  Extended + Skill bundle

## Preview image checklist (in screenshots/)

- 01-hero-dark.png — main preview (1920×1080)
- 02-hero-scrolled.png — scroll choreography mid-state
- 03..06 — sections (about/work/services/contact)
- 07-hero-light.png — light mode
- video-raw/*.webm — scroll capture for the item video/GIF
