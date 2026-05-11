import React from 'react';
import { asset } from '../lib/asset';

const PHOTOS = [
  { src: asset('/assets/images/photo2.webp'),   alt: 'ARS mover carrying box down truck ramp' },
  { src: asset('/assets/images/photo6.webp'),   alt: 'ARS crew handling heavy furniture in luxury home' },
  { src: asset('/assets/images/yelp-07.webp'),  alt: 'ARS Moving team in front of truck' },
  { src: asset('/assets/images/yelp-13.webp'),  alt: 'ARS crew carrying sofa up staircase' },
  { src: asset('/assets/images/yelp-17.webp'),  alt: 'ARS Moving team giving thumbs up' },
  { src: asset('/assets/images/yelp-30.webp'),  alt: 'ARS floor protection on staircase' },
];

const TRACK = [...PHOTOS, ...PHOTOS];

export default function PhotoStrip() {
  return (
    <>
      <style>{`
        @keyframes photo-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .photo-strip-track {
          animation: photo-scroll 30s linear infinite;
          will-change: transform;
        }
        .photo-strip-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .photo-strip-track { animation-play-state: paused; }
        }
      `}</style>

      <div style={{
        overflow: 'hidden',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        maskImage:        'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}>
        <div className="photo-strip-track" style={{ display: 'flex', gap: 12, width: 'max-content' }}>
          {TRACK.map(({ src, alt }, i) => (
            <div key={i} style={{ flexShrink: 0, width: 320, height: 220, borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
              <img src={src} alt={alt} loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
