import { AnimatedHoverText } from "@/components/ui/animated-hover-text";
import type { Metadata } from "next";
import { getAllThoughts } from "@/lib/thoughts";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thoughts",
  description:
    "Thoughts on technology, design, and development. Personal reflections and insights from a frontend engineer's perspective.",
};

export default async function Thoughts() {
  const thoughts = await getAllThoughts();

  if (!thoughts || thoughts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-16rem)] font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-6 sm:gap-8 items-center sm:items-start w-full max-w-4xl mx-auto px-4 sm:px-0">
          <AnimatedHoverText
            text="Thoughts"
            element="h1"
            className="font-bold text-lg sm:text-xl lg:text-2xl text-center sm:text-left"
            startDelay={200}
          />
          <AnimatedHoverText
            text="No thoughts found"
            element="p"
            className="text-muted-foreground text-sm sm:text-base text-center sm:text-left"
            startDelay={800}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-16rem)] font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 sm:gap-8 items-center sm:items-start w-full max-w-4xl mx-auto px-4 sm:px-0">
        <AnimatedHoverText
          text="Thoughts on technology, design, and development"
          element="h1"
          className="font-bold text-lg sm:text-xl lg:text-2xl text-center sm:text-left max-w-2xl"
          startDelay={200}
        />

        <div className="flex flex-col gap-2 sm:gap-2.5 w-full max-w-2xl">
          {thoughts.map((thought) => (
            <Link
              key={thought.slug}
              href={`/thoughts/${thought.slug}`}
              className="group cursor-pointer relative block"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-center sm:justify-start">
                  <div className="relative inline-block">
                    <h2 className="transition-colors duration-300 group-hover:text-foreground/80 text-sm sm:text-base font-medium leading-relaxed text-center sm:text-left">
                      {thought.title}
                    </h2>
                    <span className="absolute left-0 bottom-0 h-[2px] bg-current w-0 transition-all duration-500 ease-out group-hover:w-full" />
                  </div>
                </div>
                {thought.readingTime && thought.publishedAt && (
                  <p className="text-xs text-muted-foreground text-center sm:text-left">
                    {new Date(thought.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    • {thought.readingTime}
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
