'use client';

import { useState, useCallback } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * OptimizedImage - Composant d'image optimisé pour EMPC
 *
 * Features:
 * - Blur placeholder élégant avec dégradé EMPC
 * - Animation de révélation fluide au chargement
 * - Support responsive automatique
 * - Gestion des erreurs avec fallback gracieux
 * - Overlay optionnel pour les images hero
 */

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  /** Style de conteneur: default, portrait, hero, card, circle */
  variant?: 'default' | 'portrait' | 'hero' | 'card' | 'circle';
  /** Affiche un overlay gradient (pour images hero) */
  overlay?: 'none' | 'bottom' | 'dark' | 'primary';
  /** Texte alternatif en français pour accessibilité */
  altFr?: string;
  /** Classes CSS additionnelles pour le conteneur */
  containerClassName?: string;
  /** Animation au survol */
  hoverEffect?: 'none' | 'zoom' | 'lift' | 'glow';
  /** Aspect ratio prédéfini */
  aspectRatio?: '1:1' | '4:3' | '3:4' | '16:9' | '21:9' | 'auto';
}

// Styles de variantes
const variantStyles: Record<string, string> = {
  default: 'rounded-2xl overflow-hidden',
  portrait: 'rounded-[2rem] overflow-hidden shadow-xl',
  hero: 'rounded-none overflow-hidden',
  card: 'rounded-3xl overflow-hidden shadow-lg',
  circle: 'rounded-full overflow-hidden',
};

// Styles d'aspect ratio
const aspectStyles: Record<string, string> = {
  '1:1': 'aspect-square',
  '4:3': 'aspect-[4/3]',
  '3:4': 'aspect-[3/4]',
  '16:9': 'aspect-video',
  '21:9': 'aspect-[21/9]',
  'auto': '',
};

// Overlays
const overlayStyles: Record<string, string> = {
  none: '',
  bottom: 'before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/50 before:via-black/20 before:to-transparent before:z-10',
  dark: 'before:absolute before:inset-0 before:bg-black/40 before:z-10',
  primary: 'before:absolute before:inset-0 before:bg-gradient-to-t before:from-[var(--empc-primary)]/30 before:via-transparent before:to-transparent before:z-10',
};

// Effets au survol
const hoverEffects = {
  none: undefined,
  zoom: { scale: 1.05 },
  lift: { y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.15)' },
  glow: { boxShadow: '0 0 40px rgba(92, 107, 74, 0.4)' },
} as const;

// Placeholder SVG élégant aux couleurs EMPC
const generatePlaceholderDataUrl = (width: number = 400, height: number = 300): string => {
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="empcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#9CAF88;stop-opacity:0.3" />
          <stop offset="50%" style="stop-color:#5C6B4A;stop-opacity:0.2" />
          <stop offset="100%" style="stop-color:#8B7355;stop-opacity:0.3" />
        </linearGradient>
        <filter id="blur">
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#empcGrad)"/>
      <circle cx="${width * 0.3}" cy="${height * 0.4}" r="${Math.min(width, height) * 0.15}" fill="#5C6B4A" opacity="0.1" filter="url(#blur)"/>
      <circle cx="${width * 0.7}" cy="${height * 0.6}" r="${Math.min(width, height) * 0.2}" fill="#993366" opacity="0.08" filter="url(#blur)"/>
      <circle cx="${width * 0.5}" cy="${height * 0.8}" r="${Math.min(width, height) * 0.1}" fill="#8B7355" opacity="0.12" filter="url(#blur)"/>
    </svg>
  `;
  return `data:image/svg+xml,${encodeURIComponent(svg.replace(/\s+/g, ' ').trim())}`;
};

// Fallback SVG pour erreurs de chargement
const FallbackImage = ({ width, height }: { width: number; height: number }) => (
  <div
    className="w-full h-full flex items-center justify-center"
    style={{
      background: 'linear-gradient(135deg, var(--empc-sage) 0%, var(--empc-cream) 50%, var(--empc-gold-light) 100%)',
      opacity: 0.5,
    }}
  >
    <svg
      width={Math.min(width, height) * 0.3}
      height={Math.min(width, height) * 0.3}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className="text-[var(--empc-primary)] opacity-40"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  </div>
);

export default function OptimizedImage({
  src,
  alt,
  altFr,
  variant = 'default',
  overlay = 'none',
  containerClassName = '',
  hoverEffect = 'none',
  aspectRatio = 'auto',
  fill,
  width,
  height,
  priority = false,
  className = '',
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  // Calculer les dimensions pour le placeholder
  const placeholderWidth = typeof width === 'number' ? width : 800;
  const placeholderHeight = typeof height === 'number' ? height : 600;

  // Texte alternatif français ou anglais
  const finalAlt = altFr || alt;

  return (
    <motion.div
      className={`relative ${variantStyles[variant]} ${aspectStyles[aspectRatio]} ${overlayStyles[overlay]} ${containerClassName}`}
      whileHover={hoverEffects[hoverEffect]}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Placeholder animé */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div
              className="w-full h-full animate-pulse"
              style={{
                backgroundImage: `url("${generatePlaceholderDataUrl(placeholderWidth, placeholderHeight)}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image ou Fallback */}
      {hasError ? (
        <FallbackImage width={placeholderWidth} height={placeholderHeight} />
      ) : (
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{
            opacity: isLoaded ? 1 : 0,
            scale: isLoaded ? 1 : 1.02
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={src}
            alt={finalAlt}
            fill={fill}
            width={!fill ? width : undefined}
            height={!fill ? height : undefined}
            priority={priority}
            onLoad={handleLoad}
            onError={handleError}
            className={`object-cover ${className}`}
            sizes={fill ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : undefined}
            placeholder="blur"
            blurDataURL={generatePlaceholderDataUrl(placeholderWidth, placeholderHeight)}
            {...props}
          />
        </motion.div>
      )}
    </motion.div>
  );
}

// Export des utilitaires pour usage externe
export { generatePlaceholderDataUrl };
