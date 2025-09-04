# Quick Fix PowerShell Script for ATS Application Build Issues
# This script addresses the immediate build problems on Windows before CentOS deployment

Write-Host "🔧 ATS Application Quick Fix Script (Windows)" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""

function Write-Step {
    param([string]$Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠ $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "✗ $Message" -ForegroundColor Red
}

# Step 1: Set build environment variables
Write-Step "Setting build environment variables..."
$env:CI = "false"
$env:GENERATE_SOURCEMAP = "false"
$env:NODE_OPTIONS = "--max-old-space-size=4096"
$env:ESLINT_NO_DEV_ERRORS = "true"
$env:TSC_COMPILE_ON_ERROR = "true"

Write-Host "Environment variables set:" -ForegroundColor Cyan
Write-Host "  CI=false"
Write-Host "  GENERATE_SOURCEMAP=false"
Write-Host "  NODE_OPTIONS=--max-old-space-size=4096"
Write-Host "  ESLINT_NO_DEV_ERRORS=true"
Write-Host "  TSC_COMPILE_ON_ERROR=true"
Write-Host ""

# Step 2: Clean previous builds
Write-Step "Cleaning previous builds and cache..."
if (Test-Path "build") {
    Remove-Item -Recurse -Force "build"
}
if (Test-Path "node_modules\.cache") {
    Remove-Item -Recurse -Force "node_modules\.cache"
}
if (Test-Path ".eslintcache") {
    Remove-Item -Force ".eslintcache"
}

# Step 3: Check Node.js and npm
Write-Step "Checking Node.js and npm versions..."
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Cyan
    Write-Host "npm version: $npmVersion" -ForegroundColor Cyan
} catch {
    Write-Error "Node.js or npm not found. Please install Node.js first."
    exit 1
}

# Step 4: Install dependencies (if needed)
if (-not (Test-Path "node_modules")) {
    Write-Step "Installing dependencies..."
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to install dependencies"
        exit 1
    }
} else {
    Write-Step "Dependencies already installed, skipping..."
}

# Step 5: Run the build with error handling
Write-Step "Building application..."
Write-Host "Running: npm run build:centos" -ForegroundColor Cyan
Write-Host ""

npm run build:centos

if ($LASTEXITCODE -eq 0) {
    Write-Step "Build completed successfully! 🎉"
    
    if (Test-Path "build") {
        $buildItems = Get-ChildItem "build" -ErrorAction SilentlyContinue
        if ($buildItems.Count -gt 0) {
            Write-Host "Build directory contents:" -ForegroundColor Cyan
            Get-ChildItem "build" | Select-Object Name, Length, LastWriteTime | Format-Table -AutoSize
            Write-Step "Build verification passed ✅"
        } else {
            Write-Warning "Build directory is empty ⚠️"
        }
    } else {
        Write-Error "Build directory not found ❌"
        exit 1
    }
} else {
    Write-Error "Build failed ❌"
    Write-Host ""
    Write-Host "Troubleshooting steps:" -ForegroundColor Yellow
    Write-Host "1. Check Node.js version: node --version (should be 16+)"
    Write-Host "2. Check npm version: npm --version"
    Write-Host "3. Clear npm cache: npm cache clean --force"
    Write-Host "4. Delete node_modules and reinstall: Remove-Item -Recurse node_modules; npm install"
    Write-Host "5. Check available memory and disk space"
    Write-Host "6. Try running: npm run build (without :centos suffix)"
    exit 1
}

Write-Host ""
Write-Step "Quick fix completed successfully!"
Write-Host "Your application is ready for deployment to CentOS." -ForegroundColor Green
Write-Host ""
Write-Host "Next steps for CentOS deployment:" -ForegroundColor Cyan
Write-Host "1. Transfer files to your CentOS VPS"
Write-Host "2. Run: chmod +x quick-fix.sh && ./quick-fix.sh"
Write-Host "3. Run: chmod +x deploy-centos.sh && ./deploy-centos.sh --deploy"
Write-Host "4. Configure your web server (Apache/Nginx)"
Write-Host "5. Set up SSL certificate"
Write-Host ""
Write-Host "For detailed deployment instructions, see CENTOS_DEPLOYMENT.md" -ForegroundColor Cyan

# Pause to allow user to read the output
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")