import React, { useState } from 'react';
import Icon from './Icon';
import { useBreakpoint } from '../hooks/useBreakpoint';

const FAQS = [
  { q: 'Why hire professional movers instead of doing it myself?',
    a: "Renting a truck and wrangling friends sounds cheap until someone drops a couch on the stairs or a mirror doesn't survive the trip. A professional crew brings the right equipment, knows how to pack a truck to prevent shifting, and moves faster than DIY teams by a significant margin. For most moves, the cost difference is smaller than people expect." },
  { q: 'How far in advance should I book my move?',
    a: "For local moves, 2–3 weeks ahead is typically enough. For long-distance moves, aim for 4–6 weeks minimum — especially if you're moving in summer (May–August), which is peak season. The earlier you book, the more flexibility you have on date and time." },
  { q: 'Do I need to be home during the move?',
    a: "You need to be present at the start to walk us through what's going, and at the end to confirm everything arrived correctly. You don't need to supervise every box in between — that's what we're there for." },
  { q: 'Can I pack my own belongings?',
    a: "Yes. Many clients pack boxes themselves and have us handle the heavy furniture. Just note: if items you packed are damaged in transit, coverage is limited. If you want full protection, our packing service is worth considering for fragile or valuable items." },
  { q: 'How is the price calculated?',
    a: "Local moves are typically priced by the hour (number of movers + truck size). Long-distance moves are quoted by weight or volume plus distance. We give you a clear estimate before the move date — no guessing on moving day." },
  { q: 'Do you move specialty items like pianos or antiques?',
    a: "Yes. Pianos require specific rigging equipment and technique — we handle uprights, grands, and digital stages. For antiques or high-value items, let us know in advance so we bring the appropriate materials and take extra time where it counts." },
];

function FAQItem({ q, a, open, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button onClick={onToggle} style={{
        display: 'flex', alignItems: 'center', gap: 16, width: '100%',
        padding: '24px 0', background: 'none', border: 0,
        fontFamily: 'var(--font-sans)', fontSize: 19, fontWeight: 600,
        color: 'var(--ars-deep-navy)', textAlign: 'left', cursor: 'pointer',
      }}>
        <span style={{ flex: 1 }}>{q}</span>
        <span style={{
          width: 32, height: 32, borderRadius: '50%',
          background: open ? 'var(--ars-cyan)' : 'rgba(48,165,216,.12)',
          color: open ? 'var(--ars-cream)' : 'var(--ars-cyan)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'all 150ms var(--ease)',
        }}>
          <Icon name={open ? 'minus' : 'plus'} size={16} />
        </span>
      </button>
      <div style={{ maxHeight: open ? 400 : 0, overflow: 'hidden', transition: 'max-height 240ms var(--ease)' }}>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg-muted)', margin: 0, paddingBottom: 24, maxWidth: '78ch' }}>{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);
  const { isMobile } = useBreakpoint();

  return (
    <section id="faq" className="section">
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr',
        gap: isMobile ? 32 : 56,
      }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>FAQ</div>
          <h2 className="h2">Common questions before your move.</h2>
          <p className="lead" style={{ marginTop: 16 }}>
            Don't see yours? Call us at{' '}
            <a href="tel:8665285358" style={{ color: 'var(--ars-deep-navy)', fontWeight: 600 }}>866-528-5358</a>{' '}
            — Mon–Sun, 9am–6pm.
          </p>
        </div>
        <div>
          {FAQS.map((f, i) => (
            <FAQItem key={f.q} {...f}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
