---
track: "Backend Fundamentals"
title: "MEEN Auth Template Build - Part 1"
week: 9
day: 1
type: "lecture"
---

# MEEN Auth Template Build - Part 1

As a Junior Developer, User Authentication is something you really shouldn't be working on just yet. But having some experince with it, and building projects with authentication looks really good on your resume and portfolio.

So, today we're going to build a template repo which will allow you to get up and running with Authenticatication without having to build it out every time you want to create a portfolio project with it.

And if you do want to code it out on your own, this template repo will provide great reference code as you do so!

<br>
<br>
<br>

Here's what we're going to create:

![example functionality](https://i.imgur.com/VenbpMj.gif)

<br>
<br>
<br>

## Set Up

Note: Your default branch on github might be set to 'main' if you want to make sure it's the same everywhere to avoid branching issues before we learn about branching, navigate to [https://github.com/settings/repositories](https://github.com/settings/repositories) and change your default branch to `master`

- On [github.com](https://github.com) NOT GHE, create a new repo called `meen-auth-starter` with a node `.gitignore` \
  You may already have a global .gitignore configured, but it never hurts to have a local one, and if someone else wants to use your template, they'll be all set up with the proper files ignored.
- Clone that repo down to your computer
- `cd meen-auth-starter`
- `touch server.js`
- `npm init -y`
- `npm install express express-session bcrypt dotenv mongoose ejs method-override`
- `touch .env`

<br>
<br>
<br>

## Add ENV Variables

In `.env`:

```shell
PORT=3000
DATABASE_URL=mongodb+srv://<username>:<password>@general-assembly.1wjse.mongodb.net/meen-auth-starter?retryWrites=true&w=majority
SECRET=feedmeseymour
```

- Remember to use your own `DATABASE_URL`. Copying the one above will not work. \
- Remember your `SECRET` should be a totally random string. This matters less in development, but it'll be important when you deploy your apps and have to add the variable to Heroku.

<br>
<br>
<br>

## Create a Basic Express Server

In `server.js`:

```js
// Dependencies
const express = require("express")
const app = express()
require("dotenv").config()

// Listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`))
```

<br>
<br>
<br>

## Configure the Database

In `server.js`:

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

Boot up your server. You should see:

```shell
server is listening on port: 3000
mongo connected
```

<br>
<br>
<br>

## User Stories

- AAU I should be able to navigate to a registration page and create an account
- AAU I should be able to navigate to a login page and login to my account
- AAU I should be able to navigate to a protected dashboard page when logged in
- AAU I should be redirected to the login page if I try to access the dashboard when logged out
- AAU I should be able to log out of my account

<br>
<br>
<br>

## Create the User Model

- `mkdir models`
- `touch models/user.js`

In `models/user.js`:

```js
// Dependencies
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// User Schema
const userSchema = Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
})

// User Model
const User = mongoose.model("User", userSchema)

// Export User Model
module.exports = User
```

<br>
<br>
<br>

## Create Users Controller

- `mkdir controllers`
- `touch controllers/users.js`

<br>
<br>
<br>

## Configure Users Controller as Middleware

Let's just take care of this now so it doesn't go forgotten. \
While we're here, let's also configure our `body-parser` middleware, since we're about to begin working with `req.body`

<br>
<br>
<br>

In `server.js`:

```js
// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }))

// Routes / Controllers
const userController = require("./controllers/users")
app.use("/users", userController)
```

<br>
<br>
<br>

## Add Dependencies to User Controller and Export Router

While we're here, let's also add some comments to remind ourselves which routes we'll need in this file. Remember INDUCES (Index, new, delete, update, create, edit, show) to help organize your routes and prevent conflicts.

<br>
<br>
<br>

In `controllers/users.js`:

```js
// Dependencies
const bcrypt = require("bcrypt")
const express = require("express")
const userRouter = express.Router()
const User = require("../models/user.js")

// New (registration page)

// Create (registration route)

// Export User Router
module.exports = userRouter
```

<br>
<br>
<br>

## Create Registration Route (Create / POST)

Before we do too much at once, let's just see if we can successfully hash the user's password.

In `controllers/users.js`:

```js
userRouter.post("/", (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  res.send(req.body)
})
```

<br>

**STOP! Check your work with postman**

<br>

Add an email and password (don't use any of your real passwords incase you need to share your screen) \
Has your password been hashed? Yes? Awesome! No? Take a moment to debug.

<br>
<br>
<br>

## Update Registration route to Create a User in the Database

In `controllers/users.js`:

```js
// Create (registration route)
userRouter.post("/", (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

  User.create(req.body, (error, createdUser) => {
    res.send(createdUser)
  })
})
```

**STOP! Check your work with Postman.**
This time, you should get back a MongoDB Entry

<br>
<br>
<br>

## Touch Up The Registration Route to Redirect to the Index Page

In `controllers/users.js`:

```js
// Create (registration route)
userRouter.post("/", (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

  User.create(req.body, (error, createdUser) => {
    res.redirect("/")
  })
})
```

<br>
<br>
<br>

## Configure Express Sessions

In `server.js`:

```js
// Dependencies
const session = require("express-session")

// Middleware
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
)
```

We've already added the `SECRET` variable to our `.env` file, so we should be good to go!

<br>
<br>
<br>

## Create Sessions Controller

Login (session creation)/ Logout (session destruction) functionaliy will be handled with express-session, so we'll have a separate controller for that.

- `touch controllers/sessions.js`

<br>
<br>
<br>

## Configure Sessions Controller as Middleware

Let's just take care of this now so it doesn't go forgotten.

In `server.js`:

```js
// Routes / Controllers
const sessionsController = require("./controllers/sessions")
app.use("/sessions", sessionsController)
```

<br>
<br>
<br>

## Require Dependencies in Sessions Controller

While we're here, let's also add some comments to remind ourselves which routes we'll need in this file. Remember INDUCES!

In `controllers/sessions.js`:

```js
// Dependencies
const express = require("express")
const bcrypt = require("bcrypt")
const sessionsRouter = express.Router()
const User = require("../models/user.js")

// New (login page)

// Delete (logout route)

// Create (login route)

// Export Sessions Router
module.exports = sessionsRouter
```

<br>
<br>
<br>

## Create Login Route (Create / POST)

Before we start coding, let's think this through a bit.

When a user tries to login, we need to check a few things.

1. First we want to check if the user exists in our database
   - If the user doesn't exist, return an error
   - If the user exists...
1. Compare the password they provided with the hashed password we have stored in the database
   - If the passwords don't match, return an error and ask the user to try again
   - If the passwords do match...
1. Create a new express session for the user (log them in)

Alright, let's baby step this!

<br>
<br>
<br>

In `controllers/sessions.js`:

```js
// Create (login route)
sessionsRouter.post("/", (req, res) => {
  // Check for an existing user
  User.findOne(
    {
      email: req.body.email,
    },
    (error, foundUser) => {
      // send error message if no user is found
      if (!foundUser) {
        res.send(`Oops! No user with that email address has been registered.`)
      } else {
        // If a user has been found
        // compare the given password with the hashed password we have stored
        const passwordMatches = bcrypt.compareSync(
          req.body.password,
          foundUser.password
        )

        // if the passwords match
        if (passwordMatches) {
          // add the user to our session
          req.session.currentUser = foundUser

          // redirect back to our home page
          res.redirect("/")
        } else {
          // if the passwords don't match
          res.send("Oops! Invalid credentials.")
        }
      }
    }
  )
})
```

<br>
<br>
<br>

**STOP! We have a lot of work to check.**

<br>

Let's do so with Postman:

1. Create a `POST` request to `http://localhost:3000/sessions`
1. Use an INCORRECT email address and an INCORRECT password to login \
   You should see `Oops! No user with that email address has been registered.`
1. Now use the CORRECT email address and an INCORRECT password \
   You should see `Oops! Invalid credentials.`
1. Now use the CORRECT email address and the CORRECT password \

<br>
<br>
<br>

This should redirect you to the index page. We don't yet have anything at that index route, so you should see:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Error</title>
  </head>

  <body>
    <pre>Cannot GET /</pre>
  </body>
</html>
```

<br>
<br>

Perfect! Now we can register and login a user.

## Create a Logout Route (Destroy / Delete)

In `controllers/sessions.js`:

```js
// Delete (logout route)
sessionsRouter.delete("/", (req, res) => {
  req.session.destroy((error) => {
    res.redirect("/")
  })
})
```

Delete routes are often pretty easy. Here we're deleting the session and redirecting to the index page.

**STOP! Check your work in Postman.**

Create a `DELETE` request to `http://localhost:3000/sessions`
Once again, this should redirect you to the index page. We don't yet have anything at that index route, so you should see:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Error</title>
  </head>

  <body>
    <pre>Cannot GET /</pre>
  </body>
</html>
```

<br>
<br>
<br>

Awesome! Now that our core functionality is built out, all we need is:

- Index View
- Navigation Partial
- Register View
- Login View
- Protected Dashboard View
