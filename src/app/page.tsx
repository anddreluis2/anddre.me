import { AnimatedHoverText } from "@/components/ui/animated-hover-text";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <AnimatedHoverText
          text="André Luis Andrade"
          element="p"
          className="font-bold"
          startDelay={200}
        />
        <AnimatedHoverText
          text="Frontend Engineer and Design Engineering enthusiast."
          element="p"
          className="text-muted-foreground max-w-2xl"
          startDelay={800}
        />

        <AnimatedHoverText
          text="Crafting the web from parser to pixel."
          element="p"
          className="text-muted-foreground max-w-2xl"
          startDelay={1400}
        />
      </main>
    </div>
  );
}
