import { getChapterContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/MDRenderer";

// add seo & meta data

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const content = getChapterContent(slug);

  return (
    <article className="p-6 max-w-[85ch] mx-auto">
      <MarkdownRenderer content={content} />
    </article>
  );
}

export async function generateStaticParams() {
  return [
    { slug: "selection-sort" },
    { slug: "bubble-sort" },
    { slug: "insertion-sort" },
    { slug: "merge-sort" },
    { slug: "quick-sort" },
    { slug: "heap-sort" },
  ];
}
