---
track: "React Fundamentals"
title: "Full Stack MERN on Mobile"
week: 14
day: 1
type: "lecture"
---

# Full Stack MERN on Mobile

## Review "Component Thought"

Components are the fundamental building blocks of UIs created using SPA's such as React, Angular, Vue, etc.

Remember when developing a React application, we construct the UI with a hierarchy of these components.

**Remember this wireframe:**

<img src="https://i.imgur.com/hL1T2tH.png">

**And how your application could be broken into components like this:**

<img src="https://i.imgur.com/TqerRDf.png">

<br>
<br>
<br>

This is especially important when designing mobile apps, which can be less complex visually, but require careful thought when setting up component structures. 

Here are some things to note when designing for mobile:

- Because there is much less space on a mobile screen, every pixel is precious real estate. Make each button, div, or icon count! Less is more in mobile design. Too many things on the screen can look cluttered and overwhelming.
- Consider how users hold their devices when placing your interactive components. Can they reach the most important buttons with one hand?
- Can you see it? Text on a mobile screen should generally be larger than desktop. 
- Some CSS pseudo-classes do not apply in mobile land... Hover, for example, [is not a thing](https://bootcamp.uxdesign.cc/mobile-doesnt-have-hover-dude-b37e8e0b586e) on mobile.


Most companies will even have a specific style guide for mobile: [Apple Developer Guide: Design Tips](https://developer.apple.com/design/tips/ )

<br>
<br>
<br>

## More Mobile Design Tips

<br>

### Design for the "Thumb Zone"

It's important to consider the positions of the hand(s) when holding a phone and using the thumb as the primary finger for navigating an app. 

<img src="https://miro.medium.com/max/1400/1*p-fi-icTTPpn1FvDAgKZRQ.png">

[source](https://alistapart.com/article/how-we-hold-our-gadgets/)


### Make your buttons descriptive

Well-designed buttons tell the user exactly what will happen when they click. 

<img src="https://assets.justinmind.com/wp-content/webp-express/webp-images/uploads/2020/07/descriptive-microcopy-button-design.png.webp">

- [source: Tips for styling mobile buttons](https://www.justinmind.com/blog/button-design-websites-mobile-apps/)

### Keep your UI simple and let it breathe 

A simple UI can be a treat to look at and more intuitive to use. Better to add extra screens (pages) than to try and fit more on one screen.  
Allow extra space (padding and margin) around your elements. Your eyes will thank you. 

Here is some simple mobile design inspiration:

<img src="https://cdn.dribbble.com/users/2461751/screenshots/11431532/media/ea8130287e3561e0325788b545c81c02.png"/>

[source: Flower App](https://dribbble.com/shots/11431532-Flower-app/)

<img src="https://cdn.dribbble.com/users/1192538/screenshots/15613933/media/02d38c0514ace97c07e9dc1cc8586900.png?compress=1&resize=1200x900&vertical=top"/>

[source: Taxi Booking App](https://dribbble.com/shots/15613933-Taxi-booking-app)

<img src="https://cdn.dribbble.com/users/1192538/screenshots/15723703/media/54ca035a33f31d7b49ece80a7416089b.png"/>

[source: Salon App](https://dribbble.com/shots/15723703-Salon-App/)

### The bottom Nav is where it’s at

- No really, that is where it's at, or [should be](https://uxplanet.org/perfect-bottom-navigation-for-mobile-app-effabbb98c0f) on mobile. 

<img src="https://miro.medium.com/max/1400/1*d55w8RiaAGkt2UvdpK5OvQ.png" />

<br>
<br>
<br>

## Ready to test your skills in building a mobile site? 

#### ** Group Activity ** (15 min)

Discuss and design the following:
 - The Model(s) schema
 - Pages needed
 - Navigation Items
 - Any mobile specific considerations

 Present your ideas to the class.


#### Groups

1. **Trello** - Build faux Trello. Users should be able to add lists with task cards.

- Default data: none
- Models: lists by date, cards by list
- Stretch Goals: add additional model tags to cards

2. **Chat Application** - Think Slack or Teams. Display messages back and forth in the UI like a real chat conversation between two faux authenticated users.

- Default data: none
- Models: messages by user
- Stretch Goals: add real authentication

3. **Personal Calendar** - A mobile-friendly calendar with the ability to add events to plan your days.

- Default data: current date
- Models: events by date
- Stretch Goals: add weather api to display daily forecast

4. **Tamagotchi** - This thing will need all of your undivided attention. Feed, clean, play - all the essentials need to be accounted for. 

- Default data: list of predefined creature requirements
- Models: tracked activities by date
- Stretch Goals: add modals for real-time alerts, add additional model for multiple creatures

5. **My McFood App** - Fully branded faux fast food POS system.

- Default data: list of predefined menu items
- Models: orders by user
- Stretch Goals: add image icons for menu items, add real authentication

6. **Baby Tracking App** - A place to track all the essential daily needs of a tiny human. 

- Default data: list of predefined baby activities, (feed, change, sleep...)
- Models: activities by date
- Stretch Goals: Add a timer feature for real-time tracking activities

7. **Twitter** - An everybody feed that displays all users' tweets in chronological order, plus a personal feed by the user
- Default data: none
- Models: tweets by user
- Stretch Goals: add real Authentication

8. **Post Grub Insta Door Hub Dash Cart Mates** - A food ordering delivery system from 3 faux favorite restaurants.

- Default data: shortlist of predefined menu items for 3 faux restaurants
- Models: orders by user
- Stretch Goals: Use Google maps to display a pin at the users address, add an additional model for menu items by restaurant

9. **Salon/Barber service booking app** - a place to schedule all your self-care activities. 

- Default data: list of predefined services offered
- Models: booked services by user
- Stretch Goals: step up your css game and make this app B-E-A-utiful.

10. **Weekly Meal Planning App** - Meal prep is easy when you have a plan. Users can choose a breakfast, lunch, and dinner for each day.

- Default data: list of predefined meal ideas
- Models: meals by date
- Stretch Goals: add api to get new meal ideas, add an additional model for meals, refactor hardcoded meal ideas
