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
- uses `react-google-recaptcha-v3` with `NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY`
- form now has shared client/server validation, inline field errors, submission timeout handling, and anti-spam honeypot + fill-time checks

Server:

- `src/app/api/send-mail/route.ts`
- verifies reCAPTCHA token against Google (action + score threshold)
- validates/sanitizes payload server-side before mail send
- sends mail via Nodemailer with safe sender/reply-to handling

## Styling system

Theme and tokens:

- `src/styles/palette.ts` - raw color palette
- `src/styles/system.ts` - token source of truth (layout, motion, z-index, typography, component-level tokens)
- `src/styles/theme.ts` - resolved theme (legacy flat colors + semantic groups)
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
- home hero/panels spacing and typography values are tokenized (`components.home.*`) instead of local magic numbers
- parallax is guarded for reduced-motion/mobile and only updates while hero is near viewport
- app shell content now uses a full-height flex layout (`Content` is `flex: 1`) so page backgrounds extend cleanly down to the footer
- footer no longer uses `margin-top: auto`, preventing unintended empty vertical gaps above footer in flex layouts
- home image layer now renders at page scope (not only hero scope) so visual continuity reaches the footer transition
- home content layering keeps nav hit-area above hero/panel stacks to avoid click blocking on the sticky header
- contacts page spacing/sizing is tokenized (`components.contacts.*`) with improved tablet/mobile stacking behavior
- contact form logic and UX are hardened: accessible labels, inline validation errors, submit-state feedback, and resilient server responses
- contact form now uses shared typed contracts (`ContactFormPayload`, `ContactFormApiResponse`) and shared validation helpers (`src/utils/contactFormValidation.ts`)
- semantic theme layer (`theme.semantic`) is now used by core primitives for text/surface/border/interactive consistency
- shared primitives (`typography`, `actions`, `form`, `surfaces`) now consume tokenized sizes/line-heights/tracking instead of local values
- nav/footer/detail/listing building blocks now map to `components.nav/footer/detail/listing/*` token families
- server-rendered primitives keep using imported theme tokens (not runtime `theme` props) to avoid App Router server/client theme-context gaps
- root layout includes `data-scroll-behavior="smooth"` to match Next.js scroll restoration expectations
- about hero image uses `placeholder='empty'` to avoid persistent blur artifacts in local dev
- navigation logo now uses a static `<img>` with fixed intrinsic dimensions to avoid recurrent Next image sizing warnings
- list cards use intent-based route prefetch (`prefetch={false}` on `Link`) to avoid eager viewport prefetch churn on long grids
- image optimizer cache floor is increased to 31 days (`images.minimumCacheTTL`) for stronger repeat-visit performance
- home hero source image was downscaled/compressed to reduce transfer cost while preserving visual quality
- home lower panels now use positive section offsets and dedicated gap tokens, avoiding panel collisions with surrounding sections
- about page semantic spacing is tokenized (`components.about.heroToSectionsTop/betweenSectionsTop/sectionGap`) for clearer section hierarchy and cleaner visual rhythm
- about hero image now uses cover-fit (no side blank bands), and the adjacent intro panel stretches to the same visual height as the media frame
- contacts info/form columns now use stretch-height panel layout for cleaner side-by-side balance on desktop
- home hero action buttons now use inverse styling on dark media surfaces, and panel titles inherit local surface color to preserve contrast
- semantic spacing rhythm is now explicit in design tokens (`layout.rhythm.tight/related/section`) and shared primitives/components use it for lighter section-to-section breathing room without over-expanding intra-section density
- listing cards now use a stable flex-content structure (title clamp + excerpt flex + action pinned to bottom), so action labels keep consistent vertical placement across varying content lengths
- grid spacing now differentiates horizontal/vertical rhythm (`layout.grid.columnGap/rowGap`) with more generous row spacing for a lighter, cleaner flow
- listing/detail templates now use stack-based section flow (`SectionStack`) driven by semantic rhythm tokens instead of ad-hoc per-block top margins
- listing pages now apply stronger semantic separation between card grids and downstream CTA blocks (`components.listing.sectionGap/cardsToCtaTop`)
- home/about/contacts page spacing is further tokenized (headings, actions, panel paddings, intra-section offsets), reducing magic values and making future spacing adjustments centralized

## Key implementation patterns

- App shell composition: `layout.tsx -> Providers -> AppShell -> Layout`
- Styled-components SSR: `src/lib/StyledComponentsRegistry.tsx`
- Defensive content rendering: null-safe fetch + `notFound()` for missing slugs
- Shared card/template abstractions for listings/details to reduce duplication
- Home parallax loop is `requestAnimationFrame` + `IntersectionObserver` throttled to reduce unnecessary scroll work
- Home hero keeps content higher in viewport and uses safe-area-aware bottom offsets for better device fit
- Home scroll hint is viewport-anchored and auto-fades once user starts scrolling
- Contact form action row now reflows responsively and form field row collapses earlier on tablet widths
- Action links/buttons share one tokenized sizing model (`components.action.*`) with consistent hover/focus behavior
- Form fields and textarea share one tokenized density/focus model (`components.form.*`) for consistent input rhythm
- external media host is preconnected in root layout (`images.ctfassets.net`) to reduce first-image handshake latency

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
- optional SMTP-based alternative:
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`/`SMTP_TLS`, `SMTP_USER`/`SMTP_USERNAME`, `SMTP_PASSWORD`/`SMTP_PASS`
- optional routing/sender overrides:
- `EMAIL_TO`, `EMAIL_FROM`, `EMAIL_APP_PASSWORD`

Required for reCAPTCHA:

- `GOOGLE_RECAPTCHA_SECRET_KEY` (server-side secret)
- `NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY` (client-side key)
- `GOOGLE_RECAPTCHA_SITE_KEY` (legacy client fallback still supported)

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
- Landing page hero/panels received a stability pass (softer parallax, simpler vertical flow, mobile-safe defaults).
- Landing page shell/spacing now avoids blank zones before footer and keeps hero callouts visible on small displays.
- Contacts page card/form sizing and responsive layout were tightened for more consistent structure across breakpoints.
- Contact form validation/submission pipeline was hardened (shared validation, anti-spam checks, safer mail handling, clearer user feedback).
- Design-system consistency pass completed across shared primitives and major shared components (nav/footer/cards/templates/forms).
- Tests/build are green after style-system refactors and test harness cleanup.

## Living document protocol

This file must be updated after every meaningful technical change.  
Minimum update checklist per change:

1. Add/adjust affected architecture sections.
2. Update route/rendering/data-flow notes if behavior changed.
3. Update env/deployment notes if operational requirements changed.
4. Update “Current status” so this document reflects reality.
