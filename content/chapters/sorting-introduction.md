# Sorting Algorithms – Introduction

## Some Definitions

---

**Stable sort:**
A sorting algorithm is stable if, when two elements have the same key (the value being compared), their relative order from the original input is preserved in the sorted output.

**Examples:** Merge Sort, Insertion Sort

<u>Unstable sort example:</u>
Suppose you’re sorting an array of tuples by the first element only:
`[(1, a), (4, a), (3, x), (4, b)]`
Sorted by first element → (keys: 1, 4, 3, 4):
`[(1, a), (3, x), (4, b), (4, a)]` # 4a and 4b order swapped
Here, (4, a) originally came before (4, b), but after sorting, it’s after.
So the algorithm is **unstable**.

**In-place Sort:**
Uses $O(1)$ auxiliary space.

**Types of sorting algorithms:**

- Comparison-based
- Non-comparison-based
