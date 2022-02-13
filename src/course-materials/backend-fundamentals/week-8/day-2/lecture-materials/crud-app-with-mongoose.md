---
track: "Backend Fundamentals"
title: "CRUD App with Mongoose - Create and Read"
week: 8
day: 2
type: "lecture"
---

# Book List CRUD App with Mongoose - Create & Read

<br>
<br>
<br>

## Lesson Objectives

1. Review the flow of technology
1. Initialize a directory
1. Start express
1. Create New Route
1. Create Create Route
1. Connect Express to Mongo
1. Create Book Model
1. Have Create Route Create data in MongoDB
1. Create Index Route
1. Have Index Route Render All Books
1. Have Create Route redirect to Index After Book Creation
1. Create Show Route
1. Have Index Page Link to Show Route
1. Create show.ejs

<br>
<br>
<br>

## Review the flow of technology

![](https://i.imgur.com/mx6edUc.png)

## Initialize a directory

1. `mkdir booklist`
1. `cd booklist`
1. `touch server.js`
1. `code .`
1. `npm init -y`
1. `npm install express dotenv`
1. `touch .env`

Remember to add a .gitignore with node_modules if you don't have a global .gitignore.

<br>
<br>
<br>

## Add The PORT Variable to .env

```shell
PORT=3000
```

<br>
<br>
<br>

## Create Your Basic Express Server

```js
// Dependencies
const express = require("express")
const app = express()
require("dotenv").config()

// Listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`))
```

Stop! Check your work!

<br>
<br>
<br>

## Connect Express to MongoDB Atlas

1. `npm install mongoose`
1. Navigate to [MongoDB.com](https://www.mongodb.com/) and create a new database or get prepapred to use an old one.
1. Add your connection string to your .env file (do not copy and paste this one) then update the sub-database to use `booklist` like we've done in the connection string example below

<br>
<br>
<br>

Inside `.env`

```shell
DATABASE_URL=mongodb+srv://<username>:<password>@general-assembly.1wjse.mongodb.net/booklist?retryWrites=true&w=majority
```

Inside `server.js`, connect to your database

```js
// Dependencies
const mongoose = require("mongoose")

// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on("error", (err) => console.log(err.message + " is mongo not running?"))
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo disconnected"))
```

Stop! Check your work!

<br>
<br>
<br>

## Create Create Route

```js
// Create
app.post("/books", (req, res) => {
  res.send("received")
})
```

Stop! Check your work with Postman.

<br>
<br>
<br>

## Set Up Your Body Parser Middleware

```js
// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }))
```

```javascript
app.post("/books", (req, res) => {
  res.send(req.body)
})
```

Stop! Check your work with Postman

Let's add:

title: Cracking the Coding Interview \
author: Gayle Laakmann McDowell

<br>
<br>
<br>

## Format Checkbox Data Properly

In `server.js`:

```javascript
app.post("/books", (req, res) => {
  if (req.body.completed === "on") {
    //if checked, req.body.completed is set to 'on'
    req.body.completed = true
  } else {
    //if not checked, req.body.completed is undefined
    req.body.completed = false
  }
  res.send(req.body)
})
```

Stop! Check your work again by resending the previous request.

<br>
<br>
<br>

## Create Books Model

1. `mkdir models`
1. `touch models/book.js`
1. Create the book schema

In `models/book.js`:

```js
const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  completed: Boolean,
})

const Book = mongoose.model("Book", bookSchema)

module.exports = Book
```

<br>
<br>
<br>

## Have Create Route Create data in MongoDB

Inside `server.js`:

```javascript
// Dependencies
const Book = require("./models/book.js")

// Routes / Controllers
// Create
app.post("/books", (req, res) => {
  if (req.body.completed === "on") {
    //if checked, req.body.completed is set to 'on'
    req.body.completed = true
  } else {
    //if not checked, req.body.completed is undefined
    req.body.completed = false
  }

  Book.create(req.body, (error, createdBook) => {
    res.send(createdBook)
  })
})
```

Stop! Check your work with Postman.

<br>
<br>
<br>

## Create The New Page Route

Remember INDUCES _(index, new, delete, update, create, edit, show)_ to help organize your routes and avoid any conflicts.

```js
// Routes / Controllers
// New
app.get("/books/new", (req, res) => {
  res.send("new")
})
```

<br>
<br>
<br>

## Create The New View

1. `npm install ejs`
1. `mkdir views`
1. `touch views/new.ejs`

In `views/new.ejs`:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Book List</title>
	</head>
	<body>
		<h1>New Book Page</h1>
		<form action="/books" method="POST">
			Title: <input type="text" name="title" /><br />
			Author: <input type="text" name="author" /><br />
			Completed: <input type="checkbox" name="completed" /><br />
			<input type="submit" name="" value="Add Book" />
		</form>
	</body>
	</body>
</html>

```

<br>
<br>
<br>

## Render the view

```js
// Routes / Controllers
// New
app.get("/books/new", (req, res) => {
  res.render("new.ejs")
})
```

Stop! Check your work! Is the view working?
We'll check the form functionality soon!

<br>
<br>
<br>

## Create The Index Route

Remember INDUCES

In `server.js`:

```js
// Index
app.get("/books", (req, res) => {
  res.send("index")
})
```

Stop! Check your work.

<br>
<br>
<br>

## Create The Index View

`touch views/index.ejs`

In `views/index.ejs`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Book List</title>
  </head>
  <body>
    <h1>My Reading List</h1>
  </body>
</html>
```

<br>
<br>
<br>

## Render The Index View

```js
// Index
app.get("/books", (req, res) => {
  res.render("index.ejs")
})
```

<br>
<br>
<br>

## Have Index Route Pass Book Data to the View

```javascript
// Index
app.get("/books", (req, res) => {
  Book.find({}, (error, allBooks) => {
    res.render("index.ejs", {
      books: allBooks,
    })
  })
})
```

We could just res.send allBooks and check with Postman, but we're getting confident and bold! Let's stick with a render for now and check it in a moment.

<br>
<br>
<br>

## Update the Index View to Display All Books:

In `views/index.ejs`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
  </head>
  <body>
    <h1>Books index page</h1>
    <ul>
      <% books.forEach(book => { %>
      <li><%=book.title; %></li>
      <% }) %>
    </ul>
  </body>
</html>
```

We could use any type of loop we want, but the forEach loop reads really nicely!

<br>
<br>
<br>

## Add a Link to the Create Page Above Your h1:

In `views/index.ejs`:

```html
<nav>
  <a href="/books/new">Add a New Book</a>
</nav>
```

<br>
<br>
<br>

## Update Your Create Route redirect to Index After Book Creation

In `server.js`:

```js
Book.create(req.body, (error, createdBook) => {
  res.redirect("/books")
})
```

Stop! Check your work. Navigate to your form.

Let's add:

title: You don't know JS Yet \
author: Kyle Simpson

We should be redirected to /books and see our new book there. Success? Awesome! Error? Take a moment to fix it.

<br>
<br>
<br>

## Have Index Page Link to Show Route

In `views/index.ejs`:

```html
<li>
  <a href="/books/<%=book._id; %>"> <%=book.title; %> </a>
</li>
```

Notice how we have to put an underscore before id. That's a MongoDB convention.

Stop! Check your work. Click one of the links and make sure it redirects you to the right place.

<br>
<br>
<br>

## Create Show Route

Remember INDUCES

```js
// Show
app.get("/books/:id", (req, res) => {
  Book.findById(req.params.id, (err, foundBook) => {
    res.send(foundBook)
  })
})
```

Stop! Check your work.

<br>
<br>
<br>

## Create A Show Page

`touch views/show.ejs`

In `views/show.ejs`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <nav>
      <a href="/books">Back to Books Index</a>
    </nav>
    <h1><%=book.title %></h1>
    Author: <%= book.author%>
    <br />
    Completed: <%= book.completed %>
  </body>
</html>
```

<br>
<br>
<br>

## Render the Show Page

```js
// Show
app.get("/books/:id", (req, res) => {
  Book.findById(req.params.id, (err, foundBook) => {
    res.render("show.ejs", {
      book: foundBook,
    })
  })
})
```

Final stop! Check your work :)
