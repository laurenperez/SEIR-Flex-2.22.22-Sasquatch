---
track: "Backend Fundamentals"
title: "Authentication with Bcrypt and Sessions"
week: 9
day: 1
type: "lecture"
---

# Intro to Express Sessions and Bcrypt

<br>
<br>
<br>

## Lesson Objectives

1. Explain what is `Bcrypt`
1. Explain why we need environmental variables
1. Explain what a session is
1. Use express-session package as middleware
1. Save user information on the session object
1. Retrieve user information saved on the session object
1. Update user information saved on the session object
1. Destroy the session

<br>
<br>
<br>

## Explain what a session is

Cookies are little strings of data that get stored on your computer so that, when you return to a web page, it will remember what you did the last time you were there. You can specify how long a cookie will stay around on a browser before it "expires" or is deleted. This can be a specific date, or it can end as soon as the user closes their browser.

<br>

The problem with cookies is that if you store sensitive information in them (usernames, etc), someone could take the computer and view this sensitive information just by opening up the web browser. Sessions are basically cookies, but the server stores the sensitive info in its own memory and passes an encrypted string to the browser, which gets stored in the cookie. The server then uses this encrypted string to know what was saved on the user's computer.

<br>

Sessions typically only last for as long as the user keeps their window open, and aren't assigned a specific date to expire. **BE CAREFUL: IF YOU RESTART YOUR SERVER, IT WILL LOSE ALL MEMORY OF THE SESSIONS IT CREATED, AND USERS' SESSIONS WILL NOT WORK**

<br>
<br>
<br>

## Set up environmental variables

We need a way to protect our sensitive information and a way to store environmental variables that are specific to our computer (in contrast to a co-workers computer or the environment in a cloud service).

<br>

Typically we'll have a `.gitignore` file to help with this. Sometimes this is a global file, sometimes we add is per-project. This file tells git which files to ignore when tracking our files. In there it states to never track `node_modules` nor `.env` - that way our values stay safely on our machines.

<br>

Before we dive into adding express sessions to an app, let's just get some practice with them:

<br>

- `mkdir auth-sessions-demo`
- `touch server.js`
- `npm init -y`
- `npm install express express-session bcrypt dotenv`
- `touch .env`

<br>
<br>
<br>

## Set up ENV Variables

In `.env`:

```shell
PORT=3000
SECRET=feedmeseymour
```

We'll be using this `SECRET` value soon. In general, it should be a completely random string. You do not want to copy this value from app to app or your stuff can get hacked. Feel free to jazz up your secret now if you like!

<br>
<br>
<br>

## Set up Basic Express Server

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

## Configure express-session Middleware

In `server.js`:

```js
// Dependencies
const session = require("express-session")
```

<br>
<br>

```js
// Middleware
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
)
```

<br>

More info on the default resave value: [https://www.npmjs.com/package/express-session#resave](https://www.npmjs.com/package/express-session#resave)

More info on the default saveUninitialized value: [https://www.npmjs.com/package/express-session#resave](https://www.npmjs.com/package/express-session#resave)

<br>
<br>
<br>

## Save user information on the session object

For each of the routes you create, the `req` variable will now have a session property which is itself an object. You can put things on this.

In `server.js`:

```js
// Routes / Controllers
app.get("/any", (req, res) => {
  req.session.anyProperty = "any value"
  res.send("This is the route that sets the value of req.session.anyProperty")
})
```

<br>
<br>
<br>

## Retrieve user information saved on the session object

Once you add a property onto the session object, you can retrieve it when a user navigates to any other route. Then you can use it to make decisions based on the design of your application. Remember though, this session will end when the user closes their browser, or you restart your server app.

```js
// Routes / Controllers
app.get("/retrieve", (req, res) => {
  if (req.session.anyProperty === "something you want it to") {
    //test to see if that value exists
    //do something if it's a match
    res.send("it matches! cool")
  } else {
    //do something else if it's not
    res.send("nope, not a match")
  }
})
```

<br>
<br>
<br>

**STOP! Check your work.**

<br>

We could use Postman, but these are all `GET` routes, so let's just check in the browser.

<br>

1. First, navigate to [http://localhost:3000/any](http://localhost:3000/any)
1. Then navigate to [http://localhost:3000/retrieve](http://localhost:3000/retrieve) \
   You should see `nope, not a match` in the browser

<br>
<br>
<br>

## Update user information saved on the session object

You can overwrite a session value somewhere else too, just like any other property on a normal JS object.

In `server.js`:

```js
// Routes / Controllers
app.get("/update", (req, res) => {
  req.session.anyProperty = "something you want it to"
  res.send("This is the route that updates req.session.anyProperty")
})
```

<br>

**STOP! Check your work.**

<br>

1. First, navigate to [http://localhost:3000/update](http://localhost:3000/update)
1. Then navigate to [http://localhost:3000/retrieve](http://localhost:3000/retrieve) \
   You should see `it matches! cool` in the browser

<br>

Take a moment to think about how we could use what we've learned so far for user authentication and restricting routes. Well dive into that soon, but setting, getting, and updating our session values and and using conditionals in our routes are the fundamentals that play into it.

<br>
<br>
<br>

## Destroy the session

Lastly, you can forcibly destroy a session before a user closes their browser window. **_(Logout? Hint hint!)_**

In `server.js`:

```js
// Routes / Controllers
app.get('/destroy', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.send(error);
        } else {
            res.send({
                success: true;
            });
        }
    });
});
```

<br>
<br>
<br>

**STOP! Check your work.**

<br>

First, navigate to [http://localhost:3000/destroy](http://localhost:3000/destroy) \
You should see `success: true` in the browser.

<br>
<br>
<br>

# Express - Authentication Continued: Bcrypt

## Lesson Objectives

1. Explain what `bcrypt` does
1. Include `bcrypt` package
1. Hash a string using `bcrypt`
1. Compare a string to a hashed value to see if they are the same

<br>
<br>
<br>

## Explain what bcrypt does

bcrypt is a package that will encrypt passwords so that if your database gets hacked, people's passwords won't be exposed.

<br>
<br>
<br>

## Include bcrypt package

In `server.js`:

```js
// Dependencies
const bcrypt = require("bcrypt")
```

<br>
<br>
<br>

## Hash a string using bcrypt

bcrypt does this thing called "salting" a string. It requires you to generate a salt which is used in the encryption process. This must be generated each time you hash a string. If you don't do this, the same string will get hashed to the same value each time. If this were to happen, someone with a common password could hack the database and see who else's hashed password had the same value as theirs and know that they have the same password as them.

<br>
<br>
<br>

Here's the code for hashing a string:

```js
const hashedString = bcrypt.hashSync("yourStringHere", bcrypt.genSaltSync(10))
```

<br>
<br>
<br>

Let's add it to a route to see how it works:

```js
// Routes / Controllers
app.get("/hashed", (req, res) => {
  const hashedString = bcrypt.hashSync("example", bcrypt.genSaltSync(10))
  res.send(hashedString)
})
```

<br>

**STOP! Check your work.**

<br>
<br>

1. Navigate to [http://localhost:3000/hashed](http://localhost:3000/hashed) \
   You should see a hashed string in the browser. Something like this: `$2b$10$97Gy8GBjTJsggdeUpfGcsud6urcaUP2YntkL4y3lAUaFn2.nr/Yxq`
1. Refresh your page. \
   Notice how your hashed string changed, even though we're still passing in the same `example` string.

## Compare a string to a hashed value to see if they are the same

Because the same string gets encrypted differently every time, we have no way of actually seeing what the value of the string is. We can compare it to another string and see if the two are "mathematically" equivalent.

<br>
<br>
<br>

Here's the code to compare a string:

```js
bcrypt.compareSync("yourGuessHere", hashedString)
```

This evaluates to true or false.

<br>
<br>
<br>

Let's create a route to see how it works:

```js
// Routes / Controllers
app.get("/compare", (req, res) => {
  const hashedString = bcrypt.hashSync("example", bcrypt.genSaltSync(10))
  const isSameString = bcrypt.compareSync("yourGuessHere", hashedString)
  res.send(isSameString)
})
```

<br>
<br>
<br>

**STOP! Check it out**

<br>

Navigate to [http://localhost:3000/compare](http://localhost:3000/compare) \
You should see `false` in the browser, because 'example' is not the same as 'yourGuessHere`.

<br>

Let's update our code to make it return true. Change `yourGuessHere` to `example` the guess will match our already hashed string:

```js
// Routes / Controllers
app.get("/compare", (req, res) => {
  const hashedString = bcrypt.hashSync("example", bcrypt.genSaltSync(10))
  // const isSameString = bcrypt.compareSync('yourGuessHere', hashedString)
  const isSameString = bcrypt.compareSync("example", hashedString)
  res.send(isSameString)
})
```

<br>

**STOP! Check it out**

<br>

Navigate to [http://localhost:3000/compare](http://localhost:3000/compare) \
You should see `true` in the browser, because 'example' is the same as 'example`

Take a moment to think about how bcrypt can help us protect users passwords (we should never store an un-hashed password in our database) and how it can help us check to make sure the password a user is trying to log in with matches the hashed password we have stored in the database.

<br>
<br>
<br>

## References

- [Bcrypt in a little more depth - Thanks Eric Lewis!](https://www.dailycred.com/article/bcrypt-calculator)

- [Express Session Middleware](https://www.npmjs.com/package/express-session)
- [Express.js Docs on Session Middleware](https://expressjs.com/en/resources/middleware/session.html)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
