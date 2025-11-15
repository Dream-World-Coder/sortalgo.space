import { getChapterContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/MDRenderer";
import metaDataParser, { ParsedMetaData } from "@/components/MetaParser";
import { getSchemaData } from "@/components/seo";
import { Metadata } from "next";
import { cache } from "react";

const getPageMetadata = cache(async (slug: string): Promise<ParsedMetaData> => {
  const content: string = getChapterContent(slug);

  let metaData: ParsedMetaData = {
    title: "Sorting",
    authors: ["author"],
    dateCreated: "15/11/2025",
    dateEdited: "15/11/2025",
    description: "sorting algorithms",
    tags: ["sorting", "algorithms"],
    slug: "sorting",
  };

  try {
    metaData = metaDataParser(content);
  } catch (err) {
    console.log(err);
  }

  return metaData;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const metaData = await getPageMetadata(slug);

  return {
    title: metaData.title,
    description: metaData.description,
    keywords: metaData.tags,
    authors: metaData.authors.map((name) => ({ name })),
    openGraph: {
      title: metaData.title,
      description: metaData.description,
      type: "article",
      publishedTime: metaData.dateCreated,
      modifiedTime: metaData.dateEdited,
      authors: metaData.authors,
      tags: metaData.tags,
    },
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content: string = getChapterContent(slug);
  const metaData = await getPageMetadata(slug); // Uses cached result
  const schemaData = getSchemaData(metaData);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <article className="p-6 max-w-[85ch] mx-auto">
        <header className="flex justify-end items-center">
          <span className="text-sm">
            by{" "}
            {metaData?.authors?.length == 1
              ? metaData.authors[0]
              : metaData.authors[0] +
                metaData?.authors?.slice(1).map((i) => `, ${i}`)}
            <br />
            <span className="text-sm opacity-80">{metaData.dateEdited}</span>
          </span>
        </header>
        <MarkdownRenderer content={content} />
      </article>
    </>
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
