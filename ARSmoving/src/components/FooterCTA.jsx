import React from 'react';
import arsLogoDark from '/assets/ars-logo-dark.svg';
import { useBreakpoint } from '../hooks/useBreakpoint';

export default function FooterCTA({ onCTA }) {
  const { isMobile } = useBreakpoint();
  return (
    <section className="section" style={{
      background: 'var(--ars-deep-navy)', paddingTop: 96, paddingBottom: 96,
      position: 'relative', overflow: 'hidden',
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 760 }}>
          <div className="eyebrow" style={{ color: 'var(--ars-cyan)', marginBottom: 14 }}>Ready to move?</div>
          <h2 className="h2" style={{ color: 'var(--ars-cream)', marginBottom: 18 }}>
            Get your free estimate in 60 seconds.
          </h2>
          <p style={{
            fontSize: 19, lineHeight: 1.5, color: 'var(--fg-on-dark-muted)',
            marginBottom: 32, maxWidth: '60ch',
          }}>
            No phone call required. Answer 5 quick questions and get a ballpark
            range instantly. A member of our team follows up to confirm the details.
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn--primary" onClick={onCTA}
              style={isMobile ? { width: '100%' } : {}}>
              Start my free quote
            </button>
            <a href="tel:8665285358" style={{
              color: 'var(--ars-cream)', textDecoration: 'none',
              fontSize: 15, fontWeight: 600, opacity: .85,
              ...(isMobile ? { width: '100%', textAlign: 'center' } : {}),
            }}>or call us directly: 866-528-5358</a>
          </div>
        </div>
      </div>
      <img src={arsLogoDark} alt="" aria-hidden="true" style={{
        position: 'absolute', right: -120, top: -80,
        height: 560, opacity: 0.06, pointerEvents: 'none',
      }} />
    </section>
  );
}
