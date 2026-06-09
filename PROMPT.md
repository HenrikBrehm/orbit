# ORBIT — Build-Prompt (für autonomen Claude-Code-Lauf)

## Rolle & Ziel
Du bist ein Senior Full-Stack- und Creative-Web-Developer. Baue **ORBIT**, ein
verkaufsfertiges Premium-Template: eine konfigurationsgetriebene, interaktive
3D-Portfolio-Website. Das Produkt wird auf ThemeForest (~$39) und direkt
(~$59–79) verkauft. Qualitätslatte: Awwwards-Niveau, 60 fps auf Desktop,
sauberer Mobile-Fallback. Es muss für Käufer *trivial anpassbar* sein — das ist
das zentrale Verkaufsargument.
("ORBIT" ist ein Arbeitsname, frei umbenennbar.)

## Das Alleinstellungsmerkmal
Alles Visuelle wird über **eine einzige typisierte Config (`site.config.ts`)**
gesteuert: Branding, Farben, Texte, Projekte, die 3D-Hero-Szene (inkl.
Modell-Pfad, Kamera, Licht), Scroll-Animationen, Sektionen. Zusätzlich liefert
ORBIT ein **Claude-Code-Customization-Skill** mit, damit Käufer ihren eigenen
AI-Agenten das Template per Chat umbauen lassen können ("mach daraus ein
dunkles, minimalistisches Portfolio für eine Motion-Designerin, tausch das
Hero-Modell gegen dieses .glb, schreib die Texte um") — ohne die WebGL-Szene zu
zerstören.

## Tech-Stack (fix)
- Next.js 15 (App Router) + TypeScript (strict, kein `any`)
- React Three Fiber + @react-three/drei + @react-three/postprocessing
- GSAP + ScrollTrigger (Scroll-Animationen), Framer Motion (UI-Transitions)
- Tailwind CSS (Theme über CSS-Variablen, gespeist aus der Config)
- Kontaktformular: Resend via Next.js Route Handler — API-Key env-gated, mit
  funktionierendem Fallback (Mailto/Konsolen-Log), falls kein Key gesetzt ist
- Deployment-Ziel: Vercel
- 3D-Assets: GLB via `useGLTF`, mit dokumentiertem Swap-Pfad + Draco-Kompression

## Architektur (konfigurationsgetrieben)
- `site.config.ts` ist die *einzige* Quelle für: brand {name, tagline, logo},
  theme {Farb-Tokens, Font}, hero {modelPath, environmentPreset, camera,
  animation}, sections[] (Reihenfolge + Inhalt), projects[], services[],
  socials[], contact, seo.
- Theme-Tokens → CSS-Variablen → Tailwind. Ein Farbwechsel in der Config färbt
  die ganze Seite um.
- Die 3D-Szene liest ausschließlich aus der Config. Modell tauschen = einen Pfad
  ändern.
- Mobile/Low-Power-Fallback: Geräte-/Performance-Erkennung; leichtere Szene oder
  statisches Poster-Bild, niemals Ruckeln oder Crash.

## MVP-Scope (genau das, nicht mehr)
Eine **einzige, herausragende Portfolio-Variante**. KEINE zweite Variante in
diesem Lauf. Sektionen: Hero (3D-Showpiece), About, Work/Projects (Grid),
Services, Contact. Dark/Light-Theme. Voll responsive. Das mitgelieferte
Claude-Code-Skill + Rezepte. Demo-Content, README, Quickstart, Lizenz-Docs. Auf
Vercel deploybar.

## Arbeitsweise (wichtig)
- **Arbeite vollständig autonom. Stelle KEINE Rückfragen.** Triff alle Design-,
  Produkt- und Technikentscheidungen selbst und begründe sie kurz in den Commits.
- Wenn dich etwas blockiert, das nur ein Mensch liefern kann (z. B. ein bezahlter
  API-Key, ein Account-Login): stub/mock es, mach weiter, und notiere das Nötige
  in `SETUP.md`. Niemals deswegen anhalten.
- Folge `PLAN.md` Phase für Phase. Führe `PROGRESS.md` mit abgehakten Schritten.
- Halte die App in *jeder* Phase lauffähig. Committe nach jeder Phase mit klarer
  Message.
- Nach jeder Phase müssen `npm run typecheck`, `npm run lint`, `npm run build`
  grün sein; Dev-Server startet; 3D-Szene rendert ohne Konsolenfehler.
- Nicht über den MVP hinaus over-engineeren. Erst die eine Variante richtig fertig.

## Definition of Done
- `npm run dev` zeigt eine optisch erstklassige 3D-Portfolio-Seite.
- Branding/Farben/Texte/Projekte/Hero-Modell lassen sich allein über
  `site.config.ts` ändern.
- Das Claude-Code-Skill (`/skill`) baut das Template per Prompt um, ohne die Szene
  zu brechen; 6–8 getestete Rezepte liegen vor.
- 60 fps Desktop, sauberer Mobile-Fal