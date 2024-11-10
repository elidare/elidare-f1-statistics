# elidare-f1-statistics
A fullstack studying project for LUT Master's, 2024.

Public URL https://elidare-f1-statistics.netlify.app/.

The project uses the public API https://ergast.com/mrd/ that provides statistics on seasons, e.g. what racing tracks were used, what drivers were present on track and what teams they were in.

This visualisation helps fans to quickly access the basic information of a specific season or driver, which can be useful in any discussions on the subject.

## To-do
- CircuitMap css for header
- circuits api: body is 4-digit, return empty result if request is incorrect
- think of more statistics to display
- make the page look nice
- take care about todos

## Project history
Initially this project was supposed to include both frontend and backend. We had to create a public URL for the project in the very beginning, so Netlify was chosen as something we tried to hello-world in the beginning of the course.

I am a Manual QA, and my stack usually includes Python nowadays, and I did a lot of vanilla Javascript years ago as a Frontend Developer. I don't have experience with neither React nor Express at all, so at first I chose this stack to try it and familiarize with it.
My plan was:
Visualization on d3 <- React frontend <- Express backend as a server -> [a third-party API](https://ergast.com/mrd/)

I started with the backend part, because it looked more unfamiliar and it seemed like a usual flow when building an application, first API, then frontend calling this API. So my first step was to create an Express API running on Netlify - it turned out that Netlify doesn't support servers and uses Netlify Functions for this. I made it work, at least one API endpoint was ready and deployed.

Having started to create and deploy frontend, I encountered quite a lot of complications. Building the app on Netlify was not obvious, hours spent on experiments, talking to chatGPT and googling. Finally, public URL showed the `index.html` instead of 404, but guess what - Netlify function for `/api/` started to return 404 instead of data. Quick googling didn't help. Asking chatGPT didn't help.

At this point I took a deep breath and had a look at the project. Main points I noticed:
- I am very short of time, so I need to focus on something that will be working good enough. In addition I have several projects for other university courses, that also require my attention and effort.
- I wanted to include Express only for the sake of learning it and server architecture, but at the moment it is not just Express, but a very narrow specific feature Netlify functions that causing problems. I keep solving more Netlify issues than Express, which is not my goal with this project.
- This project doesn't really require backend (as I said, I included backend for the sake of including backend), so best practice would be to follow Keep It Simple Stupid principle.

Considering all said above, I decided to delete everything I have done with backend and just do a nice working SPA.
