
![thecustomer](https://i.imgur.com/hi5YlU7.png)

# Agile Development

Agile development uses four clear [delivery vehicles](https://www.atlassian.com/agile/delivery-vehicles) to bring structure to any agile project:

- epics
- user stories
- versions
- sprints

![delivery](https://i.imgur.com/tbUAaEk.png)

By working with these vehicles, software teams are able to organize their work such that they can respond to customer feedback and change from the original plan of the project without feeling like the walls have crumbled around them. The ability to change and adapt future plans based on current insights is a hallmark of agility.

<hr>

## Scrum

### History of Scrum

[Scrum](https://en.wikipedia.org/wiki/Scrum_(software_development)) was first defined as "a flexible, holistic product development strategy where a development team works as a unit to reach a common goal" as opposed to a "traditional, sequential approach" in 1986 by Hirotaka Takeuchi and Ikujiro Nonaka in the New Product Development Game. Takeuchi and Nonaka later argued in The Knowledge Creating Company that it is a form of "organizational knowledge creation, especially good at bringing about innovation continuously, incrementally and spirally".

They called this the holistic or rugby approach, as the whole process is performed by one cross-functional team across multiple overlapping phases, where the team "tries to go the distance as a unit, passing the ball back and forth". (In rugby football, a scrum refers to a tight-packed formation of players with their heads down who attempt to gain possession of the ball.)

As developers, you will work with your team (developers, product managers, project managers, designers, etc.) to get a product out. With the Scrum method, everyone works on the same team and focuses on what needs to be done to reach the final goal.

### Daily Scrum

Each day during a sprint, the team holds a daily scrum (or stand-up) with specific guidelines:

All members of the development team come prepared. The daily scrum...

  ...starts precisely on time even if some development team members are missing<br>
  ...should happen at the same time and place every day<br>
  ...is limited (timeboxed) to fifteen minutes<br>

Anyone is welcome, though normally only scrum team roles contribute.

During the daily scrum, each team-member answers three questions:

1. What did I do yesterday that helped the development team meet the sprint goal?<br>
2. What will I do today to help the development team meet the sprint goal?<br>
3. Do I see any impediment that prevents me or the development team from meeting the sprint goal?<br>

Any impediment (stumbling block, risk or issue) identified in the daily scrum should be captured by the scrum master and displayed on the team's scrum board, with an agreed person designated to working toward a resolution (outside of the daily scrum). No detailed discussions should happen during the daily scrum.

_Sound familiar?_

### Kanban
Another popular approach to development is [Kanban](https://www.atlassian.com/agile/kanban). Kanban and scrum share some of the same concepts but have very different approaches.  They should not be confused with one another.

![kanban v scrum](https://i.imgur.com/CI1UgLV.png)

The work of all Kanban teams revolves around a Kanban board, a tool used to visualize work and optimize the flow of the work among the team.  A basic kanban board has a three-step workflow:

1. To Do 
2. In Progress
3. Done  

The Kanban methodology relies upon full transparency of work and real-time communication of capacity, therefore the kanban board should be seen as the single source of truth for the team's work.

![kanban board](https://i.imgur.com/4kfEDN2.png)

### The Different Types of Project Management 

<details><summary>Click for a comic from toggl</summary>

  ![project management comic](https://i.imgur.com/IMPvTZd.jpg)
</details>

<br>
<br>

## Tracking in Agile Development

There are few different tools that can be used to plan scrum development.  Real-world projects could have the following lists on their boards organized from left-to-right:

- Ice Box (aka Backlog)
- Current (aka Planned or To-Do or Ready)
- Sprint (aka In Progress)
- Done

### Jira & Trello

For building smaller applications and don't need all the fancy stuff that comes with [Jira](https://www.atlassian.com/software/jira), we recommend [Trello](https://trello.com/) to mimic the flow that most of you will be using during production!  Each column is referred to as a "list" and inside the list sit "cards". Each of these cards is meant to contain information to create one feature of your application.

- Each User Story will be a Trello Card
- Only one person may take ownership of a card 
- Only one card should be claimed at a time.
- Depending how you decide to do this with your team, each card may also represent a branch in Github (this is how it works in Jira).

- The User Story cards can contain:
  - The details for the story in the description section
  - Use the Checklist to track tasks or steps necessary to complete the story. 


![Jira Example](https://i.imgur.com/AZYkGcP.png)

![Trello Example](https://i.imgur.com/L6R0X82.png)

![in Progress](https://i.imgur.com/uVHY2Ml.png)

### Github Issues & Zenhub

You can choose to just use the issues or you can work with it through [Zenhub](https://www.zenhub.com/) which is a more visually appealing site (closer to what you see with Jira and Trello).

![what it looks like on Github](https://i.imgur.com/ZFtuGX5.png)

![zenhub](https://i.imgur.com/2LTpOKA.png)

### Github Projects

Or, Github itself actually has its own version of a Kanban board built into every repo under the Projects Tab! 

![](https://i.imgur.com/fhSr8uU.png)

## User Stories

### What are they?
- Key component of the initial planning for an Agile project
- Defines small chunks of business value which can be implemented in a period of days to weeks
- Captures what a user does or needs
- Commonly formulated by questioning the customer/user
- Often initially written on 3x5 index cards
- _NOT_ a programming To-Do List

### Formatting Guidelines

- As a [role], I can [feature] so that [reason].

When writing user stories, using this pattern will help you focus on what should be happening with your application.  In some instances the suffix is redundant and can be be removed:

> As an administrator, I want to approve photos before they are posted so that I can make sure that they are appropriate.

> As an account owner, I can check my balance online.

> As a player, I want to be able to view a list of high scores for inspiration and to impress my friends if I make the list.

> As a user, I want to be able to collapse the details of a note so that I can more easily focus on the notes I'm interested in.

## Scrum Poker and Estimating Stories

![scrum poker](https://i.imgur.com/oeOQp8L.png)

Planning poker, also called Scrum Poker, is a consensus-based, gamified technique for estimating, mostly used to estimate effort or relative size of development goals in software development. In planning poker, members of the group make estimates by playing numbered cards face-down to the table, instead of speaking them aloud. The cards are revealed, and the estimates are then discussed.

### How to Play

Planning poker is based on a list of features to be delivered, several copies of a deck of cards and optionally, an egg timer that can be used to limit time spent in discussion of each item.

- The feature list, often a list of user stories, describes some software that needs to be developed.

- Count to three and then hold up your cards  (or use the calculator on your smartphone to display your number to show your number estimation).

- In a deck of "planning poker" cards, the cards in the deck have numbers on them. A typical deck has cards showing the [Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_number) including a zero: 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89.  Consider the number to represent the hours that it might take to complete the work.

By hiding the figures in this way, the group can avoid the cognitive bias of anchoring, where the first number spoken aloud sets a precedent for subsequent estimates.  Doing planning poker will help you figure out how long your overall plan will take, sets time aside to discuss any unforseen problems before coding begins, and also might help you figure out who to assign to which task.

<hr>

<!-- ## Activity

You're creating a dating app with a small group!  How do you get started?!

1. Decide with your partners whether to create Github Issues (with or without Waffle.io or Zenhub) **OR** create a Trello account.  Everyone should have access to the planning board on their own machine (not just via screen share).  

    - **Github:** If you want to use Github issues, _one_ person should create a repo and add your partners as a Collaborators in the Settings with their GitHub @handle.  Everyone should have access to the repo in GitHub on their machine (not just via screen share).  _Make sure to use GitHub, not GitHub Enterprise!  You do not have to clone or fork this repo locally, and the owner can delete it after this morning exercise._

    - **Trello:** When making your Trello account, be sure to take note of your screenname OR update the screenname that they automatically assign to you to something that you will remember (and that is at least semi-professional).

2. Create the lists for "To-Do", "In Progress", "In Review", and "Done" (or the names that most make sense to you from the ones listed above).

3. Come up with at least four user stories for your dating app.  

4. Create cards that split up the user stories/work into pieces that can be individually tackled.  Think about what files each card might be dealing with.  Use checklists or add additional details to the cards with this information.  

5. Discuss which card that you'd like to take and work on for your project. Remember - only take **one card**! It's advisable to select cards that won't have you working inside the same file - this way you won't have merge conflicts. *Add yourself* to the card and move it over to the "In Progress" list.  

6. If you have extra time, give Scrum Poker a try with your cards! -->

## Planning Boards

- [Trello](https://trello.com/) 
- [Jira](https://www.atlassian.com/software/jira)
- [Mastering GitHub Issues](https://guides.github.com/features/issues/)
- [Zenhub](https://www.zenhub.com/)
- [Comparison of Scrum software](https://en.wikipedia.org/wiki/Comparison_of_Scrum_software)

## References
- [Epics, stories, versions, and sprints](https://www.atlassian.com/agile/delivery-vehicles)
- [History of Scrum](https://en.wikipedia.org/wiki/Scrum_(software_development)) 
- [Origin of Daily Stand-Up](https://www.linkedin.com/pulse/20140926150354-136414-the-origin-of-the-daily-stand-up/)
- [Scrum Poker](https://en.wikipedia.org/wiki/Planning_poker)
- [Scrum Poker](https://www.mountaingoatsoftware.com/tools/planning-poker)
- Why is the Fibonacci sequence used in Scrum Poker? There are many [opinions on this](http://stackoverflow.com/questions/9362286/why-is-the-fibonacci-series-used-in-agile-planning-poker).

# Group Git

### Objectives
*After this lesson students will be able to*
- Describe the different steps of the git workflow process
- Explain basic git commands in terms of this model, e.g., commit, add, log
- Safely work on a feature branch and merge it back to the mainr branch
- Be aware of 2 pitfalls when working with git in a Group and how to resolve/avoid them.


### The Git Workflow

![Basic Commands](https://i.imgur.com/blN6xuD.png)

Layer| Description
---- | ----
Working Directory | Local file system (your computer's files like normal)
Staging Area | Changes that have been `add`ed and are ready to commit
History | Changes that have been committed in a series of commits uniquely identified by a `SHA1` hash
Remote | An associated version of the repository on a remote host accessible via networking


The first three layers are ones we've seen before.  The working directory is the normal files on your machine; the staging area are files that will be included in the next commit; history denotes all committed changes.

We've also been working with `remote`s when cloning/pushing from github.


### Git Command Review

Now let's go over some `git` commands used in the workflow.  Each command will typically either be used to inspect the changes at a particular layer(s) or it will transition a set of changes from one layer to another.

Command | Function | Data Layer(s)
----- | ----- | -----
add | move changes | WD -> Staging
commit | move changes | Staging -> History
status | inspect changes | WD/Staging/History (via what commit is the last one)
branch | inspect | WD/History (via what branch is current)
log | inspect | History
push | move changes/sync | Local History -> Remote History
pull | move changes/sync | Remote History -> Local History/WD/Current Branch
checkout | move index | WD (moves WD reference to a different HEAD of History)
merge | move changes | applies new changes from one branch to the HEAD of the current branch




Let's look at an example and outline the steps up to committing and pushing to origin:

### Feature Branching + Merging

Conceptually what branching looks like:
![Git Branch
Diagram](https://wac-cdn.atlassian.com/dam/jcr:389059a7-214c-46a3-bc52-7781b4730301/hero.svg)


This is what is happening under the hood:
![Detailed Branch Diagram](https://i.imgur.com/gpqWlIs.png)

### Main branch - Code Along

Create a new folder called `git-demo` that will not be nested inside an existing git repo

```sh
mkdir git-demo
```

 Initialize this as a new git repo

```sh
git init

Initialized empty Git repository in /Users/username/Desktop/seir-526/unit3/lectures-dev/git-lecture-test2/.git/
```


Create a new file called `hello.js`

```sh
touch feature-hello.js
```
Add a function called: `hello`

```js
function hello() { }
```

Git `add and commit` changes.  

```sh
git add .
git commit -m 'feature-hello - added hello function'
```

Look at the log files: 
```sh
git log

commit 6f25491daadbd6ecabe0bd9499016be4133abd3b (HEAD -> main)
Author: Joe Keohan <jkeohan@gmail.com>
Date:   Wed Jul 15 08:10:31 2020 -0400

  feature-hello - added hello function
```

Try using the `git log --oneline` flag

```sh
git log --oneline

6f25491 (HEAD -> main) added hello function
```


Create a new online git repo called `git-demo`
Add a new remote called `origin` to your local repo and use the url from the git repo 

```sh
git remote add origin git/github remote repo url
```

Push to the origin branch to the remote repo

```sh
git push origin main
```

### Feature Branch - Code Along

As a project grows, it can help substantially to break out sets of changes into their own branches which are subsequently merged back into the `main` branch.  As you know, these branches can also be pushed to github.  

![](https://i.imgur.com/o002Fk0.png)

Let's check out a new feature branch 

```sh
 git checkout -b feature-bye

 Switched to a new branch 'feature-bye'
 ```

Confirm the branch exists and is the active branch: git branch

```sh
* feature-bye
  main
```

Create a new file called: `bye.js`

```sh
touch bye.js
```

Add a function called: `bye`

```js
function bye() { }
```

Git `add and commit` changes.  

```sh
git add .
git commit -m 'feature-bye - added bye function'
```


Git log and confirm that both commits are there

```sh
❯ git log
commit 065aecf896862a0f8446a6da34106f82cf3018b6 (HEAD -> feature-bye)
Author: Joe Keohan <jkeohan@gmail.com>
Date:   Wed Jul 15 08:17:21 2020 -0400

    feature-bye - added bye function

commit 6f25491daadbd6ecabe0bd9499016be4133abd3b (main)
Author: Joe Keohan <jkeohan@gmail.com>
Date:   Wed Jul 15 08:10:31 2020 -0400

    feature-hello - added hello function
```

Try using the `git log --oneline` flag

```sh
git log --online 

065aecf (HEAD -> feature-bye) feature-bye - added bye function
6f25491 (main) feature-hello - added hello function
```

Chekcout the main branch and confirm that bye.js file doesn't exist

```sh
 git checkout main
 ```

Git log and confirm that the commit message from the feature-bye branch doesn't exist

```sh
git log

commit 6f25491daadbd6ecabe0bd9499016be4133abd3b (HEAD -> main)
Author: Joe Keohan <jkeohan@gmail.com>
Date:   Wed Jul 15 08:10:31 2020 -0400

    feature-hello - added hello function
```

Merge the feature-bye branch into main

```sh
git merge feature-bye
```

```sh
Updating 6f25491..065aecf
Fast-forward
 bye.js | 3 +++
 1 file changed, 3 insertions(+)
 create mode 100644 bye.js
```

Git log and confirm that the feature-bye branch is now included in the logs
```sh
commit 065aecf896862a0f8446a6da34106f82cf3018b6 (HEAD -> main, feature-bye)
Author: Joe Keohan <jkeohan@gmail.com>
Date:   Wed Jul 15 08:17:21 2020 -0400

    feature-bye - added bye function

commit 6f25491daadbd6ecabe0bd9499016be4133abd3b
Author: Joe Keohan <jkeohan@gmail.com>
Date:   Wed Jul 15 08:10:31 2020 -0400

    feature-hello - added hello function
```

Push the feature-bye branch to the remote repo

```sh
git push origin feature-bye

remote: 
remote: Create a pull request for 'bye' on GitHub by visiting:
remote:      https://github.com/jkeohan/git-testing/pull/new/bye
remote: 
To https://github.com/jkeohan/git-testing.git
 * [new branch]      bye -> bye
```

Since the feature branch has already been merged with maater we should delete the local branch

```sh
git braanch -d feature-bye
```

Let's assume that the team has also downloaded and merged the feature branch we pushed to the remote repo and now delete the remote branch as well. 

```sh
git push origin --delete feature-bye
```

That completes the successful workflow of creating a feature branch and merging to main


### Conflict Resolution

Feature branches are great but can lead to difficulties
when overlapping or incompatible sets of changes are merged back in to a common branch, e.g., `main`.  `Git` is pretty good about safely handling multiple streams of changes, but sometimes you have to manually pitch in to get the job done.

If you are trying to use `git merge` and it produces a conflict the output will look something like this:

```bash
Auto-merging convo.js
CONFLICT (content): Merge conflict in convo.js
Resolved 'convo.js' using previous resolution.
Automatic merge failed; fix conflicts and then commit the result.
```

> To see the beginning of the merge conflict in your file, search the file for the conflict marker <<<<<<<. When you open the file in your text editor, you'll see the changes from the HEAD or base branch after the line <<<<<<< HEAD. Next, you'll see =======, which divides your changes from the changes in the other branch, followed by >>>>>>> BRANCH-NAME.
[source](https://help.github.com/articles/resolving-a-merge-conflict-using-the-command-line/)

Create a new file called: `stringly.js`

```sh
touch stringly.js
```

Checkout a new branch called `feature-upperCase`
```sh
git checkout -b feaature-upperCase
```


Add a function called `toUpperCase`

```js
function toUpperCase() {}
```

Add and commit the changes

```sh
git add .
git commit -m  'feature-upperCase - added toUpperCase function'
```

```sh
git checkout main
```

Merge feature-upperCase to main

```sh
git merge feature-upperCase
```

Checkout a new branch called `feature-lowerrCase`

```sh
git checkout -b feature-lowerrCase
```

Add a function called `toUpperCase`

```js
function toLowerCase() {}
```

Add and commit the changes

```sh
git add .
git commit -m  'feature-lowerCase - added toLowerCase function'
```


Checkout main

```sh
git checkout main
```


Merge feature-lowerCase with main

```sh
git merge feature-lowerCase
```

You should see a message indicating there has been a conflict and when you examine stringly.js you will see the following:


  ```js
  <<<<<<< HEAD
  function toUpper(str) {
    return str.toUpperCase();
  =======
  function toLower(str) {
    return str.toLowerCase();
  >>>>>>> lower
  }
  ```

Resolve conflict by either removing the utility lines (a rarely available solution but it works in this case), or remove one set of changes.  Either way, whatever the state of the file when we save+quit, that will be what ends up being committed so make sure it's valid!

<!-- ### Exercise: Local Conflict Resolution
Go [here](local_lab.md) and follow the instructions -->


## Pull Request And Merging In Github

The instructor will ask the students to fork/clone this repo, if they haven't already done so, and to create a new file caalled: `<student-name>.md` where they will include a random fact about themselves. 

They will add/commit and push to their forked copy of the repo and the instructor will choose a volunteer to share their screen and make a Pull Request.

The instructor will then walk through the process of approving and merging the pull request. 


[Creating a PR from a branch](https://help.github.com/articles/creating-a-pull-request/)

[Approving/Merging a PR](https://help.github.com/articles/merging-a-pull-request/)

These may prove helpful in the following exercise

<!-- ## Exercise: Group Gitting
It's Go Time: [Git 'r Done](group_lab) -->


## Bonus:  Rebasing branches

If time permits the instructor willl demo how to rebase branches.


![](https://i.imgur.com/PRPhtu6.png)

[`git rebase`](https://git-scm.com/docs/git-rebase)

Rebasing rewrites history.  This adds the commits from another branch and puts your commits on top of your branch.  (Actually it puts _new copies_ of your commits on top). Typically, we rebase `main` from another branch.  This does not add an extra merge-commit.

**Ex**: From some branch: `git rebase main` will take anything that was added to main since branched off (or last rebased) and put those commits _before yours_.  Your commits are then added on top of your branch.

Technically, `git pull` is a shorthand for `git fetch origin HEAD` together with `git merge origin/HEAD`.  In other words, `pull` is an alias for fetching the changes from origin and merging them into the local copy of the branch.  adding the `--rebase` flag to `pull` will rebase rather than merge, thereby not adding a merge commit to your history but carrying with it additional pain when conflicts emerge.



## Bonus: Resets (Resources)
`git reset` can be used to undo a committed history and place the changes back either into the staging area `--soft` or in the working directory `--mixed` or discard them entirely `--hard`.  Be very careful with `git reset` especially with the `--hard` option since this is potentially destructive.

If you undo a public history you will have to `git push --force` after making the changes.

[How to Reset (almost) anything](https://github.com/blog/2019-how-to-undo-almost-anything-with-git)

[Reset, Checkout, Revert](https://www.atlassian.com/git/tutorials/resetting-checking-out-and-reverting)



## Extra Resources
- [An Incredible Git Tutorial](http://gitimmersion.com/) probably the second most helpful git thing I've ever come across . . .by our friend `Jim Weirich`

- [a nice set of cheat sheets](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet) from Atlassian

- [A more in depth and practical look at git rebase](https://dev.to/maxwell_dev/the-git-rebase-introduction-i-wish-id-had) Helpful to strengthen your rebase sorcery

- [Linus Torvalds nerding out about git](https://www.youtube.com/watch?v=4XpnKHJAok8) Buckle up

- [Obligatory Junio Hamano interview](https://www.youtube.com/watch?v=qs_xS1Y6nGc)
