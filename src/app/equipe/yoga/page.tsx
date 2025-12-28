'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { SectionDivider, AccentLine } from '@/components/section-divider';

// Smooth easing
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Animated breathing circle component
function BreathingCircle({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Flowing wave SVG
function FlowingWave({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 1200 120"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
        fill="currentColor"
        animate={{
          d: [
            "M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z",
            "M0,60 C150,0 350,120 600,60 C850,0 1050,120 1200,60 L1200,120 L0,120 Z",
            "M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z",
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.svg>
  );
}

// Lotus flower decoration
function LotusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 80" className={className} fill="currentColor">
      <path d="M50 70 C45 55 30 45 25 30 C30 35 40 35 50 40 C60 35 70 35 75 30 C70 45 55 55 50 70" opacity="0.9" />
      <path d="M50 65 C48 50 38 42 35 32 C40 36 47 38 50 42 C53 38 60 36 65 32 C62 42 52 50 50 65" opacity="0.7" />
      <path d="M50 58 C49 48 44 42 42 35 C45 38 48 40 50 43 C52 40 55 38 58 35 C56 42 51 48 50 58" opacity="0.5" />
      <ellipse cx="50" cy="75" rx="8" ry="3" opacity="0.3" />
    </svg>
  );
}

// Section component with reveal animation
function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.9, delay, ease: easeOutExpo }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Tension card component
function TensionCard({ title, description, icon, index }: { title: string; description: string; icon: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.7 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--empc-sage)]/20 to-transparent rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-white/80 backdrop-blur-sm rounded-[2rem] p-8 border border-[var(--empc-sage)]/20 shadow-lg shadow-[var(--empc-sage)]/5 overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-20 h-20">
          <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-[var(--empc-sage)]/30 to-transparent" />
        </div>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--empc-primary)] to-[var(--empc-primary-dark)] flex items-center justify-center text-3xl mb-6 shadow-lg">
          {icon}
        </div>

        {/* Content */}
        <h4 className="font-heading text-xl text-[var(--empc-primary-dark)] mb-3">{title}</h4>
        <p className="text-sm opacity-70 leading-relaxed">{description}</p>

        {/* Bottom accent */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--empc-sage)] via-[var(--empc-primary)] to-[var(--empc-sage)]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + index * 0.15, duration: 0.8 }}
        />
      </div>
    </motion.div>
  );
}

// Quote component
function ZenQuote({ quote, author, delay = 0 }: { quote: string; author: string; delay?: number }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: easeOutExpo }}
      className="relative"
    >
      <div className="relative bg-gradient-to-br from-[var(--empc-cream)] to-white rounded-[2.5rem] p-10 md:p-14 shadow-xl border border-[var(--empc-sage)]/10 overflow-hidden">
        {/* Large decorative quote */}
        <span className="absolute -top-4 -left-2 text-[140px] font-heading text-[var(--empc-sage)]/15 leading-none select-none">
          &ldquo;
        </span>

        {/* Lotus decoration */}
        <LotusIcon className="absolute bottom-6 right-8 w-20 h-16 text-[var(--empc-sage)]/10" />

        {/* Quote text */}
        <p className="relative z-10 font-heading text-xl md:text-2xl italic leading-relaxed text-[var(--empc-text)] mb-6">
          {quote}
        </p>

        {/* Author */}
        <footer className="relative z-10 flex items-center gap-3">
          <div className="w-8 h-px bg-[var(--empc-gold)]" />
          <cite className="not-italic text-sm font-medium text-[var(--empc-gold)]">
            {author}
          </cite>
        </footer>
      </div>
    </motion.blockquote>
  );
}

export default function YogaPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const tensions = [
    {
      title: "Tension Physique",
      description: "Libération des contractions musculaires accumulées, relâchement profond du corps et de ses tensions quotidiennes.",
      icon: "🧘"
    },
    {
      title: "Tension Émotionnelle",
      description: "Apaisement des émotions refoulées, harmonisation du ressenti intérieur et équilibre affectif retrouvé.",
      icon: "💫"
    },
    {
      title: "Tension Mentale",
      description: "Calme des pensées incessantes, clarté mentale et paix de l'esprit à travers la pratique consciente.",
      icon: "🌿"
    }
  ];

  return (
    <main className="bg-[var(--empc-background)] min-h-screen overflow-hidden">
      <Header transparent />

      {/* ========== HERO SECTION ========== */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large breathing circles */}
          <BreathingCircle
            className="w-[600px] h-[600px] -top-40 -right-40 bg-gradient-to-br from-[var(--empc-sage)]/30 to-transparent"
            delay={0}
          />
          <BreathingCircle
            className="w-[500px] h-[500px] -bottom-32 -left-32 bg-gradient-to-tr from-[var(--empc-primary)]/20 to-transparent"
            delay={2}
          />
          <BreathingCircle
            className="w-[300px] h-[300px] top-1/3 left-1/4 bg-gradient-to-br from-[var(--empc-gold)]/15 to-transparent"
            delay={4}
          />

          {/* Floating lotus petals */}
          <motion.div
            className="absolute top-1/4 right-1/4"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <LotusIcon className="w-16 h-12 text-[var(--empc-sage)]" />
          </motion.div>

          <motion.div
            className="absolute bottom-1/3 left-1/3"
            animate={{
              y: [0, 20, 0],
              rotate: [0, -15, 0],
              opacity: [0.15, 0.3, 0.15]
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 3 }}
          >
            <LotusIcon className="w-12 h-10 text-[var(--empc-primary)]" />
          </motion.div>
        </div>

        {/* Hero content */}
        <motion.div
          className="relative z-10 container-wide"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh] py-32">

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: easeOutExpo }}
            >
              {/* Breadcrumb */}
              <motion.div
                className="flex items-center gap-3 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Link href="/" className="text-xs tracking-[0.2em] uppercase opacity-50 hover:opacity-100 transition-opacity">
                  Accueil
                </Link>
                <span className="text-[var(--empc-sage)]">/</span>
                <Link href="/" className="text-xs tracking-[0.2em] uppercase opacity-50 hover:opacity-100 transition-opacity">
                  L&apos;Équipe
                </Link>
                <span className="text-[var(--empc-sage)]">/</span>
                <span className="text-xs tracking-[0.2em] uppercase text-[var(--empc-primary)]">
                  Yoga
                </span>
              </motion.div>

              {/* Category tag */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--empc-sage)]/20 border border-[var(--empc-sage)]/30 mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span className="w-2 h-2 rounded-full bg-[var(--empc-sage)] animate-pulse" />
                <span className="text-xs tracking-[0.15em] uppercase text-[var(--empc-primary-dark)] font-medium">
                  Discipline Corporelle
                </span>
              </motion.div>

              {/* Name */}
              <motion.h1
                className="font-heading mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <span className="block text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] tracking-[-0.03em] text-[var(--empc-text)]">
                  Delphine
                </span>
                <span className="block text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] tracking-[-0.03em] text-[var(--empc-primary)]">
                  Varesano
                </span>
              </motion.h1>

              {/* Role */}
              <motion.p
                className="text-xl md:text-2xl opacity-70 mb-8 font-heading italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Intervenante Yoga
              </motion.p>

              {/* Disciplines */}
              <motion.div
                className="flex flex-wrap gap-3 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                {['Hatha Yoga', 'Yoga Nidra'].map((tag, i) => (
                  <span
                    key={tag}
                    className="px-5 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-[var(--empc-sage)]/20 text-sm font-medium text-[var(--empc-primary-dark)]"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.a
                  href="sms:0692460789"
                  className="btn-magnetic btn-primary group"
                  whileHover={{ scale: 1.05, y: -3 }}
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

            {/* Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 60, rotate: 2 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: easeOutExpo }}
            >
              <div className="relative aspect-[3/4] max-w-md mx-auto">
                {/* Decorative frame */}
                <motion.div
                  className="absolute -inset-6 rounded-[3rem] border-2 border-[var(--empc-sage)]/30"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />

                {/* Main image container */}
                <div className="relative h-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[var(--empc-primary)]/10">
                  <Image
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"
                    alt="Yoga et méditation"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--empc-primary)]/20 via-transparent to-[var(--empc-sage)]/10" />
                </div>

                {/* Floating badge */}
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-5 border border-[var(--empc-sage)]/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  whileHover={{ scale: 1.05, rotate: -2 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--empc-sage)] to-[var(--empc-primary)] flex items-center justify-center text-white text-xl">
                      🧘
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[var(--empc-gold)] font-medium">Pratique</p>
                      <p className="font-heading text-lg text-[var(--empc-primary-dark)]">Traditionnelle</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-32 text-[var(--empc-cream)]">
          <FlowingWave className="w-full h-full" delay={0.5} />
        </div>
      </section>

      {/* ========== DIVIDER: Hero → Hatha ========== */}
      <SectionDivider variant="curve" color="var(--empc-cream)" height={80} />

      {/* ========== HATHA YOGA SECTION ========== */}
      <RevealSection className="relative py-24 md:py-32 bg-[var(--empc-cream)]">
        {/* Liseré doré en haut */}
        <AccentLine color="var(--empc-gold)" position="top" thickness={3} variant="straight" />
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Image side */}
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Background shape */}
                <div className="absolute inset-8 rounded-[4rem] bg-gradient-to-br from-[var(--empc-sage)]/30 to-[var(--empc-primary)]/10 -rotate-6" />

                {/* Image */}
                <div className="relative h-full rounded-[3rem] overflow-hidden shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80"
                    alt="Pratique du Hatha Yoga - postures et respiration"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Floating element */}
                <motion.div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[var(--empc-gold)]/20 backdrop-blur-sm flex items-center justify-center"
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <span className="text-4xl">🌸</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Content side */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Section label */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[var(--empc-primary)] flex items-center justify-center text-white text-lg">
                  ॐ
                </div>
                <span className="text-xs tracking-[0.2em] uppercase text-[var(--empc-gold)] font-medium">
                  Pratique Traditionnelle
                </span>
              </div>

              {/* Title */}
              <h2 className="font-heading text-4xl md:text-5xl mb-8">
                <span className="text-[var(--empc-text)]">Hatha </span>
                <span className="text-[var(--empc-primary)] italic">Yoga</span>
              </h2>

              {/* Description */}
              <div className="space-y-6 text-lg leading-relaxed opacity-80">
                <p>
                  Par la pratique des postures (<em className="text-[var(--empc-primary)] not-italic font-medium">āsanas</em>) et de la respiration (<em className="text-[var(--empc-primary)] not-italic font-medium">prānāyāma</em>), le praticien tente d&apos;augmenter son <strong className="font-medium text-[var(--empc-primary-dark)]">prāna</strong> (énergie subtile) afin de diminuer ses pensées et de maîtriser son mental.
                </p>
                <p>
                  Āsanas et prānāyāma sont issus des sources traditionnelles indiennes, notamment des écrits de <strong className="font-medium text-[var(--empc-primary-dark)]">Swami Sivananda</strong>.
                </p>
              </div>

              {/* Key elements */}
              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  { label: 'Āsanas', desc: 'Postures' },
                  { label: 'Prānāyāma', desc: 'Respiration' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="p-5 rounded-2xl bg-white/60 border border-[var(--empc-sage)]/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <p className="font-heading text-xl text-[var(--empc-primary)]">{item.label}</p>
                    <p className="text-sm opacity-60">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </RevealSection>

      {/* ========== DIVIDER: Hatha → Nidra ========== */}
      <SectionDivider variant="wave" color="var(--empc-background)" height={70} />

      {/* ========== YOGA NIDRA SECTION ========== */}
      <RevealSection className="relative py-24 md:py-32 overflow-hidden">
        {/* Liseré doré à gauche */}
        <AccentLine color="var(--empc-gold)" position="left" thickness={4} variant="straight" />
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--empc-sage)]/30 to-transparent" />
          <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-[var(--empc-sage)]/10 blur-3xl" />
        </div>

        <div className="container-wide relative z-10">
          {/* Section header */}
          <motion.div
            className="text-center max-w-3xl mx-auto mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-[var(--empc-gold)]" />
              <span className="text-xs tracking-[0.3em] uppercase text-[var(--empc-gold)] font-medium">
                Le Sommeil Yogique
              </span>
              <div className="w-16 h-px bg-[var(--empc-gold)]" />
            </div>

            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-8">
              <span className="text-[var(--empc-text)]">Yoga </span>
              <span className="text-[var(--empc-primary)] italic">Nidra</span>
            </h2>

            <p className="text-lg md:text-xl opacity-70 leading-relaxed">
              Technique de détente profonde sur les plans physique, mental et psychique amenant progressivement à la <strong className="font-medium text-[var(--empc-primary-dark)]">libération intérieure</strong>.
            </p>
          </motion.div>

          {/* Formation info */}
          <motion.div
            className="max-w-2xl mx-auto mb-16 p-8 rounded-[2rem] bg-gradient-to-r from-[var(--empc-sage)]/10 to-[var(--empc-primary)]/5 border border-[var(--empc-sage)]/20"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--empc-gold)]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[var(--empc-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <div>
                <p className="font-heading text-lg text-[var(--empc-primary-dark)] mb-2">Formation Institut Vidya</p>
                <p className="opacity-70">
                  Technique du <em>sommeil éveillé</em> : équivalent d&apos;une relaxation complète.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Swami intro */}
          <motion.p
            className="text-center text-lg opacity-80 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true }}
          >
            C&apos;est <strong className="font-medium text-[var(--empc-primary-dark)]">Swami Satyananda</strong> qui a mis au point la technique de Yoga Nidra pour dissoudre la <em>triple tension</em> :
          </motion.p>

          {/* Tensions grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {tensions.map((tension, i) => (
              <TensionCard
                key={tension.title}
                title={tension.title}
                description={tension.description}
                icon={tension.icon}
                index={i}
              />
            ))}
          </div>

          {/* Consequences note */}
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg italic opacity-70 leading-relaxed">
              Ces trois tensions étant principalement la cause des maladies, des inhibitions et de l&apos;anxiété.
            </p>
          </motion.div>
        </div>
      </RevealSection>

      {/* ========== DIVIDER: Nidra → Quotes ========== */}
      <SectionDivider variant="diagonal-down" color="var(--empc-cream)" height={70} className="opacity-50" />

      {/* ========== QUOTES SECTION ========== */}
      <RevealSection className="relative py-24 md:py-32 bg-gradient-to-b from-[var(--empc-cream)]/50 to-[var(--empc-background)]">
        {/* Liseré doré diagonal en haut */}
        <AccentLine color="var(--empc-gold)" position="top" thickness={3} variant="diagonal" />
        <div className="container-narrow">
          {/* Section title */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <LotusIcon className="w-16 h-12 mx-auto text-[var(--empc-sage)]/50 mb-6" />
            <h2 className="font-heading text-3xl md:text-4xl">
              <span className="text-[var(--empc-text)]">Sagesse </span>
              <span className="text-[var(--empc-primary)] italic">Yogique</span>
            </h2>
          </motion.div>

          {/* Quotes */}
          <div className="space-y-10">
            <ZenQuote
              quote="Le Yoga Nidra est le tranquillisant Yogique, le moyen naturel d'établir l'harmonie dans tout l'organisme."
              author="Swami Satyananda"
              delay={0}
            />
            <ZenQuote
              quote="Une once de pratique vaut mieux que des tonnes de théorie."
              author="Swami Sivananda"
              delay={0.2}
            />
          </div>
        </div>
      </RevealSection>

      {/* ========== DIVIDER: Quotes → CTA ========== */}
      <SectionDivider variant="curve-reverse" color="var(--empc-background)" height={60} />

      {/* ========== CTA SECTION ========== */}
      <RevealSection className="relative py-24 md:py-32 overflow-hidden">
        {/* Liseré doré courbé en haut */}
        <AccentLine color="var(--empc-gold)" position="top" thickness={3} variant="curved" />
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <BreathingCircle
            className="w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[var(--empc-sage)]/20 to-[var(--empc-primary)]/10"
            delay={0}
          />
        </div>

        <div className="container-narrow text-center relative z-10">
          {/* Decorative line */}
          <motion.div
            className="w-px h-20 mx-auto mb-10 bg-gradient-to-b from-transparent via-[var(--empc-gold)] to-transparent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
          />

          <motion.h2
            className="font-heading text-4xl md:text-5xl mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[var(--empc-text)]">Trouvez votre </span>
            <span className="text-[var(--empc-primary)] italic">équilibre</span>
          </motion.h2>

          <motion.p
            className="text-lg opacity-70 max-w-md mx-auto mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: true }}
          >
            Contactez-nous par SMS pour découvrir les séances de yoga
          </motion.p>

          <motion.a
            href="sms:0692460789"
            className="inline-flex items-center gap-4 bg-gradient-to-r from-[var(--empc-primary)] to-[var(--empc-primary-dark)] text-white px-10 py-5 rounded-full text-lg font-medium shadow-xl shadow-[var(--empc-primary)]/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
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
            className="mt-14"
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
      </RevealSection>

      {/* Footer spacer */}
      <div className="h-20" />
    </main>
  );
}
