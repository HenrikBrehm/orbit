# Recipe: Rebrand

**Goal:** change the site identity — name, tagline, logo, SEO — to a new
brand. Touches only `config/site.config.ts`.

## Steps

1. Open `config/site.config.ts`.
2. Update `brand`:
   ```ts
   brand: {
     name: "Atlas Render Co.",            // shown in footer + copyright
     tagline: "Product CGI that converts.",
     logo: {
       image: null,                        // or "/logo.svg" after dropping a file in /public
       text: "ATLAS",                      // nav text logo; null → brand.name
     },
   },
   ```
3. Update `seo` to match (title, description, keywords). The page
   `<title>`, OG and Twitter cards all derive from it.
4. Update `contact.email` and `socials[]` URLs if the brand owns
   different handles.
5. If a logo image was provided: place it under `public/` (SVG
   preferred), set `brand.logo.image` to its path. Nav renders it at
   ~32px height.

## Validate

```bash
npm run typecheck && npm run lint && npm run build
```
Dev check: nav logo, footer, browser tab title all show the new brand.

## Notes

- The favicon is `app/icon.svg` — recolor/replace it for a complete
  rebrand (static file, not config-driven).
- Hero headline/subheadline are content, not brand — see
  `change-copy-tone.md`.
