import { AnimatedHoverText } from "@/components/ui/animated-hover-text";

const socialLinks = [
  {
    id: 1,
    platform: "GitHub",
    description: "Open source projects and code repositories",
    url: "https://github.com/anddreluis2",
  },
  {
    id: 2,
    platform: "LinkedIn",
    description: "Professional network and career updates",
    url: "https://www.linkedin.com/in/andreluisdeoliveiraandrade/",
  },
  {
    id: 3,
    platform: "Twitter / X",
    description: "Tech thoughts and quick updates",
    url: "https://x.com/anddreluis_",
  },
  {
    id: 4,
    platform: "Instagram",
    description: "Photography and behind the scenes",
    url: "https://www.instagram.com/anddre.me/",
  },
  {
    id: 5,
    platform: "Dev.to",
    description: "Technical articles and tutorials",
    url: "https://dev.to/anddreluis2",
  },
  {
    id: 6,
    platform: "Email",
    description: "Direct contact for collaborations",
    url: "anddreluis98@gmail.com",
  },
];

export default function Social() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16 lg:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 sm:gap-[32px] row-start-2 items-center sm:items-start w-full max-w-4xl px-4 sm:px-0">
        <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-2xl">
          {socialLinks.map((social, index) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer relative block"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-center sm:justify-start">
                  <div className="relative inline-block">
                    <AnimatedHoverText
                      text={social.platform}
                      element="h2"
                      className="transition-colors duration-300 group-hover:text-foreground/80 font-medium text-base sm:text-lg"
                      startDelay={200 + index * 200}
                    />
                    <span className="absolute left-0 bottom-0 h-[2px] bg-current w-0 transition-all duration-500 ease-out group-hover:w-full"></span>
                  </div>
                </div>
                <AnimatedHoverText
                  text={social.description}
                  element="p"
                  className="text-xs sm:text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300 text-center sm:text-left"
                  startDelay={400 + index * 200}
                />
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
