'use client';

import { motion } from 'framer-motion';
import TherapyPageLayout from '@/components/therapy/TherapyPageLayout';

export default function SexologiePage() {
  return (
    <TherapyPageLayout
      // Hero
      title="Sexologie"
      subtitle="Un accompagnement professionnel et bienveillant pour votre épanouissement intime"
      heroImage="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&q=80"
      heroImageAlt="Couple et intimité"
      accentColor="var(--empc-terracotta)"

      // Introduction
      introText="La sexologie est une discipline médicale qui traite des difficultés liées à la sexualité. Dans un cadre de confiance et de confidentialité absolue, le Dr Deblangey vous accompagne dans la compréhension et la résolution de vos préoccupations intimes, seul(e) ou en couple."

      // Definition
      definitionTitle="Une approche globale et respectueuse"
      definitionContent={
        <motion.div
          className="p-8 md:p-12 rounded-3xl bg-white shadow-lg relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Subtle decorative element */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[var(--empc-terracotta)]/5 to-transparent rounded-bl-[4rem]" />

          <div className="relative z-10 space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-heading text-xl mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[var(--empc-terracotta)]/10 flex items-center justify-center">
                    🎓
                  </span>
                  Formation & Expertise
                </h3>
                <p className="text-sm opacity-80 leading-relaxed">
                  Le Dr Joëlle Deblangey est diplômée en Médecine Sexologique de la Faculté de médecine de Lille/Amiens (diplôme obtenu en octobre 2012). Elle est membre de l&apos;association <strong>SEXO974</strong>.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[var(--empc-terracotta)]/10 flex items-center justify-center">
                    🤝
                  </span>
                  Modalités de consultation
                </h3>
                <p className="text-sm opacity-80 leading-relaxed">
                  Les consultations peuvent se dérouler en <strong>entretien individuel</strong> ou <strong>avec votre partenaire</strong>, selon vos besoins et la nature de votre demande.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--empc-sage)]/20">
              <p className="text-sm italic opacity-70 text-center">
                « La sexualité fait partie intégrante de la santé et du bien-être. En parler avec un professionnel est un premier pas vers l&apos;épanouissement. »
              </p>
            </div>
          </div>
        </motion.div>
      }

      // Axes de travail
      axesTitle="Domaines d'accompagnement"
      axes={[
        {
          title: "Troubles du désir",
          description: "Baisse de libido, désir sexuel hypoactif, différences de désir dans le couple."
        },
        {
          title: "Difficultés fonctionnelles",
          description: "Troubles de l'érection, éjaculation précoce, anorgasmie, dyspareunie, vaginisme."
        },
        {
          title: "Questions identitaires",
          description: "Accompagnement sur les questions d'identité sexuelle, d'orientation, ou de genre."
        }
      ]}

      // Indications
      indicationsTitle="Motifs de consultation"
      indications={[
        "Troubles du désir sexuel",
        "Troubles de l'érection",
        "Éjaculation précoce ou retardée",
        "Anorgasmie (difficulté à atteindre l'orgasme)",
        "Vaginisme et dyspareunie",
        "Douleurs pendant les rapports",
        "Difficultés relationnelles liées à la sexualité",
        "Questions sur l'orientation ou l'identité sexuelle",
        "Sexualité et maladies chroniques",
        "Accompagnement post-traumatique"
      ]}

      // Tarifs
      prices={[
        { label: "Individuel", price: "75€", duration: "55 minutes" },
        { label: "Avec partenaire", price: "100€", duration: "55 minutes" }
      ]}
      priceNote="Les consultations sont confidentielles. Médecin secteur 3 déconventionnée."

      // References
      references={[
        { text: "SEXO974 - Association des sexologues de La Réunion" },
        { text: "Diplôme Universitaire de Sexologie - Faculté de Médecine Lille/Amiens" }
      ]}

      // FAQ
      faqs={[
        {
          question: "Dois-je venir avec mon/ma partenaire ?",
          answer: "Pas nécessairement. Les consultations individuelles sont tout aussi efficaces. Si vous le souhaitez, votre partenaire peut vous accompagner lors de certaines séances."
        },
        {
          question: "De quoi parle-t-on en consultation ?",
          answer: "On aborde vos préoccupations à votre rythme. Il n'y a pas de question taboue. Le but est de comprendre votre situation pour vous proposer un accompagnement adapté."
        },
        {
          question: "Est-ce vraiment confidentiel ?",
          answer: "Absolument. Toutes les consultations sont couvertes par le secret médical. Rien n'est transmis à qui que ce soit sans votre accord explicite."
        },
        {
          question: "Combien de consultations faut-il prévoir ?",
          answer: "Cela dépend de votre problématique. Certaines difficultés se résolvent en quelques séances, d'autres nécessitent un suivi plus long. Nous évaluerons ensemble vos besoins."
        }
      ]}
    >
      {/* Confidentiality notice */}
      <motion.section
        className="py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container-narrow">
          <motion.div
            className="p-6 md:p-8 rounded-2xl border-2 border-[var(--empc-sage)]/20 bg-[var(--empc-cream)]/50 text-center"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-[var(--empc-primary)]/10 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--empc-primary)]">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
            </div>
            <h3 className="font-heading text-xl mb-2">Confidentialité absolue</h3>
            <p className="text-sm opacity-70 max-w-md mx-auto">
              Tous les échanges sont protégés par le secret médical. Vous pouvez parler en toute confiance dans un espace sécurisé et sans jugement.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </TherapyPageLayout>
  );
}
