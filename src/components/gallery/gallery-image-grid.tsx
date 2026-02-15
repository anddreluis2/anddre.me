"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup } from "motion/react";
import { GalleryLightbox } from "./gallery-lightbox";
import { GalleryMasonryGroup } from "./gallery-masonry-group";
import type { GalleryGroup, GalleryImage } from "./gallery-types";

export type { GalleryImage } from "./gallery-types";

interface GalleryImageGridProps {
  groups: GalleryGroup[];
}

/** Orchestrates gallery layout and lightbox. */
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

  const openLightbox = useCallback((image: GalleryImage) => {
    const index = images.findIndex((img) => img.id === image.id);
    setSelectedIndex(index >= 0 ? index : 0);
  }, [images]);

  return (
    <>
      <LayoutGroup>
        <div className="w-full">
          {groups.map((group, index) => (
            <GalleryMasonryGroup
              key={group.label ?? `group-${index}`}
              group={group}
              priorityIds={priorityIds}
              onSelectImage={openLightbox}
            />
          ))}
        </div>
      </LayoutGroup>

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
