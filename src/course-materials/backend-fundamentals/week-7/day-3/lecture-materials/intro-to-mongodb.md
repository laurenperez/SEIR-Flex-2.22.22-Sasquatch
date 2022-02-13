---
track: "Backend Fundamentals"
title: "Intro to MongoDB"
week: 1
day: 4
type: "lecture"
---

# Intro to MongoDB

<br>
<br>
<br>

## Learning Objectives

1. Describe what is a Database
1. Describe what is Mongo
1. Understand the difference between a Mongo database, sub-database, collection, and document
1. Get Mongo running
1. List sub-databases
1. choose a sub-database
1. create a collection
1. insert a document
1. insert multiple documents
1. query the collection
1. remove a set of documents
1. update a set of documents
1. drop a Collection or sub-database

<br>
<br>
<br>

## Explain

<br>
<br>
<br>

### What is a Database

A database is an organized collection of data, stored and accessed electronically.

For our CRUD apps so far we've been hard coding some data. We've been able to make temporary changes, but as soon as we shut down our servers, those changes are gone.

We need a way to make our data persist.

We'll do that by storing/accessing our data from a database.

There are many databases. A common type is a SQL(Structured Query Language) database which stores data in tables and rows, much like an excel spreadsheet/google sheet.

Another type of database is a NoSQL(Not Only SQL) database, which follows a different structure. In our case, we'll be using MongoDB which will store our data in objects (just as we've been seeing with our mock databases)

<br>
<br>
<br>

### What is Mongo

MongoDB is a database that holds JavaScript Objects. The database itself is an application that runs quietly on a computer and waits for connections that make requests and then sends responses (much like a web server).

Mongo is designed to be a database that is flexible and easily scalable.

<br>
<br>
<br>

### Mongo Sub-Databases

You can have multiple smaller databases stored and available in Mongo.

Imagine a company like Google, they would have multiple databases: one for mail, one for maps, one for drive documents...

For us, we'll have multiple sub-databases, typically one for each lesson, homework and project.

<br>
<br>

**Here is a way you _COULD_ split up sub-databases for an app**

<br>
<br>

![sub database example](https://i.imgur.com/rHgjaUM.png)

<br>
<br>
<br>

### Demonstration

<br>
<br>

![switch_to_jsx (1)](https://media.git.generalassemb.ly/user/15881/files/4cb02600-92e5-11ea-95c3-4a5765bb3bb9)

<br>
<br>
<br>

### Mongo Collections and Documents

MongoDB is considered a NoSQL (not only SQL, non SQL or non relational), rather than storing things in tables with rows and columns, NoSQL databases use other means. In the case of MongoDB, data is stored in JavaScript objects.

A collection is a set of documents. Documents are a set of data records. This is very abstract. Let's use a simplified real world example of an address book.

Here is one document:

```js
 firstName: "Jennifer",
 lastName: "Juniper",
 address: "Upon the Hill",
 state: "California",
 telephone: "867-5309",
 birthday: "June 8, 1968",
 email: "jenny.juniper@juno.net"
```

A collection, would be many documents: In our case, many contacts.

Remember: having a collection of documents sounds quite reasonable. But having a document of collections is ... kind of odd.

If you're coming from a background where you are used to thinking of data in terms of columns and rows, reading the following could be helpful in transitioning into this new way of modeling data:

[Thinking in Documents Part 1](https://www.mongodb.com/blog/post/thinking-documents-part-1?jmp=docs&_ga=2.202168721.1294830246.1530196908-30583944.1529350623)

[Thinging in Documents Part 2](https://www.mongodb.com/blog/post/thinking-documents-part-2)

<br>
<br>
<br>

### Install Mongo

Although the MongoDB Community Server can be installed locally on our machine, it's going to be much easier to work with the cloud-hosted MongoDB server instead.

<br>
<br>
<br>

### Connect to Mongo

There are a few ways to connect to Mongo. In this course, there will be two main ways:

- Through the [MongoDB Atlas web interface](https://cloud.mongodb.com)
- Through node using an npm module called `mongoose`

<br>
<br>
<br>

## Connect via MongoDB Atlas

Load up and log into [https://cloud.mongodb.com](https://cloud.mongodb.com), then click on `Collections`

<br>
<br>
<br>

## Connect/Create to a Sub-Database

Let's see what sub-databases we have available to us:

![screenshot](https://i.imgur.com/Nd4mANy.png)

Let's create and use a sub-database called `learn`.

<br>
<br>
<br>

## Create a Collection

For today, we'll only be working with one collection, but most apps will have numerous collections.

Let's think about an online store. You might split up the collections like so:

```shell
- users
    - username
    - password
    - address
    - creditCardInfo
    - phoneNumber

- products
    - productName
    - catalogNum
    - imageLink
    - price
    - inStock
```

This helps us organize our data.

Let's create a collection of `contacts` in the `learn` sub-database by clicking the "create collection" button.

<br>
<br>
<br>

## Create, Read, Update and Delete Documents

We've been creating, reading, updating and deleting our 'data' in our Express apps. Now let's learn how to do it using Mongo.

<br>
<br>
<br>

### Insert a document into a Collection (Create)

Click into the `contacts` collection and then click `insert document`.

Add some key value pairs, for Jennifer. We're going to split it up across multiple lines to make it easier to type and see

```js
{
  'name': 'Jennifer',
  'phone': 8675309,
  'state': 'California'
}
```

We can also type our code in vscode and when we know it's right, copy and paste it over into our interface. Go with whatever is easier.

Let's go ahead and copy paste these into our atlas interface to populate our collection with more documents

```js
;[
  {
    name: "Jennifer",
    phone: 8675309,
    state: "California",
  },
  {
    name: "Claire",
    phone: 6060842,
  },
  {
    name: "Morris",
    phone: 7779311,
    state: "Minnesota",
  },
  {
    firstName: "Alicia",
    lastName: "Keys",
    phone: 4894608,
    state: "New York",
  },
  {
    name: "Etta",
    phone: "842-3089",
    state: "California",
  },
]
```

<br>
<br>
<br>

**HEADS UP: The JSON format required by Atlas doesn't support trailing commas or other JS features. And all strings need to be in full `"` marks and not single ticks `'`.**

We may notice that our data wasn't consistent.

- Jennifer has a duplicate record
- Claire, doesn't have a state
- Alicia's key's are different for her name than others, she also has an extra field for her last name, compared to others.
- Etta's phone number is a string with a hyphen instead of a number

Mongo is designed to be this flexible. Later, we'll learn how to validate our data with an npm package called `mongoose`.

<br>
<br>
<br>

### Query Documents from a Collection(READ)

We'll use the `Find` button.

We'll do some simple queries. If we provide an empty `{}`, it will find all the documents.

Let's try it! Type in `{}` into the Filter box, and click `Find`.

Many times, we don't want to find all of the records in our collection.

We might want to just find the names of the people who live in California.

We can give our `find` method some key value pairs to narrow it down.

```js
  { "state": "California" }
```

<br>
<br>
<br>

### Remove Documents from a Collection(DELETE)

Let's remove the Jennifer record. We'll use the trash can (delete button) to get rid of it.

And then let's put Jennifer back again:

```js
{
  "name": "Jennifer",
  "phone": 8675309,
  "state": "California"
}
```

<br>
<br>
<br>

### Update a document (Update)

Let's update Jennifer's record to have the name Jenny instead

Let's find Jenny

```js
{"name": "Jenny"}
```

We can add a field. Claire has no state, let's give her a state

Click the pencil (edit) button on Clair's record (AKA Document).

```js
state: "California"
```

And we should see that Claire now has a state.

<br>
<br>
<br>

### Search for Multiple Values

We can query for multiple values. In our contacts, let's query for people who live in California and are named Etta

```js
  {
    "name": "Etta",
    "state": "California"
  }
```

<br>
<br>
<br>

### Search by Quantitative Data

We can search for equal to, not equal to, greater than, less than or equal to, included in an array etc.

[query operators](https://docs.mongodb.com/manual/reference/operator/query/)

Let's just try one together. Let's query for the people who are NOT in California

```js
{
  state: {
    $ne: "California"
  }
}
```

<br>
<br>

**NOTE: `$ne` is the "not equal" operator in MongoDB.**

<br>
<br>
<br>

### Drop a collection

<br>

If you need to drop an entire sub-database, while you are connected to the database you want to drop, click the trash can next to the collection in the left sidebar.

<br>
<br>
<br>

## References

[MongoDB homepage](https://www.mongodb.org/)

[MongoDB Atlas - MongoDB Cloud Hosting](https://www.mongodb.com/cloud/atlas)

[MongooseJS - ODM](http://mongoosejs.com/)
