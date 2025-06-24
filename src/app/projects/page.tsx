import { AnimatedHoverText } from "@/components/ui/animated-hover-text";

const jobs = [
  {
    id: 1,
    name: "MercadoFarma (EMS)",
    position: "Frontend Engineer Lead",
    url: "https://mercadofarma.com.br",
  },
  {
    id: 2,
    name: "Meteor Software (Galaxy Team)",
    position: "Frontend Engineer",
    url: "https://www.meteor.com",
  },
  {
    id: 3,
    name: "Monest",
    position: "Frontend Engineer",
    url: "https://monest.com.br",
  },
  {
    id: 4,
    name: "MadeiraMadeira",
    position: "Frontend Engineer",
    url: "https://www.madeiramadeira.com.br",
  },
];

const projects = [
  {
    id: 1,
    name: "Biblioteca de Instrumentos",
    position: "Frontend Engineer",
    url: "https://bibliotecadeinstrumentos.com.br/",
  },
  {
    id: 2,
    name: "Humantrack",
    position: "Founder Engineer",
    url: "https://humantrack.io",
  },
  {
    id: 3,
    name: "Personal Portfolio",
    position: "Creator & Developer",
    url: "https://github.com/anddreluis2/anddre.me",
  },
];

const ExperienceSection = ({
  title,
  items,
  startDelay = 0,
}: {
  title: string;
  items: typeof jobs;
  startDelay?: number;
}) => (
  <div className="flex flex-col gap-6">
    <AnimatedHoverText
      text={title}
      element="h2"
      className="font-semibold text-lg text-muted-foreground"
      startDelay={startDelay}
    />

    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group cursor-pointer relative block"
        >
          <div className="flex flex-col gap-1">
            <AnimatedHoverText
              text={item.name}
              element="h3"
              className="relative inline-block transition-colors duration-300 group-hover:text-foreground/80 font-medium"
              startDelay={startDelay + 200 + index * 150}
            />
            <span className="absolute left-0 bottom-0 h-[2px] bg-current w-0 transition-all duration-500 ease-out group-hover:w-full"></span>
            <AnimatedHoverText
              text={item.position}
              element="p"
              className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300"
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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-5xl">
        <AnimatedHoverText
          text="Work & Projects"
          element="h1"
          className="font-bold"
          startDelay={200}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 w-full mt-8">
          <ExperienceSection
            title="Professional Experience"
            items={jobs}
            startDelay={600}
          />

          <ExperienceSection
            title="Personal Projects"
            items={projects}
            startDelay={800}
          />
        </div>
      </main>
    </div>
  );
}
