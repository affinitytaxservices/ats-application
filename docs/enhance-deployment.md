# Enhance Control Panel Deployment Guide (ATS Application)

This guide walks you through deploying the ATS application (React + Node/Express + MySQL) on an Enhance hosting control panel. It covers a single Node app serving the React build, and a split frontend/API setup.

## Overview

- Frontend: Create React App, built into `build/` using `npm run build`.
- API: Node/Express serving static `build/` and API routes from `server/index.js`.
- Database: MySQL via `server/db.js`.
- Optional integration: WhatsApp Business API webhooks and messaging.

Key code references:
- Serve React build and SPA fallback: `server/index.js:60–66`
- App port: `server/index.js:68`
- CORS allowed origins: `server/index.js:11–18`
- MySQL connection: `server/db.js:3–12`
- JWT middleware: `server/middleware/authMiddleware.js:1–16`
- Frontend API base URL: `src/services/taskAPI.js:4`
- WhatsApp API client: `server/services/whatsappClient.js:1–12`
- WhatsApp webhook verification/signature: `server/routes/whatsapp.js:7–31`

## Prerequisites

1. Domain(s) ready (e.g., `www.affinitytaxservices.com` and `api.affinitytaxservices.com`).
2. MySQL database and user created (or ability to create via Enhance panel).
3. Node.js LTS (v18+) available in Enhance.
4. SSL certificates via Enhance (Let’s Encrypt or similar).

## Prepare the Build

Choose where the frontend is built:

- Build on the server in Enhance (recommended): set `REACT_APP_API_URL` in Enhance environment, then run `npm run build` during deployment.
- Build locally: set `REACT_APP_API_URL` in local `.env`, run `npm run build`, and deploy the `build/` directory along with the server code.

Commands (local):

```
npm install
npm run build
```

## Decide Deployment Model

You can deploy as:

1) Single Node app
- One app that serves the React `build/` and API.
- Start command: `npm run start:server` (defined in `package.json`).

2) Split frontend and API
- Static site for `www` serving only the contents of `build/`.
- Separate Node app for API on `api` subdomain.
- Frontend built with `REACT_APP_API_URL=https://api.affinitytaxservices.com/api`.

## Configure Database

1. In Enhance, create a MySQL database and user.
2. Note host, database name, username, and password.
3. Initialize tables:
   - Import your main schema (see `setup_database.sql` mentioned in README).
   - For WhatsApp features, run `server/migrations/whatsapp_tables.sql` or execute `node server/setup-whatsapp-tables.js` on the server.

## Environment Variables

Add these in Enhance (Application → Environment or Secrets):

- `NODE_ENV=production`
- `PORT` (if Enhance requires a specific internal port; otherwise leave unset)
- `DB_HOST` (Enhance DB host or `localhost` when local)
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `JWT_SECRET` (strong value)
- `REACT_APP_API_URL` (e.g., `https://api.affinitytaxservices.com/api`)
- Optional (WhatsApp):
  - `WHATSAPP_ACCESS_TOKEN`
  - `WHATSAPP_PHONE_NUMBER_ID`
  - `WHATSAPP_VERIFY_TOKEN`
  - `WHATSAPP_APP_SECRET`

Ensure your deployed domains are in CORS allowed origins (`server/index.js:11–18`). Add new origins if needed and redeploy.

## Enhance UI Steps — Single Node App

1. Create site/app
   - In Enhance, add a new application (subdomain like `api.affinitytaxservices.com` or your main domain).
   - Select Node.js runtime (v18+).

2. Upload code
   - Connect repository (Git) or upload files via SFTP.
   - App root should contain `package.json`.

3. Configure environment
   - Add variables listed above.

4. Build and start
   - Pre-start/build command: `npm run build`.
   - Start command: `npm run start:server`.
   - The server serves `build/` and APIs (see `server/index.js:60–66`).

5. SSL and domains
   - Attach your domain, enable HTTPS via Enhance.

6. Verify
   - Open `https://www.affinitytaxservices.com/` for the frontend.
   - Check `https://api.affinitytaxservices.com/health` for API health.

## Enhance UI Steps — Split Frontend/API

Frontend (static):
1. Create a site for `www.affinitytaxservices.com` or your root domain.
2. Upload only the `build/` directory contents.
3. Set web root to the uploaded `build/`.
4. Ensure `REACT_APP_API_URL` was set before building.

API (Node app):
1. Create a Node app for `api.affinitytaxservices.com`.
2. Upload server code and the `build/` (if you also want server to serve SPA fallback).
3. Set environment variables.
4. Start with `npm run start:server`.

## Enhance UI Steps — Upload From Local (No Git)

If you prefer to deploy without connecting a Git repository, use the Enhance File Manager or SFTP to upload artifacts from your local machine.

1) Prepare locally
- Set frontend API base before building: add `.env` with `REACT_APP_API_URL=https://api.affinitytaxservices.com/api` (or `/api` if proxying via the same domain).
- Build the frontend: `npm run build` (or `npm run build:prod`). This creates `build/`.
- Zip frontend `build/` and the backend project (server code and `package.json`).

2) Upload frontend
- Enhance → Websites → Your site (e.g., `www.affinitytaxservices.com`) → File Manager.
- Upload `build.zip` to the web root and Extract. Set web root to the extracted `build/` contents if required.
- SPA routing: enable “fallback to index.html” (static site option) so client routes work.

3) Upload backend API
- Enhance → Applications → Add Node.js app (e.g., `api.affinitytaxservices.com`).
- Upload your backend zip to the app directory and Extract so `package.json` is at the root.
- Environment variables (Application → Environment):
  - `NODE_ENV=production`
  - `PORT=5000`
  - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME=ats_DB`
  - `JWT_SECRET=<strong_random_value>`
  - Optional WhatsApp variables if used
- Start commands:
  - Pre‑start: `npm install --production`
  - Start: `npm run start:server` (runs `node server/index.js`)

4) Routing options
- Split domains: point `api.affinitytaxservices.com` to the Node app; set frontend `REACT_APP_API_URL=https://api.affinitytaxservices.com/api`.
- Single domain with proxy: configure the site to proxy `/api` to `http://localhost:5000/api`; then build frontend with `REACT_APP_API_URL=/api`.
- CORS: ensure your domains are present in `allowedOrigins` (`server/index.js:11–20`). Add any new domains and redeploy.

5) Database setup (no git)
- Enhance → Databases → Create MySQL DB `ats_DB` and a user.
- Import schema using the panel’s SQL import: upload `setup_database.sql`.
- Record DB host, user, pass; set them in API environment variables above.

6) Verify
- Frontend: visit `https://www.affinitytaxservices.com/` and navigate between pages.
- API health: `https://api.affinitytaxservices.com/health` (or `/api/health` on the same domain) should return `{ status: 'ok' }`.
- Auth: login via `POST /api/auth/login` and use the app; protected endpoints should work with the JWT.

7) Update cycle (no git)
- Rebuild locally if you change frontend env or UI: `npm run build`.
- Re‑upload changed files (File Manager or SFTP) to the web root for frontend.
- For backend changes, re‑upload project files and restart the Node app in Enhance.
- Re‑verify health and core flows.

Troubleshooting (no git)
- Frontend calling `localhost`: rebuild with correct `REACT_APP_API_URL` or set it in Enhance before building server‑side.
- 401 Unauthorized: ensure you are logging in and `JWT_SECRET` is set.
- CORS errors: add your domain to `allowedOrigins` (`server/index.js:11–20`).
- API unreachable: confirm Node app is running on `PORT=5000` and proxy rules are correct.

## Backend API Setup — affinitytaxservices.com

Use this step‑by‑step to bring the Node/Express API online alongside your already uploaded frontend.

1) Create the API app in Enhance
- Applications → Add Node.js app
- Domain: `api.affinitytaxservices.com` (recommended) or keep it on the main domain if you will proxy `/api`
- Runtime: Node.js v18+

2) Upload backend files (no git)
- Upload a zip of your project to the app directory and Extract so `package.json` is at the app root
- Alternatively use SFTP to place files under `/var/www/ats-application`

3) Configure environment
- Applications → Environment:
  - `NODE_ENV=production`
  - `PORT=5000`
  - `JWT_SECRET=<strong_random_value>`
  - `DB_HOST=<your_mysql_host>`
  - `DB_USER=<your_mysql_user>`
  - `DB_PASSWORD=<your_mysql_password>`
  - `DB_NAME=ats_DB`
  - Optional WhatsApp keys if you enable those features
- Ensure CORS includes your domains (`server/index.js:11–20` already lists `https://www.affinitytaxservices.com` and `https://api.affinitytaxservices.com`)

4) Install and start
- Pre‑start command: `npm install --production`
- Start command: `npm run start:server`
- The API listens on `http://localhost:5000` and serves health at `/health`

5) Routing options
- Subdomain model (recommended):
  - Point `api.affinitytaxservices.com` to the Node app
  - Frontend should be built with `REACT_APP_API_URL=https://api.affinitytaxservices.com/api`
- Single domain proxy:
  - Configure your main site to proxy `/api` → `http://localhost:5000/api`
  - Build frontend with `REACT_APP_API_URL=/api`

6) Database setup
- Enhance → Databases → Create MySQL database `ats_DB` and a user
- Import schema with the panel’s SQL import (`setup_database.sql`)
- Use the DB credentials in the API environment above

7) Verify API
- Health: `https://api.affinitytaxservices.com/health` returns `{ status: 'ok' }`
- Auth: `POST https://api.affinitytaxservices.com/api/auth/login` returns token and user
- Tasks: `GET https://api.affinitytaxservices.com/api/tasks` returns data when authenticated

8) Align frontend → API
- If you used the subdomain, confirm your deployed frontend was built with `REACT_APP_API_URL=https://api.affinitytaxservices.com/api`
- If you used the proxy, confirm `/api/*` routes on `www.affinitytaxservices.com` reach the backend

9) Troubleshooting
- 401 Unauthorized: login first; token is saved by the frontend and sent on subsequent requests
- CORS blocked: add domains to `allowedOrigins` and restart the app
- ECONNREFUSED from proxy: ensure the Node app is running on port `5000`

## WhatsApp Webhook (Optional)

1. Endpoint: `https://api.affinitytaxservices.com/api/whatsapp/webhook` (see `server/routes/whatsapp.js`).     
2. In Meta developer settings:
   - Set Webhook URL to the above.
   - Verify Token matches `WHATSAPP_VERIFY_TOKEN`.
   - App Secret matches `WHATSAPP_APP_SECRET`.
3. The app validates signatures (`server/routes/whatsapp.js:33–44`) and handles messages via the bot (`server/services/whatsappBot.js`).

## Verification Checklist

- Frontend loads and routes work (SPA fallback served by server).
- `GET /health` returns JSON `{ status: 'ok' }`.
- Login works: `POST /api/auth/login` (see `server/routes/auth.js`).
- Auth-protected routes work with a valid JWT.
- CORS permits your domain(s) (adjust `server/index.js` if needed).
- Database queries succeed (e.g., admin analytics in `server/routes/admin.js`).
- WhatsApp webhook verifies if enabled.

## Troubleshooting

- Frontend calling `localhost`: rebuild with correct `REACT_APP_API_URL` or set it in Enhance before build.
- 401s everywhere: set a strong `JWT_SECRET` in environment.
- CORS blocked: add your domain to `allowedOrigins` in `server/index.js:11–18`.
- MySQL auth errors: confirm `DB_*` vars and user privileges.
- Port issues: set `PORT` to the value expected by Enhance; app listens on `process.env.PORT || 5000`.
- Static files 404: ensure `build/` exists and server serves it (`server/index.js:60–66`).

## Updating/Redeploying

1. Push code changes or re-upload.
2. If changing frontend env, rebuild (`npm run build`).
3. Restart the Node app in Enhance.
4. Verify `GET /health` and key flows.
