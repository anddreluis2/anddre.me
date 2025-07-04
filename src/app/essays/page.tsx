import { AnimatedHoverText } from "@/components/ui/animated-hover-text";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Essays",
  description:
    "Thoughts on technology, design, and development. Technical articles and insights from a frontend engineer's perspective.",
};

interface DevToUser {
  name: string;
  username: string;
  twitter_username: string | null;
  github_username: string | null;
  user_id: number;
  website_url: string | null;
  profile_image: string;
  profile_image_90: string;
}

interface DevToArticle {
  type_of: string;
  id: number;
  title: string;
  description: string;
  readable_publish_date: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  positive_reactions_count: number;
  cover_image: string | null;
  social_image: string;
  canonical_url: string;
  created_at: string;
  edited_at: string | null;
  crossposted_at: string | null;
  published_at: string;
  last_comment_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  tags: string;
  user: DevToUser;
  published_timestamp: string;
  collection_id: number | null;
  language: string;
  subforem_id: number;
}

const essays = await fetch("https://dev.to/api/articles?username=anddreluis2");
const essaysData: DevToArticle[] = await essays.json();

export default async function Essays() {
  if (!essaysData || essaysData.length === 0) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16 lg:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-6 sm:gap-[32px] row-start-2 items-center sm:items-start w-full max-w-4xl px-4 sm:px-0">
          <AnimatedHoverText
            text="Essays"
            element="h1"
            className="font-bold text-lg sm:text-xl lg:text-2xl text-center sm:text-left"
            startDelay={200}
          />
          <AnimatedHoverText
            text="No articles found"
            element="p"
            className="text-muted-foreground text-sm sm:text-base text-center sm:text-left"
            startDelay={800}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16 lg:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 sm:gap-[32px] row-start-2 items-center sm:items-start w-full max-w-4xl px-4 sm:px-0">
        <AnimatedHoverText
          text="Thoughts on technology, design, and development"
          element="h1"
          className="font-bold text-lg sm:text-xl lg:text-2xl text-center sm:text-left max-w-2xl"
          startDelay={200}
        />

        <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-2xl">
          {essaysData.map((essay, index) => (
            <a
              key={essay.id}
              href={essay.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer relative block"
            >
              <div className="relative inline-block">
                <AnimatedHoverText
                  text={essay.title}
                  element="h2"
                  className="transition-colors duration-300 group-hover:text-foreground/80 text-sm sm:text-base font-medium leading-relaxed text-center sm:text-left"
                  startDelay={800 + index * 200}
                />
                <span className="absolute left-0 bottom-0 h-[2px] bg-current w-0 transition-all duration-500 ease-out group-hover:w-full"></span>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
