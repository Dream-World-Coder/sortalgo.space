<!--metadata
  title: "Deep dive into Selection Sort"
  authors: ["Subhajit Gorai"]
  dateCreated: "06/10/2025"
  dateEdited: "17/10/2025"
  description: "Selection sort quick lookup, algorithm, code, Visualisation, Complexity Analysis"
  tags: ["selection sort", "sorting"]
  slug: "selection-sort"
-->

# Selection Sort

> Selection sort is an in-place, comparison-based sorting algorithm.
It repeatedly selects the minimum element and places it in its correct position.
Its time complexity is $O(n^2)$ in all cases, and it uses only $O(1)$ auxiliary space.

**Quick Look:**
  1. **Time Complexity:** $O(n^2)$ for all cases
  2. **Space Complexity:** $O(1)$ — _Sorts in-place_
  3. **No of comparisons:** $O(n^2)$ for all cases
  4. **Stability:** _Unstable_ in standard implementation. Selection sort selects the minimum element from the unsorted portion and swaps it with the first unsorted element. This swap can move an element past other equal elements, breaking relative order. [read more](stable-and-unstable-sort)

---

**Algorithm**:
  1. Suppose n is the length of the array. Start a loop for n times i.e. from index 0 to n-1, `i <- 0..n-1`
  2. set current_elm = arr[i]
  3. now find the minimum element from the rest of the array(arr[i+1..n-1]) that is lesser than the current element. store its index in a variable (here, min_idx).
  4. now swap current_elm and the minimum element `swap(arr[i], arr[min_idx])`

```python
def selection_sort(arr):
  n: int = len(arr)

  for i in range(n):
    min_idx = i # initialise minimum index as i

    for j in range(i+1, n): # loop iterator j <- i+1..n

      # update min_idx if lesser element found
      if arr[j] < arr[min_idx]:
        min_idx = j

    # swap current_elm with min_elem in arr[i+1..n-1]
    # i.e. swap(arr[i], arr[min_idx])
    arr[i], arr[min_idx] = arr[min_idx], arr[i]
```

---

**Visualisation, Sorting [7, 3, 5, 2, 9]:**

```sh
initial array:
+---+---+---+---+---+
| 7 | 3 | 5 | 2 | 9 |   <-- value
+---+---+---+---+---+
  0   1   2   3   4     <-- index

Now, the outer loop starts and these 3 steps will
execute for i = 0 to n-1 that is n times

iteration 1:
-----------------
  step 1: i = 0, j = i+1 = 1
  +---+---+---+---+---+
  | 7 | 3 | 5 | 2 | 9 |
  +---+---+---+---+---+
    ^   ^
  (i=0) (j=1)

  step 2: j will iterate through indexes 1 to n-1 and find the minimum
  +---+---+---+---+---+
  | 7 | 3 | 5 | 2 | 9 |
  +---+---+---+---+---+
    ^           ^
  (i=0)       (min)

  step: arr[i] and arr[min_idx] will be swapped
  +---+---+---+---+---+
  | 2 | 3 | 5 | 7 | 9 |
  +---+---+---+---+---+
    ^           ^
      swapped

iteration 2:
-----------------
  Remaining unsorted: 3, 5, 7, 9
  Minimum = 3 (already at index 1) → no swap.
  +---+---+---+---+---+
  | 2 | 3 | 5 | 7 | 9 |
  +---+---+---+---+---+
        ^   ^
      (i=1) (min)
  Nothing changes.

iteration 3:
-----------------
  Remaining: 5, 7, 9
  Minimum = 5 → already at index 2
  +---+---+---+---+---+
  | 2 | 3 | 5 | 7 | 9 |
  +---+---+---+---+---+
            ^   ^
         (i=2)(min)
  Nothing changes.

iteration 4:
-----------------
  Remaining: 7, 9
  Minimum = 7 → already at index 3
  +---+---+---+---+---+
  | 2 | 3 | 5 | 7 | 9 |
  +---+---+---+---+---+
                ^   ^
              (i=3)(min)
  Nothing changes.


Finally sorted:
-----------------
+---+---+---+---+---+
| 2 | 3 | 5 | 7 | 9 |
+---+---+---+---+---+
```

---

**Complexity Analysis:**

In Selection Sort, we repeatedly select the minimum element from the unsorted part of the array.

- The outer loop runs **$n$** times.
- The inner loop runs **$n-1, n-2, \dots, 1$** times.

Therefore, the total number of comparisons is: $\Theta\left(\sum_{i=1}^{n-1} i \right)$
This is the well-known sum of the first $(n-1)$ natural numbers: $\Theta\left(\frac{n(n-1)}{2}\right)$
Thus, the time complexity becomes: $\boxed{\Theta(n^2)}$
