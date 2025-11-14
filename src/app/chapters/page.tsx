import { chapters } from "@/lib/chapters";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function Chapters() {
  return (
    <div className="flex items-center justify-center size-full h-screen">
      <section
        className="rounded-2xl h-[90dvh] md:h-[80vh] w-[90dvw] max-w-[1368px] bg-[#f8f8f8] text-black border-neutral-200 p-6 py-10
        flex flex-col justify-start items-center relative"
      >
        {/* header -> home link */}
        <nav className="absolute top-0 right-0 px-4 py-2 opacity-50 hover:opacity-100">
          <Link href="/" className="flex items-center justify-center gap-0">
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
