---
track: "React Fundamentals"
title: "React Router BitCoin PriceFinder"
week: 12
day: 3
type: "lecture"
---

## React Router BitCoin PriceFinder

Purpose of this lesson is to Build A Crypto Price Discovery App and learn

- How to setup react router
- How to create Router, Route, Link and Switch components
- How to pass router props
- How to use URL Params

## The Problem

We are often used to making websites with several "pages" which would be split across several html delivered statically or rendered by templates on a server. When making a React app, the application is a single page with one html file. We can have components conditionally render to make the illusion of pages but it doesn't quite feel as intuitive as using a tags to link to different html files.

What the React-Router library does is allow us to define components that render based on the url in the address bar. We link to them with Link components which feel similar to the a tags we are used to. It allows to create a single page application in a way that feels like a multi-page application.

## Setup

In your React folder do the following

- run command `npx create-react-app cryptoprices`
- cd into the cryptoprices folder
- run `npm install react-router-dom`
- run `npm start` to begin development server

## Setting Up Router

The first component we'll explore is BrowserRouter which is underneath the hood a context provider allowing all the features of router to be available to its children. We want all of our application to have the router features so we'll wrap the App component in index.js and to make it more semantic we'll rename the component Router.

index.js

```js
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

## Components vs Pages

A common convention is to create two folders, components and pages. Any component that is used as a piece of UI goes in the components folder, any component meant to act as a "page" of the website goes in pages.

- create a components and pages folder
- create a Currencies.jsx, Main.jsx, Price.jsx file in the pages folder
- create the component boilerplate in each component

Main.jsx

```js
const Main = (props) => {
  return <h1>This is the Main Component</h1>
}

export default Main
```

Currencies.jsx

```js
const Currencies = (props) => {
  return <h1>This is the Currencies Component</h1>
}

export default Currencies
```

Price.jsx

```js
const Price = (props) => {
  return <h1>This is the Price Component</h1>
}

export default Price
```

## Creating Our Routes

Now we will will import the Route & Routes component into App, this will allow us define which of our components should render depending on the URL, we'll also import our pages for our routes.

App.js

```js
import "./App.css"
//Import route and our components
import { Route, Routes } from "react-router-dom"
import Currencies from "./pages/currencies"
import Main from "./pages/main"
import Price from "./pages/price"

function App() {
  // We will use the Route component to specify each route
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/currencies" element={<Currencies />} />
        <Route path="/price" element={<Price />} />
      </Routes>
    </div>
  )
}

export default App
```

Right now only the Main component is rendering cause we are on the main page, "/". To change the URL bar, we need some links so lets create a navigation.

## Navigation

In your components folder create a Nav.jsx

components/Nav.jsx

```js
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

Next add the following styles to index.css

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

import the nav component into App.js

```js
import "./App.css"
//Import route and our components
import { Route, Routes } from "react-router-dom"
import Currencies from "./pages/currencies"
import Main from "./pages/main"
import Price from "./pages/price"
import Nav from "./components/nav"

function App() {
  // We will use the Route component to specify each route
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/currencies" element={<Currencies />} />
        <Route path="/price" element={<Price />} />
      </Routes>
    </div>
  )
}

export default App
```

A Few things to notice:

- The function of the link tags is to change the URL bar to match the "to" prop, look at the change in the URL bar when you click on them. The reason we don't use an a tag is cause clicking an a tag triggers the browser to make a request and refresh the page which will break router (cause there is no server to respond to the browsers request, the url is merely a simulation of multiple pages).

```js
import "./App.css"
//Import route and our components
import { Route, Routes } from "react-router-dom"
import Currencies from "./pages/currencies"
import Main from "./pages/main"
import Price from "./pages/price"
import Nav from "./components/nav"

function App() {
  // We will use the Route component to specify each route
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/currencies" element={<Currencies />} />
        <Route path="/price" element={<Price />} />
      </Routes>
    </div>
  )
}

export default App
```

## Params

We are going to soon build out our currencies component which will allow us to select which currencies price we'd like to see. We will do this by injecting a variable in our Price routes path, so edit the Price route like so...

```js
<Route path="/price/:symbol" element={<Price />} />
```

The :symbol part is a URL Param, a variable in the url. Whatever is in that spot in the path will be accessible by using the useParams hook.

## The Currencies Component

In this component we will be doing the following

- Creating an array of the currencies our app can find prices for
- Looping over that array to generate a link for each one to the price route
- The currency symbol should be placed in the :symbol part of the URL

Currencies.js

```js
import { Link } from "react-router-dom"

const Currencies = (props) => {
  const currencies = [
    { name: "Bitcoin", symbol: "BTCUSD" },
    { name: "Litecoin", symbol: "LTCUSD" },
    { name: "Ethereum", symbol: "ETHUSD" },
    { name: "Zcash", symbol: "ZECUSD" },
    { name: "Bitcoin Cash", symbol: "BCHUSD" },
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

Notice when we click any of the links it takes us to the price component, use the React devTools to look for the router props and you should be able to find the value of the symbol param in there.

## The Price Component

Before we create this component take a moment to get your FREE Api key from [iexcloud.io](https://iexcloud.io/cloud-login?r=https%3A%2F%2Fiexcloud.io%2Fconsole%2Fhome#/register). Keep in mind you can only make 50,000 requests per month with your free apiKey.

Once you have your api key here is what we will do:

- store the apikey and currency symbol in different variables
- use the useEffect hook to make an api call
- interpolate the apikey and symbol in the fetch URL
- save the resulting data in state and render it
- loaded and loading function for rendering the data if exists

Price.jsx

```js
import { useParams } from "react-router-dom"

const Price = (props) => {
  // Our api key from coinapi.io
  const apiKey = "YOUR API KEY"
  // Grabbing the Currency symbol from the URL Params
  const params = useParams()
  const symbol = params.symbol
  // Using the other two variables to create our URL
  const url = `https://cloud.iexapis.com/stable/crypto/${symbol}/price?token=${apiKey}`

  //state to hold the coin data
  const [coin, setCoin] = React.useState("null")

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
        <h1>{symbol}}</h1>
        <h2>{coin.price}</h2>
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

Your App Should now be working! Voila!
