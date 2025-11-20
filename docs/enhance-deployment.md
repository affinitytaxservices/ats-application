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
- Frontend built with `REACT_APP_API_URL=https://api.yourdomain.com/api`.

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
- `REACT_APP_API_URL` (e.g., `https://api.yourdomain.com/api`)
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

## Ubuntu 24 Deployment (Node.js + MySQL 8.1)

Server: `195.250.21.159`

Domain: `www.affinitytaxservices.com`

Project name: `ats-application`

App name (PM2/Nginx): `ats-application`

Entry file: `server/index.js`

App port: `5000`

Database:
- Name: `ats_DB`

### 1) Server Preparation

- Verify Node.js installation:
  - `node -v`
  - `npm -v`
- Confirm MySQL 8.1 is running:
  - `sudo systemctl status mysql`
- Create dedicated MySQL DB and user:
  - `sudo mysql -u root`
  - `CREATE DATABASE ats_DB;`
  - Create a user and grant privileges using your chosen username and a strong password.
  - Flush privileges when done.

### 2) Project Setup

- Clone or upload to `/var/www/ats-application`:
  - `sudo mkdir -p /var/www/ats-application`
  - `sudo chown -R $USER:$USER /var/www/ats-application`
  - Upload repo contents into that directory or clone:
    - `cd /var/www/ats-application`
    - `git clone <repo-url> .` (or SFTP upload)
- Install dependencies:
  - `npm install --production`
- Build frontend:
  - Ensure `REACT_APP_API_URL=https://api.affinitytaxservices.com/api` (or your API domain)
  - `npm run build`

### 3) MySQL Configuration

- Database config file (if desired for reference): `config/database.js`
```
module.exports = {
  host: 'localhost',
  user: 'ats_user',
  password: '<secure_password>',
  database: 'ats_DB',
  port: 3306
}
```
- Note: the application reads DB settings from environment variables via `server/db.js`, prefer setting env variables rather than committing secrets in files.

### 4) Environment Configuration

- Create `.env` in project root (do not commit):
```
NODE_ENV=production
PORT=5000
JWT_SECRET=<secure_random_value>
DB_HOST=localhost
DB_NAME=ats_DB
REACT_APP_API_URL=https://api.affinitytaxservices.com/api
WHATSAPP_ACCESS_TOKEN=<optional_if_used>
WHATSAPP_PHONE_NUMBER_ID=<optional_if_used>
WHATSAPP_VERIFY_TOKEN=<optional_if_used>
WHATSAPP_APP_SECRET=<optional_if_used>
```

### 5) Process Management (PM2)

- Install PM2:
  - `sudo npm install -g pm2`
- Start application:
  - `cd /var/www/ats-application`
  - `pm2 start server/index.js --name "ats-application"`
- Generate startup script:
  - `pm2 startup ubuntu`
  - Follow the printed command (e.g., `sudo env PATH=$PATH:/usr/bin pm2 startup ubuntu -u <user> --hp /home/<user>`)
- Save process list:
  - `pm2 save`

### 6) Nginx Reverse Proxy

- Install Nginx:
  - `sudo apt install nginx`
- Create site config at `/etc/nginx/sites-available/ats-application`:
```
server {
  listen 80;
  server_name www.affinitytaxservices.com affinitytaxservices.com;

  location / {
    proxy_pass http://127.0.0.1:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```
- Enable site:
  - `sudo ln -s /etc/nginx/sites-available/ats-application /etc/nginx/sites-enabled/`
- Test and restart:
  - `sudo nginx -t && sudo systemctl restart nginx`
- Optional: set up HTTPS via Let’s Encrypt (recommended).

### 7) Security

- Firewall:
  - `sudo ufw allow 80`
  - `sudo ufw allow 443`
  - If exposing app port directly (not typical behind Nginx): `sudo ufw allow 5000`
- Automatic security updates:
  - `sudo apt install unattended-upgrades`
  - `sudo dpkg-reconfigure --priority=low unattended-upgrades`
- Fail2ban:
  - `sudo apt install fail2ban`
  - Basic SSH jail is enabled by default; customize `/etc/fail2ban/jail.local` as needed and restart: `sudo systemctl restart fail2ban`

### 8) Monitoring

- Log rotation for PM2 logs: create `/etc/logrotate.d/pm2`:
```
/home/*/.pm2/pm2.log /home/*/.pm2/logs/*.log {
  daily
  missingok
  rotate 14
  compress
  delaycompress
  notifempty
  copytruncate
}
```
- PM2 monitoring:
  - `pm2 monit`
- System monitoring:
  - `sudo apt install htop`

### Verification

- Navigate to `http://www.affinitytaxservices.com` and verify the app renders.
- Health check: `http://www.affinitytaxservices.com/health` should return `{ status: 'ok' }`.
- API auth: `POST https://www.affinitytaxservices.com/api/auth/login` works with valid credentials.
- CORS: ensure domains are in `allowedOrigins` in `server/index.js:11–18` if you add others.