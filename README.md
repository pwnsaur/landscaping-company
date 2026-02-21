# brasika site

Living technical documentation for the Brasika web app.  
Last updated: 2026-02-21

## Purpose

This project is a content-driven marketing website for a landscaping company.
It is optimized for:

- fast page loads
- static-first rendering
- simple content updates via Contentful
- predictable styling with shared UI primitives and theme tokens

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript
- styled-components 6
- Contentful delivery API
- Nodemailer + reCAPTCHA v3 for contact form delivery
- Jest + Testing Library + jest-styled-components

## Runtime and toolchain

- Node: `24.x` (also pinned via Volta to `24.0.0`)
- Package manager: `npm`

## Scripts

- `npm run dev` - local dev server on port `4000`
- `npm run build` - production build
- `npm run start` - build + start production server on port `5000`
- `npm run lint` - ESLint
- `npm run lint:fix` - ESLint with autofix
- `npm run test` - Jest test run
- `npm run watch` - Jest watch mode
- `npm run test:coverage` - Jest coverage

## App architecture

### Route map

App Router pages:

- `/` - home (parallax hero + CTA panels)
- `/services` - service listing
- `/services/[slug]` - service detail
- `/projects` - project listing
- `/projects/[slug]` - project detail
- `/about` - company overview
- `/contacts` - contact funnel + form
- `/_not-found` - custom 404

API routes:

- `/api/send-mail` - sends contact form mail (with reCAPTCHA server-side verification)
- `/api/revalidate` - secure on-demand revalidation endpoint

### Rendering strategy (current)

Static-first:

- marketing pages are statically generated
- dynamic route variants (`[slug]`) are prebuilt using `generateStaticParams`
- content pages use ISR (`revalidate = 900`) for periodic cache refresh capability

Practical implication:

- best TTFB and predictable UX
- content remains mostly static between deploys
- webhook revalidation is available when immediate refresh is needed

## Data layer

### Contentful integration

Core files:

- `src/lib/contentfulClient.ts` - singleton Contentful client with env validation
- `src/lib/contentfulData.ts` - fetch helpers for services/projects and slug lookups
- `src/utils/contentfulAsset.ts` - media/asset normalization helpers

If Contentful fetch fails, data helpers return safe fallbacks (`[]` or `null`) and log the error.

### Revalidation flow

`/api/revalidate` supports:

- full default route revalidation
- direct path revalidation (`payload.path`)
- model-aware revalidation for Contentful `service` and `project` entries

Auth:

- secret is validated from query `?secret=...` or `x-revalidate-secret` header

## Contact flow

Client:

- `src/app/contacts/page-client.tsx`
- `src/components/contactForm/*`
- uses `react-google-recaptcha-v3`

Server:

- `src/app/api/send-mail/route.ts`
- verifies reCAPTCHA token against Google
- sends mail via Nodemailer using SMTP/service credentials from env

## Styling system

Theme and tokens:

- `src/styles/palette.ts` - raw color palette
- `src/styles/system.ts` - semantic layout/motion/z-index/typography tokens
- `src/styles/theme.ts` - resolved design theme consumed by components
- `src/styles/globalStyles.ts` - global reset + base typography rules
- `src/styles/media.ts` - media helpers

UI primitives:

- `src/components/ui/layout/primitives.tsx`
- `src/components/ui/typography/primitives.tsx`
- `src/components/ui/surfaces/primitives.tsx`
- `src/components/ui/actions/primitives.tsx`
- `src/components/ui/form/primitives.tsx`
- page templates in `src/components/ui/page/*`

Rule of thumb:

- prefer primitives + tokens
- avoid ad-hoc spacing/typography values unless truly one-off
- keep page-level styled blocks thin and compositional

Current maturity:

- shared primitives now back all main marketing routes (`/`, `/services*`, `/projects*`, `/about`, `/contacts`, `/_not-found`)
- listing/detail pages are template-driven
- navigation/footer/contact form controls are mapped to shared action/form/style tokens
- remaining hardcoded values are mostly intentional visual tuning values (hero/parallax specifics), not structural glue

## Key implementation patterns

- App shell composition: `layout.tsx -> Providers -> AppShell -> Layout`
- Styled-components SSR: `src/lib/StyledComponentsRegistry.tsx`
- Defensive content rendering: null-safe fetch + `notFound()` for missing slugs
- Shared card/template abstractions for listings/details to reduce duplication

## Testing

Framework:

- Jest with `next/jest`
- Testing Library + `jest-styled-components`

Setup:

- `jest.setup.js` loads `.env.local` in quiet mode for tests
- `next/image` is mocked in tests for stable snapshots and cleaner output

Current suite:

- component/snapshot-heavy tests for layout, navigation, cards, form, image components

## Environment variables

Required for Contentful:

- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ACCESS_TOKEN`

Required for contact mail:

- `EMAIL_SERVICE`
- `EMAIL_ADDRESS`
- `EMAIL_PASSWORD`

Required for reCAPTCHA:

- `GOOGLE_RECAPTCHA_SECRET_KEY` (server-side secret)
- `NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY` (recommended client-side key)
- `GOOGLE_RECAPTCHA_SITE_KEY` (legacy fallback, still supported)

Required for on-demand ISR:

- `REVALIDATE_SECRET`

## Deployment notes

- Vercel auto-deploys from the `dev` branch.
- Build can still succeed when Contentful is temporarily unreachable because fetch helpers fail safely.
- For production quality, keep Contentful credentials valid in deployment env so pages render full content at build/ISR time.

## Current status (high level)

- App Router migration completed.
- Next.js 16 + React 19 migration completed.
- Static-first rendering with ISR is in place.
- Styling system foundations are in place and broadly adopted across pages/components.
- Tests/build are green after style-system refactors and test harness cleanup.

## Living document protocol

This file must be updated after every meaningful technical change.  
Minimum update checklist per change:

1. Add/adjust affected architecture sections.
2. Update route/rendering/data-flow notes if behavior changed.
3. Update env/deployment notes if operational requirements changed.
4. Update “Current status” so this document reflects reality.
