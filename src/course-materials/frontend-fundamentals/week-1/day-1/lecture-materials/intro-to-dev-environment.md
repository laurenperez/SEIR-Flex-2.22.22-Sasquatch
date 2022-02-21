---
track: "Frontend Fundamentals"
title: "Intro to the Dev Environment"
week: 1
day: 1
type: "lecture"
---

# Intro to the Dev Environment

<br>
<br>
<br>
<br>

## Learning Objectives

Students will be able to:

- Be more productive by using the keyboard vs. the mouse

- Use the _Terminal_ Command Line Interface (CLI) to navigate and manipulate the filesystem

- Use the _VS Code_ text editor to open and edit files

<br>
<br>
<br>

## Being More Productive by using the Keyboard vs. the Mouse

<br>
<br>
<br>

### Launching Apps with Spotlight

- Developers avoid using the mouse whenever possible

- Developers are more productive when their hands are on the keyboard

- Open applications using _Spotlight_ instead of the mouse by: 1. Pressing `cmd+space` to open _Spotlight_ 2. Start typing the name of the app until the app is highlighted 3. Press `enter` to open the app!

<br>
<br>
<br>

### Switching Between Applications

- Quickly switch between running applications by pressing `cmd+tab`

- If a minimized applications does not display after tabbing to it with `cmd+tab`: 1. Continue to hold down `cmd` and release `tab` 2. Press `option` then release `cmd`

<br>
<br>
<br>

### Switching Between Instances of an Application

- You can switch between multiple windows of the same application using **cmd+\`** (that's a back-tick character, which is above the `tab` key)

- Note that it's best to minimize how many windows/applications you have open when developing to make switching between applications quicker and minimize distractions to the job at hand

<br>
<br>
<br>

## Uploading Screenshots and Images to _imgur.com_

<br>

### Why Upload Images?

- Often you will need to share images with others or use them in your applications, notes, readme files, etc

- Unfortunately, if an image exists only on your computer, you lose the ability to use it anywhere but on your computer

- The solution is to upload images to a cloud service...

<br>
<br>
<br>

### Imgur

- One of the most popular image hosting services on the Internet is [Imgur](http://imgur.com/).

- Go there now and open a free account

- Although you can upload images using Imgur's web interface, but there's a better way...

<br>
<br>
<br>

### Upload Tools for Imgur

[Click this link](https://help.imgur.com/hc/en-us/articles/209592766-Tools-for-Imgur) to go to a page of different tools you can use to conveniently upload images to imgur from your computer

<br>
<br>
<br>

### Screenshots

- The following keyboard shortcuts can be used to take screenshots of your screen: - Whole screen: `shift-cmd-3` - Part of your screen: `shift-cmd-4` - A certain window: `shift-cmd-4`, then `spacebar` to toggle window mode

<br>
<br>
<br>

## Using the _Terminal_<br>Command Line Interface

<br>

### What is _Terminal_?

- _Terminal_ is the developers' choice for entering commands and navigating the filesystem

- _Terminal_ is also known as a _shell_. The default shell in Mac OS X is _Bash_. You will find the terms _terminal_ and _bash_ often used interchangeably

- Go ahead and open _Terminal_ (remember - use Spotlight!)

<br>
<br>
<br>

### Command Line Basics

Before we get started with this section, it might be helpful to ensure we are all using the same shell configuration.

That said, here are some screenshots to show how your instructor has set up their shell:

![screenshot](https://i.imgur.com/XWfZzKt.png)
![screenshot](https://i.imgur.com/8dvHVnq.png)
![screenshot](https://i.imgur.com/7MdUP9k.png)

<br>
<br>
<br>

<p>Now that we've reviewed shell config, here are the basic command tasks we'll try out:</p>

- Change directories (folders)
- List a directory's contents
- Create a directory
- Create a file
- Move files and directories
- Copy files and directories
- Rename files and directories
- Delete files & directories
- Command history & clearing the window

<br>
<br>
<br>
<br>

#### Change Directories

- We use the `cd` command to change directories

- Let's change to the _home_ directory of the logged in user:

      	```shell
      	$ cd ~
      	```

- Here are a few common shortcut characters used when navigating the filesystem: - `~` The logged in user's _home_ directory - `/` The _root_ (top-level) directory on the harddrive - `.` The current directory - `..` The parent directory of the current directory

- The `pwd` command "prints" the current (working) directory

<br>
<br>
<br>

#### List a Directory's Contents

- Use the `ls` command to display a concise list

- `ls` does not display hidden files by default, adding the `-a` option will show them

- (Optional) `tree` is a nice utility for displaying a graphical representation of a directory and its nested directories.<br/>Install it by typing `brew install tree`

<br>
<br>
<br>
<br>

#### Create a Directory

- Use the `mkdir` command to create directories

- Let's create a `drawers` directory inside of the _home_ directory:

      	```shell
      	$ mkdir ~/drawers
      	```

- Note that you don't have to specify the _full path_ if we are already in the _home_ directory

<br>
<br>
<br>

#### Using Tab Auto-Completion

- Change to the _home_ directory

- Now let's change to our newly created `drawers` directory, however, only type `cd d`,<br/>then press `tab` which will auto-complete directory name(s)

- You can cycle between matching directory names by continuing to press `tab`

<br>
<br>
<br>

#### Creating Files

- We use the `touch` command to create empty files

- Let's move to the `drawers` directory and create a directory named `socks`. Here is how we can create the directory **and** change to it using a single command:
  `shell $ mkdir socks && cd socks`

- Now let's create a `dress.socks` file:

      	```shell
      	$ touch dress.socks
      	```

<br>
<br>
<br>

#### Practice Creating Directories and Files

1. Create this directory: `~/drawers/pjs`

2. Create two files in the new `pjs` folder named `warm.pjs` and `favorite.socks`

<br>
<br>
<br>

#### Moving Files

- Okay, so we have a messy `drawers/pjs`, let's move our `favorite.socks` file out of the `pjs` folder and into the `drawers/socks` folder where it belongs!

- Here's how we can do the move regardless of which directory we're currently in by using absolute paths:

      	```shell
      	$ mv ~/drawers/pjs/favorite.socks ~/drawers/socks/
      	```
      	Be sure to use tab-completion!

> Note that you have the option to use _absolute_ and/or _relative_ paths.

<br>
<br>
<br>

#### Moving Directories

- Moving directories is just as easy using the same `mv` command

- Try it out: 1. Create a `~/shorts` directory 2. Move the newly created `shorts` directory into the `drawers` directory

<br>
<br>
<br>

#### Renaming Files

- Guess what - there's no dedicated bash command to rename files and directories!

- Don't panic! The `mv` command is very flexible!

- Here's how we can rename the `warm.pjs` file to `summer.pjs` from anywhere:
  `shell $ mv ~/drawers/pjs/warm.pjs ~/drawers/pjs/summer.pjs`
- Of course, you can actually move and rename simultaneously!

<br>
<br>
<br>

#### Deleting Files

- We use the `rm` command to delete both files and directories

- Let's first use it to delete the `dress.socks` file. Here's one way:
  `shell $ cd ~/drawers/socks && rm dress.socks`

- Using the `*` wildcard character, it's possible to delete and move multiple files. For example, typing `*.socks` would match all files with an extension of `.socks`...

<br>
<br>
<br>

#### Deleting Directories

- Deleting directories is almost the same as deleting files except you must use the `-r` option, which runs the `rm` command "recursively" to delete a directory and it's contents.

- To delete the `pjs` folder we could use this command:

      	```shell
      	$ rm -r ~/drawers/pjs
      	```

<br>
<br>
<br>

#### Moving Multiple Files

- To demonstrate moving multiple files, re-create the `dress.socks` file we just deleted from the `socks` directory

- Now let's move all of the `.socks` files out of the `socks` folder into our _home_ folder. The following command assumes we're inside the `socks` folder:

      	```shell
      	$ mv *.socks ~
      	```

- Now, without changing directories, return the socks files back to where they belong

<br>
<br>
<br>

#### Copying Files & Directories

- Use the `cp` command to copy files and directories

- Here's how we can copy all **.js** files:

      	```shell
      	$ cp *.js ~/dest-folder
      	```

- And entire directories by adding the `-R` option:

      	```shell
      	$ cp -R ./sample-code ~/dest-folder
      	```

<br>
<br>
<br>

#### Command History & Clearing the Window

- Pressing the up and down arrows in Terminal will cycle through previously entered commands. This can be a huge time saver!

- If you'd like to clear the Terminal window, simply press `cmd+k` or type `clear`

<br>
<br>
<br>

## Using _VS Code_ to Open and Edit Files

<br>

### What is _VS Code_?

- _VS Code_ is a popular open-source text-editor maintained by Microsoft

- It's very customizable and capable

- VS Code's functionality can be extended using _extensions_, however, most useful features are built-in

- To try it out, let's use VS Code to open and edit a file...

<br>
<br>
<br>

### Add _VS Code_ to <code>\$PATH</code>

- We want to be able to type in `code .` in Terminal and have VS Code open the current directory for editing

- First, open VS Code's **Command Palette** by pressing `⇧⌘P`

- Next, type "shell command" and select the `Shell Command: Install 'code' command in PATH` command

- Restart Terminal for the new \$PATH to take effect

> For the above to work, VS Code must be installed in the **Applications** folder

<br>
<br>
<br>
<br>

## (Optional-Bonus) Using _Spectacle_ to<br>Move and Size Windows

<br>

### What is _Spectacle_?

- _Spectacle_ is a free utility that resizes and snaps into position app windows

- If you don't see the "spectacles" in your menubar, launch _Spectacle_ using _Spotlight_

- When running, _Spectacle_ will listen to the keyboard for certain key combinations (hotkeys) and will resize/position the active application accordingly...

<br>
<br>
<br>

## Going Forward

- Today, we have only scratched the surface of tools such as _Terminal_ and _VS Code_

- Rest assured that throughout your time in SEIR, we will help you to get to know these tools much better!
