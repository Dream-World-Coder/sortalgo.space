<!--metadata
  title: "Radix Sort"
  authors: ["Subhajit Gorai"]
  dateCreated: "15/11/2025"
  dateEdited: "16/11/2025"
  description: "..."
  tags: ["sorting"]
  slug: "radix-sort"
-->

# Radix Sort

**Time Complexity:** $O(d \cdot (n + b))$

- `d` = number of digits
- `b` = base (usually 10)
  **Space Complexity:** $O(n + b)$
  **Stability:** _Stable_ (uses stable subroutine like counting sort)

---

**Algorithm (LSD - Least Significant Digit):**
Process digits from right to left using a stable sort (e.g., counting sort).

```python
def radix_sort(arr):
  if not arr:
    return arr

  # find maximum number to know number of digits
  max_val = max(arr)

  exp = 1  # exponent (1s, 10s, 100s...)
  while max_val // exp > 0:
    # counting sort by digit
    count = [0] * 10
    output = [0] * len(arr)

    # count occurrences
    for num in arr:
      digit = (num // exp) % 10
      count[digit] += 1

    # prefix sums
    for i in range(1, 10):
      count[i] += count[i - 1]

    # build output (stable)
    for num in reversed(arr):
      digit = (num // exp) % 10
      count[digit] -= 1
      output[count[digit]] = num

    arr = output
    exp *= 10

  return arr
```

---

**Visualisation, Sorting [7, 3, 5, 2, 9]:**

```sh
RADIX SORT VISUALIZATION
=========================

Algorithm: Sort numbers digit by digit from least significant to most significant.
           Uses counting sort as subroutine for each digit.
           Works for non-negative integers.

Initial array:
+-----+-----+-----+-----+-----+
| 170 | 045 | 075 | 090 | 002 |   <-- value (padded to show digits)
+-----+-----+-----+-----+-----+
   0     1     2     3     4      <-- index

Note: Using different numbers to show radix sort properly
      Original: [170, 45, 75, 90, 2]


Maximum number = 170 (3 digits)
Therefore, we need 3 passes (ones, tens, hundreds)


========================================
PASS 1: Sort by ONES place (digit 0)
========================================

Extract ones digit:
+-----+-----+-----+-----+-----+
| 170 | 045 | 075 | 090 | 002 |
+-----+-----+-----+-----+-----+
    0     5     5     0     2    ← ones digits

Counting sort by ones digit:

Count array for digits 0-9:
digit:  0  1  2  3  4  5  6  7  8  9
count: [2, 0, 1, 0, 0, 2, 0, 0, 0, 0]

Cumulative count (positions):
digit:  0  1  2  3  4  5  6  7  8  9
posn:  [2, 2, 3, 3, 3, 5, 5, 5, 5, 5]

Place elements in sorted order:
- 170 (ones=0) → position 0
- 090 (ones=0) → position 1
- 002 (ones=2) → position 2
- 045 (ones=5) → position 3
- 075 (ones=5) → position 4

After Pass 1:
+-----+-----+-----+-----+-----+
| 170 | 090 | 002 | 045 | 075 |  ← sorted by ones place
+-----+-----+-----+-----+-----+
    0     0     2     5     5    ← ones digits in order


========================================
PASS 2: Sort by TENS place (digit 1)
========================================

Extract tens digit:
+-----+-----+-----+-----+-----+
| 170 | 090 | 002 | 045 | 075 |
+-----+-----+-----+-----+-----+
    7     9     0     4     7    ← tens digits

Counting sort by tens digit:

Count array for digits 0-9:
digit:  0  1  2  3  4  5  6  7  8  9
count: [1, 0, 0, 0, 1, 0, 0, 2, 0, 1]

Cumulative count (positions):
digit:  0  1  2  3  4  5  6  7  8  9
posn:  [1, 1, 1, 1, 2, 2, 2, 4, 4, 5]

Place elements (preserve stability from Pass 1):
- 002 (tens=0) → position 0
- 045 (tens=4) → position 1
- 170 (tens=7) → position 2
- 075 (tens=7) → position 3
- 090 (tens=9) → position 4

After Pass 2:
+-----+-----+-----+-----+-----+
| 002 | 045 | 170 | 075 | 090 |  ← sorted by tens place
+-----+-----+-----+-----+-----+
    0     4     7     7     9    ← tens digits in order


========================================
PASS 3: Sort by HUNDREDS place (digit 2)
========================================

Extract hundreds digit:
+-----+-----+-----+-----+-----+
| 002 | 045 | 170 | 075 | 090 |
+-----+-----+-----+-----+-----+
    0     0     1     0     0    ← hundreds digits

Counting sort by hundreds digit:

Count array for digits 0-9:
digit:  0  1  2  3  4  5  6  7  8  9
count: [4, 1, 0, 0, 0, 0, 0, 0, 0, 0]

Cumulative count (positions):
digit:  0  1  2  3  4  5  6  7  8  9
posn:  [4, 5, 5, 5, 5, 5, 5, 5, 5, 5]

Place elements (preserve stability from Pass 2):
- 002 (hundreds=0) → position 0
- 045 (hundreds=0) → position 1
- 075 (hundreds=0) → position 2
- 090 (hundreds=0) → position 3
- 170 (hundreds=1) → position 4

After Pass 3:
+-----+-----+-----+-----+-----+
| 002 | 045 | 075 | 090 | 170 |  ← FULLY SORTED
+-----+-----+-----+-----+-----+
    0     0     0     0     1    ← hundreds digits in order


Finally sorted:
-----------------
+-----+-----+-----+-----+-----+
| 002 | 045 | 075 | 090 | 170 |
+-----+-----+-----+-----+-----+

Or in original form:
+-----+-----+-----+-----+-----+
|  2  | 45  | 75  | 90  | 170 |
+-----+-----+-----+-----+-----+


Summary:
--------
Time Complexity: O(d × (n + k))
- d = number of digits in max number (3 in this case)
- n = number of elements (5)
- k = range of digit values (10 for decimal: 0-9)
- Here: O(3 × (5 + 10)) = O(45) ≈ O(n)

Space Complexity: O(n + k)
- Extra space for counting array and output array

Key insights:
- NOT a comparison-based sort (doesn't compare elements)
- Stable sort (preserves relative order of equal elements)
- Efficient for integers with limited digits
- Processes least significant digit first (LSD Radix Sort)
- Each pass uses counting sort on current digit
```
