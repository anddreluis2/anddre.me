"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { formatDate } from "./gallery-utils";
import type { GalleryImage } from "./gallery-types";

interface GalleryLightboxProps {
  image: GalleryImage;
  onClose: () => void;
}

/** Full-screen overlay; click outside or Escape to close. */
export function GalleryLightbox({ image, onClose }: GalleryLightboxProps) {
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
