<!--metadata
  title: "Counting Sort"
  authors: ["Subhajit Gorai"]
  dateCreated: "15/11/2025"
  dateEdited: "16/11/2025"
  description: "..."
  tags: ["sorting"]
  slug: "counting-sort"
-->

# Counting Sort

## $in\ making$

**Time Complexity:** $O(n + k)$ where `k` is range of input
**Space Complexity:** $O(k)$
**Stability:** _Can be stable_ (with proper implementation)

---

**When to use:**
When input values are integers in a **small, known range**.

---

**Algorithm (Placeholder):**

```python
def counting_sort(arr):
  # find maximum element
  max_val = max(arr)

  # create count array
  count = [0] * (max_val + 1)

  # store frequency of each element
  for num in arr:
    count[num] += 1

  # compute prefix sums
  for i in range(1, len(count)):
    count[i] += count[i - 1]

  # build output array
  output = [0] * len(arr)
  for num in reversed(arr):
    count[num] -= 1
    output[count[num]] = num

  return output
```

---

**Visualisation, Sorting [7, 3, 5, 2, 9]:**

```sh
COUNTING SORT VISUALIZATION
============================

Initial array:
+---+---+---+---+---+---+---+---+
| 2 | 5 | 3 | 0 | 2 | 3 | 0 | 3 |   <-- value
+---+---+---+---+---+---+---+---+
  0   1   2   3   4   5   6   7     <-- index

Range: min = 0, max = 5
Values present: 0, 2, 3, 5


========================================
STEP 1: COUNT FREQUENCIES
========================================

Scan array and count occurrences of each value:

Value 0: appears at indices 3, 6 → count = 2
Value 1: not present → count = 0
Value 2: appears at indices 0, 4 → count = 2
Value 3: appears at indices 2, 5, 7 → count = 3
Value 4: not present → count = 0
Value 5: appears at index 1 → count = 1

Count array (index = value, content = frequency):
+---+---+---+---+---+---+
| 2 | 0 | 2 | 3 | 0 | 1 |  <-- count
+---+---+---+---+---+---+
  0   1   2   3   4   5    <-- value

Interpretation:
- value 0 occurs 2 times
- value 1 occurs 0 times
- value 2 occurs 2 times
- value 3 occurs 3 times
- value 4 occurs 0 times
- value 5 occurs 1 time


========================================
STEP 2: CALCULATE CUMULATIVE COUNTS
========================================

Transform count array to show ending positions:
count[i] += count[i-1]

Initial:  [2, 0, 2, 3, 0, 1]

After i=1: count[1] = count[1] + count[0] = 0 + 2 = 2
          [2, 2, 2, 3, 0, 1]

After i=2: count[2] = count[2] + count[1] = 2 + 2 = 4
          [2, 2, 4, 3, 0, 1]

After i=3: count[3] = count[3] + count[2] = 3 + 4 = 7
          [2, 2, 4, 7, 0, 1]

After i=4: count[4] = count[4] + count[3] = 0 + 7 = 7
          [2, 2, 4, 7, 7, 1]

After i=5: count[5] = count[5] + count[4] = 1 + 7 = 8
          [2, 2, 4, 7, 7, 8]

Cumulative count array:
+---+---+---+---+---+---+
| 2 | 2 | 4 | 7 | 7 | 8 |  <-- cumulative count
+---+---+---+---+---+---+
  0   1   2   3   4   5    <-- value

Interpretation:
- values 0 end at position 2 (indices 0-1)
- values ≤1 end at position 2 (indices 0-1)
- values ≤2 end at position 4 (indices 0-3)
- values ≤3 end at position 7 (indices 0-6)
- values ≤4 end at position 7 (indices 0-6)
- values ≤5 end at position 8 (indices 0-7)


========================================
STEP 3: BUILD OUTPUT ARRAY
========================================

Process input array RIGHT TO LEFT (for stability):
Create output array of same size

Output array (initially empty):
+---+---+---+---+---+---+---+---+
|   |   |   |   |   |   |   |   |
+---+---+---+---+---+---+---+---+
  0   1   2   3   4   5   6   7


Process arr[7] = 3:
  count[3] = 7 → place at index 6 (count[3] - 1)
  Decrement count[3] to 6

+---+---+---+---+---+---+---+---+
|   |   |   |   |   |   | 3 |   |
+---+---+---+---+---+---+---+---+
  0   1   2   3   4   5   6   7

Count: [2, 2, 4, 6, 7, 8]


Process arr[6] = 0:
  count[0] = 2 → place at index 1 (count[0] - 1)
  Decrement count[0] to 1

+---+---+---+---+---+---+---+---+
|   | 0 |   |   |   |   | 3 |   |
+---+---+---+---+---+---+---+---+
  0   1   2   3   4   5   6   7

Count: [1, 2, 4, 6, 7, 8]


Process arr[5] = 3:
  count[3] = 6 → place at index 5 (count[3] - 1)
  Decrement count[3] to 5

+---+---+---+---+---+---+---+---+
|   | 0 |   |   |   | 3 | 3 |   |
+---+---+---+---+---+---+---+---+
  0   1   2   3   4   5   6   7

Count: [1, 2, 4, 5, 7, 8]


Process arr[4] = 2:
  count[2] = 4 → place at index 3 (count[2] - 1)
  Decrement count[2] to 3

+---+---+---+---+---+---+---+---+
|   | 0 |   | 2 |   | 3 | 3 |   |
+---+---+---+---+---+---+---+---+
  0   1   2   3   4   5   6   7

Count: [1, 2, 3, 5, 7, 8]


Process arr[3] = 0:
  count[0] = 1 → place at index 0 (count[0] - 1)
  Decrement count[0] to 0

+---+---+---+---+---+---+---+---+
| 0 | 0 |   | 2 |   | 3 | 3 |   |
+---+---+---+---+---+---+---+---+
  0   1   2   3   4   5   6   7

Count: [0, 2, 3, 5, 7, 8]


Process arr[2] = 3:
  count[3] = 5 → place at index 4 (count[3] - 1)
  Decrement count[3] to 4

+---+---+---+---+---+---+---+---+
| 0 | 0 |   | 2 | 3 | 3 | 3 |   |
+---+---+---+---+---+---+---+---+
  0   1   2   3   4   5   6   7

Count: [0, 2, 3, 4, 7, 8]


Process arr[1] = 5:
  count[5] = 8 → place at index 7 (count[5] - 1)
  Decrement count[5] to 7

+---+---+---+---+---+---+---+---+
| 0 | 0 |   | 2 | 3 | 3 | 3 | 5 |
+---+---+---+---+---+---+---+---+
  0   1   2   3   4   5   6   7

Count: [0, 2, 3, 4, 7, 7]


Process arr[0] = 2:
  count[2] = 3 → place at index 2 (count[2] - 1)
  Decrement count[2] to 2

+---+---+---+---+---+---+---+---+
| 0 | 0 | 2 | 2 | 3 | 3 | 3 | 5 |
+---+---+---+---+---+---+---+---+
  0   1   2   3   4   5   6   7

Count: [0, 2, 2, 4, 7, 7]


Finally sorted:
-----------------
+---+---+---+---+---+---+---+---+
| 0 | 0 | 2 | 2 | 3 | 3 | 3 | 5 |
+---+---+---+---+---+---+---+---+


Summary:
--------
Time Complexity: O(n + k)
- n = number of elements
- k = range of input (max - min + 1)

Space Complexity: O(n + k)
- count array of size k
- output array of size n
```
