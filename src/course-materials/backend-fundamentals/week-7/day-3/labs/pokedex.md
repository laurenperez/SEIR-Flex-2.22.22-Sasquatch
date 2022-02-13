---
track: "Backend Fundamentals"
title: "Pokedex"
week: 1
day: 4
type: "lab"
---

# Pokedex

Your mission is to be the very best, like no one ever was, at making a Pokémon manager (a Pokédex).

<br>
<br>
<br>

#### Learning Objectives

- Full CRUD App

<br>

#### Prerequisites

- JavaScript
- Node / Express
- HTML / CSS

<br>

## Getting Started

All you are given is a pokemon.js file that has all the raw data for 151 Pokémon (it's over 50,000 lines of code). You can render this as JSON in your browser. If you decide to check it out in your text editor, don't click on or open this file unless you are prepared to wait a minute or so for it to load. It is a huge file.

It is up to you how you build your app, in what order you want to do things, what kind of design flow your app will have, where you put your delete button, etc, and what parts of the Pokémon data your pages will display.

There are a few requirements to keep in mind:

<br>
<br>
<br>

### MVP (Minimum Viable Product)

Your app should:

- display a bunch of Pokémon images on the index
- have separate show pages for each Pokémon, accessible by clicking on a Pokémon's image on the index page
- have the ability to add a new Pokémon
- have the ability to edit existing Pokémon
- have the ability to delete Pokémon
- have some styling

<br>
<br>
<br>

### Setting up

<strong><a href="/downloads/backend_fundamentals/pokedex.zip" download>Download</a></strong> the `pokedex` folder

1. Ideally, your app should follow the MVC format of models, views, and controllers (these are your routes for now).

1. However, note you don't actually need a controllers folder for now since all your routes will be in your `server.js` file

<br>
<br>
<br>

### Routes

Your app should use RESTful routes:

- Index
  - GET `/pokemon`<br>
- Show
  - GET `/pokemon/:id`<br>
- New
  - GET `/pokemon/new`<br>
- Edit
  - GET `/pokemon/:id/edit`<br>
- Create
  - POST `/pokemon`<br>
- Update
  - PUT `/pokemon/:id`<br>
- Destroy
  - DELETE `/pokemon/:id`<br>

<br>
<br>
<br>

### Need a jumpstart?

<details><summary><strong>Click for some example starter code</strong></summary>
<pre>
const express = require('express');
const app = express();

const Pokemon = require('../models/pokemon.js');

// INDEX
app.get('/', (req, res) => {
res.render('index.ejs', { data: Pokemon });
});

// SHOW
app.get('/:id', (req, res) => {
res.render('show.ejs', { data: Pokemon[req.params.id] });
});

</pre>
</details>

<br>
<br>
<br>

## Data

<br>
<br>
<br>

### Notes on the Pokémon data and what to display

The `pokemon.js` file is massive and there is a ton of data to parse through. You need not display all of it on your pages. On your index page, you can just render the images.

Here are suggestions for what to display on your Pokémon's show page:

- The pokemon's name
- The image of the pokemon
- An unordered list of the Pokemon's types (eg. water, poison, etc).
- The pokemon's stats for HP, ATTACK, and DEFENSE.

<br>
<br>
<br>

## Style Your App

Try and make your app look and act nicely with static assets _(set up a public folder and add some css, js)_

Consider using some jQuery!

<br>
<br>
<br>

### Need some style inspiration?

These are screenshots from what other students have done to their Pokedex **_(Click Each Example To See Illustration)_**:

<details>
<summary><strong>Example 1</strong></summary>

![](https://imgur.com/MZ361IP.png)

![](https://imgur.com/65HTgw1.png)

</details>

<details>
<summary><strong>Example 2</strong></summary>

![](https://imgur.com/XsaaJ2x.png)

![](https://imgur.com/zppz3ev.png)

</details>

<details>
<summary><strong>Example 3</strong></summary>

![](https://imgur.com/ZRFfwgR.png)

![](https://imgur.com/gEOi0KX.png)

</details>

<br>
<br>
<br>

## Commits

The order of your commits this time does not matter, but refer back to the MVP to make sure that you're meeting all of the requirements. Make your commits **as you complete the work**, not all at once in the end! Some sample commits can be found below.

<details><summary><strong>Click for sample commit messages</strong>:</summary>

<br>
<br>

"Server is working and displays a plain index page"

<br>
<br>

"Displays a bunch of Pokémon images on the index".

<br>
<br>

"Has separate show pages for each Pokémon".

<br>
<br>

"Has the ability to add a new Pokémon".

<br>
<br>

"Has the ability to edit existing Pokémon".

<br>
<br>

"Has the ability to delete Pokémon".

<br>
<br>

"The app uses RESTful routing, all seven RESTful routes".

<br>
<br>

"View templates are complete".

<br>
<br>

"Static assets included (CSS) and styled app".

</details>

<br>
<br>
<br>

## Deliverables

- A Pokedex app that meets all the MVP requirements outlined at the beginning of this markdown.

<br>
<br>
<br>

## Technical Requirements

- Your app MUST run without syntax errors. If there are errors you can't solve, comment them out and leave a comment above explaining what is wrong
