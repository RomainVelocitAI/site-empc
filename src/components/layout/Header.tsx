'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from './MobileMenu';

// Navigation structure
export const navigation = [
  { name: 'Accueil', href: '/' },
  {
    name: "L'Équipe",
    children: [
      { name: 'Dr Joëlle Deblangey', href: '/equipe/dr-deblangey' },
      { name: 'Intervenants Yoga', href: '/equipe/yoga' },
    ],
  },
  {
    name: 'Nos Thérapies',
    children: [
      { name: 'Gestalt-Thérapie', href: '/therapies/gestalt' },
      { name: 'TCC', href: '/therapies/tcc' },
      { name: 'Nutrition Comportementale', href: '/therapies/nutrition' },
      { name: 'Sexologie', href: '/therapies/sexologie' },
      { name: 'Thérapies Familiales', href: '/therapies/familiales' },
    ],
  },
  {
    name: 'Travail Groupal',
    children: [
      { name: 'Méditation MBCT', href: '/groupal/mbct' },
      { name: 'MECL', href: '/groupal/mecl' },
    ],
  },
  { name: 'Tarifs', href: '/tarifs' },
  { name: 'Location Pro', href: '/location' },
];

export type NavItem = (typeof navigation)[number];

// Custom easing
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Dropdown component
function NavDropdown({ item }: { item: NavItem & { children: { name: string; href: string }[] } }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="link-hover text-sm font-medium opacity-70 hover:opacity-100 flex items-center gap-1.5 py-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.name}
        <motion.svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path d="M1 1L5 5L9 1" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: easeOutExpo }}
            className="absolute top-full left-0 pt-2 z-50"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-black/5 py-2 min-w-[220px] overflow-hidden">
              {item.children.map((child, index) => (
                <motion.div
                  key={child.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={child.href}
                    className="block px-5 py-3 text-sm hover:bg-[var(--empc-primary)]/5 hover:text-[var(--empc-primary)] transition-colors"
                  >
                    {child.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = true }: HeaderProps) {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isScrolled = scrollY > 100;
  const showSolidBg = !transparent || isScrolled;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: easeOutExpo }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          showSolidBg ? 'glass shadow-lg' : ''
        }`}
      >
        <div className="container-wide py-5 flex items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <Link href="/" className="flex items-center group">
              <Image
                src="/images/logo-empc.png"
                alt="EMPC - Espace Médical de Psychothérapies et de travail Corporel associé"
                width={180}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                {'children' in item && item.children ? (
                  <NavDropdown item={item as NavItem & { children: { name: string; href: string }[] }} />
                ) : (
                  <Link
                    href={item.href!}
                    className="link-hover text-sm font-medium opacity-70 hover:opacity-100 py-2"
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}

            {/* CTA Button */}
            <motion.a
              href="sms:0692460789"
              className="btn-magnetic btn-primary relative z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Prendre RDV</span>
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileMenuOpen}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <motion.span
                className="w-full h-0.5 bg-current rounded-full origin-left"
                animate={{
                  rotate: mobileMenuOpen ? 45 : 0,
                  y: mobileMenuOpen ? 0 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-full h-0.5 bg-current rounded-full"
                animate={{
                  opacity: mobileMenuOpen ? 0 : 1,
                  x: mobileMenuOpen ? 20 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-full h-0.5 bg-current rounded-full origin-left"
                animate={{
                  rotate: mobileMenuOpen ? -45 : 0,
                  y: mobileMenuOpen ? 0 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
