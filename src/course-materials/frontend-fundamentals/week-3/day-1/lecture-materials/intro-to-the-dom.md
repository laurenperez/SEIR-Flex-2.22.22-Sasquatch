---
track: "Frontend Fundamentals"
title: "Intro to the DOM"
week: 3
day: 1
type: "lecture"
---

# Intro to the DOM

<br>
<br>
<br>
<br>

## Learning Objectives

<p>Students Will Be Able To:</p>

- Use DevTools to Explore the DOM
- Select a Single Element in the DOM
- Select Multiple Elements in the DOM
- Change the Content of an Element
- Change the Style of an Element
- Manipulate the Attributes of an Element
- Manipulate the Classes of an Element
- Iterate Over a Collection of Elements

<br>
<br>
<br>

## Roadmap

- What's the DOM?
- Setup
- Using DevTools to Explore the DOM
- Selecting DOM Elements
- Select a single element by its `id`
- Select a single element using a CSS selector
- Change the content of an element
- Change the style of an element
- Attributes of an element
- Attributes of an element - Classes
- Selecting multiple elements
- Iterating over a collection of elements

<br>
<br>
<br>

### Lesson Setup

- Create a folder called `intro-to-dom`
- Inside of `intro-to-dom` create the following folder/file structure:

```shell
intro-to-dom/
	index.html
	script.js
```

- You can add this HTML to your `.html` file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Intro to the DOM</title>
  </head>
  <body></body>
</html>
```

<br>
<br>
<br>

### Lesson Setup (continued)

- Add a `<script>` tag to include `script.js` in the `<head>`:

  ```html
  <head>
    ...
    <title>Intro to the DOM</title>
    <script defer src="./script.js"></script>
  </head>
  ```

- The `defer` attribute ensures the DOM is ready before the script executes.

- Finally, let's add an `<h1>` inside of the `<body>` as follows:

  ```html
  ...
  <body>
    <h1 id="title" class="main-title">Intro to the DOM</h1>

  </body>
  </html>
  ```

- Note: It's a best practice to use double quotes and kebob-casing in the HTML.

<br>
<br>
<br>

### What's the DOM

- The [DOM (Document Object Model)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) is the in-memory representation of a browser's web document.

- It's a tree-like data structure with the top (root) being the `document` object.

- Let's type `document` in DevTool's console and explore some of its properties.

<br>
<br>
<br>

### What's the DOM

- The DOM's application programming interface ([API](https://en.wikipedia.org/wiki/Application_programming_interface)) enables developers to make the UI dynamic by using JavaScript to:
  - Add/remove elements to/from the document
  - Change the content of elements
  - Change the style properties of elements

<br>
<br>
<br>

### Using DevTools to Explore the DOM

- First let's install the **open in browser** VS Code extension so that we can open HTML pages in the browser a keyboard shortcut of `option-b`.

- After `index.html` is opened in Chrome, use the keyboard shortcut of `option-command-i` to open Chrome's DevTools.

- Click on the **Elements** tab to browse the DOM.

- To try it out, first select the `h1` element and use the **Styles** panel to add a CSS property of `color: red;`

<img src="https://i.imgur.com/RAvgNl0.png">

- Look closely after the closing `</h1>` tag - you see that _`== $0`_?

- That tells us that Chrome has created a variable named `$0` that represents the `<h1>` element in the DOM!

- Click on the **Console** tab and let's explore the properties on the `$0` object by typing `dir($0)`.

- Now try typing this in: `$0.style.backgroundColor = 'yellow'`

<br>
<br>
<br>

### Selecting DOM Elements

- Web devs make web pages dynamic by manipulating the DOM.

- For example, in a To Do app, the user types a new todo into an input, clicks a button and the new todo is added to the list.

- The above scenario requires the app's JS to:

  - Attach an event listener to the button element
  - Grab the text entered from the `input` element
  - Create a new element, e.g. an `li`, and set it's content
  - Append the new element to its parent element

- Devs must use JS to select DOM elements so that the above steps can be performed!

<br>
<br>
<br>

### Select a single element by its _id_

- The `getElementById` method is the most efficient way to select a DOM element if it has an `id` assigned to it.

  ```javascript
  let titleEl = document.getElementById("title")
  console.log(titleEl)
  ```

- Note that, unlike we do in CSS, we do not put a # in front of the `id` when using `getElementById`.

- If you'd like to be able to explore the properties of element, use `console.dir()` instead.

- But what if the element doesn't have an id...

<br>
<br>
<br>

### Select a single element using a CSS selector

- The solution is to use the `querySelector(selector)` method that is available on the `document` object (and elements themselves).

- The _selector_ argument is a string that follows the rules of regular CSS3 selectors.

- The CSS3 selector language offers amazing power to target elements for selection!

- Knowing that the _selector_ provided to `querySelector(selector)` follows the rules of CSS3 selectors, **how could we modify our code to select our `<h1>` element by its id?**

- If the CSS selector provided to `querySelector()` matches multiple elements, it returns the **"first"** matching element.

- If no matching node is found, `null` is returned.

<br>
<br>
<br>

### 💪 Practice

- In _index.html_, add a `<p>` tag below the `<h1>` and give it a class of _cool_, then...

- Add some content inside of the `<p>` tag - try typing `lorem [tab]` to emit (using _emmet_) random _lorem ipsum_ text.

- Use `querySelector()` to select the first element with a class of _cool_ and assign it to a variable named `pEl`.

- **Verify that the `<p>` element was selected by logging out `pEl`.**

<br>
<br>
<br>

### Change the content of an element

- Now that we're able to select an element of our choosing, let's see how we can change the content of that element.

- By inspecting the properties of a DOM element in the console, we will find a couple of properties that we can use to read and set its content:

  - **`innerHTML`** - Used to retrieve/set content as HTML
  - **`textContent`** - Used to retrieve/set content as plain text

- Let's check out changing the content of the `<p>` element by assigning the string **`Comments for <strong>Today</strong>`** first to `textContent`, then to `innerHTML`.

- So, as you saw, if you want to include HTML in the content, use `innerHTML`.

- The power of `innerHTML` may not be obvious, but consider the string can be as complex as you want - containing multiple elements with attributes, etc.

- However, using `textContent` is more efficient if just setting text.

<br>  
<br>  
<br>

### Change the style of an element

- DOM elements have a `style` property that can be used to set CSS styling!

- Check out the CSS properties in the console.

- **What naming convention is used for CSS properties in the DOM?**

- **What naming convention is used for CSS properties in CSS?**

- **Why is it different?**

- This is how we can set the `text-align` CSS property of our title:

  ```javascript
  let titleEl = document.getElementById("title")
  titleEl.style.textAlign = "center"
  ```

- **Your turn:** Change the `color` of the `<p>` element to a color of your choosing.

<br>  
<br>  
<br>

### Attributes of an element

- You may need to get, set, or check if an element has a certain _attribute_.

- Here are a few of the methods that the [Element API](https://developer.mozilla.org/en-US/docs/Web/API/element) (Application Programming Interface) has for working with an element's attributes:
  - `getAttribute(name)`
  - `setAttribute(name, value)`
  - `hasAttribute(name)`

<br>  
<br>  
<br>

### Attributes of an element 💪 Practice (5 mins)

- Add an `<a>` tag to `index.html` with content of "Visit Google" but **without an `href` attribute**.

- Reload the page and verify that the link does not work (in fact, it probably doesn't even look like a link).

- In the JS, write the line of code that will add an `href` attribute that will make the link navigate to "[https://www.google.com](https://www.google.com)".

<br>  
<br>  
<br>

### Attributes of an element - Classes

- Technically, you could use those attribute methods we saw to work with an element's classes.

- However, the `classList` property offers a better approach. It's an object with the following methods pertaining to classes:
  - `add(className, className, ...)`
  - `remove(className, className, ...)`
  - `toggle(className)`
  - `contains(className)`
  - `replace(oldClass, newClass)`

<br>
<br>
<br>

### Review Questions

**❓ If we want to change the text (no HTML) inside of a `<div>`, what property should we set?**

**❓ How many DOM elements are returned by the `querySelector` method?**

**❓ What DOM element property is used to style a DOM element?**

<br>  
<br>  
<br>

### Selecting multiple elements

- Before we checkout selecting multiple elements, let's add the following HTML below the existing `<p>` element:

  ```html
  <ul id="comments">
    <li class="comment">first comment</li>
    <li class="comment">second comment</li>
    <li class="comment">third comment</li>
  </ul>
  ```

- VS Code includes [Emmet](https://docs.emmet.io/abbreviations/syntax/), which is a great tool for quickly generating markup. Type the following to generate most of the markup above: `ul#comments>li.comment{comment}*3`

  - The following methods _can_ be used to select multiple elements:
  - `getElementsByTagName(namesString)`
  - `getElementsByClassName(namesString)`

- The above methods return a **live** [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection).

- Although it's pretty cool that the returned list is automatically updated to include/exclude DOM elements as the DOM is updated, the above methods are not as flexible as the `querySelectorAll` method...
- Like `querySelector`, the `querySelectorAll(selector)` method uses the power of CSS3 selectors to specify which DOM elements we want returned.

- Of course, like the name says, it selects **all** DOM elements that match the _selector_.

- By itself, `querySelectorAll` actually provides all the DOM selection power a web dev needs!

<br>
<br>
<br>

### Select multiple elements with <span style="text-transform: lowercase">query</span>S<span style="text-transform: lowercase">elector</span>A<span style="text-transform: lowercase">ll</span>

- **You Do:** Use `querySelectorAll` to select all of the elements with a class of `comment` and assign to a variable named `commentEls`.

- `console.log(commentEls)` to verify it worked.

<br>
<br>
<br>

### DOM Selection Summary

- In summary, use the following to help you decide which method to use to select DOM elements:
  - **getElementById**: Use when you need to select a single element that has an `id` assigned to it.
  - **querySelector**: Use when you need to select a single element that **does not** have an `id`.
  - **querySelectorAll**: Use when you need to select multiple elements.

<br>  
<br>  
<br>

### Iterating over a collection of elements

- `querySelectorAll` returns an array-like object called a [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList).

- There are three approaches we can use to iterate over the elements in a _NodeList_ :

  - A regular **`for`** loop - works, but is not as readable or elegant...
  - The **`forEach`** method. A good option when you want to iterate through _all_ elements and also want to access the **index** of the iteration.
  - A **`for of`** loop - elegant and allows early exit of the loop with the `break` statement, however, does not have access to an **index** (although you could track indexes manually by initializing a separate variable before the loop and incrementing it within the loop).

- Let's type this `for...of` loop in the console to log each element:

  ```javascript
  for (let commentEl of commentEls) {
    console.log(commentEl)
  }
  ```

- **You Do:** Add a `for...of` loop to `main.js` that changes the font size all of the comment elements to 30px.

- Hint: You must use a string like `'30px'` (just the number `30` or the string of `'30'` will not work).

<br>  
<br>  
<br>

### Final Questions

**❓ What method is the most efficient for selecting an element that has an `id`?**

**❓ If we wanted to grab all of the content (including its nested elements) of an element, what property on that element would we use?**

**❓ If you had to pick only one method to select DOM elements with during your career as a developer, which one should you choose?**

**❓ Which property on DOM elements is used to set the CSS properties for that element?**

<br>
<br>
<br>

## References

- [Locating DOM Elements using Selectors](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors)

- [Intro to the DOM on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
