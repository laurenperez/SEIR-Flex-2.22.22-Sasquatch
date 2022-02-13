---
track: "Second Language"
title: "Carmen San Diego Lab"
week: 18
day: 2
type: "lecture"
---

# Carmen San Diego Lab 


<img src="https://i.imgur.com/OGKTx2f.jpg">


<br>
<br>
<br>


## Introduction

<br>
<br>



#### Use SQL to find Carmen Sandiego

We're going to use what we've learned already about querying a database using SQL commands to to chase down and capture an elusive and world-renowned thief, [Carmen Sandiego](https://en.wikipedia.org/wiki/Carmen_Sandiego)!


<br>
<br>
<br>


## Set Up

1. <a download href="/downloads/second_language/carmen-san-diego-lab/sql-lab.zip">Download</a> the starter files

2. Extract the folder from the `.zip` file and open in VS Code: `$ code .`

3. Open a terminal session and run `ls`.  Ensure that you see the files: `clues.sql` & `world.sql`.

4. Start the `psql` interactive terminal: `$ psql`

5. Create a database named `carmen` and connect to it:

	```sql
	CREATE DATABASE carmen;
	\c carmen
	```

6. Create `city`, `country` & `countrylanguage` tables and seed their data using the _import_ (`\i`) psql command:

	```sql
	\i world.sql
	```

<br>
<br>
<br>



## Exercise

The goal is to figure out what city Carmen Sandiego is heading to so that she can be met by the proper authorities.

You'll be writing SQL queries within `clues.sql` to answer each clue.

Run the queries in psql by typing `\i clues.sql`.


<br>
<br>
<br>


## Hints

- Use the psql `\d` & `\dt tablename` commands to list & display the schema of each of the three tables.

- Google and collaborate to reach the goal of finding out where Carmen's destination is.

- For example, you'll certainly need to know about the [ORDER BY](http://www.postgresqltutorial.com/postgresql-order-by/). clause.

<br>
<br>
<br>



## Additional Resources

- [PostgreSQL official documentation](http://www.postgresql.org/docs/).


<br>
<br>
<br>



## Encore 

If you finish this exercise and want to learn more about SQL, do some of [these exercises here](https://pgexercises.com/).