'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '../ui/ScrollToTop';

// Custom easing
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutExpo,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: easeOutExpo,
    },
  },
};

interface LayoutProps {
  children: React.ReactNode;
  transparentHeader?: boolean;
}

export default function Layout({ children, transparentHeader = true }: LayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      <Header transparent={transparentHeader} />

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="flex-1"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />

      <ScrollToTop />
    </div>
  );
}
