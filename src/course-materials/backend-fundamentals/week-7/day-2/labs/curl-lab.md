---
track: "Backend Fundamentals"
title: "cURL Lab"
week: 1
day: 3
type: "lab"
---

# Make an Express Command Line App - "cURLY Burger"

Make an app just for the command line ... no views! ... and get reps with cURL.

<br>
<br>
<br>

## One POST Route, One GET Route

You will make an app just for the command line. There will be no webpage.

You will interact with your routes with `cURL` in Terminal.

Your app will simply read and create dummy data.

Your resource will be `orders`.

Each date object will have an `item` (it could be anything, just to identify the data), and a `created_at`.

The `created_at` will be set by the server using Javascript's `Date.now()`. You will supply the `item` when you create the data.

[From MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now):

> The Date.now() method returns the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.

<br>
<br>
<br>

## Set Up

- `mkdir curly_burger`
- `cd curly_burger`
- `touch server.js`
- `npm init -y`
- `npm i express`
- write your server code
- `nodemon` to run the server.

- Add the following 'data' to your `server.js`

```js
const orders = [
  { item: 'Mad cURLy Fries', created_at: Date.now() },
  { item: 'Swirly Milkshake', created_at: Date.now() },
  { item: 'Burly Burger', created_at: Date.now() },
]
```

<br>
<br>
<br>

Open a new terminal tab using the keyboard shortcut `command + T`

You will be doing curl commands in the new tab.

<br>
<br>
<br>

## Index Route

- Make an index route, a **GET**, for `/orders`. All this route should do is res.send the orders array.

- In your curl tab, make an http request to the `/orders` GET route:

```shell
curl localhost:3000/orders
```

The data should appear.

If you restart the server and do it again, values for `created_at` will have changed (because the data will have been created again).

<br>
<br>
<br>

## Create Route

- Make a create route, a **POST**, for `/orders`.

- This route should first console.log `req.body`

```shell
console.log('req.body is', req.body);
```

- And it should `res.redirect` to the `/orders` index route just so it doesn't hang.

- In your curl tab, make an http request to the `/orders` POST route:

```shell
curl -X POST localhost:3000/orders
```

You should see in your curl tab:

![screenshot](https://i.imgur.com/A9IvtHs.png)

Over in your server tab, you should see the console log of `req.body`:

![screenshot](https://i.imgur.com/t2asxfN.png)

It is undefined because we haven't installed and configured body-parser. body-parser adds the req.body object to our request.

<br>
<br>
<br>

## body-parser Middleware

Use Express's "body-parser" middleware to see the body of the request.

add in the middleware configuration:

```shell
app.use(express.urlencoded({ extended: false }))
```

Test that body-parser works by making another curl request in the curl tab, same as before:

```shell
curl -X POST localhost:3000/orders
```

in the curl tab you should see this as before:

![screenshot](https://i.imgur.com/A9IvtHs.png)

In the server tab you should see the console.log for `req.body`:

![screenshot](https://i.imgur.com/Iwxntof.png)

If you get this, you know that body-parser is working. It has given us the body object. For now, it is empty because we haven't POSTed any data.

<br>
<br>
<br>

## Post Data

Let's post data to our `/orders` POST route. We will send one piece of data: a item.

In the curl tab, we add some data with `-d`. It must go after the POST and before the url:

```shell
curl -X POST -d item="Matrix" localhost:3000/orders
```

Over in the server tab you should see this:

![screenshot](https://i.imgur.com/NLw8Q6o.png)

<br>
<br>
<br>

## Add Data to the 'database'

In the POST route, you will want to push the contents of `req.body` into the orders array

`orders.push(req.body)`

You should also add a console.log to conveniently check the contents of the updated orders array:

`console.log('all the orders data: ', orders);`

In your curl tab, send the request again:

```shell
curl -X POST -d item="Knurly Garlic Knots" localhost:3000/orders
```
<br>
<br>
<br>

In the server tab, you should see the updated orders array (the console.log):

![screenshot](https://i.imgur.com/r9Ozo0Y.png)

<br>
<br>
<br>

## Dates

When we created the `Knurly Garlic Knots` data, we did not add the date. We will get the server to do this for us:

In our POST route we can assign values to req.body before we push it into our orders array.

We can manually add the key `created_at` and give it a value:

```shell
  req.body.created_at = Date.now();
```

Now we can make our curl request again, and the date should appear:

```shell
curl -X POST -d item="Matrix" localhost:3000/orders
```

In the server tab:

![screenshot](https://i.imgur.com/y8jqYNe.png)

<br>
<br>
<br>

## Adding Defaults

We have made it so `created_at` is hardcoded by us. The user will never supply a date.

But what if your user does not supply a item?

We can add a default value for that:

```shell
if (!req.body.item) { req.body.item = 'NO DATA' }
```

If there is no data in `item`, set a default: "NO DATA, You'll get an order of the Surly Soup"

Try it out in your curl tab and send no data:

```shell
curl -X POST localhost:3000/orders
```

In your server the output should look like this:

![screenshot](https://i.imgur.com/0IEKtAX.png)

- req.body is empty because we did not supply data
- the `item` is "NO DATA" because we set a default
- `created_at` has the date because we hardcoded it

<hr>

<br>
<br>
<br>

## Hungry for More?

<br>
<br>

### Formatting the Date

That date isn't very human readable.

Make that date readable!

![screenshot](https://i.imgur.com/0IoPN7X.png)
