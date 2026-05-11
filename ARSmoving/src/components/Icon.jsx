import * as Icons from 'lucide-react';

const toPascalCase = (str) =>
  str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');

export default function Icon({ name, size = 20, strokeWidth = 1.75, style, className }) {
  const LucideIcon = Icons[toPascalCase(name)];
  if (!LucideIcon) return null;
  return <LucideIcon size={size} strokeWidth={strokeWidth} style={style} className={className} />;
}

export function ImageSlot({ label, ratio = '16/9', style }) {
  return (
    <div style={{
      aspectRatio: ratio,
      background: 'linear-gradient(135deg, #DFD9CF 0%, #ECE8E1 100%)',
      border: '1px dashed rgba(32,30,31,.24)',
      borderRadius: 'var(--r-lg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'rgba(32,30,31,.56)',
      fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
      ...style,
    }}>
      <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
        <Icon name="image" size={16} /> {label || 'Photo'}
      </span>
    </div>
  );
}
