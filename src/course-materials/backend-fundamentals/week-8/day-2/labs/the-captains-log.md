---
track: "Backend Fundamentals"
title: "The Captain's Log - Full CRUD Project"
week: 8
day: 2
type: "lab"
---

# The Captain's Log - Full CRUD Project

![Insert Pun Image here](https://i.imgflip.com/2174sq.jpg)

<br>
<br>
<br>

#### Learning Objectives

- Full CRUD app with a mongo database

<br>
<br>
<br>

#### Prerequisites

- JavaScript
- Express / Node
- Mongo / Mongoose

<br>
<br>
<br>

## Multi-part/Multi-day Lab

Every great captain, whether on the waters or in the skies, keeps a daily log.

Let's build the perfect Captain's Log App for our extraordinary captains.

There are many ways to get started building an app. This lab follows a specific order for two reasons:

- to align with the content of lecture
- to give you an order to guide you to create small bits of functionality and test each one before moving on to the next part

If you finish lab early consider:

- adding some CSS and practice styling your app
- try working with the date object! Try to make it look human readable in HTML. It's tricky! [A Hint](https://momentjs.com/)
- try working through the next section of the lab before it is covered in lecture - see what you can figure out
- **SUPER BONUS** - Once you finish this whole lab, add a second model for comments, it should have the name of the person who wrote it, and some text for the comment (maybe time stamps?). This model should 'belong' the the post, the data should be related in some way. Do your own research on how to set up a `one-to-many` relationship (one post can have many comments, one comment only belongs to one post), in MongoDB. Use Mongo Documents, Google, or [Matt's Notes](../../w07d01/instructor_notes) - note we will not have class time to teach a second, related model.

<br>
<br>
<br>

### Set up

Let's keep track of our Restful Routes as we build out our app. Copy/paste this table into a fresh file, open an excel/sheets spreadsheet or draw on a piece of paper. Feel free to add more columns and notes to help you put it all together.

Index, New and Create has been completed for you.

<br>
<br>
<br>

#### Restful Routes

|  #  | Action  |    URL    | HTTP Verb | EJS view filename |   mongoose method    |
| :-: | :-----: | :-------: | :-------: | :---------------: | :------------------: | --- |
|  1  |  Index  |  /logs/   |    GET    |     index.ejs     |      Log.find()      |
|  2  |  Show   |           |           |                   |                      |
|  3  |   New   | /logs/new |    GET    |      new.ejs      |         none         |
|  4  | Create  |  /logs/   |   POS T   |       none        | Log.create(req.body) |
|  5  |  Edit   |           |           |                   |                      |
|  6  | Update  |           |           |                   |                      |
|  7  | Destroy |           |           |                   |                      |     |

1. In your `student_labs` folder
1. `mkdir captains_log`
1. `cd catpains_log`
1. create a new express app

<br>
<br>
<br>

### New

1. create a `new` route in your `server.js` - be sure to follow the Restful convention
1. just have it `res.send('new')` as the response for now
1. make a views directory
1. install `ejs`
1. `touch views/new.ejs`
1. Create the view, it should contain a form with the following:

- `form` with `action="/logs"` and `method="POST"`
- `input` type text for a `title`
- `input` type textarea for an `entry`
- `input` type checkbox for `shipIsBroken`
- `input` type submit

1. change your `res.send` to `res.render` this view
1. don't forget to `git add` and `git commit` your work, give yourself an informative commit message so you can trace back your work, if you need to

<br>
<br>
<br>

### Create

1. create a `create` route in your `server.js` - be sure to follow the Restful convention
1. just have it `res.send('received')` as the response for now
1. use and configure `body-parser` in your `server.js` (note, this package was once separate, but has been added back in to express [more details](https://expressjs.com/en/4x/api.html#express.urlencoded)
1. check to make sure it works by changing the `res.send` from a string to sending the `req.body` - it should send the data you inputted to your `new` form
1. upgrade your data
1. change the input of your checkbox to be true/false rather than `on`
1. now when you check your `res.send(req.body)` you should see true/false rather than 'on/off' - the rest of your data should stay the same
1. don't forget to `git add` and `git commit` your work, give yourself an informative commit message so you can trace back your work, if you need to

<br>
<br>
<br>

### Mongo

1. install mongoose and configure it in your `server.js`

<br>
<br>
<br>

### Logs Model

1. `mkdir models`
1. `touch models/logs.js`
1. Create the logs schema

- title: string
- entry: string
- shipIsBroken: Boolean (bonus: set a default to true)
  - Super bonus:
    - as a second argument to mongoose.Schema(), add `{ timestamps: true }`

<br>
<br>
<br>

### Upgrade your Create Route

1. upgrade your code to create your log in MongoDB
1. have your route redirect to the show page after create
1. don't forget to `git add` and `git commit` your work, give yourself an informative commit message so you can trace back your work, if you need to
1. Stretch: make a seed file and seed it

<br>
<br>
<br>

### Index Route

1. In `server.js` make an index route, be sure to follow the Restful convention
1. first, just test it by having it `res.send('index')`
1. Don't forget to fill out your Restful table!
1. create `index.ejs` and change your `res.send` to `res.render` this page
1. upgrade your route and ejs to render all the logs in your database, just make an unordered list of the titles for now
1. Add a link to the create page
1. don't forget to `git add` and `git commit` your work, give yourself an informative commit message so you can trace back your work, if you need to

<br>
<br>
<br>

### Show Route

1. Fill out your Restful table
1. In `server.js` make a show route, be sure to follow the Restful convention
1. create a mongo query and `res.send` your data as a string
1. upgrade your `index.ejs` so that each title links to its show page
1. Create a `show.ejs` and add HTML

- show the title
- show the entry
- show whether the ship is broken or not
- add a link back to the index page
- bonus:
- if you had added time stamps to your model, display the date the entry was created

1. upgrade your `res.send` to a `res.render` of your `show.ejs`
1. don't forget to `git add` and `git commit` your work, give yourself an informative commit message so you can trace back your work, if you need to

<br>
<br>
<br>

### Delete Route

1. Fill out your Restful table
1. in your `index.ejs`, add a delete form
1. install and configure `method-override`
1. upgrade your delete form to have the appropriate action and method
1. make your delete route in your `server.js`
1. make your delete route delete your log and redirect back to your index route
1. don't forget to `git add` and `git commit` your work, give yourself an informative commit message so you can trace back your work, if you need to

<br>
<br>
<br>

### Edit Route

1. Fill out your Restful table
1. in your `index.ejs`, add a link to your edit route
1. create your edit route in your `server.js`
1. create your `edit.ejs`
1. test it to make sure it works as expected (be sure to populate your form with your log's data)
1. don't forget to `git add` and `git commit` your work, give yourself an informative commit message so you can trace back your work, if you need to

<br>
<br>
<br>

### Put Route

1. Fill out your Restful table
1. upgrade your` edit.ejs` form to have the appropriate action and method
1. create your PUT route
1. First, just have it `res.send` the updated log and check it is as expected
1. change the `res.send` to a `res.redirect` to your index page
1. don't forget to `git add` and `git commit` your work, give yourself an informative commit message so you can trace back your work, if you need to

<br>
<br>
<br>

### Router

1. `mkdir controllers`
1. `touch controllers/logs.js`
1. work on refactoring your code so your logs routes are in your controller file, rather than in `server.js`

<br>
<br>
<br>

### Bonuses

1. The captain wants to keep track of eating habits: make a new set of routes in a new file in your controller folder called foodlogs
1. build out the 7 restful routes for foodlogs, include a new model with whatever properties make sense
1. make a seed file and seed it
1. have your update route redirect to the show page of the log that was edited
1. research `res.redirect('back')`
1. create a seed file and seed your database
1. work on your css, make this Captain's Log look awesome!
1. if you have timestamps, figure out how to edit/display the edited date
1. research ejs partials and implement them
