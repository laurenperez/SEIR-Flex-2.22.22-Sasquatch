---
track: "Frontend Fundamentals"
title: "JavaScript Arrays"
week: 1
day: 3
type: "lecture"
---

# JavaScript Arrays

<br>
<br>
<br>
<br>

## Learning Objectives

Students will be able to:

- Describe the Use Case for Arrays
- Create Arrays Using Literal Syntax and the Array Class
- Access the Elements in an Array
- Add an Element to the Front or End of an Array
- Remove an Element from the Front or End of an Array
- Add/Remove Elements to/from Anywhere in the Array
- Iterate Over All of the Elements in an Array
- Copy All or Some of an Array
- Create a Single String from an Array

<br>
<br>

## Roadmap

1. Lesson Setup
2. The Use Case (What & Why) of Arrays
3. Creating Arrays
4. Accessing Elements in an Array
5. Adding Elements to an Array
6. Removing Elements from an Array
7. Iterating Over the Elements
8. Copying an Array
9. Create a String from an Array
10. Essential Questions
11. Further Study

<br>
<br>

### Lesson Setup

For this lesson, we're going to code along using a `JavaScript` `REPL` from [repl.it](https://repl.it) -- you can name it `"JavaScript Arrays Practice"`.

### The Use Case (What & Why) of Arrays

- <strong>What are Arrays?</strong> - Technically, arrays in JS are objects - Arrays are "list-like" objects with keys of "0", "1", etc - They contain zero or more items called - **elements** (not to be confused with HTML elements) - Each element in an array can hold any data type including objects, functions, even other arrays - Unlike objects, their items are considered to be **ordered** - It is a best practice to name array variables plurally, e.g., `let colors = ['red', 'green', 'blue'];`

* <strong>Why use Arrays?</strong> - Arrays are the data structure of choice for holding lists of data - Without complex data types such as arrays or objects, we'd have to store every individual piece of data in separate variables resulting is lots of messy code

<br>
<br>

### Creating Arrays

- There are two ways to create an array...

      	```javascript
      	// using a Class/Constructor Function (less common syntax)
      	let nums = new Array(2, 4, 18);

      	// using Array Literal syntax (recommended best practice)
      	let nums = [2, 4, 18];
      	```

- The best practice is to use the _Array Literal_ syntax because it's more concise and the Class approach behaves differently if you pass only one argument

<br>
<br>

### Creating Arrays - Exercise (2 mins)

- Create an array consisting of three of your favorite movies (strings) and assign it to a variable named `movies`

<br>
<br>

### Accessing Elements in an Array

- We access elements in an array using **square bracket notation**, passing in the "index" (position) of the element you want to access:

      	```javascript
      	let movies = ['Caddyshack', 'Interstellar', 'Scarface'];
      	let firstMovie = movies[0];  // 'Caddyshack'
      	```

> Since when is `0` the first item in anything? Since computer science came along!<br> Internally, programs prefer to think in terms of "offsets" in memory. Thus, we access the first item using an offset of zero - arrays are "zero-based" in JS.

- We can add elements to the **end** of an array using the `push` method:

      	```javascript
      	movies.push('Trading Places', 'Antitrust');
      	```
      	Note that more than one element can be added at a time.

- We can also add to the **front** of an array with `unshift`:

      ```javascript
      movies.unshift('Star Wars');
      ```

  <br>
  <br>

### Removing Elements from an Array

- We can remove a single element from the **end** of an array using the `pop` method:

      	```javascript
      	let movie = movies.pop();
      	```

- We can also remove from the **front** of an array with `shift`:

      	```javascript
      	movie = movies.shift();
      	```

- `pop` and `shift` only remove one element at a time and don't take any arguments

<br>
<br>


### Remembering `unshift` & `shift`

- `push` & `pop` are easy to remember, but `unshift` & `shift` are not so clear

- Maybe this will help you remember:

      	```shell
      	The "longer" named methods do the same thing (add to an array)
      	unshift -> [...] <- push

      	The "shorter" named ones remove
      	shift <- [...] -> pop
      	```

<br>
<br>


### Add/Remove Elements to/from Anywhere in the Array

- The [Array.prototype.splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) method is capable of adding and/or removing any number of elements to/from an array with a single line of code!

- `splice` has a syntax of: `array.splice(start, deleteCount, newItem1, newItem2...)`

Examples of adding/removing elements with `splice`:

```javascript
movies => ["Caddyshack", "Interstellar", "Scarface", "Trading Places"]
let removedMovies = movies.splice(3, 1, "Spaceballs", "Alien")
movies => ["Caddyshack", "Interstellar", "Scarface", "Spaceballs", "Alien"]
removedMovies = movies.splice(0, 3)
movies => ["Spaceballs", "Alien"]
removedMovies = movies.splice(1, 0, "The Sting")
removedMovies => []
movies => ["Spaceballs", "The Sting", "Alien"]
```

The `splice` method always returns an array containing the removed elements.

<br>
<br>

### Iterate Over All of the Elements in an Array

- Although a `for` loop can be used to iterate over an array, if you know you want to iterate over **all** of the elements in an array, the `forEach` method is a better approach:

      	```javascript
      	movies.forEach(function(movie) {
      		console.log(movie);
      	});
      	```

* Try it out. As you can see, the `forEach` method calls the function provided as an argument **once for each element** in the array
* You can also access the index of each iteration:

      	```javascript
      	movies.forEach(function(movie, idx) {
      		console.log(idx + ') ' + movie);
      	});
      	```

* Note that it's a good practice to name the parameter that accepts each element as the singular of the array, or simply the first letter of the array variable (`movie` or `m` for the example above)

- ES2015 provides the `for...of` loop for iterating over the elements of arrays and other iterables such as strings:

      	```javascript
      	for(let movie of movies) {
      		if (movie === 'The Last Airbender') break;
      		console.log(movie);
      	}
      	```

- Unlike `forEach`, the `for...of` loop can be exited using the `break` statement

<br>
<br>


### Copy All or Some of an Array

- There are multiple ways to copy an array

- The approach you use depends upon whether you need to copy just some or the entire array

- Let's take a look...

- We can use the [Array.prototype.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) method to create a copy of all, **or part**, of an array

- The `slice` method always returns a new array and does not mutate (change) the source array

- Example:

      	```javascript
      	movies => [ 'Spaceballs', 'The Sting', 'Alien' ]
      	let lastTwoMovies = movies.slice(1, 3); // ['The Sting, 'Alien']
      	```

- Unlike `splice`, the 2nd argument in `slice` represents the ending index (but does not include that index)

<br>
<br>


### Copy All of an Array

- ES2015 gave us a cool new way to copy an entire array using the `...` ([spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax))

- Example:

      	```javascript
      	movies => [ 'Spaceballs', 'The Sting', 'Alien' ]
      	let moviesCopy = [...movies];
      	```
      	The elements are being "spread" within the array literal

<br>
<br>

### Copy All of an Array & Insert

- Here's how you can copy and insert additional elements simultaneously using the spread operator:

      	```javascript
      	movies => [ 'Spaceballs', 'The Sting', 'Alien' ]
      	let moreMovies = ['Interstellar', ...movies, 'Contact'];
      	```

<br>
<br>

### Create a Single String from an Array

- An array method that comes in handy is `join` which creates a string from all of the elements in an array:

      	```javascript
      	let movieStr = movies.join();
      	=> 'Spaceballs,The Sting,Alien'
      	```

- As you can see, by default, the movies were delimited by a comma. However, we can pass `join` whatever string we want to use as the delimiter:

      	```javascript
      	movieStr = movies.join('    ');
      	=> 'Spaceballs    The Sting    Alien'
      	```

<br>
<br>


### Essential Questions

**❓ In your own words, what's an array?**

**❓ What will be the value of the variable `color`:**

```javascript
const colors = ["red", "green", "blue"]
let color = colors[1]
```

<br>
<br>

**❓ What's the best method to use to iterate through an entire array?**

**❓ What method is used to copy a number of elements into a new array?**

<br>
<br>

### Further Study

- Because arrays are such a useful data structure, it's beneficial to developers to know what methods are available and what they do

- Array iterator methods are extremely useful and we will cover them in a later lesson

- Other useful methods worth knowing about: - `indexOf` / `lastIndexOf` - `includes` - `reverse` - `sort`

<br>
<br>

### References

[MDN - JavaScript Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
