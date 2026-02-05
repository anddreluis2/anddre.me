import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { cache } from "react";

const essaysDirectory = path.join(process.cwd(), "content/essays");

export interface EssayMetadata {
  title: string;
  description: string;
  publishedAt: string;
  readingTime?: string;
  tags?: string[];
  slug: string;
}

export interface Essay {
  metadata: EssayMetadata;
  content: string;
}

export const getAllEssays = cache(async function getAllEssays(): Promise<
  EssayMetadata[]
> {
  // Ensure directory exists
  if (!fs.existsSync(essaysDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(essaysDirectory);
  const essays = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(essaysDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);

      return {
        title: data.title || "Untitled",
        description: data.description || "",
        publishedAt: data.publishedAt || "",
        readingTime: stats.text,
        tags: Array.isArray(data.tags) ? data.tags : [],
        slug,
      } as EssayMetadata;
    })
    .sort((a, b) => {
      // Sort by publishedAt date, newest first
      if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
        return -1;
      }
      return 1;
    });

  return essays;
});

export const getEssayBySlug = cache(async function getEssayBySlug(
  slug: string
): Promise<Essay | null> {
  try {
    const fullPath = path.join(essaysDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      metadata: {
        title: data.title || "Untitled",
        description: data.description || "",
        publishedAt: data.publishedAt || "",
        readingTime: stats.text,
        tags: Array.isArray(data.tags) ? data.tags : [],
        slug,
      },
      content,
    };
  } catch {
    return null;
  }
});

export async function getEssayMetadata(
  slug: string
): Promise<EssayMetadata | null> {
  const essay = await getEssayBySlug(slug);
  return essay ? essay.metadata : null;
}
