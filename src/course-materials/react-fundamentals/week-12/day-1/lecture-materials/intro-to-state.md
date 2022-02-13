---
track: "React Fundamentals"
title: "Intro to State"
week: 12
day: 1
type: "lecture"
---

# Intro to State

<img src="https://i.imgur.com/KRmlOo1.png" width="500" />

<br>
<br>
<br>

## Learning Objectives

After this lesson you will be able to:

- Explain what `state` is and how to implement it in React
- Use `Array Destructuring` to create variables from an array
- Update `state` and re-render the Component

<br>
<br>
<br>

## Framing

The best analogy to understand React `state` is to start by answering the following question: **How are you feeling this very moment?**

- Are you happy to be in class learning a new topic?
- Are you frustrated having to sit in class for the next several hours learning even more React?
- Did some random person say `hello` out of the blue make you smile?

The answer to any one of those questions has a direct impact on your `state` of mind. A `happy` state will be reflected in your smile, tone of voice, being nice to others in return. An `unhappy` state will have the opposite effect.

As with all human beings our `state` of mind can change on the fly which is almost always reflected in our facial expressions or actions. Applications also have a `state` which is reflected in the UI presented to the user.

Therefore updating an applications `state` is our control mechanism for how we update the UI.

<br>
<br>
<br>

## Props Recap

So far we've worked with `props` and used them to pass values from a `parent` to a `child` Component. This pattern of passing data down will be consistent in React as the flow of data is `unidirectional` and always flows down.

We also know that the props passed down to a child are organized, by React, into an object where every prop becomes a **`key: value`** pair.

<br>

Props are a great way to pass data but have the following limitations:

- Data in React is unidirectional and props are always passed down from `parent > child`
- Props are immutable
- Reassigning a prop value will have no effect on the Component.
- Child Components cannot communicate directly and therefore cannot pass data between them

<br>
<br>
<br>

#### 🔎 Check for Understanding

- Take a a minute to think about the following questions:
  - What do we use `props` for?
  - What limitations do `props` have?
  - Is there any best practice you can think of when creating a `prop`?

When asked slack your answer(s) in a thread created by the instructor

<br>
<br>
<br>

## Intro To State

In our attempt to provide a coherent framing of React `state` the point was made that what you see on the page is the current version of the applications `state`. Any changes to `state` will then be reflected in the UI.

One important thing to note here is that any changes to state will cause the Component to `re-render`.

This is essentially how the UI is updated.

This is a very important concept to keep in mind as a `re-render` can also initiate additional function calls, something we will discuss as part of Reacts `lifecycle methods`.

<br>
<br>
<br>

### Rules Of State

🚔 Here are the rules we need to follow when working with state.

- State is assigned using the `useState` or `useReducer` hook
- The State value can be assigned any data type
- The State value is never updated directly but only using its corresponding `setState` function
- The state value must always be overwritten with a new value

<br>
<br>
<br>

### Working With State

So updating state will, most often, require the user to interact with the application. Hence, the user performs some action, like clicking a button, and the component responds by `doing a thing` and then updating `state`.

Now it's time to dive in and build a small Counter app that contains state.

<br>
<br>
<br>

### A Simple Counter Component

We'll walk through building a very simple `Counter` Component which will do the following:

- Provide the user 2 buttons to increment or decrement
- Display the initial and update value as it changes

<br>
<br>
<br>

#### Spin Up A New CodeSandbox

For this demo you will spin up a new CodeSandbox.

To do this just click on the blue `Create Sandbox` button on the right of the page.

<img src="https://i.imgur.com/N0qsmdh.png" width=200/>

Now scroll down to the `Official Templates` section and choose `React by CodeSandbox`.

<img src="https://i.imgur.com/dgdr5A8.png" width=300/><br>

<br>
<br>
<br>

#### Creating The Counter Component

<br>
<br>
<br>

#### <g-emoji class="g-emoji" alias="alarm_clock" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/23f0.png">⏰</g-emoji> Activity - 3min

Since you already have experience creating Components take a minute to perform the following activity.

<br>
<br>

**Counter Component**

- Create a new file in `src` called `Counter.js`
- Create the Component
- Return the following JSX:

```jsx
<>
  <span>Current Count: 0</span>
  <section>
    <button>+</button>
    <button>-</button>
  </section>
</>
```

- Export the Component

<br>
<br>

**App Component**

- Import the Component into `App.js`
- Replace all the JSX inside of `className="App"` with the `Counter` Component.

```jsx
<div className="App">
  <Counter />
</div>
```

Once you're done, React should render the following:

<img src="https://i.imgur.com/fBEOYU0.png" width="300"/>

That JSX looks like it could use a little styling.

So let's copy/paste the following css to `styles.css`:

<details>
<summary>CSS <strong>(Click To Expand)</strong></summary>

```css
.App {
  font-family: sans-serif;
  text-align: center;
  width: 160px;
  margin: auto;
  display: flex;
  flex-direction: column;
}

section {
  display: flex;
}

button {
  flex: 1;
}

span {
  font-size: 20px;
}
```

</details>

<br>

And now the design should update to look like:

<img src="https://i.imgur.com/jTh9SU2.png" width="200" />

<br>
<br>
<br>

### The `useState` Hook

In order to add state to the `Counter` Component we will first need to import the `useState` Hook from `React`. `useState` is one of the 3 Basic Hooks as per the Official React Doc.

<br>
<br>
<br>

#### A Word On Hooks

Hooks were introduced in `React Version 16.8`. Before hooks, all state needed to be placed within a `Class` component.

Hooks introduce state management to `Functional` Components, using a simpler and more flexible API and let you split one component into smaller functions based on what pieces were needed.

<br>
<br>
<br>

#### <g-emoji class="g-emoji" alias="alarm_clock" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/23f0.png">⏰</g-emoji> Activity - 2min

Since we will be working with `Hooks` solely in this class let's take a minute to review the following React Docs:

- [Hooks API Reference](https://reactjs.org/docs/hooks-reference.html) - all the available Hooks.

<br>
<br>
<br>

**Class Component State Example**

Class Components come with a lot of boilerplate, which can feel bulky, especially when dealing with a simpler state.

**Instructor Demo**

> The instructor will perform a small demo of creating a class based Component that includes state. Not need to code along as none of the following code will be used in building the Counter App.

Here is how state would have been configured using a class Component.

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }
  render() {}
}
```

Although with the the next most recent ES (ECMA Script) class properties proposal and the help of` Babel` to transpile the code the above could be written as:

```jsx
class Counter extends React.Component {
  state = { count: 0 }
  render() {}
}
```

<br>
<br>
<br>

**State of Transition**

We are currently in a `state of transition` in world of React.

Hooks were a game changer and have become the tool of choice when writing React in 2020.

Keep in mind however that there is way more code out there written in the previous syntax but Hooks and any research you perform on React will almost certainly show Class based solutions unless you include the keyword `Hook` in your search query.

**Instructor Demo**

> The instructor will perform a small demo of performing a Google search for updating state in React, with and without the keyword `Hook`

<br>
<br>
<br>

### Importing `useState`

Now it's time to import `useState` into the Counter Component.

The React library that is imported in every Component has a `key` called `useState` that we elicit from React and store in a variable of the same name.

If we take a moment to console log React in the Counter Component:

```jsx
import React from "react"
console.log("this is React", React)
```

<br>
<br>

We would see everything it has to offer include `useState`

<img src="https://i.imgur.com/soVHfMl.png" width="500" />

Since we are familiar with `Object Destructuring` let's use it to elicit the value of this key and store in a variable simultaneously.

```jsx
import React, { useState } from "react"
```

<br>
<br>

Just so that we get a better idea of what `useState` actually is let's add a `console log`.

```jsx
const Counter = () => {
  console.log("useState - ", useState)
  // ...rest of code
}
```

<br>
<br>

The output should look like the following:

<img src="https://i.imgur.com/IZFNnbg.png" width="400" />
<br><br>

It appears that `useState` is a function that takes in in `initialState`, calls a supporting function and returns `dispatcher.useState()`.

We won't get into the underlying code here but one thing to to highlight is the keyword `dispatcher`.

We will revisit this concept later when we cover the `useReducer` hook as it uses a similar naming convention of `dispatch` for corresponding `setState` function.

<br>
<br>
<br>

#### `useState` Rules and Best Practices

Let's take a moment to once again review the `rules` of `useState` and include some best practices as well.

🚔 Rules

- the State value is never updated directly
- the State value is only updated using it's corresponding `setState` function
- the state value must always be overwritten with a new value

<br>
<br>

⭐️ Best Practices

- Use `Array Destructuring` when initializing the state variables
- Name the initial state based on what it contains
- Use the same name for the function but precede it with the word `set`
- Use a the callback function version of `useState` if you need to reference the previous version of state
- Give thought as to what needs to be in state and how that state should be organized and structured
- Always use `...spread` operator to copy object and array values to the new state

<br>
<br>
<br>

#### Creating An Instance Of State

With `useState` imported it's time to create an instance of state. To do this we will call `useState()` and pass it an initial starting value of `0`.

⭐️ Name the initial state based on what it contains.

```js
const countState = useState(0)
```

<br>
<br>
<br>

Once again let's add a console log and see what it returns.

```js
const countState = useState(0)
console.log("countState -", countState)
```

<br>
<br>
<br>

We should see the following:

<img src="https://i.imgur.com/0SIS9qZ.png" width="300" />

So, it appears `countState` is set to an array that contains the following elements:

**0** - The initial state value we defined
<br>
**1** - `function` - which will be used to update state.

One way to create 2 new variables based on the array would be to manually elicit their values using standard array bracket notation.

<br>
<br>

In keeping with best practices we will name the initial state variable `count` as it will be used it to increment/decrement a starting value essentially keep `count`.

⭐️ Use the same name for the function but precede it with the word `set`

Of course, the corresponding function that will be used to update state should be called `setCount`.

⭐️ Use the same name for the function but precede it with `set`

```js
const count = countState[0]
const setCount = countState[1]
```

<br>
<br>
<br>

#### Array Destructuring

⭐️ A more convenient way of doing this is using ES6 [Array Destructuring](https://javascript.info/destructuring-assignment).

Array Destructuring elicits the values from the array based on their position and stores them in variables.

```js
const [count, setCount] = useState(0)
```

<br>
<br>
<br>

### Using State

Now that our initial value is been assigned to the `count` variable let's update the JSX to use that value instead of a current hard coded value of 0.

Of course, as has been stated several times already, JSX requires that all JavaScript be surrounded in curly braces.

```jsx
return (
  <div>
    <span>Current Count: {count}</span>
    ... rest of code
  </div>
)
```

<br>
<br>
<br>

### Updating State

With our state value in place it's time to provide some functionality to the buttons and allow the user a means to interact with the app and update state.

In the case of our Counter the only way to update `count` is to call the `setCount` function and pass it a new value.

🚔 Always use the `setState` function to update state

There are 2 ways to perform this action:

```js
// grab the current version of state
setCount(count + 1)

// OR

// use a callback function and pass the previous version of state
setCount((prevState) => prevState + 1)
```

In the second example the setter function takes in an callback function that is passed the previous value of state and returns a new value altogether.

The argument in this example is called `prevState` by convention but you can name it anything you want.

There are scenarios when the callback function version is required. One example would be when state is being updated within the callbacks of either a `setTimeout()` or `setInterval()`.

Since that isn't the case here we will use the first example to update state.

<br>
<br>
<br>

#### Adding an `onClick` Event

In order to allow the user to interact with the buttons we will need to add an event listener.

React event listeners are an additional topic we will revisit again in future lessons. They are essentially `synthetic events` based on the real underlying JS events and perform the same operations as before. Events you might have worked with before are:

- **`click => onClick`**
- **`submit => onSubmit`**
- **`change => onChange`**
- **`mouseover => onMouseOver`**

<br>
<br>
<br>

For now we will add an `onClick` event listener that calls `setCount` to update state.

Also, as with plain JavaScript or jQuery we will use an anonymous callback to pause the execution until the click event has occurred.

```jsx
return (
  <div>
    <span>Current Count: {count}</span>
    <section>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </section>
  </div>
)
```

<br>
<br>

If we test out the app we should see that the count value will change based on user input.

<br>
<br>
<br>

**Instructor Demo**

> The instructor will demo where React is caught in an infinite loop that was triggered by updating state without using the onClick callback funtion

<br>
<br>
<br>

### Event Handlers

In order for us to use the React library effectively there are certain conventions we must practice.

This is a good thing in that we can quickly examine code and expect some consistency in how it is written.

However, some React code is written solely based on the adoption of the community at large.

One example of a particular convention we use is when creating `event handler` functions.

The convention is to precede their name with word `handle`.

Let's give that a try by creating the following supporting functions:

- `handleIncrement`
- `handleDecrement`

```js
const handleIncrement = () => {}

const handleDecrement = () => {}
```

<br>
<br>
<br>

### Conclusion

Before we wrap up this lesson, let's move the `setState` function calls into their corresponding `handler` functions and update the `onClick` to reflect this refactor.

```js
const handleIncrement = () => {
  setCount(count + 1)
}

const handleDecrement = () => {
  setCount(count - 1)
}
```
