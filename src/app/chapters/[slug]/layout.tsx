import { chapters } from "@/lib/chapters";
import Link from "next/link";
import { ChevronLeft, List } from "lucide-react";
import { CornerPlusIcons } from "@/components/Decorum";
import Image from "next/image";
import DarkModeBtn from "@/components/dark-mode-btn";

export default function ChaptersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="size-full min-h-screen">
      <section
        className="max-w-dvw md:max-w-[1368px] mx-auto overflow-x-hidden size-full
        flex justify-center items-start gap-4 relative pb-10 px-4 md:px-2 py-4 md:py-6"
      >
        {/* nav for desktops */}
        <nav
          className="hidden sm:flex fixed -translate-x-1/2 top-6 left-1/2
          w-full max-w-[1368px] px-6 py-2 z-40 items-center justify-end gap-2"
        >
          <DarkModeBtn />

          {/* back btn for desktops */}
          <Link
            href="/chapters"
            className="flex items-center justify-center gap-0 px-2 py-0.5 rounded-2xl opacity-75 hover:opacity-100
            bg-stone-200 dark:bg-stone-800 border-r border-b border-stone-300 dark:border-stone-700 text-black dark:text-white"
          >
            <ChevronLeft size={20} /> Back
          </Link>
        </nav>

        {/* nav for mobiles */}
        <nav
          className="flex sm:hidden fixed top-8 left-6 px-2 py-1.5 z-40 items-center justify-center gap-3
          bg-stone-200 dark:bg-stone-800 border-r border-b border-stone-300 dark:border-stone-700 rounded-xl"
        >
          {/* back btn for mobiles */}
          <Link
            href="/chapters"
            className="opacity-75 hover:opacity-100 text-black dark:text-white"
          >
            <List size={20} />
          </Link>

          <DarkModeBtn />
        </nav>

        {/* sidebar */}
        <aside
          className="bg-[#f8f8f8] dark:bg-neutral-900 text-black dark:text-[#f8f8f8] border-neutral-300/80 dark:border-neutral-700/80
          p-6 py-10 hidden lg:block h-full w-64 border border-dashed relative"
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

          <CornerPlusIcons />
        </aside>

        <main
          className="bg-[#f8f8f8] dark:bg-neutral-900 text-black dark:text-[#f8f8f8] border-neutral-300/80 dark:border-neutral-700/80
          px-0 md:px-6 py-2 md:py-10 flex-1 h-full border border-dashed relative"
        >
          {children}

          <CornerPlusIcons />
        </main>
      </section>

      <footer className="w-full py-16 text-black dark:text-white">
        {/* feedback form, email */}
        <div className="mx-auto max-w-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-center">
          <div className="image size-[125px] relative block overflow-hidden">
            <Image
              src="/cross.png"
              alt="footer image"
              width={125}
              height={125}
              className="object-cover"
            />
          </div>

          <div className="flex-1 pt-6 md:pt-0 md:pl-6">
            Was anything unclear, difficult to follow, or outdated? <br /> Then
            don&apos;t hesitate to mail me at{" "}
            <a
              href="mailto:blog.opencanvas@gmail.com"
              className="underline cursor-pointer"
            >
              blog.opencanvas@gmail.com
            </a>
            . I&apos;d love to hear your thoughts on the article, and improve it
            based on your suggestions.
            <br />
            <br />© 2025 sortalgo.space. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export const dynamic = "force-static";
