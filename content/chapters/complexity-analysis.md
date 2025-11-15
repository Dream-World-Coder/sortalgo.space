# Complexity Analysis

---

## Preface

In the realm of computer science, understanding how algorithms perform is paramount. **Complexity analysis** provides the mathematical framework to evaluate the efficiency of algorithms in terms of time and space. This book-like guide takes you from foundational concepts to advanced techniques, with rigorous definitions, proofs, examples, and practical insights.

Whether you're preparing for technical interviews, designing scalable systems, or pursuing research in theoretical computer science, this resource serves as a definitive reference.

---

## Table of Contents

1. [Introduction to Algorithmic Efficiency](#chapter-1-introduction-to-algorithmic-efficiency)
2. [Time Complexity](#chapter-2-time-complexity)
3. [Space Complexity](#chapter-3-space-complexity)
4. [Big O Notation](#chapter-4-big-o-notation)
5. [Omega $(\Omega)$ and Theta $(\Theta)$ Notations](#chapter-5-omega-and-theta-notations)
6. [Best, Average, and Worst Cases](#chapter-6-best-average-and-worst-cases)
7. [Amortized Analysis](#chapter-7-amortized-analysis)
8. [Master Theorem](#chapter-8-master-theorem)
9. [Recurrence Relations](#chapter-9-recurrence-relations)
10. [Common Complexity Classes](#chapter-10-common-complexity-classes)
11. [NP-Completeness and Beyond](#chapter-11-np-completeness-and-beyond)
12. [Practical Analysis Techniques](#chapter-12-practical-analysis-techniques)
13. [Exercises and Solutions](#exercises-and-solutions)

_Appendix A: Mathematical Prerequisites_
_Appendix B: Glossary of Terms_
_Bibliography_

---

## Chapter 1: Introduction to Algorithmic Efficiency

> _"Premature optimization is the root of all evil."_ — Donald Knuth

Yet, understanding efficiency is essential for writing robust, scalable software.

### 1.1 Why Analyze Complexity?

- Predict performance without running code
- Compare algorithms objectively
- Scale solutions to large inputs
- Identify bottlenecks early

### 1.2 Measuring Cost

We abstract away:

- Machine-specific details
- Constant factors
- Low-order terms

Focus: **growth rate** as input size $ n \to \infty $

---

## Chapter 2: Time Complexity

**Time complexity** measures the number of primitive operations an algorithm performs as a function of input size.

### 2.1 Counting Operations

```python
# Example: Linear Search
def linear_search(arr, target):
    for i in range(len(arr)):    # n iterations
        if arr[i] == target:    # 1 comparison
            return i            # 1 return
    return -1                   # 1 return
```

**Operations counted**: $ n + 2 $ → dominant term: $ n $

### 2.2 Formal Definition

Let $ T(n) $ be the number of unit operations for input size $ n $.

$$
T(n) = \text{exact count of operations}
$$

We classify $ T(n) $ using asymptotic notations.

---

## Chapter 3: Space Complexity

**Space complexity** measures memory usage (excluding input).

### 3.1 Types of Space

| Type         | Description                     |
| ------------ | ------------------------------- |
| **Fixed**    | Constants, variables            |
| **Variable** | Recursion stack, dynamic arrays |

### 3.2 Example: Merge Sort

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])    # O(n) extra space
    right = merge_sort(arr[mid:])
    return merge(left, right)
```

**Space**: $ O(n) $ auxiliary + $ O(\log n) $ recursion depth

---

## Chapter 4: Big O Notation

> Upper bound: "at most this slow"

### 4.1 Formal Definition

$$
f(n) = O(g(n)) \iff \exists c > 0, n_0 > 0 \text{ such that } 0 \leq f(n) \leq c \cdot g(n) \quad \forall n \geq n_0
$$

### 4.2 Common Big O Classes

| Notation        | Name         | Example                          |
| --------------- | ------------ | -------------------------------- |
| $ O(1) $        | Constant     | Array access                     |
| $ O(\log n) $   | Logarithmic  | Binary search                    |
| $ O(n) $        | Linear       | Linear search                    |
| $ O(n \log n) $ | Linearithmic | Merge sort                       |
| $ O(n^2) $      | Quadratic    | Bubble sort                      |
| $ O(2^n) $      | Exponential  | Recursive Fibonacci              |
| $ O(n!) $       | Factorial    | Traveling Salesman (brute force) |

### 4.3 Rules of Thumb

1. Drop constants: $ 5n^2 \to O(n^2) $
2. Drop lower-order terms: $ n^2 + n \to O(n^2) $
3. Multiplicative: $ O(f) \cdot O(g) = O(f \cdot g) $

---

## Chapter 5: Omega $(\Omega)$ and Theta $(\Theta)$ Notations

### 5.1 Omega: Lower Bound

$$
f(n) = \Omega(g(n)) \iff \exists c > 0, n_0 \text{ such that } f(n) \geq c \cdot g(n) \quad \forall n \geq n_0
$$

> "at least this fast"

### 5.2 Theta: Tight Bound

$$
f(n) = \Theta(g(n)) \iff f(n) = O(g(n)) \text{ and } f(n) = \Omega(g(n))
$$

> "exactly this order"

**Example**: Binary search → $ \Theta(\log n) $

---

## Chapter 6: Best, Average, and Worst Cases

| Case        | When                       | Example                       |
| ----------- | -------------------------- | ----------------------------- |
| **Best**    | Optimal input              | Sorted array in binary search |
| **Worst**   | Adversarial input          | Reverse sorted in bubble sort |
| **Average** | Expected over random input | QuickSort (random pivot)      |

### 6.1 QuickSort Analysis

- **Worst**: $ O(n^2) $ (already sorted)
- **Average**: $ \Theta(n \log n) $
- **Best**: $ \Theta(n \log n) $

---

## Chapter 7: Amortized Analysis

For operations that are occasionally expensive.

### 7.1 Methods

1. **Aggregate Method**
2. **Accounting Method**
3. **Potential Method**

### 7.2 Example: Dynamic Array

```python
array = []
for i in range(n):
    array.append(i)  # Occasionally resizes
```

**Amortized**: $ O(1) $ per append → total $ O(n) $

---

## Chapter 8: Master Theorem

Solves recurrences of form:

$$
T(n) = a T\left(\frac{n}{b}\right) + f(n)
$$

### 8.1 Conditions

| Case | Condition                                  | Result                                 |
| ---- | ------------------------------------------ | -------------------------------------- |
| 1    | $ f(n) = O(n^{\log_b a - \epsilon}) $      | $ T(n) = \Theta(n^{\log_b a}) $        |
| 2    | $ f(n) = \Theta(n^{\log_b a}) $            | $ T(n) = \Theta(n^{\log_b a} \log n) $ |
| 3    | $ f(n) = \Omega(n^{\log_b a + \epsilon}) $ | $ T(n) = \Theta(f(n)) $                |

**Example**: Merge Sort → $ a=2, b=2, f(n)=O(n) $ → Case 2 → $ \Theta(n \log n) $

---

## Chapter 9: Recurrence Relations

### 9.1 Types

- Linear
- Divide and Conquer
- Non-homogeneous

### 9.2 Solving Techniques

1. **Substitution**
2. **Recursion Tree**
3. **Characteristic Equation**

---

## Chapter 10: Common Complexity Classes

| Class           | Growth       | Real-World Use          |
| --------------- | ------------ | ----------------------- |
| $ O(1) $        | Constant     | Hash map lookup         |
| $ O(\log n) $   | Logarithmic  | Balanced BST            |
| $ O(n) $        | Linear       | Single pass             |
| $ O(n \log n) $ | Linearithmic | Efficient sorting       |
| $ O(n^2) $      | Quadratic    | Simple graph algorithms |
| $ O(2^n) $      | Exponential  | Subset generation       |

---

## Chapter 11: NP-Completeness and Beyond

### 11.1 P vs NP

- **P**: Solvable in polynomial time
- **NP**: Verifiable in polynomial time

### 11.2 NP-Complete Problems

- SAT
- Traveling Salesman
- Knapsack

> No known polynomial solution (unless P=NP)

---

## Chapter 12: Practical Analysis Techniques

### 12.1 Profiling vs Analysis

| Method              | Pros       | Cons              |
| ------------------- | ---------- | ----------------- |
| **Static Analysis** | Predictive | Approximate       |
| **Profiling**       | Accurate   | Machine-dependent |

### 12.2 Tips

1. Focus on loops
2. Count dominant operations
3. Consider input distribution
4. Use benchmarks for constants

---

## Exercises and Solutions

### Exercise 1: Find Time Complexity

```c
for (i = 1; i <= n; i *= 2)
    for (j = 1; j <= i; j++)
        print(j);
```

**Solution**: $ O(n) $

_Reasoning_: Outer loop: $ \log n $ iterations. Inner: $ 1 + 2 + 4 + \dots + n = 2n - 1 $

---

### Exercise 2: Space Complexity

```python
def fib(n, memo={}):
    if n in memo: return memo[n]
    if n <= 1: return n
    memo[n] = fib(n-1, memo) + fib(n-2, memo)
    return memo[n]
```

**Solution**: $ O(n) $ space (memo + recursion depth)

---

## Appendix A: Mathematical Prerequisites

- Logarithms: $ \log_b a = \frac{\ln a}{\ln b} $
- Series: $ \sum\_{i=1}^n i = \frac{n(n+1)}{2} $
- Asymptotic dominance hierarchy

---

## Appendix B: Glossary

| Term              | Definition                   |
| ----------------- | ---------------------------- |
| **Asymptotic**    | Behavior as $ n \to \infty $ |
| **Dominant Term** | Highest growth rate          |
| **Tight Bound**   | Both upper and lower         |

---

## Bibliography

1. Cormen, T. H., et al. _Introduction to Algorithms_ (CLRS), 4th Ed.
2. Knuth, D. _The Art of Computer Programming_
3. Sedgewick, R. _Algorithms_, 4th Ed.

---

_End of Book_

> **Note**: This guide uses formal mathematical notation and assumes familiarity with discrete mathematics. For interactive learning, pair with coding practice on platforms like LeetCode or HackerRank.

```

```
