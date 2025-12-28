"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import React from "react";
import Image from "next/image";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  subtitle?: string;
  badge?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export const FAQSection = ({
  faqs,
  title = "Questions fréquentes",
  subtitle = "Retrouvez les réponses aux questions les plus courantes.",
  badge = "FAQ",
  imageSrc = "https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop",
  imageAlt = "Illustration FAQ",
  className,
}: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("max-w-4xl mx-auto flex flex-col md:flex-row items-start justify-center gap-8 px-4 md:px-0", className)}>
      <div className="max-w-sm w-full rounded-xl overflow-hidden h-auto relative aspect-square">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 384px"
        />
      </div>
      <div className="flex-1">
        <p className="text-[var(--empc-secondary)] text-sm font-medium">{badge}</p>
        <h2 className="font-heading text-3xl font-normal text-[var(--empc-text)]">{title}</h2>
        <p className="text-sm text-[var(--empc-text)]/60 mt-2 pb-4">
          {subtitle}
        </p>
        {faqs.map((faq, index) => (
          <div
            className="border-b border-[var(--empc-gold)]/20 py-4 cursor-pointer"
            key={index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium text-[var(--empc-text)]">
                {faq.question}
              </h3>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${openIndex === index ? "rotate-180" : ""} transition-all duration-500 ease-in-out flex-shrink-0 ml-4`}
              >
                <path
                  d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                  stroke="var(--empc-primary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p
              className={cn(
                "text-sm text-[var(--empc-text)]/70 transition-all duration-500 ease-in-out max-w-md",
                openIndex === index
                  ? "opacity-100 max-h-[300px] translate-y-0 pt-4"
                  : "opacity-0 max-h-0 -translate-y-2 overflow-hidden"
              )}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;