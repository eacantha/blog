---
title: "Lessons Learned by Counting Rows From Sheep"
date: 2026-09-21T17:52:36-04:00
draft: false

tags: ["tech", "coding", "crfs"]

featured_image: "crfs-horizontal.jpg"
featured_image_alt: "Count Rows From Sheep"
show_toc: false
---

Whenever learning a new programming language, framework, backend, or tech skill, I have always relied on remaking the same applications: This lets me focus on learning, not product design. Initially, this was a simple to-do list application I called "Forethought," although I also dabbled in [pomodoro timers](https://cozytime.kittenin.space/). But after a time, I wanted to try to make something important to me: And as a knitter and crocheter perpetually unhappy with my row counting applications, I realized what I wanted out of a row counter was what I wanted out of, well, fiber arts in the first place -- a app customized to me.

## Gauge Swatch: The First Version

When I first built **Count Rows From Sheep** -- a name that has persevered through every version -- it was with Node.js and Express, using MongoDB as a database to store row counter and project information. Truth be told, I did not get too far with it: I got the Express server set up, the database schema, an intended item structure, and part of a REST API coded.

But then I saw a new shiny: I had started experimenting with TypeScript and React, and decided to pivot. You might say the gauge swatch worked: It let me realize what I wanted out of the fabric of the application. It was just a little different than what I started with.

## Frogging: Realizing What I Really Wanted (But Only After Making an Entire App)

I started from scratch with version 2. Like the unfinished first iteration, this version of **Count Rows From Sheep** used something JavaScript-esque, with TypeScript, and created an Express RESTful API. I switched the database to Postgres with Prisma, allowing me to logically organize my database tables with schemas and handle project and row counter data without spending too much time on database management. 

I also finally got to the front end, and I admit: I spent most of my time here. There's something to be said about having written the API partially before. TypeScript and Express weren't new to me, and Postgres/Prisma removed some of the weight of database schemas. This let me focus learning more React, building **Count Rows From Sheep** as a single-page application.

[image]

This also let me realize the things I really wanted from both the UI and the application as a whole: Clean, easy-to-use counters that can be visually linked and configured to track repeats, and an affective pattern viewer that let me highlight charts, write annotations, and add text. I also wanted to be able to change themes and settings based on my mood -- I'm a native of the 90s and 00s Internet; I love some color.

[theme image]

Finally, with everything working how I (think) I wanted, I added authentication: This was a progressive web app, after all! If someone other than me wanted to use it, they would need their own account. This was the first time I had ever implemented auth to an app, and I leveraged `bcrypt` and JSON Web Tokens. I also set up invite codes, since I didn't exactly want to release the app to other users yet.

And that's a good thing: Because when I started using it, I realized I kind of hated it.

When I decided to build a progressive web app, it was primarily because I was impressed by the PWA of others: [Dabble Writer](https://www.dabblewriter.com/), in particular, is an application I thought was _really cool_. I wanted to do that! And so I did: But then while using it, I realized that a.) needing the Internet to use my row counter kind of sucked, and b.) I didn't actually care about using the app on multiple devices. I also didn't like the $40+/month bill I was paying Digital Ocean just to use it myself.

## The FO: Count Rows From Sheep

[image]

After a few months of using my PWA web app exclusively, I decided to start fresh again. I wanted to rip out the database in favor of storing project data as JSON files, have it work local-first (and local-only), and provide users the option to use it on their platform of choice (so long as it was a platform I already used and could test it on). This led me to Tauri, which meant I was rewriting the backend again: This time in Rust! I had never actually used Rust before, but the transition to JSON-based project files made this a lot less intimidating than it would have been: It was all CRUD functions! No databases to integrate with! And best of all: It was quick as hell to use. (Well, except for the brief foray into using Android SAF so the user could _see_ their project files in the tablet filesystem, but apparently that was a bad idea.)

With the backend simplified, this let me dive head-first into the frontend again: I kept up with using React, although since I knew I wanted more and more (and more and more) themes, I decided to try out Tailwind CSS. And while I won't say Tailwind is the _only_ reason I was able to implement custom, user-supplied themes, it didn't hurt, either.

Since this was the second time leveraging React for the frontend, I was also able to go in with a better idea of what I wanted and how to get there. For example, one simple quality-of-life feature I was adamant about was the ability to move my row counters to the bottom of the screen, where I can see them best on my tablet.

[image]

I also didn't want to lose portability entirely: But instead of native syncing between devices, which would involve a server and cost money, I developed a simple export/import system. You can save a project -- or _all_ your projects -- exported as a `zip`, then import that `zip` onto a different decide with **Count Rows From Sheep** on it; it doesn't even have to be the same type of device! I work from Windows to Android and occasionally Linux as needed. And it means the application can always be free!

---

I have never finished an application before -- at least not one I wanted to share. But **Count Rows From Sheep** became something more than a learning experience for me: It became a customized application suited to my knitting and crochet needs, like how my knitting and crochet projects are clothes and accessories made just for me and my loved ones. Of course, that doesn't mean I don't want to share, and you can currently download **Count Rows From Sheep** from the [CRFS website](https://crfs.kittenin.space/) for Windows and Linux. Android is still in closed testing, but [drop me an email](mailto:countrowsfromsheep@pm.me) if you want an invite; bonus points if you can take 30 minutes to run through a test survey!