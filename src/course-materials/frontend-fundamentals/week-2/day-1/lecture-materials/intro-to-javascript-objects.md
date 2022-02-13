---
track: "Frontend Fundamentals"
title: "Intro to JavaScript Objects"
week: 2
day: 1
type: "lecture"
---

# Intro to JavaScript Objects

<br>
<br>
<br>
<br>

## Learning Objectives

Students Will Be Able To:

- Describe the Use Case for Objects
- Create Objects Using Object Literals
- Add a Property to an Existing Object
- Modify the Value of a Property
- Explain When to Use Dot or Square Bracket Notation
- Delete a Property
- Iterate Over an Object's Properties
- Use Property Shorthand Syntax
- Identify when a Property is a Method
- Describe How a Variable References an Object

<br>
<br>
<br>

### Roadmap

1. The What and Why of Objects
2. Ways to Create Objects
3. Creating Objects with Object Literal Notation
4. Properties - Review Questions
5. Adding Properties to an Existing Object - Dot Notation
6. Adding/Updating Properties - Practice
7. Accessing Properties with Square Bracket Notation
8. Square Bracket Notation - Practice
9. Checking if an Object has a Property
10. Deleting a Property
11. Iterating Over an Object's Properties
12. Property Shorthand Syntax
13. Methods
14. How Variables Reference an Object
15. Essential Questions
16. Further Study

<br>
<br>
<br>

### Lesson Setup

For this lesson, we're going to code along using an `HTML, CSS & JS` `REPL` from [repl.it](https://repl.it) -- you can name it `"JavaScript Objects Practice"`.`

<br>
<br>
<br>

### What Are Objects?

- Objects are the most common data structure in _Object Oriented Programming_ (OOP)

- Very simply, **objects** are a collection of zero or more **properties**

- So what's a _property_? A _property_ consists of a **key: value** pair, where the:

  - **key** is a _string_ (JS will coerce the type automatically), and the
  - **value** is any JS expression (code that evaluates to a single value or thing), including other objects (yes, functions too)

- <p>In computer science, collections of key/value pairs are commonly referred to as dictionaries - a good visualization of what an object is</p>

<br>
<br>
<br>

### Why Objects?

- In OOP, we often model the goal of our application using real-world objects

- As web developers, you'll be working with objects more than anything else

- The following is just a small example of what is modeled using objects:

  - The browser window and the elements it visualizes are all represented in memory as JS objects
  - Every part of those elements, including their styling, is accessed via JS objects
  - Data submitted from the browser will be accessed on the server as objects
  - Data retrieved from a database will be stored in objects

- Even primitive data types like strings and numbers are turned into an object on demand by the JS runtime when we want to call a method like `toUpperCase`! BTW, this process is called _boxing_.

- Now does it make sense why it's called **Object Oriented Programming**?

<br>
<br>
<br>

### Ways to Create Objects

- There are three different ways we can create objects:

  - By using _Object Literal notation_
  - By invoking a _Class_ (also known as a*Constructor Function*)
  - By using the `Object.create` method

- Today, we're going to focus on using _Object Literals_ to create objects

- Later, we'll learn how _Classes_ are used

- Using `Object.create` is not very common and won't be used during SEIR, but as always, you're encouraged to research it

<br>
<br>
<br>

### Creating Objects with Object Literal Notation

- Now let's create an object by using **Object Literal notation**, also known as an [Object Initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer):

```javascript
const game = {}
console.log(typeof game) // "object"
```

<br>
<br>

- As you can see, _Object Literal notation_ consists of a set of opening and closing curly braces, `{}`

- We just used curly braces to create an empty `game` object. **We consider it to be empty because it contains no ****\_****?**

- Let's change the code so that `game` has a _property_:

```javascript
const game = { title: "Guess the Number!" }
console.log(game)
```

- Stylistically, defining an object with a single property or a couple of "short" properties on a single line of code like this `let point = {x: 10, y: -5};` isn't a problem (unless it is with your boss)

- It's all about maintaining readability

- Properties are separated by commas:

```javascript
const game = {
  title: "Guess the Number!",
  biggestNum: 100,
}
```

- Syntactically, [trailing commas](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas) are permitted (in arrays too):

```javascript
const game = {
  title: "Guess the Number!",
  biggestNum: 100,
}
```

<br>
<br>
<br>
<br>
<br>

### 💪 Properties - Review Questions

**Considering:**

```javascript
const game = {
  title: "Guess the Number!",
  biggestNum: 100,
}
```

<br>
<br>

_Let's answer the following questions:_

**❓ How many properties does `game` contain?**

**❓ What are the keys (AKA property names)?**

**❓ What are the property values of `game`?**

**❓ What are the data types of the keys?**

<br>
<br>
<br>
<br>
<br>

### Adding Properties to an Existing Object Using Dot Notation

- There are two different syntaxes available to access, add or modify an object's properties:

  - **Dot notation**, and
  - **Square Bracket notation**

- We'll discuss why there are two syntaxes in a bit, for now, let's use _dot notation_ to add another property to the `game` object:

```javascript
game.smallestNum = 0
```

- Using the _assignment operator_, if a property doesn't exist, it is created, otherwise it's updated.

<br>
<br>
<br>

### 💪 Adding/Updating Properties Practice (3 min)

_Using dot notation on the `game` object:_

1. Add a property with a key of `numGuesses` set to a value of `0`
1. Update the `smallestNum` property's value to be `1`

<br>
<br>
<br>
<br>

### Accessing Properties with Square Bracket Notation

- The other way to access, add, update and delete properties is by using **square bracket notation**

- We use _square bracket notation_ instead of _dot notation_ when at the time you're writing the code, you don't know which property needs to be accessed

- In other words, we use _square brackets_ to access properties _dynamically_ during runtime

> Less common is to have to resort to using _square brackets_ to access properties when the key name contains a space.

<br>
<br>
<br>

### Square Bracket Notation

_Square bracket notation_ has the following syntax:

```javascript
someObject[<any JS expression>]
```

- For example to access the `game` object's `title` property, we could write this code:

```javascript
console.log(game["title"])
```

**Please note:** The above example is just a way to demonstrate the syntax. More efficient code would be `console.log(game.title);`

<br>
<br>

If the result of the expression between the brackets is not a string, JS will convert it to one. For example:

```javascript
const weirdObj = {}
weirdObj[null] = true
console.log(weirdObj) // {'null': true}
```

_Again, the expression between the square brackets can be any expression - even a function call!_

<br>
<br>
<br>

### 💪 Square Bracket Notation - (Guided Practice)

_Consider an object that represents a catalog of items where:_

- Each property in the object represents an item for sale
- The _key_ of each property represents the item's SKU (Stock Keeping Unit - a retail store's unique ID for an item)
- The _value_ of the property represents the price of the item

- For this practice activity we're going to create another object named `catalog` that includes a few items - but don't delete your `game` object
- Again, each item is a _property_ with it's _key_ set to a unique alphanumeric string (a SKU) and its value to a number representing its price

- **Note:** If you want to include special characters in the key, just be sure to use quotes

<br>
<br>


_Now let's code a price lookup loop:_

```javascript
let sku = ""
while (sku !== "quit") {
  sku = prompt('Enter SKU or "quit" to exit: ')
  let price = catalog[sku]
  if (sku !== "quit") alert(`The price of ${sku} is ${price}`)
}
```

- That string in the `alert` is called a **template literal** and is delimited using back-tick characters (it's above the _tab_ key). One of its benefits is that we can use _string interpolation_ to embed the results of JS expressions right into the string using the `${<exp>}` syntax!

<br>
<br>
<br>

### Checking if an Object has a Property

- Notice that if we enter a non-existing SKU (key), we are alerted a price of `undefined`

- Unlike when we try to access an undeclared variable, we don't receive an error when we access a property that doesn't exist. Instead, `undefined` is returned - nice!

- However, we can't rely on a value of `undefined` to check if a property exists because maybe a property legitimately has a value of `undefined`

- Instead, we can use the `in` operator...

- Let's tweak the code to use the `in` operator to check if the user has entered a valid key (SKU):

  ```javascript
  let sku = ""
  while (sku !== "quit") {
    sku = prompt('Enter SKU or "quit" to exit: ')
    if (sku in catalog) {
      let price = catalog[sku]
      alert(`The price of ${sku} is ${price}`)
    } else if (sku !== "quit") {
      alert("Invalid SKU - try again")
    }
  }
  ```

**Nice!**

<br>
<br>
<br>


### Deleting a Property

_To completely remove a property from an object, we use the `delete` operator:_

```javascript
const geniuses = {
  Jemison: true,
  Hopper: true,
  Einstein: true,
  McNair: true,
  Lovelace: true,
  carrotTop: false,
}

// see ya!
delete geniuses.carrotTop
```

**Try it out!** Use the `delete` operator to remove one of the items from your `catalog` object

<br>
<br>
<br>

### Iterating Over an Object's Properties

- Before continuing to work with the `game` object, comment out the price lookup code...

- We often need to iterate over an object's properties

- We can iterate over the _keys_ of the properties using a `for...in` loop:

```javascript
for (let key in game) {
  console.log(`The value of the ${key} property is ${game[key]}`)
}
```

- There's a couple of nifty ES2017 methods that can be used to iterate over the keys & **values** of an object's properties:

  - [Object.keys(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
  - [Object.values(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values)
  - [Object.entries(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)

- Although cutting edge, these _static_ methods have already been implemented in all modern browsers

- Each of those methods mentioned returns an array that we can iterate over, for example:

  ```javascript
  Object.values(game).forEach(function (val) {
    console.log(val)
  })
  ```

> Note: The ECMAScript specification does not dictate how properties should be ordered, however, all browsers currently iterate over them in the order they are defined/added.

<br>
<br>
<br>

### Property Shorthand Syntax

- It's a common scenario to want to pass the values of variables as properties (having the same name as the variable) in an object:

  ```javascript
  const latitude = getLat("Disneyland")
  const longitude = getLng("Disneyland")

  const location = {
    name: "Disneyland",
    latitude: latitude,
    longitude: longitude,
  }
  ```

- ES2015 strikes again...

- Thanks to ES2015's **Property Shorthand** syntax, we can now do this

  ```javascript
  const latitude = getLat("Disneyland")
  const longitude = getLng("Disneyland")

  const location = {
    name: "Disneyland",
    latitude,
    longitude,
  }
  ```

- Again, note how the variable name determines the name of the property

<br>
<br>
<br>

### Methods

- When a property holds a function, we commonly refer to it as a **method** of the object

- Let's add a `play` _method_ to the `game` object:

  ```javascript
  game.play = function () {
    this.secretNum =
      Math.floor(Math.random() * (this.biggestNum - this.smallestNum + 1)) +
      this.smallestNum
  }
  ```

- Try it out in the console by calling `game.play()` and then checking the value of `game.secretNum` a few times

- What's with the `this`...

- The `this` keyword represents the "context" of a function

- In this case, `this` is set by JavaScript to be the object the method is called on

- We'll have a dedicated lesson on `this`

- **IMPORTANT:** Due to how `this` is set within _arrow functions_, it's best to avoid using them as methods in objects

<br>
<br>
<br>

### How Variables Reference an Object

- As you know, variables are slots in memory that hold a value

- All non-object data types are known as primitive, or value, types because they hold a single value. Picture a table in memory like this:

  ```shell
                         var | value
                                    -
        let x = 25  -->   x  |  25
  var msg = 'hello' -->  msg | 'hello'
  ```

- But objects are complex/reference types because they can hold multiple pieces of data...

- Objects, including Arrays, Functions, etc. are stored in a separate part of memory known as the _heap_. A variable for an object has as its value a "reference" (think pointer):

  ```shell
                          var | value/ref
                                     -
         let x = 25  -->   x  |  25
  var msg = 'hello'  -->  msg | 'hello'        HEAP
  const obj = {a: 1} -->  obj |  ref1      >  {a: 1} <-|
  let arr = [1,2]    -->  arr |  ref2      >  [1,2]    |
  let obj2 = obj     -->  obj2|  ref1                  -
  ```

- Interestingly, the elements of an array and the properties of an object hold their values in the same way!

<p>Now this all makes sense:</p>

```javascript
const arr1 = []
const arr2 = []
const arr3 = arr1
arr1 === arr2 // false!
arr3 === arr1 // true!
```

<br>
<br>
<br>

### Essential Questions

**❓ An object is a collection of zero or more ****\_\_\_****.**

**❓ Properties are **\_**: **\_\_** pairs.**

**❓ Is it more efficient to access properties via dot or square bracket notation?**

**❓ What type of `for` loop is used to iterate over the keys of an object?**

**❓ Is the following valid code?**

```javascript
const name = prompt("Enter your name: ")
const age = prompt("Enter your age: ")
const person = { name, age }
```

<br>
<br>
<br>

### Further Study

- [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) and [setter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) properties allow you to treat methods like regular properties that you can access without invoking and set using the assignment operator (`=`)

- [Computed Property Name syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) allows for an expression to determine the key name inside of an object literal - just like using square bracket notation on an existing object
