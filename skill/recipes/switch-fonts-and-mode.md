# Recipe: Switch Fonts & Default Mode

**Goal:** change typography and/or the default color mode. Touches only
`config/site.config.ts` (registry additions: one literal in
`lib/fonts.ts`).

## Fonts (config-only)

`theme.fonts` picks from the bundled registry — five self-hosted
families, zero layout shift:

```ts
fonts: {
  heading: "syne",      // display face: h1–h6, logo, card titles
  body: "manrope",      // everything else
},
```

Available ids: `inter`, `space-grotesk`, `sora`, `manrope`, `syne`.
Pairings that work: syne+manrope (editorial), space-grotesk+inter
(technical, default), sora+inter (soft modern).

## Adding a family to the registry (code path)

`next/font` requires literal module-level calls, so a new family means
one block in `lib/fonts.ts`:

```ts
import { Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-outfit" });
```

…then add `"outfit"` to `fontIdSchema` in `config/schema.ts` and to the
`FONTS` record. Three small edits, same change.

## Default mode & toggle (config-only)

```ts
theme: {
  defaultMode: "light",      // mode on first visit
  allowModeToggle: true,     // false hides the nav toggle entirely
  ...
}
```

Visitors' explicit toggle choice persists in localStorage and wins over
`defaultMode` on return visits.

## Validate

```bash
npm run typecheck && npm run lint && npm run build
```
Dev check: headings and body show the new faces (hard-reload), correct
mode on first paint, toggle still works.
