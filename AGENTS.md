# Notes for the AI assistant working on this site

- Plain static site: HTML + one CSS file + vanilla JS. No frameworks, no build step. Keep it that way unless the owner asks.
- `assets/js/projects.js` is the single list of projects. Group pages, home sectors, map and project count all read it. When adding or renaming a project, update this file and the matching `projects/<slug>.html`.
- Project write-ups come from `content/projects/<slug>.md`. Use them as the source text for the project pages.
- New project pages: copy `projects/_template.html`. Match the layout of `projects/vulnerability-assessment.html` (a finished page).
- Header, strip and footer are repeated on every page. Change them everywhere at once.
- Paths: pages in `work/` and `projects/` use `../` to reach the root (`<body data-root="../">`). Keep that pattern.
- Styling: use the CSS colour variables in `assets/css/site.css` (dark theme default, light theme under `:root[data-look="light"]`). Don't hard-code new colours.
- Writing style: plain, simple English. Short sentences.
