#!/bin/bash

# Exit on any error
set -e

echo "=== LVA Studio Backend Build Script for Render ==="
echo "Node.js version: $(node --version)"
echo "NPM version: $(npm --version)"

# Set critical environment variables
export NODE_ENV=production
export STRAPI_DISABLE_SWC=true
export NODE_OPTIONS="--max-old-space-size=4096"
export DISABLE_ESLINT_PLUGIN=true
export GENERATE_SOURCEMAP=false

echo "1. Cleaning up any existing SWC packages..."
npm uninstall @swc/core @swc/cli @swc/helpers @swc/register || true
rm -rf node_modules/@swc || true

echo "2. Installing dependencies with SWC disabled..."
npm ci --only=production --ignore-scripts

echo "3. Force removing any SWC packages that might have been installed..."
npm uninstall @swc/core @swc/cli @swc/helpers @swc/register || true
rm -rf node_modules/@swc || true

echo "4. Setting up environment for build..."
export STRAPI_DISABLE_SWC=true
export NODE_OPTIONS="--max-old-space-size=4096"

echo "5. Verifying Strapi installation..."
npx strapi --version

echo "6. Building Strapi application..."
npm run build:render

echo "7. Verifying build output..."
if [ -d "build" ]; then
    echo "✅ Build directory created successfully"
    echo "Build contents:"
    ls -la build/
    
    # Check for admin panel
    if [ -d "build/admin" ]; then
        echo "✅ Admin panel built successfully"
    else
        echo "❌ Admin panel not found"
        exit 1
    fi
else
    echo "❌ Build directory not found"
    exit 1
fi

echo "=== Build completed successfully! ===" 