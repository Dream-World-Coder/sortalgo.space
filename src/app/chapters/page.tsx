import { chapters } from "@/lib/chapters";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function Chapters() {
  return (
    <div className="flex md:items-center justify-center size-full h-screen py-4 md:py-0">
      <section
        className="rounded-2xl h-full md:h-[80vh] w-[90dvw] max-w-[1368px] bg-[#f8f8f8] dark:bg-neutral-900  text-black dark:text-[#f8f8f8] border border-neutral-200 dark:border-neutral-800
        p-6 py-10 flex flex-col justify-start items-center relative"
      >
        {/* /chapters -> / */}
        {/* no need of back btn in mobile as back key does the same work */}
        <nav className="hidden sm:block absolute top-0 right-0 px-2 py-2 opacity-50 hover:opacity-100 z-40">
          <Link
            href="/"
            className="flex items-center justify-center gap-0 px-2 py-0.5 rounded-2xl
            bg-stone-200 dark:bg-stone-800 border-r border-b border-stone-300 dark:border-stone-700"
          >
            <ChevronLeft size={20} /> Back
          </Link>
        </nav>

        <h1 className="font-serif capitalize text-2xl text-center">Index</h1>

        <ul className="list mt-24 _grid columns-1 md:columns-2 md:gap-x-36 font-serif">
          {chapters.map((section) => (
            <li key={section.title} className="pb-4">
              <h3 className="font-bold capitalize">{section.title}</h3>
              <ol className="pl-4">
                {section.chapters.map((chapter) => (
                  <li key={chapter.slug}>
                    <Link
                      href={`/chapters/${chapter.slug}`}
                      className="capitalize hover:underline"
                    >
                      {chapter.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
