---
track: "React Fundamentals"
title: "Week 18 - Day 2"
week: 18
day: 2
type: "lecture"
topics: "Prepare For Second Language Unit"
---

# Prepare For Second Language Unit

At this point, we're ready to move on to learning our second programming language and accompanying framework. However, before we get started, we need to ensure we have the proper tools installed on our machines.

<br>
<br>
<br>

## PostgreSQL

<!--

Install the **PostgreSQL** database management system (DBMS) using Homebrew with this command:

```shell
brew install postgresql
```

After Postgres is installed run this command:

```shell
brew services start postgresql
```

Followed by this command to test the install by creating a new database named the same as the current system user:

```shell
createdb
```
-->

We will learn SQL in Unit 4 using the PostgreSQL Engine - for MacOSX users, there's a very simple and safe solution for getting this installed locally.

<br>

Simply head over to [https://postgresapp.com/](https://postgresapp.com/) and follow the installation instructions.

<br>

Also, if you're interested in using a GUI client for PostgreSQL, consider using [Postico](https://eggerapps.at/postico/).

<br>
<br>
<br>

## Installing Python 3

<!--
> Note: Due to time constraints and for simplicity, we will not be using Python "virtual environments" during SEI.  If you are familiar with using virtual environments, you may continue to use them.  If you decide to continue to develop using Python beyond SEI, your next step would be to learn about using virtual environments. -->

Brew is also used to install Python 3. (_Python 2 is already installed on your Mac, the latest versions of MacOSX are also including Python 3 now. However, for safety concerns, we shouldn't actively develop our Python projects with the globally installed Python interpreter_)

**First, you might want to update Homebrew: `brew update`.**

**Install Python3 using Homebrew with this command:** `brew install python`.

1. You can test the installation by running `python3 --version`.

2. You can also further test that you're using the correct (Homebrew) installation of Python by closing your terminal and then typing `which python3`

   - You should see `/usr/local/bin/python3` print as a result

**Python 3's package manager, `pip3` should have automatically been installed with Python 3.**

1. Test that it was installed by running `pip3 --version`.

**Next, let's install `pipenv`, this package enables us to better manages our project's dependencies, very similarly to how we managed dependencies with `node/npm` and `package.json`:**

1. To install, run: `pip3 install pipenv`

<br>
<br>
<br>

## Summary

At this point, these are all the items we need for now, but eventually we'll end up installing Django and some other packages along the way.
