import type { Metadata } from "next";
import galleryData from "@/gallery-data.json";
import { GalleryContent } from "@/components/gallery/gallery-content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photography and visual moments. A collection of images capturing my perspective through the lens.",
};

const IMAGES = galleryData as {
  id: number;
  location: string;
  path: string;
  format: string;
  date?: string;
}[];

export default function Gallery() {
  return (
    <div className="min-h-screen w-full">
      <GalleryContent images={IMAGES} />
    </div>
  );
}
