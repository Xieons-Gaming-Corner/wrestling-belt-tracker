# XGC Wrestling Belt Tracker

A static, mobile-friendly checklist adapted from the supplied Discord tracker.

## Publish on GitHub Pages

1. Create a new public repository, for example `wrestling-belt-tracker`.
2. Upload the contents of this folder to the repository root. `index.html`, `styles.css`, and `app.js` must be together.
3. Commit the files to `main`.
4. Open repository Settings > Pages.
5. Under Build and deployment, select Deploy from a branch.
6. Choose main and / (root), then Save.
7. Wait for deployment and use the website link shown in Pages settings.

Use a separate repository if another repository already hosts an existing website.

## Use

- Check or uncheck weapons directly.
- Toggle Show remaining only to hide completed weapons.
- Reset progress clears the current checklist after confirmation.
- At 18/18 the progress panel turns gold.

## Progress lifetime

Progress exists only in JavaScript memory. No localStorage, sessionStorage, cookies, database, login, or Discord integration is used. Refreshing starts a fresh checklist. Opening a separate page creates its own checklist. Closing the page discards this app's in-memory progress; browser tab-suspension and session-restoration behavior is controlled by the browser. A back/forward-cache restoration explicitly resets progress.

The page does not send weapon completion to GitHub or Discord. GitHub still serves the public website and may process ordinary hosting request logs.

## Local preview

Extract the archive, then open index.html in a browser. Keep styles.css and app.js beside it.

## Edit weapons

Edit the weapons array near the top of app.js. Progress totals are calculated automatically by JavaScript.

## Files

- index.html: page layout
- styles.css: appearance and responsive styling
- app.js: weapon data and interactive checklist
- .nojekyll: bypass Jekyll processing

Weapon names and locations are copied from the supplied tracker and have not been independently verified.
