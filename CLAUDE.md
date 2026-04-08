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
