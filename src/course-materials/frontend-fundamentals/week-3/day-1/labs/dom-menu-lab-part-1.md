---
track: "Frontend Fundamentals"
title: "DOM Menu Lab - Part 1"
week: 3
day: 1
type: "lab"
---


# DOM "Menu" Lab - Part 1


<br>
<br>
<br>
<br>




### [Click here](https://generalassembly.zoom.us/rec/share/xh4fRDZFYG3Xus2s54d8mS13FOqvxzCYBhdQdQvB0ZjsqMAY6mo1AOZHosBwXPVP.i2TKRpSH9fYJ-bhu?startTime=1614746757000) to access walk through recording 


<br>
<br>
<br>
<br>




## Intro

In the _Intro to the DOM_ we selected, manipulated and created DOM elements - this lab provides practice doing the same.

This is the first of a two-part lab that builds a menu bar with a slide-down submenu.

> Note:  Several of the tasks in this lab would be better done upfront in the markup or CSS instead of using JS, however the goal of this lab is to provide practice modifying the DOM using JS. <br> In your projects, if the HTML or CSS is known in advance and/or static (unchanging), code it in HTML and CSS!


<br> 
<br>



### Although there are two parts to this lab, only part 1 is deliverable.


<br>
<br>
<br>



## Setup  

1. Create a folder called `dom-menu-lab`
   
- Inside of `dom-menu-lab` create the following folder/file structure:

```shell
dom-menu-lab/
  index.html
  css/
    style.css
  js/
    script.js
```

1. Add this "boilerplate" markup to `index.html`:

	```html
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>DOM Menu Lab</title>
		<script defer src="./js/script.js"></script>
		<link rel="stylesheet" href="./css/style.css">
	</head>
	<body>
		<header>
			<nav id="top-menu"></nav>
		</header>
		<main></main>
	</body>
	</html>
	```

	> Note: The markup is complete - **DO NOT** modify it in any way - do not add any classes or ids.

1. Add the following CSS within **style.css**:

	```css
	* {
	  box-sizing: border-box;
	}
	
	/* CSS Custom Properties */

	:root {
	  --main-bg: #4a4e4d;
	  --top-menu-bg: #0e9aa7;
	  --sub-menu-bg: #3da4ab;
	}
	
	body {
	  font-family: Tahoma, Geneva, sans-serif;
	  height: 100vh; 
	  margin: 0;
	  display: grid;
	  grid-template-rows: 3rem auto; 
	  color: white;
	}
	
	.flex-ctr {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	
	.flex-around {
	  display: flex;
	  justify-content: space-around;
	  align-items: center;
	}
	
	nav a {
	  line-height: 3rem;
	  padding: 0 1rem;
	  text-transform: uppercase;
	  text-decoration: none;
	  color: white;
	}
	
	#top-menu a:hover {
	  background-color: var(--sub-menu-bg);
	}
	```
<br>
<br>


> Note: The CSS is complete - **DO NOT** modify it in any way.

<br>
<br>



2. Lastly, be sure to initialize a local repository inside dom-menu-lab, then create a remote repository on your github account that you can push your commits to.
3. Once you are done with parts 1 and 2 of these labs, you can copy and paste a link to your repo using the homework submittal form.

Take five minutes to familiarize yourself with [CSS Custom Properties (variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) - they are an amazing new addition to CSS. If you're familiar with using variables with SASS/LESS pre-processors, CSS Custom Properties are similar, but far more powerful because they are dynamic (their values can be changed during runtime) - and they are built into the CSS language!

There are other things you might notice in the above CSS you haven't seen before:


- [Display: `grid`](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Display: `flex`](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [`vh` or `vw` units otherwise known as `viewport` units](https://css-tricks.com/fun-viewport-units/)
- [`em` or `rem` units](https://www.w3.org/Style/Examples/007/units.en.html)

<br>
<br>

We will cover these in a later lesson, but if you are curious, feel free to check out the links above.


<br>
<br>



## Tasks

<br>


#### Task 1.0

Select and cache the `<main>` element in a variable named `mainEl`.

<br>



#### Task 1.1

Set the background color of `mainEl` to the value stored in the `--main-bg` CSS custom property.

**Hint:** Assign a string that uses the CSS `var()` function like this:<br>`'var(--main-bg)'`

<br>



#### Task 1.2

Set the content of `mainEl` to `<h1>SEI Rocks!</h1>`.

<br>



#### Task 1.3

Add a class of `flex-ctr` to `mainEl`.

**Hint:** [Element.classList API](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)


<br>


#### Progress Check:

<img src="https://i.imgur.com/6y10M6X.png">


<br>


#### Task 2.0

Select and cache the `<nav id="top-menu">` element in a variable named `topMenuEl`.


<br>


#### Task 2.1

Set the height `topMenuEl` element to be `100%`.


<br>


#### Task 2.2

Set the background color of `topMenuEl` to the value stored in the `--top-menu-bg` CSS custom property.

<br>


#### Task 2.3

Add a class of `flex-around` to `topMenuEl`.


<br>


#### Progress Check:

<img src="https://i.imgur.com/tzYjw8n.png">


<br>


#### Task 3.0

Copy the following data structure to the top of **script.js**:

```javascript
// Menu data structure
var menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '/catalog'},
  {text: 'orders', href: '/orders'},
  {text: 'account', href: '/account'},
];
```

<br>
<br>



#### Task 3.1

Iterate over the entire `menuLinks` array and for each "link" object:

- Create an `<a>` element.

- On the new element, add an `href` attribute with its value set to the `href` property of the "link" object.

- Set the new element's content to the value of the `text` property of the "link" object.

- Append the new element to the `topMenuEl` element.


<br>
<br>



#### Congrats!

<img src="https://i.imgur.com/pWu6yHO.png">

