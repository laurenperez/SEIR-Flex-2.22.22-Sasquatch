---
track: "Frontend Fundamentals"
title: "Intro to JavaScript"
week: 1
day: 2
type: "lecture"
---

# Intro to JavaScript

<br>
<br>
<br>
<br>

## Learning Objectives

| Students will be able to:                        |
| :----------------------------------------------- |
| Define Variables Using Proper Naming Conventions |
| Identify JavaScript's Data Types                 |

<br>
<br>

## Roadmap

1. Intro to JavaScript
2. Variables
3. Explore JavaScript's Data Types
4. Review Questions
5. Further Study

<br>
<br>

## 1. Intro to JavaScript

> _Atwood's Law:_<br>
> "Any application that can be written in JavaScript will eventually be written in JavaScript."<br> > _\- Jeff Atwood, co-founder of Stack Overflow_

_Languages on GitHub - Percentage of Monthly Active Users:_
![](https://i.imgur.com/HJapAIF.png)

The popularity of JavaScript has grown with the growth of web-based applications because it is the only language included in web browsers.

> NOTE: The WebAssembly specification allows the browser to execute code from other languages such as C & C++, however, JavaScript is still required for WebAssembly to work. In other words, WebAssembly does not replace JavaScript.

<br>
<br>

#### JavaScript's Role

The primary responsibility of JavaScript is to allow developers to implement behavior in web applications via client-side script that runs in the browser.

![](https://i.imgur.com/FwvjQVO.jpg)

> The popularity of a technology known as _Node.js_ has made JavaScript popular outside the browser as well.

<br>
<br>

#### A Few Facts About JavaScript:

- Created in 10 days in 1995 by [Brendan Eich](https://en.wikipedia.org/wiki/Brendan_Eich)
- Not to be confused with Java (although both have syntaxes based upon the "C" programming language)
- JavaScript is an implementation of ECMAScript, a standard maintained by the European Computer Manufacturers Association)
- Modern browsers have fully implemented version ES2015 (formerly named ES6) [This website](http://kangax.github.io/compat-table/es6/) reports the implementation status in all major browsers. ES2015 was a major update that added numerous new features which we'll cover in SEI

<br>
<br>

#### Setup

We are going to use Chrome's DevTools in this lesson to inspect and manipulate data.

Open Chrome and press `command + option + j` to open the _console_ (one feature of Chrome's DevTools). The _console_ allows us to enter JS expressions and statements.

<br>
<br>

## 2. Variables

<br>
<br>

#### Purpose

The purpose of a **variable** in computer programming is to hold or reference data.

#### `var`, `let` or `const`?

Variables are declared using the `var`, `let` or `const` keywords.

Until ES2015 came along, `var` was our only option and has been for the past 25+ years - so obviously, it does the trick!

Why was `let` and `const` added to the language then?

<br>
<br>

##### scope

The difference between `var` and `let`/`const` is what we call _scope_. Scope involves the accessibility of variables & functions at a given point in the code.

`var` has _function scope_ (also known as _local scope_) and `let`/`const` have more limited _block scope_, which in computer programming, is considered a better practice because it reduces the chance of accidentally changing a variable's value.

<br>
<br>

##### `let` vs. `const`

The difference between `let` and `const` is that a `const` variable cannot be re-assigned to - you can assign data to it once, and that's it:

```javascript
let x = 25
x = 100 // no problem

const z = 25
z = 100 // Uncaught TypeError: Assignment to constant variable
```

As we'll learn later, objects (or an object sub-type like array, function, etc.) is a reference type.

Objects are reference types because, if we assign an object to a variable, that variable does not actually hold the object, rather it holds a "reference" that points to the object in memory. As such, when you assign an object to a `const`, you **can** make changes to the object itself, you just can't re-assign to the `const`:

```javascript
const person = { name: "Fred" }
person.age = 25 // no error
person = { name: "Barney" } // Uncaught TypeError: Assignment to constant variable
```

#### Identifiers & Defining Variables

_Identifiers_ are used to name variables, as well as named functions:

```javascript
let points // the identifier is "points" and names the variable "points"
```

We can also assign a value to a variable at the time we declare it by using the `=` (assignment) operator:

```javascript
let name = "Fred Flintstone" // two birds with one stone!
```

and change it's value later...

```javascript
name = "Barney" // note that we only declare a variable once
```

Multiple variables can be defined in a single statement, separated by commas:

```javascript
let name = "Wilma",
  age,
  town = "Bedrock"

// above is equivalent to
let name = "Wilma"
let age
let town = "Bedrock"
```

##### Identifier Naming Rules

In JavaScript, when naming variables, the convention is to name the identifiers using lowerCamelCase, e.g., `numActivePlayers`.

Identifiers in JS:

- Are case-sensitive!
- Cannot begin with a number
- Can contain letters, digits, underscores, and dollar signs

❓ **Is `car-3` a valid variable identifier?**

**Any questions regarding variables?**

<br>
<br>

## 3. Explore JavaScript's Data Types

<br>

#### Dynamic vs. Static Typed Languages

Dynamically-typed languages such as JavaScript, Python and Ruby allows variables to be assigned different types of data during runtime (as the program executes).

For example, in JavaScript we can do this:

```javascript
// Declare variable named data and initialize with a number
var data = 123

// Reassigning a different type of data is allowed
data = "Hello"
```

However, statically-typed languages such as Java and C++ required a variable's type to be declared and cannot be changed:

```javascript
// Declare variable as an integer and initialize
int data = 123;

// Assigning anything other than an integer raises an error
data = "Hello";  // NOT ALLOWED
```

> There is a newer language called _TypeScript_ you might hear about - this language is a superset of JS and adds strong typing to JS. Many developers agree that strong typing makes code less error prone and is worth the extra effort to code in.

<br>
<br>

#### Exploring JavaScript's Data Types

JavaScript has seven main data types:

- Six primitive data types which represent a **single** value
- One Object (reference) type that can contain any number of primitive values and/or other objects

Note that an object can be one of JavaScript's [built-in object sub-types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) such as:

- Array
- Function (yes, functions are objects in JavaScript!)
- RegExp
- Date
- Error
- BigInt

<img src="https://i.imgur.com/02XLHjQ.png">

> **KEY POINT: If a variable does not hold one of the six primitive values, it is an object!**

Okay, let's briefly go through the data types...

<br>
<br>

#### string

A **string** represents textual data with zero or more characters wrapped by single or double quotation marks such as `"John"` or `'Jane'`. A pair of quotes with nothing between them is still a **string** - an _empty string_.

```shell
> 'Hello World'
< "Hello World"
> typeof "I'm a string"
< "string"
```

Note that the `typeof` operator itself always returns a string describing the data type.

> ES2015 Note: In addition to using single and double quotes to delimit a string, ES2015 adds a third way by using the back-tick character to create what's called a _template literal_. We'll learn more about _template literals_ later in the course.

<br>
<br>

#### number

A **number** represents a numeric value.

Unlike many other programming languages, there is no distinction between integer (`15`, `3`, etc.) and floating-point/decimal types (`17.24`, `3.1416`, etc.).

Internally, JS represents all numbers as floating-point values.

```shell
> 15
< 15
> typeof 15
< "number"
> typeof 12.34
< "number"
> typeof '12.34'  // what will this return as the type?
```

<br>
<br>

#### boolean

Whereas strings and numbers can have a virtually unlimited number of different values, the **boolean** data type only has two possible values: `true` and `false`.

<br>
<br>

#### 💪 EXERCISE: Data Type Examples

**Strings**, **numbers** and **booleans** are the most common data types used to "model" real-world data in applications.

For example, in a Social Gaming app, we would represent a Gamer's Handle using a **string**.

Before moving on to review the other data types, let's identify a couple of examples for each of the three common data types that would be used to represent information in that gaming app:

<table>
	<thead>
		<tr><th>Application</th><th>Data Type</th><th>Example Data/Information</th></tr>
	</thead>
	<tbody>
		<tr><td rowspan="3">Social Gaming App</td><td>String</td><td>Gamer's Handle, ?</td></tr>
		<tr><td>Number</td><td>?, ?</td></tr>
		<tr><td>Boolean</td><td>?, ?</td></tr>
	</tbody>
</table>

Now let's continue looking at the other data types...

<br>
<br>

#### null

The _null_ data type has only one value: `null`.

We often assign the value _null_ to a variable to represent the fact that it has no "real" value 😊

```shell
> typeof null
< "object"  // Fail! Remember, JS was written in 10 days by one dude!
```

<br>
<br>

#### undefined

A variable that has not been assigned a value is of type `undefined`. For example:

```javascript
let cohort // cohort currently holds undefined
```

In addition, a function by default returns `undefined` if a value was not explicitly returned using the `return` keyword.

Lastly, you will see `undefined` a lot in the console when it evaluates a statement that does not return a value.

```shell
> typeof undefined
< "undefined"
> console.log('hello')
  "hello"
< undefined
```

<br>
<br>

#### symbol

The _symbol_ data type was added with ES2015 and is primarily used to create unique and less visible properties on objects.

Their use is rare in general JavaScript programming.

<br>
<br>

#### object

The six data types that we've looked at thus far are classified as **_primitive_/_value_** data types because they hold only a **single value**.

Most programming languages also have **complex/reference** data types designed to hold more complex data structures.

JavaScript only has one **reference** type - the **object**.

Objects are collections of zero or more key:value pairs known as properties.

We will learn more about _objects_ in a later lesson.

For now, let's just verify what `typeof` returns:

```shell
> typeof {course: 'SEI', cohort: 4}
< "object"
> typeof []
< "object"
> typeof /./
< "object"
```

Although _functions_ are also considered objects (_callable objects_ to be exact), the `typeof` operator returns a more helpful data type:

```shell
> typeof function(){}
< "function"
```

<br>

Yay, we've covered all six data types!

<br>

## 4. Review Questions

1. **Do all variables have a data type?**

2. **Is `var _save = '';` a valid statement?**

3. **If a variable is not a string, number, boolean, null, undefined or a symbol, it must be an ****\_\_****.**

<br>
<br>

## 5. Further Study

<br>

### Type Conversion

JavaScript is very relaxed when it comes to data types. Contrary to non-dynamic languages, a variable can change its type.

```javascript
let m = 15 // I'm a number
m = "hey" // Now I'm a string!
```

<br>
<br>

#### Beware of Implicit Conversion

JavaScript is friendly and tries to help us whenever it can. However, we all know that sometimes it's better to be left alone.

**Try adding a string to a number. What did JS do?**

**Now try comparing a number and a string containing the same digits using the equality (`==`) comparison operator**

```javascript
13 == "13" // returns true!
```

This is why, unless there's a reason not to do so, we use the _strict equality operator_ (`===`) as it will not perform type conversion.

<br>
<br>

#### Explicit Type Conversion

We can easily convert a number to a string using the `toString()` and `toFixed()` methods:

```javascript
let n = 123.456
let s1 = n.toString() // "123.456"
let s2 = n.toFixed(2) // "123.46"
```

There are a couple of handy methods used to convert strings to numbers: `parseInt()` and `parseFloat()`

```javascript
let s = "1234.567"
let n1 = parseInt(s) // 1234
let n2 = parseFloat(s) // 1234.456
```

Remember however, that the data type for both flavors, integer and float (short for floating-point), is _number_.

<br>
<br>

## References

[MDN JavaScript Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
