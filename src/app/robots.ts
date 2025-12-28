import { MetadataRoute } from 'next';

/**
 * Configuration robots.txt pour EMPC
 * Contrôle l'indexation du site par les moteurs de recherche
 */

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://empc.re';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
        ],
      },
      // Règles spécifiques pour Googlebot
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      // Règles spécifiques pour Bingbot
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
