import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { Button } from '@/components/ui/button'

const INTEGRATIONS = [
  'Stripe Checkout',
  'Twilio SMS',
  'SendGrid',
  'Google Calendar',
  'OpenAI',
  'None',
]

export default function SprintIntakePage() {
  const [searchParams] = useSearchParams()
  const prefilledEmail = searchParams.get('email') || ''

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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen">
      <SectionWrapper dark id="sprint-intake-hero">
        <div className="max-w-2xl">
          {/* COPY: replace from scope-contract.md §intake-intro */}
          <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-amber mb-4">
            [FILLER: eyebrow]
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-tight">
            [FILLER: Tell us about your project]
          </h1>
          <p className="text-brand-secondary leading-relaxed text-base sm:text-lg mb-10">
            [FILLER: Intro paragraph — explains that the intake form gives us
            what we need to hit the ground running. Replace post-Cowork.]
          </p>

          {submitted ? (
            <div className="border-2 border-brand-amber bg-brand-surfaceContainer p-8">
              {/* COPY: replace from scope-contract.md §intake-success */}
              <h2 className="text-2xl font-heading font-bold text-white mb-3">
                [FILLER: Intake received — confirmation headline]
              </h2>
              <p className="text-brand-secondary leading-relaxed">
                [FILLER: Confirmation body — we'll review and reach out.
                Replace post-Cowork.]
              </p>
            </div>
          ) : (
            <form
              name="sprint-intake"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="sprint-intake" />
              <p className="hidden">
                <label>
                  Don't fill this out: <input name="bot-field" />
                </label>
              </p>

              <div>
                <label
                  htmlFor="intake-name"
                  className="block text-xs font-heading font-bold uppercase tracking-widest text-white/80 mb-2"
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="intake-name"
                  name="name"
                  required
                  className="w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors"
                  placeholder="Jane Smith"
                />
              </div>

              <div>
                <label
                  htmlFor="intake-email"
                  className="block text-xs font-heading font-bold uppercase tracking-widest text-white/80 mb-2"
                >
                  Work email
                </label>
                <input
                  type="email"
                  id="intake-email"
                  name="email"
                  required
                  defaultValue={prefilledEmail}
                  className="w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label
                  htmlFor="intake-project"
                  className="block text-xs font-heading font-bold uppercase tracking-widest text-white/80 mb-2"
                >
                  Project name or one-line description
                </label>
                <input
                  type="text"
                  id="intake-project"
                  name="project"
                  required
                  className="w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors"
                  placeholder="e.g. Inventory tracker for our 3-shop bakery"
                />
              </div>

              <div className="border-2 border-brand-outlineVariant p-5 space-y-4">
                <p className="text-xs font-heading font-bold uppercase tracking-widest text-white/80">
                  The 3 things you most want built
                </p>
                <div>
                  <label htmlFor="intake-feature-1" className="sr-only">
                    Feature 1
                  </label>
                  <input
                    type="text"
                    id="intake-feature-1"
                    name="feature_1"
                    required
                    className="w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors"
                    placeholder="1. e.g. Customer order entry form"
                  />
                </div>
                <div>
                  <label htmlFor="intake-feature-2" className="sr-only">
                    Feature 2
                  </label>
                  <input
                    type="text"
                    id="intake-feature-2"
                    name="feature_2"
                    required
                    className="w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors"
                    placeholder="2. e.g. Daily sales dashboard"
                  />
                </div>
                <div>
                  <label htmlFor="intake-feature-3" className="sr-only">
                    Feature 3
                  </label>
                  <input
                    type="text"
                    id="intake-feature-3"
                    name="feature_3"
                    required
                    className="w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors"
                    placeholder="3. e.g. Email reminder when stock is low"
                  />
                </div>
              </div>

              <div>
                <p className="block text-xs font-heading font-bold uppercase tracking-widest text-white/80 mb-3">
                  Primary integration (pick one)
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {INTEGRATIONS.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 border-2 border-brand-outlineVariant bg-brand-surfaceContainer px-3 py-3 cursor-pointer hover:border-brand-amber transition-colors"
                    >
                      <input
                        type="radio"
                        name="integration"
                        value={opt}
                        required
                        className="accent-brand-amber"
                      />
                      <span className="text-sm text-brand-secondary">
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="intake-csv"
                  className="block text-xs font-heading font-bold uppercase tracking-widest text-white/80 mb-2"
                >
                  CSV imports?{' '}
                  <span className="text-brand-outline normal-case font-normal">
                    (optional — describe the columns)
                  </span>
                </label>
                <textarea
                  id="intake-csv"
                  name="csv_imports"
                  rows={3}
                  className="w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors resize-none"
                  placeholder="e.g. customer list with: name, email, phone, last order date"
                />
              </div>

              <div>
                <label
                  htmlFor="intake-notes"
                  className="block text-xs font-heading font-bold uppercase tracking-widest text-white/80 mb-2"
                >
                  Anything else we should know?{' '}
                  <span className="text-brand-outline normal-case font-normal">
                    (optional)
                  </span>
                </label>
                <textarea
                  id="intake-notes"
                  name="notes"
                  rows={4}
                  className="w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors resize-none"
                  placeholder="Existing tools you use, customer count, anything weird about your business..."
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-brand-amber hover:bg-brand-amberHover text-brand-amberDark font-semibold py-6 disabled:opacity-60"
              >
                {submitting ? 'Submitting…' : 'Submit intake'}
              </Button>
            </form>
          )}
        </div>
      </SectionWrapper>
    </div>
  )
}
