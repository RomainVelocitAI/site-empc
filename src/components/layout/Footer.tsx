'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const footerNavigation = {
  main: [
    { name: 'Accueil', href: '/' },
    { name: 'Dr Deblangey', href: '/equipe/dr-deblangey' },
    { name: 'Tarifs', href: '/tarifs' },
    { name: 'Location Pro', href: '/location' },
  ],
  therapies: [
    { name: 'Gestalt-Thérapie', href: '/therapies/gestalt' },
    { name: 'TCC', href: '/therapies/tcc' },
    { name: 'Nutrition', href: '/therapies/nutrition' },
    { name: 'Méditation MBCT', href: '/groupal/mbct' },
  ],
  legal: [
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'Confidentialité', href: '/confidentialite' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 border-t border-[var(--empc-gold)]/10 bg-gradient-warm">
      <div className="container-wide">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.div
              className="flex items-center gap-3 mb-6"
              whileHover={{ x: 5 }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center text-white font-heading text-xl"
                style={{
                  background: 'var(--empc-primary)',
                  borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%',
                }}
              >
                E
              </div>
              <div>
                <span className="font-heading text-xl block">EMPC</span>
                <span className="text-xs tracking-[0.15em] uppercase text-[var(--empc-gold)]">
                  La Réunion
                </span>
              </div>
            </motion.div>
            <p className="opacity-60 max-w-sm leading-relaxed mb-6">
              Espace Médical de Psychothérapies et de Travail Corporel Associé.
              Un lieu de soin holistique au cœur de La Réunion.
            </p>
            <div className="flex items-center gap-3 text-sm">
              <span className="opacity-60">Dr Joëlle Deblangey</span>
              <span className="opacity-30">·</span>
              <span className="opacity-60">Depuis 2012</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-lg mb-6">Navigation</h4>
            <ul className="space-y-3">
              {footerNavigation.main.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="link-hover opacity-60 hover:opacity-100 transition-opacity"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Thérapies */}
          <div>
            <h4 className="font-heading text-lg mb-6">Thérapies</h4>
            <ul className="space-y-3">
              {footerNavigation.therapies.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="link-hover opacity-60 hover:opacity-100 transition-opacity"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact & Bottom */}
        <div className="pt-8 border-t border-black/5">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* Contact */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <a
                href="sms:0692460789"
                className="inline-flex items-center gap-2 opacity-70 hover:opacity-100 hover:text-[var(--empc-primary)] transition-all"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                0692 46 07 89 (SMS)
              </a>
              <span className="opacity-30">·</span>
              <span className="opacity-60">La Réunion, France</span>
            </div>

            {/* Copyright & Legal */}
            <div className="flex flex-col md:flex-row md:justify-end items-start md:items-center gap-4">
              <div className="flex gap-6">
                {footerNavigation.legal.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm opacity-40 hover:opacity-70 transition-opacity"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <span className="hidden md:block opacity-30">·</span>
              <p className="text-sm opacity-40">
                © {currentYear} EMPC · Dr Joëlle Deblangey
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
