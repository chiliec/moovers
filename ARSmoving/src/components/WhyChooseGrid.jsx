import React from 'react';
import Icon from './Icon';
import { useBreakpoint } from '../hooks/useBreakpoint';

const REASONS = [
  { icon: 'clock',         title: 'We show up on time',
    body: 'Arrival window confirmed the day before. No waiting around, no vague "sometime in the morning."' },
  { icon: 'shield-check',  title: 'Your belongings are fully protected',
    body: 'Furniture wrapped, fragile items individually packed, everything secured in the truck. DOT-licensed and insured on every job.' },
  { icon: 'calendar-days', title: 'We work around your schedule',
    body: 'Early morning, evenings, weekends — we fit your timeline, not the other way around.' },
  { icon: 'users',         title: 'Trained crew on every move',
    body: 'Not day laborers. Every mover on our team is trained in proper lifting, furniture handling, and stairwell navigation.' },
  { icon: 'tag',           title: 'Transparent pricing, no hidden fees',
    body: 'Your quote is your price. We walk you through everything upfront — no fuel surcharges, no surprise add-ons on moving day.' },
  { icon: 'award',         title: 'BBB accredited since day one',
    body: "Accredited by the Better Business Bureau and verified on Angie's List and Yelp. Our record is public — go check it." },
];

function ReasonCell({ icon, title, body }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{
        width: 56, height: 56, borderRadius: 'var(--r-md)',
        background: 'rgba(243,240,235,.08)', color: 'var(--ars-cyan)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid rgba(243,240,235,.16)',
      }}>
        <Icon name={icon} size={28} />
      </div>
      <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 20, color: 'var(--ars-cream)', margin: 0 }}>{title}</h3>
      <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--fg-on-dark-muted)', margin: 0 }}>{body}</p>
    </div>
  );
}

export default function WhyChooseGrid() {
  const { isMobile, isTablet } = useBreakpoint();
  const cols = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <section id="why" className="section section--dark">
      <div className="container">
        <div style={{ maxWidth: 720, marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>Why ARS</div>
          <h2 className="h2">Why Northern Virginia trusts ARS Moving.</h2>
          <p className="lead" style={{ marginTop: 16 }}>
            We've been moving families and businesses across Northern Virginia
            since 2014. Here's what makes the difference.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 40 }}>
          {REASONS.map(r => <ReasonCell key={r.title} {...r} />)}
        </div>
      </div>
    </section>
  );
}
