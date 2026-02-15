"use client";

import { motion } from "motion/react";
import { GalleryMasonryImage } from "./gallery-masonry-image";
import type { GalleryGroup } from "./gallery-types";

const LAYOUT = {
  type: "spring" as const,
  stiffness: 120,
  damping: 25,
  mass: 0.8,
};

interface GalleryMasonryGroupProps {
  group: GalleryGroup;
  priorityIds: Set<number>;
  onSelectImage: (image: import("./gallery-types").GalleryImage) => void;
}

/** Renders a labeled group of images in a masonry column layout. */
export function GalleryMasonryGroup({
  group,
  priorityIds,
  onSelectImage,
}: GalleryMasonryGroupProps) {
  return (
    <div className="mb-8">
      {group.label && (
        <motion.h2
          className="text-xs font-medium text-muted-foreground lowercase tracking-wider mb-3"
          layout
          transition={LAYOUT}
        >
          {group.label}
        </motion.h2>
      )}
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2">
        {group.images.map((image) => (
          <GalleryMasonryImage
            key={image.id}
            image={image}
            priority={priorityIds.has(image.id)}
            onSelect={() => onSelectImage(image)}
          />
        ))}
      </div>
    </div>
  );
}
