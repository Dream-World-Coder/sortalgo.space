# Merge Sort

**Time Complexity:** $O(n \log n)$ for all cases
**Space Complexity:** $O(n)$
**Stability:** _Stable_

> Used in **external sorting** for large datasets that don’t fit in RAM.

---

**Algorithm (Divide & Conquer):**

1. Divide array into two halves.
2. Recursively sort both halves.
3. Merge the sorted halves.

---

### C Implementation

```c
#include <stdio.h>
#include <stdlib.h>

void merge(int *arr, int start, int mid, int end) {
    int i = start;
    int j = mid + 1;
    int *tmp_arr = (int *)malloc((end - start + 1) * sizeof(int));
    int k = 0;

    while (i <= mid && j <= end) {
        if (arr[i] < arr[j]) {
            tmp_arr[k++] = arr[i++];
        } else {
            tmp_arr[k++] = arr[j++];
        }
    }

    while (i <= mid) tmp_arr[k++] = arr[i++];
    while (j <= end) tmp_arr[k++] = arr[j++];

    for (int i = 0; i < (end - start + 1); i++) {
        arr[i + start] = tmp_arr[i];
    }
    free(tmp_arr);
}

void merge_sort(int *arr, int start, int end) {
    if (start < end) {
        int mid = start + (end - start) / 2;
        merge_sort(arr, start, mid);
        merge_sort(arr, mid + 1, end);
        merge(arr, start, mid, end);
    }
}
```

**python**

```py
def merge(arr: list[int], start: int, mid: int, end: int) -> None:
    i, j = start, mid + 1
    tmp_arr = []

    while i <= mid and j <= end:
        if arr[i] < arr[j]:
            tmp_arr.append(arr[i])
            i += 1
        else:
            tmp_arr.append(arr[j])
            j += 1

    while i <= mid:
        tmp_arr.append(arr[i])
        i += 1
    while j <= end:
        tmp_arr.append(arr[j])
        j += 1

    for idx in range(len(tmp_arr)):
        arr[start + idx] = tmp_arr[idx]

def merge_sort(arr: list[int], start: int, end: int) -> None:
    if start < end:
        mid = start + (end - start) // 2
        merge_sort(arr, start, mid)
        merge_sort(arr, mid + 1, end)
        merge(arr, start, mid, end)
```
