# Deployment Guide for Affinity Tax Services Application

This guide provides detailed instructions for deploying the application to an Ubuntu server (Enhanced Control Hosting panel) without using GitHub.

## 1. Preparation

### 1.1. System Requirements
*   **OS**: Ubuntu 20.04 LTS or 22.04 LTS recommended.
*   **RAM**: Minimum 1GB (2GB+ recommended for building on server).
*   **Disk Space**: At least 10GB free space.

### 1.2. Local Preparation
Before touching the server, prepare your project locally.

1.  **Update CORS Configuration**:
    Open `server/index.js` and update the `allowedOrigins` array to include your new domain name (e.g., `https://your-domain.com`).
    ```javascript
    const allowedOrigins = [
      'https://www.affinitytaxservices.com',
      // ... existing domains
      'https://your-domain.com', // Add your domain here
      'http://localhost:5000'
    ];
    ```

2.  **Build the Frontend**:
    Open your local terminal in the project root and run:
    ```bash
    npm install
    npm run build
    ```
    This will create a `build` folder containing the optimized frontend application.

2.  **Create a Deployment Archive**:
    Create a ZIP file named `ats-deploy.zip` containing the following files and folders. **Do not** include `node_modules` or `.git`.
    *   `build/` (The folder you just created)
    *   `public/` (Required for static assets like favicon)
    *   `server/` (Backend source code)
    *   `package.json`
    *   `package-lock.json`
    *   `setup_database.sql` (For initial DB setup)

    *Tip: If you are on Windows, you can select these items, Right-Click > Send to > Compressed (zipped) folder.*

### 1.3. Server Access
Ensure you have SSH access to your server.
```bash
ssh username@your_server_ip
```

## 2. Server Configuration

### 2.1. Update System
```bash
sudo apt update
sudo apt upgrade -y
```

### 2.2. Install Dependencies
Install Node.js (v18), MySQL, and Nginx.

**Install Node.js 18:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node -v # Verify installation (should be v18.x.x)
```

**Install MySQL Server:**
```bash
sudo apt install -y mysql-server
sudo mysql_secure_installation
```
*Follow the prompts to secure your MySQL installation.*

**Install Nginx:**
```bash
sudo apt install -y nginx
```

**Install PM2 (Process Manager):**
```bash
sudo npm install -g pm2
```

## 3. Database Setup

### 3.1. Create Database and User
Log in to MySQL:
```bash
sudo mysql -u root -p
```

Run the following SQL commands (replace `your_password` with a strong password):
```sql
CREATE DATABASE ats_db;
CREATE USER 'ats_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON ats_db.* TO 'ats_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3.2. Import Initial Schema
If you uploaded `setup_database.sql`, you can import it. First, verify the database name in the file matches `ats_db` or edit the file to remove the `USE` statement if necessary.

```bash
# Edit setup_database.sql to ensure it uses 'ats_db' or remove 'USE affinity2_dev;'
nano setup_database.sql
# Import
mysql -u ats_user -p ats_db < setup_database.sql
```

## 4. Application Deployment

### 4.1. Upload Files
Use an SFTP client (like FileZilla or WinSCP) or `scp` command to upload `ats-deploy.zip` to your server.
**Target Directory**: `/var/www/ats-application`

```bash
# On your local machine (if using command line)
scp ats-deploy.zip username@your_server_ip:/tmp/
```

**On the Server:**
```bash
# Create directory
sudo mkdir -p /var/www/ats-application
sudo chown -R $USER:$USER /var/www/ats-application

# Unzip (install unzip if needed: sudo apt install unzip)
unzip /tmp/ats-deploy.zip -d /var/www/ats-application
cd /var/www/ats-application
```

### 4.2. Install Dependencies
```bash
npm install --production
```

### 4.3. Configure Environment Variables
Create a `.env` file in the root directory:
```bash
nano .env
```

Paste the following configuration (adjust values as needed):
```env
PORT=5000
NODE_ENV=production
DB_HOST=localhost
DB_USER=ats_user
DB_PASSWORD=your_password
DB_NAME=ats_db
JWT_SECRET=your_super_secure_jwt_secret_key
# Add other keys from your local .env as needed
```
Save and exit (`Ctrl+O`, `Enter`, `Ctrl+X`).

### 4.4. Run Migrations
Ensure your database schema is up to date:
```bash
npm run migrate
```

## 5. Process Management (PM2)

Start the application using PM2 so it runs in the background and restarts on reboot.

```bash
pm2 start server/index.js --name "ats-app"
pm2 save
pm2 startup
```
*Follow the command output from `pm2 startup` to enable boot startup.*

## 6. Web Server Setup (Nginx)

Configure Nginx to proxy requests to your Node.js application.

Create a new config file:
```bash
sudo nano /etc/nginx/sites-available/ats-application
```

Add the following content (replace `your_domain.com` with your actual domain):
```nginx
server {
    listen 80;
    server_name your_domain.com www.your_domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/ats-application /etc/nginx/sites-enabled/
sudo nginx -t # Test configuration
sudo systemctl restart nginx
```

## 7. SSL Certificate (HTTPS)

Secure your site with a free Let's Encrypt SSL certificate.

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your_domain.com -d www.your_domain.com
```

## 8. Post-Deployment & Verification

1.  **Check Status**:
    Visit `https://your_domain.com`. You should see the login page or home page.
    Check API health: `https://your_domain.com/health`.

2.  **Troubleshooting**:
    *   **Application Logs**: `pm2 logs ats-app`
    *   **Nginx Logs**: `sudo tail -f /var/log/nginx/error.log`
    *   **Database Connection**: Verify `.env` credentials.

3.  **Maintenance**:
    *   **Update**: Upload new `build` and `server` files, then run `pm2 restart ats-app`.
    *   **Backups**: Regularly backup your MySQL database and `.env` file.

## 9. Common Issues

*   **Permission Denied**: Ensure the user running PM2 has ownership of the files (`chown -R $USER:$USER .`).
*   **502 Bad Gateway**: Usually means the Node.js app is not running. Check `pm2 status` and `pm2 logs`.
*   **White Screen**: Check if `build` folder exists and is correctly structured. Check browser console for errors.
