<!--metadata
  title: "stable and unstable sort"
  authors: ["Subhajit Gorai"]
  dateCreated: "15/11/2025"
  dateEdited: "20/11/2025"
  description: "..."
  tags: ["sorting"]
  slug: "stable-and-unstable-sort"
-->

# Stable and Unstable Sort

**<u>Stable sort:</u>**
A sorting algorithm is stable if, when two elements have the same key (the value being compared), their relative order from the original input is preserved in the sorted output.
**Examples:** Merge Sort, Insertion Sort, Bubble Sort

**<u>Unstable sort:</u>**
In unstable sort, the relative order of same key elements is not preserved.
**Examples:** Heap Sort, Selection Sort, Quick Sort

**<u>Demonstration:</u>**
Suppose you're sorting an array of tuples by the first element only:
`[(1, a), (4, a), (3, x), (4, b)]`
Sorted by first element -> (keys: 1, 4, 3, 4):
`[(1, a), (3, x), (4, b), (4, a)]` # 4a and 4b order swapped
Here, (4, a) originally came before (4, b), but after sorting, it's after.
So the algorithm is **unstable**.


### How to understand if a sorting algorithm is going to be stable or unstable?

It can't be determined, mainly depends on the implementation and if the algorithm consistently places the earlier-occurring element first. The algorithms mentioned in examples of unstable sort not necessarily show changed relative order for every input, in certain cases only they show unstability. However, these two rules can be somewhat considerable.

- If adjacent elements are compared and swapped then its going to be stable.
	- In <u>Bubble Sort</u>, we compare adjacent pairs, so for similar values, first item is going to process and place first, thus stable.
	- In <u>Insertion sort</u> also adjacent pairs are compared & swapped.
	- In <u>Merge Sort,</u> the merge function compares two sub arrays element by element and puts in a temporary array & later copies them. During the merge step, <mark>when two elements are equal, we always take from the left subarray first,</mark> and for individual subarrays order is always left to right. This ensures the earlier element is placed first, thus preserving the original order.

- If elements are abruptly picked and compared, then it is going to be unstable.
	- In <u>Selection Sort</u> we find the minimum element and swap it with the current element. This long-distance swap can move an equal element past its duplicate, breaking the original order.
		-  eg: sorting `[(3,x), (3,y), (1,x)]`
		- first `(3,x) & (1,x)` are swapped.
		- so `[(1,x), (3,y), (3,x)]` is the result.
		- but sorting `[(3,x), (3,y), (1,x), (2,x)]` will give stable result.
	- In <u>Quick Sort</u> <mark>the partition index creates abrupt placement and hence instability.</mark> Consider the case for similar valued list:
		- sorting: `[(3,a), (2,x), (3,b)]`
		- partition element = (3,b) (last element as pivot)
		- after partition: `[<partition]+[partition]+[>=partition]` -> `[(2,x), (3,b), (3,a)]`
		- (3,b) jumped ahead of (3,a): __order changed__
	- In <u>Heap Sort</u> we first build a max-heap from the array and then repeatedly extract the maximum element. During heapify operations, <mark>elements are moved based on heap property (parent >= children), not their original order.</mark> When building the heap or performing heapify, equal elements can be placed in arbitrary positions.
		- eg: sorting `[(3,a), (3,b), (1,x)]`
		- after building max-heap and extracting: `[(1,x), (3,b), (3,a)]`
		- (3,b) came before (3,a): __order changed__
