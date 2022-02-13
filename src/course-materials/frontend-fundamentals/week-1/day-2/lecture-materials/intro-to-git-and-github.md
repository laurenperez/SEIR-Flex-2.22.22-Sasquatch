---
track: "Frontend Fundamentals"
title: "Intro to Git and Github"
week: 1
day: 2
type: "lecture"
---

# Intro to Git and Github

<br>
<br>
<br>
<br>

## Learning Objectives

| Student will be able to:                          |
| ------------------------------------------------- |
| Describe what a Version Control System is         |
| Describe the difference between Git and GitHub    |
| Distinguish between local and remote repositories |

<br>
<br>
<br>

## What is version control, and why should you care?

A Version Control System (VCS) records changes to files over time so that you can recall specific versions later.

It also makes working in teams easier, because it enables developers to submit changes to be merged into the codebase.

More specifically, a VCS allows you to:

- Revert files back to a previous state
- Review changes made over time
- Collaborate on a set of files with others
- Create separate "branches" of the codebase to develop new features on without impacting the "master", or production, branch.

In this program, we'll be using the world's most popular version control system - **git**.

Git was created by Linus Torvolds in 2005 to help with the development of his main project at the time - developing Linux.

<br>
<br>

## Git vs. GitHub

GitHub is not the same as git. **GitHub** is a social network built around git. It has completely changed the way we, as programmers, share and work on code. GitHub is now the largest online storage space of collaborative works, and it works with git in order to keep track of versions, issues, and requests for changes.

GitHub also plays the important role of a cloud-based backup system - a safe place for all your work! Your code, and the time you spent writing it, is valuable, therefore, you don't want to risk losing it to hardware failure, etc. So we "connect" our local git repo to a "remote" repo on GitHub where we can then "push" code to, and "pull" code from - on demand.

In summary:

- Git provides us with local repositories on our computers
- GitHub provides us with remote repositories stored in the cloud
- A local repository is "linked" to a remote repository by adding a "remote" with this command `$ git remote add <name of remote> <URL of repo on GitHub>`

<br>
<br>
<br>

## Summary of Common Git Commands

By following along today and having done the pre-work, you should now be familiar with basic git commands.

In SEIR, you'll get plenty of practice using git, especially during project week because each of your projects will be stored in its own directory and will be made a git repository in that directory tracking the changes.

For your convenience, <a href="/downloads/frontend_fundamentals/github-git-cheat-sheet.pdf" download>Click Here</a> for a Git Cheatsheet.

<br>
<br>
<br>

However for a quick reference, the following summary of commands will "git" you far:

| Command                     | Purpose                                                                                                                                                                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `git init`                  | Initializes a local repository. Used in lieu of cloning a GitHub repo. All local repos contain a hidden `.git` directory responsible for holding repo-related data.                                                                  |
| `git status`                | Checks and reports on the status of your repo. It will inform you what changes to tracked (staged) files will be included in next commit, if there are any untracked files that have been added to the project or have changes, etc. |
| `git add <path>`            | Adds an entire directory or individual file (or files using a `*` as a wildcard) to the "staging area" for the next commit.                                                                                                          |
| `git add -A`                | Adds all changes within the repo to the staging are for next commit.                                                                                                                                                                 |
| `git commit -m "<message>"` | Commits all staged changes to the local repo. The message should be in worded such that it describes what the commit **does**, not what it **did**. For example, "Style nav bar" instead of "Styled nav bar".                        |

<br>
<br>
<br>

This graph diagrams the flow of making changes to a repo:

<img src="https://i.imgur.com/MGQoFYo.png">

This is the most simple workflow, things get a bit more complex when you start sharing code and manage larger codebases.

> IMPORTANT: Do not create a repo within an existing repo! If you find your computer very sluggish, it might be because you have "nested" repos. It's not uncommon for students to accidentally make their home folder (`~`) a repo - so start there if you suspect something is wrong.

<br>
<br>
<br>
<br>

# Conclusion

You will "git" plenty of practice as we progress through this program, so if the concept of git/github still seems a little fuzzy at this point, rest assured you will soon "git" it once you "git" some more practice in. 😎
