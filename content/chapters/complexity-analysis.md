<!--metadata
  title: "Algorithmic Complexity Analysis"
  authors: ["Claude Sonnet 4.5", "Subhajit Gorai"]
  dateCreated: "15/11/2025"
  dateEdited: "16/11/2025"
  description: "..."
  tags: ["sorting"]
  slug: "complexity-analysis"
-->

# Complexity Analysis


## Preface

In the realm of computer science, understanding how algorithms perform is paramount. **Complexity analysis** provides the mathematical framework to evaluate the efficiency of algorithms in terms of time and space. This book-like guide takes you from foundational concepts to advanced techniques, with rigorous definitions, proofs, examples, and practical insights.

Whether you're preparing for technical interviews, designing scalable systems, or pursuing research in theoretical computer science, this resource serves as a definitive reference.

---

## Table of Contents

1. [Introduction to Algorithmic Efficiency](#chapter-1-introduction-to-algorithmic-efficiency)
2. [Time Complexity](#chapter-2-time-complexity)
3. [Space Complexity](#chapter-3-space-complexity)
4. [Big O Notation](#chapter-4-big-o-notation)
5. [Omega (Ω) and Theta (Θ) Notations](#chapter-5-omega-and-theta-notations)
6. [Best, Average, and Worst Cases](#chapter-6-best-average-and-worst-cases)
7. [Amortized Analysis](#chapter-7-amortized-analysis)
8. [Master Theorem](#chapter-8-master-theorem)
9. [Recurrence Relations](#chapter-9-recurrence-relations)
10. [Common Complexity Classes](#chapter-10-common-complexity-classes)
11. [NP-Completeness and Beyond](#chapter-11-np-completeness-and-beyond)
12. [Practical Analysis Techniques](#chapter-12-practical-analysis-techniques)
13. [Exercises and Solutions](#exercises-and-solutions)

---

## Chapter 1: Introduction to Algorithmic Efficiency

### 1.1 Why Complexity Analysis Matters

An algorithm's correctness is necessary but insufficient. Two correct algorithms solving the same problem may differ dramatically in performance. Consider searching for an element in a list: linear search examines every element, while binary search (on sorted data) halves the search space repeatedly. For a million elements, linear search might require a million comparisons, while binary search needs at most 20.

**Key Questions:**
- How does runtime grow as input size increases?
- What memory resources does the algorithm consume?
- Can we predict performance without implementing the algorithm?

### 1.2 Machine-Independent Analysis

Complexity analysis abstracts away hardware specifics (CPU speed, memory architecture) by counting **primitive operations**: arithmetic operations, comparisons, assignments, array accesses. We measure how these operations scale with input size $n$.

**Example:** Summing array elements
```txt
sum = 0                    // 1 operation
for i = 0 to n-1:          // n iterations
    sum = sum + array[i]   // 2 operations per iteration (read + add)
return sum                 // 1 operation
```
Total: $1 + n(2) + 1 = 2n + 2$ operations. As $n$ grows large, the dominant term is $2n$.

### 1.3 Asymptotic Behavior

We focus on **asymptotic analysis**—behavior as $n \to \infty$. Constants and lower-order terms become negligible. An algorithm requiring $2n + 2$ operations and one requiring $5n + 100$ both scale linearly; we classify both as $O(n)$.

---

## Chapter 2: Time Complexity

### 2.1 Definition

**Time complexity** quantifies the number of primitive operations an algorithm performs as a function of input size. It answers: "How does runtime change when we double the input?"

### 2.2 Counting Operations

**Rule 1: Sequential Statements**
Add the complexities. If statement A takes $f(n)$ operations and statement B takes $g(n)$, together they take $f(n) + g(n)$.

**Rule 2: Loops**
Multiply the number of iterations by the complexity of the loop body.

**Rule 3: Nested Loops**
Multiply the complexities of each nested level.

**Example: Bubble Sort**
```txt
for i = 0 to n-1:              // n iterations
    for j = 0 to n-i-2:        // ~n iterations (worst case)
        if array[j] > array[j+1]:
            swap(array[j], array[j+1])  // constant time
```
Inner loop executes approximately $n + (n-1) + (n-2) + ... + 1 = \frac{n(n+1)}{2}$ times.
Time complexity: $O(n^2)$.

### 2.3 Common Time Complexities (Fastest to Slowest)

| Complexity | Name | Example |
|------------|------|---------|
| $O(1)$ | Constant | Array access, hash table lookup |
| $O(\log n)$ | Logarithmic | Binary search |
| $O(n)$ | Linear | Linear search, array traversal |
| $O(n \log n)$ | Linearithmic | Merge sort, quicksort (average) |
| $O(n^2)$ | Quadratic | Bubble sort, nested loops |
| $O(n^3)$ | Cubic | Matrix multiplication (naive) |
| $O(2^n)$ | Exponential | Recursive Fibonacci, subset generation |
| $O(n!)$ | Factorial | Permutation generation |

### 2.4 Growth Comparison

For $n = 1000$:
- $O(1)$: 1 operation
- $O(\log n)$: ~10 operations
- $O(n)$: 1,000 operations
- $O(n \log n)$: ~10,000 operations
- $O(n^2)$: 1,000,000 operations
- $O(2^n)$: $10^{301}$ operations (more than atoms in the universe)

---

## Chapter 3: Space Complexity

### 3.1 Definition

**Space complexity** measures the total memory an algorithm uses relative to input size, including:
1. **Input space**: Memory to store input data
2. **Auxiliary space**: Extra memory used during execution (variables, recursion stack, temporary arrays)

*Typically, space complexity refers to auxiliary space only.*

### 3.2 Stack Space in Recursion

Recursive calls consume stack memory. Each call frame stores local variables and return addresses.

**Example: Factorial**
```txt
function factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n-1)
```
Maximum recursion depth: $n$. Space complexity: $O(n)$ due to call stack.

**Tail Recursion Optimization:** If the recursive call is the last operation, compilers can optimize to $O(1)$ space by reusing the stack frame.

### 3.3 Iterative vs. Recursive Space

**Iterative Fibonacci:**
```txt
function fib(n):
    a, b = 0, 1
    for i = 2 to n:
        a, b = b, a + b
    return b
```
Space: $O(1)$ (only two variables).

**Recursive Fibonacci:**
```txt
function fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)
```
Space: $O(n)$ (maximum call stack depth).
Time: $O(2^n)$ (exponential branching).

### 3.4 In-Place Algorithms

Algorithms using $O(1)$ auxiliary space are **in-place**. Examples: Heapsort, quicksort (with careful partitioning).

**Trade-off:** Merge sort uses $O(n)$ space but guarantees $O(n \log n)$ time. Quicksort uses $O(\log n)$ space (recursion stack) but has $O(n^2)$ worst-case time.

---

## Chapter 4: Big O Notation

### 4.1 Formal Definition

**Big O** ($O$) describes an **upper bound** on growth rate. It represents the worst-case scenario.

**Definition:** $f(n) = O(g(n))$ if there exist positive constants $c$ and $n_0$ such that:
$$0 \leq f(n) \leq c \cdot g(n) \quad \forall n \geq n_0$$

**Intuition:** $f(n)$ grows no faster than $g(n)$ (up to a constant factor) for sufficiently large $n$.

### 4.2 Proof Example

**Claim:** $3n^2 + 5n + 2 = O(n^2)$

**Proof:**
We need $3n^2 + 5n + 2 \leq c \cdot n^2$ for $n \geq n_0$.

For $n \geq 1$: $5n \leq 5n^2$ and $2 \leq 2n^2$

Thus: $3n^2 + 5n + 2 \leq 3n^2 + 5n^2 + 2n^2 = 10n^2$

Choose $c = 10$, $n_0 = 1$. ∎

### 4.3 Properties

**4.3.1 Drop Constants**
$O(5n) = O(n)$, $O(100) = O(1)$

**4.3.2 Drop Lower-Order Terms**
$O(n^2 + n) = O(n^2)$, $O(n \log n + n) = O(n \log n)$

**4.3.3 Transitivity**
If $f = O(g)$ and $g = O(h)$, then $f = O(h)$.

**4.3.4 Sum Rule**
$O(f(n)) + O(g(n)) = O(\max(f(n), g(n)))$

**4.3.5 Product Rule**
$O(f(n)) \cdot O(g(n)) = O(f(n) \cdot g(n))$

### 4.4 Common Mistakes

**Mistake 1:** Confusing Big O with exact runtime.
- Big O gives an upper bound, not precise operation count.

**Mistake 2:** Over-specifying complexity.
- Writing $O(2n)$ instead of $O(n)$.

**Mistake 3:** Ignoring input characteristics.
- Not all $O(n^2)$ algorithms perform equally on real data.

---

## Chapter 5: Omega (Ω) and Theta (Θ) Notations

### 5.1 Big Omega (Ω) – Lower Bound

**Definition:** $f(n) = \Omega(g(n))$ if there exist positive constants $c$ and $n_0$ such that:
$$0 \leq c \cdot g(n) \leq f(n) \quad \forall n \geq n_0$$

**Meaning:** $f(n)$ grows at least as fast as $g(n)$. Represents **best-case lower bound**.

**Example:** Searching an unsorted array for an element requires examining at least one element (best case), so it's $\Omega(1)$.

### 5.2 Big Theta (Θ) – Tight Bound

**Definition:** $f(n) = \Theta(g(n))$ if $f(n) = O(g(n))$ AND $f(n) = \Omega(g(n))$.

Equivalently, there exist constants $c_1, c_2, n_0$ such that:
$$c_1 \cdot g(n) \leq f(n) \leq c_2 \cdot g(n) \quad \forall n \geq n_0$$

**Meaning:** $f(n)$ grows exactly at the rate of $g(n)$. Represents **tight bound**.

**Example:** Merge sort always performs $\Theta(n \log n)$ comparisons regardless of input.

### 5.3 Notation Summary

| Notation | Meaning | Analogy |
|----------|---------|---------|
| $O$ | Upper bound | "At most" ($\leq$) |
| $\Omega$ | Lower bound | "At least" ($\geq$) |
| $\Theta$ | Tight bound | "Exactly" ($=$) |
| $o$ (little-o) | Strict upper bound | "Strictly less than" ($<$) |
| $\omega$ (little-omega) | Strict lower bound | "Strictly greater than" ($>$) |

### 5.4 Practical Use

In practice, Big O dominates discussions because we care most about worst-case guarantees. However, precise analysis uses Theta notation.

**Example:** "Binary search is $O(n)$" is technically true but misleading. "Binary search is $\Theta(\log n)$" is accurate.

---

## Chapter 6: Best, Average, and Worst Cases

### 6.1 Case Definitions

**Best Case:** Minimum operations for the most favorable input.
**Worst Case:** Maximum operations for the most unfavorable input.
**Average Case:** Expected operations over all possible inputs (requires probability distribution).

### 6.2 Example: Linear Search

```txt
function linearSearch(array, target):
    for i = 0 to n-1:
        if array[i] == target:
            return i
    return -1
```

- **Best Case:** Target is at index 0 → $\Theta(1)$
- **Worst Case:** Target is absent or at last position → $\Theta(n)$
- **Average Case:** Target equally likely at any position → $\Theta(n/2) = \Theta(n)$

### 6.3 Example: Quicksort

**Best Case:** Pivot always splits array evenly → $\Theta(n \log n)$
**Worst Case:** Pivot always picks smallest/largest element (sorted input) → $\Theta(n^2)$
**Average Case:** Random pivots give expected $\Theta(n \log n)$

### 6.4 Why Worst Case Matters

Systems must handle adversarial inputs. Guaranteeing worst-case performance ensures reliability. Average-case analysis requires assumptions about input distribution, which may not hold in practice.

---

## Chapter 7: Amortized Analysis

### 7.1 Motivation

Some algorithms have expensive operations that occur rarely. **Amortized analysis** averages the cost per operation over a sequence, providing a more accurate picture than worst-case analysis of individual operations.

### 7.2 Dynamic Array (Vector) Example

**Problem:** Appending to a full array requires resizing (allocating new array, copying elements).

**Strategy:** When full, double the capacity.

**Analysis:**
- Most appends: $O(1)$ (just insert)
- Occasional resize: $O(n)$ (copy all elements)

**Amortized Cost:**
Starting with capacity 1, after $n$ insertions:
- Resizes occur at sizes: 1, 2, 4, 8, ..., $n$
- Total copy operations: $1 + 2 + 4 + ... + n = 2n - 1$
- Total operations: $n$ (insertions) $+ (2n - 1)$ (copies) $= 3n - 1$
- Amortized cost per insertion: $\frac{3n - 1}{n} \approx 3 = O(1)$

### 7.3 Methods of Amortized Analysis

**7.3.1 Aggregate Method**
Calculate total cost for $n$ operations, divide by $n$.

**7.3.2 Accounting Method**
Assign artificial "charges" to operations. Some operations overcharge (saving "credits"), others undercharge (using credits).

**7.3.3 Potential Method**
Define a potential function $\Phi$ representing stored energy. Amortized cost = actual cost + change in potential.

### 7.4 Applications

- Dynamic arrays (vectors, ArrayLists)
- Splay trees (self-adjusting binary search trees)
- Fibonacci heaps
- Union-find with path compression

---

## Chapter 8: Master Theorem

### 8.1 Purpose

The **Master Theorem** provides a cookbook for solving recurrence relations of the form:
$$T(n) = aT\left(\frac{n}{b}\right) + f(n)$$

where $a \geq 1$, $b > 1$ are constants, and $f(n)$ is asymptotically positive.

**Interpretation:**
- Divide problem into $a$ subproblems
- Each subproblem has size $\frac{n}{b}$
- $f(n)$ is the cost of dividing and combining

### 8.2 Master Theorem Statement

Compare $f(n)$ with $n^{\log_b a}$:

**Case 1:** If $f(n) = O(n^{\log_b a - \epsilon})$ for some $\epsilon > 0$:
$$T(n) = \Theta(n^{\log_b a})$$
*(Recursion dominates)*

**Case 2:** If $f(n) = \Theta(n^{\log_b a} \log^k n)$ for some $k \geq 0$:
$$T(n) = \Theta(n^{\log_b a} \log^{k+1} n)$$
*(Balanced)*

**Case 3:** If $f(n) = \Omega(n^{\log_b a + \epsilon})$ for some $\epsilon > 0$, and $af(n/b) \leq cf(n)$ for some $c < 1$ (regularity condition):
$$T(n) = \Theta(f(n))$$
*(Combine cost dominates)*

### 8.3 Examples

**Example 1: Merge Sort**
$$T(n) = 2T\left(\frac{n}{2}\right) + \Theta(n)$$

- $a = 2, b = 2, f(n) = \Theta(n)$
- $n^{\log_b a} = n^{\log_2 2} = n^1 = n$
- $f(n) = \Theta(n^1 \log^0 n)$ → **Case 2** with $k = 0$

**Result:** $T(n) = \Theta(n \log n)$

**Example 2: Binary Search**
$$T(n) = T\left(\frac{n}{2}\right) + \Theta(1)$$

- $a = 1, b = 2, f(n) = \Theta(1)$
- $n^{\log_2 1} = n^0 = 1$
- $f(n) = \Theta(1) = \Theta(n^0 \log^0 n)$ → **Case 2** with $k = 0$

**Result:** $T(n) = \Theta(\log n)$

**Example 3: Strassen's Matrix Multiplication**
$$T(n) = 7T\left(\frac{n}{2}\right) + \Theta(n^2)$$

- $a = 7, b = 2, f(n) = \Theta(n^2)$
- $n^{\log_2 7} \approx n^{2.807}$
- $f(n) = O(n^{2.807 - 0.807})$ → **Case 1**

**Result:** $T(n) = \Theta(n^{\log_2 7}) \approx \Theta(n^{2.807})$

### 8.4 Limitations

Master Theorem doesn't apply when:
- $f(n)$ falls between cases (e.g., $f(n) = \frac{n}{\log n}$)
- Subproblems have unequal sizes
- Recurrence doesn't divide by a constant factor

Use substitution or recursion tree methods instead.

---

## Chapter 9: Recurrence Relations

### 9.1 Definition

A **recurrence relation** defines a function in terms of itself with smaller inputs. Solving recurrences determines asymptotic complexity.

### 9.2 Methods

**9.2.1 Substitution Method**

1. Guess the solution form
2. Prove by induction
3. Determine constants

**Example:** $T(n) = 2T(n/2) + n$

**Guess:** $T(n) = O(n \log n)$, i.e., $T(n) \leq cn \log n$

**Proof:** Assume true for $n/2$:
$$T(n) = 2T(n/2) + n \leq 2c(n/2)\log(n/2) + n$$
$$= cn\log(n/2) + n = cn\log n - cn\log 2 + n$$
$$= cn\log n - cn + n = cn\log n - (c-1)n$$

For $c \geq 1$, $T(n) \leq cn\log n$. ∎

**9.2.2 Recursion Tree Method**

Visualize the recurrence as a tree where each node represents a subproblem.

**Example:** $T(n) = 2T(n/2) + n$

```txt
                n
              /   \
           n/2     n/2
          / \      / \
        n/4 n/4  n/4 n/4
        ...
```

- Level 0: $n$ (work at root)
- Level 1: $2 \times (n/2) = n$
- Level 2: $4 \times (n/4) = n$
- ...
- Level $\log n$: $n \times 1 = n$

Total: $n \log n + n = O(n \log n)$

**9.2.3 Master Theorem**
(Covered in Chapter 8)

### 9.3 Common Recurrences

| Recurrence | Solution | Example Algorithm |
|------------|----------|-------------------|
| $T(n) = T(n-1) + 1$ | $\Theta(n)$ | Linear search |
| $T(n) = T(n-1) + n$ | $\Theta(n^2)$ | Selection sort |
| $T(n) = T(n/2) + 1$ | $\Theta(\log n)$ | Binary search |
| $T(n) = 2T(n/2) + n$ | $\Theta(n \log n)$ | Merge sort |
| $T(n) = 2T(n/2) + 1$ | $\Theta(n)$ | Tree traversal |
| $T(n) = T(n-1) + T(n-2)$ | $\Theta(\phi^n)$ | Fibonacci (naive) |

---

## Chapter 10: Common Complexity Classes

### 10.1 Polynomial Time (P)

Problems solvable in $O(n^k)$ time for some constant $k$. These are considered "tractable" or "efficient."

**Examples:**
- Sorting: $O(n \log n)$
- Graph traversal (BFS/DFS): $O(V + E)$
- Shortest path (Dijkstra): $O((V + E) \log V)$

### 10.2 Exponential and Factorial Time

Problems requiring $O(2^n)$, $O(n!)$, or worse. Generally considered "intractable" for large $n$.

**Examples:**
- Traveling Salesman (brute force): $O(n!)$
- Subset sum (brute force): $O(2^n)$
- Tower of Hanoi: $O(2^n)$

### 10.3 Logarithmic Space (L)

Algorithms using $O(\log n)$ space. Important in complexity theory.

**Example:** Determining if a graph is connected using depth-first search with careful space management.

### 10.4 Comparison-Based Sorting Lower Bound

**Theorem:** Any comparison-based sorting algorithm requires $\Omega(n \log n)$ comparisons in the worst case.

**Proof Sketch:**
- Sorting permutes $n$ elements: $n!$ possible outcomes
- Each comparison has 2 outcomes: binary decision tree with $n!$ leaves
- Tree depth ≥ $\log_2(n!) = \Theta(n \log n)$

**Corollary:** Merge sort and heapsort are asymptotically optimal for comparison-based sorting.

---

## Chapter 11: NP-Completeness and Beyond

### 11.1 Decision Problems

A **decision problem** asks a yes/no question (e.g., "Does this graph have a Hamiltonian cycle?").

### 11.2 Complexity Classes

**P (Polynomial Time):** Problems solvable in polynomial time by a deterministic Turing machine.

**NP (Nondeterministic Polynomial):** Problems where a "yes" answer can be **verified** in polynomial time given a certificate (solution).

**Key Insight:** $P \subseteq NP$. Every problem solvable efficiently can be verified efficiently.

**Open Question:** Is $P = NP$? (One of the Millennium Prize Problems)

### 11.3 NP-Completeness

A problem is **NP-complete** if:
1. It's in NP
2. Every problem in NP can be reduced to it in polynomial time

**Significance:** If any NP-complete problem has a polynomial-time solution, then $P = NP$.

**Examples of NP-Complete Problems:**
- Boolean satisfiability (SAT)
- Traveling Salesman Problem (decision version)
- Graph coloring
- Knapsack problem
- Hamiltonian cycle
- Vertex cover

### 11.4 NP-Hard

**NP-hard** problems are at least as hard as NP-complete problems but may not be in NP (may not be decision problems).

**Example:** Optimization version of Traveling Salesman (finding the shortest tour, not just deciding if one exists under a threshold).

### 11.5 Practical Implications

For NP-complete problems:
- **Exact algorithms:** Exponential time (backtracking, branch-and-bound)
- **Approximation algorithms:** Polynomial time with guaranteed solution quality
- **Heuristics:** Fast but no guarantees (genetic algorithms, simulated annealing)
- **Special cases:** Polynomial solutions for restricted inputs

### 11.6 Beyond NP

**PSPACE:** Problems solvable using polynomial space.
**EXPTIME:** Problems requiring exponential time.
**Undecidable:** Problems with no algorithm (e.g., Halting Problem).

**Hierarchy:** $P \subseteq NP \subseteq PSPACE \subseteq EXPTIME$

---

## Chapter 12: Practical Analysis Techniques

### 12.1 Loop Analysis

**Single Loop:**
```txt
for i = 0 to n:
    // O(1) operations
```
Complexity: $O(n)$

**Nested Loops (Independent):**
```txt
for i = 0 to n:
    for j = 0 to m:
        // O(1)
```
Complexity: $O(nm)$

**Nested Loops (Dependent):**
```txt
for i = 0 to n:
    for j = 0 to i:
        // O(1)
```
Iterations: $\sum_{i=0}^{n} i = \frac{n(n+1)}{2}$
Complexity: $O(n^2)$

### 12.2 Logarithmic Loops

**Halving:**
```txt
i = n
while i > 1:
    i = i / 2
```
Iterations: $\log_2 n$
Complexity: $O(\log n)$

**Squaring:**
```txt
i = 2
while i < n:
    i = i * i
```
Iterations: $\log \log n$
Complexity: $O(\log \log n)$

### 12.3 Recursive Complexity

**Step 1:** Write the recurrence relation.
**Step 2:** Apply Master Theorem, substitution, or recursion tree.

**Example: Fibonacci with Memoization**
```txt
memo = {}
function fib(n):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib(n-1) + fib(n-2)
    return memo[n]
```

Without memoization: $T(n) = T(n-1) + T(n-2) + O(1) = O(2^n)$
With memoization: Each of $n$ values computed once → $O(n)$

### 12.4 Multiple Variables

**Example: Matrix Multiplication**
```txt
for i = 0 to n:
    for j = 0 to n:
        for k = 0 to n:
            C[i][j] += A[i][k] * B[k][j]
```
Complexity: $O(n^3)$

**Strassen's Algorithm:** Divide-and-conquer reduces to $O(n^{2.807})$
**Coppersmith-Winograd:** Further optimizations reach $O(n^{2.376})$

### 12.5 Hidden Complexities

**Built-in Operations:**
- String concatenation in loops: Can be $O(n^2)$ if each concatenation copies
- Sorting library calls: Usually $O(n \log n)$
- Hash table operations: Average $O(1)$, worst $O(n)$ with collisions

**Example: Inefficient String Building**
```txt
result = ""
for i = 0 to n:
    result = result + str(i)  // O(i) copy each time
```
Total: $O(1 + 2 + ... + n) = O(n^2)$

**Efficient Alternative (StringBuilder/StringBuffer):**
```txt
result = StringBuilder()
for i = 0 to n:
    result.append(str(i))  // O(1) amortized
```
Total: $O(n)$

### 12.6 Profiling vs. Analysis

**Asymptotic analysis** predicts scaling; **profiling** measures actual runtime.

**When to Profile:**
- Optimizing constant factors
- Identifying bottlenecks in complex systems
- Validating theoretical analysis

**When Analysis Suffices:**
- Comparing algorithms at design stage
- Understanding scalability
- Preparing for interviews

---

## Chapter 13: Exercises and Solutions

### Exercise 1: Loop Analysis
Analyze the time complexity:
```txt
for i = 1 to n:
    for j = 1 to i^2:
        print(i, j)
```

**Solution:**
Outer loop runs $n$ times. Inner loop runs $i^2$ times for each $i$.
Total iterations: $\sum_{i=1}^{n} i^2 = \frac{n(n+1)(2n+1)}{6} = O(n^3)$

---

### Exercise 2: Recurrence Relation
Solve: $T(n) = 3T(n/4) + n^2$

**Solution:**
Master Theorem: $a = 3, b = 4, f(n) = n^2$

$n^{\log_b a} = n^{\log_4 3} \approx n^{0.793}$

$f(n) = n^2 = \Omega(n^{0.793 + \epsilon})$ for $\epsilon \approx 1.2$

Check regularity: $3f(n/4) = 3(n/4)^2 = \frac{3n^2}{16} \leq cf(n)$ for $c = 3/16 < 1$ ✓

**Case 3 applies:** $T(n) = \Theta(n^2)$

---

### Exercise 3: Space Complexity
What is the space complexity of this function?
```txt
function mystery(n):
    if n <= 0:
        return
    array = new Array[n]
    mystery(n-1)
```

**Solution:**
Each recursive call creates an array of size $n, n-1, n-2, ..., 1$.
Total space: $n + (n-1) + ... + 1 = \frac{n(n+1)}{2} = O(n^2)$

(Note: This assumes arrays aren't garbage collected during recursion.)

---

### Exercise 4: Amortized Analysis
A stack supports push, pop, and multipop (pops $k$ elements). Individual multipop takes $O(k)$ time. Prove that for a sequence of $n$ operations, the amortized cost per operation is $O(1)$.

**Solution:**
Each element can be pushed once and popped at most once.

**Accounting Method:**
- Assign cost 2 to each push: 1 for the push operation, 1 as credit for future pop
- Pop and multipop cost 0 (use stored credits)

For $n$ operations:
- Maximum $n$ pushes → cost $2n$
- Pops use credits from pushes
- Total actual cost ≤ $2n$

**Amortized cost:** $\frac{2n}{n} = O(1)$ per operation. ∎

---

### Exercise 5: NP-Completeness
Is the decision version of the shortest path problem (given graph $G$, source $s$, target $t$, and bound $k$, is there a path from $s$ to $t$ of length ≤ $k$?) in P or NP-complete?

**Solution:**
**In P.** Dijkstra's algorithm solves this in $O((V + E) \log V)$ time for non-negative weights. Bellman-Ford handles negative weights in $O(VE)$ time.

**Contrast with Hamiltonian Path:** Finding a path visiting all vertices exactly once is NP-complete. The constraint "visit all vertices" makes the problem exponentially harder.

---

### Exercise 6: Hidden Complexity
What is the time complexity?
```python
def mystery(arr):
    n = len(arr)
    for i in range(n):
        arr.sort()
        print(arr[i])
```

**Solution:**
- Outer loop: $O(n)$ iterations
- Inside loop: `arr.sort()` takes $O(n \log n)$ each iteration
- Total: $O(n) \times O(n \log n) = O(n^2 \log n)$

**Optimization:** Sort once before the loop → $O(n \log n)$

---

### Exercise 7: Best, Average, Worst Case
Analyze all three cases for insertion sort.

**Solution:**

**Algorithm:**
```txt
for i = 1 to n-1:
    key = array[i]
    j = i - 1
    while j >= 0 and array[j] > key:
        array[j+1] = array[j]
        j = j - 1
    array[j+1] = key
```

**Best Case:** Array already sorted
- Inner while loop never executes
- Complexity: $\Theta(n)$

**Worst Case:** Array sorted in reverse
- For each $i$, inner loop runs $i$ times
- Total: $\sum_{i=1}^{n-1} i = \frac{n(n-1)}{2}$
- Complexity: $\Theta(n^2)$

**Average Case:** Random permutation
- On average, inner loop runs $i/2$ times
- Total: $\sum_{i=1}^{n-1} \frac{i}{2} = \frac{n(n-1)}{4}$
- Complexity: $\Theta(n^2)$

---

### Exercise 8: Recursion Tree
Solve $T(n) = T(n/3) + T(2n/3) + n$ using the recursion tree method.

**Solution:**

```txt
                    n
                 /     \
              n/3       2n/3
             /  \       /   \
          n/9  2n/9  2n/9  4n/9
          ...
```

**Analysis:**
- Each level sums to $n$ (e.g., level 1: $n/3 + 2n/3 = n$)
- Longest path: repeatedly divide by 3 → depth $\log_3 n$
- Shortest path: repeatedly divide by 3/2 → depth $\log_{3/2} n$

**Conservative bound:** Tree has at most $\log_{3/2} n$ levels.
- Work per level: $n$
- Total work: $O(n \log n)$

**Verification by substitution:**
Guess $T(n) = O(n \log n)$, i.e., $T(n) \leq cn \log n$

$$T(n) = T(n/3) + T(2n/3) + n$$
$$\leq c(n/3)\log(n/3) + c(2n/3)\log(2n/3) + n$$
$$= (cn/3)(\log n - \log 3) + (2cn/3)(\log n - \log(3/2)) + n$$
$$= cn\log n - (cn/3)\log 3 - (2cn/3)\log(3/2) + n$$
$$= cn\log n + n(1 - c[\frac{\log 3}{3} + \frac{2\log(3/2)}{3}])$$

For sufficiently large $c$, the bracket term is positive, so we need the coefficient of $n$ to be negative:
$$1 - c[\frac{\log 3}{3} + \frac{2\log(3/2)}{3}] < 0$$

This holds for $c > \frac{3}{\log 3 + 2\log(3/2)} \approx 2.4$

**Result:** $T(n) = O(n \log n)$ ∎

---

### Exercise 9: Space-Time Tradeoff
Compare two approaches for checking if an array contains duplicates:

**Approach A: Sorting**
```python
def hasDuplicates_A(arr):
    arr.sort()  # O(n log n) time
    for i in range(len(arr) - 1):
        if arr[i] == arr[i+1]:
            return True
    return False
```

**Approach B: Hash Set**
```python
def hasDuplicates_B(arr):
    seen = set()  # O(n) space
    for x in arr:
        if x in seen:
            return True
        seen.add(x)
    return False
```

**Analysis:**

| Approach | Time | Space |
|----------|------|-------|
| A (Sort) | $O(n \log n)$ | $O(1)$ auxiliary* |
| B (Hash) | $O(n)$ average | $O(n)$ |

*Assuming in-place sorting like heapsort

**Trade-off:** Approach B is faster but uses more memory. Choose based on constraints:
- Memory-constrained systems: Use A
- Time-critical applications: Use B

---

### Exercise 10: Practical Optimization
You need to find the $k$-th smallest element in an unsorted array. Compare approaches:

**Approach 1: Sort and Index**
```python
def kthSmallest_1(arr, k):
    arr.sort()
    return arr[k-1]
```
Time: $O(n \log n)$, Space: $O(1)$

**Approach 2: Min-Heap**
```python
def kthSmallest_2(arr, k):
    heap = arr[:k]
    heapify(heap)  # O(k)
    for i in range(k, len(arr)):
        if arr[i] < heap[0]:
            heappop(heap)
            heappush(heap, arr[i])
    return heap[0]
```
Time: $O(n \log k)$, Space: $O(k)$

**Approach 3: Quickselect (Optimal)**
```python
def kthSmallest_3(arr, k):
    # Partition-based selection
    # Average case: O(n)
    # Worst case: O(n^2)
    return quickselect(arr, k-1)
```
Time: $O(n)$ average, $O(n^2)$ worst, Space: $O(1)$

**Approach 4: Median of Medians (Theoretical)**
Time: $O(n)$ worst-case guaranteed, Space: $O(\log n)$

**Recommendation:**
- $k$ small relative to $n$: Approach 2 (min-heap)
- General case: Approach 3 (quickselect) with random pivoting
- Guaranteed linear time needed: Approach 4 (rarely used in practice due to large constants)

---

## Appendix A: Complexity Cheat Sheet

### Common Data Structure Operations

| Data Structure | Access | Search | Insertion | Deletion | Space |
|----------------|--------|--------|-----------|----------|-------|
| Array | $O(1)$ | $O(n)$ | $O(n)$ | $O(n)$ | $O(n)$ |
| Dynamic Array | $O(1)$ | $O(n)$ | $O(1)$ amortized | $O(n)$ | $O(n)$ |
| Stack | $O(n)$ | $O(n)$ | $O(1)$ | $O(1)$ | $O(n)$ |
| Queue | $O(n)$ | $O(n)$ | $O(1)$ | $O(1)$ | $O(n)$ |
| Singly Linked List | $O(n)$ | $O(n)$ | $O(1)$* | $O(1)$* | $O(n)$ |
| Doubly Linked List | $O(n)$ | $O(n)$ | $O(1)$* | $O(1)$* | $O(n)$ |
| Hash Table | — | $O(1)$ avg | $O(1)$ avg | $O(1)$ avg | $O(n)$ |
| Binary Search Tree | $O(\log n)$ avg | $O(\log n)$ avg | $O(\log n)$ avg | $O(\log n)$ avg | $O(n)$ |
| Balanced BST (AVL/RB) | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ | $O(n)$ |
| Binary Heap | — | $O(n)$ | $O(\log n)$ | $O(\log n)$ | $O(n)$ |
| Trie | $O(m)$** | $O(m)$ | $O(m)$ | $O(m)$ | $O(alphabet \times n \times m)$ |

*At known position
**$m$ = length of string

---

### Common Sorting Algorithms

| Algorithm | Best | Average | Worst | Space | Stable? |
|-----------|------|---------|-------|-------|---------|
| Bubble Sort | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes |
| Selection Sort | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | No |
| Insertion Sort | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes |
| Merge Sort | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | Yes |
| Quick Sort | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ | No |
| Heap Sort | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ | No |
| Counting Sort | $O(n+k)$ | $O(n+k)$ | $O(n+k)$ | $O(k)$ | Yes |
| Radix Sort | $O(d(n+k))$ | $O(d(n+k))$ | $O(d(n+k))$ | $O(n+k)$ | Yes |
| Bucket Sort | $O(n+k)$ | $O(n+k)$ | $O(n^2)$ | $O(n)$ | Yes |

*$k$ = range of input, $d$ = number of digits

---

### Graph Algorithms

| Algorithm | Time Complexity | Space | Use Case |
|-----------|----------------|-------|----------|
| BFS | $O(V + E)$ | $O(V)$ | Shortest path (unweighted) |
| DFS | $O(V + E)$ | $O(V)$ | Cycle detection, topological sort |
| Dijkstra | $O((V + E) \log V)$* | $O(V)$ | Shortest path (non-negative weights) |
| Bellman-Ford | $O(VE)$ | $O(V)$ | Shortest path (negative weights) |
| Floyd-Warshall | $O(V^3)$ | $O(V^2)$ | All-pairs shortest path |
| Prim's | $O((V + E) \log V)$* | $O(V)$ | Minimum spanning tree |
| Kruskal's | $O(E \log E)$ | $O(V)$ | Minimum spanning tree |
| Topological Sort | $O(V + E)$ | $O(V)$ | Task scheduling (DAG) |
| Tarjan's SCC | $O(V + E)$ | $O(V)$ | Strongly connected components |

*With binary heap; can be improved with Fibonacci heap

---

## Appendix B: Asymptotic Notation Reference

### Formal Definitions

**Big O (Upper Bound):**
$$f(n) = O(g(n)) \iff \exists c > 0, n_0 > 0 : 0 \leq f(n) \leq c \cdot g(n), \forall n \geq n_0$$

**Big Omega (Lower Bound):**
$$f(n) = \Omega(g(n)) \iff \exists c > 0, n_0 > 0 : 0 \leq c \cdot g(n) \leq f(n), \forall n \geq n_0$$

**Big Theta (Tight Bound):**
$$f(n) = \Theta(g(n)) \iff \exists c_1, c_2 > 0, n_0 > 0 : c_1 \cdot g(n) \leq f(n) \leq c_2 \cdot g(n), \forall n \geq n_0$$

**Little o (Strict Upper Bound):**
$$f(n) = o(g(n)) \iff \lim_{n \to \infty} \frac{f(n)}{g(n)} = 0$$

**Little omega (Strict Lower Bound):**
$$f(n) = \omega(g(n)) \iff \lim_{n \to \infty} \frac{f(n)}{g(n)} = \infty$$

### Properties Summary

1. **Reflexivity:** $f(n) = \Theta(f(n))$
2. **Symmetry:** $f(n) = \Theta(g(n)) \iff g(n) = \Theta(f(n))$
3. **Transitivity:** If $f = O(g)$ and $g = O(h)$, then $f = O(h)$
4. **Max Rule:** $O(f(n) + g(n)) = O(\max(f(n), g(n)))$
5. **Product Rule:** $O(f(n)) \cdot O(g(n)) = O(f(n) \cdot g(n))$

---

## Further Reading

**Foundational Texts:**
- *Introduction to Algorithms* (CLRS) – Cormen, Leiserson, Rivest, Stein
- *The Art of Computer Programming* – Donald Knuth
- *Algorithm Design* – Kleinberg & Tardos

**Online Resources:**
- [Big-O Cheat Sheet](http://bigocheatsheet.com)
- MIT OpenCourseWare: 6.006 Introduction to Algorithms
- [Visualgo](https://visualgo.net) – Algorithm visualizations

**Practice Platforms:**
- LeetCode, HackerRank, Codeforces
- Project Euler (mathematical algorithms)

---

**End of Document**

*"Premature optimization is the root of all evil, but premature pessimization is the leaf, stem, and branch."* – Adapted from Donald Knuth
