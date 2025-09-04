# ATS - Affinity Tax Services Deployment Guide

This guide provides comprehensive instructions for deploying the ATS (Affinity Tax Services) application to a production VPS environment.

## 📋 Prerequisites

Before starting the deployment process, ensure you have:

- A VPS with at least 2GB RAM and 20GB storage
- Root or sudo access to the server
- A domain name (optional but recommended)
- Basic knowledge of Linux command line

## 🖥️ VPS Setup

### 1. Choose and Configure Your VPS

- **VPS Providers**: DigitalOcean, AWS EC2, Linode, Vultr, or similar
- **Operating System**: CentOS 7/8 (or RHEL/Rocky Linux/AlmaLinux) or Ubuntu 20.04/22.04 LTS
- **Server Specifications**: Minimum 2GB RAM, 2 CPU cores, 20GB SSD

### 2. Initial Server Setup

```bash
# Connect to your VPS
ssh root@195.250.21.159

# Update system packages
# For Ubuntu/Debian:
# sudo apt update && sudo apt upgrade -y
# For CentOS/RHEL:
sudo yum update -y
# For CentOS 8+ or newer RHEL-based systems:
# sudo dnf update -y

# Create a new user (recommended for security)
# For Ubuntu/Debian:
# sudo adduser ats-app
# For CentOS/RHEL:
sudo useradd -m ats-app
sudo passwd ats-app
sudo usermod -aG wheel ats-app

# Configure firewall
# For Ubuntu/Debian (UFW):
# sudo ufw allow OpenSSH
# sudo ufw allow 80
# sudo ufw allow 443
# sudo ufw enable
# For CentOS/RHEL (firewalld):
sudo systemctl start firewalld
sudo systemctl enable firewalld
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

# Configure SELinux (CentOS/RHEL specific)
# Check SELinux status
sudo sestatus
# If you need to allow HTTP connections through SELinux:
sudo setsebool -P httpd_can_network_connect 1
# Allow Nginx to serve files from /var/www:
sudo setsebool -P httpd_enable_homedirs 1
```

## 🛠️ Install Required Software

### 1. Install Node.js and npm

```bash
# Install Node.js 18.x (LTS)
# For Ubuntu/Debian:
# curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
# sudo apt-get install -y nodejs
# For CentOS/RHEL:
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
# For CentOS 8+ or newer RHEL-based systems:
# sudo dnf install -y nodejs

# Verify installation
node --version
npm --version
```

### 2. Install MySQL Database

```bash
# Install MySQL Server
# For Ubuntu/Debian:
# sudo apt install mysql-server -y
# For CentOS/RHEL:
sudo yum install -y mysql-server
# For CentOS 8+ or newer RHEL-based systems:
# sudo dnf install -y mysql-server
# Initialize MySQL (CentOS specific):
# sudo mysqld --initialize --user=mysql

# Secure MySQL installation
sudo mysql_secure_installation

# Start and enable MySQL
sudo systemctl start mysql
sudo systemctl enable mysql
```

### 3. Install Nginx (Web Server)

```bash
# Install Nginx
# For Ubuntu/Debian:
# sudo apt install nginx -y
# For CentOS/RHEL:
sudo yum install -y epel-release
sudo yum install -y nginx
# For CentOS 8+ or newer RHEL-based systems:
# sudo dnf install -y epel-release
# sudo dnf install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 4. Install PM2 (Process Manager)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Configure PM2 to start on boot
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp $HOME
```

## 🗄️ Database Setup

### 1. Create Database and User

```bash
# Login to MySQL
sudo mysql -u root -p

# Create database
CREATE DATABASE affinitytaxservi_demo;

# Create database user
CREATE USER 'ats_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON affinitytaxservi_demo.* TO 'ats_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 2. Import Database Schema

```bash
# Import the database schema
mysql -u ats_user -p affinitytaxservi_demo < /path/to/setup_database.sql
```

## 📁 Deploy Application

### 1. Clone and Setup Application

```bash
# Navigate to web directory
cd /var/www

# Clone your repository
sudo git clone https://github.com/affinitytaxservices/ats-application.git ats
cd ats

# Change ownership
sudo chown -R $USER:$USER /var/www/ats

# Install dependencies
npm install
```

### 2. Environment Configuration

Create a `.env` file in the project root:

```bash
# Create environment file
nano .env
```

Add the following environment variables:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=ats_user
DB_PASSWORD=your_secure_password
DB_NAME=affinitytaxservi_demo
DB_PORT=3306

# Application Configuration
NODE_ENV=production
PORT=3000
REACT_APP_API_URL=https://www.affinitytaxservices.com/api

# Security
JWT_SECRET=your_jwt_secret_key_here
SESSION_SECRET=your_session_secret_here

# File Upload Configuration
UPLOAD_DIR=/var/www/ats/uploads
MAX_FILE_SIZE=10485760

# Email Configuration (if applicable)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email@domain.com
SMTP_PASS=your_email_password
```

### 3. Build Application

```bash
# Build the React application
npm run build

# Create uploads directory
mkdir -p uploads
sudo chown -R www-data:www-data uploads
sudo chmod 755 uploads
```

### 4. Start Application with PM2

Create a PM2 ecosystem file:

```bash
# Create PM2 configuration
nano ecosystem.config.js
```

Add the following configuration:

```javascript
module.exports = {
  apps: [{
    name: 'ats-app',
    script: 'serve',
    args: '-s build -l 3000',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

```bash
# Install serve globally
npm install -g serve

# Start application with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save
```

## 🌐 Configure Nginx

### 1. Create Nginx Configuration

```bash
# Create Nginx site configuration
# For Ubuntu/Debian:
# sudo nano /etc/nginx/sites-available/ats
# For CentOS/RHEL:
sudo mkdir -p /etc/nginx/sites-available
sudo nano /etc/nginx/sites-available/ats
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name affinitytaxservices.com www.affinitytaxservices.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name affinitytaxservices.com www.affinitytaxservices.com;
    
    # SSL Configuration (will be added by Certbot)
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;
    
    # Root directory
    root /var/www/ats/build;
    index index.html index.htm;
    
    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API proxy (if you have a separate backend)
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # File upload size limit
    client_max_body_size 10M;
}
```

### 2. Enable Site and Test Configuration

```bash
# Enable the site
# For Ubuntu/Debian:
# sudo ln -s /etc/nginx/sites-available/ats /etc/nginx/sites-enabled/
# sudo rm /etc/nginx/sites-enabled/default
# For CentOS/RHEL (sites-available/enabled don't exist by default):
# Copy configuration directly to conf.d:
sudo cp /etc/nginx/sites-available/ats /etc/nginx/conf.d/ats.conf
# Or create the directories if you prefer Ubuntu-style:
# sudo mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled
# sudo ln -s /etc/nginx/sites-available/ats /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## 🔒 SSL Certificate Setup

### 1. Install Certbot

```bash
# Install Certbot
# For Ubuntu/Debian:
# sudo apt install snapd
# sudo snap install core; sudo snap refresh core
# sudo snap install --classic certbot
# sudo ln -s /snap/bin/certbot /usr/bin/certbot
# For CentOS/RHEL:
sudo yum install -y epel-release
sudo yum install -y certbot python3-certbot-nginx
# For CentOS 8+ or newer RHEL-based systems:
# sudo dnf install -y epel-release
# sudo dnf install -y certbot python3-certbot-nginx
```

### 2. Obtain SSL Certificate

```bash
# Get SSL certificate
sudo certbot --nginx -d affinitytaxservices.com -d www.affinitytaxservices.com

# Test automatic renewal
sudo certbot renew --dry-run
```

## 🔧 Additional Configuration

### 1. Setup Log Rotation

```bash
# Create logrotate configuration
sudo nano /etc/logrotate.d/ats
```

Add:

```
/var/www/ats/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 nginx nginx
    # Note: Use 'www-data www-data' for Ubuntu/Debian, 'nginx nginx' for CentOS/RHEL
    postrotate
        pm2 reload ats-app
    endscript
}
```

### 2. Setup Monitoring

```bash
# Install PM2 monitoring
pm2 install pm2-logrotate

# Configure log rotation
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
```

## 🚀 Deployment Checklist

- [ ] VPS configured and secured
- [ ] Node.js, MySQL, Nginx installed
- [ ] Database created and schema imported
- [ ] Application cloned and dependencies installed
- [ ] Environment variables configured
- [ ] Application built and started with PM2
- [ ] Nginx configured as reverse proxy
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] Monitoring and logging setup

## 🔄 Updating the Application

```bash
# Navigate to application directory
cd /var/www/ats

# Pull latest changes
git pull origin main

# Install new dependencies (if any)
npm install

# Rebuild application
npm run build

# Restart PM2 process
pm2 restart ats-app

# Reload Nginx (if config changed)
sudo systemctl reload nginx
```

## 🛠️ Troubleshooting

### Common Issues:

1. **Application won't start**:
   ```bash
   pm2 logs ats-app
   ```

2. **Database connection issues**:
   ```bash
   mysql -u ats_user -p -h localhost affinitytaxservi_demo
   ```

3. **Nginx configuration errors**:
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

4. **SSL certificate issues**:
   ```bash
   sudo certbot certificates
   sudo certbot renew
   ```

### Log Locations:
- Application logs: `pm2 logs`
- Nginx logs: `/var/log/nginx/`
- MySQL logs: `/var/log/mysql/`

## 🔐 Security Best Practices

1. **Regular Updates**: Keep system and packages updated
2. **Strong Passwords**: Use complex passwords for database and system users
3. **Firewall**: Only open necessary ports
4. **SSL/TLS**: Always use HTTPS in production
5. **Backup**: Regular database and file backups
6. **Monitoring**: Set up monitoring and alerting
7. **Access Control**: Limit SSH access and use key-based authentication

## 📞 Support

For deployment issues or questions, please:
1. Check the troubleshooting section above
2. Review application logs
3. Contact the development team

---

**Note**: This deployment guide has been configured for domain `www.affinitytaxservices.com` and server IP `195.250.21.159`. Update database passwords and other security credentials as needed for your production environment.