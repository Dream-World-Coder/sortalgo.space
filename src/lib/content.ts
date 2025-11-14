import fs from "fs";
import path from "path";

const contentDirectory = path.join(process.cwd(), "content");

export function getHomeContent(): string {
  const filePath = path.join(contentDirectory, "home.md");
  return fs.readFileSync(filePath, "utf-8");
}

export function getChapterContent(slug?: string | string[]): string {
  if (!slug) return `# Enter a valid url`;
  const filePath = path.join(contentDirectory, "chapters", `${slug}.md`);

  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    console.log(error);
    return `# Chapter Not Found\n\nThe chapter "${slug}" doesn't exist yet.`;
  }
}

// get all available chapters
export function getAllChapterSlugs(): string[] {
  const chaptersDir = path.join(contentDirectory, "chapters");
  const files = fs.readdirSync(chaptersDir);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(".md", ""));
}
