---
track: "Backend Fundamentals"
title: "New and Create Routes"
week: 1
day: 3
type: "lecture"
---

# New and Create Routes

<br>
<br>
<br>

## Lesson Objectives

1. Create a new route and page
1. Add interactivity to your site with forms
1. Create a post route
1. Define middleware
1. View body of a post request
1. Redirect the user to another page

<br>
<br>
<br>

## Create a New Route and Page

1. Let's create a page that will allow us to create a new fruit
1. First, we'll need a route for displaying the page in our server.js file **IMPORTANT: put this above your show route, so that the show route doesn't accidentally pick up a `/fruits/new` request**

```javascript
//put this above your show.ejs file
app.get('/fruits/new', (req, res) => {
  res.render('new.ejs');
});
```

1. Now lets's create the html for this page in our `/views/new.ejs` file

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Create a new Fruit</title>
  </head>
  <body>
    <h1>New Fruit page</h1>
  </body>
</html>
```

<br>
<br>
<br>

1. Visit `http://localhost:3000/fruits/new` to see if it works

<br>
<br>
<br>

## Add Interactivity to Your Site With Forms

We can use forms to allow the user to enter their own data:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Create a new Fruit</title>
  </head>
  <body>
    <h1>New Fruit page</h1>
    <!--  NOTE: action will be the route, method will be the HTTP verb-->
    <form action="/fruits" method="POST">
      Name: <input type="text" name="name" /><br />
      Color: <input type="text" name="color" /><br />
      Is Ready To Eat: <input type="checkbox" name="readyToEat" /><br />
      <input type="submit" value="Create Fruit" />
    </form>
  </body>
</html>
```

**NOTE: the form element has an action and a method attribute. We get these values from our RESTful routes table. We'll need this info for the next step too.**

<br>
<br>
<br>

## Create a POST Route

Since the form in the last step tells the browser to create a POST request to `/fruits`, we'll need to set up a route handler for this kind of request

```javascript
app.post('/fruits', (req, res) => {
  res.send('hi');
});
```

<br>
<br>
<br>

## Define Middleware

We can have a function execute for all routes:

```javascript
app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});
```
<br>
<br>
<br>

- This is called **'middleware'**
- It runs in the middle of the request response cycle (in the middle)
  - sometime after the request is received, but before the final route handler is called
- Be sure to put middleware at the top of your `server.js` file, so that other routes don't handle the request and send the response before the middleware can be executed
- Most of the time, you won't write your own middleware, but a lot of plugins and extended functionality of express exist as middleware

<br>
<br>
<br>

## View Body of a POST Request

1. The POST request to our sever has data in it (name, color, readyToEat, etc).
1. We can easily access this data with a middleware function
1. Tell express to use the middleware

```javascript
//near the top, around other app.use() calls
app.use(express.urlencoded({ extended: false }));
```

<br>
<br>
<br>

1.  Now, inside the POST to `/fruits` route handler, we can do the following:

```javascript
app.post('/fruits', (req, res) => {
  console.log(req.body);
  res.send('data received');
});
```

<br>
<br>
<br>

1.  Push this data into our fruits array:

```javascript
app.post('/fruits', (req, res) => {
  if (req.body.readyToEat === 'on') {
    //if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true; //do some data correction
  } else {
    //if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false; //do some data correction
  }
  fruits.push(req.body);
  console.log(fruits);
  res.send('data received');
});
```

<br>
<br>
<br>

## Redirect the User to Another Page

- The data has been added to our fruits array
- Let's send the user back to the fruits index page upon completion

```javascript
app.post('/fruits', (req, res) => {
  if (req.body.readyToEat === 'on') {
    //if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true;
  } else {
    //if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false;
  }
  fruits.push(req.body)
  res.redirect('/fruits') //send the user back to /fruits
})
```

<br>

Put a link in the index page going to the new page

```html
<nav>
  <a href="/fruits/new">Create a New Fruit</a>
</nav>
```

<br>
<br>
<br>

## References

- [Using Middleware w/Express](https://expressjs.com/en/guide/using-middleware.html)
