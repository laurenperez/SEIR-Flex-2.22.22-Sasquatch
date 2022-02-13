---
track: "React Fundamentals"
title: "'Take-Home' Coding Challenge: Movies App"
week: 14
day: 3
type: "lab"
---

# "Take-Home" Coding Challenge: Movies App


This code challange prompt is modeled after real-world take-home code challenges/prompts many companies use as part of their technical interview process.

This will help you practice/prepare to build a mini-project off of specs, and give you practice/reinforcement using ReactJS with an API back end.


<br>
<br>
<br>
<br>



### Front End:

* ReactJS

<br>
<br>


### Back End:

* Use themoviedb.org's api [here](https://developers.themoviedb.org/3/getting-started/introduction)
* It will be up to you to research it and read the documentation on how to use it.

<br>
<br>
<br>
<br>


### Requirements:

* Implement the following user story: 
	* As a user, I want to see posters and titles of 20 movies that are Now Playing in the United States.


<br>
<br>
<br>
<br>



### Wireframe:

![screenshot](https://i.imgur.com/LJBc5yv.png)


<br>
<br>
<br>
<br>



### Hints:

You'll want to find the **Get Now Playing** endpoint in the API Docs and pass the region `US`.

To get the poster of any movie, prefix the poster_path with this URL: 
`https://image.tmdb.org/t/p/w300`

* So a full URL looks like this: `https://image.tmdb.org/t/p/w300/5RbyHIVydD3Krmec1LlUV7rRjet.jpg`
* You can also get a different size poster by changing `w300` to a different width. For example: `w500` for a 500px wide poster.


<br>
<br>
<br>
<br>



### Stretch Goals:

Implement the following user stories:

* AAU I want to be able to click on a movie poster to see a new page with movie details on it.
	* HINT: Use React Router, and lay it out using your own preferences.
* AAU I want to be able to switch the website theme from light mode to dark mode (and back).
* AAU I want to see only 10 movies that are now playing.