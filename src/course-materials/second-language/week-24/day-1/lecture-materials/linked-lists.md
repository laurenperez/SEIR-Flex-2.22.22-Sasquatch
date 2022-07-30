
# Linked Lists

## Learning Objectives
<br>

- Students Will Be Able To:
	- Define linked lists
    - Explain the time complexity of linked list operations
    - Compare and contrast linked lists to Arrays
    - Visualize a linked list
    - Traverse a singly linked list
    - Swap nodes within a singly linked list
    - Remove nodes from a singly linked list

---
## Roadmap

* Setup
* Defining a linked list
* Linked list operation time complexity
* Comparing linked lists to arrays
* Review JS class syntax
* Linked list visualization
* Meet the walker
* Use the walker to swap nodes
* Use the walker to remove nodes
___

## Setup

* Clone down the starter code, install dependencies, and cd into project:
```
    $ git clone https://git.generalassemb.ly/shaw-kitajima/GA-Post-Course-CS.git
    $ cd GA-Post-Course-CS/
    $ npm i
    $ cd linked-lists/
```

* run the tests
```
    $ npx mocha
```

* Open the project's folder in your code editor

---

## Defining a Linked List

<br>

![Linked List Meme](https://imgur.com/L9KOlSx.jpeg)

<br>
<br>

Linked lists are a foundational, "array-like" data structure which appears in other complex data structures

* Linked lists are a collection of **nodes**
    
    * nodes are also seen in other data structures, but for linked lists, they contain:
    * a ``data`` property, that stores the node's value
    * a ``next`` property, also known as the "pointer", which points to the next item in the linked list
    * the last node will have a ``next`` property set to ``null``, so it is sometimes referred to as the "null next node", or the "tail"

Because of the pointers, the *order* of nodes within a linked list are not given by their physical placement in memory

--- 

## Linked List Operation Time Complexity

Operation | Worst Case Time Complexity
------------ | -------------
Indexing (Access) | O(N)
Insert/delete at beginning | O(1)
Insert/delete at end | O(1) when last element is known
Insert/delete in middle | search time + O(1)

---

## Comparing Linked Lists to Arrays

It seems that linked lists are very similar to arrays, but have natural drawbacks

* **❓ What is the time complexity of indexing for an array?**
* **❓ Is it possible for us to look backwards through a linked list where each node only has a *data* and *next* property?**

But for us to understand the advantages of linked lists, we'll have to do a bit of a review of arrays

*For this lesson, we'll be discussing dynamic arrays, instead of static arrays*

* A dynamic array stores all elements *consecutively* in memory, and keeps a count of the current number of elements
    * arrays are allocated space when defined
    * if the space reserved for the dynamic array is exceeded, it is reallocated and (possibly) copied

![array graphic](https://www.mathcs.emory.edu/~cheung/Courses/170/Syllabus/09/FIGS/array02x.gif)

* If we want to insert something into an array, we have to make space by "scooting over" every element, starting at the index we want to insert at

* **❓ What must we do if we want to delete an element in the middle of the array?**

* **❓ What are some of the advantages of linked lists over arrays?**

---

## Review of JS Class Syntax

Talking about theory is a lot of fun, but what better way is there for us to understand linked lists than by creating them ourselves?

If you were to implement a linked list, you would create instances of linked lists, much like you create instances of arrays and objects. Although we are used to using literals to create arrays (``[]``) and objectss (``{}``), remember that we are able to instantiate them using "classes" as well!

```js
let myArr = new Array();
let myObj = new Object();
```

When you do your exercises, your goal will be to create a ``LinkedList`` class, which you would then be able to invoke with the below syntax to create shiny new linked list objects.

```js
let myLinkedList = new LinkedList();
```

### JS Class Syntax

The easiest way for us to create JS "classes" is to use the class declaration syntactic sugar (because classes don't actually exist in JS):

```js
 class LinkedList {

 }
```

Now you have a class which can be used to create shiny new objects that are instances of our LinkedList class. However, if we were to create an instance of this class, it would just be an empty object. If we want our objects to hold properties, we will use the ``constructor`` method to assign properties to them!

The ``constructor`` is a method that you add to your class, in which you provide the properties for your objects to have. You should always use the ``this`` keyword to define the property, and then the value can be whatever you want it to be.

```js
class LinkedList {
    constructor() {
        this.head = null;
    }
}
```

Well, what if you wanted your properties to have values that can be provided when instantiated? A typical example of this would be assigning a name to an instance of the Human class. Or for linked lists, our nodes would have data. For that, we will create parameters for the constructor!

```js
class Node {
    constructor(data) {
        this.data = data;
    }
}

let myNode = new Node(4);
```

One thing to note here is that you can call your parameters whatever you want. If you wanted to define the parameter as dinosaur, that would be totally fine. You would then say ``this.data = dinasaur``. But how are multiple parameters assigned from arguments? Positionally!

```js
class Human {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

let me = new Human('Shaw', 34);

```

Finally, let's talk about ``instance methods``. Some famous instance methods you know might be the ``array.push()`` and ``array.pop()`` methods. These are functions that you invoke on specific instances of your class, and they can be defined like this:

```js
class Human {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    speak() {
        console.log(`hello my name is ${this.name} and I am ${this.age} years old!`)
    }
}

let me = new Human('Shaw', 34);
me.speak();

```

If you ever need to refer to properties of the object that we are using, you must preface the property name with ``this``!

---

## Visualizing a Linked List

* When we create a linked list, we initialize it with a ``head`` property, which will refer to the first node
    * When you initialize a linked list, head will not point to anything yet, so it will point to ``null``
* The easiest place to add more nodes to the linked list is at the end of the list
    * **❓ How do we know if you have reached the end of a linked list?**

![Linked list visualization](https://ga-instruction.s3.amazonaws.com/assets/tech/computer-science/linked-lists/english/3-Head-Node-Null.png)

We will be referring to this graphic for the below sections

---

## Traversing a Linked List with the Walker

Looking at the time complexity graphic, we are aware that accessing a node in a linked list has linear time complexity

* This is because we have to traverse (or walk through) the list until we get to the node we are looking for
* Since we are walking through the linked list, we often call our iterator ``walker``

In order to traverse a linked list, we will need to start at ``head``, and use the ``next`` pointers to iterate through the list


```js
let walker = this.head;
while (walker.next) {
    walker = walker.next;
}

```

**❓ In our handy little graphic above, where will ``walker`` end up?**

**❓ How could we edit the ``condition`` such that walker will become the final ``null`` value?**

---

## Swapping Nodes in a Linked List

One of the operations that might be performed in a linked list is the swapping of nodes

Using the below image, what if we wanted to swap the node with a ``data`` of 7 with the node with a ``data`` of 12

![pre-swap](https://i.imgur.com/8Erm8Gz.png)

The end goal would be:

![post-swap](https://i.imgur.com/R1dapjO.png)

Let's visualize the swap where we first move out the node with a data of 12 and it's next pointer

![moving-latter-node](https://imgur.com/f6Bn89D.png)

* At this point, we haven't done any attachments yet, but here are some of the things that much be done
    * the node with ``data`` of 7 should point to what the node with ``data`` of 12 was previously pointing at
    * The node with a ``data`` of 12 should now point to our node with ``data`` of 7
    * the node with a ``data`` of 4 should now point to our node with ``data`` of 12

Let's try connecting our arrows

![connecting-arrows](https://imgur.com/5gnH2fr.png)

If we were to convert this to code, it will look something like this
```js
// assume that walker is the node with data of 4
// therefore, walker.next would be the node with data of 7
// and walker.next.next is the node with data of 12

// first, we should "move" out the node with data of 12
// we are just saving the node to a variable
let temp = walker.next.next;
// point node with data of 7 to what node with data of 12 was looking at
walker.next.next = temp.next;
// point the node with data of 12 to node with data of 7
temp.next = walker.next;
// connect walker to node with data of 12
walker.next = temp;
```

**❓ Is it possible to swap 7 and 12 without having a reference to what precedes 7?**

**❓ How would this code change if we wanted to swap the head node with what comes after it?**

**❓ Isn't putting the node with ``data`` of 12 back to the linked list a lot like inserting?**

---

## Removing Nodes from a Linked List

Let's go back to our example with 4, 7, and 12

![pre-swap](https://i.imgur.com/8Erm8Gz.png)

If we wanted to remove our node with ``data`` of 7, how hard would it be?
* Can't we just tell our node with ``data`` of 4 to look at the node with ``data`` of 12?

Heck yes we can! Let's see it in action with some code

```js
// we will have our walker again, and it will be the node with data of 4

// so let's just remove 7 by doing
walker.next = walker.next.next
```

**❓ Assume walker is now the node with `data` of 7, would the code change if we wanted to remove the node with `data` of 12?**

---
## Essential Questions
1. When we want to add a node to a linked list, do we have to scoot over the subsequent nodes (like we do for arrays)?
2. Can we do index access like we can with arrays with linked lists?