"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup } from "motion/react";
import { GalleryLightbox } from "./gallery-lightbox";
import { GalleryMasonryGroup } from "./gallery-masonry-group";
import type { GalleryGroup, GalleryImage } from "./gallery-types";

export type { GalleryImage } from "./gallery-types";

interface GalleryImageGridProps {
  groups: GalleryGroup[];
}

/** Orchestrates gallery layout, lightbox state, and keyboard handling. */
export function GalleryImageGrid({ groups }: GalleryImageGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(
    null,
  );
  const priorityIds = useMemo(
    () =>
      new Set(
        groups.flatMap((g) => g.images).slice(0, 8).map((img) => img.id),
      ),
    [groups],
  );

  const closeLightbox = useCallback(() => setSelectedImage(null), []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [closeLightbox]);

  return (
    <>
      <LayoutGroup>
        <div className="w-full">
          {groups.map((group, index) => (
            <GalleryMasonryGroup
              key={group.label ?? `group-${index}`}
              group={group}
              priorityIds={priorityIds}
              onSelectImage={setSelectedImage}
            />
          ))}
        </div>
      </LayoutGroup>

      <AnimatePresence>
        {selectedImage && (
          <GalleryLightbox image={selectedImage} onClose={closeLightbox} />
        )}
      </AnimatePresence>
    </>
  );
}
