import { AnimatedHoverText } from "@/components/ui/animated-hover-text";

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
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <AnimatedHoverText
            text="Essays"
            element="h1"
            className="font-bold"
            startDelay={200}
          />
          <AnimatedHoverText
            text="No articles found"
            element="p"
            className="text-muted-foreground"
            startDelay={800}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <AnimatedHoverText
          text="Thoughts on technology, design, and development"
          element="h1"
          className="font-bold"
          startDelay={200}
        />

        <div className="flex flex-col gap-4">
          {essaysData.map((essay, index) => (
            <a
              key={essay.id}
              href={essay.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer relative block"
            >
              <div className="flex items-center gap-2">
                <AnimatedHoverText
                  text={essay.title}
                  element="h2"
                  className="relative inline-block transition-colors duration-300 group-hover:text-foreground/80"
                  startDelay={800 + index * 200}
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
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
