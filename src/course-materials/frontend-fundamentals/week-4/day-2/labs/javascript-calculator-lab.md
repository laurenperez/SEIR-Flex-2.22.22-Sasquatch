---
track: "Frontend Fundamentals"
title: "JavaScript Calculator Lab"
week: 4
day: 2
type: "lab"
---


# JavaScript Calculator Lab


![calculator](https://i.imgur.com/LxaKMCj.png)

Build a calculator in your browser as a group! This Lab is **not a Deliverable**.

<br>
<br>
<br>



## User Stories

User stories are a great way to break down what the different features of the website are, and how to structure it. They are generally written out in this form "A user should be able to...". <br>Here are the user stories for our lab:

1. A user should be able to select numbers so that they can do things with them.
2. A user should be able to add numbers together.
3. A user should be able to subtract numbers.
4. A user should be able to divide numbers.
5. A user should be able to multiply numbers together.
6. A user should be able to see the output.


<br>
<br>
<br>


### Hungry for more?

7. A user should be able to clear all operations and start from 0.


<br>
<br>
<br>



## Setup  

1. Create a folder called `calculator-lab`

- Inside of `calculator-lab` create the following folder/file structure:

```shell
calculator-lab/
  index.html
  css/
   style.css
  js/
   script.js
  README.md
```

**Use your `README.md` to provide a description of your calculator project**


<br>
<br>
<br>



## Design your calculator.

1. Before you type out your HTML, draw out how you want your calculator to look and start thinking about how to structure your html. <br>Don't spend more than 10 minutes thinking through this part, but put something on paper before you code. This is your chance to create a [wireframe](http://www.creativebloq.com/web-design/jargon-wireframes-mockups-prototypes-51514898)!

2. Think about where the input and output needs to be (buttons and display screen).


<br>
<br>
<br>


## Write the html needed for the calculator

1. Now that you have your wireframe drawn, use it to write the html needed for your calculator.

2. Think about using ids and/or classes to help you select your elements.


<br>
<br>
<br>



## Initial CSS

If you want to keep things simple, start by putting a border around all of your divs:

``` css
div {
    border: 1px solid black;
}
```

- Set a height and width on your elements


<br>
<br>
<br>




## JS: Things to think about

1. You can use jQuery or Vanilla JavaScript

1. Think about how you are going to store the state of the calculator. What kind of information do you need to track?

1. When the user clicks a button, how are you going to get which number or operation they clicked? When they click a certain button, what code are you going to have to run?

1. Try not to use a separate event handler for each button. For example, with jQuery, instead of `$(event.currentTarget)` or `$(this)`, you could use just one event handler for the numbers by grabbing the text from the clicked element.


**GOTCHA** `event.currentTarget` is a vanilla JS object. To make it into a jQuery object, you must 'wrap it in money' `$(event.currentTarget)` if you're using jQuery.


<br>
<br>
<br>



## More

1. Add a `clear` button that will clear your screen and start over at zero.

2. Wouldn't it be nice if the user could use their keyboard? How can you set even listners on a `keyup` or `keydown`?

3. Once you have the basics of the calculator working, look back at your code. You want to make it [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).  Start to refactor your code to take out unneeded parts or implement something in a better way.

4. What other operations can you add to the calculator? If you have time, implement them. If you don't have time, but have some ideas, add comments to your code about what you'd like to add. How might you implement them? Is your code friendly to adding in new operations if another developer came in to add something to your code?

5. Can you save the results somewhere? Look into `localStorage`.
