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

<!--
#######################################################################################
okay, so in partition function the variable i is for tracking the partition index, also it keeps track of the previous/latest smaller element. in the loop , j scans through the array. if greater than partition, do nothing. Else swap increment i, so now it points to an elemnt that is greater than partition, and then swaps them. now after the loop has ended, my partition is still at the end, so it has not been swapped. so lets swap (arr[i+1] with arr[high]) & i+1 is the new partition index.

ekta boro elm er por choto elm thakle swapping ta bojha jai.
#######################################################################################
-->


**Quick Look:**
  1. **Time Complexity:** Best/Average: $O(n \log n)$ Worst: $O(n^2)$ (when pivot is always min/max)
  2. **Space Complexity:** $O(\log n)$ (recursion stack)
  3. **Stability:** _Unstable_, consider an array of same elements, i pick the first one as partition. now it will be joined at the end. because, [<=partition]+[partition]+[>partition]. [read more](stable-and-unstable-sort)

---

**Algorithm (Recursive Partitioning):**
  1. Pick a pivot.
  2. Partition array: elements < pivot on left, > pivot on right.
  3. Recursively sort left and right subarrays.

---

**code:**

```python
def quick_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr

    pivot = arr[0]
    smaller_eq = [x for x in arr[1:] if x <= pivot]
    larger  = [x for x in arr[1:] if x > pivot]

    return quick_sort(smaller_eq) + [pivot] + quick_sort(larger)
```

**inplace version:**

```python
def partition(arr, low, high):
    pi = high
    i = low - 1 # i points to the last index that was smaller than the pivot element

    for j in range(low, high):
        if arr[j] <= arr[pi]:
            i += 1
            arr[i], arr[j] = arr[j], arr[i] # swap arr[i], arr[j]
            # why needed? dry run: [pi-x, pi-y, pi+a, pi-z, pi]

    arr[i+1], arr[pi] = arr[pi], arr[i+1] # swapping i+1 with pivot,
    # i <- last index that was smaller than pivot, so i+1 -> pivot's suitable position
    return i+1 # return pivots index

def quicksort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quicksort(arr, low, pi-1)
        quicksort(arr, pi+1, high)
```

---

**Visualisation, Sorting [7, 3, 5, 2, 9]:**

```sh
QUICK SORT VISUALIZATION
=========================

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

**For more animations, visit:** [https://dsa-experiments.vercel.app/recursion/quick-sort](https://dsa-experiments.vercel.app/recursion/quick-sort)
