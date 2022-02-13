---
track: "React Fundamentals"
title: "Intro to React Router"
week: 14
day: 3
type: "lecture"
---

# Intro to React Router


| Students Will Be Able To: |
|---|
| Use React Router to define client-side `<Route>` components |
| Render "page" components using React Router |
| Use `<Link>` to create hyperlinks that route client-side |



<br>
<br>
<br>

### [Click Here](https://generalassembly.zoom.us/rec/share/GTis15E7NTelhVEuNxrIZd4b2bJm1C03p0GJhPfHYE_XLqoAV_7-yl0vrPp5HMJh.zK_eu5cxJ2MWDGN0?startTime=1621699441000) to access recording

<br>
<br>
<br>




## Road Map

- Set Up
- Intro to React Router
- First Route
- Rendering "Page" Components
- The `Switch` Component
- Adding a `Link` to Change Routes
- Summary
- Essential Questions
- Further Reading

<br>
<br>
<br>




## Set Up

The starter code for this lesson will pick up from the finished version of the _Handling Events in React Lab_.

To be ready for this lesson, please:

- Download the <a href="/downloads/react_fundamentals/react-router/react-mastermind.zip" download>Starter Code</a>
- Extract the folder from the `.zip` file and `cd` into it
- Install the Node modules: `$ npm i`
- Open the code in VS Code: `$ code .`
- Start the dev server: `$ npm start`


<br>
<br>
<br>



## Intro to React Router

[React Router](https://reacttraining.com/react-router/web/guides/quick-start) is by far the most popular third-party library used to provide client-side routing features for React applications.

Early on in this unit we discussed that client-side routing is one of the core enablers of Single-Page Applications (SPAs)...

Enablers of modern-day SPAs built with React:

- Client-side Routing (React Router)
- AJAX (Fetch API, Axios library, etc.)
- Client-side Rendering (React itself)

There are two versions of React Router:

- Web (`react-router-dom`): This is what we will use with React
- Native (`react-router-native`): This is for use with React Native used to develop mobile apps.

<br>
<br>
<br>




#### Philosophy of Using React Router

First, **React Router is based on Components!**

You know how components render other components in React?

React Router follows this very same approach, we will define `<Route>` components that are either rendered or not based upon the current URL in the address bar.

Then, we can declare which of our "page" components we want rendered when a particular `<Route>` component gets rendered.

In a typical React app, defining routing for a React app using React Router is a matter of declaring a component hierarchy within the top-level `<App>` component.

<br>
<br>
<br>



#### Installing React Router

Since React Router is not part of the React library, it needs to be installed separately:

```shell
$ npm i react-router-dom
```

<br>
<br>
<br>



#### Importing into `<App>`

The top-level component of React Router is the `<BrowserRouter>`.

Since it is a top-level component required for other router-related components to work, a best practice is to wrap `<App>` with `<BrowserRouter>` in the entry module (**index.js**).

`<BrowserRouter>` uses the HTML5 History API (`pushState()`, `replaceState()` and the `popstate` event) to keep the UI in sync with the URL in the address bar.

<br>
<br>
<br>


**Before we can use `BrowserRouter`, we need to import it. Let's import it near the top of `index.js`:**

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import the BrowserRouter and assign an alias
import { BrowserRouter as Router } from 'react-router-dom';

```

Note the use of `as` to declare an _alias_ for `<BrowserRouter>` named `Router`. 

This allows the use of shorter names for longer named exports such `BrowserRouter`.


<br>
<br>
<br>

**Now we can refactor `ReactDOM.render` to render `<Router>` which in turn renders `<App>`:**

```jsx
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
```

**Mastermind should still be running perfectly with the above refactor.**


<br>
<br>
<br>



## First Route

With `<BrowserRouter>` now being rendered, we're free to use the `<Route>` component to define client-side routes.

`<Route>` components are commonly used in the `<App>` component to render "page" components.

However, you can use `<Route>` in any component which allows for complex nested routing scenarios.

Open **App.js** and add the `Route` named import:

```javascript
import NewGameButton from './components/NewGameButton/NewGameButton';
// Add the Route named import
import { Route } from 'react-router-dom';
```

<br>
<br>
<br>

**Now let's add a `<Route>` component below the `<header>`:**

```jsx
return (
  <div className="App">
    <header className='App-header-footer'>R E A C T&nbsp;&nbsp;&nbsp;M A S T E R M I N D</header>
    <Route component={GameTimer} />
```

The page should now display an extra `<GameTimer>` under the header.

<br>
<br>
<br>

**Let's say we only want the extra `<GameTimer>` to show when the URL has a certain path:**

```jsx
<Route path='/timer' component={GameTimer} />
```

<br>
<br>
<br>


When the page refreshes, the extra `<GameTimer>` is gone.

Now type `localhost:3000/timer` in the address bar and the extra timer is back!

Let's reflect for just a moment on the component-based nature of `react-router` - good, let's continue...

<br>
<br>
<br>




#### Using the `render` Prop on `<Route>`

In our example so far, we used the `component` prop to inform the `<Route>` which component to render, there is a much more flexible and efficient approach.

<br>
<br>
<br>

**Instead of using `component` you should use the `render` prop that accepts a function to perform "inline" rendering instead:**

```jsx
<Route path='/timer' render={() => (
  <GameTimer />
)}/>
```
**The function provided to the `render` prop should return the UI just like a typical `render` method does.**

<br>
<br>
<br>



**Although the syntax of the `render` prop is a bit more complex, it's more flexible because it allows for app logic in the function and the passing of props like this:**

```jsx
<Route path='/timer' render={(props) => (
  <GameTimer {...props} />
)}/>
```

**Note that the `{...props}` expression uses the spread operator to concisely pass all `key:value` pairs in the `props` object (parameter) as props to `<GameTimer>`**

<br>
<br>
<br>


**Let's use React Developer Tools to see what props the `<Route>` component is passing:**

<img src="https://i.imgur.com/03IKYlP.png"> 

**There are three objects being passed:**

1. `history`: Great for changing routes programmatically
2. `location`: Provides access to query strings
3. `match`: Provides access to URL Parameters

<br>
<br>
<br>



## Rendering "Page" Components

In your full-stack projects so far, you've had a nav bar with links used to access the application's main pages.

A full-stack React app can work the same way where links are used to route to "page"-level components.

Separating "page" components in your app that are then rendered by `<Route>` components is a great way to help organize the large amount of components that exist in a typical React app.

In this lesson, we are going to define a root route that renders the game as it currently exists.

As a practice exercise you will define a `/settings` route used to display a "settings" page.

<br>
<br>
<br>




### Organizing "Page" Components, Create the `<GamePage>` Component & Refactor `<App>`

**To help organize the components in the app, we'll create a dedicated folder that will hold "page" components:**

```shell
$ mkdir src/pages
```

<br>
<br>
<br>

**Next, we are going to refactor the project such that `<App>` will remain our top-level component and will:**

- Define and render the appropriate `<Route>` components based upon the current path.
- Continue to hold the main application state and logic.

<br>
<br>
<br>


For the root route we want to render a `<GamePage>` component responsible for rendering most of the components currently being rendered by `<App>`.

**IMPORTANT:** *It makes sense to name our "page" components by suffixing them with `Page`.*

<br>

**Time to stub up `<GamePage>`:**

```shell
$ mkdir src/pages/GamePage
```

<br>
<br>
<br>

**Now create `src/pages/GamePage/GamePage.js`:**

```shell
touch src/pages/GamePage/GamePage.js
```

Unfortunately refactoring is often more tedious than coding from scratch. Time to show off our grit and determination...

<br>
<br>
<br>


**`<App>` will continue to hold react-mastermind's state. So we'll pass all of the necessary props to our `GamePage` component**

Let's stub up `<GamePage>` in **GamePage.js**:

```jsx

const GamePage = (props) => {
  return (
    <div>GamePage</div>
  );
};

export default GamePage;
```
<br>
<br>
<br>


Let's import it into **App.js**:

```jsx
import NewGameButton from './components/NewGameButton/NewGameButton';
import GamePage from './pages/GamePage/GamePage';
```

<br>
<br>
<br>

**Then test render it:**

```jsx
return (
  <div className="App">
  {/* test render it */}
    <GamePage />
```

<br>
<br>



**Okay, let's copy the entire contents of `<App>`'s `return` statement and paste it in `<GamePage>` and refactor as follows:**

1. In `<GamePage>`, delete the `<Route path='/timer'>...` we messed around with.

2. IMPORTANT: In `<GamePage>`, delete the `<GamePage />` unless you really like the movie Inception (you may, but your computer doesn't).

3. In `<GamePage>`, delete the `<header>` because that's going to remain in `<App>`.
   
4. Transfer the following imports from **App.js** to **GamePage.js** 


<br>
<br>
<br>

**NOTE: (the paths have been modified to account for the new location we're importing to)**:


```javascript
import GameBoard from '../../components/GameBoard/GameBoard';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import GameTimer from '../../components/GameTimer/GameTimer';
import NewGameButton from '../../components/NewGameButton/NewGameButton';
``` 

<br>
<br>

5. **Update the `return` statement in `App.js` so that it only renders the `<header>` and a `<Route>` for the [exact](https://reacttraining.com/react-router/web/api/Route/exact-bool) path of `/` (root):**

```jsx
return (
   <div className="App">
     <header className='App-header-footer'>R E A C T&nbsp;&nbsp;&nbsp;M A S T E R M I N D</header>
     <Route exact path='/' render={() =>
      <GamePage
        winTries={winTries}
        colors={colors}
        selColorIdx={selColorIdx}
        guesses={gameState.guesses}
        setColorIdx={setColorIdx}
        handleNewGameClick={handleNewGameClick}
        handlePegClick={handlePegClick}
        handleScoreClick={handleScoreClick}
      />
    } />
   </div>
 );
```



**Note:** We are adding an additional `winTries` prop because the footer that uses it has been moved to `<GamePage>`.

<br>	
<br>	


**Back in `<GamePage>`, update the two references to the `colors` prop**

```jsx
colors={colors}
```

<br>

**to be**

<br>
	

```jsx
colors={props.colors}
```

**Still in`<GamePage>`, update the rest of the prop values to prefex `props.` instead.**

<br>
<br>
<br>

**So, for example**

```jsx
  ...
  colors={props.colors} 
  selColorIdx={props.selColorIdx} 
  setColorIdx={props.setColorIdx}
  ...
```

<br>
<br>
<br>


Here's the refactored **GamePage.js**:

```jsx
import GameBoard from '../../components/GameBoard/GameBoard';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import GameTimer from '../../components/GameTimer/GameTimer';
import NewGameButton from '../../components/NewGameButton/NewGameButton';

const GamePage = (props) => {
    return (
      <div className="App">
        <div className="flex-h align-flex-end">
          <GameBoard 
            colors={props.colors} 
            guesses={props.guesses}
            handleScoreClick={props.handleScoreClick} 
            handlePegClick={props.handlePegClick}
          />
          <div className="App-controls">
            <ColorPicker 
              colors={props.colors} 
              selColorIdx={props.selColorIdx} 
              setColorIdx={props.setColorIdx}
            />
            <GameTimer />
            <NewGameButton handleNewGameClick={props.handleNewGameClick} />
          </div>
        </div>
        <footer className='App-header-footer'>{props.winTries ? `You Won in ${props.winTries} Guesses!` : 'Good Luck!'}</footer>
      </div>
    );
};
  
export default GamePage;
```

<br>
<br>
<br>


<img src="https://i.imgur.com/Ayx9Mlt.png">

**Although the app is back to where it was, the CSS classes defined in `App.css` are being used in `GamePage.js` which doesn't feel right. Refactoring the CSS will be part of the lab.**

<br>
<br>
<br>



## The `Switch` Component

React Router includes a [`<Switch>`](https://reacttraining.com/react-router/web/api/Switch) component used to render only the first `<Route>` component that matches the URL.

It's quite common to wrap multiple `<Route>` components by a `<Switch>` component.

Let's take a look at the first example in the [docs](https://reacttraining.com/react-router/web/api/Switch) to see what `<Switch>` does.

<br>
<br>
<br>

**Let's import it in App.js:**

```javascript
import { Route, Switch } from 'react-router-dom';
```


<br>
<br>
<br>


**Then use `<Switch>` to wrap the current `<Route>` in the `return` statement:**

```jsx
 return (
   <div className="App">
     <header className='App-header-footer'>R E A C T&nbsp;&nbsp;&nbsp;M A S T E R M I N D</header>
     <Switch>
       <Route exact path='/' render={() =>
         <GamePage
           winTries={winTries}
           colors={colors}
           selColorIdx={selColorIdx}
           guesses={gameState.guesses}
           setColorIdx={setColorIdx}
           handleNewGameClick={handleNewGameClick}
           handlePegClick={handlePegClick}
           handleScoreClick={handleScoreClick}
         />
       } />
     </Switch>
   </div>
 );
```

<br>
<br>
<br>




### 💪 Practice Exercise - Add a Route (15 min)

1. Create a `<SettingsPage>` component and be sure to follow the conventions for folders, etc.

2. Code `<SettingsPage>` so that it returns `<h1>Settings Page</h1>` as its UI.

3. Add a new `<Route>` below the existing `<Route>` for the `<GamePage>` component (but stay inside of the `</Switch>`).

4. The new route should have a path of `/settings` and should render the `<SettingsPage>` component.

5. The new `<Route>` component should pass its props to the function assigned to its `render` prop. The passed props should then be passed to `<SetttingsPage>` using the spread operator we saw in the _Using the `render` Prop on `<Route>`_ section above.

6. Browsing to `localhost:3000/settings` should result in this display:

	<img src="https://i.imgur.com/q3mVb4u.png">

7. Use React Developer Tools to verify that `<Route>` passed its props to `<SettingsPage>`:

	<img src="https://i.imgur.com/3AuJrAI.png">
	


<br>
<br>
<br>



## Adding a `Link` to Change Routes

React Router comes with a [`<Link>`](https://reacttraining.com/react-router/web/api/Link) component that we must use instead of regular `<a>` tags to allow the user to navigate to different routes by clicking.

Using a regular `<a>` tag will result in a full-page refresh.

> There's also a [`<NavLink>`](https://reacttraining.com/react-router/web/api/NavLink) that makes it easy to add/remove styling based upon if the link's URL matches the current URL.

Since the lab is about implementing a Settings Page feature.

Let's add a `<Link>` to **GamePage.js** that you can use to move to that route.

<br>
<br>
<br>

**First we need to import it:**

```javascript
import { Link } from 'react-router-dom';
```

<br>
<br>
<br>



**Now let's add the `<Link>` between the `<GameTimer>` and `<NewGameButton>`:**

```jsx
<GameTimer />
  <Link className='btn btn-default' to='/settings'>Difficulty</Link>
<NewGameButton />
```

The `to` prop specifies what URL path to route to if the link is clicked.

<br>
<br>


It looks good, except we need a little margin between the `<Link>` and `<NewGameButton>`.

**YOU DO:** Take a few minutes to add a style prop to `<Link>` with `marginBottom` key set to `10`.

<br>
<br>

*So, for example:*

```jsx

<Link style={{ marginBottom: 10 }} className="btn btn-default" to="/settings">Difficulty</Link>
```

<br>
<br>



**When completed, the page should look like this:**

<img src="https://i.imgur.com/ScWtx2B.png">

<br>
<br>
<br>




### 💪 Practice Exercise - Add a Link (5 min)

1. Add a `<Link>` to `<SettingsPage>` above the `<h1>`.

2. The `<Link>` should display the text of "HOME" that when clicked navigates to `/` (root route):

	<img src="https://i.imgur.com/ZtXwjYz.png">



<br>
<br>
<br>
<br>


## Summary

Using React Router to perform client-side routing is straightforward.

It's enormously flexible with the ability to declare routing for even the most complex of scenarios.

We'll see more of React Routers capabilities in the authentication lesson later.

Also, be sure to check out the further reading section below for insight into more capabilities of React Router


<br>
<br>
<br>



## Essential Questions

Take a moment to review the following questions:

**❓ True or False: The `<Route>` component is _rendered_ when its `path` matches that of the URL's.**

**❓ What's wrong with the following component?**


```jsx
	const Movie = props => (
	  <div>
	    <a href="/movies">View All Movies</a>
	    <h1>{props.title}</h1>
	  </div>
	);
```



<br>
<br>
<br>
<br>
<br>
<br>



# Further Reading

<br>
<br>

## Defining Routes with URL Parameters

Surely you remember routes we defined in Express that included URL parameters similar to these...

<br>
<br>

**In Express:**

```javascript
router.get('/movies/:id', moviesCtrl.show);
```

<br>
<br>

We typically used such routes to view the `show/details` page for a single `row/document` in the database.

When you have similar functionality in a React app, we can define routes with named URL parameters like this:

```jsx
<Route path="/movies/:id" render={props => <Movie {...props}/>} />
```
As you can see, it uses the same `/:param` syntax that we used in Express.

<br>
<br>
<br>



#### Accessing the Values Corresponding to the URL's Parameters

The `match` prop passed by the `<Route>` component has a `params` property that's an object with a key:value pair for each URL parameter.

<br>
<br>
<br>


**For example, assuming the following route (same as defined above):**

```jsx
<Route path="/movies/:id" render={props => <Movie {...props}/>} />
```

<br>
<br>
<br>


**Browsing to `localhost:3000/movies/123`, would result in the following `<Movie>` component:**

```jsx
const Movie = ({ match }) => (
  <h1>Movie id is: {match.params.id}</h1>
);
```

**Rendering this output:**


<h1>Movie id is: 123</h1>

> Note that `match` was assigned the the match prop via destructuring assignment in the parameter.


<br>
<br>
<br>



## Routing Programmatically

**Routing programmatically** is when you change routes in code vs. when a user clicks a link.

For example, let's say a user just added a movie by clicking a button and you submitted the data via AJAX. Now what?

In a traditional web app, the server would have responded with a redirect to the index or details page.

That's not going to happen in a SPA. Instead, you've got to change the route programmatically (using code) which is done using the `history` prop of the `<Route>` component.

Assuming `history` has been passed as a prop to a Class Component, you would move to the root route like this:

```javascript
// Change to the root route programmatically
this.props.history.push('/');
```

Of course, you must ensure that `<Route>`'s `history` prop is passed to any component that needs to route programmatically.



<br>
<br>
<br>



## References

- [React Router - Web](https://reacttraining.com/react-router/web/guides/quick-start)






