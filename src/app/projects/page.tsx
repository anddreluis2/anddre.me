import { AnimatedHoverText } from "@/components/ui/animated-hover-text";

export default function Projects() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <AnimatedHoverText
          text="Projects"
          element="h1"
          className="font-bold"
          startDelay={200}
        />
        <AnimatedHoverText
          text="Showcasing my latest work and side projects"
          element="p"
          className="text-muted-foreground"
          startDelay={800}
        />
        <AnimatedHoverText
          text="Soon"
          element="p"
          className="text-muted-foreground"
          startDelay={1400}
        />
      </main>
    </div>
  );
}
