/**
 * EMPC - Configuration centralisée des images
 *
 * Ce fichier contient toutes les métadonnées des images du site.
 * Pour remplacer une image placeholder, placez votre fichier dans le dossier
 * correspondant avec le même nom, ou mettez à jour le chemin ici.
 *
 * Formats recommandés:
 * - Photos: .jpg ou .webp (qualité 80-85%)
 * - Logos/icônes: .svg ou .png
 * - Hero images: .jpg (1920x1080 min)
 * - Portraits: .jpg (400x500 min)
 * - Cards: .jpg (800x600 min)
 */

export interface ImageMetadata {
  src: string;
  alt: string;
  altFr: string;
  width: number;
  height: number;
  placeholder?: 'blur' | 'empty';
  priority?: boolean;
  description?: string;
}

// ============================================
// IMAGES PRINCIPALES
// ============================================

export const HERO_IMAGES: Record<string, ImageMetadata> = {
  equipe: {
    src: '/images/hero-equipe.svg',
    alt: 'EMPC medical team',
    altFr: "Photo de l'équipe médicale EMPC - Les 3 professionnels de santé",
    width: 1920,
    height: 1080,
    priority: true,
    description: 'Photo principale affichée sur la page d\'accueil. Remplacer par photo-equipe-empc-2025.jpg',
  },
};

// ============================================
// PORTRAITS
// ============================================

export const PORTRAIT_IMAGES: Record<string, ImageMetadata> = {
  joelleDeblangey: {
    src: '/images/portraits/joelle-deblangey.png',
    alt: 'Dr Joëlle Deblangey',
    altFr: 'Portrait du Dr Joëlle Deblangey, médecin psychothérapeute',
    width: 400,
    height: 500,
    priority: false,
    description: 'Portrait du Dr Deblangey. Remplacer par joelle.jpg',
  },
};

// ============================================
// THÉRAPIES
// ============================================

export const THERAPY_IMAGES: Record<string, ImageMetadata> = {
  gestalt: {
    src: '/images/therapies/gestalt.svg',
    alt: 'Gestalt Therapy',
    altFr: 'Illustration de la Gestalt-Thérapie - Approche holistique',
    width: 800,
    height: 600,
    description: 'Image illustrant la Gestalt-Thérapie avec formes interconnectées',
  },
  tcc: {
    src: '/images/therapies/tcc.svg',
    alt: 'Cognitive Behavioral Therapy',
    altFr: 'Thérapies Comportementales et Cognitives - Triangle cognitif',
    width: 800,
    height: 600,
    description: 'Image illustrant les TCC avec triangle pensées-émotions-comportements',
  },
  nutrition: {
    src: '/images/therapies/nutrition.svg',
    alt: 'Behavioral Nutrition',
    altFr: 'Nutrition Comportementale - Équilibre alimentaire',
    width: 800,
    height: 600,
    description: 'Image illustrant la nutrition comportementale',
  },
  sexologie: {
    src: '/images/therapies/sexologie.svg',
    alt: 'Sexology',
    altFr: 'Sexologie - Accompagnement individuel et de couple',
    width: 800,
    height: 600,
    description: 'Image illustrant la sexologie avec symbole de connexion',
  },
  familiales: {
    src: '/images/therapies/familiales.svg',
    alt: 'Family and Couple Therapy',
    altFr: 'Thérapies Familiales et Conjugales - Approche systémique',
    width: 800,
    height: 600,
    description: 'Image illustrant l\'approche systémique familiale',
  },
};

// ============================================
// TRAVAIL GROUPAL / MÉDITATION
// ============================================

export const GROUPAL_IMAGES: Record<string, ImageMetadata> = {
  mbct: {
    src: '/images/groupal/mbct.svg',
    alt: 'MBCT Mindfulness Meditation',
    altFr: 'Méditation MBCT - Pleine Conscience Thérapeutique',
    width: 800,
    height: 600,
    description: 'Image illustrant la méditation MBCT avec cercles concentriques',
  },
  mecl: {
    src: '/images/groupal/mecl.svg',
    alt: 'MECL Mindful Eating Protocol',
    altFr: 'Protocole MECL - Manger en Pleine Conscience',
    width: 800,
    height: 600,
    description: 'Image illustrant le protocole MECL pour les troubles alimentaires',
  },
};

// ============================================
// CABINET / BUNGALOW
// ============================================

export const CABINET_IMAGES: Record<string, ImageMetadata> = {
  exterieur: {
    src: '/images/cabinet/bungalow-exterieur.jpg',
    alt: 'EMPC Bungalow exterior',
    altFr: 'Bungalow EMPC - Entrée du cabinet au 41 bis',
    width: 800,
    height: 600,
    description: 'Vue extérieure du bungalow bleu coloré',
  },
  interieur: {
    src: '/images/cabinet/bungalow-interieur.jpg',
    alt: 'EMPC consultation room',
    altFr: 'Espace de consultation EMPC - Intérieur chaleureux',
    width: 800,
    height: 600,
    description: 'Intérieur du bungalow avec espace de consultation',
  },
  salleEau: {
    src: '/images/cabinet/bungalow-salle-eau.jpg',
    alt: 'EMPC bathroom',
    altFr: 'Salle d\'eau du bungalow EMPC',
    width: 800,
    height: 600,
    description: 'Lavabo et WC du bungalow',
  },
};

// ============================================
// YOGA
// ============================================

export const YOGA_IMAGES: Record<string, ImageMetadata> = {
  hatha: {
    src: '/images/yoga/hatha.svg',
    alt: 'Hatha Yoga',
    altFr: 'Hatha Yoga - Postures et respiration',
    width: 800,
    height: 600,
    description: 'Image illustrant le Hatha Yoga avec silhouette en posture arbre',
  },
  nidra: {
    src: '/images/yoga/nidra.svg',
    alt: 'Yoga Nidra',
    altFr: 'Yoga Nidra - Relaxation profonde consciente',
    width: 800,
    height: 600,
    description: 'Image illustrant le Yoga Nidra avec ondes de relaxation',
  },
};

// ============================================
// IMAGES EXTERNES (Unsplash - temporaires)
// ============================================

export const EXTERNAL_IMAGES = {
  // Images Unsplash pour le développement
  // À remplacer par les vraies images du client
  hero: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
  meditation: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80',
  nature: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&q=80',
  wellness: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=800&q=80',
  tropical: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1200&q=80',
  portrait: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80',
};

// ============================================
// UTILITAIRES
// ============================================

/**
 * Récupère une image avec fallback vers Unsplash
 * Utile pendant la phase de développement
 */
export function getImageWithFallback(
  localImage: ImageMetadata,
  fallbackKey: keyof typeof EXTERNAL_IMAGES
): ImageMetadata {
  // En production, utiliser les images locales
  // Pour le dev, on peut basculer vers les images Unsplash
  const useLocalImages = process.env.NEXT_PUBLIC_USE_LOCAL_IMAGES === 'true';

  if (useLocalImages) {
    return localImage;
  }

  return {
    ...localImage,
    src: EXTERNAL_IMAGES[fallbackKey] || localImage.src,
  };
}

/**
 * Génère les props pour le composant OptimizedImage
 */
export function getImageProps(image: ImageMetadata) {
  return {
    src: image.src,
    alt: image.alt,
    altFr: image.altFr,
    width: image.width,
    height: image.height,
    priority: image.priority ?? false,
  };
}

/**
 * Liste de toutes les images pour le sitemap/preload
 */
export function getAllImages(): ImageMetadata[] {
  return [
    ...Object.values(HERO_IMAGES),
    ...Object.values(PORTRAIT_IMAGES),
    ...Object.values(THERAPY_IMAGES),
    ...Object.values(GROUPAL_IMAGES),
    ...Object.values(YOGA_IMAGES),
  ];
}

/**
 * Vérifie si une image est un placeholder SVG
 */
export function isPlaceholder(src: string): boolean {
  return src.endsWith('.svg') && src.includes('/images/');
}

// Export par défaut de toutes les images
const IMAGES = {
  hero: HERO_IMAGES,
  portraits: PORTRAIT_IMAGES,
  therapies: THERAPY_IMAGES,
  groupal: GROUPAL_IMAGES,
  cabinet: CABINET_IMAGES,
  yoga: YOGA_IMAGES,
  external: EXTERNAL_IMAGES,
};

export default IMAGES;
