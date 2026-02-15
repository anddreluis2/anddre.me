"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { cn } from "@/lib/utils";

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

/** Discriminated union so we can safely narrow in the map without type assertions. */
type GridItem =
  | { type: "label"; label: string }
  | { type: "image"; image: GalleryImage };

/** Flattens groups into a single list of labels + images for a single-pass render. */
function flattenGroups(groups: Group[]): GridItem[] {
  return groups.flatMap((group) => [
    ...(group.label ? [{ type: "label" as const, label: group.label }] : []),
    ...group.images.map((image) => ({ type: "image" as const, image })),
  ]);
}

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
  const items = useMemo(() => flattenGroups(groups), [groups]);
  /** First 8 images get priority loading to improve LCP; Set for O(1) lookup per image. */
  const priorityIds = useMemo(
    () =>
      new Set(
        items
          .filter(
            (i): i is { type: "image"; image: GalleryImage } =>
              i.type === "image",
          )
          .slice(0, 8)
          .map((i) => i.image.id),
      ),
    [items],
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
          <motion.div
            className="grid grid-cols-4 sm:grid-cols-5 gap-2 w-full"
            layout
            transition={LAYOUT}
          >
            {items.map((item) =>
              item.type === "label" ? (
                <motion.div
                  key={`label-${item.label}`}
                  className="col-span-full mt-6 first:mt-0"
                  layout
                  transition={LAYOUT}
                >
                  <h2 className="text-xs font-medium text-muted-foreground lowercase tracking-wider">
                    {item.label}
                  </h2>
                </motion.div>
              ) : (
                <GridImage
                  key={item.image.id}
                  image={item.image}
                  priorityIds={priorityIds}
                  onSelect={() => setSelectedImage(item.image)}
                />
              ),
            )}
          </motion.div>
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

/** Extracted so the grid map stays readable; layoutId enables smooth reorder animations. */
function GridImage({
  image,
  priorityIds,
  onSelect,
}: {
  image: GalleryImage;
  priorityIds: Set<number>;
  onSelect: () => void;
}) {
  const isLandscape = image.format === "landscape";
  return (
    <motion.div
      layout
      layoutId={`gallery-${image.id}`}
      transition={LAYOUT}
      className={cn(
        "overflow-hidden rounded-lg cursor-pointer group",
        isLandscape ? "col-span-2 aspect-[16/9]" : "col-span-1 aspect-[4/5]",
      )}
      onClick={onSelect}
    >
      <div className="relative h-full w-full overflow-hidden">
        <div className="h-full w-full overflow-hidden group-hover:scale-[1.03] transition-transform duration-300">
          <Image
            src={image.path}
            alt={image.location}
            width={isLandscape ? 1600 : 400}
            height={isLandscape ? 900 : 500}
            className="w-full h-full object-cover object-center"
            sizes={
              isLandscape
                ? "(max-width: 768px) 100vw, 50vw"
                : "(max-width: 768px) 50vw, 25vw"
            }
            priority={priorityIds.has(image.id)}
          />
        </div>
        {/* Hover overlay with location */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
          <span className="text-white text-sm font-medium drop-shadow-sm">
            {image.location}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
