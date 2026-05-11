import React from 'react';
import Icon from './Icon';
import { useBreakpoint } from '../hooks/useBreakpoint';
import arsLogoDark from '/assets/ars-logo-dark.svg';
import { asset } from '../lib/asset';

const FOOTER_BADGES = [
  { src: asset('/assets/badges/bbb.png'), alt: 'BBB A+ Accredited Business', href: 'https://www.bbb.org/us/va/herndon/profile/moving-companies/ars-movers-llc-0241-236012397' },
  { src: asset('/assets/badges/dot.png'), alt: 'US DOT Licensed Carrier', href: 'https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=3260258' },
];

function FooterBadges() {
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
      {FOOTER_BADGES.map(({ src, alt, href }) => {
        const inner = (
          <div style={{
            background: 'rgba(255,255,255,0.92)',
            borderRadius: 8,
            padding: '6px 8px',
            display: 'inline-flex',
            alignItems: 'center',
          }}>
            <img src={src} alt={alt} style={{ height: 40, width: 'auto', objectFit: 'contain', display: 'block' }} />
          </div>
        );
        return href
          ? <a key={src} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{inner}</a>
          : <span key={src}>{inner}</span>;
      })}
    </div>
  );
}

function FooterCol({ title, links, lines }) {
  return (
    <div>
      <div style={{
        fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: 'var(--ars-cyan)', marginBottom: 18,
      }}>{title}</div>
      {links && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {links.map(([label, href]) => (
            <li key={label}>
              <a href={href} style={{ color: 'var(--cream-80)', textDecoration: 'none', fontSize: 14 }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--ars-cream)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--cream-80)'}
              >{label}</a>
            </li>
          ))}
        </ul>
      )}
      {lines && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {lines.map(({ icon, text, href }) => {
            const node = (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                color: href ? 'var(--cream-80)' : 'var(--cream-56)', fontSize: 14,
              }}>
                <span style={{ color: 'var(--ars-cyan)', display: 'inline-flex' }}>
                  <Icon name={icon} size={15} />
                </span>
                {text}
              </span>
            );
            return (
              <li key={text}>
                {href ? <a href={href} style={{ textDecoration: 'none' }}>{node}</a> : node}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function SiteFooter() {
  const { isMobile, isTablet } = useBreakpoint();
  const gridCols = isMobile ? '1fr 1fr' : isTablet ? '1fr 1fr' : '1.4fr 1fr 1fr 1fr';

  return (
    <footer style={{ background: '#1B2F4D', color: 'var(--ars-cream)', paddingTop: 64, paddingBottom: 32 }}>
      <div className="container">
        {/* Logo + tagline always full-width on mobile */}
        {isMobile && (
          <div style={{ marginBottom: 40 }}>
            <img src={arsLogoDark} alt="ARS Moving" style={{ height: 42, marginBottom: 16 }} />
            <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--cream-80)', marginBottom: 16, maxWidth: 320 }}>
              ARS Moving LLC — locally owned movers in Herndon, Fairfax, and across Northern Virginia since 2014.
            </p>
            <FooterBadges />
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: gridCols,
          gap: isMobile ? 32 : 40,
          marginBottom: 56,
        }}>
          {!isMobile && (
            <div>
              <img src={arsLogoDark} alt="ARS Moving" style={{ height: 42, marginBottom: 20 }} />
              <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--cream-80)', marginBottom: 18, maxWidth: 320 }}>
                ARS Moving LLC — locally owned movers in Herndon, Fairfax, and across Northern Virginia since 2014.
              </p>
              <FooterBadges />
            </div>
          )}

          <FooterCol title="Services" links={[
            ['Local Moving',        '#local'],
            ['Long-Distance Moving', '#long'],
            ['Office Moving',       '#office'],
            ['Piano Moving',        '#piano'],
            ['Packing Services',    '#packing'],
            ['Junk Removal',        '#junk'],
          ]} />

          <FooterCol title="Contact" lines={[
            { icon: 'phone',   text: '866-528-5358',           href: 'tel:8665285358' },
            { icon: 'phone',   text: '703-721-4352 (local)',    href: 'tel:7037214352' },
            { icon: 'mail',    text: 'Movingwithars@gmail.com', href: 'mailto:Movingwithars@gmail.com' },
            { icon: 'clock',   text: 'Mon–Sun, 9am–6pm' },
            { icon: 'map-pin', text: 'Herndon / Fairfax, VA' },
          ]} />

          {!isMobile && (
            <FooterCol title="Follow" lines={[
              { icon: 'thumbs-up',    text: 'Facebook',    href: 'https://facebook.com/profile.php?id=100084163411086' },
              { icon: 'camera',       text: 'Instagram',   href: 'https://instagram.com/arsmovers/' },
              { icon: 'shield-check', text: 'BBB Profile', href: 'https://www.bbb.org/us/va/herndon/profile/moving-companies/ars-movers-llc-0241-236012397' },
              { icon: 'star',         text: 'Yelp',        href: 'https://www.yelp.com/biz/ars-movers-herndon' },
            ]} />
          )}
        </div>

        <hr style={{ border: 0, height: 1, background: 'rgba(243,240,235,.16)', marginBottom: 24 }} />
        <div style={{
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
          fontSize: 13, color: 'var(--cream-56)',
        }}>
          <div>© 2026 ARS Moving LLC. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <span>DOT Licensed · BBB Accredited · Fully Insured</span>
            <a href={`${import.meta.env.BASE_URL}?page=privacy`} style={{ color: 'var(--cream-56)', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--ars-cream)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--cream-56)'}>
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
