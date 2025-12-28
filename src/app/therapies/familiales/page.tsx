'use client';

import { motion } from 'framer-motion';
import TherapyPageLayout from '@/components/therapy/TherapyPageLayout';

export default function FamilialesPage() {
  return (
    <TherapyPageLayout
      // Hero
      title="Thérapies Familiales & Conjugales"
      subtitle="L'approche systémique pour retrouver l'harmonie relationnelle"
      heroImage="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=1200&q=80"
      heroImageAlt="Famille et relations"
      accentColor="var(--empc-sage)"

      // Introduction
      introQuote="Dans un système familial, le changement d'un seul élément modifie l'ensemble des interactions."
      introText="La thérapie systémique considère que les difficultés d'un individu s'inscrivent dans un contexte relationnel. Qu'il s'agisse de tensions conjugales, de conflits familiaux ou de difficultés avec un enfant, cette approche vise à comprendre et transformer les interactions pour retrouver un équilibre bénéfique à tous."

      // Definition
      definitionTitle="L'approche systémique"
      definitionContent={
        <div className="space-y-8">
          <motion.div
            className="p-8 md:p-10 rounded-3xl bg-white shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-heading text-2xl mb-4 text-[var(--empc-text)]">
                  Comprendre le système
                </h3>
                <p className="opacity-80 leading-relaxed mb-4">
                  La thérapie systémique ne cherche pas un « coupable » mais analyse les interactions entre les membres d&apos;une famille ou d&apos;un couple. Chacun participe au système, chacun peut contribuer au changement.
                </p>
                <p className="opacity-80 leading-relaxed">
                  Cette vision circulaire permet de sortir des schémas d&apos;accusation mutuelle pour travailler ensemble vers des solutions.
                </p>
              </div>

              {/* Visual representation */}
              <motion.div
                className="relative aspect-square max-w-[280px] mx-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {/* Central circle */}
                <div className="absolute inset-1/4 rounded-full bg-[var(--empc-sage)]/20 flex items-center justify-center">
                  <span className="font-heading text-xl text-[var(--empc-primary)]">Équilibre</span>
                </div>

                {/* Orbiting elements */}
                {['Communication', 'Écoute', 'Respect', 'Confiance'].map((label, i) => {
                  const angle = (i * 90 - 45) * (Math.PI / 180);
                  const radius = 42;
                  const x = 50 + radius * Math.cos(angle);
                  const y = 50 + radius * Math.sin(angle);

                  return (
                    <motion.div
                      key={label}
                      className="absolute w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-md flex items-center justify-center text-center"
                      style={{ left: `${x}%`, top: `${y}%` }}
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                    >
                      <span className="text-xs font-medium text-[var(--empc-text)]">{label}</span>
                    </motion.div>
                  );
                })}

                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="none"
                    stroke="var(--empc-gold)"
                    strokeWidth="0.5"
                    strokeDasharray="4 4"
                    opacity="0.3"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* Formation info */}
          <motion.div
            className="p-6 rounded-2xl bg-[var(--empc-cream)]/50 border border-[var(--empc-sage)]/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm opacity-70 text-center">
              <span className="font-medium">Formation :</span> Thérapeute Systémicienne Familiale et Conjugale (IDES) ·
              Mémoire : « L&apos;utilisation du jeu de loi dans la relation d&apos;emprise »
            </p>
          </motion.div>
        </div>
      }

      // Axes de travail
      axesTitle="Domaines d'intervention"
      axes={[
        {
          title: "Thérapie de couple",
          description: "Améliorer la communication, résoudre les conflits, surmonter une crise, infidélité, perte de désir, préparation à la parentalité."
        },
        {
          title: "Thérapie familiale",
          description: "Difficultés avec un enfant ou adolescent, conflits intergénérationnels, recomposition familiale, deuil, maladie d'un proche."
        },
        {
          title: "Médiation & séparation",
          description: "Accompagnement lors d'une séparation pour préserver le lien parental et protéger les enfants."
        }
      ]}

      // Session content
      sessionTitle="Déroulement des séances"
      sessionContent={
        <div className="space-y-6">
          <motion.div
            className="p-6 rounded-2xl bg-white shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading text-xl mb-4 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[var(--empc-sage)]/20 flex items-center justify-center text-lg">💑</span>
              Thérapie de couple
            </h3>
            <p className="text-sm opacity-80 mb-4">
              Les deux partenaires participent ensemble aux séances. Le thérapeute crée un espace sécurisé où chacun peut s&apos;exprimer et être entendu.
            </p>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--empc-sage)]/10">
              <span className="text-2xl">⏱️</span>
              <div>
                <span className="font-heading text-lg text-[var(--empc-primary)]">1 heure</span>
                <span className="text-sm opacity-60 ml-2">par séance</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="p-6 rounded-2xl bg-white shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <h3 className="font-heading text-xl mb-4 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[var(--empc-gold)]/20 flex items-center justify-center text-lg">👨‍👩‍👧‍👦</span>
              Thérapie familiale
            </h3>
            <p className="text-sm opacity-80 mb-4">
              Selon les situations, la composition des séances peut varier : toute la famille, sous-groupes (parents seuls, fratrie), ou séances individuelles complémentaires.
            </p>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--empc-gold)]/10">
              <span className="text-2xl">⏱️</span>
              <div>
                <span className="font-heading text-lg text-[var(--empc-primary)]">1 heure 15</span>
                <span className="text-sm opacity-60 ml-2">par séance</span>
              </div>
            </div>
          </motion.div>
        </div>
      }

      // Indications
      indicationsTitle="Motifs de consultation"
      indications={[
        "Difficultés de communication dans le couple",
        "Conflits répétitifs et escalade",
        "Infidélité et rupture de confiance",
        "Préparation à la parentalité",
        "Difficultés éducatives avec un enfant",
        "Troubles du comportement chez l'adolescent",
        "Conflits liés à la recomposition familiale",
        "Accompagnement lors d'un deuil familial",
        "Maladie chronique et impact sur la famille",
        "Séparation et maintien du lien parental"
      ]}

      // Tarifs - NOUVEAUX TARIFS
      prices={[
        { label: "Thérapie de couple", price: "110€", duration: "1 heure" },
        { label: "Thérapie familiale", price: "150€", duration: "1h15" }
      ]}
      priceNote="Le nombre de séances varie selon les situations. Un premier entretien permet d'évaluer les besoins et de définir un cadre de travail."

      // References
      references={[
        { text: "IDES - Institut de formation en thérapie systémique" },
        { text: "Thérapie familiale et de couple - Approche systémique" }
      ]}

      // FAQ
      faqs={[
        {
          question: "Toute la famille doit-elle être présente ?",
          answer: "Pas nécessairement. Selon la situation, nous pouvons travailler avec tout ou partie de la famille. Le cadre s'adapte à vos besoins et contraintes."
        },
        {
          question: "Mon partenaire refuse de venir, que faire ?",
          answer: "Il est possible de commencer seul(e) un travail sur la relation. Souvent, le partenaire rejoint la thérapie après quelques séances quand il voit les changements positifs."
        },
        {
          question: "À partir de quel âge un enfant peut-il participer ?",
          answer: "Les enfants peuvent participer dès qu'ils sont capables de s'exprimer, généralement à partir de 4-5 ans. Les séances sont adaptées à leur âge avec des supports ludiques si besoin."
        },
        {
          question: "Comment se déroule une première séance de couple ?",
          answer: "Le premier entretien permet de comprendre votre histoire, vos difficultés actuelles et vos attentes. Chacun peut s'exprimer. Nous définissons ensemble les objectifs du travail."
        }
      ]}
    >
      {/* Important notice about commitment */}
      <motion.section
        className="py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container-narrow">
          <motion.div
            className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[var(--empc-sage)]/10 to-[var(--empc-cream)] border border-[var(--empc-sage)]/20"
            whileHover={{ scale: 1.01 }}
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md mb-6">
                <span className="text-3xl">🌿</span>
              </div>
              <h3 className="font-heading text-2xl mb-4">L&apos;engagement de tous</h3>
              <p className="opacity-80 max-w-xl mx-auto leading-relaxed">
                La thérapie systémique fonctionne grâce à l&apos;implication de chaque participant.
                La motivation à vouloir améliorer la situation est le premier pas vers le changement.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </TherapyPageLayout>
  );
}
