'use client';

import { motion } from 'framer-motion';
import TherapyPageLayout from '@/components/therapy/TherapyPageLayout';

export default function GestaltPage() {
  return (
    <TherapyPageLayout
      // Hero
      title="La Gestalt-Thérapie"
      subtitle="Mettre en forme ce que vous vivez pour mieux vous comprendre et avancer"
      heroImage="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200&q=80"
      heroImageAlt="Thérapie et bien-être"
      accentColor="var(--empc-primary)"

      // Introduction
      introQuote="Découvrir ce que nous ressentons et ce dont nous avons besoin, c'est quelque chose d'essentiel pour la survie, pour la vie et pour un développement harmonieux, satisfaisant et plein."
      introText="Dans le huis clos de notre entretien, vous ne serez pas seul(e) à avancer vers le changement. Nous élaborerons ensemble plusieurs hypothèses, mettant en forme grâce à mon aide et mon ressenti en votre présence les différentes pensées, émotions, besoins, senti, sensations corporelles, intuitions qui traverseront le champ de la séance."

      // Definition
      definitionTitle="Qu'est-ce que la Gestalt ?"
      definitionContent={
        <motion.div
          className="relative p-8 md:p-12 rounded-[2.5rem] bg-white shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Decorative accent */}
          <div className="absolute top-0 left-0 w-24 h-24 rounded-tl-[2.5rem] bg-gradient-to-br from-[var(--empc-gold)]/20 to-transparent" />

          <div className="relative z-10 space-y-6">
            <p className="text-lg leading-relaxed">
              Le terme <strong className="text-[var(--empc-primary)]">Gestalt</strong> vient d&apos;un verbe allemand <em>gestalten</em> qui correspond à l&apos;idée de <strong>« mettre en forme, donner une structure »</strong>.
            </p>
            <p className="text-lg leading-relaxed opacity-80">
              Gestalt-Thérapie signifie donc la thérapie des formes que chacun donne à son existence, à ses contacts, à ses relations, à ses actes.
            </p>
            <div className="pt-6 border-t border-[var(--empc-sage)]/20">
              <p className="text-sm italic opacity-70">
                « La Gestalt-thérapie cherche à mettre en lumière les processus par lesquels nous donnons du sens à notre expérience. »
              </p>
            </div>
          </div>
        </motion.div>
      }

      // Axes de travail
      axesTitle="Les 3 axes de travail"
      axes={[
        {
          title: "Passé & Présent",
          description: "Regarder la manière dont l'expérience passée conditionne l'expérience actuelle. Ce passé revécu dans la séance sera remis dans le présent de façon à correspondre à vos besoins actuels."
        },
        {
          title: "L'expérience actuelle",
          description: "Valoriser l'importance et la nouveauté de l'expérience actuelle. Utilisation de diverses expérimentations sous forme de jeux, exercices, supports d'expression, mises en scène et la fameuse « chaise vide »."
        },
        {
          title: "Perspective de CHAMP",
          description: "Inscrire l'expérience thérapeutique dans une perspective de CHAMP : tout ce qui est pertinent pour un sujet à un moment donné, ce qui affecte son expérience."
        }
      ]}

      // Pratique
      practiceTitle="La pratique"
      practiceItems={[
        "Travail individuel",
        "Travail de groupe : Méditation / pleine conscience guidée",
        "Travail de groupe : Comportement alimentaire"
      ]}

      // Indications
      indicationsTitle="Indications"
      indications={[
        "Mal-être général",
        "Problèmes de couple (emprise ou autre)",
        "Problèmes sexuels",
        "Troubles du comportement alimentaire",
        "Névroses phobiques, obsessionnelles",
        "Troubles anxieux généralisés",
        "Attaques de panique",
        "Dépression réactionnelle ou chronique",
        "Stress post traumatique",
        "Syndromes maniaco-dépressifs ou bipolaires"
      ]}

      // Tarifs
      prices={[
        { price: "75€", duration: "55 minutes" }
      ]}
      priceNote="Avec une feuille de soins qui permettra éventuellement une partie de prise en charge selon votre mutuelle (médecin secteur 3 déconventionnée)."

      // Références
      references={[
        { text: "« Gestalt-thérapie » - Perls, Hefferline et Goodman (1951)" },
        { text: "« Le grand livre de la Gestalt thérapie » - collectif C. G. Masquelier, Eyrolles (2012)" },
        { text: "« Emotions, sentiments et besoins, une approche humaniste » - Myriam Munoz Polit (2011)" }
      ]}

      // FAQ
      faqs={[
        {
          question: "Qu'est-ce qui différencie la Gestalt des autres thérapies ?",
          answer: "La Gestalt se distingue par son approche globale de l'expérience humaine, intégrant pensées, émotions, sensations corporelles et contexte relationnel. Elle met l'accent sur le « ici et maintenant » tout en explorant comment le passé influence le présent."
        },
        {
          question: "Combien de séances sont nécessaires ?",
          answer: "Il n'y a pas de nombre prédéfini. Certaines personnes viennent pour quelques séances ciblées, d'autres s'engagent dans un travail plus long. Nous évaluerons ensemble vos besoins et objectifs dès les premières rencontres."
        },
        {
          question: "Qu'est-ce que la « chaise vide » ?",
          answer: "C'est une technique emblématique de la Gestalt où vous dialoguez avec une chaise vide représentant une personne, une partie de vous-même ou une situation. Elle permet d'exprimer des émotions et de résoudre des conflits intérieurs."
        },
        {
          question: "La Gestalt est-elle adaptée à mon problème ?",
          answer: "La Gestalt s'adresse à un large éventail de difficultés : anxiété, dépression, troubles relationnels, deuil, transitions de vie, troubles alimentaires, etc. Un premier entretien permettra de déterminer si cette approche vous convient."
        }
      ]}
    />
  );
}
