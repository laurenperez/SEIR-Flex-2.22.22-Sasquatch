---
track: "React Fundamentals"
title: "Star Wars API - React Lab"
week: 13
day: 3
type: "lab"
---


# Star Wars API - React Lab

<br>
<br>
<br>
<br>


## Intro

In the lesson earlier you learned to consume a third-party API in React and invoke the call to that API using the `useEffect` hook.
 
<!-- 2. Created a "service" module to organize `fetch` calls within. -->

In this lab, you'll consume the [Star Wars API](https://swapi.dev/) and render it's data.

**This lab is a DELIVERABLE**

<br>
<br>
<br>


## Set Up

To get set up for this lesson:

- Use `create-react-app` to create a React app named `react-star-wars`
- `cd` into `react-star-wars` and open VS Code.
- Open a terminal in VS Code.
- Start the React Dev Server.


<br>
<br>
<br>


## Exercises

**Styling in this lab is secondary to completing the functionality**

1. Research documentation of [SWAPI](https://swapi.dev/documentation) to find the endpoint for the `starships` resource.
2. Start by writing everything in `App.js`; the creation of additional components can come later as you scale the project.
3. Use the `useEffect` hook to fetch all the `"starship"` data from the API and store that data in component state using the `useState` hook.
4. Map over the array of starship objects in component state and render a card for each starship. 
5. Cards should contain the text of the starship's name.  

<br>
<br>
<br>


**For example:**

<img src="https://i.imgur.com/VERV0nk.png">




## Hints

- Hold the starship objects in state with the `useState` hook, don't forget to initialize to an empty array!

- Use the `useEffect` hook to make the AJAX request once the app loads.

- Once the starship data comes from the API, be sure to update state with the setter function.

- `.map()` over each starship object in state to transform them into JSX, or consider creating a new component for your starship cards, a `<StarshipCard />` component.

- CORS issue? Try changing your `/starships` endpoint to `/starships/`  **👈 *trust us on that one* 😎**.



<br>
<br>
<br>



## Bonus

- Display additional details for each Starship in it's respectable card.
- This API has a pagination feature that allows you to get additional starships to display - find out how to use this to your advantage and allow users to get more starships at the click of a button
- [Here's an informative article on pagination](https://nordicapis.com/everything-you-need-to-know-about-api-pagination/)
