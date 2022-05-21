---
track: "React Fundamentals"
title: "React Mastermind - Introducing State with Hooks and Props"
week: 10
day: 2
type: "lecture"
---


# Introducing State with Hooks and Props


<br>
<br>
<br>



### [Click Here](https://generalassembly.zoom.us/rec/share/1H-MwxANqHqmudZetwaLgVI3FEIVp3od18vYun5K3_4eOJOWVEGupMC3Q9XXcplf.06nzi6jqsX2gaKkI?startTime=1620779396000) to access recording


<br>
<br>
<br>



## Learning Objectives

| Students Will Be Able To: |
|---|
| Describe the difference between props and state |
| Use the `useState` hook |
| Pass props to a child component |
| Render props passed to a component |

<br>
<br>


## Road Map

1. Set Up
2. What is State?
3. Initializing State with the `useState` hook
4. Setting State
5. What are Props?
6. Passing Props
7. Difference Between State & Props Summarized
8. `react-mastermind` Features Code-along
9. Essential Questions

<br>
<br>

## Set Up

The starter code is the code from the last lesson/lab with:

- The red border styling removed
- The addition of a `<ScoreButton>` component defined, but not yet being rendered

To be ready for this lesson, please:



- Download the <a href="/downloads/react_fundamentals/state-and-props/react-mastermind.zip" download>Starter Code</a>
- Extract the folder from the `.zip` file and `cd` into it
- Install `node_modules`: `$ npm i`
- Open the code in VS Code: `$ code .`
- Start the dev server: `$ npm start`

Once the dev server opens a tab to `localhost:3000`, the page should have something like the following at the top:

<img src="https://i.imgur.com/u7ykXKg.png">

<br>
<br>

## What is State?

<br>
<br>

#### State In General

Simply put, **state** is data or information an application or component needs to implement its functionality.

Examples of state includes:

- An object representing the logged in user
- An array of todo objects
- A boolean representing whether a component's detail panel should be visible
- A number representing the selected or current index of an item in an array

<br>
<br>

#### State in React

State in a React App can be held in two ways:

1.  A class component's `state` property.
2.  In a function component using the `useState` hook - ***(As of React v16.8)***

We'll use the latter as it's the more recent and widely-adopted approach to using state.

Since data/information can only be passed **down** the component hierarchy, not up, it's a good idea to keep state as high up in the hierarchy as possible, at least initially. 

For most app's, the top of the hierarchy is the `<App>` component.

Let's add some state to the `<App>` component...

<br>
<br>

#### State in react-mastermind

When we analyze the state for the game of mastermind, we will find that we're going to need state for remembering:

- Which color is selected
- An array of guess objects, where the last object in the array will be the current guess
- The secret code

When working with data pertaining to the colors, we will find it far  more efficient to work with numbers (integers) instead of strings to represent which color has been chosen, selected, etc.

For example, we can use integers in an array to represent the secret code and the player's guesses like this:

```javascript
// Array of color "indexes" can be used for the code & player's guesses
[3, 0, 2, 2]
```

Those numbers would then be used to represent a corresponding color in a colors array:

```javascript
// Array of "colors"
['#7CCCE5', '#FDE47F', '#E04644', '#B576AD']
```

This way, the state "remembering" the selected color would be a simple integer, again, corresponding to the index of the selected color within the colors array.

With that out of the way, let's think about what has to be "remembered" about each guess. Take a look at this object's structure:

```javascript
// Structure of a player's "guess" object
{
  code: [3, 2, 1, 0],
  score: {
    perfect: 0,
    almost: 0
  }
}
```

The `code` represents the player's "guess".
The `score` object tracks the number of "perfect" pegs, that is, correct color in the correct position; and the number of "almost" which is a correct color, but in the wrong position.

The above "guess" objects can be remembered by an array in the state. The array would hold one guess object for each guess that's been made, plus the current guess (the last object in the array). 

If evaluating an application's state and data structures seems difficult, that's okay, it takes a bit of experience. Soon enough, you'll be able to recognize scenarios that you've seen before and apply those previous data structures and patterns previously used.

<br>
<br>

## Initializing State with the `useState` Hook

<br>
<br>

### What are Hooks?

A Hook is a special function that lets you “hook into” React features. - [ReactJS](https://reactjs.org/docs/hooks-state.html)

<br>

Specifically, a hook:

- Is a JavaScript function.
- Can only be used within function components.
- Allows function components to "remember" state and stateful behavior between renders.

<br>
<br>


### Built-in Hooks and their use cases:

| Hook | Use Case |
|---|---|
|[`useState()`](https://reactjs.org/docs/hooks-reference.html#usestate)|Used to implement class components' `this.state` and `setState()`.|
|[`useEffect()`](https://reactjs.org/docs/hooks-reference.html#useeffect)|Used to implement "side effects", e.g., fetching data, using timers, subscriptions, etc.<br>`useEffect()` implements the functionality of class component lifecycle methods such as `componentDidMount`, `componentDidUpdate` & `componentWillUnmount` with a single hook!|
|[`useRef()`](https://reactjs.org/docs/hooks-reference.html#useref)| Used to access DOM elements, and can be also used more generally to "remember" any non-state data that needs to be persisted between renders similar to how instance properties are used in class components. |
|[`useReducer()`](https://reactjs.org/docs/hooks-reference.html#usereducer)|An alternative to `useState()` for when the state is more complex.  It uses a reducer function and "actions" to update state - similar to how Redux does (but not as comprehensive).|
| Other built-in hooks|[`useContext()`](https://reactjs.org/docs/hooks-reference.html#usecontext)<br>[`useMemo()`](https://reactjs.org/docs/hooks-reference.html#usememo)<br>[and other less common hooks here...](https://reactjs.org/docs/hooks-reference.html#useimperativehandle)|

<br>
<br>
<br>


## Rules of Using Hooks

Using hooks requires that we always follow these two rules:

- Only call hooks at the top-level of a function component. Calling hooks inside loops, conditions, or nested functions is not allowed.

- Only call hooks from within:
	- React function components (they don't work with class components)
	- Or, your own custom Hooks

<br>
<br>
<br>



### Adding State Using `useState()`

We use the `useState()` hook to add a piece of state to a function component.

We invoke `useState()` and provide the initial value for the piece of state as an argument.

`useState()` returns an array with two elements, the value and a setter function used to update the value.

We know we want to track which color is selected, so let's start with that.

1. First we need to import the `useState` hook from React
2. Then we initialize state by assigning the result of invoking `useState` to a variable

```javascript
// Add an import statement for the useState hook using the "named import" syntax
import { useState } from "react";

import './App.css';
import GameBoard from './components/GameBoard/GameBoard';
import ColorPicker from './components/ColorPicker/ColorPicker';
import GameTimer from './components/GameTimer/GameTimer';
import NewGameButton from './components/NewGameButton/NewGameButton';

function App (){
    // first we initialize state inside the body of our function component
    const selectedColorState = useState(0);
    
    // then let's see what that gives us with a console log
    console.log(selectedColorState)
    return (
      <div className="App">
        <header className="App-header">React Mastermind</header>
        <div className="flex-h">
          <GameBoard />
          <div>
            <ColorPicker />
            <GameTimer />
            <NewGameButton />
          </div>
        </div>
        <footer>footer</footer>
      </div>
    );
}

export default App;
```

<br>
<br>
<br>

Awesome! Now, once we go to the browser and open the JavaScript console, we should see something really interesting:

```bash
► (2) [0, ƒ]
```

<br>

**`useState` returns a JavaScript Array with two elements:**

1. The initial value of state *(it's what we pass to `useState` as an argument)*.
2. A function for setting/updating state.



A better way to extract these two elements is with a concept known as [Array Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment):

```javascript

const [selColorIdx, setColorIdx] = useState(0);

// let's see the difference in access array destructuring provides
console.log(selColorIdx, selColorIdx);
```

> Key Point: The names of the variables that hold the state value and setter function are up to us. However, it's convention to name the setter function by prepending `set` to the name of the state variable as we did with `selColorIdx` & `selColorIdx`.


<br>
<br>
<br>

**let's demonstrate how to use the setter function**

1. First, let's update our `App.js` component like so:


```javascript
import { useState } from "react";

import './App.css';
import GameBoard from './components/GameBoard/GameBoard';
import ColorPicker from './components/ColorPicker/ColorPicker';
import GameTimer from './components/GameTimer/GameTimer';
import NewGameButton from './components/NewGameButton/NewGameButton';

function App (){

    const [selColorIdx, setColorIdx] = useState(0);
    
    return (
      <div className="App">
        {/* add this just above the header element */}
        Selected Color: {selColorIdx}
        <header className="App-header">React Mastermind</header>
        ...
        {/* more code below ... */}
```

<br>
<br>

2. Then we'll add a button we can use to invoke the setter function:


```javascript
// Add an import statement for the useState hook using the "named import" syntax
import { useState } from "react";

import './App.css';
import GameBoard from './components/GameBoard/GameBoard';
import ColorPicker from './components/ColorPicker/ColorPicker';
import GameTimer from './components/GameTimer/GameTimer';
import NewGameButton from './components/NewGameButton/NewGameButton';

function App (){
    
    const [selColorIdx, setColorIdx] = useState(0);
    
    return (
      <div className="App">
        {/* add this button above where we display state */}
        <button onClick={() => setColorIdx(selColorIdx + 1)}>Next Color</button>

        Selected Color: {selColorIdx}

        <header className="App-header">React Mastermind</header>
        ...
        {/* more code below ... */}
```

<br>
<br>
<br>

Cool it works!

Also note how easily we can use the current value of `selColorIdx` in the `selColorIdx + 1` expression... 

> NOTE: Calling the setter function **replaces** the current state value with the argument provided.

<br>
<br>

**SUMMARY: To add state to a function component:**

1. We import the `useState` hook from `react`. 
2. We invoke the `useState` hook inside the body of our function component passing our initial state. 
3. Using Array destructuring, we assign the returned Array elements to variables representing our state and setter function.
4. We update state *(when needed)* by invoking the setter function passing in new state as an argument.
5. The setter function, when invoked, replaces previous state with the new state passed as an argument.
6. React will then re-render the component, providing the new state to it.

<br>
<br>

**Final Note: It is very common and in some cases, even suggested to use mulitple calls to setState for managing different pieces of state, *(especially if they are unrelated)*.** 

**However, it's not required as we can simply pass a collection of values *(... a JS Object)* to `useState` instead of a single value**

Here's an example of this explaination straight from the [React Documentation](https://reactjs.org/docs/hooks-state.html#tip-using-multiple-state-variables):

```javascript
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
```
<br>
<br>
<br>

Here's another example when working with related pieces of state.

```javascript
function ExampleWithRelatedState() {
  // Declare multiple state variables!
  const [user, setUser] = useState({
    firstName: 'Melba',
    lastName: 'Mouton',
    occupation: 'Mathematician',
    placeOfEmployment: 'NASA'
  });

```


<br>
<br>
<br>

#### Does All Information Belong in State?

The previous example aside, let's talk about what should we put in state.

So the answer to the question: _Does All Information Belong in State?_ is "no", not if the information never changes or if it does change, you don't want to cause components to re-render.

When you have data that doesn't change, or don't want to re-render if it changes, we can define that data:

1. In a variable outside or inside of the component definition 
2. Exported from a seperate utility module

As discussed, we intend to use the `selColorIdx` state to hold the index of the selected within a `colors` array.

The `colors` array will used as a lookup data structure and doesn't change during the app's execution, so we don't need to put it in state.

1. First let's add the `colors` array as a local variable to our App Component.
2. Then we'll update our JSX to render the color's hex instead of the `selColorIdx`
3. **NOTE: We might need to update what's passed to the setter function**

```javascript
import { useState } from "react";

import './App.css';
import GameBoard from './components/GameBoard/GameBoard';
import ColorPicker from './components/ColorPicker/ColorPicker';
import GameTimer from './components/GameTimer/GameTimer';
import NewGameButton from './components/NewGameButton/NewGameButton';

function App (){
    // add this array just inside the app component
    const colors = ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD'];
    const [selColorIdx, setColorIdx] = useState(0);
    
    return (
      <div className="App">
        {/* change what we pass to the setter function to properly cycle the color indexes 😄 */}
        <button onClick={() => setColorIdx(selColorIdx + 1 < 4 ? selColorIdx + 1 : 0)}>Next Color</button>

        Selected color: {colors[selColorIdx]}

        <header className="App-header">React Mastermind</header>
```


<br>
<br>

#### 💪 Exercise - Initializing State (10 min)

Okay, your turn to add more state to react-mastermind:

**NOTE: The two values you get back from `useState` should be assigned to variables, gameState & setGameState**

So, for example

```javascript
const [gameState, setGameState] = useState(...
```
<br>
<br>


**NOTE: While invoking `useState`, we'll pass in an object with two properties:** 


1. `guesses`: An array that will hold the player's "guess" objects. Initialize it to an empty array.<br>**Important:** If a piece of state will be an array, always initialize it to be an array, empty or not! This is because the components it gets passed to are going to expect to be able to `map`, `filter`, `forEach`, etc. over it!

2. `code`: An array that will hold four integers (ranging from `0` to `colors.length - 1`). To obtain the value for `code`, define a helper function named `genCode` inside your `App` function component that will return the array of four randomly generated numbers when invoked. 

**Here's what your `genCode` helper function should return:**

```javascript
return new Array(4).fill().map(() => Math.floor(Math.random() * colors.length));
```
<br>
<br>


We're going to be adding more state in a bit, but now let's turn our attention to **props**.

<br>
<br>
<br>

## What are Props?

You should be somewhat familiar with props from the _Intro to JSX_ lesson.

A parent component uses props to pass data and references to methods/objects to child components.

A prop looks much like an `attribute=value` pair in an HTML element.

However, as discussed in the JSX lesson, you must use camelCasing to name your props instead of the kebob-casing preferred in HTML.

<br>
<br>

## Passing Props

The first prop we'll pass in react-mastermind will be the `colors` array to the `<ColorPicker>` component within the `render` method in **App.js**:

```javascript
<ColorPicker colors={colors}/>
```

<br>

**NOTE: You must use curly braces to pass any value other than a simple string *(template literals need to be surrounded by curly braces as well)*.**

We can now go to  `<ColorPicker>` and work with the colors array, but there's a better way to check things like props and state - [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

Just like how Chrome's DevTools are invaluable when it comes to troubleshooting the DOM, so are React's Developer Tools when it comes to troubleshooting a React app!

With the Chrome extension installed you will now see a **React** tab in Chrome's DevTools!

After clicking on the **React** tab, you can explore the component hierarchy. Select the `<ColorPicker>` component and then view the right-hand side:

<img src="https://i.imgur.com/K6GCbVQ.png">

How exciting!

<br>
<br>
<br>

#### Accessing Passed Props

When a **Function Component** is being rendered, React will pass in props as the first argument to the function like this:

```javascript
const ColorPicker = (props) => (
  ...
```

<br>
<br>
<br>

Let's use the `colors` prop inside of `<ColorPicker>` to render a button for each of the colors in the array:

```javascript
const ColorPicker = (props) => (
  <div>
    {props.colors.map(color =>
      <button key={color}>{color}</button>
    )}
  </div>
);
```
Yup, once again, the `map` array iterator method is the go to for transforming an array of data into an array of components!

Check it out, they won't be pretty (yet), but you'll find a button for each color in the `props.colors` array!

<br>
<br>
<br>

#### Props Cannot be Changed

Props are immutable, their values are never to be changed.

Remember, the prop came from a component somewhere up the hierarchy and if the prop's value originated from state, it would be **that** component's responsibility to update its own state.

However, a component can certainly pass down via props methods that can be used to update its state - but that's for another day.


<br>
<br>

#### 💪 Exercise - Passing Props (5 mins)

Your turn to pass some props:

1. The `<ColorPicker>` component will need to know which color is selected, thus, pass the `selColorIdx` state to it as a prop with the same name.

	> Note: The name of the prop can be anything, but it makes sense to name it the same as the state property being passed.

2. The `<GameBoard>` component will need access to both the `colors` array and the `guesses` state. Pass both as props using the same names.

Check your work using the React Developer Tools.

<br>
<br>

## Difference Between State & Props Summarized

Let's summarize the key differences between state and props:

| state | props |
|---|---|
| `state` created by the `useState` hook holds information "owned" by that component | `props` holds information passed down the component hierarchy |
| State can be replaced to a newer version using the setter function we get from the `useState` hook | Props cannot be modified |
| When changed, React re-renders the component | N/A<br><br> We can pass the setter function as a prop to change state, which will effectively send the updated data when React re-renders the component and it's children|

<br>
<br>

## react-mastermind Features Code-along

Let's add some functionality to react-mastermind which will give us some practice working with state, props and React in general...

<br>
<br>

#### Seed a Couple of Guess Objects

When the app loads, the player is going to expect to see an initial guess row in which to start making their color choices:

<img src="https://i.imgur.com/m5wLwS9.png">

After the player clicks the `<ScoreGuess>` button, they will expect another guess row to appear so that they guess again (unless they won of course).

Since we'll need to create new guess objects throughout game play, let's write another helper function responsible to return a pristine guess object in **App.js**:

```javascript
// Add this function with the rest of your "helpers" inside the App component
function getNewGuess() {
  return {
    code: [null, null, null, null],
    score: {
      perfect: 0,
      almost: 0
    }
  };
}
```

We're using a `null` in each of the four positions to represent that a guess has not been made yet for that position.

Now we can use this `getNewGuess` function to update how the `guesses` state array is initialized in **App.js**:

```javascript
   const [gameState, setGameState] = useState({
      guesses: [getNewGuess()],
      code: genCode()
    });
```
<br>
<br>

React Developer Tools can confirm that `<GameBoard>` is now receiving the `guesses` prop with a guess object in it.

However, during development, we often want to "seed" initial data for testing, styling, etc.

Let's make a change to temporarily create two guess objects in the `guesses` array instead of one, and with "color" indexes instead of the nulls:

```javascript
const [gameState, setGameState] = useState({
   guesses: [getNewGuess(), getNewGuess()],
   code: genCode()
 });


  /* helper functions */
 function genCode() {
   return new Array(4).fill().map(() => Math.floor(Math.random() * colors.length));
 }


function getNewGuess() {
  return {
    // Comment out until done testing
    // code: [null, null, null, null],
    code: [3, 2, 1, 0], // for testing purposes
    score: {
      perfect: 0,
      almost: 0
    }
  };
}
```

<br>
<br>

#### Code `<GameBoard>` to Display `<GuessRow>`s

The `<GameBoard>` component currently is rendering two hard-coded `<GameRow>` components:

```javascript
const GameBoard = (props) => (
  <div>
    <GuessRow />
    <GuessRow />
  </div>
);
```

However, now that `<GameBoard>` is being passed the actual `guesses` array, let's refactor to render a `<GuessRow>` for each guess object in the array instead:

```javascript
const GameBoard = (props) => (
  <div>
    {props.guesses.map((guess, idx) =>
      <GuessRow
        guess={guess}
        colors={props.colors}
        key={idx}
      />
    )}
  </div>
);
```

While we're at it, we're passing both the `guess` object and the `colors` array as props because the `<GuessRow>` needs access to them to do its job.

<br>
<br>

We're also using `idx` to assign to `key` to make React happy. 

> Note: Passing state and props down multiple levels of the component hierarchy is common in React. However, state management alternatives, such as Redux and React's context API, allow for "providing" state to components directly instead. Redux has a lot of set up overhead and is overkill for most apps.

<br>
<br>


Okay, we should still be seeing two `<GuessRow>` components being rendered.

However, now it has `guess` & `colors` props that can be used. Here's what **GuessRow.js** currently has for code:

```javascript
const GuessRow = (props) => (
  <div className='flex-h'>
    Guess Row #
    <GuessPegs />
    <GuessScore />
  </div>
);
```

Now let's display an actual number for "Guess Row #".

Problem though, `<GuessRow>` doesn't currently have this the "guess row number" information. You might think that we could use the value of the `key` prop, however, `key` is for React's internal use and is not actually passed to the child component as a prop.

We're going to have to pass the value of `idx` as a separate prop instead in **GameBoard.js**:

```javascript
const GameBoard = (props) => (
  <div>
    {props.guesses.map((guess, idx) =>
      <GuessRow
        guess={guess}
        colors={props.colors}
        {/* Add the rowIdx prop */}
        rowIdx={idx}
        key={idx}
      />
    )}
  </div>
);
```

Now we can go back to **GuessRow.js** and render the actual row number:

```javascript
const GuessRow = (props) => (
  <div className='flex-h'>
    <div>{props.rowIdx + 1}</div>
    <GuessPegs />
    <GuessScore />
  </div>
);
```
As you can see, we want the row number to be 1-based.

Check it out in the browser and you will find that the row number is now being displayed.  Although we want the newest row on top, which we'll take care of using styling.

Okay, next up is passing props to the `<GuessPegs>` component.

The following props will need to be passed to `<GuessPegs>`:

- `colors`: No big surprise here because those pegs will definitely need to access the actual color values instead of the index numbers.
- `code`: Each peg's color is dependent upon what color the player has guessed, which is being stored in the guess object's `code` property.

Let's pass these along:

```javascript
const GuessRow = (props) => (
  <div className='flex-h'>
    <div>{props.rowIdx + 1}</div>
    <GuessPegs
      colors={props.colors}
      code={props.guess.code}
    />
    <GuessScore />
  </div>
);
```

Sweet. Make sure the page is not receiving any errors and let's move on to the `<GuessPegs>` component that we just passed some props to...


<br>
<br>

#### Code `<GuessPegs>`/`<GuessPeg>` to Display the Color Values

Currently, `<GuessPegs>` is rendering "GuessPegs" text and the four `<GuessPeg>` components in **GuessPegs.js**:

```javascript
const GuessPegs = (props) => (
  <div className='flex-h'>
    GuessPegs
    <GuessPeg />
    <GuessPeg />
    <GuessPeg />
    <GuessPeg />
  </div>
);
```

First, delete that temp "GuessPegs" text.

Now, what does each `<GuessPeg>` need to know?  Simply the color value it is responsible for displaying.

But the specific color value to pass as a prop depends upon the color that the player has guessed for that position.

This is how it's done:

```javascript
const GuessPegs = (props) => (
  <div>
    <GuessPeg color={props.colors[props.code[0]]} />
    <GuessPeg color={props.colors[props.code[1]]} />
    <GuessPeg color={props.colors[props.code[2]]} />
    <GuessPeg color={props.colors[props.code[3]]} />
  </div>
);
```

Each `<GuessPeg>` is receiving a `color` prop that is being set to the value from the colors array, indexed by the guess stored in<br> `props.code[/* index of the peg's position */]`

Now let's get the `<GuessPeg>` component to simply render the color value instead of bogus text.

<br>
<br>

Update **GuessPeg.js** as follows:

```javascript
const GuessPeg = (props) => (
  <div>
    {props.color}
  </div>
);
```

<br>
<br>
<br>

**Checking the browser should put a smile on your face:**

<img src="https://i.imgur.com/ZnXMx2f.png">

**Later we will use those color values to style the pegs!** 😎

<br>
<br>


#### Display Either the `<GuessScore>` or `<ScoreButton>`

Let's code one last piece of functionality...

Currently, the `<GuessRow>` component is always rendering the `<GuessScore>` component.

However, `<GuessScore>` should be displayed for previous guesses only, not the current guess:

<img src="https://i.imgur.com/cENmDl0.png">

We will need to add some conditional logic to `<GuessRow>` to render `<ScoreButton>` for the **current** guess row.

However, currently, `<GuessRow>` does not have a way of knowing if it's the current row or not.

As you've seen already, we'll need to pass a prop to `<GuessRow>` from its parent component, `<GameBoard>`, to let it know if it's the current row or not.

Back in **GameBoard.js** let's add a `currentGuess` prop in addition to the others:

```javascript
const GameBoard = (props) => (
  <div>
    {props.guesses.map((guess, idx) =>
      <GuessRow
        guess={guess}
        colors={props.colors}
        rowIdx={idx}
        {/* Add the currentGuess prop */}
        currentGuess={idx === props.guesses.length - 1}
        key={idx}
      />
    )}
  </div>
);
```

The `{idx === (props.guesses.length - 1)}` JSX expression will result in a value of `true` or `false` being passed.

Now the `<GuessRow>` component has the info necessary to decide which components to render.

<br>
<br>

Let's add the necessary conditional logic in **GuessRow.js**:

```javascript
const GuessRow = (props) => (
  <div className='flex-h'>
    <div>{props.rowIdx + 1}</div>
    <GuessPegs
      colors={props.colors}
      code={props.guess.code}
    />
    {/* Refactor as follows */}
    {
      props.currentGuess ?
        <ScoreButton /> :
        <GuessScore />
    }
  </div>
);
```

Ah yes, our friend the ternary expression is the go to for returning one of two expressions depending upon a conditional expression.

<br>
<br>
<br>

One last detail, we've referenced the `<ScoreButton>` component without importing it:

```javascript
import React from 'react';
import GuessPegs from '../GuessPegs/GuessPegs';
import GuessScore from '../GuessScore/GuessScore';
// Import the ScoreButton component
import ScoreButton from '../ScoreButton/ScoreButton';
```

<br>
<br>
<br>


The look of sweet success:

<img src="https://i.imgur.com/O68DERR.png">

Cool!

Before the lab, let's do a quick review...

<br>
<br>
<br>
<br>

## Essential Questions

Take a minute to review the following questions:

**❓ In the context of an application, what is state?**


**❓ In the lesson, where and how was state initialized?**


**❓ How do we "update" state?**


**❓ What is wrong with the following code:**


```jsx
function GameTimer(props) {
  props.elapsedTime += 1;
  return (
    <div>
      Elapsed Time: {props.elapsedTime}
    </div>
  );
}
```

<br>
<br>

**❓ When passing a prop down several levels of the component hierarchy, do we _have_ to name the prop the same each time it is passed?**

<br>
<br>

## References

- [Thinking in React](https://reactjs.org/docs/thinking-in-react.html)
- [Import Statements *(named vs default)*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- [React Docs - Introducing Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Docs - Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)
- [React Docs - Building Your Own Hooks](https://reactjs.org/docs/hooks-custom.html)
