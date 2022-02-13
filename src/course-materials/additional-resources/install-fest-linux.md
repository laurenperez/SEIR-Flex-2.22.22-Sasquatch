---
track: "Additional Materials"
title: "Install-fest Phase One (Linux)"
week: 1
day: 1
type: "resource"
---


# Install-Fest for Linux (Ubuntu 20.XX):


**Please note, this is a compilation of resources we've picked up on over time and may not encompass everything you need to install if you are running a Linux Operating System on your computer.**


**Also note the entire program is taught and demonstrated using a maching running MacOSX. That said, instructors may have limited experience working with a Linux laptop.** 

**So, please be advised there may be a diminished experience in the level of support instructors are able to offer for issues related specifically to linux.**

<br>


## List of software/tools to be installed:

- Slack
- VS Code
- Git
- Node.js/NVM/Nodemon
<!-- - PostgreSQL -->
<!-- - MongoDB -->
<!-- - Python -->
<!-- - Django -->
- Zoom

<br>
<br>


### Slack:
[Click Here For the Download](https://slack.com/downloads)



<br>
<br>


### Visual Studio Code:
[Click Here For the Download](https://code.visualstudio.com/)



<br>
<br>



### Git:
```shell
sudo apt install git
```


<br>
<br>



### IMPORTANT:

You should have already opened a personal Github account, however, you need to have a General Assembly Github Enterprise account as well. You can get one by signing up here: [https://git.generalassemb.ly/join](https://git.generalassemb.ly/join)


<br>
<br>




### Configuring a Global git ignore
> Note: This is IMPORTANT -- Everyone should have a global git ignore file so that you don’t have to worry about making the appropriate entries in a project’s git ignore.


1. First, create the file: touch ~/.gitignore_global
1. Next, configure git to use this file: git config --global core.excludesfile ~/.gitignore_global
1. Finally, lets put some good stuff in there (.gitignore_global):

A. `nano ~/.gitignore_global` - opens the file in the nano text editor.

B. Copy the contents from the code block below.

C. `ctrl+v` in nano to paste them in

D. `ctrl+x` which will prompt you to save, hit y for yes then hit enter, then enter again.
   
```shell   
# This is a list of rules for ignoring files in every Git repositories on your computer.
# See https://help.github.com/articles/ignoring-files

# Compiled source #
###################
*.class
*.com
*.dll
*.exe
*.o
*.so

# Packages #
############
# it's better to unpack these files and commit the raw source
# git has its own built in compression methods
*.7z
*.dmg
*.gz
*.iso
*.jar
*.rar
*.tar
*.zip

# Logs and databases #
######################
*.log

# OS generated files #
######################
._*
.DS_Store
.DS_Store?
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Testing #
###########
.rspec
capybara-*.html
coverage
pickle-email-*.html
rerun.txt
spec/reports
spec/tmp
test/tmp
test/version_tmp

# node #
########
node_modules

# Rails #
#########
**.orig
*.rbc
*.sassc
.project
.rvmrc
.sass-cache
/.bundle
/db/*.sqlite3
/log/*
/public/system/*
/tmp/*
/vendor/bundle


# Ruby #
########
*.gem
*.rbc
.bundle
.config
.yardoc
_yardoc
doc/
InstalledFiles
lib/bundler/man
pkg
rdoc
tmp

# for a library or gem, you might want to ignore these files since the code is
# intended to run in multiple environments; otherwise, check them in:
# Gemfile.lock
# .ruby-version
# .ruby-gemset

# CTags #
#########
tags

# Env #
#######
.env

# Python #
#######
*.pyc
__pycache__/
```

<br>
<br>



### Node.js, NVM, and Nodemon:

[Click Here for the Guide](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/#installing-nodejs-and-npm-using-nvm)

<br>
<br>



### For Nodemon (after installing NPM): sudo npm install -g nodemon

<br>


<!--
### PostgreSQL:

[Click Here For the Guide](https://linuxize.com/post/how-to-install-postgresql-on-ubuntu-18-04/)


<br>
<br>

-->


<!-- 

### MongoDB:

[Click Here For the Guide](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#install-mongodb-community-edition)


<br>
<br>
 -->



<!--

### Python 3 (Comes standard with Ubuntu 18.04):

[Click Here For the Guide for `pip` Installation](https://linuxize.com/post/how-to-install-pip-on-ubuntu-18.04/)


<br>
<br>

-->


<!--

### Django:


```shell
sudo apt install python3-django
```

<br>
<br>
-->



### Zoom:

[Click Here For the Download](https://zoom.us/download#client_4meeting)


<br>
<br>



### Recommendations:

<!--

```shell
zsh:
```
[Click Here For the Guide](https://gist.github.com/derhuerst/12a1558a4b408b3b2b6e)



<br>
<br>
-->




### snap:

```shell
sudo apt install snapd
```


<br>
<br>





### Screenshots:

Gnome Screenshot utility (should be installed by default)
