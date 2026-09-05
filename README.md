# WECARE PLUS

Hospital & Healthcare Service Finder — separated frontend + backend project.

## Structure

- `public/index.html` — HTML/UI
- `public/css/style.css` — all CSS and responsive styles
- `public/js/app.js` — all frontend JavaScript
- `public/images/` — image assets folder
- `server.js` — Node.js + Express backend
- `data/wecare-plus.db` — SQLite database (created automatically)
- `package.json` — dependencies and start script

## Run

```bash
npm install
npm start
```

Then open:

`http://localhost:3000`

## APIs

- `GET /api/health`
- `GET /api/hospitals`
- `GET /api/beds`
- `GET /api/doctors`
- `POST /api/appointments`
- `GET /api/appointments/:bookingId`
- `POST /api/reports`

The UI is branded **WECARE PLUS** and remains responsive for desktop, tablet and mobile screens.
