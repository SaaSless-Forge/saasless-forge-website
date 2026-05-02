import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { Button } from '@/components/ui/button'

export default function SmsSignup() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const form = e.target
    const formData = new FormData(form)

    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })

    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen">
      <SectionWrapper dark id="sms-signup-hero">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-brand-amber mb-4 uppercase tracking-tight">
            SMS Updates
          </h1>
          <p className="text-brand-secondary leading-relaxed text-base sm:text-lg mb-10">
            Sign up to receive operational SMS notifications from SaaSless Forge — project status updates, deployment
            completion alerts, billing notifications, and account or system alerts. Typical frequency is 1–10 messages
            per month. Reply <strong className="text-white">STOP</strong> at any time to opt out, or
            <strong className="text-white"> HELP</strong> for assistance.
          </p>

          {submitted ? (
            <div className="border-2 border-brand-amber bg-brand-surfaceContainer p-8">
              <h2 className="text-2xl font-heading font-bold text-white mb-3">
                You're signed up.
              </h2>
              <p className="text-brand-secondary leading-relaxed">
                Thanks — we've recorded your consent and added you to the SaaSless Forge SMS list. You can opt out at
                any time by replying STOP to any message we send.
              </p>
            </div>
          ) : (
            <form
              name="sms-signup"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="sms-signup" />
              <p className="hidden">
                <label>
                  Don't fill this out: <input name="bot-field" />
                </label>
              </p>

              <div>
                <label
                  htmlFor="signup-name"
                  className="block text-xs font-heading font-bold uppercase tracking-widest text-white/80 mb-2"
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="signup-name"
                  name="name"
                  required
                  className="w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors"
                  placeholder="Jane Smith"
                />
              </div>

              <div>
                <label
                  htmlFor="signup-phone"
                  className="block text-xs font-heading font-bold uppercase tracking-widest text-white/80 mb-2"
                >
                  Mobile phone number
                </label>
                <input
                  type="tel"
                  id="signup-phone"
                  name="phone"
                  required
                  autoComplete="tel"
                  className="w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors"
                  placeholder="+1 555 555 5555"
                />
              </div>

              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-xs font-heading font-bold uppercase tracking-widest text-white/80 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  required
                  className="w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label
                  htmlFor="signup-company"
                  className="block text-xs font-heading font-bold uppercase tracking-widest text-white/80 mb-2"
                >
                  Company <span className="text-brand-outline normal-case font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  id="signup-company"
                  name="company"
                  className="w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors"
                  placeholder="Acme, Inc."
                />
              </div>

              <div className="border-2 border-brand-outlineVariant bg-brand-surfaceContainer p-5">
                <label htmlFor="signup-consent" className="flex gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    id="signup-consent"
                    name="consent"
                    value="agreed"
                    required
                    className="mt-1 h-5 w-5 flex-shrink-0 accent-brand-amber"
                  />
                  <span className="text-sm text-brand-secondary leading-relaxed">
                    I agree to receive operational SMS notifications from SaaSless Forge, including project status
                    updates, deployment notifications, billing notifications, and account or system alerts. Message
                    frequency varies (typically 1–10 messages per month). Message and data rates may apply. Reply
                    <strong className="text-white"> STOP</strong> to opt out at any time. Reply
                    <strong className="text-white"> HELP</strong> for assistance. By checking this box, I confirm I
                    have read and agree to the{' '}
                    <Link to="/terms" className="text-brand-amber hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-brand-amber hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-brand-amber hover:bg-brand-amberHover text-brand-amberDark font-semibold py-6 disabled:opacity-60"
              >
                {submitting ? 'Submitting…' : 'Sign me up'}
              </Button>

              <p className="text-xs text-brand-outline text-center">
                We will never share your mobile information with third parties or affiliates for marketing or
                promotional purposes.
              </p>
            </form>
          )}
        </div>
      </SectionWrapper>
    </div>
  )
}
