"use client";

import { GalleryMasonryImage } from "./gallery-masonry-image";
import type { GalleryGroup, GalleryImage } from "./gallery-types";

interface GalleryMasonryGroupProps {
  group: GalleryGroup;
  priorityIds: Set<number>;
  onSelectImage: (image: GalleryImage) => void;
  indexOffset: number;
}

export function GalleryMasonryGroup({
  group,
  priorityIds,
  onSelectImage,
  indexOffset,
}: GalleryMasonryGroupProps) {
  return (
    <section className="mb-10">
      {group.label && (
        <div className="mb-4 pb-2 border-b border-neutral-200/60 dark:border-white/10">
          <h2 className="text-sm font-medium text-muted-foreground lowercase tracking-wider">
            {group.label}
          </h2>
        </div>
      )}
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3">
        {group.images.map((image, i) => (
          <GalleryMasonryImage
            key={image.id}
            image={image}
            priority={priorityIds.has(image.id)}
            onSelect={() => onSelectImage(image)}
            index={indexOffset + i}
          />
        ))}
      </div>
    </section>
  );
}
