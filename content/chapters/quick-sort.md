# Quick Sort

**Time Complexity:**

- Best/Average: $O(n \log n)$
- Worst: $O(n^2)$ (when pivot is always min/max)
  **Space Complexity:** $O(\log n)$ (recursion stack)
  **Stability:** _Unstable_

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
