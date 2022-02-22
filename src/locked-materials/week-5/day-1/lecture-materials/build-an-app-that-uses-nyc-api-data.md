---
track: "Frontend Fundamentals"
title: "Dougie the Donut & Pizza Rat"
week: 5
day: 1
type: "lecture"
---

# Dougie the Donut & Pizza Rat

![pizza rat rolling dougie the donut](https://imgur.com/3vFgM5x.png)

Dougie the Donut and Pizza Rat have become best buds taking New York City by storm. 
<br> Now they've taken it upon themselves to cause trouble around the city! The catch is, they don't want to get caught by the police, so they've put their brains together to come up with a helpful app idea that will allow them to see what kind of trouble they can cause without getting thrown in jail. 
<br> Let's help them build it! 


<br>
<br>
<br>




#### Learning Objectives

- Practice Making AJAX calls to an external API 
- Rendering the returned data using jQuery

#### Prerequisites

- AJAX
- JavaScript
- jQuery
- HTML 

---

## Getting Started

1. Create a directory named `complaints-app`
    
2. Inside that directory, make your `js` and `css` sub-directories and create the appropriate `script.js` and `style.css` files inside of them
   
3. Link them to the jQuery CDN library as well, and make sure all things are connected correctly! 

4. Your directory structure should look like this:

```shell
 complaints-app/
   index.html
   js/
     script.js
   css/
     style.css
```        

## The App 

Overall, Dougie and Pizza Rat want this app to provide a search feature. <br>The data it will search through will be the [311 call data](https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9) provided by the [NYC Open Data API](http://opendata.cityofnewyork.us/), and display all the complaints made to the NYPD, filtered by borough. <br>They also want to see how the police responded to the complaint, since that's what they'll use to determine whether or not they can cause the same trouble without consequences! 

## The Data 

For this particular API, NYC Open Data, the data sent after making an AJAX call is formatted as JSON. 

#### What is JSON? 

JSON stands for JavaScript Object Notation, which simply just means the data is formatted like the JavaScript objects you've learned about! <br>So, for example, one dataset from the API looks like: 

<details><summary>Example JSON Data</summary>
  <strong>When collapsed</strong>
  <img src="https://i.imgur.com/9Xa3jAv.png"> 
  <strong>When opened to see all the key-value pairs</strong>
  <img src="https://i.imgur.com/wksEBdq.png">
</details>
<br>

Whew, that's a lot of data! For the purposes of our app (more specifics below), however, only some of the key-value pairs are of use to us. Particularly...
  * `borough`
  * `descriptor` (which says what kind of complaint was made)
  * `agency: "NYPD"` (because we only want complaints that were handled by the police department)
  * `resolution_description` (which says how the police handled the complaint)
  
#### Working with the API

While making basic AJAX calls to an API will generally follow the same format, an important thing to note about API's are that they're all different. Just because one API allows you to filter and customize the format of the returned data one way, doesn't mean another API will work the exact same. Don't fret, though! Any good API worth using will come with its own set of documentation that will aid you on how you can use it. <br>So now's a good time as ever to get used to reading documentation. 

For this lab in particular, here are some important pages you may need to look through to do this lab: 
  * [The 311 Service Requests API Documentation](https://dev.socrata.com/foundry/data.cityofnewyork.us/fhrw-4uyv)
      * This page in particular shows an example AJAX call using jQuery, however you'll notice instead of a `.then` method to handle the promise, it uses `.done` <br>-- convert it so that it uses `.then`
  * [The 311 Service Requests Data Info Page](https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9)
  * [Info on how to filter the API Data Being Returned](https://dev.socrata.com/docs/filtering.html)
  * [Info on how you can Customize the API Queries More Precisely](https://dev.socrata.com/docs/queries/)
  
Now that you're armed with an API and it's documentation, as well as a general idea of what the app should do -- let's finally get onto the specifics of the app!  

## Minimum Viable Product (MVP)

#### Below is a more detailed list of what functionalities Dougie and Pizza Rat want for their app. 

1. Users should be able to see five buttons for the five boroughs (manhattan, brooklyn, queens, staten island, bronx) of New York City when they load the page 
   
2. Users should also be able to see an input box where they can put in a number of how many complaints they want to see
   
3. When the user clicks on one of the five buttons, a list of complaints should be displayed on the page, according to the number they input AND the borough they clicked on
   * If the user doesn't input any number, make the default be 10
   * Remember, also, they only want complaints that were handled by the NYPD! (hint: consider filtering for a specific "agency" when making the API call)
  
4. When the list of complaints is shown, each complaint should also have a button on it that reads something along the lines of "toggle police response" 
   
5. When the user clicks on on the "toggle police response" button, it should then toggle how the police responded to that particular complaint
   * Make sure it _only_ toggles the response for that one complaint, not the entire list! 

#### Example of a working app

![](https://imgur.com/ssFKX3J.gif)

---

## Hungry for More? 

- Make it so the complaints are listed in alphabetical order

- You'll notice the complaint descriptors fall under umbrella categories (e.g. "No Access", "Banging/Pounding", "Loud Music/Party", etc. etc.) 
    * Display somewhere on the page all the categories and how many times they show up for the current list of complaints
    * e.g. "No Access was complained about 4 times", "Banging/Pounding was complained about 10 times", "Loud Music/Party was complained about 20 times"
  
## Super Hungry for More?

- The data provides latitude and longitude coordinates for where the complaints took place. Consider looking into  geolocation and google maps so that you can display a map with a pin showing exactly where the complaint was made

