---
track: "Backend Fundamentals"
title: "Exobiology I"
week: 1
day: 4
type: "lab"
---

# Exobiology I

![](https://i.imgur.com/naenSjp.png)

En route to Starbase Regula I on a routine mission, your starship encounters a previously uncharted planet in the Mutara Nebula. A science team is dispatched to the surface to catalogue the flora and fauna of the planet. You will be creating an express app for the uncharted planet.

<br>
<br>
<br>

#### Learning Objectives

- Full CRUD App

<br>
<br>
<br>

#### Prerequisites

- JavaScript
- Node / Express

<br>
<br>
<br>

## Getting Started

1. Create a project folder: `mkdir uncharted-planet`
1. `cd uncharted-planet`
1. Create a new express app
   - `npm init`
   - `touch server.js`
   - what other steps are there to setting up an express app?

<br>
<br>
<br>

## New Route

> Now that the planet is made, our starship can land! Let's make the planet inhabitable by creating a new route.

1. Make a `new` route in your `server.js` and test that it's working correctly by having it `res.send('this is the new route')`
1. Make a views directory and `touch views/new.ejs` (_NOTE:_ don't forget to `npm i ejs`!
1. In the ejs file, make a `form` with `input`s
   - You will be creating the scientists that come to explore the planet, so include inputs for: name and description
1. Back in your server file, update your `new` route so that it renders the new view page we just created

<br>
<br>
<br>

## Create Route

> Great, the planet is now inhabitable! Let's start sending the scientists in by making a create route.

1. Make a `create` route in your `server.js`
1. Remember to set up the `body-parser` middleware ... i.e. `app.use(express.urlencoded(..`
1. Check to make sure your create route is working correctly and connected to your `new` form we made above by using `res.send(req.body)`
1. Once you're sure the create route is working, update your route so that the newly created data is being saved somewhere
1. Now, let's inhabit the planet! Create 5 scientists!
   - For example, you can make a scientist with the name `Xxylox` that has a description of `A spiky armadillo-like creature that wants to snuggle you with its spikes`

<br>
<br>
<br>

## Index Route

> Now that the planet is inhabited, we should keep a directory of all the inhabitants. Let's create an index page

1. Create an `index` route in your `server.js` and test that the route is correct by `res.send('index')`
1. Create an `index.ejs` file and upgrade your `index` route so that it renders this file
1. Upgrade your `index` route and `index.ejs` files so that it displays all the scientists in your database

<br>
<br>
<br>

## Delete Route

> Uh oh! It turns out that the planet can't handle much and it's quickly reached capacity! We have to send some scientists away by creating a delete route.

1. In your `index.ejs` add a delete form onto all the scientists
1. Don't forget to install and configure `method-override`
1. Create a `delete` route in your `server.js`
1. Make sure the `delete` route deletes just the one specified object/scientist, then redirects to the index page

<br>
<br>
<br>

## Hungry for More?

> RUN! Your team has been ambushed by pirates intent on stealing your data! Quick, delete the "database" so they don't get their hands on it!

1. Using a `delete` route, wire up a button that deletes _all_ data at once!

<br>
<br>
<br>

### Hungrier for Even More

1. Create a `show` page/route for each scientist and link to them from the index page
1. Create categories for the different types of life. For example, store "Plants" and beneath that, "Flowers", and then individual entries.
1. Add a "verified" flag to certain entries and prevent them from being deleted. After all, as a senior Exobiologist _you_ know what you're looking at!
