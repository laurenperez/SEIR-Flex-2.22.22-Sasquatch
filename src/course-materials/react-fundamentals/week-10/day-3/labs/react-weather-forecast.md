---
track: "React Fundamentals"
title: "React Weather Forecast"
week: 11
day: 3
type: "lab"
---

## React Weather Forecast

In this exercise, you will practice creating reusable React Components.

Use the following [CodeSandbox Starter](https://codesandbox.io/s/adoring-goodall-mhive) code.

<br>
<br>
<br>

#### React Hierarchy

Here is the React Hierarchy you will be implementing:

<img src="https://i.imgur.com/7YlFsU7.png" width=500/><br>

<br>
<br>
<br>

#### Getting Started

In `src/index.html` you will find five weather elements that generate the output you are seeing now.

Perform the following to complete the lab:

**Creating The Data**

1. Create a new file called `weatherData.js` that contain an array of five objects with the following properties: `img`,`conditions`,`time`.
1. Populate the objects based on the values from those same elements in the HTML
1. Import into `App.js`
1. Console.log the file to confirm that it has been imported

<br>
<br>
<br>

**Creating The `WeatherForecast` Component**

1. Look over the HTML structure used to create the weather icons
1. Create a `WeatherForecast` Component based on the HTML structure
1. Make sure to set the Component up to accept props and update the JSX to work with those props

<br>
<br>
<br>

**Rendering The `WeatherForecast` Component**

1. Import the `WeatherForecast` Component into `App`
1. Loop over the weatherData array data and create a `WeatherForecast` Component for each element passed
1. In the loop pass the element the props it needs for `img`, `conditions` and `time`.
1. App will then render those `WeatherForecast` Components

<br>
<br>
<br>

<!--
**Bonus**

- Try creating the following additional Components:
  - WeatherIcon - contains only the `img`
  - WeatherData - contains both the `conditions` and `time`

<br>
<br>

If successful, your React Hierarchy will now look like the following:

<img src="https://i.imgur.com/ffkXBPi.png" width=600/>
-->
