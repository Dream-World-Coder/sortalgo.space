<!--metadata
  title: "Deep dive into Bubble Sort"
  authors: ["Subhajit Gorai"]
  dateCreated: "06/10/2025"
  dateEdited: "17/10/2025"
  description: "Bubble sort quick lookup, algorithm, code, Visualisation, Complexity Analysis"
  tags: ["bubble sort", "sorting"]
  slug: "bubble-sort"
-->

# Bubble Sort

> Bubble sort is an in-place, comparison-based sorting algorithm.
It repeatedly swaps the adjacent elements if they are in the wrong order.
Its time complexity is $O(n^2)$ in all cases, and it uses only $O(1)$ auxiliary space.

**<u>Quick Look:</u>**
  1. **Time Complexity:** $O(n^2)$ for all cases (standard)
  2. **Space Complexity:** $O(1)$ — _In-place_
  3. **No of swaps:** $O(n^2)$ for all cases
  4. **Stability:** _Stable_ Bubble sort swaps only adjacent elements. When two elements are equal, no swap occurs → relative order preserved.

---

**<u>Algorithm:</u>**
larger elements are bubbled up to end of the array.
  1. Compare adjacent pairs;
  2. if the left is larger, swap and "bubble" it to the end.
  3. Sorted elements accumulate at the end.

> __analogy:__ Its like bellmen ford, bellmen does n-1 times relaxations and gets the shortest path, because the longest simple path in a graph has at most n-1 edges. similarly here also the swapping operation can be thought of relaxation. An element can be shifted at max n-1 positions from its sorted location, so for n elms, n-1 + n-2 + ... + 2 + 1 = n(n-1)/2 swaps will definitely make all elements sorted.

```python
def bubble_sort(arr):
  n: int = len(arr)
  for i in range(n):
    for j in range(0, n - i - 1):  # last i elements are sorted
      # swap if greater
      if arr[j] > arr[j + 1]:
        arr[j], arr[j + 1] = arr[j + 1], arr[j]
```

**optimised:** For sorted array it will need linear time
```py
def bubble_sort_optimized(arr: list[int]):
    n: int = len(arr)
    for i in range(n):
        swapped: bool = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break  # array is sorted
    return arr
```

---

**Visualisation, Sorting [7, 3, 5, 2, 9]:**

```sh
Algorithm: Compare adjacent pairs and swap if left > right.
           Largest elements "bubble up" to the end in each pass.

Initial array:
+---+---+---+---+---+
| 7 | 3 | 5 | 2 | 9 |   <-- value
+---+---+---+---+---+
  0   1   2   3   4     <-- index


PASS 1: (i = 0, compare all adjacent pairs)
--------------------------------------------
Compare arr[0] and arr[1]: 7 > 3 → SWAP
+---+---+---+---+---+
| 3 | 7 | 5 | 2 | 9 |
+---+---+---+---+---+
  ^   ^
 swapped

Compare arr[1] and arr[2]: 7 > 5 → SWAP
+---+---+---+---+---+
| 3 | 5 | 7 | 2 | 9 |
+---+---+---+---+---+
      ^   ^
     swapped

Compare arr[2] and arr[3]: 7 > 2 → SWAP
+---+---+---+---+---+
| 3 | 5 | 2 | 7 | 9 |
+---+---+---+---+---+
          ^   ^
         swapped

Compare arr[3] and arr[4]: 7 < 9 → NO SWAP
+---+---+---+---+---+
| 3 | 5 | 2 | 7 | 9 |  ← 9 is now in final position
+---+---+---+---+---+
              ^   ^
            (no swap)


PASS 2: (i = 1, compare pairs up to index 3)
--------------------------------------------
Compare arr[0] and arr[1]: 3 < 5 → NO SWAP
+---+---+---+---+---+
| 3 | 5 | 2 | 7 | 9 |
+---+---+---+---+---+
  ^   ^
(no swap)

Compare arr[1] and arr[2]: 5 > 2 → SWAP
+---+---+---+---+---+
| 3 | 2 | 5 | 7 | 9 |
+---+---+---+---+---+
      ^   ^
     swapped

Compare arr[2] and arr[3]: 5 < 7 → NO SWAP
+---+---+---+---+---+
| 3 | 2 | 5 | 7 | 9 |  ← 7 is now in final position
+---+---+---+---+---+
          ^   ^
        (no swap)


PASS 3: (i = 2, compare pairs up to index 2)
--------------------------------------------
Compare arr[0] and arr[1]: 3 > 2 → SWAP
+---+---+---+---+---+
| 2 | 3 | 5 | 7 | 9 |
+---+---+---+---+---+
  ^   ^
 swapped

Compare arr[1] and arr[2]: 3 < 5 → NO SWAP
+---+---+---+---+---+
| 2 | 3 | 5 | 7 | 9 |  ← 5 is now in final position
+---+---+---+---+---+
      ^   ^
    (no swap)


PASS 4: (i = 3, compare pairs up to index 1)
--------------------------------------------
Compare arr[0] and arr[1]: 2 < 3 → NO SWAP
+---+---+---+---+---+
| 2 | 3 | 5 | 7 | 9 |  ← 3 is now in final position
+---+---+---+---+---+
  ^   ^
(no swap)


Finally sorted:
-----------------
+---+---+---+---+---+
| 2 | 3 | 5 | 7 | 9 |  ← All elements in final positions
+---+---+---+---+---+

Summary:
--------
Pass 1: 4 comparisons → largest (9) bubbled to end
Pass 2: 3 comparisons → 2nd largest (7) bubbled to position
Pass 3: 2 comparisons → 3rd largest (5) bubbled to position
Pass 4: 1 comparison  → remaining elements already sorted

Total: 10 comparisons = 4+3+2+1 = n(n-1)/2
```

---

**<u>Complexity Analysis:</u>**
In Bubble Sort, we repeatedly compare adjacent elements and swap them if they are in the wrong order.
- The outer loop runs **$n$** times (or $n-1$ passes).
- The inner loop runs **$n-1, n-2, \dots, 1$** times (each pass bubbles the next largest element to its position).
Therefore, the total number of comparisons is: $\Theta\left(\sum_{i=1}^{n-1} i \right)$
This is the well-known sum of the first $(n-1)$ natural numbers: $\Theta\left(\frac{n(n-1)}{2}\right)$
Thus, the time complexity becomes: $\boxed{\Theta(n^2)}$
