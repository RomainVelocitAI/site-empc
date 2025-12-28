import { MetadataRoute } from 'next';

/**
 * Sitemap automatique pour EMPC
 * Génère un sitemap.xml avec toutes les pages du site
 */

const baseUrl = 'https://empc.re';

export default function sitemap(): MetadataRoute.Sitemap {
  // Date de dernière modification (à mettre à jour lors des changements)
  const lastModified = new Date();

  // Pages statiques principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/tarifs`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Équipe
    {
      url: `${baseUrl}/equipe/dr-deblangey`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/equipe/yoga`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Thérapies
    {
      url: `${baseUrl}/therapies/gestalt`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/therapies/tcc`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/therapies/nutrition`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/therapies/sexologie`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/therapies/familiales`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Travail groupal
    {
      url: `${baseUrl}/groupal/mbct`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/groupal/mecl`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Pages légales
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/confidentialite`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  return staticPages;
}
