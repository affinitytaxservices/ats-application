# Deployment Guide: Node.js + React + MariaDB on Ubuntu

This guide provides step-by-step instructions to deploy your application on an Ubuntu server.

## Prerequisites
- **Local Machine**: Source code, Node.js installed.
- **Server**: Ubuntu with Node.js, MariaDB, and Nginx installed.
- **Access**: SSH access to the server.

---

## Step 1: Prepare the Application Locally

Since we are not using GitHub, we will build the frontend locally and transfer the artifacts.

1.  **Build the Frontend**:
    Open your terminal in the project root and run:
    ```bash
    npm install
    npm run build
    ```
    This creates a `build` folder with your static frontend files.

2.  **Create a Deployment Archive**:
    Create a zip file named `deploy.zip` containing the following files and folders:
    -   `build/` (The folder you just created)
    -   `server/` (Your backend code)
    -   `package.json`
    -   `ecosystem.config.js`
    -   `setup_database.sql` (For initial database setup)
    -   `.env` (Optional: You can create this on the server instead for security)

---

## Step 2: Transfer Files to Server

Use `scp` (Secure Copy) or a tool like FileZilla/WinSCP to upload `deploy.zip` to your server.

**Using SCP (Command Line):**
Replace `user` with your username and `your_server_ip` with your server's IP address.
```bash
scp deploy.zip user@your_server_ip:~/ats-app
```
*(Note: You may need to create the directory `~/ats-app` on the server first).*

---

## Step 3: Server-Side Setup

SSH into your server:
```bash
ssh user@your_server_ip
```

### 1. Extract and Install Dependencies

Navigate to the directory and unzip:
```bash
mkdir -p ~/ats-app
mv deploy.zip ~/ats-app/
cd ~/ats-app
sudo apt-get install unzip  # If not installed
unzip deploy.zip
```

Install production dependencies:
```bash
npm install --production
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:
```bash
nano .env
```

Paste the following content (adjust values for your production database):
```env
PORT=5000
NODE_ENV=production
DB_HOST=localhost
DB_USER=ats_user
DB_PASSWORD=your_secure_password
DB_NAME=ats_db
JWT_SECRET=your_long_random_secret_string
# Add any other required variables
```
Save and exit (`Ctrl+X`, then `Y`, then `Enter`).

---

## Step 4: Database Setup

### 1. Create Database and User

Log in to MariaDB:
```bash
sudo mariadb -u root -p
```

Run the following SQL commands:
```sql
CREATE DATABASE ats_db;
CREATE USER 'ats_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON ats_db.* TO 'ats_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 2. Run Migrations

Initialize the database schema using your migration script:
```bash
npm run migrate
```
*(Or if you need to run the initial SQL file manually: `mariadb -u ats_user -p ats_db < setup_database.sql`)*

---

## Step 5: Start Backend with PM2

Start the application using the existing ecosystem config:
```bash
sudo npm install -g pm2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```
(Run the command output by `pm2 startup` to ensure it starts on reboot).

---

## Step 6: Configure Nginx

Create a new Nginx configuration file:
```bash
sudo nano /etc/nginx/sites-available/ats-app
```

Paste the following configuration:

```nginx
server {
    listen 80;
    server_name your_domain.com www.your_domain.com; # Replace with your actual domain or IP

    root /home/user/ats-app/build; # Verify this path matches your extraction path
    index index.html;

    # Serve Frontend (React)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API Requests to Backend
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Optional: Serve Uploaded Files (if stored locally)
    location /uploads {
        alias /home/user/ats-app/uploads;
    }
}
```
*Note: Replace `/home/user/ats-app` with the actual path where you extracted the files.*

Enable the site and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/ats-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Step 7: SSL Configuration (Optional but Recommended)

Secure your site with HTTPS using Certbot:

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your_domain.com -d www.your_domain.com
```

---

## Verification

1.  Open your browser and navigate to `http://your_domain.com`.
2.  You should see the React application.
3.  Try logging in to verify the database connection.
