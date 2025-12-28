'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: easeOutExpo }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

// Legal sections data
const legalSections = [
  {
    title: 'Éditeur du site',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    content: [
      { label: 'Responsable', value: 'Dr Joëlle DEBLANGEY' },
      { label: 'Profession', value: 'Docteur en médecine, certifiée en Psychothérapies' },
      { label: 'Statut', value: 'Professionnel libéral - Secteur 3' },
    ]
  },
  {
    title: 'Coordonnées',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    content: [
      { label: 'Téléphone', value: '0692 46 07 89 (SMS uniquement)' },
      { label: 'Localisation', value: 'La Réunion, France' },
      { label: 'Site web', value: 'https://empc.re' },
    ]
  },
  {
    title: 'Hébergement',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
    content: [
      { label: 'Hébergeur', value: 'Vercel Inc.' },
      { label: 'Adresse', value: '340 S Lemon Ave #4133, Walnut, CA 91789, USA' },
      { label: 'Site', value: 'https://vercel.com' },
    ]
  },
  {
    title: 'Propriété intellectuelle',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    paragraphs: [
      "L'ensemble du contenu de ce site (textes, images, logo, structure) est la propriété exclusive de l'EMPC et du Dr Joëlle Deblangey, sauf mention contraire.",
      "Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site est interdite sans autorisation écrite préalable.",
    ]
  },
  {
    title: 'Limitation de responsabilité',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    paragraphs: [
      "Les informations fournies sur ce site sont à titre indicatif et ne sauraient constituer un avis médical. Pour tout problème de santé, consultez un professionnel qualifié.",
      "L'EMPC ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation de ce site ou de l'impossibilité d'y accéder.",
    ]
  },
  {
    title: 'Données personnelles',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    paragraphs: [
      "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles.",
    ],
    link: { text: 'Consulter notre politique de confidentialité', href: '/confidentialite' }
  },
];

export default function MentionsLegalesPage() {
  return (
    <main className="bg-[var(--empc-background)] min-h-screen">
      <Header transparent={false} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, var(--empc-sage) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, var(--empc-gold) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container-narrow relative z-10">
          <motion.div
            className="text-center"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Overline */}
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              variants={fadeInUp}
              custom={0}
            >
              <span className="w-10 h-px bg-[var(--empc-gold)]" />
              <span className="text-xs tracking-[0.3em] uppercase text-[var(--empc-gold)] font-medium">
                Informations légales
              </span>
              <span className="w-10 h-px bg-[var(--empc-gold)]" />
            </motion.div>

            {/* Title */}
            <motion.h1
              className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6"
              variants={fadeInUp}
              custom={0.1}
            >
              Mentions{' '}
              <span className="text-[var(--empc-primary)]">légales</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg opacity-60 max-w-xl mx-auto"
              variants={fadeInUp}
              custom={0.2}
            >
              Informations relatives à l&apos;éditeur du site et aux conditions d&apos;utilisation
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20 md:pb-32">
        <div className="container-narrow">
          <motion.div
            className="space-y-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {legalSections.map((section, index) => (
              <motion.article
                key={section.title}
                className="relative group"
                variants={fadeInUp}
                custom={index * 0.05}
              >
                {/* Card */}
                <div className="relative bg-white rounded-[1.5rem] p-6 md:p-8 shadow-lg shadow-black/[0.03] border border-[var(--empc-sage)]/10 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-black/[0.05]">
                  {/* Decorative accent */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[var(--empc-primary)] to-[var(--empc-sage)] rounded-l-full opacity-60" />

                  {/* Header */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[var(--empc-primary)]/10 flex items-center justify-center text-[var(--empc-primary)]">
                      {section.icon}
                    </div>
                    <h2 className="font-heading text-xl md:text-2xl pt-2">
                      {section.title}
                    </h2>
                  </div>

                  {/* Content - Key/Value pairs */}
                  {section.content && (
                    <div className="space-y-3 ml-16">
                      {section.content.map((item) => (
                        <div key={item.label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                          <span className="text-sm font-medium text-[var(--empc-gold)] min-w-[120px]">
                            {item.label}
                          </span>
                          <span className="opacity-70">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Content - Paragraphs */}
                  {section.paragraphs && (
                    <div className="space-y-4 ml-16">
                      {section.paragraphs.map((para, i) => (
                        <p key={i} className="opacity-70 leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Link */}
                  {section.link && (
                    <div className="ml-16 mt-4">
                      <Link
                        href={section.link.href}
                        className="inline-flex items-center gap-2 text-[var(--empc-primary)] hover:text-[var(--empc-secondary)] transition-colors font-medium"
                      >
                        {section.link.text}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Last updated notice */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm opacity-40">
              Dernière mise à jour : Décembre 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Back to home CTA */}
      <section className="pb-20 md:pb-32">
        <div className="container-narrow">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
          >
            <Link href="/">
              <motion.button
                className="btn-magnetic btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Retour à l&apos;accueil
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
