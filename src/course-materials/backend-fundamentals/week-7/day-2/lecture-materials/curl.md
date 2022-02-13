---
track: "Backend Fundamentals"
title: "cURL"
week: 1
day: 3
type: "lecture"
---

# cURL

<br>
<br>
<br>

## Lesson Objectives

1. Describe what cURL is
1. Describe when we might use cURL
1. Use cURL to test a GET request
1. Use cURL to test a POST request
1. Pass parameters to the server using cURL

<br>
<br>
<br>

## Describe what cURL is

- Is a command line tool that acts like a browser
- You can use it to make requests to a website
- All it does is take the response and write it to the terminal
  - no formatting

<br>
<br>
<br>

## Describe when we might use cURL

- You want to create a route and test that it works
  - with a GET request, you can just type the route into the URL bar in the browser and see if it works
- In order to test routes like POST:
  - you can't just make the request in the browser by entering the path in the URL bar like you would with a GET request
    - doing that always makes a GET request
  - the only way to test a POST request in the browser is via forms
    - you have to write a bunch of code that will lead you up to the point where the POST request is made:
      1. create a /new route
      1. create a new.ejs file with forms
      1. have the forms point to the correct POST route
      1. go to the /new route in the browser
      1. fill out the form
      1. click submit
- With cURL, we can make a POST request directly to the server without needing to go through all the set up

<br>
<br>
<br>

## Use cURL to test a GET request

Within the terminal execute the following:

```shell
curl https://generalassemb.ly
```

<br>
<br>
<br>

## Use cURL to test a POST request

Set up the following route handler in our app:

```javascript
app.post('/products', (req, res) => {
  console.log('Create route accessed!');
  res.send('This route works');
});
```

To make a POST request, we'll need to add some arguments to the terminal command

```shell
curl -X POST localhost:3000/products
```

The `-X POST` argument tells curl to make a POST request to the server

<br>
<br>
<br>

## Pass parameters to the server using cURL

Using the above command, the body of the request will be empty

```javascript
app.post('/products', (req, res) => {
  console.log('Create route accessed!');
  console.log('req.body ', req.body);
  res.send(req.body);
});
```

If we want to send in data we need to do so like this:

```javascript
curl -X POST -d name='bling' localhost:3000/products
```

or

```javascript
curl -X POST -d name='bling' -d price='cash money' localhost:3000/products
```

For each new key/value pair, add a new `-d property='value'` argument

```shell
curl -X POST -d name='kiwi' -d color='green' -d readyToEat='on' localhost:3000/fruits
```

<br>
<br>
<br>

## References

- [The cURL Project](https://curl.se/)
