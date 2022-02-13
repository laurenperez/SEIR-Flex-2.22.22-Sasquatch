---
track: "Backend Fundamentals"
title: "Intro to MVC"
week: 7
day: 1
type: "lecture"
---

# Intro to MVC

<br>
<br>
<br>

## Lesson Objectives

1. Define MVC and explain why it matters
1. Move our data into a separate file
1. Move our presentation code into an EJS file

<br>
<br>
<br>

## Define MVC and explain why it matters

- One of the core tenants of good programming is to compartmentalize your code
- Already our code is getting a little messy
  - we have data, app instantiation (listening), and routes all in one file
- One way to keep an app from getting messy is to separate it out into three sections
  - Models
    - data (javascript variables)
  - Views
    - how the data is displayed to the user (HTML)
  - Controllers
    - the glue that connects the models with the views
- This allows various developers to divide up a large code base
  - minimizes likelihood of developers overwriting each others code
  - allows developers to specialize
    - one can focus just on getting good with dealing with data
    - one can focus just on getting good with html
    - one can focus just on getting good with connecting the two
- Think of MVC as a restaurant
  - Models are the cook
    - prepares food/data
  - Views are the customer
    - consumes food/data
  - Controllers are the waiter
    - brings food from cook to customer
    - has no idea how food/data is prepared
    - has no idea how the food/data is consumed

<br>
<br>
<br>

## Move our data into a separate file

1. Create a directory called `models` inside our app directory
1. Inside `/models`, create a data file named fruits.js
1. Put your fruits variable in there


```javascript
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
```

<br>
<br>

1.  We now require that file in the original `server.js`

```javascript
const fruits = require('./models/fruits.js'); //NOTE: it must start with ./ if it's just a file and not an NPM package
```

<br>
<br>
<br>

1.  But, we could have multiple variables in our `/models/fruits.js` file. - How does javascript know which variable in `/models/fruits.js` to assign to the fruits const in `server.js` (the result of the `require()` statment)? - We must tell javascript which variable we want to be the result of the `require()` statement in `server.js`

```javascript
//at the bottom of /models/fruits.js
module.exports = fruits;
```

<br>
<br>
<br>


## Move our presentation code into an EJS file

Now we want to move our View code (HTML) into a separate file just like we did with the data

1. Install the NPM package EJS (Embedded JavaScript)
   - this is a templating library that allows us to mix data into our html
   - the HTML will change based on the data!
   - `npm install ejs`
1. Create a views directory inside our app directory
1. Inside `/views`, create a file called show.ejs
   - this will be the html for our show route
1. Put some html into show.ejs

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Fruits App</title>
  </head>
  <body>
    <h1>Fruits show page</h1>
  </body>
</html>
```

<br>
<br>
<br>

1. Now, instead of `res.send('some text')`, we can call `res.render('show.ejs')`

   - express will know to look inside the `/views` directory
   - it will send the html in the show.ejs file as a response

```javascript
app.get('/fruits/:indexOfFruitsArray', (req, res) => {
  res.render('show.ejs');
});
```

<br>
<br>
<br>

Now lets mix our data into our HTML

1. Our route is acting like the controller now. Let's gather the data and pass it to the view

```javascript
app.get('/fruits/:indexOfFruitsArray', (req, res) => {
    res.render('show.ejs', {
        //second param must be an object
        fruit: fruits[req.params.indexOfFruitsArray], //there will be a variable available inside the ejs file called fruit, its value is fruits[req.params.indexOfFruitsArray]
    });
});
```


<br>
<br>
<br>   

1. Access the data in the view:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Fruits App</title>
  </head>
  <body>
    <h1>Fruits show page</h1>
    The <%=fruit.name; %> is <%=fruit.color; %>. <% if(fruit.readyToEat ===
    true){ %> It is ready to eat <% } else { %> It is not ready to eat <% }
    %>
  </body>
</html>
   ```


<br>
<br>
<br>

1. Note that there are two types of new tags
   - `<% %>` run some javascript
   - `<%= %>` run some javascript and insert the result of the javascript into the HTML

<br>
<br>
<br>

## Update Index Route:

Update the index route in `server.js`:

```javascript
app.get('/fruits/', (request, response) => {
  response.render('index.ejs', {
    allFruits: fruits,
  });
});
```


<br>
<br>
<br>

Create an `index.ejs` file:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Fruits App</title>
  </head>
  <body>
    <h1>Fruits index page</h1>
    <ul>
      <% for(let i = 0; i < allFruits.length; i++) { %>
      <li>
        <a href="/fruits/<%=i%>"><%=allFruits[i].name %></a>
      </li>
      <% } %>
    </ul>
  </body>
</html>
```


<br>
<br>
<br>

Add a link back to the index route in `show.ejs`:

```html
<a href="/fruits">Back to Index</a>
```

<br>
<br>
<br>

## References

- [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
- [EJS](https://ejs.co/)
