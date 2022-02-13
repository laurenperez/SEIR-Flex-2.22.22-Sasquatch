---
track: "Backend Fundamentals"
title: "MEEN Auth Template Build - Part 2"
week: 9
day: 1
type: "lecture"
---

# MEEN Auth Template Build - Part 2

<br>
<br>
<br>

We've completed the core functionality for our app, but we still have some work to do. We still need:

- Index View
- Navigation Partial
- Login View
- Register View
- Protected Dashboard View

Let's start of simple:

<br>
<br>
<br>

## Create The Index View

- `mkdir views`
- `touch views/index.ejs`

In `views/index.ejs`:

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
    <h1>Home</h1>
  </body>
</html>
```

<br>
<br>
<br>

## Render the Index View

In `server.js`:

```js
// Routes / Controllers
app.get("/", (req, res) => {
  res.render("index.ejs")
})
```

<br>
<br>
<br>

## Create the Nav Partial

- `mkdir views/partials`
- `touch views/partials/nav.ejs`

In `views/partials/nav.ejs`:

```html
<nav>
  <a href="/">Home</a>
  <a href="/users/new">Register</a>
  <a href="/sessions/new">Login</a>
</nav>
```

<br>
<br>
<br>

## Update Index View to Render Nav Partial

In `views/index.ejs`:

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
    <%- include('./partials/nav.ejs') %>
    <h1>Home Page</h1>
  </body>
</html>
```

<br>
<br>
<br>

**STOP! Check your work.**

<br>
<br>

Navigate to [http://localhost:3000/](http://localhost:3000/). You should see your nav links and your `h1` tag.

## Create the Login View

- `mkdir views/sessions`
- `touch views/sessions/new.ejs`

<br>
<br>
<br>

In `views/sessions/new.ejs`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MEEN Auth Starter</title>
  </head>

  <body>
    <%- include('../partials/nav.ejs') %>
    <h1>Login</h1>
    <form action="/sessions" method="POST">
      <label for="email">Email:</label>
      <input type="email" name="email" id="email" />

      <label for="password">Password:</label>
      <input type="password" name="password" id="password" />

      <input type="submit" value="Login" />
    </form>
  </body>
</html>
```

If you copied and pasted this code over, remember the `name` attribute on the form inputs needs to be the same as the `req.body` field that form value will be filling.

The `id` attribute on the form inputs needs to match the `for` attribute on the labels.

## Render the Login View

Remember INDUCES!

In `controllers/sessions.js`:

```js
// New (login page)
sessionsRouter.get("/new", (req, res) => {
  res.render("sessions/new.ejs")
})
```

**STOP! Check your work.**
We've already coded out the login functionality. Go ahead and try logging in from the browser. If it works, you should be redirected to the browser. If it doens't work, come off mute and let's debug!

## Create the Register View

- `mkdir views/users`
- `touch views/users/new.ejs`

<br>

In `views/users/new.ejs`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MEEN Auth Starter</title>
  </head>

  <body>
    <%- include('../partials/nav.ejs') %>
    <h1>Register</h1>
    <form action="/users" method="POST">
      <label for="email">Email:</label>
      <input type="email" name="email" id="email" />

      <label for="password">Password:</label>
      <input type="password" name="password" id="password" />

      <input type="submit" value="Register" />
    </form>
  </body>
</html>
```

If you copied and pasted this code over from the markdown or from your login page, remember to read through line by line to update it!

<br>
<br>
<br>

## Render the Registration View

Remember INDUCES!

In `controllers/users.js`:

```js
// New (registration page)
userRouter.get("/new", (req, res) => {
  res.render("users/new.ejs")
})
```

<br>

**STOP! Check your work.**

<br>

Create a new user from the browser, using a new email address. \
If it works, you should be redirected to the index page.

<br>
<br>
<br>

## Refactor Routes that Render Views to Include Current User Data

In `controllers/sessions.js`:

```js
// New (login page)
sessionsRouter.get("/new", (req, res) => {
  res.render("sessions/new.ejs", {
    currentUser: req.session.currentUser,
  })
})
```

<br>
<br>

In `controllers/users.js`:

```js
// New (registration page)
userRouter.get("/new", (req, res) => {
  res.render("users/new.ejs", {
    currentUser: req.session.currentUser,
  })
})
```

In `server.js`:

```js
app.get("/", (req, res) => {
  res.render("index.ejs", {
    currentUser: req.session.currentUser,
  })
})
```

<br>
<br>
<br>

## Update Nav Partial with Conditional Rendering and Logout Button

In `views/partials/nav.ejs`:

```html
<nav>
  <% if(currentUser) { %>
  <a href="/">Home</a>
  <form action="/sessions?_method=DELETE" method="POST">
    <input type="submit" value="Log Out" />
  </form>
  <% } else { %>
  <a href="/">Home</a>
  <a href="/users/new">Register</a>
  <a href="/sessions/new">Login</a>
  <% } %>
</nav>
```

<br>
<br>
<br>

## Create a Logout Route

Remember INDUCES!

Inside of `controllers/sessions.js`, we can add:

```js
sessionsRouter.delete("/", (req, res) => {
  req.session.destroy((error) => {
    res.redirect("/")
  })
})
```

<br>
<br>
<br>

**STOP! Check your work.**
<br>

Log in, then try logging out.

<br>
<br>
<br>

## UH OH! Time to debug!

Let's make note of all the clues we're given.
We're getting `Oops! No user with that email address has been registered.` back in the browser.

<br>

Where is this coming from?

<details>
	<summary><strong>Click For Answer</strong></summary>
	It's coming from our <code>controllers/sessions.js</code> - specifically from our CREATE route. 
</details>

<br>
<br>
<br>

Why is this happening?

<details>
	<summary><strong>Click For Answer</strong></summary>
	For some reason, our delete form is hitting our Create Route.
	They are both going to <code>/</code> but the only way this could possibly happen is if it were sending a <code>POST</code> request. Hint Hint! 
</details>

<br>
<br>
<br>

How can we fix this?

<details>
	<summary><strong>Click For Answer</strong></summary>

<br>
<br>
<br>

In `server.js`:

```js
// Dependencies
const methodOverride = require("method-override")

// Middleware
app.use(methodOverride("_method"))
```

</details>

<br>
<br>
<br>

**STOP! Check your work.**

<br>
<br>
<br>

## Create a Dashboard View

Our Dashboard is going to be the protected index page. So let's create this view at the root of our views directory, along side our `index.ejs`

- `touch views/dashboard.ejs`

In `views/dashboard.ejs`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MEEN Auth Starter</title>
  </head>

  <body>
    <%- include('./partials/nav.ejs') %>
    <h1>Dashboard</h1>
  </body>
</html>
```

<br>
<br>
<br>

## Render the Dashboard View

We've decided we want to render the index view IF the user is logged out and we want to render the dashboard view IF the user is logged in.

In `server.js`:

```js
app.get("/", (req, res) => {
  if (req.session.currentUser) {
    res.render("dashboard.ejs", {
      currentUser: req.session.currentUser,
    })
  } else {
    res.render("index.ejs", {
      currentUser: req.session.currentUser,
    })
  }
})
```

<br>
<br>
<br>

**STOP! Check your work.**

<br>

- Navigate to [http://localhost:3000/](http://localhost:3000/)
- Use the navbar to navigate to your login page
- Login - you should be redirected to the dashboard page
- Logout - you should be redirected to the index page

<br>
<br>
<br>

## Create a Template Repo!

- Push your work up to github
- Navigate to your repo on github.com then navigate to the repo settings
- Click the box to turn it into a template repo

<br>

Now you'll be able to scaffold a brand new app with auth built out whenever you like.

<br>
<br>
<br>

# Hungry For More

It's usually a good idea to keep your templates as minimal as possible, so they're easy to build upon when you use them. But there's still plenty of work we could do to really polish this template. For example, you could start by adding a `head.ejs` partial for all that repetitive `<head>` code. You can also clean up the functionality so the app runs a little more smoothly. Consider updating your code so after a user registers for an account they're automatically logged in and redirected to their dashboard.

Feel free to DRY it out and jazz it up as you see fit!
