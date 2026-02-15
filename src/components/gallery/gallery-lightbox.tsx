"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { formatDate } from "./gallery-utils";
import type { GalleryImage } from "./gallery-types";

const TRANSITION = {
  type: "tween" as const,
  duration: 0.4,
  ease: [0.25, 0.46, 0.45, 0.94] as const, /* ease-out-quad – suave, sem pico */
};

interface GalleryLightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/** Modal lightbox: click outside to close, body scroll locked. */
export function GalleryLightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const image = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const goPrev = useCallback(() => {
    if (hasPrev) {
      setDirection(-1);
      onNavigate(currentIndex - 1);
    }
  }, [hasPrev, currentIndex, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) {
      setDirection(1);
      onNavigate(currentIndex + 1);
    }
  }, [hasNext, currentIndex, onNavigate]);

  useEffect(() => {
    setIsLoading(true);
  }, [image.id]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goPrev, goNext]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && hasNext) {
        e.preventDefault();
        goNext();
      } else if (e.deltaY < 0 && hasPrev) {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [hasPrev, hasNext, goPrev, goNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={TRANSITION}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/90"
      onClick={onClose}
    >
      {/* Instagram-style progress bar – click segment to jump */}
      <div
        className="absolute top-0 left-0 right-0 flex gap-0.5 px-4 pt-4 z-30"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onNavigate(i)}
            className="flex-1 h-1 min-w-[2px] rounded-full overflow-hidden bg-white/25 hover:bg-white/35 transition-colors"
            aria-label={`Go to image ${i + 1}`}
          >
            <div
              className={`h-full rounded-full bg-white transition-all duration-300 ease-out ${
                i <= currentIndex ? "w-full" : "w-0"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Prev – fixed to viewport left */}
      {hasPrev && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* Next – fixed to viewport right */}
      {hasNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* Image wrapper – click doesn't close */}
      <div
        className="relative flex items-center justify-center max-w-[90vw] max-h-[85vh] px-14 sm:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden min-w-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={image.id}
              initial={{ opacity: 0.7, x: direction * 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0.7, x: -direction * 12 }}
              transition={TRANSITION}
              className="relative flex flex-col items-center"
            >
              <div className="relative">
                {isLoading && (
                  <div
                    className="absolute inset-0 rounded-lg bg-white/8 min-w-[240px] min-h-[180px]"
                    aria-hidden
                  />
                )}
                <Image
                  src={image.path}
                  alt={image.location}
                  width={1920}
                  height={1080}
                  className={`max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-lg transition-opacity duration-300 ease-out ${
                    isLoading ? "opacity-0" : "opacity-100"
                  }`}
                  sizes="90vw"
                  onLoad={() => setIsLoading(false)}
                />
              </div>
              <div className="mt-4 text-center text-white text-sm shrink-0">
                <span className="font-medium">{image.location}</span>
                {image.date && (
                  <span className="text-white/70 ml-2">
                    {formatDate(image.date)}
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
