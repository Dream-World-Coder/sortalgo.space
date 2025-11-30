import { CornerPlusIcons } from "@/components/Decorum";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex md:items-center justify-center size-full h-screen py-4 md:py-0">
      <section
        className="h-full md:h-[80vh] w-[90dvw] max-w-[1368px]  bg-[#f8f8f8] dark:bg-neutral-900 text-black dark:text-[#f8f8f8]
        border border-dashed border-neutral-300/80 dark:border-neutral-700/80 p-6 py-10
        flex flex-col justify-start items-center relative"
      >
        <h1 className="md:font-serif capitalize text-3xl text-center mt-20 md:mt-0">
          A journey through the realms of Sorting Algorithms
        </h1>

        <h1 className="font-serif capitalize text-center mt-16 md:mt-12 max-w-[30ch] md:max-w-none">
          Interactive blog posts on sorting algorithms &amp; Computer Science,
        </h1>

        <p className="my-0 font-serif">
          by
          <a href="https://www.myopencanvas.in" className="italic underline">
            {" "}
            Subhajit Gorai
          </a>
        </p>

        <div className="diagram front-cover my-10">
          <pre className="whitespace-pre wrap-break-word font-mono leading-tight">
            {`
•---•---•---•---•
|   |   |   | x |
•---+---+---+---•
|   |   | x | x |
•---+---+---+---•
|   | x | x | x |
•---+---+---+---•
| x | x | x | x |
•---•---•---•---•
            `}
          </pre>
        </div>

        <Link
          href="/chapters"
          className="mt-6 px-6 py-2
          bg-stone-200 text-neutral-700 hover:text-neutral-900
          dark:bg-stone-800 dark:text-neutral-300 dark:hover:text-neutral-50
          rounded-2xl border-b border-r border-stone-400 dark:border-stone-700
          hover:border-b-2 hover:border-r-2"
        >{`Start Reading`}</Link>

        <CornerPlusIcons />
      </section>
    </div>
  );
}
