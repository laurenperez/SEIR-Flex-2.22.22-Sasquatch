
# Binary Searches

## Learning Objectives
<br>

- Students Will Be Able To:
	- Explain what a brute force search is
    - Explain how binary searches work
    - Explain the time complexity of a binary search

---
## Roadmap

* Setup
* A New Developer's Journey Through Searching
* Binary Searches

___

## Setup

* Clone down the starter code, install dependencies, and cd into project:
```
    $ git clone https://git.generalassemb.ly/shaw-kitajima/GA-Post-Course-CS.git
    $ cd GA-Post-Course-CS/
    $ npm i
    $ cd binary-searches/
```

* run the tests
```
    $ npx mocha
```

* Open the project's folder in your code editor

---

## Brute Force Searches

When we were first taught about arrays, one of the things we were likely asked to do was to find a value in an array.

Do we all remember the first things that came to our minds? Did it perhaps look a little bit like this?

```js
const arr = [1, 6, 3, 7, 2, 0, 500, 654];
function findNumber(arr, num) {
    let found = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === num) {
            found = true;
        }
    }
    return found;
}
```

As you learned more about though, you probably came to realize that the computer didn't need to keep searching after it found the item it was looking for, so you might have refactored your code to look like:

```js
const arr = [1, 6, 3, 7, 2, 0, 500, 654];
function findNumber(arr, num) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === num) {
            return true;
        }
    }
    return false;
}
```

By stopping the search once the item was found, you were thinking about algorithmic complexity - how long it takes for a function to run. You may not have been aware of it at the time, but you were thinking about our dear friend Big O.

**❓ What is the time complexity of these functions?**

You also didn't know this at the time, but your solutions were taking advantage of an algorithm solving technique known as the **Brute Force** strategy

### The Brute Force Algorithm

Simply put, the brute force approach examines all possible candidates for a solution, and checks whether each candidates satisfies the condition. In our ``findNumber`` example, we would iterate across every element until we found the number, or return false if we couldn't find it. We can see examples of brute force in other problems situations:

* Going through your entire meme library to find the perfect one for the situation
* Checking every brand of cereal in the store to see which has the most protein
* Finding the cheapest route to a destination by checking all of the routes and picking the cheapest one

As should be expected, brute force solutions are usually very slow because they rely on checking a large number of possible solutions. However, that doesn't mean we should completely disregard them. Brute force solutions to problems are a great place to start when you are in a coding interview. Brute force solutions are usually the simplest solutions to create, and as you go through them, you can identify different boundaries that could allow you to refactor your solution for a faster one.

## Binary Searches

If you were born before 2000, chances are you have used a physical dictionary in your life. Did you know that you were likely using an variation of a binary search when you were looking for a definition of a word? Let's say you wanted to the definition of  ``Despondent``, if you flipped the dictionary and ended up with words the started with ``C``, you knew to look in later pages. If you then found yourself with words that started with ``E``, you knew to look in previous pages, between where ``C`` and ``E`` are. You could then have kept on zeroing in until you found ``Despondent`` - which means "in low spirits from loss of hope or courage"


**❓ What about the dictionaries allows you to take this approach to finding definitions?**


## Details of the Binary Search

***A BINARY SEARCH CAN ONLY BE PERFORMED ON SORTED DATA***

Here are the detailed steps you would take to perform a binary search!

1. The main vocabulary terms for binary searches include **ceilings** and **floors**. 

* **Ceilings** and **floors** are ***indexes*** of the array that you are searching. The value you are looking for should always be between the ceiling and the floor - meaning that you can never allow the values at the ``ceiling`` or ``floor`` to be the value you are looking for. 

For practical purposes, that means in the initial values for the floor should be ``-1`` (one less than 0, which is the first index of an array), and the ceiling would be ``arr.length`` (one more than the last index of the array)

2. Once you have calculated the ceilings and the floors, you can calculate the **midpoint**. The **midpoint** is going to be the index in the middle between the ceiling and the floor. You can calculate it as:

```
((ceiling + floor) / 2) Rounded Down
```

3. Now that you have the index of the middle. You can check to see if the the array at the middle index is the element you are looking for. If it is, you, congratulations, you have found the value! 

4. If the middle point isn't the value you are looking for, you should then check to see if the **ceiling** has met the **floor**, meaning that there is nothing between the ceiling and the floor. If that is the case, you know the value is not there!

**❓ How can you tell if the ceiling met the floor?**

5. By now you know that the value at the ``midpoint`` is not value you are looking for, and the value could still be there! Your next job is to update the ``ceiling`` or the ``floor``:
    * If the value you are looking for is greater than the value at the ``midpoint``, you know that the value is between the ``midpoint`` and the ceiling. You know for sure that the value at ``midpoint`` is not what you are looking for, so you can change your ``floor`` to be the ``midpoint``.
    * If the value you are looking for is less than the value at the ``midpoint``, you know that the value is between the ``floor`` and the ``midpoint``. You should now change the ``ceiling`` to be the ``midpoint`` 

6. Now that you have updated the ``ceiling`` or the ``floor``, that means we have eliminated half of the sublist you were just looking at from consideration, and now you can repeat steps 2 to 5 until you either find the value or you figure out that the value is not in the list you are searching!

**❓ What are the two ways that we can do the repeat?**

## An Example of the Binary Search

Let's try to find out if ``11`` is in the array ``[1, 4, 6, 12, 34, 50]``

1. First we must calculate ceiling and floor. Ceiling will be the array's length: ``6``, and the floor will be: ``0``
2. We should calculate the ``midpoint``. The formula above tells us it should be ``3``.
3. Is ``array[3]`` our value? ``12`` is not ``11``, so we don't get to leave early
4. Did our ceiling meet the floor? Not yet, so the value might still be out there
5. Is ``11`` greater than the value at our ``midpoint``? Nope, so let's update ``ceiling`` to be ``3``
6. Let's calculate ``midpoint`` again. ``Floor`` is still ``0``, and ``ceiling`` is ``3``. ``Midpoint`` should be ``1``
7. Is ``array[1]`` the value we are looking for? Nope!
8. Did our ceiling meet the floor? Nope!
9. What is our new ``ceiling`` or ``floor``? ``11`` is greater than ``4``, so let's update our ``floor`` to be ``1``
10. Back to calculating the ``midpoint`` we go. ``Ceiling`` is still ``3`` and floor is ``1``. Midpoint should be ``2``
11. Is ``array[2]`` the value we are looking for? Nope!
12. Did our ceiling meet the floor? Nope!
13. ``11`` is greater than ``6``, so our now ``floor`` is the middle: ``2``!
7. Is ``array[2]`` the value we are looking for? Nope!
8. Did our ceiling meet the floor? Nothing comes between our floor: ``2``, and our ceiling ``3``, so we know that the value is not in our array!

___
## Essential Questions
1. What is the main condition that has to be met to allow you to run a binary search on an array?
2. In a recursive approach to the binary search, what is the base case?
3. The time complexity of a binary search is ``O(log(N))``. Why?