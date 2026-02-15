"use client";

import Image from "next/image";
import { useMemo } from "react";
import { LayoutGroup, motion } from "motion/react";
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
  stiffness: 150,
  damping: 22,
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

export function GalleryImageGrid({ groups }: GalleryImageGridProps) {
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

  return (
    <LayoutGroup>
      {/* Wraps grid so layoutId changes (e.g. location→date) animate instead of jumping. */}
      <div className="w-full ">
        <motion.div
          className="grid grid-cols-4 sm:grid-cols-5 gap-1 w-full"
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
              />
            ),
          )}
        </motion.div>
      </div>
    </LayoutGroup>
  );
}

/** Extracted so the grid map stays readable; layoutId enables smooth reorder animations. */
function GridImage({
  image,
  priorityIds,
}: {
  image: GalleryImage;
  priorityIds: Set<number>;
}) {
  const isLandscape = image.format === "landscape";
  return (
    <motion.div
      layout
      layoutId={`gallery-${image.id}`}
      transition={LAYOUT}
      className={cn(
        "overflow-hidden",
        isLandscape ? "col-span-2 aspect-[16/9]" : "col-span-1 aspect-[4/5]",
      )}
    >
      <div className="h-full w-full overflow-hidden hover:scale-[1.01] transition-transform duration-300">
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
    </motion.div>
  );
}
