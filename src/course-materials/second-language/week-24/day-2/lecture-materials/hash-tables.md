
# Hash Tables

## Learning Objectives
<br>

- Students Will Be Able To:
    - Explain what a hash table is
	- Explain what a hashing algorithm is
    - Explain what hash collisions are
    - Solve hash collisions with open addressing
    - Solve hash collisions with closed addressing
    - Explain the advantages and disadvantages of open and closed addressing

---
## Roadmap

* Setup
* Defining hash tables
* The hashing algorithm
* Uh-oh, we have a hash collision
* Open addressing
* Closed addressing
* Common methods with probing and chaining
* Hash tables in the real world

___

## Setup

* Clone down the starter code, install dependencies, and cd into project:
```
    $ git clone https://git.generalassemb.ly/shaw-kitajima/GA-Post-Course-CS.git
    $ cd GA-Post-Course-CS/
    $ npm i
    $ cd hash-tables/
```

* run the tests
```
    $ npx mocha
```

* Open the project's folder in your code editor

---

## Hash Tables

Welcome to the most easily understandable data structure that we will cover in this cohort! A ``hash table`` is a list-like data structure that’s designed to quickly store and retrieve key data records. To store keys in a hash table, they must be mapped (with a ``hash algorithm``) to the set of possible indices in the table or to addresses of a memory location.

What does that mean in English? Imagine you have an array. If you know the index of the array to look in, isn't the time complexity to access the element at that index ``O(1)``? So why don't we create an array and call that the ``hash table``? When we want to add values to the hash table, we will using a helper algorithm (the ``hash algorithm``) to give us an index of our hash table to put that value in. 

Then if we ever need to access that value in the ``hash table``, we could use our handy ``hashing algorithm`` again to tell us what index to look in! O(1) baby!


As we should expect, our ``hash table`` will look a little bit like this. Our ``hashing algorithm`` should always return ``0`` when looking at ``Raymond``, ``1`` for ``Isabel``, and so on. 

![Hash Table](https://ga-instruction.s3.amazonaws.com/assets/tech/computer-science/hash-tables-deep-dive/english/4-9-table.png)

___ 

## The Hashing Algorithm

The ``hashing algorithm's`` job is to examine some attribute of the data that it is being provided, and return an index of the ``hash table`` for that value to be placed into.

``Hashing Algorithms`` are the x-factor to our hash tables. 

**❓ What do you think is the only absolute rule for hashing algorithms?**

Additionally, here are some guidelines that our ``hashing algorithm`` should follow:

* It should output an index that is less than the length of the hash table, but greater than or equal to 0
* It should distribute values evenly across the hash table
* It should be simple and efficient
* It should try to avoid collisions (we will cover these next!)

In your exercises, you will be tasked with creating a simple hashing algorithm. The big bucks in the industry are for math wizards who come up with efficient hashing algorithms, but for our purposes, why don't we keep them simple?

If you are given a string as the data, you could find out what the ASCII values are for each the characters in the string, and them sum them together. You could then return that sum, modulo the length of the hash table, and mission accomplished!

**❓ Why would you want to use the modulo operator here?**

___ 
## Hash Collisions

If we think about our simple hashing algorithm, there should be one extremely alarming thing about it.

**❓ What would be the significance of providing "despondent" and "depsondent" to our simple hashing algorithm?**

This is an example of a hash collision - where have two different inputs to the hashing algorithm that give the same output!

This would look like:

<br>

![hash collision](https://ga-instruction.s3.amazonaws.com/assets/tech/computer-science/intro-data-structures/english/11-Keys-Indices-Diagram.png)

**❓ Where is the hash collision in this graphic?**

In the next sections, we will discuss how to solve hash collisions!

___

## Open Addressing / Closed Hashing

Open Addressing, also known as closed hashing for some strange reason, is the idea of ``probing`` the hash table for another available space when a hash collision occurs. The three most common ways of performing the ``probing`` are as follows:


### Linear Probing

With ``linear probing``, this is as easy as adding ``1`` to the index until the hash table doesn't have anything at that index!

![linear probing](https://ga-instruction.s3.amazonaws.com/assets/tech/computer-science/hash-tables-deep-dive/8-linear-probing.png)

However, with linear probing, if the hash function isn’t set up carefully, this can cause what’s known as clustering: values will be clumped together instead of distributed evenly. This is a problem because indices are more likely to have to iterate through the cluster to reach an open space, as opposed to coming across open spaces scattered neatly throughout the table.

### Quadratic Probing

With ``quadratic probing``, if the slot at the hashed index is occupied, square the number of steps you take to the right (i.e., take one step, then four (2 * 2), then nine (3 * 3), then 16, then 25, etc.) until you find an open slot!

For example: If index ``7`` is taken, try ``8`` (7 + 1 * 1). If index ``8`` is taken, try ``11`` (7 + 2 * 2). If ``11`` is taken, try ``16`` (7 + 3 * 3)... and so on!

## Double Hashing

With ``Double Hashing``, you will come up with a secondary hash function. It must not ever return 0 and it must be able to return all addresses in the table.

If the slot at first index generated by (hash(x)) is occupied, hash that index using the secondary hash function (e.g., ``hash2(x)``). If that slot is occupied, try ``2 * hash2(x)``, then ``3 * hash2(x)``, and so on.

**An excellent visualization of open addressing/closed hashing can be found [Here](https://www.cs.usfca.edu/~galles/visualization/ClosedHash.html)**

___

### Closed Addressing / Open Hashing

Closed Addressing is the idea of ``chaining`` our values in the hash table when a hash collision occurs!

So instead of placing the data directly in the hash table, you could place another data structure in that slot, and use that data structure to hold all of the values at that index in the hash table!

This might look like:


![chaining](https://ga-instruction.s3.amazonaws.com/assets/tech/computer-science/hash-tables-deep-dive/english/10-chaining.png)

**❓ What data structure does it look like we are using in this graphic?**
**❓ What other data structure could we use instead?**

Naturally, there are some pros and cons to using ``chaining``:

![chaining pros and cons](https://ga-instruction.s3.amazonaws.com/assets/tech/computer-science/hash-tables-deep-dive/english/11-pros-cons-table.png)

**An excellent visualization of closed addressing/open hashing can be found [Here](https://www.cs.usfca.edu/~galles/visualization/OpenHash.html)**

___
## Common Methods with Chaining and Probing

As with any data structure, you will want to be able to search in a hash table, insert into the hash table, and remove from the hash table. Let's take a look at how these methods differ based on ``chaining`` vs ``probing``

| Method | Probing | Chaining  |
| --------- |-----------| -----|
| ``search``      | ``hash`` the key, see if it’s at that index, and probe until you find it or find an empty slot. | ``hash`` the key, then search the data structure at that index for that key |
| ``insert``  | ``hash`` the key, then put it at the index generated; if that index is taken, probe until you find one that’s available   |   ``hash`` the key, then store it in the data structure at that index |
| ``remove`` | 	Perform a ``search`` followed by a ``deletion``, but you must set an indicator that an element was deleted or a probe might stop there when it should keep jumping when performing later methods  |  ``hash`` a key, then delete the data from the data structure located at that index |

___ 
## Hash Tables in the Real World

Hash tables are incredible in situations where you need to access items in collections of millions, or maybe even billions of entries! An excellent use-case of this would be a spell checker on your computer!

When a user presses the space bar, you could trigger the hash function on the word, and see if you hash table of correctly spelled words finds a value there! If it does, you have spelled the word correctly. Otherwise, the word is misspelled.

**❓ How could we use hash tables to suggest the correct spelling?**

___

## Essential Questions

1. What does the hashing algorithm do, and what is the absolute rule it must follow?
2. What is a hash collision?
3. Is clustering of data in the hash table a more common occurrence when chaining or probing?