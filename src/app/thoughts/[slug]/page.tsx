import { getAllThoughts, getThoughtBySlug } from "@/lib/thoughts";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { cache } from "react";
import { FolderAccordion } from "@/components/ui/folder-accordion";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const mdxComponents = {
  FolderAccordion,
};

export async function generateStaticParams() {
  const thoughts = await getAllThoughts();
  return thoughts.map((thought) => ({
    slug: thought.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const thought = await getThoughtBySlug(slug);

  if (!thought) {
    return {
      title: "Thought Not Found",
    };
  }

  return {
    title: thought.metadata.title,
    description: thought.metadata.description,
  };
}

// Cache MDX compilation
const compileMDXContent = cache(async (content: string) => {
  return content;
});

export default async function ThoughtPage({ params }: PageProps) {
  const { slug } = await params;
  const thought = await getThoughtBySlug(slug);

  if (!thought) {
    notFound();
  }

  const { metadata, content } = thought;
  const cachedContent = await compileMDXContent(content);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16 lg:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 sm:gap-8 row-start-2 items-center sm:items-start w-full max-w-3xl px-4 sm:px-0">
        <Link
          href="/thoughts"
          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Thoughts</span>
        </Link>

        <article className="w-full">
          <header className="mb-8 sm:mb-12">
            <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl mb-4">
              {metadata.title}
            </h1>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              {metadata.publishedAt && (
                <time dateTime={metadata.publishedAt}>
                  {new Date(metadata.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
              {metadata.readingTime && (
                <>
                  <span>•</span>
                  <span>{metadata.readingTime}</span>
                </>
              )}
            </div>
            {metadata.tags &&
              Array.isArray(metadata.tags) &&
              metadata.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-3xl prose-h1:mt-0 prose-h1:mb-4 prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:leading-relaxed prose-p:mb-4 prose-a:text-foreground prose-a:underline prose-a:decoration-2 prose-a:underline-offset-2 hover:prose-a:decoration-muted-foreground prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6 prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6 prose-li:my-1 prose-hr:my-12 prose-hr:border-border">
            <MDXRemote
              source={cachedContent}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  rehypePlugins: [rehypeHighlight, rehypeSlug],
                },
              }}
            />
          </div>
        </article>
      </main>
    </div>
  );
}
