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
      {
        slug: "complexity-analysis",
        title: "complexity analysis",
      },
      {
        slug: "stable-sort-vs-unstable-sort",
        title: "stable vs unstable sort",
      },
      { slug: "inplace-sort", title: "inplace sort" },
    ],
  },
  {
    title: "basic sorting algorithms",
    chapters: [
      { slug: "selection-sort", title: "selection sort" },
      { slug: "bubble-sort", title: "bubble sort" },
      { slug: "insertion-sort", title: "insertion sort" },
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
    chapters: [{ slug: "heap-sort", title: "heap sort" }],
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
