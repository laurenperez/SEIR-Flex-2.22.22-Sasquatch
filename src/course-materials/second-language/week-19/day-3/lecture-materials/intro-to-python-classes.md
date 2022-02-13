---
track: "Second Language"
title: "Intro to Python Classes"
week: 19
day: 3
type: "lecture"
---

# Intro to Python Classes  


<br>
<br>
<br>

### [Click here](https://generalassembly.zoom.us/rec/share/qvtk8KAgQHbBBhdBE5vdCea82FPCNzDg1SmV3gLVJQn9B7oQvnD8Z2CUS8LZUHFj.GOApS90pJUOGJU_l?startTime=1624732299000) to access recording

<br>
<br>
<br>



## Learning Objectives

| Students Will Be Able To: |
|---|
| Describe the difference between classes and objects |
| Define a class in Python |
| Instantiate a class to create an object |
| Explain the special `__init__` method |
| Understand class vs. instance members |

<br>
<br>
<br>


## Set Up

Open a Python-based repl in [repl.it](https://repl.it).


<br>
<br>
<br>


## Review of OOP

We covered several OOP concepts while learning JavaScript - hopefully some of the following will sound familiar...

Python is an **object-oriented programming (OOP) language**.

Object-oriented programming is characterized by programming with **objects** that represent the real-world objects of the application.

For example, the logged in user would be represented by a _user_ object. Or a _book_ object in a book-related app: 

<img src="https://i.imgur.com/3AQdh0F.png">

Objects bundle related properties (attributes) and methods (behavior) together. We discussed this principle of OOP in the JS Classes lesson and a few times in our React lessons - **who remembers the name of this OOP principle?**

Remember the analogy of a **class** being a blueprint for objects? In an OOP language, **classes** are used to create objects. We **instantiate** a _class_ to obtain an **instance** (object) of that _class_.

<br>
<br>


#### Objects in Python

As you've already heard, everything in Python is an object. What this means is that every variable or piece of data has properties and/or methods encapsulated within the object.

Python provides a `dir()` function that can be used to list an objects attributes and methods:

```python
# create a list
nums = [1, 2, 3]
print( dir(nums) )
```

You'll see a list printed containing strings representing the _members_ (properties & methods) available on the object. Some of them like `append` & `pop` look familiar.

The other methods that start and end with double-underscores, are called _magic_, or _dunder_, methods. They are internal methods most commonly used to _overload_ operators. If you would like to learn more about them, be sure to check out the link in the Further Study section.

We'll be using the `__init__` dunder method shortly. 

When we start working with Django, we'll be defining quite a few classes, so let's see how to we do it...

<br>
<br>

## Writing a basic Python `class`

Like many of you, I like dogs - let's define a `Dog` class to create doggies from:

```python
class Dog():
  def __init__(self, name, age = 0):
    self.name = name
    self.age = age

  def bark(self):
    print(f'{self.name} says woof!')
```

The naming convention for Python classes is UpperCamelCasing.

Python automatically calls the `__init__` magic method when a new dog is created.

`__init__` is short for "initialize" because the method is used to initialize the properties of the new object.

<br>

**What method did we use in JS classes to perform the same thing?**

<br>

The `age = 0` in `__init__`'s parameter list is called a _default parameter_ and will be assigned the the result of the expression to the right of the `=` if the function is called without an argument for that positional parameter.

The attributes for a dog instance are `name` and `age`.

`bark` is an _instance_ method in this Dog class.

**What's an _instance_ method?**

<br>
<br>
<br>

### What's this `self` business?

In the JS lesson about `this`, it was mentioned that every OOP language must have the same or similar mechanism as `this` to be able to:

- Enable a method to access the other properties/methods in an object, and
- Enable a single-copy of a method in memory to serve any number of instances.

JavaScript, Java, C++, C#, and others call it `this`.

Ruby, Swift and others call it `self`.

However, in Python, only by convention is it called `self` because it's just a parameter name...

Take a look at the `__init__` and `bark` method definitions, notice how the first parameter is named `self`.  When we write code like `spot.bark()`, the object to the left of the dot is automatically assigned to the method's first parameter - which should be named `self`. This is how Python provides the "context" in both instance and class methods!

<br>
<br>
<br>

## Creating Objects by Instantiating a Class

By defining the `Dog` class, we now know the structure that each of the pooches will have!

Let's make a doggie:

```python
spot = Dog('Spot', 8)

print(spot) # -> similar to <__main__.Dog object at 0x7f27bad2c208>

# print the name and age attributes of the spot object
print(spot.name, spot.age) # -> Spot 8

# invoke the spot object's bark instance method
spot.bark() # -> Spot says woof!
```

Let's try out the default parameter for a new dog's `age`:

```python
dog = Dog('Lassie')

print(dog.name, dog.age) # -> Lassie 0
```

<br>
<br>
<br>


## Overriding Methods

As you saw above, when we used `print(spot)` to print the `spot` object, we got an unfriendly output.

We can change this behavior by _overriding_ the `__str__` method that the `print` function calls automatically to obtain the string to print out.

Let's modify the `Dog` class to override the `__str__` method:

```python
class Dog():
  def __init__(self, name, age = 0):
    self.name = name
    self.age = age

  def bark(self):
    print(f'{self.name} says woof!')
    
  def __str__(self):
    return f'Dog named {self.name} is {self.age} years old'
```

<br>
<br>


Let's try it out:

```python
spot = Dog('Spot', 8)

print(spot) # -> Dog named Spot is 8 years old
```

<br>
<br>
<br>

## 💪 Exercise - Create a Class (15 min)

At the top of the repl, define a class named `Vehicle` with the following members:

1. **`vin`**: attribute for the vehicle's identification
1. **`make`**: attribute for the vehicle's make
1. **`model`**: attribute for the vehicle's model
1. **`running`**: attribute for maintaining whether or not the vehicle is running.  This should be set to `False` within the `__init__` method instead of being passed in at the time of instantiation.
1. **`start`**: method for changing `running` to `True`
1. **`stop`**: method for changing `running` to `False`

Test out the class by instantiating it a couple of times, calling `start`/`stop` methods and printing some of its attributes:

```python
car = Vehicle('TS123', 'Tesla', 'Model S')
print(car.running) # -> False
car.start()
print(car.running) # -> True
plane = Vehicle('X99Y', 'Boeing', '747-B')
print(plane.vin, plane.make, plane.model)
```

<br>
<br>

Time permitting, override the `__str__` method so that it returns a string formatted as:

```shell
Vehicle (<vin>) is a <make> model <model> 
```

<br>
<br>
<br>

## Class vs. Instance Members

In Python, **instance** attributes & methods (members) are intended to be accessed/invoked by instances of the class, whereas, **class** members are intended to be accessible on the class only, not an instance.

Each object instance has its own copy of its attributes, e.g., `name`. However, all instances share class attributes.

To demonstrate class attributes, let's add a `nextId` class attribute to the `Dog` class that can be used to assign an `id` to each dog instance:

```python
class Dog():
  # class attribute
  next_id = 1

  # updated __init__
  def __init__(self, name, age = 0):
    self.name = name
    self.age = age
    self.id = Dog.next_id
    Dog.next_id += 1

  def bark(self):
    print(f'{self.name} says woof!')

  # updated __str__
  def __str__(self):
    return f'Dog ({self.id}) named {self.name} is {self.age} years old'
```

Note how the `Dog.next_id` class attribute is being accessed within the `__init__` method.

> Note: Technically, instances can also access class members via `self` due to the fact that if the instance does not have an accessed member, Python will check the class and provide the class version of the member if it exists.


<br>
<br>


Now let's make sure it worked :)

```python
spot = Dog('Spot', 8)
print(spot)
pup = Dog('Lassie')
print(pup)
```

Cool, now let's see how class methods are created by adding a `get_total_dogs` method.

Add this to the bottom of the `Dog` class:

```python
  def __str__(self):
    return f'Dog ({self.id}) named {self.name} is {self.age} years old'
  
  # new code below

  @classmethod
  def get_total_dogs(cls):
    # cls represents the Dog class
    return cls.next_id - 1
```

There's only two differences when defining a class method:

1. The `@classmethod` _decorator_
2. The naming convention of the first parameter is to use `cls` instead of `self`

> _Decorators_ in programming are used to implement _metaprogramming_ (when a program has knowledge or manipulates itself).  In Python, decorators are used to modify the behavior of a function or class. They are not very common, but there's a link in the Further Study section if you'd like to learn more about decorators in Python.

Let's test out the new class method:

```python
spot = Dog('Spot', 8)
pup = Dog('Lassie')

# class methods are called on the class, not an instance
print(Dog.get_total_dogs())  # -> 2
```

<br>
<br>
<br>


## Inheritance

Maybe the following graphic will jog your memory in regards to what **inheritance** is:

<img src="https://i.imgur.com/MvXw4nD.gif">

Using inheritance, a **subclass** automatically inherits all of the attributes and methods of its **superclass**.

The **subclass** can then define additional attributes and/or methods to make a more _specialized_ class than the superclass.

For example, in the JS Classes lesson, we specialized the `Vehicle` class by _extending_ it to create a `Plane` subclass.

<br>
<br>


Let's see how inheritance is implemented in Python by creating a `ShowDog` class that specializes the `Dog` class:

```python
# Pass in superclass as argument
class ShowDog(Dog):
  # Add additional parameters AFTER those in the superclass
  def __init__(self, name, age = 0, total_earnings = 0):
    # Always call the superclass's __init__ first
    Dog.__init__(self, name, age)
    # Now add any new attributes
    self.total_earnings = total_earnings
  
  # Add additional methods
  def add_prize_money(self, amount):
    self.total_earnings += amount
```

<br>
<br>

It's show time!

```python
winky = ShowDog('Winky', 3, 1000)
print(winky) # Yay, inherited the overriden __str__
winky.bark() # Yay, inherited the bark method
print(winky.total_earnings) # -> 1000
winky.add_prize_money(500) # New method that 'Dogs' don't have
print(winky.total_earnings) # -> 1500
```

<br>
<br>
<br>


Inheritance is critical to OOP languages. In fact, they even have their own **object hierarchies**.  Check this out:

<img src="https://i.imgur.com/GC3UE9l.jpg">

Frameworks like Django and Rails have elaborate object hierarchies of their own.  For example, when we move on to Django, we'll be defining Models by inheriting from a Django class like this:

```python
class Person(models.Model):
```

<br>
<br>
<br>


## Essential Questions

Take a couple of minutes to review these...

**❓ What's the difference between a class and an object?**

**❓ What Python keyword is used to define a class?**

**❓ Another word for an object is an _________.**

**❓ How do we use a class to create objects?**

**❓ True or False: Class attributes are shared by all instances of that class.**

**❓ What OOP principle refers to subclasses specializing superclasses?**


<br>
<br>
<br>


##💪 Practice Exercise

Looking for some practice building an object hierarchy in Python?  Good!

In a separate Python repl...

Create a `BankAccount` class with the following members:

1. **`owner`**: (attribute) The owner's name as a string
1. **`balance`**: (attribute) The amount of money in the account
1. **`account_no`**: (attribute) A number to be randomly generated and assigned within `__init__` 1. not passed in at time of instantiation
1. **`deposit(amount)`**: (method) When called on an instance, increases the `balance` by the `amount` argument and returns the new balance
1. **`withdraw(amount)`**: (method) When called on an instance, decreases the `balance` by the `amount` argument and returns the new balance


<br>
<br>


Here's how to generate a random integer for the in Python:

```python
# Put this line at the top of the repl
import random

# Use this inside of BankAccount's __init__ to generate
# a random account number from 111111111 to 999999999
self.account_no = random.randint(111111111, 999999999)
```

Create two instances, make both deposits and withdrawals, and print the attributes to test them out.

<br>
<br>


#### Bonus 1

Override the `__str__` method to return the following formatted string:

```shell
Account <account_no> / Balance: xxxxx.xx
```

<br>
<br>

#### Bonus 2

Create a `SavingsAccount` class that subclasses `BankAccount` and specializes it so that the `withdraw` method no longer accepts any argument, does not change the balance, and returns a string of `No withdrawals permitted`.

<br>
<br>

#### Bonus 3

Add an additional `has_overdraft` attribute to the `BankAccount` class that accepts `True` or `False` at the time of instantiation, but defaults to `False` if not passed in (hint: review default parameters discussed above).

When the `withdraw` method is called, do not allow the withdraw if the amount being withdrawn is greater than `balance`, unless `has_overdraft` is `True`.  `withdraw` should continue to return the `balance`.

<br>
<br>


## Further Study

[Classes Tutorial](https://docs.python.org/3.7/tutorial/classes.html)

[Python Inheritance](https://www.programiz.com/python-programming/inheritance)

Learn more about magic methods [here](https://rszalski.github.io/magicmethods/)

Learn more about Python's `self` [here](https://medium.com/quick-code/understanding-self-in-python-a3704319e5f0)

Learn more about metaprogramming [here](https://stackoverflow.com/questions/514644/what-exactly-is-metaprogramming)

[Decorators](https://www.programiz.com/python-programming/decorator) in Python