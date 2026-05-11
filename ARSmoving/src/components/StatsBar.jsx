import React from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';

const STATS = [
  { value: '10+',    label: 'Years in business' },
  { value: '1,178+', label: 'Successful moves' },
  { value: '4.8★',   label: 'Average rating' },
  { value: 'BBB',    label: 'Accredited since 2014' },
];

export default function StatsBar() {
  const { isMobile } = useBreakpoint();

  return (
    <div style={{
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg)',
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: 0,
      }}>
        {STATS.map((s, i) => (
          <div key={s.label} style={{
            padding: isMobile ? '20px 16px' : '28px 24px',
            borderLeft: isMobile
              ? (i % 2 !== 0 ? '1px solid var(--border)' : 'none')
              : (i > 0 ? '1px solid var(--border)' : 'none'),
            borderTop: isMobile && i >= 2 ? '1px solid var(--border)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}>
            <div style={{
              fontSize: isMobile ? 28 : 'clamp(28px, 3vw, 40px)',
              fontWeight: 800,
              color: 'var(--ars-deep-navy)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>{s.value}</div>
            <div style={{
              fontSize: isMobile ? 11 : 13,
              fontWeight: 500,
              color: 'var(--fg-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
