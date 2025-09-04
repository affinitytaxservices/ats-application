# Error Handling & Recovery Workflow

This document explains the comprehensive error handling and recovery system for the ATS application deployment pipeline.

## Overview

The Error Handling & Recovery workflow (`error-handling.yml`) provides automated error detection, analysis, recovery, and notification capabilities for your CI/CD pipeline. It's designed to minimize downtime and provide quick recovery from deployment failures.

## Features

### 🔍 **Automated Error Detection**
- Monitors the main CI/CD pipeline for failures
- Analyzes error types and severity levels
- Provides detailed error classification

### 🔄 **Emergency Rollback**
- Automatic rollback on deployment failures
- Backup verification and restoration
- Service restart and health verification

### 🏥 **System Health Monitoring**
- Comprehensive server health checks
- Resource monitoring (CPU, memory, disk)
- Service status verification

### 📧 **Smart Notifications**
- Slack integration for team alerts
- Automatic GitHub issue creation for critical errors
- Detailed error reports and recovery guides

### 📋 **Recovery Assistance**
- Context-aware recovery recommendations
- Step-by-step troubleshooting guides
- Emergency contact information

## Workflow Triggers

### Automatic Triggers
- **Workflow Failure**: Automatically triggered when the main CI/CD pipeline fails
- **Error Detection**: Runs analysis and recovery procedures

### Manual Triggers
- **Manual Dispatch**: Can be triggered manually with specific parameters
- **Error Type Selection**: Choose from predefined error types
- **Severity Level**: Set appropriate severity (critical, high, medium, low)
- **Auto Rollback**: Enable/disable automatic rollback
- **Team Notifications**: Control notification sending

## Configuration Requirements

### Required GitHub Secrets

Add these secrets to your repository settings (`Settings > Secrets and variables > Actions`):

```bash
# SSH Configuration
SSH_PRIVATE_KEY          # Private SSH key for server access
DEPLOY_USER             # Username for deployment (e.g., 'deploy')
SERVER_HOST             # Server hostname or IP (195.250.21.159)

# Notification Configuration (Optional)
SLACK_WEBHOOK_URL       # Slack webhook URL for notifications
ERROR_EMAIL_RECIPIENTS  # Email addresses for error notifications
```

### SSH Key Setup

1. **Generate SSH Key Pair** (if not already done):
   ```bash
   ssh-keygen -t rsa -b 4096 -C "github-actions@yourdomain.com"
   ```

2. **Add Public Key to Server**:
   ```bash
   # Copy public key to server
   ssh-copy-id deploy@195.250.21.159
   
   # Or manually add to ~/.ssh/authorized_keys
   cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
   ```

3. **Add Private Key to GitHub Secrets**:
   - Copy the entire private key content (including headers)
   - Add as `SSH_PRIVATE_KEY` secret in GitHub

### Slack Integration Setup

1. **Create Slack App**:
   - Go to https://api.slack.com/apps
   - Create new app for your workspace
   - Enable "Incoming Webhooks"

2. **Get Webhook URL**:
   - Copy the webhook URL
   - Add as `SLACK_WEBHOOK_URL` secret in GitHub

3. **Test Notification**:
   ```bash
   curl -X POST -H 'Content-type: application/json' \
     --data '{"text":"Test notification from ATS Error Handler"}' \
     YOUR_WEBHOOK_URL
   ```

## Error Types and Handling

### 🚀 **Deployment Failure**
- **Detection**: Failed deployment steps
- **Actions**: Automatic rollback, service restart
- **Recovery**: Backup restoration, health checks

### 🏗️ **Build Failure**
- **Detection**: Compilation or build process errors
- **Actions**: Error analysis, dependency checks
- **Recovery**: Cache clearing, environment verification

### 🧪 **Test Failure**
- **Detection**: Failed test suites
- **Actions**: Test result analysis
- **Recovery**: Test environment checks, data verification

### 🔒 **Security Issue**
- **Detection**: Security audit failures
- **Actions**: Immediate notification, deployment halt
- **Recovery**: Vulnerability assessment, dependency updates

### 🔄 **Rollback Required**
- **Detection**: Manual trigger or system instability
- **Actions**: Emergency rollback procedures
- **Recovery**: Previous version restoration

## Usage Examples

### Manual Error Handling Trigger

1. **Go to Actions Tab** in your GitHub repository
2. **Select "Error Handling & Recovery"** workflow
3. **Click "Run workflow"**
4. **Configure Parameters**:
   - Error Type: `deployment_failure`
   - Severity: `high`
   - Auto Rollback: `true`
   - Notify Team: `true`
5. **Click "Run workflow"**

### Emergency Rollback

```bash
# Manual rollback via workflow dispatch
gh workflow run error-handling.yml \
  -f error_type=rollback_required \
  -f severity=critical \
  -f auto_rollback=true \
  -f notify_team=true
```

### Health Check Only

```bash
# Run health check without rollback
gh workflow run error-handling.yml \
  -f error_type=deployment_failure \
  -f severity=low \
  -f auto_rollback=false \
  -f notify_team=false
```

## Monitoring and Alerts

### Slack Notifications

The workflow sends rich Slack notifications including:
- Error type and severity
- Repository and commit information
- Rollback status
- Health check results
- Quick action buttons

### GitHub Issues

For critical errors, the workflow automatically creates GitHub issues with:
- Detailed error information
- Recovery status
- Action items
- Relevant labels (`critical`, `error`, `deployment`)

### Artifacts

Each workflow run generates downloadable artifacts:
- **Error Report**: Detailed analysis and recommendations
- **Recovery Guide**: Step-by-step recovery instructions
- **System Logs**: Server status and diagnostic information

## Troubleshooting

### Common Issues

#### SSH Connection Failures
```bash
# Test SSH connection
ssh -o ConnectTimeout=10 deploy@195.250.21.159 "echo 'Connection successful'"

# Check SSH key permissions
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub
```

#### Rollback Failures
```bash
# Check backup directory
ssh deploy@195.250.21.159 "ls -la /var/www/ats-application/backups/"

# Manual rollback
ssh deploy@195.250.21.159
cd /var/www/ats-application
sudo rm -f current
sudo ln -sf $(ls -t backups/ | head -1) current
sudo systemctl reload nginx
pm2 restart ats-application
```

#### Service Restart Issues
```bash
# Check service status
sudo systemctl status nginx
pm2 status

# Check logs
sudo journalctl -u nginx -f
pm2 logs ats-application
```

### Debug Mode

To enable verbose logging, add this to your workflow:

```yaml
env:
  ACTIONS_STEP_DEBUG: true
  ACTIONS_RUNNER_DEBUG: true
```

## Best Practices

### 1. **Regular Testing**
- Test the error handling workflow monthly
- Verify backup and rollback procedures
- Update emergency contacts

### 2. **Monitoring Setup**
- Configure external monitoring (e.g., Pingdom, DataDog)
- Set up log aggregation (e.g., ELK stack)
- Implement custom health checks

### 3. **Documentation**
- Keep recovery procedures updated
- Document known issues and solutions
- Maintain emergency contact list

### 4. **Security**
- Rotate SSH keys regularly
- Use least-privilege access
- Monitor access logs

### 5. **Performance**
- Limit workflow runs to prevent resource exhaustion
- Use caching for faster recovery
- Optimize backup strategies

## Customization

### Adding Custom Error Types

1. **Update Workflow Inputs**:
   ```yaml
   error_type:
     options:
       - deployment_failure
       - build_failure
       - test_failure
       - security_issue
       - rollback_required
       - custom_error_type  # Add your custom type
   ```

2. **Add Error Handling Logic**:
   ```yaml
   - name: Handle custom error
     if: steps.analyze.outputs.error_type == 'custom_error_type'
     run: |
       echo "Handling custom error type..."
       # Add your custom logic here
   ```

### Custom Notification Channels

```yaml
- name: Send custom notification
  run: |
    # Email notification
    curl -X POST https://api.sendgrid.com/v3/mail/send \
      -H "Authorization: Bearer ${{ secrets.SENDGRID_API_KEY }}" \
      -H "Content-Type: application/json" \
      -d '{"personalizations":[{"to":[{"email":"admin@affinitytaxservices.com"}]}],"from":{"email":"alerts@affinitytaxservices.com"},"subject":"ATS Error Alert","content":[{"type":"text/plain","value":"Error detected in ATS application"}]}'
    
    # Discord notification
    curl -X POST "${{ secrets.DISCORD_WEBHOOK_URL }}" \
      -H "Content-Type: application/json" \
      -d '{"content":"🚨 ATS Application Error: ${{ needs.error-analysis.outputs.error_type }}"}'
```

## Support

For issues with the error handling workflow:

1. **Check Workflow Logs**: Review the GitHub Actions logs for detailed error information
2. **Review Artifacts**: Download and examine the generated error reports
3. **Test Components**: Manually test SSH connections, health checks, and notifications
4. **Update Configuration**: Ensure all secrets and environment variables are correctly set

## Version History

- **v1.0.0**: Initial error handling workflow
  - Basic error detection and rollback
  - Slack notifications
  - Health checks
  - Recovery guides

---

**Note**: This error handling system is designed to work with the existing ATS CI/CD pipeline. Ensure all prerequisites are met before enabling automatic error handling.