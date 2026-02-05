import { AnimatedHoverText } from "@/components/ui/animated-hover-text";
import type { Metadata } from "next";
import { getAllEssays } from "@/lib/essays";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Essays",
  description:
    "Thoughts on technology, design, and development. Technical articles and insights from a frontend engineer's perspective.",
};

export default async function Essays() {
  const essays = await getAllEssays();

  if (!essays || essays.length === 0) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16 lg:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-6 sm:gap-[32px] row-start-2 items-center sm:items-start w-full max-w-4xl px-4 sm:px-0">
          <AnimatedHoverText
            text="Essays"
            element="h1"
            className="font-bold text-lg sm:text-xl lg:text-2xl text-center sm:text-left"
            startDelay={200}
          />
          <AnimatedHoverText
            text="No articles found"
            element="p"
            className="text-muted-foreground text-sm sm:text-base text-center sm:text-left"
            startDelay={800}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16 lg:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 sm:gap-[32px] row-start-2 items-center sm:items-start w-full max-w-4xl px-4 sm:px-0">
        <AnimatedHoverText
          text="Thoughts on technology, design, and development"
          element="h1"
          className="font-bold text-lg sm:text-xl lg:text-2xl text-center sm:text-left max-w-2xl"
          startDelay={200}
        />

        <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-2xl">
          {essays.map((essay, index) => (
            <Link
              key={essay.slug}
              href={`/essays/${essay.slug}`}
              className="group cursor-pointer relative block"
            >
              <div className="flex flex-col gap-1">
                <div className="relative inline-block">
                  <AnimatedHoverText
                    text={essay.title}
                    element="h2"
                    className="transition-colors duration-300 group-hover:text-foreground/80 text-sm sm:text-base font-medium leading-relaxed text-center sm:text-left"
                    startDelay={800 + index * 200}
                  />
                  <span className="absolute left-0 bottom-0 h-[2px] bg-current w-0 transition-all duration-500 ease-out group-hover:w-full"></span>
                </div>
                {essay.readingTime && essay.publishedAt && (
                  <p className="text-xs text-muted-foreground text-center sm:text-left">
                    {new Date(essay.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    • {essay.readingTime}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
