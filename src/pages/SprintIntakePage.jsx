import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { Button } from '@/components/ui/button'
import { pixelTrack } from '@/lib/metaPixel'
import { LeadSourceFields } from '@/components/LeadSourceFields'

const INPUT_CLASS =
  'w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors'
const TEXTAREA_CLASS = `${INPUT_CLASS} resize-none`
const LABEL_CLASS =
  'block text-xs font-heading font-bold uppercase tracking-widest text-white/80 mb-2'
const HELP_CLASS = 'text-sm text-brand-outline mt-1 leading-relaxed'

const SECTION_HEADER_CLASS =
  'text-xs font-heading font-bold uppercase tracking-widest text-brand-amber mb-2'
const SECTION_TITLE_CLASS =
  'text-2xl sm:text-3xl font-heading font-extrabold text-white uppercase tracking-tight mb-3'

function RadioGroup({ name, options, required = false }) {
  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-start gap-3 border-2 border-brand-outlineVariant bg-brand-surfaceContainer px-4 py-3 cursor-pointer hover:border-brand-amber transition-colors"
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            required={required}
            className="mt-1 accent-brand-amber"
          />
          <span className="text-sm text-brand-secondary leading-relaxed">
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  )
}

function CheckboxGroup({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {items.map((it) => (
        <label
          key={it.name}
          className="flex items-start gap-3 border-2 border-brand-outlineVariant bg-brand-surfaceContainer px-4 py-3 cursor-pointer hover:border-brand-amber transition-colors"
        >
          <input
            type="checkbox"
            name={it.name}
            value="yes"
            className="mt-1 accent-brand-amber"
          />
          <span className="text-sm text-brand-secondary leading-relaxed">
            {it.label}
          </span>
        </label>
      ))}
    </div>
  )
}

const DISQUALIFIER_FIELDS = [
  'dq_mobile',
  'dq_ai_agent',
  'dq_sso',
  'dq_realtime',
  'dq_multitenant',
  'dq_compliance',
  'dq_marketing_site',
  'dq_data_imports',
]

export default function SprintIntakePage() {
  const [searchParams] = useSearchParams()
  const prefilledEmail = searchParams.get('email') || ''

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [disqualified, setDisqualified] = useState(false)
  const [screensFlag, setScreensFlag] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const form = e.target
    const formData = new FormData(form)

    const hasDisqualifier = DISQUALIFIER_FIELDS.some(
      (f) => formData.get(f) === 'yes',
    )
    const tooManyScreens = formData.get('screens') === 'more_than_5'

    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })

    // Meta conversion: a completed Sprint application is a Lead.
    pixelTrack('Lead', { content_name: 'SaaSless Forge Sprint' })

    setDisqualified(hasDisqualifier)
    setScreensFlag(tooManyScreens)
    setSubmitted(true)
    setSubmitting(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    const routedAway = disqualified || screensFlag
    return (
      <div className="min-h-screen">
        <SectionWrapper dark id="sprint-intake-success">
          <div className="max-w-2xl">
            <p className={SECTION_HEADER_CLASS}>Application received</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-tight">
              {routedAway
                ? 'Different Conversation.'
                : 'Thanks — We Have It.'}
            </h1>
            <div className="space-y-4 text-base sm:text-lg text-brand-secondary leading-relaxed">
              {routedAway ? (
                <>
                  <p>
                    Based on what you described, your project sounds like the
                    kind of work we'd take on outside the five-day sprint
                    format. That isn't a no — it just isn't a $1,000 sprint.
                  </p>
                  <p>
                    We'll be in touch within one business day to discuss a
                    custom engagement.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    We review every application against the build envelope. If
                    your project fits, we'll reply within one business day with
                    a proposed Monday start date.
                  </p>
                  <p>
                    If it doesn't fit cleanly, we'll tell you that too — and
                    suggest how to rescope it so it can.
                  </p>
                </>
              )}
            </div>
          </div>
        </SectionWrapper>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <SectionWrapper dark id="sprint-intake-hero">
        <div className="max-w-2xl">
          <p className={SECTION_HEADER_CLASS}>The five-day sprint — intake</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-tight">
            Apply For A Sprint.
          </h1>
          <p className="text-base sm:text-lg text-brand-secondary leading-relaxed mb-4">
            Ten to fifteen minutes. The form's job is to decide whether your
            project fits the build envelope, surface anything that disqualifies
            it, and capture enough information to pre-write your Day-1 spec.
          </p>
          <p className="text-base sm:text-lg text-brand-secondary leading-relaxed mb-10">
            We reply to every application within one business day.
          </p>

          <form
            name="sprint-intake"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-16"
          >
            <input type="hidden" name="form-name" value="sprint-intake" />
            <p className="hidden">
              <label>
                Don't fill this out: <input name="bot-field" />
              </label>
            </p>

            <LeadSourceFields />

            {/* SECTION 1 */}
            <section className="space-y-6">
              <header>
                <p className={SECTION_HEADER_CLASS}>Section 1</p>
                <h2 className={SECTION_TITLE_CLASS}>Who You Are</h2>
              </header>

              <div>
                <label htmlFor="i-name" className={LABEL_CLASS}>
                  1. Your name
                </label>
                <input
                  type="text"
                  id="i-name"
                  name="name"
                  required
                  className={INPUT_CLASS}
                />
              </div>

              <div>
                <label htmlFor="i-email" className={LABEL_CLASS}>
                  2. Your email
                </label>
                <input
                  type="email"
                  id="i-email"
                  name="email"
                  required
                  defaultValue={prefilledEmail}
                  className={INPUT_CLASS}
                />
              </div>

              <div>
                <label htmlFor="i-mobile" className={LABEL_CLASS}>
                  3. Your mobile number
                </label>
                <input
                  type="tel"
                  id="i-mobile"
                  name="mobile"
                  required
                  className={INPUT_CLASS}
                  placeholder="+1 555 555 5555"
                />
                <p className={HELP_CLASS}>
                  For the daily 15-minute meetings. We text the call link each
                  morning.
                </p>
              </div>

              <div>
                <label htmlFor="i-business" className={LABEL_CLASS}>
                  4. Your business name
                </label>
                <input
                  type="text"
                  id="i-business"
                  name="business"
                  required
                  className={INPUT_CLASS}
                />
              </div>

              <div>
                <label htmlFor="i-website" className={LABEL_CLASS}>
                  5. Your website{' '}
                  <span className="text-brand-outline normal-case font-normal">
                    (if you have one)
                  </span>
                </label>
                <input
                  type="url"
                  id="i-website"
                  name="website"
                  className={INPUT_CLASS}
                  placeholder="https://"
                />
              </div>

              <div>
                <p className={LABEL_CLASS}>
                  6. What is your role in the business?
                </p>
                <RadioGroup
                  name="role"
                  required
                  options={[
                    { value: 'founder', label: 'Founder / owner' },
                    {
                      value: 'operator',
                      label: 'Operator running the business day-to-day',
                    },
                    { value: 'engineer', label: 'Engineer or technical' },
                    { value: 'other', label: 'Other' },
                  ]}
                />
                <input
                  type="text"
                  name="role_other"
                  placeholder="If other, please specify"
                  className={`${INPUT_CLASS} mt-3`}
                />
              </div>
            </section>

            {/* SECTION 2 */}
            <section className="space-y-6">
              <header>
                <p className={SECTION_HEADER_CLASS}>Section 2</p>
                <h2 className={SECTION_TITLE_CLASS}>The Problem</h2>
              </header>

              <div className="border-l-4 border-brand-amber pl-5 py-1 space-y-3 text-sm text-brand-secondary leading-relaxed">
                <p>
                  <em>Before you answer:</em> A 5-day sprint is built to{' '}
                  <strong className="text-white">
                    completely solve one specific operational problem
                  </strong>{' '}
                  — end to end, by Friday. Think narrowly. One workflow that
                  breaks. One piece of data nobody can find. One task that eats
                  your week.
                </p>
                <p>
                  Once you own the software, future sprints build on top of it
                  — every week of work makes the app more useful. But this
                  first sprint is meant to fix <strong className="text-white">one</strong>{' '}
                  example issue, in full.
                </p>
                <p>
                  <em>
                    We do not need a feature list yet. We need to understand
                    what is broken.
                  </em>
                </p>
              </div>

              <div>
                <label htmlFor="i-problem" className={LABEL_CLASS}>
                  7. In one sentence, what is the operational problem this app
                  would solve?
                </label>
                <textarea
                  id="i-problem"
                  name="problem"
                  required
                  rows={3}
                  className={TEXTAREA_CLASS}
                  placeholder="My techs in the field cannot update job status from their phones, so my admin re-keys everything from voicemails."
                />
              </div>

              <div>
                <p className={LABEL_CLASS}>
                  8. What is that problem costing you today?{' '}
                  <span className="text-brand-outline normal-case font-normal">
                    (check all that apply)
                  </span>
                </p>
                <CheckboxGroup
                  items={[
                    {
                      name: 'cost_hours',
                      label: 'Hours of manual work each week',
                    },
                    {
                      name: 'cost_saas',
                      label: 'A specific SaaS subscription I want to escape',
                    },
                    {
                      name: 'cost_revenue',
                      label: 'Lost revenue or missed billing',
                    },
                    {
                      name: 'cost_team',
                      label: 'Team frustration or turnover risk',
                    },
                    {
                      name: 'cost_cx',
                      label:
                        'A worse customer experience than we should be delivering',
                    },
                  ]}
                />
                <input
                  type="text"
                  name="cost_other"
                  placeholder="Other — please specify"
                  className={`${INPUT_CLASS} mt-3`}
                />
              </div>

              <div>
                <label htmlFor="i-alternative" className={LABEL_CLASS}>
                  9. If we built nothing, what would you do instead — and why
                  isn't it working?
                </label>
                <textarea
                  id="i-alternative"
                  name="alternative"
                  required
                  rows={4}
                  className={TEXTAREA_CLASS}
                  placeholder="Airtable, a freelancer, a SaaS tool that almost-but-not-quite fit…"
                />
              </div>

              <div>
                <label htmlFor="i-deadline" className={LABEL_CLASS}>
                  10. Is there a specific deadline, event, or moment driving
                  this?
                </label>
                <textarea
                  id="i-deadline"
                  name="deadline"
                  required
                  rows={2}
                  className={TEXTAREA_CLASS}
                  placeholder="A new contract, a busy season, a SaaS contract renewing — or 'No, just tired of waiting.'"
                />
              </div>
            </section>

            {/* SECTION 3 */}
            <section className="space-y-6">
              <header>
                <p className={SECTION_HEADER_CLASS}>Section 3</p>
                <h2 className={SECTION_TITLE_CLASS}>
                  Build Envelope Check
                </h2>
                <p className="text-sm text-brand-secondary italic leading-relaxed">
                  Five-day sprints fit inside a fixed envelope. These questions
                  check whether your idea fits before you pay.
                </p>
              </header>

              <div>
                <label htmlFor="i-records" className={LABEL_CLASS}>
                  11. What kinds of records does the system need to track?
                </label>
                <textarea
                  id="i-records"
                  name="records"
                  required
                  rows={5}
                  className={TEXTAREA_CLASS}
                  placeholder={`customers
invoices
jobs
equipment`}
                />
                <p className={HELP_CLASS}>
                  One per line. Examples: customers, invoices, jobs, equipment,
                  appointments, products, leads, vendors, shifts, payments. The
                  sprint itself can build up to 3 in one week — list whatever
                  fits and we'll help you choose which 3 to start with.
                </p>
              </div>

              <div>
                <p className={LABEL_CLASS}>12. Who uses it?</p>
                <RadioGroup
                  name="users"
                  required
                  options={[
                    { value: 'just_me', label: 'Just me' },
                    {
                      value: 'me_team',
                      label: 'Me plus my internal team',
                    },
                    {
                      value: 'me_team_customers',
                      label: 'Me plus my team plus customers logging in',
                    },
                    {
                      value: 'more_complex',
                      label: 'Something more complex',
                    },
                  ]}
                />
                <input
                  type="text"
                  name="users_other"
                  placeholder="If more complex, describe"
                  className={`${INPUT_CLASS} mt-3`}
                />
              </div>

              <div>
                <p className={LABEL_CLASS}>
                  13. Roughly how many screens does it need?
                </p>
                <RadioGroup
                  name="screens"
                  required
                  options={[
                    {
                      value: '1_to_3',
                      label: '1–3 (one dashboard plus a couple of forms)',
                    },
                    { value: '4_to_5', label: '4–5 (a few related screens)' },
                    {
                      value: 'more_than_5',
                      label:
                        'More than 5 (likely too big for one sprint — we will talk)',
                    },
                  ]}
                />
              </div>

              <div>
                <p className={LABEL_CLASS}>
                  14. Does it need any of these?{' '}
                  <span className="text-brand-outline normal-case font-normal">
                    (check all that apply)
                  </span>
                </p>
                <CheckboxGroup
                  items={[
                    {
                      name: 'needs_uploads',
                      label: 'File uploads (PDFs, images, documents)',
                    },
                    {
                      name: 'needs_csv',
                      label: 'Importing data from a spreadsheet (CSV)',
                    },
                    {
                      name: 'needs_computed',
                      label:
                        'Computed fields — running totals, balances, counts, summaries',
                    },
                  ]}
                />
              </div>
            </section>

            {/* SECTION 4 — DISQUALIFIERS */}
            <section className="space-y-6">
              <header>
                <p className={SECTION_HEADER_CLASS}>Section 4</p>
                <h2 className={SECTION_TITLE_CLASS}>Disqualifier Check</h2>
                <p className="text-sm text-brand-secondary italic leading-relaxed">
                  The following are always outside a $1,000 sprint. Some are
                  available as separate, larger work. Some we do not build at
                  all. Check anything your project requires so we can be honest
                  with you up front.
                </p>
              </header>

              <div>
                <p className={LABEL_CLASS}>
                  15. Does your project need any of the following?{' '}
                  <span className="text-brand-outline normal-case font-normal">
                    (check all that apply)
                  </span>
                </p>
                <CheckboxGroup
                  items={[
                    {
                      name: 'dq_mobile',
                      label: 'Native mobile app (iOS or Android)',
                    },
                    {
                      name: 'dq_ai_agent',
                      label: 'An AI agent that takes actions on your behalf',
                    },
                    {
                      name: 'dq_sso',
                      label:
                        'Single sign-on, SAML, or multi-factor authentication',
                    },
                    {
                      name: 'dq_realtime',
                      label:
                        'Real-time updates (live collaboration, websockets)',
                    },
                    {
                      name: 'dq_multitenant',
                      label:
                        'Multi-tenancy (separate isolated environments per customer)',
                    },
                    {
                      name: 'dq_compliance',
                      label:
                        'Compliance certification (HIPAA, SOC 2, PCI)',
                    },
                    {
                      name: 'dq_marketing_site',
                      label: 'A public-facing marketing website',
                    },
                    {
                      name: 'dq_data_imports',
                      label:
                        'More than 1 data import (from CSVs or live APIs like QuickBooks, Salesforce, HubSpot)',
                    },
                    {
                      name: 'dq_none',
                      label: 'None of the above',
                    },
                  ]}
                />
                <p className={`${HELP_CLASS} mt-3`}>
                  Anything checked here means a sprint is not the right fit.
                  We may still be able to help with separate work — we'll
                  route you to a different conversation.
                </p>
              </div>
            </section>

            {/* SECTION 5 */}
            <section className="space-y-6">
              <header>
                <p className={SECTION_HEADER_CLASS}>Section 5</p>
                <h2 className={SECTION_TITLE_CLASS}>Logistics</h2>
              </header>

              <div>
                <p className={LABEL_CLASS}>
                  16. When would you want the sprint to start?
                </p>
                <label className="flex items-start gap-3 border-2 border-brand-outlineVariant bg-brand-surfaceContainer px-4 py-3 cursor-pointer hover:border-brand-amber transition-colors mb-3">
                  <input
                    type="checkbox"
                    name="start_asap"
                    value="yes"
                    className="mt-1 accent-brand-amber"
                  />
                  <span className="text-sm text-brand-secondary leading-relaxed">
                    As soon as possible
                  </span>
                </label>
                <label
                  htmlFor="i-start"
                  className="block text-xs font-heading font-bold uppercase tracking-widest text-white/60 mb-2"
                >
                  Or pick a specific Monday
                </label>
                <input
                  type="date"
                  id="i-start"
                  name="start_date"
                  className={INPUT_CLASS}
                />
                <p className={HELP_CLASS}>
                  Specific Monday, at least one week from today. We work one
                  sprint at a time and typically book ~2 weeks out.
                </p>
              </div>

              <div>
                <p className={LABEL_CLASS}>
                  17. Can you commit to a 15-minute meeting each weekday at the
                  same time?
                </p>
                <RadioGroup
                  name="can_commit"
                  required
                  options={[
                    { value: 'yes', label: 'Yes' },
                    { value: 'most_days', label: 'Most days' },
                    { value: 'no', label: 'No' },
                  ]}
                />
                <input
                  type="text"
                  name="commit_explain"
                  placeholder="If 'most days' or 'no' — explain"
                  className={`${INPUT_CLASS} mt-3`}
                />
              </div>

              <div>
                <p className={LABEL_CLASS}>
                  18. After 30 days of included hosting, what do you expect to
                  do?
                </p>
                <RadioGroup
                  name="hosting_plan"
                  required
                  options={[
                    {
                      value: 'keep_hosted',
                      label: 'Keep it hosted with you ($17 per month)',
                    },
                    {
                      value: 'transfer',
                      label: 'Transfer it to my own infrastructure',
                    },
                    {
                      value: 'not_sure',
                      label:
                        'Not sure yet — I will decide at the end of the sprint',
                    },
                  ]}
                />
              </div>

              <div>
                <p className={LABEL_CLASS}>
                  19. Have you bought custom software before?
                </p>
                <RadioGroup
                  name="bought_before"
                  required
                  options={[
                    {
                      value: 'multiple',
                      label: 'Yes — multiple times',
                    },
                    { value: 'once', label: 'Once' },
                    {
                      value: 'first_time',
                      label: 'No — this is my first time',
                    },
                    { value: 'sort_of', label: 'Sort of' },
                  ]}
                />
                <input
                  type="text"
                  name="bought_explain"
                  placeholder="If 'sort of' — please describe"
                  className={`${INPUT_CLASS} mt-3`}
                />
              </div>
            </section>

            {/* SECTION 6 */}
            <section className="space-y-6">
              <header>
                <p className={SECTION_HEADER_CLASS}>Section 6</p>
                <h2 className={SECTION_TITLE_CLASS}>Anything Else</h2>
              </header>

              <div>
                <label htmlFor="i-anything" className={LABEL_CLASS}>
                  20. Is there anything important about your business, your
                  customers, or this project that didn't fit in the questions
                  above?
                </label>
                <textarea
                  id="i-anything"
                  name="anything_else"
                  rows={4}
                  className={TEXTAREA_CLASS}
                />
              </div>

              <div>
                <p className={LABEL_CLASS}>
                  21. How did you hear about SaaSless Forge?
                </p>
                <RadioGroup
                  name="heard_about"
                  required
                  options={[
                    { value: 'referral', label: 'Referral' },
                    { value: 'search', label: 'Search' },
                    { value: 'social', label: 'Social media' },
                    { value: 'podcast', label: 'Podcast' },
                    { value: 'other', label: 'Other' },
                  ]}
                />
                <input
                  type="text"
                  name="heard_other"
                  placeholder="If other, please specify"
                  className={`${INPUT_CLASS} mt-3`}
                />
              </div>
            </section>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-brand-amber hover:bg-brand-amberHover text-brand-amberDark font-semibold py-6 disabled:opacity-60"
            >
              {submitting ? 'Submitting…' : 'Submit application'}
            </Button>
          </form>
        </div>
      </SectionWrapper>
    </div>
  )
}
