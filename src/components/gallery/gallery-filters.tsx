"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type OrderBy = "default" | "location" | "date" | "analog";

export interface GalleryFiltersProps {
  orderBy: OrderBy;
  onOrderByChange: (value: OrderBy) => void;
  imageCount: number;
}

const OPTIONS: { value: OrderBy; label: string }[] = [
  { value: "default", label: "default" },
  { value: "location", label: "by location" },
  { value: "date", label: "by date" },
  { value: "analog", label: "analog" },
];

export function GalleryFilters({
  orderBy,
  onOrderByChange,
  imageCount,
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
    <div className="flex items-center justify-between mb-8 gap-4">
      <div className="relative flex flex-wrap items-center gap-0.5 px-1.5 py-1 w-fit rounded-full border border-neutral-200/60 dark:border-white/10 bg-neutral-100/50 dark:bg-white/5">
        <div
          className="absolute top-1 bottom-1 rounded-full transition-all duration-500 ease-in-out bg-white dark:bg-white/15 shadow-sm"
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
                "relative z-10 flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300",
                isSelected
                  ? "text-neutral-900 dark:text-foreground"
                  : "text-neutral-400 dark:text-muted-foreground hover:text-neutral-600 dark:hover:text-foreground/90",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
      <span className="text-xs text-muted-foreground tabular-nums shrink-0">
        {imageCount} {imageCount === 1 ? "photo" : "photos"}
      </span>
    </div>
  );
}
