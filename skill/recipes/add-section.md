# Recipe: Add / Reorder / Remove Sections

**Goal:** change which sections appear and in what order. The nav
follows automatically.

## Reorder or remove (config-only)

`config/site.config.ts` → `sections[]` renders in array order. Move or
delete entries; `id`s must stay unique. That's it.

## Add another instance of an existing type (config-only)

Example — a second about-style section used as a "Process" block:

```ts
{
  type: "about",
  id: "process",                  // unique anchor + nav target
  label: "Process",
  eyebrow: "Process",
  title: "From brief to orbit in three steps.",
  paragraphs: ["Discovery and moodboards…", "Lookdev, motion tests…"],
  portrait: null,
  stats: [
    { value: "01", label: "Discover & moodboard" },
    { value: "02", label: "Lookdev & motion" },
    { value: "03", label: "Build & integrate" },
  ],
  skills: [],
},
```

## Add a genuinely new section *type* (code path — three files)

1. **Schema** (`config/schema.ts`): define e.g. `testimonialsSectionSchema`
   with `...sectionBaseShape` + `type: z.literal("testimonials")` + its
   fields; add it to the `sectionSchema` discriminated union; export the
   inferred type.
2. **Component** (`components/sections/Testimonials.tsx`): copy the
   structure of `Services.tsx` — wrap content in `<SectionShell>` and
   take `{ section }: { section: TestimonialsSection }` as props.
3. **Renderer** (`app/page.tsx`): add a `case "testimonials":` to the
   switch.
4. Add the section instance to `sections[]` in the config.

Keep the component server-rendered unless it needs interactivity
(then `"use client"` like the existing patterns).

## Validate

```bash
npm run typecheck && npm run lint && npm run build
```
Dev check: new order in page + nav; anchors scroll correctly; reveal
animations play.
