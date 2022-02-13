---
track: "Backend Fundamentals"
title: "EJS Partials"
week: 1
day: 4
type: "lecture"
---

# EJS Partials

![partials](https://i.imgur.com/AgbJAmF.png)

Making our EJS more DRY and more easily maintanable.

**Learning Objectives**

- EJS Partials

**Prerequisites**

- JavaScript
- Node
- Express
- EJS

<br>
<br>
<br>

## Introduction

When building your apps so far during this unit, you may have noticed that if you wanted some pieces of consistent styling or wanted a certain element of your design visible across all your view, it required a lot of copy/pasting.

For example: for every single page, you had to copy/paste the _entire_ HTML boilerplate. Or, if you want a navigation bar on every single page, you'd have to copy/paste the navigation bar html onto every single page.

You get the point, it's tedious and it's not DRY and if you make a change to a copy/pasted block of code on one EJS file, then you'd have to make the same changes in that block of code on _all_ the EJS files you copied it to. So, it's not easily managable, either, once projects start getting large.

However! The EJS developers anticipated this problem, and implemented a nice little feature called partials.

Partials allow you to create reusable elements that can go on multiple pages and will allow you to streamline your EJS page creation and updates. How does that work? Let's find out!

<br>
<br>
<br>

## Getting set up

In order to see how useful partials are and how exactly to use them, what we'll do is refactor code that doesn't use partials. In this case, we'll be going back to a slightly more advanced version of gitPub. Starter code is provided for you

> Note: Because we're just focusing on EJS partials for this exercise, the provided app is _not_ fully functioning with a proper mongo database or working create/delete routes. Hungry for more things to do in all your copious spare time? Try to make this app fully functional!

**Getting the starter code ready**

- Fork and clone [this git repo](https://git.generalassemb.ly/Software-Engineering-Immersive-Remote/ejs-partials)
- run `npm install` inside the directory to install all then necessary packages for this project
- `code .` inside the directory to open it up in vscode
- `nodemon` inside the directory to run the project
- in your browser, go to [http://localhost:3000/pub](http://localhost:3000/pub) - you should see a landing page that looks like the image below

<br>
<br>
<br>

## gitPub

![](https://i.imgur.com/BUel0kH.jpg.png)

If you look through the code / click through the gitPub pages, you'll notice there are several things that are or should be repeated throughout all pages of the app:

- The css / everything inside the HTML `<head>`
- The header
- The footer

Now, consider the scenario where you want to make a change to the header. For example, let's say you want to add another link to the header navigation. Okay fine, all we have to do is add the link to the header on the `index.ejs`.

But, wait, now go to the show page -- uh-oh. The link we just added is no longer there. Okay, fine, we'll just add the link on `show.ejs too`. But if we do that, what do you think will happen on the new page? The link won't be there, so we'd have to change it there too!

Now pretend this is a large app with many different views that has the header on every single view - you'd have to make the change over and over again on every single view.

Now that one simple change that should have only taken a few seconds took a much longer time.

This is where partials come in super handy. They let you create reusable EJS that you only have to edit in _one place_ and it will update across all your pages where the partial is included.

Let's create our first partial to really see how this works.
<br>
<br>
<br>

### Creating the `<head>` partial

**In terminal make sure you're still in the `gitpub` directory and run:**

- `mkdir views/partials`
- `touch views/partials/head.ejs`

Right now, only our `index` view has styling. That's not a good look, so let's cut that code out of the index's `head` and paste it into our `head.ejs` file

```html
<meta charset="utf-8" />
<title>gitPub</title>
<!-- ============= FONTS ============= -->
<link
  href="https://fonts.googleapis.com/css?family=Inconsolata:400,700|Montserrat:300,400,700&display=swap"
  rel="stylesheet"
/>
<!-- ============= STYLES ============= -->
<link rel="stylesheet" href="/css/styles.css" />
```

<br>
<br>
<br>

Now if we save and refresh our index, the CSS is gone! Oh no! But, no worries, we saved all that code in our `head.ejs` partial, and now all we need to do to utilize that partial is `include` it back into the head of our index.ejs using the following syntax:

```ejs
 <%- include('./partials/head.ejs')%>
```

Make sure you've saved all your files and refresh your index -- voila! Our CSS is back! We've successfully included our partial.

Now, all we have to do is `include` the partial on all the other pages as well. Copy/paste the include into:

- `new.ejs`
- `showDrinks.ejs`
- `showFood.ejs`

If you check each view in your browser, they should all now be styled!

<br>
<br>
<br>

### Creating the header partial

Alright, now let's clean up our files a bit so there's less repetition. We saw earlier that every single page has the `<header>`, so that's definitely a good candidate for a partial.

Let's do the same thing we just did:

- Create a `header.ejs` file in our `partials` folder
- Cut out the header code from all the files and paste it into the `header.ejs` file

```html
<header>
  <h1>gitPub.io</h1>
  <ul>
    <li><a href="/pub">master branch</a></li>
    <li><a href="/new">git add -an item</a></li>
  </ul>
</header>
```

- Include the header partial in: `index.ejs`, `new.ejs`, `showDrinks.ejs`, `showFood.ejs`

```ejs
 <%- include('./partials/header.ejs')%>
```

<br>
<br>
<br>

### Creating the footer partial

Our ejs files are looking so much cleaner already! But there's one more repetitive thing we can get rid of, so let's create a partial for the footer!

- Create a `footer.ejs` file in our `partials` folder
- Cut out the footer code from all the files and paste it into the `footer.ejs` file

```html
<footer>
  <span>℗ 2019</span>
  <span>FORKED FRMO STAMFORD.</span>
</footer>
```

- Include the footer partial in: `index.ejs`, `new.ejs`, `showDrinks.ejs`, `showFood.ejs`

```ejs
 <%- include('./partials/footer.ejs')%>
```

Sweet, our code looks so DRY! And -- oh, wait there's a typo in our footer. Let's fix that up.

**In footer.ejs**

- Fix the typo: `FRMO` should be `FROM`

Now check all our pages -- nice, it's fixed for all of them and we only had to change it in that one file.

<br>
<br>
<br>

## Other extra things to note

<br>

### Using variables in partials

Just like any other `.ejs` file, you can use variables inside your partials. You just have to make sure that wherever you use that partial, that variable is actually defined.

For example, let's say we want our tab titles to be variable depending on the page you're on. Our `<title>` is in our `head.ejs` partial, so let's go there!

**In `head.ejs`**

Let's create a variable called `tabTitle` that will determine what the title is. So, let's go ahead and put that in.

```html
<title>gitPub | <%= tabTitle %></title>
```

If you try to view any of the pages now, it throws us an error saying tabTitle is not defined - let's define it!

<br>
<br>

**In `server.js`**

We'll start in the index route first. In our `res.render` object, let's pass it another variable for tabTitle now. For the index, let's just give it a title of Home:

```js
res.render('index.ejs', {
  drinks: drinks,
  tabTitle: 'Master Branch'
}
```

Now if we refresh our index in the browser, it works! Great! But, if we try to go to any other page, it gives us the not defined error again. But we just defined it, didn't we?

We did - but only in the index route! Variables for partials are passed down via their parent.

So, because we defined `tabTitle` in our index route, it passed it to `index.ejs`. Because `index.ejs` includes the `head.ejs` partial, it passed the variable down into the partial as well.

However, consider our show route. We did _not_ define the `tabTitle` variable there, so it wasn't passed down to `show.ejs`, and thus the `head.ejs` partial included _there_ does _not_ have access to the `tabTitle` variable, hence the error.

To fix it then, let's define the `tabTitle` on all our other views!

<br>

**In the show route**

```js
res.render('show.ejs', {
  drink: drinks[req.params.id],
  tabTitle: 'fooBar()'
}
```

<br>
<br>

**In the new route**

```js
res.render('new.ejs', {
  tabTitle: 'add -A'
}
```

If you check all your views now, they should all work and have different titles depending on the page! :tada:
