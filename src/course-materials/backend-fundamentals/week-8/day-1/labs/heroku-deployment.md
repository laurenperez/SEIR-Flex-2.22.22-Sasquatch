---
track: "Backend Fundamentals"
title: "Heroku Deployment"
week: 8
day: 1
type: "lab"
---

# Heroku Deployment

<br>
<br>
<br>

## Lesson Objectives

1. Make sure you completed the MongoDB Atlas Set Up
1. Make a new github repository
1. Create a basic express app
1. set up environmental variables
1. Remove `node_modules`
1. Get started with Heroku
1. Create app on heroku
1. Attach mongolab addon
1. Update code for heroku & mongolab
1. Push git to heroku

<br>
<br>
<br>

## Client Server Flow Review

<br>
<br>
<br>

## New Github Repository

This is going to be a porfolio piece so you'll want it hosted on regular [github](https://github.com/).

Make a new repo! Click the + on the upper right navigation bar

![new repo](https://i.imgur.com/Y3IF2lF.png)

<br>

**Choose**

- a repository name
- public (let your instructors help you if you get stuck, you can always change this later)
- initialize with a README
- **VERY IMPORTANT** `Add .gitignore` scroll down and choose Node
- license - optional

Press the `Create Repository` button when you're ready!

<br>
<br>
<br>

## Clone Your New Repository to Your Computer

**In Terminal**

- navigate OUTSIDE the class repository
- check you are not already in a git repository

  - **GOOD** -

  ![not a repo](https://i.imgur.com/9wxsCNd.png)

  - **BAD** -

  find a new location for your project!

  ![already a repo](https://i.imgur.com/dAxjl7t.png)

<br>
<br>
<br>

**On Github**

- click the `Clone or Download` button
- check if you are grabbing the right url for `https` or `ssh`
- click the clipboard button

![clone or download](https://i.imgur.com/zeWKOXk.png)

<br>
<br>
<br>

**In Terminal**
type `git clone` and then paste the URL that you copied from github

Should look something like this

![clone command in terminal](https://i.imgur.com/u43zNsF.png)

- **Important!** Don't forget to cd into your new directory/repo!
- `ls -a` - you should see your `README.md` and `.gitignore` that you created on github

<br>
<br>
<br>

## Basic Express App

Let's build a basic express app

- `touch server.js`
- `npm init`
- `npm install ejs express mongoose method-override dotenv`

Check out `package.json` make sure everything looks as expected

![package.json](https://i.imgur.com/KzEzGiw.png)

<br>
<br>
<br>

## Set Environmental Variables

We have to set specific to our local computer environment AND our heroku environment. Our variables should **NOT** be tracked by git and should **NOT** be on github.
This can keep things like passwords and api keys safer from hacking\*. There are a few ways to accomplish this. We're going to store our variables in our `.env` file which is a file that should NEVER end up on github (because we will ignore it in our `.gitignore` file) and we can easily export our variables and have access to them on our app.

- True Story: people build bots to crawl through github and find things like API keys, passwords, credit card info and more. They'll grab it and use it. One GA student in 2016 had over $6000 in charges in less than 24 hours on her credit card because she accidentally updated her Amazon credentials!

We'll need to use an npm package [dotenv](https://www.npmjs.com/package/dotenv) to manage this file within our project for us

- one: `touch .env` (should be on the same level as `package.json`)

Add the following:

**IMPORTANT**
This file is NOT JavaScript, so the syntax is different

- comments start with a #
- variables go on the left (no spaces/tabs before it) then an `=` and then the value on the right:
  - DO NOT PUT SPACES
  - DO NOT PUT SEMI-COLONS
  - DO NOT PUT QUOTES

<br>
<br>
<br>

```bash
# GA project 2 MongoDB Atlas connection String
MONGODB_URI=mongodb+srv://<your_username>:<password>@ga-sei-u8fme.mongodb.net/test?retryWrites=true&w=majority

# Port for localhost
PORT=3000
```

<br>
<br>
<br>

Replace the MONGODB_URI with the one provided to you from YOUR MongoDB Atlas, be sure to swap out `<password>` (be sure to remove the `<>`s as well your password should just be `password1234` not `<password1234>`) with the password you created for your user through Atlas.

Load your changes

**in server.js**

```js
//___________________
//Dependencies
//___________________
const express = require("express")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const app = express()
const db = mongoose.connection
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Error / success
db.on("error", (err) => console.log(err.message + " is mongod not running?"))
db.on("connected", () => console.log("mongod connected: ", MONGODB_URI))
db.on("disconnected", () => console.log("mongod disconnected"))

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static("public"))

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false })) // extended: false - does not allow nested objects in query strings
app.use(express.json()) // returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride("_method")) // allow POST, PUT and DELETE from a form

//___________________
// Routes
//___________________
//localhost:3000
app.get("/", (req, res) => {
  res.send("Hello World!")
})

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log("express is listening on:", PORT))
```

<br>
<br>
<br>

## Test your app

- If your express app doesn't run locally it definitely won't run on Heroku!
- test it out and fix any bugs

<br>
<br>
<br>

## git add/git commit

- `git add .`
- `git commit -m 'first commit'`
- `git push origin master`

Check this step carefully! Make sure `node_modules` are **NOT** on github!! If they made it to github, that means they are not being ignored by `.gitignore`. If you don't properly ignore them now you'll have massive headaches with heroku later!

<br>
<br>
<br>

## If You Need to Remove `node_modules`

In order for heroku to work, you can't have `node_modules` in your repo. Instead, heroku will add this dir itself!

1. go to local repo dir
1. `rm -r node_modules`
1. git: add, commit, push
1. `touch .gitignore`
1. `atom .gitignore`
1. add a line that says just `node_modules` to .gitignore
1. save .gitignore
1. git: add, commit, push
1. to get it working locally again: `npm install`

<br>
<br>
<br>

## Get started with Heroku

- [Sign up for Heroku](https://signup.heroku.com/)
  - You may need a CC at some point although you will not be charged
- [Install Heroku CLI Tools](https://toolbelt.heroku.com/)
  - Verify by typing `heroku login` anywhere in your terminal
  - Follow prompts to sync up your heroku credentials, DO NOT HEROKU CREATE yet.

<br>
<br>
<br>

## Create an app on heroku

- Once you have Heroku CLI, you can access terminal commands to heroku.
- Let's start by creating an app on heroku. If you don't yet have a name for your app it's ok, you can change it later (just make sure you update your git remotes too)
  - `heroku create [unique name]` from your project's root directory where you first initialized git.
    This will check heroku to see if the app name exists, if so you'll get an error message and have to try again.
  - If you don't specify a name, heroku will generate a unique name for you. There names are pretty cool and somewhat thematic so feel free to do either.
  - You can also do this step off their website if you want but since you'll be working in terminal anyway, might as well just do it through terminal.
  - Notice that if you successfully created a heroku app, you can see that the heroku remote was automatically added to your project's repo. Confirm this by typing `git remote -v`, you should see `origin` as well as `heroku`.

<br>
<br>
<br>

## Add Database from MongoDB Atlas

Go to [heroku](https://dashboard.heroku.com/) - make sure you are logged in and go to your app

Go to the settings tab

![](https://i.imgur.com/citTnDN.png)

push the `reveal config vars` button

in there add:

![](https://i.imgur.com/9CKHcBM.png)

- make sure `MONGODB_URI` key matches perfectly what you have in your `server.js` file for connecting with mongoose.
- make the property your connection string from Atlas with _YOUR_ username password filled in

<br>
<br>
<br>

## Push Git

- First update your remote repo so you're code is up to date.
  - `git add -A`
  - `git commit -m "updating code for heroku"`
  - `git push origin master`
- Now also push to heroku
  - `git push heroku master`

Wait 1 minute then type `heroku open`. You should have your deployed app open up in your browser.

- If thing's don't work out, relax and try to find out the error.
- `heroku logs`

<br>
<br>
<br>

# Troubleshooting

You only need to follow this section **if you're having any of the following weird errors!**

<br>
<br>
<br>

#### Heroku Can't Figure Out Your Language

- the hidden folder `.git` and `package.json` MUST be on the same level in your directory (the root)
- if it is a Rails app, `.git` and `GemFile` MUST be on the same level in your directory (the root)
- move your files up to `.git` accordingly

<br>
<br>
<br>

#### Check that your have ignored node modules

Your node modules should NOT appear on github

![no node modules](https://i.imgur.com/PVYeHAf.png)

If you have not ignored your node modules, follow the steps listed above to remove and ignore them

<br>
<br>
<br>

#### Heroku recommends setting the proper node version

[scroll down for an example](https://devcenter.heroku.com/articles/deploying-nodejs)

<br>
<br>
<br>

#### Check that your config variables match

In heroku, under your app and its settings, `Reveal Config Vars`

![reveal config vars](https://i.imgur.com/HyPWKAq.png)

In the above example -

In your own app, make sure you have your mongo uri equal to `process.env` and then `.MONGODB_URI`

`const mongoURI = process.env.MONGODB_URI`

It won't work if you make it a different variable name (lowercase, no underscore) - do not change it in heroku! If you cange it in heroku you'll have to hunt how to update more things. Just set it in your own app.

Note: your the variable for the port is not listed, but it must be `PORT` all caps. It is accessed by `process.env.PORT`

<br>
<br>
<br>

#### You Need to Add More Config Variables

Using the NPM package `dotenv`? If you've added new variables, like `SECRET`, be sure to add those custum config variables

- In heroku, under your app and its settings, `Reveal Config Vars`

Otherwise you might be looking at a `Internal server error`

![reveal config vars](https://i.imgur.com/HyPWKAq.png)

You must make the variable names match.

<br>
<br>
<br>

#### You changed your heroku URL

If you changed your app name, you'll have to update the git remote url. Get the right url from heroku (see towards the bottom

![right url](https://i.imgur.com/gU905lY.png)

In terminal, in your repo

- `git remote -v` (should have origin and heroku)
- `git remote remove heroku`
- `git remote add heroku whateverURLherokuListed`

<br>
<br>
<br>

### You changed your github project name

![changed github project name](https://i.imgur.com/NOZ16yV.png)

Go back to the main code view and grab the url from the clone or download button

![git clone](https://i.imgur.com/TDZAWNl.png)

- `git remote -v` (should have origin and heroku)
- `git remote remove origin`
- `git remote add origin whateverURLgithubListed`

<br>
<br>
<br>

#### Cannot read filetype MIME re: CSS file

- your CSS file is not linked properly/cannot be found/named incorrectly (working locally? see next issue)
- you have a mismatch in opening/closing HTML tags

<br>
<br>
<br>

#### Cannot find a file but it is there??? You think you might have changed it?

There is weirdness. If you had named your file `Index.html` and then changed it to `index.html` git, by default, will ignore this change.

Locally, you'll see `index.html` (your updated name). But if you go to github, you'll see it's still `Index.html`. This will 'confuse' heroku as well.

First try to use git to change the name:

```bash
git mv -f Index.html index.html
```

Success?

![changed file name](https://i.imgur.com/hvqvkTR.png)

go ahead and `git add .` `git commit -m 'file name changed'`

If that fails,

- `touch tempfile`,
- copy paste your code from the offending file in there
- `rm` the offending file
- `git add .` `git commit -m 'removed Index.html`
- `touch index.html`
- `git add .` `git commit -m 'added index.html`
