---
track: "React Fundamentals"
title: "Self-Paced Weekend Tutorial: React with AJAX (Build a Weather App)"
week: 13
day: 3
type: "lecture"
---

# Self-Paced Weekend Tutorial: <br> React with AJAX (Build a Weather App)


<br>
<br>
<br>


## Learning Objectives

| Students Will Be Able To |
|---|
| Make Asynchronous/AJAX Calls with the useEffect hook in React |
| Use third-party libraries such as Google Maps |
| Modularize code using "service" modules |


<br>
<br>
<br>
<br>


## Roadmap

- Set Up
- Review the Functionality of the App
- Including Third-Party Libraries
- Accessing the Browser's Current Coordinates
- Making Asynchronous/AJAX Calls with the `useEffect` hook in React
- Implement the _As a Visitor..._ User Story
- Essential Questions

<br>
<br>
<br>




## Set Up

This lesson has starter-code.

To get set up for this lesson:

- Download the <a href="/downloads/react_fundamentals/react-with-ajax/react-weather.zip" download>Starter Code</a>
- Extract the folder from the `.zip` file and `cd` into it
- Install the Node modules: `$ npm i`
- Open the code in VS Code: `$ code .`
- Start the dev server: `$ npm start`

Shortly after starting React's Development Server, you should be greeted with:

<img src="https://i.imgur.com/qj3bSlP.png">

<br>
<br>
<br>



## Review the Functionality of the App

To demonstrate how to make AJAX calls from React, we're going to build an app that:

1. Fills the web page with a Google map of the user's current location.  The map will be styled in a way to remove many of the distractions such as roads and controls for zooming, etc.

2. Upon loading, uses the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) (Web API) to obtain the user's current latitude and longitude GPS coordinates.

3. The coordinates (latitude & longitude) will be passed as props to a custom `<Map>` component responsible for rendering the map referred to in step 1 above.

4. Also upon loading, the current coordinates will be used to make a call to the [OpenWeatherMap API](https://openweathermap.org/api) to display the current temperature and the weather condition (as an icon).

To focus on how to make an AJAX call in a React app, the app purposely is minimalistic - requiring no user interaction at all.

<br>
<br>
<br>



#### The Starter Code

In the starter code, `<App>` is currently rendering only a `<header>` and the custom `<Map>` component which currently does not render a map because it's waiting for us to provide a couple of props, which we'll do in a bit.

Also, take a peek at **index.css** & **App.css** to see how [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) (AKA CSS Variables) are being used. 

They are really cool addition to the CSS spec.

<br>
<br>
<br>


## Including Third-Party Libraries

If you google how to use this or that library with React, many of the results returned will reference modules and/or React components that can be installed via npm.

However, much of the time, using third-party libraries such as Google Maps without resorting to installing custom React-oriented modules/components is not difficult.

To demonstrate this, we're going to use the Google Maps JavaScript library to load a map of the user's current location.

<br>
<br>
<br>


#### Including the Library

In React, we can load JavaScript libraries in _index.html_ via CDNs as usual.

The starter code has the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial) being loaded in the `<head>` of **public/index.html**.

Checking the Google Maps docs shows how to load the library in a non-React app:

```html
<script async defer
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
</script>
```

The `callback=initMap` in the query string tells the library to run a function named `initMap` after it has loaded. This function would, in a non-React app, create the map.

However, in a React app, you need more control as to when a map is rendered - thus in the starter code, the `callback` parameter has been removed.

This is what we want:

```html
<script async defer
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY">
</script>
```

Note that Google Map's API keys are intended to be used client-side.

<br>
<br>
<br>


#### The Custom `<Map>` Component

The starter code includes a simple `<Map>` function component that can be reused to render as many maps desired.

Reviewing the code in **Map.js** reveals that, thanks to the `if` statement on line 9, a map is only created and displayed in the `<div>` if both a `lat` and a `lng` prop is provided.

The component also uses a `zoom` prop if it's provided, otherwise a default value of `12` is used (line 12).

Since the library's `Map` constructor needs a reference to the DOM element to draw the map in, line 7 creates a [ref](https://reactjs.org/docs/hooks-reference.html#useref) using rReact's `useRef` hook that is assigned to the only React Element being rendered:

```javascript
<div ref={mapDiv} className={styles.Map}></div>
```

This allows us to use the ref (`mapDiv.current`) to provide the library a reference to the mounted `<div>` on line 14.


<br>
<br>
<br>

**[More on React's `useRef` hook:](https://reactjs.org/docs/hooks-reference.html#useref)**

*useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue).* 

*The returned object will persist for the full lifetime of the component.*

*Essentially, useRef is like a “box” that can hold a mutable value in its .current property.*

*If you pass a ref object to React with `<div ref={myRef} />`, React will set its .current property to the corresponding DOM node whenever that node changes.*

*However, `useRef()` is useful for more than the ref attribute. It’s handy for keeping any mutable value around similar to how you’d use instance fields in classes.*

*This works because useRef() creates a plain JavaScript object.* 

*The only difference between useRef() and creating a {current: ...} object yourself is that useRef will give you the same ref object on every render.* **- ReactJS.org**


<br>
<br>
<br>

### Simpler explaination for why we're using this

The Google Maps library needs a place in the actual DOM to stick our map after we provide needed information such as coordinates. 

Since we don't use `document.getElementById()` or `document.querySelector()` in our components, React provides us with a convenient alternative: **The `useRef` hook and the JSX element's `ref` prop**. 

Both of these combined provides our component access to the **actual** resulting DOM element in the browser. 

Also, we don't lose this reference even with the component is re-rendered, which is pretty neat. 😄

<br>
<br>
<br>


### Accessing Libraries Loaded Outside of React

Take note on how the Google Maps library is being referenced on line 14 (and also on line 22):

```javascript
const map = new window.google.maps.Map(
``` 

<br>
<br>
<br>

Normally, as shown in the docs, you would access the global `google` object created by the library directly.  However, due to the way the module system works in React, `google` is not in scope and the app will fail to build if we try to access `google` directly:

<img src="https://i.imgur.com/OGdPf7e.png">

The solution is to access `google`, as well as other global variables, such as `socket` or `$`, by prefacing the global variable with the `window` object, which we know to represent the global namespace.

<br>
<br>
<br>


### Accessing the Browser's Current Coordinates

The [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) is a Web API available in the browser that can return an object that contains the current GPS coordinates of the browser.

<br>
<br>
<br>


#### Modularization Using Service Modules

It is a best practice to organize general purpose, reusable functionality within utility/service modules.

The project's starter code has a `services` folder for holding such modules.

The **services/geolocation.js** module has a single named export, `getCurrentLatLng`.

So that we can take advantage of [`async/await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), the Geolocation API's `getCurrentPosition` method has been wrapped to return a promise instead of accepting a callback (the Geolocation API was around before promises were):

```javascript
export function getCurrentLatLng() {
  // Wrap getCurrentPosition to return a promise
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(pos => resolve({
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    }));
  });
}
```

> The above code pattern can basically be used to "promisfy" callback-based asynchronous methods.  However, if the callback has an `err` parameter, be sure to pass that to `reject` function.

Let's see how to use this service to provide the coordinates to the `<Map>` component...

<br>
<br>
<br>


## Making Asynchronous/AJAX Calls in React

You may be wondering why we have a dedicated lesson to cover making AJAX calls from a React app.

After all, we've already seen how to make AJAX calls in Units 1 & 2.

If you take a look at a React component, it's not easy to figure out where to put the AJAX code. There's a subtle answer to this problem, as we briefly discussed in our state and props lesson. 

When our components need to initiate calls to asynchronous operations, such as making AJAX calls when a component mounts or run other code when it's state or props are updated, we can use the [`useEffect()`](https://reactjs.org/docs/hooks-reference.html#useeffect) hook.


**Let's learn more!**

<br>
<br>
<br>



### Performing Side Effects Using useEffect()

**Side effects include performing tasks such as:**

- Fetching data
- Using timers
- Manually updating the DOM
- Managing subscriptions
  
> **Key Point: When performing a task that needs to be carried out after a function component mounts, when it's state/props are updated, or when it must be removed from the DOM, the `useEffect` hook is the perfect tool for the job!**


<br>
<br>
<br>

### Adding the useEffect() Hook

**Like `useState()` and other hooks, because they are functions, we just invoke them from the top-level of the function component:**


```javascript
// first we import the useEffect hook from react
import { useEffect } from 'react';
import './App.css';
import Map from './components/Map/Map';

function App() {
  
  // then we set it up like this
  useEffect(() => {
    console.log('useEffect was called');
  });

  return (
    <div className='App'>
      <Map />
      <header className='App-header'>REACT WEATHER</header>
    </div>
  );
}

export default App;

```

**`useEffect()` takes a callback function as its first and only required argument.**

<br>
<br>


**By default, useEffect's callback function will be invoked after every render of the component, this includes whenever the component is rendered as a result of state changing.**


**Let's test this out by adding state to our `<App>` component ... *(we'll need state anyways to store our coordinates and weather info)***

```javascript
  // first, we import the useState hook  
  import { useEffect, useState } from 'react';
  import './App.css';
  import Map from './components/Map/Map';

  function App() {

    // then we'll initialize our state passing in some blank data our app eventually needs 
    const [appData, setAppData] = useState({
      lat: null,
      lng: null, 
    });
    
    useEffect(() => {
      console.log('useEffect was called');
    });

    return (
      <div className='App'>
        <Map />
        <header className='App-header'>
          REACT WEATHER
          {/* we can then add a button to set component state on click */}
          <button onClick={() => setAppData({
              lat: 32.8203525,
              lng: -97.011731
          })}>Set Weather Data</button>
        </header>
      </div>
    );
  }

  export default App;

```

<br>
<br>
<br>


### Preventing Side Effects from Running

In many cases, you will want to optimize the component so that side effects only run if:

- Certain data changes (typically a prop or state variable).
- After the initial render, but not after subsequent renders.


The useEffect() hook provides for these scenarios by accepting an array as a second argument.

The array is designed to hold a list of dependencies, that is, a list of variables and/or object properties that causes the side effect to run only if at least one of the dependencies change their value.

Providing an empty array ([]), will result in the side effect only running after the initial render. Let's check this out:

```javascript
  // Add the [] as a 2nd argument
  useEffect(() => {
    console.log('useEffect was called');
  }, []);

```
Clear the console and refresh. The "useEffect was called" message will be logged. However, unlike without the [] arg, clicking the button will no longer run the side effect!

<br>
<br>
<br>


### Getting our App Data when App mounts to the DOM

Once our Weather App loads, it will need to gather current GPS coordinates of the browser and eventually some weather data.

Let's use what we've learned about the `useEffect` hook to help us with this task!

<br>
<br>
<br>

**First, we will need to add an import inside of **App.js** to be able to access the `getCurrentLatLng` function that's being exported from the **geolocation.js** service module, we'll also remove the button we added to the `header`:**

```javascript
  import { useEffect, useState } from 'react';
  import './App.css';
  import Map from './components/Map/Map';

  // here's our latest import statement  
  import { getCurrentLatLng } from './services/geolocation';

  function App() {

    const [appData, setAppData] = useState({
      lat: null,
      lng: null
    });
    
    useEffect(() => {
      console.log('useEffect was called');
    }, []);

    return (
      <div className='App'>
        <Map />
        <header className='App-header'>
          REACT WEATHER
        </header>
      </div>
    );
  }

  export default App;
```

<br>
<br>
<br>

**Now let's create an [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) helper function to call `getCurrentLatLng`**

```javascript
  import { useEffect, useState } from 'react';
  import './App.css';
  import Map from './components/Map/Map';

  import { getCurrentLatLng } from './services/geolocation';


function App() {

  const [appData, setAppData] = useState({
    lat: null,
    lng: null
  })
  
  // here's our helper function to get our data
  async function getAppData() {
    const data = await getCurrentLatLng();
    console.log(data)
  }

      
  useEffect(() => {
    // we can then call the function inside our hook!
    getAppData();
  }, []);

  ...
  // more code below
```

The browser may be asking your permission to access you location - best grant it for this lesson to work 😊

Also notice how our helper function is an [`async` function!](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) 

*The async and await keywords enable asynchronous, promise-based behavior to be written in a cleaner (almost appearing synchronous) style, avoiding the need to explicitly configure promise chains.*

<br>
<br>

**After that last change, we should see our coordinates printing in the JavaScript console:**

```javascript
► {lat: 32.7915176, lng: -96.7944713}
```

<br>
<br>

**As usual, we're baby stepping our way to glory...**

<br>
<br>
<br>


### Providing the Coordinates to `<Map>`

<br>
<br>

**Now that we have the latitude and longitude, we can add them to `state`, then pass them to `<Map>` as props:**

```javascript
import { useEffect, useState } from 'react';
import './App.css';
import Map from './components/Map/Map';

import { getCurrentLatLng } from './services/geolocation';

function App () {

  const [appData, setAppData] = useState({
    lat: null,
    lng: null
  });
  

  // async is like telling JavaScript we'd like to run some asynchronous code ... synchronously 😄
  async function getAppData() {
    // await is like telling JavaScript ... "wait for this to run"
    const {lat, lng} = await getCurrentLatLng();
    // then we set our state
    setAppData({lat, lng })
    
  }

      
  useEffect(() => {
    getAppData();
  }, []);
```

<br>
<br>
<br>

**Finally, we can now pass that state as props to `<Map>` within the `render` method:**

```javascript
<Map lat={appData.lat} lng={appData.lng}/>
```


<br>
<br>
<br>


## Implement the _As a Visitor..._ User Story

Okay, let's implement the following User Story:<br>
**_As a Visitor, when I browse to the app, I want to see the current weather conditions for my location_**

<br>
<br>
<br>


#### The OpenWeatherMap API

We'll be using the [OpenWeatherMap API](https://openweathermap.org/) to return weather data in JSON format.

The API has lots of options, but [here's the link](https://openweathermap.org/current) to the current weather section.

Scroll down to here:

<img src="https://i.imgur.com/frr3qFs.png">

The API requires an API Key to use, however, you can borrow this one `5b3c5a41e420b342a7d2e498f5e3fd82`.

<br>
<br>
<br>

According to the docs, to retrieve the current weather data, we can make a call to the following endpoint substituting our desired coordinates:



```shell
https://api.openweathermap.org/data/2.5/weather?lat=34.0475869&lon=-117.8985651&units=imperial&appid=5b3c5a41e420b342a7d2e498f5e3fd82
```



Included in the URL is a query parameter of `units=imperial`. 

This param tells the API to return the temperature in Fahrenheit (the default is Kelvin).

<br>
<br>
<br>


**Let's checkout the JSON returned by pasting that URL into a browser tab.  You should get something like the following returned:**

```javascript
{
  "coord": {
    "lon": -117.9,
    "lat": 34.05
  },
  "weather": Array[1][
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 68.27,
    "pressure": 1019,
    "humidity": 37,
    "temp_min": 64,
    "temp_max": 72
  },
  "visibility": 16093,
  "wind": {
    "speed": 11.41,
    "deg": 250
  },
  "clouds": {
    "all": 1
  },
  "dt": 1553905125,
  "sys": {
    "type": 1,
    "id": 3578,
    "message": 0.0103,
    "country": "US",
    "sunrise": 1553866982,
    "sunset": 1553911768
  },
  "id": 5405326,
  "name": "Valinda",
  "cod": 200
}
```

<br>
<br>
<br>
<br>


### 💪 Activity - Create a `weather-api.js` Service Module

Putting `fetch` calls in service/utility modules is a best practice - do not litter your components with `fetch` calls!

This applies to whether you're making calls to the backend of the SPA or third-party APIs.

Using the **geolocation.js** module as an example, create a **weather-api.js** service module that:

- Exports, as a named export, a `getCurWeatherByLatLng` function.

- The `getCurWeatherByLatLng` function should:

  1. Define two parameters: `lat` & `lng`.
  2. Use `fetch` to make a call to the same endpoint as above, substituting the values of `lat` and `lng` passed as arguments. 
  3. Be sure to assign our `lng` value to the `lon` query param that the API uses.
  4. Return the result of `fetch(...).then(res => res.json())` so that we can work with the promise that returns the actual data.

- Import the named export , `getCurWeatherByLatLng`, into **App.js**.

- Inside the `getAppData` helper function, use `getCurWeatherByLatLng` to obtain the data by passing in the `lat` and `lng` values from `getCurrentLatLng`.
- Make sure you use the `await` keyword the same way we had to use it with `getCurrentLatLng`
-  Assign the returned value to a variable named `weatherData`.

- `console.log(weatherData)` and verify that the data is being logged:

	<img src="https://i.imgur.com/y8JXo71.png">

<br>
<br>
<br>
<br>


#### Add the Weather Data to State

We're going to keep it simple and display:

- The current temperature, and
- An icon for the "conditions"

Looking at the data returned, we see that the temperature can be accessed as `weatherData.main.temp`.


<br>
<br>
<br>


**Let's log that out to verify, but let's also round it off while we're at it:**

```javascript
const weatherData = await getCurWeatherByLatLng(lat, lng);
console.log(Math.round(weatherData.main.temp));
```

<br>
<br>
<br>

Now there's the `icon` property whose value is a short string that we can use to build out a URL for use as an `<img>` element's `src` attribute, do you know where we can find it?

The ["How to get icon URL" section](https://openweathermap.org/weather-conditions) of OpenWeatherMap's docs shows us how to form the URL that points to the current condition's icon. Be sure to always use `https` however.

<br>
<br>
<br>


**Now that we know the data paths, let's add them to state:**

```javascript
  const [appData, setAppData] = useState({
    lat: null,
    lng: null,
    // Add the initializations
    temp: null,
    icon: ''
  });

  async function getAppData() {
    const {lat, lng} = await getCurrentLatLng();
    const weatherData = await getCurWeatherByLatLng(lat, lng);
    
    setAppData({
      lat, 
      lng,
      temp: Math.round(weatherData.main.temp),
      icon: weatherData.weather[0].icon 
    });
    
  }
```
<br>
<br>
<br>


**React Developer Tools assure us that we're ready to move on to rendering:**

<img src="https://i.imgur.com/Oy0FXi6.png">

<br>
<br>
<br>
<br>


### Render the Temperature and Condition Icon

Ignoring CSS for now, let's update the `<header>` in **App.js** as follows:

```javascript
  <header className='App-header'>
    {
    appData.temp && 
      <div>{appData.temp}&deg;</div>
    }
    REACT WEATHER
    {appData.icon && 
      <img
        src={`https://openweathermap.org/img/w/${appData.icon}.png`}
        alt='Current Conditions'
      />
    }
  </header>
```

<br>
<br>
<br>


Note how we're using the `&&` operator within a JSX expression to prevent the rendering of a "broken image" or empty `<div>` element to show until the data arrives.

Lastly, React will give a warning in the console if you don't include an `alt` prop in all `<img>` components.

<br>
<br>
<br>


### Update the CSS for the `<header>`

The `<header>` already has a `App-header` class being applied that makes it a flexbox.

Let's update the `justify-content` property:

```css
justify-content: space-around;
```

All that's left is to add a touch of CSS to style the temp and image:

```css
.App-header div {
  color: white;
  font-size: 5vmin;
  font-weight: bold;
}

.App-header img {
  height: 10vmin;
}
```

<br>
<br>
<br>


## Congrats! 🎉

<img src="https://i.imgur.com/rUTkeVb.png">

<br>
<br>
<br>

<!-- 


## Essential Questions

Take a moment to review the following questions:

**❓ Assuming you loaded jQuery via a CDN in a React app's index.html, what object must you precede `$()` (jQuery function) with?**

**❓ What React hook do we initiate asynchronous calls from?**

-->

<br>
<br>
<br>


## References

- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [React's `useEffect` hook](https://reactjs.org/docs/hooks-effect.html)
- [React's `useRef` hook](https://reactjs.org/docs/hooks-reference.html#useref)





