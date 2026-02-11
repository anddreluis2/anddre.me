import { AnimatedHoverText } from "@/components/ui/animated-hover-text";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "André Luis de Oliveira Andrade",
  description:
    "Frontend Engineer and Design Engineering enthusiast. Crafting the web from parser to pixel.",
};

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-16rem)] font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 sm:gap-8 items-center sm:items-start w-full max-w-4xl px-4 sm:px-0">
        <AnimatedHoverText
          text="André Luis de Oliveira"
          element="p"
          className="font-bold text-lg sm:text-xl lg:text-2xl text-center sm:text-left"
          startDelay={200}
        />
        <AnimatedHoverText
          text="brazillian software engineer."
          element="p"
          className="text-muted-foreground max-w-2xl text-sm sm:text-base text-center sm:text-left"
          startDelay={400}
        />

        <AnimatedHoverText
          text="helping to craft the web from parser to pixel."
          element="p"
          className="text-muted-foreground max-w-2xl text-sm sm:text-base text-center sm:text-left"
          startDelay={600}
        />
      </main>
    </div>
  );
}
