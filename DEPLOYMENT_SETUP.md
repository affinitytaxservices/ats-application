# ATS Application - Deployment Setup Guide

This guide explains how to configure automated deployment using GitHub Actions for the Affinity Tax Services application.

## 🔧 Prerequisites

### Server Requirements
- Ubuntu 18.04+ or similar Linux distribution
- Node.js 18.x or higher
- Nginx web server
- PM2 process manager
- SSH access with sudo privileges

### GitHub Repository Setup
- Repository with admin access
- GitHub Actions enabled

## 🔐 Required GitHub Secrets

Navigate to your repository → Settings → Secrets and variables → Actions, then add these secrets:

### SSH Configuration
```
SSH_PRIVATE_KEY     # Private SSH key for server access
SSH_PUBLIC_KEY      # Public SSH key (optional, for documentation)
SERVER_HOST         # Server IP: 195.250.21.159
DEPLOY_USER         # Username for deployment (e.g., 'deploy')
```

### Application Configuration
```
PRODUCTION_URL      # Production domain: https://www.affinitytaxservices.com
DATABASE_URL        # Production database connection string
JWT_SECRET          # JWT signing secret
API_KEY             # Any required API keys
```

## 🖥️ Server Setup

### 1. Create Deployment User
```bash
# Create deployment user
sudo adduser deploy
sudo usermod -aG sudo deploy
sudo usermod -aG www-data deploy

# Switch to deployment user
su - deploy
```

### 2. Setup SSH Key Authentication
```bash
# On your local machine, generate SSH key pair
ssh-keygen -t rsa -b 4096 -C "deployment@ats-application"

# Copy public key to server
ssh-copy-id deploy@195.250.21.159

# Test SSH connection
ssh deploy@195.250.21.159
```

### 3. Install Required Software
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y

# Install other utilities
sudo apt install rsync curl git -y
```

### 4. Setup Application Directory Structure
```bash
# Create application directories
sudo mkdir -p /var/www/ats-application/{releases,shared,backups,current}
sudo chown -R deploy:www-data /var/www/ats-application
sudo chmod -R 755 /var/www/ats-application

# Create shared configuration directory
mkdir -p /var/www/ats-application/shared
```

### 5. Configure Environment Variables
```bash
# Create production environment file
sudo nano /var/www/ats-application/shared/.env
```

Add your production environment variables:
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret_here
API_BASE_URL=https://www.affinitytaxservices.com/api
# Add other required environment variables
```

### 6. Configure Nginx
```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/ats-application
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
    
    # SSL Configuration (configure with your certificates)
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Application root
    root /var/www/ats-application/current/build;
    index index.html index.htm;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
    
    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API proxy (if you have a separate API server)
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
    
    # Static assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/ats-application /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 7. Setup PM2 Startup
```bash
# Generate PM2 startup script
pm2 startup
# Follow the instructions provided by PM2

# Save PM2 configuration
pm2 save
```

### 8. Configure Systemd Service (Alternative to PM2)
```bash
# Create systemd service file
sudo nano /etc/systemd/system/ats-application.service
```

Add the following configuration:
```ini
[Unit]
Description=ATS Application
After=network.target

[Service]
Type=simple
User=deploy
WorkingDirectory=/var/www/ats-application/current
EnvironmentFile=/var/www/ats-application/shared/.env
ExecStart=/usr/bin/npm start
Restart=on-failure
RestartSec=10
KillMode=process

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start the service
sudo systemctl daemon-reload
sudo systemctl enable ats-application
sudo systemctl start ats-application
```

## 🚀 Deployment Process

### Automatic Deployment
The deployment is triggered automatically when:
- Code is pushed to the `main` branch
- All tests pass successfully
- Build completes without errors

### Manual Deployment
To trigger a manual deployment:
1. Go to your repository on GitHub
2. Navigate to Actions tab
3. Select "ATS CI/CD Pipeline"
4. Click "Run workflow"

### Rollback Process
To rollback to a previous version:
1. Go to Actions tab
2. Select "ATS CI/CD Pipeline"
3. Click "Run workflow"
4. The rollback job will restore the previous release

## 🔍 Monitoring and Troubleshooting

### Check Application Status
```bash
# Check PM2 processes
pm2 status
pm2 logs ats-application

# Check systemd service (if using systemd)
sudo systemctl status ats-application
sudo journalctl -u ats-application -f

# Check Nginx status
sudo systemctl status nginx
sudo nginx -t
```

### View Deployment Logs
```bash
# Application logs
tail -f /var/log/pm2/ats-application.log

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Common Issues

1. **Permission Issues**
   ```bash
   sudo chown -R deploy:www-data /var/www/ats-application
   sudo chmod -R 755 /var/www/ats-application
   ```

2. **Node.js Memory Issues**
   ```bash
   # Increase PM2 memory limit
   pm2 restart ats-application --max-memory-restart 2G
   ```

3. **SSL Certificate Issues**
   ```bash
   # Check certificate validity
   sudo certbot certificates
   # Renew certificates
   sudo certbot renew
   ```

## 🔒 Security Considerations

1. **SSH Key Security**
   - Use strong SSH keys (4096-bit RSA or Ed25519)
   - Regularly rotate SSH keys
   - Disable password authentication

2. **Environment Variables**
   - Never commit secrets to version control
   - Use GitHub Secrets for sensitive data
   - Regularly rotate API keys and secrets

3. **Server Security**
   - Keep system packages updated
   - Configure firewall (UFW)
   - Enable fail2ban for SSH protection
   - Regular security audits

## 📞 Support

For deployment issues:
1. Check GitHub Actions logs
2. Review server logs
3. Verify all secrets are configured
4. Ensure server meets requirements

For additional help, contact the development team or create an issue in the repository.