import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function SmsWaitlistDialog({ open, onOpenChange }) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)

    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })

    setSubmitted(true)
  }

  const handleClose = (value) => {
    onOpenChange(value)
    if (!value) {
      setTimeout(() => setSubmitted(false), 300)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-brand-surfaceContainer border-2 border-brand-outlineVariant sm:max-w-md">
        {submitted ? (
          <div className="text-center py-6">
            <h3 className="text-2xl font-heading font-bold text-white">
              You're on the list.
            </h3>
            <p className="mt-3 text-muted-foreground">
              We'll reach out as soon as your account is ready to activate —
              usually within one business day of carrier approval.
            </p>
            <Button
              onClick={() => handleClose(false)}
              className="mt-6 bg-brand-amber hover:bg-brand-amberHover text-brand-amberDark font-semibold"
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-heading font-bold text-white">
                Join the SMS Waitlist
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Tell us a bit about your business and we'll be in touch when
                your account is ready to activate.
              </DialogDescription>
            </DialogHeader>

            <form
              name="sms-waitlist"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="mt-4 space-y-4"
            >
              <input type="hidden" name="form-name" value="sms-waitlist" />
              <p className="hidden">
                <label>
                  Don't fill this out: <input name="bot-field" />
                </label>
              </p>

              <div>
                <label
                  htmlFor="sms-name"
                  className="block text-xs font-heading font-bold uppercase tracking-widest text-white/80 mb-2"
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="sms-name"
                  name="name"
                  required
                  className="w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors"
                  placeholder="Jane Smith"
                />
              </div>

              <div>
                <label
                  htmlFor="sms-email"
                  className="block text-xs font-heading font-bold uppercase tracking-widest text-white/80 mb-2"
                >
                  Work email
                </label>
                <input
                  type="email"
                  id="sms-email"
                  name="email"
                  required
                  className="w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label
                  htmlFor="sms-business"
                  className="block text-xs font-heading font-bold uppercase tracking-widest text-white/80 mb-2"
                >
                  Business name
                </label>
                <input
                  type="text"
                  id="sms-business"
                  name="business"
                  required
                  className="w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors"
                  placeholder="Acme Services"
                />
              </div>

              <div>
                <label
                  htmlFor="sms-phone"
                  className="block text-xs font-heading font-bold uppercase tracking-widest text-white/80 mb-2"
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  id="sms-phone"
                  name="phone"
                  className="w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors"
                  placeholder="(555) 555-0100 (optional)"
                />
              </div>

              <div>
                <label
                  htmlFor="sms-usecase"
                  className="block text-xs font-heading font-bold uppercase tracking-widest text-white/80 mb-2"
                >
                  What will you use SMS for?
                </label>
                <textarea
                  id="sms-usecase"
                  name="use_case"
                  rows={3}
                  className="w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors resize-none"
                  placeholder="e.g. appointment reminders, order updates, occasional promotions..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-brand-amber hover:bg-brand-amberHover text-brand-amberDark font-semibold py-6"
              >
                Join Waitlist
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                No card required. We'll email you when it's your turn to
                activate.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
