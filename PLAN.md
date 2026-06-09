# ORBIT — Build-Plan

Arbeitsname "ORBIT" (umbenennbar). In Phasen bauen; nach jeder Phase committen +
`PROGRESS.md` updaten + typecheck/lint/build grün halten.

## Phase 0 — Setup & Tooling
- Next.js 15 App Router + TS strict, Tailwind, ESLint/Prettier
- R3F, drei, postprocessing, gsap, framer-motion installieren
- Ordnerstruktur anlegen (siehe unten); `site.config.ts` als typisiertes Schema
  (z. B. via Zod) skizzieren
- Akzeptanz: leere App buildet & läuft

## Phase 1 — 3D-Hero-Szene (das Showpiece)
- Canvas + Szene + Environment/Licht + ein animiertes Default-GLB
- Scroll-getriebene Kamera/Animation (GSAP ScrollTrigger), Postprocessing (Bloom)
- Akzeptanz: flüssige, beeindruckende Hero-Szene, 60 fps Desktop, keine Fehler

## Phase 2 — Config-System
- `site.config.ts` vollständig: brand/theme/hero/sections/projects/services/
  socials/contact/seo
- Theme-Tokens → CSS-Variablen → Tailwind; Hero liest aus Config; Modell-Swap
  per Pfad
- Akzeptanz: Farb-/Text-/Modellwechsel allein über Config sichtbar

## Phase 3 — Sektionen
- Hero, About, Work/Projects (Grid mit Hover/Reveal), Services, Contact (Resend,
  env-gated + Fallback)
- Section-Reveal-Animationen
- Akzeptanz: alle Sektionen aus Config gerendert, Formular funktioniert (o. Fallback)

## Phase 4 — Theming & Responsive
- Dark/Light über Config-Token; voller Responsive-Pass
- Mobile/Low-Power-Fallback (leichtere Szene / Poster)
- Akzeptanz: top auf Mobile, kein Ruckeln/Crash, Theme-Switch sauber

## Phase 5 — Performance
- Lazy-load/Suspense, Draco, LOD, Code-Splitting von three, Asset-Optimierung
- Akzeptanz: solide Lighthouse-Performance, stabile 60 fps Desktop

## Phase 6 — Claude-Code-Customization-Skill (der Differentiator)
- `/skill/SKILL.md` (beschreibt das Skill); `CLAUDE.md` (Projektkontext + goldene
  Regel: Render-Loop/Szene nicht brechen, Config ist die Wahrheit)
- Rezepte in `/skill/recipes/`: rebrand, swap-hero-model, add-project,
  change-palette, change-copy-tone, add-section (6–8 Stück), je getestet
- Modell-Swap-Helfer (Script o. dokumentierter Ablauf)
- Akzeptanz: frischer Claude-Code-Lauf baut Template via Rezept um, ohne Szene
  zu brechen

## Phase 7 — Content, Docs, Lizenz
- Überzeugender Demo-Content (fiktives Designer-Portfolio), README mit
  Screenshots, Quickstart, SETUP.md (env/keys), LICENSE (Standard- + Extended-Hinweis)
- Akzeptanz: Käufer kann in <15 Min starten

## Phase 8 — Deploy & Verkaufs-Assets
- Vercel-Deploy; Screenshots, kurzer Capture/GIF der Szene + einer Live-Anpassung;
  ThemeForest-Einreich-Assets
- Akzeptanz: Live-Demo-URL + Asset-Ordner vorhanden

## Ordnerstruktur (Richtwert)
```
orbit/
  app/                # Next.js App Router
  components/
    three/            # R3F-Szene, Hero, Effekte
    sections/         # Hero, About, Work, Services, Contact
    ui/
  config/
    site.config.ts    # einzige Wahrheit
  content/            # optionale MDX/Daten
  lib/                # Theme-Mapping, Helpers
  public/models/      # GLB-Assets (+ Draco)
  skill/
    SKILL.md
    recipes/
  CLAUDE.md
  README.md
  SETUP.md
  PROGRESS.md
  LICENSE
```

## Nach dem Build (Business, kein Code)
- Validierung: Live-Demo + "Coming soon"-Mail-Capture im three.js-Forum-Showcase
  und auf X posten; Schwelle z. B. 50+ Signups
- Verkauf: ThemeForest @ $39 + Lemon Squeezy (Merchant of Record, übernimmt
  EU-VAT) @ $59–79 für Extended + Skill-Bundle
- Discovery: Skill kostenlos auf Claude-Skill-Marktplätzen listen, mit Link zum
  Template; Build-Thread auf X