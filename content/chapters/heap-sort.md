<!--metadata
  title: "Deep dive into Heap Sort"
  authors: ["Subhajit Gorai"]
  dateCreated: "07/10/2025"
  dateEdited: "15/11/2025"
  description: "Heap sort quick lookup, algorithm, code, Visualisation, Complexity Analysis"
  tags: ["heap sort", "sorting"]
  slug: "heap-sort"
-->

# Heap Sort

> Heapsort is a comparison-based sorting algorithm that uses a binary heap data structure. It works by building a max-heap from the input, then repeatedly extracting the maximum element and restoring the heap until the array is sorted. It guarantees $O(n\log n)$ time complexity and is an in-place, but not stable, sorting algorithm.

**Quick Look:**
  1. **Time Complexity:** $O(n \log n)$ for all cases
  2. **Space Complexity:** $O(1)$ — _in-place_
  3. **Stability:** _Unstable_ (heap operations can reorder equal elements)

---

**Algorithm:**
Build a max-heap from the array. Repeatedly extract the maximum element (root), place it at the last index, decrease the heap size by 1 and rebuild the heap at index 0 (root).

  1. Build a max-heap from the array (using buildHeap() or repeated heapify() calls).
  2. Repeat until the heap shrinks to size 1:
    1. Swap the root (maximum element) with the last element of the heap.
    2. Reduce the heap size by 1.
    3. Heapify from index 0 to restore the max-heap property.

```c
// function to swap two integers
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// heapify function to maintain max-heap property
void heapify(int arr[], int n, int i) {
    int largest = i;          // initialize largest as root
    int left = 2 * i + 1;     // left child
    int right = 2 * i + 2;    // right child

    // if left child is larger than root
    if (left < n && arr[left] > arr[largest])
        largest = left;

    // if right child is larger than largest so far
    if (right < n && arr[right] > arr[largest])
        largest = right;

    // if largest is not root, swap and continue heapifying
    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        heapify(arr, n, largest);
    }
}

// main heapsort function
void heapSort(int arr[], int n) {
    // build max heap
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    // one by one extract elements from heap
    for (int i = n - 1; i > 0; i--) {
        // move current root to end
        swap(&arr[0], &arr[i]);

        // call heapify on the reduced heap
        heapify(arr, i, 0);
    }
}
```
---

**Visualisation, Sorting [7, 3, 5, 2, 9]:**

```sh
HEAP SORT VISUALIZATION
========================

Algorithm: 1) Build a max-heap from array
           2) Repeatedly extract max (root) and place at end
           Uses binary heap data structure

Initial array:
+---+---+---+---+---+
| 7 | 3 | 5 | 2 | 9 |   <-- value
+---+---+---+---+---+
  0   1   2   3   4     <-- index


========================================
PHASE 1: BUILD MAX-HEAP
========================================
Max-heap property: parent >= children
For index i: left_child = 2i+1, right_child = 2i+2

Initial tree representation:
         7(0)
        /    \
      3(1)   5(2)
     /   \
   2(3)  9(4)


Step 1: Heapify from last non-leaf node (i = 1)
------------------------------------------------
Node 3 at index 1, children: 2(3), 9(4)
Compare: 3 < 9 → SWAP(1, 4)

+---+---+---+---+---+
| 7 | 9 | 5 | 2 | 3 |
+---+---+---+---+---+
      ^           ^
     swapped

Tree:
         7(0)
        /    \
      9(1)   5(2)
     /   \
   2(3)  3(4)


Step 2: Heapify root (i = 0)
-----------------------------
Node 7 at index 0, children: 9(1), 5(2)
Compare: 7 < 9 → SWAP(0, 1)

+---+---+---+---+---+
| 9 | 7 | 5 | 2 | 3 |
+---+---+---+---+---+
  ^   ^
 swapped

Tree:
         9(0)
        /    \
      7(1)   5(2)
     /   \
   2(3)  3(4)

Check if 7 needs further heapify:
Children of 7: 2(3), 3(4)
7 > 2 and 7 > 3 → heap property satisfied

MAX-HEAP BUILT:
+---+---+---+---+---+
| 9 | 7 | 5 | 2 | 3 |  ← Max-heap
+---+---+---+---+---+


========================================
PHASE 2: EXTRACT MAX AND SORT
========================================

EXTRACTION 1: Remove max (9)
------------------------------
Swap root with last element, reduce heap size

+---+---+---+---+---+
| 3 | 7 | 5 | 2 | 9 |  ← 9 in final position
+---+---+---+---+---+
  ^               ^
 swap          sorted

Heapify root (heap size = 4):
Tree:    3(0)
        /    \
      7(1)   5(2)
     /
   2(3)

Node 3, children: 7(1), 5(2)
Max child = 7 → SWAP(0, 1)

+---+---+---+---+---+
| 7 | 3 | 5 | 2 | 9 |
+---+---+---+---+---+
  ^   ^           ^
 swap          sorted

Check node 3, child: 2(3)
3 > 2 → heap property satisfied

Current heap: [7, 3, 5, 2]


EXTRACTION 2: Remove max (7)
------------------------------
Swap root with last unsorted element

+---+---+---+---+---+
| 2 | 3 | 5 | 7 | 9 |  ← 7 in final position
+---+---+---+---+---+
  ^       ^   ^^^^^^^
 swap      sorted

Heapify root (heap size = 3):
Tree:    2(0)
        /    \
      3(1)   5(2)

Node 2, children: 3(1), 5(2)
Max child = 5 → SWAP(0, 2)

+---+---+---+---+---+
| 5 | 3 | 2 | 7 | 9 |
+---+---+---+---+---+
  ^       ^   ^^^^^^^
 swap      sorted

Current heap: [5, 3, 2]


EXTRACTION 3: Remove max (5)
------------------------------
Swap root with last unsorted element

+---+---+---+---+---+
| 2 | 3 | 5 | 7 | 9 |  ← 5 in final position
+---+---+---+---+---+
  ^   ^   ^^^^^^^^^^^
 swap    sorted

Heapify root (heap size = 2):
Tree:    2(0)
        /
      3(1)

Node 2, child: 3(1)
2 < 3 → SWAP(0, 1)

+---+---+---+---+---+
| 3 | 2 | 5 | 7 | 9 |
+---+---+---+---+---+
  ^   ^   ^^^^^^^^^^^
 swap    sorted

Current heap: [3, 2]


EXTRACTION 4: Remove max (3)
------------------------------
Swap root with last unsorted element

+---+---+---+---+---+
| 2 | 3 | 5 | 7 | 9 |  ← 3 in final position
+---+---+---+---+---+
  ^   ^^^^^^^^^^^^^^^
 swap    sorted

Heap size = 1, no heapify needed


Finally sorted:
-----------------
+---+---+---+---+---+
| 2 | 3 | 5 | 7 | 9 |
+---+---+---+---+---+


Summary:
--------
Time Complexity: O(n log n)
- Build heap: O(n)
- n extractions × O(log n) heapify = O(n log n)

Space Complexity: O(1)
- Sorts in-place

Key insight: Use max-heap to repeatedly extract largest element.
            Each extraction moves max to end and maintains heap property.
```

---

**Complexity Analysis:**

**Heapify Operation:**
Heapify is used to maintain the heap property by moving an element down the tree.
- In the worst case, an element may need to move from the root to a leaf.
- The height of a binary heap with $n$ elements is $\lfloor \log_2 n \rfloor$.
- At each level, we perform a constant amount of work (comparisons and swaps).

Therefore, the time complexity of heapify is: $\boxed{\Theta(\log n)}$

**Recurrence Relation for Heapify:**
In the worst case, heapify may need to recurse down the larger subtree.
- A node in a binary heap can have subtrees of size at most $2n/3$ (this occurs when the last level is exactly half full and the element goes down the larger subtree).
- At each level, we do $\Theta(1)$ work for comparisons.

Therefore, the recurrence is: $T(n) = T(2n/3) + \Theta(1)$
with base case: $T(1) = \Theta(1)$

**Solving using Master Theorem:**
The recurrence is of the form: $T(n) = aT(n/b) + f(n)$
where $a = 1$, $b = 3/2$, and $f(n) = \Theta(1)$.

We compute: $n^{\log_b a} = n^{\log_{3/2} 1} = n^0 = 1$

Since $f(n) = \Theta(1) = \Theta(n^{\log_b a})$, we are in **Case 2** of the Master Theorem.

Therefore: $T(n) = \Theta(n^{\log_b a} \log n) = \Theta(\log n)$

**Build Heap Operation:**
Build Heap converts an unsorted array into a max-heap (or min-heap) by calling heapify on all non-leaf nodes.
- There are $\lceil n/2 \rceil$ non-leaf nodes in a binary heap.
- A naive analysis: calling heapify ($\Theta(\log n)$) on $n/2$ nodes gives $\Theta(n \log n)$.

**Tight Analysis:**
- At height $h$, there are at most $\lceil n/2^{h+1} \rceil$ nodes.
- Heapify takes $\Theta(h)$ time for a node at height $h$.

Total work: $\sum_{h=0}^{\lfloor \log n \rfloor} \lceil n/2^{h+1} \rceil \cdot \Theta(h) = \Theta\left(n \sum_{h=0}^{\lfloor \log n \rfloor} \frac{h}{2^h}\right)$

Using the identity $\sum_{h=0}^{\infty} \frac{h}{2^h} = 2$:

Therefore, the time complexity of build heap is: $\boxed{\Theta(n)}$

**Heap Sort:**
Heap Sort consists of two phases:
1. **Build a max-heap** from the input array: $\Theta(n)$
2. **Extract maximum elements** one by one:
   - We perform $n-1$ extract-max operations.
   - Each extract-max involves swapping the root with the last element and calling heapify: $\Theta(\log n)$
   - Total time for all extractions: $\Theta(n \log n)$

**Total Time Complexity:**
$$T(n) = \Theta(n) + \Theta(n \log n) = \boxed{\Theta(n \log n)}$$
