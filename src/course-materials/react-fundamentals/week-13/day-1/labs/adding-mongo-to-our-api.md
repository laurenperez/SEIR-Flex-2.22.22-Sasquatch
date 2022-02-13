---
track: "React Fundamentals"
title: 'Adding Mongo to Our "Turtles API" Lab'
week: 13
day: 1
type: "lab"
---

# Adding Mongo to Our "Turtles API" Lab

<br>
<br>
<br>

So you built a turtles API.

The only issue is you are using an array so it resets whenever the server resets.

Try refactoring your API using Mongoose/MongoDB.

<br>
<br>
<br>

#### General Steps to take

**TEST EACH STEP AS YOU GO, USE POSTMAN**

- Install mongoose and dotenv
- Setup your connection in `server.js` or another file
- Setup your Turtle model in `server.js` or another file
- Create a route that is a get request to `/seed` that will pass the turtles array to `Turtle.create` and seed your database
- Refactor the index route to pull the data from mongo not the array
- Refactor the show route to pull the data from mongo not the array based on `:id` not `:index`
- Refactor the create route to create a new turtle in mongo not the array
- Refactor the update route to update an existing turtle in mongo, not the array using `:id` not `:index`
- Refactor the delete route to delete an existing turtle in mongo, not the array using `:id` not `:index`

<br>
<br>
<br>

## Hungry for More

Create a react app and try to at least call the index route and display the turtles.

If you run into an error check out the following resources to fix:

- [This Video is Quick Explanation of your Error](https://www.youtube.com/watch?v=4KHiSt0oLJ0)
- [This Library is the Solution](https://www.npmjs.com/package/cors)
