import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function SprintSignupModal({ open, onOpenChange }) {
  const [submitted, setSubmitted] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const email = formData.get('email')

    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })

    setSubmittedEmail(email || '')
    setSubmitted(true)
  }

  const handleClose = (value) => {
    onOpenChange(value)
    if (!value) {
      setTimeout(() => setSubmitted(false), 300)
    }
  }

  const intakeHref = submittedEmail
    ? `/sprint-intake?email=${encodeURIComponent(submittedEmail)}`
    : '/sprint-intake'

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-brand-surfaceContainer border-2 border-brand-outlineVariant sm:max-w-md">
        {submitted ? (
          <div className="text-center py-6">
            {/* COPY: replace from scope-contract.md §signup-confirmation */}
            <h3 className="text-2xl font-heading font-bold text-white">
              [FILLER: You're on the list — confirmation headline]
            </h3>
            <p className="mt-3 text-muted-foreground">
              [FILLER: Lorem ipsum confirmation body. We'll let folks know about
              week 1 spots. While they wait, route them to the intake form so
              we can hit the ground running. Replace with final copy.]
            </p>
            <Link
              to={intakeHref}
              onClick={() => handleClose(false)}
              className="inline-block mt-6 bg-brand-amber hover:bg-brand-amberHover text-brand-amberDark font-semibold px-8 py-3"
            >
              Fill out intake form →
            </Link>
            <p className="mt-4">
              <button
                type="button"
                onClick={() => handleClose(false)}
                className="text-xs uppercase tracking-widest text-muted-foreground hover:text-white transition-colors"
              >
                Close
              </button>
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              {/* COPY: replace from scope-contract.md §signup-modal */}
              <DialogTitle className="text-2xl font-heading font-bold text-white">
                [FILLER: Sprint Signup Headline]
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                [FILLER: One-line value prop for the $250 sprint signup —
                replace with final copy.]
              </DialogDescription>
            </DialogHeader>

            <form
              name="sprint-signup"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="mt-4 space-y-4"
            >
              <input type="hidden" name="form-name" value="sprint-signup" />
              <p className="hidden">
                <label>
                  Don't fill this out: <input name="bot-field" />
                </label>
              </p>

              <div>
                <label
                  htmlFor="sprint-name"
                  className="block text-xs font-heading font-bold uppercase tracking-widest text-white/80 mb-2"
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="sprint-name"
                  name="name"
                  required
                  className="w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors"
                  placeholder="Jane Smith"
                />
              </div>

              <div>
                <label
                  htmlFor="sprint-email"
                  className="block text-xs font-heading font-bold uppercase tracking-widest text-white/80 mb-2"
                >
                  Work email
                </label>
                <input
                  type="email"
                  id="sprint-email"
                  name="email"
                  required
                  className="w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label
                  htmlFor="sprint-company"
                  className="block text-xs font-heading font-bold uppercase tracking-widest text-white/80 mb-2"
                >
                  Company (optional)
                </label>
                <input
                  type="text"
                  id="sprint-company"
                  name="company"
                  className="w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors"
                  placeholder="Acme Co."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-brand-amber hover:bg-brand-amberHover text-brand-amberDark font-semibold py-6"
              >
                Reserve my spot
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                {/* COPY: replace from scope-contract.md §signup-fine-print */}
                [FILLER: Short reassurance line — no card, no commitment, etc.]
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
