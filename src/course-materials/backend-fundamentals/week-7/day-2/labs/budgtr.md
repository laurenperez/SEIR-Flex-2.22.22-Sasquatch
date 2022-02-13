---
track: "Backend Fundamentals"
title: "Budgtr"
week: 1
day: 3
type: "lab"
---

# Budgtr

Build an express app that let's you create, and read

<br>
<br>
<br>

#### Learning Objectives

- Practice building an express app
- Practice making an index route
- Practice making a show route
- Practice making new/create routes
- Practice adding static assets (CSS)

<br>
<br>
<br>

#### Prerequisites

- Express Basics (Create/Read/Static Assets)

<br>
<br>
<br>

## Objectives

You'll be creating an app that can let you

- see a list of your income and expenditures
- show you one income/expenditure item
- create a new income/expenditure item

<br>
<br>
<br>

## Technical Requirements

1. Must be able to run without syntax errors
2. Must have index, show, create, new routes, using REST
3. Must have basic MVC structure (more details below)

<br>
<br>
<br>

## Getting Started - The Data

Add the data below to a file in your project called `budget.js`.

You'll use this data to populate your index and show routes

<br>

```javascript
module.exports = [
  {
    date: 'April 1',
    name: 'Income',
    from: 'Old Glory Insurance',
    amount: 1000,
    tags: ['income', 'yay'],
  },
  {
    date: 'April 1',
    name: 'Taxes',
    from: 'Government',
    amount: -300,
    tags: ['taxes'],
  },
  {
    date: 'April 1',
    name: 'Retirement',
    from: 'Country Bank',
    amount: -200,
    tags: ['retirement', 'investing in the future'],
  },
  {
    date: 'April 1',
    name: 'Savings',
    from: 'Country Bank',
    amount: -100,
    tags: ['savings', 'rainy day fund'],
  },
  {
    date: 'April 1',
    name: 'Credit Card Payment',
    from: 'NPM Express',
    amount: -100,
    tags: ['credit card'],
  },
  {
    date: 'April 5',
    name: 'Monthy Birthday Money from Aunt Tilda',
    from: 'Aunt Tilda',
    amount: 20,
    tags: ['Aunt Tilda is the best'],
  },
  {
    date: 'April 5',
    name: 'Coffee',
    from: 'Moon Coin',
    amount: -4,
    tags: ['coffee'],
  },
  {
    date: 'April 5',
    name: 'Internet',
    from: 'Horizon',
    amount: -100,
    tags: ['utilities'],
  },
  {
    date: 'April 3',
    name: 'Groceries',
    from: 'Merchant Jack's',
    amount: -76,
    tags: ['groceries'],
  },
  {
    date: 'April 3',
    name: 'Pet Food',
    from: 'Pet Precious Inc',
    amount: -7,
    tags: ['pets'],
  },
];
```

<br>
<br>
<br>

## Routes

- Index
  - GET `/budgets`
- Show
  - GET `/budgets/:index`
- New
  - GET `/budgets/new`
- Create
  - POST `/budgets`

<br>
<br>
<br>

## MVC

**Models, Views, Controller**

We only have one model, so it may seem all these folders are overkill. As we start building with more complexity these folders will gain utility

- Your app should follow the MVC format
- Models
  - `budget.js` - the data we provided
- Controllers
  - since we just have one set of routes, we'll include them in our `server.js` stay tuned for lessons that'll teach us how to organize our code when we have more sets of routes
- Views
  - your EJS files go in here
- Public
  - your css file(s) go(es) here
    - recommended to go to try a new css framework:<br>
      http://getskeleton.com/
    - download the `normalize.css` and `skeleton.css` files and add them to your public directory (or use the CDNs:
      <br> `https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.css` and `https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css` - thanks for the Tip Sam Whitleton!)
    - link them in your ejs files:
    ```html
    <link rel="stylesheet" href="/normalize.css" />
    <link rel="stylesheet" href="/skeleton.css" />
    ```
    In order to immediately modernize your HTML

At the root of your project:

- `server.js`
- `package.json` created with `npm init`
- `.gitignore` - create it and add `node_modules`, you don't need it yet, but it is good practice to use this

<details><summary>File Structure</summary>

![file structure example](https://i.imgur.com/vIbW1fN.png)

</details>

<br>
<br>
<br>

### Commits

The order doesn't matter, but this will help you check your progress of completing this lan:

<br>
<br>
<br>

##### commit at least each time you get a route and/or view working

<br>
<br>
<br>

#### Getting Started

- server is working and displays a plain `res.send` index page ` with some text like 'hello world'
- Added and configured npm packages `express`, `ejs`
- configured `express.static`

- created index.ejs
  - html boiler plate
  - link `normalize.css` and `skeleton.css`
  - div with the class `container`
  - `h1` with the text Budgtr ALL (or similar text)

<br>
<br>
<br>

Expected appearance with `normalize.css` and `skeleton.css` are properly linked:

![just an h1 inside a div with a class of container](https://i.imgur.com/CygNXJZ.png)

<br>
<br>
<br>

#### Index

- Set your` models/budget.js` data to a variable named `Budget`
- Display your data on your index page as a `<table>`
- each income/expenditure should be a `<tr>`
- each piece of data should be its own table cell `<td>`
- the `name` should be wrapped in an `<a>` (anchor) tag, that goes nowhere for the moment, but will eventually link to the show page for that item

<br>
<br>
<br>

Expected Apperance:

![index.ejs populated with data](https://i.imgur.com/Hf6TkJU.png)

<br>
<br>
<br>

#### Show

- A show route and `show.ejs`
- a link from `index.ejs` item name to its show page
  - html boilerplate
  - remember to add your css links (copy from your `index.ejs`)
  - a `<div>` with the class of `container`
  - an `<h1>` with the name of your item
  - a `<button>` that takes you back to the `index.ejs` page
  - the rest of the details of the item

<br>
<br>
<br>

Sample Apperance:

![show route](https://i.imgur.com/dVBZicJ.png)

**Hint:** the button should already be styled if your `normalize.css` and `skeleton.css` are linked properly

Feel free to organize the rest of this page any way you like. Hold off on styling this more until the HFM section - just use the base styles provided by our already linked css files

<br>
<br>
<br>

#### New

- configured `body-parser`
- Add a button in your `index.ejs` that links to a new route that displays `new.ejs`
- The `new.ejs` should contain
- html boilerplate
- links to your css files
- a `div` with the class container
- an `h1` with a descriptive title
- a form, with the appropriate action and method
- an input field for
  - date
  - name
  - amount
  - from
  - submit
  - tags (bonus)
- Styling forms are a pain, keep it simple for now

<br>
<br>
<br>

**Hint**: use the attribute `placeholder` in the input field to see a placeholder value, rather than putting a label of the input field outside. Here is an example:

![placeholder example](https://i.imgur.com/KZ0DSKn.png)

<br>
<br>
<br>

**GOTCHA** - make sure this get route is above your URL parameters route

![filled out form](https://i.imgur.com/3CA6L5F.png)

<br>
<br>
<br>

#### New

- A new route that is a post route
- first just console.log the `req.body`
- once the `req.body` is what you'd an expect (an object with keys that match our data in our `models/budget.js` and values that were entered in your form) `.push()` the `req.body` to your `Budget`
- then redirect to the index
- when you redirect to your index page, your new item should appear

<br>
<br>
<br>

See new item at the bottom:

![new item in list](https://i.imgur.com/0OTjWiw.png)

<br>
<br>
<br>

Show page should also render properly

![new item show page](https://i.imgur.com/r6CvxlW.png)

<br>
<br>
<br>

### Hints

<details><summary>Server.js</summary>

![server.js example](https://i.imgur.com/uSYHYzp.png)

</details>

<br>
<br>
<br>

## Innovation Time!

Remember, this is just JavaScript, so you can write as much JS logic as you want to make the app more useful beyond just showing the data as is. Be sure you solve this on your own.

- Add a variable 'bankAccount'

  - display it at the top of the index.ejs
  - have this value update based on each item
  - if the value is less than 0, change the background to red
  - if the value is greater than 1000 change the background to blue or green

- Tips
  - pseudocode on your own, figure out YOUR way of solving it
  - have a code graveyard
  - talk it through with the TA
  - link to helpful articles on stack overflow/elsewhere
  - collaborate - have a friend help you solve it your way or help a friend solve it their way

<br>
<br>
<br>

## Hungry for More

<br>

<details><summary><strong style="cursor: pointer;">Click me for additional challenges</strong></summary><p>
   <br>
   <br>
   Feel free to choose what you want and if you want to implement something differently than the suggestion, go for it! It is hungry for more time!

- Go back to the afternoon lab and use cURL
- render the tags as list items in an undordered list
- input the tags, and add them to the tags array, figure out how to properly add multiple tags
- override the amount input so that it defaults to a negative number
- add logic to check whether the item is an expenditure or income (use two different fields? a check box? separate buttons? The choice is yours) and then input the amount as negative or positive based on the user's input

- style your app, add a `main.css` that adds your personal style on top of normalize and skeleton

<br>
<br>
<br>

**SUPER BONUS**

- try to store data in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)

- If you implemented tags, sort/filter your list by tags (no hints! There are many ways to solve this!)

</p></details>
