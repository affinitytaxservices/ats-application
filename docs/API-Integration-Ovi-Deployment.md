# Backend API Integration Guide (Ovi Panel)

This document explains, step by step, how to configure your frontend to talk to your backend API after uploading the frontend build to your Ovi panel, using the code and patterns already present in this project.

## Overview
- Frontend uses Axios instances configured in `src/services/api.js` and `src/services/taskAPI.js`.
- Backend is an Express server with CORS, JWT auth, and MySQL in `server/`.
- Environment variables control base URLs, secrets, and DB connectivity.

## Prerequisites
- A deployed frontend build (React) uploaded to Ovi panel (e.g., `public_html`).
- A reachable backend service (Node/Express) exposed over HTTPS with a public domain/subdomain.
- Production environment variables set for both frontend and backend.

---

## 1) Set Up API Endpoint Configuration in Frontend

Your frontend centralizes API configuration here:
- `src/services/api.js` uses `process.env.REACT_APP_API_URL || '/api'` as base
- `src/services/taskAPI.js` uses `process.env.REACT_APP_API_URL || 'http://localhost:5000/api'`

### What to change
Set `REACT_APP_API_URL` to your public backend base URL (including `/api`). For example, if your backend runs at `https://api.affinitytaxservices.com`, then:

File: `.env.production`
```
REACT_APP_API_URL=https://api.affinitytaxservices.com/api
# Optional: if you implement an error collection endpoint
# REACT_APP_ERROR_TRACKING_URL=https://api.affinitytaxservices.com/api/errors
# WebSocket endpoint for real-time task updates
REACT_APP_WS_URL=wss://api.affinitytaxservices.com/ws/tasks
```

Notes:
- In `src/services/api.js`, leaving `API_URL` as `'/api'` works only when frontend and backend share the same domain via reverse proxy. On Ovi panel, you typically host static files separately, so use a full URL as above.
- `src/services/taskAPI.js` builds its own base with `${API_BASE_URL}/tasks`. Ensure `REACT_APP_API_URL` ends with `/api` so `/tasks` resolves to `https://api.affinitytaxservices.com/api/tasks`.

### CORS in the backend
Backend’s CORS allowlist is in `server/index.js`:
```js
const allowedOrigins = [
  'https://www.affinitytaxservices.com',
  'https://affinitytaxservices.com',
  'https://api.affinitytaxservices.com',
  ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:3000'] : [])
];
```
Add your Ovi panel frontend domain (e.g., `https://your-ovi-domain.com`) to `allowedOrigins`. This ensures browsers can call your API cross-origin.

---

## 2) Configure Backend Connectivity

Backend lives under `server/` and uses environment variables for DB and JWT.

### Backend environment variables
Create a `.env` file (loaded by `dotenv` in `server/index.js`):
```
NODE_ENV=production
PORT=5000
JWT_SECRET=change-this-to-a-strong-secret

DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=ats_DB
```

Relevant code:
- DB pool: `server/db.js`
```js
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ats_DB',
});
```
- JWT auth: `server/middleware/authMiddleware.js` verifies `Authorization: Bearer <token>` using `process.env.JWT_SECRET`.
- Auth issuance: `server/routes/auth.js` signs tokens with `JWT_SECRET`.

### Authentication and required headers
Frontend automatically sets headers via Axios interceptors:
- `src/services/api.js` adds `Authorization: Bearer <auth_token>` if present.
- `src/services/taskAPI.js` adds `Authorization` from `localStorage` keys (`auth_token` or mock token during dev).
Backend expects:
- `Content-Type: application/json`
- `Authorization: Bearer <JWT>` for protected routes.

---

## 3) Test the Integration

### Backend endpoints to verify
Use Postman or curl:
1. Login to get a JWT
```
POST https://api.affinitytaxservices.com/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "yourPassword"
}
```
Expect: `{ success: true, token, user }`

2. Call a protected client endpoint
```
GET https://api.affinitytaxservices.com/api/client/dashboard
Authorization: Bearer <token>
```
Expect: dashboard data JSON.

3. Admin-only endpoint (requires `user.role === 'admin'`)
```
GET https://api.affinitytaxservices.com/api/admin/dashboard/stats
Authorization: Bearer <token>
```
Expect: admin stats or `403` if not admin.

### Frontend end-to-end
1. Confirm `.env.production` contains your API URL.
2. Build the frontend:
```
npm run build:prod
```
3. Upload the `build/` output to Ovi panel (e.g., `public_html`). Ensure your SPA routing is compatible with server rewrites (you already have `public/.htaccess`, which CRA copies during build).
4. Visit your frontend domain, login, and navigate dashboards. Watch network calls in the browser devtools to confirm requests hit `https://api.affinitytaxservices.com/api/...` and succeed.

Error handling:
- Frontend interceptors in `src/services/api.js` redirect to `/login` on `401`.
- Confirm proper messages for failed requests (e.g., network errors or `5xx`).

---

## 4) Environment-Specific Configurations

### Frontend
Use `.env.development` and `.env.production`:

`.env.development`
```
REACT_APP_API_URL=http://localhost:5000/api
```

`.env.production`
```
REACT_APP_API_URL=https://api.affinitytaxservices.com/api
# Optional error tracking endpoint if implemented
# REACT_APP_ERROR_TRACKING_URL=https://api.affinitytaxservices.com/api/errors
REACT_APP_WS_URL=wss://api.affinitytaxservices.com/ws/tasks
```

Sensitive credentials must NOT be hardcoded in JS; keep them in envs.

### Backend
`.env` (example):
```
NODE_ENV=production
PORT=5000
JWT_SECRET=change-this-to-a-strong-secret
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=ats_DB
```

Ensure CORS `allowedOrigins` in `server/index.js` includes your Ovi frontend domain.

---

## 5) Monitor and Optimize

### API call logging (frontend)
You already have `src/services/errorTracking.js` which can forward errors:
```js
const ERROR_ENDPOINT = process.env.REACT_APP_ERROR_TRACKING_URL || '/api/errors';
```
If you wish to collect errors centrally, implement an `/api/errors` route on the backend, or point `REACT_APP_ERROR_TRACKING_URL` to an external service. In production, this utility batches and sends errors; in development it logs to console.

### Basic performance monitoring (backend)
You can add minimal latency logging middleware:
```js
// In server/index.js, before routes
app.use((req, res, next) => {
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const ms = Number(end - start) / 1e6;
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} in ${ms.toFixed(1)}ms`);
  });
  next();
});
```

### Error reporting (backend)
Ensure meaningful responses and consistent status codes are returned. Current routes already follow this pattern:
- `401` for missing/invalid token in `authMiddleware`.
- `403` for non-admin access in `server/routes/admin.js`.
- `500` for unexpected errors with safe messages.

---

## Ovi Panel Tips
- Upload the `build/` directory contents under your web root (e.g., `public_html`).
- Ensure HTTPS is enabled; set your API base URL to the HTTPS domain.
- If you proxy your backend under the same domain, you can keep `REACT_APP_API_URL=/api`; otherwise use the full `https://.../api` URL.
- Add your frontend domain to backend `allowedOrigins` for CORS to pass.

---

## Quick Checklist
- Frontend `.env.production` has `REACT_APP_API_URL=https://<your-api-domain>/api`.
- Frontend `.env.production` has `REACT_APP_WS_URL=wss://<your-api-domain>/ws/tasks`.
- Backend `.env` is set with DB and `JWT_SECRET`.
- Backend CORS `allowedOrigins` include your Ovi frontend domain.
- `npm run build:prod` and upload `build/` to Ovi panel.
- Login flow works; protected endpoints return data; admin routes enforce roles.

---

## Live-Only Behavior (No Mock Fallbacks)

- Mock data and fallbacks have been removed from `src/services/api.js` and `src/services/taskAPI.js`.
- All API calls now require a reachable backend; failures bubble up as errors.
- Ensure your backend implements the following routes referenced by the frontend:
  - `POST /api/auth/login`, `POST /api/auth/register`, `GET /api/auth/me`
  - `GET /api/users`
  - Client: `GET /api/client/dashboard`, `GET /api/client/documents`, `GET /api/client/notifications`, `GET /api/client/tax-summary`, `GET /api/client/appointments`
  - Admin: `GET /api/admin/dashboard/stats`, `GET /api/admin/system/health`, `GET /api/admin/audit-logs`, `GET /api/admin/user-activity`, `GET /api/admin/revenue-analytics`, `GET /api/admin/task-analytics`
  - Tasks: `GET /api/tasks`, `GET /api/tasks/:id`, `POST /api/tasks`, `PUT /api/tasks/:id`, `PATCH /api/tasks/:id/status`, `PATCH /api/tasks/:id/assign`, `DELETE /api/tasks/:id`, `POST /api/tasks/:id/comments`, `POST /api/tasks/:id/attachments`

If any of these endpoints are not available on your backend, the corresponding UI will report an error until the route is implemented.

---

## References in This Repo
- Frontend API base: `src/services/api.js`, `src/services/taskAPI.js`
- Error tracking utility: `src/services/errorTracking.js`
- Auth context and token storage: `src/contexts/AuthContext.js`
- Express server + CORS: `server/index.js`
- Auth routes: `server/routes/auth.js`
- Client routes: `server/routes/client.js`
- Admin routes: `server/routes/admin.js`
- DB configuration: `server/db.js`

If you want me to wire up `/api/errors` on the backend or add request timing middleware, I can implement that next.