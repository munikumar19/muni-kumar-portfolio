# K Muni Kumar — Python Full-Stack Developer Portfolio

A responsive, single-page portfolio built with HTML, CSS and vanilla JavaScript. The visual identity preserves the cream, forest-green and terracotta palette, with a matching deep-forest dark theme.

## Features

- Responsive navigation with animated mobile menu
- Persistent light/dark theme toggle
- Scroll progress indicator, section reveal animations and reduced-motion support
- Project previews with expandable case-study details
- Skills grouped by programming languages, frontend, backend, databases and tools
- Experience, education and certification sections
- Conceptual full-stack request-flow diagram
- GitHub and LeetCode profile links
- Netlify contact form and thank-you page
- Resume and professional photo stored locally in `assets/`

## Run locally

This is a static website. No `npm install` or build step is required.

1. Extract the project folder.
2. Open `muni-kumar-portfolio-enhanced` in Visual Studio Code.
3. Open `index.html` with the Live Server extension, or serve the folder with any static HTTP server.

## Deploy

The project can be deployed as a static site to Netlify. Keep `index.html`, `thank-you.html`, `styles.css`, `script.js`, `netlify.toml` and the `assets/` folder in the published root. The contact form uses Netlify Forms and needs to be tested after deployment.

## Customization

- Update personal content and links in `index.html`.
- Update theme colours and layout in `styles.css`.
- Replace files in `assets/` only when updating the portrait or resume; keep the filenames referenced by the HTML.

## Notes

- The architecture diagram is an illustrative example of a common React-to-Django REST-to-database request flow; it does not claim that every showcased project uses that exact architecture.
- GitHub contribution artwork is loaded from an external chart service. It requires an internet connection.
- The cursor aura is desktop-only and is disabled for users who prefer reduced motion.

### Certificates
The certifications section links to the NSIC Data Science project certificate, NPTEL soft-skills certificate and IBM Data Fundamentals certificate using the Google Drive URLs included in the supplied resume.
