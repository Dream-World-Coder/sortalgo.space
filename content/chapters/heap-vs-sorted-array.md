<!--metadata
  title: "Heap vs Sorted Array: Why Building a Heap is Linear"
  authors: ["Subhajit Gorai"]
  dateCreated: "22/11/2025"
  dateEdited: "30/11/2025"
  description: "Understanding why heap construction takes O(n) time while sorting requires O(n log n)"
  tags: ["sorting", "heap", "data-structures"]
  slug: "heap-vs-sorted"
-->

# Heap vs Sorted Array: Why Building a Heap is Linear

One of the most surprising results in algorithm analysis is that building a heap takes only $O(n)$ time, while sorting an array requires $\Omega(n \log n)$ comparisons. This isn't just a lucky optimization—it's a fundamental consequence of how many valid arrangements exist for each structure. Let's explore why.

## The Sorted Array: Only One Way

For $n$ distinct elements, there is exactly **one valid sorted arrangement**. Out of all $n!$ possible permutations, only one satisfies the sorted order. The probability of randomly arriving at this configuration is:

$$P(\text{sorted}) = \frac{1}{n!}$$

### Why $\Omega(n \log n)$ Comparisons Are Required

To find this single correct arrangement through comparisons, we can model the sorting process as a **decision tree**. Each comparison eliminates some permutations from consideration:

```sh
Initial state: n! possible permutations remain

         Compare a[0] vs a[1]
              /        \
           a[0]<a[1]   a[1]<a[0]
           /              \
    n!/2 remain        n!/2 remain
        |                  |
   [more comparisons]  [more comparisons]
        |                  |
        v                  v
   Eventually: 1 permutation remains (sorted)
```

Each comparison can at best halve the number of remaining possibilities (it's a binary decision). To narrow down from $n!$ possibilities to 1, we need at least:

$$\log_2(n!) \text{ comparisons}$$

Using Stirling's approximation:

$$\log_2(n!) \approx n \log_2(n) - n \log_2(e) \in \Theta(n \log n)$$

Let's visualize this with a concrete example for $n=4$ elements $\{1, 2, 3, 4\}$:

```sh
All 24 permutations: [1234, 1243, 1324, 1342, 1423, 1432,
                      2134, 2143, 2314, 2341, 2413, 2431,
                      3124, 3142, 3214, 3241, 3412, 3421,
                      4123, 4132, 4213, 4231, 4312, 4321]

After "compare 1st vs 2nd":
  - If 1st < 2nd: eliminates ~12 permutations
  - If 1st > 2nd: eliminates ~12 permutations

After several more comparisons:
  ...eventually converges to: [1234]  ← The only valid sorted output
```

The decision tree has depth $\Omega(\log_2(24)) \approx \Omega(\log_2(4!)) \approx \Omega(4 \log 4)$.

**Key insight**: Because there's only **one target** out of $n!$ possibilities, we need $\Omega(n \log n)$ comparisons to identify it.

## The Heap: Many Valid Arrangements

A max-heap satisfies the heap property: every parent is greater than or equal to its children. However, unlike a sorted array, **many different arrangements** can satisfy this property for the same set of elements.

Consider the array $\{5, 3, 4, 1, 2\}$ as a max-heap:

```sh
Original heap:
       5
      / \
     3   4
    / \
   1   2
```

We can swap the left and right children at any node and still maintain the heap property:

```sh
Swapped at root:
       5
      / \
     4   3     ← Swapped 3 and 4
    / \
   1   2

Swapped at left child:
       5
      / \
     3   4
    / \
   2   1       ← Swapped 1 and 2

Multiple swaps:
       5
      / \
     4   3
    / \
   2   1       ← Both levels swapped
```

All of these are valid max-heaps! This flexibility is the key: **there are many more valid heap configurations than there is a single sorted arrangement**.

## Counting the Number of Heaps: $H(n)$

Let's derive exactly how many distinct max-heap structures can be formed from $n$ distinct elements.

### Recurrence Relation

For a heap of size $n$ with root element (the maximum), we partition the remaining $n-1$ elements into:
- A left subtree of size $L$
- A right subtree of size $R = n - 1 - L$

The left subtree can be any valid heap of size $L$, giving $H(L)$ possibilities. Similarly, the right subtree has $H(R)$ possibilities.

But which elements go left vs right? For a complete binary tree of size $n$, the size $L$ of the left subtree is determined by the tree shape. However, we can choose **any** $L$ elements from the remaining $n-1$ elements to place in the left subtree. That's $\binom{n-1}{L}$ ways.

This gives the recurrence:

$$H(n) = \binom{n-1}{L} \cdot H(L) \cdot H(R)$$

where $L$ and $R$ are determined by the complete binary tree structure (left subtree as full as possible), and $H(1) = 1$.

### Exact Formula

There's an elegant closed form for $H(n)$:

$$H(n) = \frac{n!}{\prod_{v} s(v)}$$

where the product is over all nodes $v$ in the heap tree, and $s(v)$ is the size of the subtree rooted at node $v$.

**Why does this work?** The numerator $n!$ represents all possible arrangements of $n$ elements. The denominator counts the "over-counting" due to heap symmetries. Each subtree of size $s(v)$ has internal orderings that don't matter for the heap property, so we divide by $s(v)$ to remove those redundant arrangements.

### Small Checks

Let's verify this formula for small values:

**$n = 1$:**
```
Heap:  [1]
```
$H(1) = \frac{1!}{1} = 1$ ✓

**$n = 2$:**
```sh
Heap:  2
       |
       1
```
Subtree sizes: root has $s=2$, left child has $s=1$
$H(2) = \frac{2!}{2 \cdot 1} = \frac{2}{2} = 1$ ✓

**$n = 3$:**
```sh
Heap:     3
        /   \
       1     2   (or swap: 2 and 1)
```
Subtree sizes: root has $s=3$, both children have $s=1$ each
$H(3) = \frac{3!}{3 \cdot 1 \cdot 1} = \frac{6}{3} = 2$ ✓

Using recurrence: $H(3) = \binom{2}{1} \cdot H(1) \cdot H(1) = 2 \cdot 1 \cdot 1 = 2$ ✓

**$n = 4$:**
```sh
Possible heaps:
     4           4           4
   /   \       /   \       /   \
  3     2     3     1     2     3  ...
 /           /             /
1           2             1

And more variations...
```

$L = 2, R = 1$ for a complete tree of size 4
Subtree sizes: root=$4$, left child=$2$, left-left child=$1$, right child=$1$
$H(4) = \frac{4!}{4 \cdot 2 \cdot 1 \cdot 1} = \frac{24}{8} = 3$ ✓

Using recurrence: $H(4) = \binom{3}{2} \cdot H(2) \cdot H(1) = 3 \cdot 1 \cdot 1 = 3$ ✓

### Asymptotic Analysis: $H(n) \approx \frac{n!}{2^{\Theta(n)}}$

To understand how $H(n)$ grows, let's analyze the denominator $\prod_{v} s(v)$.

In a complete binary tree:
- There are $\Theta(\log n)$ levels
- Level $i$ has $2^i$ nodes (for $i = 0, 1, ..., \log n - 1$)
- Nodes at level $i$ have subtrees of size $\Theta(n / 2^i)$

The product becomes:

$$\prod_{v} s(v) \approx \prod_{i=0}^{\log n - 1} \left(\frac{n}{2^i}\right)^{2^i}$$

Taking logarithms:

$$\log \prod_{v} s(v) = \sum_{i=0}^{\log n - 1} 2^i \log\left(\frac{n}{2^i}\right)$$

$$= \sum_{i=0}^{\log n - 1} 2^i (\log n - i)$$

The dominant terms come from large $i$, where $2^i \approx n$ and we have $\Theta(n)$ terms overall. Working through the algebra:

$$\log \prod_{v} s(v) \in \Theta(n \log n)$$

But more precisely, the sum evaluates to approximately $n \log n - cn$ for some constant $c$, meaning:

$$\prod_{v} s(v) \approx \frac{n^n}{2^{\Theta(n)}}$$

Therefore:

$$H(n) = \frac{n!}{\prod_{v} s(v)} \approx \frac{n!}{2^{\Theta(n)}}$$

Using Stirling's approximation $n! \approx \sqrt{2\pi n} \left(\frac{n}{e}\right)^n$, we get:

$$H(n) \approx \frac{\sqrt{2\pi n} (n/e)^n}{2^{\Theta(n)}}$$

**Key observation**: While $n! = 2^{\Theta(n \log n)}$, we have $H(n) = 2^{\Theta(n \log n) - \Theta(n)} = 2^{\Theta(n \log n)}$ but with a **much smaller** exponent than $n!$.

More specifically: $\log_2 H(n) = \Theta(n \log n - n) \approx n(\log n - 1)$ compared to $\log_2(n!) \approx n \log n$.

## Why Heap Construction is Linear

Now the punchline: because there are **exponentially many valid heaps** (roughly $n!/2^{\Theta(n)}$), the probability of building a valid heap is much higher:

$$P(\text{valid heap}) \approx \frac{H(n)}{n!} = \frac{1}{2^{\Theta(n)}}$$

This is vastly larger than $1/n!$ for sorted arrays. In the decision tree model:

$$\text{Comparisons needed} \approx \log_2\left(\frac{n!}{H(n)}\right) = \log_2(n!) - \log_2 H(n)$$

$$\approx n \log n - (n \log n - cn) = \Theta(n)$$

**Mathematical proof sketch**: The standard heapify algorithm works bottom-up, with each level requiring work proportional to the number of nodes times their height. The total is:

$$\sum_{h=0}^{\log n} \frac{n}{2^{h+1}} \cdot h = n \sum_{h=0}^{\log n} \frac{h}{2^{h+1}}$$

The sum $\sum_{h=0}^{\infty} \frac{h}{2^{h+1}}$ converges to a constant (specifically, 1), so:

$$\text{Total work} = O(n)$$

The combinatorial argument reinforces this: we don't need to make $\Omega(n \log n)$ comparisons because we're not searching for **one specific arrangement** among $n!$ possibilities. We're searching for **any of the $H(n) \approx n!/2^{\Theta(n)}$ valid heaps**, which requires only $\Theta(n)$ comparisons.

## Conclusion

The fundamental difference:
- **Sorted array**: 1 valid arrangement out of $n!$ → requires $\Omega(n \log n)$ comparisons
- **Max-heap**: $H(n) \approx n!/2^{\Theta(n)}$ valid arrangements → requires only $O(n)$ comparisons

This isn't just a clever algorithm optimization—it's a deep mathematical truth about the flexibility of heap structures versus the rigidity of sorted order. The heap property is local (parent $\geq$ children), allowing many global configurations, while sorting is global (total order), allowing only one.

---

**References:**
[leimao.github.io/blog/Heap-Building-Asymptotic-Algorithm](https://leimao.github.io/blog/Heap-Building-Asymptotic-Algorithm/)
[geeksforgeeks.org/dsa/number-ways-form-heap-n-distinct-integers](https://www.geeksforgeeks.org/dsa/number-ways-form-heap-n-distinct-integers/)
