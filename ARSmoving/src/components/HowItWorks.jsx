import React from 'react';
import Icon from './Icon';
import { useBreakpoint } from '../hooks/useBreakpoint';

const STEPS = [
  {
    icon: 'message-circle',
    num: '01',
    title: 'Get your free quote',
    body: 'Answer 7 quick questions in our moving assistant — takes under a minute. No phone call needed, no commitment.',
  },
  {
    icon: 'phone-call',
    num: '02',
    title: 'We confirm the details',
    body: 'A member of our team calls you within a few hours (Mon–Sun, 9am–6pm) to confirm the date, address, and any special items.',
  },
  {
    icon: 'truck',
    num: '03',
    title: 'We show up and handle everything',
    body: 'Our crew arrives in the confirmed window, wraps and loads your belongings, and delivers them to the new address. You just point.',
  },
];

export default function HowItWorks() {
  const { isMobile } = useBreakpoint();

  return (
    <section className="section" style={{ background: 'var(--ars-cream-2)' }}>
      <div className="container">
        <div style={{ maxWidth: 600, marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>How it works</div>
          <h2 className="h2">What happens after you hit "Get my free quote."</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? 32 : 0,
          position: 'relative',
        }}>
          {STEPS.map((step, i) => (
            <div key={step.num} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              padding: isMobile ? 0 : '0 40px 0 0',
              position: 'relative',
            }}>
              {/* Connector line between steps (desktop only) */}
              {!isMobile && i < STEPS.length - 1 && (
                <div style={{
                  position: 'absolute',
                  top: 28,
                  right: 0,
                  width: 40,
                  height: 1,
                  background: 'var(--border-strong)',
                  zIndex: 1,
                }} />
              )}

              {/* Step number + icon */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 56, height: 56,
                  borderRadius: 'var(--r-xl)',
                  background: 'var(--ars-deep-navy)',
                  color: 'var(--ars-cream)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon name={step.icon} size={24} />
                </div>
                <div style={{
                  fontSize: 13, fontWeight: 700,
                  color: 'var(--fg-quiet)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>{step.num}</div>
              </div>

              <h3 className="h3" style={{ color: 'var(--ars-deep-navy)' }}>{step.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--fg-muted)', margin: 0 }}>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
