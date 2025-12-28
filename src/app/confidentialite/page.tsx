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

// Privacy sections
const privacySections = [
  {
    number: '01',
    title: 'Responsable du traitement',
    content: `Le responsable du traitement des données personnelles collectées sur ce site est :

**Dr Joëlle DEBLANGEY**
EMPC - Espace Médical de Psychothérapies et de Travail Corporel Associé
La Réunion, France
Contact : 0692 46 07 89 (SMS)`,
  },
  {
    number: '02',
    title: 'Données collectées',
    content: `Dans le cadre de l'utilisation de ce site, nous pouvons être amenés à collecter les données suivantes :

• **Données de navigation** : adresse IP, type de navigateur, pages consultées, date et heure de visite
• **Données de contact** : si vous nous contactez par SMS ou formulaire (nom, numéro de téléphone, message)
• **Cookies techniques** : nécessaires au bon fonctionnement du site

Aucune donnée médicale n'est collectée via ce site web.`,
  },
  {
    number: '03',
    title: 'Finalités du traitement',
    content: `Vos données personnelles sont utilisées pour :

• Assurer le bon fonctionnement technique du site
• Répondre à vos demandes de contact ou de renseignements
• Améliorer l'expérience utilisateur et la navigation
• Réaliser des statistiques anonymes de fréquentation`,
  },
  {
    number: '04',
    title: 'Base légale',
    content: `Le traitement de vos données repose sur :

• **Votre consentement** pour les cookies non essentiels et l'envoi de communications
• **Notre intérêt légitime** pour les statistiques et l'amélioration du site
• **L'exécution d'un contrat** lors de la prise de rendez-vous`,
  },
  {
    number: '05',
    title: 'Durée de conservation',
    content: `Vos données sont conservées pendant une durée limitée :

• **Données de navigation** : 13 mois maximum
• **Données de contact** : 3 ans après le dernier contact
• **Cookies** : 13 mois maximum

Au-delà de ces délais, vos données sont supprimées ou anonymisées.`,
  },
  {
    number: '06',
    title: 'Cookies',
    content: `Ce site utilise des cookies pour améliorer votre expérience :

**Cookies essentiels** (toujours actifs)
Nécessaires au fonctionnement du site, ils ne peuvent pas être désactivés.

**Cookies analytiques** (optionnels)
Permettent de mesurer l'audience du site de manière anonyme.

Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.`,
  },
  {
    number: '07',
    title: 'Vos droits',
    content: `Conformément au RGPD, vous disposez des droits suivants :

• **Droit d'accès** : obtenir une copie de vos données
• **Droit de rectification** : corriger des données inexactes
• **Droit à l'effacement** : demander la suppression de vos données
• **Droit à la limitation** : restreindre le traitement
• **Droit à la portabilité** : récupérer vos données dans un format lisible
• **Droit d'opposition** : vous opposer au traitement de vos données

Pour exercer ces droits, contactez-nous par SMS au **0692 46 07 89**.`,
  },
  {
    number: '08',
    title: 'Sécurité des données',
    content: `Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :

• Connexion sécurisée HTTPS
• Hébergement sur des serveurs sécurisés (Vercel)
• Accès restreint aux données personnelles
• Mise à jour régulière des systèmes de sécurité`,
  },
  {
    number: '09',
    title: 'Réclamation',
    content: `Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL :

**Commission Nationale de l'Informatique et des Libertés**
3 Place de Fontenoy, TSA 80715
75334 PARIS CEDEX 07
Site : www.cnil.fr`,
  },
];

export default function ConfidentialitePage() {
  return (
    <main className="bg-[var(--empc-background)] min-h-screen">
      <Header transparent={false} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-10 right-10 w-[350px] h-[350px] rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, var(--empc-secondary) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, var(--empc-primary) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Decorative lock icon */}
          <svg
            className="absolute top-32 left-10 w-16 h-16 text-[var(--empc-gold)] opacity-10 animate-float"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
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
              <span className="w-10 h-px bg-[var(--empc-secondary)]" />
              <span className="text-xs tracking-[0.3em] uppercase text-[var(--empc-secondary)] font-medium">
                RGPD
              </span>
              <span className="w-10 h-px bg-[var(--empc-secondary)]" />
            </motion.div>

            {/* Title */}
            <motion.h1
              className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6"
              variants={fadeInUp}
              custom={0.1}
            >
              Politique de{' '}
              <span className="text-[var(--empc-secondary)]">confidentialité</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg opacity-60 max-w-xl mx-auto"
              variants={fadeInUp}
              custom={0.2}
            >
              Protection de vos données personnelles conformément au Règlement Général sur la Protection des Données
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20 md:pb-32">
        <div className="container-narrow">
          <motion.div
            className="space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {privacySections.map((section, index) => (
              <motion.article
                key={section.number}
                className="relative"
                variants={fadeInUp}
                custom={index * 0.03}
              >
                <div className="relative bg-white rounded-[1.5rem] overflow-hidden shadow-lg shadow-black/[0.03] border border-[var(--empc-sage)]/10 transition-all duration-500 hover:shadow-xl">
                  {/* Number indicator */}
                  <div className="absolute top-0 left-0 w-16 h-16 flex items-center justify-center">
                    <span className="font-heading text-3xl text-[var(--empc-secondary)]/20">
                      {section.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 pl-20 md:pl-24">
                    <h2 className="font-heading text-xl md:text-2xl mb-4 text-[var(--empc-primary)]">
                      {section.title}
                    </h2>
                    <div
                      className="prose prose-sm md:prose-base max-w-none opacity-70 leading-relaxed
                        prose-strong:text-[var(--empc-text)] prose-strong:font-semibold
                        prose-ul:list-none prose-ul:pl-0
                        prose-li:relative prose-li:pl-5
                        [&_li]:before:content-['•'] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-[var(--empc-gold)]"
                      dangerouslySetInnerHTML={{
                        __html: section.content
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\n\n/g, '<br/><br/>')
                          .replace(/\n•/g, '<br/>•')
                      }}
                    />
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Last updated */}
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

      {/* CTA Section */}
      <section className="pb-20 md:pb-32">
        <div className="container-narrow">
          <motion.div
            className="relative bg-gradient-to-br from-[var(--empc-secondary)]/5 to-[var(--empc-primary)]/5 rounded-[2rem] p-8 md:p-12 text-center overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[var(--empc-secondary)]/10 translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-[var(--empc-primary)]/10 -translate-x-12 translate-y-12" />

            <div className="relative z-10">
              <h3 className="font-heading text-2xl md:text-3xl mb-4">
                Une question sur vos données ?
              </h3>
              <p className="opacity-60 mb-8 max-w-md mx-auto">
                N&apos;hésitez pas à nous contacter pour toute question relative à la protection de vos données personnelles
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a
                  href="sms:0692460789"
                  className="btn-magnetic btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Nous contacter
                  </span>
                </motion.a>

                <Link href="/mentions-legales">
                  <motion.button
                    className="btn-magnetic btn-outline"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Mentions légales
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
