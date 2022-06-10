# React-Recoil and React-Request

One of the best things about React is the huge developer community that exists creating an endless supply of libraries, component libraries and even full on frameworks to extend the use of React in web developmnet. In this lecture we'll target a few useful libraries that help solve some of Reacts greatest pain points.

## What are React's Pain Points?

Below you'll see a list of common pain points and libraries that aim to solve them.

| Pain Point | Libraries |
|------------|-----------|
| State Management | Recoil, Mobx, Redux, XState, merced-react-hooks |
| Making API Calls | react-query, react-request, merced-react-hooks |
| Forms | Formik, merced-react-hooks |
| Styling | Styled Components, Emotion, JSS |

## Why React Recoil?

Over the years Redux has been probably the most used State Management library for React, recently the creators of React, Facebook, released their own state management library which provides a much simpler and more "Reacty" library called Recoil. Since it's created by the makers of React it touts some very convinient and powerfel functionality.

## Why react-query

React request doesn't just make the process of making API calls smooth, but it also abstracts away tedious issues like a caching and updating data, it has been growing quite popular since its release.

## Let's Get Started

- create a new react `npx create-react-app recoilquery`

- install libraries `npm install recoil react-query`

## Setting up the Providers

Like many react libraries (like React Router) we setup the library by wrapping our App in a provider.

- The recoil provider will help deliver our state across our application

- the react-query provider will help make the data from our fetch requests available across the app.

open up src/index.js

```js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </RecoilRoot>
  </QueryClientProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

## Creating State with Recoil

In Recoil, state you want shared with Recoil are called atoms. Let's create an src/atom.js file to declare all our atoms.

```js
import { atom } from "recoil";

// declare and export an atom
export const counterState = atom({
    // the key is used to track the state internally in recoil
    key: 'counterState',
    // default value is the value if not other value exists, the starting value essentially
    default: 0
})
```

## Using the Recoil State

Let's create a counter component in src/components/counter.js

```js
import { counterState } from "../atom";
import { useRecoilState } from "recoil";

function Counter(props) {
  // bring in the state from the atom
  const [counter, setCounter] = useRecoilState(counterState);

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>Add</button>
    </div>
  );
}

export default Counter;
```

let's import the component in App and see it at work

src/App.js

```js
import Counter from "./components/counter";

function App(props) {
  return (
    <div>
      <Counter />
    </div>
  );
}

export default App;
```

Now add two counters:

```js
import Counter from "./components/counter";

function App(props) {
  return (
    <div>
      <Counter />
      <Counter />
    </div>
  );
}

export default App;
```

Notice they both always update, this is because they don't have their own internat state. Instead they are both working off the same external state from recoil. So recoil should be used when you have data that should be in sync throughout your app.

## Using React-Query

create another component, src/components/request.js

```js
import { useQuery } from "react-query";

function Request() {
  // make our query
  const response = useQuery("myQuery", async () => {
    const r = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    return r.json();
  });

  console.log(response);

  return <h1>Request</h1>;
}

export default Request;
```

the useQuery hook takes two arguments...

- query key, this is a string for tracking and chaching the query. If another component uses the same key it knows it's the same query so won't refetch but instead use the cached data.

- query function, a function that makes the desired request and returns a promise

## Test it out in app

let's use this component in App.js

```js
import Counter from "./components/counter";
import Request from "./components/request";

function App(props) {
  return (
    <div>
      <Counter />
      <Counter />
      <Request/>
    </div>
  );
}

export default App;
```

Examine the console.log and see how the response is given back.

Let's use two copies

```js
import Counter from "./components/counter";
import Request from "./components/request";

function App(props) {
  return (
    <div>
      <Counter />
      <Counter />
      <Request/>
      <Request/>
    </div>
  );
}

export default App;
```

Notice that even though we used the component twice, the console.logs don't increase. This is cause both components are altering the data from the same place kinda like we saw in recoil.

### What's in the response

The main things of note in the response object

- data: the data from the api call
- isLoading: a boolean on whether the call is still pending, can be used to return loading JSX
- isError: a boolean on whether the call has failed to return error JSX
- refetch: a function to repeat the call and update the data for everywhere it is used
- error: the error if there is one

## Bonus - Custom Hooks

### Custom Hooks for react-query

To make it even easier to refer to the same api call in multiple components, you can build custom hooks to avoid typing the same query function key and function over and over agian. Make a file src/queryhooks.js.

queryhooks.js

```js
import { useQuery } from "react-query";

// api request custom hook
export const useJsonPlaceholder = () => {
    // make api call and save response
    const response = useQuery("myQuery", async () => {
    const r = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    return r.json();
  });
  // return response
  return response
};
```

now we can use this custom hook instead of typing out that entire useQuery again.

src/components/request.js

```js
import { useJsonPlaceholder } from "../hooks";

function Request() {
  // make our query

  const response = useJsonPlaceholder()

  console.log(response);

  return <h1>Request</h1>;
}

export default Request;
```

Also, let's destructure some of those response properties and show how we can render the component conditionally.

```js
import { useJsonPlaceholder } from "../hooks";

function Request() {
  // make our query

  const { data, isError, isLoading, refetch } = useJsonPlaceholder();

  // JSX for ERROR
  if (isError) {
    return (
      <div>
        <h1>Request Failed</h1>
        <button onClick={() => refetch()}>Try Again</button>
      </div>
    );
  }

  // JSX for Loading
  if (isLoading) {
    return (
      <div>
        <h1>Loading</h1>
        <button onClick={() => refetch()}>Try Again</button>
      </div>
    );
  }

  // JSX for API Call Complete
  return (
    <div>
      <h1>Request Succeded</h1>
      <ul>
        {Object.keys(data).map((key) => (
          <li>
            {key}: {data[key]}
          </li>
        ))}
      </ul>
      <button onClick={() => refetch()}>Try Again</button>
    </div>
  );
}

export default Request;
```

### custom hooks for recoil

For our atoms we can just make our custom hooks when we declare them, like so.

atom.js

```js
import { atom, useRecoilState } from "recoil";

// declare and export an atom
const counterState = atom({
    // the key is used to track the state internally in recoil
    key: 'counterState',
    // default value is the value if not other value exists, the starting value essentially
    default: 0
})

// declare custom hook for the using the atom
export const useCounterState = () => {
    return useRecoilState(counterState)
}

```

Now we don't have to import useRecoilState and the atom, we can just import the custom hook in any components that use that state.

counter.js

```js
import { useCounterState } from "../atom";

function Counter(props) {
  // bring in the state from the atom
  const [counter, setCounter] = useCounterState()

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>Add</button>
    </div>
  );
}

export default Counter;
```

The great thing about customhooks it lets us clean up our code and make reusing state across our app so much easier!

## Non-Deliverable Lab

Try to take the build you created last week and refactor it using react-query and/or recoil.

I highly recommend making these changes on a branch so you keep your original code. Commit what you have already and then run the command `git checkout -b refactor` to work from a branch called refactor. While on this branch push your code using `git push origin refactor`. 

- you can switch branches at anytime with `git checkout BRANCH_NAME`
- you can see what your current list of branches with the command of `git branch`