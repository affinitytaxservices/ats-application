# Affinity Tax Services — Deployment Steps (CentOS/RHEL)

This project uses a React frontend and a Node/Express API with MySQL. OVIPanel hosts the static frontend; the backend API should run on a VPS or managed Node host.

- Host the frontend (React build) on OVIPanel under `www.affinitytaxservices.com`.
- Host the backend API on a CentOS/RHEL VPS and expose it at `api.affinitytaxservices.com`.

---

## 1) Prerequisites

- Domain: `www.affinitytaxservices.com` resolves to OVIPanel (IP: `195.250.21.159`).
- Database (OVIPanel):
  - Name: `ats_DB`
  - User: `ats_dev`
  - Password: `0$5YgB*vmKZV4RxuJ&s#`
- A CentOS 8/Stream (or RHEL 8+) VPS with sudo access.
- Node.js 18+ and npm available on the build machine (can be CentOS).

---

## 2) Database Setup (on OVIPanel)

1. Log into OVIPanel → MySQL Manager.
2. Create database `ats_DB` and user `ats_dev` with the provided password.
3. Grant all privileges for `ats_dev` on `ats_DB`.
4. Import schema:
   - Open phpMyAdmin for `ats_DB`.
   - Import `setup_database.sql` (already uses `USE ats_DB;`).

---

## 3) Backend (API) on CentOS VPS

### Install Node.js 18 and PM2

```bash
sudo dnf install -y curl git
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo dnf install -y nodejs
sudo npm i -g pm2
```

### Deploy the API

1. Copy the `server/` folder to the VPS, e.g., `/var/www/ats-api`.
2. Create `/var/www/ats-api/.env` with:
   ```
   PORT=5000
   DB_HOST=<OVIPanel MySQL host or VPS MySQL host>
   DB_NAME=ats_DB
   DB_USER=ats_dev
   DB_PASSWORD=0$5YgB*vmKZV4RxuJ&s#
   JWT_SECRET=<long-random-string>
   ```
3. Install and start:
   ```bash
   cd /var/www/ats-api
   npm install
   pm2 start index.js --name ats-api
   pm2 save
   ```

### Nginx reverse proxy for `api.affinitytaxservices.com`

```bash
sudo dnf install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

Create `/etc/nginx/conf.d/ats-api.conf` with:
```nginx
server {
  listen 80;
  server_name api.affinitytaxservices.com;

  location /api/ {
    proxy_pass http://127.0.0.1:5000/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location / { return 404; }
}
```

Then reload Nginx:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Firewall and SELinux

```bash
# Allow HTTP/HTTPS
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

# If SELinux is enforcing and proxying fails
sudo setsebool -P httpd_can_network_connect 1
```

### DNS and SSL

- DNS: In OVIPanel, add `api.affinitytaxservices.com` A record → VPS IP.
- SSL (Let's Encrypt for Nginx on CentOS):
  ```bash
  sudo dnf install -y certbot python3-certbot-nginx
  sudo certbot --nginx -d api.affinitytaxservices.com
  ```

Notes:
- If OVIPanel permits Remote MySQL, set `DB_HOST` to the OVIPanel MySQL host and whitelist the VPS IP in Remote MySQL. Otherwise, install MySQL on the VPS and import `setup_database.sql` there.

---

## 4) Frontend (React) on OVIPanel

1. Ensure `.env.production` contains:
   ```
   REACT_APP_API_URL=https://api.affinitytaxservices.com/api
   REACT_APP_USE_MOCK_DATA=false
   ```
   (Alternatively, use `https://www.affinitytaxservices.com/api` if proxying the API on the same domain.)

2. Add SPA routing rules to avoid 404s on deep links:
   Create `public/.htaccess` with:
   ```
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /

     # Don't rewrite API requests
     RewriteRule ^api/ - [L]

     # Serve existing files or directories
     RewriteCond %{REQUEST_FILENAME} -f [OR]
     RewriteCond %{REQUEST_FILENAME} -d
     RewriteRule ^ - [L]

     # Rewrite everything else to index.html
     RewriteRule ^ index.html [L]
   </IfModule>
   ```

3. Build and upload:
   ```bash
   npm install
   npm run build:prod
   # Optionally zip for upload via OVIPanel file manager
   zip -r build.zip build
   ```
   Upload the contents of `build/` to `public_html/` on OVIPanel.

4. SSL: Issue/renew certificates for `www.affinitytaxservices.com` in OVIPanel.

---

## 5) CORS Configuration (Server)

In `server/index.js` use restricted origins:
```js
const cors = require('cors');
app.use(cors({ origin: ['https://www.affinitytaxservices.com', 'https://api.affinitytaxservices.com'] }));
```

---

## 6) Verification

- API health: `GET https://api.affinitytaxservices.com/api/health` → `{ status: 'ok' }`.
- Login test: `POST /api/auth/login` with `{"email":"admin@affinitytax.com","password":"password123"}` → returns `token` and `user` (change the password immediately).
- Frontend: Visit `https://www.affinitytaxservices.com` and navigate dashboards; confirm data loads and no mock warnings.

---

## 7) Maintenance

- Backend: `pm2 restart ats-api` after updates, `pm2 logs ats-api` for errors.
- SSL: renew via certbot or OVIPanel.
- Backups: regularly dump MySQL and store build artifacts.

---

## Troubleshooting (CentOS/RHEL)

- 404 on `/api/health`: DNS or Nginx proxy misconfigured; confirm subdomain and Nginx site.
- DB connection errors: verify credentials, host reachability, Remote MySQL whitelist, and SELinux/network allowances.
- CORS errors: ensure allowed origin matches the live domain(s).
- Mixed content: ensure HTTPS is enabled on both domains.
- SELinux blocking proxy: ensure `httpd_can_network_connect` is enabled as above.
- Firewall: confirm HTTP/HTTPS services are open via `firewall-cmd`.