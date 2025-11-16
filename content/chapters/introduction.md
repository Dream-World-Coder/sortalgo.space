<!--metadata
  title: "What is Sorting?"
  authors: ["Subhajit Gorai"]
  dateCreated: "15/11/2025"
  dateEdited: "16/11/2025"
  description: "..."
  tags: ["sorting"]
  slug: "introduction"
-->

# What is Sorting?

Sorting is the process of arranging elements in a list or array in a specific order, typically **ascending** (smallest to largest) or **descending** (largest to smallest). It is a fundamental operation in computer science used to organize data for efficient searching, processing, and presentation.

At first glance, sorting seems simple—just rearrange items until they're in order. But the challenge lies in **how many possible arrangements** exist and **how much work** is needed to find the correct one.

Consider a list of \( n \) **distinct** elements. The total number of possible arrangements (permutations) is: $n \times (n-1) \times (n-2) \times \cdots \times 1 = n!$

Each of these \( n! \) arrangements is **equally likely** if the list is randomly ordered. So, the probability of the list being in the **correct sorted order** by chance is: $P(\text{sorted}) = \frac{1}{n!}$

### Comparision

| \( n \) | \( n! \)  | $ \frac{1}{n!} $                |
| ------- | --------- | ------------------------------- |
| 3       | 6         | $ \frac{1}{6} \approx 0.167 $   |
| 5       | 120       | $ \frac{1}{120} \approx 0.008 $ |
| 10      | 3,628,800 | $ \approx 2.8 \times 10^{-7} $  |

As \( n \) grows, \( n! \) explodes—**there are vastly more wrong orders than right ones**.
