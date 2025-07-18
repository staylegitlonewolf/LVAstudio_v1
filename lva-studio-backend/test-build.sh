#!/bin/bash

# Test build script to validate the build process locally
echo "=== Testing Build Process Locally ==="

# Set environment variables
export NODE_ENV=production
export STRAPI_DISABLE_SWC=true
export NODE_OPTIONS="--max-old-space-size=4096"

echo "Node.js version: $(node --version)"
echo "NPM version: $(npm --version)"

# Clean install
echo "Installing dependencies..."
npm ci --only=production

# Remove SWC packages
echo "Removing SWC packages..."
npm uninstall @swc/core @swc/cli @swc/helpers || true

# Test build
echo "Testing build..."
npm run build:render

echo "Build test completed!" 