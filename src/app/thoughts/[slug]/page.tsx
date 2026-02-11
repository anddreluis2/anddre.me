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
import { QAItem } from "@/components/ui/qa-item";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const mdxComponents = {
  FolderAccordion,
  QAItem,
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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-2 sm:p-8 pb-20 gap-4 sm:gap-8 lg:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 sm:gap-8 row-start-2 items-center sm:items-start w-full max-w-3xl px-0 sm:px-4">
        <Link
          href="/thoughts"
          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 px-2 sm:px-0"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Thoughts</span>
        </Link>

        <article className="w-full px-2 sm:px-0">
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
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-gradient-to-r from-muted/60 via-muted/80 to-muted/60 text-muted-foreground border border-border/30 hover:from-muted hover:via-muted hover:to-muted hover:text-foreground/80 transition-all duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-3xl prose-h1:mt-0 prose-h1:mb-4 prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:leading-relaxed prose-p:mb-4 prose-p:break-words prose-a:text-foreground prose-a:underline prose-a:decoration-2 prose-a:underline-offset-2 prose-a:break-words hover:prose-a:decoration-muted-foreground prose-code:text-[11px] sm:prose-code:text-sm prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-code:break-all prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:text-[11px] prose-pre:leading-relaxed sm:prose-pre:text-sm prose-pre:overflow-x-auto prose-pre:max-w-full prose-pre:whitespace-pre-wrap prose-pre:break-words prose-pre:p-2 sm:prose-pre:p-4 [&_pre_code]:whitespace-pre-wrap [&_pre_code]:break-words [&_pre_code]:text-[11px] sm:[&_pre_code]:text-sm prose-ul:my-4 prose-ul:list-disc prose-ul:pl-4 sm:prose-ul:pl-6 prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-4 sm:prose-ol:pl-6 prose-li:my-1 prose-li:break-words prose-hr:my-12 prose-hr:border-border prose-strong:break-words prose-strong:font-semibold">
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
