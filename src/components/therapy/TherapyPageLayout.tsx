'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Layout } from '@/components/layout';
import { FAQSection, FAQItem } from '@/components/faq-sections';
import { SectionDivider, AccentLine } from '@/components/section-divider';

// Custom easing curves
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Organic leaf decoration SVG
export function LeafDecoration({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 100 150"
      className={className}
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay, duration: 1.2, ease: easeOutExpo }}
    >
      <motion.path
        d="M50 10 C20 30, 10 70, 30 110 C40 130, 50 140, 50 140 C50 140, 60 130, 70 110 C90 70, 80 30, 50 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: delay + 0.3, duration: 2, ease: easeOutExpo }}
      />
      <motion.path
        d="M50 30 L50 130"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: delay + 0.8, duration: 1.5, ease: easeOutExpo }}
      />
    </motion.svg>
  );
}

// Floating botanical element
export function FloatingLeaf({ style, delay = 0 }: { style?: React.CSSProperties; delay?: number }) {
  return (
    <motion.div
      style={style}
      className="absolute pointer-events-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: [0, 0.4, 0.4, 0],
        y: [20, -100, -200, -300],
        x: [0, 20, -10, 30],
        rotate: [0, 45, 90, 135]
      }}
      transition={{
        duration: 15,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <svg width="16" height="24" viewBox="0 0 20 30" fill="currentColor" className="text-[var(--empc-sage)]">
        <path d="M10 0 C4 6, 2 15, 6 24 C8 28, 10 30, 10 30 C10 30, 12 28, 14 24 C18 15, 16 6, 10 0" />
      </svg>
    </motion.div>
  );
}

// Animated section wrapper
export function AnimatedSection({
  children,
  className = '',
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: easeOutExpo }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Indication card component
export function IndicationCard({
  text,
  index,
  color = 'var(--empc-primary)'
}: {
  text: string;
  index: number;
  color?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ x: 8, scale: 1.02 }}
      className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-[var(--empc-sage)]/10 group hover:bg-white hover:shadow-lg transition-all duration-300"
    >
      <motion.div
        className="flex-shrink-0 w-3 h-3 mt-1.5 rounded-full"
        style={{ background: color }}
        whileHover={{ scale: 1.5 }}
      />
      <span className="text-[var(--empc-text)]/80 group-hover:text-[var(--empc-text)] transition-colors">
        {text}
      </span>
    </motion.div>
  );
}

// Price badge component
export function PriceBadge({
  price,
  duration,
  label
}: {
  price: string;
  duration: string;
  label?: string
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 2 }}
      className="inline-flex flex-col items-center p-6 rounded-3xl bg-gradient-to-br from-[var(--empc-primary)] to-[var(--empc-primary-dark)] text-white shadow-xl"
    >
      {label && (
        <span className="text-xs uppercase tracking-wider opacity-80 mb-1">{label}</span>
      )}
      <span className="font-heading text-4xl">{price}</span>
      <span className="text-sm opacity-80 mt-1">{duration}</span>
    </motion.div>
  );
}

// Axis/Step card for therapy methods
export function AxisCard({
  number,
  title,
  description,
  delay = 0
}: {
  number: number;
  title: string;
  description: string;
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="relative p-8 rounded-3xl bg-white shadow-lg group overflow-hidden"
    >
      {/* Decorative number */}
      <div className="absolute -top-4 -right-4 font-heading text-[120px] leading-none text-[var(--empc-sage)]/10 group-hover:text-[var(--empc-primary)]/10 transition-colors">
        {number}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[var(--empc-gold)]/20 flex items-center justify-center">
            <span className="font-heading text-lg text-[var(--empc-gold)]">{number}</span>
          </div>
          <h3 className="font-heading text-xl text-[var(--empc-text)]">{title}</h3>
        </div>
        <p className="text-sm opacity-70 leading-relaxed">{description}</p>
      </div>

      {/* Hover accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--empc-primary)] to-[var(--empc-gold)]"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

// Main therapy page layout props
interface TherapyPageLayoutProps {
  // Hero
  title: string;
  subtitle: string;
  heroImage: string;
  heroImageAlt: string;
  accentColor?: string;

  // Main content
  introQuote?: string;
  introText: string;

  // Sections
  definitionTitle?: string;
  definitionContent?: React.ReactNode;

  axes?: Array<{ title: string; description: string }>;
  axesTitle?: string;

  practiceItems?: string[];
  practiceTitle?: string;

  indications: string[];
  indicationsTitle?: string;

  sessionContent?: React.ReactNode;
  sessionTitle?: string;

  // Pricing
  prices: Array<{ label?: string; price: string; duration: string }>;
  priceNote?: string;

  // References
  references?: Array<{ text: string; url?: string }>;

  // FAQ
  faqs?: FAQItem[];
  faqTitle?: string;
  faqSubtitle?: string;
  faqImage?: string;

  children?: React.ReactNode;
}

export default function TherapyPageLayout({
  title,
  subtitle,
  heroImage,
  heroImageAlt,
  accentColor = 'var(--empc-primary)',
  introQuote,
  introText,
  definitionTitle,
  definitionContent,
  axes,
  axesTitle = 'Axes de travail',
  practiceItems,
  practiceTitle = 'La pratique',
  indications,
  indicationsTitle = 'Indications',
  sessionContent,
  sessionTitle = 'Déroulement des séances',
  prices,
  priceNote,
  references,
  faqs,
  faqTitle = 'Questions fréquentes',
  faqSubtitle,
  faqImage,
  children,
}: TherapyPageLayoutProps) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <Layout>
      {/* ========== HERO SECTION ========== */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-end overflow-hidden"
        style={{ background: 'linear-gradient(180deg, var(--empc-cream) 0%, var(--empc-background) 100%)' }}
      >
        {/* Dappled light effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${accentColor}15 0%, transparent 70%)`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 115, 85, 0.1) 0%, transparent 70%)',
            }}
            animate={{
              x: [0, -20, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        {/* Botanical decorations */}
        <LeafDecoration
          className="absolute top-24 right-16 w-16 h-24 text-[var(--empc-sage)] opacity-30 hide-mobile"
          delay={0.3}
        />
        <LeafDecoration
          className="absolute bottom-32 left-12 w-12 h-20 text-[var(--empc-primary)] opacity-20 rotate-45 hide-mobile"
          delay={0.6}
        />

        {/* Floating leaves */}
        {[...Array(4)].map((_, i) => (
          <FloatingLeaf
            key={i}
            style={{ left: `${20 + i * 20}%`, bottom: '-5%' }}
            delay={i * 3}
          />
        ))}

        <motion.div
          className="container-wide relative z-10 pb-20 pt-40"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
            >
              {/* Breadcrumb */}
              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Link
                  href="/"
                  className="text-xs tracking-[0.2em] uppercase opacity-50 hover:opacity-100 transition-opacity"
                >
                  Accueil
                </Link>
                <span className="text-[var(--empc-gold)]">/</span>
                <span className="text-xs tracking-[0.2em] uppercase text-[var(--empc-gold)]">
                  Nos Thérapies
                </span>
              </motion.div>

              {/* Title */}
              <h1 className="font-heading mb-4">
                <motion.span
                  className="block text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1] tracking-[-0.03em]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  {title}
                </motion.span>
              </h1>

              <motion.p
                className="text-xl opacity-70 max-w-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {subtitle}
              </motion.p>

              {/* Quick CTA */}
              <motion.div
                className="mt-8 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <motion.a
                  href="sms:0692460789"
                  className="btn-magnetic btn-primary"
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    Prendre rendez-vous
                  </span>
                </motion.a>
                <Link href="/tarifs">
                  <motion.span
                    className="btn-magnetic btn-outline"
                    whileHover={{ scale: 1.03 }}
                  >
                    Voir les tarifs
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 60, rotate: 3 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: easeOutExpo }}
            >
              <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Image
                  src={heroImage}
                  alt={heroImageAlt}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}20 0%, transparent 60%)`
                  }}
                />
              </div>

              {/* Decorative frame */}
              <motion.div
                className="absolute -inset-3 rounded-[3rem] border-2 border-[var(--empc-gold)]/20 -z-10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[var(--empc-text)]/30"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ========== DIVIDER: Hero → Introduction ========== */}
      <SectionDivider variant="curve" color="var(--empc-background)" height={80} />

      {/* ========== INTRODUCTION ========== */}
      <AnimatedSection className="py-24 relative overflow-hidden">
        {/* Liseré doré en haut */}
        <AccentLine color="var(--empc-gold)" position="top" thickness={3} variant="straight" />
        <div className="container-narrow">
          {introQuote && (
            <motion.blockquote
              className="relative mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {/* Large quote mark */}
              <span className="absolute -top-8 -left-4 text-[100px] font-heading text-[var(--empc-gold)]/20 leading-none select-none">
                «
              </span>
              <p className="font-heading text-2xl md:text-3xl italic leading-relaxed text-[var(--empc-text)] relative z-10 pl-8">
                {introQuote}
              </p>
            </motion.blockquote>
          )}

          <motion.div
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-lg leading-relaxed opacity-80">{introText}</p>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ========== DIVIDER: Introduction → Definition ========== */}
      {definitionContent && (
        <SectionDivider variant="diagonal-down" color="var(--empc-cream)" height={60} className="opacity-50" />
      )}

      {/* ========== DEFINITION (if provided) ========== */}
      {definitionContent && (
        <AnimatedSection className="py-20 bg-gradient-to-b from-[var(--empc-cream)]/50 to-transparent relative">
          {/* Liseré doré à gauche */}
          <AccentLine color="var(--empc-gold)" position="left" thickness={4} variant="straight" />
          <div className="container-narrow">
            {definitionTitle && (
              <motion.h2
                className="font-heading text-3xl md:text-4xl mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-[var(--empc-text)]">{definitionTitle}</span>
              </motion.h2>
            )}
            {definitionContent}
          </div>
        </AnimatedSection>
      )}

      {/* ========== DIVIDER: Definition → Axes ========== */}
      {axes && axes.length > 0 && (
        <SectionDivider variant="wave" color="var(--empc-background)" height={70} />
      )}

      {/* ========== AXES DE TRAVAIL (if provided) ========== */}
      {axes && axes.length > 0 && (
        <AnimatedSection className="py-24 relative">
          {/* Liseré doré diagonal en haut */}
          <AccentLine color="var(--empc-gold)" position="top" thickness={3} variant="diagonal" />
          <div className="container-wide">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[var(--empc-gold)] text-xs tracking-[0.3em] uppercase font-medium">
                Méthodologie
              </span>
              <h2 className="font-heading text-display mt-4">
                <span className="text-[var(--empc-text)]">{axesTitle}</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {axes.map((axis, i) => (
                <AxisCard
                  key={axis.title}
                  number={i + 1}
                  title={axis.title}
                  description={axis.description}
                  delay={i * 0.15}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* ========== DIVIDER: Axes → Practice ========== */}
      {practiceItems && practiceItems.length > 0 && (
        <SectionDivider variant="curve-reverse" color="var(--empc-cream)" height={60} className="opacity-30" />
      )}

      {/* ========== LA PRATIQUE (if provided) ========== */}
      {practiceItems && practiceItems.length > 0 && (
        <AnimatedSection className="py-20 relative">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 30% 50%, ${accentColor}08 0%, transparent 60%)`
            }}
          />
          <div className="container-narrow relative z-10">
            <motion.h2
              className="font-heading text-2xl mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {practiceTitle}
            </motion.h2>

            <div className="grid gap-4">
              {practiceItems.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{ background: `${accentColor}15` }}
                  >
                    {i === 0 ? '👤' : i === 1 ? '🧘' : '🍃'}
                  </div>
                  <span className="font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* ========== DIVIDER: Practice → Session ========== */}
      {sessionContent && (
        <SectionDivider variant="diagonal-up" color="var(--empc-cream)" height={70} className="opacity-30" />
      )}

      {/* ========== SESSION CONTENT (if provided) ========== */}
      {sessionContent && (
        <AnimatedSection className="py-24 bg-[var(--empc-cream)]/30 relative">
          {/* Liseré doré à droite */}
          <AccentLine color="var(--empc-gold)" position="right" thickness={4} variant="straight" />
          <div className="container-narrow">
            <motion.h2
              className="font-heading text-3xl mb-10 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {sessionTitle}
            </motion.h2>
            {sessionContent}
          </div>
        </AnimatedSection>
      )}

      {/* ========== DIVIDER: Session → Indications ========== */}
      <SectionDivider variant="wave" color="var(--empc-background)" height={80} />

      {/* ========== INDICATIONS ========== */}
      <AnimatedSection className="py-24 relative overflow-hidden">
        {/* Liseré doré diagonal en haut */}
        <AccentLine color="var(--empc-gold)" position="top" thickness={3} variant="diagonal" />
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-32"
            >
              <span className="text-[var(--empc-gold)] text-xs tracking-[0.3em] uppercase font-medium">
                Pour qui ?
              </span>
              <h2 className="font-heading text-display mt-4 mb-6">
                <span className="text-[var(--empc-primary)] italic">{indicationsTitle}</span>
              </h2>
              <p className="opacity-70 leading-relaxed">
                Cette approche thérapeutique peut vous accompagner dans de nombreuses situations de vie et difficultés psychologiques.
              </p>

              {/* Decorative leaf */}
              <motion.div
                className="mt-8 opacity-20"
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <svg width="80" height="120" viewBox="0 0 100 150" fill="none" stroke="currentColor" className="text-[var(--empc-sage)]">
                  <path d="M50 10 C20 30, 10 70, 30 110 C40 130, 50 140, 50 140 C50 140, 60 130, 70 110 C90 70, 80 30, 50 10" strokeWidth="1" />
                  <path d="M50 30 L50 130" strokeWidth="0.5" />
                </svg>
              </motion.div>
            </motion.div>

            {/* Indications list */}
            <div className="grid gap-3">
              {indications.map((indication, i) => (
                <IndicationCard
                  key={indication}
                  text={indication}
                  index={i}
                  color={accentColor}
                />
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ========== DIVIDER: Indications → Tarifs ========== */}
      <SectionDivider variant="curve" color="var(--empc-cream)" height={70} className="opacity-50" />

      {/* ========== TARIFS ========== */}
      <AnimatedSection className="py-24 relative">
        {/* Liseré doré en haut */}
        <AccentLine color="var(--empc-gold)" position="top" thickness={3} variant="straight" />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, var(--empc-cream)/50 0%, var(--empc-background) 100%)'
          }}
        />

        <div className="container-narrow relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[var(--empc-gold)] text-xs tracking-[0.3em] uppercase font-medium">
              Investissement
            </span>
            <h2 className="font-heading text-display mt-4 mb-12">
              <span className="text-[var(--empc-text)]">Tarifs</span>
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {prices.map((price, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <PriceBadge
                  price={price.price}
                  duration={price.duration}
                  label={price.label}
                />
              </motion.div>
            ))}
          </div>

          {priceNote && (
            <motion.p
              className="text-sm opacity-60 max-w-lg mx-auto mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.6 }}
              viewport={{ once: true }}
            >
              {priceNote}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link href="/tarifs">
              <motion.span
                className="btn-magnetic btn-outline"
                whileHover={{ scale: 1.03 }}
              >
                Tous les tarifs
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ========== DIVIDER: Tarifs → FAQ ========== */}
      {faqs && faqs.length > 0 && (
        <SectionDivider variant="diagonal-down" color="var(--empc-cream)" height={80} />
      )}

      {/* ========== FAQ SECTION (if provided) ========== */}
      {faqs && faqs.length > 0 && (
        <AnimatedSection className="py-24 bg-[var(--empc-cream)] relative">
          {/* Liseré doré à gauche */}
          <AccentLine color="var(--empc-gold)" position="left" thickness={4} variant="straight" />
          <div className="container-wide">
            <FAQSection
              faqs={faqs}
              title={faqTitle}
              subtitle={faqSubtitle || `Tout ce que vous devez savoir sur la ${title.toLowerCase()}`}
              imageSrc={faqImage || heroImage}
              imageAlt={`FAQ - ${title}`}
            />
          </div>
        </AnimatedSection>
      )}

      {/* ========== DIVIDER: FAQ → References ========== */}
      {references && references.length > 0 && (
        <SectionDivider variant="curve-reverse" color="var(--empc-background)" height={60} />
      )}

      {/* ========== REFERENCES (if provided) ========== */}
      {references && references.length > 0 && (
        <AnimatedSection className="py-16 border-t border-[var(--empc-sage)]/10">
          <div className="container-narrow">
            <motion.h3
              className="font-heading text-xl mb-6 opacity-70"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              viewport={{ once: true }}
            >
              Références
            </motion.h3>
            <div className="space-y-3">
              {references.map((ref, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-sm opacity-60"
                >
                  {ref.url ? (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--empc-primary)] hover:opacity-100 transition-all link-hover"
                    >
                      {ref.text}
                    </a>
                  ) : (
                    <span>{ref.text}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Additional custom content */}
      {children}

      {/* ========== DIVIDER: References → Contact CTA ========== */}
      <SectionDivider variant="wave" color="var(--empc-cream)" height={70} className="opacity-40" />

      {/* ========== CONTACT CTA ========== */}
      <AnimatedSection className="py-24 relative overflow-hidden">
        {/* Liseré doré courbé en haut */}
        <AccentLine color="var(--empc-gold)" position="top" thickness={3} variant="curved" />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 100%, ${accentColor}10 0%, transparent 60%)`
          }}
        />

        <div className="container-narrow text-center relative z-10">
          <motion.div
            className="w-px h-16 mx-auto mb-8"
            style={{
              background: 'linear-gradient(to bottom, transparent, var(--empc-gold), transparent)'
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
          />

          <motion.h2
            className="font-heading text-display mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[var(--empc-text)]">Commençons le </span>
            <span className="text-[var(--empc-primary)] italic">dialogue</span>
          </motion.h2>

          <motion.p
            className="text-lg opacity-70 max-w-md mx-auto mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: true }}
          >
            Envoyez un SMS pour convenir d&apos;un premier entretien
          </motion.p>

          <motion.a
            href="sms:0692460789"
            className="inline-flex items-center gap-4 bg-[var(--empc-primary)] text-white px-10 py-5 rounded-full text-lg font-medium shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            0692 46 07 89
          </motion.a>

          <motion.p
            className="mt-4 text-sm opacity-50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
          >
            SMS uniquement · La Réunion
          </motion.p>

          {/* Back link */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[var(--empc-primary)] font-medium link-hover"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Retour à l&apos;accueil
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>
    </Layout>
  );
}
