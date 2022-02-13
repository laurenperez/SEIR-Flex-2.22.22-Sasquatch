---
track: "React Fundamentals"
title: "React Students Lab"
week: 12
day: 2
type: "lab"
---

# React "Students" Lab

<br>
<br>
<br>

## Intro

In the last lesson, you saw how to:

- Initialize state using `useState`
- How to pass info as props from a parent to a child component
- How to map arrays of info to components
- How to use function components to render info provided as props

Time for some practice repeating what you know about React so far!

<br>
<br>

## Set Up

Create React [CodeSandbox](https://codesandbox.io) named "React Students".

<br>
<br>

## Minimum Requirements

**The layout and styling of the markup is left up to your discretion.**

1. Use the following array of "student" data to initialize state as an object with a `students` key in the `<App>` component:

```javascript
;[
  {
    name: "Cait Yomorta",
    bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus placeat nostrum explicabo? Voluptatibus expedita saepe officia optio, commodi totam ratione laudantium ipsum porro molestias, quasi nulla minus vitae laboriosam corrupti Delectus inventore explicabo est odit incidunt rem a recusandae eum pariatur. Aperiam doloremque blanditiis harum voluptate animi fugit beatae asperiores quo, dignissimos sed illum veniam eum accusantium nulla quod voluptatum",
    scores: [
      {
        date: "2018-02-08",
        score: 77,
      },
      {
        date: "2018-04-22",
        score: 92,
      },
      {
        date: "2018-09-15",
        score: 68,
      },
    ],
  },
  {
    name: "Holly Baird",
    bio: "Eum molestiae explicabo deserunt, maiores quod eaque omnis tenetur vero ducimus, magnam autem! Quia facere quaerat eum repudiandae dolorum eligendi iure quae. Eos id possimus accusantium, earum animi modi hic.",
    scores: [
      {
        date: "2018-12-14",
        score: 88,
      },
      {
        date: "2019-01-09",
        score: 79,
      },
      {
        date: "2019-02-23",
        score: 91,
      },
      {
        date: "2019-03-01",
        score: 95,
      },
    ],
  },
  {
    name: "Wes Mungia",
    bio: "Repudiandae veritatis recusandae quidem tenetur impedit, numquam incidunt enim, adipisci id cupiditate asperiores nam perferendis. Facere odit laborum ipsum autem repellendus natus eius doloremque ullam perferendis. Enim repellendus ut veniam?",
    scores: [
      {
        date: "2018-10-11",
        score: 62,
      },
      {
        date: "2018-11-24",
        score: 74,
      },
      {
        date: "2018-12-19",
        score: 85,
      },
    ],
  },
]
```

<br>
<br>
<br>

1. Code the `<App>` App component to display a `<Student>` component for each student object in the `students` array being held in state.

2. Code the `<Student>` component so that it:

   - Renders the student's `name` & `bio` properties
   - Renders a `<Score>` component for each score object in the student's `scores` property.

3. Code the `<Score>` component so that it renders the score object's `date` & `score` properties.

<br>
<br>

#### Hints

**You will not update state in this lab, just initializing it in `App.js`, passing it as props and rendering it's data in the components**
<br>

**Here's what it should look like when you call `useState` inside `App.js`:**

```javascript
const [studentData, setStudentData] = useState({
  students: [
    {
      name: 'Cait Yomorta',
      bio: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus placeat nostrum explicabo? Voluptatibus expedita saepe officia optio, commodi totam ratione laudantium ipsum porro molestias, quasi nulla minus vitae laboriosam corrupti Delectus inventore explicabo est odit incidunt rem a recusandae eum pariatur. Aperiam doloremque blanditiis harum voluptate animi fugit beatae asperiores quo, dignissimos sed illum veniam eum accusantium nulla quod voluptatum',
      scores: [
        {
          date: '2018-02-08',
          score: 77
        },
        {
          date: '2018-04-22',
          score: 92
        },
        {
          date: '2018-09-15',
          score: 68
        }
      ]
    },
    {
      name: 'Holly Baird',
      bio: 'Eum molestiae explicabo deserunt, maiores quod eaque omnis tenetur vero ducimus, magnam autem! Quia facere quaerat eum repudiandae dolorum eligendi iure quae. Eos id possimus accusantium, earum animi modi hic.',
      scores: [
        {
          date: '2018-12-14',
          score: 88
        },
        {
          date: '2019-01-09',
          score: 79
      ...
      // more code below
```
