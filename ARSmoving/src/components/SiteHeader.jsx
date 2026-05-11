import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import { useBreakpoint } from '../hooks/useBreakpoint';
import arsLogo from '/assets/ars-logo.svg';

const NAV_ITEMS = [
  { label: 'Services', href: '#services' },
  { label: 'Why ARS',  href: '#why' },
  { label: 'About',    href: '#about' },
  { label: 'FAQ',      href: '#faq' },
  { label: 'Contact',  href: '#contact' },
];

export default function SiteHeader({ onCTA }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();
  const isCompact = isMobile || isTablet;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isCompact) setMenuOpen(false);
  }, [isCompact]);

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: scrolled || menuOpen ? 'rgba(243,240,235,0.95)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled || menuOpen ? 'blur(14px)' : 'none',
        borderBottom: scrolled || menuOpen ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 240ms var(--ease), border-color 240ms var(--ease)',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', height: 72 }}>
          <a href="#" style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
            <img src={arsLogo} alt="ARS Moving" style={{ height: 36, width: 'auto', display: 'block' }} />
          </a>

          {!isCompact && (
            <nav style={{ display: 'flex', gap: 28, flex: 1, justifyContent: 'center' }}>
              {NAV_ITEMS.map(n => (
                <a key={n.href} href={n.href} style={{
                  color: 'var(--ars-deep-navy)', textDecoration: 'none',
                  fontSize: 12, fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>{n.label}</a>
              ))}
            </nav>
          )}

          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginLeft: isCompact ? 'auto' : 0, flexShrink: 0 }}>
            <a href="tel:8665285358" aria-label="Call ARS Moving" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 44, height: 44, borderRadius: 'var(--r-lg)',
              border: '1.5px solid var(--ars-deep-navy)', color: 'var(--ars-deep-navy)',
              transition: 'background 150ms var(--ease), color 150ms var(--ease)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--ars-deep-navy)'; e.currentTarget.style.color = 'var(--ars-cream)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ars-deep-navy)'; }}
            >
              <Icon name="phone" size={18} />
            </a>

            {!isCompact && (
              <button className="btn btn--primary" onClick={onCTA} style={{ height: 44, padding: '0 18px' }}>
                Get my free quote
              </button>
            )}

            {isCompact && (
              <button
                onClick={() => setMenuOpen(o => !o)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 44, height: 44, borderRadius: 'var(--r-lg)',
                  border: '1.5px solid var(--ars-deep-navy)', color: 'var(--ars-deep-navy)',
                  background: 'transparent', cursor: 'pointer',
                }}
              >
                <Icon name={menuOpen ? 'x' : 'menu'} size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isCompact && menuOpen && (
          <div style={{
            borderTop: '1px solid var(--border)',
            padding: '16px 0 24px',
            background: 'rgba(243,240,235,0.98)',
          }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {NAV_ITEMS.map(n => (
                <a key={n.href} href={n.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    color: 'var(--ars-deep-navy)', textDecoration: 'none',
                    fontSize: 12, fontWeight: 600,
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    padding: '14px 0',
                    borderBottom: '1px solid var(--border)',
                  }}
                >{n.label}</a>
              ))}
              <button className="btn btn--primary" onClick={() => { setMenuOpen(false); onCTA(); }}
                style={{ marginTop: 16, width: '100%' }}>
                Get my free quote
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
