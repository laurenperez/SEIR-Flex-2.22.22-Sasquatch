---
track: "Second Language"
title: "Deploying a Django App to Heroku"
week: 23
day: 2
type: "walk-thru"
---

<img src="https://i.imgur.com/efjnAna.jpg">

# Deploying a Django App to Heroku



<br>
<br>
<br>


[Click here](https://generalassembly.zoom.us/rec/share/cAjclB1d2DNGfibCb8-JsbVnfMhQZ_pL8GM5yNRGa14MEWTgnp9_3MSZkXf9mvu1.JjYFCAv51FeHACFW?startTime=1626913960000) to access recording

<br>
<br>
<br>





## Road Map

1. Preparation
2. Ready the Django Project
3. Commit the Changes
4. Deploy to Heroku
5. Migrate the Database Migrations
6. Set Environment Variables
7. Open the Application
8. Troubleshooting
9. Create the superuser
10. Test the Admin Portal


<br>
<br>
<br>



## 1. Preparation

<br>

### `cd` Into the Project's Folder

- `cd` into the the Django project's root folder

- Open the project in VS Code: `code .`

- Open a terminal in VS Code: `ctrl + backtick`

- Make sure that the `master` branch is checked out

<br>
<br>
<br>



### Heroku Account & Toolbelt

You already got set up with Heroku in Unit 2.

[Click here](https://dashboard.heroku.com) to open your Heroku Dashboard.

Verify that the [Heroku Toolbelt](https://devcenter.heroku.com/articles/heroku-cli) is installed by typing the following in terminal:

```shell
$ heroku
```

You should see a list of commands available.

Run the following command to check if you're logged in:

```shell
$ heroku auth:token
```

If not logged in, type the following and enter your credentials:

```shell
$ heroku login
```


<br>
<br>
<br>



### Create the App on Heroku

After ensuring that you're logged in, you can create the app on Heroku as follows:

```shell
$ heroku create <your preferred name here>
```

Replace `<your preferred name here>` with the name you want (no spaces). Your name has to be unique on Heroku, so you might have to be a little creative.

The name you choose will be the name of the app in your Heroku dashboard and the name used for the subdomain in the URL of your hosted app, e.g., `https://catcollector.herokuapp.com`

<br>
<br>
<br>



## 2. Ready the Django Project

Django projects need to be configured to be deployed.

Django has detailed deployment [docs](https://docs.djangoproject.com/en/3.0/howto/deployment/) and a [checklist](https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/), however, there is dedicated package we will use to make deploying to Heroku much easier.


<br>
<br>
<br>



### Install `django-heroku`

First, let's install [`django-heroku`](https://github.com/heroku/django-heroku) which is a Python package that will help with the deployment process:

```shell
$ pipenv install django-heroku
```

<br>
<br>
<br>



### Update `settings.py`

There are several changes we would have to make to `settings.py` in order to be able to deploy.

However, the `django-heroku` package makes the necessary changes to `settings.py` for us. All we need to do is add the following to the **very bottom** of **settings.py**:

```python
# Other settings above

# Configure Django App for Heroku.
import django_heroku
django_heroku.settings(locals())
```

> Note that the import name is `django_heroku` instead of `django-heroku` we used when installing.


<br>
<br>
<br>



### Install `gunicorn`

The built-in development server we've been running with `python manage.py runserver` is not suitable for deployment.

`gunicorn` is a Python HTTP Server designed to work with Linux/Unix servers such as Heroku's.

Let's install it:

```shell
$ pipenv install gunicorn
```


<br>
<br>
<br>



### Create & Configure `Procfile`

Heroku needs a file named **Procfile** to know how to run a Python app.

Let's create one - be sure to name it exactly as `Procfile` (capitalized and without a file extension):

```shell
$ touch Procfile
```

We only need to add a single line of code in **Procfile**. However, it's important to replace the `<your project name here>` with your actual project name:

```shell
web: gunicorn <your project name here>.wsgi
```

The project name should be the same as your project's folder name, however, you can also verify the project's name by examining this line in `settings.py`:

```python
WSGI_APPLICATION = 'catcollector.wsgi.application'
# catcollector is the project name
```


<br>
<br>
<br>


### Create a `requirements.txt`

The `package.json` file we used in Node apps informed Heroku which Node modules the app needed to be installed.

The equivalent in a Python app is the `requirements.txt` file.

`pip` has a `freeze` command for listing the installed Python packages. Let's check it out:

```shell
$ pip freeze
```

That list of packages is in the correct format for the `requirements.txt` file.

Here's how we use Unix/Linux's `>` to redirect the output of `pip freeze` to a `requirements.txt` file (please spell correctly):

```shell
$ pip freeze > requirements.txt
```

Since we're not using [virtual environments](https://packaging.python.org/guides/installing-using-pip-and-virtualenv/), the list of requirements may actually include packages the Django project does not need. This is not a problem, the first deployment just might take a little longer as Heroku installs the extra packages.

However, the `requirements.txt` file may be edited to remove packages that you **are sure** your project doesn't need.

> Note:  If you install any additional Python packages during development after your initial deployment, you will need to run `pip freeze > requirements.txt` again to update the **requirements.txt** after the install of the additional Python package.


<br>
<br>
<br>


## 3. Commit the Changes

Now let's commit the changes made to the project (make sure that you're on the `master` branch):

```shell
$ git add -A
$ git commit -m "Config deployment"
```


<br>
<br>
<br>



## 4. Deploy to Heroku

The `heroku` remote was added to the repo with the `heroku create` command ran earlier.

So, deploying the first time and re-deploying later is as easy as running this command:

```shell
$ git push heroku master
```

The first deployment will take considerably longer than subsequent deployments because Heroku will have to install all of the Python packages.  However, during re-deployments, Heroku will only install/uninstall changes made to `requirements.txt`.

Read the output during deployment carefully. You'll need to address the errors if the deployment fails.

In the case of a successful first deployment - **the app is still not quite ready to run**...


<br>
<br>
<br>



## 5. Migrate the Database Migrations

<br>
<br>




### Checking that Heroku Created a PostgreSQL Database

If a Django project is configured to use a PostgreSQL, Heroku automatically detects and creates a PostgreSQL database for the project.

You can run the following command to verify this:

```shell
$ heroku pg
```

You should see an output similar to this:

```shell
=== DATABASE_URL
Plan:                  Hobby-dev
Status:                Available
Connections:           0/20
PG Version:            11.2
Created:               2019-03-19 16:06 UTC
Data Size:             7.9 MB
Tables:                0
Rows:                  0/10000 (In compliance) - refreshing
Fork/Follow:           Unsupported
Rollback:              Unsupported
Continuous Protection: Off
Add-on:                postgresql-parallel-89032
```

<br>
<br>
<br>




### Check and Migrate the Migrations

First, let's run the command that shows us a list and status of the migrations for our local project:

```shell
$ python manage.py showmigrations
```

The output for the Cat Collector app looks like this:

```shell
admin
 [X] 0001_initial
 [X] 0002_logentry_remove_auto_add
 [X] 0003_logentry_add_action_flag_choices
auth
 [X] 0001_initial
 [X] 0002_alter_permission_name_max_length
 [X] 0003_alter_user_email_max_length
 [X] 0004_alter_user_username_opts
 [X] 0005_alter_user_last_login_null
 [X] 0006_require_contenttypes_0002
 [X] 0007_alter_validators_add_error_messages
 [X] 0008_alter_user_username_max_length
 [X] 0009_alter_user_last_name_max_length
contenttypes
 [X] 0001_initial
 [X] 0002_remove_content_type_name
main_app
 [X] 0001_initial
 [X] 0002_feeding
 [X] 0003_auto_20190303_2329
 [X] 0004_cat_toys
 [X] 0005_photo
 [X] 0006_cat_user
sessions
 [X] 0001_initial
```

We can run most any command we can locally on the Heroku server by prefacing the command with `heroku run`

Let's check out the migrations for the deployed app:

```shell
$ heroku run python manage.py showmigrations
```

Which generates the following output for Cat Collector:

```shell
admin
 [ ] 0001_initial
 [ ] 0002_logentry_remove_auto_add
 [ ] 0003_logentry_add_action_flag_choices
auth
 [ ] 0001_initial
 [ ] 0002_alter_permission_name_max_length
 [ ] 0003_alter_user_email_max_length
 [ ] 0004_alter_user_username_opts
 [ ] 0005_alter_user_last_login_null
 [ ] 0006_require_contenttypes_0002
 [ ] 0007_alter_validators_add_error_messages
 [ ] 0008_alter_user_username_max_length
 [ ] 0009_alter_user_last_name_max_length
contenttypes
 [ ] 0001_initial
 [ ] 0002_remove_content_type_name
main_app
 [ ] 0001_initial
 [ ] 0002_feeding
 [ ] 0003_auto_20190303_2329
 [ ] 0004_cat_toys
 [ ] 0005_photo
 [ ] 0006_cat_user
sessions
 [ ] 0001_initial
```

Yup, the unchecked migrations tells us that they need to be migrated:

```shell
$ heroku run python manage.py migrate
```

Lots of `OK`s is a good sign!


<br>
<br>
<br>



## 6. Set Environment Variables

We need to set environment variables (secrets) on Heroku in the same way we needed to set our OAuth keys in Unit 2.

The best way is to set each key=value pair using the `heroku config:set` command:

```shell
$ heroku config:set AWS_ACCESS_KEY_ID=AKIAJYO6WFUBRZUI6ZNQ
```

> Note: If setting AWS keys from Boto3, ensure the key names are in all caps (they are lowercase in `~/.aws/credentials`).

Setting the environment variables via the command line automatically restarts the server - which is necessary.  If you set the _config vars_ in Heroku's Dashboard, it won't restart the server.  However, you can restart the server manually using<br>`$ heroku restart`

After you are finished setting all of the environment variables, you can verify them as follows:

```shell
$ heroku config
```

Included in the output will be a `DATABASE_URL` that Heroku automatically added.


<br>
<br>
<br>



## 7. Open the Application

Let's check it out!

```shell
$ heroku open
```

Since the database is new, there will not be any users or data.  After signing up, creating and uploading a photo for Whiskers, I celebrated!

<img src="https://i.imgur.com/7hpQqOU.png">


<br>
<br>
<br>



## 8. Troubleshooting

The following command shows Heroku's log for our app and is useful for troubleshooting.  The log also contains the output from your app's `print()` statements:

```shell
$ heroku logs
``` 


<br>
<br>
<br>



## 9. Create the superuser

Because the database is "fresh", there's no superuser yet.

```shell
$ heroku run python manage.py createsuperuser
```

It's the same process as locally, just a bit slower.

<br>
<br>
<br>




## 10. Test the Admin Portal

Okay, the finale is to browse to:

`https://<your app name>.herokuapp.com/admin`

to checkout the admin portal:

<img src="https://i.imgur.com/fFsrfae.png">


<br>
<br>
<br>


### Congrats!

