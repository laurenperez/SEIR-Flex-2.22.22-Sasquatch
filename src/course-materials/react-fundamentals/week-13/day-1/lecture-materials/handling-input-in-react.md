---
track: "React Fundamentals"
title: "Handling Input In React"
week: 13
day: 1
type: "lecture"
---

# Handling Input In React

| Students Will Be Able To:                    |
| -------------------------------------------- |
| Use "controlled" `<input>` elements in React |
| Use `<form>` elements properly in React      |

<br>
<br>
<br>
<br>

## Road Map

- Set Up
- Review the Starter Code
- Controlled Inputs in React
- Adding the New Skill to State

<br>
<br>

## Set Up

Let's create a new React Project on [`codesandbox.io`](https://www.codesandbox.io)

**Replace the existing `<App>` component with this starting code:**

```javascript
import { useState } from "react"
import "./styles.css"

export default function App() {
  const [state, setState] = useState({
    skills: [{ skill: "JavaScript", level: 4 }],
  })

  function addSkill() {
    alert("ADD SKILL CLICKED")
  }

  return (
    <section>
      <h2>DEV SKILLS</h2>
      <hr />
      {state.skills.map((s) => (
        <article key={s.skill}>
          <div>{s.skill}</div> <div>{s.level}</div>
        </article>
      ))}
      <hr />
      <form>
        <label>
          <span>SKILL</span>
          <input name="skill" />
        </label>
        <label>
          <span>LEVEL</span>
          <select name="level">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <button>ADD SKILL</button>
      </form>
    </section>
  )
}
```

<br>

**Let's replace the contents of `styles.css` with:**

```css
* {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  height: 100vh;
  display: grid;
  justify-items: center;
  align-items: center;
}

h2 {
  color: #f17d80;
  margin: 0;
  text-align: center;
}

section > article {
  display: flex;
  justify-content: space-between;
  min-width: 15rem;
  color: white;
  margin: 0.1rem;
  background-color: #737495;
}

article > div {
  padding: 0.5rem;
}

article > div:nth-child(2) {
  width: 2rem;
  background-color: #f17d80;
  text-align: center;
}

label {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
}

label span {
  color: #737495;
  width: 4.5rem;
}

input,
select {
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.4rem;
  color: #f17d80;
  border: 2px solid #737495;
  border-radius: 0;
  outline: none;
  -webkit-appearance: none;
}

button {
  display: block;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  margin: 0.5rem 0 0 auto;
  padding: 0.4rem;
  background-color: #f17d80;
  color: white;
  border: none;
  outline: none;
}

button:hover {
  color: white;
  background-color: #737495;
}
```

<br>
<br>
<br>

**The sandbox will look something like this once the above setup is complete:**

<img src="https://i.imgur.com/ntFDX0q.png">

<br>
<br>

## Review the Starter Code

Take a few minutes to review the starter code.

Currently the app is not functional - it doesn't add new Dev Skills to the list.

We will implement this functionality soon.

<br>
<br>
<br>

## Controlled Inputs in React

<br>
<br>

**Controlled Inputs - The "React Way" to Handle Input**

<br>

How many times have you heard us say that things are a little different in React?

Handling **inputs** is also different - by inputs, we are talking about the `<input>`, `<textarea>` & `<select>` React elements that are commonly used to get input from a user.

React prefers that we don't access DOM elements directly. So, if we don't access an input's value like we typically do in JS, e.g., `inputEl.value`, what's the secret?

The secret, like many things in React is `state`! React, wants the text/value of inputs to be held in `state`.

React "controlled" inputs have their value assigned to them via the `value` prop, which will be bound to the appropriate `state` property using a JSX expression. For example, if you had a `title` property in the `state`, you could bind that `title` property to an `<input>` as follows:

```html
<input value="{state.title}" />
```

So for our Dev Skills app, if the `<input>` & `<select>` inputs currently in `<App>` are going to get their values from `state`, we're going to need to add two new properties to `state` dedicated to maintaining the "state" of each input:

```javascript
const [state, setState] = useState({
  skills: [{ skill: "JavaScript", level: 4 }],
  skill: "",
  level: "3",
})
```

Notice that we intend to initialize the value of the `<select>` for the skills's `level` to `"3"`.

Now, we can "connect" those state properties to their respective inputs using the `value` prop:

```jsx
  ...
  {/* Connect the input to state.skill */}
  <input name="skill" value={state.skill} />
</label>
<label>
  <span>LEVEL</span>
  {/* Connect the select to state.level */}
  <select name="level" value={state.level}>
  ...
```

As predicted, the `<select>` has been initialized to `"3"`:

<img src="https://i.imgur.com/yjQL04t.png">

**Try assigning a "default" string value to the `skill` property in `state`**

<br>
<br>
<br>

#### Updating Inputs

Since the inputs are linked to state, updating the values displayed requires us to use the setter function to update their state properties.

Go ahead and try to change their values by interacting with the inputs - denied!

The React way for controlled inputs requires using event handlers to update the state.

First add an `onChange` prop to the `<input>`:

```javascript
<span>SKILL</span>
<input
  name="skill"
  value={state.skill}
  {/* Add an event handler */}
  onChange={handleChange}
/>
```

> Unlike the `change` event in vanilla JS which is triggered only after an `<input>` or `<textarea>` loses the focus, the `onChange` prop's assigned event listener will be invoked each time the user types something.

Now add the `handleChange` function that will be called every time a character is added or deleted:

```javascript
// Add the onChange event handler
function handleChange(e) {
  /* 
    the setter function 
    allows us to access previous state 
    and override it with new values 
   */
  setState((prevState) => ({
    ...prevState,
    skill: e.target.value,
  }))
}
```

Rock and roll!

Now let's do the same for the `<select>`.

However, the current `handleChange` function is dedicated to the updating the `skill` property.

Does this mean you have to create a new function for each input?

Not if you know modern JavaScript you don't!

Refactor `handleChange` as follows to take advantage of [computed property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) within object literals:

```javascript
function handleChange(e) {
  setState((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
  }))
}
```

Those square brackets on the left-hand side of the colon allow us to use an expression to "compute" the property name!

That single handler can now update state for any number of inputs - just be sure the values assigned to the `name` props match the names of the properties in the `state` object.

Okay, let's add the event handler to the `<select>`:

```javascript
<select
  name="level"
  value={state.level}
  onChange={handleChange}
>
```

Now you know how "Controlled" inputs work in React!

<br>
<br>
<br>

#### 💪 Practice Exercise

When gathering data from the user using inputs, at some point you're going to want to do something with that data, for example:

- Use AJAX to send it to a server, or
- Add it to another part of the app's state

To do so, it's nice to have all of the related data isolated in its own object to ease the use of it.

Currently however, the `skill` and `level` properties on `state` are not isolated from `skills`.

Do the following refactor:

1. Move the `skill` & `level` properties to a `newSkill` object on `state`. When finished with this step, `state` will have just two top level properties: `skills` (the array of skills entered) & `newSkill` (the object linked to the inputs for adding a new skill).

   > Hint: You will also need to update the `value` props of the inputs.

2. Update the `handleChange` function so that it replaces, the `newSkill` object when either `skill` or `level` are being changed.

When finished, be sure to test it out by changing both inputs.

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

**How'd you do? ... no worries if you weren't able to figure it out**

<br>
<br>

**Here's one possible solution:**

```javascript
function handleChange(e) {
  setState((prevState) => ({
    ...prevState,
    newSkill: {
      ...prevState.newSkill,
      [e.target.name]: e.target.value,
    },
  }))
}
```

<br>
<br>
<br>

## Adding the New Skill to State

#### No Forms Required

A key point to realize when it comes to using forms in React is that, we don't _need_ them.

Unlike the traditional web apps we've built so far using Express, SPAs don't use forms to send data to the server.

Further, we don't need to wrap the **skill** or **level** inputs in a `<form>` to be able to add them to the DEV SKILLS list.

It's just a matter of updating state by adding the `newSkill` object to the `skills` array - and we don't need a form to do that. No form or submit button is necessary - we can update state whenever we want to: when the user interacts with the app, when a timer event happens, etc.

Let's write the code for the the `newSkill` function.

We'll review as we go:

```javascript
function addSkill() {
  setState((prevState) => ({
    skills: [...prevState.skills, state.newSkill],
    newSkill: { skill: "", level: "3" },
  }))
}
```

<img src="https://i.imgur.com/C6QvZQo.png">

<br>
<br>
<br>

#### Using Forms in React

Although forms are not required for handling input in React, they can provide benefits such as using CSS frameworks to perform styling on inputs that rely on them being wrapped in a form.

Currently, the `<form>` component is being rendered in the DOM:

<img src="https://i.imgur.com/ur4nSQK.png">

Note that unlike forms we've used before, there's no `action` or `method` attributes - nor, should there ever be in a SPA's forms.

However, despite those missing attributes, and despite the fact that the **[ADD SKILL]** button within the form is not of `type="submit`, the darn form will still send off an HTTP request if we press **[return]** while inputting data or click the button - triggering a full-page refresh!

In React, we need to prevent the browser from submitting forms and we first do this by **always** using the `onSubmit` prop on `<form>` components:

```javascript
<form onSubmit={addSkill}>
```

Then, **always** calling the event object's `preventDefault` function straight away:

```javascript
function addSkill() {
  e.preventDefault();
```

Be sure to add a parameter (`e` in this case) to accept the event object.

Problem solved! The `preventDefault` function does just what it says, it prevents the default submit from happening.

<br>
<br>
<br>
<br>

## Essential Questions

Take a moment to review the following questions:

**❓ Where does a "controlled" `<input>` get its value from?**

**❓ True or False: All input-related components must be wrapped by a `<form>` component.**

**❓ A React "controlled" `<input>` requires both a `value` and an `________` prop.**

<br>
<br>
<br>

## References

- [React Docs - Forms](https://reactjs.org/docs/forms.html)

- [React Docs - Uncontrolled Components](https://reactjs.org/docs/uncontrolled-components.html)
