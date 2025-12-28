'use client';

import { motion } from 'framer-motion';
import TherapyPageLayout from '@/components/therapy/TherapyPageLayout';

export default function NutritionPage() {
  return (
    <TherapyPageLayout
      // Hero
      title="Nutrition Comportementale"
      subtitle="Retrouver une relation apaisée avec l'alimentation"
      heroImage="https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1200&q=80"
      heroImageAlt="Alimentation saine et équilibrée"
      accentColor="var(--empc-gold)"

      // Introduction
      introQuote="Votre poids, conséquence de votre comportement alimentaire, se normalisera vers la fin des séances, et surtout ne sera plus votre obsession !"
      introText="Voyant l'échec à long terme des régimes équilibrés classiques, revoyant les patients qui ont regrossi suite à un régime bien conduit, je me suis intéressée aux Thérapies comportementales et cognitives pour les troubles du Comportement Alimentaire. Cette approche ne vous impose pas de régime restrictif mais vous aide à retrouver une alimentation intuitive, guidée par vos sensations de faim et de satiété."

      // Definition
      definitionTitle="Une approche différente"
      definitionContent={
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="p-8 rounded-3xl bg-gradient-to-br from-[var(--empc-gold)]/10 to-transparent border border-[var(--empc-gold)]/20"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">❌</span>
              <h3 className="font-heading text-xl text-[var(--empc-text)]">Ce que nous ne faisons PAS</h3>
            </div>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-start gap-2">
                <span className="text-[var(--empc-terracotta)]">•</span>
                Régimes restrictifs
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--empc-terracotta)]">•</span>
                Comptage de calories
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--empc-terracotta)]">•</span>
                Aliments interdits
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--empc-terracotta)]">•</span>
                Culpabilisation
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="p-8 rounded-3xl bg-gradient-to-br from-[var(--empc-sage)]/20 to-transparent border border-[var(--empc-sage)]/20"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">✓</span>
              <h3 className="font-heading text-xl text-[var(--empc-text)]">Ce que nous cultivons</h3>
            </div>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-start gap-2">
                <span className="text-[var(--empc-sage)]">•</span>
                Écoute de vos sensations corporelles
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--empc-sage)]">•</span>
                Reconnaissance de la vraie faim
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--empc-sage)]">•</span>
                Plaisir de manger en conscience
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--empc-sage)]">•</span>
                Bienveillance envers vous-même
              </li>
            </ul>
          </motion.div>
        </div>
      }

      // Session content
      sessionTitle="Contenu des séances"
      sessionContent={
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: '🍽️',
              title: 'Retrouver la FAIM physique',
              description: 'Distinguer la faim physique de la faim émotionnelle ou psychique'
            },
            {
              icon: '📊',
              title: 'Échelle de faim',
              description: 'Établir votre propre échelle de faim avec vos symptômes corporels'
            },
            {
              icon: '🧘',
              title: 'Respiration méditative',
              description: 'Espaces de respiration pour vous reconnecter à vos sensations'
            },
            {
              icon: '🎯',
              title: 'Situations à risque',
              description: 'Identifier les situations qui déclenchent le "manger sans faim"'
            },
            {
              icon: '😌',
              title: 'Satiété',
              description: 'Travail sur les sensations de satiété et le signal de fin de repas'
            },
            {
              icon: '🍃',
              title: 'Plaisir alimentaire',
              description: 'Redécouvrir le goût et le plaisir des aliments en pleine conscience'
            }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="flex gap-4 p-5 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 8 }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--empc-gold)]/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div>
                <h3 className="font-heading text-lg mb-1">{item.title}</h3>
                <p className="text-sm opacity-70">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      }

      // Indications
      indicationsTitle="Indications"
      indications={[
        "Boulimie",
        "Hyperphagie boulimique",
        "Anorexie (avec suivi systémique familial conseillé et psychothérapie associées)",
        "Échec des régimes de toute sorte à répétition avec obsession du poids",
        "Orthorexie (sélection des aliments très rigide)",
        "Alimentation émotionnelle",
        "Grignotage compulsif",
        "Relation conflictuelle avec la nourriture"
      ]}

      // Tarifs
      prices={[
        { price: "55€", duration: "30 minutes" }
      ]}
      priceNote="Environ 10 séances pour un adulte, moins pour l'enfant et l'adolescent (à partir de 10 ans). Rythme conseillé : tous les 15 jours."

      // Références
      references={[
        { text: "GROS - Groupe de Réflexion sur l'Obésité et le Surpoids", url: "https://www.gros.org" }
      ]}

      // FAQ
      faqs={[
        {
          question: "Cette approche remplace-t-elle un régime ?",
          answer: "Oui, justement ! L'objectif est de sortir de la logique des régimes qui échouent à long terme. On travaille sur la reconnexion aux sensations de faim et satiété plutôt que sur des restrictions."
        },
        {
          question: "Est-ce adapté si je suis en surpoids ?",
          answer: "Oui, cette approche s'adresse à toutes les personnes ayant une relation difficile avec l'alimentation, quel que soit leur poids. L'objectif est de retrouver une alimentation apaisée, pas de maigrir à tout prix."
        },
        {
          question: "Dois-je noter ce que je mange ?",
          answer: "Non, on ne compte pas les calories. En revanche, un carnet de sensations peut être utile pour repérer vos patterns alimentaires et émotionnels."
        },
        {
          question: "Combien de temps dure le suivi ?",
          answer: "En moyenne 10 séances espacées de 15 jours, mais cela varie selon votre situation. L'approche est progressive et respecte votre rythme."
        }
      ]}
    >
      {/* Additional info section */}
      <motion.section
        className="py-16 bg-[var(--empc-cream)]/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container-narrow">
          <div className="p-8 md:p-12 rounded-3xl bg-white shadow-lg relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--empc-gold)]/10 to-transparent rounded-bl-[3rem]" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">📅</span>
                <h3 className="font-heading text-2xl">Organisation des séances</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-2xl bg-[var(--empc-gold)]/5">
                  <span className="block font-heading text-3xl text-[var(--empc-gold)] mb-2">30</span>
                  <span className="text-sm opacity-70">minutes par séance</span>
                </div>
                <div className="text-center p-4 rounded-2xl bg-[var(--empc-sage)]/10">
                  <span className="block font-heading text-3xl text-[var(--empc-sage)] mb-2">15</span>
                  <span className="text-sm opacity-70">jours entre chaque séance</span>
                </div>
                <div className="text-center p-4 rounded-2xl bg-[var(--empc-primary)]/10">
                  <span className="block font-heading text-3xl text-[var(--empc-primary)] mb-2">~10</span>
                  <span className="text-sm opacity-70">séances en moyenne</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </TherapyPageLayout>
  );
}
