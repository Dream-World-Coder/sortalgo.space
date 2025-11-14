import { getChapterContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
// import { ChapterNavigation } from "@/components/ChapterNavigation";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const content = getChapterContent(slug);

  return (
    <article className="max-w-3xl mx-auto p-16">
      <MarkdownRenderer content={content} />
      {/*<ChapterNavigation currentSlug={slug} />*/}
    </article>
  );
}

export async function generateStaticParams() {
  return [
    { slug: "bubble-sort" },
    { slug: "merge-sort" },
    { slug: "quick-sort" },
  ];
}
