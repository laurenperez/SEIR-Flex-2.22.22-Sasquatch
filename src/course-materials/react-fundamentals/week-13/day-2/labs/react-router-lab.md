---
track: "React Fundamentals"
title: "React Router Lab"
week: 13
day: 2
type: "lab"
---

# React Router Lab

<br>
<br>
<br>

Spin up a new react app using `create-react-app`.

Look over the working [Solution](https://vhixt.csb.app/) and examine the app in React Dev Tools to see if you can elicit the structure so that you have a starting point for you app.

This version of the application should use hard-coded stocks data, which you can find in create a data.json file with the data below to use. however if you want to leverage pulling data from an API you can sign up for an API key and use [https://financialmodelingprep.com/](https://financialmodelingprep.com/) data for your data.json file, just copy and paste it into a new data.json file in your src folder and then import the file with `import data from "./data.json"`.

```json
const stocks = [
  {name: "Apple Inc.", symbol: "AAPL", lastPrice: 140.64, change: -0.280000000000001, high: 141.74, low: 140.35, open: 141.5},
  {name: "Microsoft Corporation", symbol: "MSFT", lastPrice: 64.98, change: 0.109999999999999, high: 65.45, low: 64.76, open: 65.12},
  {name: "Alphabet Inc.", symbol: "GOOGL", lastPrice: 835.14, change: -4.50999999999999, high: 844, low: 829.1, open: 842},
  {name: "Facebook, Inc.", symbol: "FB", lastPrice: 140.34, change: 0.810000000000002, high: 141.0244, low: 139.76, open: 140.08},
  {name: "Oracle Corporation", symbol: "ORCL", lastPrice: 44.65, change: -0.300000000000004, high: 45.09, low: 44.575, open: 44.91},
  {name: "Intel Corporation", symbol: "INTL", lastPrice: 36.16, change: -0.370000000000005, high: 36.78, low: 36.125, open: 36.58}
]
```

<br>
<br>
<br>

Here is your routing table. So when your app is complete it should have all the routes below.

| Route           | Renders                     | Component |
| --------------- | --------------------------- | --------- |
| /               | "This is the Homepage page" | Home      |
| /about          | "This is theAabout page"    | About     |
| /stocks/:symbol | A single stock              | Stock     |
| /stocks         | All stocks                  | Dashboard |

<br>
<br>
<br>

**Your stock tracking app should have the following features...**

<br>
<br>

## Navigation

No matter what route the user is visiting, they should always see a navigation bar at the top of the window.

It should contain links to "Home" and "About" pages.

<br>
<br>
<br>

## Dashboard (`/stocks`)

If a user visits `/stocks` or clicks "Home" in the navigation bar, they should be directed to a dashboard page. This page should list all of the stocks that the user is tracking, specifically their `name` and `symbol`. These stocks should be pulled from [`stock-data.js`](./stock-data.js).

**Bonus:** Try rendering the stocks as per the image below.

![https://i.imgur.com/NP4mznx.png](https://i.imgur.com/NP4mznx.png)

<br>
<br>
<br>

## Stock (`/stocks/:symbol`)

If a user clicks on one of the stocks listed in the Dashboard view, they should be directed to an individual stock show view. This view should display all of a stock's attributes.

> The resources listed at the bottom of the [readme](README.md) might come in handy when building this out.

<br>
<br>
<br>

## About (`/about`)

If a user clicks on "About" in the navigation bar, they should be directed to an about page. This is just a static page that displays a description of your app.
