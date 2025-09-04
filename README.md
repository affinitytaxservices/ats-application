# ATS - Affinity Tax Services

![ATS Logo](./Affinity%20Tax%20Services.png)

A comprehensive web application for Affinity Tax Services, providing tax preparation, filing, and management services for individuals and businesses.

## 🚀 Automated Deployment

This project includes a comprehensive CI/CD pipeline using GitHub Actions that automatically:

- ✅ Runs tests and security audits
- 🏗️ Builds the application
- 🚀 Deploys to production server via SSH
- 🔄 Restarts services and performs health checks
- 🧹 Cleans up old releases

### Deployment Triggers

- **Automatic**: Triggered on push to `main` branch
- **Manual**: Use GitHub Actions "Run workflow" button
- **Rollback**: Manual trigger to revert to previous release

### Required Setup

1. Configure GitHub Secrets (see [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md))
2. Setup production server with required dependencies
3. Configure SSH access and deployment user

### Quick Deploy

```bash
# Push to main branch for automatic deployment
git push origin main

# Or trigger manual deployment via GitHub Actions UI
```

For detailed setup instructions, see [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md).

### 🚨 Error Handling & Recovery

The project includes an advanced error handling workflow that provides:

- **🔍 Automated Error Detection** - Monitors CI/CD pipeline for failures
- **🔄 Emergency Rollback** - Automatic rollback on deployment failures
- **🏥 Health Monitoring** - Comprehensive system health checks
- **📧 Smart Notifications** - Slack alerts and GitHub issue creation
- **📋 Recovery Guides** - Context-aware troubleshooting instructions

#### Error Handling Features

- **Automatic Triggers**: Activated when main pipeline fails
- **Manual Triggers**: Can be run manually for specific error types
- **Rollback Capability**: Restores previous working version
- **System Diagnostics**: Server resource and service monitoring
- **Team Notifications**: Slack integration and email alerts
- **Issue Tracking**: Automatic GitHub issue creation for critical errors

#### Quick Error Recovery

```bash
# Manual error handling trigger
gh workflow run error-handling.yml \
  -f error_type=deployment_failure \
  -f severity=high \
  -f auto_rollback=true

# Emergency rollback only
gh workflow run error-handling.yml \
  -f error_type=rollback_required \
  -f severity=critical
```

For detailed configuration and usage, see [Error Handling README](./.github/workflows/ERROR_HANDLING_README.md).

## 🚀 Features

### For Clients
- **Individual Tax Preparation** - Complete tax filing services for personal returns
- **Business Tax Services** - Corporate and business tax preparation and filing
- **Document Upload** - Secure document submission and management
- **Refund Status Tracking** - Real-time refund status monitoring
- **Client Dashboard** - Personalized dashboard with tax information and history
- **Secure Authentication** - Protected login and registration system

### For Administrators
- **Admin Dashboard** - Comprehensive management interface
- **Client Management** - View and manage client accounts and documents
- **Tax Document Processing** - Handle and process uploaded tax documents
- **Analytics & Reporting** - Business insights and reporting tools

## 🛠️ Technology Stack

- **Frontend**: React 18.2.0
- **UI Framework**: Material-UI (MUI) 5.17.1
- **State Management**: Redux Toolkit 1.9.5
- **Routing**: React Router DOM 6.14.2
- **Animations**: Framer Motion 12.23.11
- **Charts**: Recharts 2.15.3
- **HTTP Client**: Axios 1.4.0
- **Database**: MySQL 3.14.0
- **Styling**: Emotion (CSS-in-JS)

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16.0 or higher)
- **npm** (version 8.0 or higher)
- **MySQL** (for database)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/affinitytaxservices/ats-application.git
   cd ats-application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add your configuration:
   ```env
   REACT_APP_API_URL=https://www.affinitytaxservices.com/api
   REACT_APP_DATABASE_URL=your_database_url
   # Add other environment variables as needed
   ```

4. **Set up the database**
   
   Run the database setup script:
   ```bash
   mysql -u your_username -p < setup_database.sql
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

   The application will open in your browser at `http://localhost:3000`

## 📁 Project Structure

```
ATS/
├── public/                 # Static assets
│   ├── images/            # Application images and icons
│   ├── favicon.svg        # Site favicon
│   └── manifest.json      # PWA manifest
├── src/
│   ├── components/        # React components
│   │   ├── auth/         # Authentication components
│   │   ├── dashboard/    # Dashboard components
│   │   ├── documents/    # Document management
│   │   ├── home/         # Home page components
│   │   ├── layout/       # Layout components
│   │   ├── privacy/      # Privacy and legal pages
│   │   └── tax/          # Tax-related components
│   ├── contexts/         # React contexts
│   ├── models/           # Data models
│   ├── services/         # API and external services
│   ├── styles/           # Styling and themes
│   └── utils/            # Utility functions
├── config/               # Configuration files
└── setup_database.sql    # Database setup script
```

## 🚀 Available Scripts

- **`npm start`** - Runs the app in development mode
- **`npm build`** - Builds the app for production
- **`npm test`** - Launches the test runner
- **`npm eject`** - Ejects from Create React App (⚠️ irreversible)

## 🔐 Security Features

- Secure user authentication and authorization
- Protected routes for sensitive areas
- Environment variable protection for sensitive data
- Input validation and sanitization
- Secure document upload and storage

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software owned by Affinity Tax Services. All rights reserved.

## 📞 Support

For support and inquiries, please contact:
- **Email**: support@affinitytaxservices.com
- **Website**: [Affinity Tax Services](https://www.affinitytaxservices.com)

## 🔄 Version History

- **v1.0.0** - Initial release with core tax preparation features

---

**Built with ❤️ by the Affinity Tax Services Development Team**