/**
 * Configuration SEO pour EMPC
 * Espace Médical de Psychothérapies et de Travail Corporel Associé
 */

export const siteConfig = {
  name: 'EMPC',
  fullName: 'Espace Médical de Psychothérapies et de Travail Corporel Associé',
  domain: 'empc.re',
  url: 'https://empc.re',
  description: 'Cabinet de psychothérapies et travail corporel à La Réunion. Dr Joëlle Deblangey - Gestalt, TCC, Nutrition, Sexologie, Méditation MBCT.',
  location: 'La Réunion',
  contact: {
    name: 'Dr Joëlle DEBLANGEY',
    phone: '0692 46 07 89',
    phoneType: 'SMS',
    phoneFormatted: '+262 692 46 07 89',
  },
  social: {
    // À compléter si nécessaire
  },
} as const;

export const defaultSEO = {
  titleTemplate: '%s | EMPC - Psychothérapies La Réunion',
  defaultTitle: 'EMPC - Espace Médical de Psychothérapies | La Réunion',
  description: siteConfig.description,
  canonical: siteConfig.url,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteConfig.url,
    siteName: siteConfig.fullName,
    images: [
      {
        url: `${siteConfig.url}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'EMPC - Espace Médical de Psychothérapies',
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#993366', // Couleur primaire EMPC
    },
    {
      name: 'author',
      content: 'Dr Joëlle Deblangey',
    },
    {
      name: 'geo.region',
      content: 'RE',
    },
    {
      name: 'geo.placename',
      content: 'La Réunion',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
  ],
};

// Mots-clés SEO
export const seoKeywords = [
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
  'psychologue La Réunion',
  'troubles alimentaires',
  'dépression',
  'anxiété',
  'pleine conscience',
];

// Schema.org pour LocalBusiness (MedicalBusiness)
export const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: siteConfig.fullName,
  alternateName: siteConfig.name,
  url: siteConfig.url,
  telephone: siteConfig.contact.phoneFormatted,
  description: siteConfig.description,
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'La Réunion',
    addressCountry: 'FR',
  },
  medicalSpecialty: [
    'Psychotherapy',
    'Behavioral Medicine',
    'Nutrition',
  ],
  availableService: [
    {
      '@type': 'MedicalProcedure',
      name: 'Gestalt-Thérapie',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Thérapies Comportementales et Cognitives (TCC)',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Nutrition Comportementale',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Sexologie',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Thérapies Familiales et Conjugales',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Méditation MBCT',
    },
  ],
};
