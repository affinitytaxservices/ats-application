# Backend-Server Connection Guide

This guide explains, in simple steps, how to connect the backend server to the frontend and deploy it for this project.

## 1) Prerequisites

1. Install required software:
   - Node.js 16+ and npm
   - MySQL database
   - Optional: cURL or Postman for testing APIs
2. Project structure expectations:
   - `server/` contains Express server (`server/index.js`)
   - `src/` contains React app
   - `build/` holds the production build after running `npm run build:prod`
   - Health endpoint exists at `server/index.js:37-40`

## 2) Step-by-Step Implementation

1. Set up the server environment
   - Create a `.env` file in the project root with required variables:
     ```env
     NODE_ENV=production
     PORT=5000
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=
     DB_NAME=ats_DB
     JWT_SECRET=replace_with_strong_secret
     REACT_APP_API_URL=http://localhost:5000/api
     ```
   - Install dependencies:
     ```bash
     npm ci
     ```
   - Build frontend (for production serving):
     ```bash
     npm run build:prod
     ```

2. Create a basic API endpoint
   - The server already has a health check in `server/index.js:37-40`:
     ```js
     app.get('/health', (req, res) => {
       res.json({ status: 'ok', timestamp: new Date().toISOString() });
     });
     ```
   - Example of an additional simple endpoint:
     ```js
     app.get('/api/ping', (_req, res) => {
       res.json({ ok: true });
     });
     ```

3. Connect frontend to backend
   - Set `REACT_APP_API_URL` to your server base, e.g. `http://localhost:5000/api` for local or `https://your-domain.com/api` in production.
   - Call the API from the frontend (React) using Axios:
     ```js
     import axios from 'axios';
     const API = process.env.REACT_APP_API_URL || '/api';
     async function fetchHealth() {
       const res = await axios.get(`${API.replace(/\/$/, '')}/health`);
       return res.data;
     }
     ```

4. Test the connection
   - Start the server:
     ```bash
     npm run start:server
     ```
   - Open a browser or use cURL:
     ```bash
     curl http://localhost:5000/health
     ```
   - In development, `npm start` runs the React dev server; calls to `/api` will proxy to `http://localhost:5000` (`package.json:108`).

## 3) Project-Specific Configuration

1. Required environment variables
   - Server:
     - `NODE_ENV`, `PORT`
     - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
     - `JWT_SECRET`
     - Optional: `ALLOW_DEV_ANON` (use `0` in production)
     - Optional mail: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_REJECT_UNAUTH`, `SMTP_FROM`
     - Optional WhatsApp: `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_APP_SECRET`
   - Frontend:
     - `REACT_APP_API_URL` (and optionally `REACT_APP_WS_URL`, `REACT_APP_ERROR_TRACKING_URL`)

2. Security considerations
   - Use a strong `JWT_SECRET` and never expose secrets via `REACT_APP_*` variables.
   - Restrict CORS to your domains in `server/index.js:11-31`.
   - Do not log tokens or passwords.

3. Error handling basics
   - Server returns JSON with error messages and appropriate HTTP status codes.
   - Frontend wraps app in an error boundary and tracks errors (`src/components/common/ErrorBoundary.js:1-26`).

## 4) Verification Steps

1. Confirm server is running
   - Visit `http://localhost:5000/health` and expect a JSON response with `status: "ok"`.

2. Test frontend to backend
   - In dev: run `npm start` and open `http://localhost:3000`. Trigger an API call and check your browser’s Network tab.
   - In prod: ensure `npm run build:prod` was run and the server serves `build/` (`server/index.js:65-78`).

3. Troubleshooting tips
   - CORS blocked: add your domain to `allowedOrigins` in `server/index.js:11-31`.
   - 401 Unauthorized: set `JWT_SECRET` and send a valid `Authorization: Bearer` token when required.
   - DB errors: verify `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` and that the database is reachable.
   - Missing build: run `npm run build:prod` before starting production.

4. Basic debugging techniques
   - Use terminal logs from `npm run start:server`.
   - Test endpoints with cURL/Postman.
   - Check `.env` values are loaded; for scripts that need env, run with `node -r dotenv/config`.
   - Inspect browser dev tools Network tab for request/response details.

## Useful References
- Server health and static serving: `server/index.js:37-40`, `server/index.js:65-78`
- API base URL: `src/services/api.js:5`
- Database pool config: `server/db.js:4-7`
- Auth middleware and JWT: `server/middleware/authMiddleware.js:1-29`
