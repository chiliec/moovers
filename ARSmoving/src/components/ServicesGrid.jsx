import React from 'react';
import Icon from './Icon';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { asset } from '../lib/asset';

const SERVICES = [
  {
    icon: 'home', image: asset('/assets/images/yelp-15.webp'),
    href: '#local', title: 'Local Residential Moving',
    body: "Moving within Northern Virginia? We handle moves of any size — from studios to 4-bedroom homes — with a crew that shows up on time and treats your furniture like it's theirs.",
  },
  {
    icon: 'map', image: asset('/assets/images/yelp-10.webp'),
    href: '#long', title: 'Long-Distance & Interstate Moving',
    body: "Crossing state lines doesn't mean losing control. We coordinate every leg of your move and keep you updated until the last box is delivered.",
  },
  {
    icon: 'building-2', image: asset('/assets/images/yelp-13.webp'),
    href: '#office', title: 'Office & Commercial Relocation',
    body: "Downtime costs money. We move your business efficiently — nights, weekends, or off-hours — so your team is back to work fast.",
  },
  {
    icon: 'piano', image: asset('/assets/images/yelp-14.webp'),
    href: '#piano', title: 'Piano Moving',
    body: "Grands, uprights, digital stages — we have the rigging equipment and trained hands to move pianos without scratching floors or losing a key.",
  },
  {
    icon: 'package', image: asset('/assets/images/yelp-11.webp'),
    href: '#packing', title: 'Professional Packing',
    body: "We bring the materials, pack everything securely, and label every box. You show up to a house that's ready to unpack — not a pile of unlabeled chaos.",
  },
  {
    icon: 'trash-2', image: asset('/assets/images/photo2.webp'),
    href: '#junk', title: 'Junk Removal',
    body: "Don't move what you don't need. We haul away unwanted furniture, appliances, and debris before or after your move — one less thing on your list.",
  },
];

function ServiceCard({ icon, image, title, body, href }) {
  return (
    <a href={href} style={{
      display: 'flex', flexDirection: 'column',
      background: 'var(--bg)', border: '1px solid var(--border)',
      borderRadius: 'var(--r-lg)', textDecoration: 'none',
      color: 'var(--fg)', transition: 'box-shadow 240ms var(--ease), transform 240ms var(--ease)',
      boxShadow: 'var(--shadow-1)', overflow: 'hidden',
    }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-1)'; e.currentTarget.style.transform = 'none'; }}
    >
      <div style={{ height: 190, overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={image} alt={title} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <div style={{ padding: '22px 24px 24px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 'var(--r-md)',
          background: 'rgba(48,165,216,.12)', color: 'var(--ars-cyan)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={icon} size={22} />
        </div>
        <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 18, lineHeight: 1.25, color: 'var(--ars-deep-navy)', margin: 0 }}>{title}</h3>
        <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--fg-muted)', margin: 0, flex: 1 }}>{body}</p>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ars-deep-navy)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          View service <Icon name="arrow-right" size={13} />
        </div>
      </div>
    </a>
  );
}

export default function ServicesGrid() {
  const { isMobile, isTablet } = useBreakpoint();
  const cols = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <section id="services" className="section">
      <div className="container">
        <div style={{ maxWidth: 720, marginBottom: 48 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>What we do</div>
          <h2 className="h2" style={{ marginBottom: 16 }}>Everything you need for a smooth move.</h2>
          <p className="lead">
            Whether you're moving a studio apartment across town or relocating a full
            office across state lines, we handle it — with the right equipment, the
            right crew, and zero surprises.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 20 }}>
          {SERVICES.map(s => <ServiceCard key={s.title} {...s} />)}
        </div>
      </div>
    </section>
  );
}
