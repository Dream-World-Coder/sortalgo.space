import { chapters } from "@/lib/chapters";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function ChaptersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center size-full min-h-screen md:py-6">
      <section className="h-full w-full max-w-[1368px] flex justify-center items-start gap-4 relative pb-10 px-4 md:px-0">
        {/* /chapters/[slug] -> /chapters */}
        <nav className="absolute top-0 right-0 px-2 py-2 z-40 text-black dark:text-white opacity-75 hover:opacity-100">
          <Link
            href="/chapters"
            className="flex items-center justify-center gap-0 px-2 py-0.5 rounded-2xl
            bg-stone-200 dark:bg-stone-800 border-r border-b border-stone-300 dark:border-stone-700"
          >
            <ChevronLeft size={20} /> Back
          </Link>
        </nav>

        {/* sidebar */}
        <aside
          className="bg-[#f8f8f8] dark:bg-neutral-900 text-black dark:text-[#f8f8f8] border border-neutral-200 dark:border-neutral-800
          p-6 py-10 rounded-2xl hidden md:block"
        >
          <ul className="list mt-0 font-serif">
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
        </aside>

        <main
          className="bg-[#f8f8f8] dark:bg-neutral-900 text-black dark:text-[#f8f8f8] border border-neutral-200 dark:border-neutral-800
          px-0 md:px-6 py-2 md:py-10 rounded-2xl flex-1"
        >
          {children}
        </main>
      </section>
    </div>
  );
}

export const dynamic = "force-static";
