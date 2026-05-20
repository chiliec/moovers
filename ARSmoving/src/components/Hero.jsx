import React from 'react';
import Icon from './Icon';
import ChatQuoteAssistant from './ChatQuoteAssistant';
import { useBreakpoint } from '../hooks/useBreakpoint';

function TrustBar({ items, dark = false }) {
  const list = items || [
    'DOT Licensed', 'BBB Accredited', "Angie's List Verified", 'Yelp Rated',
  ];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
      {list.map(label => (
        <span key={label} className="trust-badge" style={dark ? {
          background: 'rgba(243,240,235,.08)', color: 'var(--ars-cream)',
          border: '1px solid rgba(243,240,235,.16)',
        } : {}}>
          <span className="dot" /> {label}
        </span>
      ))}
    </div>
  );
}

export default function Hero({ onCTA }) {
  const { isMobile, isTablet } = useBreakpoint();
  const isCompact = isMobile || isTablet;

  return (
    <section style={{ paddingTop: isMobile ? 40 : 56, paddingBottom: isMobile ? 48 : 80 }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: isCompact ? '1fr' : '1.1fr 1fr',
        gap: isCompact ? 40 : 56,
        alignItems: 'center',
      }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 18 }}>Northern Virginia · Since 2014</div>
          <h1 className="h1" style={{ marginBottom: 22 }}>
            Northern Virginia's movers you can{' '}
            <span style={{ color: 'var(--ars-cyan)' }}>actually</span> count on.
          </h1>
          <p className="lead" style={{ marginBottom: 32 }}>
            Local, long-distance, office, and specialty moves — handled by a DOT-licensed,
            BBB-accredited team with 10 years on the road.
          </p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 36, flexWrap: 'wrap' }}>
            <button className="btn btn--primary" onClick={onCTA}
              style={isMobile ? { width: '100%' } : {}}>
              Get my free quote
            </button>
          </div>
          <TrustBar />
        </div>
        <div id="moving-assistant" style={{ display: 'flex', justifyContent: isCompact ? 'stretch' : 'flex-end' }}>
          <ChatQuoteAssistant />
        </div>
      </div>
    </section>
  );
}
