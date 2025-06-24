import { AnimatedHoverText } from "@/components/ui/animated-hover-text";
import { Experience, jobsData, projectsData } from "./data";

const ExperienceSection = ({
  title,
  items,
  startDelay = 0,
}: {
  title: string;
  items: Experience[];
  startDelay?: number;
}) => (
  <div className="flex flex-col gap-4 sm:gap-6">
    <AnimatedHoverText
      text={title}
      element="h2"
      className="font-semibold text-base sm:text-lg text-muted-foreground text-center md:text-left"
      startDelay={startDelay}
    />

    <div className="flex flex-col gap-3 sm:gap-4">
      {items.map((item, index) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group cursor-pointer relative block"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 justify-center md:justify-start relative">
              <AnimatedHoverText
                text={item.name}
                element="h3"
                className="relative inline-block transition-colors duration-300 group-hover:text-foreground/80 font-medium text-sm sm:text-base"
                startDelay={startDelay + 200 + index * 150}
              />
              <svg
                className="w-3 h-3 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors duration-300 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <span className="absolute left-0 bottom-0 h-[2px] bg-current w-0 transition-all duration-500 ease-out group-hover:w-full"></span>
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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16 lg:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 sm:gap-[32px] row-start-2 items-center w-full max-w-4xl px-4 sm:px-0">
        <AnimatedHoverText
          text="Work & Projects"
          element="h1"
          className="font-bold text-lg sm:text-xl lg:text-2xl text-center"
          startDelay={200}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 w-full max-w-3xl mt-4 sm:mt-8">
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
