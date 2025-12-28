"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * BentoGrid - Layout asymétrique style bento adapté EMPC
 * Palette: olive, mauve, beige, gold
 */
const BentoGrid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid w-full auto-rows-[20rem] grid-cols-1 gap-6 md:grid-cols-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
BentoGrid.displayName = "BentoGrid";

/**
 * BentoGridItem - Card avec effet hover EMPC
 */
interface BentoGridItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
}

const BentoGridItem = React.forwardRef<HTMLDivElement, BentoGridItemProps>(
  ({ className, title, description, header, icon, href, ...props }, ref) => {
    const cardClasses = cn(
      "group row-span-1 flex flex-col justify-between space-y-4 overflow-hidden",
      "rounded-2xl border border-[var(--empc-gold)]/10 bg-[var(--empc-cream)] p-5",
      "shadow-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
      "hover:shadow-xl hover:shadow-[var(--empc-primary)]/10",
      "hover:-translate-y-2 hover:rotate-[-0.5deg]",
      href && "cursor-pointer",
      className
    );

    const content = (
      <>
        {/* Header content avec image */}
        <div className="flex h-full min-h-[8rem] flex-1 overflow-hidden rounded-xl bg-[var(--empc-sage)]/20">
          {header}
        </div>

        {/* Icon + Title + Description */}
        <div className="transition-transform duration-300 group-hover:translate-x-1">
          {icon && (
            <div className="mb-2 text-[var(--empc-secondary)]">
              {icon}
            </div>
          )}
          <div className="font-heading text-lg font-normal text-[var(--empc-text)]">
            {title}
          </div>
          <p className="mt-1 text-sm text-[var(--empc-text)]/60 leading-relaxed">
            {description}
          </p>
        </div>
      </>
    );

    if (href) {
      return (
        <a href={href} className={cardClasses}>
          {content}
        </a>
      );
    }

    return (
      <div ref={ref} className={cardClasses} {...props}>
        {content}
      </div>
    );
  }
);
BentoGridItem.displayName = "BentoGridItem";

export { BentoGrid, BentoGridItem };
