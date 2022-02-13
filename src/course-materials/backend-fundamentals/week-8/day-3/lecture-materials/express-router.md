---
track: "Backend Fundamentals"
title: "Express Router"
week: 2
day: 2
type: "lecture"
---

# Book List CRUD App with Mongoose - Express Router

<br>
<br>
<br>

## Lesson Objectives

1. Explain What Express.Router does for us
1. Create External Controller File for Routes
1. Move Server.js Routes to External Controller File
1. Require Mongoose in Controller File
1. Use Controller File in Server.js
1. Remove References to Base of Controller's URLs

<br>
<br>
<br>

## Explain What Express.Router does for us

- Our `server.js` file is getting rather bloated
- `express.Router` will let us put our routes in a separate file

<br>
<br>
<br>

## Create External Controller File for Routes

1. `mkdir controllers`
1. `touch controllers/books.js`
1. Edit `controllers/books.js`

In `controllers/books.js`:

```js
const express = require("express")
const bookRouter = express.Router()

module.exports = bookRouter
```

<br>
<br>
<br>

## Move Server.js Routes to External Controller File

Rename `app` to `router`.
Try using the shortcut! Highlight one occurance of app then click `command` + `d` to select the next occurance of it too. Continue doing this until you've highlighted every occurance of the word `app`. Then type `bookRouter` to replace all the highlighted code.

While we're here, let's also update the relative pathing to our bookSeed: const `bookSeed = require('../models/bookSeed.js')`

<br>
<br>
<br>

Here's the final code:

```js
// Dependencies
const express = require("express")
const bookRouter = express.Router()

// Seed
const bookSeed = require("../models/bookSeed")
bookRouter.get("/books/seed", (req, res) => {
  Book.deleteMany({}, (error, allBooks) => {})

  Book.create(bookSeed, (error, data) => {
    res.redirect("/books")
  })
})

// Index
bookRouter.get("/books", (req, res) => {
  Book.find({}, (error, allBooks) => {
    res.render("index.ejs", {
      books: allBooks,
    })
  })
})

// New
bookRouter.get("/books/new", (req, res) => {
  res.render("new.ejs")
})

// Delete
bookRouter.delete("/books/:id", (req, res) => {
  Book.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/books")
  })
})

// Update
bookRouter.put("/books/:id", (req, res) => {
  if (req.body.completed === "on") {
    req.body.completed = true
  } else {
    req.body.completed = false
  }

  Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    },
    (error, updatedBook) => {
      res.redirect(`/books/${req.params.id}`)
    }
  )
})

// Create
bookRouter.post("/books", (req, res) => {
  if (req.body.completed === "on") {
    req.body.completed = true
  } else {
    req.body.completed = false
  }

  Book.create(req.body, (error, createdBook) => {
    res.redirect("/books")
  })
})

// Edit
bookRouter.get("/books/:id/edit", (req, res) => {
  Book.findById(req.params.id, (error, foundBook) => {
    res.render("edit.ejs", {
      book: foundBook,
    })
  })
})

// Show
bookRouter.get("/books/:id", (req, res) => {
  Book.findById(req.params.id, (err, foundBook) => {
    res.render("show.ejs", {
      book: foundBook,
    })
  })
})

// Exports
module.exports = bookRouter
```

<br>
<br>
<br>

## Require Book Model in Controller File

```js
// Dependencies
const express = require("express")
const bookRouter = express.Router()
const Book = require("../models/book")
//...
```

<br>
<br>
<br>

The `Book` model is no longer needed in `server.js`. Remove it:

In `server.js`:

```js
// Dependencies
const express = require("express")
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const app = express()
require("dotenv").config()
```

<br>
<br>
<br>

## Use Controller File in Server.js

This is technically middleware! But make sure it runs after your other middleware.

POP QUIZ: Why do we have to mount our controllers after our other middleware?

<br>
<br>
<br>

In `server.js`:

```js
// Routes / Controllers
const booksController = require("./controllers/books")
app.use(booksController)
```

<br>
<br>
<br>

## Specify When our Middleware runs

We only want our books controller to run on the `/books` route, so let's specify that.

In `server.js`:

```js
const booksController = require("./controllers/books")
app.use("/books", booksController)
```

<br>
<br>
<br>

Since we've specified that the controller works with all urls starting with `/books`, we can remove this from the controller file. Instead of saying things like `app.get('/books')` we're now going to say `app.get('/')` because we specified books as the root of our controller.

Confused? Come off mute and ask!

P.S. Don't use the shortcut to remove `/books`. Whenever we redirect, we need to be specific and include the `/books` prefix, so we don't want to delete those occurrances.

<br>
<br>
<br>

Here's our completed code so far:

```js
// Dependencies
const express = require("express")
const bookRouter = express.Router()
const Book = require("../models/book")

// Seed
const bookSeed = require("../models/bookSeed")
bookRouter.get("/seed", (req, res) => {
  Book.deleteMany({}, (error, allBooks) => {})

  Book.create(bookSeed, (error, data) => {
    res.redirect("/books")
  })
})

// Index
bookRouter.get("/", (req, res) => {
  Book.find({}, (error, allBooks) => {
    res.render("index.ejs", {
      books: allBooks,
    })
  })
})

// New
bookRouter.get("/new", (req, res) => {
  res.render("new.ejs")
})

// Delete
bookRouter.delete("/:id", (req, res) => {
  Book.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/books")
  })
})

// Update
bookRouter.put("/:id", (req, res) => {
  if (req.body.completed === "on") {
    req.body.completed = true
  } else {
    req.body.completed = false
  }

  Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    },
    (error, updatedBook) => {
      res.redirect(`/books/${req.params.id}`)
    }
  )
})

// Create
bookRouter.post("/", (req, res) => {
  if (req.body.completed === "on") {
    req.body.completed = true
  } else {
    req.body.completed = false
  }

  Book.create(req.body, (error, createdBook) => {
    res.redirect("/books")
  })
})

// Edit
bookRouter.get("/:id/edit", (req, res) => {
  Book.findById(req.params.id, (error, foundBook) => {
    res.render("edit.ejs", {
      book: foundBook,
    })
  })
})

// Show
bookRouter.get("/:id", (req, res) => {
  Book.findById(req.params.id, (err, foundBook) => {
    res.render("show.ejs", {
      book: foundBook,
    })
  })
})

// Exports
module.exports = bookRouter
```

<br>
<br>
<br>

**STOP! Check your work. Make sure all your routes and redirects work as expected.**
