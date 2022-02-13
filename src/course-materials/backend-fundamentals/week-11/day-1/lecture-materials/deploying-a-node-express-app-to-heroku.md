---
track: "Backend Fundamentals"
title: "Deploying a Node/Express App to Heroku"
week: 11
day: 1
type: "lecture"
---

# Deploying a Node/Express App to Heroku Resource Guide

<br>
<br>
<br>

## Intro

Project 1 was a static application that required no code to run on a server. However, SEIR-Flex's Project 2 and beyond are full-stack web applications that need to run code on a backend server.

[Heroku](https://www.heroku.com) is an extremely popular hosting service capable of hosting a variety of web development stacks including Node/Express, Ruby/Rails, Python/Django, and many more.

Deploying a Node/Express app to Heroku is straightforward. Just follow the steps below...

<br>
<br>
<br>

## 1. Express App Prerequisites

### PORT Number

Hosting services, like Heroku, determine what port a Node application will listen for HTTP requests on.

These services also set a Node environment variable, `process.env.PORT`, that our application needs to listen on during production (not development).

You need to ensure that the app listens on `process.env.PORT` for when it's deployed.

This will require us to refactor one line of code inside of `server.js`

```javascript
// inside of server.js

const port = process.env.PORT || "3000"
```

<br>
<br>

### Node Version

Specifying a Node version in the `package.json` is **not** necessary.

<br>
<br>

### Specifying a Start Script

This is something we don't need to set up, however if you run into problems, here's the [link](https://devcenter.heroku.com/articles/deploying-nodejs#specifying-a-start-script).

<br>
<br>

## 2. Open a Free Account on Heroku

Browse to [Heroku](https://www.heroku.com/) to open a free account.

Providing a credit card is not required. However, if you "verify" your account using a credit card, you get 1000 free dyno hours instead of 550, 100 free apps instead of 5, and the ability to use your own custom domains.

<br>
<br>

## 3. Install the Heroku Command Line Interface (CLI)

<br>

### Installation

The Heroku CLI makes it easy to create and manage apps in your Heroku account.

Click [here](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) to find the links to download and install it for your operating system.

<br>
<br>

### Log In

Once the Heroku CLI is installed, type `heroku login` anywhere in terminal and follow the instructions to log in using your Heroku account's credentials.

<br>
<br>

## Deploy the App!

### Create the App in your Heroku Dashboard

Your [Heroku Dashboard](https://dashboard.heroku.com/apps) lists all of your apps that have been deployed to Heroku.

Before you can deploy a new app, you must first create the app and using the CLI is the easiest approach:

<br>

```shell
$ heroku create <optional preferred name of app>
```

<br>

If you don't specify the `<optional preferred name of app>` argument, Heroku will assign a randomly generated app name automatically.

Keep in mind that there are thousands upon thousands of apps deployed on Heroku, so you may have to get creative when giving your app a name because it has to be unique to Heroku. Using hyphens is one way to help get the app name/URL you want.

For example, this is the command used to create an application known as _SEI Students_:

<br>

```shell
$ heroku create sei-students
```

<br>

The output from the above command was:

```shell
Creating ⬢ sei-students... done
https://sei-students.herokuapp.com/ | https://git.heroku.com/sei-students.git
```

<br>
<br>

Verify the command was successful by verifying that a git remote named `heroku` was created by typing:

```shell
$ git remote -v
```

<br>
<br>

You should see a remote name `heroku` listed, if it wasn't, try `heroku create` again with another name.

### Ensure the Code is Committed to `master`

Deploying to Heroku is as easy as pushing the `master` branch to the remote named `heroku`.

First, make sure your code is committed (on the `master` branch):

```shell
$ git add -A
$ git commit -m "Deploy to Heroku"
```

<br>
<br>

Then push the repo to Heroku:

```shell
$ git push heroku master
```

The above command will kick off the deployment on Heroku which may take a minute or two to complete.

<br>
<br>
<br>

While the app is deploying, you will see messages from the Heroku server prefaced by `remote: `.

A successful deployments will have a

`remote: -----> Build succeeded!`

message and ultimately a

`remote: Verifying deploy... done.`

toward the bottom of the output.

If the deployment fails, there will be error messages that can be used to track down the issue(s).

<br>
<br>
<br>

### Set the App's Environment Variables

Each of the key:value pairs in your app's `.env` file must be set on Heroku using the following command:

```shell
$ heroku config:set KEY=VALUE
```

For example:

```shell
$ heroku config:set DATABASE_URL=mongodb+srv://username:pw@sei-students-1btwt.azure.mongodb.net/students?retryWrites=true
```

Multiple key:value pairs can be space separated, or the command can be run as many times as necessary.

> Note: If using zsh, it may be necessary to quote the KEY=VALUE pair, for example:<br>`heroku config:set "DATABASE_URL=mongodb+srv://username:pw@sei-students-1btwt.azure.mongodb.net/students?retryWrites=true"`

<br>
<br>
<br>

**IMPORTANT**

For deployments using OAuth, be sure to use your Heroku app's hostname, **not** `localhost:3000` when setting the callbacks URL. For example, this was the command used to set the Google OAuth callback for _sei-students_:

```shell
$ heroku config:set GOOGLE_CALLBACK=https://sei-students.herokuapp.com/oauth2callback
```

**Also, there are two additions that must be made** in the [Google Developer Console](https://console.developers.google.com) for the project.

Click the project's `Credentials` menu choice on the left, then click the name of the project to edit it's registration:

<img src="https://i.imgur.com/gkZnGRK.png">

Then click **OAuth consent settings**:

<img src="https://i.imgur.com/vSXoj3U.png">

Scroll down and enter the hostname of your deployed app in the **Authorized domains** input, press [enter], then click the **Save** button:

<img src="https://i.imgur.com/cIooadC.png">

Return to the previous screen and add the **Authorized redirect URI** for the Heroku deployment and click the **Save** button:

<img src="https://i.imgur.com/iQ4vxVb.png">

<br>
<br>
<br>

### Browse to the App

Okay, now the big moment, browse to your deployed app, e.g., https://sei-students.herokuapp.com and test it out!

You can also enter the following command in terminal to open the browser to the app:

```shell
$ heroku open
```

<br>
<br>
<br>

### Congrats on deploying to Heroku!

<br>
<br>

## Troubleshooting

Deployment messages, error messages, as well as the output you typically see in your terminal when running your app during development (including output from your code's `console.log` statements) can be viewed using the following command:

```shell
$ heroku logs
```
