import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { cache } from "react";

const thoughtsDirectory = path.join(process.cwd(), "content/thoughts");

export interface ThoughtMetadata {
  title: string;
  description: string;
  publishedAt: string;
  readingTime?: string;
  tags?: string[];
  slug: string;
}

export interface Thought {
  metadata: ThoughtMetadata;
  content: string;
}

export const getAllThoughts = cache(async function getAllThoughts(): Promise<
  ThoughtMetadata[]
> {
  // Ensure directory exists
  if (!fs.existsSync(thoughtsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(thoughtsDirectory);
  const thoughts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(thoughtsDirectory, fileName);
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
      } as ThoughtMetadata;
    })
    .sort((a, b) => {
      // Sort by publishedAt date, newest first
      if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
        return -1;
      }
      return 1;
    });

  return thoughts;
});

export const getThoughtBySlug = cache(async function getThoughtBySlug(
  slug: string
): Promise<Thought | null> {
  try {
    const fullPath = path.join(thoughtsDirectory, `${slug}.mdx`);
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

export async function getThoughtMetadata(
  slug: string
): Promise<ThoughtMetadata | null> {
  const thought = await getThoughtBySlug(slug);
  return thought ? thought.metadata : null;
}
