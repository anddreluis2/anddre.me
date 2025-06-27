import { list } from "@vercel/blob";
import Image from "next/image";

export default async function Gallery() {
  const { blobs } = await list({
    prefix: "pics/",
  });

  // Filter for image files only
  const imageBlobs = blobs.filter((blob) =>
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(blob.pathname)
  );

  return (
    <div className="min-h-screen w-full pt-56">
      {imageBlobs.length === 0 ? (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">No images uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 w-full">
          {imageBlobs.map((blob, index) => (
            <div
              key={blob.url}
              className="aspect-[4/5] overflow-hidden opacity-0 translate-y-4 animate-[fadeInUp_0.6s_ease-out_forwards] hover:scale-[1.01] transition-transform duration-300"
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              <Image
                src={blob.url}
                alt={blob.pathname.replace("pics/", "")}
                width={400}
                height={400}
                className="w-full h-full object-cover transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 3} // Prioritize first 3 images
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
