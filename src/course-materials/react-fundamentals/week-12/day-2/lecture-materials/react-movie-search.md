---
track: "React Fundamentals"
title: "React Movie Search"
week: 12
day: 2
type: "lecture"
---

# React Movie Search

<br>
<br>
<br>

### Lesson to be Learned

- Making AJAX requests in a React Application
- Lifting state that is shared by components
- Using the useEffect Hook

<br>
<br>
<br>

## Creating our Project

- Create a new "react" folder where we will generate all our React projects going forward.

- From the terminal in your react folder run the following command `npx create-react-app reactmovies`

- `cd` into the new reactmovies folder

- Enter command `npm start` to start the development server and see the default react website.

<br>
<br>
<br>

## Movie Display Component

Today's application will use the OMDB API to pull information about movies and render them to the screen.

You will need an API key to use the OMDB API, so take a moment and get one from here...

- `http://www.omdbapi.com/`

In case you have any trouble with your API key, here is one, but please be careful not to reach request limits: `98e3fb1f`.

Test your key by opening the following URL in a new tab:

`http://www.omdbapi.com/?apikey=YOURKEY&t=godfather`

replace `YOURKEY` with your API key.

For the OMDB API, the API key is submitted via a URL query.

Every API is different, so what queries can you submit to an API, if any, will be in the documentation of that API for the OMDB API...

- API key: is your API key

- t: the title of the movie you are searching for

**NOTE:** Every API is different, so some don't need API keys, some need them in the URL, some need them sent in request headers, some require multiple security keys, so never assume anything about the API other than you need to read its documentation.

<br>
<br>
<br>

## Our Components

We will have two additional components in this build, a Component that displays movie data and a form that we can use to type which movie we want to search and display.

The convention is to create a components folder in your src folder and build any additional components there.

So, inside `src/components/` you should create two files...

- `MovieDisplay.js`
- `Form.js`

Now let's put the React boilerplate in both of them...

`MovieDisplay.js`

```jsx
// define a function that is our Component, always make sure to declare the props parameter so you can use props in your Component
const MovieDisplay = (props) => {
  // the Component must return some JSX
  return <h1>The MovieDisplay Component</h1>
}

// we must export the Component to use it in other files
export default MovieDisplay
```

<br>
<br>

**Form.js**

<br>
<br>

```jsx
// define a function that is our Component, always make sure to declare the props parameter so you can use props in your Component
const Form = (props) => {
  // the Component must return some JSX
  return <h1>The Form Component</h1>
}

// we must export the Component to use it in other files
export default Form
```

<br>
<br>

Now, let's import them and use them in `src/App.js`

<br>
<br>

```jsx
import "./App.css"
// WE IMPORT OUR COMPONENTS
import MovieDisplay from "./components/MovieDisplay"
import Form from "./components/Form"

function App() {
  // USE OUR COMPONENTS IN APP's RETURNED JSX
  return (
    <div className="App">
      <Form />
      <MovieDisplay />
    </div>
  )
}

export default App
```

<br>
<br>
<br>

## Building out the Form

In our form Component, we need to return the form in the component's JSX:

**Form.js**

```jsx
// always make sure to declare the props parameter so you can use props in your Component
const Form = (props) => {
  // the Component must return some JSX
  return (
    <div>
      <form>
        <input type="text" />
        <input type="submit" value="submit" />
      </form>
    </div>
  )
}

export default Form
```

<br>
<br>
<br>

## Lifting State

When we make the AJAX call for the movie data, we need somewhere to save the data too... we need state. Creating state is simple enough, but the data then needs to be shipped to the `MovieDisplay` Component, a sibling (both components are currently children of `App`).

As a reminder, with React, information only moves in one direction, down. There is no practical way to send the state from Form to `MovieDisplay`, so they'll need to house the data in a mutual parent, App.

So when two components need to share data, you'll often move where the data is primarily existing (the location of the state with the data) to a shared parent, and this pattern is known as "Lifting State."

So while the App Component doesn't need the movie data, its children do so to become the bearer of the data. (In general, you prefer for components to not share state when possible to be more reusable).

So let's head over to App and do the following...

1. Create state to hold our movie data

1. Create a function that is given the search term, then does the fetch request for the movie data and stores it in state

1. Pass the function down to form via props

<br>
<br>

**`App.js`**

```jsx
// import the useState hook from react

import { useState } from "react"

import "./App.css"
// WE IMPORT OUR COMPONENTS
import MovieDisplay from "./components/MovieDisplay"
import Form from "./components/Form"

function App() {
  // variable with your apiKey
  const API_KEY = "98e3fb1f"

  // state to hold movie data
  const [movie, setMovie] = useState(null)

  // function to getMovies
  const getMovie = async (searchTerm) => {
    // make fetch request and store response
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${API_KEY}&t=${searchTerm}`
    )
    // parse JSON response into a javascript object
    const data = await response.json()
    // set the Movie state to the movie
    setMovie(data)
  }

  // USE OUR COMPONENTS IN APPs RETURNED JSX
  // we pass the getMovie function as a prop
  return (
    <div className="App">
      <Form getMovie={getMovie} />
      <MovieDisplay />
    </div>
  )
}

export default App
```

<br>
<br>
<br>

## Finishing Our Form

Now that we passed down the getMovie function to form, which allows us to pass the search term to our `App` Component, let's wire up the form by doing the following.

- Creating state to track our form value
- A `handleChange` function to control our form value
- A `handleSubmit` function that passes the `formState` to the getMovie function we passed via props

`Form.js`

```jsx
// import the useState hook from react
import { useState } from "react"
// always make sure to declare the props parameter so you can use props in your Component
const Form = (props) => {
  // state to hold the data of our form
  const [formState, setFormState] = useState({
    searchterm: "",
  })

  // handleChange - updates formState when we type into form
  const handleChange = (event) => {
    // use the event object to update value
    setFormState({ searchterm: event.target.value })
  }

  const handleSubmit = (event) => {
    // prevent page from refreshing on form submission
    event.preventDefault()
    // pass the search term to the getMovie prop
    props.getMovie(formState.searchterm)
  }

  // the Component must return some JSX
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchterm"
          onChange={handleChange}
          value={formState.searchterm}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  )
}

export default Form
```

<br>
<br>
<br>

Now type a movie into the form and hit submit and open up your devtools and see if everything worked by checking two things:

- Under the network tab look for the successful request and examine the data there, this is a great place to diagnose when your fetch calls aren't behaving as expected

- If you don't have it already, make sure to download the React devTools chrome extension and then look to see if the state in your `App` Component has updated as expected.

So now we have the data, we just have to get to render to the screen... how are we going to do that?

<br>
<br>
<br>

## Displaying Our Movie

Currently our App Component has the data and we need to send it to our `MovieDisplay` Component, we can do this by simply passing the state as props!

`App.js`

```jsx
// import the useState hook from react
import { useState } from "react"

import "./App.css"
// WE IMPORT OUR COMPONENTS
import MovieDisplay from "./components/MovieDisplay"
import Form from "./components/Form"

function App() {
  // variable with your apiKey
  const API_KEY = "98e3fb1f"

  // state to hold movie data
  const [movie, setMovie] = React.useState(null)

  // function to getMovies
  const getMovie = async (searchTerm) => {
    // make fetch request and store response
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${API_KEY}&t=${searchTerm}`
    )
    // parse JSON response into a javascript object
    const data = await response.json()
    // set the Movie state to the movie
    setMovie(data)
  }

  // USE OUR COMPONENTS IN APPs RETURNED JSX
  // we pass the getMovie function as a prop
  // we pass movie as props to movie display
  return (
    <div className="App">
      <Form getMovie={getMovie} />
      <MovieDisplay movie={movie} />
    </div>
  )
}

export default App
```

<br>
<br>
<br>

Now let's display the data in `MovieDisplay.js`:

<br>

**`MovieDisplay.js`**

```jsx
// define a function that is our Component, always make sure to declare the props parameter so you can use props in your Component
// you can also destructure your props directly from the parameter list
const MovieDisplay = ({ movie }) => {
  // the Component must return some JSX
  return (
    <>
      <h1>{movie.Title}</h1>
      <h2>{movie.Genre}</h2>
      <img src={movie.Poster} alt={movie.Title} />
      <h2>{movie.Year}</h2>
    </>
  )
}

// we must export the Component to use it in other files
export default MovieDisplay
```

Now you may notice you are getting an error saying you cannot read the property title of null.

React doesn't know to render `MovieDisplay` until we have movie data, so it's attempting to render a movie we haven't gotten yet the moment the website loads triggering this error.

To fix it, we need to make sure movie data exists; we will do the following:

1. Make a loaded function that returns the JSX if the data exists

1. Make a loading function that returns the JSX if it doesn't

1. Use a ternary operator to determine which function we return

**We are using functions because the JSX expressions aren't evaluated until the function is invoked, while just saving a JSX expression in a variable would mean they'd get evaluated right away, still triggering the error.**

**MovieDisplay.js**

```jsx
// you can also destructure your props directly from the parameter list
const MovieDisplay = ({ movie }) => {
  // function to return loaded JSX
  const loaded = () => {
    return (
      <>
        <h1>{movie.Title}</h1>
        <h2>{movie.Genre}</h2>
        <img src={movie.Poster} alt={movie.Title} />
        <h2>{movie.Year}</h2>
      </>
    )
  }

  // function to return loading JSX
  const loading = () => {
    return <h1>No Movie to Display</h1>
  }

  // ternary operator will determine which functions JSX we will return
  return movie ? loaded() : loading()
}

// we must export the Component to use it in other files
export default MovieDisplay
```

Fantastic, now our app is working!

Now it would be nice if a movie showed up right away.

The problem is we can't just make a call to `getMovie` in the body of the `App` Component cause it would...

1. It would make the fetch call
1. It would update the state
1. The Component would re-render
1. GetMovie gets invoked again
1. Creating an infinite loop

Is there a way to have something happen when a Component loads without repeating on every render?

<br>
<br>
<br>

## useEffect

The React `useEffect` Hook allows us to create things that only happen at certain times.

The fundamental syntax of `useEffect` is as follows:

```jsx
useEffect(() => {}, [])
```

Notice the first argument is a function. That function will run once when the Component first loads. The second argument is an array. On each Component render, the items in the array are compared to their value on the previous render, and if they are a different value, the function will run again. This gives you a way to create logic in a Component that doesn't run on every render.

This is a perfect place to make a call to `getMovie`!

**`App.js`**

```jsx
// import the useState & useEffect hooks from react
import { useState, useEffect } from "react"
import "./App.css"

// WE IMPORT OUR COMPONENTS
import MovieDisplay from "./components/MovieDisplay"
import Form from "./components/Form"

function App() {
  // variable with your apiKey
  const API_KEY = "98e3fb1f"

  // state to hold movie data
  const [movie, setMovie] = React.useState(null)

  // function to getMovies
  const getMovie = async (searchTerm) => {
    // make fetch request and store response
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${API_KEY}&t=${searchTerm}`
    )
    // parse JSON response into a javascript object
    const data = await response.json()
    // set the Movie state to the movie
    setMovie(data)
  }

  // this will run on the first render but not on subsquent renders
  useEffect(() => {
    getMovie("Clueless")
  }, [])

  // USE OUR COMPONENTS IN APPs RETURNED JSX
  // we pass the getMovie function as a prop
  // we pass movie as props to movie display
  return (
    <div className="App">
      <Form moviesearch={getMovie} />
      <MovieDisplay movie={movie} />
    </div>
  )
}

export default App
```

<br>
<br>
<br>

### BONUS EXERCISE IF TIME

Take 10 minutes and change the `useEffect` so that way on each refresh of the page it grabs a random movie.
