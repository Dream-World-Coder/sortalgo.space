# Sorting with Minima Extraction

**How can we sort an array?**

in sorting the expectation from the output is quite simple, all progressive elemnts will be >= (or <= for larfest first) then current element. lets stick to ascending sorted order for now. SO how to sort? Can you think of an algorithm?


can't think of a way?
Umm, then try to guess what will be the first element of the sorted result.

since all other elements are greater or equal than it it will definitely be the smallest element.

thats it, you just got the first item of the expected output.

now how to get it though code?
```python
# pseudocode
function extractMin(array):
  N = array.lenght

  # start minIndex with smallest index
  minIndex = 1

  for index in 1..N:

    # update minIndex if smaller element is found
    if array[i] < array[minIndex]:
      minIndex = i

  return minIndex
```

so now that the first element of the sorted output is acheieved, now try guessing the next.

yes, it will be an element that is smaller (or eqal to) than all other elements & greater than (or eq to) the first element.

so its the second smallest now.

how to extract it then ? the `extractMin` function is definitely failing here. its always going to return the smallest.
But if our array did not had the current smallest, then what would `extractMin` return?
its the 2nd smallest!

so just remove (or somehow avoid) accounting the smallest element. then you will get the second element through `extractMin`.

so second element is also done.

how about 3rd element? u guessed it right, its the 3rd minima.

thus we can observe that element at position i is the ith minima.

so if we can find these ith minimas, our problem is solved. we will acheive our target of sorting.

lest do it through code:
```py
for i in 1..N:

```

// selection sort : O(1) space

// time complexity

heap : extract min is log n now, so nlogn!
