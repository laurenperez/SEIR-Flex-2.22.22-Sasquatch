---
track: "Frontend Fundamentals"
title: "My Developer Skills Lab"
week: 3
day: 3
type: "lab"
---

# My Developer Skills Lab


<br>
<br>
<br>
<br>

<!-- 


### [Click here]() to access walkthrough recording 


<br>
<br>
<br>
<br> 
-->




## Introduction

This lab provides an opportunity to practice working with jQuery.

This lab is **Deliverable**.


<br>
<br>


### Setup  

1. Create a folder called `dev-skills-lab`
- Inside of `dev-skills-lab` create the following folder/file structure:

```shell
dev-skills-lab/
  index.html
  css/
   style.css
  js/
   script.js
```


2. Do the usual when setting up a front-end project:
	- Add the HTML boilerplate to `index.html`
	- Link in `./js/script.js` - don't forget the `defer` attribute!
	- Link in `./css/script.css`

3. Load jQuery from the CDN by adding the following **before** your `script.js`:
	
	```html
	<script
	src="https://code.jquery.com/jquery-3.3.1.min.js"
	integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
	crossorigin="anonymous"></script>
	```

4. You'll want to create a repo for this assignment on [Github Enterprise](https://git.generalassemb.ly)

5. You'll turn in a link to your repo using the homework submission form to submit this assignment for evaluation

6. Code away!

<br>
<br>
<br>



### Requirements

1. Add HTML and CSS as necessary to implement an application that looks close to this wireframe:

	<img src="https://i.imgur.com/k06ZMEN.png">
	
2. Code the following _user stories_, using jQuery where possible:

	- As a User (AAU), I don't want to see any developer skills when the page first loads so that I can start with a fresh slate.

	- AAU, I want to be able to type in a skill and have it added to my list of skills by clicking a button.

	- AAU, I want to be able to remove an individual skill one at a time in case I make a mistake.


<br>
<br>
<br>



## Bonus


<br>

##### Replace the first user story above with the following story:

- AAU, I want to see my previous list of developer skills so that I can start from where I last left off.

##### Hint:

- Research [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) as a way to persist (remember) the developer skills each time they are updated.

