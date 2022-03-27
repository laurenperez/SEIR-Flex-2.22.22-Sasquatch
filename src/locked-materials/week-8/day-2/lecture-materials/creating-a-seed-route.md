---
track: "Backend Fundamentals"
title: "Creating a Seed Route"
week: 8
day: 2
type: "lecture"
---

# Book List CRUD App with Mongoose - Seed

<br>
<br>
<br>

## Lesson Objectives

1. Create a Seed Route
1. Move Seed Data to External File

<br>
<br>
<br>

## Introduction

A Seed Route is a route we can hit to automatically populate our databases with some dummy data. While you wouldn't want to have a seed route in production, they can be really handy in development.

<br>
<br>
<br>

## Add a Basic Seed Route

Let's practice adding a basic Seed route to our `Booklist` app

In `server.js` above the rest of your routes _(so it's easy to remember to remove it later)_:

```js
// Routes / Controllers
// Seed
app.get("/books/seed", (req, res) => {
  Book.create(
    [
      {
        title: "Cracking the Coding Interview",
        author: "Gayle Laakmann McDowell",
      },
      {
        title: "HTML and CSS: Design and Build Websites",
        author: "Jon Duckett",
      },
      {
        title: "JavaScript and JQuery: Interactive Front-End Web Development ",
        author: "jon Duckett",
      },
      {
        title: "You Don't Know JS Yet",
        author: "Kyle Simpson",
      },
      {
        title:
          "Design Patterns: Elements of Reusable Object-Oriented Software ",
        author: "Erich Gamma",
      },
      {
        title: "Frontend Unicorn",
        author:
          "Michał Malewicz, Szymon Adamiak, Albert Pawłowski, and Albert Walicki",
      },
      {
        title: "Don't Make Me Think",
        author: "Steve Krug",
      },
    ],
    (error, data) => {
      res.redirect("/books")
    }
  )
})
```

As you can see from the code above, we're using mongoose's create method just like we normally do, but instead of passing in a single object, we're passing in an array of objects. Each one will be it's own entry in the database.

You may also notice we're using a `GET` route instead of a POST route. We're going to be hitting this route from our browser and the code above will handle the data entry, so a simple `GET` route will do.

<br>
<br>
<br>

## STOP! Check your work.

In the browser, navigate to `http:localhost:3000/books/seed`

It should redirect to you `/books` and we should now see all the books from our seed route on the page.

<br>
<br>
<br>

## Gotcha!

Let's hit that seed route again: `http:localhost:3000/books/seed`
Once again, it should redirect you to `/books` but this time, you'll notice we have duplicate data. We've only coded create functionality into our seed route.

If we want to avoid the chance of duplicate data, the best option is to either run your seed route then comment it out so we can't accidentally seed again. OR to add some code to delete all of the entries in our database before creating the new entries.

Let's practice that too.

Update your code so include delete functionality:

```js
// Routes / Controllers
// Seed
app.get("/books/seed", (req, res) => {
  Book.deleteMany({}, (error, allBooks) => {})

  Book.create(
    [
      {
        title: "Cracking the Coding Interview",
        author: "Gayle Laakmann McDowell",
      },
      {
        title: "HTML and CSS: Design and Build Websites",
        author: "Jon Duckett",
      },
      {
        title: "JavaScript and JQuery: Interactive Front-End Web Development ",
        author: "jon Duckett",
      },
      {
        title: "You Don't Know JS Yet",
        author: "Kyle Simpson",
      },
      {
        title:
          "Design Patterns: Elements of Reusable Object-Oriented Software ",
        author: "Erich Gamma",
      },
      {
        title: "Frontend Unicorn",
        author:
          "Michał Malewicz, Szymon Adamiak, Albert Pawłowski, and Albert Walicki",
      },
      {
        title: "Don't Make Me Think",
        author: "Steve Krug",
      },
    ],
    (error, data) => {
      res.redirect("/books")
    }
  )
})
```

<br>
<br>
<br>

## STOP! Check your work.

Now, when you hit the seed route multiple times, you'll still only have one set of data.

Just remember, if you choose to include delete functionality in your seed routes, any data you've entered manually through a form or through postman will be lost. Use the seed route with care, and comment it out or delete it before deploying your app, unless it's a personal project for which you want to be able to restore your chosen data.

<br>
<br>
<br>

## Move Seed Data to a Separate file

Sometimes we have a lot of seed data and it takes up a lot of space in our controller. If you'd like to move the code to another file, you absolutely can!

In the `models` directory, let's create a file called `bookSeed.js` and move our seed data over:

```js
module.exports = [
  {
    title: "Cracking the Coding Interview",
    author: "Gayle Laakmann McDowell",
  },
  {
    title: "HTML and CSS: Design and Build Websites",
    author: "Jon Duckett",
  },
  {
    title: "JavaScript and JQuery: Interactive Front-End Web Development ",
    author: "jon Duckett",
  },
  {
    title: "You Don't Know JS Yet",
    author: "Kyle Simpson",
  },
  {
    title: "Design Patterns: Elements of Reusable Object-Oriented Software ",
    author: "Erich Gamma",
  },
  {
    title: "Frontend Unicorn",
    author:
      "Michał Malewicz, Szymon Adamiak, Albert Pawłowski, and Albert Walicki",
  },
  {
    title: "Don't Make Me Think",
    author: "Steve Krug",
  },
]
```

<br>
<br>
<br>

As you can see in the code above, we're now exporting our seed data from this file, which means we can import it elsewhere!

In `server.js`, let's update our code to use the exported data:

```js
// Routes / Controllers
// Seed
const bookSeed = require("./models/bookSeed.js")

app.get("/books/seed", (req, res) => {
  Book.deleteMany({}, (error, allBooks) => {})

  Book.create(bookSeed, (error, data) => {
    res.redirect("/books")
  })
})
```

We could import our `bookSeed` data at the top of the file with our dependencies, but it may be easier to remember to delete it if you keep all the seed related stuff together. To each their own!

<br>
<br>
<br>

## STOP! Check your work.

The functionlity should all be the same, the data is just coming from another file.
