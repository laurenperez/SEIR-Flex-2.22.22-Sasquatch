---
track: "React Fundamentals"
title: "Intro to Props"
week: 11
day: 3
type: "lecture"
---

# Intro to Props

<br>
<br>
<br>

## Learning Objectives

- Create and pass props to Components
- Loop over an array of data and pass multiple props
- Work with additional JSX rules.

<br>
<br>
<br>

## Framing

Having worked with functions we know that they are meant to be reusable.

Part of the reusability is in accepting arguments, performing an action and returning a value.

_"`Standard Input` produces `Standard Output`"_.

Now consider that our application contains many Components, some of which may require data points in order to render the UI.

The data we pass from a `parent > child Component` are called: `props`.

Make note that it is the parent that passes props to a child.

React data flow is `unidirectional` and can only be passed down, and never directly from `child` to `parent` or `sibling` to `sibling`.

<br>
<br>
<br>

### Props

Every Component has `props` and that is how data is passed from a parent to a child Component.

<br>
<br>

#### <g-emoji class="g-emoji" alias="alarm_clock" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/23f0.png">⏰</g-emoji> Activity - 3min

Let's all fork this code sandbox as our starter code [Bootstrap Cards](https://codesandbox.io/s/bootstrap-cards-starter-s0dtn) in `React Developer Tools` see if anything `props` related pops out.

If we highlight the `Card1` Component we will see something called `props` to the right.

<img src="https://i.imgur.com/qzpnB0y.png" /><br>

Since we haven't yet passed any data to these Components there is nothing to show.

<br>
<br>

**End Goal**

Once we have implemented all the steps in today's lecture on `props` React Dev Tools will look more like:

<img src="https://i.imgur.com/eZPBlyy.png" />

<br>

Here is a [live](https://kv1bq.csb.app/) version of today's solution.

<br>
<br>
<br>

### Prop Rules

Let's extend the rules for creating Components and working with JSX to now include `props`.

<br>

🚔 Props adhere to the following rules:

1. Data is unidirectional passed down from a `parent` > `child`
1. All Props passed to a child are organized into a single object in the child Component
1. Props are `immutable` and cannot be reassigned a new value within the receiving child Component

This rule doesn't regard props but it is something we'll need to keep in mind going forward: 4. Any Components created using `Array.map()` must be assigned a key prop with a unique value

<br>
<br>
<br>

### Passing Props

Say for instance we wanted to render the name that the image represents in our cards example; we could go directly to `CardBody` and do the following:

```jsx
<h5 className="card-title">Santorini</h5>
```

This is a fairly manual process and wouldn't be efficient if we had 100 or 1000 cards to render.

So let's add a `prop` to CardBody and pass it the value of `Santorini`.

A `prop` is written in a `name=value` format like the other html attributes your used to writing such as:

```html
<!-- The src property of a image tag -->
<img src="someurl" />
<!-- The class property assigned to any element -->
<div className="container"></div>
<!-- The href property assigned to an anchor tag -->
<a href="someurl"></a>
```

Since the `Card1` component is the parent that renders `CardBody` than it must pass the prop to it's child.

🚔 Data is unidirectional in React and is passed down from a `parent` > `child` Component

Let's assign CardBody the following `prop`.

```jsx
<CardBody title="Santorini" />
```

Nothing should really change as we have already updated CardBody with that title name. So, we need to update the CardBody Component to accept props.

<br>
<br>
<br>

#### Accepting Props

The first thing we need to do is add the keyword `props` as a parameter. So inside CardBody.js make the following change.

Let's make sure that our Component is being passed the `title` prop by adding a `console.log`.

```jsx
const CardBody = (props) => {
  console.log("this is props:", props)
  // ...rest of the code
}
```

<br>
<br>
<br>

In DevTools you should see the following in the console:

<img src="https://i.imgur.com/HlrtO2T.png" width=300/>

We can see here that `props` is an object and that `title` is a key.

This will be the same pattern for when we start passing in multiple props.

Each prop passed will be assigned a **`key: value`** pair.

<br>
<br>
<br>

#### ⏰ Activity - 3min

Let's take a moment to edit our code and try to reassign props.

Open the `CardBody` Component and add the following:

```js
console.log("current props.title", props.title)
// ATTEMPT TO REASSIGN PROPS A NEW VALUE
props.title = "Mykonos"
console.log("props.title", props.title)
```

<br>
<br>

Refresh the page and you should see the following:

<img src="https://i.imgur.com/Nmio71o.png" width=300/>

So it looks like props was not updated to reflect the edit.

Here is an example of one of the rules of props:

🚔 Props are immutable which means you can't reassign them within the receiving Component

So any attempt to change those props directly within the Component will have no effect.

<br>
<br>
<br>

#### Using Props

Now that we have confirmed we are being passed the value we need for title let's use it to replace the hard coded value.

Let's try and use the prop that was passed:

```jsx
<h5 className="card-title">props.title</h5>
```

<br>
<br>

the result should be...

<img src="https://i.imgur.com/XhKpkoR.png" width=300/>

<br>
<br>

That didn't seem to work out as planned.

It seems it outputs `props.title` and not the value:

```jsx
<h5 className="card-title">props.title</h5>
```

<br>
<br>

It seems we forgot about one of the rules of JSX:

🚔 Any JavaScript code that needs to be executed in JSX must be enclosed in opening/closing curls braces `{}` (Remember, think of `{}` in React like the `<%= %>` in ejs)

```jsx
<h5 className="card-title">{props.title}</h5>
```

<br>
<br>
<br>

#### <g-emoji class="g-emoji" alias="alarm_clock" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/23f0.png">⏰</g-emoji> Activity - 1min

Confirm in React Dev Tools that CardBody is now being passed a prop.

<br>
<br>
<br>

### Passing Mulitple Props

We could do the same for all the additional values we wish to pass but as you can imagine if we had 10, 20, 100+ cards this manual method becomes completely inefficient.

Also it is more likely that the data we will be using to render the cards will be imported either via a file or returned from an API call.

Either way we should expect that if we will need to create multiple cards that the data will be stored as an array of objects: `[{}, {}]`

<br>
<br>
<br>

#### <g-emoji class="g-emoji" alias="alarm_clock" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/23f0.png">⏰</g-emoji> Activity - 3min

Let's use some real data and replace the generic placeholder text.

1. Create a new file in `src` called `data.js`
1. Paste the following code into the file:

```js
export default [
  {
    img: "https://images.unsplash.com/photo-1536514072410-5019a3c69182?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    title: "Santorini",
    text: "This was one of the most amazing places I've ever seen. A must see for everyone.",
    url: "https://unsplash.com/s/photos/santorini",
  },
  {
    img: "https://images.unsplash.com/photo-1498712964741-5d33ab9e5017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=600",
    title: "Zakynthos",
    text: "This was like being a pirate and we were looking to bury our treasure. It was so isolated and beautiful.",
    url: "https://unsplash.com/s/photos/santorini",
  },
]
```

<br>
<br>

Import the data into `App.js` as `cardsArr` and add a console.log to confirm it was imported.

```js
// IMPORT DATA
import cardsArr from "./data"
console.log("this is cardsArr:", cardsArr)
```

<br>
<br>
<br>

#### Creating Multiple Cards

With the data in hand we can now loop over the array and render as many `Card Components` as we need and pass them the props needed for each card.

Inside of the `App` Component we will loop over the `cardsArr` array and create multiple Cards in one shot.

Each prop is defined on it's own and passed it's corresponding value.

Let's also console the `cards` so see what React magic has been performed.

```jsx
const cards = cardsArr.map((ele, index) => {
  return <Card1 img={ele.img} title={ele.title} text={ele.text} url={ele.url} />
})

console.log("this is cards:", cards)
```

Now take a look in DevTools and you should see the following:

<img src="https://i.imgur.com/gx42Kme.png" />

Each object appears to contain much more info then we passed and each one has a `typeof` set to `Symbol(react.element)`. `Symbols` were a new data type introduced in ES6 and are meant to be unique, meaning there will not be `Symbol` in this array with the same exact info.

However, something will be needed to distinguish it as unique; React does so by assigning a key called `key`.

It is currently set to `null` and React will warn in just a bit when we render the Cards based on the following rule:

🚔 Any Components created within a `.map()` must be assigned a unique key.

Before we render the Cards we first need to update `Card1` to pass the data down the props it's received to it's corresponding children.

```jsx
const Card1 = (props) => {
  console.log("this is props:", props)
  return (
    <div className="card" style={{ width: "18rem" }}>
      <CardImage img={props.img} />
      <CardBody title={props.title} text={props.text} url={props.url} />
    </div>
  )
}
```

<br>
<br>

**CardBody**

Let's update `CardBody` to make use of the props.

```jsx
const CardBody = (props) => {
  return (
    <div className="card-body">
      <h5 className="card-title">{props.title}</h5>
      <p className="card-text">{props.text}</p>
      <Button url={props.url} />
    </div>
  )
}
```

<br>
<br>
<br>

#### <g-emoji class="g-emoji" alias="alarm_clock" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/23f0.png">⏰</g-emoji> Activity - 10min

Now it's your turn.

Take a moment to update the following Components to accept and use props:

- CardImage
- Button

Keep in the mind the following:

- Both Components need to include a parameter which we will always call `props`.
- Any JS rendered in JSX must be wrapped in `{}`

<br>
<br>
<br>

#### Reusable Components

Now it's time to see all that code refactoring done to `Card1` in action.

In App comment out `<Card1 />` and `<Card2 />`.

We will now replace those values with the data returned via the `.map()` and stored in `cards`.

```jsx
<section className="cards">
  {cards}
  {/* <Card1 title="Santorini" />
    <Card2 /> */}
</section>
```

<br>
<br>
<br>

#### The Key Prop

As you may recall it was mentioned earlier that the elements would render fine however React would present an error.

The following error to be exact:

<img src="https://i.imgur.com/Ofg12N1.png" >

This can easily be fixed by assigning a `key` prop to each element with a unique value.

Since each element in an array is assigned a unique index value we will opt to use that.

```jsx
const cards = cardsArr.map((ele, index) => {
  return (
    <Card1
      img={ele.img}
      title={ele.title}
      text={ele.text}
      url={ele.url}
      key={index}
    />
  )
})
```

Since the goal of a Component is to be reusable we could now use Card1 as our base template for rendering as many cards as we need.

It makes more sense to rename `Card1.js` to `Card.js` and update both the import statement and the Component name in the map.

Below includes those 2 updates.

<img src="https://i.imgur.com/SLtYu9d.png">
<br>
<br>

And there you have it.

Multiple Components rendered via a loop with each being the props they need to render appropriately.

<br>
<br>
<br>

### Final React Architecture

As we have made some design changes let's take a look at our final React Architecture design that takes into account all Components and the props being passed.

<img src="https://i.imgur.com/WlfxS7X.png" width=600/>

The above was created using [Google Draw](https://docs.google.com/drawings/d/1pG32gpXhkLqtBR2g_SrXWVeX6sza3TAq3zpP0Sjq3QM/edit?usp=sharing)

The architecture represents all the Components and the props that are being passed to each one.

This makes it much easier to understand the flow of data in our app.

<br>
<br>
<br>

### Bonus - The ...spread Operator and Object Destructuring

Since passing props is a requirement in React there are a few shortcuts we can make when passing them.

<br>
<br>
<br>

#### Using The ...spread Operator

The first is that we can use the `...spread` operator to pass many **`key: value's`** down instead of writing them out one at a time.

In `Card.js` let's replace all those hard coded props, except `key`, with the `...spread` operator.

```js
const cards = cardsArr.map((ele, index) => {
  return <Card1 {...ele} key={index} />
})
```

<br>
<br>
<br>

#### Using Object Destructuring

The other shorthand we can use is to update the Child components to create variables based on the **`key: value`** pairs that are in the `props` object.

**CardBody**

Let's update `CardBody` to make use of Object Destructuring.

Here we use an object as parameter that includes all the prop key names that are being passed down.

**NOTE:** When destructuring objects as function parameters, we call this _"Parameter Destructuring"_.

```js
const CardBody = ({ title, text, url }) => {
  return (
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{text}</p>
      <Button url={url} />
    </div>
  )
}
```

<br>
<br>
<br>

#### <g-emoji class="g-emoji" alias="alarm_clock" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/23f0.png">⏰</g-emoji> Activity - 2min

Take a moment to update the `CardImage` and `Button` Component to make use of Object Destructuring.

<br>
<br>
<br>

### Final Solution

Here is the [Final Solution](https://codesandbox.io/s/seir-831-bootstrap-props-starter-zeuwb?file=/src/App.js:72-76)
