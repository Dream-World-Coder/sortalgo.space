<!--metadata
  title: "Bucket Sort"
  authors: ["Subhajit Gorai"]
  dateCreated: "15/11/2025"
  dateEdited: "16/11/2025"
  description: "..."
  tags: ["sorting"]
  slug: "bucket-sort"
-->

# Bucket Sort

**Time Complexity:**

- Average: $O(n + k)$
- Worst: $O(n^2)$
  **Space Complexity:** $O(n + k)$
  **Stability:** _Can be stable_

---

**When to use:**
Input is **uniformly distributed** over a range.

---

**Algorithm:**

1. Create `k` empty buckets.
2. Distribute elements into buckets based on value.
3. Sort each bucket (e.g., with insertion sort).
4. Concatenate buckets.

```python
def bucket_sort(arr):
  if not arr:
    return arr

  # create buckets
  buckets = [[] for _ in range(len(arr))]

  # put array elements in buckets
  for x in arr:
    index = int(x * len(arr))   # works for 0 <= x < 1
    buckets[index].append(x)

  # sort each bucket and concatenate
  result = []
  for b in buckets:
    result.extend(sorted(b))

  return result
```
---

**Visualisation, Sorting [7, 3, 5, 2, 9]:**

```sh
BUCKET SORT VISUALIZATION
==========================

Algorithm: 1) Divide range into buckets
           2) Distribute elements into buckets
           3) Sort each bucket individually
           4) Concatenate all buckets
           Works well for uniformly distributed data

Initial array (using decimals for better demonstration):
+------+------+------+------+------+
| 0.78 | 0.17 | 0.39 | 0.26 | 0.72 |   <-- value
+------+------+------+------+------+
   0      1      2      3      4       <-- index

Note: Using values in range [0, 1) for classic bucket sort
      With 5 buckets, each bucket covers range of 0.2


========================================
STEP 1: CREATE BUCKETS
========================================

Number of buckets = 5 (typically n or √n)
Bucket ranges:
  Bucket 0: [0.0, 0.2)
  Bucket 1: [0.2, 0.4)
  Bucket 2: [0.4, 0.6)
  Bucket 3: [0.6, 0.8)
  Bucket 4: [0.8, 1.0)

Initial buckets (empty):
+---+    +---+    +---+    +---+    +---+
| 0 |    | 1 |    | 2 |    | 3 |    | 4 |
+---+    +---+    +---+    +---+    +---+
 [ ]      [ ]      [ ]      [ ]      [ ]


========================================
STEP 2: DISTRIBUTE ELEMENTS INTO BUCKETS
========================================

Formula: bucket_index = floor(value × num_buckets)

Element 0.78:
  bucket_index = floor(0.78 × 5) = floor(3.9) = 3
  Place in Bucket 3

+---+    +---+    +---+    +------+    +---+
| 0 |    | 1 |    | 2 |    |  3   |    | 4 |
+---+    +---+    +---+    +------+    +---+
 [ ]      [ ]      [ ]     [0.78]      [ ]


Element 0.17:
  bucket_index = floor(0.17 × 5) = floor(0.85) = 0
  Place in Bucket 0

+------+    +---+    +---+    +------+    +---+
|  0   |    | 1 |    | 2 |    |  3   |    | 4 |
+------+    +---+    +---+    +------+    +---+
[0.17]      [ ]      [ ]     [0.78]      [ ]


Element 0.39:
  bucket_index = floor(0.39 × 5) = floor(1.95) = 1
  Place in Bucket 1

+------+    +------+    +---+    +------+    +---+
|  0   |    |  1   |    | 2 |    |  3   |    | 4 |
+------+    +------+    +---+    +------+    +---+
[0.17]     [0.39]       [ ]     [0.78]      [ ]


Element 0.26:
  bucket_index = floor(0.26 × 5) = floor(1.3) = 1
  Place in Bucket 1

+------+    +-----------+    +---+    +------+    +---+
|  0   |    |     1     |    | 2 |    |  3   |    | 4 |
+------+    +-----------+    +---+    +------+    +---+
[0.17]     [0.39, 0.26]      [ ]     [0.78]      [ ]


Element 0.72:
  bucket_index = floor(0.72 × 5) = floor(3.6) = 3
  Place in Bucket 3

+------+    +-----------+    +---+    +-----------+    +---+
|  0   |    |     1     |    | 2 |    |     3     |    | 4 |
+------+    +-----------+    +---+    +-----------+    +---+
[0.17]     [0.39, 0.26]      [ ]     [0.78, 0.72]     [ ]


========================================
STEP 3: SORT EACH BUCKET
========================================
(Using insertion sort for small buckets)

Bucket 0: [0.17]
  Already sorted (single element)
  → [0.17]

Bucket 1: [0.39, 0.26]
  Compare 0.39 and 0.26: 0.26 < 0.39 → swap
  → [0.26, 0.39]

Bucket 2: []
  Empty
  → []

Bucket 3: [0.78, 0.72]
  Compare 0.78 and 0.72: 0.72 < 0.78 → swap
  → [0.72, 0.78]

Bucket 4: []
  Empty
  → []

After sorting each bucket:
+------+    +-----------+    +---+    +-----------+    +---+
|  0   |    |     1     |    | 2 |    |     3     |    | 4 |
+------+    +-----------+    +---+    +-----------+    +---+
[0.17]     [0.26, 0.39]      [ ]     [0.72, 0.78]     [ ]
  ✓            ✓              ✓            ✓           ✓
sorted       sorted        sorted       sorted      sorted


========================================
STEP 4: CONCATENATE ALL BUCKETS
========================================

Concatenate: Bucket 0 + Bucket 1 + Bucket 2 + Bucket 3 + Bucket 4

+------+------+------+------+------+
| 0.17 | 0.26 | 0.39 | 0.72 | 0.78 |
+------+------+------+------+------+
  from    from    from    from    from
  B0      B1      B1      B3      B3


Finally sorted:
-----------------
+------+------+------+------+------+
| 0.17 | 0.26 | 0.39 | 0.72 | 0.78 |
+------+------+------+------+------+


========================================
EXAMPLE WITH INTEGERS
========================================

For integers, we can adapt the algorithm:
Array: [29, 25, 3, 49, 9, 37, 21, 43]
Range: 3 to 49, span = 46
Buckets: 5

Bucket ranges:
  Bucket 0: [3, 12)    → [3, 9]
  Bucket 1: [12, 21)   → [21]
  Bucket 2: [21, 30)   → [21, 25, 29]
  Bucket 3: [30, 39)   → [37]
  Bucket 4: [39, 49]   → [43, 49]

After sorting each bucket:
  Bucket 0: [3, 9]
  Bucket 1: [21]
  Bucket 2: [21, 25, 29]
  Bucket 3: [37]
  Bucket 4: [43, 49]

Result: [3, 9, 21, 21, 25, 29, 37, 43, 49]


Summary:
--------
Time Complexity:
- Average: O(n + k) where k = number of buckets
- Worst: O(n²) if all elements go to one bucket
- Best: O(n) when uniformly distributed

Space Complexity: O(n + k)

Key insights:
- Excellent for uniformly distributed data
- Performance depends on distribution quality
- Number of buckets affects efficiency
- Each bucket sorted independently (parallelizable!)
- Not comparison-based for distribution step
```
