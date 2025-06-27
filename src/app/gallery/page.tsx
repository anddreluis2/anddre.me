import { AnimatedHoverText } from "@/components/ui/animated-hover-text";

export default function Gallery() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16 lg:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 sm:gap-[32px] row-start-2 items-center sm:items-start w-full max-w-4xl px-4 sm:px-0">
        <AnimatedHoverText
          text="Gallery"
          element="h1"
          className="font-bold text-lg sm:text-xl lg:text-2xl text-center sm:text-left"
          startDelay={200}
        />

        <div className="flex flex-col gap-4 sm:gap-6 max-w-2xl w-full">
          <AnimatedHoverText
            text="Welcome to my gallery. This space will showcase my photography and visual work."
            element="p"
            className="text-muted-foreground text-sm sm:text-base text-center sm:text-left leading-relaxed"
            startDelay={800}
          />

          <AnimatedHoverText
            text="Coming soon: A curated collection of moments captured through my lens, featuring everything from street photography to portraits and landscapes."
            element="p"
            className="text-muted-foreground text-sm sm:text-base text-center sm:text-left leading-relaxed"
            startDelay={1600}
          />
        </div>
      </main>
    </div>
  );
}
