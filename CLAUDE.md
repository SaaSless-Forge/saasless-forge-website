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
- Brand colors: charcoal (#0F172A), violet (#7C3AED), coral (#F97316), cyan (#06B6D4)
- Font families: `font-heading` (Plus Jakarta Sans), `font-body` (Inter)
- Utility classes: `text-gradient`, `bg-gradient-brand`, `bg-gradient-subtle`, `glass`
- All sections use SectionWrapper for consistent padding and scroll animations
- Framer Motion variants for page transitions and scroll reveals

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build
