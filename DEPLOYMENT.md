# Deployment Guide: Enhance Control Panel (No GitHub)

## Overview
- React frontend built with Create React App, served by Express.
- Express serves the production build from `build/` and exposes APIs under `/api`.
- MySQL is required; configure credentials via environment variables.

## Prerequisites
- Node.js 16+ and npm available in your Enhance app environment.
- MySQL database with host, user, password, and database name.
- Ability to upload files via File Manager or SFTP/SSH.

## Environment Variables
Configure in the Enhance control panel for your app:
- `NODE_ENV=production`
- `PORT=5000` (or the panel-assigned port)
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `JWT_SECRET` (strong, non-default value)
- `REACT_APP_API_URL=https://affinitytaxservices.com/api`
- Optional mail: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_REJECT_UNAUTH`, `SMTP_FROM`
- Optional WhatsApp: `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_APP_SECRET`

## Upload Without GitHub
### Option A: Upload source and build on the server
1. Zip the project locally, excluding `node_modules`.
2. Upload the zip to the Enhance app directory via File Manager or SFTP.
3. Extract so the root contains `package.json`, `server/`, `src/`, `public/`, etc.
4. Install dependencies and build on the server:
   ```bash
   npm ci
   npm run build:prod
   ```

### Option B: Build locally and upload artifacts
1. On your machine:
   ```bash
   npm ci
   npm run build:prod
   ```
2. Upload the project excluding `node_modules`, but include the `build/` directory.
3. On the server, still run:
   ```bash
   npm ci
   ```

## Database Setup
Run migrations after database env vars are configured:
```bash
npm run migrate
```
Optional demo seed (development only):
```bash
npm run seed
```

## Configure Enhance App
- Start command:
  ```bash
  npm run start:server
  ```
- Build command (if your panel supports a build step):
  ```bash
  npm run build:prod
  ```
- Working directory: set to the folder containing `package.json`.

## CORS Configuration
If your production domain is not already allowed, add it to `allowedOrigins` in `server/index.js` and redeploy/restart.

## Verify Deployment
- Health check: visit `https://affinitytaxservices.com/health`.
- Test UI pages and `/api` endpoints.
- Check logs in the Enhance panel for errors.

## Troubleshooting
- Missing `build/`: run `npm run build:prod` before starting the server.
- Database errors: verify `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
- Unauthorized (401): set `JWT_SECRET` and ensure clients send `Authorization: Bearer <token>`.
- CORS blocked: add your domain to `allowedOrigins` in `server/index.js`.
- Wrong API URL: ensure `REACT_APP_API_URL` points to your server domain `/api`.

## References
- Build serving: `server/index.js:65-78`
- Health check: `server/index.js:37-40`
- Start script: `package.json:55`
- Build scripts: `package.json:53-54`
- API base URL: `src/services/api.js:5`
- DB config: `server/db.js:4-7`
- Migrations: `server/scripts/run_migrations.js:5-18`
