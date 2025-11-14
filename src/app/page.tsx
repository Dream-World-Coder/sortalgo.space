import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex items-center justify-center size-full h-screen">
      <section
        className="rounded-2xl h-[80vh] w-[90vw] bg-[#f8f8f8] text-black border-neutral-200 p-6 py-10
        flex flex-col justify-start items-center"
      >
        <h1 className="font-serif capitalize text-2xl">
          A journey into the realm of Sorting Algorithms
        </h1>

        <p>
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

        <div className="mt-6 px-6 py-2 bg-stone-200 rounded-2xl flex items-center justify-center">
          <Link href="/chapters">{`++ Start Reading ++`}</Link>
        </div>
      </section>
    </div>
  );
}
