---
track: "Frontend Fundamentals"
title: "Intro to JavaScript Classes"
week: 2
day: 2
type: "lecture"
---

# Intro to JavaScript Classes

<br>
<br>
<br>
<br>

## Learning Objectives

<p>Students will be able to:</p>

- Describe the use case for _classes_
- Describe _encapsulation_ in OOP
- Define a _class_
- Instantiate a _class_
- Include and use a _constructor method_ in a class
- Define _prototype (instance)_ methods in a class
- Recognize _constructor functions_ (predecessor to classes)
- Define _static (class)_ methods
- Use _extends_ to create a _subclass_
- Use _super_ within a subclass

<br>
<br>
<br>
<br>

### Lesson Setup

For this lesson, we're going to code along using a `JavaScript` `REPL` from [repl.it](https://repl.it) -- you can name it `"JavaScript Classes Practice"`.

<br>
<br>
<br>

### What Are <em>Classes</em>?

- In **object oriented programming (OOP)**, we use objects to model our application's purpose.

- **Classes** (as well as their predecessor, **constructor functions**) are used to create objects.

- Think of classes as the blueprints used to create objects of a certain "type"...

<img src="https://i.imgur.com/Pjxlpjs.jpg" width="600">

<br>
<br>
<br>

### Why Use <em>Classes</em>?

- We've already been creating JS objects using object ****\_\_\_**** notation.

- So why do we need classes and/or constructor functions?

- Because the number of a certain type of object needed by an application often varies at runtime; and...

- Classes/constructors provide a convenient way to dynamically create objects as needed.

<br>
<br>
<br>

## Encapsulation in OOP

- **Encapsulation** is a key principle of Object Oriented Programming.

- Encapsulation is the concept of bundling data (properties/attributes) and related behavior (methods) within an object.

- Here comes a graphic depicting this principle...

<img src="https://i.imgur.com/7e0Qa9K.png" width="600">

- Here's a code example of encapsulating data (attributes/properties) & behavior (methods):

```javascript
const cohort = {
  id: "SEIR Flex",
  students: ["Mary", "Toni", "Fred"],
  instructors: ["Susan", "Phil"],
  addStudent: function (name) {
    name = name[0].toUpperCase() + name.substr(1).toLowerCase()
    this.students.push(name)
  },
  pickRandomStudent: function () {
    const rndIdx = Math.floor(Math.random() * this.students.length)
    return this.students[rndIdx]
  },
}
```

<br>
<br>
<br>
<br>

### Review Questions

**❓ What does the acronym OOP stand for?**

**❓ In your own words, describe why Classes exist in OOP.**

**❓ In your own words, describe the OOP principle known as _encapsulation_.**

<br>
<br>
<br>

### Defining Classes in JS

**Here's a minimal class definition that's good for nothing but creating empty objects:**

```javascript
class Vehicle {
  // Code to define the class's properties and methods
}
```

_Looks similar to defining a function because classes are in fact, *special* functions, except..._

<br>
<br>

**❓ What's different compared to a function?**

**❓ What's different about the naming convention?**

<br>
<br>
<br>
<br>
<br>

### Instantiating a Class

_Here's a bit more OOP vocab for you:_

- **instance**: An object created by a class

- **instantiate**: We instantiate a class to create an object

- **instantiation**: The process of creating an object

<br>

_In JS, we create objects using the `new` keyword when invoking (instantiating) the class:_

```javascript
const v1 = new Vehicle()
```

<br>
<br>
<br>

### The _<span style="text-transform:lowercase">constructor</span>_ Method

_When a class is being instantiated, the special `constructor` method in the class will **automatically** be called:_

```javascript
class Vehicle {
  constructor(vin, make) {
    this.vin = vin
    this.make = make
    // return is not needed
    // because the new object is returned by default
  }
}

const plane = new Vehicle("X123Y", "Boeing")
```

- **The purpose** of the `constructor` method is to initialize the data properties of the new object being created (represented by `this`).

- If there are no properties to initialize, the `constructor` method is optional (a hidden default constructor is called).

<br>
<br>
<br>

### 💪 Practice - Add a Property

**Modify the `Vehicle` class by adding an additional property named `model`.**

_Test it out by instantiating another object like this:_

```javascript
const car = new Vehicle("A1234", "Toyota", "Camry")
```

<br>
<br>
<br>
<br>

### Object Instantiation

_When we invoke the class prefaced with the `new` keyword, behind the scenes:_

- JS creates a shiny new object (empty) and assigns it to the `this` keyword.
- The `constructor` method is called with the arguments we provided when invoking the class. Remember, the `constructor` method is where we create/initialize properties on the new object assigned to `this`.
- After the `constructor` is finished executing, the class automatically returns the shiny new object.

- Although the `constructor` method is _special_ because it's called automatically, there's nothing special about how it's defined, other methods are defined the same way...

<br>
<br>
<br>

### Defining Methods in a Class

_There are two types of methods that can be added to a class:_

- **Prototype (instance) methods**
- **Static (class) methods**

**Prototype methods** are the most common and are available to be called by any instance of the class.**What's an instance?**

**Static methods** are methods that are called on the class itself and cannot be called by instances.

<br>
<br>

**Let's add a `start` method to our `Vehicle` class:**

```javascript
class Vehicle {
  // the constructor will always be called
  constructor(vin, make, model) {
    this.vin = vin
    this.make = make
    this.model = model
    this.running = false // default to false
  }
  start() {
    this.running = true
    console.log("running...")
  }
}
```

**_Note that unlike within object literals, methods are not separated by a comma._**

<br>
<br>
<br>
<br>
<br>

### 💪 Practice - Defining Methods

**Define a `stop` method that sets the `running` property to `false` and console.logs the message "stopped..."**

<br>
<br>
<br>

### Overriding Methods

**Thanks to another OOP principle called _inheritance_, subclasses inherit methods from their parent classes.**

- JS is different from class-based languages like Java or Python in that its inheritance implementation is _prototype-based_. <br> We won't go into prototypes during this lesson, but if you want to learn more, [check out the docs here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).

<br>
<br>

**In JS, virtually every object inherits from the `Object` class and thus inherits it's methods, such as `toString`:**

```javascript
car.toString() // outputs something like '[object Object]'
```

**If we define a method that already exists in the object hierarchy, we "override" it. For example, we can override the Object's `toString` method by adding it to our class:**

```javascript
 // existing methods above

 toString() {
   return 'Vehicle (' + this.vin + ') is a ' +
     this.make + ' model ' + this.model;
 }
```

<br>
<br>

#### Test it out.

<br>
<br>
<br>

### Review Questions

**You've just learned how to define a class and add prototype methods to it. This represents about 80% there is to know about classes - congrats!**

<br>

**Some questions before moving on:**

**❓ What is the JS keyword used to define a class?**

**❓ What is the name of the method in a class that is automatically called when we instantiate a class?**

**❓ What is the main purpose of this method?**

**❓ What character(s) separate the methods in a class definition?**

<br>
<br>
<br>

### Constructor Functions - B.C. (before classes 😀)

1. Before classes arrived via ES2015, we used _constructor functions_ to do the exact same thing as classes.

1. Because of the newness of ES2015, much of the code out there is written using constructor functions, however, most new code today is likely to be written as classes.

1. It's important that you be able to recognize _constructor functions_, so let's look at how the `Vehicle` class can be written as a constructor function...

<br>
<br>
<br>

### Constructor Functions

```javascript
function Vehicle(vin, make, model) {
  this.vin = vin
  this.make = make
  this.model = model
  this.running = false // default to false
}
Vehicle.prototype.start = function () {
  this.running = true
  console.log("running...")
}
// other 'prototype' (instance) methods defined like above

const car = new Vehicle("A1234", "Toyota", "Camry")
```

**_Note that constructor functions are similar to the constructor methods in a class. Also note how instance methods are defined on the function's prototype object._**

**_Invoking a class and a constructor function works identically._**

<br>
<br>
<br>

### Static Methods

**Again, _static methods_ are methods that are callable on the class itself - not on its instances.**

- Static methods are used typically to implement behavior that does not pertain to a particular instance. For example, we could design the `Vehicle` class so that it tracks every vehicle it creates. We could then write static methods that return how many vehicles have been created, search for vehicles by their make, etc.

<br>

**Here's how to define a basic static method:**

```javascript
 static about() {
   console.log("I'm the Vehicle class!");
 }
```

_Yup, the only difference is the `static` keyword_

<br>
<br>

**As discussed, you invoke static methods on the class:**

```javascript
// invoke static methods on the class
Vehicle.about()

// this will not work
car.about()
```

<br>
<br>
<br>

### Review Quesitons

**❓ Is there anything a class can implement that can't be done using constructor functions?**

**❓ When using constructor functions, how are instance methods defined?**

**❓ What's wrong with the following code?**

```javascript
class Shape {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  static getPosition() {
    return [this.x, this.y]
  }
}
```

<br>
<br>
<br>

### Inheritance

**Earlier we spoke briefly about _inheritance_.**

- In OOP, inheritance is when a "specialized" **subclass** is derived from a parent **superclass**, and thus inherits it's properties and methods.

- For example, a `Payment` class could have `CreditCard` & `Cash` subclasses derived from it.

<img src="https://i.imgur.com/MvXw4nD.gif" width="800">

<br>
<br>

**We use the `extends` keyword to define a subclass:**

```javascript
class Plane extends Vehicle {
  constructor(vin, make, model, airline) {
    super(vin, make, model)
    this.airline = airline
  }
  engageAutoPilot() {
    console.log("Look Mom, no hands!")
  }
}
```

- In a derived class, the `super` keyword represents the parent superclass and must be called before the `this` keyword can be used in the constructor.

<br>
<br>
<br>

### Inheritance

**Now we can create instances of `Plane` like this:**

```javascript
const spyPlane = new Plane("secret", "Lockheed", "SR-71", "USA")
```

<br>
<br>

1. Note how the additional arguments used to initialize subclasses are always provided after those intended for the superclass(es).

1. In complex systems, it's not uncommon to have several layers of inheritance often referred to as an object hierarchy.

<img src="https://i.imgur.com/t9eUguh.png" width="700">

<br>
<br>
<br>

### 💪 Practice - Inheritance

**Define another subclass of the `Vehicle` class named `Automobile` with an additional property of `numDoors` and a `honk` method.**

<br>

**Test it out by instantiating it like this:**

```javascript
const fastCar = new Automobile("TS123Z", "Tesla", "P100D", 4)
```

_Hint: It's okay to copy and paste your own code (but make sure you understand what it does)_

<br>
<br>
<br>

### Final Notes on Classes

**Unlike function declarations, class declarations are not _hoisted_ - they must be declared before using them to create objects.**

<br>
<br>
<br>

## References

- [Classes on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

- [Prototypal Inheritance example](https://gist.github.com/jim-clark/e3fc426d73153fac6dc1)
