---
track: "React Fundamentals"
title: "Full-Stack React"
week: 13
day: 3
type: "lecture"
---

# Intro to Full-Stack React

<br>
<br>
<br>

## Learning Objectives

| Students Will Be Able To: |
| --- |
| Ready a React app for production |
| Logically structure a full-stack React project |
| Configure an Express app to serve JSON |
| Configure an Express app to allow CORS |
| Introduce service modules in a React App for making AJAX requests |

<br>
<br>
<br>

## Roadmap

- Set Up
- Why Full-stack?
- Building the React App's Production Code
- Code the Express App
- Deployment
- Essential Questions

<br>
<br>
<br>



## Why Full-stack?

Thus far, our React apps have been static, front-end only apps that don't communicate with a server after the _index.html_ has been delivered.

It's _possible_ for static front-end only SPAs to have a reasonable amount of functionality if they incorporate calls to APIs or cloud services like Firebase.

However, most SPAs rely on a backend server app for tasks such as:

- Performing CRUD
- Authenticating users

Such an app, where we write code that runs on the front-end and the backend, as you know, is a full-stack application.

<br>
<br>
<br>


## Architecting a Full-stack React App

Up until this point, we've taken for granted that full-stack apps, like your Express Projects, were single, integrated projects.

However, developing a MERN-stack (MongoDB, Express, React & Node) project involves complexities such as tooling, React's integrated development server, etc.

Basically, there are complications in both **development and production** environments that have to be addressed.

<br>
<br>
<br>



#### Complications During Development 

If we're going to develop a MERN-stack app, we have to figure out how we're going to:

- Use React's Development Server (`npm start`)
- **and**, run `nodemon` to productively develop an Express backend that can respond to AJAX requests sent from the React front-end

<details>
<summary>There's a conflict between React's development server and Express development - what is it?</summary>
<p><strong>They both run on port 3000 by default.</strong></p>
</details>

<br>

**Key Point: When developing a MERN-stack app, you will need to launch both React's development server (`$ npm start`) and the Express app (`$ nodemon server`) in separate VS Code windows.**

<br>
<br>
<br>



#### Production Environment Complications

As we develop our React app locally, we're writing source code that React's dev server builds and runs automatically.

However, the React dev server is a local tool that does not run in the cloud, i.e., Heroku or a CDN like Github Pages, Netlify or Vercel.

We need a way to **build** our code in whichever machine is hosting our app, which will vary depending upon which hosting service is used.


<br>
<br>
<br>


#### Possible Full-stack Architectures

There are two general architectures we could pursue:

1. Maintain **two** separate projects, one for the React SPA, the other for the Express backend.
1. Integrate the codebase for both the React front-end and the Express backend.

| Architecture | Pros | Cons |
| --- | --- | --- |
| Separate Projects | Easier to set up and better seperation of concerns. | Manage two projects and git repos. Must deploy to two separate hosts, **or**, copy over the front-end production code to the server project before each deployment. Cross-site configuration will need to be implemented. |
| Single Project | A single codebase | Source code can get convoluted with front-end and back-end code side by side in the same parent directory |


**We'll go with the `seperate projects` architecture as it will help us seperate concerns a little better.**

<br>
<br>
<br>


## Building the React App's Production Code

If we want to be able to test locally how our full-stack application is going to run when deployed, we'll need to:

- Build the React app's code locally - this is called "production code"
- Configure Express to serve the production code

So, how do we make the `index.html` & React's JavaScript production-ready? 

Thankfully, the `create-react-app` CLI includes tooling and a **build** script in **package.json** that, when run, converts the the code in the `src` and `public` folders of the React project into production code.

<br>
<br>
<br>

**Let's run it:**

```bash
npm run build
```

**Note: npm requires us to use the `run` command for scripts other than `start` and `test`.**

<br> 
<br> 
<br> 


After building, examining our project's structure reveals a new **build** folder containing a production ready **index.html**, **static/css** & **static/js** folders, and other less important stuff.

This **build** folder of production-ready goodness will eventually be served by a host once we deploy, but for now you can take advantage of a static server tool available from `npm` called `serve`


<br>
<br>
<br>


**Try it out!**

```bash
npm i -g serve
```

<br>
<br>
<br>

**You can then serve the production-version of React using the following command:**

```bash
serve -s build
```

<br>
<br>
<br>



## Code the Express App

In a MERN-stack app, the backend Express app only does two things:

1. Responds to AJAX requests from the React app with JSON Data
2. Connect to our MongoDB database and perform CRUD on our data resources


<br>
<br>
<br>



#### Create and Code the Express App 

**Let's write our server:**

We'll use the [express generator](https://expressjs.com/en/starter/generator.html) to quickly scaffold our express app!

<br>
<br>


First let's install the generator with the following command:

```shell
npm install -g express-generator
```

<br>
<br>

Then we run this command to scaffold our app:

```shell

express --no-view react-dev-skills-backend 
```

<br>

According to the docs, this will create a fresh express app without a view engine!

Don't forget to install your `node_modules` with `npm i`:

```shell
cd react-dev-skills-backend
npm i

```

<br>
<br>

Next, delete `routes/index.js`, change the name of the file `routes/users` to `routes/skills`, and then clean up `app.js` to look like this:

```js
var express = require('express');
var logger = require('morgan');

var skillsRouter = require('./routes/skills');

var app = express();

app.use(logger('dev'));
app.use(express.json());


app.use('/api/skills', skillsRouter);
// notice how we mount this router at /api/skills - this is considered a best practice when serving JSON

module.exports = app;

```

<br>
<br>
<br>

We'll also need to go into `bin/www` and change the development port to `3001`:

```js
// inside of bin/www
var port = normalizePort(process.env.PORT || '3001');
```

<br>
<br>
<br>


Next, let's go into `routes/skills.js` and send some JSON data:


```js
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.status(200).json([
    {skill: 'JavaScript', level: '5'},
    {skill: 'HTML', level: '5'},
    {skill: 'CSS', level: '5'},
  ]);
});

module.exports = router;


```

<br>
<br>
<br>


#### Try It Out

Let's go ahead and start our express server and navigate to `localhost:3001/api/skills` to see how express responds:


```json
// http://localhost:3001/api/skills

[
  {
    "skill": "JavaScript",
    "level": "5"
  },
  {
    "skill": "HTML",
    "level": "5"
  },
  {
    "skill": "CSS",
    "level": "5"
  }
]

```

<br>

**Awesome! We'll eventually serve data from our database, not fake data.** 

**We will also have React make the request to our express backend instead of us manually making the request in the browser**

<br>
<br>
<br>


### Make AJAX request to express using our React App

Now that everything is working, let's double check that our React app is running in development mode. 

Make sure to shut down the static server we had running earlier and switch back to our development server with `npm start`.


<br>
<br>
<br>


### Put Skills Data Into State


Now it's time to connect our React Frontend to our Express/Node Backend! 🎉

**NOTE:** React and Express only need to connect is whenever React needs data from Express via AJAX. So, we need to make an AJAX request from React!

According to [React's documentation](https://reactjs.org/docs/hooks-effect.html), we use the `useEffect` hook to make AJAX requests in our components.

<br>
<br>

Here's what it looks like:

```js
useEffect(() => {
  // Effect Function: Anything we need to run on page load goes here
}, []); 
/*
☝️ Dependency Array:  We can put certain values in this array
to trigger the effect to run again when they change
*/
```

`useEffect` is an extremely useful feature of React, because it **"automatically"** calls it's effect function on page load, or in other words, as soon as the component loads (get's rendered to the DOM).

We can also configure `useEffect` to call it's effect function whenever certain values change, by adding them to the dependency array (**FYI**, these can be props or values in state).

If we remove the array, the effect function gets called each time state changes by default; sometimes, this can cause problems. 🤔

Let's see how to use it!

<br>

First, we import it inside of `App.js`:

```jsx
import { useState, useEffect } from "react";
```
<br>


Next, we invoke `useEffect` and pass in an **"effect"** function to perform the effect we need when the component loads. We also need to pass a dependency array as as a second argument. We'll leave this array empty, otherwise the effect will run each time state changes resulting in an inifinite loop 😬


```jsx

export default function App() {
  const [state, setState] = useState({
    newSkill: {
      skill: "", 
      level: "3",
    },
    skills: [{ skill: "JavaScript", level: 4 }]
  });


  useEffect(() => {
    function getAppData() {
      // 👇 simple fetch request to our express backend using fetch() webAPI 
      fetch('http://localhost:3001/api/skills')
      .then(res => res.json())
      .then(data => 
        setState(prevState => ({ // set state to the actual data from our backend on page load
          ...prevState,
          skills: data 
        }))
      ).catch(err => console.log(err))
    }
    getAppData();
  }, []); // 👈 empty dependency array as a second argument to useEffect, this ensures effect function only gets called on initial load

  // ....more code below
```
<br>
<br>

Awesome! Try to verify that our skills state was set using the react dev tools extension

Oops, you should see a CORS error in the console. Let's fix that now.



<br>
<br>
<br>
<br>


### IMPORTANT REMINDER - Backend Development

Eventually, we'll have to address [`Cross Origin Resource Sharing` or `CORS`](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), which is a security feature implemented by modern browsers to prevent attacks such as `Cross Site Scripting` or `XSS`.

To solve this issue, we can introduce a middleware package called `cors`, which is avaiable for installation from `npm`, we can learn more about it [here](https://expressjs.com/en/resources/middleware/cors.html)

<br>
<br>
<br>

**First we install it:**

```shell
npm i cors
```

<br>
<br>
<br>

**Then, add a simple configuration to `app.js` to allow access from any origin.**

```javascript
// first require it
const cors = require('cors');

// then mount it as middleware
app.use(cors());
```

<br>
<br>

Also, just to be clear, the Express backend is fully configured and ready for additional backend functionality to be coded.

When the time comes, be sure to add folders such as `config`, `routes`, `models` ...etc to keep your backend code organized.

Additionally, in a SPA, remember that the routes will be API-type routes, i.e., they should be namespaced using `/api` and respond with JSON, not EJS views.

You will also want to refer to the Mongoose related lessons to refresh your recollection of how to define schemas and perform CRUD using Mongoose models.


<br>
<br>
<br>



**Awesome, we can now verify that our state is there using the react dev tools extension. Since we set up a CORS header in our backend, it should not be blocked anymore.**





<br>
<br>
<br>


## Deployment of React App

If you haven't figured it our already, React will need to be deployed seperately from express. 

This also means you'll want to create a seperate repository for your React Application as well.

For this step, you'll have the option of using services like `Netlify`, `Vercel` or `gh-pages`

This is actually the easiest step...

<br>
<br>


**...so easy, each of these vendors have created some easy to follow guides to walk through the process:**

- [Deploy to Netlify](https://www.netlify.com/blog/2016/07/22/deploy-react-apps-in-less-than-30-seconds/)
- [Deploy to Vercel](https://vercel.com/guides/deploying-react-with-vercel-cra)
- [Deploy to GitHub Pages](https://create-react-app.dev/docs/deployment#github-pages)

<br>
<br>
<br>

## Resources

- [`Cross Origin Resource Sharing` or `CORS`](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Information on `CORS` middleware for express/node applications in ExpressJS Docs](https://expressjs.com/en/resources/middleware/cors.html)