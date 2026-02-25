"use client";

import { useMemo, useState } from "react";
import { GalleryFilters, type OrderBy } from "./gallery-filters";
import { GalleryImageGrid } from "./gallery-image-grid";
import type { GalleryImage } from "./gallery-types";

interface GalleryContentProps {
  images: GalleryImage[];
}

type Group = { label: string | null; images: GalleryImage[] };

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

function formatDate(dateStr: string): string {
  const [month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function GalleryContent({ images }: GalleryContentProps) {
  const [orderBy, setOrderBy] = useState<OrderBy>("default");

  const groups = useMemo(() => {
    if (orderBy === "analog") {
      const analog = images.filter((img) => img.analog);
      return [{ label: null, images: analog }];
    }
    if (orderBy === "location") return groupBy(images, (img) => img.location);
    if (orderBy === "date")
      return groupBy(
        images,
        (img) => img.date,
        (d) => {
          const [m, y] = d.split("-").map(Number);
          return `${y}-${String(m).padStart(2, "0")}`;
        },
      ).map((g) => ({ ...g, label: formatDate(g.label ?? "") }));
    return [{ label: null, images }];
  }, [images, orderBy]);

  const totalImages = useMemo(
    () => groups.reduce((sum, g) => sum + g.images.length, 0),
    [groups],
  );

  return (
    <div className="flex flex-col w-full min-h-screen">
      <GalleryFilters
        orderBy={orderBy}
        onOrderByChange={setOrderBy}
        imageCount={totalImages}
      />
      <GalleryImageGrid key={orderBy} groups={groups} />
    </div>
  );
}
