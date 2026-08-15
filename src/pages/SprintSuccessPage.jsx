import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { EmberCanvas } from '@/components/effects/EmberCanvas'
import { MagneticButton } from '@/components/effects/MagneticButton'
import { pixelPageView, pixelTrack } from '@/lib/metaPixel'

// Replaced before the branded domain goes live.
const CALENDAR_LINK = 'https://calendly.com/mattperry/sprint-building-intro'

const stamp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.2, 0, 0, 1] },
  }),
}

const steps = [
  ['01', 'We reach out within one business day', 'You’ll get an email from our team to schedule your Monday kickoff call.'],
  ['02', 'Monday — discovery', 'We learn how your business actually works and where a Sprint will make the biggest difference.'],
  ['03', 'Mon–Fri — we build, you own it', 'By Friday you’ll have working software that fits — and it’s yours, outright.'],
]

// One Purchase per Stripe checkout session, ever.
const REPORTED_PURCHASES_KEY = 'sprint-purchases-reported'

function alreadyReported(sessionId) {
  try {
    const seen = JSON.parse(window.localStorage.getItem(REPORTED_PURCHASES_KEY) || '[]')
    return seen.includes(sessionId)
  } catch {
    return false
  }
}

function markReported(sessionId) {
  try {
    const seen = JSON.parse(window.localStorage.getItem(REPORTED_PURCHASES_KEY) || '[]')
    window.localStorage.setItem(REPORTED_PURCHASES_KEY, JSON.stringify([...seen, sessionId].slice(-20)))
  } catch {
    /* private mode — reporting twice beats not reporting at all */
  }
}

export default function SprintSuccessPage() {
  useEffect(() => {
    pixelPageView()

    // The comment this replaces said "this page loads only after a completed Stripe
    // payment." That was never true — /sprint-success is a plain public route, so a
    // bookmark, a shared link, or our own QA fires a $1,000 Purchase at Meta. It had
    // already happened 6 times against 0 real sales, which trains ad delivery on
    // revenue that does not exist and reports a ROAS we never earned.
    //
    // Stripe appends ?session_id={CHECKOUT_SESSION_ID} to the payment link's
    // confirmation URL, and a session id cannot be guessed — so requiring one is
    // what makes a reported Purchase correspond to a real checkout.
    //
    // NOTE: this is still client-side evidence. It stops accidents, not a determined
    // forger. Server-verified conversions (retrieve the session, assert
    // payment_status === 'paid', report via the Conversions API) is the real fix and
    // belongs with the App Manager integration.
    const sessionId = new URLSearchParams(window.location.search).get('session_id')
    if (!sessionId || alreadyReported(sessionId)) return

    markReported(sessionId)
    pixelTrack(
      'Purchase',
      { value: 1000, currency: 'USD', content_name: 'SaaSless Forge Sprint' },
      // eventID lets Meta de-duplicate against a future server-side Conversions API
      // event for the same checkout.
      { eventID: sessionId },
    )
  }, [])

  return (
    <section className="relative flex min-h-[88vh] flex-col overflow-hidden grain heat-glow bg-gradient-brand">
      <EmberCanvas className="z-[1]" />
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <motion.p
          custom={0}
          variants={stamp}
          initial="hidden"
          animate="visible"
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-brand-amber"
        >
          Payment received
        </motion.p>

        <h1 className="font-heading text-4xl font-bold uppercase leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl">
          You’re in. Your Sprint is <span className="text-molten">booked.</span>
        </h1>

        <motion.p
          custom={2}
          variants={stamp}
          initial="hidden"
          animate="visible"
          className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          Thank you — we’ve got your Sprint. Here’s exactly what happens next, so there are no
          surprises.
        </motion.p>

        <motion.div
          custom={3}
          variants={stamp}
          initial="hidden"
          animate="visible"
          className="mt-12 space-y-px"
        >
          {steps.map(([num, title, body]) => (
            <div key={num} className="flex items-start gap-6 bg-brand-surfaceHigh p-6 sm:p-8">
              <span className="font-heading text-2xl font-bold tracking-[-0.02em] text-brand-amber">
                {num}
              </span>
              <div>
                <h3 className="font-heading text-lg font-bold uppercase tracking-[-0.01em] text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          custom={4}
          variants={stamp}
          initial="hidden"
          animate="visible"
          className="mt-12 flex flex-col items-start gap-5"
        >
          <MagneticButton>
            <Button
              size="lg"
              asChild
              className="ember-hover bg-brand-amber px-8 py-6 text-base font-semibold text-brand-amberDark hover:bg-brand-amberHover"
            >
              <a href={CALENDAR_LINK}>Book your kickoff call now</a>
            </Button>
          </MagneticButton>
          <p className="text-sm text-muted-foreground">
            Prefer email? Reach us any time at{' '}
            <a href="mailto:hello@saaslessforge.com" className="text-brand-amber underline underline-offset-4">
              hello@saaslessforge.com
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  )
}
