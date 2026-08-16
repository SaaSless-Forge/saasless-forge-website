# SaaSless Forge Frontend

## Tech Stack
- Vite + React (JSX, no TypeScript)
- Tailwind CSS v3 with tailwindcss-animate
- shadcn/ui (New York style) for base components
- Framer Motion for animations
- React Router DOM for routing
- Lucide React for icons

## Project Structure
```
src/
  components/
    layout/    — Header, Footer, PageLayout, AnimatedRoutes, ScrollToTop, LoadingScreen
    sections/  — Home page sections (Hero, Services, HowItWorks, WhyUs, SocialProof, CTA)
    ui/        — shadcn/ui components (auto-generated)
  hooks/       — Custom hooks (useScrollAnimation)
  pages/       — Route pages (Home, About, ScorecardPlaceholder)
  lib/         — Utilities (utils.js from shadcn)
```

## Conventions
- Use `@/` path alias for imports (resolves to `./src/`)
- Use `cn()` from `@/lib/utils` for conditional class merging
- Components use named exports for sections, default exports for pages
- Design system: "The Obsidian Forge" — see DESIGN.md for full spec
- Brand colors: base (#0E0E0E), surface (#131313), surfaceHigh (#2A2A2A), amber (#FFB68C), secondary (#C8C6C6), outlineVariant (#444748)
- Font families: `font-heading` (Space Grotesk), `font-body` (Inter)
- Utility classes: `text-gradient` (amber), `bg-gradient-brand` (metallic), `bg-gradient-subtle`, `glass` (tonal surface)
- No rounded corners (0px radius), no drop shadows, no glassmorphic blur — use tonal stacking
- Animation easing: cubic-bezier(0.2, 0, 0, 1) for heavy "inertia" feel
- All sections use SectionWrapper for consistent padding and scroll animations
- Framer Motion variants for page transitions and scroll reveals

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build

---

## Marketing campaigns — integrating with SaaSless Forge

A **campaign** (the $1,000 Sprint, the Growth Audit, whatever comes next) is defined in
SaaSless Forge, not here. It owns the price, the Stripe payment link, the conversion
values, the revenue split and the pixel id. This site owns the *pages* — the copy and
layout that differ per ad audience.

**The rule: never retype a campaign fact into this repo. Fetch it.**

That rule exists because of what happened without it. The Sprint price went from $250
to $1,000, was written in several files, and one was missed — so `/sprint-offer` still
advertises **$250** while `/sprint` advertises **$1,000**, both live. Separately,
`/sprint-success` hardcodes `value: 1000, content_name: 'Sprint'`, so any other campaign
redirecting there reports the wrong conversion to Meta. Both are the same bug: a fact
with more than one home.

### The API

Base: `https://saasless-forge-app-manager.onrender.com/api/campaigns/v1`
Public, CORS-enabled, no auth — everything it serves is already public (a price is on
the page, a pixel id ships in the JS). Secrets are never in it.

| Call | Purpose |
|---|---|
| `GET /:slug` | Price, conversion value + name, payment link, success URL, pixel id, status |
| `POST /:slug/clicks` | Register an arrival, get a token back |
| `POST /:slug/leads` | Send an application in as a Lead |

A non-`live` campaign returns `{ sellable: false }` with **no price** — render a
"not currently open" state rather than falling back to a hardcoded number.

### The flow a campaign page implements

1. **On mount** — `GET /:slug`. Render price and copy from the response. Initialise the
   Meta pixel with `tracking.meta.pixel_id` from the response, not a constant.
2. **On mount** — `POST /:slug/clicks` with everything the URL carried: `utm_*`,
   `fbclid`, `gclid`, `ttclid`, `msclkid`, plus `referrer` and `landing_path`. Keep the
   returned `token`.
3. **On buy** — send the user to `payment_link_url` with
   `?client_reference_id=<token>`. That token is what ties the purchase back to the ad
   that produced it, for **any** channel — Meta, Google, an email blast, a QR code.
4. **On success** — read `session_id` from the query string. **Only fire `Purchase` if
   it is present**, and use `conversion.value` / `conversion.content_name` from the API.
   Pass `session_id` as the fbq `eventID`.
5. **On an application form** — `POST /:slug/leads` **in addition to** whatever the form
   already posts (Netlify, etc.). This is additive by design and always returns 200, so
   it can never cost a submission. Include the `click_token` if you have one.

### Things not to do

- **Don't hardcode a price, a pixel id, a conversion value or a payment link.** All four
  are served.
- **Don't fire `Purchase` on page load.** `/sprint-success` is a plain public route —
  a bookmark or a shared link counts as a sale. Six phantom $1,000 purchases were
  reported against zero real ones before this was gated.
- **Don't drop `?session_id=` from the Stripe redirect.** It's what proves a real
  checkout, and the App Manager reports a `payment_link_redirect_drift` finding if it
  goes missing.
- **Don't replace an existing form submission with the Forge one.** Run both.

The App Manager **also** reports purchases server-side from confirmed Stripe payments,
using the checkout session id as the event id. Meta deduplicates the pair, so the
browser pixel and the server report are complementary — that's Meta's recommended
setup, not redundancy.

### If something doesn't work, file it — don't work around it

If the API is missing something you need, returns the wrong shape, or the integration
can't meet a requirement, **add a roadmap idea to the App Manager** rather than
hardcoding a workaround here. A workaround in this repo recreates the exact
multiple-homes problem above.

Use the `saasless-forge` MCP:

```
ideas_create(
  client_id: 2,            # Internal Apps
  app_id: 1,               # saasless-forge-app-manager
  title: "…",
  description: "What you needed, what the API does instead, and what it blocked."
)
```

Call `ideas_search_similar` first so you extend an existing card instead of adding a
duplicate. Then say so in the PR, so the gap is visible rather than silently absorbed.

<!-- SAASLESS-FORGE:GOVERNANCE v3 START -->
## SaaSless Forge — Architecture Governance (managed; do not edit inside the markers)

This repo is a SaaSless Forge app (App Manager app_id: **24** — "saasless-forge-website").
SaaSless Forge offers these shared services today: LLM Gateway, SMS (Twilio), Storage (Cloudflare R2), Domains (Cloudflare), Hosting (Render), Database (Render Postgres).
**Consult the SaaSless Forge platform FIRST for any architecture or infrastructure
decision.**

Connect Claude Code to the SaaSless Forge MCP server, then use its tools before deciding:
- `infra_service_guide` — how to set up each supported service.
- `apps_services_status` (app_id: 24) — what this app already has wired.
- `service_providers_list` — the providers SaaSless Forge supports.

Rules:
1. Prefer a SaaSless Forge–supported service (listed above) for every capability.
   Only choose an external/unsupported service when SaaSless Forge offers **no**
   option for what you need.
2. If you must go external, record it as an exception:
   `architecture_record_component` (app_id: 24, forge_offered: false,
   rationale: "why no SaaSless Forge option fit").
3. Log **every** service/architecture decision for this app via
   `architecture_record_component` so the App Manager holds an authoritative record
   of what this app uses.

Connect the CLI (ask a SaaSless Forge admin for a Personal Access Token, then run):
```
claude mcp add saasless-forge --transport http \
  --header "Authorization: Bearer <token>" http://localhost:3001/mcp
```

This block is maintained automatically by SaaSless Forge. Edit around it, never inside
the markers.
<!-- SAASLESS-FORGE:GOVERNANCE END -->
