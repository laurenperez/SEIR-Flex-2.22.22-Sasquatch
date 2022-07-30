
# Divide and Conquer Sorting

## Learning Objectives
<br>

- Students Will Be Able To:
	- Explain what a divide and conquer algorithm design is
    - Explain how quick sorts work
    - Explain how merge sorts work
    - Explain the time complexity of quick and merge sorts
    - Explain the advantages and disadvantages of quick and merge sorts

---
## Roadmap

* Setup
* Defining divide and conquer algorithm design
* Quick sorts
* Merge sorts
* Pros and cons
* Mechanics: the merge helper function

___

## Setup

* Clone down the starter code, install dependencies, and cd into project:
```
    $ git clone https://git.generalassemb.ly/shaw-kitajima/GA-Post-Course-CS.git
    $ cd GA-Post-Course-CS/
    $ npm i
    $ cd divide-and-conquer-sorting/
```

* run the tests
```
    $ npx mocha
```

* Open the project's folder in your code editor

---

## Divide and Conquer

``Divide and conquer`` is an algorithm design pattern that is based on multi-branched recursion (ex, go left and go right). Divide and conquer algorithms work by recursively breaking down a problem into multiple subproblems, until they become simple enough to be solved directly (in the case of sorts, a single element array is sorted!). The solutions to these subproblems are then combined to solve the original problem!

___

## Quick Sorts

Quick Sorts are a sorting algorithm that divides a list into three parts:

1. The ``pivot``: (a single element)
2. The ``left partition``: a list of data whose values are less than the pivot
3. The ``right parition``: a list of data whose values are greater than the pivot

**❓ Of these three parts, which is guaranteed to be sorted?**

Each partition would then be broken into their own three parts, until every partition is sorted. Once sorted, the three parts are combined in the order of: ``left``, ``pivot``, and ``right``, until the entire list of data is back together - at which point it will be considered sorted!

*What would we want to use as the ``pivot``? Since the time complexity of accessing either end of a list of data is better than accessing anywhere else, the first or last values are usually selected as the ``pivot``!*

### Visualizing a Quick Sort

<br>

![quick sort](https://ga-instruction.s3.amazonaws.com/assets/tech/computer-science/divide-conquer-sorts/2-Diagram.png)

<br>

### The Pseudocode for a Quick Sort

```js
    // base case: the array has one element
    // create the pivot, and take it out of the array
    // create the left partition
    // create the right parition
    // return a new array, made up of recursively calling the quickSort with the left partition, followed by the pivot, followed by the quickSort of the right partition 
```

**❓ Is the quick sort a comparison or distribution sort?**

<details>
    <summary><strong>❓ What is the time complexity of the quick sort?</strong></summary>

    Believe it or not, the worst case time complexity of a quick sort is still O(N^2). Why is this so? Consider a case where the pivot is always going to be the largest or smallest value within the partition, wouldn't we have to run the recursive function for every other element in the partition? 
    
</details>

___

## Merge Sorts

Merge sorts, like quick sorts, split the data into different sections. Unlike quick sorts though, merge sorts work by splitting the list in half over and over again, until the sub-data is considered sorted (there is only one element). Then it merges the small sorted pieces together, until everything is combined into a sorted list!

We can actually break down a merge sort into two phases: the ``divide`` and the ``merge``.

1. The ``divide`` phase splits the data in half until there is only one item left in the split data
2. The ``merge`` phase merges the split up pieces back together. The merge algorithm is sometimes called the ``merge helper`` function.

### Visualizing an Merge Sort

<br>

![merge sort](https://ga-instruction.s3.amazonaws.com/assets/tech/computer-science/divide-conquer-sorts/english/1-Phase1-Phase2-Diagram.png)

### The Pseudocode for a Merge Sort

```js
// base case: the array has one element
// find the middle point of the array
// put everything left of the middle into a 'left' array
// put everything right of (and including) the middle into a 'right' array
// call the mergeSort recursively on the 'left' array, saving the result to another array
// call the mergeSort recursively on the 'right' array, saving the result to another array
// return the result of calling the merge helper, passing in the sorted left and sorted right arrays
```

**❓ Is the insertion sort a comparison or distribution sort?**


<details>
    <summary><strong>❓ What is the time complexity of the merge sort?</strong></summary>

    The time compexity of the divide phase cuts the array in half with each iteration, making it a O(log(N)) operation. However, merging the data back together is an O(N) operation, as it will compare every item in each sub list. The combined time complexity then is O(N log(N))
    
</details>


___

## When to Use Each

Judging by the time complexities, we would be correct to wonder why we would ever use a quick sort over a merge sort at all. However, we also know that many browser implementations of the Javascript's ``sort`` algorithm are based on quick sorts.

This is because on average, quick sorts tend to be faster than merge sorts. This is in part due to the space complexity of merge sorts, which have to create temporary arrays to implement the merge.

Quick sorts work well in smaller lists of data, while merge sorts work well in larger lists of data.

In lists of data where you have many similar values, you would be inclined to use a merge sort over a quick sort due to how lopsided the partitions can get.

___

## Mechanics: The Merge Helper Function

The merge helper function's job is to merge two sorted lists into one sorted list. If we were to use ``[1, 5, 10]`` and ``[2, 6, 9]`` as an example, the merge function should ultimately return ``[1, 2, 5, 6, 9, 10]``. How can we do that?

The key to getting our algorithm to work is to *compare the first element of each array, and then add the smaller value to the results array*. You would continue to perform this until either one of the arrays you are merging is empty.

Let's take our example of ``[1, 5, 10]`` and ``[2, 6, 9]``


First, we would compare ``1``, and ``2``, and figure out that ``1`` gets to go to the results. At the end of this operation, our arrays would be as follows:

```
results = [1] arr1 = [5, 10] arr2 = [2, 6, 9]
```

Now we get to compare ``5`` and ``2``. Our results would be:

```
results = [1, 2] arr1 = [5, 10] arr2 = [6, 9]
```

After another round:

```
results = [1, 2, 5] arr1 = [10] arr2 = [6, 9]
```

Let's skip a few steps until we get to here:

```
results = [1, 2, 5, 6, 9] arr1 = [10] arr2 = []
```

At this point, arr2 will is empty, but our results still doesn't have all of the values. We are missing the data in arr1. So the final sorted array would be everything in results, everything in arr1, and everything in arr2. 

Why does this work? Let's pretend ``arr2`` also included ``500``, so our iterations would yield:

```
results = [1, 2, 5, 6, 9, 10] arr1 = [] arr2 = [500]
```

Even if ``arr2`` had data left it in, since ``arr1`` is empty, it doesn't matter if we put the contents of ``arr1`` before the contents of ``arr2``.

**❓ Does it matter at all if arr1 goes before arr2 in the final merge, or vice-versa?**

So what does the code for this look like?

```js
function mergeHelper(arr1, arr2) {
    const results = []; 
    while (arr1.length && arr2.length) {
        if(arr1[0] <= arr2[0]) {
            results.push(arr1.shift());
        } else {
            results.push(arr2.shift());
        }
    }
    return [...results, ...arr1, ...arr2];
}
```

___
## Essential Questions
1. When you divide an array in a quickSort, what values go inside the left partition?
2. When you are doing a merge sort, how many parts do you divide each array into?