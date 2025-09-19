# GitHub Secrets Configuration

This document outlines the required secrets and environment variables for the ATS Application CI/CD pipeline.

## Required Repository Secrets

Configure these secrets in your GitHub repository settings under `Settings > Secrets and variables > Actions`.

### Deployment Secrets

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `DEPLOY_HOST` | Production server hostname or IP | `195.250.21.159` |
| `DEPLOY_USER` | SSH username for deployment | `deploy` |
| `DEPLOY_KEY` | Private SSH key for deployment | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `DEPLOY_PATH` | Deployment path on server | `/var/www/ats-application` |
| `SERVER_HOST` | Server hostname for direct deployment | `195.250.21.159` |
| `SERVER_USER` | SSH username for server deployment | `root` |
| `SERVER_PASSWORD` | SSH password for server deployment | `your_password_here` |
| `SERVER_SSH_KEY` | SSH private key for server deployment (preferred) | `-----BEGIN OPENSSH PRIVATE KEY-----...` |

### Optional Secrets

| Secret Name | Description | Required |
|-------------|-------------|----------|
| `CODECOV_TOKEN` | Codecov integration token | No |
| `SLACK_WEBHOOK` | Slack webhook for notifications | No |
| `SENTRY_DSN` | Sentry error tracking DSN | No |

## Environment Configuration

### Production Environment

The workflows use the following environments that should be configured in GitHub:

1. **staging** - For develop branch deployments
2. **production** - For main branch and release deployments

Configure these in `Settings > Environments` with appropriate protection rules.

### Environment Variables

The following environment variables are used in the workflows:

| Variable | Value | Description |
|----------|-------|-------------|
| `NODE_VERSION` | `18.17.0` | Node.js version (from .nvmrc) |
| `CI` | `false` | Disable CI mode for builds |
| `GENERATE_SOURCEMAP` | `false` | Disable source maps in production |
| `NODE_OPTIONS` | `--max-old-space-size=4096` | Node.js memory settings |

## SSH Key Setup

### Generating SSH Key for Deployment

1. Generate a new SSH key pair:
   ```bash
   ssh-keygen -t ed25519 -C "github-actions@ats-application" -f deploy_key
   ```

2. Add the public key (`deploy_key.pub`) to your server's `~/.ssh/authorized_keys`

3. Add the private key (`deploy_key`) content to the `DEPLOY_KEY` secret

### Server Configuration

Ensure your deployment server has:

1. **PM2** installed globally:
   ```bash
   npm install -g pm2
   ```

2. **Proper directory permissions**:
   ```bash
   sudo chown -R deploy:deploy /var/www/ats-application
   ```

3. **PM2 ecosystem file** in the deployment directory

## Workflow Triggers

### Main CI/CD Pipeline (`ci-cd.yml`)
- **Push** to `main` or `develop` branches
- **Pull requests** to `main` branch
- **Manual trigger** via workflow_dispatch

### Dependency Updates (`dependency-update.yml`)
- **Scheduled** every Monday at 9 AM UTC
- **Manual trigger** via workflow_dispatch

### Release Management (`release.yml`)
- **Tag push** matching `v*.*.*` pattern
- **Manual trigger** with version input

## Security Considerations

1. **SSH Keys**: Use dedicated deployment keys with minimal permissions
2. **Secrets Rotation**: Regularly rotate deployment credentials
3. **Environment Protection**: Enable required reviewers for production environment
4. **Branch Protection**: Require status checks before merging to main

## Monitoring and Notifications

### Build Status
- All workflows report status to GitHub checks
- Failed builds prevent deployments

### Artifacts
- Build artifacts are stored for 7 days
- Security and lint reports are uploaded for review

### Notifications
Configure webhooks or integrations for:
- Deployment success/failure notifications
- Security vulnerability alerts
- Dependency update notifications

## Troubleshooting

### Common Issues

1. **SSH Connection Failed**
   - Verify `DEPLOY_HOST`, `DEPLOY_USER`, and `DEPLOY_KEY` secrets
   - Check server SSH configuration
   - Ensure firewall allows SSH connections

2. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are properly declared
   - Review build logs for specific errors

3. **Deployment Failures**
   - Verify PM2 is installed and configured
   - Check deployment path permissions
   - Ensure ecosystem.config.js is present

### Debug Mode

Enable debug logging by setting the `ACTIONS_STEP_DEBUG` secret to `true` in your repository.

## Maintenance

### Regular Tasks
- Review and update dependency versions monthly
- Monitor security audit reports
- Update Node.js version as needed
- Review and rotate secrets quarterly

### Workflow Updates
- Test workflow changes in feature branches
- Use workflow_dispatch for manual testing
- Monitor workflow run times and optimize as needed