---
track: "React Fundamentals"
title: "Full CRUD React"
week: 14
day: 3
type: "lecture"
---

# Full CRUD React


| Students Will Be Able To: |
|---|
| Continue from where our Full-Stack React Lesson Leaves Off |
| Perform Full CRUD with the MERN stack using AJAX |




<br>
<br>
<br>



### [Click Here](https://generalassembly.zoom.us/rec/share/p30_ZIXgL-9k5MDZH1niacPDFPIjE5Y9vuo3VbfGYEwpm-_Hig9X7koTtYsep6Az.xrXxu80Vu1NVAEpO?startTime=1621384726000) to access recording


<br>
<br>
<br>



## Road Map

- Set Up
- Adding Create to React Dev Skills
- Adding Read/Retrive to React Dev Skills
- Adding Update to React Dev Skills
- Adding Delete to React Dev Skills


<br>
<br>
<br>




## Set Up

The starter code for this lesson will pick up from the finished version of React Dev Skills from the Full-Stack React Lesson. 

This includes the code base for our React Frontend and our Express Backend. 

If for some reason you need a fresh copy of the code, you can clone the following repos:

- [Frontend Code (React)](https://git.generalassemb.ly/Instructional-Materials/STARTER-CODE-FULL-CRUD-REACT-FRONTEND)
- [Backend Code (Express)](https://git.generalassemb.ly/Instructional-Materials/STARTER-CODE-FULL-CRUD-EXPRESS-BACKEND.git)


For the next part of the set up, since we need to manage two seperate VS Code Windows, let's checkout the [`"Peacock"` extension for VS Code](https://marketplace.visualstudio.com/items?itemName=johnpapa.vscode-peacock)!

Once enabled, Peacock will "color code" our environment so we can more easily distinguish between our front and backend in VS Code.


**Here's an example:**

<br>
<br>

### Our Frontend

![screenshot](https://i.imgur.com/vieRqvN.png)

<br>
<br>

### Our Backend

![screenshot](https://i.imgur.com/1ABRgno.png)



<br>

The last thing we need is to go to [MongoDB Atlas](https://cloud.mongodb.com/) to grab a connection URI to a fresh database.




<br>
<br>
<br>



## Adding Create to React Dev Skills

So far we've managed to add Dev Skill "Objects" to our application by simply merging them into component state, but we're not actually persisting them in a database.

This means if we refresh the browser, the memory is cleared and we'll lose our skill objects; let's enable that functionality now.

<br>
<br>

We'll start with the backend first, which is a great opportunity to review most of what we learned in Unit 2.

<br>
<br>
<br>



### Connect to MongoDB 

First we need to connect to MongoDB from within a config file. 

We also need `mongoose` so `npm i mongoose`, `mkdir config && touch config/database.js` and add this code to it:


```js
const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

db.on('connected', () => {
    console.log(`Connected to MongoDB on ${db.host}:${db.port}`);
});
```

<br>
<br>

The next step would be getting a connection URI string from [MongoDB Atlas](https://cloud.mongodb.com/) and adding that string to a `.env` file inside our express app's file system.

This also means we need to install the [`dotenv` npm package](https://www.npmjs.com/package/dotenv) 🤔

So let's `touch` `.env`, `npm i dotenv` and add our connection string as an environment variable to our `.env` file:


```shell
DATABASE_URI=mongodb+srv://someuser:testpassword@cluster0.test.mongodb.net/react-dev-skills?retryWrites=true&w=majority
```

<br>

**🚨 The above reference is an example only**

**NOTE:** We named our database `react-dev-skills`☝️


<br>
<br>

Now we just need to run some code in `app.js` so that our `dotenv` package and `config/database.js` module run.

Let's add these two lines of code to `app.js`:

```js
var express = require('express');
var logger = require('morgan');
var cors = require('cors');
var skillsRouter = require('./routes/skills');

// Add these two lines of code below: 

require('dotenv').config();
require('./config/database');

// ... more code below ... 
```
<br>
<br>

Great, we should be connected now 😎

<br>
<br>
<br>


### Create the Mongoose Model

Creating the model for this project is simple, all we need is to `mkdir models && touch models/skill.js`, define a schema, compile that schema into `mongoose.model()` and export that model so we can perform CRUD from a controller ... etc.


Once you've created your `models/skill.js` file, let's add this code to it (we'll keep it simple):

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema({
    skill: String,
    level: String
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
```

<br>
<br>

Take a moment to refresh your memory on what this code does; once we're ready we can move on.

<br>
<br>
<br>

### Define a Create Route and Controller Logic for the "Create Action"

Now that we're connected to MongoDB and we have a model to perform CRUD with, we can add route definitions and controller functions.


<br>
<br>

Right now our router and controller modules are combined into one for simplicity, but eventually we'll refactor this into a true MVC pattern.

However, let's get our bearings on what we need to do first.

<br>
<br>

Let's go into `routes/skills.js` and add a new route definition with the appropriate in-line controller logic; here's an example following this change:

```js
var express = require('express');
var router = express.Router();
// Require our Skill Model.
var Skill = require('../models/skill');


router.get('/', function(req, res) {
  res.status(200).json([
    {skill: 'JavaScript', level: "5"},
    {skill: 'HTML', level: "5"},
    {skill: 'CSS', level: "5"},
  ]);
});


// Our new "create" Route with controller logic combined.
router.post('/', function(req, res) {
  Skill.create(req.body, function(err, skill) {
    res.status(201).json(skill);
  });
});

module.exports = router;


```

<br>
<br>
<br>

### Refactor the `addSkill` helper function in `App.js` (React)

Now that our backend is ready to go, it's time to update our `addSkill` function so that it actually creates new skills in our database by sending an AJAX request to our backend.

First things first, the name `addSkill` isn't the most appropriate name for a function that runs on form submission; let's change it to `handleSubmit`:

```jsx
  function handleSubmit(e) {

    e.preventDefault();

    setState({
      skills: [...state.skills, state.newSkill],
      newSkill: {
        skill: "",
        level: "3"
      }
    });

  }
```

<br>
<br>

**🚨 NOTE:** Don't forget to update your `onSubmit` event prop in your `<form>` JSX element:

```jsx
<form onSubmit={handleSubmit}>
```
<br>
<br>

It's time to refactor our `handleSubmit` function to perform AJAX, we can do this very easily using the [`fetch()` Web API/function](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and configuring it to send a `POST` request.

We also need to handle converting the outgoing data into JSON with JavaScript's [`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify). 

On that note, we also need to set a `Content-type` header to `Application/json`.

This header informs express to parse the incoming `json` data with [`express.json()`](http://expressjs.com/en/4x/api.html#express.json).


Great! Once we get the response back, we'll update state:


```js
  function handleSubmit(e) {

    e.preventDefault();

    fetch('http://localhost:3001/api/skills', {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json'
      },
      body: JSON.stringify(state.newSkill)
    })
    .then(res => res.json())
    .then(skill => 
      setState({
        skills: [...state.skills, skill],
        newSkill: {
          skill: "",
          level: "3"
        }
      })
    );

  }

```

<br>
<br>

Perfect! We should be able to see our newly created skill in state, however refreshing the page makes it all go away 😪

This is because we're currently not reading from the database, but we'll handle that soon.

Before we move on, let's refactor our code to use the newer [`async/await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) syntax:


```js
  async function handleSubmit(e) {
      e.preventDefault();

      const skill = await fetch('http://localhost:3001/api/skills', {
          method: 'POST',
          headers: {
              'Content-type': 'Application/json'
          },
          body: JSON.stringify(state.newSkill)
      }).then(res => res.json());

      setState({
          skills: [...state.skills, skill],
          newSkill: {
              skill: "",
              level: "3"
          }
      });
  }
```

<br>
<br>

We can also optimize this code for error handling by using a [`try/catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) block.

`try/catch` works well with `async/await` and gives us a bullet proof way to run other code if an error occurs:


```js
  async function handleSubmit(e) {
    
    e.preventDefault();

    // try/catch is like saying "hey js, try this, but if an error get's thrown, 'catch it' "
    try {
      const skill = await fetch('http://localhost:3001/api/skills', {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json'
        },
        body: JSON.stringify(state.newSkill)
      }).then(res => res.json());
  
      setState({
        skills: [...state.skills, skill],
        newSkill: {
          skill: "",
          level: "3"
        }
      });
    } catch (error) {
      console.log(error);
      // we can perform other actions here if an error is caught
    }
    
  }
```

<br>
<br>

Great! We're now all set for implementing read functionality

<br>
<br>
<br>

## Adding Read/Retrieve to React Dev Skills

Now we're ready to start reading data from MongoDB using React with AJAX!

The good news is we already took care of most of this when we set up our front & backends for the [Full Stack React](/react-fundamentals/week-13/day-3/lecture-materials/full-stack-react) Lesson!

However, with the addition of a `Skill` model with mongoose, we need to refactor some of our code in `routes/skills.js`.

Let's take care of that; here's what our updated code inside of `routes/skills.js` should look like:

```js

var express = require('express');
var router = express.Router();
var Skill = require('../models/skill');


router.get('/', function(req, res) {
  Skill.find({}, function(err, skills) { // Now we can request data from MongoDB.
    res.status(200).json(skills);
  });
});


router.post('/', function(req, res) {
  Skill.create(req.body, function(err, skill) {
    res.status(201).json(skill);
  });
});

module.exports = router;

```

<br>
<br>

As you can see from the code above, for our first route definition, (*our* **GET** *route*), we're using the mongoose `.find()` method. This method retrieves a list of skill objects from the database instead of sending the hard-coded array of objects we had previously.


Once you go back to the browser and refresh the screen, you should seen the changes reflected!

<br>
<br>
<br>


## Adding Update to React Dev Skills
 
It's time to add update functionality to React Dev Skills!

We'll start with the easy part first ... the backend logic.

<br>
<br>
<br>

### Refactor the backend

We've reached a point where we should refactor and seperate the controller logic into a dedicated controller module so we can enjoy the benefits of the MVC pattern.


Let's create a controller for our skills resource:

```shell
mkdir controllers && touch controllers/skills.js
```

<br>

Then we'll add our controller logic to the new module and include the update controller action:

```js

var Skill = require('../models/skill');

module.exports = {
    index,
    create,
    update
};


function index(req, res) {
    Skill.find({}, function (err, skills) {
        res.status(200).json(skills);
    });
}

function create(req, res) {
    Skill.create(req.body, function (err, skill) {
        res.status(201).json(skill);
    });
}

// Here's our latest controller action
function update(req, res) {
    Skill.findByIdAndUpdate(req.params.id, req.body, function () {
        index(req, res); // we're calling index? 🤔
        /*  
            ☝️ We've never done this before.

            This is another way we can forward the request to our
            index action so we can send a brand new list of
            skills as a response to updating a skill.
        */
    });
}
```

<br>

You'll notice most of this controller code looks identical to our work in Unit 2 with the exception of calling `res.status(...).json(...)` instead of `res.render(...)`.

You'll also notice that for our latest controller action, (*our* `update` *action*), we're actually calling our `index(...)` action instead of `res.status(...).json(...)` ... interesting 🤔

This is because instead of just sending a copy of a single updated skill object, we'll send a brand new copy of the entire collection instead, which makes updating our state/UI much easier.

This is a very common solution for situations when the main view of our application includes a list of data along with widgets to make changes to the data.

When we make changes to some or all of our data, it's easier to replace the list with an updated one; we can expand on several reasons why this is a preferred practice later.

<br>
<br>

🚨 **NOTE:** By the way, in case you accidentally forget, we need to refactor our router module; this should look familiar now:

```js
var express = require('express');
var router = express.Router();
var skillsCtrl = require('../controllers/skills');

router.get('/', skillsCtrl.index);
router.post('/', skillsCtrl.create);
router.put('/:id', skillsCtrl.update); // 👈 don't forget the :id param

module.exports = router;

```
<br>
<br>

Great! Now we're ready to add edit/update functionality to the frontend!

<br>
<br>
<br>

### Adding Edit/Update functionality to React

Before getting started, we need to think of the steps required to update our data; we'll think of these steps in terms of user stories:

**As a user - (AAU) ...**

1. When looking at a list of skills, I should see a button to edit a particular skill.
1. When I click on the edit button, a form should populate with current skill data so I can make necessary edits.
1. After editing a skill, I should be able to update the skill when I submit the form and see the updated skill included in the list of existing skills.

<br>
<br>

Awesome! Let's add something for the user to click on so they can edit a skill:

```jsx
{state.skills.map(s => (
    <article key={s._id}>
        <div>{s.skill}</div>
        <div>{s.level}</div>
        <div 
            className="controls" 
            onClick={() => handleEdit(s._id)}>
        {'✏️'}
        </div>
    </article>
))}
```

<br>
<br>

You'll notice we made some refactors here as well. 

For example, for our key prop we're using the skill `_id` property as a unique value instead of the index position.

For the "edit widget", we added an additional `div` element with a "✏️" emoji for the text content.

We also added an `onClick` event prop so we can tie a click event to a helper function inside of `App.js`.

This function will find the skill we're editing and set it's data to form state.

Before we move on, we'll add some additional CSS to `App.css` to fix our UI, because right now it will look a little funky with the additional content 😆

```css

/* this will cause the skill desc text to take all available space */
article > div:nth-child(1) {
  flex-grow: 1;
}

/* helper class for our update and "delete" (when we add it later) button */
.controls {
  cursor: pointer; /* make the widget appear clickable on curson hover */
  background-color: #f96247; /* diffent color for aesthetics */
}
  
```
<br>
<br>


Here's what we'll need to write for that `handleEdit` helper function we referenced earlier:

```js
  function handleEdit(id) {
    const skillToEdit = state.skills.find(skill => skill._id === id);
    setState(prevState => ({
      ...prevState,
      newSkill: skillToEdit,
      editMode: true
    }));
  }
```

<br>
<br>

Let's walk through what this function does ☝️

First, we find the skill object in the `skills` state array using the [`Array.find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) method and assign that value to a variable named `skillToEdit`.

We'll set our form state with this data so our user can make edits now!

You'll notice we set an additional property in state called `editMode` 🤔

Before we explain why we did this, let's initialize that property in state to `false` now:

```js
export default function App() {
  const [state, setState] = useState({
    skills: [{ skill: "JavaScript", level: 4 }],
    newSkill: {
      skill: "",
      level: "3"
    },
    editMode: false // initialized to false
  });
```
<br>
<br>

`editMode` enables us to reuse the same skill create form and corresponding handler function.

We can also conditionally render our UI based on this `editMode` value too!

For example, for our form's button, let's conditonally render the button text based on whether or not we're in edit mode:

```jsx
<button>{state.editMode ? 'EDIT SKILL' : 'ADD SKILL'}</button>
```
<br>
<br>

Now, there is one small caveat to consider when changing state and that's making sure our `handleChange` helper function doesn't override `editMode`:

```js
  function handleChange(e) {
    setState(prevState => ({
        ...prevState, // 👈 make sure we're spreading/merging prevState into new state
        newSkill: {
          ...prevState.newSkill,
          [e.target.name]: e.target.value
        },
    }));
  }
```

<br>
<br>

We might have changed how this function merges previous state during our Full Stack React lesson to see other examples, but let's make sure we merge `prevState` into new state with the spread operator to prevent overriding `editMode` state.


Great! Let's refactor `handleSubmit` so that it can create and update a skill!

We'll use an `if/else` statement simply check if we're in `editMode` first:


```js
  async function handleSubmit(e) {
    
    e.preventDefault();

    if(state.editMode) { // check if we're in editMode
      const {_id, skill, level } = state.newSkill; // destructuring values from state.newSkill
      try {
        // include _id as url param - note that we're receiving a new skill list as a response
        const skills = await fetch(`http://localhost:3001/api/skills/${_id}`, { 
          method: 'PUT',
          headers: {
            'Content-type': 'Application/json'
          },
          body: JSON.stringify({ skill, level }) // send the values to update
        }).then(res => res.json());
    
        setState({
          skills, // replacing old skill list with new one
          newSkill: {
            skill: "",
            level: "3"
          },
          editMode: false // set edit mode back to false as we're no longer editing
        });
      } catch (error) {
        console.log(error);
      }
      
    } else {
      try {
        const skill = await fetch('http://localhost:3001/api/skills', {
          method: 'POST',
          headers: {
            'Content-type': 'Application/json'
          },
          body: JSON.stringify(state.newSkill)
        }).then(res => res.json());
    
        setState({
          skills: [...state.skills, skill],
          newSkill: {
            skill: "",
            level: "3"
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
```

<br>
<br>

Whew! `App.js` is beginning to get chock full of JavaScript! 😅

Eventually we'll move our AJAX code into a seperate module known as a service module; this organization pattern helps us seperate concerns.

As you can see, we added an `if/else` statement to run our create or update AJAX logic based on whether we're currently in `editMode` or not.

We had to do some other things such as configuring `fetch` to issue a `PUT` request and destructure `state.newSkill`.

This way we can include the `_id` value as a URL param, and the `skill` & `level` values in the request body.

We're also receiving an updated list of skills from express (*we discussed this already*) and replacing the existing list in state as well as setting `editMode` to false.

Awesome! 🎉 Let's try out our update feature!

Let's move on to our final CRUD data operation ... DELETE! 🙌

<br>
<br>
<br>

## Adding Delete to React Dev Skills

Deleting a skill is probably one of the most straight forward operations to perform.

We'll start with a new route definition and controller in the backend first.

<br>
<br>
<br>

### Add Delete Route and Controller to Express

These first steps will be relatively easy:

<br>

#### `routes/skills.js`
```js
// inside of routes/skills.js again 

var express = require('express');
var router = express.Router();
var skillsCtrl = require('../controllers/skills');

router.get('/', skillsCtrl.index);
router.post('/', skillsCtrl.create);
router.put('/:id', skillsCtrl.update);
router.delete('/:id', skillsCtrl.delete); // 👈 here's our delete route

module.exports = router;

```

<br>
<br>
<br>

#### `controllers/skills.js`

```js
var Skill = require('../models/skill');

module.exports = {
    index,
    create,
    update,
    delete: deleteSkill, // 👈 exporting our shiny new delete controller function
};


function index(req, res) {
    Skill.find({}, function (err, skills) {
        res.status(200).json(skills);
    });
}

function create(req, res) {
    Skill.create(req.body, function (err, skill) {
        res.status(201).json(skill);
    });
}

function update(req, res) {
    Skill.findByIdAndUpdate(req.params.id, req.body, function () {
        index(req, res);
    });
}

// here's our new controller function for deleting a skill
function deleteSkill(req, res) {
    Skill.findByIdAndDelete(req.params.id, function () {
        index(req, res); // 👈 replace our list with a new one like we did with our update action
    });
}
```

<br>
<br>

The delete controller is identical to what we've done in Unit 2 with the exception of calling `index(...)` as we've done with our update function.

Once again, we'll do this so we can send an updated copy of our skills collection to React.

<br>
<br>
<br>

### Add Delete Button and Helper Function to React

Now for the final step, adding a delete button/widget for each skill in the list; here's our next set of user stories:


**As a user - (AAU) ...**

1. When looking at a list of skills, I should see a button to delete a particular skill.
1. When I click on a skill's delete button, the list should only show the remaining skills.

Awesome! Let's add that delete button!

```jsx
      {state.skills.map(s => (
        <article key={s._id}>
            <div>{s.skill}</div>
            <div>{s.level}</div>
            <div 
                className="controls" 
                onClick={() => handleEdit(s._id)}>
            {'✏️'}
            </div>
            <div 
                className="controls" 
                onClick={() => handleDelete(s._id)}>
            {'🗑'}
            </div>
        </article>
      ))}
```
<br>
<br>

The "delete" button is nearly identical to "edit" with the exception of using a "🗑" emoji for the text content and the usage of a helper function called `handleDelete`.

Let's define that function now:

```js
  async function handleDelete(id) {
    try {
      const skills = await fetch(`http://localhost:3001/api/skills/${id}`, {
        method: 'DELETE'
      }).then(res => res.json());
      setState(prevState => ({
        ...prevState,
        skills,
      }));
    } catch (error) {
      console.log(error);
    }
  }
```

<br>
<br>

As you can see, performing a `DELETE` request with AJAX is relatively simple compared to what we did with our `PUT` request.

All we did was pass the `id` argument as our URL param, and configure our fetch request to use the `DELETE` method.

Our response from express should include an updated skill list; we'll use this to replace our existing list in state.

Let's try deleting some skills.

Success, we did it, we have full CRUD now! 🎉

<br>
<br>
<br>

## Bonus Challenge!

As a final challenge, it would be a great idea to consider refactoring our AJAX logic into a seperate service module. 

The first steps are creating a seperate file inside our `src` directory in React and exporting our AJAX logic as named functions to be imported and called from within `App.js`.

This will make our code more organized and easier to maintain.


<br>
<br>
<br>

## References

- [Frontend Starter Code (React)](https://git.generalassemb.ly/Instructional-Materials/STARTER-CODE-FULL-CRUD-REACT-FRONTEND)
- [Backend Starter Code (Express)](https://git.generalassemb.ly/Instructional-Materials/STARTER-CODE-FULL-CRUD-EXPRESS-BACKEND.git)
- [`"Peacock"` extension for VS Code](https://marketplace.visualstudio.com/items?itemName=johnpapa.vscode-peacock)
- [`dotenv` npm package](https://www.npmjs.com/package/dotenv)
- [`fetch()` Web API/function](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
- [`express.json()`](http://expressjs.com/en/4x/api.html#express.json)
- [`async/await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [`try/catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
- [`Array.find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)



