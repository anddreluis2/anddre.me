"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { formatDate } from "./gallery-utils";
import type { GalleryImage } from "./gallery-types";

const TRANSITION = {
  type: "tween" as const,
  duration: 0.35,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

interface GalleryLightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

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
  const progress = ((currentIndex + 1) / images.length) * 100;

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
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Top bar: progress + counter + close */}
      <div
        className="absolute top-0 left-0 right-0 z-30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-0.5 bg-white/10">
          <div
            className="h-full bg-white/70 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between px-5 py-3">
          <span className="text-white/60 text-sm tabular-nums font-medium">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {hasPrev && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {hasNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Image wrapper */}
      <div
        className="relative flex items-center justify-center max-w-[90vw] max-h-[80vh] px-14 sm:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={image.id}
            initial={{ opacity: 0.6, x: direction * 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0.6, x: -direction * 16 }}
            transition={TRANSITION}
            className="relative flex flex-col items-center"
          >
            <div className="relative">
              {isLoading && (
                <div
                  className="absolute inset-0 rounded-lg bg-white/5 min-w-[240px] min-h-[180px]"
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
            <div className="mt-4 text-center shrink-0">
              <span className="text-white/90 text-sm font-medium">
                {image.location}
              </span>
              {image.date && (
                <span className="text-white/40 text-sm ml-2">
                  {formatDate(image.date)}
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
