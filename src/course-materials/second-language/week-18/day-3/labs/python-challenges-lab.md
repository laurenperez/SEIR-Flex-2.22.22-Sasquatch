---
track: "Second Language"
title: "Python Challenges Lab"
week: 18
day: 3
type: "lab"
---

# Python Challenges Lab

<br>
<br>
<br>

## Getting Started

- Create a file locally on your machine called `python_challenges.py` to complete the following exercises <br>_(you can place this file in a working folder if you choose)_
- **NOTE:** While you're solving each challenge, you can run `python3 python_challenges.py` to check your work

<br>
<br>
<br>

### Challenge 1 - Calculator

Create a simple calculator that first asks the user what operation they would like
to use (addition, subtraction, multiplication, division) and then asks the user
for two numbers, returning the result of the operation with the two numbers.

Here is a sample prompt:

```bash
What calculation would you like to do? (add, sub, mult, div)
add
What is number 1?
3
What is number 2?
6
Your result is 9
```

<br>
<br>
<br>

### Challenge 2 - Reverse a string

Reverse a string manually. Create a new variable storing an empty string and add the letters from
the first string one by one. The for loop should iterate over the length
of the string and you should access letters individually.

Below is some sample output.

```bash
Enter a string:
reverse_me
em_esrever
```

<br>
<br>
<br>

### Challenge 3 - Bank Transactions

Create a prompt that asks the user if they would like to display their balance,
withdraw or deposit.

Write three functions to perform these calculations and
output the result to the user.

**We haven't taught a dedicated lesson on functions yet, but here's a simple function example in `python`**

![python functions](https://i.imgur.com/pixhxbF.png)

As you can see:

- The first line starts with the def keyword. This defines a function.
- The next word is the name (identifier) of the function.
- Following that is a parameter list inside parentheses.
- The first line ends with a colon.
- The first line is followed by an indented code block that we have become familiar with.
- Python functions, like JS, optionally return a value using a return statement.

<br>
<br>

**... now on to the exercise**

Gather user input using the built in `input` function. Note that input always returns
user input as a string. You have to manually convert it to an int or a float
to make it behave like number. Also, end the input prompt with a \n newline
character if you want the user to type in on the next line.

```python
age = input("How old are you?\n")
age = int(age)
```

Here is a sample output:

```bash
Your current balance is
4000
What would you like to do? (deposit, withdraw, check_balance)
deposit
How much would you like to deposit?
1000
Your current balance is 5000
Are you done?
yes
Thank you!
```

<br>
<br>
<br>

### Challenge 4 - Sort a String

Write a function that takes a string and returns the string with the letters in
alphabetical order (ie. `hello` becomes `ehllo`), Assume numbers and punctuation
symbols will not be included in the string.

**HINT:** You will also need to prompt the user for input

```bash
Give me a string to alphabetize
supercalifragilisticexpialidocious
Alphabetized: aaacccdeefgiiiiiiillloopprrssstuux
```

<br>
<br>
<br>

### Challenge 5 - Print Contacts

Write a method called `print_contacts` that takes a dictionary of key-value pairs for names and phone numbers then outputs the `name` with the contact info.

We have a dedicated lesson on `python` dictionaries soon, but just know that are very similar to JavaScript object literals ... _i.e collections of key value pairs_

Here's an example:

```python

# You can use this dictionary for this exercise
contacts = {
  'Brian': '333-333-3333',
  'Lenny': '444-444-4444',
  'Daniel': '777-777-7777'
}

```

Try iterating over a dictionary with a for loop and printing out what values come back.

Example function call:

```python
 print_contacts(contacts)
```

<br>
<br>

Example Output:

```bash
Brian has a phone number of 333-333-3333
Lenny has a phone number of 444-444-4444
Daniel has a phone number of 777-777-7777
```

<br>
<br>
<br>

### Challenge 6 - Muliply by

Write a method called `multiply_by` that takes a list and a number, and returns the list of numbers multiplied by that number.

You'll want to apply your fundamental programming knowledge here. What are the pieces to this problem? You'll need to define a function, a return statement, and a for loop to iterate over the array.

Example function call:

```python
 multiply_by([1, 2, 3], 5)

```

<br>
<br>
Example Output:

```bash
[5, 10, 15]
```
