'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: easeOutExpo }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

// Navigation suggestions
const suggestions = [
  { name: 'Accueil', href: '/', desc: 'Retourner à la page principale' },
  { name: 'Nos Thérapies', href: '/therapies/gestalt', desc: 'Découvrir nos approches' },
  { name: 'Tarifs', href: '/tarifs', desc: 'Consulter nos tarifs' },
  { name: 'Dr Deblangey', href: '/equipe/dr-deblangey', desc: 'En savoir plus' },
];

export default function NotFound() {
  return (
    <main className="bg-[var(--empc-background)] min-h-screen flex flex-col">
      <Header transparent={false} />

      {/* Main content */}
      <section className="flex-1 relative flex items-center justify-center py-20 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large floating shapes */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, var(--empc-primary) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, var(--empc-gold) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.15, 1],
              x: [0, -40, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating leaves */}
          <motion.svg
            className="absolute top-20 right-20 w-20 h-20 text-[var(--empc-sage)] opacity-20"
            viewBox="0 0 100 100"
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M50 10 Q80 40 50 90 Q20 40 50 10" fill="currentColor" />
          </motion.svg>
          <motion.svg
            className="absolute bottom-32 left-16 w-16 h-16 text-[var(--empc-primary)] opacity-15"
            viewBox="0 0 100 100"
            animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <path d="M50 10 Q80 40 50 90 Q20 40 50 10" fill="currentColor" />
          </motion.svg>
        </div>

        <div className="container-narrow relative z-10">
          <motion.div
            className="text-center"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* 404 Number - Large decorative */}
            <motion.div
              className="relative mb-8"
              variants={fadeInUp}
              custom={0}
            >
              <span className="font-heading text-[12rem] md:text-[16rem] leading-none text-[var(--empc-sage)]/20 select-none">
                404
              </span>
              {/* Overlay text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-32 h-32 rounded-full bg-[var(--empc-cream)] shadow-xl flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <svg
                    className="w-16 h-16 text-[var(--empc-primary)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4"
              variants={fadeInUp}
              custom={0.1}
            >
              Page{' '}
              <span className="text-[var(--empc-primary)] italic">introuvable</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg opacity-60 max-w-md mx-auto mb-12"
              variants={fadeInUp}
              custom={0.2}
            >
              Cette page semble avoir pris un chemin de traverse.
              Laissez-nous vous guider vers votre destination.
            </motion.p>

            {/* Primary CTA */}
            <motion.div
              variants={fadeInUp}
              custom={0.3}
              className="mb-16"
            >
              <Link href="/">
                <motion.button
                  className="btn-magnetic btn-primary text-lg px-10 py-5"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    Retour à l&apos;accueil
                  </span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Suggestions */}
            <motion.div
              variants={fadeInUp}
              custom={0.4}
            >
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--empc-gold)] mb-6 font-medium">
                Ou explorez
              </p>
              <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                {suggestions.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5, ease: easeOutExpo }}
                  >
                    <Link href={item.href}>
                      <motion.div
                        className="group bg-white rounded-2xl p-5 shadow-lg shadow-black/[0.03] border border-[var(--empc-sage)]/10 text-left transition-all duration-300"
                        whileHover={{ y: -5, scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-heading text-lg group-hover:text-[var(--empc-primary)] transition-colors">
                            {item.name}
                          </span>
                          <motion.svg
                            className="w-5 h-5 text-[var(--empc-gold)] opacity-0 group-hover:opacity-100 transition-opacity"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            whileHover={{ x: 3 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </motion.svg>
                        </div>
                        <p className="text-sm opacity-50">{item.desc}</p>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact hint */}
      <section className="py-10 border-t border-[var(--empc-sage)]/10">
        <div className="container-narrow text-center">
          <motion.p
            className="text-sm opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1 }}
          >
            Besoin d&apos;aide ?{' '}
            <a
              href="sms:0692460789"
              className="text-[var(--empc-primary)] hover:underline"
            >
              Contactez-nous par SMS
            </a>
          </motion.p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
