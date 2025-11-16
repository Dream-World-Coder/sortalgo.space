import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex md:items-center justify-center size-full h-screen py-4 md:py-0">
      <section
        className="rounded-2xl h-full md:h-[80vh] w-[90dvw] max-w-[1368px]  bg-[#f8f8f8] dark:bg-neutral-900 text-black dark:text-[#f8f8f8] border border-neutral-200 dark:border-neutral-800 p-6 py-10
        flex flex-col justify-start items-center"
      >
        <h1 className="font-serif capitalize text-2xl text-center">
          A journey into the realms of Sorting Algorithms
        </h1>

        <p className="my-2">
          By
          <a href="https://www.myopencanvas.in" className="italic underline">
            {" "}
            Subhajit Gorai
          </a>
        </p>

        <div className="diagram front-cover my-10">
          <pre className="whitespace-pre wrap-break-word">
            {`
+---+---+---+
| x |   | 0 |
+---+---+---+
|   | x |   |
+---+---+---+
| 0 |   | x |
+---+---+---+
            `}
          </pre>
        </div>

        <Link
          href="/chapters"
          className="mt-6 px-6 py-2
          bg-stone-200 text-neutral-700 hover:text-neutral-900
          dark:bg-stone-800 dark:text-neutral-300 dark:hover:text-neutral-50
          rounded-2xl border-b border-r border-stone-400 dark:border-stone-700"
        >{`Start Reading`}</Link>
      </section>
    </div>
  );
}
