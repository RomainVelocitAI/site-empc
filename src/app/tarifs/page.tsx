'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { SectionDivider, AccentLine } from '@/components/section-divider';

// Animation variants
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: easeOutExpo }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

// Pricing data
const therapiesIndividuelles = [
  { prestation: 'Entretien individuel (GESTALT et/ou TCC)', duree: '55 min', tarif: '75 €' },
  { prestation: 'Sexologie individuel', duree: '55 min', tarif: '75 €' },
  { prestation: 'Sexologie (avec partenaire)', duree: '55 min', tarif: '100 €' },
  { prestation: 'Nutrition comportementale', duree: '30 min', tarif: '55 €' },
];

const travailGroupe = [
  { protocole: 'Méditation Thérapeutique MBCT', format: '8 séances de 2h30', tarif: '640 €' },
  { protocole: 'Nutrition Comportementale et Méditation (MECL)', format: '8 séances', tarif: '560 €' },
];

const therapiesFamille = [
  { prestation: 'Thérapie de couple', duree: '1 heure', tarif: '110 €' },
  { prestation: 'Thérapie familiale', duree: '1h15', tarif: '150 €' },
];

const moyensPaiement = [
  { nom: 'Chèques', icon: '📝' },
  { nom: 'Virement immédiat', icon: '💳' },
  { nom: 'Espèces', icon: '💶' },
];

// Table Row Component with hover effect
function PriceRow({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <motion.tr
      className="group border-b border-[var(--empc-sage)]/10 last:border-0 hover:bg-[var(--empc-primary)]/[0.03] transition-colors duration-300"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: easeOutExpo }}
    >
      {children}
    </motion.tr>
  );
}

// Price Card Component
function PriceCard({
  title,
  subtitle,
  children,
  accentColor = 'var(--empc-primary)',
  delay = 0
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  accentColor?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: easeOutExpo }}
    >
      {/* Decorative background blob */}
      <div
        className="absolute -inset-4 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"
        style={{ background: `linear-gradient(135deg, ${accentColor}10, transparent)` }}
      />

      <div className="relative bg-white rounded-[2rem] shadow-lg shadow-black/[0.04] overflow-hidden border border-[var(--empc-sage)]/10">
        {/* Header */}
        <div
          className="relative px-8 py-6 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${accentColor}08, ${accentColor}03)` }}
        >
          {/* Decorative corner accent */}
          <div
            className="absolute top-0 right-0 w-32 h-32 translate-x-16 -translate-y-16 rounded-full opacity-20"
            style={{ background: accentColor }}
          />

          <h3 className="font-heading text-2xl md:text-3xl relative z-10" style={{ color: accentColor }}>
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm mt-2 opacity-70 relative z-10">{subtitle}</p>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export default function TarifsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <main className="bg-[var(--empc-background)] min-h-screen overflow-hidden">
      <Header transparent={false} />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large gradient orb */}
          <motion.div
            className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, var(--empc-sage) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating leaves pattern */}
          <svg className="absolute top-20 left-10 w-24 h-24 text-[var(--empc-primary)] opacity-10 animate-float" viewBox="0 0 100 100">
            <path d="M50 10 Q80 40 50 90 Q20 40 50 10" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-10 right-20 w-16 h-16 text-[var(--empc-secondary)] opacity-10 animate-drift" viewBox="0 0 100 100">
            <path d="M50 10 Q80 40 50 90 Q20 40 50 10" fill="currentColor" />
          </svg>
        </div>

        <motion.div
          className="container-wide relative z-10"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <motion.div
            className="text-center max-w-3xl mx-auto"
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
              <span className="w-12 h-px bg-[var(--empc-gold)]" />
              <span className="text-xs tracking-[0.3em] uppercase text-[var(--empc-gold)] font-medium">
                Nos Tarifs
              </span>
              <span className="w-12 h-px bg-[var(--empc-gold)]" />
            </motion.div>

            {/* Main title */}
            <motion.h1
              className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6"
              variants={fadeInUp}
              custom={0.1}
            >
              Investir dans votre{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[var(--empc-primary)]">santé</span>
                <motion.span
                  className="absolute bottom-2 left-0 right-0 h-3 bg-[var(--empc-sage)]/30 -z-0"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: easeOutExpo }}
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl opacity-70 max-w-2xl mx-auto leading-relaxed"
              variants={fadeInUp}
              custom={0.2}
            >
              Des soins personnalisés pour accompagner votre chemin vers l&apos;équilibre
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* ========== DIVIDER: Hero → Pricing ========== */}
      <SectionDivider variant="curve" color="var(--empc-background)" height={80} />

      {/* Main Pricing Section */}
      <section className="relative pb-20 md:pb-32">
        {/* Liseré doré en haut */}
        <AccentLine color="var(--empc-gold)" position="top" thickness={3} variant="straight" />
        <div className="container-wide">

          {/* Dr Deblangey Section */}
          <div className="mb-16 md:mb-24">
            {/* Section header */}
            <motion.div
              className="mb-10 md:mb-14"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              <div className="flex items-center gap-6 mb-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[var(--empc-primary)] flex items-center justify-center text-white text-2xl font-heading shadow-lg">
                  JD
                </div>
                <div>
                  <h2 className="font-heading text-2xl md:text-3xl">Dr Joëlle Deblangey</h2>
                  <p className="text-sm md:text-base opacity-60 mt-1">Docteur en médecine, certifiée en Psychothérapies</p>
                </div>
              </div>
            </motion.div>

            {/* Pricing cards grid */}
            <div className="grid lg:grid-cols-2 gap-8 md:gap-10">

              {/* Individual Therapies */}
              <PriceCard
                title="Thérapies Individuelles"
                accentColor="var(--empc-primary)"
                delay={0.1}
              >
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-[var(--empc-primary)]/10">
                      <th className="text-left pb-4 text-xs tracking-wider uppercase opacity-50 font-medium">Prestation</th>
                      <th className="text-center pb-4 text-xs tracking-wider uppercase opacity-50 font-medium hidden sm:table-cell">Durée</th>
                      <th className="text-right pb-4 text-xs tracking-wider uppercase opacity-50 font-medium">Tarif</th>
                    </tr>
                  </thead>
                  <tbody>
                    {therapiesIndividuelles.map((item, i) => (
                      <PriceRow key={item.prestation} index={i}>
                        <td className="py-4 pr-4">
                          <span className="font-medium text-sm md:text-base">{item.prestation}</span>
                          <span className="block sm:hidden text-xs opacity-50 mt-1">{item.duree}</span>
                        </td>
                        <td className="py-4 text-center text-sm opacity-60 hidden sm:table-cell">{item.duree}</td>
                        <td className="py-4 text-right">
                          <span className="font-heading text-lg md:text-xl text-[var(--empc-primary)]">{item.tarif}</span>
                        </td>
                      </PriceRow>
                    ))}
                  </tbody>
                </table>
              </PriceCard>

              {/* Group Work */}
              <PriceCard
                title="Travail en Groupe"
                subtitle="Maximum 10 participants"
                accentColor="var(--empc-secondary)"
                delay={0.2}
              >
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-[var(--empc-secondary)]/10">
                      <th className="text-left pb-4 text-xs tracking-wider uppercase opacity-50 font-medium">Protocole</th>
                      <th className="text-center pb-4 text-xs tracking-wider uppercase opacity-50 font-medium hidden sm:table-cell">Format</th>
                      <th className="text-right pb-4 text-xs tracking-wider uppercase opacity-50 font-medium">Tarif</th>
                    </tr>
                  </thead>
                  <tbody>
                    {travailGroupe.map((item, i) => (
                      <PriceRow key={item.protocole} index={i}>
                        <td className="py-4 pr-4">
                          <span className="font-medium text-sm md:text-base">{item.protocole}</span>
                          <span className="block sm:hidden text-xs opacity-50 mt-1">{item.format}</span>
                        </td>
                        <td className="py-4 text-center text-sm opacity-60 hidden sm:table-cell">{item.format}</td>
                        <td className="py-4 text-right">
                          <span className="font-heading text-lg md:text-xl text-[var(--empc-secondary)]">{item.tarif}</span>
                        </td>
                      </PriceRow>
                    ))}
                  </tbody>
                </table>

                {/* Note */}
                <motion.div
                  className="mt-6 p-4 rounded-xl bg-[var(--empc-cream)] border border-[var(--empc-sage)]/10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-xs md:text-sm opacity-70 leading-relaxed">
                    <span className="font-medium">Note :</span> Professionnelle non conventionnée, secteur 3, honoraires non remboursés par la CGSS. Consulter vos options de mutuelle.
                  </p>
                </motion.div>
              </PriceCard>
            </div>
          </div>

          {/* Couple/Family Section */}
          <motion.div
            className="mb-16 md:mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <PriceCard
              title="Thérapies Couple & Famille"
              accentColor="var(--empc-gold)"
              delay={0}
            >
              <div className="max-w-xl">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-[var(--empc-gold)]/10">
                      <th className="text-left pb-4 text-xs tracking-wider uppercase opacity-50 font-medium">Prestation</th>
                      <th className="text-center pb-4 text-xs tracking-wider uppercase opacity-50 font-medium">Durée</th>
                      <th className="text-right pb-4 text-xs tracking-wider uppercase opacity-50 font-medium">Tarif</th>
                    </tr>
                  </thead>
                  <tbody>
                    {therapiesFamille.map((item, i) => (
                      <PriceRow key={item.prestation} index={i}>
                        <td className="py-4 pr-4">
                          <span className="font-medium">{item.prestation}</span>
                        </td>
                        <td className="py-4 text-center text-sm opacity-60">{item.duree}</td>
                        <td className="py-4 text-right">
                          <span className="font-heading text-xl text-[var(--empc-gold)]">{item.tarif}</span>
                        </td>
                      </PriceRow>
                    ))}
                  </tbody>
                </table>
              </div>
            </PriceCard>
          </motion.div>

          {/* Payment Methods & Important Notice */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-10">

            {/* Payment Methods */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              <div className="bg-white rounded-[2rem] p-8 shadow-lg shadow-black/[0.04] border border-[var(--empc-sage)]/10">
                <h3 className="font-heading text-xl md:text-2xl mb-6 text-[var(--empc-primary)]">
                  Moyens de paiement
                </h3>
                <div className="flex flex-wrap gap-4">
                  {moyensPaiement.map((item, i) => (
                    <motion.div
                      key={item.nom}
                      className="flex items-center gap-3 px-5 py-3 rounded-full bg-[var(--empc-cream)] border border-[var(--empc-sage)]/10"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm font-medium">{item.nom}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Important Notice */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
            >
              <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-[2rem] p-8 shadow-lg shadow-orange-900/[0.04] border border-orange-200/50 overflow-hidden">
                {/* Warning icon decoration */}
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-orange-400/10" />

                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-orange-400/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-xl text-orange-800">Important</h3>
                  </div>

                  <p className="text-orange-900/80 leading-relaxed font-medium">
                    Tout RDV non annulé par SMS avant <span className="text-orange-700 font-bold">48h ouvrées</span> nous restera dû.
                  </p>
                  <p className="text-sm text-orange-700/60 mt-2">
                    (sauf cas particulier sur justificatif)
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== DIVIDER: Pricing → CTA ========== */}
      <SectionDivider variant="wave" color="var(--empc-cream)" height={70} className="opacity-40" />

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Liseré doré courbé en haut */}
        <AccentLine color="var(--empc-gold)" position="top" thickness={3} variant="curved" />
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--empc-background)] via-[var(--empc-primary)]/5 to-[var(--empc-background)]" />

        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="leaves" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 5 Q45 20 30 55 Q15 20 30 5" fill="currentColor" className="text-[var(--empc-primary)]" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#leaves)" />
          </svg>
        </div>

        <div className="container-narrow relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-6">
              Prêt à commencer ?
            </h2>
            <p className="text-lg opacity-70 mb-10 max-w-lg mx-auto">
              Contactez-nous par SMS pour prendre rendez-vous ou obtenir plus d&apos;informations
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="sms:0692460789"
                className="btn-magnetic btn-primary group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  SMS : 0692 46 07 89
                </span>
              </motion.a>

              <Link href="/">
                <motion.button
                  className="btn-magnetic btn-outline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Retour à l&apos;accueil
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer spacer for fixed elements */}
      <div className="h-20" />
    </main>
  );
}
