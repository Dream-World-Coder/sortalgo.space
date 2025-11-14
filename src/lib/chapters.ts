export interface Chapter {
  slug: string;
  title: string;
  number: number;
}

export interface Section {
  title: string;
  chapters: Chapter[];
}

export interface ChaptersData {
  sections: Section[];
}

export const chapters: ChaptersData = {
  sections: [
    {
      title: "Foundations",
      chapters: [
        { slug: "introduction", title: "Introduction to Sorting", number: 1 },
        {
          slug: "complexity-analysis",
          title: "Complexity Analysis",
          number: 2,
        },
      ],
    },
    {
      title: "Basic Sorts",
      chapters: [
        { slug: "bubble-sort", title: "Bubble Sort", number: 3 },
        { slug: "selection-sort", title: "Selection Sort", number: 4 },
        { slug: "insertion-sort", title: "Insertion Sort", number: 5 },
      ],
    },
    {
      title: "Divide & Conquer",
      chapters: [
        { slug: "merge-sort", title: "Merge Sort", number: 6 },
        { slug: "quick-sort", title: "Quick Sort", number: 7 },
      ],
    },
    {
      title: "Advanced Sorts",
      chapters: [{ slug: "heap-sort", title: "Heap Sort", number: 8 }],
    },
  ],
};
