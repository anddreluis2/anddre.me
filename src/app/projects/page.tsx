import { HoverText } from "@/components/ui/hover-text";

export default function Projects() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <HoverText text="Projects" element="h1" className="font-bold" />
        <HoverText
          text="Showcasing my latest work and side projects"
          element="p"
          className="text-muted-foreground"
        />
        <HoverText text="Soon" element="p" className="text-muted-foreground" />
      </main>
    </div>
  );
}
