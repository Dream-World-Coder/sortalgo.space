# Bubble Sort

**Time Complexity:** $O(n^2)$ for all cases (standard)
**Space Complexity:** $O(1)$ — _In-place_
**No of swaps:** $O(n^2)$ for all cases
**Stability:** _Stable_
Bubble sort swaps only adjacent elements. When two elements are equal, no swap occurs → relative order preserved.

---

**Algorithm:**
Compare adjacent pairs; if the left is larger, swap and "bubble" it to the end. Sorted elements accumulate at the end.

```python
def bubble_sort(arr):
    n: int = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):  # last i elements are sorted
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
```

**optimised**

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
