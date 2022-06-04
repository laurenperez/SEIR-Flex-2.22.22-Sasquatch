---
track: "React-Fundamentals"
title: "Project Three"
type: "Project Prompt"
topics: "Unit Projects"
---

# Project Three: A MERN Stack Application:

<br>

## Overview

**You’ve come a long way, and it's time to show it.** This will be your most advanced project to date.

### **Attendance**
You must check in with your squad lead at the start of each class session. This can be via slack or standups. You will be expected to be working during regular class time hours.

### **Before you start working** 

Before you start working on the planning for your project, be sure to review your idea with an instructional team to ensure that it both:

- **Meets the minimum requirements**
 and
- **Is reasonably scoped**

<br>
<br>

### Planning Stage: Assign Project Roles

Once teams are set, we reccommend groups assign the following roles. Everyone should have at least one of these roles, but smaller groups will have a member with two roles. 
We do not advise one person to be both release manager and product manager, as it is a direct conflict of interest ("let's get those features out--no, we need to make sure the code is clean first!").

- **Release manager** (responsible for handling branches, keeping mastersafe, and resolving merge conflicts if the developers cannot resolve them)
- **Product manager** (responsible for prioritizing tasks so that the user gets the most out of the app -- this will usually be the originator of the project idea)
- **Lead front-end dev** (responsible for breaking ties when the group has disagreements on front-end coding, and for designing a general plan for front-end development, e.g. file structure and state management)
- **Lead back-end dev** (responsible for breaking ties when the group has disagreements on back-end coding, and for designing a general plan for back-end development, e.g. file structure and schema definitions)

These roles may not seem important now, but when disagreements inevitably enter the dialog, it is important for someone to be responsible for specific parts of the application.


## Necessary Deliverables

#### 1) Project Planning

A project consists of more than just code.

This project requires **planning** organized within a **Trello board** with the following **lists**:

- **User stories**: User stories need to be formed properly using this template:<br>`As a <role>, I want <feature> so that <reason>`. <br>The _reason_ is optional if it's patently obvious.

- **Wireframes**: Sketches of each screens's user interface for the major functionality of the application.

- **Entity-Relationship-Diagram (ERD)**:
(Optional): A diagram of the app's models (one per data entity) and the relationships between them.

- **Backlog**: Holds dev tasks that have yet to be moved to the _Current_ list. All dev tasks are originally put into the _Backlog_, including both MVP and wish list items. Pro Tip: Tag your MVP and wishlist items with different colored labels. 

- **Current**: Start with dev tasks that must be completed to meet the minimum project requirements (MVP). Once the MVP has been met, additional dev tasks may be moved from the _Backlog_.

- **Completed**: Holds completed dev tasks. 



<br>
<br>
<br>


#### 2) Project Source Control & README

The project's source code must be hosted on a personal **GitHub repository**.

The repo is to contain **frequent commits** from all group members dated from the beginning of the project through its completion.

The project must include a **`README.md`** file with the following sections:

- **Introduction**: A paragraph used to introduce interested parties to the project and needs to include one or more screenshots.

- **User Stories** - Formatted as above. Include User Stories in at least one README


- **Technologies Used**: A list of all technologies, libraries, APIs, etc. used in the project.

- **Getting Started**: Links to the project's planning (Trello board)  and the **deployed app** on Netlify.

- **Future Enhancements**: Identify future features and enhancements planned for the project.

<br>

#### 3) Application Technical Requirements/Deliverables

**MVP - Minimum Viable Product**
For this project, you will be making another full CRUD app using the technologies outlined below. When thinking of an app idea, try to frame the project in terms of trying to solve a "problem" and think about the purpose of the app, who would use it, etc. The problem doesn't have to be anything intense and can be something small and simple! For example:

- Problem: I have a huge enamel pin collection and want to organize it all in one place

- General App Idea/Purpose: An app that allows me to catalogue all my pins by category

- Who Would Use It: Pin collectors

##### A **working** full-stack, single-page application hosted on Heroku & Netlify.

- Incorporate the technologies of the **MERN-stack**:
	- MongoDB/Mongoose
	- Express
	- React
	- Node

- **Have a well-styled interactive front-end** that communicates with the **Express** backend via AJAX.

- **Client side routing** to show multiple page-level components with React Router

- **Include full CRUD (Create, Read, Update & Delete) data operations/actions**

- **(OPTIONAL)** you can try to implement one or more of the following:
	- Consume a third-party API.
	- Include _admin_ features.
	
	- Authentication, i.e. the ability of a user to log in & log out.
	- Authorization, by restricting functionality to authenticated users. Also, navigation should respond to the login status of the user.

###### Important note about External APIs!
When you are calling External APIs server-side that require a key, you should store those **keys somewhere private**. They are the only proof that you are you and you are allowed to call that API, after all.

For example, it is very important that you not push your API keys to a public Github repo. Keep them in a `.env` file and make sure you add `.env` to your `.gitignore`. Note that since it won't be pushed into the github repo, your group mates won't be able to pull it either. So, make sure everyone writes their own local `.env` file with the key!

This is especially true when working with Amazon Web Services (AWS). Here's an example of a [stolen key horror story](https://wptavern.com/ryan-hellyers-aws-nightmare-leaked-access-keys-result-in-a-6000-bill-overnight).
<br>
<br>
<br>


#### 4) Project Presentation

You will have 7 - 10 minutes to present and demonstrate the following:

1. Introduce your project by paraphrasing its README.

2. Click the link in the README to open the deployed app on Netlify.

3. Demonstrate the application's authentication features (if authentication added).

4. Demonstrate your app's main features.

5. Share and discuss the most challenging code (not line-by-line)

6. Share the experience by answering the following:

	- What was your biggest challenge?
	- What are your key learnings/takeaways?

<br>
<br>
<br>



## Project Assistance

- At this stage of SEIR, being able to find the the answers to your development issues is of paramount importance. 

- Feel free to use all resources available and collaborate with others.

- If you do seek assistance in Slack, explain the issue, include **screenshots**, a **repo link**, and explain what you've done to solve the issue on your own.

<br>
<br>
<br>




## Suggestions to Get Started

- Don’t get too caught up in too many awesome features – simple is better. Favor fewer features that look impressive over numerous clunky/sloppy features.

- Prioritize user stories and code them accordingly.

- When implementing a feature, think through the steps that it takes in plain language first. If necessary, write and/or diagram the steps to help guide your coding.

- Follow the steps we've done in class to implement features, beginning with the user's interaction, identifying the proper route, etc. 

- Read the docs for whatever technologies / frameworks / API’s you use.

<br>
<br>
<br>




## Best Practices

-  **Write DRY code.**

- In a SPA, communication with the backend is via AJAX.  Build **RESTful APIs to CRUD your data entities (resources)** and perform other functionality via AJAX.

- **Be consistent** with your code style.

- **Clearly name variables and functions** - remember, variables are usually named as **nouns** and functions as **verbs**.

- **Comment your code where it makes sense**. Most code is self-documenting, however, comments help explain complicated code.

- If you have any questions regarding these requirements, please feel free to contact your instructional team!
