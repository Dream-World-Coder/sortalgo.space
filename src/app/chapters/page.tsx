import { chapters } from "@/lib/chapters";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CornerPlusIcons } from "@/components/Decorum";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "SortAlgo - Index",
  description:
    "Interactive Blog Posts On Sorting Algorithms & Computer Science by Subhajit Gorai",
  keywords: [
    "sorting",
    "algorithms",
    "quicksort",
    "heapsort",
    "mergesort",
    "selectionsort",
    "bubblesort",
    "heapsort",
    "bucketsort",
    "radixsort",
    "visualisation",
    "sorting techniques",
  ],
  robots: { index: true, follow: true },

  openGraph: {
    title: "SortAlgo - Index",
    description:
      "Interactive Blog Posts On Sorting Algorithms & Computer Science by Subhajit Gorai",
    url: "https://sortalgo.space",
    images: ["https://sortalgo.space/preview.png"],
  },
};

export default async function Chapters() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "SortAlgo - Index",
    url: "https://sortalgo.space",
    description:
      "Interactive Blog Posts On Sorting Algorithms & Computer Science by Subhajit Gorai",
    keywords: [
      "sorting",
      "algorithms",
      "quicksort",
      "heapsort",
      "mergesort",
      "selectionsort",
      "bubblesort",
      "heapsort",
      "bucketsort",
      "radixsort",
      "visualisation",
      "sorting techniques",
    ],
    image: "https://sortalgo.space/preview.png",
    publisher: {
      "@type": "Organization",
      name: "SortAlgo",
      url: "https://sortalgo.space",
      logo: {
        "@type": "ImageObject",
        url: "https://sortalgo.space/preview.png",
      },
    },
    author: {
      "@type": "Person",
      name: "Subhajit Gorai",
      url: "https://sortalgo.space",
    },
    isPartOf: {
      "@type": "WebSite",
      name: "SortAlgo",
      url: "https://sortalgo.space",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://sortalgo.space",
        },
      ],
    },
  };

  return (
    <>
      <Script
        id="schema-index"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="flex md:items-center justify-center size-full h-screen py-4 md:py-0">
        <section
          className="h-full md:h-[80vh] w-[90dvw] max-w-[1368px] bg-[#f8f8f8] dark:bg-neutral-900  text-black dark:text-[#f8f8f8]
        border border-neutral-300/80 dark:border-neutral-700/80
        p-6 py-10 flex flex-col justify-start items-center relative border-dashed"
        >
          {/* /chapters -> / */}
          <nav className="absolute top-0 right-0 px-2 py-2 opacity-50 hover:opacity-100 z-40">
            <Link
              href="/"
              className="flex items-center justify-center gap-0 px-2 py-0.5 rounded-2xl
            bg-stone-200 dark:bg-stone-800 border-r border-b border-stone-300 dark:border-stone-700"
            >
              <ChevronLeft size={20} /> Home
            </Link>
          </nav>

          <h1 className="font-serif capitalize text-2xl text-center">Index</h1>

          <ul className="list mt-12 md:mt-24 columns-1 md:columns-2 md:gap-x-36 font-serif">
            {chapters.map((section) => (
              <li key={section.title} className="pb-4">
                <h3 className="font-bold capitalize">{section.title}</h3>
                <ol className="pl-4">
                  {section.chapters.map((chapter) => (
                    <li key={chapter.slug}>
                      <Link
                        href={`/chapters/${chapter.slug}`}
                        className="capitalize hover:underline font-sans md:font-serif"
                      >
                        {chapter.title}
                      </Link>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ul>

          <CornerPlusIcons />
        </section>
      </div>
    </>
  );
}
