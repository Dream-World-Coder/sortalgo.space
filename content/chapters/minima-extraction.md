<!--metadata
  title: "Minima Extraction as Sorting Technique"
  authors: ["Subhajit Gorai"]
  dateCreated: "20/10/2025"
  dateEdited: "22/11/2025"
  description: "How to sort, selection sort, heap sort, algorithm, code, visualisation"
  tags: ["selection sort", "heap sort", "sorting", "visualisation", "code"]
  slug: "minima-extraction"
-->

# Sorting with Minima Extraction

## How can we sort an array?

In sorting, the expectation from the output is quite simple: all progressive elements will be <= (or >= for descending) than the current element. Let's stick to ascending order for now. So how to sort? Can you think of an algorithm?

Can't think of a way?

Hmm, then try to guess what will be the first element of the sorted result.

Since all other elements are greater than or equal to it, it will definitely be the smallest element.

That's it, you just got the first item of the expected output.

Now how to get it through code?

```python
def extractMin(array):
    N = len(array)
    # start minIndex with smallest index
    minIndex = 0
    for index in range(N): # index <- 0..N-1
        # update minIndex if smaller element is found
        if array[index] < array[minIndex]:
            minIndex = index
    return minIndex
```

So now that the first element of the sorted output is achieved, try guessing the next.

Yes, it will be an element that is smaller than (or equal to) all other elements & greater than (or equal to) the first element.

So it's the second smallest now.

How to extract it then? The `extractMin` function is definitely failing here. It's always going to return the smallest.

But if our array did not have the current smallest, then what would `extractMin` return?

It's the 2nd smallest!

So just remove (or somehow avoid accounting for) the smallest element. Then you will get the second element through `extractMin`.

So the second element is also done.

How about the 3rd element? You guessed it right, it's the 3rd minima.

Thus we can observe that the element at position i is the ith minima.

So if we can find these ith minimas, our problem is solved. We will achieve our target of sorting.

Let's do it through code:

```python
def sort_by_minima(array):
    sorted_array = []
    working_array = array.copy()  # work on a copy

    N = len(working_array)
    for i in range(N):
        # extract the minimum and add to sorted array
        min_index = extractMin(working_array);

        # add item in sorted array
        sorted_array.append(working_array[min_index])

        # remove the extracted minimum
        working_array.pop(min_index)

    return sorted_array
```

Now this works, but notice something? We're creating a new array and repeatedly removing elements. That's kinda inefficient in space – we're using O(N) auxiliary space just to hold a copy of the array.

Can we do better? Can we sort **in place**?

Think about it: instead of physically removing elements, what if we just keep track of which elements we've already "used" as minimas?

Here's the idea: imagine dividing the array into two parts – a sorted part at the beginning and an unsorted part at the end. Initially, the sorted part is empty (everything is unsorted). In each iteration:
1. Find the minimum from the unsorted part
2. Swap it with the first element of the unsorted part
3. Now that element becomes part of the sorted section

Let's see this in code:

```python
def selection_sort(array):
    N = len(array)

    # outer loop: expand the sorted portion
    for i in range(N - 1):
        # find minimum in unsorted portion (from i to N-1)
        min_index = i
        for j in range(i + 1, N):
            if array[j] < array[min_index]:
                min_index = j

        # swap minimum with first unsorted element
        array[i], array[min_index] = array[min_index], array[i]

    return array
```

And that's what **Selection Sort** is! It's literally just the minima extraction idea, implemented efficiently in place.

## Analyzing Time Complexity

Let's think about the time complexity:

**Time Complexity = O(number of elements) × O(time to find min)**

- Number of elements: N (fixed)
- Time to find min: We scan through the remaining unsorted portion, which takes O(N) in the worst case

So overall: **O(N²)**

Now here's an interesting observation: the number of elements is fixed at N. But what about the time to find the minimum? Currently it's O(N) because we do a linear scan.

**What if we could reduce the time to find the minimum?** Then we could sort in less time!

## Trying to Reduce Time to Find Min

So how do we find minimums faster than O(N)?

Currently, we're scanning through all remaining elements linearly. But what if we could organize our data differently?

Let's take a small example array: `[8, 4, 7, 2, 5, 3, 1, 6]`

Now here's something interesting. What if we visualize this array as a tree? We can do this by following a simple mapping:
- For an element at index `i`, its left child is at index `2*i + 1`
- Its right child is at index `2*i + 2`

So our array becomes:

```sh
        8 (index 0)
       / \
      4   7  (indices 1, 2)
     / \ / \
    2  5 3  1  (indices 3, 4, 5, 6)
   /
  6  (index 7)
```

Notice this is just a different way of looking at the same array – no extra space needed!

Now, what if we rearrange elements in this tree structure such that **every parent is smaller than its children**? This would be pretty useful, right? The smallest element would automatically be at the top!

How do we build such a structure? Let's work bottom-up:

Start from the <u>last non-leaf node (at index `N//2 - 1`)</u>[^1] and move upwards. For each node, if it's larger than either of its children, swap it with the smaller child. Then keep "bubbling down" the swapped element until the property is satisfied.

Let's see this transformation step by step:

**Step 1:** Start with node at index 3 (value 2). It has child 6 at index 7.
- 2 < 6, so no swap needed.

**Step 2:** Node at index 2 (value 7). Children: 3 and 1.
- 7 > 1 (smaller child), swap them.

```sh
        8
       / \
      4   1
     / \ / \
    2  5 3  7
   /
  6
```

**Step 3:** Node at index 1 (value 4). Children: 2 and 5.
- 4 > 2 (smaller child), swap them.

```sh
        8
       / \
      2   1
     / \ / \
    4  5 3  7
   /
  6
```

Now 4 is at index 3 with child 6. 4 < 6, so done with this branch.

**Step 4:** Node at index 0 (value 8). Children: 2 and 1.
- 8 > 1 (smaller child), swap them.

```sh
        1
       / \
      2   8
     / \ / \
    4  5 3  7
   /
  6
```

Now 8 is at index 2 with children 3 and 7. 8 > 3, swap again.

```sh
        1
       / \
      2   3
     / \ / \
    4  5 8  7
   /
  6
```

Done! We've built our special structure.

Now look what we have: **the minimum (1) is right at the root!**

To extract it:
1. Take the root (minimum)
2. Replace it with the last element
3. "Bubble down" this element to restore the property

After removing 1 and placing 6 at root:

```sh
        6
       / \
      2   3
     / \ / \
    4  5 8  7
```

Now bubble down 6: Compare with children (2 and 3), swap with 2:

```sh
        2
       / \
      6   3
     / \ / \
    4  5 8  7
```

Compare 6 with children (4 and 5). 6 > 4, swap:

```sh
        2
       / \
      4   3
     / \ / \
    6  5 8  7
```

Done! Next minimum (2) is at the root.

**How many comparisons did we do?** At each level, we compared with at most 2 children and moved down. The height of a tree with N nodes is floor(log N). So extracting minimum takes **at most floor(log N) + 1 comparisons**, not N!

This special data structure is called a **min-heap**. A heap is a complete binary tree where each parent is smaller (in min-heap) or larger (in max-heap) than its children. The beauty? It's stored in an array with no extra space!

Let's write the code for heap sort:

```python
def heapify_down(array, n, i):
    """Maintain heap property by bubbling down element at index i"""
    smallest = i
    left = 2 * i + 1
    right = 2 * i + 2

    # find smallest among node and its children
    if left < n and array[left] < array[smallest]:
        smallest = left
    if right < n and array[right] < array[smallest]:
        smallest = right

    # if smallest is not the current node, swap and continue
    if smallest != i:
        array[i], array[smallest] = array[smallest], array[i]
        heapify_down(array, n, smallest)

def build_min_heap(array):
    """Build a min-heap from an unsorted array"""
    n = len(array)
    # start from last non-leaf node and heapify each
    for i in range(n // 2 - 1, -1, -1):
        heapify_down(array, n, i)

def heap_sort(array):
    """Sort array using heap sort"""
    n = len(array)
    result = []

    # build the min-heap: O(N)
    build_min_heap(array)

    # extract minimum N times: N × O(log N)
    for i in range(n):
        # minimum is at root
        result.append(array[0])

        # move last element to root and reduce heap size
        array[0] = array[n - 1 - i]

        # restore heap property
        heapify_down(array, n - 1 - i, 0)

    return result
```

**Time Complexity:**
1. Building the heap: O(N)
2. Extracting minimum N times: N × O(log N) = O(N log N)

**Total: O(N + N log N) = O(N log N)**

**Space Complexity: O(1)** for the in-place version (or O(N) if we create a result array)

**Heap Sort** is literally one of the best sorting algorithms with O(1) auxiliary space (when done truly in-place) and O(N log N) time complexity guaranteed!

That's it! With just a simple idea of finding minima repeatedly, we discovered Selection Sort, understood why it's O(N²), and then optimized our way to Heap Sort with O(N log N) complexity by cleverly organizing data in a tree structure. The key insight? **The efficiency of sorting is bottlenecked by how quickly we can extract minimas**. By reducing extraction from O(N) to O(log N), we achieved one of the most efficient sorting algorithms!

[^1]: [why start from index n//2: read here](heap-sort)
