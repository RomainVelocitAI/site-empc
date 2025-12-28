"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface GalleryHoverCarouselItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
}

export interface GalleryHoverCarouselProps {
  heading?: string;
  demoUrl?: string;
  items?: GalleryHoverCarouselItem[];
  className?: string;
}

export default function GalleryHoverCarousel({
  heading = "Nos espaces",
  items = [
    {
      id: "item-1",
      title: "Cabinet de consultation",
      summary: "Un espace chaleureux et confidentiel pour vos entretiens.",
      url: "#",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    },
    {
      id: "item-2",
      title: "Salle de méditation",
      summary: "Un lieu apaisant dédié aux séances de pleine conscience.",
      url: "#",
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80",
    },
    {
      id: "item-3",
      title: "La Réunion",
      summary: "Notre cabinet au cœur de l'île intense.",
      url: "#",
      image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600&q=80",
    },
  ],
  className,
}: GalleryHoverCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  return (
    <section className={cn("py-20 bg-[var(--empc-background)]", className)}>
      <div className="container mx-auto px-6">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div className="max-w-2xl">
            <h3 className="font-heading text-2xl sm:text-3xl font-normal text-[var(--empc-text)] leading-relaxed">
              {heading}
            </h3>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="h-10 w-10 rounded-full border-[var(--empc-gold)]/30 hover:bg-[var(--empc-primary)] hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="h-10 w-10 rounded-full border-[var(--empc-gold)]/30 hover:bg-[var(--empc-primary)] hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className="group block relative min-w-[300px] md:min-w-[350px] h-[350px] snap-start"
            >
              <Card className="overflow-hidden rounded-2xl h-full w-full border-[var(--empc-gold)]/10 bg-[var(--empc-cream)]">
                {/* Image */}
                <div className="relative h-full w-full transition-all duration-500 group-hover:h-1/2">
                  <Image
                    fill
                    src={item.image}
                    alt={item.title}
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 300px, 350px"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--empc-primary-dark)]/60 to-transparent" />
                </div>

                {/* Text Section */}
                <div className="absolute bottom-0 left-0 w-full p-5 transition-all duration-500 group-hover:h-1/2 group-hover:flex flex-col justify-center bg-[var(--empc-cream)]/95 backdrop-blur-sm opacity-0 group-hover:opacity-100">
                  <h3 className="font-heading text-xl font-normal text-[var(--empc-text)]">
                    {item.title}
                  </h3>
                  <p className="text-[var(--empc-text)]/60 text-sm mt-2 line-clamp-2">
                    {item.summary}
                  </p>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute bottom-4 right-4 border-[var(--empc-gold)]/30 hover:-rotate-45 transition-all duration-500 rounded-full"
                  >
                    <ArrowRight className="size-4 text-[var(--empc-primary)]" />
                  </Button>
                </div>

                {/* Title visible par défaut */}
                <div className="absolute bottom-0 left-0 w-full p-5 text-white group-hover:opacity-0 transition-opacity duration-300">
                  <h3 className="font-heading text-xl font-normal">{item.title}</h3>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
