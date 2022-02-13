---
track: "Backend Fundamentals"
title: "Intro to Mongoose"
week: 8
day: 1
type: "lecture"
---

# Intro to Mongoose

<br>
<br>
<br>

## Lesson Objectives

1. Explain what an ODM is
1. Connect to Mongo via text editor
1. Create a Schema for a collection
1. Create a model and save it
1. Find a specific model
1. Update a model already in the database
1. Remove a model already in the database
1. Combine actions

<br>
<br>
<br>

## Explain what is an ODM/Intro to Mongoose

ODM stand for Object Document Model. It translates the documents in Mongo into upgraded JavaScript Objects that have more helpful methods and properties when used in conjunction with express.

Rather than use the Mongo shell to create, read, update and delete documents, we'll use an npm package called `mongoose`. Mongoose will allow us to create schemas, do validations and make it easier to interact with Mongo inside an express app.

![Mongoose Visual](https://i.imgur.com/mx6edUc.png)

<br>
<br>
<br>

## Make a Schema

A schema will allow us to set specific keys in our objects. So if we have a key of `name`, we won't be able to insert other keys that don't match like `firstName` or `names`. This helps keep our data more organized and reduces the chance of errors.

We can also specify the datatypes. We can set the datatype of `name` to a `string`, `age` to a `number`, `dateOfBirth` to a Date, `bff` to a Boolean etc.

We can also make some fields required and we can set default values as well.

Here is a sample Schema, with many options. We'll be making a simpler variation of this

```js
const articleSchema = new Schema(
  {
    title: { type: String, required: true, unique: true }, //can say whether we want properties to be required or unique
    author: { type: String, required: true },
    body: String,
    comments: [{ body: String, commentDate: Date }], // can have arrays of objects with specific properties
    publishDate: { type: Date, default: Date.now }, // can set defaults for properties
    hidden: Boolean,
    meta: {
      // can have properties that are objects
      votes: Number,
      favs: Number,
    },
  },
  { timestamps: true }
)
```

<br>
<br>
<br>

## Basic Set Up

- `mkdir tweeter`
- `cd tweeter`
- `touch server.js`
- `npm init -y` or go through the prompts
- `npm i express mongoose`
- `mkdir models`
- `touch models/tweet.js`
- `code .`

<br>
<br>
<br>

## Set Up A Basic Express Server

```js
// Dependencies
const express = require("express")
const app = express()
const PORT = 3000

// Listener
app.listen(PORT, () => console.log(`express is listening on port: ${PORT}`))
```

Then check to make sure it's working.

<br>
<br>
<br>

## Set Up Mongoose

Inside `server.js`

- Require mongoose

```js
// Dependencies
const mongoose = require("mongoose")
```

- Head on over to [mongodb.com](https://www.mongodb.com/cloud/atlas) and generate a connection URI string
- Create a variable called DATABASE_URL and set it equal to your MongoDB Atlas connection string
- Update your DATABASE_URL to connect to the sub-database `tweeter` (if it doesn't exist, it will be created)
- set `mongoose.connection` to a shorter variable name - this is an object that represents your connection; there are some useful pieces of information we can read from it.

```js
// Database configuration
const DATABASE_URL =
  "mongodb+srv://sei:<password>@sei-w0kys.azure.mongodb.net/tweeter?retryWrites=true"
const db = mongoose.connection
```

- Connect to MongoDB Atlas

```js
// Connect to MongoDB Atlas
mongoose.connect(DATABASE_URL)
```

<br>
<br>
<br>

Getting a warning like this?
![depreciation](https://i.imgur.com/47eb1oo.png)

Warnings are ok, it'll still work, for now. But in later versions it may stop working and you'll have to update your code. Notice how the message tells you exactly how to correct your code.

This should clear up the errors:

```js
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
```

<br>
<br>
<br>

- **OPTIONAL and RECOMMENDED:** provide error/success messages about the connections. No need to memorize this code, just copy and paste it into your file.

```js
// Database Connection Error/Success
// Define callback functions for various events
db.on("error", (err) => console.log(err.message + " is mongod not running?"))
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo disconnected"))
```

<br>
<br>
<br>

## The entire configuration for mongoose:

Again: Don't memorize it, just set a bookmark and refer back to this as you need it. With the exception of the dependencies, this is the kind of stuff you might as well copy and paste from your previous apps because it mostly doesn't change. We'll be learning how to hide our DATABASE_URL soon and then it'll be totally copy and paste-able.

```js
// Dependencies
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const PORT = 3000

// Database Configuration
const DATABASE_URL =
  "mongodb+srv://sei:<password>@sei-w0kys.azure.mongodb.net/tweeter?retryWrites=true"
const db = mongoose.connection

// Database Connection
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

// Database Connection Error/Success - optional but can be really helpful
db.on("error", (err) => console.log(err.message + " is Mongod not running?"))
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo disconnected"))

// App Listener
app.listen(PORT, () => console.log(`express is listening on port: ${PORT}`))
```

<br>
<br>
<br>

## Check Your Work

Before we go any further, let's check our work!
Boot up your server by running `nodemon` then check your terminal for a success or error message. Success? Awesome! This would be a great point to make a commit message if we were going to push this up to Github. Errors? Take a moment to fix them before we move on.

<br>
<br>
<br>

## Set Up Tweet Schema

In `models/tweet.js`

```js
const mongoose = require("mongoose") // require mongoose
const Schema = mongoose.Schema // create a shorthand for the mongoose Schema constructor

// create a new Schema
// This will define the shape of the documents in the collection
// Recource: https://mongoosejs.com/docs/guide.html
const tweetSchema = new Schema(
  {
    title: String,
    body: String,
    author: String,
    likes: { type: Number, default: 0 },
    sponsored: { type: Boolean, default: false },
  },
  { timestamps: true }
)

// Creating Tweet model : We need to convert our schema into a model-- will be stored in 'tweets' collection.  Mongo does this for you automatically
// Model's are fancy constructors compiled from Schema definitions
// An instance of a model is called a document.
// Models are responsible for creating and reading documents from the underlying MongoDB Database
// Resource: https://mongoosejs.com/docs/models.html
const Tweet = mongoose.model("Tweet", tweetSchema)

// Export Tweet model so it can be used in our controllers
module.exports = Tweet
```

<br>
<br>
<br>

## Import Tweet Schema

Let's import that Tweet model alongside our other dependencies in the file that houses our controllers. For now, that's server.js. Soon we'll be moving our controllers to separate files and we'll have to move this import too.

In `server.js`

```js
// Dependencies
const Tweet = require("./models/tweet.js")
```

<br>
<br>
<br>

## Add Body Parser Middleware and Create a Create Route

This should all be done after your database connection and before your app listener

```js
// Middleware
// Body parser middleware: it creates req.body
app.use(express.urlencoded({ extended: false }))

// Routes / Controllers

// Create
app.post("/tweets", (req, res) => {
  res.send(req.body)
})
```

<br>
<br>
<br>

## Check Your Work with Postman

- Make a POST request to `http://localhost:3000/tweets`
- Under the 'Body' tab, select `x-www-form-urlencoded`
- Add some tweet data:

title: Deep Thoughts \
body: Friends, I have been navel-gazing \
author: Karolin

So your Postman looks like this when you send the request:

![Postman POST Request](https://i.imgur.com/SPHnGL1.png)

<br>
<br>
<br>

## Create a Document with Mongoose

In `server.js`

Let's make an object to insert into our database. When we connect with an express app, our data will be coming in to our controllers as an object (req.body) from the browser. So this will just be some dummy form data.

Now, let's code out the real functionality for our create route

```js
// Routes / Controllers
// Create
app.post("/tweets", (req, res) => {
  Tweet.create(req.body, (error, createdTweet) => {
    res.send(createdTweet)
  })
})
```

<br>
<br>
<br>

## Check Your Work with Postman

Let's resend that same request we made earlier and see if it returns the new MongoDB document this time.

![Successful Postman Response](https://i.imgur.com/2KiFRGX.png)

Timestamps, deleted, and likes had default values, a unique \_id has been generated

<br>
<br>
<br>

## Add Two More Tweets via Postman

title: Sage Advice \
body: Friends, I am vegan and so should you \
author: Karolin

title: Whole Reality \
body: I shall deny friendship to anyone who does not exclusively shop at Whole Foods \
author: Karolin

<br>
<br>
<br>

## READ ROUTE: Find Documents with Mongoose

- Mongoose has 4 methods for this
- `find` - generic
- `findById` - finds by ID - great for Show routes!
- `findOne` - limits the search to the first document found
- [`where`](http://mongoosejs.com/docs/queries.html) - allows you to build queries, we won't cover this today

Let's create a Read route to find all Tweets. This will be our Index route \
Remember INDUCES (Index, New, Delete, Update, Create, Edit, Show) to help organize our routes so they don't conflict with each other.

```js
// Index
app.get("/tweets", (req, res) => {
  Tweet.find({}, (error, foundTweets) => {
    res.send(foundTweets)
  })
})
```

<br>
<br>
<br>

### Check Your Work with Postman

When you create a get request to `http://localhost:3000/tweets` you should now see all three tweets being returned.

<br>
<br>
<br>

## SHOW ROUTE: Find One Document with Mongoose

Remember INDUCES!

```js
// Show
app.get("/tweets/:id", (req, res) => {
  Tweet.findById(req.params.id, (error, foundTweet) => {
    res.send(foundTweet)
  })
})
```

<br>
<br>
<br>

### Check Your Work With Postman

You're going to need an ID to complete this endpoint, so grab one that you know exists. If you need to find one, hit your index route again! Your endpoint should look something like this: `http://localhost:3000/tweets/60ba67d68e9a69446eb9bf00`

When you run it, you should get the tweet you took the ID from as a response.

<br>
<br>
<br>

## DESTROY ROUTE: Delete Documents with Mongoose

When it comes to deleting documents, we have a few options

- `remove()` danger! Will remove all instances
- `findOneAndRemove()` - this seems like a great choice
- `.findByIdAndDelete()`- finds by ID - great for delete routes in an express app!

Let's create a delete route. Remember INDUCES!

```js
// Delete
app.delete("/tweets/:id", (req, res) => {
  Tweet.findByIdAndDelete(req.params.id, (error, deletedTweet) => {
    res.send({ success: true })
  })
})
```

We could also `res.send(deletedTweet)`. Why might we want to do that? Because this would be our very last chance to use any of the data. Have you ever deleted your email address from a mailing list and they respond with something like "Hey Karolin! We're sorry to see you go. If this was an accident, click here to resubscribe!" This is a situation where your data has already been deleted from the database but they return the deleted object so they can use that data one last time to greet your with your name, and to have your email address ready to go if you click the button to reusubscribe. But if yoy're not going to use that data, you don't have to send it back.

<br>
<br>
<br>

### Check Your Work With Postman

You're going to need an ID to complete this endpoint, so grab one that you know exists. If you need to find one, hit your index route again! Your endpoint should look something like this: `http://localhost:3000/tweets/60ba67d68e9a69446eb9bf00` and it should be a DELETE request.

<br>
<br>
<br>

## UPDATE ROUTE: Edit Documents with Mongoose

Finally, we have a few options for updating

- `update()` - the most generic one
- `findOneAndUpdate()`- Let's us find one and update it
- `findByIdAndUpdate()` - Let's us find by ID and update - great for update/put routes in an express app!

Let's create an update route using findByIdAndUpdate. Remember INDUCES!
For this type of update we'll need to pass in the ID and the new data/

If we want to have our updated document returned to us in the callback, we have to set an option of `{new: true}` as the third argument. Otherwise, it will update our document, but return the old, un-updated document.

```js
// Update
app.put("/tweets/:id", (req, res) => {
  Tweet.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedTweet) => {
      res.send(updatedTweet)
    }
  )
})
```

<br>
<br>
<br>

### Check Your Work With Postman

You're going to need an ID to complete this endpoint, so grab one that you know exists. If you need to find one, hit your index route again! Your endpoint should look something like this: `http://localhost:3000/tweets/60ba67d68e9a69446eb9bf00` and it should be a PUT request. You'll also need to change your data so we can see that the update worked. Change one of the field values before sending the request.

We can check out all the things we can do at the [Mongoose API docs](http://mongoosejs.com/docs/api.html)

<br>
<br>
<br>

## Congratulations! You've built a full CRUD APP with a real database! 🎉

This is all we need to know to build full CRUD apps with mongoose, but there's so much more you can do like sorting and filtering and finding by different parameters. When you have some free time, poke around [Mongoosejs.com](https://mongoosejs.com/) to learn about all the other options!

<br>
<br>
<br>

## HUNGRY FOR MORE?

- Add a view engine and turn this into an app that can be used from the browser.
- Add some error handling! When we use mongoose, we get back both an error and whatever we created, updated, deleted, etc.. If there's an error, do something with it!
