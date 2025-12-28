'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Layout } from '@/components/layout';
import { ExpandingCards, CardItem } from '@/components/expanding-cards';
import { TestimonialSection, Testimonial } from '@/components/testimonials';
import { LogoCloud } from '@/components/logo-cloud-4';
import { ProfileCarousel, TeamMember } from '@/components/profile-card-testimonial-carousel';
import { SectionDivider, AccentLine } from '@/components/section-divider';
import { Brain, Heart, Users, Utensils, Sparkles, HeartHandshake } from 'lucide-react';

// Unsplash images - tropical La Réunion vibes
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80', // tropical beach
  meditation: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80', // meditation/yoga
  nature: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&q=80', // sunlight through leaves
  wellness: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=800&q=80', // spa/wellness
  tropical: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1200&q=80', // tropical plants
  portrait: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80', // professional woman doctor
};

// Custom easing
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Animation variants
const fadeUpVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easeOutExpo }
  }
};

// Animated section wrapper
function AnimatedSection({ children, className = '', delay = 0, id }: { children: React.ReactNode; className?: string; delay?: number; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, delay, ease: easeOutExpo }
        }
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Floating decorative element
function FloatingElement({ className, style, delay = 0 }: { className?: string; style?: React.CSSProperties; delay?: number }) {
  return (
    <motion.div
      className={className}
      style={style}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 3, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

// Parallax image component - simplified to avoid hydration issues
function ParallaxImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * 0.3);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        style={{ transform: `translateY(${offsetY * 0.1}px)` }}
        className="w-full h-[120%] -mt-[10%]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
    </div>
  );
}

// Services data with 6 cards including Meditation
const servicesData = [
  {
    title: 'Gestalt-Thérapie',
    desc: 'Découvrir ce que nous ressentons et ce dont nous avons besoin pour un développement harmonieux.',
    price: '75€',
    color: 'var(--empc-primary)',
    size: 'lg:col-span-2',
    href: '/therapies/gestalt',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    )
  },
  {
    title: 'TCC',
    desc: 'Thérapies Comportementales et Cognitives pour un changement durable.',
    price: '75€',
    color: 'var(--empc-secondary)',
    size: '',
    href: '/therapies/tcc',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-5 0v-15A2.5 2.5 0 0 1 9.5 2Z" />
        <path d="M14.5 8A2.5 2.5 0 0 1 17 10.5v9a2.5 2.5 0 0 1-5 0v-9A2.5 2.5 0 0 1 14.5 8Z" />
      </svg>
    )
  },
  {
    title: 'Nutrition Comportementale',
    desc: 'Retrouver une relation apaisée avec l\'alimentation.',
    price: '55€',
    color: 'var(--empc-gold)',
    size: '',
    href: '/therapies/nutrition',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
        <path d="M8.5 8.5v.01" />
        <path d="M16 15.5v.01" />
        <path d="M12 12v.01" />
        <path d="M11 17v.01" />
        <path d="M7 14v.01" />
      </svg>
    )
  },
  {
    title: 'Thérapies Familiales',
    desc: 'Approche systémique pour couples et familles.',
    price: '110-150€',
    color: 'var(--empc-sage)',
    size: '',
    href: '/therapies/familiales',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    title: 'Sexologie',
    desc: 'Accompagnement individuel ou en couple.',
    price: '75-100€',
    color: 'var(--empc-terracotta)',
    size: '',
    href: '/therapies/sexologie',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    )
  },
  {
    title: 'Méditation Pleine Conscience',
    desc: 'Protocoles MBCT et MECL en groupe pour prévention et équilibre.',
    price: '560-640€',
    color: 'var(--empc-primary)',
    size: 'lg:col-span-2',
    href: '/groupal/mbct',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 2v4" />
        <path d="m6.34 6.34 2.83 2.83" />
        <path d="M2 12h4" />
        <path d="m6.34 17.66 2.83-2.83" />
        <path d="M12 18v4" />
        <path d="m17.66 17.66-2.83-2.83" />
        <path d="M18 12h4" />
        <path d="m17.66 6.34-2.83 2.83" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    )
  },
];

// Données pour Expanding Cards (6 thérapies)
const therapyCards: CardItem[] = [
  {
    id: 'gestalt',
    title: 'Gestalt-Thérapie',
    description: 'Découvrir ce que nous ressentons et ce dont nous avons besoin pour un développement harmonieux.',
    imgSrc: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80',
    icon: <Brain className="w-8 h-8" />,
    linkHref: '/therapies/gestalt',
  },
  {
    id: 'tcc',
    title: 'TCC',
    description: 'Thérapies Comportementales et Cognitives pour un changement durable.',
    imgSrc: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
    icon: <Sparkles className="w-8 h-8" />,
    linkHref: '/therapies/tcc',
  },
  {
    id: 'nutrition',
    title: 'Nutrition Comportementale',
    description: 'Retrouver une relation apaisée avec l\'alimentation.',
    imgSrc: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
    icon: <Utensils className="w-8 h-8" />,
    linkHref: '/therapies/nutrition',
  },
  {
    id: 'familiales',
    title: 'Thérapies Familiales',
    description: 'Approche systémique pour couples et familles.',
    imgSrc: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80',
    icon: <Users className="w-8 h-8" />,
    linkHref: '/therapies/familiales',
  },
  {
    id: 'sexologie',
    title: 'Sexologie',
    description: 'Accompagnement individuel ou en couple.',
    imgSrc: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80',
    icon: <Heart className="w-8 h-8" />,
    linkHref: '/therapies/sexologie',
  },
  {
    id: 'meditation',
    title: 'Méditation MBCT',
    description: 'Pleine conscience pour prévention et équilibre.',
    imgSrc: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
    icon: <HeartHandshake className="w-8 h-8" />,
    linkHref: '/groupes/mbct',
  },
];

// Témoignages patients (placeholders)
const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Un accompagnement bienveillant qui m'a permis de retrouver confiance en moi. Le Dr Deblangey a su m'écouter et me guider avec patience.",
    name: "Marie-Claire",
    role: "Patiente",
    imageSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
  },
  {
    id: 2,
    quote: "Les séances de groupe MBCT ont transformé ma façon d'appréhender le quotidien. Je recommande vivement cette approche.",
    name: "Jean-Pierre",
    role: "Patient",
    imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    id: 3,
    quote: "Grâce à la nutrition comportementale, j'ai enfin trouvé une relation apaisée avec la nourriture. Merci pour cette libération.",
    name: "Sophie",
    role: "Patiente",
    imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
  },
];

// Logos certifications (placeholders - à remplacer)
const certificationLogos = [
  { src: "https://placehold.co/120x40/5C6B4A/white?text=IFGT", alt: "Institut Français de Gestalt-Thérapie" },
  { src: "https://placehold.co/120x40/993366/white?text=AFTCC", alt: "Association Française de TCC" },
  { src: "https://placehold.co/120x40/8B7355/white?text=IDES", alt: "Institut de Thérapie Systémique" },
  { src: "https://placehold.co/120x40/5C6B4A/white?text=MBCT", alt: "Certification MBCT" },
  { src: "https://placehold.co/120x40/993366/white?text=Ordre", alt: "Ordre des Médecins" },
];

// Membres de l'équipe pour le carousel
const teamMembers: TeamMember[] = [
  {
    name: "Dr Joëlle Deblangey",
    title: "Médecin Psychothérapeute · Fondatrice",
    description: "Médecin psychothérapeute certifiée avec plus de 40 ans d'expérience. Formée en Gestalt-thérapie, TCC, thérapie systémique familiale et sexologie. Instructrice MBCT certifiée niveau 3.",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
    specialties: ["Gestalt-Thérapie", "TCC", "Sexologie", "MBCT"],
    phone: "0692460789",
    profileUrl: "/equipe/dr-deblangey",
  },
  {
    name: "Delphine Varesano",
    title: "Intervenante Yoga",
    description: "Enseignante de Hatha Yoga et Yoga Nidra formée à l'Institut Vidya. Elle guide les pratiquants vers la détente profonde et l'équilibre intérieur à travers les postures traditionnelles et la méditation.",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    specialties: ["Hatha Yoga", "Yoga Nidra"],
    phone: "0692460789",
    profileUrl: "/equipe/yoga",
  },
  {
    name: "Intervenants Partenaires",
    title: "Psychologues & Thérapeutes",
    description: "Une équipe de professionnels qualifiés collaborant avec l'EMPC pour offrir un accompagnement pluridisciplinaire : psychologues cliniciens, art-thérapeutes et praticiens en médecines douces.",
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    specialties: ["Psychologie", "Art-thérapie", "Médecines douces"],
    phone: "0692460789",
  },
];

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Computed parallax values from scrollY
  const heroImageY = `${scrollY * 0.3}px`;
  const heroOpacity = Math.max(0, 1 - scrollY / 500);
  const heroScale = 1 + scrollY * 0.0001;

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout transparentHeader={true}>
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* ========== HERO - CINEMATIC ========== */}
            <section className="relative h-screen overflow-hidden">
              {/* Parallax Background Image */}
              <div
                className="absolute inset-0"
                style={{ transform: `translateY(${heroImageY}) scale(${heroScale})` }}
              >
                <Image
                  src={IMAGES.hero}
                  alt="Tropical paradise"
                  fill
                  priority
                  className="object-cover"
                  sizes="100vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[var(--empc-background)]" />
              </div>

              {/* Floating decorative elements */}
              <FloatingElement
                className="absolute top-[20%] right-[10%] w-32 h-32 rounded-full opacity-20 hide-mobile"
                style={{ background: 'var(--empc-gold)' }}
                delay={0}
              />
              <FloatingElement
                className="absolute bottom-[30%] left-[5%] w-24 h-24 blob-shape opacity-15 hide-mobile"
                style={{ background: 'var(--empc-primary)' }}
                delay={2}
              />

              {/* Hero Content */}
              <div
                className="relative z-10 h-full flex items-center"
                style={{ opacity: heroOpacity }}
              >
                <div className="container-wide">
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl"
                  >
                    {/* Label */}
                    <motion.div
                      variants={fadeUpVariants}
                      className="flex items-center gap-4 mb-8"
                    >
                      <motion.div
                        className="w-16 h-px bg-[var(--empc-gold)]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                      />
                      <span className="text-white/90 text-sm tracking-[0.3em] uppercase font-medium">
                        Psychothérapies & Bien-être
                      </span>
                    </motion.div>

                    {/* Main Title - Dramatic split */}
                    <h1 className="font-heading text-white mb-8">
                      <motion.span
                        className="block text-display"
                        variants={fadeUpVariants}
                      >
                        Espace Médical de
                      </motion.span>
                      <motion.span
                        className="block text-huge text-[var(--empc-gold)] italic"
                        variants={fadeUpVariants}
                      >
                        Psychothérapies
                      </motion.span>
                    </h1>

                    {/* Subtitle */}
                    <motion.p
                      variants={fadeUpVariants}
                      className="text-white/80 text-xl md:text-2xl max-w-xl mb-12 leading-relaxed"
                    >
                      Un lieu de soin holistique à La Réunion
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                      variants={fadeUpVariants}
                      className="flex flex-wrap gap-4"
                    >
                      <motion.a
                        href="sms:0692460789"
                        className="btn-magnetic btn-primary text-lg px-10 py-5"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10">Prendre rendez-vous</span>
                      </motion.a>
                      <motion.a
                        href="#discover"
                        className="btn-magnetic btn-outline text-white border-white/50 hover:bg-white hover:text-[var(--empc-text)]"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Découvrir
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Scroll indicator */}
              <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="flex flex-col items-center gap-2 text-white/60"
                >
                  <span className="text-xs tracking-widest uppercase">Scroll</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </motion.div>
              </motion.div>
            </section>

            {/* ========== DIVIDER: Hero → Introduction ========== */}
            <SectionDivider variant="curve" color="var(--empc-background)" height={100} />

            {/* ========== INTRODUCTION - Texte complet du client ========== */}
            <AnimatedSection className="py-32 relative overflow-hidden" id="discover">
              {/* Liseré décoratif gold */}
              <AccentLine color="var(--empc-gold)" position="top" thickness={3} variant="straight" />
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
                <Image src={IMAGES.tropical} alt="" fill className="object-cover" />
              </div>

              <div className="container-wide relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  {/* Introduction Text - Texte complet du client */}
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative"
                  >
                    {/* Guillemet décoratif */}
                    <motion.div
                      className="absolute -top-8 -left-8 text-[120px] font-heading text-[var(--empc-gold)] opacity-20 leading-none select-none"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 0.2, scale: 1 }}
                      viewport={{ once: true }}
                    >
                      «
                    </motion.div>

                    <div className="space-y-6 relative z-10">
                      <motion.p
                        variants={fadeUpVariants}
                        className="font-heading text-xl md:text-2xl leading-relaxed italic text-[var(--empc-text)]"
                      >
                        Il vous sera possible dans cet Espace d&apos;articuler vos entretiens individuels,
                        vos suivis familiaux ou conjugaux et vos disciplines corporelles (protocole de
                        méditation MBCT et MECL - manger et vivre en pleine conscience).
                      </motion.p>

                      <motion.p
                        variants={fadeUpVariants}
                        className="text-lg leading-relaxed opacity-80"
                      >
                        L&apos;indication en sera posée et proposée lors de temps d&apos;échanges entre les
                        différents professionnels, respectant la confidentialité.
                      </motion.p>

                      <motion.p
                        variants={fadeUpVariants}
                        className="text-lg leading-relaxed opacity-80"
                      >
                        Votre référent (personne qui vous a adressé : psychiatre, psychologue,
                        généraliste…) en sera averti avec votre accord.
                      </motion.p>

                      <motion.p
                        variants={fadeUpVariants}
                        className="text-lg leading-relaxed opacity-80"
                      >
                        Je vous laisse découvrir ce lieu et ses consultants en psychologie et intervenants
                        des disciplines corporelles associées où vous pourrez apprendre à vous sentir en
                        harmonie quelle que soit l&apos;approche utilisée.
                      </motion.p>
                    </div>

                    {/* Signature */}
                    <motion.footer
                      variants={fadeUpVariants}
                      className="mt-10 flex items-center gap-4"
                    >
                      <motion.div
                        className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-[var(--empc-gold)]/20"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Image
                          src={IMAGES.portrait}
                          alt="Dr Joëlle Deblangey"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div>
                        <cite className="not-italic font-heading text-xl text-[var(--empc-primary)]">
                          Dr Joëlle DEBLANGEY
                        </cite>
                        <p className="text-sm opacity-60">Médecin Psychothérapeute</p>
                      </div>
                    </motion.footer>
                  </motion.div>

                  {/* Image */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden">
                      <Image
                        src={IMAGES.nature}
                        alt="Nature healing"
                        fill
                        className="object-cover img-zoom"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--empc-primary)]/20 to-transparent" />
                    </div>
                    {/* Floating badge */}
                    <motion.div
                      className="absolute -bottom-6 -left-6 bg-[var(--empc-gold)] text-white px-8 py-4 rounded-full shadow-xl"
                      whileHover={{ scale: 1.05, rotate: -3 }}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ y: { repeat: Infinity, duration: 3 } }}
                    >
                      <span className="font-heading text-lg">Depuis 2012</span>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </AnimatedSection>

            {/* ========== DIVIDER: Introduction → Services ========== */}
            <SectionDivider variant="diagonal-down" color="var(--empc-sage)" height={80} className="opacity-10" />

            {/* ========== SERVICES - Expanding Cards ========== */}
            <AnimatedSection className="py-32 bg-gradient-tropical clip-diagonal-top">
              <div className="container-wide">
                {/* Section header */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <motion.span
                    variants={fadeUpVariants}
                    className="text-[var(--empc-gold)] text-sm tracking-[0.3em] uppercase font-medium"
                  >
                    Nos approches
                  </motion.span>
                  <motion.h2
                    variants={fadeUpVariants}
                    className="font-heading text-display mt-4"
                  >
                    Un accompagnement<br />
                    <span className="text-[var(--empc-primary)] italic">pluridisciplinaire</span>
                  </motion.h2>
                  <motion.p
                    variants={fadeUpVariants}
                    className="mt-6 text-lg text-[var(--empc-text)]/70 max-w-2xl mx-auto"
                  >
                    Survolez chaque approche pour découvrir nos méthodes thérapeutiques
                  </motion.p>
                </motion.div>

                {/* Expanding Cards - Accordéon interactif */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="flex justify-center"
                >
                  <ExpandingCards items={therapyCards} defaultActiveIndex={0} />
                </motion.div>

                {/* Prix indicatifs */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-center mt-10 text-sm text-[var(--empc-text)]/50"
                >
                  Tarifs : de 55€ à 150€ selon les prestations · <Link href="/tarifs" className="text-[var(--empc-gold)] hover:underline">Voir tous les tarifs</Link>
                </motion.p>
              </div>
            </AnimatedSection>

            {/* ========== DIVIDER: Services → Logo Cloud ========== */}
            <SectionDivider variant="wave" color="var(--empc-cream)" height={60} />

            {/* ========== LOGO CLOUD - Certifications ========== */}
            <AnimatedSection className="py-16 bg-[var(--empc-cream)] corner-tl-rounded-xl corner-br-rounded-xl relative">
              {/* Liseré gauche gold */}
              <AccentLine color="var(--empc-gold)" position="left" thickness={4} variant="straight" offset="0" />
              <div className="container-wide">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-center text-sm text-[var(--empc-text)]/50 mb-8 tracking-widest uppercase"
                >
                  Formations & Certifications
                </motion.p>
                <LogoCloud logos={certificationLogos} />
              </div>
            </AnimatedSection>

            {/* ========== DIVIDER: Logo Cloud → Meditation ========== */}
            <SectionDivider variant="diagonal-up" color="var(--empc-background)" height={80} />

            {/* ========== MEDITATION - Full width immersive ========== */}
            <section className="relative min-h-screen flex items-center py-32 overflow-hidden corner-tr-rounded-xl">
              {/* Parallax background */}
              <ParallaxImage
                src={IMAGES.meditation}
                alt="Méditation"
                className="absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--empc-background)] via-[var(--empc-background)]/80 to-transparent" />

              <div className="container-wide relative z-10">
                <div className="max-w-2xl">
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.span
                      variants={fadeUpVariants}
                      className="text-[var(--empc-gold)] text-sm tracking-[0.3em] uppercase font-medium"
                    >
                      Travail groupal
                    </motion.span>

                    <motion.h2
                      variants={fadeUpVariants}
                      className="font-heading text-display mt-4 mb-8"
                    >
                      Méditation de<br />
                      <span className="text-[var(--empc-primary)] italic">Pleine Conscience</span>
                    </motion.h2>

                    <motion.div variants={fadeUpVariants} className="space-y-6 text-lg opacity-80 mb-10">
                      <p>
                        La <strong>MBCT</strong> est destinée à prévenir les rechutes dépressives
                        et accompagner les troubles anxieux.
                      </p>
                      <p>
                        Le protocole <strong>MECL</strong> s&apos;adresse aux personnes souffrant
                        de troubles du comportement alimentaire.
                      </p>
                    </motion.div>

                    {/* Key points */}
                    <motion.div variants={fadeUpVariants} className="space-y-4 mb-10">
                      {['8 séances de groupe', 'Petit effectif (4-10)', 'Entretien préalable'].map((point, i) => (
                        <motion.div
                          key={point}
                          className="flex items-center gap-4"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                        >
                          <motion.div
                            className="w-3 h-3 rounded-full bg-[var(--empc-gold)]"
                            whileHover={{ scale: 1.5 }}
                          />
                          <span>{point}</span>
                        </motion.div>
                      ))}
                    </motion.div>

                    <Link href="/groupal/mbct">
                      <motion.span
                        variants={fadeUpVariants}
                        className="btn-magnetic btn-outline inline-flex"
                        whileHover={{ scale: 1.05 }}
                      >
                        En savoir plus
                      </motion.span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* ========== DIVIDER: Meditation → Équipe ========== */}
            <SectionDivider variant="curve-reverse" color="var(--empc-background)" height={90} />

            {/* ========== ÉQUIPE - Profile Carousel ========== */}
            <ProfileCarousel
              members={teamMembers}
              title="Notre équipe"
              subtitle="Des professionnels qualifiés et bienveillants pour vous accompagner"
              className="bg-[var(--empc-background)] corner-bl-rounded-xl"
            />

            {/* ========== DIVIDER: Équipe → Testimonials ========== */}
            <SectionDivider variant="diagonal-down" color="var(--empc-cream)" height={70} />

            {/* ========== TESTIMONIALS - Témoignages patients ========== */}
            <div className="bg-[var(--empc-cream)] corner-tl-rounded-xl corner-br-rounded-xl relative">
              {/* Liseré supérieur gold */}
              <AccentLine color="var(--empc-gold)" position="top" thickness={3} variant="diagonal" />
              <TestimonialSection
                title="Ce qu'ils disent"
                subtitle="Témoignages de nos patients sur leur parcours thérapeutique"
                testimonials={testimonials}
              />
            </div>

            {/* ========== DIVIDER: Testimonials → Contact ========== */}
            <SectionDivider variant="wave" color="var(--empc-background)" height={80} />

            {/* ========== CONTACT - Dramatic ========== */}
            <AnimatedSection className="py-32 relative overflow-hidden corner-tr-rounded-xl" id="contact">
              {/* Liseré droit gold */}
              <AccentLine color="var(--empc-gold)" position="right" thickness={4} variant="straight" />
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 opacity-5"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 50%, var(--empc-primary) 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 50%, var(--empc-primary) 0%, transparent 50%)',
                    'radial-gradient(circle at 20% 50%, var(--empc-primary) 0%, transparent 50%)',
                  ]
                }}
                transition={{ duration: 10, repeat: Infinity }}
              />

              <div className="container-narrow text-center relative z-10">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {/* Decorative line */}
                  <motion.div
                    className="w-px h-20 bg-gradient-to-b from-transparent via-[var(--empc-gold)] to-transparent mx-auto mb-12"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                  />

                  <motion.span
                    variants={fadeUpVariants}
                    className="text-[var(--empc-gold)] text-sm tracking-[0.3em] uppercase font-medium"
                  >
                    Contact
                  </motion.span>

                  <motion.h2
                    variants={fadeUpVariants}
                    className="font-heading text-display mt-4 mb-6"
                  >
                    Prenons<br />
                    <span className="text-[var(--empc-primary)] italic">rendez-vous</span>
                  </motion.h2>

                  <motion.p variants={fadeUpVariants} className="text-lg opacity-70 max-w-md mx-auto mb-12">
                    Envoyez-nous un SMS pour convenir d&apos;un premier entretien
                  </motion.p>

                  <motion.a
                    variants={scaleInVariants}
                    href="sms:0692460789"
                    className="inline-flex items-center gap-4 bg-[var(--empc-primary)] text-white px-12 py-6 rounded-full text-xl font-medium shadow-2xl"
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      boxShadow: '0 30px 60px rgba(153, 51, 102, 0.4)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    0692 46 07 89
                  </motion.a>

                  <motion.p
                    variants={fadeUpVariants}
                    className="mt-6 text-sm opacity-50"
                  >
                    SMS uniquement · La Réunion
                  </motion.p>
                </motion.div>
              </div>
            </AnimatedSection>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
