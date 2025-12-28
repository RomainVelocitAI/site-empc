'use client';

import { cn } from '@/lib/utils';

export type DividerVariant =
  | 'diagonal-up'
  | 'diagonal-down'
  | 'wave'
  | 'curve'
  | 'curve-reverse'
  | 'corner-left'
  | 'corner-right';

export interface SectionDividerProps {
  variant?: DividerVariant;
  color?: string;
  className?: string;
  flip?: boolean;
  height?: number;
}

export function SectionDivider({
  variant = 'diagonal-down',
  color = 'var(--empc-background)',
  className,
  flip = false,
  height = 80,
}: SectionDividerProps) {
  const getPath = () => {
    switch (variant) {
      case 'diagonal-up':
        return 'M0,100 L1440,0 L1440,100 L0,100 Z';
      case 'diagonal-down':
        return 'M0,0 L1440,100 L1440,100 L0,100 Z';
      case 'wave':
        return 'M0,50 C360,100 720,0 1080,50 C1260,75 1350,100 1440,80 L1440,100 L0,100 Z';
      case 'curve':
        return 'M0,100 Q720,0 1440,100 L1440,100 L0,100 Z';
      case 'curve-reverse':
        return 'M0,0 Q720,100 1440,0 L1440,100 L0,100 Z';
      case 'corner-left':
        return 'M0,0 L0,100 L1440,100 L1440,0 Q1200,0 1000,100 L0,100 Z';
      case 'corner-right':
        return 'M0,0 L1440,0 L1440,100 L0,100 Q240,0 440,100 Z';
      default:
        return 'M0,0 L1440,100 L1440,100 L0,100 Z';
    }
  };

  return (
    <div
      className={cn(
        "w-full overflow-hidden pointer-events-none select-none",
        flip && "rotate-180",
        className
      )}
      style={{ height: `${height}px`, marginTop: `-${height}px` }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-full"
        style={{ display: 'block' }}
      >
        <path
          d={getPath()}
          fill={color}
        />
      </svg>
    </div>
  );
}

// Composant wrapper pour une section avec séparateur intégré
export interface AsymmetricSectionProps {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
  topDivider?: DividerVariant;
  bottomDivider?: DividerVariant;
  topDividerColor?: string;
  bottomDividerColor?: string;
  dividerHeight?: number;
  id?: string;
}

export function AsymmetricSection({
  children,
  className,
  bgColor = 'var(--empc-background)',
  topDivider,
  bottomDivider,
  topDividerColor,
  bottomDividerColor,
  dividerHeight = 80,
  id,
}: AsymmetricSectionProps) {
  return (
    <section
      id={id}
      className={cn("relative", className)}
      style={{ backgroundColor: bgColor }}
    >
      {topDivider && (
        <div
          className="absolute top-0 left-0 right-0 z-10"
          style={{ transform: 'translateY(-100%)' }}
        >
          <SectionDivider
            variant={topDivider}
            color={bgColor}
            height={dividerHeight}
            className="!mt-0"
          />
        </div>
      )}

      {children}

      {bottomDivider && (
        <div className="absolute bottom-0 left-0 right-0 z-10" style={{ transform: 'translateY(100%) rotate(180deg)' }}>
          <SectionDivider
            variant={bottomDivider}
            color={bottomDividerColor || bgColor}
            height={dividerHeight}
            className="!mt-0"
          />
        </div>
      )}
    </section>
  );
}

// Composant de séparation décorative entre deux sections
export interface SectionTransitionProps {
  topColor?: string;
  bottomColor?: string;
  variant?: DividerVariant;
  height?: number;
  className?: string;
}

export function SectionTransition({
  topColor = 'var(--empc-background)',
  bottomColor = 'var(--empc-cream)',
  variant = 'diagonal-down',
  height = 100,
  className,
}: SectionTransitionProps) {
  const getTransitionPath = () => {
    switch (variant) {
      case 'diagonal-up':
        return {
          top: 'M0,100 L1440,0 L1440,100 L0,100 Z',
          bottom: 'M0,0 L1440,100 L0,100 Z'
        };
      case 'diagonal-down':
        return {
          top: 'M0,0 L1440,100 L0,100 Z',
          bottom: 'M0,0 L1440,0 L1440,100 Z'
        };
      case 'wave':
        return {
          top: 'M0,30 C360,80 720,0 1080,50 C1260,70 1350,90 1440,70 L1440,100 L0,100 Z',
          bottom: 'M0,0 C360,50 720,100 1080,50 C1260,30 1350,10 1440,30 L1440,100 L0,100 Z'
        };
      case 'curve':
        return {
          top: 'M0,100 Q720,0 1440,100 L1440,100 L0,100 Z',
          bottom: 'M0,0 Q720,100 1440,0 L0,0 Z'
        };
      case 'curve-reverse':
        return {
          top: 'M0,0 Q720,100 1440,0 L1440,100 L0,100 Z',
          bottom: 'M0,100 Q720,0 1440,100 L0,0 Z'
        };
      default:
        return {
          top: 'M0,0 L1440,100 L0,100 Z',
          bottom: 'M0,0 L1440,0 L1440,100 Z'
        };
    }
  };

  const paths = getTransitionPath();

  return (
    <div
      className={cn("w-full relative overflow-hidden", className)}
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <path d={paths.top} fill={topColor} />
        <path d={paths.bottom} fill={bottomColor} />
      </svg>
    </div>
  );
}

// Liseré décoratif - ligne colorée fine pour accentuer les séparations
export interface AccentLineProps {
  color?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  thickness?: number;
  className?: string;
  variant?: 'straight' | 'diagonal' | 'curved';
  offset?: string;
}

export function AccentLine({
  color = 'var(--empc-gold)',
  position = 'bottom',
  thickness = 3,
  className,
  variant = 'straight',
  offset = '0',
}: AccentLineProps) {
  const positionStyles: Record<string, React.CSSProperties> = {
    top: {
      position: 'absolute',
      top: offset,
      left: 0,
      right: 0,
      height: `${thickness}px`,
    },
    bottom: {
      position: 'absolute',
      bottom: offset,
      left: 0,
      right: 0,
      height: `${thickness}px`,
    },
    left: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: offset,
      width: `${thickness}px`,
    },
    right: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: offset,
      width: `${thickness}px`,
    },
  };

  if (variant === 'diagonal') {
    return (
      <div
        className={cn("pointer-events-none select-none z-20", className)}
        style={{
          ...positionStyles[position],
          transform: position === 'top' || position === 'bottom' ? 'rotate(-2deg)' : 'rotate(2deg)',
          backgroundColor: color,
        }}
        aria-hidden="true"
      />
    );
  }

  if (variant === 'curved') {
    const isHorizontal = position === 'top' || position === 'bottom';
    return (
      <svg
        className={cn("pointer-events-none select-none z-20", className)}
        style={{
          position: 'absolute',
          ...(position === 'top' && { top: offset, left: 0, right: 0 }),
          ...(position === 'bottom' && { bottom: offset, left: 0, right: 0 }),
          ...(position === 'left' && { left: offset, top: 0, bottom: 0 }),
          ...(position === 'right' && { right: offset, top: 0, bottom: 0 }),
          width: isHorizontal ? '100%' : `${thickness}px`,
          height: isHorizontal ? `${thickness + 20}px` : '100%',
        }}
        viewBox={isHorizontal ? "0 0 1440 20" : "0 0 20 100"}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {isHorizontal ? (
          <path
            d="M0,10 Q360,0 720,10 T1440,10"
            stroke={color}
            strokeWidth={thickness}
            fill="none"
          />
        ) : (
          <path
            d="M10,0 Q0,25 10,50 T10,100"
            stroke={color}
            strokeWidth={thickness}
            fill="none"
          />
        )}
      </svg>
    );
  }

  return (
    <div
      className={cn("pointer-events-none select-none z-20", className)}
      style={{
        ...positionStyles[position],
        backgroundColor: color,
      }}
      aria-hidden="true"
    />
  );
}

// Section avec liseré intégré - wrapper pratique
export interface SectionWithAccentProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
  accentPosition?: 'top' | 'bottom' | 'left' | 'right';
  accentVariant?: 'straight' | 'diagonal' | 'curved';
  accentThickness?: number;
  accentOffset?: string;
}

export function SectionWithAccent({
  children,
  className,
  accentColor = 'var(--empc-gold)',
  accentPosition = 'top',
  accentVariant = 'straight',
  accentThickness = 3,
  accentOffset = '0',
}: SectionWithAccentProps) {
  return (
    <div className={cn("relative", className)}>
      <AccentLine
        color={accentColor}
        position={accentPosition}
        variant={accentVariant}
        thickness={accentThickness}
        offset={accentOffset}
      />
      {children}
    </div>
  );
}

export default SectionDivider;
