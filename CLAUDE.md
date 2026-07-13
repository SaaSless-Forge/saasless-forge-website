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
