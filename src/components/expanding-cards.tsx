"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  icon: React.ReactNode;
  linkHref: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

/**
 * Expanding Cards - Accordéon horizontal adapté EMPC
 * Palette: olive, mauve, beige, gold
 */
export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
  ExpandingCardsProps
>(({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    defaultActiveIndex
  );

  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridStyle = React.useMemo(() => {
    if (activeIndex === null) return {};

    if (isDesktop) {
      const columns = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateColumns: columns };
    } else {
      const rows = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateRows: rows };
    }
  }, [activeIndex, items.length, isDesktop]);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <ul
      className={cn(
        "w-full max-w-6xl gap-3",
        "grid",
        "h-[600px] md:h-[500px]",
        "transition-[grid-template-columns,grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        className
      )}
      style={{
        ...gridStyle,
        ...(isDesktop
          ? { gridTemplateRows: "1fr" }
          : { gridTemplateColumns: "1fr" }),
      }}
      ref={ref}
      {...props}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          className={cn(
            "group relative cursor-pointer overflow-hidden",
            "rounded-2xl border border-[var(--empc-gold)]/10",
            "bg-[var(--empc-cream)] shadow-lg",
            "md:min-w-[80px]",
            "min-h-0 min-w-0"
          )}
          onMouseEnter={() => handleInteraction(index)}
          onFocus={() => handleInteraction(index)}
          onClick={() => handleInteraction(index)}
          tabIndex={0}
          data-active={activeIndex === index}
        >
          <div className="absolute inset-0">
            <Image
              src={item.imgSrc}
              alt={item.title}
              fill
              className={cn(
                "object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "group-data-[active=true]:scale-100 group-data-[active=true]:grayscale-0",
                "scale-110 grayscale"
              )}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {/* Gradient EMPC */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--empc-primary-dark)]/90 via-[var(--empc-primary)]/30 to-transparent" />

          <article className="absolute inset-0 flex flex-col justify-end gap-2 p-5">
            {/* Titre vertical quand inactif */}
            <h3 className="hidden origin-left rotate-90 text-sm font-light uppercase tracking-widest text-white/70 opacity-100 transition-all duration-500 ease-out md:block group-data-[active=true]:opacity-0">
              {item.title}
            </h3>

            {/* Icône */}
            <div className="text-[var(--empc-gold-light)] opacity-0 transition-all duration-500 delay-75 ease-out group-data-[active=true]:opacity-100">
              {item.icon}
            </div>

            {/* Titre actif */}
            <h3 className="font-heading text-2xl font-normal text-white opacity-0 transition-all duration-500 delay-150 ease-out group-data-[active=true]:opacity-100">
              {item.title}
            </h3>

            {/* Description */}
            <p className="w-full max-w-xs text-sm text-white/80 leading-relaxed opacity-0 transition-all duration-500 delay-200 ease-out group-data-[active=true]:opacity-100">
              {item.description}
            </p>

            {/* Lien */}
            {item.linkHref && (
              <Link
                href={item.linkHref}
                className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-[var(--empc-gold-light)] opacity-0 transition-all duration-500 delay-300 ease-out group-data-[active=true]:opacity-100 hover:text-white"
              >
                En savoir plus
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            )}
          </article>
        </li>
      ))}
    </ul>
  );
});
ExpandingCards.displayName = "ExpandingCards";