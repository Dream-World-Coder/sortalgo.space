# Selection Sort

**Time Complexity:** $O(n^2)$ for all cases
**Space Complexity:** $O(1)$ — _Sorts in-place_
**No of comparisons:** $O(n^2)$ for all cases
**Stability:** _Unstable_ in standard implementation.
Selection sort selects the minimum element from the unsorted portion and swaps it with the first unsorted element. This swap can move an element past other equal elements, breaking relative order.

---

**Algorithm**:
_Find the minimum element and place it at the beginning (correct position)._

A loop traverses all elements (`i`), considers it as `min_idx`, and an inner loop (`j`: `i+1` to `n`) updates `min_idx` if a smaller element is found. Finally, swap `arr[i]` with `arr[min_idx]`.

```python
def selection_sort(arr):
    n: int = len(arr)

    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j  # update min
        arr[i], arr[min_idx] = arr[min_idx], arr[i]  # swap i with min
```
