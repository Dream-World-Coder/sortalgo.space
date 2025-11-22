<!--metadata
  title: "Deep dive into Insertion Sort"
  authors: ["Subhajit Gorai"]
  dateCreated: "06/10/2025"
  dateEdited: "18/10/2025"
  description: "Insertion sort quick lookup, algorithm, code, Visualisation, Complexity Analysis"
  tags: ["insertion sort", "sorting"]
  slug: "insertion-sort"
-->

# Insertion Sort

> Insertion Sort is a simple comparison-based sorting algorithm that builds the final sorted array one element at a time. It works similarly to how you arrange cards in your hand—by taking one element and inserting it into its correct position relative to the already sorted part of the array.
It’s efficient for small datasets, nearly sorted data, and is stable and in-place, meaning it doesn’t require extra memory.

**Quick Look:**
  1. **Time Complexity:** Best $O(n)$, Worst $O(n^2)$
  2. **Space Complexity:** $O(1)$ — _in-place_
  3. **No of comparisions:** Best $n-1$, Average $\frac{n(n-1)}{4}$, Worst $\frac{n(n-1)}{2}$
  4. **Stability:** _Stable_ (shifts adjacent elements like bubble sort)

---

**Algorithm:**
  Start from the second element (`i = 1`). For each `i`, insert `arr[i]` into the sorted portion `arr[0..i-1]` by shifting larger elements right.
  1. Start from the second element ($i = 1$), considering the first element as trivially sorted.
  2. Select arr[i] (the key) and compare it with elements in the sorted subarray arr[0..i-1].
  3. Shift every element that is greater than the key one position to the right.
  4. Insert the key into the correct position where the left element is ≤ key.
  5. Repeat this process for all elements until the entire array becomes sorted.

```python
def insertion_sort(arr):
  n: int = len(arr)

  for i in range(1, n):
    curr = arr[i]
    for j in range(i - 1, -1, -1):  # j: from i-1 to 0
      if arr[j] > curr:
        arr[j + 1] = arr[j]  # shift right
      else:
        arr[j + 1] = curr   # insert here
        break
    else:
      arr[0] = curr  # if loop didn't break, insert at start
```

---

**Visualisation, Sorting [7, 3, 5, 2, 9]:**

```sh
INSERTION SORT VISUALIZATION
=============================

Initial array:
+---+---+---+---+---+
| 7 | 3 | 5 | 2 | 9 |   <-- value
+---+---+---+---+---+
  0   1   2   3   4     <-- index


ITERATION 1: (i = 1, key = 3)
------------------------------
Sorted portion: [7]
Pick arr[1] = 3, insert into sorted portion

+---+---+---+---+---+
| 7 | 3 | 5 | 2 | 9 |
+---+---+---+---+---+
  ^   ^
sorted key

Compare 3 with 7: 3 < 7 → shift 7 right
+---+---+---+---+---+
| 7 | 7 | 5 | 2 | 9 |
+---+---+---+---+---+

Insert 3 at index 0:
+---+---+---+---+---+
| 3 | 7 | 5 | 2 | 9 |
+---+---+---+---+---+
  ^^^^^
 sorted


ITERATION 2: (i = 2, key = 5)
------------------------------
Sorted portion: [3, 7]
Pick arr[2] = 5, insert into sorted portion

+---+---+---+---+---+
| 3 | 7 | 5 | 2 | 9 |
+---+---+---+---+---+
  ^^^^^   ^
 sorted  key

Compare 5 with 7: 5 < 7 → shift 7 right
+---+---+---+---+---+
| 3 | 7 | 7 | 2 | 9 |
+---+---+---+---+---+

Compare 5 with 3: 5 > 3 → stop
Insert 5 at index 1:
+---+---+---+---+---+
| 3 | 5 | 7 | 2 | 9 |
+---+---+---+---+---+
  ^^^^^^^^^
   sorted


ITERATION 3: (i = 3, key = 2)
------------------------------
Sorted portion: [3, 5, 7]
Pick arr[3] = 2, insert into sorted portion

+---+---+---+---+---+
| 3 | 5 | 7 | 2 | 9 |
+---+---+---+---+---+
  ^^^^^^^^^   ^
   sorted    key

Compare 2 with 7: 2 < 7 → shift 7 right
+---+---+---+---+---+
| 3 | 5 | 7 | 7 | 9 |
+---+---+---+---+---+

Compare 2 with 5: 2 < 5 → shift 5 right
+---+---+---+---+---+
| 3 | 5 | 5 | 7 | 9 |
+---+---+---+---+---+

Compare 2 with 3: 2 < 3 → shift 3 right
+---+---+---+---+---+
| 3 | 3 | 5 | 7 | 9 |
+---+---+---+---+---+

Insert 2 at index 0:
+---+---+---+---+---+
| 2 | 3 | 5 | 7 | 9 |
+---+---+---+---+---+
  ^^^^^^^^^^^^^
     sorted


ITERATION 4: (i = 4, key = 9)
------------------------------
Sorted portion: [2, 3, 5, 7]
Pick arr[4] = 9, insert into sorted portion

+---+---+---+---+---+
| 2 | 3 | 5 | 7 | 9 |
+---+---+---+---+---+
  ^^^^^^^^^^^^^   ^
     sorted      key

Compare 9 with 7: 9 > 7 → stop (already in correct position)
+---+---+---+---+---+
| 2 | 3 | 5 | 7 | 9 |
+---+---+---+---+---+
  ^^^^^^^^^^^^^^^^^
    all sorted


Finally sorted:
-----------------
+---+---+---+---+---+
| 2 | 3 | 5 | 7 | 9 |
+---+---+---+---+---+

Summary:
--------
Iteration 1: Insert 3 → 1 comparison, 1 shift
Iteration 2: Insert 5 → 1 comparison, 1 shift
Iteration 3: Insert 2 → 3 comparisons, 3 shifts
Iteration 4: Insert 9 → 1 comparison, 0 shifts
```

**Complexity Analysis:**
In Insertion Sort, we build the sorted array one element at a time by inserting each element into its correct position in the already sorted portion.
- The outer loop runs **$n$** times (for each element to be inserted).
- For the $i$-th element, the inner loop may run up to $i-1$ times in the worst case (when the element needs to be inserted at the beginning).
Therefore, the total number of comparisons in the worst case is: $\Theta\left(\sum_{i=1}^{n-1} i \right)$
This is the well-known sum of the first $(n-1)$ natural numbers: $\Theta\left(\frac{n(n-1)}{2}\right)$
Thus, the time complexity becomes: $\boxed{\Theta(n^2)}$

**Recurrence Relation:**
Let $T(n)$ be the time to sort an array of size $n$.
- Sorting the first $n-1$ elements takes $T(n-1)$ time.
- Inserting the $n$-th element into the sorted portion takes $O(n)$ time in the worst case.
Therefore, the recurrence is: $T(n) = T(n-1) + \Theta(n)$
with base case: $T(1) = \Theta(1)$

Expanding the recurrence:
$$T(n) = T(n-1) + \Theta(n) = T(n-2) + \Theta(n-1) + \Theta(n) = \dots = \Theta(1 + 2 + \dots + n) = \boxed{\Theta(n^2)}$$
