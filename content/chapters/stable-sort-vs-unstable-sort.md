## Stable vs. Unstable Sorting

### Key Difference

| Property                             | **Stable Sort**                                                                                                                        | **Unstable Sort**                                     |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **Relative order of equal elements** | Preserved                                                                                                                              | Not preserved                                         |
| **Definition**                       | If two elements `A` and `B` have the same key, and `A` appears before `B` in the input, then `A` will appear before `B` in the output. | No such guarantee. Equal elements may swap positions. |

---

### Visual Example

**Input Array (with indices):**

```
Index:  0   1   2   3   4
Value:  3a  1   3b  2   1
```

_(Note: `3a` and `3b` are equal in value, but distinct objects)_

#### Stable Sort → Output:

```
1   1   2   3a  3b
```

→ `3a` still before `3b`

#### Unstable Sort → Output (possible):

```
1   1   2   3b  3a
```

→ `3b` appears before `3a` — order not preserved

---

### Common Sorting Algorithms

| Algorithm             | Stability | Time Complexity (Worst) | Space Complexity | Use Case                         |
| --------------------- | --------- | ----------------------- | ---------------- | -------------------------------- |
| **Merge Sort**        | Stable    | O(n log n)              | O(n)             | External sorting, need stability |
| **Quick Sort**        | Unstable  | O(n²)                   | O(log n)         | In-place, fast average case      |
| **Heap Sort**         | Unstable  | O(n log n)              | O(1)             | Priority queues                  |
| **Insertion Sort**    | Stable    | O(n²)                   | O(1)             | Small or nearly sorted data      |
| **Selection Sort**    | Unstable  | O(n²)                   | O(1)             | Minimal writes                   |
| **Bubble Sort**       | Stable    | O(n²)                   | O(1)             | Educational                      |
| **Tim Sort** (Python) | Stable    | O(n log n)              | O(n)             | General-purpose                  |
| **Introsort** (C++)   | Unstable  | O(n log n)              | O(log n)         | High performance                 |

---

### Why Stability Matters

#### Use Stable Sort When:

- Sorting **composite objects** by one field (e.g., sort people by age, but keep original order for same age)
- **Multi-level sorting** (sort by `last_name`, then `first_name`)
- Preserving **insertion order** is meaningful

```python
# Python's sort is stable
people = [('Alice', 25), ('Bob', 30), ('Charlie', 25)]
people.sort(key=lambda x: x[1])  # Sort by age
# Output: [('Alice', 25), ('Charlie', 25), ('Bob', 30)]
# Alice before Charlie (original order preserved)
```

#### Unstable is Fine When:

- Equal elements are **indistinguishable**
- You prioritize **speed** or **space**
- Using in-place algorithms like QuickSort

---

### Practical Tip

> **Use stable sort if in doubt** — it’s safer.
> But **unstable sorts** (like QuickSort) are often faster in practice due to fewer comparisons/swaps.

---

### Quick Test: Is This Sort Stable?

```python
arr = [(1, 'A'), (2, 'B'), (1, 'C')]
arr.sort(key=lambda x: x[0])  # Python's Timsort → stable
# Result: [(1, 'A'), (1, 'C'), (2, 'B')] → Yes, stable!
```

---

**Summary**:

| When to Use             | Choose                             |
| ----------------------- | ---------------------------------- |
| Need order preservation | **Stable** (Merge, Tim, Insertion) |
| Need speed/space        | **Unstable** (Quick, Heap)         |
| General-purpose         | **Stable** (Python, Java)          |

> **Rule of Thumb**: _Python & Java default sorts are stable. C++ `std::sort` is unstable (but `std::stable_sort` exists)._

```cpp
// C++ Example
vector<pair<int, string>> v = {{1,"X"}, {2,"Y"}, {1,"Z"}};
stable_sort(v.begin(), v.end());  // Keeps X before Z
// vs
sort(v.begin(), v.end());         // May swap X and Z
```

---
