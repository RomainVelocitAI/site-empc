'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Layout } from '@/components/layout';
import { ThumbnailCarousel, CarouselItem } from '@/components/framer-thumbnail-carousel';

// Images pour le carousel méditation
const meditationImages: CarouselItem[] = [
  { id: 1, url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80', title: 'Méditation guidée', description: 'Séances en petit groupe' },
  { id: 2, url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80', title: 'Pratique du yoga', description: 'Postures douces et respirations' },
  { id: 3, url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80', title: 'Connexion à la nature', description: 'Exercices en plein air' },
  { id: 4, url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80', title: 'Moments de calme', description: 'Espaces de respiration' },
  { id: 5, url: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&q=80', title: 'Bord de mer', description: 'La Réunion, cadre idéal' },
];

// Custom easing
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Breathing circle animation - represents mindfulness
function BreathingCircle({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.3, 0.5, 0.3]
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="w-full h-full rounded-full border border-[var(--empc-sage)]/30" />
    </motion.div>
  );
}

// Ripple effect for zen aesthetic
function ZenRipple({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute inset-0 rounded-full border border-[var(--empc-primary)]/10"
      initial={{ scale: 0.5, opacity: 0.8 }}
      animate={{ scale: 2.5, opacity: 0 }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeOut"
      }}
    />
  );
}

// Session step component
function SessionStep({ number, title, description, delay = 0 }: {
  number: number;
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
      whileHover={{ x: 8 }}
      className="relative pl-16 py-6 group"
    >
      {/* Number circle */}
      <motion.div
        className="absolute left-0 top-6 w-10 h-10 rounded-full bg-gradient-to-br from-[var(--empc-sage)] to-[var(--empc-sage)]/60 flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1, rotate: 10 }}
      >
        <span className="font-heading text-white text-lg">{number}</span>
      </motion.div>

      {/* Connecting line */}
      <div className="absolute left-[19px] top-16 w-px h-[calc(100%-2rem)] bg-gradient-to-b from-[var(--empc-sage)]/40 to-transparent" />

      <h4 className="font-heading text-xl text-[var(--empc-text)] mb-2 group-hover:text-[var(--empc-primary)] transition-colors">
        {title}
      </h4>
      <p className="text-sm opacity-70 leading-relaxed">{description}</p>
    </motion.div>
  );
}

// Indication pill
function IndicationPill({ text, index }: { text: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: easeOutExpo }}
      whileHover={{ scale: 1.05, y: -3 }}
      className="px-5 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-[var(--empc-sage)]/20 shadow-sm hover:shadow-md hover:border-[var(--empc-primary)]/30 transition-all cursor-default"
    >
      <span className="text-sm font-medium text-[var(--empc-text)]/80">{text}</span>
    </motion.div>
  );
}

export default function MBCTPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const programRef = useRef(null);
  const programInView = useInView(programRef, { once: true, margin: "-100px" });

  const indications = [
    "Prévention de la rechute dépressive",
    "Troubles anxieux et phobiques",
    "Troubles du comportement alimentaire",
    "Addictions",
    "Troubles du contrôle des impulsions",
    "Effondrement professionnel (burn-out)"
  ];

  const programSteps = [
    { title: "Pilote automatique", description: "Prendre conscience de nos automatismes et habitudes mentales qui nous éloignent du moment présent." },
    { title: "Vivre dans sa tête", description: "Observer comment nos pensées créent notre réalité et apprendre à s'en distancier." },
    { title: "Rassembler l'esprit dispersé", description: "Cultiver la concentration et l'attention soutenue par la pratique de la respiration." },
    { title: "Reconnaître l'aversion", description: "Identifier nos réactions automatiques face aux expériences désagréables." },
    { title: "Accepter et laisser être", description: "Développer une attitude d'acceptation bienveillante envers soi-même." },
    { title: "Les pensées ne sont pas des faits", description: "Comprendre la nature des pensées et leur impact sur nos émotions." },
    { title: "Comment prendre soin de moi", description: "Élaborer un plan d'action personnalisé pour maintenir l'équilibre." },
    { title: "Maintenir et approfondir", description: "Intégrer la pleine conscience dans la vie quotidienne." }
  ];

  return (
    <Layout>
      {/* ========== HERO SECTION ========== */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #f8f6f3 0%, var(--empc-background) 100%)' }}
      >
        {/* Zen-inspired background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large breathing circles */}
          <BreathingCircle className="absolute -top-32 -right-32 w-[500px] h-[500px]" delay={0} />
          <BreathingCircle className="absolute top-1/2 -left-48 w-[400px] h-[400px]" delay={2} />
          <BreathingCircle className="absolute -bottom-24 right-1/4 w-[300px] h-[300px]" delay={4} />

          {/* Subtle gradient orbs */}
          <motion.div
            className="absolute top-20 right-20 w-[600px] h-[600px] rounded-full opacity-40"
            style={{
              background: 'radial-gradient(circle, rgba(139, 115, 85, 0.15) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Ripple center - represents focus point */}
          <div className="absolute top-1/3 right-1/4 w-16 h-16">
            <ZenRipple delay={0} />
            <ZenRipple delay={1} />
            <ZenRipple delay={2} />
            <ZenRipple delay={3} />
          </div>
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
                <span className="text-[var(--empc-sage)]">/</span>
                <span className="text-xs tracking-[0.2em] uppercase text-[var(--empc-sage)]">
                  Travail Groupal
                </span>
              </motion.div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--empc-sage)]/10 border border-[var(--empc-sage)]/20 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--empc-sage)] animate-pulse" />
                <span className="text-xs tracking-wider uppercase text-[var(--empc-sage)] font-medium">
                  Programme en groupe
                </span>
              </motion.div>

              {/* Title */}
              <h1 className="font-heading mb-6">
                <motion.span
                  className="block text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-[var(--empc-text)]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Méditation
                </motion.span>
                <motion.span
                  className="block text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1] tracking-[-0.03em] text-[var(--empc-primary)] italic"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  MBCT
                </motion.span>
              </h1>

              <motion.p
                className="text-lg md:text-xl opacity-70 max-w-xl leading-relaxed mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Thérapie Cognitive basée sur la Pleine Conscience pour prévenir les rechutes dépressives
              </motion.p>

              {/* Key info cards */}
              <motion.div
                className="flex flex-wrap gap-4 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--empc-sage)]">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span className="text-sm font-medium">8 séances</span>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--empc-sage)]">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="text-sm font-medium">2h30 par séance</span>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--empc-sage)]">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span className="text-sm font-medium">Petit groupe</span>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.a
                  href="sms:0692460789"
                  className="btn-magnetic btn-primary"
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Entretien préalable gratuit
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

            {/* Visual element - Meditation illustration */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: easeOutExpo }}
            >
              <div className="relative aspect-square max-w-[500px] mx-auto">
                {/* Concentric circles representing mindfulness */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full border"
                      style={{
                        width: `${60 + i * 20}%`,
                        height: `${60 + i * 20}%`,
                        borderColor: `rgba(139, 115, 85, ${0.3 - i * 0.05})`,
                      }}
                      animate={{
                        scale: [1, 1.02, 1],
                      }}
                      transition={{
                        duration: 4,
                        delay: i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.div>

                {/* Center image */}
                <motion.div
                  className="absolute inset-[15%] rounded-full overflow-hidden shadow-2xl"
                  animate={{
                    boxShadow: [
                      "0 25px 50px -12px rgba(139, 115, 85, 0.25)",
                      "0 25px 60px -12px rgba(139, 115, 85, 0.35)",
                      "0 25px 50px -12px rgba(139, 115, 85, 0.25)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80"
                    alt="Méditation pleine conscience"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--empc-sage)]/30 to-transparent" />
                </motion.div>

                {/* Floating elements */}
                <motion.div
                  className="absolute top-0 right-10 px-4 py-2 rounded-full bg-white/90 shadow-lg backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <span className="text-xs font-medium text-[var(--empc-sage)]">Pleine Conscience</span>
                </motion.div>

                <motion.div
                  className="absolute bottom-10 left-0 px-4 py-2 rounded-full bg-white/90 shadow-lg backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  <span className="text-xs font-medium text-[var(--empc-primary)]">Certifiée niveau 3</span>
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
          >
            {/* Quote */}
            <div className="relative mb-16">
              <span className="absolute -top-6 -left-2 text-[80px] font-heading text-[var(--empc-sage)]/15 leading-none select-none">
                &laquo;
              </span>
              <blockquote className="pl-8 font-heading text-2xl md:text-3xl italic leading-relaxed text-[var(--empc-text)]">
                La Mindfulness Based Cognitive Therapy est une approche de groupe développée par Zindel Segal, John Teasdale et Mark Williams.
              </blockquote>
            </div>

            {/* Main description */}
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="font-heading text-2xl mb-6 text-[var(--empc-text)]">
                  Qu&apos;est-ce que la MBCT ?
                </h2>
                <p className="text-lg leading-relaxed opacity-80 mb-6">
                  La <strong className="text-[var(--empc-primary)]">MBCT</strong> (Thérapie Cognitive basée sur la Pleine Conscience)
                  est destinée à prévenir les rechutes dépressives chez les patients en rémission d&apos;une dépression unipolaire récurrente.
                </p>
                <p className="text-lg leading-relaxed opacity-70">
                  Ce programme combine les techniques de la thérapie cognitive avec les pratiques de méditation de pleine conscience
                  pour aider les participants à reconnaître et à se désengager des schémas de pensée négatifs.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="p-8 rounded-3xl bg-gradient-to-br from-[var(--empc-sage)]/10 to-[var(--empc-cream)]/50 border border-[var(--empc-sage)]/10">
                  <h3 className="font-heading text-lg mb-4 text-[var(--empc-sage)]">Validation scientifique</h3>
                  <p className="text-sm leading-relaxed opacity-70 mb-4">
                    La MBCT est reconnue par la Haute Autorité de Santé (HAS) comme traitement de prévention
                    des rechutes dépressives. Son efficacité a été démontrée par de nombreuses études cliniques.
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[var(--empc-sage)]/20">
                    <div className="w-10 h-10 rounded-full bg-[var(--empc-sage)]/20 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--empc-sage)]">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-[var(--empc-text)]">
                      Dr Deblangey : Instructrice certifiée niveau 3
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== INDICATIONS ========== */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[var(--empc-cream)]/30 to-transparent">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[var(--empc-sage)] text-xs tracking-[0.3em] uppercase font-medium">
              Pour qui ?
            </span>
            <h2 className="font-heading text-display mt-4">
              <span className="text-[var(--empc-text)]">Indications </span>
              <span className="text-[var(--empc-primary)] italic">médicales</span>
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {indications.map((indication, i) => (
              <IndicationPill key={indication} text={indication} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROGRAMME 8 SÉANCES ========== */}
      <section ref={programRef} className="py-24 relative">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Left - Title & description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={programInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="lg:sticky lg:top-32"
            >
              <span className="text-[var(--empc-sage)] text-xs tracking-[0.3em] uppercase font-medium">
                Le Programme
              </span>
              <h2 className="font-heading text-display mt-4 mb-6">
                <span className="text-[var(--empc-text)]">8 séances pour </span>
                <span className="text-[var(--empc-primary)] italic">transformer</span>
                <span className="text-[var(--empc-text)]"> votre rapport au mental</span>
              </h2>
              <p className="opacity-70 leading-relaxed mb-8">
                Chaque séance de 2h30 vous guide progressivement vers une nouvelle façon
                d&apos;être en relation avec vos pensées et émotions. Les séances sont espacées
                de 8 jours pour permettre l&apos;intégration des pratiques.
              </p>

              {/* Visual element */}
              <div className="relative w-48 h-48 mx-auto lg:mx-0">
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--empc-sage)]/20 to-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-4 rounded-full bg-white shadow-inner flex items-center justify-center">
                  <div className="text-center">
                    <span className="block font-heading text-4xl text-[var(--empc-sage)]">8</span>
                    <span className="block text-xs uppercase tracking-wider opacity-50">séances</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Steps */}
            <div className="space-y-2">
              {programSteps.map((step, i) => (
                <SessionStep
                  key={step.title}
                  number={i + 1}
                  title={step.title}
                  description={step.description}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== ORGANISATION & TARIFS ========== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--empc-sage)]/5 via-transparent to-[var(--empc-primary)]/5" />

        <div className="container-narrow relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[var(--empc-gold)] text-xs tracking-[0.3em] uppercase font-medium">
              Informations pratiques
            </span>
            <h2 className="font-heading text-display mt-4">
              <span className="text-[var(--empc-text)]">Organisation & </span>
              <span className="text-[var(--empc-primary)] italic">Tarifs</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Schedule card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[var(--empc-sage)]/15 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--empc-sage)]">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl text-[var(--empc-text)]">Horaires</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-[var(--empc-text)]/80">
                  <span className="w-2 h-2 rounded-full bg-[var(--empc-sage)]" />
                  Vendredis 18h - 20h30
                </li>
                <li className="flex items-center gap-3 text-[var(--empc-text)]/80">
                  <span className="w-2 h-2 rounded-full bg-[var(--empc-sage)]" />
                  Samedis 10h - 12h30
                </li>
              </ul>
              <p className="mt-6 text-sm opacity-60">
                8 séances espacées de 8 jours
              </p>
            </motion.div>

            {/* Prerequisite card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl bg-white shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[var(--empc-primary)]/15 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--empc-primary)]">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 12 15 22 5" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl text-[var(--empc-text)]">Inclusion</h3>
              </div>
              <p className="text-[var(--empc-text)]/80 leading-relaxed">
                L&apos;inclusion dans le groupe est soumise à un <strong>entretien préalable gratuit</strong> permettant
                de vérifier que le programme correspond à vos besoins.
              </p>
              <motion.a
                href="sms:0692460789"
                className="inline-flex items-center gap-2 mt-6 text-[var(--empc-primary)] font-medium hover:gap-3 transition-all"
                whileHover={{ x: 5 }}
              >
                Demander un entretien
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>
            </motion.div>
          </div>

          {/* Price card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-10 rounded-[2rem] bg-gradient-to-br from-[var(--empc-primary)] to-[var(--empc-primary-dark)] text-white overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 text-center">
              <span className="text-white/60 text-xs tracking-[0.3em] uppercase">Investissement pour le programme complet</span>

              <div className="mt-6 mb-4">
                <span className="font-heading text-6xl md:text-7xl">640€</span>
              </div>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
                <span className="px-4 py-2 rounded-full bg-white/10">8 séances de 2h30</span>
                <span className="px-4 py-2 rounded-full bg-white/10">80€ par séance</span>
              </div>

              <p className="mt-8 text-sm text-white/60 max-w-md mx-auto">
                Professionnelle non conventionnée, secteur 3. Possibilité de prise en charge partielle selon votre mutuelle.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== REFERENCES ========== */}
      <section className="py-16 border-t border-[var(--empc-sage)]/10">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading text-xl mb-8 opacity-70">Références & Ressources</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.a
                href="https://mbct-france.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl bg-white/60 backdrop-blur-sm border border-[var(--empc-sage)]/10 hover:bg-white hover:shadow-lg transition-all group"
                whileHover={{ x: 8 }}
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--empc-sage)]/10 flex items-center justify-center group-hover:bg-[var(--empc-sage)]/20 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--empc-sage)]">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </div>
                <div>
                  <span className="block font-medium text-[var(--empc-text)] group-hover:text-[var(--empc-primary)] transition-colors">MBCT France</span>
                  <span className="text-sm opacity-60">mbct-france.fr</span>
                </div>
              </motion.a>

              <motion.div
                className="flex items-center gap-4 p-5 rounded-2xl bg-white/60 backdrop-blur-sm border border-[var(--empc-sage)]/10"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--empc-primary)]/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--empc-primary)]">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <span className="block font-medium text-[var(--empc-text)]">Association ATCCOI</span>
                  <span className="text-sm opacity-60">Thérapies Cognitives Océan Indien</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== GALERIE - Thumbnail Carousel ========== */}
      <ThumbnailCarousel
        items={meditationImages}
        title="L'expérience MBCT"
        subtitle="Découvrez l'ambiance de nos séances de méditation pleine conscience"
        height="450px"
        className="bg-[var(--empc-cream)]/30"
      />

      {/* ========== CONTACT CTA ========== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <BreathingCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]" />
        </div>

        <div className="container-narrow text-center relative z-10">
          <motion.div
            className="w-px h-16 mx-auto mb-8"
            style={{
              background: 'linear-gradient(to bottom, transparent, var(--empc-sage), transparent)'
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
            <span className="text-[var(--empc-text)]">Prêt(e) à commencer </span>
            <span className="text-[var(--empc-primary)] italic">votre parcours ?</span>
          </motion.h2>

          <motion.p
            className="text-lg opacity-70 max-w-md mx-auto mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: true }}
          >
            Contactez-nous par SMS pour un entretien préalable gratuit et sans engagement
          </motion.p>

          <motion.a
            href="sms:0692460789"
            className="inline-flex items-center gap-4 bg-[var(--empc-sage)] text-white px-10 py-5 rounded-full text-lg font-medium shadow-xl"
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
              href="/groupal/mecl"
              className="inline-flex items-center gap-2 text-[var(--empc-sage)] font-medium hover:gap-3 transition-all"
            >
              Découvrir le protocole MECL
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
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
