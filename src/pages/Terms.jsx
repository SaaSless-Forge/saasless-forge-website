import { SectionWrapper } from '@/components/sections/SectionWrapper'

export default function Terms() {
  const lastUpdated = 'April 14, 2026'

  return (
    <div className="min-h-screen">
      <SectionWrapper dark id="terms-hero">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-brand-amber mb-4 uppercase tracking-tight">
            SMS Terms of Service
          </h1>
          <p className="text-sm text-brand-outline mb-12">Last updated: {lastUpdated}</p>

          <div className="space-y-8 text-brand-secondary leading-relaxed text-sm sm:text-base">
            <section>
              <h2 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-3">Program Name</h2>
              <p>SaaSless Forge SMS Notifications</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-3">Program Description</h2>
              <p>
                SaaSless Forge LLC operates this SMS program to deliver operational notifications to clients, team members,
                and end users of applications built by SaaSless Forge. Messages may include project status updates,
                deployment notifications, appointment reminders, "on my way" alerts, service confirmations, billing notices,
                and other account-related communications. Consent to receive these messages is obtained through client
                service agreements, team onboarding forms, or explicit opt-in at the point of service.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-3">Message Frequency</h2>
              <p>Message frequency varies based on the nature of your engagement and the activity on your account.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-3">Message and Data Rates</h2>
              <p>
                Message and data rates may apply. SaaSless Forge does not charge for the receipt of SMS messages, but your
                mobile carrier may apply standard messaging and data rates per your wireless service plan. Please contact
                your carrier for details.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-3">How to Opt Out</h2>
              <p>
                You can cancel the SMS service at any time. Reply <strong>STOP</strong> to any message from us. After you
                send <strong>STOP</strong>, we will send you a confirmation message and stop sending messages to you. If you
                want to receive messages again, you must sign up in the same manner you originally opted in.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-3">How to Get Help</h2>
              <p>
                If you are experiencing issues with the messaging program, reply <strong>HELP</strong> to any of our messages
                for assistance. You can also contact us directly at{' '}
                <a href="mailto:hello@saaslessforge.com" className="text-brand-amber hover:underline">hello@saaslessforge.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-3">Supported Carriers</h2>
              <p>
                Carriers are not liable for delayed or undelivered messages. This program is supported on all major U.S.
                carriers including AT&T, Verizon, T-Mobile, Sprint, U.S. Cellular, and others.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-3">Privacy</h2>
              <p>
                Your privacy is important to us. For details on how we handle your information, including phone numbers and
                consent records, please review our{' '}
                <a href="/privacy" className="text-brand-amber hover:underline">Privacy Policy</a>. Mobile information will
                not be shared with third parties or affiliates for marketing or promotional purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-3">Contact</h2>
              <p>
                SaaSless Forge LLC<br />
                Email: <a href="mailto:hello@saaslessforge.com" className="text-brand-amber hover:underline">hello@saaslessforge.com</a>
              </p>
            </section>
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}
