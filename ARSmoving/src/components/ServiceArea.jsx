import React from 'react';
import Icon from './Icon';
import { useBreakpoint } from '../hooks/useBreakpoint';

const CITIES = [
  'Herndon', 'Reston', 'Fairfax', 'Arlington', 'McLean',
  'Vienna', 'Ashburn', 'Sterling', 'Leesburg', 'Alexandria',
  'Falls Church', 'Annandale', 'Burke', 'Centreville', 'Chantilly',
  'Manassas', 'Woodbridge', 'Springfield', 'Tysons', 'Great Falls',
];

export default function ServiceArea() {
  const { isMobile } = useBreakpoint();

  return (
    <section id="about" className="section" style={{ background: 'var(--ars-cream-2)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr',
          gap: isMobile ? 40 : 72,
          alignItems: 'start',
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Where we work</div>
            <h2 className="h2" style={{ marginBottom: 20 }}>
              We serve all of Northern Virginia — and beyond.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg-muted)', marginBottom: 28 }}>
              Based in Herndon / Fairfax. We cover every city and county in
              Northern Virginia for local moves. For long-distance moves, we go
              anywhere in the continental US — we're a direct carrier, not a broker.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: 'map-pin', text: 'Headquartered in Herndon, VA' },
                { icon: 'map',     text: 'All of Northern Virginia for local moves' },
                { icon: 'truck',   text: 'Continental US for long-distance' },
              ].map(item => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: 'var(--ars-cyan)' }}><Icon name={item.icon} size={18} /></span>
                  <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--fg)' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{
              fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'var(--fg-quiet)',
              marginBottom: 16,
            }}>Cities we serve</div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
            }}>
              {CITIES.map(city => (
                <span key={city} style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--r-pill)',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--ars-deep-navy)',
                }}>{city}</span>
              ))}
              <span style={{
                padding: '6px 14px',
                borderRadius: 'var(--r-pill)',
                background: 'rgba(48,165,216,.10)',
                border: '1px solid rgba(48,165,216,.25)',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--ars-mid-navy)',
              }}>+ more</span>
            </div>

            <p style={{
              fontSize: 13, color: 'var(--fg-quiet)',
              marginTop: 20, lineHeight: 1.5,
            }}>
              Not sure if we cover your area?{' '}
              <a href="tel:8665285358" style={{ color: 'var(--ars-deep-navy)', fontWeight: 600, textDecoration: 'none' }}>
                Call 866-528-5358
              </a>{' '}
              — Mon–Sun, 9am–6pm.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
