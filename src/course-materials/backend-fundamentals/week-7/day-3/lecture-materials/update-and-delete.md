---
track: "Backend Fundamentals"
title: "Update and Delete With Express"
week: 1
day: 4
type: "lecture"
---

# Update and Delete With Express

<br>
<br>
<br>

## Lesson Objectives

1. Create a DELETE Route
1. Send a DELETE request from the index page 
1. Create an edit route
1. Create a link to the edit route
1. Create an update route
1. Send a PUT request from the edit page 

<br>
<br>
<br>

## Delete

<br>
<br>
<br>

### Create a Delete Route

Inside our server.js file, add a DELETE route:

```javascript
app.delete('/fruits/:indexOfFruitsArray', (req, res) => {
  fruits.splice(req.params.indexOfFruitsArray, 1); //remove the item from the array
  res.redirect('/fruits'); //redirect back to index route
});
```

<br>
<br>
<br>

Test it using:

```shell
curl -X DELETE localhost:3000/fruits/1
```

<br>
<br>
<br>

### Send a DELETE Request From the Index Page 

Inside our `index.ejs` file, add a form with just a delete button.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Fruits App</title>
    <link rel="stylesheet" href="/css/app.css" />
  </head>
  <body>
    <h1>Fruits index page</h1>
    <ul>
      <% for(let i = 0; i < fruits.length; i++){ %>
      <li>
        The <a href="/fruits/<%=i%>"><%=fruits[i].name; %></a> is
        <%= fruits[i].color; %>.
        <!--  ADD DELETE FORM HERE-->
        <form>
          <input type="submit" value="DELETE" />
        </form>
      </li>
      <% } %>
    </ul>
    <nav>
      <a href="/fruits/new">Create a New Fruit</a>
    </nav>
  </body>
</html>
```

<br>
<br>
<br>

When we click "DELETE" on our index page (index.ejs), the form needs to make a DELETE request to our DELETE route.

The problem is that forms can't make DELETE requests. Only POST and GET. We can fake this, though. First we need to install an npm package called `method-override`

```shell
npm install method-override
```

<br>
<br>
<br>

Now, in our server.js file, add:

```javascript
//include the method-override package
const methodOverride = require('method-override');
//...
//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method'));
```

<br>
<br>
<br>

Now go back and set up our delete form to send a DELETE request to the appropriate route

```html
<form action="/fruits/<%=i; %>?_method=DELETE" method="POST"></form>
```

<br>
<br>
<br>

## Update

<br>
<br>
<br>

### Create an edit route

In our `server.js`, create a GET route which will just display an edit form for a single todo item.

```javascript
app.get('/fruits/:indexOfFruitsArray/edit', (req, res) => {
  res.render(
    'edit.ejs', //render views/edit.ejs
    {
      //pass in an object that contains
      fruit: fruits[req.params.indexOfFruitsArray], //the fruit object
      index: req.params.indexOfFruitsArray, //... and its index in the array
    }
  );
});
```

<br>
<br>
<br>

Now create a very basic form for editing in `views/edit.ejs`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Fruits App</title>
    <link rel="stylesheet" href="/css/app.css" />
  </head>
  <body>
    <h1>Edit Fruit Page</h1>
    <form>
      <!--  NOTE: the form is pre-populated with values for the server-->
      Name: <input type="text" name="name" value="<%=fruit.name%>" /><br />
      Color: <input type="text" name="color" value="<%=fruit.color%>" /><br />
      Is Ready To Eat: <input type="checkbox" name="readyToEat" <%
      if(fruit.readyToEat === true){ %> checked <% } %> />
      <br />
      <input type="submit" name="" value="Submit Changes" />
    </form>
  </body>
</html>
```

<br>
<br>
<br>

### Create a link to the edit route

Inside our `index.ejs` file, add a link to our edit route which passes in the index of that item in the url

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Fruits App</title>
    <link rel="stylesheet" href="/css/app.css" />
  </head>
  <body>
    <h1>Fruits index page</h1>
    <ul>
      <% for(var i = 0; i < fruits.length; i++){ %>
      <li>
        The <a href="/fruits/<%=i%>"><%=fruits[i].name; %></a> is
        <%=fruits[i].color; %>. <% if(fruits[i].readyToEat === true){ %> It is
        ready to eat <% } else { %> It is not ready to eat <% } %>
        <form action="/fruits/<%=i; %>?_method=DELETE" method="POST">
          <input type="submit" value="DELETE" />
        </form>
        <!-- Add edit link here  -->
        <a href="/fruits/<%=i; %>/edit">Edit</a>
      </li>
      <% } %>
    </ul>
    <nav>
      <a href="/fruits/new">Create a New Fruit</a>
    </nav>
  </body>
</html>
```

<br>
<br>
<br>

### Create an update route

In order to UPDATE, we use the http verb PUT.

Inside server.js add the following:

```javascript
app.put('/fruits/:indexOfFruitsArray', (req, res) => {
  //:indexOfFruitsArray is the index of our fruits array that we want to change
  if (req.body.readyToEat === 'on') {
    //if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true;
  } else {
    //if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false;
  }
  fruits[req.params.indexOfFruitsArray] = req.body //in our fruits array, find the index that is specified in the url (:indexOfFruitsArray).  Set that element to the value of req.body (the input data)
  res.redirect('/fruits'); //redirect to the index page
})
```

<br>
<br>
<br>

### Send a PUT Request From the Edit Page 

When we click "Submit Changes" on our edit page (edit.ejs), the form needs to make a PUT request to our update route

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Fruits App</title>
    <link rel="stylesheet" href="/css/app.css" />
  </head>
  <body>
    <h1>Edit Fruit Page</h1>
    <!--  ADD action attribute to form tag-->
    <form action="/fruits/<%=index%>">
      Name: <input type="text" name="name" value="<%=fruit.name%>" /><br />
      Color: <input type="text" name="color" value="<%=fruit.color%>" /><br />
      Is Ready To Eat: <input type="checkbox" name="readyToEat" <%
      if(fruit.readyToEat === true){ %> checked <% } %> />
      <br />
      <input type="submit" name="" value="Submit Changes" />
    </form>
  </body>
</html>
```

<br>
<br>
<br>

The problem is that forms can't make PUT requests. Only POST and GET. We can fake this, though with method override:

```html
<form action="/fruits/<%=index%>?_method=PUT" method="POST"></form>
```

<br>
<br>
<br>

## References

- [method-override](https://www.npmjs.com/package/method-override)
