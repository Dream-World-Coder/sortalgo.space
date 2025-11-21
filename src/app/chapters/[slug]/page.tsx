import { getChapterContent } from "@/lib/content";
import { getNextArticle } from "@/lib/chapters";
import { MarkdownRenderer } from "@/components/MDRenderer";
import metaDataParser, { ParsedMetaData } from "@/components/MetaParser";
import { getSchemaData } from "@/components/seo";
import { Metadata } from "next";
import { cache } from "react";
import Script from "next/script";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
// import { CornerPlusIcons } from "@/components/Decorum";

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

// exporting meta tags
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

// page
export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content: string = getChapterContent(slug);
  const metaData = await getPageMetadata(slug); // cached result
  const schemaData = getSchemaData(metaData); // schema data

  async function Animation() {
    try {
      const mod = await import(`@/app/animations/${slug}.tsx`);
      const Content = mod.default;

      return <Content />;
    } catch (err) {
      console.log("animation not found for", slug, ". error: ", err);
      return <></>;
    }
  }

  const nextSlug: { slug: string; title?: string } | null =
    getNextArticle(slug);

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <article className="p-6 max-w-[85ch] mx-auto">
        <header className="flex justify-end items-center transform -translate-y-4 md:translate-y-0">
          <div
            className="AUTHOR-AND-DATE flex justify-center items-center w-fit p-2 bg-[#f2f2f2] dark:bg-neutral-800/25
            border border-dashed border-neutral-200 dark:border-neutral-700/40 relative"
          >
            <span className="text-sm">
              by,{" "}
              {metaData?.authors?.length == 1
                ? metaData.authors[0]
                : metaData.authors[0] +
                  metaData?.authors?.slice(1).map((i) => ` & ${i}`)}
              <br />
              <span className="text-sm opacity-80">{metaData.dateEdited}</span>
            </span>

            {/*<CornerPlusIcons />*/}
          </div>
        </header>

        <MarkdownRenderer content={content} />

        {/* --- */}
        <Animation />

        {/* next article */}
        {nextSlug && nextSlug.slug === "last" ? (
          <div className="w-full mt-6 italic">
            I hope these articles helped you even by a little, <br />
            <span className="underline">Thank you,</span> for continuing till
            the end!
          </div>
        ) : (
          <div className="w-full capitalize flex justify-end items-center group mt-6">
            <Link
              href={`/chapters/${nextSlug?.slug}`}
              className="flex items-center border border-black dark:border-white py-1 px-4"
            >
              Next: {nextSlug?.title}
              <ChevronRight
                size={20}
                className="transform translate-x-0 group-hover:translate-x-1"
              />
            </Link>
          </div>
        )}
      </article>
    </>
  );
}

export async function generateStaticParams() {
  return [
    { slug: "introduction" },
    // { slug: "complexity-analysis" },
    { slug: "stable-and-unstable-sort" },

    { slug: "minima-extraction" },
    { slug: "divide-and-conquer" },

    { slug: "bubble-sort" },
    { slug: "selection-sort" },
    { slug: "insertion-sort" },
    { slug: "shell-sort" },

    { slug: "merge-sort" },
    { slug: "quick-sort" },

    { slug: "heap-sort" },

    { slug: "counting-sort" },
    { slug: "radix-sort" },
    { slug: "bucket-sort" },
  ];
}
