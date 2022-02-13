---
track: "Backend Fundamentals"
title: "Biscoff Bakery"
week: 1
day: 3
type: "lab"
---

# Biscoff Bakery

![](https://i.ytimg.com/vi/CIGk1sgCfSg/maxresdefault.jpg)

A new bakery specializing in Biscoff-inspired sweets is opening up soon and has asked you to help get their website started. They've given you some data to work with, but it's up to you to add some view layers to the app and add in some functionality that will allow the owners to add new baked goods when needed. Let's get started!

<br>
<br>
<br>

#### Learning Objectives

- Practice with setting up a basic express server with view layers

<br>
<br>

#### Prerequisites

- JavaScript
- Node
- Express

<br>
<br>
<br>

## Getting Started

The starter code for this lab is a downloadable asset!

<strong><a href="/downloads/backend_fundamentals/biscoff-starter.zip" download>Click here</a></strong> to download it! - You'll perform your work in that folder after you "unzip" it!

<br>
<br>
<br>

#### Provided in the starter code

1. `server.js` has a basic express server up and running, along with routes for _index_ and _show_

1. `package.json` and `package-lock.json` have already been generated with express as a dependency

   - _Remember:_ what terminal command should you run to install dependencies from a package.json file?

1. `models/bakedgoods.js` holds your 'database' for this app, in this case a bunch of cookie butter based baked goods!

<br>
<br>
<br>

## Activity

Currently, the _index_ and _show_ routes only sends JSON data to the browser -- update the routes so that there are actual view pages for both

<br>
<br>
<br>

### Adding Views

1. On the **index page**, display the names and prices of all the baked goods

   - Make it so that the names are links to the baked good's show page

1. On the **show page**, display the name, price, and image of the baked good
   - Provide a link somewhere on the show page that lets the user return to the index

Now, the bakery owners want the ability to add new baked good products.

<br>
<br>
<br>

### Adding New and Create Routes

1. Make a **new page** that serves up a form for adding new baked goods

1. Make a **post route** that handles the form submission and pushes the new baked good into the 'database'
   - Make it so that upon submission, the app redirects back to the index page where you should be able to see the new baked good added

<br>
<br>
<br>

### Hungry for More?

1. Practice some CSS/design and style the app! Want practice with using CSS frameworks? Consider using [Skeleton](http://getskeleton.com/), [Materialize](http://materializecss.com/), [Bulma](https://bulma.io/), or find another of your choosing!
