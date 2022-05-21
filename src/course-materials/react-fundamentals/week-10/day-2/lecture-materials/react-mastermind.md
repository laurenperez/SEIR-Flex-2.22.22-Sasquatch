---
track: "React Fundamentals"
title: "React Mastermind"
week: 10
day: 2
type: "lecture"
---


# React Mastermind

<br>
<br>
<br>

### [Click Here](https://generalassembly.zoom.us/rec/share/l4aZfuIyOkmNQ0qaDnen9mty23v4RwBmvE9wYbYrZ8BtYywsrAfQnX_p0tgKH1iH.dT-IvOGE9G6fv0Xk?startTime=1620490804000) to access recording - Includes Both JSX & Components Lessons

<br>
<br>
<br>

## Start a New React App - `react-mastermind`

<img src="https://i.imgur.com/1KRUhfi.jpg" height="400">

#### Mastermind - _"A game of cunning and logic for two players"_

<br>
<br>

Developing a game in React provides excellent practice designing and developing React components.

Don't think that by writing a game, you won't learn how to use React in non-game apps. This game is going to be a full-stack app with CRUD on the backend and even advanced authentication! In reality, there's no better way to learn about React than by developing what we're going to this unit!

Our goal is by the end of this unit, to have a working game of [Mastermind](https://en.wikipedia.org/wiki/Mastermind_(board_game)).

You're not familiar? Come on, it was only named game of the year - in 1973 :)

It normally takes two players to play Mastermind because one player had to set the secret code and score the guesses of the other player trying to break the code.

Luckily, this app will make it possible for users to play Mastermind by themselves!

Let's check out what we're going to build [here](https://seir-mastermind.herokuapp.com/).

<br>
<br>

#### Generate the App

The **best** way to create a React project is by using the `create-react-app` tool.



```shell
$ npx create-react-app react-mastermind
```




Creating a new React app takes some time because `create-react-app` also installs the Node modules - and there's a ton of them!

After the process completes:

1. `$ cd react-mastermind`
2. Open in VS Code: `$ code .`
3. Open terminal in VS Code (`ctrl + backtick`)
4. Spin up React's built-in development server: `$ npm start`, which will also automatically browse to the app.

For the most part, you will be coding your React apps by modifying/adding code within the `src` folder.

<br>
<br>

#### Ready the App for the Exercise

Not long ago, `create-react-app` generated the `<App>` component in **App.js** as a class.  However, it now uses a "Function" Component.

Going back to Class Components again, they used to be the only way we could manage state in our application, which is something we're going to cover in a lot more detail later. 

However, for now, just think of state as a piece of memory our User Interface uses to invoke functionality.

Function Components are "lighter weight", and with the recent addition of [hooks](https://reactjs.org/docs/hooks-intro.html), they can now manage state like Class Components as well as lifecycle methods (effects), etc.



```javascript
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">React Mastermind</header>
    </div>
  );
}

export default App;

```
<br>
<br>

Now let's clean up **App.css** also. Replace everything with the following:

```css
.App {
  text-align: center;
}

.App-header {
  background-color: #222;
  height: 50px;
  padding: 20px;
  color: white;
  font-size: 40px;
  text-align: center;
}
```

<br>
<br>
<br>

## Exercise: Identify the App's Components

#### Start With A Mockup or Wireframe

We'll need a mockup or wireframe of the Mastermind game to guide us.

Because We've already written the app, I'm able to show you a screenshot of the actual app we'll be building.

We're going to use the following screenshot as a hi-fidelity wireframe:

<img src="https://i.imgur.com/vgmgR1P.png">

<br>
<br>

#### Outline Components (Class Exercise)

Looking again at the image near the top of the page shows how we might identify components by outlining and naming the individual components. Doing so reveals the hierarchy and relationship between them.

Here are the names of the components used in the final app:

- `<App>`
- `<header>`
- `<GameBoard>`
- `<GuessRow>`
- `<GuessPegs>`
- `<GuessPeg>`
- `<GuessScore>`
- `<ColorPicker>`
- `<GameTimer>`
- `<NewGameButton>`
- `<footer>`

As a class, let's identify the hierarchy and outline the above components in the above wireframe.

> Let's ignore the **Difficulty** "button", because it's actually just a link (`<a>`) that routes to the difficulty screen.

<br>
<br>

## A React Development Approach

We all know how challenging it can be to get started developing an app. Of course, this app is only a front-end app, so we don't need to be concerned about a database, server routes, etc.

Let's review the following common approach:

1. Identify potential components (like we did above).
2. Identify the application's data-model (state). **State is the single-source of truth** in an application!
3. Start coding components in a top-down approach.
4. Put state in top-level components (at least initially).
5. Add layout CSS to components (including "wrapper" built-in components such as `<div>`s) as needed to properly layout/group other components.
6. As development progresses, consider moving state closer to the components that need common state and "below" the components that don't. This ongoing refactoring is like a lot of development - as much art as science.

Lastly, [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html) from the docs is a fantastic read that covers many of the above concepts in greater detail.

Let's start defining some components...

<br>
<br>
<br>

## Defining Function Components

#### What Are They?

**Function Components** were introduced in version 0.14 of React (current version is 70.0 - yes, they changed their versioning scheme).

Function Components provide a simpler syntax vs. defining components using classes.

Function Components will be your "go to" syntax and should be the preferred way to define components unless there's a special reason to use a class instead, which is highly unlikely these days.

Going back to the `f(d) => V`, example, function Components take props as an argument and return the JSX (UI) you want to render, for example:

```javascript
// A function component using an ES2015 (ES6) arrow function:
const ConcertCard = (props) => {
  return (
    <div className='concert-card'>
      <h3>{props.concert.title}</h3>
      <Performers performers={props.concert.performers} />
      <Venue venue={props.concert.venue} />
    </div>
  );
};

// Then the component can be used like this:
<ConcertCard concert={concertObject} />
```

<br>
<br>
<br>

#### Sneak Peak at Class/Function Component Differences

Function Components are functionally equivalent to Class Components when the class only defines a `render` method.  For example, the equivalent Class Component for the above `<ConcertCard>` component would be:

```javascript
class ConcertCard extends React.Component {
  render() {
    return (
      <div className='concert-card'>
        <h3>{this.props.concert.title}</h3>
        <Performers performers={this.props.concert.performers} />
        <Venue venue={this.props.concert.venue} />
      </div>
    );
  }
}
```

Notice that the `ConcertCard` class extends from `Component`, which is a _named import_ from the `react` module. You could also just import `React` and extend from `React.Component`.

Another difference you need to be aware of between Function Components and Class Components:

- You access props in a Class Component as `this.props` instead of just `props`, which is the name of the parameter commonly used when defining Function Components. 
 
We'll talk more about props in a later lesson

<br>
<br>
<br>

#### Write Our First Mastermind Component

Following the recommended approach above, we'll start coding the components higher in the hierarchy and work our way down.

The `<GameBoard />` component based on our wireframe is a great place to start - so let's:

1. Create a **components** folder within the **src** folder. All our new components will go inside this new folder.
2. Create a **GameBoard** folder within the **components** folder. This is a best practice that allows you to organize a component's module file with other files used by that component (primarily CSS files and tests).
3. Create a **GameBoard.js** (GameBoard.js also works) module within the **GameBoard** folder.  Note that the name of the module file is always the same as the component, including the UpperCamelCasing.
4. Add the following code to **GameBoard.js**:

	```javascript
	import React from 'react';
	
	const GameBoard = (props) => (
	  <div>
	    GameBoard
	  </div>
	);
	
	export default GameBoard;
	```
	
5. Update **App.js** to:

```javascript
import React from 'react';
import './App.css';
// Must import components using the import statement
import GameBoard from './components/GameBoard/GameBoard';

function App() {
  return (
    <div className="App">
      <header className="App-header">React Mastermind</header>
      <GameBoard />
    </div>
  );
}

export default App;
```

Looking good.  However, as you build out the rest of the components for this lesson, it would be cool to see a border surrounding each `<div>` that you render for each of the components.
	
Let's define a "temporary" CSS class named `component` in **index.css** that will "outline" any element that contains the **component** class:

```css
.component {
  border: 2px dotted red;
  margin: 4px;
  padding: 4px;
}
```

Next, add the **component** CSS class to the `<div>` in the `<GameBoard>` component like this:

```javascript
const GameBoard = (props) => (
  <div className="component">
  ...
```

Now you'll be able to easily identify the component hierarchy as you create the skeleton components we identified earlier.

<img src="https://i.imgur.com/twrEKiv.png">

<br>
<br>

#### YOU DO: Write Another Function Component (5 mins):

Now it's your turn to code another component.

Code the skeleton of the `<ColorPicker>` as a function component, putting it in its own folder, etc., just like `<GameBoard>`.

Don't copy your other code - for this exercise you should type everything out.

For now, let's not worry about layout.

Don't forget to add the **component** CSS class to the outer React Element.

Add `<ColorPicker>` to `<App>` and the display should look like this:

<img src="https://i.imgur.com/Go0rQnI.png">


<br>
<br>
<br>
<br>

## Final Review Question

**❓ A UI in React is a hierarchy of ____________.**


<br>
<br>

## Lab: Define the Remaining Components for Mastermind

Build out the components for the Mastermind app based on the components identified earlier.

Be sure to render the components in a hierarchy that results in a display looking something like this:

<img src="https://i.imgur.com/gY4ANSw.png">

> Note that in the example, there are 2 `<GuessRow>` components being rendered within `<GameBoard>`.

<br>
<br>

#### Bonus - Basic Layout

As a bonus challenge, use CSS flexbox to rearrange the components into a basic layout as follows:

<img src="https://i.imgur.com/IBcCuxZ.png">


<br>
<br>

## References

[React Docs - Components & Props](https://facebook.github.io/react/docs/components-and-props.html)

[Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html)
