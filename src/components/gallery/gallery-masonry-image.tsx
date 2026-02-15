"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { GalleryImage } from "./gallery-types";

const LAYOUT = {
  type: "spring" as const,
  stiffness: 120,
  damping: 25,
  mass: 0.8,
};

interface GalleryMasonryImageProps {
  image: GalleryImage;
  priority: boolean;
  onSelect: () => void;
}

/** Masonry item: natural height, full photo visible, no cropping. */
export function GalleryMasonryImage({
  image,
  priority,
  onSelect,
}: GalleryMasonryImageProps) {
  const isLandscape = image.format === "landscape";
  const width = isLandscape ? 1200 : 800;
  const height = isLandscape ? 800 : 1000; /* 3:2 and 4:5 */

  return (
    <motion.div
      layout
      layoutId={`gallery-${image.id}`}
      transition={LAYOUT}
      className="break-inside-avoid mb-2 cursor-pointer group"
      onClick={onSelect}
    >
      <div className="relative overflow-hidden rounded-lg">
        <div className="overflow-hidden rounded-lg group-hover:scale-[1.02] transition-transform duration-300">
          <Image
            src={image.path}
            alt={image.location}
            width={width}
            height={height}
            className="w-full h-auto"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 rounded-lg pointer-events-none">
          <span className="text-white text-sm font-medium drop-shadow-sm">
            {image.location}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
