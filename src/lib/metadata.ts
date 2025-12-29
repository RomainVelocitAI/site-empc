import type { Metadata } from 'next';

/**
 * Configuration SEO centralisée pour EMPC
 * Espace Médical de Psychothérapies et de Travail Corporel Associé
 */

export const siteConfig = {
  name: 'EMPC',
  fullName: 'Espace Médical de Psychothérapies et de Travail Corporel Associé',
  domain: 'empc.re',
  url: 'https://empc.re',
  description: 'Cabinet de psychothérapies et travail corporel à La Réunion. Dr Joëlle Deblangey - Gestalt, TCC, Nutrition, Sexologie, Méditation MBCT.',
  location: 'La Réunion, France',
  contact: {
    name: 'Dr Joëlle DEBLANGEY',
    phone: '0692 46 07 89',
    phoneType: 'SMS',
    phoneFormatted: '+262 692 46 07 89',
  },
};

/**
 * Métadonnées par défaut du site
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'EMPC | Espace Médical de Psychothérapies · La Réunion',
    template: '%s | EMPC - Psychothérapies La Réunion',
  },
  description: siteConfig.description,
  keywords: [
    'psychothérapie La Réunion',
    'psychothérapeute La Réunion',
    'gestalt thérapie',
    'TCC La Réunion',
    'thérapie comportementale cognitive',
    'méditation MBCT',
    'nutrition comportementale',
    'sexologie La Réunion',
    'thérapie de couple',
    'thérapie familiale',
    'Dr Deblangey',
    'EMPC',
    'santé mentale',
    'pleine conscience',
  ],
  authors: [{ name: 'Dr Joëlle Deblangey' }],
  creator: 'EMPC',
  publisher: 'EMPC',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteConfig.url,
    siteName: siteConfig.fullName,
    title: 'EMPC | Psychothérapies & Santé Mentale · La Réunion',
    description: siteConfig.description,
    images: [
      {
        url: '/images/og-empc.jpg',
        width: 1200,
        height: 630,
        alt: 'EMPC - Espace Médical de Psychothérapies à La Réunion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EMPC | Psychothérapies La Réunion',
    description: siteConfig.description,
  },
  verification: {
    // À compléter si nécessaire
    // google: 'votre-code-google',
  },
  alternates: {
    canonical: siteConfig.url,
  },
  category: 'health',
};

/**
 * Métadonnées par page
 */
export const pageMetadata: Record<string, Metadata> = {
  home: {
    title: 'EMPC | Espace Médical de Psychothérapies · La Réunion',
    description: 'Un sanctuaire thérapeutique à La Réunion. Dr Joëlle Deblangey accompagne votre chemin vers la santé mentale à travers la Gestalt-thérapie, TCC, méditation MBCT et approches corporelles.',
  },
  drDeblangey: {
    title: 'Dr Joëlle Deblangey - Médecin Psychothérapeute',
    description: 'Découvrez le parcours du Dr Joëlle Deblangey, médecin psychothérapeute à La Réunion. Gestalt-thérapie, TCC, thérapie systémique, sexologie et méditation MBCT.',
  },
  yoga: {
    title: 'Yoga et Discipline Corporelle - Delphine Varesano',
    description: 'Hatha Yoga et Yoga Nidra à La Réunion. Mme Delphine Varesano accompagne votre pratique corporelle en association avec le travail psychothérapeutique.',
  },
  gestalt: {
    title: 'Gestalt-Thérapie',
    description: 'La Gestalt-Thérapie à La Réunion avec le Dr Deblangey. Découvrez ce que vous ressentez et ce dont vous avez besoin pour un développement harmonieux.',
  },
  tcc: {
    title: 'Thérapies Comportementales et Cognitives (TCC)',
    description: 'TCC à La Réunion - Thérapies Comportementales et Cognitives pour traiter anxiété, phobies, TOC, dépression avec des méthodes validées scientifiquement.',
  },
  nutrition: {
    title: 'Nutrition Comportementale',
    description: 'Retrouvez une relation apaisée avec l\'alimentation. Accompagnement des troubles alimentaires (boulimie, hyperphagie, anorexie) à La Réunion.',
  },
  sexologie: {
    title: 'Sexologie',
    description: 'Consultations de sexologie à La Réunion. Accompagnement individuel ou en couple par le Dr Deblangey, médecin sexologue diplômée.',
  },
  familiales: {
    title: 'Thérapies Familiales et Conjugales Systémiques',
    description: 'Thérapie de couple et thérapie familiale systémique à La Réunion. Retrouvez l\'harmonie relationnelle avec le Dr Deblangey.',
  },
  mbct: {
    title: 'Méditation MBCT - Pleine Conscience',
    description: 'Protocole MBCT (Mindfulness Based Cognitive Therapy) à La Réunion. Prévention des rechutes dépressives et gestion du stress par la méditation.',
  },
  mecl: {
    title: 'MECL - Méditation adaptée aux Troubles Alimentaires',
    description: 'Protocole ME-CL : Manger et Vivre en Pleine Conscience. Programme de 8 séances pour les troubles du comportement alimentaire à La Réunion.',
  },
  tarifs: {
    title: 'Nos Tarifs',
    description: 'Tarifs des consultations EMPC : Gestalt-thérapie, TCC, nutrition comportementale, sexologie, thérapie de couple et familiale, méditation MBCT à La Réunion.',
  },
  location: {
    title: 'Location aux Professionnels',
    description: 'Location de bureaux pour professionnels de santé à La Réunion. Espace lumineux de 12m² au sein du cabinet EMPC.',
  },
  mentionsLegales: {
    title: 'Mentions Légales',
    description: 'Mentions légales du site EMPC.re - Espace Médical de Psychothérapies et de Travail Corporel Associé, La Réunion.',
  },
  confidentialite: {
    title: 'Politique de Confidentialité',
    description: 'Politique de confidentialité et protection des données personnelles du site EMPC.re conformément au RGPD.',
  },
};

/**
 * Génère les métadonnées pour une page spécifique
 */
export function generatePageMetadata(pageKey: keyof typeof pageMetadata): Metadata {
  const pageMeta = pageMetadata[pageKey];
  return {
    ...pageMeta,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: pageMeta.title as string,
      description: pageMeta.description as string,
    },
  };
}
