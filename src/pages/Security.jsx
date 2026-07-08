import { SectionWrapper } from '@/components/sections/SectionWrapper'

export default function Security() {
  const lastUpdated = 'July 8, 2026'

  return (
    <div className="min-h-screen">
      <SectionWrapper dark id="security-hero">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-brand-amber mb-4 uppercase tracking-tight">
            Security &amp; Information Security Policy
          </h1>
          <p className="text-sm text-brand-outline mb-12">Last updated: {lastUpdated}</p>

          <div className="space-y-8 text-brand-secondary leading-relaxed text-sm sm:text-base">
            <section>
              <h2 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-3">1. Overview</h2>
              <p>
                SaaSless Forge LLC ("SaaSless Forge," "we," "us," or "our") builds and operates custom software for its
                clients, and in doing so we handle client data and, where authorized, data accessed through third-party
                APIs on our clients' behalf. This policy describes the administrative and technical practices we follow to
                protect that data. It reflects how we actually operate; we keep it current as our practices evolve.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-3">2. Access Control &amp; Least Privilege</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Third-party API integrations are configured with the minimum access required — <strong>read-only wherever the use case allows</strong>, and scoped to the specific accounts or resources involved.</li>
                <li>Access to production systems, databases, and credentials is limited to authorized personnel.</li>
                <li>We request only the data fields a feature genuinely needs, and nothing more.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-3">3. Credential &amp; Secrets Management</h2>
              <p>
                API keys, client secrets, and access tokens are stored as <strong>encrypted environment variables</strong> on
                our hosting platforms. They are never committed to source control and never exposed in client-side code.
                Secrets are rotated when a credential is suspected of compromise or when access is no longer required.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-3">4. Encryption</h2>
              <p>
                Data is encrypted <strong>in transit</strong> using TLS/HTTPS for all connections to our applications and to
                the third-party services we integrate with. Data at rest is held in managed, encrypted PostgreSQL databases
                provided by our hosting partners.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-3">5. Data Minimization &amp; No Reselling</h2>
              <p className="mb-3">
                We collect and retain only the data required to deliver the feature or service in question. When we access a
                client's customer data through an integration, we use it solely to provide that client's service.
              </p>
              <p className="font-semibold text-foreground">
                We do not sell, rent, or trade personal information, and mobile phone numbers and consent records are never
                shared with third parties or lead generators for marketing or promotional purposes. Where a service contacts
                a client's customers, we do so only for individuals who are recorded as having consented to be contacted.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-3">6. Vulnerability Management</h2>
              <p>
                Our application source repositories use <strong>automated dependency vulnerability scanning</strong>
                (GitHub Dependabot), with security alerts and automated security-update pull requests enabled. Dependencies
                are reviewed and kept up to date, and flagged vulnerabilities are triaged and remediated on a risk-prioritized
                basis.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-3">7. Hosting &amp; Infrastructure</h2>
              <p>
                Our websites and applications are hosted on established managed platforms — including Render, Netlify, and
                Vercel — that maintain their own physical and network security controls, automated patching, and encrypted
                storage. We rely on these providers' managed databases and infrastructure rather than self-managed servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-3">8. Data Retention &amp; Deletion</h2>
              <p>
                We retain data only as long as it is needed to provide the relevant service and to meet legal, tax, and
                accounting obligations. Data pulled from third-party integrations is retained only while the client is
                actively using the associated feature and is deleted on request. Verified deletion requests are honored
                within thirty (30) days, subject to legal record-keeping requirements.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-3">9. Incident Response</h2>
              <p>
                If we become aware of a security incident affecting data we hold or access, we investigate promptly, take
                steps to contain and remediate the issue, and notify the affected clients and any other parties as required.
                Where an incident involves data accessed through a third-party platform, we notify that platform's security
                team in accordance with their reporting requirements.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-3">10. Reporting a Security Concern</h2>
              <p>
                We welcome responsible disclosure of security issues. If you believe you have found a vulnerability or have a
                question about our security practices, please contact us:<br />
                SaaSless Forge LLC<br />
                Email: <a href="mailto:mattperry76@gmail.com" className="text-brand-amber hover:underline">mattperry76@gmail.com</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-3">11. Changes to This Policy</h2>
              <p>
                We may update this policy as our security practices evolve. The "Last updated" date at the top of this page
                reflects the most recent revision.
              </p>
            </section>
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}
