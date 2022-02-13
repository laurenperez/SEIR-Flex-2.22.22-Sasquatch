---
track: "React Fundamentals"
title: "React Router Lab"
week: 14
day: 3
type: "lab"
---

# React Router Lab

<br>
<br>
<br>


## Intro

In the lesson earlier you:

1. Learned how to use React Router to perform client-side routing.
 
2. Refactored the react-mastermind app to render a `<GamePage>` component at the root route.

3. Added a "Difficulty" `<Link>` to the `<GamePage>` used to navigate to a `<SettingsPage>` component.

3. As a practice exercise, added an additional `<Route>` with a path of `/settings`.

4. Created a minimal `<SettingsPage>` component that included a "HOME" `<Link>`.

In this lab, you'll continue to have fun building out react-mastermind using what you know about components, state, props, styling, event handlers, routing and of course, JavaScript.

**This lab is not a deliverable**

<br>
<br>
<br>



## Set Up

The starter code for this lab is the same as the completed code from the _React Router_ lesson. However, just in case your code wasn't working or to ensure you have no issues following along with this lab, please follow the steps below:

To get set up for this lab:

- Download the <a href="/downloads/react_fundamentals/react-router-lab/react-mastermind.zip" download>Starter Code</a>
- Extract the folder from the `.zip` file and `cd` into it
- Install the Node modules: `$ npm i`
- Open the code in VS Code: `$ code .`
- Start the dev server: `$ npm start`

Once the dev server opens a tab to `localhost:3000`, the page should have something like the following:

<img src="https://i.imgur.com/ibMTm9k.png">

<br>
<br>
<br>




## Exercises

In this lab, you'll be adding the "Difficulty" setting functionality by completing the exercises below.

Please take your time and carefully read the instructions, sometimes it helps to read aloud to yourself or to a buddy so they can help "course-correct" if you're not understanding the instructions. 

Also try to think about the goal of each challenge and don't be afraid to refactor/re-write existing code to meet the new specifications ... **you're an engineer now!** ⚙️🔧

<br>
<br>
<br>

When completed, clicking the "Difficulty" link (styled as a button) will display the following:

<img src="https://i.imgur.com/gFjNSt0.png">

<br>

**As you can see, the settings page allows the player to change the difficulty level by selecting the number of colors available to choose from!**

<br>
<br>
<br>


1. Currently, the `<GamePage>` component is relying on CSS classes defined in **App.css**. Refactor to cure this inappropriateness by copying the classes in **App.css** over to **GamePage.css** created during the lesson. Update the class names and update **GamePage.js** as required to use those class names. 

2. Since both `<App>` & `<GamePage>` rely on a `*-header-footer` class with the same styling, refactor by renaming it to `header-footer` and putting it in **index.css** instead. Update **App.js** & **GamePage.js** to use `header-footer`, then you can delete `GamePage-header-footer` from **GamePage.css** and all of the CSS in **App.css**.

3. There will be three levels of difficulty: `'Easy'`; `'Moderate'`; and `'Difficult'`. The game's difficulty will be held as an additional piece of `gameState` with a default value of `Easy` - **HINT:** you could refactor `getInitialState` to have a `"difficulty level"` parameter or [default the parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters) value to `'Easy'`.

4. `gameState.difficulty` should not be "reset" if the player clicks the **[New Game]** button - **HINT:** you will need to refactor `handleNewGameClick` to preserve the existing difficulty level.
	
5. Using strings such as 'Easy', etc., to represent the `difficulty` is a fantastic way to access the array of colors for a particular difficulty level by using an object as a lookup. 

6. Refactor the `colors` array in **App.js** to be an object with keys of `Easy`, `'Moderate` and `Difficult` which hold arrays of 4, 5, or 6 color strings respectively.

	**Hint: The first couple of lines will look like this**
	
	```javascript
	const colors = {
	  Easy: ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD'],
	  ...
	```

<br>

1. Changing the structure of `colors` expectedly broke the code because we were used to passing `colors` as an array to `<GamePage>`. Refactor the value that is assigned to the `colors` prop in `<GamePage>` such that the appropriate array in the refactored `colors` object is passed according to the value of the `gameState.difficulty` property. With this step complete, the react-mastermind will be working again.

2. Now comes the "fun" part - building out the `<SettingsPage>` component so that:

	- It displays the UI shown above, including the three difficulty levels, with a button to select the level and the colors rendered as pegs. Also, theres a "Cancel" link used to return to the root without changing the difficulty.

	- The button to select the difficulty level is disabled for the currently selected difficulty.

	- `<SettingsPage>` needs the `colors` refactored colors object, the `gameState.difficulty` property & a new helper function you need to define in `App.js` for re-initializing `gameState` with the new level.
	
	- Clicking one of difficulty buttons should initialize a new game to the chosen level using the passed in function mentioned above, and programmatically route back to the `<GamePage>` page (root route).

	- You'll want to create a helper function inside `settingsPage.js` to perform the steps listed above.
	
	- To accomplish programatic routing, you can use the technique shown in the [**further reading section**](/react-fundamentals/week-14/day-1/lecture-materials/intro-to-react-router/#routing-programmatically) of _React Router_ lesson to programmatically route to `/`.

   - As always, use React Developer Tools to browse components and check/modify state & props.

Choosing the **Difficulty** level will result in the root route displaying this:

<img src="https://i.imgur.com/IaKWyLR.png">

Good luck cracking the code!

<br>
<br>
<br>




#### Pssssst ... here's one possible solution to this lab (Please, only use if necessary) 

<a href="/downloads/react_fundamentals/react-router-lab-solution/react-mastermind.zip" download>Solution Code<a>