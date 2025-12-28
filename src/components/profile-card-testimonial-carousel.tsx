"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface TeamMember {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  specialties?: string[];
  phone?: string;
  email?: string;
  location?: string;
  profileUrl?: string;
}

export interface ProfileCarouselProps {
  className?: string;
  members: TeamMember[];
  title?: string;
  subtitle?: string;
}

export function ProfileCarousel({ className, members, title, subtitle }: ProfileCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () =>
    setCurrentIndex((index) => (index + 1) % members.length);
  const handlePrevious = () =>
    setCurrentIndex(
      (index) => (index - 1 + members.length) % members.length
    );

  const currentMember = members[currentIndex];

  return (
    <section className={cn("w-full py-16 md:py-24", className)}>
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        {(title || subtitle) && (
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {title && (
              <h2 className="font-heading text-3xl md:text-4xl text-[var(--empc-text)] mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-[var(--empc-text)]/60 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Desktop layout */}
        <div className='hidden md:flex relative items-center justify-center'>
          {/* Avatar */}
          <div className='w-[420px] h-[520px] rounded-[2rem] overflow-hidden bg-[var(--empc-sage)]/10 flex-shrink-0 shadow-xl'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentMember.imageUrl}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className='w-full h-full relative'
              >
                <Image
                  src={currentMember.imageUrl}
                  alt={currentMember.name}
                  fill
                  className='object-cover'
                  draggable={false}
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--empc-primary-dark)]/30 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Card */}
          <div className='bg-white rounded-[2rem] shadow-2xl p-10 ml-[-60px] z-10 max-w-lg flex-1 border border-[var(--empc-sage)]/10'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentMember.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Header */}
                <div className='mb-6'>
                  <h3 className='font-heading text-2xl text-[var(--empc-text)] mb-2'>
                    {currentMember.name}
                  </h3>
                  <p className='text-sm font-medium text-[var(--empc-gold)]'>
                    {currentMember.title}
                  </p>
                </div>

                {/* Specialties */}
                {currentMember.specialties && currentMember.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentMember.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-3 py-1 text-xs rounded-full bg-[var(--empc-sage)]/15 text-[var(--empc-primary)] border border-[var(--empc-sage)]/20"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                )}

                {/* Description */}
                <p className='text-[var(--empc-text)]/80 text-sm leading-relaxed mb-8'>
                  {currentMember.description}
                </p>

                {/* Contact Info */}
                <div className='flex flex-wrap gap-4'>
                  {currentMember.phone && (
                    <a
                      href={`sms:${currentMember.phone}`}
                      className='flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--empc-primary)] text-white text-sm font-medium hover:bg-[var(--empc-primary-dark)] transition-colors'
                    >
                      <Phone className='w-4 h-4' />
                      Contacter
                    </a>
                  )}
                  {currentMember.profileUrl && (
                    <Link
                      href={currentMember.profileUrl}
                      className='flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--empc-sage)]/30 text-[var(--empc-primary)] text-sm font-medium hover:bg-[var(--empc-sage)]/10 transition-colors'
                    >
                      Voir le profil
                    </Link>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile layout */}
        <div className='md:hidden max-w-sm mx-auto'>
          {/* Avatar */}
          <div className='w-full aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 shadow-xl bg-[var(--empc-sage)]/10'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentMember.imageUrl}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className='w-full h-full relative'
              >
                <Image
                  src={currentMember.imageUrl}
                  alt={currentMember.name}
                  fill
                  className='object-cover'
                  draggable={false}
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Card content */}
          <div className='text-center'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentMember.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <h3 className='font-heading text-xl text-[var(--empc-text)] mb-1'>
                  {currentMember.name}
                </h3>

                <p className='text-sm font-medium text-[var(--empc-gold)] mb-4'>
                  {currentMember.title}
                </p>

                {/* Specialties */}
                {currentMember.specialties && currentMember.specialties.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {currentMember.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-3 py-1 text-xs rounded-full bg-[var(--empc-sage)]/15 text-[var(--empc-primary)]"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                )}

                <p className='text-[var(--empc-text)]/80 text-sm leading-relaxed mb-6'>
                  {currentMember.description}
                </p>

                {/* Contact */}
                <div className='flex justify-center gap-3'>
                  {currentMember.phone && (
                    <a
                      href={`sms:${currentMember.phone}`}
                      className='flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--empc-primary)] text-white text-sm font-medium'
                    >
                      <Phone className='w-4 h-4' />
                      Contacter
                    </a>
                  )}
                  {currentMember.profileUrl && (
                    <Link
                      href={currentMember.profileUrl}
                      className='flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--empc-sage)]/30 text-[var(--empc-primary)] text-sm font-medium'
                    >
                      Profil
                    </Link>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className='flex justify-center items-center gap-6 mt-10'>
          {/* Previous */}
          <motion.button
            onClick={handlePrevious}
            aria-label='Membre précédent'
            className='w-12 h-12 rounded-full bg-white border border-[var(--empc-sage)]/30 shadow-lg flex items-center justify-center hover:bg-[var(--empc-sage)]/10 transition-colors cursor-pointer'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className='w-6 h-6 text-[var(--empc-primary)]' />
          </motion.button>

          {/* Dots */}
          <div className='flex gap-2'>
            {members.map((_, memberIndex) => (
              <button
                key={memberIndex}
                onClick={() => setCurrentIndex(memberIndex)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300 cursor-pointer",
                  memberIndex === currentIndex
                    ? "bg-[var(--empc-primary)] w-8"
                    : "bg-[var(--empc-sage)]/40 hover:bg-[var(--empc-sage)]"
                )}
                aria-label={`Aller au membre ${memberIndex + 1}`}
              />
            ))}
          </div>

          {/* Next */}
          <motion.button
            onClick={handleNext}
            aria-label='Membre suivant'
            className='w-12 h-12 rounded-full bg-white border border-[var(--empc-sage)]/30 shadow-lg flex items-center justify-center hover:bg-[var(--empc-sage)]/10 transition-colors cursor-pointer'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className='w-6 h-6 text-[var(--empc-primary)]' />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
