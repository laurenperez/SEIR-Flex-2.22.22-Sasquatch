---
track: "React Fundamentals"
title: "Create an API in Express"
week: 13
day: 1
type: "lecture"
---

# Create an API in Express

<br>

So now that you've spent time learning how to build a standalone front-end application with React, the next step is to learn how to use Express to build a JSON API.

<br>
<br>
<br>

## Why Build An API?

The beauty of a JSON API is its reusability. Instead of building an App with server-side rendered pages you render routes that deliver and receive JSON.

These routes can work with:

- Front-end web applications
- Mobile applications
- Desktop application
- Internet enabled devices

Even better, these APIs can be used by other developers to create applications around your application (Think of all the apps built around facebook, twitter, etc.).

<br>
<br>
<br>

## Getting Started

- Create a new empty folder (not inside another repo) called `turtles_api`

- Create a filed called server.js `touch server.js`

- Open your terminal in this folder and create a new node project `npm init -y`

- Install express & nodemon `npm install express nodemon`

- Update your scripts in package.json

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

<br>
<br>
<br>

## server.js just getting a server running

Let's first just sketch out the basics of our `server.js` so that way a server can run.

```js
/////////////////////////
// DEPENDENCIES
/////////////////////////
const express = require("express")

/////////////////////////
// The Application Object
/////////////////////////
const app = express()

/////////////////////////
// Routes
/////////////////////////

// home route that says "hello world" to test server is working
app.get("/", (req, res) => {
  //res.json let's us send a response as JSON data
  res.json({
    response: "Hello World",
  })
})

/////////////////////////
// Listener
/////////////////////////
// We chose a non 3000 port because react dev server uses 3000 the highest possible port is 65535
// Why? cause it's the largest 16-bit integer, fun fact!
// But because we are "elite" coders we will use 1337
app.listen(1337, () => console.log("Listening on port 1337"))
```

<br>
<br>
<br>

- Go to `localhost:1337`

If so, you've successfully created an API!

<br>
<br>
<br>

## Let's talk Turtles...

Now creating an API that sends "Hello World" as `JSON` isn't the most valuable thing in the world but it is an API. Let's build something more interesting. An API of famous turtles.

- Will be able to Create, Read, Update and Delete a turtle
- We will use a static array, so if the server restarts so will the data, keep in mind

<br>
<br>
<br>

### The Data

Let's add our array with starter data to our code below the Application Object

<br>
<br>

`server.js`

```js
/////////////////////////
// The Data
/////////////////////////
const turtles = [
  { name: "Leonardo", role: "ninja" },
  { name: "Michaelangelo", role: "ninja" },
  { name: "Donatello", role: "ninja" },
  { name: "Raphael", role: "ninja" },
]
```

<br>
<br>
<br>

## Index Route

Let's add an index route that will return the list of turtles as `JSON`.

```js
/////////////////////////
// Routes
/////////////////////////

// home route that says "hello world" to test server is working
app.get("/", (req, res) => {
  //res.json let's us send a response as JSON data
  res.json({
    response: "Hello World",
  })
})

// Turtles Index Route (Send All Turtles)
app.get("/turtles", (req, res) => {
  // send the turtles array as JSON
  res.json(turtles)
})
```

<br>

Go to `localhost:1337/turtles` and test route

<br>
<br>
<br>

## Show Route

Let's create a route where we can fetch an individual turtle. This often won't be needed in our React app since the full list of data is often stored in State and we can pull individual items from there, but still nice to have in case.

```js
// Turtles Show Route (Send One Turtle)
app.get("/turtles/:index", (req, res) => {
  // send turtle as json
  res.json(turtles[req.params.index])
})
```

<br>
<br>
<br>

Head over to `localhost:1337/turtles/1` and `/2`, `/3`, `/4` and make sure you get the expected responses.

<br>
<br>
<br>

### Create Route

Now to create a post route in which we can send a json body and create a new turtle. To receive a `JSON` body we will need middleware to parse it, this will be `express.json()`.

This is similar to how we used `express.urlencoded` to parse data from form submission when we server rendered the pages.

```js
/////////////////////////
// The Application Object
/////////////////////////
const app = express()

/////////////////////////
// MIDDLEWARE
/////////////////////////

app.use(express.json())
```

<br>
<br>
<br>

Now we can add the post route!

```js
// Turtles Index Route (Send All Turtles)
app.post("/turtles", (req, res) => {
  // push the request body into the array
  turtles.push(req.body)
  // send the turtles array as JSON
  res.json(turtles)
})
```

<br>
<br>
<br>

### Testing the Post Route

We can't test this route in the browser since a browser cannot make post requests from putting a url in the url bar. Luckily, we have postman!

- Open postman

- Open a new tab

- Set the method to `post`

- Set the url to `http://localhost:1337/turtles`

- Choose `raw` for body and select `json` for your datatype and send the following

```json
{
  "name": "Filbert",
  "role": "Rocco's Friend"
}
```

<br>

Submit the request and confirm whether you see Filbert with the other turtles!

<br>
<br>
<br>

## The Update Route

Let's make another route to update a turtle.

```js
// Turtles Update Route
app.put("/turtles/:index", (req, res) => {
  // replace the turtle at the specified index with the request body
  turtles[req.params.index] = req.body
  // send the turtles array as JSON
  res.json(turtles)
})
```

<br>
<br>
<br>

Make a put request to `localhost:1337/turtles/0` make sure to pass Filbert as `JSON`, Filbert should end up replacing Leonardo.

<br>
<br>
<br>

## The Delete Route

A route to delete a turtle, since we're dealing with a simple array we can use the splice method to remove the desired turtle.

```js
// Turtles delete Route
app.delete("/turtles/:index", (req, res) => {
  // remove the turtle at the specifed index
  turtles.splice(req.params.index, 1)
  // send the turtles array as JSON
  res.json(turtles)
})
```

<br>
<br>
<br>

Send a delete request to `localhost:1337/turtles/1` and Michaelangelo should dissapear

<br>
<br>
<br>

## Conclusion

When express is only managing the Controllers and Models part of MVC, life gets a lot easier in the backend.

Although, the tradeoff managing the state in our front-end get more complicated, no perfect solution.
