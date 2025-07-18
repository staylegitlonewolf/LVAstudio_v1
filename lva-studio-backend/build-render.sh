#!/bin/bash

# Exit on any error
set -e

echo "=== LVA Studio Backend Build Script for Render ==="

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

echo "5. Building Strapi application..."
npm run build:render

echo "6. Verifying build output..."
if [ -d "build" ]; then
    echo "✅ Build directory created successfully"
    ls -la build/
else
    echo "❌ Build directory not found"
    exit 1
fi

echo "=== Build completed successfully! ===" 