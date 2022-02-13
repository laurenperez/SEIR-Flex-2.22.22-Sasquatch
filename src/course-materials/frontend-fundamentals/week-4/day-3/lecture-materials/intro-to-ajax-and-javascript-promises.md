---
track: "Frontend Fundamentals"
title: "Intro to AJAX and JavaScript Promises with jQuery"
week: 4
day: 3
type: "lecture"
---

# Intro to AJAX and JavaScript Promises with jQuery

<br>
<br>
<br>
<br>

## Lesson Objectives

1. Explain AJAX
2. Explain promises
3. Populate the DOM with AJAX data
4. Make dynamic AJAX requests

<br>
<br>
<br>

## Explain AJAX

- AJAX Stands for Asynchronous JavaScript And XML
- It's just a way for your page to get data from external sources

**According to MDN:**

> Asynchronous JavaScript + XML, while not a technology in itself, is a term coined in 2005 by Jesse James Garrett, that describes a "new" approach to using a number of existing technologies together, including HTML or XHTML, Cascading Style Sheets, JavaScript, The Document Object Model, XML, XSLT, and most importantly the XMLHttpRequest object.

> When these technologies are combined in the Ajax model, web applications are able to make quick, incremental updates to the user interface without reloading the entire browser page. This makes the application faster and more responsive to user actions.

> Although X in Ajax stands for XML, JSON is used more than XML nowadays because of its many advantages such as being lighter and a part of JavaScript. Both JSON and XML are used for packaging information in Ajax model.

<br>
<br>
<br>

### Lesson Setup

- Create a folder called `intro-to-ajax-practice`

- Inside of `intro-to-ajax-practice` create the following folder/file structure:

```shell
intro-to-ajax-practice/
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
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script defer src="./script.js"></script>
    <title>Intro to AJAX</title>
  </head>
  <body></body>
</html>
```

We'll have our page get data from the external site [https://www.omdbapi.com/](https://www.omdbapi.com/)

- From the documentation, we can see that `https://www.omdbapi.com/?apikey=53aa2cd6&t=Frozen` will get data about the movie Frozen
- The `apikey` parameter is necessary for this external source so that can track and possibly limit access to specific people

- In order to use this particular API in our projects, we'll need to [request an API key](https://www.omdbapi.com/apikey.aspx)

Let's use JavaScript to get data for our page:

```javascript
const promise = $.ajax({
  url: "https://www.omdbapi.com/?apikey=53aa2cd6&t=Frozen",
})

promise.then(
  (data) => {
    console.log(data)
  },
  (error) => {
    console.log("bad request: ", error)
  }
)
```

## Explain promises

`$.ajax` returns a "promise" object, which we'll save to the variable `promise`.

Think of this as an object that holds information about the AJAX request "event".

All "promise" objects have a `.then()` method. This method takes two parameters.

1. The `success` callback
2. The `error` callback

These callbacks behave just like callbacks to DOM events.

Remember: a callback is a function that get's passed to another function, as an argument, to be called at a later time, when something happens.

In this case, when the AJAX request succeeds or fails.

We can also rewrite the previous code into one expression:

```javascript
$.ajax({
  url: "https://www.omdbapi.com/?apikey=53aa2cd6&t=Frozen",
}).then(
  (data) => {
    console.log(data)
  },
  (error) => {
    console.log("bad request", error)
  }
)
```

<br>
<br>
<br>

## Populate the DOM with AJAX data

Now that we have successfully made an AJAX request, let's use the response from OMDB to populate the DOM.

Let's add the below `html` to our practice project.

```html
<h1>Movie Info</h1>
<main>
  <h3>Title</h3>
  <p id="title"></p>
  <p>Year</p>
  <p id="year"></p>
  <p>Rating</p>
  <p id="rated"></p>
</main>
```

Now let's use the data to populate the DOM:

- First we'll select/cache the DOM elements we'll need to work with.
- Once the data comes back from our AJAX request, we can set the content of our DOM elements with it.

```javascript

const $title = $('#title');
const $year = $('#year');
const $rated = $('#rated');


$.ajax({
  url:'https://www.omdbapi.com/?apikey=53aa2cd6&t=Frozen'
  }).then(
    (data) => {
    $title.text(data.Title);
    $year.text(data.Year);
    $rated .text(data.Rated);
  },
    (error) => {
   console.log('bad request: ', error);
  });
})
```

<br>
<br>
<br>

## Make dynamic AJAX requests

Currently, we're getting data for Frozen every time the page loads.

Let's let the user choose the movie:

We'll use the below `html` to begin adding this functionality. Go ahead and place this form below the closing `<main>` tag

```html
<!-- existing code above -->
...
</main >

<form>
  <input type="text" placeholder="Movie Title"/>
  <input type="submit" value="Get Movie Info" />
</form>
```

First, let's set up a state variable to store our movie data.

Then, we'll set up an event listener for a 'submit' events from our form.

For best practices, we'll move the AJAX request to it's own function called `handleGetData`, this function will get called when the form is submitted thus fetching our data and assigning it to our `movieData` state variable.

Also, notice how we're having to call `preventDefault()` on the `event` object, this is how we can prevent the default browser behavior for form submissions: A full page refresh.

In this case, refreshing/reloading the page defeats the purpose of AJAX, so we'll "turn off" the default behavior.

Next, we'll create a seperate function called `render` to take care of transfering the data from our state variable to the DOM.

To summarize, `handleGetData` will just handle requesting the data and assigning it to "state". It will then call `render`, which will transfer that state to the DOM.

By the way, using specialized functions like `handleGetData` and `render` are a great practice to seperate concerns and keep our code organized.

```javascript
let movieData

$("form").on("submit", handleGetData)

function handleGetData(event) {
  event.preventDefault()
  // calling preventDefault() on a 'submit' event will prevent a page refresh
  $.ajax({
    url: "https://www.omdbapi.com/?apikey=53aa2cd6&t=Frozen",
  }).then(
    (data) => {
      movieData = data
      render()
    },
    (error) => {
      console.log("bad request", error)
    }
  )
}

function render() {
  $title.text(movieData.Title)
  $year.text(movieData.Year)
  $rated.text(movieData.Rated)
}
```

Lastly, let's use the input that user types to modify the AJAX request:

- Let's create another state variable called `userInput`.
- Next, we'll select/cache a reference to the input element from the DOM.
- Whenever `handleGetData` gets called, we want to assign the value from our input element to our state variable and use that value to modify the AJAX request.
- Very much like our `apikey`, `userInput` becomes what is known as a query parameter in our `URL`.

```javascript
let movieData, userInput

const $title = $("#title")
const $year = $("#year")
const $rated = $("#rated")
const $input = $('input[type="text"]')

$("form").on("submit", handleGetData)

function handleGetData(event) {
  event.preventDefault()
  // calling preventDefault() on a 'submit' event will prevent a page refresh
  userInput = $input.val()
  // getting the user input
  $.ajax({
    url: "https://www.omdbapi.com/?apikey=53aa2cd6&t=" + userInput,
  }).then(
    (data) => {
      movieData = data
      render()
    },
    (error) => {
      console.log("bad request", error)
    }
  )
}

function render() {
  $title.text(movieData.Title)
  $year.text(movieData.Year)
  $rated.text(movieData.Rated)
}
```

<br>
<br>
<br>

## Review Questions

**❓ In your own words describe a JavaScript Promise**

**❓ What is AJAX?**

**❓ What jQuery method do we use to make AJAX requests**

<br>
<br>
<br>

## Resources

- [`$.ajax` jQuery Documentation](https://api.jquery.com/jQuery.ajax/)
- [`AJAX` MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX)
