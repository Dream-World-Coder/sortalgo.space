export interface Chapter {
  slug: string;
  title: string;
}

export interface Section {
  title: string;
  chapters: Chapter[];
}

export const chapters: Section[] = [
  {
    title: "introduction",
    chapters: [
      { slug: "introduction", title: "what is sorting" },
      // {
      //   slug: "complexity-analysis",
      //   title: "complexity analysis",
      // },
      {
        slug: "stable-and-unstable-sort",
        title: "stable and unstable sort",
      },
    ],
  },
  {
    title: "sorting techniques",
    chapters: [
      { slug: "minima-extraction", title: "minima extraction" },
      { slug: "divide-and-conquer", title: "divide & conquer" },
    ],
  },
  {
    title: "basic sorting algorithms",
    chapters: [
      { slug: "bubble-sort", title: "bubble sort" },
      { slug: "selection-sort", title: "selection sort" },
      { slug: "insertion-sort", title: "insertion sort" },
      { slug: "shell-sort", title: "shell sort" },
    ],
  },
  {
    title: "divide and conquer",
    chapters: [
      { slug: "merge-sort", title: "merge sort" },
      { slug: "quick-sort", title: "quick sort" },
    ],
  },
  {
    title: "advanced sorts",
    chapters: [
      { slug: "heap-sort", title: "heap sort" },
      { slug: "heap-vs-sorted-array", title: "heap vs sorted array" },
    ],
  },
  {
    title: "linear sorts",
    chapters: [
      { slug: "counting-sort", title: "counting sort" },
      { slug: "radix-sort", title: "radix sort" },
      { slug: "bucket-sort", title: "bucket sort" },
    ],
  },
];

export function getNextArticle(
  currentSlug: string,
): { slug: string; title?: string } | null {
  // all chapters -> a list of objects with slug + title
  const allChapters = chapters.flatMap((section) =>
    section.chapters.map((ch) => ({ slug: ch.slug, title: ch.title })),
  );

  const index = allChapters.findIndex((ch) => ch.slug === currentSlug);

  if (index === -1) return null; // slug not found
  if (index === allChapters.length - 1) return { slug: "last" }; // last article

  return allChapters[index + 1]; // return { slug, title }
}

export function getPrevArticle(
  currentSlug: string,
): { slug: string; title?: string } | null {
  // all chapters -> a list of objects with slug + title
  const allChapters = chapters.flatMap((section) =>
    section.chapters.map((ch) => ({ slug: ch.slug, title: ch.title })),
  );

  const index = allChapters.findIndex((ch) => ch.slug === currentSlug);

  if (index === -1) return null; // slug not found
  if (index === 0) return { slug: "first" }; // first article

  return allChapters[index - 1]; // return { slug, title }
}
