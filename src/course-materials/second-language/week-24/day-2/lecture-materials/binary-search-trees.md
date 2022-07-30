
# Binary Trees

## Learning Objectives
<br>

- Students Will Be Able To:
	- Describe trees
    - Describe binary trees
    - Visualize a binary tree
    - Explain the time complexity of binary tree operations
    - Compare and contrast breadth-first and depth-first searches
    - Traverse a binary tree with looping
    - Traverse a binary tree with recursion

---
## Roadmap

* Setup
* Describing trees
* Describing binary trees
* Binary tree visualization
* Binary tree operation time complexity
* Review JS object property accessing via bracket notation vs dot notation
* Use looping to traverse a binary tree
* Use recursion to traverse a binary tree
* Work on the exercises in breakout rooms
* Go over the solutions to the exercises

___

## Setup

* Clone down the starter code, install dependencies, and cd into project:
```
    $ git clone https://git.generalassemb.ly/shaw-kitajima/GA-Post-Course-CS.git
    $ cd GA-Post-Course-CS/
    $ npm i
    $ cd binary-trees/
```

* run the tests
```
    $ npx mocha
```

___

## Describing Trees

Trees, like linked lists, are a foundational data type which are utilized in more specialized data structures

* Trees are a collection of **nodes** and **edges**
    * Nodes contain data, and edges are the connections between nodes
        * Edges are also known as branches
    * A tree's entry point is the **root node**
    * Each node may only have one **parent node** 
        * This allows the hierarchical structure, as there can be one path from a node back to the root node
    * The nodes at the end of the tree (the nodes with no children nodes) are called **leaves**
    * The length of the longest path from a leaf to the root is the tree's height

___

## Describing Binary Trees

Binary trees are one of the specialized instances of regular trees

* Binary Trees still have root nodes
* Each node will have, at most, two branches
* Each node (except the root) will have the following properties:
    * The **value**
    * The **left** property, which is a pointer to a node with a lesser value than the current node
    * The **right** property, which is a pointer to a node with a greater value than the current node
* The **left** and **right** properties could be set to ``null`` if the node has no child elements

___

## Visualize a Binary Tree

* When we create a binary tree, we initialize it with a ``root`` property, which will refer to the first node
    * When you initialize a binary tree, root will not point to anything yet, so it will point to ``null``
* When we add nodes to a tree, we have to add the node to the appropriate node
    * **❓ How do we know that you have reached the node that you will attach the new node to?**
        * Hint, try adding 3 to the graphic below
        * Hint, try adding 6 to the graphic below

![binary tree graphic](https://imgur.com/7Btz9OR.png)

___

## Binary Tree Operation Time Complexity

Operation | Average | Worst Case
-- | -- | --
Indexing (Access) | Θ(log n) | Θ(n)
Insert | Θ(log n) | Θ(n)
Delete | Θ(log n) | Θ(n)

*We will explore what causes the difference between average and worst case time complexities when we discuss balance!*

___

##  Breath-First and Depth-First Searches

There are typically two ways we think about traversing a data structure like a tree:

* Breadth-first searches
    * Start at the root node
    * Visit all the immediate children (all the nodes that are one step away from our starting node)
    * Then move on to all those nodes' children (all the nodes that are two steps away from our starting node)
    * And so on, until you reach the end
* Depth-first searches
    * Start the root node
    * Go down the first path of the node until you hit a the end
    * Start again from root node, but go down a different path
    * And so on, until you have conquered the final path


Consider you are playing chess:
* **❓ Which search method are you using when you are considering all of the possible moves you could make next?**
* **❓ Which search method are you using when you pick a move, and think about how far it could take you?**

___

## Review JS Object Property Accessing via Bracket Notation vs Dot Notation

**Property accessors**  provide access to an object's properties by using the dot notation or the bracket notation.

Given an object:
```js
const drink = {
    under: 'milk',
    over: 'beer'
};
```
We can access a property of this property if we know the name of the value of the property already:

```js
    let myDrink = drink.over;
```

However, what if at the time of writing the code, we don't know the property we want to access? This is when we can rely on square bracket notation. 

When we use square bracket notation, we can pass in a JS expression to the brackets, which JS will evaluate to determine which property to access

```js
    let hisAge = 22;
    hisDrink = drink[hisAge >= 21 ? 'over' : 'under'];
```

___

## Traverse a Binary Tree with Looping

When we want to insert an element to a binary tree, we have to traverse the binary tree to an appropriate node where we will choose to insert it at either that node's left or right property

To get there, one of the things we could do is use a walker like we did for linked lists, however, there are some considerations we must take

* Nodes in binary trees do not have ``next`` properties, instead, ``left`` and ``right`` properties
    * You want to move the walker to the ``left`` property of the walker if the value of the node you are trying to insert is less than the value of the walker's node
    * Conversely, you want to move the walker to the ``right`` property of the walker if the value of the node you are trying to insert is greater than the value of the walker's node
    * You are ready to insert the node if the walker is going to become null if the above rules are followed

So what does this look like in code?

```js
    // you will have a walker that you would initialize to the root node
    let walker = this.root
    // assume you are creating a method that has access to a Node class
    let node = new Node(data);
    // now you have to loop unti you finish the insertion
    // instead of using a proper condition, why don't you rely on the the insertion ending the loop?
    while (true) {
        let direction = data <= walker.data ? 'left' : 'right'
        // if the specified direction is null, we can attach, and we are done
        if (!walker[direction]) return walker[direction] = node;
        // otherwise, we have to traverse in the correct direction
        walker = walker[direction]
    }
```

**❓ Is the code above depth-first or breadth-first?**

When you are doing your exercises, don't forget to account for ``this.root``!



___

## Traverse a Binary Tree with Recursion

The code above is ripe for converting to a recursive function, but what if we wanted to implement a breath-first-traversal? 

For example, you might be asked for the total number of nodes in a tree, or the height of a tree. The above method with looping will not be particularly useful in answering those questions. However, recursion will be!

Let's explore a bit of a complicated example, where we may be asked for a method that returns an array that contains the total number of valid left nodes and the total number of valid right nodes in our binary tree. 

The code will probably look something like this:

```js
    // if there isn't anything at the root, we know there are no left or right nodes
    if (!this.root) return [0, 0];
    // initialize an object to hold our counters
    let data = {
    left: 0,
    right: 0,
    }
    // set up our recursive function
    const counter = (node, direction) => {
        // if we are on a valid node
        if (node) {
            // increment the valid data
            data[direction]++;
            // check the node to the left
            counter(node.left, 'left');
            // check the node to the right
            counter(node.right, 'right');
        }
    }
    // actually invoke our recursive function
    counter(this.root);
    // then return our results
    return [data.left, data.right];
```
**❓ Is the code above depth-first or breadth-first?**

**❓ Why is it that we must define ``data`` outside of the counter function?**

___


## Essential Questions
1. How many direct parent nodes can any node in a tree have?
2. How do you determine whether to traverse left or right in a binary tree?