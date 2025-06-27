import { list } from "@vercel/blob";
import Image from "next/image";
import { AnimatedHoverText } from "@/components/ui/animated-hover-text";

export default async function Gallery() {
  const { blobs } = await list({
    prefix: "pics/",
  });

  // Filter for image files only
  const imageBlobs = blobs.filter((blob) =>
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(blob.pathname)
  );

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16 lg:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 sm:gap-[32px] row-start-2 items-center sm:items-start w-full max-w-6xl px-4 sm:px-0">
        <AnimatedHoverText
          text="Gallery"
          element="h1"
          className="font-bold text-lg sm:text-xl lg:text-2xl text-center sm:text-left"
          startDelay={200}
        />

        {imageBlobs.length === 0 ? (
          <div className="text-center">
            <p className="text-muted-foreground">
              No images found in the /pics folder.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {imageBlobs.map((blob, index) => (
                <div
                  key={blob.url}
                  className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <Image
                    src={blob.url}
                    alt={blob.pathname.replace("pics/", "")}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3} // Prioritize first 3 images
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3 opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm truncate">
                      {blob.pathname.replace("pics/", "")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Showing {imageBlobs.length} image
              {imageBlobs.length !== 1 ? "s" : ""} from /pics
            </div>
          </>
        )}
      </main>
    </div>
  );
}
