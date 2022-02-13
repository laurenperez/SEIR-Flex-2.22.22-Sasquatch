---
track: "Backend Fundamentals"
title: "Producing an API in Express"
week: 9
day: 3
type: "lecture"
---

# Producing an API in Express

<br>
<br>
<br>
<br>

# Learning Objectives

- Explain why we would want to add an API to an app

- Create name-spaced routes dedicated to an API

- Respond to API requests with JSON and appropriate status codes

<br>
<br>

# Roadmap

- Why expose API access to an app?
- Views not required
- Postman
- We need an Express app
- Install Mongoose and connect to a DB
- Model? Puppies, of course!
- API RESTful routes
- Proper response codes
- Set up the routes for the API
- Responding with JSON and a Status Code
- CORS
- Essential Questions

<br>
<br>

### Why expose API access to an app?

- Previously we made requests to third-party API endpoints. Now it's our turn to expose our own endpoints.

- Exposing an API in our own app enables:
  - Development of single-page applications (no full-page refreshes).
  - Our app's RESTful resources and functionality to be accessed by multiple front-ends (web, mobile and desktop).

<br>
<br>

### Views not required

- Our app's API routes will return JSON, not HTML views.

- This being the case, views do not apply when developing an API.

- However, the very same web app may send back HTML using views **and** send back JSON by exposing an API. They are not mutually exclusive.

<br>
<br>

### Postman

- In this lesson we'll be using an app called Postman that enables us to make any type of HTTP request, including sending along a data payload.

- It can be installed by [this download](https://www.getpostman.com/downloads/)

<br>
<br>
<br>

### 💪 We need an Express app

- If you haven't done so already, install the [express generator](https://www.npmjs.com/package/express-generator)

- This tool will make creating an express application much faster!

- Only follow the below commands if you haven't installed the generator, otherwise we'll go straight to creating the application.

```shell
$ npm install -g express-generator
```

- Generate an Express app named `puppies-api`.

Now that we have the build tool, we can quickly generate an app with the following command:

```shell
$ express puppies-api --view=ejs
```

The express generator provides us with the `express` command, then we simply provide two arguments:

- The name of our application - in this case: `puppies-api`
- The view engine flag - in this case, we'll specify the `ejs` view engine `--ejs`

> Keep in mind, the app design we get from the express generator is a slightly older suggestion/opinion from the original creators of the express framework. There is really no right or wrong way to build a web server with express, just suggestions/opinions and best practices based on use case. The only benefit of using the express generator is time saved. Although there may seem to be some slight differences, the performance and functionality of a "generated app" is the same as if we'd built it from "scratch".

- The last thing we need to do is `cd` into `puppies-api` and install the `node-modules` with `npm install` - _(The Express generator does not automatically install them)._

<br>
<br>

### 💪 Install Mongoose and connect to a DB

- Create a `config/database.js` module.

- Install **Mongoose** and connect to a database named `puppies`.

- Reminder: The code in the `database.js` module won't ever run unless...

<br>
<br>

### 💪 Model? Puppy, of course!

- You're on a roll so keep on rolling!

- Create a schema/model named `Puppy` with the following properties:
  - **name**: `String` / required
  - **breed**: `String` / default to "Mixed"
  - **age**: `Number` / default to 0

<br>
<br>
<br>

### 💪 Test the Model (Time Permitting)

- If you have the time, test the code by creating a puppy or two in a Node REPL. <br>[Here are instructions how](https://gist.github.com/myDeveloperJourney/1f3c01e199913b09e90988dce3384bb1)

<br>
<br>
<br>

### API RESTful routes

- Setting up the API's routes on the server will be very similar to how we've set up non-API routes.

- However, it's a best practice to "namespace" API related routes & code.

- Let's start by renaming the generated **routes/users.js** file to **routes/api.js**. We'll use this file to hold the routes for our API.

- Make the necessary changes in **app.js**. If done correctly, requests will have to be made as follows...

- <p>These are the RESTful routes we need to implement:</p>

<img src="https://i.imgur.com/Y9n4SPT.png" width="900">

<br>
<br>
<br>

### Proper response codes

- Virtually all modern web APIs respond with JSON.

- However, well designed APIs also set the _status code_ of the HTTP response appropriately...

- Here is a common approach:

<img src="https://i.imgur.com/TbZcD8Z.png" width="900">

- Note that if something goes wrong on the server (network error, etc., we should send back a status code of 500).

<br>
<br>
<br>

### Set up the routes for the API

- Assuming we are going to require the following controller within _routes/api.js_

```javascript
var puppiesCtrl = require("../controllers/api/puppies")
```

Let's create the routes for these actions:

- `puppiesCtrl.index`
- `puppiesCtrl.show`
- `puppiesCtrl.create`
- `puppiesCtrl.update`
- `puppiesCtrl.delete`

<br>
<br>
<br>

### Responding with JSON and a Status Code

- We will be responding with JSON and a Status Code to every HTTP request to our API.

- This is how we can do it:

```javascript
function index(req, res) {
  Puppy.find({}, function (err, puppies) {
    res.status(200).json(puppies)
  })
}
```

- Notice how we chained on to the `status` method.

<br>
<br>
<br>

### Code the `index` Action

- First, create and require the controller module.

- Create the route in **routes/api/puppies.js** for retrieving all puppies.

- Code that `index` controller action we just reviewed.

- When you're done, we'll use Postman to test out our first API route!

<br>
<br>
<br>

### Code the `create` Action

- Now, let's build out the other 5 routes.

- Let's write the `create` route next because we need more puppies!

- We can use the `Puppy.create` method, however, be aware that `req.body` won't always include all required data, e.g., the logged in user's `_id` for referencing purposes. In this case, we could add a new property to the `req.body` object, or use the `new` + update + `save` approach.

- Be sure to double-quote all JSON keys and strings in the data payload (body) because JSON & Postman is strict.

<br>
<br>
<br>

### Code the `show` Action - Practice

- Go ahead and implement the `puppiesCtrl.show` action.

- **What Mongoose method should we use?**

- We'll review in 5 minutes.

<br>
<br>
<br>

### Code the `update` Action

- Let's use the following code to implement `puppiesCtrl.update`:

  ```javascript
  function update(req, res) {
    Puppy.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
      function (puppy) {
        res.status(200).json(puppy)
      }
    )
  }
  ```

- Note the `{new: true}` options object is required if you want the updated document returned.

<br>
<br>
<br>

### Code the `delete` Action - Practice

- The Mongoose method is `findByIdAndDelete` - you got this!

- We'll review in 5 minutes.

<br>
<br>
<br>

### Congrats on exposing an API for your app!

- We have created our own RESTful API that exposes the Puppy data resource.

- We included all five routes/actions required for full CRUD, however, some applications may choose to expose less functionality, e.g., read-only functionality with `index` & `show` actions only.

<br>
<br>
<br>

### CORS

- Browsers have a security mechanism that prevents JS from making a request for a resource to a domain different from the one that the current web page was loaded from.

- The domain is made up of the **host** and **port**. Therefore, `localhost:3000` is considered a different domain than `localhost:8080`.

- To improve web applications, developers asked modern browser vendors to allow cross-origin requests and the **_cross-origin resource sharing_ (CORS)** standard came to be.

- The details can be found [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).

- To enable access to our server's API by client apps not delivered from our server's domain, we need to enable CORS.

- We implement CORS in an Express app using middleware, of course!

- Install the [CORS](https://www.npmjs.com/package/cors) module:

```bash
$ npm install cors
```

- Then we simply have to mount the middleware in **app.js**:

  ```javascript
  var cors = require('cors');
  ...
  var app = express();

  app.use(cors());
  ```

- As usual, check the docs for additional info and options.

<br>
<br>
<br>

### Essential Questions

❓ How would these two routes be expected to behave differently?
`GET /accounts` and`GET /api/accounts`

❓ In addition to responding with JSON, it is proper to set the HTTP Response's **\_\_\_** **\_\_\_** as well.

❓ What is the use case for exposing an API from a server app?
