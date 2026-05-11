import React from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{
        fontSize: 20, fontWeight: 700, color: 'var(--ars-deep-navy)',
        marginBottom: 12, letterSpacing: '-0.01em',
      }}>{title}</h2>
      <div style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--fg-muted)' }}>
        {children}
      </div>
    </div>
  );
}

function Li({ children }) {
  return (
    <li style={{ marginBottom: 6, paddingLeft: 4 }}>{children}</li>
  );
}

export default function PrivacyPolicy() {
  return (
    <>
      <SiteHeader onCTA={() => { window.location.href = '/'; }} />
      <main style={{ paddingTop: 80, paddingBottom: 96, minHeight: '70vh' }}>
        <div className="container" style={{ maxWidth: 780 }}>

          {/* Header */}
          <div style={{ marginBottom: 48 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Legal</div>
            <h1 className="h2" style={{ marginBottom: 16 }}>Privacy Policy</h1>
            <p style={{ fontSize: 15, color: 'var(--fg-quiet)', borderLeft: '3px solid var(--border-strong)', paddingLeft: 16 }}>
              <strong>ARS Moving LLC</strong> &nbsp;·&nbsp; Effective date: May 11, 2026 &nbsp;·&nbsp; Herndon, Virginia
            </p>
          </div>

          <Section title="1. Who We Are">
            <p style={{ marginBottom: 12 }}>
              ARS Moving LLC ("ARS Moving," "we," "our," or "us") is a locally owned moving company
              headquartered in Herndon, Fairfax County, Virginia. We provide local, long-distance, office,
              and specialty moving services throughout Northern Virginia, the Washington D.C. metro area,
              and destinations across the United States.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, share, and protect personal information
              when you visit our website or use our services. It also describes the rights you have
              under applicable Virginia law.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p style={{ marginBottom: 10 }}>We collect information you provide directly and, in limited cases, automatically.</p>

            <p style={{ fontWeight: 700, color: 'var(--ars-deep-navy)', marginBottom: 6 }}>Information you provide</p>
            <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
              <Li><strong>Contact details:</strong> first and last name, phone number, email address</Li>
              <Li><strong>Move details:</strong> origin address or city, destination address or city, move date, home or office size, move type (local, long-distance, office, specialty)</Li>
              <Li><strong>Communications:</strong> messages you send us via the quote form, email, or phone</Li>
            </ul>

            <p style={{ fontWeight: 700, color: 'var(--ars-deep-navy)', marginBottom: 6 }}>Information collected automatically</p>
            <ul style={{ paddingLeft: 20 }}>
              <Li><strong>Usage data:</strong> pages visited, time on site, referring URL, browser type and version, operating system</Li>
              <Li><strong>Device data:</strong> IP address, screen resolution, language preference</Li>
              <Li><strong>Cookies:</strong> session cookies required for the site to function. We do not use third-party advertising cookies.</Li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul style={{ paddingLeft: 20 }}>
              <Li>Prepare and deliver moving estimates and quotes</Li>
              <Li>Contact you to confirm move details, scheduling, and logistics</Li>
              <Li>Coordinate your move and communicate with our crew on your behalf</Li>
              <Li>Send service-related confirmations and follow-ups (no unsolicited marketing without your consent)</Li>
              <Li>Respond to questions, complaints, or support requests</Li>
              <Li>Improve our website, services, and internal operations</Li>
              <Li>Comply with legal obligations and enforce our service agreements</Li>
            </ul>
            <p style={{ marginTop: 14, padding: '12px 16px', background: 'var(--ars-cream-2)', borderRadius: 'var(--r-md)', fontSize: 15 }}>
              We do <strong>not</strong> use your information for automated decision-making that produces legal or similarly significant effects.
            </p>
          </Section>

          <Section title="4. How We Share Your Information">
            <p style={{ marginBottom: 10 }}>
              We do <strong>not sell</strong> your personal information to third parties. We may share it only in these circumstances:
            </p>
            <ul style={{ paddingLeft: 20 }}>
              <Li>
                <strong>Service providers:</strong> companies that help us operate our business
                (e.g., CRM and scheduling software, email delivery, website hosting). These vendors
                are contractually prohibited from using your data for any purpose other than
                providing services to us.
              </Li>
              <Li>
                <strong>Legal requirements:</strong> when required by a valid court order, subpoena,
                law enforcement request, or other legal obligation under Virginia or federal law.
              </Li>
              <Li>
                <strong>Business transfers:</strong> in the event of a merger, acquisition, or sale of
                substantially all of our assets, your information may transfer to the successor entity
                under the same terms as this Policy.
              </Li>
              <Li>
                <strong>With your consent:</strong> for any other purpose you explicitly approve at
                the time of collection.
              </Li>
            </ul>
          </Section>

          <Section title="5. Your Rights Under Virginia Law (VCDPA)">
            <p style={{ marginBottom: 12 }}>
              Virginia residents have the following rights under the{' '}
              <strong>Virginia Consumer Data Protection Act (Va. Code § 59.1-575 et seq.)</strong>:
            </p>
            <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
              <Li><strong>Right to know:</strong> confirm whether we process your personal data and access a copy of it</Li>
              <Li><strong>Right to correct:</strong> request correction of inaccurate personal data</Li>
              <Li><strong>Right to delete:</strong> request deletion of personal data we hold about you</Li>
              <Li><strong>Right to data portability:</strong> receive a copy of your data in a portable, commonly used format</Li>
              <Li><strong>Right to opt out:</strong> opt out of targeted advertising, sale of personal data, or profiling for decisions with significant effects (note: we do not engage in any of these activities)</Li>
            </ul>
            <p style={{ marginBottom: 10 }}>
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:Movingwithars@gmail.com" style={{ color: 'var(--ars-cyan)' }}>Movingwithars@gmail.com</a>{' '}
              with the subject line "Privacy Request." We will respond within <strong>45 days</strong>{' '}
              as required by the VCDPA, with the option to extend by an additional 45 days when
              reasonably necessary.
            </p>
            <p>
              If we deny your request, you may appeal by contacting us and stating your disagreement.
              If the appeal is denied, you may submit a complaint to the{' '}
              <strong>Virginia Attorney General's Office</strong> at{' '}
              <a href="https://www.oag.state.va.us" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ars-cyan)' }}>
                oag.state.va.us
              </a>.
            </p>
          </Section>

          <Section title="6. Data Retention">
            <p>
              We retain personal information only as long as necessary for the purpose it was collected
              or as required by law. Specifically:
            </p>
            <ul style={{ paddingLeft: 20, marginTop: 10 }}>
              <Li>Quote and contact form submissions: retained for up to <strong>3 years</strong> from last interaction</Li>
              <Li>Completed move records: retained for <strong>7 years</strong> for accounting and legal purposes in accordance with Virginia business record requirements</Li>
              <Li>Website analytics data: retained for up to <strong>14 months</strong></Li>
              <Li>Email correspondence: retained for up to <strong>3 years</strong></Li>
            </ul>
          </Section>

          <Section title="7. Data Security">
            <p>
              We implement reasonable and appropriate technical and organizational measures to protect
              personal information against unauthorized access, disclosure, alteration, or destruction.
              Our website uses HTTPS/TLS encryption for all data in transit. Access to personal
              information is limited to personnel who need it to perform their job responsibilities.
            </p>
            <p style={{ marginTop: 10 }}>
              No method of transmission over the internet or electronic storage is 100% secure.
              If you believe your information has been compromised, please contact us immediately.
            </p>
          </Section>

          <Section title="8. Children's Privacy">
            <p>
              Our services and website are not directed to children under the age of 13. We do not
              knowingly collect personal information from children under 13. If you believe a child
              has provided us with personal information, please contact us and we will delete it.
            </p>
          </Section>

          <Section title="9. Third-Party Links">
            <p>
              Our website contains links to third-party sites (BBB, Yelp, FMCSA DOT registry,
              social media profiles). This Privacy Policy does not apply to those sites.
              We encourage you to review the privacy policies of any third-party site you visit.
            </p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. When we do, we will revise the
              "Effective date" at the top of this page. We encourage you to review this Policy
              periodically. Continued use of our website after changes constitutes acceptance of
              the updated Policy.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p style={{ marginBottom: 10 }}>For privacy questions, requests, or concerns:</p>
            <div style={{
              background: 'var(--ars-cream-2)', borderRadius: 'var(--r-lg)',
              padding: '20px 24px', display: 'inline-block', fontSize: 15, lineHeight: 2,
            }}>
              <strong>ARS Moving LLC</strong><br />
              Herndon, Fairfax County, Virginia<br />
              <a href="mailto:Movingwithars@gmail.com" style={{ color: 'var(--ars-cyan)' }}>Movingwithars@gmail.com</a><br />
              <a href="tel:8665285358" style={{ color: 'var(--ars-cyan)' }}>866-528-5358</a><br />
              Mon–Sun, 9 am – 6 pm ET
            </div>
          </Section>

        </div>
      </main>
      <SiteFooter />
    </>
  );
}
