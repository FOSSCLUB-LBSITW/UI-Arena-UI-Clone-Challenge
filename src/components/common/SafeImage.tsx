import { useState, type ImgHTMLAttributes } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  alt: string;
}

/**
 * Renders an <img> that falls back to a secondary URL if the primary
 * source fails, and finally to a styled placeholder if both fail —
 * so a broken image never reaches the page.
 */
export default function SafeImage({ src, fallbackSrc, alt, className = '', ...rest }: Props) {
  const [stage, setStage] = useState<'primary' | 'fallback' | 'placeholder'>('primary');

  if (stage === 'placeholder') {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-surface to-line text-ink-faint ${className}`}
        role="img"
        aria-label={alt}
      >
        <UtensilsCrossed size={24} strokeWidth={1.5} />
      </div>
    );
  }

  const currentSrc = stage === 'fallback' && fallbackSrc ? fallbackSrc : src;

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setStage((s) => (s === 'primary' && fallbackSrc ? 'fallback' : 'placeholder'))}
      {...rest}
    />
  );
}
