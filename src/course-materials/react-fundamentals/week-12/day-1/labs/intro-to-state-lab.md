---
track: "React Fundamentals"
title: "Intro To State Lab"
week: 12
day: 1
type: "lab"
---

# Intro To State Lab

So far you've learned the following about React:

- Creating and nesting Components
- Passing props and how to using them in JSX
- Importing and setting up state
- Updating state and re-rendering the Component
- Adding and calling event listeners

Now it's time to put it all together. At a high level you will do the following:

> Using only a single App Component you will implement the logic that allows a user to click on one of 4 small images and then update the DOM to display that image as the large image.

<img src="https://i.imgur.com/RVEofv5.jpg" width=200/>

<br>
<br>
<br>

## Working Version

Here is a [working version](https://k8jfb.csb.app/) of the app so you have a reference of the base functionality that you are being asked to implement.

<br>
<br>
<br>

## Starter CodeSandbox

Here is our [Starter CodeSandbox](https://codesandbox.io/s/rctr-9-8-20-react-cities-starter-kpsk5).

<br>
<br>
<br>

## Instructions

For this exercise you will do the following:

<br>
<br>

#### App Component

- Examine the working live solution and determine the functionality needed
- Examine the HTML provided in `src/index.html` as this contains the HTML elements needed for the design
- Determine how best to organize the data needed to render the images
- Create a file called `imageData.js` that contains an array of image objects that are assigned keys of your own choosing, but must include the image url and alt values.
- Using `Array.map()` loop over the data to create the small images based on the structure you decided
- Render the array of small image elements
- Import `useState` into App
- Use one instance of `useState` to implement the logic.
- Work out the remaining logic needed to implement the design

<br>
<br>

**Note:** All functionality must be placed within the App Component and no additional Components should be created for this solution to work.

<br>
<br>

**Hint:** Try setting up state first and rendering the big image based on the value in state.

<br>
<br>

**Hint:** Since you will be looping over an array of data, creating an image for each element and passing it the properties it needs, consider assigning the `handleClick` within the loop

<br>
<br>

**Hint:** Since you already have the value of the image `src` inside the loop perhaps you could pass the `handleClick` function the image url.

<br>
<br>
<br>

### Bonus - Green Border

- Place a green border around the image to indicate that it is the current image being displayed.
- Any other previously active image will have it's border color removed

**Hint:** Since you already know how to assign a `className` AND know about ternary operators, try combining the two together and assign a class based on the result of a ternary operator.

<br>
<br>

OR

<br>
<br>

**Hint:** Since you already know how to use the style prop AND know about ternary operators, try combining the two together and assign a border based on the result of a ternary operator.

<br>
<br>
<br>

## Bonus 1 - Traffic Light

Convert the following [Traffic Light](https://codepen.io/jkeohan/live/MWYEyMV) into a single React Component and implement the logic needed to perform the functionality in the app.

Here is the [jQuery Solution](https://codepen.io/jkeohan/pen/MWYEyMV?editors=1010) code which shows an instance of using a `switch` statement.

<br>
<br>
<br>

## Bonus 2 - Memory Game

Convert the following [CodePen](https://codepen.io/jkeohan/live/opvVGN) into a single React Component and implement the logic for click events and adding state.

Here is the dataset to use for the cards:

<details><summary>DataSet</summary>

```js
const cardBackgroundImage =
  "https://res.cloudinary.com/jkeohan/image/upload/v1511808091/back_xldk5l.png"

const cardsArr = [
  {
    rank: "queen",
    suit: "hearts",
    cardImage:
      "https://res.cloudinary.com/jkeohan/image/upload/v1511808103/queen-of-hearts_nbvwls.png",
  },

  {
    rank: "queen",
    suit: "diamonds",
    cardImage:
      "https://res.cloudinary.com/jkeohan/image/upload/v1511808103/queen-of-diamonds_opxv6b.png",
  },

  {
    rank: "king",
    suit: "hearts",
    cardImage:
      "https://res.cloudinary.com/jkeohan/image/upload/v1511808103/king-of-hearts_njmwml.png",
  },

  {
    rank: "king",
    suit: "diamonds",
    cardImage:
      "https://res.cloudinary.com/jkeohan/image/upload/v1511808103/king-of-diamonds_mpn7sm.png",
  },
]
```

</details>

<br>
<br>
<br>

## Bonus 3 - Lifting State

This is an advanced bonus and requires that you do additional research on lifting react state.

Try creating additional components for the images. You will most certainly run into issues with breaking the **onClick** functionality.

<br>
<br>

Here are some resources on lifting react state:

- Easy Read: [change-parent-component-state-from-child-using-hooks-in-react](https://webomnizz.com/change-parent-component-state-from-child-using-hooks-in-react/)
- Difficult Read: [react-lift-state](https://www.robinwieruch.de/react-lift-state)

<br>
<br>
<br>
