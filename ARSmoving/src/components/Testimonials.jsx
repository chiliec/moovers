import React, { useState, useRef, useEffect } from 'react';
import Icon from './Icon';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { asset } from '../lib/asset';

const REVIEWS = [
  {
    name: 'Cynthia S.',
    location: 'Northern Virginia',
    service: 'Repeat customer — 10 moves',
    stars: 5, source: 'BBB',
    text: "They have moved me 7 times, my mom twice and my niece once. Always on time and professional. I couldn't ask for a better group of guys!! Our family will continue to call them for our moving needs.",
  },
  {
    name: 'Jessica A.',
    location: 'Northern Virginia',
    service: 'Local move',
    stars: 5, source: 'BBB',
    text: "After a nightmare move where a nationwide company charged me nearly double, I was very careful this time. ARS delivered on every promise — flat rate, no hidden fees. Crew chief Dima called 40 minutes before arrival, right on schedule. Nothing was damaged, and the whole process was smooth and stress-free.",
  },
  {
    name: 'Ashley J.',
    location: 'Silver Spring, MD',
    service: 'Local move',
    stars: 5, source: 'Yelp',
    text: "ARS Moving are the quickest movers I've ever worked with. Dima, Vitalii, and Medet were very professional and handled our items with care. I would highly recommend their services!",
  },
  {
    name: 'Robert D.',
    location: 'Northern Virginia',
    service: 'Local & long-distance',
    stars: 5, source: 'BBB',
    text: "This was the third time I used ARS Movers, from small apartment moves to long distance. I have never used any other moving company. The guys did an excellent job — courteous and polite, didn't stop all day long until the job was done. Nothing was broken or damaged.",
  },
  {
    name: 'Louise R.',
    location: 'Northern Virginia',
    service: '5-bedroom house move',
    stars: 5, source: 'BBB',
    text: "Within 30 minutes of calling, the owner came out to provide an estimate for our five bedroom house. Rates are very reasonable. The day of the move the crew was friendly, professional, and respectful of our belongings. The owner stopped by to make sure everything was going well.",
  },
  {
    name: 'Wayne D.',
    location: 'Northern Virginia',
    service: 'Local move',
    stars: 5, source: 'BBB',
    text: "True to their online estimate, costs were as expected. These are high quality, careful, quick and hard working movers. Excellent communication throughout. I highly recommend ARS Movers — we are very happy with their services.",
  },
  {
    name: 'Josh O.',
    location: 'Kiel, WI',
    service: 'Cross-town move',
    stars: 5, source: 'Yelp',
    text: "Hired for a cross-town move with a pit stop to pick up some furniture. They were efficient and professional. Highly recommend!",
  },
  {
    name: 'Jodi S.',
    location: 'Northern Virginia',
    service: 'Full-service move',
    stars: 5, source: 'BBB',
    text: "The move was perfect. The team was on time, extremely professional, took great care of all of my belongings. I would highly recommend this company again and again! A+",
  },
];

const SOURCE_STYLE = {
  BBB:  { bg: '#E8F0FB', color: '#1B3A6B' },
  Yelp: { bg: '#FEF0EE', color: '#C1281C' },
};

const GAP = 20;

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <Icon key={i} name="star" size={14} style={{ fill: '#F5A623', color: '#F5A623' }} />
      ))}
    </div>
  );
}

function ReviewCard({ name, location, service, stars, text, source }) {
  const s = SOURCE_STYLE[source];
  return (
    <div style={{
      background: 'var(--bg)', border: '1px solid var(--border)',
      borderRadius: 'var(--r-lg)', padding: '24px 24px 20px',
      boxShadow: 'var(--shadow-1)', display: 'flex', flexDirection: 'column', gap: 14, height: '100%',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Stars count={stars} />
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
          padding: '3px 8px', borderRadius: 'var(--r-pill)', background: s.bg, color: s.color,
        }}>{source}</span>
      </div>
      <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--fg)', margin: 0, flex: 1, fontStyle: 'italic' }}>
        "{text}"
      </p>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--ars-deep-navy)' }}>{name}</div>
        <div style={{ fontSize: 11, color: 'var(--fg-quiet)', marginTop: 2 }}>{location} · {service}</div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { isMobile, isTablet } = useBreakpoint();
  const visible = isMobile ? 1 : isTablet ? 2 : 3;
  const maxIdx = REVIEWS.length - visible;

  const [idx, setIdx] = useState(0);
  const containerRef = useRef(null);
  const [containerW, setContainerW] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartX = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerW(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setIdx(i => Math.min(i, Math.max(0, REVIEWS.length - visible)));
  }, [visible]);

  const cardW = containerW > 0 ? (containerW - (visible - 1) * GAP) / visible : 0;
  const translateX = cardW ? -idx * (cardW + GAP) : 0;

  const prev = () => setIdx(i => Math.max(0, i - 1));
  const next = () => setIdx(i => Math.min(maxIdx, i + 1));
  const goTo = (i) => setIdx(i);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchMove  = (e) => {
    if (touchStartX.current === null) return;
    setDragOffset(e.touches[0].clientX - touchStartX.current);
  };
  const onTouchEnd   = () => {
    if (dragOffset < -50) next();
    else if (dragOffset > 50) prev();
    setDragOffset(0);
    touchStartX.current = null;
  };

  return (
    <section id="reviews" className="section">
      <div className="container">

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
          <div style={{ maxWidth: 480 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>What clients say</div>
            <h2 className="h2">Real moves. Real feedback.</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={prev} disabled={idx === 0} aria-label="Previous review" style={{
                width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--border)',
                background: 'var(--bg)', color: idx === 0 ? 'var(--fg-quiet)' : 'var(--ars-deep-navy)',
                cursor: idx === 0 ? 'default' : 'pointer', opacity: idx === 0 ? 0.4 : 1,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 200ms',
              }}>
                <Icon name="chevron-left" size={18} />
              </button>
              <button onClick={next} disabled={idx >= maxIdx} aria-label="Next review" style={{
                width: 40, height: 40, borderRadius: '50%', border: 'none',
                background: idx >= maxIdx ? 'var(--border)' : 'var(--ars-deep-navy)',
                color: idx >= maxIdx ? 'var(--fg-quiet)' : '#fff',
                cursor: idx >= maxIdx ? 'default' : 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'background 200ms',
              }}>
                <Icon name="chevron-right" size={18} />
              </button>
            </div>
            <a href="https://www.yelp.com/biz/ars-movers-herndon" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 14, fontWeight: 600, color: 'var(--ars-deep-navy)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              All 194 reviews <Icon name="arrow-right" size={13} />
            </a>
          </div>
        </div>

        {/* Slider track */}
        <div
          ref={containerRef}
          style={{ overflow: 'hidden', touchAction: 'pan-y' }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div style={{
            display: 'flex', gap: GAP,
            transform: `translateX(${translateX + dragOffset}px)`,
            transition: dragOffset !== 0 ? 'none' : 'transform 380ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            alignItems: 'stretch',
          }}>
            {REVIEWS.map(r => (
              <div key={r.name} style={{ flex: `0 0 ${cardW || 300}px`, minWidth: 0 }}>
                <ReviewCard {...r} />
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 20 }}>
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Go to review ${i + 1}`} style={{
              width: i === idx ? 22 : 8, height: 8, borderRadius: 4,
              border: 'none', padding: 0, cursor: 'pointer',
              background: i === idx ? 'var(--ars-deep-navy)' : 'var(--border-strong)',
              transition: 'all 260ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }} />
          ))}
        </div>

        {/* Aggregate trust row */}
        <div style={{
          marginTop: 40, padding: '18px 24px',
          background: 'var(--ars-cream-2)', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', rowGap: 4 }}>
            <Stars count={5} />
            <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--ars-deep-navy)' }}>5.0 Google · 335 reviews</span>
            <span style={{ color: 'var(--border-strong)' }}>·</span>
            <span style={{ fontSize: 14, color: 'var(--fg-muted)', fontWeight: 600 }}>4.7 Yelp · 194 reviews</span>
            <span style={{ color: 'var(--border-strong)' }}>·</span>
            <span style={{ fontSize: 14, color: 'var(--fg-muted)', fontWeight: 600 }}>5.0 BBB</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            {[
              { src: asset('/assets/badges/bbb.png'),        alt: 'BBB A+ Accredited', href: 'https://www.bbb.org/us/va/herndon/profile/moving-companies/ars-movers-llc-0241-236012397' },
              { src: asset('/assets/badges/dot.png'),        alt: 'US DOT Licensed',   href: 'https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=3260258' },
              { src: asset('/assets/badges/angieslist.png'), alt: "Angie's List 2018" },
              { src: asset('/assets/badges/yelp.png'),       alt: 'People Love Us on Yelp', href: 'https://www.yelp.com/biz/ars-movers-herndon' },
            ].map(({ src, alt, href }) => {
              const img = <img key={src} src={src} alt={alt} style={{ height: 44, width: 'auto', objectFit: 'contain', display: 'block' }} />;
              return href
                ? <a key={src} href={href} target="_blank" rel="noopener noreferrer">{img}</a>
                : img;
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
