---
track: "React Fundamentals"
title: "Korilla React Receipts"
week: 13
day: 1
type: "lab"
---

# Korilla React Receipts

<br>
<br>

Korilla is a Korean barbecue taco truck that makes thousands of hungry customers
happy every year.

Their CEO is thinking of updating their short order tracking system using React.

Build a prototype of this short order receipts tracker.

<br>
<br>
<br>

## Prerequisites

- Creating/Updating State
- Lifting State
- Working with inputs and/or forms
- Working with controlled and uncontrolled inputs

<br>
<br>
<br>

## Instructions

You will build out this codebase using this [CodeSandbox Starter](https://codesandbox.io/s/korilla-receipts-starter-donod?file=/src/App.js).

<br>
<br>
<br>

## Requirements

Complete parts 1, 2 and 3.

If you have extra time begin working on the bonus sections in the sequence they are provided.

Here is a [working example](https://98mru.csb.app/) of the app (Parts 1,2,3 only).

<br>
<br>
<br>

#### The Component Tree

```shell
- App
  |
  |__ Form
  |
  |__ Receipts
      |
      |__ Receipt

```

<br>
<br>
<br>

## Part 1: Render Receipts

You'll be rendering some receipts. This data should be copied/pasted into a file called receiptData.js and imported into App.js. Then use `useState `create [receipt, setReceipt] and assign receipt to the receiptData array.

```js
const App = () => {
  const [receipt, setReceipt] = useState(receiptsArr)
  //...
}
```

<br>
<br>
<br>

### Receipt Data

Here is a copy of the data needed to render some initial receipts.

<details>
    <summary><strong>Receipt Data</strong></summary>

```js
const receipts = [
  {
    id: 1,
    person: "Karolin",
    order: {
      main: "Burrito",
      protein: "Organic Tofu",
      rice: "Purple Rice",
      sauce: "Green Crack",
      drink: "Korchata",
      cost: 22,
    },
    paid: false,
  },
  {
    id: 2,
    person: "Jerrica",
    order: {
      main: "Rice Bowl",
      protein: "Ginger Soy Chix",
      rice: "Sticky Rice",
      sauce: "Korilla",
      drink: "Korchata",
      cost: 19,
    },
    paid: false,
  },
  {
    id: 3,
    person: "Matt",
    order: {
      main: "Salad Bowl",
      protein: "Organic Tofu",
      rice: "none",
      sauce: "K'lla",
      drink: "Sparkling Blood Orange Soda",
      cost: 20,
    },
    paid: false,
  },
]
```

</details><br>

<br>
<br>
<br>

### Receipts

The receipts should display the following information:

- person
- order
  - main
  - protein
  - rice
  - sauce
  - drink
  - cost
- paid

![korilla receipts rendered Mark](https://i.imgur.com/pTgXZGO.png)

<br>
<br>
<br>

## Part 2: Searching for receipts

Implement a form that allows you to search the receipts based on person name.

Once submitted the app should return only those matching names.

The inputs used to capture user data should all be `controlled` which requires using `onChange` and the use of `state` to update the inputs.

<br>
<br>
<br>

## Part 3: Update the receipts

Right now, all the receipts are not paid.

Add a click event to the paid field that will toggle the values true or false.

<br>
<br>
<br>

## Bonus #1: Add a New Receipt Form

Add a new form that will allow the user to add a new receipt that captures all the date needed to display the receipt. It should also the `paid` property to false by default.

The inputs used to capture user data should all be `controlled` which requires using `onChange` and the use of `state` to update the inputs.

<br>
<br>
<br>

## Bonus #2: Add `Paid` and `Not Paid` buttons

Add two buttons that will allow you to easily toggle between receipts that are paid and not paid.

Only display those receipts based on the users selection of those buttons.

Here are some solutions with this bonus:

- [Justin](https://y9m9l.csb.app/)

<br>
<br>
<br>

## Bonus #3: Add a button that will sort the receipts

Add a button that will sort the receipts by name.

Here are some solutions with this bonus:

- [Justin](https://y9m9l.csb.app/)

<br>
<br>
<br>

## Bonus #4: Add some CSS

Be creative and add some CSS.

Here are previous student examples:

- [Haley](https://i56hg.csb.app/)

<br>
<br>
<br>

## Resources

- [Solution Repo & Video for Korilla Receipts Lab](https://git.generalassemb.ly/HomeworkReviews/kr-review)
- [Solution Repo & Video for iStocks Lab](https://git.generalassemb.ly/HomeworkReviews/istocks)
