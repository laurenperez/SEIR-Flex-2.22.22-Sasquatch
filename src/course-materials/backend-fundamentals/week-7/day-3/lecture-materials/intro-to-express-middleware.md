---
track: "Backend Fundamentals"
title: "Intro to Express Middleware"
week: 1
day: 4
type: "lecture"
---

# Express Middleware

<br>
<br>
<br>
<br>

### Learning Objectives

- Students Will Be Able To:
  - Describe the Purpose of Middleware
  - Use `method-override` Middleware and HTML Forms to Add, Update & Delete Data on the Server
  - Use Query Strings to Provide Additional Information to the Server

<br>
<br>
<br>

### Roadmap

- Setup
- What is Middleware?
- Our First Middleware
- Key Middleware
- Express Request-Response Cycle
- Creating To-Dos
- method-override Middleware
- Delete a To-Do
- Exercise: Update a To-Do

<br>
<br>
<br>

#### Setup

- This lesson builds upon the `express-todos` project created in the previous lesson. Make sure that you're in this folder and have it open in your text editor.

<br>
<br>
<br>

#### What is Middleware?

- In the Intro to Express lesson, we identified the three fundamental capabilities provided by web application frameworks:

  1.  The ability to define routes
  2.  The ability to process HTTP requests using middleware
  3.  The ability to use a view engine to render dynamic templates

- We've already defined routes and rendered dynamic templates.

- In this lesson we complete the trifecta by processing requests using middleware.

- A middleware is simply a function with the following signature:

```javascript
function(req, res, next) {}
```

- As you can see, middleware have access to the _request_ (`req`) and _response_ (`res`) objects - this allows middleware to modify them in anyway they see fit.

- Once a middleware has done its job, it either calls `next()` to pass control to the next middleware in the pipeline **or** ends the request as we've been doing with the `render` & `redirect` methods...

- Yes, actually you have already written middleware - the controller actions, `todosCtrl.index` & `todosCtrl.show`, are middleware!
- The controller middleware functions didn't need to define the `next` parameter because they were at the **end of the middleware pipeline**. That is, they ended the request/response cycle by calling a method on the `res` object, e.g., `res.render`.

- The `next` function is also used for error handling.

- There's no better way to understand middleware than to see one in action.

- Open **server.js** and add this "do nothing" middleware:

```javascript
app.set('view engine', 'ejs')

// add middleware below the above line of code
app.use(function (req, res, next) {
  console.log('Hello Intrepid Learner!')
  next()
})
```

- Type `nodemon` to start the server, browse to `localhost:3000`, and check terminal.

<br>
<br>
<br>

#### Our First Middleware

- Note that `app.use` mounts middleware functions into the middleware pipeline.

- Let's add a line of code that modifies the `req` object:

```javascript
app.use(function (req, res, next) {
  console.log('Hello Intrepid Learner!')
  // Add a time property to the req object
  req.time = new Date().toLocaleTimeString()
  next()
})
```

- Now let's pass this info to the **todos/index.ejs** view...

- It's the responsibility of controllers to pass data to views.

- Let's update the `index` action in **controllers/todos.js** so that it passes `req.time`:

```javascript
function index(req, res) {
  res.render('todos/index', {
    todos: Todo.getAll(),
    time: req.time, // add this line
  })
}
```

- Now let's render the time in **todos/index.ejs** by updating the `<h1>` as follows:

```html
<h1>Todos as of <%= time %></h1>
```

- Refresh!

- The order that middleware is mounted matters!

- In **server.js**, let's move our custom middleware below where the routers are being mounted:

```javascript
app.use('/', indexRouter)
app.use('/todos', todosRouter)

app.use(function (req, res, next) {
  console.log('Hello Intrepid Learner!')
  req.time = new Date().toLocaleTimeString()
  next()
})
```

- Refresh shows that it no longer works :(

- Move it back above the routes - that's better.

<br>
<br>
<br>

#### Key Middleware

- Here are some other pieces of middleware we'll need as we scale our application

- **morgan**: An `HTTP` logger that "logs" requests in the terminal.

- **express.urlencoded** (formerly known as `body-parser`): Parses data sent in the body of the request and populates a `req.body` object containing that data.

- **express.static**: Serves _static assets_, such as css, js and image files.

- The only one we need to install is `morgan` because everything else is included when we install `express`.

```bash
  npm i morgan
```

Now we require `morgan` and mount it as middleware

```javascript
const morgan = require('morgan')
```

<br>

**We'll mount Morgan like this**

```javascript
app.use(morgan('dev'))
```

**Next, we'll mount our static asset middleware and bodyparser middleware**

```javascript
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
```

**...by the end, is what our "Middleware Stack" should look like**

```javascript
// Mount middleware (app.use)
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/todos', todosRouter);
```

For our static assets, we'll create a `public` folder at the root of our project and the place a `css`, `js`, and `images` subdirectory inside of it (we can also create a `style.css` and `script.js` file inside the appropriate sub-directories as well).

This is where our stylesheets, images and front-end javascript will live!

<br>

While we're at it, let's make sure all of our templates have a link tag so they can use any CSS rules we've defined in `style.css`

<br>

**Add the following `link` tag to all of your template files ...(files that end with the .ejs extension inside of the `views` directory)**

```html
<link rel="stylesheet" href="/css/style.css" />
```

<br>
<br>
<br>

#### Express Request-Response Cycle

<img src="https://i.imgur.com/HMRyxyl.png">

**Here's a great flow to follow when you want to add functionality to your web app:**
<br>

1. Identify the "proper" Route (Verb + Path)
2. Create the UI that issues a request that matches that route.
3. Define the route on the server and map it to a controller action.
4. Code and export the controller action.
5. `res.render` a view in the case of a `GET` request, or `res.redirect` if data was changed.

What functionality do we want? Do we want to show a form on the `index` view, or do we want a separate page dedicated to adding a To Do? Typically, you'd want have the form on the same page, however, for completeness, we'll use the dedicated page approach.

- Checking the [Resourceful Routing for CRUD Operations in Web Applications Chart](https://gist.github.com/myDeveloperJourney/dfb5b8728c54fce5e0e997ac3ce466a0), we find that the proper route is:

```shell
GET /todos/new
```

- Next step is to add a link in **views/todos/index.ejs** that will invoke this route:

```html
...
 </ul>
 <a href="/todos/new">Add To-Do</a>
</body>
```

- Step 2 is done. On to step 3 - defining the route on the server...

- Let's add the `new` route in **routes/todos.js** as follows:

```javascript
router.get('/', todosCtrl.index);
router.get('/new', todosCtrl.new);
router.get('/:id', todosCtrl.show);
```

- Why must the `new` route be defined before the `show` route?

- Step 4 says to code the `todosCtrl.new` action we just mapped to the `new` route:

- In **controllers/todos.js**:

```javascript
module.exports = {
  index,
  show,
  new: newTodo,
};

function newTodo(req, res) {
  res.render('todos/new');
}

// original code below...
```

<br>
<br>
<br>

- Note that you cannot create a function using a JS _reserved_ word like `new`.

- Now we need that `new` view.

- Create **views/todos/new.ejs**, copy over the boilerplate from another view, then put this good stuff in there:

```html
<body>
  <h1>New Todo</h1>
  <form action="/todos" method="POST" autocomplete="off">
    <input type="text" name="text" />
    <button type="submit">Save Todo</button>
  </form>
</body>
```

<br>
<br>
<br>

#### Creating To-Dos

- FYI that `autocomplete="off"` attribute will prevent the sometimes annoying autocomplete feature of inputs.

- Verify that clicking the **Add To-Do** link displays the page with the form...

- Performing a Create data operation using a form is a two-request process.

- If you remember the routing chart from our last lesson, we can see the proper (RESTful) route is...

```shell
POST /todos
```

**That's why the form's attributes have been set to:**

- `action="/todos"`
- `method="POST"`

- Check [this](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Your_first_HTML_form) out if you want to learn more about HTML Forms.

Same process:

1. Determine proper route - check!
2. Create UI - check!
3. Define the route on the server - next...

- In **routes/todos.js**:

```javascript
router.get('/:id', todosCtrl.show);
router.post('/', todosCtrl.create); // add this route
```

- Yay! Our first non-`GET` route!

#### Creating To-Dos (Cont)

Same process:

1. Determine proper route - check!
2. Create UI - check!
3. Define the route on the server - check!
4. Code and export the controller action - next...

In **controllers/todos.js**:

```javascript
  	  ...
  	  create
  	};

  	function create(req, res) {
  	  console.log(req.body);
  	  req.body.done = false;
  	  Todo.create(req.body);
  	  res.redirect('/todos');
  	}
```

<br>
<br>
<br>

**Temporarily comment out the `Todo.create(req.body);` line so that we can check out what gets logged out...**

- `req.body` is courtesy of this middleware in **server.js**:

```javascript
app.use(express.urlencoded({ extended: false }))
```

<br>
<br>


- The properties on `req.body` will always match the values of the `<input>`'s `name` attributes:

```html
<input type="text" name="text" />
```
<br>
<br>


- We already did Step 5 with the `res.redirect`.

- All we need is that `create` in **models/todo.js**:

```javascript
module.exports = {
  getAll,
  getOne,
  create,
};

const todos = [
  { text: 'Feed Dogs', done: true },
  { text: 'Learn Express', done: false },
  { text: 'Buy Milk', done: false },
]

function create(todo) {
  todos.push(todo);
}

// Original code below
```
<br>
<br>
<br>


- Test it out!

- Note that when `nodemon` restarts the server, added to-dos will be lost.

<br>
<br>
<br>

### <span style="text-transform:lowercase">method-override</span> Middleware

- Again, referring back to our routing chart from our routing lesson, performing full-CRUD data operations requires that the browser send `DELETE` & `PUT` requests.

- Using JavaScript (AJAX), the browser can send HTTP requests with any method, however, HTML can only send `GET` & `POST` methods. So what do we do if we want to delete a To-Do?

- [method-override](https://www.npmjs.com/package/method-override) middleware to the rescue!

- Using `method-override` allows browsers to inform the server that it actually wants it to consider the request it sends to be something other than a `POST` - as you'll soon see, we'll be using forms with method="POST".

- First we need to install the middleware:

  ```shell
  $ npm i method-override
  ```


<br>
<br>
<br>


- Require it below `morgan` in **server.js**:

```javascript
const morgan = require('morgan');
const methodOverride = require('method-override');
```
<br>
<br>
<br>


- Now let's add `method-override` to the middleware pipeline:

```javascript
app.use(express.static('public'));
app.use(methodOverride('_method')); // add this
```

<br>
<br>
<br>

- We are using the [Query String](https://en.wikipedia.org/wiki/Query_string) approach for `method-override` as documented [here](https://www.npmjs.com/package/method-override#override-using-a-query-value).

<br>
<br>
<br>
<br>

#### Delete a To-Do

- The user story reads:&nbsp;&nbsp;&nbsp;_As a User, I want to delete a To Do from the list_

- Same process:

  1.  Determine proper route

- The RESTful route is:

```shell
DELETE /todos/:id
```

<br>
<br>
<br>

- Same process:

  1.  Determine proper route - check!
  2.  Create UI - next...

- By default, `method-override` only listens for `POST` requests.

- Therefore, we'll use a `<form>` for the UI in **views/todos/index.ejs**:

```html
<% todos.forEach(function(t, idx) { %>
<li>
  <form
    action="/todos/<%= idx %>?_method=DELETE"
    class="delete-form"
    method="POST"
  >
    <button type="submit">X</button>
  </form>
</li>
```

<br>
<br>
<br>


- The `?_method=DELETE` is the query string.

- Let's some styling in **public/css/style.css**:

```css
.delete-form {
  display: inline-block;
  margin-right: 10px;
}

.delete-form button {
  color: red;
}

li {
  list-style: none;
  margin-bottom: 10px;
}
```

<br>
<br>
<br>

- Refresh and use DevTools to ensure the links look correct.

- Same process:

  1.  Determine proper route - check!
  2.  Create UI - check!
  3.  Define the route on the server - next...

- I bet you could have done this one on your own!

- In **routes/todos.js**:

```javascript
router.post('/', todosCtrl.create);
router.delete('/:id', todosCtrl.delete);
```
<br>
<br>
<br>

Same process:

1. Determine proper route - check!
2. Create UI - check!
3. Define the route on the server - check!
4. Code and export the controller action - next...

- Similar to `newTodo`, we can't name a function `delete`, so...

```javascript
 create,
 delete: deleteTodo
};

function deleteTodo(req, res) {
 Todo.deleteOne(req.params.id);
 res.redirect('/todos');
}
```
<br>
<br>
<br>

- All that's left is to add the `deleteOne` method to the `Todo` model:

```javascript
module.exports = {
  getAll,
  getOne,
  create,
  deleteOne,
};

const todos = [
  { text: "Feed Dogs", done: true },
  { text: "Learn Express", done: false },
  { text: "Buy Milk", done: false },
];

function deleteOne(id) {
  todos.splice(id, 1);
}

// Original code below
```

**Does it work? Of course it does!**

<br>
<br>
<br>

### 💪 Exercises: Update a To-Do

**Updating a To-Do is very similar to creating one because it also is a two-request process:**

1. One request to display a form used to edit the To-Do.
2. Another request to submitted the form to the server so that it can update the To-Do.

<br>
<br>

#### Update a To-Do

##### Exercise #1:

**_As a User, when viewing the show page for a To-Do, I want to be able to click a link to edit the text of the To-Do_**

##### Exercise #2:

**_As a User, when editing a To-Do, I want to be able to toggle whether or not it's done_**

- **Hints:**

  - Follow the same steps we followed multiple times for adding functionality!
  - Be sure to reference the Routing Chart to determine the proper routes!
  - You will want to pre-fill the `<input>` with the todo text - use the `value` attribute and some EJS to pull this off.
  - Don't forget that the controller action will first have to get the To-Do being edited so that it can be sent to the view.

- **Hints for Exercise #2 (Toggling `done`):**

  - Use an `<input type="checkbox" ...>`
  - Checkboxes are checked when a `checked` attribute exists (no value is assigned).
  - Use a ternary expression to write in the `checked` attribute, or an empty string.
  - If the checkbox is checked when submitted, `req.body.done` will have the value of `"on"`, otherwise there won't even be a `req.body.done` property.

- **Enjoy!**

<br>
<br>
<br>

## References

[Official Documentation | Express.js](https://expressjs.com/)

<p style="text-align:left"><em>Note: When searching for info on the Express framework, be sure that you search for the info for version 4 only - there were significant changes made from earlier versions.</em></p>
