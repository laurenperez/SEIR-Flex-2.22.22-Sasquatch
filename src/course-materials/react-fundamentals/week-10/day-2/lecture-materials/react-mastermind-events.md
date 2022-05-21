---
track: "React Fundamentals"
title: "React Mastermind - Event Handling"
week: 10
day: 2
type: "lecture"
---


# Event Handling in React


<br>
<br>
<br>


<!-- 
### [Click Here]() to access recording


<br>
<br>
<br> 
-->



## Learning Objectives

| Students Will Be Able To |
|---|
| Use event props to invoke functions |
| Optionally pass arguments to event handlers |

<br>
<br>
<br>


## Roadmap

- Set Up
- Review the Starter Code
- Browser Events in React
- Use event props to invoke function
- Providing arguments to functions in event props
- Summary
- Essential Questions

<br>
<br>
<br>


## Set Up

To get set up for this lesson:

- Download the <a href="/downloads/react_fundamentals/event-handling/react-mastermind.zip" download>Starter Code</a>
- Extract the folder from the `.zip` file and `cd` into it
- Install the Node modules: `$ npm i`
- Open the code in VS Code: `$ code .`
- Start the dev server: `$ npm start`

<br>
<br>


## Review the Starter Code

The starter code for this lesson picks up at the finished version of the styling lab.

React's dev server will automatically open Mastermind in the browser, which should look like this:

<img src="https://i.imgur.com/T4dN4UU.png">


<br>
<br>
<br>


### Refactoring the App's State

For the styling lab, within `<App>`'s `gameState`, the `guesses` array was being initialized with 4 calls to `getNewGuess()`.

Let's update **App.js** so that the game loads correctly with only one pending guess:

```javascript
  // Update to initialize with one guess object
  const [gameState, setGameState] = useState({
      guesses: [getNewGuess()],
      code: genCode()
    });
```

That's a good start, but we also don't want to "pre-select" the player's color choices as we're currently doing with this line, `code: [3, 2, 1, 0]`, inside of the `getNewGuess` method (again, for styling purposes).

<br>
<br>
<br>


**What do those numbers correspond to?**

Instead, we are going to represent a "no color choice" with a `null` value like the line that's commented out in the `getNewGuess` method.

Let's uncomment that line and delete the other "for testing purposes" line to update `getNewGuess` as follows:

```javascript
getNewGuess() {
  return {
    code: [null, null, null, null],
    score: {
      perfect: 0,
      almost: 0
    }
  };
}
```

<br>
<br>
<br>

**With that done, once we refresh the browser, the pegs will no longer have any visual representation (but the `<div>`s are still there):**

<img src="https://i.imgur.com/JKWBtLC.png">

Instead of an invisible `<div>`, we want to render a "null" peg with a dashed grey border.

To accomplish this, let's update the object being assigned to the `style` prop in **GuessPeg.js** as follows:

```jsx
const GuessPeg = (props) => (
  <div
    className={styles.peg}
    style={{
      backgroundColor: props.color,
      /* Add a new CSS border property */
      border: props.color ? `1px solid ${props.color}`: '1px dashed grey'
    }}
  />
);
```


Just another ternary expression!

<br>
<br>
<br>

 
**That's a tidy example of dynamic styling for the `border` property.**

<img src="https://i.imgur.com/7CX8Dfs.png">

Looking good now, but let's also make the pegs in the **current** guess row look "clickable" by making the cursor a pointer.

Yay, another opportunity to put the `currentGuess` prop to good use.

But, the four `<GuessPeg>` components don't yet have access to the `currentGuess` prop...



<br>
<br>
<br>



### 💪 Exercise - Passing Props

- Beginning with the parent component of `<GuessPeg>`, keep going up the component hierarchy until you have access to the `currentGuess` prop.

- Then turn around and pass down the `currentGuess` prop to each `<GuessPeg>` component. *(Hint: React Developer Tools can help here)*


<br>
<br>
<br>
<br>



**Now that each `<GuessPeg>` has a `currentGuess` prop, we can add another property to the `style` object to set the CSS `cursor` property:**

```jsx
  style={{
    backgroundColor: props.color,
    border: props.color ? `1px solid ${props.color}`: '1px dashed grey',
    cursor: props.currentGuess && 'pointer'
  }}
```


**Refresher:** *JS's logical `&&` (and) operator returns the first value if it's falsey. Otherwise, the second value (`'pointer'`) is returned.*

Note that React does not complain if we assign `false` to the `cursor` property - it just ignores it!

Excellent! Now we're ready to talk about events...


<br>
<br>
<br>



## Browser Events in React

First, **what are some common browser events we've worked with so far?**

In case you need to be reminded, [here you go!](https://developer.mozilla.org/en-US/docs/Web/Events) .

Like many things in React, event handling is a little different than what we are used to.

Let's see how...



<br>
<br>
<br>



### Use event props to invoke functions

In React, we do not add event listeners using JavaScript's `addEventListener` method. 

Instead, we use certain props on React Elements (`<div>`, `<p>`, etc.) to connect those components' events to a handler (method/function).

Let's see this by adding an anonymous arrow function as a click handler on the colored circles within the `<ColorPicker>` component:


```jsx
  const ColorPicker = (props) => (
    <div className={styles.ColorPicker}>
      {props.colors.map((color, idx) =>
        <button
          className={styles.button}
          style={{
            backgroundColor: props.selColorIdx === idx ? 'white' : color,
            borderColor: color
          }}
          key={color}
          {/* add the click handler below */}
          onClick={() => alert('clicked!')}
        />
      )}
    </div>
  );
```


Just a baby-step `alert` for now - test it out.

<br>
<br>
<br>


Event observations thus far:

- The names for event props are camelCased (`onClick`). In HTML, the attribute would be `onclick`. Here's the [list of events](https://facebook.github.io/react/docs/events.html#supported-events)  supported by React.
- The JS expression (always within curly braces) assigned to an event prop must evaluate to a **function**. A function type, **not** a function call (unless that function call returns a function) - **we'll talk more about this shortly**.
- In native JS, if the event handler function returns `false`, it prevents the default behavior of that event and stops event bubbling (same as calling both the `preventDefault()` & `stopPropagation()` methods). However, in React we must call the `preventDefault()` method on the **Synthetic Event** object...

> One last observation - check out the best practice code formatting/indentation when a component has more than a couple of props!



<br>
<br>
<br>



### The Synthetic Event Object

You've seen how event handlers are automatically passed an event object as an argument. In a React app however, this event object is a React [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html)  that wraps the browser's native event object.

React does this because React has its own event system that:

- Handles lingering browser incompatibilities.
- Improves performance by implementing a single delegated event handler for all events.

Luckily though, React's event system is transparent to us - we don't need to know the nitty gritty details. 

More importantly, the API of the Synthetic Event object is identical to the browser's, which means we can still invoke `preventDefault()`, `stopPropagation()`, access `target` & `clientX` properties, etc.



<br>
<br>
<br>



### Updating State as a response to an event

Let's continue working with the `<ColorPicker>` with the intention of updating the `selColorIdx` in state to the index of the clicked color...


We need to be able to invoke the `setColorIdx` that lives in `<App>`, from the `<ColorPicker>` component.

Just like passing other expressions, we can give `<ColorPicker>` a **reference** to the function via props!

Update **App.js** like this:

```javascript
<ColorPicker
  colors={colors}
  selColorIdx={selColorIdx}
  setColorIdx={setColorIdx}
/>
```


Now, `<ColorPicker>` will have access to the `setColorIdx` via `props.setColorIdx`.

In regards to clicking a color in `<ColorPicker>`, we want to pass the newly selected color's index as an argument to the `setColorIdx` setter function so that we can use it to update `selColorIdx` accordingly.

So, inside of `<ColorPicker>` we can replace the `onClick={() => alert('clicked!')}` with `props.setColorIdx(idx)`

<br>
<br>


**Don't worry if this code doesn't entirely make sense, we will review shortly 😄**

```javascript
const ColorPicker = (props) => (
  <div className={styles.ColorPicker}>
    {props.colors.map((color, idx) =>
      <button
        ...
        {/* Update this line */}
        onClick={() => props.setColorIdx(idx)}
      />
    )}
  </div>
);
```

<br>
<br>
<br>

Awesome! We should be able to change the selected color now!

**So, what's the deal with this inline arrow callback function inside the `onClick` event prop?**

<br>

Perhaps thought we could have done something like this:

```javascript
onClick={props.setColorIdx(idx)}
```

Unfortunately, this pattern will not work, writing the above code will actually invoke the method each time `<ColorPicker>` is rendered - resulting in an alerts popping up each time, funny, but not really.

Again, the JS expression (always within curly braces) assigned to an event prop must evaluate to a function type, not a function call, however we can provide a function for the event object to callback to once the event occurs, which can then invoke our handler function with the passed in argument we need. 




<br>
<br>
<br>
<br>



## Summary

Writing code for event-driven programming can be challenging and error prone until you get used to it.

If things aren't working, be sure to closely read the error messages and use React Developer Tools to check that methods, etc. are being passed correctly via props.


<br>
<br>
<br>



## Essential Questions

Take a minute to review the following questions:


**❓ How do we providing arguments to functions in event props?**

**❓ Is this code bogus or cool? Explain your answer.**

```jsx
<Square handleClick={this.handleClick(5)} />
```


<br>
<br>
<br>



## References

[Synthetic Events](https://facebook.github.io/react/docs/events.html) 