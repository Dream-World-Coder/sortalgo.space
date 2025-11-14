# Heap Sort

**Time Complexity:** $O(n \log n)$ for all cases
**Space Complexity:** $O(1)$ — _in-place_
**Stability:** _Unstable_ (heap operations can reorder equal elements)

---

**Algorithm:**

1. Build a max-heap from the array (`heapify`).
2. Repeatedly extract the maximum element (root) and rebuild heap.

---

```python
import heapq

def heapsort(arr):
    heapq.heapify(arr)  # converts list into min-heap in-place
    res = []
    for _ in range(len(arr)):
        res.append(heapq.heappop(arr))
    return res
```
