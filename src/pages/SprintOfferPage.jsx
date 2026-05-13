import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { Button } from '@/components/ui/button'
import { useSprintSignup } from '@/hooks/useSprintSignup'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.2, 0, 0, 1],
    },
  }),
}

export default function SprintOfferPage() {
  const { openSprintSignup } = useSprintSignup()

  return (
    <div className="min-h-screen">
      {/* HERO */}
      {/* COPY: replace from scope-contract.md §hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(45deg, #353534 0%, #0E0E0E 100%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto text-left">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-xs font-heading font-bold uppercase tracking-widest text-brand-amber mb-6"
          >
            [FILLER: Eyebrow — Limited Spots / Announcement]
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl lg:text-[3.5rem] xl:text-7xl font-heading font-extrabold text-white leading-tight tracking-[-0.04em] uppercase"
          >
            [FILLER: HERO HEADLINE — replace post-Cowork]
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-4 text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-brand-amber"
          >
            [FILLER: Subhead — one-line value prop]
          </motion.p>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed"
          >
            [FILLER: Opening paragraph — lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Replace with the contract summary.]
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-col sm:flex-row items-start gap-4"
          >
            <Button
              size="lg"
              onClick={openSprintSignup}
              className="bg-brand-amber hover:bg-brand-amberHover text-brand-amberDark font-semibold text-base px-8 py-6"
            >
              Reserve my spot
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                document
                  .getElementById('how-it-works')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="border-2 border-brand-secondary text-brand-secondary hover:bg-brand-surfaceHigh font-semibold text-base px-8 py-6"
            >
              How it works
            </Button>
          </motion.div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      {/* COPY: replace from scope-contract.md §whats-included */}
      <SectionWrapper id="whats-included" dark>
        <div className="max-w-4xl">
          <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-amber mb-4">
            [FILLER: section eyebrow]
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-extrabold text-white uppercase tracking-tight mb-8">
            [FILLER: What's included]
          </h2>
          <ul className="space-y-4 text-base sm:text-lg text-brand-secondary">
            <li className="border-l-4 border-brand-amber pl-5 py-1">
              [FILLER: Included bullet 1 — replace from contract]
            </li>
            <li className="border-l-4 border-brand-amber pl-5 py-1">
              [FILLER: Included bullet 2]
            </li>
            <li className="border-l-4 border-brand-amber pl-5 py-1">
              [FILLER: Included bullet 3]
            </li>
            <li className="border-l-4 border-brand-amber pl-5 py-1">
              [FILLER: Included bullet 4]
            </li>
            <li className="border-l-4 border-brand-amber pl-5 py-1">
              [FILLER: Included bullet 5]
            </li>
            <li className="border-l-4 border-brand-amber pl-5 py-1">
              [FILLER: Included bullet 6]
            </li>
          </ul>
        </div>
      </SectionWrapper>

      {/* BUILD ENVELOPE */}
      {/* COPY: replace from scope-contract.md §build-envelope */}
      <SectionWrapper id="build-envelope" dark={false} borderTop>
        <div className="max-w-4xl">
          <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-amber mb-4">
            [FILLER: section eyebrow]
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-extrabold text-white uppercase tracking-tight mb-4">
            [FILLER: Build envelope]
          </h2>
          <p className="text-brand-secondary leading-relaxed mb-10 max-w-2xl">
            [FILLER: Short framing — the caps are a feature, not a limitation.]
          </p>

          <div className="border-2 border-brand-outlineVariant">
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x-2 divide-brand-outlineVariant">
              <div className="p-6">
                <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-amber mb-2">
                  [FILLER: cap label]
                </p>
                <p className="text-3xl font-heading font-extrabold text-white">
                  [FILLER]
                </p>
              </div>
              <div className="p-6">
                <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-amber mb-2">
                  [FILLER: cap label]
                </p>
                <p className="text-3xl font-heading font-extrabold text-white">
                  [FILLER]
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x-2 divide-brand-outlineVariant border-t-2 border-brand-outlineVariant">
              <div className="p-6">
                <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-amber mb-2">
                  [FILLER: cap label]
                </p>
                <p className="text-3xl font-heading font-extrabold text-white">
                  [FILLER]
                </p>
              </div>
              <div className="p-6">
                <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-amber mb-2">
                  [FILLER: cap label]
                </p>
                <p className="text-3xl font-heading font-extrabold text-white">
                  [FILLER]
                </p>
              </div>
            </div>
            <div className="border-t-2 border-brand-outlineVariant p-6">
              <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-amber mb-2">
                [FILLER: cap label]
              </p>
              <p className="text-3xl font-heading font-extrabold text-white">
                [FILLER]
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* HOW A WEEK WORKS */}
      {/* COPY: replace from scope-contract.md §how-a-week-works */}
      <SectionWrapper id="how-it-works" dark>
        <div className="max-w-5xl">
          <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-amber mb-4">
            [FILLER: section eyebrow]
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-extrabold text-white uppercase tracking-tight mb-10">
            [FILLER: How a week works]
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-px bg-brand-outlineVariant border-2 border-brand-outlineVariant">
            {['MON', 'TUE', 'WED', 'THU', 'FRI'].map((day, i) => (
              <div key={day} className="bg-brand-base p-6">
                <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-amber mb-3">
                  {day}
                </p>
                <p className="text-lg font-heading font-bold text-white mb-2">
                  [FILLER: Day {i + 1} title]
                </p>
                <p className="text-sm text-brand-secondary leading-relaxed">
                  [FILLER: Short description of what happens this day —
                  replace from contract.]
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* PRICING */}
      {/* COPY: replace from scope-contract.md §pricing */}
      <SectionWrapper id="pricing" dark={false} borderTop>
        <div className="max-w-4xl">
          <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-amber mb-4">
            [FILLER: section eyebrow]
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-extrabold text-white uppercase tracking-tight mb-10">
            [FILLER: Pricing]
          </h2>

          <div className="border-2 border-brand-outlineVariant divide-y-2 divide-brand-outlineVariant">
            <div className="flex items-baseline justify-between p-6">
              <div>
                <p className="text-lg font-heading font-bold text-white">
                  [FILLER: Sprint line item]
                </p>
                <p className="text-sm text-brand-secondary mt-1">
                  [FILLER: short description]
                </p>
              </div>
              <p className="text-3xl font-heading font-extrabold text-brand-amber whitespace-nowrap ml-6">
                $XXX
              </p>
            </div>
            <div className="flex items-baseline justify-between p-6">
              <div>
                <p className="text-lg font-heading font-bold text-white">
                  [FILLER: Hosting line item]
                </p>
                <p className="text-sm text-brand-secondary mt-1">
                  [FILLER: short description]
                </p>
              </div>
              <p className="text-3xl font-heading font-extrabold text-brand-amber whitespace-nowrap ml-6">
                $XX/mo
              </p>
            </div>
            <div className="flex items-baseline justify-between p-6">
              <div>
                <p className="text-lg font-heading font-bold text-white">
                  [FILLER: Transfer line item]
                </p>
                <p className="text-sm text-brand-secondary mt-1">
                  [FILLER: short description — billed separately]
                </p>
              </div>
              <p className="text-3xl font-heading font-extrabold text-brand-amber whitespace-nowrap ml-6">
                $XXX
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* OUT OF SCOPE */}
      {/* COPY: replace from scope-contract.md §out-of-scope */}
      <SectionWrapper id="out-of-scope" dark>
        <div className="max-w-4xl">
          <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-amber mb-4">
            [FILLER: section eyebrow]
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-extrabold text-white uppercase tracking-tight mb-4">
            [FILLER: Not in this sprint]
          </h2>
          <p className="text-brand-secondary leading-relaxed mb-10 max-w-2xl">
            [FILLER: Why we're explicit about scope — expectation setting
            is the whole point.]
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-base text-brand-secondary">
            <li className="flex gap-3">
              <span className="text-brand-amber">—</span>
              <span>[FILLER: Out-of-scope item 1]</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-amber">—</span>
              <span>[FILLER: Out-of-scope item 2]</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-amber">—</span>
              <span>[FILLER: Out-of-scope item 3]</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-amber">—</span>
              <span>[FILLER: Out-of-scope item 4]</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-amber">—</span>
              <span>[FILLER: Out-of-scope item 5]</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-amber">—</span>
              <span>[FILLER: Out-of-scope item 6]</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-amber">—</span>
              <span>[FILLER: Out-of-scope item 7]</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-amber">—</span>
              <span>[FILLER: Out-of-scope item 8]</span>
            </li>
          </ul>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      {/* COPY: replace from scope-contract.md §faq */}
      <SectionWrapper id="faq" dark={false} borderTop>
        <div className="max-w-3xl">
          <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-amber mb-4">
            [FILLER: section eyebrow]
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-extrabold text-white uppercase tracking-tight mb-10">
            [FILLER: FAQ]
          </h2>

          <div className="space-y-8">
            <div>
              <p className="text-xl font-heading font-bold text-white mb-2">
                [FILLER: Q1 — Can I pivot mid-week?]
              </p>
              <p className="text-brand-secondary leading-relaxed">
                [FILLER: A1 — lorem ipsum dolor sit amet, replace from
                contract.]
              </p>
            </div>
            <div>
              <p className="text-xl font-heading font-bold text-white mb-2">
                [FILLER: Q2 — What about AI agents?]
              </p>
              <p className="text-brand-secondary leading-relaxed">
                [FILLER: A2 — replace from contract.]
              </p>
            </div>
            <div>
              <p className="text-xl font-heading font-bold text-white mb-2">
                [FILLER: Q3 — Who owns the code?]
              </p>
              <p className="text-brand-secondary leading-relaxed">
                [FILLER: A3 — replace from contract.]
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* BOTTOM CTA */}
      <SectionWrapper id="cta" dark>
        <div className="max-w-3xl text-left">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white uppercase tracking-tight mb-6">
            [FILLER: Closing CTA headline]
          </h2>
          <p className="text-lg text-brand-secondary leading-relaxed mb-10 max-w-2xl">
            [FILLER: One-line closer — replace from contract.]
          </p>
          <Button
            size="lg"
            onClick={openSprintSignup}
            className="bg-brand-amber hover:bg-brand-amberHover text-brand-amberDark font-semibold text-base px-8 py-6"
          >
            Reserve my spot
          </Button>
        </div>
      </SectionWrapper>
    </div>
  )
}
