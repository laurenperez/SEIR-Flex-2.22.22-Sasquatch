---
track: "React Fundamentals"
title: "React Router BitCoin PriceFinder"
week: 13
day: 2
type: "lecture"
---

# React Router BitCoin PriceFinder

<br>
<br>

Purpose of this lesson is to Build A Crypto Price Discovery App and learn:

- How to setup react router
- How to create Router, Route, Link and Switch components
- How to pass router props
- How to use URL Params

<br>
<br>
<br>

## The Problem

We are often used to making websites with several "pages" which would be split across several html delivered statically or rendered by templates on a server. When making a React app, the application is a single page with one html file. We can have components conditionally render to make the illusion of pages but it doesn't quite feel as intuitive as using a tags to link to different html files.

What the React-Router library does is allow us to define components that render based on the url in the address bar. We link to them with Link components which feel similar to the a tags we are used to. It allows to create a single page application in a way that feels like a multi-page application.

<br>
<br>
<br>

## Setup

In your React folder do the following

- run command `npx create-react-app cryptoprices`
- cd into the cryptoprices folder
- run `npm install react-router react-router-dom`
- run `npm start` to begin development server

<br>
<br>
<br>

## Setting Up Router

The first component we'll explore is BrowserRouter which is underneath the hood a context provider allowing all the features of router to be available to its children. We want all of our application to have the router features so we'll wrap the App component in `index.js` and to make it more semantic we'll rename the component Router.

`index.js`

```jsx
import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
//IMPORT BrowserRouter and rename it to Router
import { BrowserRouter as Router } from "react-router-dom"

//Wrap the App Component with the Router component to enable the router features
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
```

<br>
<br>
<br>

## Components vs Pages

A common convention is to create two folders, components and pages. Any component that is used as a piece of UI goes in the components folder, any component meant to act as a "page" of the website goes in pages.

- Create a components and pages folder
- Create a Currencies.js, Main.js, Price.js file in the pages folder
- Create the component boilerplate in each component

`Main.js`

```jsx
import React from "react"

const Main = (props) => {
  return <h1>This is the Main Component</h1>
}

export default Main
```

<br>

`Currencies.js`

<br>

```jsx
import React from "react"

const Currencies = (props) => {
  return <h1>This is the Currencies Component</h1>
}

export default Currencies
```

<br>

`Price.js`

<br>

```jsx
import React from "react"

const Price = (props) => {
  return <h1>This is the Price Component</h1>
}

export default Price
```

<br>
<br>
<br>

## Creating Our Routes

Now we will will import the Route component into App, this will allow us define which of our components should render depending on the URL, we'll also import our pages for our routes.

<br>
<br>
<br>

`App.js`

```jsx
import React from "react"
import "./App.css"
//Import route and our components
import { Route } from "react-router-dom"
import Currencies from "./pages/Currencies"
import Main from "./pages/Main"
import Price from "./pages/Price"

function App() {
  // We will use the Route component to specify each route
  return (
    <div className="App">
      <Route path="/">
        <Main />
      </Route>
      <Route path="/currencies">
        <Currencies />
      </Route>
      <Route path="/price">
        <Price />
      </Route>
    </div>
  )
}

export default App
```

<br>
<br>

Right now only the Main component is rendering cause we are on the main page, "/". To change the URL bar, we need some links so lets create a navigation.

<br>
<br>
<br>

## Navigation

In your components folder create a `Nav.js`:

`components/Nav.js`

```jsx
import React from "react"
import { Link } from "react-router-dom"

const Nav = (props) => {
  return (
    <div className="nav">
      <Link to="/">
        <div>CRYPTO PRICES</div>
      </Link>
      <Link to="/currencies">
        <div>CURRENCIES</div>
      </Link>
    </div>
  )
}

export default Nav
```

<br>
<br>
<br>

Next add the following styles to `index.css`:

```css
.nav {
  display: flex;
  justify-content: space-between;
  background-color: black;
  color: white;
  padding: 15px;
  font-size: 2em;
}

.nav a {
  color: white;
  text-decoration: none;
}
```

<br>
<br>
<br>

import the Nav component into `App.js`:

```jsx
import React from "react"
import "./App.css"
//Import route and our components
import { Route } from "react-router-dom"
import Currencies from "./pages/Currencies"
import Main from "./pages/Main"
import Price from "./pages/Price"
import Nav from "./components/Nav"

function App() {
  // We will use the Route component to specify each route
  return (
    <div className="App">
      <Nav />
      <Route path="/">
        <Main />
      </Route>
      <Route path="/currencies">
        <Currencies />
      </Route>
      <Route path="/price">
        <Price />
      </Route>
    </div>
  )
}

export default App
```

<br>
<br>
<br>

A Few things to notice:

- The function of the link tags is to change the URL bar to match the "to" prop, look at the change in the URL bar when you click on them. The reason we don't use an a tag is cause clicking an a tag triggers the browser to make a request and refresh the page which will break router (cause there is no server to respond to the browsers request, the url is merely a simulation of multiple pages).

- When we click on currencies the Main component remains part on the screen and this is cause "/" is technically inside of "/currencies", to make sure only one of these route is active at a time we can wrap them in a Switch component which only renders the first viable route within it.

```jsx
import React from "react"
import "./App.css"
//Import route and our components
import { Route, Switch } from "react-router-dom"
import Currencies from "./pages/Currencies"
import Main from "./pages/Main"
import Price from "./pages/Price"
import Nav from "./components/Nav"

function App() {
  // We will use the Route component to specify each route
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/">
          <Main />
        </Route>
        <Route path="/currencies">
          <Currencies />
        </Route>
        <Route path="/price">
          <Price />
        </Route>
      </Switch>
    </div>
  )
}

export default App
```

<br>
<br>
<br>

- Now we have a different problem, while only one route is rendering it always seems to be routing the main component. This is cause the path "/" matches "/" and "/currencies". To fix this issue we need the Main route to only be visible when the path is exactly "/", we can do this by adding the exact prop.

```jsx
<Route exact path="/">
  <Main />
</Route>
```

Use exact sparingly, most of the time you'll just be using it on the root path.

<br>
<br>
<br>

## Params

We are going to soon build out our currencies component which will allow us to select which currencies price we'd like to see. We will do this by injecting a variable in our Price routes path, so edit the Price route like so...

```jsx
<Route
  path="/price/:symbol"
  render={(routerProps) => <Price {...routerProps} />}
/>
```

We are now using the Route components "render" prop. Instead of passing Price as a child of component we are passing a function that returns JSX because then Route will allow us to send a special batch route related props, the router props. In this case we used the spread operator to expand each property in routerProps into its own prop.

The :symbol part is a URL Param, a variable in the url. Whatever is in that spot in the path will get passed to the component via the router props (props.match.params.symbol).

<br>
<br>
<br>

## The Currencies Component

In this component we will be doing the following

- Creating an array of the currencies our app can find prices for
- Looping over that array to generate a link for each one to the price route
- The currency symbol should be placed in the :symbol part of the URL

<br>
<br>
<br>

`Currencies.js`

```jsx
import React from "react"
import { Link } from "react-router-dom"

const Currencies = (props) => {
  const currencies = [
    { name: "Bitcoin", symbol: "BTC" },
    { name: "Litecoin", symbol: "LTC" },
    { name: "Ethereum", symbol: "ETH" },
    { name: "Ethereum Classic", symbol: "ETC" },
    { name: "Stellar Lumens", symbol: "XLM" },
    { name: "Dash", symbol: "DASH" },
    { name: "Ripple", symbol: "XRP" },
    { name: "Zcash", symbol: "ZEC" },
  ]

  return (
    <div className="currencies">
      {currencies.map((coin) => {
        const { name, symbol } = coin

        return (
          <Link to={`/price/${symbol}`}>
            <h2>{name}</h2>
          </Link>
        )
      })}
    </div>
  )
}

export default Currencies
```

<br>

Notice when we click any of the links it takes us to the price component, use the React devTools to look for the router props and you should be able to find the value of the symbol param in there.

<br>
<br>
<br>

## The Price Component

Before we create this component take a moment to get your FREE Api key from coinapi.io. Keep in mind you can only make 100 requests per day with your free apiKey.

Once you have your api key here is what we will do:

- store the apikey and currency symbol in different variables
- use the useEffect hook to make an api call
- interpolate the apikey and symbol in the fetch URL
- save the resulting data in state and render it
- loaded and loading function for rendering the data if exists

<br>
<br>
<br>

`Price.js`

```jsx
import React from "react"

const Price = (props) => {
  // Our api key from coinapi.io
  const apiKey = "YOUR API KEY"
  // Grabbing the Currency symbol from the URL Param
  const symbol = props.match.params.symbol
  // Using the other two variables to create our URL
  const url = `http://rest-sandbox.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${apiKey}`

  //state to hold the coin data
  const [coin, setCoin] = React.useState(null)

  //function to fetch coin data
  const getCoin = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setCoin(data)
  }

  // useEffect to run getCoin when component mounts
  React.useEffect(() => {
    getCoin()
  }, [])

  // loaded function for when data is fetched
  const loaded = () => {
    return (
      <div>
        <h1>
          {coin.asset_id_base}/{coin.asset_id_quote}
        </h1>
        <h2>{coin.rate}</h2>
      </div>
    )
  }

  // Function for when data doesn't exist
  const loading = () => {
    return <h1>Loading...</h1>
  }

  // if coin has data, run the loaded function, otherwise, run loading
  return coin ? loaded() : loading()
}

export default Price
```

<br>
<br>
<br>

### Your App Should now be working! Voila! 🎉
