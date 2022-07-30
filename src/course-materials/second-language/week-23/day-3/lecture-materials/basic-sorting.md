
# Basic Sorting

## Learning Objectives
<br>

- Students Will Be Able To:
	- Explain the difference between comparison and distribution sorts
    - Explain how bubble sorts work
    - Explain how insertion sorts work
    - Explain the time complexity of bubble and insertion sorts
    - Swap elements within an array
    - Redistribute elements within an array

---
## Roadmap

* Setup
* Defining comparison and distribution sorts
* Bubble sorts
* Insertion sorts
* Mechanics: swapping elements in an array
* Mechanics: redistributing elements into an array

___

## Setup

* Clone down the starter code, install dependencies, and cd into project:
```
    $ git clone https://git.generalassemb.ly/shaw-kitajima/GA-Post-Course-CS.git
    $ cd GA-Post-Course-CS/
    $ npm i
    $ cd basic-sorting/
```

* run the tests
```
    $ npx mocha
```

* Open the project's folder in your code editor

---

## Comparison and Distribution Sorts

### Comparison Sorts

``Comparison Sorts`` are sorts in which you compare two items and decide which one to put first. When you compare, you will have to choose what to compare against the other, ex: the values for numbers, the alphabet for words, or even the sizes for legos like below:

![lego comparison sort](https://ga-instruction.s3.amazonaws.com/assets/tech/computer-science/intro-sorting/comparison.gif)

## Distribution Sorts
``Distribution Sorts`` are sorts in which you use some property of the item to decide where it fits. This usually results in us dividing items into groups based on some characteristic of the item. Back to lego blocks, we could group them by color:

![lego comparison sort](https://ga-instruction.s3.amazonaws.com/assets/tech/computer-science/intro-sorting/distribution.gif)

***There is no better or worse for distribution and comparison sorts. They simply do different things, so what type of sorting method you use would be based on the data you are sorting, and the output you want***


___

## Bubble Sorts

Bubble Sorts are one of the most simple and intuitive sorting algorithms available, which is why they are so popular in interviews, even if they are almost never used in practice. You may be asked to sketch out how a bubble sort works, or you may be asked about the time complexity of the bubble sort.

Bubble sorts work in such a fashion that you iterate across whatever you are sorting, comparing each adjacent item, and swapping them if they are out of order. You will continue to iterate across the data until you have successfully iterated without performing a single swap. 

***Why does this work? Isn't it true that the data is sorted if you went went all the way through it and never had to swap any items?***

### Visualizing a Bubble Sort

![bubble sort](https://ga-instruction.s3.amazonaws.com/assets/tech/computer-science/basic-sorts/bubble-sort.gif)

### The Pseudocode for a Bubble Sort

```js
    // initialize swapped as true
    // while swapped
        // swapped becomes false (innocent until proven guilty!)
        // iterate across data
            // if we need to swap
                // swap the items
                // update swapped to true
    // return sorted data
```

**❓ Is the bubble sort a comparison or distribution sort?**

**❓ What is the time complexity of a bubble sort?**

___

## Insertion Sorts

When you are sorting cards in your hand, you are typically using a variation of insertion sorts. Insertion sorts are a bit faster than bubble sorts, and work by splitting the data into sorted and unsorted sections. Values are picked from the unsorted section, and placed in the correct location in the sorted section. 

***Why does this work? If we move items from the list from the unsorted to the sorted section, we will eventually have nothing unsorted left, and everything will be in the correct place in the sorted section***

### Visualizing an Insertion Sort

![insertion sort](https://ga-instruction.s3.amazonaws.com/assets/tech/computer-science/basic-sorts/insertion-sort.gif)

### The Pseudocode for an Insertion Sort

```js
// iterate across data
    // take out the item from the data
    // save the index you are on to a variable: "z"
    // while "z" is both:
        // greater than 0 
        // smaller than the item in the index of the data that comes before "z"
            // decrement "z"
    // add the item back in at the index of "z"
```

**❓ Is the insertion sort a comparison or distribution sort?**


**❓ What is the time complexity of a insertion sort?**


___

## Mechanics: How to Swap Elements in an Array

One of the things that new developers struggle with is swapping elements in an array. Let's say you are given a an array of ``[1, 2, 3]``, and you want to swap ``1`` and   ``2``, but you ***couldn't*** explicit swap using code like this:

```js
const arr = [1, 2, 3];
arr[0] = 2;
arr[1] = 1
```

Instead, you were told that you could only use the indices of the array to swap the values. The first thing we would think of doing is something like this:

```js
const arr = [1, 2, 3];
arr[0] = arr[1];
arr[1] = arr[0];
```

<details>
    <summary>❓ What would go wrong with this?</summary>

    We'd overwrite arr[0]'s value with arr[1]'s value, so when we try to update arr[1] with arr[0], we'd already lost what arr[0] used to be!
    
</details>


So how can we overcome this problem? The old answer is to use a placeholder!


```js
const arr = [1, 2, 3];
let placeholder = arr[0];
arr[0] = arr[1];
arr[1] = placeholder;
```

But wait. With ECMA2015, we have been given access to the ``destructuring`` assignment. With the ``destructuring`` assignment, you are able to unpack values from arrays (or object properties), into distinct variables. What this means in practice is that we can create variables from arrays, where the values of the variables are assigned by the position within the array you are destructuring:

```js
let [a, b] = [10, 20];
console.log(a, b);
```

So how can this be used for swapping variables? Why don't we create the array we are destructuring using the values we want to swap, and assign them back?

```js
let a = 10;
let b = 20;
[a, b] = [b, a];
console.log(a, b);
```

And with some magical witchcraft, we can bring this back to the original problem. How can we swap array indices?

```js
const arr = [1, 2, 3];
[arr[0], arr[1]] = [arr[1], arr[0]];
```

___

## Mechanics: Redistributing Elements into an Array

When we do insertion sorts, we are not actually taking elements out of one array, and putting it into a separate array. Instead, we are taking an element out of the array, and then placing it back into the same array, but at a different location.

So let's say we are given a longer array ``[1, 2, 3, 4, 5, 6]``, and I wanted to place the ``4`` before the ``2``, the go-to approach would be to take advantage of the [array.splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) method.

The ``splice`` method accepts the following arguments:

1. ``start``: the end at which to start changing the array
2. ``deleteCount``: how many elements to remove, starting from ``start``
3. ``item1, item2, ...``: what elements to add to the array, starting from ``start``. If you do not provide any elements to add, ``splice`` will only remove from the array.

The ``splice`` method **returns** an array containing the deleted elements.

So in our example, we would want to first remove 4 from our array. Let's take a look at what to do:

```js
const arr = [1, 2, 3, 4, 5, 6];
let removed = arr.splice(3, 1);
```

<details>
    <summary>❓ What would "removed" be at this point?</summary>

    [4]. So if we wanted to access the number 4, we should do:

    let removed = arr.splice(3, 1)[0]
    
</details>

So at this point we have successfully taken ``4`` out of our array. Our next mission will be to place it right before ``2``. This is how we would take advantage of the ``splice`` method!

```js
const arr = [1, 2, 3, 4, 5, 6];
let removed = arr.splice(3, 1)[0];
arr.splice(1, 0, removed);
```

One way of thinking about the insertion is to think: which index do I want the new elements to come from. In our case, we wanted ``4`` to come before ``2``, so we wanted our element to be the new index ``1``. Therefore, ``start`` would be ``1``, and we would not delete anything!
___
## Essential Questions
1. What determines if we need to run another iteration across our data in a bubble sort?
2. When performing an insertion sort, how do we know when the algorithm has finished the sort?