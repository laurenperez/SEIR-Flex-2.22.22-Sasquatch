---
track: "Backend Fundamentals"
title: "Authentication with OAuth"
week: 9
day: 1
type: "lecture"
---

# Authentication with OAuth

<br>
<br>
<br>

### [Click Here](https://generalassembly.zoom.us/rec/share/Eh7pNUuEFtUaVGE-pa8rCs_B1MLZ7Qv-fZm2r8ZUSWypq0FqXCx5w175LWd6FQt7.Ddji5ZAd1YT1XKLR?startTime=1618680723000) to access recording

<br>
<br>
<br>

## Learning Objectives

Students will be able to:

- Explain the difference between Authentication & Authorization
- Identify the advantages OAuth provides for usersand web apps
- Explain what happens when a user clicks"Login with [OAuth Provider]"
- Add OAuth authentication to an Express app using PassportJS
- Use Middleware & PassportJS to provide authorization

<br>
<br>

## Roadmap

- Intro to Authentication
- Why OAuth?
- What is OAuth?
- How Does OAuth Work?
- Preview the App
- The App's User Stories
- Review the Starter Code
- Today's Game Plan (11 Steps)

<br>
<br>

## Intro to Authentication

#### Why We Need Authentication

- An application's functionality usually revolves around a particular user.

- For example, when we use online banking, or more importantly, save songs to our Spotify playlists, the application has to know who we are - and this is where **authentication** comes in.

<br>
<br>
<br>

#### What is Authentication?

- Authentication is what enables an application to know the **identity** of the person using it.

- There are several types of **authentication**, here are 3 of the most common ones:
  - Third-party providers via [_OAuth_](https://oauth.net/)
  - Token-based with [JSON Web Tokens](https://jwt.io/)
  - Session-based

<br>
<br>
<br>

#### Authentication vs. Authorization

- _Authentication_ and _authorization_ are not the same thing...

- **Authentication** verifies a user's identity.

- **Authorization** determines what functionality a given user can access. For example:
  - What features a logged in (authenticated) user has vs. an anonymous visitor?- or -
  - What features an _admin_ user has vs. some other user _role_?

<br>
<br>
<br>

## Why OAuth?

- Consider applications where we have to sign up and log in using a username and a password...

- **What are the pitfalls of username/password authentication from a _user's_ perspective?**

<p style="text-align:left">Pitfalls from a user prospective:</p>

- Creating multiple logins requires you to remember and manage all of those login credentials.

- You will often use the same credentials across multiple sites, so if there's a security breach at one of the sites where you are a member, the hackers know that users often use the same credentials across all of their sites - oh snap!

- You are tempted to use simple/weak passwords so that you can remember all of them.

- **What would be the pitfalls from a <em>business or developer's</em> perspective?**

<p style="text-align:left">Pitfalls from a website or developer prospective:</p>

- Managing users' credentials requires carefully crafted security code written by highly-paid devs.

- Users (customers) are annoyed by having to create dedicated accounts, especially for entertainment or personal interest type websites.

- Managing credentials makes your business a target for hackers (internal and external) and that brings with it liability.

- The bottom-line is that the majority of users prefer to use OAuth instead of creating another set of credentials to use your site.

- When users are your customers, you want to make them as happy as possible!

- OAuth is hot, so let's use it!

<br>
<br>
<br>

## What is OAuth? - Vocab

- **OAuth provider**: A service company such as _Google_ that makes its OAuth authentication service available to third-party applications.

- **client application**: Our web application! Remember, this is from an _OAuth provider's_ perspective.

- **owner**: A user of a service such as _Facebook_, _Google_, _Dropbox_, etc.

- **resources**: An _owner's_ information on a service that **may** be exposed to _client applications_. For example, a user of Dropbox may allow access to their files.

- **access token**: An temporary key that provides access to an _owner's_ _resources_.

- **scope**: Determines what _resources_ and rights (read-only, update, etc) a particular _token_ has.

- OAuth is an open standard that provides **client applications** access to **resources** of a service such as Google with the permission of the resources' **owner**.

- There are numerous OAuth Providers including:
  - Facebook
  - Google
  - GitHub
  - Twitter
  - [Many more...](https://en.wikipedia.org/wiki/List_of_OAuth_providers)

<br>
<br>
<br>

## How Does OAuth Work?

#### OAuth 2's Flow

<img src="https://i.imgur.com/tAVrCLP.png" width="900">

- The ultimate goal is for the _client application_ (our web app) to obtain an **access token** from an OAuth provider that allows the app to access the user's resources from that provider's API's.

- Usually we only want to access to the most basic of resources the user could grant us - their **name**, **email** & maybe their **avatar**.

- However, it's possible to request access to resources such as a user's Facebook friends, tweets, Dropbox data, etc.

- OAuth is **token** based.

- A token is a generated string of characters.

- Once a user okays our web app's access, our web app receives a _code parameter_ that is then exchanged for an **access token**.

- Each token has a **scope** that determines what resources an app can access for that user. Again, in this lesson, we will only be interested in accessing our users' basic profile info.

- If in your Project you would like to access more than a user's profile, you will need to modify the **scope** - be sure to check the specific provider's documentation on how to access additional resources.

- <p>Yes, OAuth is complex. But not to worry, we don't have to know all of the nitty gritty details in order to take advantage of it in our apps.</p>

- Plus, we will be using a very popular piece of middleware that will handle most of the OAuth _dance_ for us.

<br>
<br>
<br>

#### OAuth Review Questions

**❓ True or false - if your site allows users to authenticate via OAuth, you should ensure they create a "strong" password.**

**❓ What are the advantages provided to users by OAuth?**

**❓ The advantages for web sites & developers?**

**❓ What is the _client application_ within the context of an OAuth provider?**

<br>
<br>

## The App We Will Build Today

- Today, we are going to take a starter application and add OAuth authentication & authorization to it.

- The app will allow you, as SEIR Students, to list fun facts about yourself and read facts about fellow students, past and present.

- The app will add you as a student to its database when you log in for the first time using Google's OAuth service.

<br>
<br>
<br>
<br>

## The App's User Stories

This is the only user story that's complete in the starter code:

- **As a Visitor**:
  - I want to view fun facts about past and present SEIR Students so that I can know more about them.

We will complete these stories today:

- **As an Authenticated Student**:
  - I want to add fun facts about myself so that I can amuse others.
  - I want to be able to delete a fact about myself, in case I embarrass myself.
  - I want to view the Google avatar instead of the placeholder icon.

<br>
<br>
<br>

## Setup and Review the Starter Code

<a href="/downloads/backend_fundamentals/seir-flex-students.zip" download>Download</a> the starter code to get started

- Install the node modules:

```bash
$ npm install
```

- `cd` inside the project folder in your code editor.

- Use `nodemon` to start the server.

- The app has two server-side views:

  - **views/index.ejs**
  - **views/students/index.ejs**

- The app uses the [_Materialize_ CSS framework](http://materializecss.com/) based upon [Google's Material Design](https://www.google.com/design/spec/material-design/introduction.html).

<br>
<br>
<br>

<!--
#### Review the Starter Code:  <small>Config</small>


- We'll need to set up a `.env`, which will be used to provide _environment_ variables such as the database's connection string.

- **NOTE:** This file is created at the root of the project's directory.

```bash
touch .env
```

- We'll also need to install the `dotenv` npm package in order to make the environment variables available to our application

```bash
npm i dotenv
```

- Next, we'll add the config code for `dotenv` inside of `server.js`

```javascript
const express = require('express');
const morgan = require('morgan');
const port = 3000;

// We'll need to load the env vars
require('dotenv').config();

//.....more code below....
```

- Environment variables allow configuration of an application's settings without changing the source code.

- `.env` files are never pushed to GitHub because they often hold sensitive access tokens, etc.

- The _`key=value`_ pairs in `.env` will be _attached_ to Node's `process.env` object.

- Then, inside of **config/database.js**, the database is connecting to the value held by `process.env.DATABASE_URL`.

- Note that all environment variables listed in `.env` will also need to be set on the server after the app has been deployed.

<br>
<br>
<br>

#### Review the Starter Code:  <small>Database</small>


- Instead of using our own personal database, we are using a MongoDB hosted in the cloud so that we can see each other's fun facts!

- For this reason, your instructor has prepared a hosted database and will provide the connection URI to be added to your `.env` file.

- For Project 2, you'll want to use a hosted database as well; don't worry about not knowing how to set this up yet, we have a dedicated lesson on it. 😎

- FYI, we get our hosted database from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), which is our goto for cloud-based MongoDB databases.



<br>
<br>
<br>

 -->

#### Review the Starter Code: <small>The Views</small>

- Several [Materialize CSS](https://materializecss.com/about.html) classes are being used for layout and styling.

- EJS is being used to render a "card" for each student.

<br>
<br>
<br>

#### Review the Starter Code: <small>Models</small>

- There is only a single `Student` Model exported by **models/student.js**.

- A `factSchema` is used to define the structure for the _fact_ subdocuments being _embedded_ within a _student_ document's `facts` property.

- The `avatar` property has been defined in advance for implementing a user story as an exercise later today.

- As you know, Mongoose schemas define the structure of documents, but only Models create collections in the database.

- A student's _facts_ is a perfect use case for embedding.

- Thanks to the `factSchema`, when we push a new fact into the `facts` array, all we do is provide the `text` field, and an `_id` will automatically be created in the subdocument for us.

<br>
<br>
<br>

#### Review the Starter Code: <small>Routing</small>

- We have two separate router files: **routes/index.js** & **routes/students.js**.

- **routes/index.js** currently has only the root route defined that immediately renders the Home/Landing "index" page.

- **routes/students.js** has three routes defined for the following actions:

  | Purpose                     | Method   | Path         |
  | :-------------------------- | :------- | :----------- |
  | Display all students        | `GET`    | `/students`  |
  | Create a fact for a student | `POST`   | `/facts`     |
  | Delete a fact               | `DELETE` | `/facts/:id` |

- **Why aren't we using `POST /students/:id/facts` to create a fact?**

- In this lecture, we'll learn to access the "logged in" student on the server, therefore we would not make a `POST` request to `/students/:id/facts` ... _think of this as "user-centric" CRUD_.
- Please note, this is one of the few exceptions we'd make to our typical RESTful routing convention.

<br>
<br>
<br>

#### Review the Starter Code <small>Controller</small>

- The `index` action in **controllers/students.js** is querying the `Student` model and providing the array of students to the **students/index.ejs** view.

- **NOTE:** There are two incomplete controller actions, `addFact` & `delFact` that we'll need to work on later; one of these will left to you as a challenge exercise.

<br>
<br>
<br>
<br>

#### Today's OAuth Game Plan

- **Step 1:** Register our App with Google's OAuth Server
- **Step 2:** Discuss PassportJS
- **Step 3:** Install & Configure Session middleware
- **Step 4:** Install PassportJS
- **Step 5:** Create a Passport config module
- **Step 6:** Install a Passport Strategy for OAuth
- **Step 7:** Configure Passport
- **Step 8:** Define routes for authentication
- **Step 9:** Add Login/Logout UI
- **Step 10:** Code the First User Story
- **Step 11:** Add Authorization

<br>
<br>
<br>

#### Step 1 - Register our App

- Every OAuth provider requires that our web app be registered with it.

- When we do so, we obtain a _Client ID_ and a _Client Secret_ that identifies **our application** to the OAuth provider.

- For this lesson, we are going to use Google's OAuth server - the details of how to do so are [here](https://developers.google.com/identity/protocols/OAuth2).

- Time to register our app...

<br>
<br>
<br>

#### Step 1.1 - Google Developers Console

- You must be logged into [Google Developers Console](https://console.developers.google.com):

<img src="https://i.imgur.com/HE95SsU.png">

<br>
<br>
<br>

#### Step 1.2 - Create a Project

- Click on the project selector widget, then click the **New Project** button.

- Type in a **Project name**, then click the **Create** button:

<img src="https://i.imgur.com/u4A0oHs.png">

<br>
<br>
<br>

#### Step 1.3 - Enable the People API

- It might take a bit, but once created, make sure the project is selected in the project selector widget, then click **+ ENABLE APIS AND SERVICES**:

<img src="https://i.imgur.com/o4FuFJj.png">

- Search for **people** and click on **Google People API** when it is visible:

<img src="https://i.imgur.com/tTzYnth.png">

- Click **ENABLE**:

<img src="https://i.imgur.com/DkLnpdr.png">

<br>
<br>
<br>

#### Step 1.4 - Obtain Credentials for App

- Now we need to create credentials for the app. Click **Create Credentials**:

<img src="https://i.imgur.com/r7Vreia.png">

- Then, right below **"Add Credentials to your project"**, click on **client ID**

<img src="https://i.imgur.com/UsSr3vq.png">

- Click **Configure consent screen** to setup the screen users will see in order to obtain their consent:

<img src="https://i.imgur.com/DtyMe9F.png">

<br>
<br>
<br>

#### Step 1.4 - Obtain Credentials for App

- Just enter a **Application name** and click the blue **Save** button:

<img src="https://i.imgur.com/arp22UP.png">

- Then click on the **Credentials** option in the side menu, then click on **Create credentials** then select **OAuth client ID**

<img src="https://imgur.com/9Q5dLmp.png">

- For this screen, we're going to add the name of our app in the **Name** field and inside the **Authorized redirect URIs**, we'll add the following: `http://localhost:3000/oauth2callback`

- The important thing to note is that eventually we'll have to come back and add an _**additional**_ entry in the **Authorized redirect URIs** once you have deployed your application to Heroku - something like:<br> `https://someappname.herokuapp.com/oauth2callback`.

<img src="https://i.imgur.com/EmEOHIk.png">

- After clicking the _Create_ button, we will be presented with our app's credentials!

<img src="https://imgur.com/u76uskO.png">

- Let's put **YOUR** credentials, along with that callback we provided, in our `.env` file so that it looks something like this:

> **EXAMPLE ONLY - DO NOT COPY AND PASTE**

```shell
DATABASE_URI=mongodb+srv://someusername:abc1234@seir-students-1btwt.azure.mongodb.net/students?retryWrites=true
GOOGLE_CLIENT_ID=245025414219-2r7f4bvh3t88s3shh6hhagrki0f6op8t.apps.googleusercontent.com
GOOGLE_SECRET=Yn9T_2BKzxr4zgprzKDGI5j3
GOOGLE_CALLBACK=http://localhost:3000/oauth2callback
```

<br>
<br>
<br>

#### Congrats on Registering the App

- With registering our app now completed, just remember that each provider will have its own unique process.

- Any questions about what we just did?

<br>
<br>
<br>

#### Step 2 - Passport Discussion

- Implementing OAuth is complex. There are redirects going on everywhere, access tokens that only last for a short time, refresh tokens used to obtain a fresh access token, etc.

- As usual, we will stand on the shoulders of giants that have done much of the heavy lifting for us - enter **PassportJS**.

- Passport is by far the most popular authentication framework out there for Express apps.

- [Passport's website](http://passportjs.org/) states that it provides _Simple, unobtrusive authentication for Node.js_.

- Basically this means that it handles much of the mundane tasks related to authentication for us, but leaves the details up to us, for example, not forcing us to configure our user model a certain way.

- There are numerous types of authentication, if Passport itself was designed to do them all, it would be ginormous!

- Instead, Passport uses **Strategies** designed to handle a given type of authentication; think of them as plug-ins for Passport.

- Each Express app with Passport can use one or more of these strategies.

- [Passport's site](http://passportjs.org/) currently shows over 500 strategies available.

- OAuth, or more specifically, OAuth2, although a standard, can be implemented slightly differently by OAuth providers such as Facebook and Google.

- As such, there are strategies available for each flavor of OAuth provider.

- For this lesson, we will be using the [passport-google-oauth](https://github.com/jaredhanson/passport-google-oauth) strategy.

- **Passport is just middleware designed to authenticate requests**.

- When a request is sent from an authenticated user, Passport's middleware will automatically add a `user` object to the `req` object.

- You will then be able to access that `req.user` object in all of our controller actions!

<br>
<br>
<br>

#### Step 3 - Session Middleware

- Before we install Passport and a strategy, we need to install the [`express-session`](https://github.com/expressjs/session?_ga=1.40272994.1784656250.1446759094) middleware.

- Sessions, are a server-side way of remembering a user's browser session.

- It remembers the browser session by setting a cookie that contains a _session id_. No other data is stored in the cookie, just the _id_ of the session.

- On the server-side, the application can store data pertaining to the session.

- Passport will use the session, which is an in-memory data-store by default, to store a nugget of information that will allow us to lookup the user in the database.

- FYI, since sessions are maintained in memory by default, if the server restarts, session data will be lost. You will see this happen when _nodemon_ restarts the server and you are no longer logged in :)

<br>
<br>
<br>

#### Step 3.1 - Installing Session Middleware

- Let's install the module:

```bash
$ npm install express-session
```

- Next, require it below the `morgan`:

  ```javascript
  const morgan = require("morgan")
  // new code below
  const session = require("express-session")

  const port = process.env.PORT || 3000
  ```

<br>
<br>

#### Step 3.2 - Configure and Mount Session Middleware

- Now, we can configure and mount the session middleware below our `body-parsing` middleware:

  ```javascript
  app.use(express.urlencoded({ extended: false }))
  // new code below
  app.use(
    session({
      secret: "SEIRRocks!",
      resave: false,
      saveUninitialized: true,
    })
  )
  ```

- The `secret` is used to digitally sign the session cookie making it very secure. You can change it to anything you want. Don't worry about the other two settings, they are only being set to suppress deprecation warnings.

<br>
<br>
<br>

#### Step 3.3 - Verifying Session Middleware

- `nodemon` to make sure your server is running.

- Browse to the app at `localhost:3000`.

- Open the _Application_ tab in _DevTools_, then expand _Cookies_ in the menu on the left.

- A cookie named `connect.sid` confirms that the session middleware is doing its job.

<br>
<br>
<br>

#### Congrats, the session middleware is now in place!

<br>
<br>
<br>

#### Step 4 - Install Passport

- The Passport middleware is easy to install, but challenging to set up correctly.

- First the easy part:

```bash
$ npm install passport
```

- Require it below `express-session`:

  ```javascript
  const session = require("express-session")
  // new code below
  const passport = require("passport")
  ```

<br>
<br>
<br>

#### Step 4.1 - Mount Passport

- With Passport required, we need to mount it. Be sure to mount it **after** the session middleware and always **before** any of your routes are mounted that would need access to the current user:

  ```javascript
  // app.use(session({... code above
  app.use(passport.initialize())
  app.use(passport.session())
  ```

- The way `passport` middleware is being mounted is [straight from the docs](http://www.passportjs.org/docs/configure/).

<br>
<br>
<br>

#### Step 5 - Create a Passport Config Module

- Because it takes a significant amount of code to configure Passport, we will create a separate module so that we don't pollute **server.js**.

- Let's create the file:

```bash
$ touch config/passport.js
```

- In case you're wondering, although the module is named the same as the `passport` module we've already required, it won't cause a problem because a module's full path uniquely identifies it to Node.

<br>
<br>
<br>

#### Step 5.1 - Passport Module's Exports Code

- Our `config/passport` module is not middleware.

- Its code will basically configure Passport and be done with it. We're not going to export anything either.

- Requiring below our database is as good of a place as any in **server.js**:

  ```javascript
  require("./config/database")
  // new code below
  require("./config/passport")
  ```

<br>
<br>
<br>

#### Step 5.2 - Require Passport

- In the **config/passport.js** module we will certainly need access to the `passport` module:

  ```javascript
  const passport = require("passport")
  ```

- This `require` returns the very same `passport` object that was required in **server.js** - Node modules are _singletons_.

<br>
<br>
<br>

#### Step 6 - Install the OAuth Strategy

- Time to install the strategy that will implement Google's flavor of OAuth:

```bash
$ npm install passport-google-oauth
```

- This module implements Google's OAuth 2.0 and 1.0 API.

- Note that _OAuth 1.0_ does still exist here and there, but it's pretty much obsolete.

<br>
<br>
<br>

#### Step 6.1 - Require the OAuth Strategy

- Now let's require the `passport-google-oauth` module below that of `passport` in **config/passport.js**:

```javascript
const passport = require("passport")
// new code below
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy
```

- Note that the variable is named using upper-camel-case.**We cannot flex on this naming when we use it, we must referenced it exactly like this**

- Let's make sure there's no errors before moving on to the fun stuff!

<br>
<br>
<br>

#### Step 7 - Configuring Passport

<p style="text-align:left">To configure Passport we will:</p>

1. Call the `passport.use` method to plug-in an instance of the OAuth strategy and provide a _verify_ callback function that will be called whenever a user has logged in using OAuth.

2. Define a _serializeUser_ method that Passport will call after the _verify_ callback to let Passport know what data we want to store in the session to identify our user.

3. Define a _deserializeUser_ method that Passport will call on each request when a user is logged in. What we return will be assigned to the `req.user` object.

<br>
<br>
<br>

#### Step 7.1 - <span style="text-transform:lowercase">passport.use</span>

- Now it's time to call the `passport.use` method to plug-in an instance of the OAuth strategy and provide a _verify_ callback function that will be called whenever a user logs in with OAuth. In **passport.js**:

```javascript
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy
// new code below
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    function (accessToken, refreshToken, profile, cb) {
      // a user has logged in with OAuth...
    }
  )
)
```

- Note the settings from the `.env` file being passed to the `GoogleStrategy` constructor function.
- **What is the name of the module we've been using that loads the settings from the `.env` file?**

- Next we have to code the _verify_ callback function...

<br>
<br>
<br>

#### Step 7.2 - The <em>Verify</em> Callback

- The callback will be called by Passport when a user has logged in with OAuth.

- It's called a _verify_ callback because with most other strategies we would have to verify the credentials, but with OAuth, well, there are no credentials!

- In this callback we must:

  - Fetch the user from the database and provide them back to Passport by calling the `cb` callback method, or...
  - If the user does not exist, we have a new user! We will add them to the database and pass along this new user in the `cb` callback method.

- But wait, how can we tell what user to lookup?

- Looking at the callback's signature:

  ```javascript
  function(accessToken, refreshToken, profile, cb) {
  ```

- We can see that we are being provided the user's _profile_ - this object is the key. It will contain the user's _Google Id_.
- However, in order to find a user in our database by their _Google Id_, we're going to need to add a field to our `Student` model's schema to hold it...

<br>
<br>
<br>

#### Step 7.3 - Modify the <em>Student</em> Model

- Let's add a property for `googleId` to our `studentSchema` inside `models/student.js` file:

  ```javascript
  const studentSchema = new mongoose.Schema(
    {
      name: String,
      email: String,
      avatarURL: String,
      facts: [factSchema],
      googleId: String, // 👈 Let's add this
    },
    {
      timestamps: true,
    }
  )
  ```

- Cool, now when we get a new user via OAuth, we can use the Google `profile` object's info to create our new user!

<br>
<br>
<br>

#### Step 7.4 - Callback Code

- Now we need to code our callback!

- We're going to need access to our `Student` model:

  ```javascript
  const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy
  // new code below
  const Student = require("../models/student")
  ```

- Let's do another error check by ensuring our server is running and we can refresh our app.

- Cool, the next slide contains the entire `passport.use` method.We'll review the _verify_ function as we type it in...

```javascript
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    function (accessToken, refreshToken, profile, cb) {
      Student.findOne({ googleId: profile.id }, function (err, student) {
        if (err) return cb(err)
        if (student) {
          return cb(null, student)
        } else {
          // we have a new student via OAuth!
          const newStudent = new Student({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          })
          newStudent.save(function (err) {
            if (err) return cb(err)
            return cb(null, newStudent)
          })
        }
      })
    }
  )
)
```

<br>
<br>
<br>

#### Step 7.5 - <span style="text-transform:lowercase">de/serialize</span>U<span style="text-transform:lowercase">ser</span> Methods

- Our `passport.use` method has been coded. Now we need to write two more methods inside of `config/passport` module.

- First the callback method we just created is called when a user logs in, then the `passport.serializeUser` method is called in order to set up the session.

- The `passport.deserializeUser` method is called everytime a request comes in from an existing logged in user - it is this method where we return what we want passport to assign to the `req.user` object.

- First up is the `passport.serializeUser` method that's used to give Passport the nugget of data to put into the _session_ for this authenticated user. Put this below the `passport.use` method:

  ```javascript
  passport.serializeUser(function (student, done) {
    done(null, student.id)
  })
  ```

- Passport gives us a full user object when the user logs in, and we give it back the tidbit to stick in the session.

- Again, this is done for server scalability and performance reasons - a lot of session data sucks.

<br>
<br>
<br>

#### Step 7.6 - <span style="text-transform:lowercase">deserialize</span>U<span style="text-transform:lowercase">ser</span> Method

- The `passport.deserializeUser` method is used to provide Passport with the user from the db we want assigned to the `req.user` object. Put it below the `passport.serializeUser` method:

  ```javascript
  passport.deserializeUser(function (id, done) {
    Student.findById(id, function (err, student) {
      done(err, student)
    })
  })
  ```

- Passport gave us the `id` from the session and we use it to fetch the student to assign to `req.user`.

- Let's do another error check.

<br>
<br>
<br>

#### Step 8 - Define Routes for Authentication

- Our app will provide a link for the user to click to login with Google OAuth. This will require a route on our server to handle this request.

- Also, we will need to define the route,`/oauth2callback` we told Google to call on our server after the user confirms or denies their OAuth login.

- Lastly, we will need a route for the user to logout.

<br>
<br>
<br>

#### Step 8.1 - <span style="text-transform:lowercase">routes/index</span> Module

- We're going to code these three new auth related routes in our `routes/index` module.

- These new routes will need to access the `passport` module, so let's require it in **routes/index.js**:

  ```javascript
  const router = require("express").Router()
  // new code below
  const passport = require("passport")
  ```

<br>
<br>
<br>

#### Step 8.2 - Login Route

- In **routes/index.js**, let's add our login route below our root route:

  ```javascript
  // Google OAuth login route
  router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  )
  ```

- The `passport.authenticate` function will take care of coordinating with Google's OAuth server.

- The user will be presented the consent screen if they have not previously consented.

- Then Google will call our Google callback route...

- Note that we are specifying that we want passport to use the `google` strategy. Remember, we could have more than one strategy in use.

- We are also specifying the _scope_ that we want access to, in this case, `['profile', 'email']`.

<br>
<br>
<br>

#### Step 8.3 - Google Callback Route

- Below our login route we just added, let's add the callback route that Google will call after the user confirms:

  ```javascript
  // Google OAuth callback route
  router.get(
    "/oauth2callback",
    passport.authenticate("google", {
      successRedirect: "/students",
      failureRedirect: "/",
    })
  )
  ```

- Note that we can specify the redirects for a successful and unsuccessful login. For this app, we will redirect the user to see the list of students/facts in the case of a successful login and to the root in case of a failure.

<br>
<br>
<br>

#### Step 8.4 - Logout Route

- The last route to add is the route that will logout our user:

  ```javascript
  // OAuth logout route
  router.get("/logout", function (req, res) {
    req.logout()
    res.redirect("/")
  })
  ```

- Note that the `logout()` method was automatically added to the request (`req`) object by Passport!

- Good time to do another error check.

<br>
<br>

#### Step 9 - Add Login/Logout UI

- We want the navbars in **views/index.ejs** & **views/students/index.ejs** to update dynamically depending upon whether there's an authenticated user or not:

  <img src="https://i.imgur.com/t3tQIML.png">
  <br>
  <br>
  <br>

  **vs**

  <br>
  <br>
  <br>
  <img src="https://i.imgur.com/oLJRWqz.png">

<br>
<br>

#### Step 9 - Add Login/Logout UI

- First we need to update the logic inside of **routes/index.js** & **controllers/students.js** to pass in `req.user` :

```javascript
// inside of ./routes/index.js

router.get("/", function (req, res) {
  res.render("index", {
    user: req.user,
  })
})
```

<br>
<br>
<br>

```javascript

// inside of ./controllers/students.js

function index(req, res) {
  Student.find({}, function(err, students)
   res.render('students/index', {
    students,
    user: req.user
    });
 });
}
```

- Now the logged in student will be the `user` variable that's available inside of **views/index.ejs** & **views/students/index.ejs**.

- If nobody is logged in, `user` will be `undefined` (falsey).

<br>
<br>
<br>

#### Step 9.1 - Add the Login / Logout UI Logic

- We're going to need a link for the user to click to login/out.

- Lets modify **views/index.ejs** & **views/students/index.ejs** as follows:

```html
<nav>
  <div class="nav-wrapper">
    <a href="" class="brand-logo left">SEI Student Fun Facts</a>
    <!-- Add login UI here -->
    <ul class="right">
      <li>
        <% if (user) { %>
        <a href="/logout"
          ><i class="material-icons left">trending_flat</i>Log Out</a
        >
        <% } else { %>
        <a href="/auth/google"
          ><i class="material-icons left">vpn_key</i>Login with Google</a
        >
        <% } %>
      </li>
    </ul>
  </div>
</nav>
```

<br>
<br>
<br>

#### Step 9 - Try Logging In!

- We've finally got to the point where you can test out our app's authentication!

- May the force be with us!

<br>
<br>
<br>

#### Step 10 - Code the First User Story

- Our first user story reads:_I want to add fun facts about myself so that I can amuse others._

- We're going to need a `<form>` with an `<input>` for the fact's text and a submit button.

- However, we **only** want this UI to show within the logged in student's card only.

<br>
<br>
<br>

#### Step 10.1 - Add Dynamic UI

- Let's add some dynamic UI to add a fact inside of **views/students/index.ejs**. Ensure it's added in the correct location

- **NOTE:** There are pre-defined place holders to show you where to add this.

  ```html
  <!-- More Code Above... -->
      <li class="collection-item blue-grey-text text-darken-2"><%= fact.text %></li>
    <% }) %>
  </ul>
    <!-- Place Add Fact UI Here -->

  <!-- new code below -->
  <% if (student._id.equals(user && user._id)) { %>
    <div class="card-action">
      <form action="/facts" method="POST">
        <input type="text" name="text" class="white-text">
        <button type="submit" class="btn white-text">Add Fact</button>
      </form>
    </div>
  <% } %>

  <!-- More code below... -->
  ```

- Note how the `equals` method is being used to compare the `_id`s - this is necessary because they are objects. Also, the `(user && user._id)` prevents an error when there's no `user` logged in.

<br>
<br>
<br>

#### Step 10.2 - Controller Code

- Lastly, let's code the `addFact` action in the **controllers/students.js** controller:

  ```javascript
  function addFact(req, res, next) {
    req.user.facts.push(req.body)
    req.user.save(function (err) {
      res.redirect("/students")
    })
  }
  ```

- Note that `req.user` IS a Mongoose _user_ document!

<br>
<br>
<br>

#### Step 10 - Code the First User Story

- That should take care of our first user story - try it out!

- Yes, the UX is not that great because of the full-page refresh, but we'll address that when we develop single-page apps with React.

- Cool, just one step left!

<br>
<br>
<br>

#### Step 11 - Authorization

- **What is _authorization_?**

- Passport adds a nice method to the request object, `req.isAuthenticated()` that returns `true` or `false` depending upon whether there's a logged in user or not.

- We're going to write our own little middleware function to take advantage of `req.isAuthenticated()` to perform some authorization.

<br>
<br>
<br>

#### Step 11.1 - Authorization Middleware

- As we know by now, Express's middleware and routing is extremely flexible and powerful.

- We can actually **insert** additional middleware functions before a route's final middleware function! Let's modify **routes/students.js** to see this in action:

```javascript
router.get("/students", studentsCtrl.index)

router.post("/facts", isLoggedIn, studentsCtrl.addFact)

router.delete("/facts/:id", isLoggedIn, studentsCtrl.delFact)
```

- Take note of the inserted `isLoggedIn` middleware function!

<br>
<br>
<br>

#### Step 11.2 - Authorization Middleware

- Our custom `isLoggedIn` middleware function, like all middleware, will either call `next()`, or respond to the request.

- Let's put our new middleware at the very bottom of **routes/students.js** - just above the `module.exports`:

  ```javascript
  // Insert this middleware for routes that require a logged in user
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect("/auth/google")
  }
  ```

- That's all there is to it!

<br>
<br>
<br>

## Congrats!

**You have implemented OAuth authentication and authorization!**

<br>
<br>
<br>

#### Review Questions

**❓ Before a web app can use an OAuth provider, it must first \*\***\_\_\_\***\* with it to obtain a \*\***\_\_\_\***\* and a client secret.**

**❓ In your own words, explain what a _session_ is.**

<br>
<br>

### Practice Exercises

- Now you're ready to start your project by implementing OAuth authentication!

- For some challenging practice, complete the remaining three _user stories_:
  - I want to show the user's Google avatar instead of the current icon.
  - I want to be able to delete a fact about myself, in case I make a mistake.

<br>
<br>
<br>
<br>

### References

- [Google OAuth2](https://developers.google.com/identity/protocols/OAuth2)

- [Mongoose](http://mongoosejs.com/)

- [Materialize CSS](http://materializecss.com/)
