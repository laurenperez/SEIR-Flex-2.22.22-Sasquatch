---
track: "Backend Fundamentals"
title: "Mongoose Store - Full CRUD Project"
week: 8
day: 2
type: "lab"
---

# Mongoose Store

Make a product inventory manager with full CRUD using Mongoose.

<br>
<br>
<br>

#### Learning Objectives

- Full CRUD app in Express with Mongoose

#### Prerequisites

- JavaScript
- Express / Node
- MongoDB / Mongoose

<br>
<br>
<br>

## Expected Functionality (MVP)

### Index Page

1. Your app should have an index page where
   - all the products are displayed
   - the images link to the product's show page
   - there's a link to add a new product.

<details><summary><strong>Click For Example</strong></summary>
<img src="https://i.imgur.com/CRJd6Hg.png">
</details>

<br>
<br>
<br>

### Show Page

1. Your show page should display a product with:
   - a link back to the index page
   - a link to edit the product (goes to the edit page)
   - a delete button that deletes the product
   - the number of items remaining in stock
2. Your show page should also have a BUY button. The BUY button will reduce the number of items in stock by 1 each time it's pressed. This is a challenge designed to bend the brain a little! Come back to it at the end if it's taking too long to figure out. An attempt at this is required. Comment out your code if you can't get it working perfectly.

<details><summary><strong>Click For Example</strong></summary>
<img src="https://i.imgur.com/sp9DGtd.png">
</details>

<br>
<br>
<br>

3. If the quantity of your item is zero, the show page should say 'OUT OF STOCK' instead of saying how many are remaining. (Hint: conditionals in ejs).

4. On the edit page, make sure you can set the quantity to zero if you want so that you can test if this is working.

5. The BUY button should also **not** be rendered if the quantity of the item is zero.

<details><summary><strong>Click For Example</strong></summary>
<img src="https://i.imgur.com/5FZKyly.png">
</details>

<br>
<br>
<br>

### Edit & New Page

1. These views should render forms and submit to the appropriate routes.

<br>

### Redirects

1. The create route should redirect to the index

1. The delete route should redirect to the index

1. The update route will redirect back to the product's show page

1. Hungry For More? the BUY button will go to a route that redirects back to the product's show page

<br>
<br>
<br>

## Getting Started

1. `mkdir mongoose_store`

1. Inside the `mongoose_store` folder, set up Express with MVC architecture with the appropriate folders for models, views, and controllers.

1. You will need the seven RESTful routes. You can begin with your data-layer and test that everything works with cURL or Postman. Don't worry about what the BUY button does or where it goes just yet. Just set up your regular RESTful stuff.

1. You will need to make a Mongoose Schema in a `products.js` file for your products. The schema should have:

   ```js
     name: String,
     description: String,
     img: String,
     price: Number,
     qty: Number
   ```

1. BONUS: Set up validations for the price and qty (can't be less than zero) and make the name a required field.

1. Create the model from the schema and export it.

1. Make sure you connect to your MongoDB Database (remember to use dotenv)

1. Make sure your controller can access your model:

   `const Product = require('./models/products');`

<br>
<br>
<br>

## The Buy Button

After you have your full CRUD app working, it's time to break/extend RESTful conventions according to your own lights. The app needs a buy button. It's up to you to make your own routes to facilitate it.

As mentioned in the expected functionality, if a product is in stock (the qty is above 0), the show page should have a BUY button. If the product is out of stock, it should not have this button.

When the BUY button is pressed, it will make a request to update the qty of the product (decrease it by 1).

**Things to think about:**

- What route should the BUY request go to? Maybe it could go to its own route
- Since it updates the product, should it go to a PUT route?
- Do you need to send any data through to the route? You will need the id, but that is likely all you'll need
- Can you edit the qty value just in the route? `product.qty -= 1`?
- Will you have to `product.save()` if you do this?

<br>
<br>
<br>

## Seed Data

You can use these the seed data below to get some starting data if you so choose, or you can create your own seed data. [Unsplash](https://unsplash.com/) and [Pexels](https://www.pexels.com/) are two great places to source free to use images for your projects.

_HANDY HINT:_ Make a route in your products controller `/products/seed` (you can do that by pasting the code below into your controller), and to seed your database, just visit the route once in your browser.

```js
;[
  {
    name: "Beans",
    description:
      "A small pile of beans. Buy more beans for a big pile of beans.",
    img: "https://imgur.com/LEHS8h3.png",
    price: 5,
    qty: 99,
  },
  {
    name: "Bones",
    description: "It's just a bag of bones.",
    img: "https://imgur.com/dalOqwk.png",
    price: 25,
    qty: 0,
  },
  {
    name: "Bins",
    description: "A stack of colorful bins for your beans and bones.",
    img: "https://imgur.com/ptWDPO1.png",
    price: 7000,
    qty: 1,
  },
]
```

<br>
<br>
<br>

## Commits

The order in which you tackle this homework is up to you, but keep in mind that because this is a "two-night" homework, you haven't learned everything yet! Start with what you know and whenever you get to any of the following milestones, commit your work!

<details><summary><strong>Click to See Example Milestones to Commit w/Messages</strong></summary>

<br>
<br>
<br>

**Index - Commit your work** <br>
The commit message should read: <br>
"Index working"

<br>
<br>
<br>

**Show - Commit your work** <br>
The commit message should read: <br>
"Show working"

<br>
<br>
<br>

**Create route - Commit your work** <br>
The commit message should read: <br>
"Create working"

<br>
<br>
<br>

**Update - Commit your work** <br>
The commit message should read: <br>
"Update working".

<br>
<br>
<br>

**Delete - Commit your work** <br>
The commit message should read: <br>
"Delete Working".

<br>
<br>
<br>

**Express Router - Commit your work** <br>
The commit message should read: <br>
"Express Router Working".

<br>
<br>
<br>

**Buy - Commit your work** <br>
The commit message should read: <br>
"Buy Button Working"

<br>
<br>
<br>

**CSS - Commit your work** <br>
The commit message should read: <br>
"App has style"

<hr>

</details>

<br>
<br>
<br>

## Style Inspiration

See some previous student's examples for some inspiration for your store. Great homework can make great portfolio pieces too! Feel free to create this app on github.com and deploy it for use in your porfolio!

<details><summary><strong>Click to See Example 1</strong></summary>
<img src="https://user-images.githubusercontent.com/17508245/28861521-1d513946-7716-11e7-8bed-fe1194f73a2d.png">
</details>

<details><summary><strong>Click to See Example 2</strong></summary>
<img src="https://user-images.githubusercontent.com/29133264/28857343-c3c537e6-76fd-11e7-8104-5ea76de35113.png">
</details>

<br>
<br>
<br>

## Hungry for More?

<br>

### 2nd Model

1. Make another model, this time for a User. The User will have:
   ```js
   username: String,
   shopping_cart: Array
   ```
1. On the product show page, when a user presses BUY, the product will be added to the User's shopping cart.

1. View the shopping cart on the User's show page. (The User will need only a show page and none of the other routes).

<br>
<br>
<br>

### Sort Items Alphabetically or By Price

Use either jQuery or MongoDB to sort your items and display them alphabetically/by price.

<br>
<br>
<br>

## Deliverables

A store app that meets all the expected functionality outlined at the beginning of this markdown.

<br>
<br>
<br>

## Technical Requirements

1. Your app MUST run without syntax errors. If there are errors you can't solve, comment them out and leave a comment above explaining what is wrong

<br>
<br>
<br>

## Submission Guidelines

This assignment spans over two class days.

You will be required to submit this particular assignment each night to show your progress, get feedback on any issues you may be running into, etc.

**On the first night of this homework, you should work on having:**

- The app setup, the database connected, the index and show page and new/create page done, and a seed route with seed data

**On the second night of this homework, you should continue working on it so that the app:**

- Will have delete, update, buy button, router and some css added.
