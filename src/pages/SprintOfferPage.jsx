import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
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

const WHAT_YOU_GET = [
  {
    n: '01',
    label: 'A LIVE APP',
    body: 'Custom web application, built to your spec, deployed and accessible at a real URL by end of Day 1.',
  },
  {
    n: '02',
    label: 'FIVE WORKING MEETINGS',
    body: 'Fifteen minutes each weekday with the engineer building your app. No project managers. No middlemen.',
  },
  {
    n: '03',
    label: 'A DAILY TRAIL',
    body: 'A short Loom video and written summary every weekday — whether we met live that day or not.',
  },
  {
    n: '04',
    label: 'THE HANDOFF',
    body: 'End-of-sprint demo plus a recorded walkthrough. Yours to keep, replay, and share.',
  },
  {
    n: '05',
    label: 'YOUR CODE',
    body: 'Shared repository. Read-and-write access in perpetuity. Yours to host, modify, or walk away with.',
  },
]

const ENVELOPE_STATS = [
  {
    n: '3',
    label: 'DATA MODELS',
    body: 'A data model is a kind of record your business needs to track — customers, invoices, jobs, equipment, appointments, products, leads. Each model gets full create, read, update, and delete behavior. If you need more than 3, we will talk about which to cut or push to a future sprint.',
  },
  {
    n: '2',
    label: 'USER ROLES',
    body: 'One admin role (you and anyone on your team running the business) plus one end-user role (your customers, your field staff, or anyone using the app for its core function). Two total. No more.',
  },
  {
    n: '1',
    label: 'INTEGRATION',
    body: 'One third-party connection, chosen from: Stripe Checkout (taking payments), Twilio (sending SMS), SendGrid (sending email), Google Calendar, or an LLM like ChatGPT. One only — your call which.',
  },
  {
    n: '5',
    label: 'SCREENS',
    body: 'Every dashboard, form, or page counts as a screen. Most sprints use four: a list view, a detail view, a create/edit form, and one dashboard. If you need more than five, the sprint will not fit.',
  },
]

const WEEK = [
  {
    day: 'MON',
    title: 'SPEC & SKELETON',
    body: 'One-page specification signed by both of us. Skeleton app deployed by end of day.',
  },
  {
    day: 'TUE',
    title: 'CORE BUILD',
    body: 'Data models and primary screens come online.',
  },
  {
    day: 'WED',
    title: 'THE CUTOFF',
    body: 'Last day for spec changes. Integration lands. After today, scope is locked.',
  },
  {
    day: 'THU',
    title: 'POLISH',
    body: 'Stabilization. Edge cases. Visual cleanup.',
  },
  {
    day: 'FRI',
    title: 'HANDOFF',
    body: 'Final demo. Recorded walkthrough. The keys are yours.',
  },
]

export default function SprintOfferPage() {
  const { openSprintSignup } = useSprintSignup()
  const [activeStat, setActiveStat] = useState(null)

  return (
    <div className="min-h-screen">
      {/* HERO */}
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
            className="text-base sm:text-lg font-heading font-bold uppercase tracking-widest text-brand-amber mb-6"
          >
            THE FIVE-DAY SPRINT&nbsp;&nbsp;$250
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl lg:text-[3.5rem] xl:text-7xl font-heading font-extrabold text-white leading-tight tracking-[-0.04em] uppercase"
          >
            Five Weekdays. One Working{' '}
            <span className="text-brand-amber">App.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 text-xl sm:text-2xl font-heading font-bold text-brand-secondary leading-snug max-w-3xl"
          >
            No pitch deck. No prototype. A real custom web application, live on
            a real URL by the end of Day One.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 space-y-4 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed"
          >
            <p>
              Most studios sell you a Discovery deck. We sell you a finished
              app. Monday through Friday — five weekdays, fifteen minutes a day
              on the phone with the engineer building it — and by Friday
              afternoon, your software is in your hands.
            </p>
          </motion.div>

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
              Apply For A Sprint
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

      {/* WHAT YOU GET */}
      <SectionWrapper id="what-you-get" dark>
        <div className="max-w-5xl">
          <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-amber mb-4">
            What you get
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-extrabold text-white uppercase tracking-tight mb-12">
            Five Things. Every Sprint.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-outlineVariant border-2 border-brand-outlineVariant">
            {WHAT_YOU_GET.map((item) => (
              <div
                key={item.n}
                className="relative bg-brand-base p-8 overflow-hidden"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-4 -right-2 font-heading font-extrabold text-white/[0.03] text-[10rem] leading-none select-none pointer-events-none"
                >
                  {item.n}
                </span>
                <div className="relative">
                  <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-amber mb-3">
                    {item.n}
                  </p>
                  <p className="text-lg font-heading font-bold text-white uppercase tracking-tight mb-2">
                    {item.label}
                  </p>
                  <p className="text-base text-brand-secondary leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* BUILD ENVELOPE */}
      <SectionWrapper id="build-envelope" dark={false} borderTop>
        <div className="max-w-5xl">
          <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-amber mb-4">
            The build envelope
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-extrabold text-white uppercase tracking-tight mb-6">
            Hard Caps. On Purpose.
          </h2>
          <p className="text-base sm:text-lg text-brand-secondary leading-relaxed mb-10 max-w-3xl">
            Five working days is a hard cap, not a marketing line. Every sprint
            lives inside the same fixed envelope. This is the discipline that
            makes a five-day delivery real.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-brand-outlineVariant border-2 border-brand-outlineVariant">
            {ENVELOPE_STATS.map((stat) => (
              <button
                key={stat.label}
                type="button"
                onClick={() => setActiveStat(stat)}
                className="bg-brand-base p-8 text-left hover:bg-brand-surfaceHigh transition-colors cursor-pointer focus:outline-none focus:bg-brand-surfaceHigh"
              >
                <p className="font-heading font-extrabold text-brand-amber text-6xl sm:text-7xl leading-none mb-3">
                  {stat.n}
                </p>
                <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-secondary">
                  {stat.label}
                </p>
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground italic">
            Tap any number to see what counts.
          </p>

          <p className="mt-10 text-base sm:text-lg text-brand-secondary leading-relaxed max-w-3xl">
            If your project does not fit, we say so before you pay. We rescope
            it or send you somewhere else. We do not bend the envelope.
          </p>
        </div>

        <Dialog
          open={!!activeStat}
          onOpenChange={(v) => !v && setActiveStat(null)}
        >
          <DialogContent className="bg-brand-surfaceContainer border-2 border-brand-outlineVariant sm:max-w-lg">
            {activeStat && (
              <>
                <DialogHeader>
                  <p className="font-heading font-extrabold text-brand-amber text-7xl leading-none mb-2">
                    {activeStat.n}
                  </p>
                  <DialogTitle className="text-2xl font-heading font-bold text-white uppercase tracking-tight">
                    {activeStat.label}
                  </DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-base text-brand-secondary leading-relaxed mt-2">
                  {activeStat.body}
                </DialogDescription>
              </>
            )}
          </DialogContent>
        </Dialog>
      </SectionWrapper>

      {/* HOW THE WEEK MOVES */}
      <SectionWrapper id="how-it-works" dark>
        <div className="max-w-6xl">
          <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-amber mb-4">
            How the week moves
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-extrabold text-white uppercase tracking-tight mb-12">
            Monday Through Friday.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-brand-outlineVariant border-2 border-brand-outlineVariant">
            {WEEK.map((d, i) => (
              <div
                key={d.day}
                className="relative bg-brand-base p-6 overflow-hidden"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-2 -right-2 font-heading font-extrabold text-white/[0.03] text-[7rem] leading-none select-none pointer-events-none"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative">
                  <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-amber mb-2">
                    {d.day}
                  </p>
                  <p className="text-base font-heading font-bold text-white uppercase tracking-tight mb-3">
                    {d.title}
                  </p>
                  <p className="text-sm text-brand-secondary leading-relaxed">
                    {d.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* AFTER THE SPRINT */}
      <SectionWrapper id="after" dark={false} borderTop>
        <div className="max-w-3xl">
          <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-amber mb-4">
            After the sprint
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-extrabold text-white uppercase tracking-tight mb-8">
            You Own It. Forever.
          </h2>
          <div className="space-y-4 text-base sm:text-lg text-brand-secondary leading-relaxed">
            <p>
              The repository is yours. The code is yours. The data is yours.
              Hosting on our infrastructure runs{' '}
              <span className="text-white font-semibold">$17 per month</span>,
              billed separately from the sprint fee. If you ever want to move
              the app to your own hosting, send us a message and we will plan
              the migration together.
            </p>
            <p>
              Either way, you leave with software you own. Not software you
              rent.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper id="cta" dark>
        <div className="max-w-3xl">
          <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-amber mb-4">
            Apply
          </p>
          <h2 className="text-5xl sm:text-6xl font-heading font-extrabold text-white uppercase tracking-tight mb-6">
            Ready To Ship?
          </h2>
          <p className="text-base sm:text-lg text-brand-secondary leading-relaxed mb-10 max-w-2xl">
            We take a small number of applicants each week. Apply with a short
            intake — we review every application against the build envelope and
            reply within one business day.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Button
              size="lg"
              onClick={openSprintSignup}
              className="bg-brand-amber hover:bg-brand-amberHover text-brand-amberDark font-semibold text-base px-8 py-6"
            >
              Apply For A Sprint
            </Button>
            <a
              href="https://docs.google.com/document/d/1S_VcHsSZOKk7Lhd_DfNdk1EHUn7CEGbLhavfhDERx3o/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-base font-heading font-bold text-brand-secondary hover:text-brand-amber transition-colors px-2 py-6"
            >
              Read The Full Agreement →
            </a>
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}
