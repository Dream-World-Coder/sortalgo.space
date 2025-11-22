<!--metadata
  title: "Deep dive into Merge Sort"
  authors: ["Subhajit Gorai"]
  dateCreated: "24/10/2025"
  dateEdited: "11/11/2025"
  description: "Merge sort quick lookup, algorithm, code, Visualisation, Complexity Analysis"
  tags: ["merge sort", "sorting"]
  slug: "merge-sort"
-->

# Merge Sort

> Merge Sort is a divide-and-conquer sorting algorithm that works by recursively dividing the array into two halves, sorting each half, and then merging the sorted halves to produce the final sorted array. It guarantees a time complexity of $O(n\log n)$ in all cases and is a stable sorting algorithm.

### Quick Look:
  1. **Time Complexity:** $O(n \log n)$ for all cases
  2. **Space Complexity:** $O(n)$
  3. **Stability:** _Stable_, [read more](stable-and-unstable-sort)

> Used in **external sorting** for large datasets that don’t fit in RAM.

---

### Algorithm (Divide & Conquer):
  1. Divide array into two halves.
  2. Recursively sort both halves.
  3. Merge the sorted halves.

---

**C Implementation**

```c
#include <stdio.h>
#include <stdlib.h>

void merge(int *arr, int start, int mid, int end) {
  int i = start;
  int j = mid + 1;
  int *tmp_arr = (int *)malloc((end - start + 1) * sizeof(int));
  int k = 0;

  // compare and add in tmp arr
  while (i <= mid && j <= end) {
    if (arr[i] < arr[j])
      tmp_arr[k++] = arr[i++];
    else
      tmp_arr[k++] = arr[j++];
  }

  // adding remaining elements
  while (i <= mid) tmp_arr[k++] = arr[i++];
  while (j <= end) tmp_arr[k++] = arr[j++];

  // copying back to original
  for (int i = 0; i < (end - start + 1); i++)
    arr[i + start] = tmp_arr[i];

  free(tmp_arr);
}

void merge_sort(int *arr, int start, int end) {
  if (start < end) {
    int mid = start + (end - start) / 2;
    merge_sort(arr, start, mid);
    merge_sort(arr, mid + 1, end);
    merge(arr, start, mid, end);
  }
}
```

---

### Visualisation, Sorting [7, 3, 5, 2, 9]:

```sh
MERGE SORT VISUALIZATION
=========================

Initial array:
+---+---+---+---+---+
| 7 | 3 | 5 | 2 | 9 |   <-- value
+---+---+---+---+---+
  0   1   2   3   4     <-- index


========================================
DIVIDE PHASE (Top-down recursion)
========================================

Level 0: Original array
+---+---+---+---+---+
| 7 | 3 | 5 | 2 | 9 |
+---+---+---+---+---+
         |
    split at mid=2
         |
    +----+----+
    |         |
    v         v

Level 1: Split into two halves
+---+---+---+       +---+---+
| 7 | 3 | 5 |       | 2 | 9 |
+---+---+---+       +---+---+
  left half         right half
      |                 |
 split at mid=1    split at mid=3
      |                 |
   +--+--+           (base case)
   |     |
   v     v

Level 2: Continue splitting
+---+---+   +---+       +---+---+
| 7 | 3 |   | 5 |       | 2 | 9 |
+---+---+   +---+       +---+---+
     |    (base case)        |
split at 0              split at 3
     |                       |
  +--+--+                 +--+--+
  |     |                 |     |
  v     v                 v     v

Level 3: Base cases (single elements)
+---+ +---+ +---+       +---+ +---+
| 7 | | 3 | | 5 |       | 2 | | 9 |
+---+ +---+ +---+       +---+ +---+


========================================
CONQUER PHASE (Bottom-up merging)
========================================

MERGE 1: Merge [7] and [3]
----------------------------
Compare 7 and 3: 3 < 7
+---+---+
| 3 | 7 |  ← merged
+---+---+


MERGE 2: Merge [2] and [9]
----------------------------
Compare 2 and 9: 2 < 9
+---+---+
| 2 | 9 |  ← merged
+---+---+


MERGE 3: Merge [3,7] and [5]
----------------------------
Step 1: Compare 3 and 5: 3 < 5 → take 3
        +---+
        | 3 |
        +---+

Step 2: Compare 7 and 5: 5 < 7 → take 5
        +---+---+
        | 3 | 5 |
        +---+---+

Step 3: Only 7 remains → take 7
        +---+---+---+
        | 3 | 5 | 7 |  ← merged
        +---+---+---+


MERGE 4: Merge [3,5,7] and [2,9]
---------------------------------
Left:  [3, 5, 7]    Right: [2, 9]
        ^                   ^

Step 1: Compare 3 and 2: 2 < 3 → take 2
        +---+
        | 2 |
        +---+
Left:  [3, 5, 7]    Right: [9]
        ^                   ^

Step 2: Compare 3 and 9: 3 < 9 → take 3
        +---+---+
        | 2 | 3 |
        +---+---+
Left:  [5, 7]       Right: [9]
        ^                   ^

Step 3: Compare 5 and 9: 5 < 9 → take 5
        +---+---+---+
        | 2 | 3 | 5 |
        +---+---+---+
Left:  [7]          Right: [9]
        ^                   ^

Step 4: Compare 7 and 9: 7 < 9 → take 7
        +---+---+---+---+
        | 2 | 3 | 5 | 7 |
        +---+---+---+---+
Left:  []           Right: [9]
                            ^

Step 5: Only 9 remains → take 9
        +---+---+---+---+---+
        | 2 | 3 | 5 | 7 | 9 |
        +---+---+---+---+---+


Finally sorted:
-----------------
+---+---+---+---+---+
| 2 | 3 | 5 | 7 | 9 |
+---+---+---+---+---+


Summary:
--------
Time Complexity: O(n log n)
- log n levels of division
- n work at each level for merging

Space Complexity: O(n)
- Requires temporary arrays for merging
```

### Complexity Analysis:
In Merge Sort, we recursively divide the array into two halves, sort each half, and then merge the sorted halves.

**Recurrence Relation:**
Let $T(n)$ be the time to sort an array of size $n$.
- Dividing the array into two halves takes $\Theta(1)$ time.
- Recursively sorting each half takes $T(n/2)$ time.
- Merging the two sorted halves takes $\Theta(n)$ time.

Therefore, the recurrence is:
$T(n) = T(\lfloor n/2 \rfloor) + T(\lceil n/2 \rceil) + \Theta(n)\\
      = 2T(n/2) + \Theta(n).$

with base case: $T(1) = \Theta(1)$

**Solving using Master Theorem:**
The recurrence is of the form: $T(n) = aT(n/b) + f(n)$
where $a = 2$, $b = 2$, and $f(n) = \Theta(n)$.

We compute: $n^{\log_b a} = n^{\log_2 2} = n^1 = n$

Since $f(n) = \Theta(n) = \Theta(n^{\log_b a})$, we are in **Case 2** of the Master Theorem.

Therefore: $T(n) = \Theta(n^{\log_b a} \log n) = \boxed{\Theta(n \log n)}$
