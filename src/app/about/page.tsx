import { AnimatedHoverText } from "@/components/ui/animated-hover-text";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "about me",
  description: "a bit about me",
};

export default function About() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-16rem)] font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 sm:gap-8 items-center sm:items-start w-full max-w-4xl mx-auto px-4 sm:px-0">
        <AnimatedHoverText
          text="about"
          element="h1"
          className="font-bold text-lg sm:text-xl lg:text-2xl text-center sm:text-left"
          startDelay={200}
        />

        {/* Photo Section - Now on top and tiny */}
        <div className="w-full flex justify-center sm:justify-start">
          <div className="relative w-12 h-12 sm:w-16 sm:h-16">
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
        <div className="flex flex-col gap-4 sm:gap-6 max-w-2xl w-full">
          <AnimatedHoverText
            text="i'm a Software Engineer with 5+ years of experience building web applications. I'm currently working as a Frontend Engineer and trying to learn more about interaction design."
            element="p"
            className="text-muted-foreground text-sm sm:text-base text-center sm:text-left leading-relaxed"
            startDelay={800}
          />

          <AnimatedHoverText
            text="i'm based in Curitiba, living with my fiancée and our dog, Bituca."
            element="p"
            className="text-muted-foreground text-sm sm:text-base text-center sm:text-left leading-relaxed"
            startDelay={1600}
          />

          <AnimatedHoverText
            text="while I'm not coding, I'm usually reading, playing videogames, practicing sports, photographing or just trying to learn something new."
            element="p"
            className="text-muted-foreground text-sm sm:text-base text-center sm:text-left leading-relaxed"
            startDelay={2400}
          />
        </div>
      </main>
    </div>
  );
}
