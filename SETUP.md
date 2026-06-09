# ORBIT — Setup

Everything in ORBIT works out of the box without any keys or accounts.
This file covers the two optional integrations and deployment.

## 1. Contact form email (Resend) — optional

**Without a key** the form still works: submissions are logged on the
server and the visitor's mail client opens with the message prefilled
(`mailto:` fallback). Nothing is lost — but for real email delivery:

1. Create a free account at [resend.com](https://resend.com)
   (no credit card; 100 emails/day on the free tier).
2. **API key:** Dashboard → API Keys → Create. Copy the `re_…` value.
3. Locally: `cp .env.example .env.local` and set
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
   ```
   On Vercel: Project → Settings → Environment Variables → add
   `RESEND_API_KEY`.
4. **Sender address:** out of the box the config uses Resend's shared
   onboarding sender:
   ```ts
   contact.form.fromEmail: "Portfolio <onboarding@resend.dev>"
   ```
   That works immediately but only for sending **to your own
   registered email**. For production, verify your domain in Resend
   (Dashboard → Domains) and change `fromEmail` in
   `config/site.config.ts` to e.g. `"Portfolio <hello@yourdomain.com>"`.
5. **Recipient:** submissions go to `contact.form.toEmail`, falling
   back to `contact.email`.

Test locally: fill the form on `/` → with a key you receive an email;
without one the dev console logs the submission and your mail client
opens.

## 2. Custom HDRI environment — optional

The hero's reflections come from bundled procedural light rigs (no
downloads). If you want a real HDRI: put a `.hdr` file under
`public/hdri/` and set `hero.environment.hdri: "/hdri/yourfile.hdr"`.

## 3. Deploy to Vercel

1. Push the project to a Git repo (GitHub/GitLab/Bitbucket), or use
   the CLI: `npx vercel`.
2. On [vercel.com](https://vercel.com): **Add New → Project → Import**
   your repo. Framework preset "Next.js" is detected automatically —
   no build settings to change.
3. Add `RESEND_API_KEY` under Environment Variables (optional, see
   above).
4. Deploy. Then set your production URL in `config/site.config.ts` →
   `seo.url` (enables correct canonical/OG URLs) and redeploy.

### Other hosts

Any Node host works: `npm run build` then `npm run start`
(port via `PORT`). Static export is **not** supported because the
contact API route is a server function.

## 4. Local development

```bash
npm install
npm run dev                      # http://localhost:3000
npm run typecheck && npm run lint && npm run build   # quality gates
```

> Note: stop the dev server before `npm run build` — both use `.next/`.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Hero shows a static poster on your machine | Your OS has reduced motion enabled, or the browser lacks WebGL2 (`lib/device.ts` tiers). |
| New GLB doesn't show | Check the browser console for a 404 → wrong `hero.model.path`; hard-reload (GLBs are cached by URL). |
| Form returns an error with a key set | Check the server logs — usually an unverified `fromEmail` domain on Resend. |
| Build fails after config edits | The Zod error message names the exact config path that's invalid. |
