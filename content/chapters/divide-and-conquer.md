# Sorting with Divide and Conquer

## $in\ making$

## What if we break the problem into smaller pieces?

So we've seen how extracting minimas can sort an array. But is there another way to think about sorting?

Let's step back. Sorting a large array seems hard. But what about sorting a really small array?

How would you sort an array with just 2 elements? Pretty easy, right? Just compare them and swap if needed.

What about 1 element? Even easier – it's already sorted!

Now here's an interesting thought: **what if we could somehow break our big array into these tiny, easy-to-sort pieces?**

Think about it for a moment. If you had two sorted arrays, could you combine them into one sorted array?

Let's say you have:
- Array A: `[2, 5, 8, 9]` (already sorted)
- Array B: `[1, 3, 6, 7]` (already sorted)

How would you merge them into a single sorted array?

Can't think of a way? Let me give you a hint: which element should definitely be first in the merged result?

It has to be the smallest element overall, right? And since both arrays are sorted, the smallest element must be either the first element of A or the first element of B!

So compare `A[0]` (which is 2) with `B[0]` (which is 1). The smaller one (1) goes first.

Now what's the next smallest? It's either the current first element of A (still 2) or the next element of B (now 3).

You see the pattern? We just keep comparing the "fronts" of both arrays and pick the smaller one each time!

Let's see this in action:

```sh
A: [2, 5, 8, 9]     B: [1, 3, 6, 7]     Result: []
   ^                   ^

Compare 2 vs 1 → pick 1

A: [2, 5, 8, 9]     B: [3, 6, 7]        Result: [1]
   ^                   ^

Compare 2 vs 3 → pick 2

A: [5, 8, 9]        B: [3, 6, 7]        Result: [1, 2]
   ^                   ^

Compare 5 vs 3 → pick 3

A: [5, 8, 9]        B: [6, 7]           Result: [1, 2, 3]
   ^                   ^

Compare 5 vs 6 → pick 5

A: [8, 9]           B: [6, 7]           Result: [1, 2, 3, 5]
   ^                   ^

Compare 8 vs 6 → pick 6

A: [8, 9]           B: [7]              Result: [1, 2, 3, 5, 6]
   ^                   ^

Compare 8 vs 7 → pick 7

A: [8, 9]           B: []               Result: [1, 2, 3, 5, 6, 7]
   ^

B is empty, append remaining A

Result: [1, 2, 3, 5, 6, 7, 8, 9]
```

Perfect! So merging two sorted arrays is actually pretty straightforward. Here's the code:

```python
def merge(left, right):
    """Merge two sorted arrays into one sorted array"""
    result = []
    i = j = 0

    # compare elements from both arrays
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    # append remaining elements (if any)
    result.extend(left[i:])
    result.extend(right[j:])

    return result
```

**Time to merge:** O(N + M) where N and M are the lengths of the two arrays. Basically, we look at each element once.

Now comes the clever part. We can merge sorted arrays efficiently. But our original array is unsorted!

So here's the big idea: **what if we split the array in half, somehow sort each half, and then merge them?**

```sh
Original: [8, 4, 7, 2, 5, 3, 1, 6]

Split into halves:
Left:  [8, 4, 7, 2]       Right: [5, 3, 1, 6]
```

But wait, how do we sort each half? The halves are still pretty big and unsorted!

Here's where it gets beautiful: **use the same approach recursively!**

To sort `[8, 4, 7, 2]`, split it again:
- Left: `[8, 4]`
- Right: `[7, 2]`

To sort `[8, 4]`, split again:
- Left: `[8]` ← **This is just 1 element, already sorted!**
- Right: `[4]` ← **This is also 1 element, already sorted!**

Now merge `[8]` and `[4]` → get `[4, 8]`

Similarly, split `[7, 2]`:
- Left: `[7]` → sorted
- Right: `[2]` → sorted
- Merge → `[2, 7]`

Now merge `[4, 8]` and `[2, 7]` → get `[2, 4, 7, 8]`

Do the same for the right half `[5, 3, 1, 6]` → get `[1, 3, 5, 6]`

Finally, merge `[2, 4, 7, 8]` and `[1, 3, 5, 6]` → get `[1, 2, 3, 4, 5, 6, 7, 8]`

**We sorted the entire array!**

Let's visualize the complete process:

```sh
                    [8, 4, 7, 2, 5, 3, 1, 6]
                    /                      \
            [8, 4, 7, 2]                [5, 3, 1, 6]
            /          \                /          \
        [8, 4]      [7, 2]          [5, 3]      [1, 6]
        /    \      /    \          /    \      /    \
      [8]   [4]   [7]   [2]       [5]   [3]   [1]   [6]
        \    /      \    /          \    /      \    /
        [4, 8]      [2, 7]          [3, 5]      [1, 6]
            \          /                \          /
            [2, 4, 7, 8]                [1, 3, 5, 6]
                    \                      /
                    [1, 2, 3, 4, 5, 6, 7, 8]
```

The strategy is simple:
1. **Divide:** Split the array in half
2. **Conquer:** Recursively sort each half
3. **Combine:** Merge the two sorted halves

This is the **Divide and Conquer** approach!

Here's the complete code:

```python
def merge_sort(array):
    """Sort array using merge sort"""
    # base case: arrays with 0 or 1 element are already sorted
    if len(array) <= 1:
        return array

    # divide: split array in half
    mid = len(array) // 2
    left_half = array[:mid]
    right_half = array[mid:]

    # conquer: recursively sort each half
    sorted_left = merge_sort(left_half)
    sorted_right = merge_sort(right_half)

    # combine: merge the sorted halves
    return merge(sorted_left, sorted_right)

def merge(left, right):
    """Merge two sorted arrays"""
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])

    return result
```

## Analyzing Time Complexity

Let's think about how much work we're doing:

At each level of the recursion tree:
- We divide the array (takes O(1) time)
- We merge subarrays (takes O(N) time total at each level)

How many levels are there? Each time we divide by 2, so we have **log N levels** (the height of the tree).

**Total time: O(N) work per level × O(log N) levels = O(N log N)**

**Space complexity:** We need extra space for the merged arrays, so O(N).

That's it! You just learned **Merge Sort**!

It's one of the most elegant sorting algorithms because it follows such a clean principle: break the problem down until it's trivial, then combine the solutions. And it achieves O(N log N) time complexity, which is optimal for comparison-based sorting!

The divide and conquer technique isn't just for sorting – it's a powerful problem-solving paradigm used in binary search, quick sort, and countless other algorithms. The key insight? **Complex problems often become simple when broken into smaller pieces!**
