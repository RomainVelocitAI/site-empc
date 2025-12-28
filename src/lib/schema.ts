/**
 * Schema.org Structured Data pour EMPC
 * Données structurées pour améliorer le SEO et la visibilité dans les moteurs de recherche
 */

import { siteConfig } from './metadata';

/**
 * Schema.org pour LocalBusiness (MedicalBusiness)
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  '@id': `${siteConfig.url}/#organization`,
  name: siteConfig.fullName,
  alternateName: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo-empc.png`,
  image: `${siteConfig.url}/images/og-empc.jpg`,
  telephone: siteConfig.contact.phoneFormatted,
  description: siteConfig.description,
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'La Réunion',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    addressCountry: 'FR',
  },
  areaServed: {
    '@type': 'Place',
    name: 'La Réunion, France',
  },
  priceRange: '€€',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Chèques, Virement, Espèces',
  medicalSpecialty: [
    'Psychotherapy',
    'Behavioral Medicine',
    'Cognitive Behavioral Therapy',
    'Nutrition',
    'Sexology',
    'Family Therapy',
  ],
  availableService: [
    {
      '@type': 'MedicalProcedure',
      name: 'Gestalt-Thérapie',
      description: 'Thérapie des formes que chacun donne à son existence, à ses contacts, à ses relations.',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Thérapies Comportementales et Cognitives (TCC)',
      description: 'Approche validée scientifiquement pour traiter anxiété, phobies, TOC, dépression.',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Nutrition Comportementale',
      description: 'Accompagnement des troubles alimentaires et relation à l\'alimentation.',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Sexologie',
      description: 'Consultations individuelles ou en couple pour les troubles de la sexualité.',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Thérapies Familiales et Conjugales Systémiques',
      description: 'Approche systémique pour couples et familles.',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Méditation MBCT',
      description: 'Thérapie Cognitive basée sur la Pleine Conscience pour prévenir les rechutes dépressives.',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Protocole MECL',
      description: 'Manger et Vivre en Pleine Conscience - Programme pour les troubles alimentaires.',
    },
  ],
  founder: {
    '@type': 'Person',
    '@id': `${siteConfig.url}/#dr-deblangey`,
    name: 'Dr Joëlle Deblangey',
  },
  foundingDate: '2012',
};

/**
 * Schema.org pour le Dr Deblangey (Person)
 */
export const doctorSchema = {
  '@context': 'https://schema.org',
  '@type': 'Physician',
  '@id': `${siteConfig.url}/#dr-deblangey`,
  name: 'Dr Joëlle Deblangey',
  givenName: 'Joëlle',
  familyName: 'Deblangey',
  honorificPrefix: 'Dr',
  jobTitle: 'Médecin Psychothérapeute',
  description: 'Médecin psychothérapeute certifiée, fondatrice de l\'EMPC en 2012. Formée en Gestalt-thérapie, TCC, thérapie systémique familiale et sexologie.',
  url: `${siteConfig.url}/equipe/dr-deblangey`,
  telephone: siteConfig.contact.phoneFormatted,
  worksFor: {
    '@type': 'MedicalBusiness',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.fullName,
  },
  medicalSpecialty: [
    'Psychotherapy',
    'Gestalt Therapy',
    'Cognitive Behavioral Therapy',
    'Family Therapy',
    'Sexology',
    'Mindfulness Based Cognitive Therapy',
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      name: 'Doctorat en Médecine',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certificate',
      name: 'Gestalt-Thérapeute (Institut Français de Gestalt-thérapie)',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certificate',
      name: 'Diplôme de Thérapie Comportementale et Cognitive (AFTCC)',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certificate',
      name: 'Thérapeute Systémicienne Familiale et Conjugale (IDES)',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certificate',
      name: 'Médecin Sexologue (Faculté de médecine Lille/Amiens)',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certificate',
      name: 'Instructrice MBCT certifiée niveau 3',
    },
  ],
};

/**
 * Schema.org pour les services (Service)
 */
export const servicesSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalTherapy',
    name: 'Gestalt-Thérapie',
    description: 'Découvrir ce que nous ressentons et ce dont nous avons besoin pour un développement harmonieux.',
    url: `${siteConfig.url}/therapies/gestalt`,
    provider: {
      '@type': 'Physician',
      '@id': `${siteConfig.url}/#dr-deblangey`,
    },
    offers: {
      '@type': 'Offer',
      price: '75',
      priceCurrency: 'EUR',
      description: '55 minutes',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalTherapy',
    name: 'Thérapies Comportementales et Cognitives',
    description: 'Approche validée scientifiquement pour traiter anxiété, phobies, TOC et dépression.',
    url: `${siteConfig.url}/therapies/tcc`,
    provider: {
      '@type': 'Physician',
      '@id': `${siteConfig.url}/#dr-deblangey`,
    },
    offers: {
      '@type': 'Offer',
      price: '75',
      priceCurrency: 'EUR',
      description: '55 minutes',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalTherapy',
    name: 'Nutrition Comportementale',
    description: 'Accompagnement des troubles alimentaires et relation apaisée avec l\'alimentation.',
    url: `${siteConfig.url}/therapies/nutrition`,
    provider: {
      '@type': 'Physician',
      '@id': `${siteConfig.url}/#dr-deblangey`,
    },
    offers: {
      '@type': 'Offer',
      price: '55',
      priceCurrency: 'EUR',
      description: '30 minutes',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalTherapy',
    name: 'Sexologie',
    description: 'Consultations de sexologie individuelle ou en couple.',
    url: `${siteConfig.url}/therapies/sexologie`,
    provider: {
      '@type': 'Physician',
      '@id': `${siteConfig.url}/#dr-deblangey`,
    },
    offers: [
      {
        '@type': 'Offer',
        price: '75',
        priceCurrency: 'EUR',
        description: 'Consultation individuelle - 55 minutes',
      },
      {
        '@type': 'Offer',
        price: '100',
        priceCurrency: 'EUR',
        description: 'Consultation avec partenaire - 55 minutes',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalTherapy',
    name: 'Thérapie de Couple',
    description: 'Thérapie systémique pour couples.',
    url: `${siteConfig.url}/therapies/familiales`,
    provider: {
      '@type': 'Physician',
      '@id': `${siteConfig.url}/#dr-deblangey`,
    },
    offers: {
      '@type': 'Offer',
      price: '110',
      priceCurrency: 'EUR',
      description: '1 heure',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalTherapy',
    name: 'Thérapie Familiale',
    description: 'Thérapie systémique pour familles.',
    url: `${siteConfig.url}/therapies/familiales`,
    provider: {
      '@type': 'Physician',
      '@id': `${siteConfig.url}/#dr-deblangey`,
    },
    offers: {
      '@type': 'Offer',
      price: '150',
      priceCurrency: 'EUR',
      description: '1h15',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalTherapy',
    name: 'Méditation MBCT',
    description: 'Thérapie Cognitive basée sur la Pleine Conscience - Programme de 8 séances en groupe.',
    url: `${siteConfig.url}/groupal/mbct`,
    provider: {
      '@type': 'Physician',
      '@id': `${siteConfig.url}/#dr-deblangey`,
    },
    offers: {
      '@type': 'Offer',
      price: '640',
      priceCurrency: 'EUR',
      description: '8 séances de 2h30',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalTherapy',
    name: 'Protocole MECL',
    description: 'Manger et Vivre en Pleine Conscience - Programme de 8 séances pour les troubles alimentaires.',
    url: `${siteConfig.url}/groupal/mecl`,
    provider: {
      '@type': 'Physician',
      '@id': `${siteConfig.url}/#dr-deblangey`,
    },
    offers: {
      '@type': 'Offer',
      price: '560',
      priceCurrency: 'EUR',
      description: '8 séances + journée de pleine conscience',
    },
  },
];

/**
 * Schema.org pour le site web (WebSite)
 */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.fullName,
  alternateName: siteConfig.name,
  description: siteConfig.description,
  publisher: {
    '@type': 'MedicalBusiness',
    '@id': `${siteConfig.url}/#organization`,
  },
  inLanguage: 'fr-FR',
};

/**
 * Schema.org pour les breadcrumbs
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Génère le JSON-LD complet pour le site
 */
export function generateFullSchema() {
  return [
    websiteSchema,
    organizationSchema,
    doctorSchema,
    ...servicesSchema,
  ];
}
