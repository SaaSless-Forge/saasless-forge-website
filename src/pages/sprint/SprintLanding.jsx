import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { EmberCanvas } from '@/components/effects/EmberCanvas'
import { MagneticButton } from '@/components/effects/MagneticButton'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { pixelPageView, pixelTrack } from '@/lib/metaPixel'
import { SprintQualifyForm } from '@/components/SprintQualifyForm'

// --- Wire-in values (replaced before the branded domain goes live) ---
const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/4gMdR1cvV0Lj2GydOq7ss00'
const CALENDAR_LINK = 'https://calendly.com/mattperry/sprint-building-intro'

const stamp = {
  hidden: { opacity: 0, y: 48, filter: 'blur(6px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.2, 0, 0, 1] },
  }),
}

// --- Shared content (identical on both pages, per Ben's brief) ---
const compare = [
  ['Cost', '~$100,000', '$1,000'],
  ['Timeline', '6 months', '5 days'],
  ['What you got', "No guarantee you'd even like it when it was done", 'Try software on like clothes'],
  ['Ownership', 'Locked into the developer/vendor', 'Yours outright, forever'],
]

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

export default function SprintLanding({ variant }) {
  useEffect(() => {
    pixelPageView()
  }, [])

  function buyNow() {
    pixelTrack('InitiateCheckout', {
      value: 1000,
      currency: 'USD',
      content_name: variant.pixelName,
    })
    window.location.href = STRIPE_PAYMENT_LINK
  }

  function scrollToApply() {
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* HERO — headline + subhead per page */}
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

          <h1 className="max-w-4xl font-heading font-bold uppercase leading-[1.02] tracking-[-0.04em] text-white text-[clamp(2.6rem,8vw,6rem)]">
            {variant.heroHeadline}
          </h1>

          <motion.p
            custom={3}
            variants={stamp}
            initial="hidden"
            animate="visible"
            className="mt-8 max-w-2xl font-heading text-lg font-medium text-brand-amber sm:text-xl"
          >
            {variant.heroSubhead}
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
                onClick={scrollToApply}
                className="ember-hover bg-brand-amber px-8 py-6 text-base font-semibold text-brand-amberDark hover:bg-brand-amberHover"
              >
                {variant.ctaLabel}
              </Button>
            </MagneticButton>
            <button
              type="button"
              onClick={buyNow}
              className="font-heading text-base font-semibold text-brand-secondary underline decoration-brand-outline underline-offset-4 hover:text-white"
            >
              Ready now? Buy your Sprint
            </button>
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

      {/* TRUST BLOCK — per page */}
      <SectionWrapper id="trust" borderTop>
        <blockquote className="mx-auto max-w-4xl space-y-5 border-l-4 border-brand-amber pl-6 font-heading text-xl font-medium leading-relaxed text-brand-secondary sm:pl-8 sm:text-2xl">
          {variant.trustBlock.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </blockquote>
      </SectionWrapper>

      {/* PROOF STRIP — real social proof (client testimonials, logos/stats, and Matt's
          photo) goes here per Ben's brief. Awaiting those assets from Matt; the old
          redundant credibility band was removed rather than left duplicating the hero
          strip below. */}

      {/* WHAT YOU GET — Page 1 shows real builds; Page 2 keeps the shared scope list */}
      <SectionWrapper id="included" borderTop>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-brand-amber">
          {variant.builds ? 'What owners have built' : 'What you get'}
        </p>
        <h2 className="max-w-3xl font-heading text-3xl font-bold uppercase leading-tight tracking-[-0.02em] text-white sm:text-4xl">
          {variant.builds ? 'Real software, built in a week.' : 'One clear scope. Delivered in a week.'}
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {variant.builds
            ? 'A few examples of what business owners have walked away with after a single five-day Sprint.'
            : 'A Sprint is a focused, fixed build. We agree on exactly what we’re making, lock it, and ship it — no scope creep, no mystery, no surprise invoice.'}
        </p>

        {variant.builds ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {variant.builds.map(([title, body]) => (
              <div key={title} className="bg-brand-surfaceHigh p-8">
                <h3 className="font-heading text-xl font-bold uppercase tracking-[-0.01em] text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        ) : (
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
        )}
      </SectionWrapper>


      {/* HOW THE WEEK MOVES — shared */}
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

      {/* PRICE ANCHOR — shared: The Old Way vs. The Sprint + guarantee */}
      <SectionWrapper id="price-anchor" borderTop>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-brand-amber">
          The math
        </p>
        <h2 className="max-w-3xl font-heading text-3xl font-bold uppercase leading-tight tracking-[-0.02em] text-white sm:text-4xl">
          The Old Way vs. The Sprint
        </h2>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[540px] border-collapse text-left">
            <thead>
              <tr className="border-b border-brand-outlineVariant">
                <th className="w-1/3 py-4 pr-4"></th>
                <th className="w-1/3 py-4 pr-4 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-outline">
                  The Old Way
                </th>
                <th className="w-1/3 bg-brand-surfaceHigh px-4 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-amber">
                  The Sprint
                </th>
              </tr>
            </thead>
            <tbody>
              {compare.map(([label, oldWay, sprintWay]) => (
                <tr key={label} className="border-b border-brand-outlineVariant/60 align-top">
                  <td className="py-5 pr-4 font-heading text-sm font-bold uppercase tracking-[-0.01em] text-white">
                    {label}
                  </td>
                  <td className="py-5 pr-4 text-sm leading-relaxed text-muted-foreground">{oldWay}</td>
                  <td className="bg-brand-surfaceHigh px-4 py-5 text-sm leading-relaxed text-brand-secondary">
                    {sprintWay}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-10 max-w-3xl font-heading text-lg font-medium leading-relaxed text-brand-secondary sm:text-xl">
          Getting custom software used to cost $100K, take six months, and you sometimes didn’t even
          know if you liked it until the end. We can now build custom software so fast, we can try it
          on like clothes.
        </p>
        <p className="mt-6 max-w-3xl border-l-4 border-brand-amber pl-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Software this fast to build is fast to change. If a Sprint isn’t landing right, we’re not
          six months and $100K deep — we adjust and try again.
        </p>
      </SectionWrapper>

      {/* QUALIFYING FORM — Ben's GHL form; the primary lead-gen path every CTA leads to */}
      <SectionWrapper id="apply" borderTop>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-brand-amber">
          Start here
        </p>
        <h2 className="max-w-3xl font-heading text-3xl font-bold uppercase leading-tight tracking-[-0.02em] text-white sm:text-4xl">
          Tell us what you’re imagining.
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Three quick questions. We’ll follow up to set a 15-minute call and see if a Sprint fits.
        </p>
        <div className="mx-auto mt-10 max-w-2xl">
          <SprintQualifyForm />
        </div>
      </SectionWrapper>

      {/* PRICE / BUY — shared */}
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

      {/* FAQ — shared */}
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

      {/* FINAL CTA — shared, with scarcity line */}
      <section className="relative overflow-hidden grain heat-glow bg-gradient-brand">
        <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <h2 className="max-w-3xl font-heading text-4xl font-bold uppercase leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
            Ready to <span className="text-molten">forge</span> something?
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Tell us what’s slowing your business down. In five days, you’ll have software that fits —
            and you’ll own it.
          </p>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-amber">
            We only take on five clients a week.
          </p>
          <div className="mt-6">
            <MagneticButton>
              <Button
                size="lg"
                onClick={scrollToApply}
                className="ember-hover bg-brand-amber px-8 py-6 text-base font-semibold text-brand-amberDark hover:bg-brand-amberHover"
              >
                {variant.ctaLabel}
              </Button>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  )
}
