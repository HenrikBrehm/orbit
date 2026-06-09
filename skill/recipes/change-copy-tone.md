# Recipe: Change Copy Tone

**Goal:** rewrite all visible copy in a different voice (e.g. playful →
corporate, English → German) without touching structure. Touches only
`config/site.config.ts`.

## Where every piece of copy lives

| Copy | Config path |
| --- | --- |
| Hero badge / headline / subheadline / CTAs | `hero.badge`, `hero.headline`, `hero.subheadline`, `hero.ctas[].label` |
| Section eyebrows, titles, intros, nav labels | `sections[].eyebrow/title/intro/label` |
| About paragraphs, stats, skills | `sections[]` (type `about`) |
| Project titles/descriptions/categories/tags | `projects[]` |
| Service titles/descriptions | `services[]` |
| Contact blurb / availability | `sections[]` (type `contact`) + `contact.availability` |
| Footer tagline | `brand.tagline` |
| Tab title / meta description | `seo.title`, `seo.description` |

## Steps

1. Establish the voice in 2–3 adjectives from the user's brief (e.g.
   "confident, minimal, technical").
2. Rewrite every field above in that voice. Keep lengths comparable:
   - headline ≤ ~50 chars (it renders up to 6.5rem),
   - subheadline ≤ ~160 chars,
   - service/project descriptions 1–2 sentences.
3. Keep `sections[].id` values unchanged (anchors), only change the
   human-readable strings.
4. Don't invent factual claims (awards, client names) unless provided.

## Validate

```bash
npm run typecheck && npm run lint
```
Dev check: no overflowing headline on mobile width (~390px), nav labels
still fit one line.
