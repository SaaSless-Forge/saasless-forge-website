# PROJECT BRIEF: SaaSless Forge + Scorecard Engine

## The Goal

SaaSless Forge needs a client-facing marketing website that serves as both a brand showcase and an active lead qualification engine. The site will feature a Daniel Priestley-style scorecard survey that qualifies visitors, segments them by readiness, and delivers tailored lead magnets — all while demonstrating the quality of custom software SaaSless Forge builds. The site itself is the first product demo.

## Hard Constraints

**Budget:** Cost-conscious infrastructure. Leverage existing Supabase + Render stack. No recurring survey platform fees — build it natively.
**Timeline:** MVP website + functional scorecard first, email automation layered in after.
**Technical:** Must be built with Vite + React (standard SaaSless Forge stack). Must be production-grade and multi-session maintainable via Claude Code.
**Maintenance:** Matt (SaaSless Forge founder) maintains. High technical skill level.
**Design Standard:** "Stunning visual masterpiece" — this is the storefront for a custom software business. The bar is high.

## Existing Systems Map

### Currently In Use:
| System | Role in Workflow | Access? | Integration Method |
|--------|------------------|---------|-------------------|
| Supabase | Database & backend services | Yes | JS Client SDK |
| Render | Hosting & deployment | Yes | Git-based deploy |
| Vite + React | Frontend framework | Yes | Standard toolchain |

### Current Data Flow:
No existing marketing site pipeline. This is a greenfield build. Leads currently come through word of mouth and direct outreach.

### Pain Points:
- No web presence to send potential clients to
- No way to qualify inbound interest before a discovery call
- No automated lead capture or nurturing pipeline
- No public demonstration of SaaSless Forge's build quality

## Integration Architecture

### What We're Building:
A single-page (or multi-page) React application that combines a marketing website with an embedded scorecard survey engine, backed by Supabase for lead/response storage and prepped for email delivery integration.

### How It Connects:

```
[Visitor Browser]
    → [SaaSless Forge (Vite + React on Render)]
        → Scorecard Survey (React Hook Form + Framer Motion)
        → On Completion:
            → [Supabase] (store lead data + survey responses + score)
            → [Resend - FUTURE] (deliver lead magnet email)
            → [Results Page] (show personalized score + recommendations)
```

### Integration Details:

**Website → Supabase:**
- Connection: Supabase JS Client (`@supabase/supabase-js`)
- Auth: Anon key for public writes (RLS policies to restrict access)
- Format: JSON
- Frequency: On survey completion + optional per-question saves
- Limitations: RLS must be configured to prevent unauthorized reads of lead data

**Website → Resend (FUTURE - scaffold only):**
- Connection: REST API (server-side function or Supabase Edge Function)
- Auth: API key (stored in environment variables)
- Format: JSON payload with recipient, template ID, lead magnet URL
- Frequency: Triggered on survey completion
- Limitations: Do not send from client-side — requires server-side function to protect API key

## Tech Stack Decision

**Chosen Approach:** Full custom build with premium design foundation

### Components:

| Layer | Tool | Purpose |
|-------|------|---------|
| Framework | Vite + React | SPA framework, standard SaaSless Forge stack |
| Styling | Tailwind CSS | Utility-first CSS, Claude Code fluent |
| Components | shadcn/ui (Radix UI base) | Accessible, copy-paste components Claude Code can modify directly |
| Animations | Framer Motion | Scroll reveals, page transitions, survey step animations, score reveal |
| Forms | React Hook Form + Zod | Multi-step survey state management + validation |
| Database | Supabase (PostgreSQL) | Lead storage, survey responses, scoring data |
| Email (Future) | Resend | Transactional email for lead magnet delivery |
| Hosting | Render | Static site or web service deployment |
| Design Foundation | Tailwind UI or Aceternity UI templates | Professional starting point for layout and sections |

### Why This Stack:
- **Consistency** — same stack as all other SaaSless Forge projects, no context switching
- **Claude Code optimized** — Tailwind + shadcn/ui + Framer Motion are all deeply represented in training data. Claude Code writes these fluently.
- **Zero survey platform fees** — scorecard is a React feature, not a third-party embed
- **Full design control** — no platform constraints on how the survey looks or behaves
- **Reusable asset** — the scorecard engine pattern can be packaged for future client projects
- **Cost** — infrastructure runs on existing Supabase + Render accounts

### Cost Breakdown:

| Item | Monthly Cost | Notes |
|------|-------------|-------|
| Render hosting | $14 | Standard web service |
| Supabase | $0 (free tier) or existing plan | Shared with other projects |
| Resend (future) | $0 | Free tier: 3,000 emails/month |
| Domain | ~$12/year | If not already owned |
| Design templates (one-time) | $79-149 | Tailwind UI ($149) or Aceternity UI ($79) |
| **Monthly Total** | **~$14/mo** | Plus one-time template purchase |

## Project Structure

```
saasless-forge/
├── public/
│   └── assets/              # Images, lead magnet files, favicon
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components (copied in)
│   │   ├── layout/          # Header, Footer, Navigation
│   │   ├── sections/        # Hero, Features, Testimonials, CTA blocks
│   │   └── scorecard/       # Survey engine components
│   │       ├── ScorecardFlow.jsx      # Main survey orchestrator
│   │       ├── QuestionStep.jsx       # Individual question renderer
│   │       ├── ProgressBar.jsx        # Visual progress indicator
│   │       ├── ResultsPage.jsx        # Score display + recommendations
│   │       └── scorecardConfig.js     # Questions, scoring logic, branching rules
│   ├── lib/
│   │   ├── supabase.js      # Supabase client init
│   │   ├── scoring.js       # Score calculation logic
│   │   └── utils.js         # shadcn/ui utility functions
│   ├── pages/
│   │   ├── Home.jsx          # Landing page
│   │   ├── Scorecard.jsx     # Survey page (or modal/overlay)
│   │   ├── Results.jsx       # Personalized results page
│   │   └── About.jsx         # About SaaSless Forge (optional)
│   ├── hooks/
│   │   └── useScorecardForm.js  # Custom hook for survey state
│   ├── styles/
│   │   └── globals.css       # Tailwind base + custom styles
│   ├── App.jsx
│   └── main.jsx
├── supabase/
│   └── migrations/
│       └── 001_scorecard_tables.sql  # Lead + response tables
├── CLAUDE.md                 # Claude Code project instructions
├── tailwind.config.js
├── package.json
└── vite.config.js
```

## Supabase Schema (Initial)

```sql
-- Leads captured from scorecard
CREATE TABLE leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    name TEXT,
    company TEXT,
    score INTEGER,
    segment TEXT,           -- e.g., 'hot', 'warm', 'cold'
    lead_magnet_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Individual survey responses
CREATE TABLE survey_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lead_id UUID REFERENCES leads(id),
    question_key TEXT NOT NULL,
    answer_value TEXT NOT NULL,
    answer_score INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scorecard configurations (optional - for future multi-scorecard support)
CREATE TABLE scorecard_configs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    config JSONB NOT NULL,   -- Full question/scoring config
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public survey submissions)
CREATE POLICY "Allow public lead inserts"
    ON leads FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public response inserts"
    ON survey_responses FOR INSERT
    WITH CHECK (true);

-- Only authenticated users (Matt) can read
CREATE POLICY "Only auth users can read leads"
    ON leads FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Only auth users can read responses"
    ON survey_responses FOR SELECT
    USING (auth.role() = 'authenticated');
```

## Scorecard Architecture

The scorecard is config-driven. All questions, scoring weights, branching logic, and result text live in a single configuration file (`scorecardConfig.js`). This means:

- **Adding/changing questions** = editing a config object, not rewriting components
- **Adjusting scoring** = changing weight values
- **A/B testing** = swapping config objects
- **Future: multi-scorecard** = different configs for different audiences

### Config Structure (Example Shell):

```javascript
export const scorecardConfig = {
  title: "Is Your Business Ready for Custom Software?",
  description: "Take 2 minutes to find out where you stand.",
  questions: [
    {
      key: "manual_processes",
      question: "How many hours per week does your team spend on manual, repetitive tasks?",
      type: "single_choice",
      options: [
        { label: "Less than 2 hours", value: "low", score: 1 },
        { label: "2-5 hours", value: "medium", score: 2 },
        { label: "5-15 hours", value: "high", score: 3 },
        { label: "15+ hours", value: "critical", score: 4 },
      ],
    },
    // ... more questions
  ],
  scoring: {
    ranges: [
      { min: 0, max: 8, segment: "cold", label: "Early Stage", leadMagnet: "guide_pdf" },
      { min: 9, max: 16, segment: "warm", label: "Growing Pains", leadMagnet: "checklist_pdf" },
      { min: 17, max: 24, segment: "hot", label: "Ready to Build", leadMagnet: "case_study_pdf" },
    ],
  },
  results: {
    cold: {
      headline: "You're in the early stages",
      body: "Here's what to think about as your processes grow...",
      cta: "Download our automation readiness guide",
    },
    warm: {
      headline: "You're feeling the growing pains",
      body: "Your team is spending real time on things software could handle...",
      cta: "Get our build-vs-buy decision checklist",
    },
    hot: {
      headline: "You're ready for custom software",
      body: "The ROI case is clear. Let's talk about what to build first...",
      cta: "Book a free discovery call",
    },
  },
};
```

## Scope Boundaries

### In Scope (MVP):

- Marketing homepage with hero, services, social proof, and CTA sections
- Fully functional scorecard survey with scoring and branching logic
- Personalized results page based on score segment
- Lead capture to Supabase (email, name, company, responses, score)
- Framer Motion animations throughout (page transitions, scroll reveals, score reveal)
- Mobile-responsive design
- Resend integration scaffolded (email service initialized, edge function stubbed, not wired to send)
- Deployed on Render

### Out of Scope (Future Phases):

- Email delivery of lead magnets (Resend integration activation)
- Automated email sequences / drip campaigns
- Admin dashboard for viewing leads and analytics
- Blog / content section
- Multiple scorecard variants / A/B testing
- SEO optimization pass
- Analytics integration (Plausible, PostHog, etc.)
- Client portal / login area
- CMS for non-developer content editing

## Success Criteria

- [ ] Website loads fast, looks professional, and is fully responsive
- [ ] Visitor can complete scorecard survey end-to-end
- [ ] Survey responses and lead data are correctly saved to Supabase
- [ ] Results page shows personalized content based on score
- [ ] Animations are smooth and enhance (not hinder) the experience
- [ ] Site effectively communicates what SaaSless Forge does and who it's for
- [ ] The site itself feels like a demonstration of SaaSless Forge's capabilities

## Open Questions / Risks

1. **Branding assets** — Logo, colors, fonts for SaaSless Forge need to be established or provided before design work begins. Claude Code needs visual direction.
2. **Design template selection** — Need to purchase Tailwind UI ($149) or Aceternity UI ($79) before build starts, OR provide 2-3 reference websites for design direction.
3. **Scorecard content** — The example config above is a shell. Actual questions, scoring weights, and result copy need to be written. This is strategy work, not code work.
4. **Lead magnet content** — PDFs, guides, or other assets referenced in results need to be created or at minimum defined.
5. **Domain** — Is there an existing domain for SaaSless Forge? DNS needs to point to Render.
6. **Supabase project** — Using an existing Supabase project or creating a new one dedicated to the marketing site?
7. **Copy** — Website headline, service descriptions, about text. Who writes this? Claude Code can draft, but final copy should be reviewed.

## CLAUDE.md (For Claude Code)

Paste the following into the project's CLAUDE.md file:

```markdown
# SaaSless Forge

## Project Overview
Marketing website for SaaSless Forge (custom software studio) with an integrated lead qualification scorecard survey. Built with Vite + React, Tailwind CSS, shadcn/ui, Framer Motion. Backend is Supabase for lead storage.

## Tech Stack
- **Framework:** Vite + React
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui (components live in src/components/ui/)
- **Animations:** Framer Motion (use for page transitions, scroll reveals, survey step transitions, score reveal)
- **Forms:** React Hook Form + Zod for the scorecard survey
- **Database:** Supabase (PostgreSQL) — client initialized in src/lib/supabase.js
- **Email (Future):** Resend — scaffolded but NOT active. Do not implement sending logic yet.

## Design Standards
- This site IS the product demo. Every interaction should feel polished and intentional.
- Animations should be smooth and purposeful, never gratuitous.
- Mobile-first responsive design.
- Prefer subtle, professional aesthetics. No generic SaaS look.
- Use Framer Motion's AnimatePresence for page/step transitions.
- Survey should feel like a premium interactive experience, not a boring form.

## Scorecard Architecture
- All survey questions, scoring, and result content live in src/components/scorecard/scorecardConfig.js
- Components read from config — do NOT hardcode question content in components.
- Scoring logic lives in src/lib/scoring.js
- Survey state managed via custom hook in src/hooks/useScorecardForm.js using React Hook Form

## Supabase
- Tables: leads, survey_responses, scorecard_configs
- RLS enabled: anonymous INSERT allowed, SELECT requires authentication
- Always use the Supabase JS client, never raw fetch to Supabase URLs

## File Conventions
- Components: PascalCase (e.g., HeroSection.jsx)
- Utilities/hooks: camelCase (e.g., useScorecardForm.js)
- Config files: camelCase (e.g., scorecardConfig.js)
- Keep components focused — one responsibility per file

## Do NOT
- Use localStorage or sessionStorage for lead data (use Supabase)
- Implement actual email sending (scaffold only)
- Add authentication for public-facing pages
- Use generic stock photos — use abstract/geometric visuals or leave placeholder
```

## Next Step

1. Resolve open questions (branding, design template, domain, Supabase project)
2. Write scorecard questions and scoring logic (strategy session)
3. Take this brief + CLAUDE.md to Claude Code to begin implementation
