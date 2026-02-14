import Image from "next/image";
import type { Metadata } from "next";
import galleryData from "@/gallery-data.json";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photography and visual moments. A collection of images capturing my perspective through the lens.",
};

const IMAGES = galleryData.flatMap((category) => category.images);

export default function Gallery() {
  return (
    <div className="min-h-screen w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 w-full">
        {IMAGES.map((image, index) => (
          <div
            key={image.id}
            className="aspect-[4/5] overflow-hidden opacity-0 translate-y-4 animate-[fadeInUp_0.6s_ease-out_forwards] hover:scale-[1.01] transition-transform duration-300"
            style={{
              animationDelay: `${index * 150}ms`,
            }}
          >
            <Image
              src={image.path}
              alt={image.location}
              width={400}
              height={400}
              className="w-full h-full object-cover transition-opacity duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 3}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
