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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-6">
          {socialLinks.map((social, index) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer relative block"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <AnimatedHoverText
                    text={social.platform}
                    element="h2"
                    className="relative inline-block transition-colors duration-300 group-hover:text-foreground/80 font-medium"
                    startDelay={200 + index * 200}
                  />
                  <svg
                    className="w-3 h-3 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors duration-300"
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
                </div>
                <span className="absolute left-0 bottom-0 h-[2px] bg-current w-0 transition-all duration-500 ease-out group-hover:w-full"></span>
                <AnimatedHoverText
                  text={social.description}
                  element="p"
                  className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300"
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
