# Himanshhu Panwar — portfolio website

A plain website (HTML, CSS, JavaScript). No build step, no installs. Open the folder in Google Antigravity (or any code editor) and keep working.

## What's in the folder

```
index.html              Home page (hero, groups, featured work, sectors, map, awards, contact)
timeline.html           Timeline / resume page
work/                   The 5 group pages (they list the project cards)
  climate-risk.html  extreme-heat.html  decarbonisation.html
  sustainable-planning.html  training-research.html
projects/               One page per project, plus columbia-projects.html for the 6 Columbia coursework projects
  _template.html        Copy this to start a new project page
content/projects/       Your notes: one text file per project. Not shown on the site.
images/projects/        Project photos and dashboard screenshots
images/site/            Your photos, award photos, patent certificate
files/                  Put your resume PDF here
assets/css/site.css     All the styling (colours, fonts, layout)
assets/js/projects.js   THE LIST OF ALL PROJECTS (title, group, sectors, place, image, link)
assets/js/site.js       Shared behaviour (dark/light switch, menu, map, sector buttons)
```

## How the pages connect

- Home links to the 5 group pages. Each group page builds its cards from `assets/js/projects.js`.
- Each card links to its project page in `projects/`.
- The sector buttons, the map and the project count on the home page also read `projects.js`.
- The header, top strip and contact footer are copied on every page. If you change one, ask the AI to change it on all pages.

## Which project pages are finished

All project pages are written.


## Day-to-day workflow

1. Fill in a notes file in `content/projects/` (for example `kavaratti-smart-city.md`).
2. Add photos to `images/projects/` (for example `kavaratti-smart-city-1.jpg`). Keep each under about 500 KB.
3. Ask the AI in Antigravity, for example:
   > Update projects/kavaratti-smart-city.html using content/projects/kavaratti-smart-city.md and the photo images/projects/kavaratti-smart-city-1.jpg. Keep the same layout as projects/vulnerability-assessment.html. Remove the draft box.

To add a brand-new project:
   > Add a new project called "X" to the risk group. Add it to assets/js/projects.js, create projects/x.html from projects/_template.html, and use content/projects/x.md.

## Previewing

Double-click `index.html` to open it in a browser, or use Antigravity's preview / a local server. The map library is included in the folder, so the map works offline too. Fonts load from Google Fonts when online.

## Still to do before going live

- Remove the yellow "Draft" bar at the top of every page.
- Add your resume PDF to `files/` and point the "Resume (PDF)" buttons at it.
- Add your real LinkedIn link in the contact footer.
- The contact form only checks the fields; it does not send yet. Hook it to a form service (for example Formspree or Netlify Forms) when you pick hosting.
- Pick hosting: GitHub Pages, Netlify, Vercel or Firebase all work with this folder as it is.
