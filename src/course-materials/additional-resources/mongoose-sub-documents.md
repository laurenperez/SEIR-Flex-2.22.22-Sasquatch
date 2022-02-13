---
track: "Backend Fundamentals"
title: "Mongoose Sub-Documents"
week: 2
day: 5
type: "lecture"
---

# Mongoose Sub-Documents

<br>
<br>
<br>

## Lesson Objectives

1. Create a schema for properties of models that are objects

<br>
<br>
<br>

## Create a schema for properties of models that are objects

Properties of models can be objects and arrays (see below)

```javascript
const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  body: String,
  comments: [
    {
      body: String,
      date: Date,
    },
  ], // can have arrays of objects with specific properties
  date: {
    type: Date,
    default: Date.now,
  },
  hidden: Boolean,
  meta: {
    // can have properties that are objects
    votes: Number,
    favs: Number,
  },
})
```

<br>
<br>
<br>

If we want to, we can use schemas instead of explicitly typing (or retyping) the structure of this object:

```javascript
const authorSchema = new Schema({
  name: {
    type: String,
  },
  articles: [articleSchema],
})
```

<br>
<br>
<br>

This can be then be used normally to push articles onto an author's `articles` property

```javascript
//Create constructor functions
const Article = mongoose.model("Article", articleSchema)
const Author = mongoose.model("Author", authorSchema)

//instantiate an author and an article
const matt = new Author({
  name: "Matt",
})

const article1 = new Article({
  title: "Awesome Title",
  author: matt.name,
}) //Note that

//push the article onto matt's articles array
matt.articles.push(article1)

//save both
matt.save()
article1.save()
```

<br>
<br>
<br>

We can also find a sub document by id:

```javascript
console.log(matt.articles.id(article1.id))
```

<br>
<br>

Update it:

```javascript
matt.articles.id(article1.id).title = "altered title"
matt.save() //saving the parent saves the child, BUT NOT THE ORIGINAL SAVED IN THE ARTICLES COLLECTION
```

<br>
<br>

... and delete it

```javascript
matt.articles.id(article1.id).remove()
matt.save() //saving the parent will remove the child from the parent, BUT WILL NOT REMOVE THE ORIGINAL SAVED IN THE ARTICLES COLLECTION
```

We can create sub docs on the fly too, but it won't automatically add it to the parent's array. We need to do that manually

<br>
<br>
<br>

```javascript
const subdoc_article = matt.articles.create({
  title: "Create via Matt article property",
  author: matt.name,
})

matt.articles.push(subdoc_article)

matt.save() //save an article to save the addition to its sub docs
Article.create(subdoc_article) //create the article in the collection
```

<br>
<br>
<br>

**ALWAYS BE AWARE!! UPDATING A SUB DOCUMENT WILL NOT MODIFY THE ORIGINAL IF IT IS SAVED IN ANOTHER COLLECTION. YOU MUST ALSO UPDATE ANY DUPLICATES**
