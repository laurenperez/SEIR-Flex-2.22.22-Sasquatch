---
track: "Backend Fundamentals"
title: "Intro to REST"
week: 7
day: 1
type: "lecture"
---

# Intro to REST

<br>
<br>
<br>

## Lesson Objectives

1. Describe REST and list the various routes
1. Create an Index route
1. Install JSONView to make viewing JSON easier
1. Create a Show route
1. Enhance the data in your data array

<br>
<br>
<br>

## Describe REST and list the various routes

- REST stands for Representational state transfer
- It's just a set of principles that describe how networked resources are accessed and manipulated
- We have [7 RESTful routes](https://gist.github.com/alexpchin/09939db6f81d654af06b) that allow us basic operations for reading and manipulating a collection of data:

| **URL**          | **HTTP Verb** | **Action** |
| ---------------- | ------------- | ---------- |
| /photos/         | GET           | index      |
| /photos/:id      | GET           | show       |
| /photos/new      | GET           | new        |
| /photos          | POST          | create     |
| /photos/:id/edit | GET           | edit       |
| /photos/:id      | PATCH/PUT     | update     |
| /photos/:id      | DELETE        | destroy    |

<br>
<br>
<br>

## Create an Index route

<br>
<br>
<br>

## Setup our app

1.  Create a directory called `fruits`
2.  npm init
3.  Create a `server.js` file.
4.  install express
5.  require express and set up a basic server that logs listening when you start the app
6.  start the app with nodemon and make sure it is working

Let's have a set of resources which is just a javascript array. To create an index route, we'd do the following:

```javascript
const express = require('express');
const app = express();

const fruits = ['apple', 'banana', 'pear'];

app.get('/fruits/', (req, res) => {
  res.send(fruits);
});

app.listen(3000, () => {
  console.log('listening');
});
```


<br>
<br>
<br>

Now go to `http://localhost:3000/fruits/`

<br>
<br>
<br>

## Install JSON Formatter to make viewing JSON easier

- JSON stands for Javascript Object Notation
- It's just a way to represent data that looks like a Javascript object or array
- JSON Formatter extension just makes it easier to view JSON data.

If you don't have it already, let's make sure we install it:

1. [Click here](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa)
1. Click on "Add To Chrome"

<br>
<br>
<br>

## Create a Show route

To create a show route, we'd do this:

```javascript
const express = require('express');
const app = express();

const fruits = ['apple', 'banana', 'pear'];

app.get('/fruits/', (req, res) => {
  res.send(fruits);
});

//add show route
app.get('/fruits/:indexOfFruitsArray', (req, res) => {
  res.send(fruits[req.params.indexOfFruitsArray]);
});

app.listen(3000, () => {
  console.log('listening');
});
```

<br>
<br>
<br>


Now go to `http://localhost:3000/fruits/1`

<br>
<br>
<br>

## Enhance the data in your data array

- Right now are data array `fruits` is just an array of strings
- We can store anything in the array, though.
- Let's enhance our data a bit:

```javascript
const express = require('express');
const app = express();

const fruits = [
  {
    name: 'apple',
    color: 'red',
    readyToEat: true,
  },
  {
    name: 'pear',
    color: 'green',
    readyToEat: false,
  },
  {
    name: 'banana',
    color: 'yellow',
    readyToEat: true,
  },
];

app.get('/fruits/', (req, res) => {
  res.send(fruits);
});

app.get('/fruits/:indexOfFruitsArray', (req, res) => {
  res.send(fruits[req.params.indexOfFruitsArray]);
});

app.listen(3000, () => {
  console.log('listening');
});
```

<br>
<br>
<br>

## References

- [REST](https://en.wikipedia.org/wiki/Representational_state_transfer)
- [ExpressJS Application API Reference](https://expressjs.com/en/4x/api.html#app)
