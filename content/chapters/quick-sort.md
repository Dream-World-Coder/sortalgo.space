<!--metadata
  title: "Deep dive into Quick Sort"
  authors: ["Subhajit Gorai"]
  dateCreated: "26/10/2025"
  dateEdited: "14/11/2025"
  description: "Quick sort quick lookup, algorithm, code, Visualisation, Complexity Analysis"
  tags: ["quick sort", "sorting"]
  slug: "quick-sort"
-->

# Quick Sort

> Quick Sort is a divide-and-conquer sorting algorithm that works by selecting a pivot element, partitioning the array into elements smaller and larger than the pivot, and then recursively sorting the partitions. It is efficient on average with $O(n\log n)$ time complexity.

**Quick Look:**
  1. **Time Complexity:** Best/Average: $O(n \log n)$ Worst: $O(n^2)$ (when pivot is always min/max)
  2. **Space Complexity:** $O(\log n)$ (recursion stack)
  3. **Stability:** _Unstable_, consider an array of same elements, i pick the first one as partition. now it will be joined at the end. cuz, [<=partition]+[partition]+[>partition]

---

**Algorithm (Recursive Partitioning):**
  1. Pick a pivot.
  2. Partition array: elements < pivot on left, > pivot on right.
  3. Recursively sort left and right subarrays.

---

```python
def quick_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr

    pivot = arr[0]
    smaller = [x for x in arr if x < pivot]
    larger  = [x for x in arr if x > pivot]

    return quick_sort(smaller) + [pivot] + quick_sort(larger)
```

```c
// function to swap two integers
void swap(int *a, int *b) {
  int temp = *a;
  *a = *b;
  *b = temp;
}

// partition function using lomuto partition scheme
int partition(int arr[], int low, int high) {
  int pivot = arr[high];     // pivot element
  int i = low - 1;           // index of smaller element

  // traverse through the array and compare with pivot
  for (int j = low; j < high; j++) {
    // if current element is <= pivot, swap
    if (arr[j] <= pivot) {
      i++;
      swap(&arr[i], &arr[j]);
    }
  }

  // place pivot at correct position
  swap(&arr[i + 1], &arr[high]);
  return (i + 1);
}

// quicksort recursive function
void quickSort(int arr[], int low, int high) {
  if (low < high) {
    // partition the array
    int pi = partition(arr, low, high);

    // recursively sort elements before and after partition
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}
```

---

**Visualisation, Sorting [7, 3, 5, 2, 9]:**

```sh
QUICK SORT VISUALIZATION
=========================

Algorithm: 1) Choose a pivot element
           2) Partition array: elements < pivot on left, > pivot on right
           3) Recursively sort left and right partitions
           Uses divide-and-conquer approach

Initial array:
+---+---+---+---+---+
| 7 | 3 | 5 | 2 | 9 |   <-- value
+---+---+---+---+---+
  0   1   2   3   4     <-- index


========================================
PARTITION 1: Full array [7,3,5,2,9]
========================================
Range: left=0, right=4
Pivot: Choose last element = 9 (index 4)

+---+---+---+---+---+
| 7 | 3 | 5 | 2 | 9 |  ← pivot = 9
+---+---+---+---+---+
  i=0             ^
               pivot

Goal: Move elements < 9 to left, >= 9 to right

i = -1 (tracks position for next small element)
j = 0  (scans through array)

j=0: arr[0]=7 < 9 → increment i to 0, swap arr[0] with arr[0]
+---+---+---+---+---+
| 7 | 3 | 5 | 2 | 9 |
+---+---+---+---+---+
  i=0             ^
               pivot

j=1: arr[1]=3 < 9 → increment i to 1, swap arr[1] with arr[1]
+---+---+---+---+---+
| 7 | 3 | 5 | 2 | 9 |
+---+---+---+---+---+
      i=1         ^
               pivot

j=2: arr[2]=5 < 9 → increment i to 2, swap arr[2] with arr[2]
+---+---+---+---+---+
| 7 | 3 | 5 | 2 | 9 |
+---+---+---+---+---+
          i=2     ^
               pivot

j=3: arr[3]=2 < 9 → increment i to 3, swap arr[3] with arr[3]
+---+---+---+---+---+
| 7 | 3 | 5 | 2 | 9 |
+---+---+---+---+---+
              i=3 ^
               pivot

Place pivot: swap arr[i+1] with arr[4]
+---+---+---+---+---+
| 7 | 3 | 5 | 2 | 9 |  ← 9 is now in correct position
+---+---+---+---+---+
  ^^^^^^^^^^^^^ ^
   left part  pivot

Pivot index = 4
Left partition: [7,3,5,2]  Right partition: [] (empty)


========================================
PARTITION 2: Left partition [7,3,5,2]
========================================
Range: left=0, right=3
Pivot: Choose last element = 2 (index 3)

+---+---+---+---+---+
| 7 | 3 | 5 | 2 | 9 |  ← pivot = 2
+---+---+---+---+---+
  ^           ^
            pivot

i = -1, j = 0

j=0: arr[0]=7 > 2 → no swap
j=1: arr[1]=3 > 2 → no swap
j=2: arr[2]=5 > 2 → no swap

Place pivot: swap arr[i+1=0] with arr[3]
+---+---+---+---+---+
| 2 | 3 | 5 | 7 | 9 |  ← 2 is now in correct position
+---+---+---+---+---+
  ^   ^^^^^^^^^^^^
pivot  right part

Pivot index = 0
Left partition: [] (empty)  Right partition: [3,5,7]


========================================
PARTITION 3: Right partition [3,5,7]
========================================
Range: left=1, right=3
Pivot: Choose last element = 7 (index 3)

+---+---+---+---+---+
| 2 | 3 | 5 | 7 | 9 |  ← pivot = 7
+---+---+---+---+---+
      ^       ^
            pivot

i = 0, j = 1

j=1: arr[1]=3 < 7 → increment i to 1, swap arr[1] with arr[1]
+---+---+---+---+---+
| 2 | 3 | 5 | 7 | 9 |
+---+---+---+---+---+
      i=1     ^
            pivot

j=2: arr[2]=5 < 7 → increment i to 2, swap arr[2] with arr[2]
+---+---+---+---+---+
| 2 | 3 | 5 | 7 | 9 |
+---+---+---+---+---+
          i=2 ^
            pivot

Place pivot: swap arr[i+1=3] with arr[3]
+---+---+---+---+---+
| 2 | 3 | 5 | 7 | 9 |  ← 7 is now in correct position
+---+---+---+---+---+
      ^^^^^^  ^
    left part pivot

Pivot index = 3
Left partition: [3,5]  Right partition: [] (empty)


========================================
PARTITION 4: Left partition [3,5]
========================================
Range: left=1, right=2
Pivot: Choose last element = 5 (index 2)

+---+---+---+---+---+
| 2 | 3 | 5 | 7 | 9 |  ← pivot = 5
+---+---+---+---+---+
      ^   ^
        pivot

i = 0, j = 1

j=1: arr[1]=3 < 5 → increment i to 1, swap arr[1] with arr[1]
+---+---+---+---+---+
| 2 | 3 | 5 | 7 | 9 |
+---+---+---+---+---+
      i=1 ^
        pivot

Place pivot: swap arr[i+1=2] with arr[2]
+---+---+---+---+---+
| 2 | 3 | 5 | 7 | 9 |  ← 5 is now in correct position
+---+---+---+---+---+
      ^   ^
    left  pivot

Pivot index = 2
Left partition: [3]  Right partition: [] (empty)


========================================
BASE CASES
========================================
Partition [3]: size = 1 → already sorted
All partitions complete!


Finally sorted:
-----------------
+---+---+---+---+---+
| 2 | 3 | 5 | 7 | 9 |
+---+---+---+---+---+


Summary:
--------
Time Complexity:
- Average: O(n log n)
- Worst: O(n²) when pivot is always smallest/largest

Space Complexity: O(log n) for recursion stack

Key insight: Partition around pivot so it's in final position,
            then recursively sort left and right partitions.
            Unlike merge sort, the work is in partitioning, not combining!
```

**Complexity Analysis:**
In Quick Sort, we select a pivot element, partition the array around the pivot, and recursively sort the subarrays.

**Recurrence Relation:**

**Best/Average Case:**
Let $T(n)$ be the time to sort an array of size $n$.
- Selecting a pivot and partitioning the array takes $\Theta(n)$ time.
- In the best case, the pivot divides the array into two equal halves of size $n/2$ each.
- Recursively sorting each half takes $T(n/2)$ time.

Therefore, the recurrence is: $T(n) = 2T(n/2) + \Theta(n)$
with base case: $T(1) = \Theta(1)$

**Solving using Master Theorem:**
The recurrence is of the form: $T(n) = aT(n/b) + f(n)$
where $a = 2$, $b = 2$, and $f(n) = \Theta(n)$.

We compute: $n^{\log_b a} = n^{\log_2 2} = n^1 = n$

Since $f(n) = \Theta(n) = \Theta(n^{\log_b a})$, we are in **Case 2** of the Master Theorem.

Therefore: $T(n) = \Theta(n^{\log_b a} \log n) = \boxed{\Theta(n \log n)}$

**Worst Case:**
In the worst case, the pivot is always the smallest or largest element, resulting in one subarray of size $n-1$ and one of size $0$.

The recurrence becomes: $T(n) = T(n-1) + \Theta(n)$
with base case: $T(1) = \Theta(1)$

Expanding the recurrence:
$$T(n) = T(n-1) + \Theta(n) = T(n-2) + \Theta(n-1) + \Theta(n) = \dots = \Theta(1 + 2 + \dots + n) = \boxed{\Theta(n^2)}$$
