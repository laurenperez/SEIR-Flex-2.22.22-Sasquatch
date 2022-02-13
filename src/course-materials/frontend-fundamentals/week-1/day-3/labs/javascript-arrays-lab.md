---
track: "Frontend Fundamentals"
title: "JavaScript Arrays Lab"
week: 1
day: 3
type: "lab"
---

# JavaScript Arrays Lab

<br>
<br>
<br>

### [Click here](https://generalassembly.zoom.us/rec/share/zpgG4dRZhZywXzBOoGhonXzifM7E9zDhOEkHMvr3nXn50p9H9PPuxy2rEUXHiDnw.J039KsWMt0wBMpZu?startTime=1613669670000) to access walkthrough recording

<br>
<br>
<br>

## Introduction

This lab provides an opportunity to practice defining, accessing and manipulating arrays.

> **Note:** Feel free to reference the arrays lesson, collaborate, google, etc.

<!-- This lab **is deliverable**, when completed, please click the **"Submit Homework"** link above **(it's the same form in the navbar)** to submit your lab work to your instructional team. -->

<br>
<br>

## Setup & Instructions

For the exercises in this lab, create a `JavaScript` `REPL` from [repl.it](https://repl.it) -- you can name it `"JavaScript Arrays lab"`.

<br>
<br>

## Exercise

Copy the exercises below into the included **script.js** file and code away!

**Please note:** **_You will most likely need to comment out the `console.logs` for the exercises you've yet to complete to avoid getting a_** **<span style="color: #673ab7;">Reference Error</span>**

```javascript
/*
Exercise 1:
  - Define an empty array named foods
*/

// Exercise 1 has been completed for you...

const foods = []

console.log("Exercise 1 Result: ", foods)

/*
Exercise 2:
  - Add the strings 'pizza' & 'cheeseburger' to the foods array such that 'pizza' comes before 'cheeseburger'.
*/

// Complete Exercise 2 below...

console.log("Exercise 2 Result: ", foods)

/*
Exercise 3:
  - Add the string 'taco' to the foods array so that 'taco' is the first food in the array.
*/

// Complete Exercise 3 below...

console.log("Exercise 3 Result: ", foods)

/*
Exercise 4:
  - Access the string 'pizza' (based upon its known position) in the foods array and assign to a variable named favFood.
*/

// Complete Exercise 4 below...

console.log("Exercise 4 Result: ", favFood)

/*
Exercise 5:
  - Insert the string 'tofu' in the foods array between 'pizza' & 'cheeseburger'
*/

// Complete Exercise 5 below...

console.log("Exercise 5 Result: ", foods)

/*
Exercise 6:
  - Replace the string 'pizza' in the foods array with the strings 'sushi' & 'cupcake'.
*/

// Complete Exercise 6 below...

console.log("Exercise 6 Result: ", foods)

/*
Exercise 7:
  - Use the slice method on the foods array to create a new array containing 'sushi' & 'cupcake'.
  - Assign the new array to a variable named yummy.
*/

// Complete Exercise 7 below...

console.log("Exercise 7 Result: ", yummy)

/*
Exercise 8:
  - Using the indexOf method on the foods array, assign the index of the 'tofu' string to a variable named soyIdx.
*/

// Complete Exercise 8 below...

console.log("Exercise 8 Result: ", soyIdx)

/*
Exercise 9:
  - Assign to a variable named allFoods the result of joining the strings in the foods array such that the result is the following single string:
    'taco -> sushi -> cupcake -> tofu -> cheeseburger'
*/

// Complete Exercise 9 below...

console.log("Exercise 9 Result: ", allFoods)

/*
Exercise 10:
  - Assign a boolean to a variable named hasSoup depending upon whether or not the foods array includes the string 'soup'.
*/

// Complete Exercise 10 below...

console.log("Exercise 10 Result: ", hasSoup)

/*
Exercise 11:
  - Use the forEach method to iterate through the provided nums array and add each odd number to a new array named odds.
  - Hint: Initialize the odds variable to an empty array before the iteration.
*/

const nums = [100, 5, 23, 15, 21, 72, 9, 45, 66, 7, 81, 90]

// Complete Exercise 11 below...

console.log("Exercise 11 Result: ", odds)

/*
Exercise 12:
  - Use the forEach method to iterate through the same nums array and add the number to arrays named fizz, buzz and/or fizzbuzz based upon the following:
  	- Add to the fizz array if the number is evenly divisible by 3.
  	- Add to the buzz array if the number is evenly divisible by 5.
  	- Add to the fizzbuzz array if the number is evenly divisible by 3 & 5.
*/

// Complete Exercise 12 below...

console.log("Exercise 12 Results:")
console.log("  fizz:", fizz)
console.log("  buzz:", buzz)
console.log("  fizzbuzz:", fizzbuzz)

/*
Exercise 13:
  - Given the below numArrays array of arrays (two-dimensional array), assign the last nested array to a variable named numList.
  - Assume you don't know how many nested arrays numArrays contains.
*/

const numArrays = [
  [100, 5, 23],
  [15, 21, 72, 9],
  [45, 66],
  [7, 81, 90],
]

// Complete Exercise 13 below...

console.log("Exercise 13 Result: ", numList)

/*
Exercise 14:
  - Given the above numArrays array, access the number 66 and assign to a variable named num.
*/

// Complete Exercise 14 below...

console.log("Exercise 14 Result: ", num)

/*
Exercise 15:
  - Given the above numArrays array, use nested forEach methods to sum up all the numbers contained within numArrays and assign to a variable named total.
  - Hint: Be sure to declare and initialize the total variable before the iterations.
*/

// Complete Exercise 15 below...

console.log("Exercise 15 Result: ", total)
```

<br>
<br>

## Additional Resources

- [MDN Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
