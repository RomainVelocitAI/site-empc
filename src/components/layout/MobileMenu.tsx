'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { navigation, NavItem } from './Header';

// Custom easing
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Accordion item for sub-menus
function AccordionItem({ item, onClose }: { item: NavItem & { children: { name: string; href: string }[] }; onClose: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-black/5 last:border-b-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-4 text-lg font-heading"
        aria-expanded={isExpanded}
      >
        <span>{item.name}</span>
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path d="M4 6L8 10L12 6" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-4 space-y-2">
              {item.children.map((child, index) => (
                <motion.div
                  key={child.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={child.href}
                    onClick={onClose}
                    className="block py-2 text-base opacity-70 hover:opacity-100 hover:text-[var(--empc-primary)] transition-colors"
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

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-md bg-[var(--empc-background)] z-40 lg:hidden shadow-2xl"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-black/5">
                <Link href="/" onClick={onClose}>
                  <Image
                    src="/images/logo-empc.png"
                    alt="EMPC"
                    width={140}
                    height={47}
                    className="h-10 w-auto"
                  />
                </Link>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto px-6 py-4">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    {'children' in item && item.children ? (
                      <AccordionItem
                        item={item as NavItem & { children: { name: string; href: string }[] }}
                        onClose={onClose}
                      />
                    ) : (
                      <Link
                        href={item.href!}
                        onClick={onClose}
                        className="block py-4 text-lg font-heading border-b border-black/5 last:border-b-0"
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Footer CTA */}
              <div className="p-6 border-t border-black/5">
                <motion.a
                  href="sms:0692460789"
                  className="btn-magnetic btn-primary w-full text-center py-4 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    Prendre rendez-vous
                  </span>
                </motion.a>

                <p className="text-center text-sm opacity-50 mt-4">
                  SMS uniquement · 0692 46 07 89
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
