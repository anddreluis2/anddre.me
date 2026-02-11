import { AnimatedHoverText } from "@/components/ui/animated-hover-text";
import { Experience, jobsData, projectsData } from "./data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work & Projects",
  description:
    "Professional experience and personal projects. A showcase of my work in frontend engineering and design engineering.",
};

const ExperienceSection = ({
  title,
  items,
  startDelay = 0,
}: {
  title: string;
  items: Experience[];
  startDelay?: number;
}) => (
  <div className="flex flex-col gap-3 sm:gap-4">
    <AnimatedHoverText
      text={title}
      element="h2"
      className="font-semibold text-base sm:text-lg text-muted-foreground text-center md:text-left"
      startDelay={startDelay}
    />

    <div className="flex flex-col gap-2 sm:gap-2.5">
      {items.map((item, index) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group cursor-pointer relative block"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-center md:justify-start">
              <div className="relative inline-block">
                <AnimatedHoverText
                  text={item.name}
                  element="h3"
                  className="transition-colors duration-300 group-hover:text-foreground/80 font-medium text-sm sm:text-base"
                  startDelay={startDelay + 200 + index * 150}
                />
                <span className="absolute left-0 bottom-0 h-[2px] bg-current w-0 transition-all duration-500 ease-out group-hover:w-full"></span>
              </div>
            </div>
            <AnimatedHoverText
              text={item.position}
              element="p"
              className="text-xs sm:text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300 text-center md:text-left"
              startDelay={startDelay + 350 + index * 150}
            />
          </div>
        </a>
      ))}
    </div>
  </div>
);

export default function Projects() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 sm:gap-8 items-start w-full max-w-4xl mx-auto px-4 sm:px-0">
        <AnimatedHoverText
          text="Work & Projects"
          element="h1"
          className="font-bold text-lg sm:text-xl lg:text-2xl"
          startDelay={200}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 w-full max-w-3xl">
          <ExperienceSection
            title="Professional Experience"
            items={jobsData}
            startDelay={600}
          />

          <ExperienceSection
            title="Personal Projects"
            items={projectsData}
            startDelay={800}
          />
        </div>
      </main>
    </div>
  );
}
