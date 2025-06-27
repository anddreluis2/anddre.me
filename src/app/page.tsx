import { AnimatedHoverText } from "@/components/ui/animated-hover-text";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "André Luis de Oliveira Andrade",
  description:
    "Frontend Engineer and Design Engineering enthusiast. Crafting the web from parser to pixel.",
};

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16 lg:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 sm:gap-[32px] row-start-2 items-center sm:items-start w-full max-w-4xl px-4 sm:px-0">
        <AnimatedHoverText
          text="André Luis Andrade"
          element="p"
          className="font-bold text-lg sm:text-xl lg:text-2xl text-center sm:text-left"
          startDelay={200}
        />
        <AnimatedHoverText
          text="Frontend Engineer and Design Engineering enthusiast."
          element="p"
          className="text-muted-foreground max-w-2xl text-sm sm:text-base text-center sm:text-left"
          startDelay={800}
        />

        <AnimatedHoverText
          text="Crafting the web from parser to pixel."
          element="p"
          className="text-muted-foreground max-w-2xl text-sm sm:text-base text-center sm:text-left"
          startDelay={1400}
        />
      </main>
    </div>
  );
}
