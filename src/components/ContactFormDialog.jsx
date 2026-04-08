import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function ContactFormDialog({ open, onOpenChange }) {
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
      // Reset when dialog closes
      setTimeout(() => setSubmitted(false), 300)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-brand-surfaceContainer border-2 border-brand-outlineVariant sm:max-w-md">
        {submitted ? (
          <div className="text-center py-6">
            <h3 className="text-2xl font-heading font-bold text-white">
              We'll be in touch!
            </h3>
            <p className="mt-3 text-muted-foreground">
              Thanks for reaching out. We'll get back to you within one business
              day.
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
                Let's Talk About Your Project
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Tell us a bit about what you're looking for and we'll be in
                touch.
              </DialogDescription>
            </DialogHeader>

            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="mt-4 space-y-4"
            >
              <input type="hidden" name="form-name" value="contact" />
              {/* Honeypot field to catch bots */}
              <p className="hidden">
                <label>
                  Don't fill this out: <input name="bot-field" />
                </label>
              </p>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white/80 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white/80 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-white/80 mb-1"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors"
                  placeholder="Your company (optional)"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white/80 mb-1"
                >
                  What are you looking for?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  required
                  className="w-full border-0 border-b-2 border-brand-outline bg-brand-surfaceHighest px-4 py-3 text-white placeholder-brand-outline/50 focus:border-brand-amber focus:outline-none focus:ring-0 transition-colors resize-none"
                  placeholder="Tell us briefly about your project or pain point..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-brand-amber hover:bg-brand-amberHover text-brand-amberDark font-semibold py-6"
              >
                Send Message
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
