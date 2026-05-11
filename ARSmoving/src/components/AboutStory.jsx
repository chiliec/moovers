import React from 'react';
import Icon from './Icon';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { asset } from '../lib/asset';

const VALUES = [
  { icon: 'handshake',    title: 'Straight talk',       body: "We tell you what a move will cost before we start — not after." },
  { icon: 'shield-check', title: 'Accountability',      body: "If something changes, we call you first. Our record is public — go check it." },
  { icon: 'clock',        title: 'Respect for your time', body: "We confirm the arrival window the day before. We show up in it." },
];

export default function AboutStory() {
  const { isMobile } = useBreakpoint();

  return (
    <section id="story" className="section">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 40 : 72,
          alignItems: 'center',
          marginBottom: 64,
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>About ARS Moving</div>
            <h2 className="h2" style={{ marginBottom: 20 }}>
              Family-run since 2014. Still the same crew.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--fg-muted)', marginBottom: 20 }}>
              ARS Moving started in Northern Virginia over a decade ago as a small
              local operation. It's still locally owned — the same people who
              took your call in 2014 are running the moves today.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--fg-muted)', marginBottom: 28 }}>
              We didn't set out to be the biggest moving company in Northern
              Virginia. We set out to be the one people actually recommend to
              their neighbors. That's still the only metric we track.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="tel:8665285358" className="btn btn--primary"
                style={isMobile ? { flex: 1 } : {}}>
                <Icon name="phone" size={16} /> Call 866-528-5358
              </a>
              <a
                href="https://www.bbb.org/us/va/herndon/profile/moving-companies/ars-movers-llc-0241-236012397"
                target="_blank" rel="noopener noreferrer"
                className="btn btn--secondary"
                style={isMobile ? { flex: 1 } : {}}
              >
                Our BBB record
              </a>
            </div>
          </div>

          <div style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-2)' }}>
            <img
              src={asset('/assets/images/yelp-02.webp')}
              alt="ARS Moving team reviewing the job plan"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', aspectRatio: '4/3' }}
            />
          </div>
        </div>

        {/* Values row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? 24 : 32,
          borderTop: '1px solid var(--border)',
          paddingTop: 48,
        }}>
          {VALUES.map(v => (
            <div key={v.title} style={{ display: 'flex', gap: 16 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 'var(--r-md)',
                background: 'rgba(48,165,216,.10)', color: 'var(--ars-cyan)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, alignSelf: 'flex-start',
              }}>
                <Icon name={v.icon} size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--ars-deep-navy)', marginBottom: 6 }}>
                  {v.title}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--fg-muted)', margin: 0 }}>
                  {v.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
