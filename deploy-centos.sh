#!/bin/bash

# CentOS Deployment Script for ATS Application
# This script handles the complete deployment process on CentOS VPS

set -e  # Exit on any error

echo "Starting CentOS deployment for ATS Application..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "Node.js version: $(node --version)"
print_status "npm version: $(npm --version)"

# Set environment variables for build
export CI=false
export GENERATE_SOURCEMAP=false
export NODE_OPTIONS="--max-old-space-size=4096"
export ESLINT_NO_DEV_ERRORS=true
export TSC_COMPILE_ON_ERROR=true

print_status "Environment variables set for production build"

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf build/
rm -rf node_modules/.cache/

# Install dependencies
print_status "Installing dependencies..."
npm ci --production=false

# Run the build
print_status "Building application for production..."
npm run build:centos

if [ $? -eq 0 ]; then
    print_status "Build completed successfully!"
else
    print_error "Build failed!"
    exit 1
fi

# Check if build directory exists
if [ ! -d "build" ]; then
    print_error "Build directory not found!"
    exit 1
fi

print_status "Build directory created successfully"
print_status "Build size: $(du -sh build | cut -f1)"

# Optional: Copy to web server directory
if [ "$1" = "--deploy" ]; then
    WEB_DIR="/var/www/html/ats"
    print_status "Deploying to web server directory: $WEB_DIR"
    
    # Create backup of existing deployment
    if [ -d "$WEB_DIR" ]; then
        print_status "Creating backup of existing deployment..."
        sudo cp -r "$WEB_DIR" "${WEB_DIR}_backup_$(date +%Y%m%d_%H%M%S)"
    fi
    
    # Create web directory if it doesn't exist
    sudo mkdir -p "$WEB_DIR"
    
    # Copy build files
    print_status "Copying build files to web directory..."
    sudo cp -r build/* "$WEB_DIR/"
    
    # Set proper permissions
    sudo chown -R apache:apache "$WEB_DIR"
    sudo chmod -R 755 "$WEB_DIR"
    
    print_status "Deployment completed successfully!"
fi

print_status "CentOS deployment script completed!"
print_status "You can now serve the application from the 'build' directory"

if [ "$1" != "--deploy" ]; then
    print_warning "To deploy to web server, run: ./deploy-centos.sh --deploy"
fi