
# Recursion

## Learning Objectives
<br>

- Students Will Be Able To:
	- Define recursion
    - Explain base cases in a recursive function
    - Explain the steps to write a recursive function
    - Explain how a recursive function works
    - Visualize a recursive function
    - Explain what memoization is
    - Explain the advantages and disadvantages of recursion

---
## Roadmap

* Setup
* Defining recursion
* Base cases
* The steps to write a recursive function
* How programs interpret recursive calls
* Recursion visualization
* Memoization with recursion
* The good and the bad of recursion
* Go over the solutions to the exercises

___

## Setup

* Clone down the starter code, install dependencies, and cd into project:
```
    $ git clone https://git.generalassemb.ly/shaw-kitajima/GA-Post-Course-CS.git
    $ cd GA-Post-Course-CS/
    $ npm i
    $ cd recursion/
```

* run the tests
```
    $ npx mocha
```

* Open the project's folder in your code editor

---
<br>


## Defining Recursion

<br>



![Recursion Meme](https://imgur.com/EqkvkCu.gif)

<br>

Recursion is easily defined as the action of a function calling itself. Therefore, a recursive function is a function that calls itself!

A recursive function typically has three parts
* the base case: when the process can stop
* the action: what to do (the meat and potatoes)
* the recursive call: Invoking itself, but in such a way that we get closer to the base case

**in Javascript, writing a function that calls itself is as easy as it sounds**

```js
function sayHello() {
    console.log('hello');
    sayHello();
}
```

**❓ What would happen if we run this function?**

___

<br>

## Ending Recursive Calls with Base Cases

<br>

In our super fun gif above, if we were patient enough, we saw the last block fall down, and then cause all of the preceding blocks to fall in place. This is where the base case kicks in: the function will stop calling itself, and the function will resolve all of its previous actions

Let's do a simple example of an easy base case, and then explain it

```js
function printXTimes(n) {
    // the base case
    if (n < 0) return;
    // the action
    console.log(`${n} more prints to go`);
    // the recursive call
    printXTimes(n - 1);
}
```

In this extremely simple example, our base case was set up, so that the function would stop running when n was less than 0. If n was not less than zero, it would print out the message, and then run the function again

**❓ What control flow operation does this look like, and what is the base case like in that operation?**

___

<br>

## The Steps to Write a Recursive Function

There are four basic steps that you will follow to create a recursive function:

1. Define your function and parameters
2. Define your base cases and return the computed result
3. Perform the action step
4. Return the function with new arguments that will progress toward the base case

We will be exploring these steps in the examples of recursive functions to follow!
___

<br>

## How Programs Interpret Recursive Calls + Visualization

Recursive functions rely on a thing called "the call stack". When a program calls a function, that function call goes to the top of the call stack (just like a stack of pancakes). You can add things one at a time, but when you take something off, you can only take it off from the top.

Let's write a classic recursive function and visualize it on the call stack!

```js

function factorial(n){
    if (n <= 0) return 1;
    return n * factorial(n-1);
}
```

When we invoke factorial with 4, the function call of ``factorial(4)`` is first placed on the call stack, and JS tries to figure out what that is, so the stack at this point looks like:

Stack | Return Result
------------ | -------------
factorial(4) | 4 * factorial(3)

When it runs factorial 4, it notices that it needs to invoke factorial again, so it will place ``factorial(3)`` on the call stack!

Stack | Return Result
------------ | -------------
factorial(3) | 3 * factorial(2)
factorial(4) | 4 * factorial(3)

Now we must run the factorial again, so off to the call stack it goes!

Stack | Return Result
------------ | -------------
factorial(2) | 2 * factorial(1)
factorial(3) | 3 * factorial(2)
factorial(4) | 4 * factorial(3)

Our call stack will grow until the item added onto the call stack meets the base case:

Stack | Return Result
------------ | -------------
factorial(0) | 1
factorial(1) | 1 * factorial(0)
factorial(2) | 2 * factorial(1)
factorial(3) | 3 * factorial(2)
factorial(4) | 4 * factorial(3)

At this point in time, we now can "unwind" our call stack, because we actually know what the returned result for ``factorial(0)`` evaluates to. In our first unwind, we know that ``factorial(0)`` is 1, so we can now replace the return result for ``factorial(1)``

Stack | Return Result
------------ | -------------
factorial(0) | 1
factorial(1) | 1
factorial(2) | 2 * factorial(1)
factorial(3) | 3 * factorial(2)
factorial(4) | 4 * factorial(3)

We can continue to unwind now, where we know what ``factorial(1)`` is, so we can update the return value for ``factorial(2)``

Stack | Return Result
------------ | -------------
factorial(0) | 1
factorial(1) | 1
factorial(2) | 2
factorial(3) | 3 * factorial(2)
factorial(4) | 4 * factorial(3)

If we continue to unwind, we will eventually figure out what ``factorial(4)`` is!

Stack | Return Result
------------ | -------------
factorial(0) | 1
factorial(1) | 1
factorial(2) | 2
factorial(3) | 6
factorial(4) | 24

___

<br> 

## Memoization 

One of the downfalls of recursion is the space complexity of it's operations. When we add a function call to the call stack, it is not allowed to leave until the final function call is resolved and unwound back to itself. 

This can become a huge problem when we are working on larger inputs, and the growth in the call stack can be almost impossible to fully comprehend.

Let's take a look at an example of this through the fibonacci sequence, and then talk about how we can improve it.

```js

function fib(n) {
    if (n <= 1) return n;
    console.log(`I have to add ${n} to the stack`);
    return fib(n - 1) + fib(n - 2);
}
```
If we were to run this function with 5 as our initial input, we can actually visualize our recursive calls to in in a tree structure, where the two children of the node is the two recursive calls it would make:

![fib call graphic](https://www.interviewcake.com/images/svgs/fibonacci__binary_tree_recursive.svg)

*graphic courtesy of interviewcake*

We should quickly notice that there are multiple function calls that are then performed again in other parts of our tree. 

**This is where memoization comes in to play**

``Memoization`` is the practice of ensuring that a function does not run for the same inputs more than once by keep a record of the results for the given inputs. The record is usually kept in an object!

Let's edit our ``fib`` function to take advantage of memoization

```js

let memo = {};
function fib(n) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];
    console.log(`I have to add ${n} to the stack`);
    let result = fib(n - 1) + fib(n - 2);
    memo[n] = result;
    return result;
}

```

**Let's try running each of our fib functions with ``23``, and see the difference in console logs and the time the function takes**

***Memoization will not be required in any of your assignments***

<br>

___

## The Good and the Bad of Recursion

As we work on the exercises, we will see that a lot of things that could be solved with recursion can also be solved with iteration (looping)! So we might wonder, why use recursion at all? 

### The Pros

Recursion is really great in situations where you need to split a problem into multiple chunks, or when you need to explore multiple paths.

Later on in this curriculum, we will explore specific examples of where recursion is a must, and cannot be replaced with a loop.

Believe it or not, we will also see that recursive code may be easier to read than their iterative cousins. When we look at the divide and conquer sorting algorithms later, our heads will likely explode if we try to code them with iteration.

### The Cons

But through the memoization example, we saw how wild the call stack could get. Therefore it should not be a surprise that recursion is usually slower than iteration, and requires much more space than iteration!


---
## Essential Questions
1. What is potential consequence of not including a base case in a recursive function?
2. What does memoization allow you to avoid?