'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Layout } from '@/components/layout';
import { SectionDivider, AccentLine } from '@/components/section-divider';

// Images - tropical botanical aesthetic
const IMAGES = {
  portrait: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80',
  botanical: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1600&q=80',
  leaves: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&q=80',
};

// Custom easing curves
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
const easeOutQuint: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Organic shapes for botanical decorations
function LeafDecoration({ className, delay = 0 }: { className?: string; delay?: number }) {
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
        transition={{ delay: delay + 0.3, duration: 2, ease: easeOutQuint }}
      />
      <motion.path
        d="M50 30 L50 130"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: delay + 0.8, duration: 1.5, ease: easeOutQuint }}
      />
      {[40, 60, 80, 100].map((y, i) => (
        <motion.path
          key={y}
          d={`M50 ${y} Q${30 - i * 3} ${y + 10}, ${25 + i * 2} ${y + 5}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: delay + 1 + i * 0.15, duration: 0.8, ease: easeOutQuint }}
        />
      ))}
    </motion.svg>
  );
}

// Floating botanical element
function FloatingLeaf({ style, delay = 0 }: { style?: React.CSSProperties; delay?: number }) {
  return (
    <motion.div
      style={style}
      className="absolute pointer-events-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: [0, 0.6, 0.6, 0],
        y: [20, -100, -200, -300],
        x: [0, 20, -10, 30],
        rotate: [0, 45, 90, 135]
      }}
      transition={{
        duration: 12,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <svg width="20" height="30" viewBox="0 0 20 30" fill="currentColor" className="text-[var(--empc-sage)]">
        <path d="M10 0 C4 6, 2 15, 6 24 C8 28, 10 30, 10 30 C10 30, 12 28, 14 24 C18 15, 16 6, 10 0" />
      </svg>
    </motion.div>
  );
}

// Data
const parcoursProfessionnel = [
  {
    period: '1981-1991',
    title: 'Médecine Générale',
    description: '10 ans de Médecine générale en remplacement. Thèse de doctorat en Médecine sur le Diabète à la Réunion.',
    icon: '🌱'
  },
  {
    period: '1991',
    title: 'Cabinet Libéral à St-Paul',
    description: 'Création du cabinet en Homéopathie (DU Bordeaux 2, 1989), Médecine du sport (CES) et Nutrition (DU diététique et hygiène alimentaire, 1986).',
    icon: '🌿'
  },
  {
    period: '1991-2001',
    title: 'Association SHOI',
    description: "Création, Présidence et Enseignement à l'association SHOI pour l'Enseignement de l'Homéopathie à La Réunion et à Madagascar pendant 10 ans.",
    icon: '🌳'
  }
];

const formations = [
  {
    period: '1999-2001',
    title: 'Analyse Transactionnelle',
    description: "2 ans d'Analyse Transactionnelle en travail groupal.",
    memoire: null,
    color: 'var(--empc-sage)'
  },
  {
    period: '2001-2004',
    title: 'Thérapie Comportementale et Cognitive',
    description: "Diplôme de TCC en 3 ans, membre de l'Association Française de TCC.",
    memoire: 'Les troubles du comportement alimentaire traités par les TCC',
    color: 'var(--empc-primary)'
  },
  {
    period: '2000-2007',
    title: 'Gestalt-Thérapie',
    description: "Formation à l'Institut Français de Gestalt thérapie, diplômée novembre 2007.",
    memoire: 'Confluence et Différenciation',
    color: 'var(--empc-gold)'
  },
  {
    period: '2009-2012',
    title: 'Thérapie Systémique',
    description: 'Thérapeute Systémicienne Familiale et Conjugale (IDES).',
    memoire: "L'utilisation du jeu de loi dans la relation d'emprise",
    color: 'var(--empc-terracotta)'
  },
  {
    period: '2007-2011',
    title: 'Sexologie',
    description: 'Diplôme de Médecin Sexologue, Faculté de médecine de Lille/Amiens, obtenu octobre 2012. Membre SEXO974.',
    memoire: null,
    color: 'var(--empc-secondary)'
  }
];

const qualifications = [
  { text: 'Gestalt-Thérapeute', org: 'IFGT' },
  { text: 'Thérapies Comportementales et Cognitives', org: 'AFTCC' },
  { text: 'Thérapeute Systémicienne Familiale', org: 'IDES' },
  { text: 'Médecin Sexologue', org: 'Lille/Amiens' },
  { text: 'Instructrice MBCT certifiée', org: 'niveau 3' }
];

const activitesActuelles = [
  {
    year: '2012',
    title: "Création de l'EMPC",
    description: "Fondation de l'Espace Médical de Psychothérapies et de Travail Corporel Associé."
  },
  {
    year: 'Certifiée',
    title: 'Instructrice MBCT',
    description: 'Certification niveau 3 pour enseigner la Méditation de Pleine Conscience Cognitive.'
  },
  {
    year: 'Protocole',
    title: 'MECL',
    description: '« Manger et vivre en pleine conscience » - Méditation adaptée aux troubles du comportement alimentaire.'
  }
];

export default function DrDeblangeyPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const springConfig = { stiffness: 100, damping: 30 };
  const smoothY = useSpring(heroY, springConfig);

  return (
    <Layout>
      {/* ========== HERO - BOTANICAL SANCTUARY ========== */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(180deg, var(--empc-cream) 0%, var(--empc-background) 100%)' }}
      >
        {/* Dappled light effect - animated gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(156, 175, 136, 0.15) 0%, transparent 70%)',
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 115, 85, 0.1) 0%, transparent 70%)',
            }}
            animate={{
              x: [0, -30, 0],
              y: [0, -50, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        {/* Botanical leaf decorations */}
        <LeafDecoration
          className="absolute top-32 right-20 w-20 h-32 text-[var(--empc-sage)] opacity-30 hide-mobile"
          delay={0.5}
        />
        <LeafDecoration
          className="absolute bottom-40 left-16 w-16 h-24 text-[var(--empc-primary)] opacity-20 rotate-45 hide-mobile"
          delay={0.8}
        />
        <LeafDecoration
          className="absolute top-1/2 right-1/4 w-12 h-20 text-[var(--empc-gold)] opacity-25 -rotate-12 hide-mobile"
          delay={1.1}
        />

        {/* Floating leaves */}
        {[...Array(5)].map((_, i) => (
          <FloatingLeaf
            key={i}
            style={{ left: `${15 + i * 18}%`, bottom: '-5%' }}
            delay={i * 2.5}
          />
        ))}

        <motion.div
          className="container-wide relative z-10 pt-32 pb-20"
          style={{ y: smoothY, opacity: heroOpacity }}
        >
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Content - takes 7 columns */}
            <motion.div
              className="lg:col-span-7"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } }
              }}
            >
              {/* Eyebrow with botanical accent */}
              <motion.div
                className="flex items-center gap-4 mb-8"
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOutExpo } }
                }}
              >
                <div className="flex items-center gap-2">
                  <motion.span
                    className="text-2xl"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    🌿
                  </motion.span>
                  <span className="text-[var(--empc-gold)] text-xs tracking-[0.4em] uppercase font-medium">
                    Votre thérapeute
                  </span>
                </div>
                <motion.div
                  className="h-px flex-1 bg-gradient-to-r from-[var(--empc-gold)]/50 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 1.2, ease: easeOutExpo }}
                />
              </motion.div>

              {/* Main title - editorial style */}
              <motion.h1
                className="font-heading mb-6"
                variants={{
                  hidden: { opacity: 0, y: 60 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: easeOutExpo } }
                }}
              >
                <span className="block text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-[-0.03em]">
                  Dr Joëlle
                </span>
                <span className="block text-[clamp(3rem,9vw,7rem)] text-[var(--empc-primary)] italic leading-[0.9] tracking-[-0.04em]">
                  Deblangey
                </span>
              </motion.h1>

              {/* Subtitle with refined spacing */}
              <motion.p
                className="text-xl md:text-2xl opacity-70 mb-10 max-w-lg leading-relaxed tracking-wide"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } }
                }}
              >
                Médecin Psychothérapeute certifiée<br />
                <span className="text-[var(--empc-gold)]">Fondatrice de l&apos;EMPC</span>
              </motion.p>

              {/* Qualifications - floating credential leaves */}
              <motion.div
                className="flex flex-wrap gap-3 mb-12"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
                }}
              >
                {qualifications.map((qual, i) => (
                  <motion.div
                    key={qual.text}
                    className="group relative"
                    variants={{
                      hidden: { opacity: 0, y: 20, rotate: -5 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        rotate: 0,
                        transition: { duration: 0.6, ease: easeOutExpo }
                      }
                    }}
                    whileHover={{ y: -4, rotate: 2 }}
                  >
                    <div
                      className="px-4 py-2 rounded-full border border-[var(--empc-sage)]/30 bg-white/50 backdrop-blur-sm
                                 text-sm transition-all duration-300 group-hover:border-[var(--empc-primary)]/50
                                 group-hover:bg-white/80 group-hover:shadow-lg"
                    >
                      <span className="font-medium text-[var(--empc-text)]">{qual.text}</span>
                      <span className="text-[var(--empc-gold)] ml-1 text-xs">({qual.org})</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                className="flex flex-wrap gap-4"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } }
                }}
              >
                <motion.a
                  href="sms:0692460789"
                  className="btn-magnetic btn-primary group relative overflow-hidden"
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    Prendre rendez-vous
                  </span>
                </motion.a>

                <motion.span
                  className="inline-flex items-center gap-2 text-sm text-[var(--empc-text)]/60 self-center"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="w-2 h-2 rounded-full bg-[var(--empc-sage)] animate-pulse" />
                  SMS uniquement
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Portrait - takes 5 columns with organic frame */}
            <motion.div
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, x: 80, rotate: 3 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: easeOutExpo }}
            >
              {/* Organic background shape */}
              <motion.div
                className="absolute -inset-8 -z-10"
                style={{
                  background: 'linear-gradient(135deg, var(--empc-sage) 0%, var(--empc-primary) 100%)',
                  borderRadius: '60% 40% 50% 50% / 50% 50% 40% 60%',
                  opacity: 0.1,
                }}
                animate={{
                  borderRadius: [
                    '60% 40% 50% 50% / 50% 50% 40% 60%',
                    '50% 60% 40% 60% / 60% 40% 50% 50%',
                    '60% 40% 50% 50% / 50% 50% 40% 60%',
                  ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Portrait container */}
              <div className="relative">
                {/* Golden frame accent */}
                <motion.div
                  className="absolute -inset-3 rounded-[2.5rem] border-2 border-[var(--empc-gold)]/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />

                {/* Image */}
                <motion.div
                  className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl"
                  style={{ scale: heroScale }}
                >
                  <Image
                    src={IMAGES.portrait}
                    alt="Dr Joëlle Deblangey"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Dappled light overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `
                        radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.2) 0%, transparent 50%),
                        radial-gradient(ellipse at 70% 80%, rgba(92, 107, 74, 0.2) 0%, transparent 50%),
                        linear-gradient(to top, rgba(92, 107, 74, 0.3) 0%, transparent 40%)
                      `
                    }}
                  />
                </motion.div>

                {/* Experience badge - organic shape */}
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white rounded-[1.5rem] shadow-xl overflow-hidden"
                  initial={{ opacity: 0, y: 30, rotate: -10 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: 1, duration: 0.8, ease: easeOutExpo }}
                  whileHover={{ scale: 1.05, rotate: 3 }}
                >
                  <div className="px-8 py-6 relative">
                    {/* Decorative leaf */}
                    <div className="absolute top-2 right-2 text-[var(--empc-sage)] opacity-30 text-xl">🌿</div>
                    <div className="text-center">
                      <motion.span
                        className="block font-heading text-5xl text-[var(--empc-primary)]"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.3, duration: 0.6, type: "spring" }}
                      >
                        40<sup className="text-2xl">+</sup>
                      </motion.span>
                      <span className="text-xs tracking-[0.2em] uppercase text-[var(--empc-gold)]">
                        années
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* La Réunion badge */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-[var(--empc-gold)] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                  initial={{ opacity: 0, scale: 0, rotate: 20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
                  whileHover={{ scale: 1.1 }}
                >
                  La Réunion 🏝️
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-[var(--empc-text)]/40"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs tracking-[0.3em] uppercase">Découvrir</span>
            <svg width="20" height="30" viewBox="0 0 20 30" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 5v20M5 20l5 5 5-5" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ========== DIVIDER: Hero → Parcours ========== */}
      <SectionDivider variant="curve" color="var(--empc-background)" height={80} />

      {/* ========== PARCOURS - GROWING TREE TIMELINE ========== */}
      <section className="py-32 relative overflow-hidden">
        {/* Liseré doré en haut */}
        <AccentLine color="var(--empc-gold)" position="top" thickness={3} variant="straight" />
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239CAF88' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container-wide relative z-10">
          {/* Section header */}
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-3xl">🌱</span>
              <span className="text-[var(--empc-gold)] text-xs tracking-[0.4em] uppercase font-medium">
                Parcours
              </span>
              <span className="text-3xl">🌳</span>
            </motion.div>
            <h2 className="font-heading text-display">
              <span className="text-[var(--empc-text)]">40 ans de </span>
              <span className="text-[var(--empc-primary)] italic">croissance</span>
            </h2>
          </motion.div>

          {/* Tree timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Tree trunk - central line */}
            <motion.div
              className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2"
              style={{
                background: 'linear-gradient(to bottom, var(--empc-sage), var(--empc-primary-dark))',
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: easeOutExpo }}
            />

            {parcoursProfessionnel.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.period}
                  className={`relative flex items-center mb-20 last:mb-0 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                >
                  {/* Content card */}
                  <div className={`w-[calc(50%-3rem)] ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <motion.div
                      className="bg-white rounded-3xl p-8 shadow-lg relative overflow-hidden group"
                      whileHover={{ y: -8, rotate: isLeft ? -1 : 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Decorative gradient */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(${isLeft ? '135deg' : '225deg'}, var(--empc-sage)/10 0%, transparent 50%)`
                        }}
                      />

                      <div className="relative z-10">
                        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--empc-sage)]/10 text-[var(--empc-primary)] mb-4">
                          {item.period}
                        </span>
                        <h3 className="font-heading text-2xl mb-3 text-[var(--empc-text)]">{item.title}</h3>
                        <p className="text-sm opacity-70 leading-relaxed">{item.description}</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center node - tree ring */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 z-10"
                    whileHover={{ scale: 1.3 }}
                  >
                    <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl border-4 border-[var(--empc-sage)]">
                      {item.icon}
                    </div>
                  </motion.div>

                  {/* Spacer */}
                  <div className="w-[calc(50%-3rem)]" />
                </motion.div>
              );
            })}

            {/* Tree crown at bottom */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
            >
              <div className="w-20 h-20 rounded-full bg-[var(--empc-primary)] flex items-center justify-center text-3xl shadow-xl">
                🌺
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== DIVIDER: Parcours → Formations ========== */}
      <SectionDivider variant="diagonal-down" color="var(--empc-cream)" height={70} />

      {/* ========== FORMATIONS - GARDEN OF EXPERTISE ========== */}
      <section
        className="py-32 relative"
        style={{ background: 'linear-gradient(180deg, var(--empc-background) 0%, var(--empc-cream) 50%, var(--empc-background) 100%)' }}
      >
        {/* Liseré doré à gauche */}
        <AccentLine color="var(--empc-gold)" position="left" thickness={4} variant="straight" />
        <div className="container-wide">
          {/* Section header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[var(--empc-gold)] text-xs tracking-[0.4em] uppercase font-medium">
              Formations
            </span>
            <h2 className="font-heading text-display mt-4">
              <span className="text-[var(--empc-text)]">Un jardin d&apos;</span>
              <span className="text-[var(--empc-primary)] italic">expertise</span>
            </h2>
            <p className="mt-4 text-lg opacity-60 max-w-xl mx-auto">
              Chaque formation est une graine plantée, cultivée avec patience
            </p>
          </motion.div>

          {/* Formations as garden beds - asymmetric layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {formations.map((formation, i) => (
              <motion.article
                key={formation.title}
                className={`group relative ${i === 0 ? 'lg:col-span-2' : ''}`}
                initial={{ opacity: 0, y: 50, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: easeOutExpo }}
              >
                <motion.div
                  className="h-full bg-white rounded-[2rem] p-8 shadow-lg overflow-hidden relative"
                  whileHover={{ y: -10, rotate: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Color accent bar */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ background: formation.color }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                  />

                  {/* Decorative leaf */}
                  <motion.div
                    className="absolute top-4 right-4 text-2xl opacity-20 group-hover:opacity-50 transition-opacity"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    🌿
                  </motion.div>

                  {/* Period badge */}
                  <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-5"
                    style={{
                      background: `color-mix(in srgb, ${formation.color} 15%, transparent)`,
                      color: formation.color
                    }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ background: formation.color }} />
                    {formation.period}
                  </div>

                  <h3 className="font-heading text-xl mb-3 text-[var(--empc-text)] group-hover:text-[var(--empc-primary)] transition-colors">
                    {formation.title}
                  </h3>

                  <p className="text-sm opacity-70 leading-relaxed mb-5">
                    {formation.description}
                  </p>

                  {formation.memoire && (
                    <motion.div
                      className="pt-5 border-t border-[var(--empc-sage)]/20"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-lg">📜</span>
                        <div>
                          <span className="text-xs uppercase tracking-wider text-[var(--empc-gold)] font-medium block mb-1">
                            Mémoire
                          </span>
                          <p className="text-sm italic opacity-80">« {formation.memoire} »</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ========== DIVIDER: Formations → Aujourd'hui ========== */}
      <SectionDivider variant="wave" color="var(--empc-background)" height={80} />

      {/* ========== AUJOURD'HUI - FLOWERING PRESENT ========== */}
      <section className="py-32 relative overflow-hidden">
        {/* Liseré doré diagonal en haut */}
        <AccentLine color="var(--empc-gold)" position="top" thickness={3} variant="diagonal" />
        {/* Ambient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(156, 175, 136, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 30%, rgba(139, 115, 85, 0.08) 0%, transparent 50%),
              var(--empc-background)
            `
          }}
        />

        <div className="container-wide relative z-10">
          {/* Section header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <motion.span
                className="text-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🌺
              </motion.span>
              <span className="text-[var(--empc-gold)] text-xs tracking-[0.4em] uppercase font-medium">
                Aujourd&apos;hui
              </span>
            </div>
            <h2 className="font-heading text-display">
              <span className="text-[var(--empc-text)]">En pleine </span>
              <span className="text-[var(--empc-primary)] italic">floraison</span>
            </h2>
          </motion.div>

          {/* Current activities - horizontal scroll on mobile */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {activitesActuelles.map((activite, i) => (
              <motion.div
                key={activite.title}
                className="text-center relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
              >
                {/* Connecting line */}
                {i < activitesActuelles.length - 1 && (
                  <div className="absolute top-12 left-1/2 w-full h-px bg-[var(--empc-sage)]/30 hidden md:block" />
                )}

                <motion.div
                  className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center relative"
                  style={{
                    background: 'linear-gradient(135deg, var(--empc-primary) 0%, var(--empc-sage) 100%)',
                  }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <span className="text-white font-heading text-lg">{activite.year}</span>

                  {/* Petal decorations */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  >
                    {[0, 72, 144, 216, 288].map((deg) => (
                      <div
                        key={deg}
                        className="absolute w-3 h-3 rounded-full bg-[var(--empc-gold)]/30"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `rotate(${deg}deg) translateY(-40px) translateX(-50%)`,
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>

                <h3 className="font-heading text-xl mb-3">{activite.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed max-w-xs mx-auto">
                  {activite.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== DIVIDER: Aujourd'hui → MBCT ========== */}
      <SectionDivider variant="curve-reverse" color="var(--empc-cream)" height={60} className="opacity-50" />

      {/* ========== ATELIER MBCT - SPECIAL SANCTUARY ========== */}
      <section className="py-20 relative">
        {/* Liseré doré à droite */}
        <AccentLine color="var(--empc-gold)" position="right" thickness={4} variant="straight" />
        <div className="container-narrow">
          <motion.div
            className="relative rounded-[3rem] overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Background with botanical pattern */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(135deg, var(--empc-sage)/20 0%, var(--empc-cream) 50%, var(--empc-gold)/10 100%)
                `
              }}
            />

            {/* Decorative leaves */}
            <motion.div
              className="absolute top-0 right-0 w-40 h-40 opacity-10"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 100 100" fill="currentColor" className="text-[var(--empc-primary)]">
                <path d="M50 0 C30 20, 20 40, 30 60 C35 70, 50 80, 50 80 C50 80, 65 70, 70 60 C80 40, 70 20, 50 0" />
                <path d="M50 0 C30 20, 20 40, 30 60 C35 70, 50 80, 50 80 C50 80, 65 70, 70 60 C80 40, 70 20, 50 0" transform="rotate(72 50 50)" />
                <path d="M50 0 C30 20, 20 40, 30 60 C35 70, 50 80, 50 80 C50 80, 65 70, 70 60 C80 40, 70 20, 50 0" transform="rotate(144 50 50)" />
                <path d="M50 0 C30 20, 20 40, 30 60 C35 70, 50 80, 50 80 C50 80, 65 70, 70 60 C80 40, 70 20, 50 0" transform="rotate(216 50 50)" />
                <path d="M50 0 C30 20, 20 40, 30 60 C35 70, 50 80, 50 80 C50 80, 65 70, 70 60 C80 40, 70 20, 50 0" transform="rotate(288 50 50)" />
              </svg>
            </motion.div>

            <div className="relative z-10 p-12 lg:p-16">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--empc-primary)] text-white text-sm font-medium mb-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span>🧘</span>
                    <span>Atelier spécial</span>
                  </motion.div>

                  <h2 className="font-heading text-3xl lg:text-4xl mb-4">
                    <span className="text-[var(--empc-text)]">Méditation MBCT</span><br />
                    <span className="text-[var(--empc-primary)] italic">pour Avancés</span>
                  </h2>

                  <p className="opacity-70 leading-relaxed">
                    Spécialement conçu pour ceux ayant validé le niveau 1 MBCT.
                    Approfondissez votre pratique de la pleine conscience dans un cadre bienveillant et verdoyant.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Schedule */}
                  <motion.div
                    className="flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-2xl p-4"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-14 h-14 rounded-xl bg-[var(--empc-sage)]/20 flex items-center justify-center text-2xl">
                      📅
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[var(--empc-gold)] font-medium">Quand</span>
                      <p className="font-heading text-lg">Tous les mercredis, 18h-20h</p>
                    </div>
                  </motion.div>

                  {/* Price */}
                  <motion.div
                    className="flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-2xl p-4"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-14 h-14 rounded-xl bg-[var(--empc-gold)]/20 flex items-center justify-center text-2xl">
                      🌿
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[var(--empc-gold)] font-medium">Tarif</span>
                      <p className="font-heading text-lg">40 € par participant</p>
                      <span className="text-xs opacity-60">(minimum 5 participants)</span>
                    </div>
                  </motion.div>

                  <motion.a
                    href="sms:0692460789"
                    className="btn-magnetic btn-primary inline-flex items-center gap-2 w-full justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    S&apos;inscrire par SMS
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== DIVIDER: MBCT → Contact ========== */}
      <SectionDivider variant="diagonal-up" color="var(--empc-background)" height={70} />

      {/* ========== CONTACT - PEACEFUL GARDEN ========== */}
      <section className="py-32 relative overflow-hidden">
        {/* Liseré doré courbé en haut */}
        <AccentLine color="var(--empc-gold)" position="top" thickness={3} variant="curved" />
        {/* Ambient gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 100%, rgba(156, 175, 136, 0.15) 0%, transparent 60%),
              var(--empc-background)
            `
          }}
        />

        {/* Floating botanical elements */}
        <motion.div
          className="absolute top-20 left-10 text-6xl opacity-10"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          🌿
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-5xl opacity-10"
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        >
          🌺
        </motion.div>

        <div className="container-narrow text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Decorative stem */}
            <motion.div
              className="w-px h-24 mx-auto mb-8"
              style={{
                background: 'linear-gradient(to bottom, transparent, var(--empc-sage), transparent)'
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
            />

            <motion.span
              className="text-[var(--empc-gold)] text-xs tracking-[0.4em] uppercase font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Contact
            </motion.span>

            <motion.h2
              className="font-heading text-display mt-4 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-[var(--empc-text)]">Cultivons votre </span>
              <span className="text-[var(--empc-primary)] italic">bien-être</span>
            </motion.h2>

            <motion.p
              className="text-lg opacity-70 max-w-md mx-auto mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              Envoyez un SMS pour convenir d&apos;un premier entretien
            </motion.p>

            <motion.a
              href="sms:0692460789"
              className="inline-flex items-center gap-4 bg-[var(--empc-primary)] text-white px-12 py-6 rounded-full text-xl font-medium shadow-2xl relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              whileHover={{
                scale: 1.05,
                y: -5,
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Hover gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[var(--empc-sage)] to-[var(--empc-primary)]"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />

              <span className="relative z-10 flex items-center gap-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                0692 46 07 89
              </span>
            </motion.a>

            <motion.p
              className="mt-6 text-sm opacity-50 flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <span>SMS uniquement</span>
              <span>·</span>
              <span>La Réunion 🏝️</span>
            </motion.p>

            {/* Back link */}
            <motion.div
              className="mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[var(--empc-primary)] font-medium link-hover group"
              >
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  whileHover={{ x: -5 }}
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </motion.svg>
                <span>Retour à l&apos;accueil</span>
                <span className="opacity-50 group-hover:opacity-100 transition-opacity">🌿</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
