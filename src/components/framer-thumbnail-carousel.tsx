'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  animate,
} from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface CarouselItem {
  id: number;
  url: string;
  title: string;
  description?: string;
}

export interface ThumbnailCarouselProps {
  items: CarouselItem[];
  className?: string;
  title?: string;
  subtitle?: string;
  height?: string;
}

const FULL_WIDTH_PX = 120;
const COLLAPSED_WIDTH_PX = 40;
const GAP_PX = 4;
const MARGIN_PX = 4;

export function ThumbnailCarousel({
  items,
  className,
  title,
  subtitle,
  height = "400px"
}: ThumbnailCarouselProps) {
  const [index, setIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);

  useEffect(() => {
    if (!isDragging && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      const targetX = -index * containerWidth;

      animate(x, targetX, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      });
    }
  }, [index, x, isDragging]);

  const currentItem = items[index];

  return (
    <section className={cn("w-full py-16 md:py-24", className)}>
      <div className="container mx-auto max-w-4xl px-4">
        {/* Section Header */}
        {(title || subtitle) && (
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {title && (
              <h2 className="font-heading text-2xl md:text-3xl text-[var(--empc-text)] mb-3">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-[var(--empc-text)]/60 max-w-xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        <div className='flex flex-col gap-4'>
          {/* Main Carousel */}
          <div
            className='relative overflow-hidden rounded-[2rem] shadow-xl bg-[var(--empc-sage)]/10'
            ref={containerRef}
          >
            <motion.div
              className='flex'
              drag='x'
              dragElastic={0.2}
              dragMomentum={false}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(e, info) => {
                setIsDragging(false);
                const containerWidth = containerRef.current?.offsetWidth || 1;
                const offset = info.offset.x;
                const velocity = info.velocity.x;

                let newIndex = index;

                if (Math.abs(velocity) > 500) {
                  newIndex = velocity > 0 ? index - 1 : index + 1;
                } else if (Math.abs(offset) > containerWidth * 0.3) {
                  newIndex = offset > 0 ? index - 1 : index + 1;
                }

                newIndex = Math.max(0, Math.min(items.length - 1, newIndex));
                setIndex(newIndex);
              }}
              style={{ x }}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  className='shrink-0 w-full relative'
                  style={{ height }}
                >
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    className='object-cover select-none pointer-events-none'
                    draggable={false}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--empc-primary-dark)]/60 via-transparent to-transparent" />

                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-heading text-xl text-white mb-1">{item.title}</h3>
                    {item.description && (
                      <p className="text-white/80 text-sm">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Navigation Buttons */}
            <motion.button
              disabled={index === 0}
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all z-10",
                index === 0
                  ? 'opacity-40 cursor-not-allowed bg-white/50'
                  : 'bg-white hover:scale-110 hover:bg-[var(--empc-cream)] cursor-pointer'
              )}
              whileHover={index !== 0 ? { scale: 1.1 } : undefined}
              whileTap={index !== 0 ? { scale: 0.95 } : undefined}
            >
              <svg
                className='w-6 h-6 text-[var(--empc-primary)]'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </motion.button>

            <motion.button
              disabled={index === items.length - 1}
              onClick={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all z-10",
                index === items.length - 1
                  ? 'opacity-40 cursor-not-allowed bg-white/50'
                  : 'bg-white hover:scale-110 hover:bg-[var(--empc-cream)] cursor-pointer'
              )}
              whileHover={index !== items.length - 1 ? { scale: 1.1 } : undefined}
              whileTap={index !== items.length - 1 ? { scale: 0.95 } : undefined}
            >
              <svg
                className='w-6 h-6 text-[var(--empc-primary)]'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </motion.button>

            {/* Counter */}
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-sm font-medium text-[var(--empc-primary)]">
              {index + 1} / {items.length}
            </div>
          </div>

          {/* Thumbnails */}
          <Thumbnails items={items} index={index} setIndex={setIndex} />
        </div>
      </div>
    </section>
  );
}

function Thumbnails({
  items,
  index,
  setIndex,
}: {
  items: CarouselItem[];
  index: number;
  setIndex: (index: number) => void;
}) {
  const thumbnailsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (thumbnailsRef.current) {
      let scrollPosition = 0;
      for (let i = 0; i < index; i++) {
        scrollPosition += COLLAPSED_WIDTH_PX + GAP_PX;
      }

      scrollPosition += MARGIN_PX;

      const containerWidth = thumbnailsRef.current.offsetWidth;
      const centerOffset = containerWidth / 2 - FULL_WIDTH_PX / 2;
      scrollPosition -= centerOffset;

      thumbnailsRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [index]);

  return (
    <div
      ref={thumbnailsRef}
      className='overflow-x-auto scrollbar-hide'
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div className='flex gap-1 h-20 pb-2' style={{ width: 'fit-content' }}>
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            onClick={() => setIndex(i)}
            initial={false}
            animate={i === index ? 'active' : 'inactive'}
            variants={{
              active: {
                width: FULL_WIDTH_PX,
                marginLeft: MARGIN_PX,
                marginRight: MARGIN_PX,
              },
              inactive: {
                width: COLLAPSED_WIDTH_PX,
                marginLeft: 0,
                marginRight: 0,
              },
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={cn(
              'relative shrink-0 h-full overflow-hidden rounded-lg cursor-pointer',
              i === index
                ? 'ring-2 ring-[var(--empc-primary)] ring-offset-2'
                : 'opacity-60 hover:opacity-100'
            )}
          >
            <Image
              src={item.url}
              alt={item.title}
              fill
              className='object-cover pointer-events-none select-none'
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
