---
track: "React Fundamentals"
title: "Introduction to React"
week: 11
day: 3
type: "lecture"
---

# Introduction to React

<br>
<br>

## Learning Objectives

- Describe why React is so popular and in high demand
- Describe the history of React
- Describe what is React in terms of code organization
- Explain what is JSX
- Explain what is state
- Build a simple React app

<br>
<br>
<br>
<br>

### What is React

[Reference](https://generalassemb.ly/coding/full-stack-web-development/beginners-guide-react)

We've already been building web sites based on data. We've been using server-side rendering with a template engine (ie `EJS`). While there are many upsides to server-side rendering, there are some down sides.

- it can be cumbersome to maintain, when you want to change one thing, you have to change things across many files
- your data is tightly coupled with your view of the data (embedding our data inside of HTML using `EJS`)
- every view requires a page reload, which can get slow for the user and can be demanding on the server (imagine thousands or millions of users)

React is just the view layer. We can go over to the [react docs](https://reactjs.org/) - Which are some of the best docs out there.

Let's look at a few screenshots from their docs

![declarative views](https://i.imgur.com/sDfJeh1.png)

<hr>

![Component Based](https://i.imgur.com/ElASYZ2.png)

<hr>

![Write once, use anywhere](https://i.imgur.com/Ov0pSW1.png)

<hr>

<br>
<br>
<br>

### History of React

React was created at Facebook. It was used at first for just one specific project. Then it was expanded to more projects, then it began being used at Instagram and then it was made open-source.

This organic growth of React demonstrated that React was a solution that appealed to many developers. React's meteoric rise and continued demand continued appeal makes it worthwhile to learn.

<br>
<br>
<br>

### What is React in terms of code?

React is written in JavaScript. However, it has always relied on the bleeding edge of JavaScript and uses JSX (an HTML-JavaScript hybrid). Therefore, in order for browsers to understand it, it has to be compiled into older JavaScript.

Luckily there is a great technology called [Babel](https://babeljs.io/), that will handle this for us. This lets us write modern React/JavaScript without having to worry whether an older browser is up to date with its JavaScript.

Let's start with a `Hello World` example.

In the world of React there is a plethora of templates and project generators. Facebook has their own tool for creating a React Project with bundling, transpilation, linting and testing all built in, and it is called **create-react-app**.

- Create a folder called `react` we will be generating all our react projects in this folder.

- open your terminal to react folder and create a new react project with the command `npx create-react-app hello-world`

- This should take several minutes to generate a project, once done cd into the new folder `cd hello-world` and run the development server with the command `npm start` this should open a browser showing the React Logo confirming we're all set.

<br>
<br>
<br>

## How React Works

If you look in the file file structure you'll see a folder called `public` and this where our index.html file lives.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>
```

<br>
<br>
<br>

Notice there isn't much going on in this file except a div with the id of "root" and that's all this file really needs, all the magic really happens in the folder called "src". Let's like in the "src" folder at the file `index.js`

```jsx
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
```

<br>
<br>

If we look at this file we see the two core React libraries being imported.

- `react`: This is the core react library that will allow us to create and work with React components and Reacts syntax.

- `react-dom`: This is the library that translates react code and structures into something readable by the DOM. We mainly use this to mount our entry component which is almost always called "App" (cause it represents your application).

```jsx
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
```

<br>
<br>

This piece right here is what kick starts everything in react. ReactDOM.render takes the component or JSX expression in the first argument (these to be discussed more later), and mounts them to the dom element specified in the second argument, in this case an element with the id of "root". So whatever is going in our App component will replace that div in the HTML file. Let's check what that is.

<br>
<br>

Open up `src/App.js`:

```jsx
import logo from "./logo.svg"
import "./App.css"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
```

<br>
<br>

Here is the App component and here is where we find all that code that creates the spinning logo you saw when you initially ran `npm start`. Now this file is really just defining a big function and exporting it.

A React component is a function that does one thing, returns what looks like a block of HTML, this is called JSX. This JSX/HTML being returned by the function is what appears when the App component is used. Since we rendered the App component to that div in the `index.js` file we see this JSX/HTML when we loaded up this starter app.

<br>
<br>
<br>

## Hello World

So let's customize our App component by removing the current JSX and replacing it with...

```jsx
import logo from "./logo.svg"
import "./App.css"

function App() {
  return <h1>Hello World</h1>
}

export default App
```

<br>
<br>

See, now in the browser it should update and you should see the Hello World heading.

**NOTE** React components can be written in any type of function syntax including arrow functions, all that matters is that it returns JSX.

<br>
<br>
<br>

## React Dev Tools

- [Please Take a Moment and add the React Developer Tools Chrome Extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

After installing, refresh the page and you should see a new section called "components", and in this new tab we can see a list of all our React components in a tree in the same way we can see all the HTML nodes in a tree under the elements tab. React dev tools will be your compass in the world of React so do make sure to check here often when you are debugging React code.

<br>
<br>
<br>

## Rules of JSX

- Only one Parent Element
- All tags must close
- use className instead of class
- all HTML attributes are now camelCase

[LEARN MORE ABOUT JSX HERE](https://reactjs.org/docs/introducing-jsx.html)

<br>
<br>
<br>

## React Tic-Tac-Toe

We will be focusing on writing React Functional Components, this is the more modern and current standard way of writing React code.

There is an older still used Class based syntax. We recommend to first focus on getting comfortable and master React development with the Functional Syntax then revisit the class syntax at that point when necessary (if working on older code bases).

<br>
<br>
<br>

**in app.js**

Let's render an `h1` inside our App component in `App.js`:

```jsx
import logo from "./logo.svg"
import "./App.css"

function App() {
  return <h1> React Tac Toe </h1>
}

export default App
```

<br>
<br>

**NOTE FOR INSTRUCTORS** With React 17 and later importing React is no longer required for components that aren't using any hooks.

When we refresh our view "Hello World" should be replaced with "React Tac Toe".

<br>
<br>
<br>

##### If we've installed React Dev tools, we can go over to the React tab and see our component

![react dev tools](https://i.imgur.com/CxcflPZ.png)

<br>
<br>
<br>

## Making a Component inside another component

According to our mockup, our App will have 4 components

- header
- two player components
- board

With react, we can only render **ONE** component. That component can have numerous components inside of it.

Let's make our header component by doing the following:

- create a "components" folder in "src" to house all our non-App components
- create a file `src/components/Header.js`

**NOTE** You can write multiple components in one file, but it is convention that each component get its own file in the components folder.

```jsx
function Header() {
  return <h1> React Tac Toe </h1>
}

export default Header
```

<br>
<br>

To use this component we need to:

- import it into app
- use it in the JSX of the app component, using components looks a lot like using HTML!

```jsx
import Header from "./components/Header"
import "./App.css"

function App() {
  return <Header />
}

export default App
```

<br>
<br>

We still haven't changed how things should look so let's use the dev tools to check everything is in order:

![react dev tools](https://i.imgur.com/ZZ2cteT.png)

Let's make a player scoreboard

- create a new file in "components" called `Player.js`

```jsx
function Player() {
  return (
    <div>
      <h2>Player </h2>
      <h3>Wins: </h3>
    </div>
  )
}

export default Player
```

<br>
<br>

And have that component render in our app:

```js
import Header from "./components/Header"
import Player from "./components/Player"
import "./App.css"

function App() {
  return (
    <div>
      <Header />
      <Player />
    </div>
  )
}

export default App
```

<br>
<br>

Since a main feature of React is reusable components we can just copy our Player again:

```jsx
import Header from "./components/Header"
import Player from "./components/Player"
import "./App.css"

function App() {
  return (
    <div>
      <Header />
      <Player />
      <Player />
    </div>
  )
}

export default App
```

![two players](https://i.imgur.com/eUkvjtR.png)

<br>
<br>
<br>

### A Sneak Peak of a Lesson in the Near Future

We know we have a player X and a player O, and we want to be able to customize our components. We can pass custom properties to our Player components, using `props` (short for properties). `props` is a special term in React. Let's see it in action.

Let's make a custom `prop` called `whichPlayer` and pass the appropriate player name

```jsx
import Header from "./components/Header"
import Player from "./components/Player"
import "./App.css"

function App() {
  return (
    <div>
      <Header />
      <Player whichPlayer="x" />
      <Player whichPlayer="o" />
    </div>
  )
}

export default App
```

<br>
<br>

Now, we need to access these properties inside our Player component. Our player component is a child of App, and thus has access to props. Don't worry if this doesn't make sense yet. We'll be returning to this concept over and over again and it'll start to come together.

```jsx
// Props are passed as object argument to our component, so we must define a parameter to receive it
// conventionally the parameter is called props
function Player(props) {
  return (
    <div>
      <h2>Player {props.whichPlayer} </h2>
      <h3>Wins: </h3>
    </div>
  )
}

export default Player
```

<br>
<br>

Now we can see our custom property `whichPlayer` rendering with its value, depending on which component it is:

![Props](https://i.imgur.com/Zieebv4.png)

Let's make one more component for our App, the board:

- Make a `Board.js` in components

```jsx
function Board(props) {
  return <div>the board!</div>
}

export default Board
```

<br>
<br>

Don't forget to add the `Board` component in our `App`:

```jsx
import Header from "./components/Header"
import Player from "./components/Player"
import Board from "./components/Board"
import "./App.css"

function App() {
  return (
    <div>
      <Header />
      <Player whichPlayer="x" />
      <Player whichPlayer="o" />
      <Board />
    </div>
  )
}

export default App
```

<br>
<br>
<br>

### You Do:

On your own, and then we'll review ~ 10 minutes

- make one more component called `Square`, made up of a div, inside the div put an `h4` element, inside the `h4` put some text like the word `square`
- gotcha! divs have a height and width of 0 when they are empty. Be sure to put in an `h4` and some text
- render 9 squares inside the Board
- **Extra** - Read ahead to learn how to incorporate CSS

<br>
<br>
<br>

### CSS & React

Right now we have all the right elements, but we need some style to make it look like a proper tic tac toe game, let's try to make it look like this:

![expected final appearance](https://i.imgur.com/gbvCuEY.png)

We can create as many CSS files as we want in the src folder, and as long as we import the css file in at least one component, then the styles will be applied to our whole project (some people like to make a css file for each component for organization, but let's not). For now let's just focus on using one stylesheet.

- create src/styles.css
- import styles.css into `App.js`

```jsx
import Header from "./components/Header"
import Player from "./components/Player"
import Board from "./components/Board"
import "./styles.css"

function App() {
  return (
    <div>
      <Header />
      <Player whichPlayer="x" />
      <Player whichPlayer="o" />
      <Board />
    </div>
  )
}

export default App
```

<br>
<br>

Let's add a little starting style to make sure everything is linked correctly:

```css
:root {
  --dark-cerulean: #124e78;
  --maastricht-blue: #0b132b;
  --yankees-blue: #1c2541;
  --sea-serpent: #5bc0be;
  --aquamarine: #6fffe9;
  --react: #00d8ff;
}

html {
  background: var(--yankees-blue);
}
body {
  margin: 0;
  font-family: "Montserrat", sans-serif;
  color: white;
}
```

<br>
<br>

Let's add some classes to target parts of our components.

**app.js**

**Player:**

```jsx
function Player(props) {
  return (
    <div className={props.whichPlayer}>
      <h2>Player {props.whichPlayer} </h2>
      <h3>Wins: </h3>
    </div>
  )
}

export default Player
```

<br>
<br>

**Board:**

```jsx
import Square from "./Square"

function Board(props) {
  return (
    <div className="board">
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
    </div>
  )
}

export default Board
```

<br>
<br>

**Square:**

```js
function Square(props) {
  return (
    <div>
      <h4>square</h4>
    </div>
  )
}

export default Square
```

We can use a combination of flexbox and css grid to complete the look:

```css
.container > div {
  display: flex;
  background: var(--yankees-blue);
  flex-wrap: wrap;
  justify-content: space-around;
  min-height: 60vh;
  align-items: flex-start;
}

.board {
  flex-basis: 60%;
  display: grid;
  grid-template-columns: 15vw 15vw 15vw;
  grid-template-rows: 15vw 15vw 15vw;
  color: white;
  justify-items: stretch;
  justify-content: center;
}

.board div {
  display: flex;
  align-items: center;
  border: 3px solid var(--react);
}

h4 {
  text-align: center;
  flex-basis: 100%;
  align-self: center;
}

.X,
.O {
  flex-basis: 45%;
  text-align: center;
}

.X {
  color: var(--sea-serpent);
}

.O {
  color: var(--aquamarine);
}
h1 {
  flex-basis: 60%;
  color: var(--react);
  text-align: center;
}
```

<br>
<br>
<br>

## Extra

There are newer ways to incorporate CSS into react. You can read about [4 Ways to style react components](https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822) and try to swap out our style sheet for one ore more of these methods.
