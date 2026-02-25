"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";
import { GalleryLightbox } from "./gallery-lightbox";
import { GalleryMasonryGroup } from "./gallery-masonry-group";
import type { GalleryGroup, GalleryImage } from "./gallery-types";

export type { GalleryImage } from "./gallery-types";

interface GalleryImageGridProps {
  groups: GalleryGroup[];
}

export function GalleryImageGrid({ groups }: GalleryImageGridProps) {
  const images = useMemo(
    () => groups.flatMap((g) => g.images),
    [groups],
  );
  const priorityIds = useMemo(
    () => new Set(images.slice(0, 8).map((img) => img.id)),
    [images],
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);

  const openLightbox = useCallback(
    (image: GalleryImage) => {
      const index = images.findIndex((img) => img.id === image.id);
      setSelectedIndex(index >= 0 ? index : 0);
    },
    [images],
  );

  let runningIndex = 0;

  return (
    <>
      <div className="w-full">
        {groups.map((group, i) => {
          const offset = runningIndex;
          runningIndex += group.images.length;
          return (
            <GalleryMasonryGroup
              key={group.label ?? `group-${i}`}
              group={group}
              priorityIds={priorityIds}
              onSelectImage={openLightbox}
              indexOffset={offset}
            />
          );
        })}
        {images.length === 0 && (
          <div className="flex items-center justify-center py-24 text-muted-foreground text-sm">
            no photos found for this filter.
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <GalleryLightbox
            images={images}
            currentIndex={selectedIndex}
            onClose={closeLightbox}
            onNavigate={setSelectedIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}
