---
track: "Second Language"
title: "Intro to Django Class-Based Views (CBVs)"
week: 21
day: 1
type: "lecture"
---

# Intro to Django Class-Based Views (CBVs)

<br>
<br>
<br>

### [Click here](https://generalassembly.zoom.us/rec/share/Xwqf8sMV5isdcvenIrisjlKAJ5EPZ4ZFNgNEMU-A3VtxIGhXBffjDWll-V1hxBLV.hTWFxvFtCHPK9W4N?startTime=1625618184000) to access recording

<br>
<br>
<br>


## Learning Objectives

| Students Will Be Able To: |
|---|
| Use Class-based Views (CBVs) in place of View Functions |
| Access form data within a CBV |
| Use a CBV to Create data |
| Use a CBV to Delete data |
| Use a CBV to Update data |

<br>
<br>
<br>


## Road Map

1. Set up
2. What are Class-based Views (CBVs)?
3. Why use CBVs?
4. Creating Data Using a CBV
5. Updating & Deleting Data Using a CBV

<br>
<br>
<br>


## 1. Set Up

This lesson continues to build-out Cat Collector beginning from where the _Intro to Django Models_ lesson left off.

<br>
<br>
<br>


## 2. What are Class-based Views?

First - ❓ **What is a Django View?**

Class-based Views are classes defined in the Django framework that we can extend and use instead of _view functions_.  For example, let's say we wanted to implement the _index_ (view all) functionality for a Books data resource:

```python
# views.py
from django.views.generic import ListView

class BookList(ListView):
    model = Book
```
<br>
<br>
<br>


Then, in **urls.py**, we invoke the `as_view()` method of the `BookList` CBV (which returns a view function) and connect it to a route as usual:

```python
# urls.py
from django.urls import path
from books.views import BookList

urlpatterns = [
    path('books/', BookList.as_view()),
]
```

<br>
<br>
<br>


`ListView` is a built-in generic CBV that provides a Model's data to a template to be rendered.

We extended the generic `ListView` to create a `BookList` and used 

```python
    model = Book
```
to inform `BookList` that it is to access the `Book` Model.

Notice that there's not even a call to render? By default, the CBV  will expect to render a template named **templates/\<name of app\>/book_list.html**. This convention can of course be overridden.

<br>
<br>
<br>


In addition to the `ListView` used to display the index page for a Model, there are also:

1. `DetailView` - used to implement the "detail" page for an instance of a Model
1. `CreateView` - used to create an instance of a Model
1. `DeleteView` - used to delete an instance of a Model
1. `UpdateView` - used to update an instance of a Model

In this lesson, we will be extending the `CreateView`, `DeleteView` and `UpdateView` CBVs to CUD cats!  

We also could easily replace the existing `cats_index` and `cats_detail` view functions with CBVs, however, we won't as a reminder of how they are structured.

<br>
<br>
<br>


## 3. Why use Class-based Views?

Much of the code we write in CRUD applications repeats certain patterns again and again.

As you saw in the above example, we can leverage CBVs to avoid having to write the same repeating code over and over.

CBVs can save time thus making us more productive developers.

CBVs are highly configurable by adding class attributes, overriding methods and using decorators.

<br>
<br>
<br>


For example, here's how we could have used the `template_name` attribute in the above `BookList` to render a template other than the default:

```python
class BookList(ListView):
  model = Book
  template_name = 'books/index.html'
``` 

<br>
<br>
<br>


## 4. Creating Data Using a CBV

We need a way to create cats in Cat Collector!

<br>
<br>
<br>


#### Add the Route

If this was an Express app, we would need to code two separate routes and controller actions like:

1. `router.get('/cats/new', catsCtrl.new);` to view the form, and
1. `router.post('/cats', catsCtrl.create);` to add the cat to the database and then redirect

However, using Django, we only need a single URL-based route because a `CreateView` CBV will automatically:

1. Create a Django [ModelForm]() used to automatically create the form's inputs for the Model. 
1. If the request is a `GET`, render a template (where we'll include a `<form>`)  and
1. In the case of a `POST`, use the posted form's contents to automatically and transparently create data and perform a redirect.

<br>
<br>
<br>

Let's add that new URL pattern to **main_app/urls.py**

```python
urlpatterns = [
  path('', views.home, name='home'),
  path('about/', views.about, name='about'),
  path('cats/', views.cats_index, name='index'),
  path('cats/<int:cat_id>/', views.cats_detail, name='detail'),
  # new route used to show a form and create a cat
  path('cats/create/', views.CatCreate.as_view(), name='cats_create'),
]
```

<br>
<br>
<br>

The `path()` function still needs a view **function** as its second argument, not a class, and that's what a CBV's `as_view()` method returns.

> Did you notice that we didn't have to put that route above the `cats/<int:cat_id>/'`?  Django won't match that route unless there's something that looks like an integer in the second segment, thus it ignores `cats/create/`

We'll need to add the `views.CatCreate` CBV to make the server happy, but first let's add a link to the nav for adding a cat...

<br>
<br>
<br>


#### Update the UI

Now that we know the path used to create cats, let's update **base.html** to add a link to the nav:


```html
<li><a href="{% url 'about' %}">About</a></li>
<!-- new link below -->
<li><a href="{% url 'cats_create' %}">Add a Cat</a></li>
<li><a href="{% url 'index' %}">View All My Cats</a></li>
```


On to the view!

<br>
<br>
<br>


#### Extending the Generic `CreateView`

First, to use anything in Django, it needs to be imported:

```python
# views.py

from django.shortcuts import render
# Add the following import
from django.views.generic.edit import CreateView
from .models import Cat
```

<br>
<br>
<br>


Now we can inherit from `CreateView` to create our own CBV used to create cats:

```python
class CatCreate(CreateView):
  model = Cat
  fields = '__all__'
```

The `fields` attribute is required and can be used to limit or change the ordering of the attributes from the `Cat` model are generated in the `ModelForm` passed to the template.

<br>
<br>
<br>


We've taken advantage of the special `'__all__'` value to specify that the form should contain all of the `Cat` Model's attributes. Alternatively, we could have listed the fields in a list like this:

```python
class CatCreate(CreateView):
  model = Cat
  fields = ['name', 'breed', 'description', 'age']
```

<br>
<br>
<br>


That's all of the code we need to write to display a template (where we will have the form) and create a Cat when form is submitted (the request is a `POST` instead of a `GET`).

It won't always be quite this easy as we'll see in the future when we need to add some additional attributes or override methods in the CBV.

On to the template!

<br>
<br>
<br>


#### Create the Template for Creating Cats

By convention, the `CatCreate` CBV will look to render a template named `templates/main_app/cat_form.html`.

All CBVs by default will use a folder inside of the `templates` folder with a name the same as the app, in our case `main_app`.

Let's give `CatCreate` the template it wants by first creating the `templates/main_app` folder:

```shell
$ mkdir main_app/templates/main_app
```

<br>
<br>
<br>


Now create the template file:

```shell
$ touch main_app/templates/main_app/cat_form.html
```

<br>
<br>
<br>


There's not too much so we'll review as we type it in:


```html
{% extends 'base.html' %}

{% block content %}
  <!-- Leaving the action empty makes the form post to the same url used to display it -->
  <form action="" method="post">
    <!-- Django requires the following for security purposes -->
    {% csrf_token %}
    <table>
      <!-- Render the inputs inside of <tr>s & <td>s -->
      {{ form.as_table }}
    </table>
    <input type="submit" value="Submit!" class="btn">
  </form>
{% endblock %}
```

<br>
<br>
<br>



The `{% csrf_token %}` is a security measure that makes it difficult to perform a [cross-site-request-forgery](https://en.wikipedia.org/wiki/Cross-site_request_forgery) by writing a CSRF (pronounced "see-surf") token that is validated on the server.

<br>
<br>
<br>


Let's refresh and click the **Add a Cat** link.

Not too bad:

<img src="https://i.imgur.com/DPxY8um.png">

<br>
<br>
<br>


Use Devtools to explore the DOM. You'll see how Django's ModelForm wrote the inputs in table rows and columns because we used `{{ form.as_table }}`.  Other options include:

1. `{{ form }}` - No wrapper around the `<label>` & `<input>` tags
1. `{{ form.as_p }}` - Wraps a `<p>` tag around the `<label>` & `<input>` tags
1. `{{ form.as_ul }}` - Wraps an `<li>` tag around the `<label>` & `<input>` tags

> Note: To ease custom styling, you can add an `id` or `class` to your `<table>` and/or `<form>` tags.  Also note how Django automatically assigns an id to each input.

<br>
<br>
<br>


#### Redirecting

If we submit the form to create a cat, the cat will be created, however, we'll receive an error because Django doesn't know where to redirect to.

One way to fix this is by adding a `success_url` to the CBV like this:

```python
class CatCreate(CreateView):
  model = Cat
  fields = '__all__'
  success_url = '/cats/'
```

<br>
<br>
<br>


However, we would need to write a method if we wanted to redirect to the cat that was just created, and for better code reuse, Django recommends adding a `get_absolute_url` method to the **Model** instead.

Let's take Django's advice by updating the `Cat` model:

```python
class Cat(models.Model):
  name = models.CharField(max_length=100)
  breed = models.CharField(max_length=100)
  description = models.TextField(max_length=250)
  age = models.IntegerField()

  def __str__(self):
    return self.name
    
  # Add this method
  def get_absolute_url(self):
    return reverse('detail', kwargs={'cat_id': self.id})
```
<br>
<br>
<br>


The `reverse` function builds a path string. The above will return the correct path for the `detail` named route.  However, since that route requires a `cat_id` route parameter, its value must provided as a shown above.

Let's not forget to import `reverse` in **models.py**:

```python
from django.db import models
# Import the reverse function
from django.urls import reverse
```

<br>
<br>
<br>


We've covered all of the fundamentals of class-based views above so we'll be a little more brief while adding the functionality to delete and update cats by combining their steps together...

<br>
<br>
<br>


## 5. Updating & Deleting Data Using a CBV

Here are the user stories we want to implement:

1. _AAU, when viewing a cat's detail page, I want to click EDIT to update that cat's information._
1. _AAU, when viewing a cat's detail page, I want to click DELETE to remove that cat from the database._

<br>
<br>
<br>


#### Add the Routes

Let's add the two new routes in **urls.py**:

```python
path('cats/create/', views.CatCreate.as_view(), name='cats_create'),
# Add the new routes below
path('cats/<int:pk>/update/', views.CatUpdate.as_view(), name='cats_update'),
path('cats/<int:pk>/delete/', views.CatDelete.as_view(), name='cats_delete'),
```

<br>
<br>
<br>


By default, CBVs that work with individual model instances will expect to find a named parameter of `pk`. This is why we didn't use `cat_id` as we did in the _detail_ entry.

<br>
<br>
<br>


#### Update the UI

We need to see EDIT and DELETE links on a cat's detail page.

Let's update **templates/cats/detail.html** by adding to a cat's "card" a `<div>` with a Materialize class of `card-action`:


```html
      <p>Age: Kitten</p>
    {% endif %}
  </div>
  <!-- Add the following markup -->
  <div class="card-action">
    <a href="{% url 'cats_update' cat.id %}">Edit</a>
    <a href="{% url 'cats_delete' cat.id %}">Delete</a>
  </div>
  <!-- New markup above -->
</div>
```

<br>
<br>
<br>



Now for the views...

<br>
<br>
<br>


#### Subclass the `DeleteView` & `UpdateView`

We've referenced the new `CatUpdate` and `CatDelete` views in the routes so we need to add them to **views.py**.

But first we'll need to import the two additional generic CBVs to extend from:

```python
# Add UdpateView & DeleteView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
```
<br>
<br>
<br>



Now for the amazingly minimal new code:

```python
class CatUpdate(UpdateView):
  model = Cat
  # Let's disallow the renaming of a cat by excluding the name field!
  fields = ['breed', 'description', 'age']

class CatDelete(DeleteView):
  model = Cat
  success_url = '/cats/'
```

<br>
<br>
<br>


Note that if we delete a cat, we'll need to redirect to the cats _index_ page since that cat doesn't exist anymore.

Now the server should be back up and clicking on a cat should result in a page that looks something like this:

<img src="https://i.imgur.com/yTyYWva.png">

<br>
<br>
<br>


Updating a cat is working, however, we'll need to add an extra template to implement delete functionality, which we'll do in a moment.

First though, to enhance the UX, it would be nice to see the name of the cat we're editing...

<br>
<br>
<br>


#### Customize the `cat_form.html` Template

Since we didn't include `'name'` in the fields list in `CatUpdate`, the `name` attribute isn't listed in the form.

We're going to customize **cat_form.html** to show the cat's name that is being edited, and learn a little more about Django in the process.

The CBVs that work with a single model instance automatically pass as part of the context two attributes that are assigned the model instance.  The attributes are named `object` and, in this case, `cat` (the lowercase name of the Model).

`object` will be set to `None` in a `CreateView`, which makes sense.

> FYI, in a `ListView`, the _queryset_ of model instances will be available via attributes named `object_list` and `cat_list` (again, the lowercase name of the Model with `_list` appended to it).

<br>
<br>
<br>


Let's leverage this new knowledge to modify **templates/main_app/cat_form.html** to show the cat's name only when we are editing, not creating, a cat:


```html
{% block content %}
  <!-- New if/else block -->
  {% if object %}
    <h1>Edit <span class="teal-text">{{object.name}}</span></h1>
  {% else %}
    <h1>Add Cat</h1>
  {% endif %}
```
<br>
<br>
<br>




Looking good:

<img src="https://i.imgur.com/LEEiTN9.png">

<br>
<br>
<br>


Okay, let's get delete functionality working then we're done!

<br>
<br>
<br>


#### Adding a `cat_confirm_delete.html` Template

It's usually wise to perform some type of confirmation when deleting data and Django makes it easy when we subclass a `DeleteView` by automatically rendering a confirmation template.

All we have to do is create it named as follows:

```shell
$ touch main_app/templates/main_app/cat_confirm_delete.html
```

<br>
<br>
<br>


Now for its content:


```html
{% extends 'base.html' %}

{% block content %}
  <h1>Delete Cat</h1>

  <h4>Are you sure you want to delete <span class="teal-text">{{ object.name }}</span>?</h4>

  <form action="" method="POST">
    {% csrf_token %}
    <input type="submit" value="Yes - Delete!" class="btn">
    <a href="{% url 'detail' cat.id %}">Cancel</a>
  </form>
{% endblock %}
```

<br>
<br>
<br>



Note how we are allowing the user to cancel the delete by providing a link back to the _detail_ page.

<br>
<br>
<br>


Let's check it out by refreshing:

<img src="https://i.imgur.com/zbw2HTU.png">

<br>
<br>
<br>


Congrats for implementing full CRUD for cats!

In the next lesson we'll see how to work with One-Many data relationships.

As usual, your lab is to implement the same class-based views in you Finch Collector project.

<br>
<br>
<br>


## ❓ Essential Questions

Take a minute to review the following questions:

1. **To be more productive, Class-based Views can be used in lieu of ______ __________.**

2. **What generic class do we extend to create our own CBV for creating model instances?**

3. **Every CBV we used in this lesson had a ________ attribute defined to inform the CBV what Model its for.**

<br>
<br>
<br>


## Challenge Exercise

This challenge exercise is for those of you who don't need to rest and would like some additional reps in addition to the Finch Collector lab.

So far in the Cat Collector, we've implemented full-CRUD for the Cat Model.  Tomorrow we will be learning how to implement a many-to-many association between cats and toys:<br>`Cat >---< Toy`

The starter code for the many-to-many lesson will have full-CRUD implemented for the Toy Model.

<br>
<br>
<br>


For practice, feel free to implement full-CRUD on the Toy Model yourself.  The Toy Model has the following attributes:

```python

class Toy(models.Model):
  name = models.CharField(max_length=50)
  color = models.CharField(max_length=20)
  
  # Other goodness such as 'def __str__():' below
```

<br>
<br>
<br>


Enjoy!

## References

[Built-in Class-based Views](https://docs.djangoproject.com/en/2.1/topics/class-based-views/generic-display/)

[Working with Forms in Django](https://docs.djangoproject.com/en/2.1/topics/forms/)

[How Python's import system works](https://realpython.com/absolute-vs-relative-python-imports/)