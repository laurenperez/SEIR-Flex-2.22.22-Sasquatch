---
track: "React Fundamentals"
title: "Intro to JSX"
week: 10
day: 3
type: "lecture"
---

# Intro to JSX


<br>
<br>
<br>



### [Click Here](https://generalassembly.zoom.us/rec/share/l4aZfuIyOkmNQ0qaDnen9mty23v4RwBmvE9wYbYrZ8BtYywsrAfQnX_p0tgKH1iH.dT-IvOGE9G6fv0Xk?startTime=1620490804000) to access recording - Includes Both JSX & Components Lessons


<br>
<br>
<br>



## Learning Objectives

| Students Will Be Able To: |
|---|
| Explain the benefits JSX provides |
| Explain what JSX transpiles into |
| Use JSX to define a component's UI |
| Include props in JSX |
| Embed JS expressions within JSX |
| Explain how a component's UI gets rendered |
| Render a "list" of components |

<br>
<br>
<br>

## Roadmap

- JSX - What and Why?
- Transpiling JSX
- Basic Syntax of JSX
- Including `props` in JSX
- JavaScript Expressions in JSX
- Component Rendering
- Essential Questions

<br>
<br>

## JSX - What and Why?


<br>
<br>

#### What?

- **JSX** is an XML-like syntax extension to JavaScript. [XML](https://en.wikipedia.org/wiki/XML) is short for _extensible markup language_ and JSX it's one of those extensions - just like HTML is.
- Created by Facebook for use in React.
- It provides a way to concisely define tree structures with attributes - perfect for defining a DOM tree!
- It is transpiled into pure JavaScript. **Why is this necessary?**

<br>
<br>

#### Why?

- Why JSX? It's simple. As compared to pure JavaScript, JSX provides a more concise and clearer (better) way to define a UI.
- JSX resembles HTML, which allows us to more easily visualize the UI its JavaScript will create.
- 99.99% (a guess) of React apps are developed today using JSX to define the UI, not vanilla JS.

<br>
<br>

## Transpiling JSX

As discussed, developing real-world React apps requires tooling. One of the reasons tooling is necessary is for the transpiling of JSX into JavaScript that can run in the browser.

The most popular transpiler for JSX is [Babel](https://babeljs.io/). Babel originally was created because developers got tired of waiting for ES2015 features to be implemented in browsers. Babel has become the go to tool for enabling the use of tomorrow's features of JavaScript today.

Babel's website has a REPL that enables typing in some JSX and see what its pure JS equivalent is. Click the **Try it out feature** tab and make sure that **react** is selected as one of the _presets_.

We type our preprocessed code on the left and the pane on the right will show the compiled version.  Let's just type in something silly at first:

```jsx
const student = <Student>Jose<br />jose@email.com</Student>;
```

You will see the above transpiled into this JS:


```javascript
const student = React.createElement(
  Student,
  null,
  "Jose",
  React.createElement("br", null),
  "jose@email.com"
);
```

> Note: In JSX, every element must be explicitly _closed_. Every "tag" must either have an opening **and** closing tag, or in the case of an [empty element](https://developer.mozilla.org/en-US/docs/Glossary/Empty_element) (a tag that has no content such as `<br>`, `<img>`, `<hr>`, etc.), unlike in HTML, we must include a forward slash before the closing angle bracket like we did with `<br/>` above.

<br>

Okay, we have the following observations regarding the JS for a component:

- There's a call to the `React.createElement` method that creates an element used internally by React.
- The first argument is a reference to the component's type (function or class). In the case of a React Element, it will be a string.
- The second argument seems to be `null` so far - more on this next.
- Any arguments after the second define the children of the component. In the case of the `<br />`, as an "empty" React Element, it cannot contain any children and therefore only be passed two arguments.

Now let's discuss that `null` second argument. It is for passing **props** to a component. You will learn about props in a later lesson, however, you can think of them as key/value pairs, much like the attributes we put within HTML elements.

Let's add a prop and see what happens:

```jsx
const student = <Student cohortId='SEI-99'>Jose<br/>jose@email.com</Student>;
```

Now the transpiled JS looks like this:

```javascript
const student = React.createElement(
  Student,
  { "cohortId": "SEI-99" },
  "Jose",
  React.createElement("br", null),
  "jose@email.com"
);
```

In summary, in React, JSX is just syntactic sugar for:

```javascript
React.createElement(component, props, ...children);
```

So, I ask you - **Which is a more clear and concise way of defining a component's UI - JSX or JavaScript?**

<br>
<br>

## Basic Syntax of JSX

<br>
<br>

#### Setting Up a React Playground

Let's create a new React Sandbox using [CodeSandbox](https://codesandbox.io/) to experiment further with JSX.


1. In a future lesson we'll learn a lot about styling in React - and you'll see that like most things React - it's different.  CodeSandbox has already created a CSS stylesheet within the **src** folder. Thanks to tooling, it is able to be "imported" within the **App.js** like this:


```javascript
import React from "react";
import "./styles.css"; // <- Already imported for us!

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
```

<br>


Now, let's replace the existing CSS inside of **styles.css** with the following:

```css
html, body {
 height: 100%;
 font: 1rem sans-serif;
 display: flex;
 justify-content: center;
 align-items: center;
}
```

<br>
<br>

3. Let's cleanup the `<App>` component in **index.js** as follows:


```jsx
export default function App() {
  return (
    <div>
      
    </div>
  );
}
```

<br>
<br>

4. Okay, let's create our own custom `<Greeter>` component by creating a **src/Greeter.js** (note that the naming convention is UpperCamelCase) and defining the component as a Function Component and exporting like this:

	```jsx
	import React from 'react';
		
	function Greeter(props) {
	  return (
	    <div>
	      <h1>Greetings Earthling {props.earthling}</h1>
	    </div>
	  );
	}
	
	export default Greeter;
	```

Note how a **Function Component** (a component defined as a `function`) accepts "props" as an argument and must `return` its UI (defined using JSX).

<br>
<br>


5. Now let's modify `<App>` to render the new `<Greeter>` component instead of the built-in `<h1>` React element:

	```jsx
	export default function App() {
	  return (
	    <div>
	      <Greeter />
	    </div>
	  );
	}
	```
	We'll get an error because there's no `Greeter` defined - let's import it...

<br>
<br>

6. Add the following import below our import of `React` inside of `App.js`:

```jsx
import React from "react";
import Greeter from "./Greeter";

import "./styles.css";
```

<br>
You should now be seeing the text "Greetings Earthling" in the output:

<img src="https://i.imgur.com/grr3D7S.png">

<br>
<br>

#### More Syntax Rules

Besides these rules:

- JSX uses XML syntax (elements within angle brackets) for defining components.
- All "empty" components (components with just a start tag - no closing tag) must be self-closed using a forward slash.
- **props** are camelCased like `cohortId='SEI-99'`, never kebob-cased.

<br>
<br>

There are a few other syntax rules, etc.:

- There are built-in React components, called React Elements, that correspond to each HTML element we're familiar with. These components are **always lowercased** - like the `<h1>` component used in the `<Greeter />` component.
	
- Our app's user-defined components are **always uppercased** - like the `<Greeter />` component.
- When rendering, a component must return a **single node or array of nodes**. However, usually we _compose_ components from multiple components. To return multiple components from the `render` method they can be wrapped by a single component (like a `<div>`). For example, let's update the `Greeter` component like this:

	```jsx
	function Greeter(props) {
	  return (
	    <div>
	      <h1>Greetings Earthling {props.earthling}</h1>
	      <h2>We have come in peace</h2>
	    </div>
	  );
	}
	```
	Removing the `<div>` would create a syntax error.

<br>
<br>

Ever since the release of React version 16.2, new support was added for what is known as "fragments" in JSX, which is detailed in [this blog post](https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html?utm_campaign=React%2BNewsletter&utm_medium=email&utm_source=React_Newsletter_95).

Essentially, they allow for multiple components to be "wrapped" with an empty tag, called a **Fragment**.  For example:

```jsx
function MyComponent(props) {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```

Previous to this enhancement, you would have had to wrap the sibling components in a React element (usually a `<div>`).

A brand new enhancement is a shortcut for `React.Fragment`:

```jsx
function MyComponent(props) {
  return (
    <>
      <ChildA />
      <ChildB />
      <ChildC />
    </>
  );
}
```

**The advantage of using a fragment is that it avoids rendering extra elements into the DOM.**
	
<br>
<br>

#### Curiosity

We now know that JSX is transpiled into a method call to `React.createElement(...)`, however, we haven't seen what that method call returns.

Let's add this after the imports in **App.js**

```jsx
const g = <Greeter />;
console.log(g);
```

An object, of course!

React internally uses a JS object to represent each component.

<br>
<br>

## Including `props` in JSX

We will soon have a lesson dedicated to learning about `props` and `state` in React, but let's cover a few basics regarding `props`.

The syntax of passing props to a component is much like defining attributes in an HTML element.

Many pre-defined props map to HTML attributes. [These docs](https://facebook.github.io/react/docs/dom-elements.html) list the supported HTML attributes and discuss important differences. For example, we cannot use `class` to assign CSS classes to a built-in HTML component, instead we must use `className` because `class` is a reserved word in JavaScript.

Many props map directly to their HTML attribute counterparts. For example, this is how you could add an `id` to a `<div>`:

```html
<div id='todos-container'>
```

Of course, it would make sense to add attributes such as `id` to React Elements only, because they are the only components that end up generating actual DOM elements in the page.

Some props map to HTML attributes but have a slightly differently implementation, for example, the `style` prop is used to style a component inline, however, it must be passed an object consisting of CSS property/values, not a string like its HTML counterpart.

However, most of the props we use will be custom props that are unique to the application.

Let's pass a prop named `earthling`to the `<Greeter />` component:

```jsx
export default function App() {
  return (
    <div>
      <Greeter earthling='Wilma'/>
    </div>
  );
}
```

Note that we can assign a string value to a prop as shown above using single or double quotes.  Any other data type, including template literals, must be wrapped within curly braces.  For example, the following shows how an object literal could be passed:


```jsx

export default function App() {
  const character = {name: 'Wilma', town: 'Roswell'};
  return (
    <div>
      <Greeter earthling={character} />
    </div>
  );
}
```

...then, inside of of `<Greeter />` we could access one of the properties from the object we passed as a prop.

```jsx

function Greeter(props) {
  return (
    <div>
      <h1>Greetings Earthling {props.earthling.name}</h1>
      <h2>We have come in peace</h2>
    </div>
  );
}

```

<br>
<br>

## JavaScript Expressions in JSX

You can embed and render the result of any JavaScript **expression** in JSX by wrapping it in curly braces.

Now let's use the `earthling` prop that was passed:

```javascript
<div>
  <h1>Greetings Earthling {props.earthling}</h1>
</div>
```

`props.earthling` is a JavaScript expression and, as you can see, its result is being rendered in place.

<br>
Now let's add a more interesting expression:

```jsx
<div>
  <h1>Greetings Earthling, {props.earthling}</h1>
  <h2>
    We have come {new Date().getDay() === 1 ? 'on a Monday' : 'in peace'}
  </h2>
</div>
```

It's just a JavaScript expression, so we can use our favorite JS operator!!!

<br>
<br>

#### Expressions vs. Statements in JS

We can only embed **expressions** in JSX, not JS statements.

Let's review what JS expressions are...

JavaScript expressions evaluate to a single value/thing and can be used wherever a value can be used:
	
- Assigned to a variable
- Provided as an argument to a function call
- Returned from a function
- console.log'd out, etc.

Statements on the other hand, perform actions. A program consists primarily of statements.

We were able to use the `ternary` operator between the `{}` in the JSX above because it's an expression (it evaluates to a single value), however we would not be able to use an `if` statement.

> Caveat: JavaScript allows us to write an expression when it expects a statement, however, the opposite is not true - you cannot provide a statement when JS expects an expression.

<br>
<br>

#### JSX itself is an Expression Too

JSX transpiles into a function call: `React.createElement(...)`, which returns an object useful to the React library.

Because JSX results in a JS object, JSX is a JavaScript expression!

Considering that JSX is a JS expression, leads us to the fact that JSX can be:

- Assigned to a variable
- Provided as an argument to a function call
- Returned from a function
- console.log'd out, etc.

For example, here's a component that returns different JSX depending upon the value of `props.user`:

```javascript
const Greeting = (props) => {
  if (props.user) return <h1>Hello, {formatName(props.user)}!</h1>;
  return <h1>Hello, Stranger.</h1>;
} 
```

Note that within the function we can write JS code just like in any other function. In the above example we are using `if` and `return` statements.

We just have to be careful not to try to write _JS statements_ within the JSX. 

<br>
<br>

## Component Rendering

<br>
<br>

#### When & How Components Get Rendered

In this Unit, we'll learn more about components and how they can be defined as either a `class` or a `function`; the latter is becoming more popular nowadays and soon enough you'll see why.

A **Function Component** must `return` its JSX.

**Class Components** must include a `render` method which is invoked by React to render the component. It's the `render` method in a class-component that returns that component's JSX.

Regardless of how components are defined (as a `class` or `function`), they are rendered as follows:

1. Initially with `ReactDOM.render`.
2. Whenever a component's state is changed:
	- Due to a class component's `setState` method being called
	- Due to a function component's use of the `useState` hook (new to React 16.8)

Now, here's another key to be aware of:  when a component is rendered, **all** of its children components are rendered as well (as well as the children of those children, etc.).

It's this cascade of rendering that results in an entire app being rendered with that single `ReactDOM.render` call!
<br>
<br>

#### Rendering Lists (Arrays) of Components

Quite often we need to render "lists" of components, for example, a list of To Dos.

How about an array of things the aliens want from Earth:

```javascript
function Greeter(props) {
  const things = ["Water", "Cattle", "Plutonium", "Gold"];
  // Create an array of <li> components
  const listOfThings = things.map(thing => <li>{thing}</li>);
  return (
    <div>
      <h1>Greetings Earthling, {props.earthling}</h1>
      <h2>
        We have come {new Date().getDay() === 1 ? "on a Monday" : "in peace"}
      </h2>
      <h3>Give us your:</h3>
      {/* Render the array of <li>s */}
      <ul>{listOfThings}</ul>
    </div>
  );
}
```

The `things` array would more commonly be held in the component's **state** or **props** object, which we'll be covering in a future lesson.

Pretty cool. React automatically renders arrays of components in JSX expressions (`{listOfThings}`).

Because `things.map(...)` is an expression (it returns a new array), it's possible to put it inline within the JSX like this:

```jsx
function Greeter(props) {
  const things = ["Water", "Cattle", "Plutonium", "Gold"];
  return (
    <div>
      <h1>Greetings Earthling, {props.earthling}</h1>
      <h2>
        We have come {new Date().getDay() === 1 ? "on a Monday" : "in peace"}
      </h2>
      <h3>Give us your:</h3>
      {/* Render the array of <li>s */}
      <ul>
        {things.map(thing => <li key={thing}>{thing}</li>)}
      </ul>
    </div>
  );
}
```

Note that a `key` prop has been added. Whenever React has a list of components, it wants a `key` prop so that it can more efficiently track changes that need to be made to the DOM. The value assigned to the key can be any primitive value, but they need to be unique within the array. It's also better to use a value from the data itself instead of an index.

<br>
<br>

## Essential Questions

**❓ In your own words, what is JSX and why do we use it?**

**❓ How many component nodes can be returned from a function component or the `render` method in the case of a class component?**

**❓ We use _______ to pass information as key/value pairs to a component.**

**❓ To embed JS expressions within JSX, we wrap the expressions with ________?**

<br>
<br>
<br>

## References

[React Docs - JSX](https://facebook.github.io/react/docs/introducing-jsx.html)

[Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)