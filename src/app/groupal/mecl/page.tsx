'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Layout } from '@/components/layout';
import { ThumbnailCarousel, CarouselItem } from '@/components/framer-thumbnail-carousel';

// Images pour le carousel MECL (alimentation consciente)
const meclImages: CarouselItem[] = [
  { id: 1, url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80', title: 'Alimentation consciente', description: 'Redécouvrir le plaisir de manger' },
  { id: 2, url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80', title: 'Pleine conscience', description: 'Écouter ses sensations' },
  { id: 3, url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80', title: 'Équilibre', description: 'Sans régime restrictif' },
  { id: 4, url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80', title: 'Méditation', description: 'Respiration et ancrage' },
  { id: 5, url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80', title: 'Travail en groupe', description: 'Partage et bienveillance' },
];

// Custom easing
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Organic flowing shape - represents nourishment and growth
function OrganicShape({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 1.2, ease: easeOutExpo }}
    >
      <motion.path
        d="M100 20 C140 20, 180 60, 180 100 C180 140, 140 180, 100 180 C60 180, 20 140, 20 100 C20 60, 60 20, 100 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        initial={{ pathLength: 0, rotate: 0 }}
        animate={{ pathLength: 1, rotate: 360 }}
        transition={{
          pathLength: { delay: delay + 0.3, duration: 3, ease: easeOutExpo },
          rotate: { duration: 60, repeat: Infinity, ease: "linear" }
        }}
      />
    </motion.svg>
  );
}

// Seed/growth animation
function GrowingSeed({ delay = 0, className = '' }: { delay?: number; className?: string }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1.2, 0.5],
        y: [0, -20, -40, -60]
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeOut"
      }}
    >
      <svg width="12" height="16" viewBox="0 0 12 16" fill="currentColor" className="text-[var(--empc-gold)]">
        <ellipse cx="6" cy="8" rx="4" ry="6" opacity="0.6" />
        <path d="M6 2 L6 0 M4 3 L3 1 M8 3 L9 1" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </svg>
    </motion.div>
  );
}

// Session content card
function SessionContentCard({
  icon,
  title,
  description,
  delay = 0
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: easeOutExpo }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative p-6 rounded-3xl bg-white shadow-lg group overflow-hidden"
    >
      {/* Hover accent */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[var(--empc-gold)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--empc-gold)]/20 to-[var(--empc-cream)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h4 className="font-heading text-lg text-[var(--empc-text)] mb-2">{title}</h4>
        <p className="text-sm opacity-70 leading-relaxed">{description}</p>
      </div>

      {/* Corner decoration */}
      <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-[var(--empc-gold)]/5 group-hover:bg-[var(--empc-gold)]/10 transition-colors" />
    </motion.div>
  );
}

// Target audience pill
function AudiencePill({ text, index }: { text: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ x: 8, scale: 1.02 }}
      className="flex items-start gap-4 p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-[var(--empc-gold)]/15 hover:bg-white hover:shadow-md transition-all"
    >
      <motion.div
        className="flex-shrink-0 w-3 h-3 mt-1.5 rounded-full bg-[var(--empc-gold)]"
        whileHover={{ scale: 1.5 }}
      />
      <span className="text-[var(--empc-text)]/80">{text}</span>
    </motion.div>
  );
}

export default function MECLPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, margin: "-100px" });

  const targetAudience = [
    "Troubles du Comportement Alimentaire",
    "Boulimie et Hyperphagie",
    "Alimentation compulsive",
    "Suites chirurgicales (bypass, sleeve) sans amélioration",
    "Poursuite de régimes sans résultat durable"
  ];

  const sessionContents = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--empc-gold)]">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "Petit groupe",
      description: "4 à 9 participants pour un accompagnement personnalisé et des échanges authentiques."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--empc-gold)]">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      ),
      title: "Expérimentations alimentaires",
      description: "Exercices pratiques pour redécouvrir les sensations de faim et de satiété."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--empc-gold)]">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      title: "Méditations adaptées",
      description: "Pratiques de pleine conscience spécifiquement conçues pour le rapport à l'alimentation."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--empc-gold)]">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M12 6v4" />
          <path d="M12 14h.01" />
        </svg>
      ),
      title: "Mouvements corporels",
      description: "Pratiques en conscience pour reconnecter corps et esprit."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--empc-gold)]">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 10h.01" />
          <path d="M12 10h.01" />
          <path d="M16 10h.01" />
        </svg>
      ),
      title: "Partages bienveillants",
      description: "Espaces d'échange dans un cadre sécurisant et non-jugeant."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--empc-gold)]">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
      ),
      title: "Journée de pleine conscience",
      description: "Une journée complète avec repas partagé incluse dans le programme."
    }
  ];

  return (
    <Layout>
      {/* ========== HERO SECTION ========== */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #faf8f5 0%, #f5f0e8 50%, var(--empc-background) 100%)' }}
      >
        {/* Organic background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Flowing organic shapes */}
          <OrganicShape className="absolute -top-20 -right-20 w-[400px] h-[400px] text-[var(--empc-gold)]/20" delay={0} />
          <OrganicShape className="absolute bottom-20 -left-32 w-[350px] h-[350px] text-[var(--empc-sage)]/15" delay={0.5} />

          {/* Growing seeds animation */}
          {[...Array(6)].map((_, i) => (
            <GrowingSeed
              key={i}
              delay={i * 1.5}
              className={`${['left-[10%]', 'left-[25%]', 'left-[40%]', 'right-[40%]', 'right-[25%]', 'right-[10%]'][i]} bottom-10`}
            />
          ))}

          {/* Warm gradient orbs */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.15, 1],
              x: [0, 20, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          className="container-wide relative z-10 py-32"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
            >
              {/* Breadcrumb */}
              <motion.div
                className="flex items-center gap-3 mb-8"
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
                  Travail Groupal
                </span>
              </motion.div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--empc-gold)]/10 border border-[var(--empc-gold)]/25 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--empc-gold)] animate-pulse" />
                <span className="text-xs tracking-wider uppercase text-[var(--empc-gold)] font-medium">
                  Protocole groupal
                </span>
              </motion.div>

              {/* Title */}
              <h1 className="font-heading mb-6">
                <motion.span
                  className="block text-[clamp(1.8rem,4vw,2.5rem)] leading-[1.2] tracking-[-0.01em] text-[var(--empc-text)]/70"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Protocole ME-CL
                </motion.span>
                <motion.span
                  className="block text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] tracking-[-0.03em] text-[var(--empc-primary)]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  Manger et Vivre
                </motion.span>
                <motion.span
                  className="block text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-[var(--empc-gold)] italic"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  en Pleine Conscience
                </motion.span>
              </h1>

              <motion.p
                className="text-lg md:text-xl opacity-70 max-w-xl leading-relaxed mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                Méditation adaptée aux Troubles du Comportement Alimentaire
              </motion.p>

              {/* Key info */}
              <motion.div
                className="flex flex-wrap gap-4 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm border border-[var(--empc-gold)]/10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--empc-gold)]">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span className="text-sm font-medium">8 séances</span>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm border border-[var(--empc-gold)]/10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--empc-gold)]">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span className="text-sm font-medium">4 à 9 participants</span>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm border border-[var(--empc-gold)]/10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--empc-gold)]">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span className="text-sm font-medium">+ Journée incluse</span>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <motion.a
                  href="sms:0692460789"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-[var(--empc-gold)] to-[var(--empc-gold)]/80 text-white px-8 py-4 rounded-full font-medium shadow-lg"
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Entretien préalable gratuit
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

            {/* Visual element */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: easeOutExpo }}
            >
              <div className="relative aspect-[4/5] max-w-[450px] mx-auto">
                {/* Decorative frame */}
                <motion.div
                  className="absolute -inset-4 rounded-[3rem] border-2 border-[var(--empc-gold)]/15"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />

                {/* Main image */}
                <div className="relative h-full rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80"
                    alt="Alimentation consciente et équilibrée"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--empc-gold)]/20 via-transparent to-[var(--empc-cream)]/10" />
                </div>

                {/* Floating cards */}
                <motion.div
                  className="absolute -top-6 -left-6 px-5 py-3 rounded-2xl bg-white/95 shadow-xl backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20, rotate: -5 }}
                  animate={{ opacity: 1, y: 0, rotate: -5 }}
                  transition={{ delay: 1.2 }}
                  whileHover={{ rotate: 0, scale: 1.05 }}
                >
                  <span className="text-2xl mr-2">🧘</span>
                  <span className="text-sm font-medium text-[var(--empc-text)]">Mindful Eating</span>
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -right-4 px-5 py-3 rounded-2xl bg-white/95 shadow-xl backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20, rotate: 5 }}
                  animate={{ opacity: 1, y: 0, rotate: 5 }}
                  transition={{ delay: 1.4 }}
                  whileHover={{ rotate: 0, scale: 1.05 }}
                >
                  <span className="text-2xl mr-2">🌿</span>
                  <span className="text-sm font-medium text-[var(--empc-text)]">Conscious Living</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-[var(--empc-text)]/30"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ========== INTRODUCTION ========== */}
      <section className="py-24 relative overflow-hidden">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl mb-6">
              <span className="text-[var(--empc-text)]">8 séances inspirées du </span>
              <span className="text-[var(--empc-gold)] italic">Mindful Eating</span>
            </h2>
            <p className="text-lg leading-relaxed opacity-70 max-w-2xl mx-auto">
              Le protocole ME-CL (Manger et Vivre en Pleine Conscience) s&apos;inspire du niveau 1
              &quot;Mindful Eating-Conscious Living&quot; pour accompagner les personnes souffrant
              de troubles du comportement alimentaire vers une relation apaisée avec la nourriture.
            </p>
          </motion.div>

          {/* Quote block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-[var(--empc-gold)]/10 via-[var(--empc-cream)]/50 to-transparent border border-[var(--empc-gold)]/10"
          >
            <span className="absolute top-4 left-6 text-[60px] font-heading text-[var(--empc-gold)]/20 leading-none select-none">
              &laquo;
            </span>
            <p className="relative z-10 font-heading text-xl md:text-2xl italic text-center leading-relaxed text-[var(--empc-text)] px-8">
              Retrouver la faim physique, écouter son corps, manger avec tous ses sens...
              C&apos;est possible, avec bienveillance et sans jugement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== POUR QUI ========== */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[var(--empc-cream)]/40 to-transparent">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - Title */}
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
                <span className="text-[var(--empc-primary)] italic">Ce programme </span>
                <span className="text-[var(--empc-text)]">est fait pour vous si...</span>
              </h2>
              <p className="opacity-70 leading-relaxed mb-8">
                Le protocole MECL s&apos;adresse aux personnes pour qui les approches traditionnelles
                (régimes, restrictions) n&apos;ont pas fonctionné sur le long terme.
              </p>

              {/* Decorative element */}
              <motion.div
                className="relative w-32 h-32"
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="var(--empc-gold)"
                    strokeWidth="0.5"
                    strokeDasharray="4 4"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "center" }}
                  />
                  <circle cx="50" cy="50" r="25" fill="var(--empc-gold)" opacity="0.1" />
                </svg>
              </motion.div>
            </motion.div>

            {/* Right - Target audience */}
            <div className="space-y-4">
              {targetAudience.map((item, i) => (
                <AudiencePill key={item} text={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== CONTENU DES SÉANCES ========== */}
      <section ref={contentRef} className="py-24 relative">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <span className="text-[var(--empc-gold)] text-xs tracking-[0.3em] uppercase font-medium">
              Le Programme
            </span>
            <h2 className="font-heading text-display mt-4">
              <span className="text-[var(--empc-text)]">Contenu des </span>
              <span className="text-[var(--empc-gold)] italic">séances</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessionContents.map((content, i) => (
              <SessionContentCard
                key={content.title}
                icon={content.icon}
                title={content.title}
                description={content.description}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== TARIFS ========== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--empc-gold)]/5 via-transparent to-[var(--empc-primary)]/5" />

        <div className="container-narrow relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[var(--empc-gold)] text-xs tracking-[0.3em] uppercase font-medium">
              Investissement
            </span>
            <h2 className="font-heading text-display mt-4">
              <span className="text-[var(--empc-text)]">Tarif du </span>
              <span className="text-[var(--empc-gold)] italic">programme</span>
            </h2>
          </motion.div>

          {/* Main price card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-10 md:p-14 rounded-[2.5rem] bg-gradient-to-br from-[var(--empc-gold)] via-[var(--empc-gold)]/90 to-[var(--empc-gold)]/80 text-white overflow-hidden shadow-2xl"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/3" />

            <div className="relative z-10">
              <div className="text-center mb-10">
                <span className="text-white/70 text-sm tracking-widest uppercase">Programme complet</span>
                <div className="mt-4 mb-2">
                  <span className="font-heading text-7xl md:text-8xl">560€</span>
                </div>
                <p className="text-white/80">8 séances + journée de pleine conscience</p>
              </div>

              {/* What's included */}
              <div className="grid md:grid-cols-2 gap-6 pt-8 border-t border-white/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">8 séances de groupe</h4>
                    <p className="text-sm text-white/70">Petit groupe de 4 à 9 participants</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Journée de pleine conscience</h4>
                    <p className="text-sm text-white/70">Avec repas partagé inclus</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Supports de pratique</h4>
                    <p className="text-sm text-white/70">Méditations guidées à emporter</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Entretien préalable</h4>
                    <p className="text-sm text-white/70">Gratuit et sans engagement</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.p
            className="text-center text-sm opacity-60 mt-8 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
          >
            Professionnelle non conventionnée, secteur 3. Possibilité de prise en charge partielle selon votre mutuelle.
          </motion.p>
        </div>
      </section>

      {/* ========== ENTRETIEN PRÉALABLE ========== */}
      <section className="py-16 border-t border-[var(--empc-gold)]/10">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-3xl bg-gradient-to-r from-[var(--empc-cream)]/50 to-transparent border border-[var(--empc-gold)]/10"
          >
            <div className="w-16 h-16 rounded-2xl bg-[var(--empc-gold)]/15 flex items-center justify-center flex-shrink-0">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--empc-gold)]">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-heading text-xl mb-2 text-[var(--empc-text)]">
                Entretien préalable gratuit
              </h3>
              <p className="text-[var(--empc-text)]/70">
                Contactez-nous par SMS pour un premier échange afin de vérifier que ce programme
                correspond à vos besoins et attentes.
              </p>
            </div>
            <motion.a
              href="sms:0692460789"
              className="inline-flex items-center gap-2 bg-[var(--empc-gold)] text-white px-6 py-3 rounded-full font-medium shadow-lg flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              0692 460 789
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ========== GALERIE - Thumbnail Carousel ========== */}
      <ThumbnailCarousel
        items={meclImages}
        title="L'expérience MECL"
        subtitle="Manger et vivre en pleine conscience : retrouvez une relation apaisée avec l'alimentation"
        height="450px"
        className="bg-[var(--empc-cream)]/30"
      />

      {/* ========== CONTACT CTA ========== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <OrganicShape className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] text-[var(--empc-gold)]/10" />
        </div>

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
            <span className="text-[var(--empc-text)]">Prêt(e) à retrouver </span>
            <span className="text-[var(--empc-gold)] italic">l&apos;harmonie ?</span>
          </motion.h2>

          <motion.p
            className="text-lg opacity-70 max-w-md mx-auto mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: true }}
          >
            Le premier pas vers une relation apaisée avec l&apos;alimentation commence ici
          </motion.p>

          <motion.a
            href="sms:0692460789"
            className="inline-flex items-center gap-4 bg-[var(--empc-gold)] text-white px-10 py-5 rounded-full text-lg font-medium shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
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

          {/* Back links */}
          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/groupal/mbct"
              className="inline-flex items-center gap-2 text-[var(--empc-sage)] font-medium hover:gap-3 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Voir le programme MBCT
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[var(--empc-primary)] font-medium hover:gap-3 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Retour à l&apos;accueil
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
