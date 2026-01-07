# ATS - Affinity Tax Services

A comprehensive web application for Affinity Tax Services, providing tax preparation, filing, and management services for individuals and businesses.

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

## 📬 Contact API

- Endpoint: `POST /api/contact`
- Payload: `{ firstName, lastName, email, phone?, subject, message, website? }`
- Anti-spam: hidden `website` honeypot must remain empty
- Rate limiting: 10 requests/hour per IP
- Storage: persisted to `contact_messages` table
- Notifications: email sent when `SMTP_*` and `CONTACT_NOTIFY_EMAIL` configured

## 🖼️ Image Guidelines

- Use `ResponsiveImage` for lazy-loaded, responsive images with placeholders
- Prefer SVG for icons and WebP for photos (keep PNG/JPG as fallback)
- Keep large hero images under ~300KB where feasible

## 🔧 Maintenance

- Apply DB migrations: `npm run migrate`
- SMTP env vars for contact notifications:
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `CONTACT_NOTIFY_EMAIL`
- Frontend API base URL: `REACT_APP_API_URL`

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

## 📦 Deployment (Enhance Control Panel, No GitHub)

This guide explains how to deploy the application to your Enhance control panel without using GitHub.

### Prerequisites
- Node.js and npm available on the server
- MySQL database with credentials
- Ability to upload files via File Manager or SFTP/SSH

### Environment Variables
Configure these in your Enhance app’s environment:
- `NODE_ENV=production`
- `PORT=5000` (or your panel’s assigned port)
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `JWT_SECRET` (set a strong secret)
- `REACT_APP_API_URL=https://your-domain.com/api`
- Optional mail: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_REJECT_UNAUTH`, `SMTP_FROM`
- Optional WhatsApp: `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_APP_SECRET`

### Upload the Project (without GitHub)
1. Create a zip of the project on your machine, excluding `node_modules`.
2. Upload the zip to the app directory using Enhance File Manager or SFTP.
3. Extract so the directory contains `package.json`, `server/`, `src/`, `public/`, etc.

### Install and Build
Run these commands on the server (via the panel or SSH):
```bash
npm ci
npm run build:prod
```
This produces the `build/` directory used by the server to serve the React app.

### Database Migrations
Apply schema migrations after setting DB env vars:
```bash
npm run migrate
```

### Start the Server
Set the app’s start command in Enhance to:
```bash
npm run start:server
```
This runs `server/index.js`, serving API routes under `/api` and the React build from `/build`.

### Frontend API URL
Ensure `REACT_APP_API_URL` points to your domain, for example:
```env
REACT_APP_API_URL=https://your-domain.com/api
```

### CORS Configuration
If your production hostname differs from the defaults, add it to `allowedOrigins` in `server/index.js` and redeploy/restart.

### Verify Deployment
- Visit `https://your-domain.com/health` to confirm server is running.
- Load the site and exercise key pages; check `/api` endpoints respond.
- Use Enhance logs to diagnose issues (common: missing env vars, DB connection, or missing `build/`).

### Alternative: Build Locally
You can build locally and upload the `build/` folder along with the project:
```bash
npm ci
npm run build:prod
```
Then upload everything except `node_modules`, including `build/`, and still run `npm ci` on the server for backend dependencies.

## 🧩 GitHub Integration

This project supports GitHub-based version control, CI, and collaboration.

- Initialize local repository:
  ```bash
  git init
  git checkout -b main
  ```
- Set remote (HTTPS or SSH). SSH is recommended:
  ```bash
  # HTTPS
  git remote add origin https://github.com/affinitytaxservices/ats-application.git

  # SSH (recommended)
  git remote add origin git@github.com:affinitytaxservices/ats-application.git
  ```
- Branching strategy:
  - main: production-ready code
  - development: integration branch for ongoing work
  - feature/*: short-lived branches per feature or fix
  ```bash
  git checkout -b development
  git push -u origin main
  git push -u origin development
  ```
- CI/CD: GitHub Actions workflow runs tests and build on push/PR:
  - See `.github/workflows/ci.yml`

### 🔐 Secure Authentication
- Prefer SSH: set up an SSH key with GitHub (`~/.ssh/id_rsa.pub` added to GitHub).
- HTTPS is also secure; use a Personal Access Token when prompted.

### 🔄 Sync Workflow
- Configure helpful Git settings:
  ```bash
  git config pull.rebase true
  git config rebase.autoStash true
  git config fetch.prune true
  git config push.default current
  ```
- Recommended routine:
  - Pull before push: `git pull --rebase`
  - Stage and commit often with meaningful messages:
    ```bash
    git add -A
    git commit -m "feat(dashboard): add KPIs widget"
    git push
    ```

### 🤝 Collaboration Procedures
- Open PRs from `feature/*` into `development`.
- Use code reviews; merge via squash or rebase for tidy history.
- Resolve conflicts:
  ```bash
  git fetch origin
  git checkout feature/branch
  git rebase origin/development   # or: git merge origin/development
  # edit conflicted files, then:
  git add .
  git rebase --continue           # or: git commit
  ```

### ↩️ Rollback & Recovery
- Revert a bad commit:
  ```bash
  git revert <commit-sha>
  ```
- Reset a local branch (use with caution):
  ```bash
  git reset --hard <commit-sha>
  ```

### ✅ CI Details
- On push/PR to `main`, `development`, or `feature/*`:
  - Installs dependencies (`npm ci`)
  - Runs tests (`npm run test:ci`)
  - Builds the app (`npm run build`)

### 📦 Ignored Files
- Unnecessary files are excluded via `.gitignore` (e.g., `node_modules/`, `.env*`, `build/`, `coverage/`, `.vercel/`).
