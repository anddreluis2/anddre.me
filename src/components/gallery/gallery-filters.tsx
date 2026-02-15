"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type OrderBy = "default" | "location" | "date";

export interface GalleryFiltersProps {
  orderBy: OrderBy;
  onOrderByChange: (value: OrderBy) => void;
}

/** Single source of truth for filter options; add here to extend the gallery ordering. */
const OPTIONS: { value: OrderBy; label: string }[] = [
  { value: "default", label: "default" },
  { value: "location", label: "by location" },
  { value: "date", label: "by date" },
];

export function GalleryFilters({
  orderBy,
  onOrderByChange,
}: GalleryFiltersProps) {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const index = OPTIONS.findIndex((opt) => opt.value === orderBy);
    const activeIdx = index !== -1 ? index : 0;
    const activeElement = itemRefs.current[activeIdx];
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [orderBy]);

  return (
    <div className="relative flex flex-wrap items-center gap-1 mb-8 px-2 py-1 w-fit">
      <div
        className="absolute top-1 bottom-1 rounded-full transition-all duration-500 ease-in-out bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 dark:from-white/10 dark:via-white/20 dark:to-white/10"
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
        }}
      />
      {OPTIONS.map(({ value, label }, index) => {
        const isSelected = orderBy === value;
        return (
          <button
            key={value}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            type="button"
            onClick={() => onOrderByChange(value)}
            className={cn(
              "relative z-10 flex items-center gap-2 cursor-pointer ease-out px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              isSelected
                ? "text-neutral-900 dark:text-foreground"
                : "text-neutral-500 dark:text-muted-foreground hover:text-neutral-700 dark:hover:text-foreground/90",
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
