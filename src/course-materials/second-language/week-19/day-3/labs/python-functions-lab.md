---
track: "Second Language"
title: "Python Functions Lab"
week: 19
day: 3
type: "lab"
---


# Python Functions Lab

<br>
<br>
<br>


## Intro

Time to practice some Python by writing functions that solve the four challenges below.

To test your functions, be sure to call each function at least once and `print` the returned value.

<br>
<br>
<br>


## Set Up

Create a new Python repl on [repl.it](https://repl.it)

<br>
<br>
<br>


## Challenges

1. Write a function named `sum_to` that accepts a single integer, `n`, and returns the sum of the integers from 1 to `n`.
	
	For example:

	```python
	sum_to(6)  # returns 21
	sum_to(10) # returns 55
	```
<br>
<br>


2. Write a function named `largest` that takes a list of numbers as an argument and returns the largest number in that list.

	For example:
	
	```python
	largest([1, 2, 3, 4, 0])  # returns 4
	largest([10, 4, 2, 231, 91, 54])  # returns 231
	```


<br>
<br>

3. Write a function named `occurances` that takes two string arguments as input and counts the number of occurances of the second string inside the first string.

	For example:

	```python
	occurances('fleep floop', 'e')   # returns 2
	occurances('fleep floop', 'p')   # returns 2
	occurances('fleep floop', 'ee')  # returns 1
	occurances('fleep floop', 'fe')  # returns 0
	```


<br>
<br>



4. Write a function named `product` that takes an *arbitrary* number of numbers, multiplies them all together, and returns the product.<br>(HINT: Review your notes on `*args`).

	For example:
	
	```python
	product(-1, 4) # returns -4
	product(2, 5, 5) # returns 50
	product(4, 0.5, 5) # returns 10.0
	```

<!-- 
<br>
<br>
<br>
<br>


## Solution 

[Here's some possible solutions to these](https://repl.it/@DanielJS/Python-Functions-Lab-Solutions) (don't peek unless you absolutely have to!) 
->