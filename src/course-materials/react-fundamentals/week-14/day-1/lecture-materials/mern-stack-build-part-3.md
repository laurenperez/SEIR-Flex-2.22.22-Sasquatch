---
track: "React Fundamentals"
title: "MERN Stack Build Part 3"
week: 13
day: 3
type: "lecture"
---

# MERN Stack Build Part 3

<br>
<br>
<br>

## Links to Show Page

We want generate links to each persons show page so let's do the following in `Index.js`:

```jsx
import { useState } from "react"
import { Link } from "react-router-dom"

function Index(props) {
  // state to hold formData
  const [newForm, setNewForm] = useState({
    name: "",
    image: "",
    title: "",
  })

  // handleChange function for form
  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value })
  }

  // handle submit function for form
  const handleSubmit = (event) => {
    event.preventDefault()
    props.createPeople(newForm)
    setNewForm({
      name: "",
      image: "",
      title: "",
    })
  }

  // loaded function
  const loaded = () => {
    return props.people.map((person) => (
      <div key={person._id} className="person">
        <Link to={`/people/${person._id}`}>
          <h1>{person.name}</h1>
        </Link>
        <img src={person.image} alt={person.name} />
        <h3>{person.title}</h3>
      </div>
    ))
  }

  const loading = () => {
    return <h1>Loading...</h1>
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input type="submit" value="Create Person" />
      </form>
      {props.people ? loaded() : loading()}
    </section>
  )
}

export default Index
```

<br>
<br>
<br>

## The Show Page

Let's pass the people data to the show page via props and make a update and delete function for the show page, head over to `Main.js`:

```jsx
import { useEffect, useState } from "react"
import { Route, Switch } from "react-router-dom"
import Index from "../pages/Index"
import Show from "../pages/Show"

function Main(props) {
  const [people, setPeople] = useState(null)

  const URL = "http://localhost:3001/people/"

  const getPeople = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    setPeople(data)
  }

  const createPeople = async (person) => {
    // make post request to create people
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(person),
    })
    // update list of people
    getPeople()
  }

  const updatePeople = async (person, id) => {
    // make put request to create people
    await fetch(URL + id, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(person),
    })
    // update list of people
    getPeople()
  }

  const deletePeople = async (id) => {
    // make delete request to create people
    await fetch(URL + id, {
      method: "DELETE",
    })
    // update list of people
    getPeople()
  }

  useEffect(() => getPeople(), [])

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index people={people} createPeople={createPeople} />
        </Route>
        <Route
          path="/people/:id"
          render={(rp) => (
            <Show
              people={people}
              updatePeople={updatePeople}
              deletePeople={deletePeople}
              {...rp}
            />
          )}
        />
      </Switch>
    </main>
  )
}

export default Main
```

<br>
<br>
<br>

Let's grab the selected person from the people array in props and display them.

`Show.js`

```jsx
function Show(props) {
  const id = props.match.params.id
  const people = props.people
  const person = people.find((p) => p._id === id)

  return (
    <div className="person">
      <h1>{person.name}</h1>
      <h2>{person.title}</h2>
      <img src={person.image} alt={person.name} />
    </div>
  )
}

export default Show
```

<br>
<br>
<br>

## Updating a Person

On the show page let's add:

1. State for a form

1. `handleChange` and `handleSubmit` function

1. A form in the JSX below the person

```jsx
import { useState } from "react"
function Show(props) {
  const id = props.match.params.id
  const people = props.people
  const person = people.find((p) => p._id === id)

  // state for form
  const [editForm, setEditForm] = useState(person)

  // handleChange function for form
  const handleChange = (event) => {
    setEditForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  // handlesubmit for form
  const handleSubmit = (event) => {
    event.preventDefault()
    props.updatePeople(editForm, person._id)
    // redirect people back to index
    props.history.push("/")
  }

  return (
    <div className="person">
      <h1>{person.name}</h1>
      <h2>{person.title}</h2>
      <img src={person.image} alt={person.name} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input type="submit" value="Update Person" />
      </form>
    </div>
  )
}

export default Show
```

<br>
<br>
<br>

## Deleting a Person

Last Stop is adding a button on the show page to delete a user.

```jsx
import { useState } from "react";
function Show(props) {
  const id = props.match.params.id;
  const people = props.people;
  const person = people.find((p) => p._id === id);

  const [editForm, setEditForm] = useState(person);

  // handleChange function for form
  const handleChange = (event) => {
    setEditForm(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.updatePeople(editForm);
    props.history.push("/");
  };

  const removePerson = () => {
    props.deletePeople(person._id);
    props.history.push("/");
  };

  return (
    <div className="person">
      <h1>{person.name}</h1>
      <h2>{person.title}</h2>
      <img src={person.image} alt={person.name} />
      <button id="delete" onClick={removePerson}>
        DELETE
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input type="submit" value="Update Person" />
      </form>
    </div>
  );
}

export default Show;
```

<br>
<br>
<br>

## Some Final Styling

A few more changes to our `styles.scss`:

```scss
// --------------------------
// VARIABLES
// --------------------------
$maincolor: black;
$contrastcolor: white;

@mixin white-text-black-bg {
  color: $contrastcolor;
  background-color: $maincolor;
}

@mixin black-test-white-bg {
  color: $maincolor;
  background-color: $contrastcolor;
}

// --------------------------
// Header
// --------------------------

nav {
  @include white-text-black-bg;
  display: flex;
  justify-content: flex-start;

  a {
    @include white-text-black-bg;
    div {
      margin: 10px;
      font-size: large;
    }
  }
}

// --------------------------
// Form
// --------------------------

section,
div {
  form {
    input {
      @include white-text-black-bg;
      padding: 10px;
      font-size: 1.1em;
      margin: 10px;

      &[type="submit"]:hover {
        @include black-test-white-bg;
      }
    }
  }
}

// --------------------------
// button
// --------------------------

button#delete {
  @include white-text-black-bg;
  display: block;
  margin: auto;
  font-size: 1.3em;
  padding: 10px;
}

// --------------------------
// images
// --------------------------

img {
  width: 300px;
  height: 300px;
  border-radius: 90px;
  object-fit: cover;
}
```

<br>
<br>
<br>

## Deploy

Add a `netlify.toml` with the following:

```toml
[[redirects]]
  from = "/*"
  to = "/"
```

_NOTE, if you wanted to deploy to Version you'd include a `vercel.json` with the follow_

```json
{
  "version": 2,
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

1. Push frontend repo to github

1. Connect to netlify

1. Done

**[Finished Backend App Example](https://git.generalassemb.ly/AlexMerced/people_backend)**
**[Finished Frontend App Example](https://git.generalassemb.ly/AlexMerced/people_frontend)**

<br>
<br>
<br>

## Lab - Complete Your Cheese App

Complete your cheese app using the steps of todays lessons adding the following:

1. The ability see an individual cheese
1. The ability edit a cheese
1. The ability to delete a cheese
