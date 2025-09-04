# CentOS Deployment Guide for ATS Application

This guide provides step-by-step instructions for deploying the ATS (Affinity Tax Services) application on a CentOS VPS.

## Prerequisites

### System Requirements
- CentOS 7/8/9 or RHEL 7/8/9
- Minimum 2GB RAM (4GB recommended)
- At least 10GB free disk space
- Root or sudo access

### Required Software
- Node.js (version 16 or higher)
- npm (comes with Node.js)
- Apache or Nginx web server
- MySQL/MariaDB (for database)

## Installation Steps

### 1. Install Node.js and npm

```bash
# Install Node.js 18.x LTS
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Verify installation
node --version
npm --version
```

### 2. Install Web Server (Apache)

```bash
# Install Apache
sudo yum install -y httpd

# Start and enable Apache
sudo systemctl start httpd
sudo systemctl enable httpd

# Configure firewall
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

### 3. Install Database (MariaDB)

```bash
# Install MariaDB
sudo yum install -y mariadb-server mariadb

# Start and enable MariaDB
sudo systemctl start mariadb
sudo systemctl enable mariadb

# Secure installation
sudo mysql_secure_installation
```

### 4. Clone and Setup Application

```bash
# Clone the repository
git clone https://github.com/affinitytaxservices/ats-application.git
cd ats-application

# Make deployment script executable
chmod +x deploy-centos.sh

# Install dependencies and build
./deploy-centos.sh
```

### 5. Deploy to Web Server

```bash
# Deploy to Apache web directory
./deploy-centos.sh --deploy
```

## Configuration

### Environment Variables

The application uses the following environment variables (already configured in `.env`):

```bash
# Build Configuration
CI=false                          # Disable CI mode to allow warnings
GENERATE_SOURCEMAP=false         # Disable source maps for production
ESLINT_NO_DEV_ERRORS=true       # Treat ESLint errors as warnings
TSC_COMPILE_ON_ERROR=true        # Continue build even with TypeScript errors
NODE_OPTIONS=--max-old-space-size=4096  # Increase memory limit
```

### Apache Configuration

Create Apache virtual host configuration:

```bash
sudo nano /etc/httpd/conf.d/ats.conf
```

Add the following configuration:

```apache
<VirtualHost *:80>
    ServerName www.affinitytaxservices.com
    DocumentRoot /var/www/html/ats
    
    <Directory /var/www/html/ats>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
        
        # Handle React Router
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
    
    # Security headers
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    
    # Compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/plain
        AddOutputFilterByType DEFLATE text/html
        AddOutputFilterByType DEFLATE text/xml
        AddOutputFilterByType DEFLATE text/css
        AddOutputFilterByType DEFLATE application/xml
        AddOutputFilterByType DEFLATE application/xhtml+xml
        AddOutputFilterByType DEFLATE application/rss+xml
        AddOutputFilterByType DEFLATE application/javascript
        AddOutputFilterByType DEFLATE application/x-javascript
    </IfModule>
    
    # Cache static assets
    <IfModule mod_expires.c>
        ExpiresActive On
        ExpiresByType text/css "access plus 1 year"
        ExpiresByType application/javascript "access plus 1 year"
        ExpiresByType image/png "access plus 1 year"
        ExpiresByType image/jpg "access plus 1 year"
        ExpiresByType image/jpeg "access plus 1 year"
        ExpiresByType image/gif "access plus 1 year"
        ExpiresByType image/svg+xml "access plus 1 year"
    </IfModule>
</VirtualHost>
```

Restart Apache:

```bash
sudo systemctl restart httpd
```

## Troubleshooting

### Common Build Errors

#### 1. "user is assigned a value but never used"
**Solution**: This has been fixed in the code by replacing optional chaining with explicit null checks.

#### 2. Memory Issues During Build
**Solution**: The deployment script sets `NODE_OPTIONS=--max-old-space-size=4096` to increase memory limit.

#### 3. ESLint Treating Warnings as Errors
**Solution**: Set `CI=false` and `ESLINT_NO_DEV_ERRORS=true` in environment variables.

### Build Commands

```bash
# Standard build
npm run build

# Production build (no source maps)
npm run build:prod

# CentOS optimized build (recommended)
npm run build:centos
```

### Manual Build Process

If the deployment script fails, you can build manually:

```bash
# Set environment variables
export CI=false
export GENERATE_SOURCEMAP=false
export NODE_OPTIONS="--max-old-space-size=4096"
export ESLINT_NO_DEV_ERRORS=true

# Clean and install
rm -rf node_modules build
npm install

# Build
npm run build:centos
```

### Database Setup

```bash
# Connect to MySQL/MariaDB
mysql -u root -p

# Create database and user
CREATE DATABASE affinitytaxservi_demo;
CREATE USER 'affinitytaxservi_admin'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON affinitytaxservi_demo.* TO 'affinitytaxservi_admin'@'localhost';
FLUSH PRIVILEGES;

# Import schema
mysql -u affinitytaxservi_admin -p affinitytaxservi_demo < setup_database.sql
```

### Log Files

- Apache logs: `/var/log/httpd/`
- Application logs: Check browser console
- Build logs: Terminal output during build process

### Performance Optimization

1. **Enable Gzip Compression**: Already configured in Apache virtual host
2. **Set Cache Headers**: Configured for static assets
3. **Optimize Images**: Use WebP format where possible
4. **Minify Assets**: Handled automatically by React build process

## Security Considerations

1. **SSL Certificate**: Install SSL certificate for HTTPS
2. **Firewall**: Configure firewall to allow only necessary ports
3. **Updates**: Keep system and packages updated
4. **Database Security**: Use strong passwords and limit access

## Monitoring

### System Monitoring

```bash
# Check Apache status
sudo systemctl status httpd

# Check disk usage
df -h

# Check memory usage
free -h

# Check running processes
top
```

### Application Monitoring

- Monitor Apache access logs for traffic patterns
- Check error logs for application issues
- Use browser developer tools for client-side debugging

## Backup Strategy

```bash
# Backup application files
tar -czf ats-backup-$(date +%Y%m%d).tar.gz /var/www/html/ats

# Backup database
mysqldump -u affinitytaxservi_admin -p affinitytaxservi_demo > ats-db-backup-$(date +%Y%m%d).sql
```

## Support

For issues or questions:
1. Check the error logs
2. Review this documentation
3. Contact the development team

---

**Note**: This deployment guide assumes a standard CentOS setup. Adjust paths and commands as needed for your specific environment.