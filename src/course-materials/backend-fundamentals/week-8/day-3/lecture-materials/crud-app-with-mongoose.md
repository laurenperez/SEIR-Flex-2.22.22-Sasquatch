---
track: "Backend Fundamentals"
title: "CRUD App with Mongoose - Delete and Update"
week: 2
day: 2
type: "lecture"
---

# Book List CRUD App with Mongoose - Delete & Update

<br>
<br>
<br>

## Lesson Objectives

Deletion:

1. Create a Delete Button
1. Create a DELETE Route
1. Have the Delete Button send a DELETE request to the server
1. Make the DELETE Route Delete the data from MongoDB

Edit/Update:

1. Create a link to the edit route
1. Create an edit route
1. Create an PUT route
1. Have the edit page send a PUT request
1. Make the PUT Route Update the data in MongoDB
1. Make the PUT Route Redirect Back to the Index Page

<br>
<br>
<br>

## Create a Delete Button

In your index.ejs file, update the li item which is created for each data entry to include a delete form:

```html
<% books.forEach(book => { %>
<li>
  <a href="/books/<%=book._id %>"> <%=book.title %> </a>
  <form>
    <input type="submit" value="DELETE" />
  </form>
</li>
<% }) %>
```

<br>
<br>
<br>

## Create a Delete Route

Remember INDUCES (index, new, delete, update, create, edit show) to help keep your routes organized and avoid conflicts.

In server.js:

```js
app.delete("/books/:id", (req, res) => {
  res.send("deleting...")
})
```

<br>
<br>
<br>

## Have the Delete Button send a DELETE request to the server

When we click "DELETE" on our index page **(**`index.ejs`**)**, the form needs to make a DELETE request to our DELETE route.

The problem is that forms can't make DELETE requests. Only POST and GET. We can fake this, though. First we need to install an npm package called `method-override`

```shell
npm install method-override
```

Now, in our server.js file, add:

```javascript
// Dependencies
const methodOverride = require("method-override")

// Middleware
app.use(methodOverride("_method"))
```

Now go back and set up our delete form to send a DELETE request to the appropriate route. We're just updating the opening form tag.

```html
<form action="/books/<%= book.id %>?_method=DELETE" method="POST">
  <input type="submit" value="DELETE" />
</form>
```

<br>
<br>

STOP! Check your work. You should be able to visit one of your show pages to grab an ID that you know exists.

Next, try clicking one of the delete buttons and make sure you're getting the expected output of 'deleting...' sent in the browser.

<br>
<br>
<br>

## Make the Delete Route Delete the Document from MongoDB

Also, have it redirect back to the books index page when deletion is complete

In `server.js`:

```javascript
// Delete
app.delete("/books/:id", (req, res) => {
  Book.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/books")
  })
})
```

Hint: Deleted all your data? Remember you can hit your seed route `http://localhost:3000/books/seed` to re-populate your database! Isn't that so much easier than adding everything in manually from a form?

<br>
<br>
<br>

## Create a link to an edit route

In `index.ejs`:

```html
<% books.forEach(book => { %>
<li>
  <a href="/books/<%= book._id %>"> <%=book.title %> </a>
  <form action="/books/<%=book.id %>?_method=DELETE" method="POST">
    <input type="submit" value="DELETE" />
  </form>
  <a href="/books/<%=book._id %>/edit">Edit</a>
</li>
<% }) %>
```

STOP! Check your work. We don't have an edit view, but the link should be working.

<br>
<br>
<br>

## Create an Edit Route

Remember INDUCES!

In `server.js`:

```js
// Edit
app.get("/books/:id/edit", (req, res) => {
  Book.findById(req.params.id, (error, foundBook) => {
    res.render("edit.ejs", {
      book: foundBook,
    })
  })
})
```

<br>
<br>
<br>

## Create an Edit Page

Create an `edit.ejs` file

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
    <h1>Edit Book</h1>
    <form>
      <!--  NOTE: the form is pre-populated with values for the server-->
      Title: <input type="text" name="title" value="<%=book.title%>" /><br />
      Author: <input type="text" name="author" value="<%=book.author%>" /><br />
      Completed: <input type="checkbox" name="completed" <% if(book.completed
      === true){ %> checked <% } %> />
      <br />
      <input type="submit" value="Submit Changes" />
    </form>
  </body>
</html>
```

STOP! Check your work. Make sure the edit page is rendering properly.

<br>
<br>
<br>

## Create an Update Route (PUT)

Remember INDUCES!

In `server.js`:

```javascript
// Update
app.put("/books/:id", (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true
  } else {
    req.body.readyToEat = false
  }
  res.send(req.body)
})
```

<br>
<br>
<br>

## Have the edit page send a PUT request

In `edit.ejs`:

```html
<form action="/books/<%=book._id%>?_method=PUT" method="POST"></form>
```

<br>
<br>
<br>

## Make the PUT Route Update the Document in MongoDB and Redirect back to the Show Page

```javascript
// Update
app.put("/books/:id", (req, res) => {
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
```

<br>
<br>
<br>

**Stop! Check your work!**

<br>
<br>
<br>

## Congratulations! We now have a Delete and Update feature! 🎉

Hopefully, you now have a fully functional CRUD app with a real MONGODB database.

Normally, this is the point where we would want to delete our seed route. If you want to comment it out, go ahead! But you might want to keep it in your app for future reference.
