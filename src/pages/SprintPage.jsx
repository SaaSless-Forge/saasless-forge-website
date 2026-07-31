import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { EmberCanvas } from '@/components/effects/EmberCanvas'
import { MagneticButton } from '@/components/effects/MagneticButton'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { pixelPageView, pixelTrack } from '@/lib/metaPixel'

// --- Wire-in values (replaced before the branded domain goes live) ---
const STRIPE_PAYMENT_LINK = 'STRIPE_PAYMENT_LINK'
const CALENDAR_LINK = 'CALENDAR_LINK'

function buyNow() {
  pixelTrack('InitiateCheckout', {
    value: 1000,
    currency: 'USD',
    content_name: 'SaaSless Forge Sprint',
  })
  window.location.href = STRIPE_PAYMENT_LINK
}

const stamp = {
  hidden: { opacity: 0, y: 48, filter: 'blur(6px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.2, 0, 0, 1] },
  }),
}

const included = [
  ['01', '3 Data Models', 'The core “things” your software tracks — jobs, clients, invoices.'],
  ['02', '2 User Roles', 'Different views for different people — say, admin and crew.'],
  ['03', '5 Screens', 'The pages your team actually works in, day to day.'],
  ['04', '1 Integration', 'Connect one outside tool: payments, texting, email, or calendar.'],
  ['05', '2 Data Imports', "Bring your spreadsheets in so day one isn't a blank slate."],
  ['06', 'You Own It', 'Every line of code is yours — outright and forever.'],
]

const week = [
  ['Mon', 'Discovery', 'We learn how your business actually works — not your tech stack.'],
  ['Tue', 'Design', 'You see exactly what we’re building before a line of code is written.'],
  ['Wed', 'Spec Lock', 'Scope locks so the week stays on time and on budget.'],
  ['Thu', 'Build', 'Your software comes together — you watch it happen.'],
  ['Fri', 'Handover', 'Delivered and yours. Every line of code.'],
]

const faqs = [
  [
    'What if my project is bigger than one Sprint?',
    'Plenty are. A Sprint is the fastest way to get real, working software in your hands and prove the fit. If there’s more to build, we scope the next piece from there — you’re never locked in.',
  ],
  [
    'Do I really own it?',
    'Yes. Every line of code is yours, outright and forever. No per-seat fees, no subscription, no vendor holding your data hostage.',
  ],
  [
    'Can I change direction mid-week?',
    'You can pivot — we swap something out for something new of similar size. The one rule that keeps a Sprint a Sprint: we don’t pile on scope.',
  ],
  [
    'What can the integration connect to?',
    'Common ones: taking payments, sending texts, sending email, or syncing a calendar. Tell us which matters most and we’ll wire it in.',
  ],
  [
    'What happens after I buy?',
    'You land on a confirmation page, and we reach out within one business day to book your Monday kickoff.',
  ],
]

const stats = [
  ['$1,000', 'One flat price'],
  ['5 days', 'Monday to Friday'],
  ['100%', 'You own the code'],
  ['$0', 'Subscriptions'],
]

function Check() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
      <path d="M4 11l4.5 4.5L18 6" stroke="#FFB68C" strokeWidth="2.5" />
    </svg>
  )
}

export default function SprintPage() {
  useEffect(() => {
    pixelPageView()
  }, [])

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[92vh] flex-col overflow-hidden grain heat-glow bg-gradient-brand">
        <EmberCanvas className="z-[1]" />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pt-28 pb-16 sm:px-6 lg:px-8">
          <motion.p
            custom={0}
            variants={stamp}
            initial="hidden"
            animate="visible"
            className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-brand-amber"
          >
            The Five-Day Software Sprint
          </motion.p>

          <h1 className="flex flex-col font-heading font-bold uppercase leading-[1.02] tracking-[-0.04em] text-white text-[clamp(2.9rem,10vw,7rem)]">
            <motion.span custom={1} variants={stamp} initial="hidden" animate="visible">
              Custom Software,
            </motion.span>
            <motion.span custom={2} variants={stamp} initial="hidden" animate="visible">
              <span className="text-molten">Forged</span> in Five Days.
            </motion.span>
          </h1>

          <motion.p
            custom={3}
            variants={stamp}
            initial="hidden"
            animate="visible"
            className="mt-8 max-w-2xl font-heading text-lg font-medium text-brand-amber sm:text-xl"
          >
            One focused week. One flat price. Software shaped to how you actually run your
            business — and you own every line of it.
          </motion.p>

          <motion.p
            custom={4}
            variants={stamp}
            initial="hidden"
            animate="visible"
            className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            No subscriptions. No per-seat fees. No six-month timelines. Buy your Sprint, and by
            Friday you’ve got working software that’s yours outright.
          </motion.p>

          <motion.div
            custom={5}
            variants={stamp}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <MagneticButton>
              <Button
                size="lg"
                onClick={buyNow}
                className="ember-hover bg-brand-amber px-8 py-6 text-base font-semibold text-brand-amberDark hover:bg-brand-amberHover"
              >
                Start My Sprint — $1,000
              </Button>
            </MagneticButton>
            <a
              href={CALENDAR_LINK}
              className="font-heading text-base font-semibold text-brand-secondary underline decoration-brand-outline underline-offset-4 hover:text-white"
            >
              Not ready? Book a 15-min call
            </a>
          </motion.div>
        </div>

        <motion.div
          custom={6}
          variants={stamp}
          initial="hidden"
          animate="visible"
          className="relative z-10 border-t border-white/10"
        >
          <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-5 px-4 py-7 sm:px-6 md:grid-cols-4 lg:px-8">
            {stats.map(([stat, label]) => (
              <div key={label}>
                <span className="block font-heading text-2xl font-bold tracking-[-0.02em] text-white sm:text-3xl">
                  {stat}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-outline">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* WHAT'S INCLUDED */}
      <SectionWrapper id="included" borderTop>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-brand-amber">
          What you get
        </p>
        <h2 className="max-w-3xl font-heading text-3xl font-bold uppercase leading-tight tracking-[-0.02em] text-white sm:text-4xl">
          One clear scope. Delivered in a week.
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          A Sprint is a focused, fixed build. We agree on exactly what we’re making, lock it, and
          ship it — no scope creep, no mystery, no surprise invoice.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {included.map(([num, title, body]) => (
            <div key={num} className="relative overflow-hidden bg-brand-surfaceHigh p-8">
              <span className="pointer-events-none absolute -right-2 -top-4 select-none font-heading text-7xl font-bold text-white/[0.04]">
                {num}
              </span>
              <h3 className="relative font-heading text-xl font-bold uppercase tracking-[-0.01em] text-white">
                {title}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* HOW THE WEEK MOVES */}
      <SectionWrapper id="how" dark={false} borderTop>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-brand-amber">
          How the week moves
        </p>
        <h2 className="max-w-3xl font-heading text-3xl font-bold uppercase leading-tight tracking-[-0.02em] text-white sm:text-4xl">
          From conversation to working software.
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {week.map(([day, title, body]) => (
            <div key={day} className="bg-brand-surfaceHigh p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-amber">
                {day}
              </span>
              <h3 className="mt-3 font-heading text-lg font-bold uppercase tracking-[-0.01em] text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* PRICE / BUY */}
      <SectionWrapper id="price" borderTop>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-brand-amber">
              The price
            </p>
            <div className="flex items-end gap-4">
              <span className="font-heading text-6xl font-bold tracking-[-0.04em] text-white sm:text-7xl">
                $1,000
              </span>
              <span className="pb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-outline">
                One flat price
              </span>
            </div>
            <ul className="mt-8 space-y-3">
              {[
                'Everything in the scope above',
                'Delivered Monday through Friday',
                'You own the code, outright and forever',
                'No subscriptions, no per-seat fees',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-brand-secondary sm:text-base">
                  <Check />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-md border-l-4 border-brand-outlineVariant pl-5 text-sm leading-relaxed text-muted-foreground">
              Optional: add a <span className="text-brand-amber">$300/month</span> support retainer
              afterward for ongoing fixes and small edits. Totally optional — start with the Sprint.
            </p>
          </div>

          <div className="bg-brand-surfaceHigh p-10">
            <h3 className="font-heading text-2xl font-bold uppercase tracking-[-0.01em] text-white">
              Buy your Sprint
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Pay once, and we’ll be in touch within one business day to book your Monday kickoff.
            </p>
            <MagneticButton>
              <Button
                size="lg"
                onClick={buyNow}
                className="ember-hover mt-8 w-full bg-brand-amber px-8 py-7 text-base font-semibold text-brand-amberDark hover:bg-brand-amberHover"
              >
                Buy My Sprint — $1,000
              </Button>
            </MagneticButton>
            <a
              href={CALENDAR_LINK}
              className="mt-5 block text-center font-heading text-sm font-semibold text-brand-secondary underline decoration-brand-outline underline-offset-4 hover:text-white"
            >
              Not ready? Book a free 15-min call
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper id="faq" dark={false} borderTop>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-brand-amber">
          Straight answers
        </p>
        <h2 className="max-w-3xl font-heading text-3xl font-bold uppercase leading-tight tracking-[-0.02em] text-white sm:text-4xl">
          The honest FAQ.
        </h2>

        <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {faqs.map(([q, a]) => (
            <div key={q}>
              <h3 className="font-heading text-lg font-bold uppercase tracking-[-0.01em] text-white">
                {q}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden grain heat-glow bg-gradient-brand">
        <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <h2 className="max-w-3xl font-heading text-4xl font-bold uppercase leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
            Ready to <span className="text-molten">forge</span> something?
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Tell us what’s slowing your business down. In five days, you’ll have software that fits —
            and you’ll own it.
          </p>
          <div className="mt-10">
            <MagneticButton>
              <Button
                size="lg"
                onClick={buyNow}
                className="ember-hover bg-brand-amber px-8 py-6 text-base font-semibold text-brand-amberDark hover:bg-brand-amberHover"
              >
                Start My Sprint — $1,000
              </Button>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  )
}
