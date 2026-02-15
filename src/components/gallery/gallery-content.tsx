"use client";

import { useMemo, useState } from "react";
import { GalleryFilters, type OrderBy } from "./gallery-filters";
import { GalleryImageGrid } from "./gallery-image-grid";
import type { GalleryImage } from "./gallery-types";

interface GalleryContentProps {
  images: GalleryImage[];
}

type Group = { label: string | null; images: GalleryImage[] };

/** Groups by getKey; sortKey optional for custom order (e.g. date needs YYYY-MM, not MM-YYYY). */
function groupBy(
  images: GalleryImage[],
  getKey: (img: GalleryImage) => string | undefined,
  sortKey?: (key: string) => string,
): Group[] {
  const groups = images.reduce((acc, img) => {
    const key = getKey(img);
    if (!key) return acc;
    acc.set(key, [...(acc.get(key) ?? []), img]);
    return acc;
  }, new Map<string, GalleryImage[]>());
  const toSortKey = sortKey ?? ((k) => k);
  return Array.from(groups.entries())
    .map(([key, imgs]) => ({
      label: key,
      images: imgs,
      _sortKey: toSortKey(key),
    }))
    .sort((a, b) => a._sortKey.localeCompare(b._sortKey))
    .map(({ label, images }) => ({ label, images }));
}

/** Uses Intl so month names follow user locale (en-US → "Mar", pt-BR → "mar"). */
function formatDate(dateStr: string): string {
  const [month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function GalleryContent({ images }: GalleryContentProps) {
  const [orderBy, setOrderBy] = useState<OrderBy>("default");
  /** Memo: grouping is O(n); skip when images/orderBy unchanged. */
  const groups = useMemo(() => {
    if (orderBy === "location") return groupBy(images, (img) => img.location);
    if (orderBy === "date")
      return groupBy(
        images,
        (img) => img.date,
        (d) => {
          const [m, y] = d.split("-").map(Number);
          return `${y}-${String(m).padStart(2, "0")}`; /* MM-YYYY → YYYY-MM for chronological sort */
        },
      ).map((g) => ({ ...g, label: formatDate(g.label ?? "") }));
    return [{ label: null, images }]; /* Default: no labels, single group */
  }, [images, orderBy]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <GalleryFilters orderBy={orderBy} onOrderByChange={setOrderBy} />
      <GalleryImageGrid groups={groups} />
    </div>
  );
}
