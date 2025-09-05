# GitHub Actions Workflows

This directory contains comprehensive GitHub Actions workflows for the ATS (Affinity Tax Services) application. These workflows provide automated CI/CD, code quality checks, security monitoring, and deployment automation.

## 📋 Workflow Overview

### 1. CI/CD Pipeline (`ci.yml`)
**Triggers:** Push/PR to `main` and `develop` branches

**Features:**
- ✅ Multi-version Node.js testing (18.x, 20.x)
- 🔍 ESLint code quality checks
- 🧪 Automated test execution with coverage
- 🏗️ Production build validation
- 🔒 Security vulnerability scanning
- 🚀 Automated staging/production deployment
- 📊 Code coverage reporting

### 2. Dependency Updates (`dependency-update.yml`)
**Triggers:** Weekly schedule (Mondays 9 AM UTC) + Manual

**Features:**
- 📦 Automated dependency updates
- 🔐 Security vulnerability fixes
- 🧪 Post-update testing
- 📝 Automated pull request creation
- 📋 Security audit reporting

### 3. Code Quality (`code-quality.yml`)
**Triggers:** Push/PR to `main` and `develop` branches

**Features:**
- 🎨 Code formatting validation (Prettier)
- 📏 ESLint analysis with detailed reporting
- 🚫 Console.log detection
- 📦 Bundle size analysis
- ♿ Accessibility testing (axe-core)
- ⚡ Performance monitoring

### 4. Release Management (`release.yml`)
**Triggers:** Git tags (`v*.*.*`) + Manual workflow dispatch

**Features:**
- 🏷️ Automated release creation
- 📝 Changelog generation
- 📦 Build artifact packaging
- 🚀 Production deployment
- 📢 Team notifications
- 🔢 Version management

### 5. Database Operations (`database.yml`)
**Triggers:** Changes to database files + Manual

**Features:**
- 🗄️ Schema validation
- 🔄 Migration testing
- 💾 Backup validation
- 🏥 Health checks
- 🔄 Rollback testing

### 6. Monitoring & Alerts (`monitoring.yml`)
**Triggers:** Schedule (every 30 min) + Manual + Workflow completion

**Features:**
- 🏥 Application health monitoring
- ⚡ Performance testing (Lighthouse)
- 📈 Uptime monitoring
- 🚨 Deployment notifications
- 🔒 Security monitoring

## 🚀 Quick Setup

### 1. Required Secrets
Add these secrets to your GitHub repository (`Settings > Secrets and variables > Actions`):

```bash
# Optional: For enhanced security scanning
SNYK_TOKEN=your_snyk_token_here

# Optional: For team notifications
SLACK_WEBHOOK_URL=your_slack_webhook_url_here

# Required: For automated releases and deployments
GITHUB_TOKEN=automatically_provided_by_github
```

### 2. Environment Variables
Configure these in your repository settings or workflow files:

```bash
REACT_APP_ENV=production  # or staging
NODE_ENV=production
```

### 3. Branch Protection
Recommended branch protection rules for `main`:
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Require review from code owners
- ✅ Dismiss stale reviews
- ✅ Restrict pushes to matching branches

## 🔧 Customization

### Deployment Configuration
Update deployment steps in `ci.yml` and `release.yml`:

```yaml
# Example: AWS S3 deployment
- name: Deploy to S3
  run: |
    aws s3 sync build/ s3://your-bucket-name --delete
    aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

### Notification Setup
Configure Slack notifications:

```yaml
# Add to any workflow
- name: Notify Slack
  if: always()
  run: |
    curl -X POST -H 'Content-type: application/json' \
      --data '{"text":"🚀 Deployment completed for ATS Application"}' \
      ${{ secrets.SLACK_WEBHOOK_URL }}
```

### Database Configuration
Update database connection in `database.yml`:

```yaml
services:
  mysql:
    image: mysql:8.0
    env:
      MYSQL_ROOT_PASSWORD: ${{ secrets.DB_PASSWORD }}
      MYSQL_DATABASE: ${{ secrets.DB_NAME }}
```

## 📊 Monitoring Dashboard

### Workflow Status
Monitor workflow status at:
- `https://github.com/your-org/ats-application/actions`

### Key Metrics
- ✅ Build success rate
- 🧪 Test coverage percentage
- 📦 Bundle size trends
- ⚡ Performance scores
- 🔒 Security vulnerability count

## 🛠️ Troubleshooting

### Common Issues

**Build Failures:**
```bash
# Check Node.js version compatibility
# Verify all dependencies are installed
# Review ESLint errors
```

**Test Failures:**
```bash
# Run tests locally: npm run test:ci
# Check test coverage requirements
# Verify mock data and test setup
```

**Deployment Issues:**
```bash
# Verify secrets are configured
# Check deployment target accessibility
# Review build artifacts
```

### Debug Mode
Enable debug logging by adding:

```yaml
env:
  ACTIONS_STEP_DEBUG: true
  ACTIONS_RUNNER_DEBUG: true
```

## 📚 Best Practices

### 1. Workflow Organization
- ✅ Keep workflows focused and single-purpose
- ✅ Use descriptive job and step names
- ✅ Add comments for complex logic
- ✅ Use consistent naming conventions

### 2. Security
- 🔒 Never hardcode secrets in workflows
- 🔒 Use least-privilege access tokens
- 🔒 Regularly rotate secrets
- 🔒 Enable security scanning

### 3. Performance
- ⚡ Cache dependencies when possible
- ⚡ Use matrix builds for parallel execution
- ⚡ Optimize Docker images
- ⚡ Minimize artifact sizes

### 4. Maintenance
- 🔄 Regularly update action versions
- 🔄 Review and clean up old workflows
- 🔄 Monitor workflow execution times
- 🔄 Update documentation

## 🤝 Contributing

When modifying workflows:

1. Test changes in a feature branch
2. Update this documentation
3. Verify all secrets and variables are documented
4. Test with different scenarios (success/failure)
5. Update team on any breaking changes

## 📞 Support

For workflow issues:
1. Check the Actions tab for detailed logs
2. Review this documentation
3. Contact the development team
4. Create an issue with workflow logs

---

**Last Updated:** $(date)
**Maintained by:** ATS Development Team