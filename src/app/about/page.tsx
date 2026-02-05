import { AnimatedHoverText } from "@/components/ui/animated-hover-text";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software Engineer with 5 years of experience building web interfaces. Currently diving into design engineering—bridging the gap between beautiful design and solid code.",
};

export default function About() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16 lg:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 sm:gap-[32px] row-start-2 items-center sm:items-start w-full max-w-4xl px-4 sm:px-0">
        <AnimatedHoverText
          text="About"
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
            text="I'm a Software Engineer with 5+ years of experience building web applications. I'm currently diving into design engineering and trying to learn more about web interactions."
            element="p"
            className="text-muted-foreground text-sm sm:text-base text-center sm:text-left leading-relaxed"
            startDelay={800}
          />

          <AnimatedHoverText
            text="I'm based in Curitiba, Brazil and I have have a lot of experience building SaaS, e-commerces and Developer Experience focused apps."
            element="p"
            className="text-muted-foreground text-sm sm:text-base text-center sm:text-left leading-relaxed"
            startDelay={1600}
          />

          <AnimatedHoverText
            text="While I'm not coding, I'm usually reading, photographing, playing games or just trying to learn something new."
            element="p"
            className="text-muted-foreground text-sm sm:text-base text-center sm:text-left leading-relaxed"
            startDelay={2400}
          />
        </div>
      </main>
    </div>
  );
}
