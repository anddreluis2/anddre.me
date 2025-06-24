import { HoverText } from "@/components/ui/hover-text";
import Image from "next/image";

export default function About() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <HoverText text="About" element="h1" className="font-bold" />

        {/* Photo Section - Now on top and tiny */}
        <div className="w-full flex justify-center">
          <div className="relative w-24 h-24">
            <Image
              src="/profile.jpeg"
              alt="André Luis Andrade"
              className="object-cover rounded-full shadow-md"
              priority
              fill
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-6 max-w-2xl">
          <HoverText
            text="I'm a Software Engineer with 5 years of experience building web interfaces. I'm currently diving into design engineering—bridging the gap between beautiful design and solid code."
            element="p"
            className="text-muted-foreground"
          />

          <HoverText
            text="I care about the details that make great user experiences: smooth interactions, fast performance, and accessibility. My goal is to ship solutions that work well and look good."
            element="p"
            className="text-muted-foreground"
          />

          <HoverText
            text="While I'm not coding, I'm usually reading, photographing, or just touching some grass."
            element="p"
            className="text-muted-foreground"
          />
        </div>
      </main>
    </div>
  );
}
