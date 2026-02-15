"use client";

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
  return (
    <div className="flex flex-wrap items-center gap-1 mb-8">
      {/* Pill-style buttons: selected gets solid bg, unselected stays subtle until hover. */}
      {OPTIONS.map(({ value, label }) => {
        const isSelected = orderBy === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onOrderByChange(value)}
            className={cn(
              "flex items-center gap-2 cursor-pointer ease-out px-4 py-2 rounded-full text-sm font-medium transition-all",
              isSelected
                ? "text-foreground bg-white dark:bg-white/15 shadow-sm"
                : "text-muted-foreground hover:text-foreground/90 hover:bg-white/50 dark:hover:bg-white/5",
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
