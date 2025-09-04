// PM2 Ecosystem Configuration for ATS Application
// This file configures PM2 process management for production deployment

module.exports = {
  apps: [{
    name: 'ats-application',
    script: 'serve',
    args: '-s build -l 3000',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      API_BASE_URL: 'https://www.affinitytaxservices.com/api'
    },
    // Logging
    log_file: '/var/log/pm2/ats-application.log',
    out_file: '/var/log/pm2/ats-application-out.log',
    error_file: '/var/log/pm2/ats-application-error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    
    // Process management
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    
    // Health monitoring
    min_uptime: '10s',
    max_restarts: 10,
    
    // Advanced settings
    kill_timeout: 5000,
    listen_timeout: 8000,
    
    // Environment variables
    env_file: '.env'
  }],

  deploy: {
    production: {
      user: 'deploy',
      host: '195.250.21.159',
      ref: 'origin/main',
      repo: 'https://github.com/affinitytaxservices/ats-application.git',
      path: '/var/www/ats-application',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'git clone https://github.com/affinitytaxservices/ats-application.git /var/www/ats-application'
    }
  }
};