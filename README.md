# CAELMONT — caelmont.in

Corporate website for **CAELMONT** — an independent technology company building
focused software products and ventures. Six pages, one centralized config, no
invented content.

## Stack

- **Next.js** (App Router) + **React** + **TypeScript**
- **Tailwind CSS v4** (`@theme` tokens in `src/app/globals.css`)
- **motion** (Framer Motion) for scroll/entrance animation, with
  `prefers-reduced-motion` respected everywhere
- **Supabase** (Postgres + Data API) behind the contact-form inbox, through
  `@supabase/ssr` / `@supabase/supabase-js`
- Deployed to **Cloudflare Workers** via `@opennextjs/cloudflare`

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the Supabase credentials
npm run dev
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Next dev server |
| `npm run build` | Production build (`next build`) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (flat config, `next/core-web-vitals`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run cf-typegen` | Generate `worker-configuration.d.ts` via `wrangler types` |
| `npm run preview` | Build + local Cloudflare Workers preview (`opennextjs-cloudflare build && opennextjs-cloudflare preview`) |
| `npm run deploy` | Build + deploy to Cloudflare Workers |

## Where things live

| File | Contents |
| --- | --- |
| `src/config/site.ts` | Company identity, nav, domain, contact email |
| `src/config/ventures.ts` | The four ventures — all portfolio copy |
| `src/config/images.ts` | All imagery (swap URLs here) |
| `src/config/founder.ts` | Founder profile + social links (**placeholders — fill in**) |
| `src/config/approach.ts` | The six principles |
| `src/config/updates.ts` | Company updates feed (empty by design) |
| `src/config/contact.ts` | Contact form topics + backend endpoint |
| `src/config/seo.ts` | Shared metadata builder (canonical + OG/Twitter) |
| `src/lib/supabase/` | Supabase clients — `env.ts`/`client.ts`/`server.ts` (public key) + `admin.ts` (secret key, **server only**) |
| `src/app/api/contact/route.ts` | Contact-form backend — validates, then inserts into `public.contact_messages` |
| `supabase/migrations/` | SQL migrations (apply through the dashboard SQL editor) |

Edit content **only** in `src/config/*` — components read from there.

## Images

All imagery is remote (Unsplash) and centralized in `src/config/images.ts`.
Responsive `srcset` widths and modern formats are baked into the URLs, so the
Next.js image optimizer is **disabled** (`images.unoptimized` in
`next.config.ts`): the built-in optimizer is not available on Cloudflare
Workers without Cloudflare Images. `@opennextjs/cloudflare`'s docs describe
configuring the Cloudflare Images loader as the supported upgrade path — adopt
that in Phase 2 if self-hosted optimization is wanted, then re-enable the
optimizer and switch `ImageRef` entries over.

All image URLs are verified reachable (HTTP 200) at authoring time.

## Deploying to Cloudflare

```bash
npm run preview    # local Workers preview via wrangler
npm run deploy     # requires wrangler login + a Cloudflare account
```

`wrangler.jsonc` targets `.open-next/worker.js` with `nodejs_compat` and an
assets binding, per the `@opennextjs/cloudflare` preset. After the first
deploy, add `caelmont.in` as a custom domain for the Worker in the Cloudflare
dashboard (the zone must be on the same account).

## Supabase

The contact form is backed by Supabase. `ContactForm` POSTs
`{ name, email, topic, message }` to `src/app/api/contact/route.ts`, which
validates the payload and inserts a row into `public.contact_messages`.

### 1. Environment variables

Copy `.env.example` to `.env.local` and fill in the values from
**Project Settings → API Keys**:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL, e.g. `https://<ref>.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_…` — browser-safe |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Legacy `anon` JWT — fallback for older projects |
| `SUPABASE_SECRET_KEY` | `sb_secret_…` — **server only** |
| `SUPABASE_SERVICE_ROLE_KEY` | Legacy `service_role` JWT — fallback, **server only** |

`src/lib/supabase/env.ts` prefers the publishable/secret pair and falls back to
the legacy JWTs, so either key generation works. The secret key is read only in
`src/lib/supabase/admin.ts` from non-`NEXT_PUBLIC_` names — never prefix it with
`NEXT_PUBLIC_`, which would ship it to the browser.

### 2. Create the table

New Supabase projects start with an empty database, so apply the migration once
(Supabase dashboard → **SQL Editor** → paste → Run):

```
supabase/migrations/20260927000000_create_contact_messages.sql
```

`contact_messages` ships with Row Level Security **enabled and zero policies**,
so the publishable/anon key can neither read nor write; only the server route
handler — which holds the secret key — can insert. Rows are readable in the
dashboard's Table Editor.

Until the migration is applied, `POST /api/contact` answers
`503 { error: "not_configured" }` and the form falls back to its mailto:
handoff, so the site keeps working and no message is lost.

### 3. Deploying to Cloudflare

`npm run dev` and `npm start` read `.env.local`; `npm run preview` (wrangler)
reads `.dev.vars`. Both files are gitignored — keep them in sync.

Two `@opennextjs/cloudflare` behaviours are worth knowing:

- **`NEXT_PUBLIC_*` values are inlined at build time.** They must be present in
  `.env.local` (or an equivalent `.env.production`) when you run
  `npm run deploy` — setting them only on the Worker afterwards is too late for
  the browser bundle.
- **`.env*` values — including secrets — are copied into the Worker bundle** as
  a fallback (`next-env.mjs`), while Worker vars/secrets win at runtime. Set the
  real secret on the Worker so it can be rotated without a rebuild:

  ```bash
  wrangler secret put SUPABASE_SECRET_KEY
  ```

  To keep a secret off the build machine entirely, export it as a plain
  environment variable instead of putting it in a `.env*` file: Next.js never
  inlines non-`NEXT_PUBLIC_` variables, and OpenNext only reads secrets from
  `.env*` *files*, so nothing gets baked in.

## Phase 2 notes

- **Founder profile**: fill `src/config/founder.ts` (name, bio, portrait URL,
  social links) — the `FounderProfile` component degrades gracefully while
  anything is empty (monogram placeholder, no fake links).

## Content integrity

Nothing on the site is invented: founder name/bio/socials ship as graceful
placeholders, no venture has a fabricated URL (the "AI Business Agents" name
is explicitly labeled a working title), and the contact email is the
provisional one provided.
