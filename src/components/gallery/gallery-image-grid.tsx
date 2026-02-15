"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";

export interface GalleryImage {
  id: number;
  location: string;
  path: string;
  format: string;
  date?: string;
}

interface Group {
  label: string | null;
  images: GalleryImage[];
}

interface GalleryImageGridProps {
  groups: Group[];
}

/** Shared spring config so layout animations stay consistent when switching orderBy. */
const LAYOUT = {
  type: "spring" as const,
  stiffness: 120,
  damping: 25,
  mass: 0.8,
};

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  const [month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function GalleryImageGrid({ groups }: GalleryImageGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  /** First 8 images get priority loading to improve LCP; Set for O(1) lookup per image. */
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
          {groups.map((group, groupIndex) => (
            <div key={group.label ?? `group-${groupIndex}`} className="mb-8">
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
                  <MasonryImage
                    key={image.id}
                    image={image}
                    priorityIds={priorityIds}
                    onSelect={() => setSelectedImage(image)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </LayoutGroup>

      <AnimatePresence>
        {selectedImage && (
          <Lightbox image={selectedImage} onClose={closeLightbox} />
        )}
      </AnimatePresence>
    </>
  );
}

/** Full-screen overlay; click outside or Escape to close. */
function Lightbox({
  image,
  onClose,
}: {
  image: GalleryImage;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.path}
          alt={image.location}
          width={1920}
          height={1080}
          className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg"
          sizes="90vw"
        />
        <div className="mt-4 text-center text-white/90 text-sm">
          <span className="font-medium">{image.location}</span>
          {image.date && (
            <span className="text-white/60 ml-2">{formatDate(image.date)}</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Masonry item: natural height, full photo visible, no cropping. */
function MasonryImage({
  image,
  priorityIds,
  onSelect,
}: {
  image: GalleryImage;
  priorityIds: Set<number>;
  onSelect: () => void;
}) {
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
            priority={priorityIds.has(image.id)}
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
