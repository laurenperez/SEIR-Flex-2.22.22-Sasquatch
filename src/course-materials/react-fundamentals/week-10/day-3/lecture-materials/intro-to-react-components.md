---
track: "React Fundamentals"
title: "Components in React"
week: 10
day: 3
type: "lecture"
---


# Components in React

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
| Explain UI Design using components |
| Define "built-in" React Components |
| Define "user-defined" Custom Components |

<br>
<br>

## Roadmap

- "Component Thought"
- Review of Built-in vs. User-defined Components

<br>
<br>

## "Component Thought"

Components have become the fundamental building block of UIs created using modern-day front-end libraries/frameworks such as React, Angular, Vue, etc.

To develop a React application, we construct the UI with a hierarchy of components.

**For example, take the following wireframe:**

<img src="https://i.imgur.com/hL1T2tH.png">

**The above wireframe could be broken into the following components:**

<img src="https://i.imgur.com/TqerRDf.png">

<br>
<br>
<br>


#### f(d) = V

Most of the components we use in React, will be what are known as "function components", because they are, well ... functions.

Later on we'll see examples of alternative ways we can create components using JavaScript Classes, but remember, that JavaScript Classes are just special types of functions.

So, going back to the component concept and how they actually work, think of the formula: `f(d) = V`, where a component is a function (`f`) that accepts data (`d`) and returns a view (`V`).

<br>
<br>
<br>

We must get used to thinking about our UI in terms of components. This "Component Thought" requires us to:

- Build several small components to make the code more manageable.
- Compose (combine) these components into other components.
- Compose an entire "screen", or "page", using a hierarchy of components.
- Use client-side routing to render the "screens" according to which route is active.

Although most SPAs implement their functionality with multiple routes and "screens", until we learn about routing in React, we will concern ourselves with building only a single screen/page.

<br>
<br>
<br>

## Review of Built-in vs. User-defined Components

#### Built-in Components (React Elements)

As we've seen, React has several built-in components, such as `<input />`, that map to HTML elements. These built-in components are the only components that actually emit DOM elements in the browser document. These components are often called **React Elements**.

<details>
<summary>Syntactically, what distinguishes a built-in component from our user-defined components?</summary>
<p><strong>
React components are lower-cased, for example "&lt;div&gt;".
</strong></p>
</details>

<br>
<br>


#### User-defined Components

Our user-defined "custom" components may consist of any combination of other user-defined components and/or React Elements.

The name of our user-defined components must be capitalized.

<details>
<summary>Think for a moment: As we compose our app's UI with our custom components,  ultimately, no UI, no DOM elements, will be rendered in the browser window unless our components include what?</summary>
<p><strong>
React Elements like "&lt;div&gt;" - HTML is what the browser knows and loves.
</strong></p>
</details>


## References

[React Docs - Components & Props](https://facebook.github.io/react/docs/components-and-props.html)

[Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html)
