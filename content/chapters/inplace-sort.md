## In-Place Sorting

### Definition

> **In-place sorting** is a sorting algorithm that **requires only `O(1)` extra space** (constant auxiliary space), meaning it transforms the input array using **no additional array proportional to input size**.

- **Modifies the original array**
- **No significant extra memory** beyond a few variables
- **Space Complexity: `O(1)` auxiliary**

---

### Key Characteristics

| Feature        | In-Place            | Not In-Place             |
| -------------- | ------------------- | ------------------------ |
| Extra Space    | `O(1)`              | `O(n)` or more           |
| Modifies Input | Yes                 | Usually No (or optional) |
| Example        | QuickSort, HeapSort | MergeSort                |

---

### Common In-Place Sorting Algorithms

| Algorithm          | In-Place? | Time Complexity                   | Stability | Notes                             |
| ------------------ | --------- | --------------------------------- | --------- | --------------------------------- |
| **QuickSort**      | Yes       | `O(n log n)` avg<br>`O(n²)` worst | Unstable  | Fastest in practice               |
| **HeapSort**       | Yes       | `O(n log n)`                      | Unstable  | Guaranteed performance            |
| **Selection Sort** | Yes       | `O(n²)`                           | Unstable  | Minimal swaps                     |
| **Insertion Sort** | Yes       | `O(n²)`                           | Stable    | Efficient for small/nearly sorted |
| **Bubble Sort**    | Yes       | `O(n²)`                           | Stable    | Simple but slow                   |
| **Cycle Sort**     | Yes       | `O(n²)`                           | Unstable  | Minimal writes                    |

---

### Not In-Place (Counterexamples)

| Algorithm         | Extra Space        | Why Not In-Place             |
| ----------------- | ------------------ | ---------------------------- |
| **Merge Sort**    | `O(n)`             | Needs temp array for merging |
| **Counting Sort** | `O(k)` (k = range) | Output + count array         |
| **Radix Sort**    | `O(n + k)`         | Buckets or digit arrays      |

---

### Visual: In-Place vs Not

```python
# In-Place: QuickSort (modifies arr)
arr = [5, 2, 9, 1, 5]
quicksort(arr, 0, len(arr)-1)
# arr becomes [1, 2, 5, 5, 9] ← original changed

# Not In-Place: MergeSort
sorted_arr = merge_sort(arr)  # returns new array
# original arr unchanged
```

---

### Why Use In-Place?

| Advantage            | Explanation                                 |
| -------------------- | ------------------------------------------- |
| **Memory Efficient** | Crucial in embedded systems, large datasets |
| **Cache Friendly**   | Better locality → faster                    |
| **No GC Overhead**   | No large temp arrays                        |

> Example: Sorting **1 billion integers** → `O(n)` space = **4+ GB** extra!

---

### Trade-offs

| In-Place                    | Not In-Place      |
| --------------------------- | ----------------- |
| Often **unstable**          | Can be **stable** |
| Harder to implement         | Cleaner logic     |
| Risk of bugs (index errors) | Safer             |

---

### Real-World Usage

| Language       | Default Sort                 | In-Place?                                         |
| -------------- | ---------------------------- | ------------------------------------------------- |
| **C++**        | `std::sort`                  | Yes (introsort: Quick + Heap)                     |
| **Python**     | `list.sort()`                | Yes (Timsort, but uses O(n) internally)           |
| **Java**       | `Arrays.sort()` (primitives) | Yes (Dual-Pivot QuickSort)                        |
| **JavaScript** | `Array.sort()`               | **Implementation-dependent** (often not in-place) |

> **Python `list.sort()` is in-place**, but **Timsort uses O(n) temp space** → technically **not O(1)**, but still called "in-place" in practice.

---

### True O(1) In-Place Example: Selection Sort

```python
def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr  # modifies in-place
```

- Only uses `i`, `j`, `min_idx` → **O(1) space**

---

### Can Merge Sort Be In-Place?

**Standard Merge Sort**: No → needs `O(n)` temp array

**In-Place Merge Sort**: Exists, but:

- Complex
- `O(n log n)` time → becomes `O(n²)` in practice
- Not cache-efficient
- **Rarely used**

---

### Quick Test: Is It In-Place?

```python
arr = [3, 1, 4, 1, 5]
arr.sort()          # In-place? → YES (modifies arr)
sorted(arr)         # In-place? → NO (returns new list)
```

```cpp
vector<int> v = {3,1,4};
sort(v.begin(), v.end());  // In-place → YES
```

---

### Summary Table

| Algorithm        | In-Place | Space      | Time (Worst) | Stable |
| ---------------- | -------- | ---------- | ------------ | ------ |
| QuickSort        | Yes      | O(log n)\* | O(n²)        | No     |
| HeapSort         | Yes      | O(1)       | O(n log n)   | No     |
| Selection Sort   | Yes      | O(1)       | O(n²)        | No     |
| Insertion Sort   | Yes      | O(1)       | O(n²)        | Yes    |
| Merge Sort       | No       | O(n)       | O(n log n)   | Yes    |
| Timsort (Python) | Yes\*\*  | O(n)       | O(n log n)   | Yes    |

> `*` Recursion stack
> `**` Python `list.sort()` is in-place but uses O(n) temp

---

### When to Use In-Place?

| Use Case          | Choose              |
| ----------------- | ------------------- |
| Limited RAM       | In-place            |
| Need stability    | Merge/Timsort       |
| Max speed (cache) | QuickSort/HeapSort  |
| Educational       | Selection/Insertion |

---

**Rule of Thumb**:

> **Use in-place sorts when memory is tight or speed is critical.**
> **Use non-in-place (like Merge Sort) when you need stability or simplicity.**
