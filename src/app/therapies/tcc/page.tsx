'use client';

import { motion } from 'framer-motion';
import TherapyPageLayout from '@/components/therapy/TherapyPageLayout';

export default function TCCPage() {
  return (
    <TherapyPageLayout
      // Hero
      title="Thérapies Comportementales et Cognitives"
      subtitle="Une approche scientifique et validée pour un changement durable"
      heroImage="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80"
      heroImageAlt="Réflexion et analyse"
      accentColor="var(--empc-secondary)"

      // Introduction
      introQuote="Les TCC permettent de comprendre comment nos pensées influencent nos émotions et nos comportements, pour mieux les transformer."
      introText="Les Thérapies Comportementales et Cognitives (TCC) sont des thérapies brèves, structurées et validées scientifiquement. Elles se concentrent sur les difficultés actuelles du patient et visent à modifier les pensées automatiques négatives et les comportements problématiques qui maintiennent la souffrance psychologique."

      // Definition
      definitionTitle="Qu'est-ce que les TCC ?"
      definitionContent={
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: '💭',
              title: 'Cognitions',
              description: 'Identification et restructuration des pensées automatiques négatives et des croyances dysfonctionnelles qui alimentent la souffrance.'
            },
            {
              icon: '❤️',
              title: 'Émotions',
              description: 'Apprentissage de la régulation émotionnelle et développement de stratégies pour mieux gérer l\'anxiété, la tristesse ou la colère.'
            },
            {
              icon: '🎯',
              title: 'Comportements',
              description: 'Modification progressive des comportements d\'évitement ou problématiques par des exercices pratiques et une exposition graduée.'
            }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="relative p-8 rounded-3xl bg-white shadow-lg group overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8 }}
            >
              {/* Hover gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[var(--empc-secondary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              />

              <div className="relative z-10">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-heading text-xl mb-3 text-[var(--empc-text)]">{item.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{item.description}</p>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--empc-secondary)] to-[var(--empc-gold)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </motion.div>
          ))}
        </div>
      }

      // Axes de travail
      axesTitle="Principes fondamentaux"
      axes={[
        {
          title: "Approche collaborative",
          description: "Thérapeute et patient travaillent ensemble comme une équipe. Vous êtes acteur de votre changement, guidé par un professionnel bienveillant."
        },
        {
          title: "Focus sur le présent",
          description: "Les TCC se concentrent sur les difficultés actuelles plutôt que sur le passé lointain, pour des résultats concrets et rapides."
        },
        {
          title: "Exercices pratiques",
          description: "Des tâches à réaliser entre les séances permettent d'ancrer les apprentissages dans votre quotidien et d'accélérer le changement."
        }
      ]}

      // Session content
      sessionTitle="Déroulement d'une thérapie TCC"
      sessionContent={
        <div className="space-y-6">
          {[
            {
              step: 1,
              title: 'Évaluation initiale',
              description: 'Analyse de votre situation, définition des objectifs thérapeutiques et mise en place d\'un plan de traitement personnalisé.',
              duration: '1-2 séances'
            },
            {
              step: 2,
              title: 'Phase de traitement',
              description: 'Apprentissage de techniques cognitives et comportementales, exercices pratiques, confrontation progressive aux situations évitées.',
              duration: '8-15 séances'
            },
            {
              step: 3,
              title: 'Consolidation',
              description: 'Renforcement des acquis, prévention de la rechute, espacement progressif des séances.',
              duration: '2-4 séances'
            }
          ].map((phase, i) => (
            <motion.div
              key={phase.step}
              className="flex gap-6 p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-[var(--empc-sage)]/10"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[var(--empc-secondary)]/10 flex items-center justify-center">
                <span className="font-heading text-2xl text-[var(--empc-secondary)]">{phase.step}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading text-lg">{phase.title}</h3>
                  <span className="text-xs px-3 py-1 rounded-full bg-[var(--empc-gold)]/10 text-[var(--empc-gold)]">
                    {phase.duration}
                  </span>
                </div>
                <p className="text-sm opacity-70">{phase.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      }

      // Indications
      indicationsTitle="Indications"
      indications={[
        "Troubles anxieux généralisés",
        "Phobies spécifiques (phobie sociale, agoraphobie...)",
        "Trouble panique et attaques de panique",
        "Trouble obsessionnel-compulsif (TOC)",
        "Dépression",
        "Troubles du comportement alimentaire",
        "Addictions comportementales",
        "Troubles du sommeil",
        "Gestion du stress et burn-out",
        "Affirmation de soi et confiance en soi"
      ]}

      // Tarifs
      prices={[
        { price: "75€", duration: "55 minutes" }
      ]}
      priceNote="Médecin secteur 3 déconventionnée. Une partie peut être prise en charge selon votre mutuelle."

      // Références
      references={[
        { text: "Association Française de Thérapie Comportementale et Cognitive (AFTCC)", url: "https://www.aftcc.org" },
        { text: "Haute Autorité de Santé - Recommandations sur les TCC" }
      ]}

      // FAQ
      faqs={[
        {
          question: "Combien de séances sont nécessaires en TCC ?",
          answer: "Une TCC est généralement une thérapie brève, de 10 à 20 séances. La durée dépend de la problématique et de votre progression. Nous fixerons ensemble des objectifs clairs dès le départ."
        },
        {
          question: "Dois-je faire des exercices entre les séances ?",
          answer: "Oui, les exercices à domicile font partie intégrante de la TCC. Ils permettent d'ancrer les apprentissages et d'accélérer votre progression. Ils sont adaptés à votre rythme et vos capacités."
        },
        {
          question: "La TCC est-elle efficace pour l'anxiété ?",
          answer: "Oui, la TCC est reconnue comme l'un des traitements les plus efficaces pour les troubles anxieux. Elle a fait l'objet de nombreuses études scientifiques validant son efficacité."
        },
        {
          question: "Peut-on combiner TCC et médicaments ?",
          answer: "Oui, la TCC peut être associée à un traitement médicamenteux si nécessaire. Cette combinaison est souvent recommandée pour les troubles sévères. Nous travaillons en lien avec votre médecin traitant ou psychiatre."
        }
      ]}
    />
  );
}
