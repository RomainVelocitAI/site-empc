"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

// TypeScript interface for a single testimonial object
export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  imageSrc: string;
}

// TypeScript interface for the component's props
export interface TestimonialSectionProps {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
  className?: string;
}

/**
 * Section de témoignages adaptée au thème EMPC
 * Palette: olive, mauve, beige, gold
 */
export const TestimonialSection = ({
  title,
  subtitle,
  testimonials,
  className,
}: TestimonialSectionProps) => {
  // Animation variants for the container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Animation variants for each testimonial card
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className={`w-full bg-[var(--empc-background)] py-16 sm:py-24 ${className || ""}`}>
      <div className="container mx-auto max-w-6xl px-4 text-center">
        {/* Section Header */}
        <h2 className="font-heading text-3xl font-normal tracking-tight text-[var(--empc-text)] sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--empc-text)]/60">
          {subtitle}
        </p>

        {/* Testimonials Grid */}
        <motion.div
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="relative overflow-hidden rounded-2xl bg-[var(--empc-cream)] shadow-lg group card-hover"
              variants={itemVariants}
            >
              <div className="relative h-80">
                <Image
                  src={testimonial.imageSrc}
                  alt={testimonial.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Gradient overlay avec couleur EMPC */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--empc-primary-dark)]/90 via-[var(--empc-primary)]/40 to-transparent" />
              </div>

              {/* Content within the card */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-left text-white">
                <Quote
                  className="mb-4 h-8 w-8 text-[var(--empc-gold-light)]/60"
                  aria-hidden="true"
                />
                <blockquote className="text-base font-medium leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>
                <figcaption className="mt-4">
                  <p className="font-semibold">
                    &mdash; {testimonial.name}
                    <span className="ml-1 font-normal text-white/70">
                      {testimonial.role}
                    </span>
                  </p>
                </figcaption>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
