---
track: "Backend Fundamentals"
title: "Two Model CRUD App - No relationship - First Model"
week: 2
day: 5
type: "lecture"
---

# Two Model CRUD App - No Relationship - First Model

<br>
<br>
<br>

## Lesson Objectives

1. Init Directory
1. Start express
1. Create Home page
1. Create Authors Index
1. Create Authors New Page
1. Set up Author Model
1. Create Authors `POST` Route
1. Show Authors on Index Page
1. Create Authors Show Page
1. Create Authors DELETE Route
1. Create Authors Edit Page
1. Create Authors PUT Route

<br>
<br>
<br>

## Init Directory

1. `mkdir blog`
1. `cd blog`
1. `touch server.js`
1. `npm init -y`
1. `npm install express`

<br>
<br>
<br>

## Start express

Let's start with some boilerplate code inside of `server.js`:

```javascript
const express = require("express")
const app = express()

app.listen(3000, () => {
  console.log("listening....")
})
```

<br>
<br>
<br>

## Create Home page

1. `npm install ejs`
1. `mkdir views`
1. `touch views/index.ejs`

<br>
<br>
<br>

Inside of `views/index.ejs`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Express Blog</title>
  </head>

  <body>
    <header>
      <h1>Welcome to the Blog</h1>
      <nav>
        <ul>
          <li>
            <a href="/authors">Authors</a>
          </li>
          <li>
            <a href="/articles">Articles</a>
          </li>
        </ul>
      </nav>
    </header>
  </body>
</html>
```

<br>
<br>
<br>

Inside of `server.js`:

```javascript
app.get("/", (req, res) => {
  res.render("index.ejs")
})
```

<br>
<br>
<br>

## Create Authors Index

1. `mkdir views/authors`
1. `touch views/authors/index.ejs`

Inside of `views/authors/index.ejs`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Express Blog</title>
  </head>

  <body>
    <header>
      <h1>Authors</h1>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/authors/new">Create a new Author</a>
          </li>
        </ul>
      </nav>
    </header>
  </body>
</html>
```

1. `mkdir controllers`
1. `touch controllers/authors.js`

<br>
<br>
<br>

Inside of `controllers/authors.js`:

```javascript
const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("authors/index.ejs")
})

module.exports = router
```

<br>
<br>

Use the controller in `server.js`:

```javascript
const authorsController = require("./controllers/authors.js")
app.use("/authors", authorsController)
```

<br>
<br>
<br>

## Create Authors New Page

First we`touch views/authors/new.ejs`.

Then we can add the following markup:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Express Blog</title>
  </head>

  <body>
    <header>
      <h1>Create an Author</h1>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/authors">Authors Index</a>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <form action="/authors" method="POST">
        <input type="text" name="name" />
        <input type="submit" value="Create Author" />
      </form>
    </main>
  </body>
</html>
```

Add the create route in `controllers/authors.js`:

```javascript
router.get("/new", (req, res) => {
  res.render("authors/new.ejs")
})
```

<br>
<br>
<br>

## Connect to MongoDB

1. `npm install mongoose dotenv`
1. `touch .env`
1. Connect in `server.js`

<br>
<br>
<br>

## Add ENV Variables

Inside of `.env`:

```shell
DATABASE_URL=mongodb+srv://<username>:<password>@general-assembly.1wjse.mongodb.net/meen-auth-starter?retryWrites=true&w=majority
```

- Remember to use your own `DATABASE_URL`. Copying the one above will not work.

<br>
<br>
<br>

## Configure the Database

**Don't forget to include this at the top of `server.js`:**

```js
require("dotenv").config()
```

<br>
<br>
<br>

Then add this below, also in `server.js`:

```js
// Dependencies
const mongoose = require("mongoose")

// Database Configuration
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

// Database Connection Error / Success
const db = mongoose.connection
db.on("error", (err) => console.log(err.message + " is mongod not running?"))
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo disconnected"))
```

<br>
<br>
<br>

**STOP! Check your work.**

Boot up your server with `nodemon` and make sure you should see:

```shell
Listening ...
mongo connected
```

<br>
<br>
<br>

## Set up Author Model

1. `mkdir models`
1. `touch models/authors.js`

```javascript
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const authorSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
)

const Author = mongoose.model("Author", authorSchema)

module.exports = Author
```

<br>
<br>
<br>

## Create Authors Create Route

Use body parser inside of `server.js`:

```javascript
app.use(express.urlencoded({ extended: false }))
```

<br>
<br>
<br>

Inside of `controllers/authors.js`, let's require the `Author` model and define a create controller:

```javascript
const Author = require("../models/authors.js")
//...
//...farther down the page
router.post("/", (req, res) => {
  Author.create(req.body, (err, createdAuthor) => {
    res.redirect("/authors")
  })
})
```

<br>
<br>
<br>

## Show Authors on Index Page

Inside of `controllers/authors.js`, we'll refactor the index controller:

```javascript
router.get("/", (req, res) => {
  Author.find({}, (err, foundAuthors) => {
    res.render("authors/index.ejs", {
      authors: foundAuthors,
    })
  })
})
```

<br>
<br>
<br>

Now we can index the authors inside of`views/authors/index.ejs`:

```html
<main>
  <h2>List of Authors</h2>
  <ul>
    <% for(let i = 0; i < authors.length; i++){ %>
    <li>
      <a href="/authors/<%= authors[i]._id %>"><%= authors[i].name %></a>
    </li>
    <% } %>
  </ul>
</main>
```

<br>
<br>
<br>

## Create Authors Show Page

Create the file with`touch views/authors/show.ejs`, and add this markup to it:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Express Blog</title>
  </head>

  <body>
    <header>
      <h1>Show Page for <%= author.name %></h1>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/authors">Author Index</a>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <section>
        <h2>Author Attributes:</h2>
        <ul>
          <li>Name: <%= author.name %></li>
        </ul>
      </section>
    </main>
  </body>
</html>
```

<br>
<br>
<br>

Toward the bottom `controllers/authors.js`, we'll add a show controller:

```javascript
//avoid this handling /new by placing it towards the bottom of the file
router.get("/:id", (req, res) => {
  Author.findById(req.params.id, (err, foundAuthor) => {
    res.render("authors/show.ejs", {
      author: foundAuthor,
    })
  })
})
```

<br>
<br>
<br>

## Create Authors DELETE Route

1. `npm install method-override`
1. Use `method-override` in `server.js`:

```javascript
const methodOverride = require("method-override")

app.use(methodOverride("_method"))
```

<br>
<br>
<br>

Inside of `controllers/authors.js`, we'll define our delete controller:

```javascript
router.delete("/:id", (req, res) => {
  Author.findByIdAndRemove(req.params.id, () => {
    res.redirect("/authors")
  })
})
```

<br>
<br>
<br>

Let's make sure to use the `_method` URL param to make the delete button work in `views/authors/show.ejs`:

```html
<section>
  <form action="/authors/<%= author._id %>?_method=DELETE" method="POST">
    <input type="submit" value="Delete Author" />
  </form>
</section>
```

<br>
<br>
<br>

## Create Authors Edit Page

Create a link inside of`views/authors/show.ejs`:

```html
<section>
  <a href="/authors/<%= author._id %>/edit">Edit</a>
</section>
```

<br>
<br>
<br>

Let's define the edit controller inside of `controllers/authors.js` like this:

```javascript
router.get("/:id/edit", (req, res) => {
  Author.findById(req.params.id, (err, foundAuthor) => {
    res.render("authors/edit.ejs", {
      author: foundAuthor,
    })
  })
})
```

<br>
<br>
<br>

Next, we'll create an edit page with `touch views/authors/edit.ejs`, and add this markup to it:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Express Blog</title>
  </head>

  <body>
    <header>
      <h1>Edit <%= author.name %>'s Info</h1>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/authors">Authors Index</a>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <h2>Author Attributes:</h2>
      <form action="/authors/<%= author._id %>?_method=PUT" method="POST">
        <input type="text" name="name" value="<%= author.name %>" /><br />
        <input type="submit" value="Update Author" />
      </form>
    </main>
  </body>
</html>
```

<br>
<br>
<br>

## Create Authors PUT Route

Now we just need to define our update controller inside of `controllers/authors.js`:

```javascript
router.put("/:id", (req, res) => {
  Author.findByIdAndUpdate(req.params.id, req.body, () => {
    res.redirect("/authors")
  })
})
```
