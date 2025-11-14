# Insertion Sort

**Time Complexity:** $O(n)$ best, $O(n^2)$ worst
**Space Complexity:** $O(1)$ — _in-place_
**Stability:** _Stable_ (shifts adjacent elements like bubble sort)

---

**Algorithm:**
Start from the second element (`i = 1`). For each `i`, insert `arr[i]` into the sorted portion `arr[0..i-1]` by shifting larger elements right.

```python
def insertion_sort(arr):
    n: int = len(arr)

    for i in range(1, n):
        curr = arr[i]
        for j in range(i - 1, -1, -1):  # j: from i-1 to 0
            if arr[j] > curr:
                arr[j + 1] = arr[j]  # shift right
            else:
                arr[j + 1] = curr   # insert here
                break
        else:
            arr[0] = curr  # if loop didn't break, insert at start
```
