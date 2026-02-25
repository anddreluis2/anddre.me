"use client";

import Image from "next/image";
import { useState } from "react";
import { useInView } from "./use-in-view";
import type { GalleryImage } from "./gallery-types";

interface GalleryMasonryImageProps {
  image: GalleryImage;
  priority: boolean;
  onSelect: () => void;
  index: number;
}

export function GalleryMasonryImage({
  image,
  priority,
  onSelect,
  index,
}: GalleryMasonryImageProps) {
  const { ref, inView } = useInView("300px");
  const [isLoaded, setIsLoaded] = useState(false);
  const isLandscape = image.format === "landscape";
  const aspectRatio = isLandscape ? "3/2" : "4/5";
  const shouldRender = priority || inView;
  const staggerMs = Math.min(index * 40, 600);

  return (
    <div
      ref={ref}
      className="break-inside-avoid mb-3 cursor-pointer group animate-gallery-enter"
      style={{ animationDelay: `${staggerMs}ms` }}
      onClick={shouldRender ? onSelect : undefined}
    >
      <div className="relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
        {shouldRender ? (
          <>
            {!isLoaded && (
              <div
                className="absolute inset-0 gallery-skeleton rounded-xl"
                style={{ aspectRatio }}
              />
            )}
            <div
              className={`overflow-hidden rounded-xl transition-all duration-500 ease-out ${
                isLoaded
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-[0.98]"
              }`}
            >
              <Image
                src={image.path}
                alt={image.location}
                width={isLandscape ? 1200 : 800}
                height={isLandscape ? 800 : 1000}
                className="w-full h-auto transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                priority={priority}
                onLoad={() => setIsLoaded(true)}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3.5 rounded-xl pointer-events-none">
              <div className="translate-y-1.5 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <span className="text-white text-[13px] font-medium tracking-wide drop-shadow-md">
                  {image.location}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div
            className="gallery-skeleton rounded-xl"
            style={{ aspectRatio }}
          />
        )}
      </div>
    </div>
  );
}
