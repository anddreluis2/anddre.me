import { HoverText } from "@/components/ui/hover-text";

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
          <HoverText text="Essays" element="h1" className="font-bold" />
          <HoverText
            text="No articles found"
            element="p"
            className="text-muted-foreground"
          />
        </main>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <HoverText
          text="Thoughts on technology, design, and development"
          element="h1"
          className="font-bold"
        />

        <div className="flex flex-col gap-4">
          {essaysData.map((essay) => (
            <div key={essay.id} className="group cursor-pointer relative">
              <h2 className="relative inline-block transition-colors duration-300 group-hover:text-foreground/80">
                {essay.title}
                <span className="absolute left-0 bottom-0 h-[2px] bg-current w-0 transition-all duration-500 ease-out group-hover:w-full"></span>
              </h2>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
