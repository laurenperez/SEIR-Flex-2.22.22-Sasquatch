---
track: "Backend Fundamentals"
title: "HTML / CSS Forms"
week: 8
day: 2
type: "lecture"
---

# HTML/CSS Forms

<br>
<br>

When making CRUD apps, you'll be using plenty of forms but they can be a bit tricky to style. So let's get some practice and see what kind of styling you can do with them by coding along with me.

<br>
<br>
<br>

## ACTIVITY

![screenshot](https://i.imgur.com/voPgdHz.jpg)

Perhaps one of the most common uses for forms out there, today we'll be building out a registration form to look like the mockup above.

<br>
<br>
<br>

### Setup

Starter code has been provided for you with all necessary files linked together.

1. <a href="/downloads/backend_fundamentals/registration-form.zip" download>Download the starter code</a>
1. Open the entire folder in your code editor to follow along
1. Open the `index.html` in your browser.

<br>
<br>
<br>

## Fieldset, Legends, and Labels

The `<fieldset>`, `<legend>` and `<label>` tags are designed for web accessibility and aiding screen readers to properly interpret the form.

- _Fieldsets_ let you group parts of a form together.
- _Legend_ defines what a fieldset is for.
- _Labels_ define what a specific input is looking for.

<br>
<br>
<br>

#### More on Labels

You can either _nest_ your input inside a label or you can _put the label first and then as a sibling put the corresponding input_, if you do it the second way the `<label>` must have a `for` attribute in the label tag and then the `<input>` must have an `id` attribute with a value that matches the value of the label's `for` attribute.

- NESTED EXAMPLE:

  <br>
  <br>

```html
<label>
  Username
  <input type="text" />
</label>
```

- SIBLING EXAMPLE: Note the matching `for="username"` & `id="username"` attributes to 'connect' the label to the input

  <br>
  <br>

```html
<label for="username">USERNAME</label> <input type="text" id="username" />
```

<br>
<br>
<br>

## Let's Style Our Fieldsets, Legends, and Labels!

**In our HTML:** Update all our inputs, textareas, and labels so that they have matching variables

<br>
<br>

```html
<!-- username -->
<label for="username">USERNAME</label>
<input type="text" id="username" />
<!-- password -->
<label for="password">PASSWORD</label>
<input type="text" id="password" />
<!-- email -->
<label for="email">E-MAIL</label>
<input type="text" id="email" />

<!-- further down -->

<!-- biography -->
<label for="biography">BIOGRAPHY</label>
<!-- textarea for larger bodies of text -->
<textarea id="biography"></textarea>
```

<br>
<br>
<br>

**In our CSS:**

<br>
<br>

```css
fieldset {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin: 20px 0;
}
legend {
  padding: 0px 10px;
  font-family: "Oswald";
  font-weight: 500;
  color: var(--purple);
}
label {
  font-family: "Oswald";
  font-weight: 200;
  color: var(--bright-orange);
  display: block;
}
```

<br>
<br>
<br>

## Input Types, Styling Inputs, and Pseudo Classes

There are a lot of different input types (see the resources below), but for today let's just focus on some of the most common ones:

- **text** is just the default input type text box that you've all grown used to so far, it accepts any string.
- **password** makes it so that whatever the user types into the input field is hidden like a password should be!
- **email** makes it so that the form will automatically validate if the user actually entered an email upon submission.
- **submit** makes the input a button and indicates that when the user clicks this button, the form should be submitted.
  - **Note:** The default text inside a submit button is "submit", if you want it to say something different, add an attribute of `value="whatever you want the button to say"`

<br>
<br>
<br>

### Styling Inputs

There are a few ways to style inputs.

- The simplest way is to just select `input`:

<br>
<br>

```css
input {
  /* styles in here */
}
```

- Since there are several types of inputs, we don't always want to style them all the same way using `input`. Instead, you can _select_ specific attributes using the following notation: `input[attribute="value"]`

<br>
<br>

```css
input[type="submit"] {
  /* styles in here */
}
```

<br>
<br>
<br>

### Pseudo Classes

Pseudo classes are keywords tacked onto an element that specifies a special state of the element. They are not exclusive to forms (they can be used on almost any HTML element you want!), but they're very useful when trying to style forms. Let's take a look at two of the more common ones.

- _:hover_ adds style onto whatever element you tack it onto when the user hovers over it

<br>
<br>

```css
input[type="submit"]:hover {
  /* styles entered here will be applied to the submit button only when the user hovers over it */
}
```

<br>

- _:focus_ adds style onto whatever element you tack it onto whenever the user "focuses" on the element (typically when the user clicks on the element or selects it using tab)

<br>
<br>

```css
input[type="text"]:focus {
  /* styles entered here will be applied to the text input form only when the user is focused on it */
}
```

<br>
<br>
<br>

## Let's Style Our Input Boxes!

**In our HTML:** Update the input type of our password and email fields

```html
<input type="password" id="password" />

<input type="email" id="email" />
```

**In our CSS:**

<br>
<br>

```css
input {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid var(--light-green);
  border-radius: 5px;
}
input:focus {
  /* the outline property selects the default blue border that shows up on inputs. giving it a value of 0 gets rid of it */
  outline: 0;
  border: 1px solid var(--purple);
}
```

<br>
<br>
<br>

**Note:** Want to keep the outline blur effect? You can just change the color of the outline instead of getting rid of it by using the `outline-color` property! See more on outline [here](https://css-tricks.com/almanac/properties/o/outline/)

<br>
<br>
<br>

## Let's Style Our Submit Button!

**In our HTML:** Update the submit button so that it has a value of REGISTER

<br>
<br>

```html
<input type="submit" value="REGISTER" />
```

<br>
<br>
<br>

**In our CSS:**

<br>
<br>

```css
input[type="submit"] {
  width: 100%;
  height: 50px;
  background: var(--bright-orange);
  box-shadow: 2px 2px var(--light-green);
  font-family: "Oswald";
  font-size: 1.3em;
  color: whitesmoke;
  border: 0px;
  transition: 0.2s ease-in-out;
}
input[type="submit"]:hover {
  cursor: pointer;
  background: var(--bright-green);
  box-shadow: 2px 2px var(--light-orange);
}
```

<br>
<br>
<br>

## Textarea

Textarea is essentially just another type of input box, but is not an actual input element. Rather, it's its own element `<textarea>` and requires a closing tag `</textarea>` that inputs do not. Textareas are meant for larger bodies of text that shouldn't go in regular text inputs, for example: profile information, a review, etc.

<br>
<br>
<br>
<br>

### Styling Textareas

- Textareas are relatively difficult to style because, typically, they can be resized by the user which may mess with the styling of your page. One way to mitigate that is by using the `resize` property
  - `resize: none` makes it so that the user cannot resize the textarea at all
  - `resize: vertical` makes it so that the user can only resize it vertically
  - `resize: horizontal` makes it so that the user can only resize it horizontally
  - If you don't set any of these, textareas are defaulted to resize both vertically and horizontally
- Alternatively, you can set a `max-height` or `max-width` so that the user cannot resize beyond a certain width
  - Note, you may have to set a default height and width to get it to the size you originally want the textarea to be at when they first load the page
- Examples:

<br>
<br>

```css
/* using resize none to make sure the textarea always stays a specific width/height */
textarea {
  width: 200px;
  height: 100px;
  resize: none;
}

/* using max-heights and max-widths to make it so that the user can only resize up to that point */
textarea {
  width: 200px;
  height: 100px;
  max-width: 400px;
  max-height: 150px;
}
```

<br>
<br>
<br>

## Let's Style Our Textarea!

**In our CSS**: We want our textarea to look identical to our `input` elements from earlier, so let's just tack on `textarea` to those styles instead of repeating ourselves! Then, specific to just our textarea, we don't want it to resize and we want a specific height:

 <br>
 <br>
 <br>

```css
textarea {
  resize: none;
  height: 75px;
}
```

<br>
<br>
<br>

## Value vs Placeholder

`value` and `placeholder` are both attributes that you can add on to `input` and, to an extent, `textarea` elements. They're similar in that they place text into the forms, but different in how they do so. Let's see how:

- _value_ pre-fills out an input form with text that the user can actually manipulate or keep as is.
- _placeholder_ is grayed out on the input form with text that typically should guide the user as to what type of info they should put inside of the input form. The user _cannot_ manipulate this text, in fact once they start typing into the input form, the placeholder should disappear completely.

<br>
<br>
<br>

### Textarea "values"

- `<textarea>` elements, unlike inputs, do _not_ recognize the `value` attribute. If you want to pre-fill a textarea with text for the user to manipulate, you have to put the value between the `<textarea></textarea>` tags
- EXAMPLE:

<br>
<br>

```html
<!-- input with pre-filled value -->
<input type="text" value="hello world!" />

<!-- textarea with pre-filled value -->
<textarea>hello world!</textarea>
```

<br>
<br>
<br>

## Let's Add a Placeholder to our Textarea!

**In our HTML:** Update it so that it has a placeholder with a value of whatever you want it to say.
<br>
<br>

```html
<textarea
  id="biography"
  placeholder="Tell us about yourself and your island here (e.g. Hi, my name is Tom Nook and I am the island's whole economy, yes, yes!)"
></textarea>
```

<br>
<br>
<br>

## Resources

There's an overwhelming amount of form types and attributes that you can use, and we barely scratched the surface today. Text, textarea, password, and submit are the most common that you'll probably use in your apps, but if you'd like to see what else HTML forms have to offer, take a look at the cheatsheet and additional resources below:

<br>
<br>
<br>
<br>

## HTML Forms Cheatsheet

### Input Types

|   input type   |                                                                 What it is for                                                                  |
| :------------: | :---------------------------------------------------------------------------------------------------------------------------------------------: |
|      text      |                                           input for a small amount of text (like a name, or address)                                            |
|     hidden     |   a user doesn't see this, but it is useful for populating with associated data that the user doesn't need to see and sending it via req.body   |
|     email      | input for email, some browsers will check if it is a valid email automatically, a lot of smartphones will add the `.com` button to the keyboard |
|    password    |                       obscures the characters being typed, password matching confirmation is usually done with JavaScript                       |
|      date      |                                                     lets you choose a date from a calendar                                                      |
|     color      |                                                             lets you choose a color                                                             |
|      file      |                                                             lets you choose a file                                                              |
|     range      |                                                    gives a slider that you can use for input                                                    |
|     number     |                                    gives arrows to go up and down, some browsers will validate for a number                                     |
|    textarea    |                               allows for a larger amount of text to be entered, allows resizing fo the text input                               |
|     radio      |                                                      allows user to choose one option only                                                      |
|    checkbox    |                                                     allows user to select multiple options                                                      |
| select/options |                              allows user to choose from a scrolling menu, can have options for one choice or many                               |
|     button     |                                                      button input, but no default behavior                                                      |
|     submit     |                                form submission - default to do form action, if no form action, reloads the page                                 |

<br>
<br>
<br>
<br>

### Attributes for inputs

|  attributes  |                                                                                                       Purpose                                                                                                        |
| :----------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|     name     |                                                                                 the name of the key for req.body for form submission                                                                                 |
|      id      |                                                              used in conjunction with `<label>` attribute `for` - use for screen readers/accessibility                                                               |
|    value     |                                                                                            a default value for the input                                                                                             |
| placeholder  |                                                                   puts text in the input field - but this text does not get 'grabbed' for req.body                                                                   |
| autocomplete | aids in allowing autocompleting typical inputs by a user - i.e. name, address - acts differently in each browser and some browsers have functionality for autocomplete that may override the need for this attribute |
|  autofocus   |                                                                                          focuses on this field on page load                                                                                          |
|   required   |                                                                                 makes the field required on the HTML side of things                                                                                  |
|   pattern    |           allows for regex on the HTML side (lets you check for valid input before sending to server, i.e. minimum number of characters, starts with certain characters, numbers only, letters only etc. )           |
|     step     |                                               when using number or range, allows you to set the default size of a step. Without setting this, the default is usually 1                                               |
|   min, max   |                                                                                   allows min and max numbers for range and numbers                                                                                   |
|   multiple   |                                                                                   allows multiple selections with `select/options`                                                                                   |

<br>
<br>
<br>

### More Resources

- [W3Schools HTML Forms](https://www.w3schools.com/html/html_forms.asp)
- [MDN's entry on HTML Forms](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms)
